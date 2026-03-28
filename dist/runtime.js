/**
 * AGENT RUNTIME — Isolated per-instance state container.
 *
 * Each AgentRuntime encapsulates: Memory (Firestore/in-memory), LLM provider (2D cascade),
 * Logger (prefixed), Tool Registry, and Sub-Agent Registry.
 * Pristino and Deonto run as independent runtimes sharing Config but isolated in everything else.
 *
 * Trade-off: Memory is instantiated without userId context; it resolves per-call in addMessage.
 * This means the Memory instance is shared across all users of the same agent, which is
 * intentional for the knowledge_graph (team-wide) but requires userId scoping for conversations.
 */
import { Memory } from "./memory.js";
import { getProvider } from "./config/llm-providers.js";
import { createLogger } from "./logger.js";
import { ToolRegistry } from "./tools/registry.js";
import { SubAgentRegistry } from "./tools/delegate.js";
export class AgentRuntime {
    instanceName;
    config;
    credentials;
    memory;
    llm;
    logger;
    toolRegistry;
    subAgentRegistry;
    ecosystem = null;
    onQuotaExhausted;
    constructor(name, config, creds) {
        this.instanceName = name;
        this.config = config;
        this.credentials = creds;
        this.logger = createLogger(name);
        this.memory = new Memory();
        this.llm = getProvider(config, name);
        // Wire up quota notification
        this.llm.onQuotaExhausted = (owner, provider) => {
            if (this.onQuotaExhausted)
                this.onQuotaExhausted(owner, provider);
        };
        this.toolRegistry = new ToolRegistry(this.logger);
        this.subAgentRegistry = new SubAgentRegistry(this.logger);
        this.logger.info("Runtime initialized", {
            instanceName: name,
            telegramToken: creds.telegramBotToken ? "configured" : "missing",
            groqKeys: creds.groqApiKeys.length,
            openRouterKeys: creds.openRouterApiKeys.length,
            modelTiers: config.groqModelTiers.length,
        });
    }
    /** Gracefully shut down this runtime instance. */
    shutdown() {
        this.logger.info("Shutting down runtime...");
        this.memory.close();
        this.logger.info("Runtime shut down complete");
    }
}
