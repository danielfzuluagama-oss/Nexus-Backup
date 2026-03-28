import { composeSystemPrompt } from "../ecosystem/prompt-composer.js";
import { logger } from "../logger.js";
// ============================================================================
// SubAgentRegistry class: per-instance sub-agent state for mirror sync.
// Mantiene el asilamiento de procesos para evitar colisiones logicas entre request simultaneos en Cloud Run.
// ============================================================================
export class SubAgentRegistry {
    agents = new Map();
    log;
    constructor(instanceLogger) {
        this.log = instanceLogger ?? logger;
        // Register hardcoded default agent
        this.agents.set("timekeeper", {
            name: "timekeeper",
            description: "Specialist for time, date, timezone, and calendar queries.",
            systemPrompt: "You are Timekeeper, a specialist sub-agent focused on time and date queries. " +
                "Use the get_current_time tool to provide accurate time information. " +
                "Format responses clearly with timezone context. Be precise and concise.",
            tools: ["get_current_time"],
        });
    }
    /**
     * REGISTRO DE AGENTES DINAMICOS
     * Combina de forma aditiva los agentes embebidos con los agentes declarativos montados en memoria.
     */
    registerEcosystemAgents(ecosystem) {
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
        this.log.info("Ecosystem agents registered", { count: ecosystem.agents.size });
    }
    get(name) {
        return this.agents.get(name);
    }
    getAll() {
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
export function registerEcosystemAgents(ecosystem) {
    defaultRegistry.registerEcosystemAgents(ecosystem);
}
export function getSubAgents() {
    return defaultRegistry.getAll();
}
export function getSubAgent(name) {
    return defaultRegistry.get(name);
}
export function getDelegateDefinition() {
    const agents = defaultRegistry.getAll();
    const agentNames = [...agents.keys()];
    const descriptions = [...agents.entries()]
        .map(([name, agent]) => `- "${name}": ${agent.description}`)
        .join("\n");
    return {
        type: "function",
        function: {
            name: "delegate_to_agent",
            description: `Delegate a task to a specialist sub-agent. Available agents:\n${descriptions}`,
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
