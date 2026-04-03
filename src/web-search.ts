export type WebSearchProvider = "auto" | "brave" | "tavily" | "gemini";
export type ActiveWebSearchProvider = Exclude<WebSearchProvider, "auto">;

export interface WebSearchSettings {
  enabled: boolean;
  provider: WebSearchProvider;
  braveApiKey: string;
  tavilyApiKey: string;
  geminiApiKey: string;
  geminiModel: string;
}

const EXPLICIT_SEARCH_MARKERS = [
  "busca",
  "buscar",
  "busqueda",
  "busqueda web",
  "busqueda en internet",
  "busqueda en la web",
  "busqueda online",
  "investiga",
  "investigar",
  "investigacion",
  "googlea",
  "search",
  "look up",
  "browse",
  "verifica",
  "verificar",
  "fact check",
  "fuentes",
  "sources",
  "source",
  "cita fuentes",
  "consulta fuentes",
  "revisa fuentes",
  "en internet",
  "en la web",
  "en google",
];

const FRESHNESS_MARKERS = [
  "hoy",
  "ahora",
  "actual",
  "actualmente",
  "ultimo",
  "ultima",
  "ultimos",
  "ultimas",
  "latest",
  "recent",
  "current",
  "reciente",
  "recién",
  "news",
  "noticias",
  "precio",
  "precios",
  "cotizacion",
  "cotizacion",
  "cotización",
  "tendencia",
  "ceo actual",
  "lanzamiento",
  "release date",
];

const SOURCE_VERIFICATION_MARKERS = [
  "fuente",
  "fuentes",
  "source",
  "sources",
  "evidencia",
  "evidence",
  "confirmar",
  "confirmalo",
  "confirmalo con fuentes",
  "contrastalo",
  "contrastalo con fuentes",
  "verifica si es cierto",
  "verifica esto",
];

const DIRECT_WEB_MARKERS = [
  "site:",
  "http://",
  "https://",
  ".com",
  ".org",
  ".io",
  ".ai",
  ".gov",
  ".edu",
];

const TIME_UTILITY_MARKERS = [
  "que hora es",
  "qué hora es",
  "hora en",
  "time in",
  "fecha actual",
  "fecha de hoy",
  "today date",
  "timezone",
  "zona horaria",
];

function parseBooleanEnv(value: string | undefined, defaultValue: boolean): boolean {
  if (value == null || !value.trim()) {
    return defaultValue;
  }

  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

function includesAnyKeyword(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(normalizeWebSearchText(keyword)));
}

export function normalizeWebSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s:/.-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseWebSearchProvider(value: string | undefined): WebSearchProvider {
  const normalized = value?.trim().toLowerCase();
  if (normalized === "brave" || normalized === "tavily" || normalized === "gemini") {
    return normalized;
  }

  return "auto";
}

function readDistinctNonEmpty(values: Array<string | undefined>): string[] {
  const seen = new Set<string>();
  return values
    .map((value) => value?.trim() ?? "")
    .filter((value) => {
      if (!value || seen.has(value)) {
        return false;
      }

      seen.add(value);
      return true;
    });
}

function collectGeminiApiKeys(
  env: Record<string, string | undefined>,
): string[] {
  const direct = readDistinctNonEmpty([
    env.GEMINI_API_KEY,
    env.GEMINI_API_KEY_PRISTINO,
    env.GEMINI_API_KEY_DEONTO,
  ]);

  const ranked = Object.entries(env)
    .flatMap(([envName, rawValue]) => {
      const match = envName.match(/^GEMINI_API_KEY_(PRISTINO|DEONTO)_(\d+)_/i);
      const value = rawValue?.trim() ?? "";
      if (!match || !value) {
        return [];
      }

      const agentRank = match[1].toUpperCase() === "PRISTINO" ? 0 : 100;
      const priority = Number.parseInt(match[2], 10);
      return [{
        rank: agentRank + (Number.isFinite(priority) ? priority : 999),
        value,
      }];
    })
    .sort((left, right) => left.rank - right.rank)
    .map((entry) => entry.value);

  return readDistinctNonEmpty([...direct, ...ranked]);
}

function resolveGeminiWebSearchModel(
  env: Record<string, string | undefined>,
): string {
  const candidates = [
    env.GEMINI_WEB_SEARCH_MODEL,
    env.GEMINI_SIMPLE_MODEL,
    env.GEMINI_MODEL,
  ]
    .map((value) => value?.trim() ?? "")
    .filter(Boolean);

  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    if (!normalized.includes("preview") && !normalized.includes("exp")) {
      return candidate;
    }
  }

  return "gemini-2.5-flash";
}

export function resolveWebSearchSettings(
  env: Record<string, string | undefined> = process.env,
): WebSearchSettings {
  const braveApiKey = env.BRAVE_SEARCH_API_KEY?.trim() ?? "";
  const tavilyApiKey = env.TAVILY_API_KEY?.trim() ?? "";
  const geminiApiKey = collectGeminiApiKeys(env)[0] ?? "";
  const hasAnyProviderKey = Boolean(braveApiKey || tavilyApiKey || geminiApiKey);

  return {
    enabled: parseBooleanEnv(env.WEB_SEARCH_ENABLED, hasAnyProviderKey),
    provider: parseWebSearchProvider(env.WEB_SEARCH_PROVIDER),
    braveApiKey,
    tavilyApiKey,
    geminiApiKey,
    geminiModel: resolveGeminiWebSearchModel(env),
  };
}

export function resolveActiveWebSearchProvider(
  settings: WebSearchSettings,
): ActiveWebSearchProvider | null {
  if (!settings.enabled) {
    return null;
  }

  if (settings.provider === "brave") {
    return settings.braveApiKey ? "brave" : null;
  }

  if (settings.provider === "tavily") {
    return settings.tavilyApiKey ? "tavily" : null;
  }

  if (settings.provider === "gemini") {
    return settings.geminiApiKey ? "gemini" : null;
  }

  if (settings.braveApiKey) {
    return "brave";
  }

  if (settings.tavilyApiKey) {
    return "tavily";
  }

  if (settings.geminiApiKey) {
    return "gemini";
  }

  return null;
}

export function getWebSearchIssues(settings: WebSearchSettings): string[] {
  const issues: string[] = [];
  if (!settings.enabled) {
    issues.push("Web search is disabled in the current runtime");
    return issues;
  }

  if (settings.provider === "brave" && !settings.braveApiKey) {
    issues.push("WEB_SEARCH_PROVIDER=brave requires BRAVE_SEARCH_API_KEY");
  } else if (settings.provider === "tavily" && !settings.tavilyApiKey) {
    issues.push("WEB_SEARCH_PROVIDER=tavily requires TAVILY_API_KEY");
  } else if (settings.provider === "gemini" && !settings.geminiApiKey) {
    issues.push("WEB_SEARCH_PROVIDER=gemini requires a configured GEMINI_API_KEY* value");
  } else if (!settings.braveApiKey && !settings.tavilyApiKey && !settings.geminiApiKey) {
    issues.push("No web search provider credential is configured");
  }

  return issues;
}

export function shouldPreferInternetResearch(text: string): boolean {
  const normalized = normalizeWebSearchText(text);
  if (!normalized) {
    return false;
  }

  const explicitSearch = includesAnyKeyword(normalized, EXPLICIT_SEARCH_MARKERS);
  if (explicitSearch) {
    return true;
  }

  if (includesAnyKeyword(normalized, TIME_UTILITY_MARKERS)) {
    return false;
  }

  if (includesAnyKeyword(normalized, DIRECT_WEB_MARKERS)) {
    return true;
  }

  const freshness = includesAnyKeyword(normalized, FRESHNESS_MARKERS);
  const sourceVerification = includesAnyKeyword(normalized, SOURCE_VERIFICATION_MARKERS);
  return freshness || sourceVerification;
}

export function isInternetSearchQueryAllowed(query: string): boolean {
  const normalized = normalizeWebSearchText(query);
  if (!normalized) {
    return false;
  }

  if (includesAnyKeyword(normalized, TIME_UTILITY_MARKERS)) {
    return false;
  }

  if (includesAnyKeyword(normalized, EXPLICIT_SEARCH_MARKERS)) {
    return true;
  }

  if (includesAnyKeyword(normalized, DIRECT_WEB_MARKERS)) {
    return true;
  }

  return (
    includesAnyKeyword(normalized, FRESHNESS_MARKERS)
    || includesAnyKeyword(normalized, SOURCE_VERIFICATION_MARKERS)
  );
}

export function buildInternetResearchResponseContract(text: string): string | null {
  if (!shouldPreferInternetResearch(text)) {
    return null;
  }

  return [
    "Contrato de uso de internet para esta solicitud.",
    "Si la respuesta depende de informacion publica actual, verificacion externa o fuentes recientes, delega al researcher y usa search_internet.",
    "No uses search_internet para hechos estables, hora/fecha, memoria interna ni conocimiento operativo ya disponible en el KB.",
    "Si search_internet no esta configurada o falla, dilo explicitamente y responde con el mejor contexto disponible sin inventar fuentes.",
    "Cuando uses search_internet, cita entre 2 y 5 URLs relevantes en la respuesta final.",
  ].join("\n");
}
