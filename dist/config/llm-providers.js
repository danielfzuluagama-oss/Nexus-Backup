import Groq from "groq-sdk";
import { getAgentCredentials } from "../config.js";
import { logger } from "../logger.js";
import { CircuitBreaker } from "../circuit-breaker.js";
const FETCH_TIMEOUT_MS = 30_000;
/** Normalize provider response. Guards against malformed/empty choices array. */
function parseResponse(message) {
    if (!message)
        return { content: null, toolCalls: [] };
    return {
        content: message.content ?? null,
        toolCalls: (Array.isArray(message.tool_calls) ? message.tool_calls : []),
    };
}
/** Create a Groq-backed LLM client for a specific model and API key */
function createGroqClient(apiKey, model, config) {
    const groq = new Groq({ apiKey });
    // Build MCP connectors if OAuth token is available.
    // Token evaluated at client creation time; 401 from Google if expired mid-session.
    const mcpServers = [];
    if (config.googleOAuthToken) {
        const oauthAuth = { authorization: `Bearer ${config.googleOAuthToken}` };
        mcpServers.push({ type: "connector", server_id: "connector_gmail", ...oauthAuth }, { type: "connector", server_id: "connector_googlecalendar", ...oauthAuth }, { type: "connector", server_id: "connector_googledrive", ...oauthAuth });
    }
    return async (messages, tools) => {
        const requestBody = {
            model,
            messages: messages,
            tools: tools,
            tool_choice: "auto",
            max_tokens: config.maxTokens,
        };
        if (mcpServers.length > 0) {
            requestBody.mcp_servers = mcpServers;
        }
        const response = await groq.chat.completions.create(requestBody);
        return parseResponse(response.choices[0]?.message);
    };
}
/** Create an OpenRouter-backed LLM client for a specific API key */
function createOpenRouterClient(apiKey, config) {
    return async (messages, tools) => {
        if (!apiKey) {
            throw new Error("OpenRouter fallback disabled (no API key)");
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        try {
            const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: config.openRouterModel,
                    messages,
                    tools,
                    tool_choice: "auto",
                    max_tokens: config.maxTokens,
                }),
                signal: controller.signal,
            });
            if (!res.ok) {
                const body = await res.text().catch(() => "unknown");
                throw new Error(`OpenRouter HTTP ${res.status}: ${body}`);
            }
            const data = await res.json();
            return parseResponse(data?.choices?.[0]?.message);
        }
        finally {
            clearTimeout(timeout);
        }
    };
}
/** Per-(model,key) circuit breakers */
const breakers = new Map();
function getBreaker(key) {
    let breaker = breakers.get(key);
    if (!breaker) {
        breaker = new CircuitBreaker(key);
        breakers.set(key, breaker);
    }
    return breaker;
}
/** Detect errors that warrant key/tier cascade (rate limits and payload rejections). */
function isRateLimitError(err) {
    const msg = err instanceof Error ? err.message : String(err);
    return msg.includes("429") || msg.includes("413")
        || msg.includes("rate_limit") || msg.includes("Rate limit")
        || msg.includes("Request too large");
}
/**
 * Horizontal cascade: try all API keys for a given model.
 * Returns on first success; returns null if all keys exhausted or circuit-broken.
 */
async function tryWithKeys(apiKeys, model, agentName, config, messages, tools, providerLabel, onQuota) {
    if (apiKeys.length === 0)
        return null;
    for (let k = 0; k < apiKeys.length; k++) {
        const breakerKey = `${providerLabel}:${agentName}:${model}:key${k}`;
        const breaker = getBreaker(breakerKey);
        if (breaker.isOpen()) {
            logger.info(`Circuit open: ${providerLabel} key ${k + 1}/${apiKeys.length} for ${agentName}:${model}`);
            continue;
        }
        const client = providerLabel === "groq"
            ? createGroqClient(apiKeys[k].key, model, config)
            : createOpenRouterClient(apiKeys[k].key, config);
        try {
            const result = await client(messages, tools);
            breaker.recordSuccess();
            return { result, keyIndex: k };
        }
        catch (err) {
            breaker.recordFailure();
            const msg = err instanceof Error ? err.message : String(err);
            if (isRateLimitError(err)) {
                logger.warn(`${providerLabel} key ${k + 1}/${apiKeys.length} (${apiKeys[k].owner}) rate limited for ${agentName}`);
                if (onQuota)
                    onQuota(apiKeys[k].owner, providerLabel);
            }
            else {
                logger.warn(`${providerLabel} key ${k + 1}/${apiKeys.length} (${apiKeys[k].owner}) failed for ${agentName}`, { error: msg });
            }
        }
    }
    return null;
}
/**
 * Multi-tier, multi-key LLM provider with 2D cascading failover.
 *
 * For each Groq model tier, iterates all available API keys before advancing.
 * After all Groq tiers × keys are exhausted, falls back to OpenRouter (same key cascade).
 */
export function getProvider(config, agentName) {
    const creds = getAgentCredentials(config, agentName);
    if (creds.groqApiKeys.length === 0) {
        throw new Error(`No Groq API keys configured for agent: ${agentName}`);
    }
    const provider = {
        async chat(messages, tools) {
            // Vertical cascade: iterate through model tiers
            for (let t = 0; t < config.groqModelTiers.length; t++) {
                const model = config.groqModelTiers[t];
                // Horizontal cascade: iterate through API keys within this tier
                const attempt = await tryWithKeys(creds.groqApiKeys, model, agentName, config, messages, tools, "groq", provider.onQuotaExhausted);
                if (attempt) {
                    if (t > 0 || attempt.keyIndex > 0) {
                        const owner = creds.groqApiKeys[attempt.keyIndex].owner;
                        logger.info(`Served by Groq tier ${t + 1} (${model}), key ${attempt.keyIndex + 1} (${owner}) for ${agentName}`);
                    }
                    return attempt.result;
                }
            }
            // All Groq tiers × keys exhausted — cascade to OpenRouter
            if (creds.openRouterApiKeys.length > 0) {
                logger.warn(`All Groq tiers exhausted for ${agentName}, cascading to OpenRouter`);
                const orAttempt = await tryWithKeys(creds.openRouterApiKeys, config.openRouterModel, agentName, config, messages, tools, "openrouter", provider.onQuotaExhausted);
                if (orAttempt)
                    return orAttempt.result;
            }
            throw new Error(`All LLM providers exhausted for ${agentName}. No keys available.`);
        },
    };
    return provider;
}
/**
 * Groq-only provider using the first available key (no multi-key cascade).
 * Use when you explicitly need a single-provider path.
 */
export function getGroqClient(config, agentName) {
    const creds = getAgentCredentials(config, agentName);
    if (creds.groqApiKeys.length === 0)
        throw new Error(`No Groq API keys for agent: ${agentName}`);
    const callGroq = createGroqClient(creds.groqApiKeys[0].key, config.groqModel, config);
    return {
        async chat(messages, tools) {
            return await callGroq(messages, tools);
        },
    };
}
/**
 * OpenRouter-only provider using the first available key.
 */
export function getOpenRouterClient(config, agentName) {
    const creds = getAgentCredentials(config, agentName);
    if (creds.openRouterApiKeys.length === 0)
        throw new Error(`No OpenRouter API keys for agent: ${agentName}`);
    const callOpenRouter = createOpenRouterClient(creds.openRouterApiKeys[0].key, config);
    return {
        async chat(messages, tools) {
            return await callOpenRouter(messages, tools);
        },
    };
}
/**
 * Vision-specific provider. Routes to Llama 4 Scout with full key cascade.
 * Falls back to the standard multi-tier provider if vision model fails.
 */
export function getVisionProvider(config, agentName) {
    const creds = getAgentCredentials(config, agentName);
    if (creds.groqApiKeys.length === 0)
        throw new Error(`No Groq API keys for agent: ${agentName}`);
    const standardProvider = getProvider(config, agentName);
    return {
        async chat(messages, tools) {
            // Try vision model with all available keys
            const attempt = await tryWithKeys(creds.groqApiKeys, config.groqModelVision, agentName, config, messages, tools, "groq", standardProvider.onQuotaExhausted);
            if (attempt)
                return attempt.result;
            // Vision exhausted — fall back to standard cascade (which has no vision capability)
            logger.warn(`Vision model exhausted for ${agentName}, falling back to standard cascade`);
            return standardProvider.chat(messages, tools);
        },
    };
}
