import Groq from "groq-sdk";
import { getAgentCredentials } from "../config.js";
import { logger } from "../logger.js";
import { CircuitBreaker } from "../circuit-breaker.js";
const FETCH_TIMEOUT_MS = 30_000;
const providerTelemetry = new Map();
function nowIso() {
    return new Date().toISOString();
}
function getTelemetryKey(identity) {
    return [
        identity.agentName,
        identity.routeKind,
        identity.provider,
        identity.model,
        identity.owner,
        identity.keyIndex,
    ].join(":");
}
function getOrCreateTelemetryEntry(identity) {
    const telemetryKey = getTelemetryKey(identity);
    const existing = providerTelemetry.get(telemetryKey);
    if (existing) {
        return existing;
    }
    const entry = {
        agentName: identity.agentName,
        routeKind: identity.routeKind,
        provider: identity.provider,
        model: identity.model,
        owner: identity.owner,
        keyIndex: identity.keyIndex,
        attempts: 0,
        successes: 0,
        quotaErrors: 0,
        payloadTooLargeErrors: 0,
        otherErrors: 0,
        breakerOpenSkips: 0,
        lastAttemptAt: null,
        lastSuccessAt: null,
        lastErrorAt: null,
        lastErrorKind: null,
        lastErrorMessage: null,
        breakerKey: identity.breakerKey,
    };
    providerTelemetry.set(telemetryKey, entry);
    return entry;
}
function recordProviderAttempt(identity) {
    const entry = getOrCreateTelemetryEntry(identity);
    entry.attempts += 1;
    entry.lastAttemptAt = nowIso();
}
function recordProviderSuccess(identity) {
    const entry = getOrCreateTelemetryEntry(identity);
    entry.successes += 1;
    entry.lastSuccessAt = nowIso();
}
function recordProviderFailure(identity, kind, message) {
    const entry = getOrCreateTelemetryEntry(identity);
    entry.lastErrorAt = nowIso();
    entry.lastErrorKind = kind;
    entry.lastErrorMessage = message;
    if (kind === "quota") {
        entry.quotaErrors += 1;
        return;
    }
    if (kind === "payload_too_large") {
        entry.payloadTooLargeErrors += 1;
        return;
    }
    entry.otherErrors += 1;
}
function recordProviderBreakerOpen(identity) {
    const entry = getOrCreateTelemetryEntry(identity);
    entry.breakerOpenSkips += 1;
    entry.lastErrorAt = nowIso();
    entry.lastErrorKind = "breaker_open";
    entry.lastErrorMessage = "Circuit breaker open";
}
function buildTelemetrySnapshot(agentName) {
    const entries = [...providerTelemetry.values()]
        .filter((entry) => entry.agentName === agentName)
        .map(({ breakerKey, ...entry }) => ({
        ...entry,
        circuitOpen: getBreaker(breakerKey).isOpen(),
    }))
        .sort((left, right) => {
        if (left.provider !== right.provider) {
            return left.provider.localeCompare(right.provider);
        }
        if (left.routeKind !== right.routeKind) {
            return left.routeKind.localeCompare(right.routeKind);
        }
        if (left.model !== right.model) {
            return left.model.localeCompare(right.model);
        }
        return left.keyIndex - right.keyIndex;
    });
    return {
        agentName,
        generatedAt: nowIso(),
        remainingQuotaKnown: false,
        note: "Remaining provider quota is not exposed by the current runtime. This ledger tracks observed attempts, successes, rate limits, and failures per key/model.",
        totals: entries.reduce((totals, entry) => ({
            attempts: totals.attempts + entry.attempts,
            successes: totals.successes + entry.successes,
            quotaErrors: totals.quotaErrors + entry.quotaErrors,
            payloadTooLargeErrors: totals.payloadTooLargeErrors + entry.payloadTooLargeErrors,
            otherErrors: totals.otherErrors + entry.otherErrors,
            breakerOpenSkips: totals.breakerOpenSkips + entry.breakerOpenSkips,
        }), {
            attempts: 0,
            successes: 0,
            quotaErrors: 0,
            payloadTooLargeErrors: 0,
            otherErrors: 0,
            breakerOpenSkips: 0,
        }),
        entries,
    };
}
export function resetProviderTelemetryForTests() {
    providerTelemetry.clear();
    breakers.clear();
}
/** Normalize provider response. Guards against malformed/empty choices array. */
function parseResponse(message) {
    if (!message)
        return { content: null, toolCalls: [] };
    return {
        content: message.content ?? null,
        toolCalls: (Array.isArray(message.tool_calls) ? message.tool_calls : []),
    };
}
function normalizeGeminiMessageContent(content) {
    return typeof content === "string" ? content : "";
}
function renderGeminiToolCallArguments(rawArguments) {
    try {
        return JSON.stringify(JSON.parse(rawArguments));
    }
    catch {
        return rawArguments;
    }
}
function summarizeAssistantToolCallsForGemini(message) {
    const parts = [];
    const content = normalizeGeminiMessageContent(message.content).trim();
    if (content) {
        parts.push(content);
    }
    if (Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
        const renderedToolCalls = message.tool_calls.map((toolCall) => {
            const args = renderGeminiToolCallArguments(toolCall.function.arguments);
            return `- ${toolCall.function.name}(${args})`;
        });
        parts.push(`Tool call summary:\n${renderedToolCalls.join("\n")}`);
    }
    return parts.length > 0 ? parts.join("\n\n") : null;
}
export function sanitizeMessagesForGemini(messages) {
    return messages.flatMap((message) => {
        if (message.role === "assistant" && Array.isArray(message.tool_calls) && message.tool_calls.length > 0) {
            const summary = summarizeAssistantToolCallsForGemini(message);
            return summary
                ? [{ role: "assistant", content: summary }]
                : [];
        }
        if (message.role === "tool") {
            const toolName = message.name ?? "unknown_tool";
            const content = normalizeGeminiMessageContent(message.content).trim() || "(empty tool result)";
            return [{
                    role: "assistant",
                    content: `Tool result from ${toolName}${message.tool_call_id ? ` (${message.tool_call_id})` : ""}:\n${content}`,
                }];
        }
        return [{
                role: message.role,
                content: normalizeGeminiMessageContent(message.content),
            }];
    });
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
    return async (messages, tools, options) => {
        const maxTokens = Math.max(1, Math.floor(options?.maxTokens ?? config.maxTokens));
        const requestBody = {
            model,
            messages: messages,
            tools: tools,
            tool_choice: "auto",
            max_tokens: maxTokens,
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
    return async (messages, tools, options) => {
        if (!apiKey) {
            throw new Error("OpenRouter fallback disabled (no API key)");
        }
        const maxTokens = Math.max(1, Math.floor(options?.maxTokens ?? config.maxTokens));
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
                    max_tokens: maxTokens,
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
/** Create a Gemini-backed client using the official OpenAI-compatible endpoint. */
function createGeminiClient(apiKey, model, config) {
    return async (messages, tools, options) => {
        if (!apiKey) {
            throw new Error("Gemini fallback disabled (no API key)");
        }
        const maxTokens = Math.max(1, Math.floor(options?.maxTokens ?? config.maxTokens));
        const sanitizedMessages = sanitizeMessagesForGemini(messages);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
        try {
            const res = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model,
                    messages: sanitizedMessages,
                    tools,
                    tool_choice: "auto",
                    max_tokens: maxTokens,
                }),
                signal: controller.signal,
            });
            if (!res.ok) {
                const body = await res.text().catch(() => "unknown");
                throw new Error(`Gemini HTTP ${res.status}: ${body}`);
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
/** Distinguish true quota exhaustion from oversized payloads and generic failures. */
function classifyProviderError(err) {
    const msg = err instanceof Error ? err.message : String(err);
    const normalized = msg.toLowerCase();
    const isQuota413 = normalized.includes("413")
        && (normalized.includes("tokens per minute")
            || normalized.includes("tokens per day")
            || normalized.includes("tpm")
            || normalized.includes("tpd")
            || normalized.includes("requested"));
    if (isQuota413) {
        return "quota";
    }
    if (normalized.includes("context_length_exceeded")
        || normalized.includes("maximum context length")
        || normalized.includes("context window")
        || normalized.includes("request body is too large")
        || normalized.includes("413")
        || normalized.includes("request too large")) {
        return "payload_too_large";
    }
    if (normalized.includes("429")
        || normalized.includes("rate_limit")
        || normalized.includes("rate limit")
        || normalized.includes("too many requests")) {
        return "quota";
    }
    return "other";
}
const GEMINI_COMPLEXITY_KEYWORDS = [
    "analiza",
    "analizar",
    "analisis",
    "compare",
    "comparar",
    "contrato",
    "debug",
    "depura",
    "disena",
    "diseña",
    "estrateg",
    "evalua",
    "evalúa",
    "investiga",
    "investigar",
    "matriz",
    "plan",
    "prompt injection",
    "red team",
    "refactor",
    "riesgo",
    "seguridad",
    "sintetiza",
    "sintesis",
    "synthesis",
];
function normalizeForComplexityScan(text) {
    return text
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[\u200B-\u200F\u2060\uFEFF]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}
export function selectGeminiRoute(messages, _tools, config, _options) {
    const latestUserMessage = [...messages]
        .reverse()
        .find((message) => message.role === "user")?.content ?? "";
    const normalizedLatestUserMessage = normalizeForComplexityScan(latestUserMessage);
    const nonSystemChars = messages
        .filter((message) => message.role !== "system")
        .reduce((total, message) => total + (message.content?.length ?? 0), 0);
    const userTurnCount = messages.filter((message) => message.role === "user").length;
    const lineCount = latestUserMessage.split(/\r?\n/).filter(Boolean).length;
    const keywordHits = GEMINI_COMPLEXITY_KEYWORDS.filter((keyword) => normalizedLatestUserMessage.includes(keyword)).length;
    const hasEnumeratedRequest = /(?:^|\s)(?:1\.|2\.|3\.|\- )/.test(latestUserMessage);
    const isComplex = normalizedLatestUserMessage.length > 320
        || nonSystemChars > 1_600
        || userTurnCount > 4
        || lineCount > 3
        || keywordHits > 0
        || hasEnumeratedRequest;
    if (isComplex) {
        const reasons = [];
        if (normalizedLatestUserMessage.length > 320)
            reasons.push("latest_user_message>320_chars");
        if (nonSystemChars > 1_600)
            reasons.push("conversation>1600_chars");
        if (userTurnCount > 4)
            reasons.push("user_turns>4");
        if (lineCount > 3)
            reasons.push("multiline_request");
        if (keywordHits > 0)
            reasons.push(`complex_keywords=${keywordHits}`);
        if (hasEnumeratedRequest)
            reasons.push("enumerated_request");
        return {
            model: config.geminiComplexModel,
            complexity: "complex",
            reason: reasons.join(", "),
        };
    }
    return {
        model: config.geminiSimpleModel,
        complexity: "simple",
        reason: "short_single_turn_request",
    };
}
/**
 * Horizontal cascade: try all API keys for a given model.
 * Returns on first success; returns null if all keys exhausted or circuit-broken.
 */
async function tryWithKeys(apiKeys, model, agentName, config, messages, tools, providerLabel, routeKind, chatOptions, onQuota) {
    if (apiKeys.length === 0)
        return null;
    for (let k = 0; k < apiKeys.length; k++) {
        const breakerKey = `${providerLabel}:${agentName}:${model}:key${k}`;
        const breaker = getBreaker(breakerKey);
        const telemetryIdentity = {
            agentName,
            routeKind,
            provider: providerLabel,
            model,
            owner: apiKeys[k].owner,
            keyIndex: k,
            breakerKey,
        };
        if (breaker.isOpen()) {
            recordProviderBreakerOpen(telemetryIdentity);
            logger.info(`Circuit open: ${providerLabel} key ${k + 1}/${apiKeys.length} for ${agentName}:${model}`);
            continue;
        }
        recordProviderAttempt(telemetryIdentity);
        const client = providerLabel === "groq"
            ? createGroqClient(apiKeys[k].key, model, config)
            : providerLabel === "gemini"
                ? createGeminiClient(apiKeys[k].key, model, config)
                : createOpenRouterClient(apiKeys[k].key, config);
        try {
            const result = await client(messages, tools, chatOptions);
            breaker.recordSuccess();
            recordProviderSuccess(telemetryIdentity);
            return { result, keyIndex: k };
        }
        catch (err) {
            breaker.recordFailure();
            const msg = err instanceof Error ? err.message : String(err);
            const errorKind = classifyProviderError(err);
            recordProviderFailure(telemetryIdentity, errorKind, msg);
            if (errorKind === "quota") {
                logger.warn(`${providerLabel} key ${k + 1}/${apiKeys.length} (${apiKeys[k].owner}) rate limited for ${agentName}`);
                if (onQuota)
                    onQuota(apiKeys[k].owner, providerLabel);
            }
            else if (errorKind === "payload_too_large") {
                logger.warn(`${providerLabel} request too large for ${agentName}`, {
                    owner: apiKeys[k].owner,
                    model,
                    error: msg,
                });
                throw err;
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
    if (creds.groqApiKeys.length === 0
        && creds.geminiApiKeys.length === 0
        && creds.openRouterApiKeys.length === 0) {
        throw new Error(`No LLM API keys configured for agent: ${agentName}`);
    }
    const provider = {
        async chat(messages, tools, options) {
            const runGroqCascade = async () => {
                if (creds.groqApiKeys.length === 0) {
                    return null;
                }
                for (let t = 0; t < config.groqModelTiers.length; t++) {
                    const model = config.groqModelTiers[t];
                    const attempt = await tryWithKeys(creds.groqApiKeys, model, agentName, config, messages, tools, "groq", "standard", options, provider.onQuotaExhausted);
                    if (attempt) {
                        if (t > 0 || attempt.keyIndex > 0) {
                            const owner = creds.groqApiKeys[attempt.keyIndex].owner;
                            logger.info(`Served by Groq tier ${t + 1} (${model}), key ${attempt.keyIndex + 1} (${owner}) for ${agentName}`);
                        }
                        return attempt.result;
                    }
                }
                return null;
            };
            const runGeminiCascade = async (force = false) => {
                if (((!force && !config.geminiFallbackEnabled)) || creds.geminiApiKeys.length === 0) {
                    return null;
                }
                const route = selectGeminiRoute(messages, tools, config, options);
                logger.info("Gemini route selected", {
                    agentName,
                    model: route.model,
                    complexity: route.complexity,
                    reason: route.reason,
                });
                const attempt = await tryWithKeys(creds.geminiApiKeys, route.model, agentName, config, messages, tools, "gemini", "standard", options, provider.onQuotaExhausted);
                return attempt?.result ?? null;
            };
            const runOpenRouterCascade = async () => {
                if (creds.openRouterApiKeys.length === 0) {
                    return null;
                }
                const attempt = await tryWithKeys(creds.openRouterApiKeys, config.openRouterModel, agentName, config, messages, tools, "openrouter", "standard", options, provider.onQuotaExhausted);
                return attempt?.result ?? null;
            };
            if (config.llmProviderOverride === "groq") {
                logger.warn(`LLM provider override active for ${agentName}: Groq only`);
                const forcedGroq = await runGroqCascade();
                if (forcedGroq)
                    return forcedGroq;
                throw new Error(`Forced provider groq unavailable for ${agentName}.`);
            }
            if (config.llmProviderOverride === "gemini") {
                logger.warn(`LLM provider override active for ${agentName}: Gemini only`);
                const forcedGemini = await runGeminiCascade(true);
                if (forcedGemini)
                    return forcedGemini;
                throw new Error(`Forced provider gemini unavailable for ${agentName}.`);
            }
            if (config.llmProviderOverride === "openrouter") {
                logger.warn(`LLM provider override active for ${agentName}: OpenRouter only`);
                const forcedOpenRouter = await runOpenRouterCascade();
                if (forcedOpenRouter)
                    return forcedOpenRouter;
                throw new Error(`Forced provider openrouter unavailable for ${agentName}.`);
            }
            // Vertical cascade: iterate through model tiers
            const groqResult = await runGroqCascade();
            if (groqResult) {
                return groqResult;
            }
            // All Groq tiers × keys exhausted — cascade to Gemini
            const geminiResult = await runGeminiCascade();
            if (geminiResult) {
                if (creds.groqApiKeys.length > 0) {
                    logger.warn(`All Groq tiers exhausted for ${agentName}, Gemini served the request`);
                }
                return geminiResult;
            }
            // All Groq/Gemini fallbacks exhausted — cascade to OpenRouter
            if (creds.openRouterApiKeys.length > 0) {
                if (creds.groqApiKeys.length > 0 || creds.geminiApiKeys.length > 0) {
                    logger.warn(`All Groq/Gemini fallbacks exhausted for ${agentName}, cascading to OpenRouter`);
                }
                const openRouterResult = await runOpenRouterCascade();
                if (openRouterResult)
                    return openRouterResult;
            }
            logger.warn(`All configured LLM providers exhausted for ${agentName}`);
            throw new Error(`All LLM providers exhausted for ${agentName}. No keys available.`);
        },
        getTelemetrySnapshot: () => buildTelemetrySnapshot(agentName),
    };
    return provider;
}
/**
 * Premium cascade for commercial proposal generation.
 *
 * Unlike the standard provider, this route never uses the Gemini simple model.
 * It prefers the strongest configured commercial route first, which means the
 * Gemini complex model leads the cascade before Groq tiers and OpenRouter.
 */
export function getCommercialProposalProvider(config, agentName) {
    const creds = getAgentCredentials(config, agentName);
    if (creds.groqApiKeys.length === 0
        && creds.geminiApiKeys.length === 0
        && creds.openRouterApiKeys.length === 0) {
        throw new Error(`No LLM API keys configured for agent: ${agentName}`);
    }
    const provider = {
        async chat(messages, tools, options) {
            const runGroqCommercialCascade = async () => {
                if (creds.groqApiKeys.length === 0 || config.groqModelTiers.length === 0) {
                    return null;
                }
                for (let t = 0; t < config.groqModelTiers.length; t++) {
                    const model = config.groqModelTiers[t];
                    const attempt = await tryWithKeys(creds.groqApiKeys, model, agentName, config, messages, tools, "groq", "commercial", options, provider.onQuotaExhausted);
                    if (attempt) {
                        const owner = creds.groqApiKeys[attempt.keyIndex].owner;
                        logger.info("Commercial proposal routed via Groq", {
                            agentName,
                            model,
                            keyIndex: attempt.keyIndex,
                            owner,
                        });
                        return attempt.result;
                    }
                }
                return null;
            };
            const runGeminiCommercialCascade = async () => {
                if (creds.geminiApiKeys.length === 0) {
                    return null;
                }
                const model = config.geminiComplexModel;
                const attempt = await tryWithKeys(creds.geminiApiKeys, model, agentName, config, messages, tools, "gemini", "commercial", options, provider.onQuotaExhausted);
                if (attempt) {
                    const owner = creds.geminiApiKeys[attempt.keyIndex].owner;
                    logger.info("Commercial proposal routed via Gemini", {
                        agentName,
                        model,
                        keyIndex: attempt.keyIndex,
                        owner,
                    });
                    return attempt.result;
                }
                return null;
            };
            const runOpenRouterCommercialCascade = async () => {
                if (creds.openRouterApiKeys.length === 0) {
                    return null;
                }
                const attempt = await tryWithKeys(creds.openRouterApiKeys, config.openRouterModel, agentName, config, messages, tools, "openrouter", "commercial", options, provider.onQuotaExhausted);
                if (attempt) {
                    const owner = creds.openRouterApiKeys[attempt.keyIndex].owner;
                    logger.info("Commercial proposal routed via OpenRouter", {
                        agentName,
                        model: config.openRouterModel,
                        keyIndex: attempt.keyIndex,
                        owner,
                    });
                    return attempt.result;
                }
                return null;
            };
            if (config.llmProviderOverride === "groq") {
                logger.warn(`LLM provider override active for commercial proposal ${agentName}: Groq only`);
                const forcedGroq = await runGroqCommercialCascade();
                if (forcedGroq)
                    return forcedGroq;
                throw new Error(`Forced provider groq unavailable for commercial proposal ${agentName}.`);
            }
            if (config.llmProviderOverride === "gemini") {
                logger.warn(`LLM provider override active for commercial proposal ${agentName}: Gemini only`);
                const forcedGemini = await runGeminiCommercialCascade();
                if (forcedGemini)
                    return forcedGemini;
                throw new Error(`Forced provider gemini unavailable for commercial proposal ${agentName}.`);
            }
            if (config.llmProviderOverride === "openrouter") {
                logger.warn(`LLM provider override active for commercial proposal ${agentName}: OpenRouter only`);
                const forcedOpenRouter = await runOpenRouterCommercialCascade();
                if (forcedOpenRouter)
                    return forcedOpenRouter;
                throw new Error(`Forced provider openrouter unavailable for commercial proposal ${agentName}.`);
            }
            const geminiResult = await runGeminiCommercialCascade();
            if (geminiResult) {
                return geminiResult;
            }
            const groqResult = await runGroqCommercialCascade();
            if (groqResult) {
                if (creds.geminiApiKeys.length > 0) {
                    logger.warn(`Commercial Gemini unavailable for ${agentName}, Groq served the request`);
                }
                return groqResult;
            }
            if (creds.openRouterApiKeys.length > 0) {
                if (creds.groqApiKeys.length > 0 || creds.geminiApiKeys.length > 0) {
                    logger.warn(`All commercial model fallbacks exhausted for ${agentName}, cascading to OpenRouter`);
                }
                const openRouterResult = await runOpenRouterCommercialCascade();
                if (openRouterResult)
                    return openRouterResult;
            }
            logger.warn(`All configured commercial LLM providers exhausted for ${agentName}`);
            throw new Error(`All LLM providers exhausted for commercial proposal ${agentName}. No keys available.`);
        },
        getTelemetrySnapshot: () => buildTelemetrySnapshot(agentName),
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
        async chat(messages, tools, options) {
            const telemetryIdentity = {
                agentName,
                routeKind: "groq-direct",
                provider: "groq",
                model: config.groqModel,
                owner: creds.groqApiKeys[0].owner,
                keyIndex: 0,
                breakerKey: `groq-direct:${agentName}:${config.groqModel}:key0`,
            };
            recordProviderAttempt(telemetryIdentity);
            try {
                const response = await callGroq(messages, tools, options);
                recordProviderSuccess(telemetryIdentity);
                return response;
            }
            catch (error) {
                recordProviderFailure(telemetryIdentity, classifyProviderError(error), error instanceof Error ? error.message : String(error));
                throw error;
            }
        },
        getTelemetrySnapshot: () => buildTelemetrySnapshot(agentName),
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
        async chat(messages, tools, options) {
            const telemetryIdentity = {
                agentName,
                routeKind: "openrouter-direct",
                provider: "openrouter",
                model: config.openRouterModel,
                owner: creds.openRouterApiKeys[0].owner,
                keyIndex: 0,
                breakerKey: `openrouter-direct:${agentName}:${config.openRouterModel}:key0`,
            };
            recordProviderAttempt(telemetryIdentity);
            try {
                const response = await callOpenRouter(messages, tools, options);
                recordProviderSuccess(telemetryIdentity);
                return response;
            }
            catch (error) {
                recordProviderFailure(telemetryIdentity, classifyProviderError(error), error instanceof Error ? error.message : String(error));
                throw error;
            }
        },
        getTelemetrySnapshot: () => buildTelemetrySnapshot(agentName),
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
        async chat(messages, tools, options) {
            // Try vision model with all available keys
            const attempt = await tryWithKeys(creds.groqApiKeys, config.groqModelVision, agentName, config, messages, tools, "groq", "vision", options, standardProvider.onQuotaExhausted);
            if (attempt)
                return attempt.result;
            // Vision exhausted — fall back to standard cascade (which has no vision capability)
            logger.warn(`Vision model exhausted for ${agentName}, falling back to standard cascade`);
            return standardProvider.chat(messages, tools, options);
        },
        getTelemetrySnapshot: () => buildTelemetrySnapshot(agentName),
    };
}
