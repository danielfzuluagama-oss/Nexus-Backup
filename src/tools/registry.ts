import * as getCurrentTime from "./get-current-time.js";
import * as knowledge from "./knowledge.js";
import { getDelegateDefinition } from "./delegate.js";
import { logger } from "../logger.js";
import type { Logger } from "../logger.js";

/**
 * ARCHITECT OPERATOR MODULE: TOOL REGISTRY KERNEL (PHASE 3)
 * 
 * OBJETIVO:
 * Orquestar el catalogo de habilidades activas disponibles para el motor LLM.
 * Actua como la tabla de ruteo estandarizada entre la intencion cognitiva y la ejecucion determinista.
 * 
 * ESTRUCTURA DE CAPAS:
 * - Instancia Aislada (ToolRegistry): Protege el estado del catalogo previniendo colisiones de concurrencia en arquitecturas Cloud Run o Serverless multicore.
 * - Registro Global Heredado: Mantiene estabilidad hacia atras para la arquitectura monocore preexistente.
 * 
 * CRITERIOS DE ACEPTACION:
 * - Tolerancia a fallos de herramienta: Ningun crash dentro del ejecutor especifico (ToolExecutor) debe derribar el hilo principal; el ToolRegistry intercepta el fallo y traduce la excepcion a una respuesta sintactica asimilable por el LLM.
 * - Idempotencia de registro: La inyeccion de herramientas gemelas es evitada silenciosamente.
 */

export interface ToolDefinition {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: {
      type: "object";
      properties: Record<string, unknown>;
      required: string[];
    };
  };
}

export type ToolExecutor = (args: Record<string, unknown>) => string | Promise<string>;

// ============================================================================
// Clase ToolRegistry: Estado de herramientas por instancia para sincronizacion modular.
// ============================================================================

export class ToolRegistry {
  private executors = new Map<string, ToolExecutor>();
  private definitions: ToolDefinition[] = [];
  private log: Logger;

  constructor(instanceLogger?: Logger) {
    this.log = instanceLogger ?? logger;
    // Register built-in tools
    this.register(getCurrentTime.definition, getCurrentTime.execute);
    this.register(knowledge.definition, knowledge.readCoreKnowledge);
  }

  register(definition: ToolDefinition, executor: ToolExecutor): void {
    const name = definition.function.name;
    this.executors.set(name, executor);
    if (!this.definitions.some((t) => t.function.name === name)) {
      this.definitions.push(definition);
    }
  }

  registerDelegateTool(executor: ToolExecutor): void {
    const definition = getDelegateDefinition();
    this.register(definition, executor);
  }

  getAllDefinitions(excludeDelegate = false): ToolDefinition[] {
    if (excludeDelegate) {
      return this.definitions.filter((t) => t.function.name !== "delegate_to_agent");
    }
    return this.definitions;
  }

  getToolNames(): string[] {
    return [...this.executors.keys()];
  }

  /**
   * INTERCEPTOR DE EJECUCION
   * Captura la intencion del LLM y enruta los argumentos hacia el ejecutor fisico.
   * Envuelve posibles catastrofes internas en strings de fallback manejables.
   */
  async execute(name: string, args: Record<string, unknown>): Promise<string> {
    const executor = this.executors.get(name);
    if (!executor) {
      this.log.warn("Attempted to execute unknown tool", { name });
      return `Error: Unknown tool "${name}"`;
    }
    try {
      return await executor(args);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.log.error("Tool execution failed", { name, error: message });
      return `Error executing "${name}": ${message}`;
    }
  }
}

// ============================================================================
// Instancia global predeterminada: Ruteo retrocompatible con codigo legado.
// ============================================================================

const defaultRegistry = new ToolRegistry();

export function registerDelegateTool(executor: ToolExecutor): void {
  defaultRegistry.registerDelegateTool(executor);
}

export function registerTool(definition: ToolDefinition, executor: ToolExecutor): void {
  defaultRegistry.register(definition, executor);
}

export function getAllToolDefinitions(excludeDelegate = false): ToolDefinition[] {
  return defaultRegistry.getAllDefinitions(excludeDelegate);
}

export function getToolNames(): string[] {
  return defaultRegistry.getToolNames();
}

export async function executeTool(name: string, args: Record<string, unknown>): Promise<string> {
  return defaultRegistry.execute(name, args);
}
