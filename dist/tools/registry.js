import * as getCurrentTime from "./get-current-time.js";
import * as knowledge from "./knowledge.js";
import * as searchOperationalKnowledge from "./search-operational-knowledge.js";
import * as searchInternet from "./search-internet.js";
import * as getProcessModule from "./get-process-module.js";
import * as getOperationalKbStatus from "./get-operational-kb-status.js";
import * as prepareProcessOnboarding from "./prepare-process-onboarding.js";
import * as prepareProcessExecution from "./prepare-process-execution.js";
import { getDelegateDefinition } from "./delegate.js";
import { logger } from "../logger.js";
// ============================================================================
// Clase ToolRegistry: Estado de herramientas por instancia para sincronizacion modular.
// ============================================================================
export class ToolRegistry {
    executors = new Map();
    definitions = [];
    log;
    constructor(instanceLogger) {
        this.log = instanceLogger ?? logger;
        // Register built-in tools
        this.register(getCurrentTime.definition, getCurrentTime.execute);
        this.register(knowledge.definition, knowledge.readCoreKnowledge);
        this.register(searchOperationalKnowledge.definition, searchOperationalKnowledge.execute);
        this.register(searchInternet.definition, searchInternet.execute);
        this.register(getProcessModule.definition, getProcessModule.execute);
        this.register(getOperationalKbStatus.definition, getOperationalKbStatus.execute);
        this.register(prepareProcessOnboarding.definition, prepareProcessOnboarding.execute);
        this.register(prepareProcessExecution.definition, prepareProcessExecution.execute);
    }
    register(definition, executor) {
        const name = definition.function.name;
        this.executors.set(name, executor);
        if (!this.definitions.some((t) => t.function.name === name)) {
            this.definitions.push(definition);
        }
    }
    registerDelegateTool(executor) {
        const definition = getDelegateDefinition();
        this.register(definition, executor);
    }
    getAllDefinitions(excludeDelegate = false) {
        if (excludeDelegate) {
            return this.definitions.filter((t) => t.function.name !== "delegate_to_agent");
        }
        return this.definitions;
    }
    getToolNames() {
        return [...this.executors.keys()];
    }
    /**
     * INTERCEPTOR DE EJECUCION
     * Captura la intencion del LLM y enruta los argumentos hacia el ejecutor fisico.
     * Envuelve posibles catastrofes internas en strings de fallback manejables.
     */
    async execute(name, args) {
        const executor = this.executors.get(name);
        if (!executor) {
            this.log.warn("Attempted to execute unknown tool", { name });
            return `Error: Unknown tool "${name}"`;
        }
        try {
            return await executor(args);
        }
        catch (error) {
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
export function registerDelegateTool(executor) {
    defaultRegistry.registerDelegateTool(executor);
}
export function registerTool(definition, executor) {
    defaultRegistry.register(definition, executor);
}
export function getAllToolDefinitions(excludeDelegate = false) {
    return defaultRegistry.getAllDefinitions(excludeDelegate);
}
export function getToolNames() {
    return defaultRegistry.getToolNames();
}
export async function executeTool(name, args) {
    return defaultRegistry.execute(name, args);
}
