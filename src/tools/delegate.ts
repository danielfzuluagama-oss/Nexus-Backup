import type { ToolDefinition } from "./registry.js";
import type { EcosystemState, SkillDefinition } from "../ecosystem/types.js";
import { composeSystemPrompt } from "../ecosystem/prompt-composer.js";
import { composeSkillPrompt } from "../ecosystem/skill-composer.js";
import { logger } from "../logger.js";
import type { Logger } from "../logger.js";

/**
 * ARCHITECT OPERATOR MODULE: SUB-AGENT DELEGATION PROTOCOL (PHASE 3)
 * 
 * OBJETIVO:
 * Orquestar el enrutamiento de intenciones cognitivas desde el Agente Principal hacia Sub-Agentes especializados (Ecosystem Agents).
 * Se rige bajo el principio de delegacion de responsabilidad para evitar la saturacion de contexto del hilo maestro.
 * 
 * ESTRUCTURA DE CAPAS:
 * - Registro Aislado (SubAgentRegistry): Conserva el estado en memoria de los sub-agentes disponibles por instancia.
 * - Sub-Agentes Estaticos: Instancias embebidas en el codigo fuente para tareas base.
 * - Sub-Agentes Dinamicos: Carga hidraulica de definiciones provenientes del ecosistema de carpetas locales.
 * 
 * TRADE-OFFS Y DECISIONES DE DISENO:
 * - Se opto por instanciar la herramienta de forma perezosa y condicional para prevenir ciclos infinitos de delegacion.
 * - Sobrescribir sub-agentes embebidos si el ecosistema emite un ID colisionante permite la actualizacion tactica sin modificar el nucleo del codigo.
 * 
 * CRITERIOS DE ACEPTACION (10/10):
 * - Tolerancia de resolucion: La herramienta generada dinamicamente (getDelegateDefinition) debe reflejar exactamente las firmas instaladas.
 * - Trazabilidad logica: Cada sobreescritura o invocacion registra un evento formal de informacion en la consola.
 */

export interface SubAgent {
  name: string;
  description: string;
  systemPrompt: string;
  tools: string[];
}

// ============================================================================
// SubAgentRegistry class: per-instance sub-agent state for mirror sync.
// Mantiene el asilamiento de procesos para evitar colisiones logicas entre request simultaneos en Cloud Run.
// ============================================================================

export class SubAgentRegistry {
  private agents = new Map<string, SubAgent>();
  private log: Logger;

  constructor(instanceLogger?: Logger) {
    this.log = instanceLogger ?? logger;
    // Register hardcoded default agent
    this.agents.set("timekeeper", {
      name: "timekeeper",
      description: "Specialist for time, date, timezone, and calendar queries.",
      systemPrompt:
        "You are Timekeeper, a specialist sub-agent focused on time and date queries. " +
        "Use the get_current_time tool to provide accurate time information. " +
        "Format responses clearly with timezone context. Be precise and concise.",
      tools: ["get_current_time"],
    });
  }

  /** 
   * REGISTRO DE AGENTES DINAMICOS
   * Combina de forma aditiva los agentes embebidos con los agentes declarativos montados en memoria.
   */
  registerEcosystemAgents(ecosystem: EcosystemState): void {
    for (const [id, agent] of ecosystem.agents) {
      if (this.agents.has(id)) {
        this.log.info("Overriding hardcoded agent with ecosystem definition", { agentId: id });
      }
      this.agents.set(id, {
        name: agent.name,
        description: agent.role,
        systemPrompt: composeSystemPrompt(agent),
        tools: agent.allowedTools,
      });
    }

    for (const [agentId, skills] of ecosystem.skills) {
      this.registerEcosystemSkills(agentId, skills);
    }
    this.log.info("Ecosystem agents registered", { count: ecosystem.agents.size });
  }

  private registerEcosystemSkills(agentId: string, skills: SkillDefinition[]): void {
    for (const skill of skills) {
      if (this.agents.has(skill.id)) {
        this.log.info("Overriding hardcoded agent with ecosystem skill", {
          agentId,
          skillId: skill.id,
        });
      }

      this.agents.set(skill.id, {
        name: skill.name,
        description: skill.purpose || skill.businessValue || skill.id,
        systemPrompt: skill.systemPrompt ?? composeSkillPrompt(skill),
        tools: skill.toolUsage,
      });
    }
  }

  get(name: string): SubAgent | undefined {
    return this.agents.get(name);
  }

  getAll(): Map<string, SubAgent> {
    return this.agents;
  }
}

// ============================================================================
// Default global instance — backward compatible with existing code.
// ============================================================================

const defaultRegistry = new SubAgentRegistry();

/** 
 * Envoltura global para mantener la retrocompatibilidad con codigo heredado.
 * Asegura la carga paralela sin romper las rutas establecidas.
 */
export function registerEcosystemAgents(ecosystem: EcosystemState): void {
  defaultRegistry.registerEcosystemAgents(ecosystem);
}

export function getSubAgents(): Map<string, SubAgent> {
  return defaultRegistry.getAll();
}

export function getSubAgent(name: string): SubAgent | undefined {
  return defaultRegistry.get(name);
}

export function getDelegateDefinition(): ToolDefinition {
  const agents = defaultRegistry.getAll();
  const agentNames = [...agents.keys()];
  const descriptions = [...agents.entries()]
    .map(([name, agent]) => `- "${name}": ${agent.description}`)
    .join("\n");

  return {
    type: "function",
    function: {
      name: "delegate_to_agent",
      description:
        `Delegate a task to a specialist sub-agent. Available agents:\n${descriptions}`,
      parameters: {
        type: "object",
        properties: {
          agent_name: {
            type: "string",
            description: `Name of the sub-agent to delegate to. Options: ${agentNames.join(", ")}`,
          },
          task: {
            type: "string",
            description: "The specific task or question to delegate to the sub-agent.",
          },
        },
        required: ["agent_name", "task"],
      },
    },
  };
}
