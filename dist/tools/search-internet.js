import { logger } from "../logger.js";
import { getWebSearchIssues, isInternetSearchQueryAllowed, resolveActiveWebSearchProvider, resolveWebSearchSettings, } from "../web-search.js";
const MAX_QUERY_CHARS = 256;
const DEFAULT_RESULTS = 5;
const MAX_RESULTS = 8;
const FETCH_TIMEOUT_MS = 15_000;
const CANONICAL_URL_TIMEOUT_MS = 7_500;
export const definition = {
    type: "function",
    function: {
        name: "search_internet",
        description: "Search the public internet for current or external information. Use only when the user explicitly asks to search, verify sources, or when the answer depends on public information that may have changed recently.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Search query to execute on the public web.",
                },
                max_results: {
                    type: "number",
                    description: "Maximum number of search results to return. Defaults to 5 and caps at 8.",
                },
                freshness: {
                    type: "string",
                    description: "Optional freshness window. Supported values: 24h, 7d, 31d, 365d.",
                },
            },
            required: ["query"],
        },
    },
};
function cleanText(value, maxLength = 320) {
    const text = typeof value === "string" ? value : "";
    return text
        .normalize("NFKC")
        .replace(/[\x00-\x1F\x7F]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, maxLength);
}
function cleanQuery(value) {
    return cleanText(value, MAX_QUERY_CHARS);
}
function clampResults(value) {
    const raw = typeof value === "number" ? value : Number(value);
    if (!Number.isFinite(raw) || raw <= 0) {
        return DEFAULT_RESULTS;
    }
    return Math.min(MAX_RESULTS, Math.max(1, Math.floor(raw)));
}
function parseFreshness(value) {
    const normalized = typeof value === "string" ? value.trim().toLowerCase() : "";
    if (normalized === "24h"
        || normalized === "7d"
        || normalized === "31d"
        || normalized === "365d") {
        return normalized;
    }
    return null;
}
function mapBraveFreshness(value) {
    if (value === "24h")
        return "pd";
    if (value === "7d")
        return "pw";
    if (value === "31d")
        return "pm";
    if (value === "365d")
        return "py";
    return null;
}
function inferSource(url) {
    try {
        const hostname = new URL(url).hostname.replace(/^www\./, "");
        return hostname || null;
    }
    catch {
        return null;
    }
}
function normalizePublishedAt(value) {
    if (typeof value !== "string" || !value.trim()) {
        return null;
    }
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        return value.trim();
    }
    return new Date(parsed).toISOString();
}
function describeFreshnessForPrompt(freshness) {
    if (freshness === "24h")
        return "Prioritize sources from the last 24 hours when possible.";
    if (freshness === "7d")
        return "Prioritize sources from the last 7 days when possible.";
    if (freshness === "31d")
        return "Prioritize sources from the last 31 days when possible.";
    if (freshness === "365d")
        return "Prioritize sources from the last 365 days when possible.";
    return "Prioritize the most relevant public web sources.";
}
async function fetchJson(url, init) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            ...init,
            signal: controller.signal,
            headers: {
                "user-agent": "NexusBot/1.0 (+https://metodologia.info)",
                ...(init.headers ?? {}),
            },
        });
        if (!response.ok) {
            const body = await response.text().catch(() => "");
            throw new Error(`HTTP ${response.status}: ${cleanText(body, 240) || response.statusText}`);
        }
        return await response.json();
    }
    finally {
        clearTimeout(timeout);
    }
}
function buildGeminiSupportSnippets(supports) {
    const snippetsByChunk = new Map();
    for (const support of supports) {
        const snippet = cleanText(support.segment?.text ?? "", 260);
        if (!snippet) {
            continue;
        }
        const chunkIndices = Array.isArray(support.groundingChunkIndices)
            ? support.groundingChunkIndices.filter((value) => Number.isInteger(value) && value >= 0)
            : [];
        for (const chunkIndex of chunkIndices) {
            const existing = snippetsByChunk.get(chunkIndex) ?? [];
            if (!existing.includes(snippet)) {
                existing.push(snippet);
            }
            snippetsByChunk.set(chunkIndex, existing);
        }
    }
    return snippetsByChunk;
}
function isGroundingRedirectUrl(url) {
    try {
        const parsed = new URL(url);
        return (parsed.hostname === "vertexaisearch.cloud.google.com"
            && parsed.pathname.startsWith("/grounding-api-redirect/"));
    }
    catch {
        return false;
    }
}
async function resolveCanonicalUrl(url) {
    const urlValue = cleanText(url, 800);
    if (!urlValue || !isGroundingRedirectUrl(urlValue)) {
        return urlValue;
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), CANONICAL_URL_TIMEOUT_MS);
    try {
        const response = await fetch(urlValue, {
            method: "GET",
            redirect: "follow",
            signal: controller.signal,
            headers: {
                "user-agent": "NexusBot/1.0 (+https://metodologia.info)",
            },
        });
        void response.body?.cancel?.();
        return cleanText(response.url, 800) || urlValue;
    }
    catch {
        return urlValue;
    }
    finally {
        clearTimeout(timeout);
    }
}
async function runBraveSearch(query, maxResults, freshness, apiKey) {
    const url = new URL("https://api.search.brave.com/res/v1/web/search");
    url.searchParams.set("q", query);
    url.searchParams.set("count", String(maxResults));
    url.searchParams.set("safesearch", "moderate");
    const mappedFreshness = mapBraveFreshness(freshness);
    if (mappedFreshness) {
        url.searchParams.set("freshness", mappedFreshness);
    }
    const payload = await fetchJson(url.toString(), {
        method: "GET",
        headers: {
            accept: "application/json",
            "x-subscription-token": apiKey,
        },
    });
    const results = Array.isArray(payload.web?.results) ? payload.web.results : [];
    return results
        .flatMap((result) => {
        const urlValue = cleanText(result.url, 800);
        const snippet = cleanText(result.description || result.extra_snippets?.find((value) => typeof value === "string") || "");
        if (!urlValue) {
            return [];
        }
        return [{
                title: cleanText(result.title, 180) || urlValue,
                url: urlValue,
                snippet,
                source: inferSource(urlValue),
                publishedAt: normalizePublishedAt(result.page_age ?? result.age ?? null),
                score: null,
            }];
    })
        .slice(0, maxResults);
}
async function runTavilySearch(query, maxResults, apiKey) {
    const payload = await fetchJson("https://api.tavily.com/search", {
        method: "POST",
        headers: {
            accept: "application/json",
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            query,
            max_results: maxResults,
            search_depth: "basic",
            include_answer: false,
            include_images: false,
            include_raw_content: false,
        }),
    });
    const results = Array.isArray(payload.results) ? payload.results : [];
    return results
        .flatMap((result) => {
        const urlValue = cleanText(result.url, 800);
        if (!urlValue) {
            return [];
        }
        return [{
                title: cleanText(result.title, 180) || urlValue,
                url: urlValue,
                snippet: cleanText(result.content || result.raw_content || ""),
                source: inferSource(urlValue),
                publishedAt: normalizePublishedAt(result.published_date ?? null),
                score: typeof result.score === "number" ? Number(result.score.toFixed(4)) : null,
            }];
    })
        .slice(0, maxResults);
}
async function runGeminiSearch(query, maxResults, freshness, apiKey, model) {
    const payload = await fetchJson(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "content-type": "application/json",
            "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
            contents: [{
                    role: "user",
                    parts: [{
                            text: [
                                "Search the public web for the user's request using Google Search grounding.",
                                describeFreshnessForPrompt(freshness),
                                "Respond with source-backed findings and cite relevant sources in the answer.",
                                `User query: ${query}`,
                            ].join("\n"),
                        }],
                }],
            tools: [{ google_search: {} }],
        }),
    });
    const candidate = Array.isArray(payload.candidates) ? payload.candidates[0] : null;
    const groundingChunks = Array.isArray(candidate?.groundingMetadata?.groundingChunks)
        ? candidate.groundingMetadata.groundingChunks
        : [];
    const groundingSupports = Array.isArray(candidate?.groundingMetadata?.groundingSupports)
        ? candidate.groundingMetadata.groundingSupports
        : [];
    const snippetsByChunk = buildGeminiSupportSnippets(groundingSupports);
    const resolvedUrls = new Map();
    const seenUrls = new Set();
    const results = [];
    for (let index = 0; index < groundingChunks.length && results.length < maxResults; index += 1) {
        const chunk = groundingChunks[index];
        const redirectUrl = cleanText(chunk.web?.uri ?? "", 800);
        if (!redirectUrl) {
            continue;
        }
        let canonicalUrl = resolvedUrls.get(redirectUrl);
        if (!canonicalUrl) {
            canonicalUrl = await resolveCanonicalUrl(redirectUrl);
            resolvedUrls.set(redirectUrl, canonicalUrl);
        }
        const dedupeKey = canonicalUrl || redirectUrl;
        if (!dedupeKey || seenUrls.has(dedupeKey)) {
            continue;
        }
        seenUrls.add(dedupeKey);
        const snippet = cleanText((snippetsByChunk.get(index) ?? []).join(" "), 320);
        const finalUrl = canonicalUrl || redirectUrl;
        results.push({
            title: cleanText(chunk.web?.title ?? "", 180) || inferSource(finalUrl) || finalUrl,
            url: finalUrl,
            snippet,
            source: inferSource(finalUrl),
            publishedAt: null,
            score: null,
        });
    }
    return results;
}
function buildPayload(partial) {
    return JSON.stringify({
        ...partial,
        retrievedAt: new Date().toISOString(),
    }, null, 2);
}
export async function execute(args) {
    const query = cleanQuery(args.query);
    const maxResults = clampResults(args.max_results);
    const freshness = parseFreshness(args.freshness);
    if (!query) {
        return buildPayload({
            status: "blocked",
            provider: null,
            query: "",
            freshness,
            message: "search_internet requires a non-empty query.",
            results: [],
        });
    }
    if (!isInternetSearchQueryAllowed(query)) {
        return buildPayload({
            status: "blocked",
            provider: null,
            query,
            freshness,
            message: "search_internet should be used only for explicit web research, source verification, or current external information requests.",
            results: [],
        });
    }
    const settings = resolveWebSearchSettings();
    const issues = getWebSearchIssues(settings);
    const provider = resolveActiveWebSearchProvider(settings);
    if (!settings.enabled) {
        return buildPayload({
            status: "disabled",
            provider,
            query,
            freshness,
            issues,
            message: "Web search is disabled in this runtime.",
            results: [],
        });
    }
    if (!provider) {
        return buildPayload({
            status: "not_configured",
            provider: null,
            query,
            freshness,
            issues,
            message: "Web search is not configured yet. Configure BRAVE_SEARCH_API_KEY, TAVILY_API_KEY, or make sure GEMINI_API_KEY_* is materialized and optionally set WEB_SEARCH_PROVIDER.",
            results: [],
        });
    }
    logger.info("Web search requested", {
        query,
        maxResults,
        freshness,
        provider,
        model: provider === "gemini" ? settings.geminiModel : undefined,
    });
    try {
        const results = provider === "brave"
            ? await runBraveSearch(query, maxResults, freshness, settings.braveApiKey)
            : provider === "tavily"
                ? await runTavilySearch(query, maxResults, settings.tavilyApiKey)
                : await runGeminiSearch(query, maxResults, freshness, settings.geminiApiKey, settings.geminiModel);
        if (results.length === 0) {
            logger.info("Web search returned no results", { query, provider });
            return buildPayload({
                status: "no_results",
                provider,
                query,
                freshness,
                results: [],
            });
        }
        logger.info("Web search executed", {
            query,
            provider,
            resultCount: results.length,
        });
        return buildPayload({
            status: "ok",
            provider,
            query,
            freshness,
            results,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        logger.error("Web search provider failed", {
            provider,
            query,
            error: message,
        });
        return buildPayload({
            status: "error",
            provider,
            query,
            freshness,
            message,
            results: [],
        });
    }
}
