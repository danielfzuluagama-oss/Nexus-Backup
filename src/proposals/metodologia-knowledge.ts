import { setTimeout as delay } from "timers/promises";

export interface MetodologiaServiceSummary {
  title: string;
  description: string;
  source: string;
}

export interface MetodologiaFounder {
  name: string;
  title: string;
  bio: string;
}

export interface MetodologiaKnowledge {
  services: MetodologiaServiceSummary[];
  resources: MetodologiaServiceSummary[];
  founders: MetodologiaFounder[];
  fetchedAt: Date;
}

type Fetcher = (url: string) => Promise<string>;

const METODOLOGIA_ENDPOINTS = {
  services: "https://metodologia.info/servicios/index",
  resources: "https://metodologia.info/recursos/index",
  founders: "https://metodologia.info/nosotros/index",
} as const;

const FALLBACK_FOUNDERS: MetodologiaFounder[] = [
  {
    name: "Daniel Zuluaga",
    title: "Chief Efficiency Officer",
    bio: "Optimización y Eficiencia Operativa. Optimizador de procesos que transforma la complejidad en eficiencia. Especialista en identificar oportunidades de mejora y diseñar sistemas que maximizan el rendimiento mientras minimizan el esfuerzo, combinando análisis profundo con soluciones prácticas.",
  },
  {
    name: "Germán Eliécer Sepúlveda",
    title: "Chief Ecosystem Officer",
    bio: "Ecosistemas y Alianzas. Constructor de ecosistemas que conectan talento, visión y propósito. Especialista en desarrollar comunidades estratégicas y alianzas que multiplican el impacto organizacional, transformando conexiones en capacidades sostenibles.",
  },
  {
    name: "Javier Montaño",
    title: "Chief Empowerment Officer",
    bio: "(R)Evolución Estratégica. Diseñador de sistemas y metodologías que convierten potencial en resultados. Especialista en integración estratégica de IA y metodologías de alto rendimiento, diseñando soluciones que empoderan para lograr soberanía estratégica.",
  },
  {
    name: "Katherine Oquendo",
    title: "Chief Enablement Officer",
    bio: "Entornos Habilitadores y Experiencia. Líder que cree en la presencia antes que la velocidad. Especialista en crear entornos donde las personas pueden hacer su mejor trabajo, combinando metodologías probadas con empatía auténtica.",
  },
];

let cachedKnowledgePromise: Promise<MetodologiaKnowledge> | null = null;

async function defaultFetch(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Fetch failed ${res.status} for ${url}`);
  }
  return res.text();
}

function compactWhitespace(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/\u202f/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeForMatch(value: string): string {
  return compactWhitespace(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function extractTitle(html: string): string {
  const title = html.match(/<title>([^<]{3,200})<\/title>/i);
  return title?.[1]?.trim() ?? "";
}

function extractMetaDescription(html: string): string {
  const meta =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i);
  return meta?.[1]?.trim() ?? "";
}

function extractJsonLdDocuments(html: string): unknown[] {
  const matches = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const documents: unknown[] = [];

  for (const match of matches) {
    const raw = match[1].trim();
    if (!raw) continue;

    try {
      const parsed = JSON.parse(raw);
      documents.push(...(Array.isArray(parsed) ? parsed : [parsed]));
    } catch {
      // Ignore malformed JSON-LD blocks and keep parsing the rest.
    }
  }

  return documents;
}

function htmlToVisibleLines(html: string): string[] {
  const text = html
    .replace(/<!--[\s\S]*?-->/g, "\n")
    .replace(/<script[\s\S]*?<\/script>/gi, "\n")
    .replace(/<style[\s\S]*?<\/style>/gi, "\n")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "\n")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "\n")
    .replace(/<img[^>]*>/gi, "\n")
    .replace(/<\/(?:p|div|section|article|header|footer|nav|main|aside|li|ul|ol|h[1-6]|tr|td|th)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return text
    .split("\n")
    .map((line) => compactWhitespace(line))
    .filter(Boolean);
}

function toTypeList(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.filter((entry): entry is string => typeof entry === "string");
  return [];
}

function stringifyMaybe(value: unknown): string {
  if (typeof value === "string") return compactWhitespace(value);
  if (typeof value === "number") return String(value);
  return "";
}

function formatOfferSummary(offers: unknown): string {
  if (!isRecord(offers)) return "";

  const price = stringifyMaybe(offers.price);
  const currency = stringifyMaybe(offers.priceCurrency);
  if (!price && !currency) return "";

  if (price && currency) {
    const normalizedPrice = Number(price);
    const formattedPrice = Number.isFinite(normalizedPrice)
      ? new Intl.NumberFormat("es-CO").format(normalizedPrice)
      : price;
    return `${currency} ${formattedPrice}`;
  }

  return price || currency;
}

function extractPersonCandidates(documents: unknown[]): MetodologiaFounder[] {
  const candidates = new Map<string, MetodologiaFounder>();

  const pushCandidate = (record: unknown): void => {
    if (!isRecord(record)) return;

    const name = stringifyMaybe(record.name);
    if (!name) return;

    const title = stringifyMaybe(record.jobTitle || record.title || record.description) || "Fundador MetodologIA";
    const bio = stringifyMaybe(record.description || record.bio || record.about);
    const key = normalizeForMatch(name);

    if (!candidates.has(key)) {
      candidates.set(key, {
        name,
        title,
        bio,
      });
    }
  };

  for (const document of documents) {
    if (!isRecord(document)) continue;

    const types = toTypeList(document["@type"]).map(normalizeForMatch);
    const isAboutPage = types.some((type) => type.includes("aboutpage"));
    const isOrganization = types.some((type) => type.includes("organization"));
    const isPerson = types.some((type) => type.includes("person"));

    if (isPerson) {
      pushCandidate(document);
    }

    if (isAboutPage || isOrganization) {
      const mainEntity = document.mainEntity;
      if (isRecord(mainEntity)) {
        if (Array.isArray(mainEntity.member)) {
          mainEntity.member.forEach(pushCandidate);
        } else {
          pushCandidate(mainEntity.member);
        }

        if (Array.isArray(mainEntity.founder)) {
          mainEntity.founder.forEach(pushCandidate);
        } else {
          pushCandidate(mainEntity.founder);
        }
      }

      if (Array.isArray(document.member)) {
        document.member.forEach(pushCandidate);
      } else {
        pushCandidate(document.member);
      }

      if (Array.isArray(document.founder)) {
        document.founder.forEach(pushCandidate);
      } else {
        pushCandidate(document.founder);
      }
    }
  }

  return [...candidates.values()];
}

function collectFounderBio(
  visibleLines: string[],
  name: string,
  title: string,
  allFounderNames: string[],
): string {
  const nameIndex = visibleLines.findIndex((line) => normalizeForMatch(line) === normalizeForMatch(name));
  if (nameIndex === -1) return "";

  const stopMarkers = new Set([
    "areas de expertise",
    "su filosofia de liderazgo",
    "comunidad",
    "modelo de servicio embajadores",
    "propósito",
    "nuestro equipo",
    "service model",
    "team",
    "equipo",
    "cierre comercial",
    "solicitar discovery",
  ]);
  const titleMarker = normalizeForMatch(title);
  const otherFounders = new Set(allFounderNames.map((founder) => normalizeForMatch(founder)));
  const collected: string[] = [];

  for (let index = nameIndex + 1; index < visibleLines.length; index++) {
    const line = visibleLines[index];
    const normalized = normalizeForMatch(line);

    if (!line) continue;
    if (normalized === "ceo") continue;
    if (normalized === titleMarker) continue;
    if (otherFounders.has(normalized) && normalized !== normalizeForMatch(name)) break;
    if ([...stopMarkers].some((marker) => normalized.includes(marker))) break;

    collected.push(line);
    if (collected.join(" ").length >= 320) break;
  }

  return compactWhitespace(collected.join(" "));
}

function extractFounders(html: string, documents: unknown[]): MetodologiaFounder[] {
  const visibleLines = htmlToVisibleLines(html);
  const candidates = extractPersonCandidates(documents);
  const allNames = candidates.map((candidate) => candidate.name);

  const founders = candidates.map((candidate) => {
    const bio = collectFounderBio(visibleLines, candidate.name, candidate.title, allNames)
      || candidate.bio
      || candidate.title;

    return {
      name: candidate.name,
      title: candidate.title,
      bio,
    };
  });

  if (founders.length > 0) {
    return founders.slice(0, 8);
  }

  return FALLBACK_FOUNDERS;
}

function extractServices(html: string, documents: unknown[]): MetodologiaServiceSummary[] {
  const services: MetodologiaServiceSummary[] = [];

  for (const document of documents) {
    if (!isRecord(document)) continue;

    const types = toTypeList(document["@type"]).map(normalizeForMatch);
    const isItemList = types.some((type) => type.includes("itemlist"));
    if (!isItemList || !Array.isArray(document.itemListElement)) continue;

    for (const entry of document.itemListElement) {
      if (!isRecord(entry)) continue;
      const item = isRecord(entry.item) ? entry.item : entry;
      if (!isRecord(item)) continue;

      const title = stringifyMaybe(item.name);
      if (!title) continue;

      const description = compactWhitespace([
        stringifyMaybe(item.description),
        formatOfferSummary(item.offers),
      ].filter(Boolean).join(" · "));

      services.push({
        title,
        description: description || "Servicio publicado por MetodologIA.",
        source: METODOLOGIA_ENDPOINTS.services,
      });
    }
  }

  if (services.length > 0) {
    return services.slice(0, 8);
  }

  return [{
    title: extractTitle(html) || "Catálogo de Servicios MetodologIA",
    description: extractMetaDescription(html) || "Servicios de workshops, bootcamps y consultoría potenciados con IA.",
    source: METODOLOGIA_ENDPOINTS.services,
  }];
}

function extractResources(html: string, documents: unknown[]): MetodologiaServiceSummary[] {
  const resources: MetodologiaServiceSummary[] = [];

  for (const document of documents) {
    if (!isRecord(document)) continue;

    const types = toTypeList(document["@type"]).map(normalizeForMatch);
    const isCollectionPage = types.some((type) => type.includes("collectionpage"));
    if (!isCollectionPage || !Array.isArray(document.hasPart)) continue;

    for (const entry of document.hasPart) {
      if (!isRecord(entry)) continue;

      const title = stringifyMaybe(entry.name);
      if (!title) continue;

      const description = stringifyMaybe(entry.description) || "Valor agregado publicado por MetodologIA.";

      resources.push({
        title,
        description,
        source: METODOLOGIA_ENDPOINTS.resources,
      });
    }
  }

  if (resources.length > 0) {
    return resources.slice(0, 8);
  }

  return [{
    title: extractTitle(html) || "Recursos MetodologIA",
    description: extractMetaDescription(html) || "Recursos y valores agregados publicados por MetodologIA.",
    source: METODOLOGIA_ENDPOINTS.resources,
  }];
}

export async function loadMetodologiaKnowledge(fetcher: Fetcher = defaultFetch): Promise<MetodologiaKnowledge> {
  if (cachedKnowledgePromise) {
    return cachedKnowledgePromise;
  }

  cachedKnowledgePromise = (async () => {
    // Basic retry to avoid transient TLS hiccups
    const tryFetch = async (url: string, attempts = 2): Promise<string> => {
      for (let i = 0; i < attempts; i++) {
        try {
          return await fetcher(url);
        } catch (error) {
          if (i === attempts - 1) throw error;
          await delay(150);
        }
      }

      throw new Error(`Unreachable code for ${url}`);
    };

    const [servicesHtml, resourcesHtml, foundersHtml] = await Promise.all([
      tryFetch(METODOLOGIA_ENDPOINTS.services),
      tryFetch(METODOLOGIA_ENDPOINTS.resources),
      tryFetch(METODOLOGIA_ENDPOINTS.founders),
    ]);
    const serviceDocuments = extractJsonLdDocuments(servicesHtml);
    const resourceDocuments = extractJsonLdDocuments(resourcesHtml);
    const founderDocuments = extractJsonLdDocuments(foundersHtml);

    return {
      services: extractServices(servicesHtml, serviceDocuments),
      resources: extractResources(resourcesHtml, resourceDocuments),
      founders: extractFounders(foundersHtml, founderDocuments),
      fetchedAt: new Date(),
    };
  })();

  return cachedKnowledgePromise;
}
