import "dotenv/config";
import { logger } from "./logger.js";
/**
 * Scan env vars matching PREFIX_AGENT_N_OWNER and collect values ordered by N.
 * Also accepts legacy single-key (PREFIX_AGENT) as priority 0.
 * Filters: empty, whitespace-only, and "<PENDING>" placeholder values.
 * Deduplicates by value to prevent the same key from appearing twice
 * (e.g., if legacy and multi-key reference the same secret).
 */
function collectOrderedKeys(prefix, agentSuffix) {
    const keys = [];
    const multiKeyPattern = new RegExp(`^${prefix}_${agentSuffix}_(\\d+)_?(\\w+)?`, "i");
    const legacyKey = `${prefix}_${agentSuffix}`;
    for (const [envKey, envValue] of Object.entries(process.env)) {
        if (!envValue || envValue === "<PENDING>" || !envValue.trim())
            continue;
        const multiMatch = envKey.match(multiKeyPattern);
        if (multiMatch) {
            keys.push({
                priority: parseInt(multiMatch[1], 10),
                value: envValue.trim(),
                owner: multiMatch[2] || "SYSTEM"
            });
        }
        else if (envKey === legacyKey) {
            keys.push({ priority: 0, value: envValue.trim(), owner: "LEGACY" });
        }
    }
    keys.sort((a, b) => a.priority - b.priority);
    const seen = new Set();
    return keys
        .filter(k => {
        if (seen.has(k.value))
            return false;
        seen.add(k.value);
        return true;
    })
        .map(k => ({ key: k.value, owner: k.owner }));
}
function loadAgentCredentials() {
    const credentials = new Map();
    const agents = ["pristino", "deonto"];
    for (const agent of agents) {
        const suffix = agent.toUpperCase();
        const telegramBotToken = process.env[`TELEGRAM_BOT_TOKEN_${suffix}`] ?? "";
        const groqApiKeys = collectOrderedKeys("GROQ_API_KEY", suffix);
        const openRouterApiKeys = collectOrderedKeys("OPENROUTER_API_KEY", suffix);
        if (telegramBotToken && groqApiKeys.length > 0) {
            credentials.set(agent, { telegramBotToken, groqApiKeys, openRouterApiKeys });
            logger.info(`Loaded credentials for agent: ${agent}`, {
                groqKeys: groqApiKeys.length,
                openRouterKeys: openRouterApiKeys.length,
            });
        }
        else if (telegramBotToken || groqApiKeys.length > 0) {
            logger.warn(`Partial credentials for agent ${agent} — needs both TELEGRAM_BOT_TOKEN_${suffix} and at least one GROQ_API_KEY_${suffix}_*`);
        }
    }
    return credentials;
}
export function loadConfig() {
    const missing = [];
    const agentCredentials = loadAgentCredentials();
    // Legacy single-agent fallback
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
        ?? process.env.TELEGRAM_BOT_TOKEN_PRISTINO
        ?? "";
    const groqApiKey = process.env.GROQ_API_KEY
        ?? process.env.GROQ_API_KEY_PRISTINO
        ?? "";
    const openRouterApiKey = process.env.OPENROUTER_API_KEY
        ?? process.env.OPENROUTER_API_KEY_PRISTINO
        ?? "";
    if (!telegramBotToken && agentCredentials.size === 0) {
        missing.push("TELEGRAM_BOT_TOKEN_PRISTINO (or TELEGRAM_BOT_TOKEN)");
    }
    if (!groqApiKey && agentCredentials.size === 0) {
        missing.push("GROQ_API_KEY_PRISTINO (or GROQ_API_KEY)");
    }
    const rawIds = process.env.TELEGRAM_ALLOWED_USER_IDS ?? "";
    const parts = rawIds.split(",").map((s) => s.trim()).filter(Boolean);
    const allowedUserIds = [];
    for (const part of parts) {
        const n = Number(part);
        if (Number.isNaN(n) || n <= 0 || !Number.isInteger(n)) {
            logger.warn(`Ignoring invalid user ID: "${part}"`);
        }
        else {
            allowedUserIds.push(n);
        }
    }
    if (allowedUserIds.length === 0)
        missing.push("TELEGRAM_ALLOWED_USER_IDS");
    if (missing.length > 0) {
        throw new Error(`Missing required env vars: ${missing.join(", ")}`);
    }
    if (!openRouterApiKey && agentCredentials.size === 0) {
        logger.info("OpenRouter API key not set — fallback disabled");
    }
    if (agentCredentials.size > 0) {
        logger.info(`Multi-agent mode: ${[...agentCredentials.keys()].join(", ")}`);
    }
    return {
        telegramBotToken,
        allowedUserIds,
        groqApiKey,
        groqModel: process.env.GROQ_MODEL ?? process.env.GROQ_MODEL_TIER1 ?? "openai/gpt-oss-120b",
        groqModelTiers: [
            process.env.GROQ_MODEL_TIER1 ?? process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
            process.env.GROQ_MODEL_TIER2 ?? "qwen/qwen3-32b",
            process.env.GROQ_MODEL_TIER3 ?? "llama-3.1-8b-instant",
        ].filter(Boolean),
        groqModelVision: process.env.GROQ_MODEL_VISION ?? "meta-llama/llama-4-scout-17b-16e-instruct",
        openRouterApiKey,
        openRouterModel: process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct",
        dbPath: process.env.DB_PATH ?? "./pristino.db",
        maxIterations: Math.max(1, Number(process.env.MAX_ITERATIONS) || 5),
        maxHistory: Math.max(1, Number(process.env.MAX_HISTORY) || 20),
        maxTokens: Math.max(128, Number(process.env.MAX_TOKENS) || 4096),
        modelContextWindow: Math.max(1024, Number(process.env.MODEL_CONTEXT_WINDOW) || 131072),
        agentsPath: process.env.AGENTS_PATH ?? "./agents",
        agentCredentials,
        googleOAuthToken: process.env.GOOGLE_OAUTH_ACCESS_TOKEN ?? "",
    };
}
/** Get credentials for a specific agent, falling back to legacy config */
export function getAgentCredentials(config, agentName) {
    const creds = config.agentCredentials.get(agentName);
    if (creds)
        return creds;
    // Fallback to legacy single-agent config (wrap single keys in arrays)
    return {
        telegramBotToken: config.telegramBotToken,
        groqApiKeys: config.groqApiKey ? [{ key: config.groqApiKey, owner: "LEGACY" }] : [],
        openRouterApiKeys: config.openRouterApiKey ? [{ key: config.openRouterApiKey, owner: "LEGACY" }] : [],
    };
}
/** Get per-instance database path. Mirror instances get separate SQLite files. */
export function getInstanceDbPath(config, agentName) {
    if (process.env.DB_PATH)
        return config.dbPath;
    return `./data/${agentName}.db`;
}
