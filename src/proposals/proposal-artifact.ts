import type { ExecutionPack, KnowledgeChunk } from "../knowledge/operational-kb.js";
import type { ProposalProcessCatalogItem } from "./operational-catalog.js";
import { parseProposalDraft, type ProposalDraft } from "./proposal-draft.js";
import {
  renderProposalTemplate,
  type ProposalTemplateMetric,
  type ProposalTemplateModel,
  type ProposalTemplateReference,
} from "./proposal-template.js";

export interface ProposalStageSection {
  title: string;
  body: string;
}

export interface ProposalKnowledgeContext {
  serviceName?: string;
  intake?: {
    clientName?: string | null;
    serviceName?: string | null;
    objective?: string | null;
    geography?: string | null;
    scope?: string | null;
    timeline?: string | null;
    investment?: string | null;
    nextStep?: string | null;
  };
  executionPack?: ExecutionPack | null;
  evidence?: KnowledgeChunk[];
  internalProcessCatalog?: ProposalProcessCatalogItem[];
  metodologia?: {
    services: { title: string; description: string; source: string }[];
    resources: { title: string; description: string; source: string }[];
    founders: { name: string; title: string; bio: string }[];
    fetchedAt?: Date;
  };
  metodologiaReady?: boolean;
  threadMemoryContext?: string;
  semanticMemoryContext?: string;
  requestedByFounder?: string | null;
}

export interface ProposalArtifact {
  clientName: string;
  clientSlug: string;
  serviceName: string;
  processName: string;
  requestDate: string;
  folderName: string;
  repoPath: string;
  fileName: string;
  html: string;
  sections: ProposalStageSection[];
}

const CLIENT_PLACEHOLDER_NAME = "Cliente por confirmar";
const CLIENT_PLACEHOLDER_SLUG = "cliente-por-confirmar";
const SERVICE_PLACEHOLDER_NAME = "Propuesta de servicios MetodologIA";
const PROCESS_PLACEHOLDER_NAME = "Proceso por precisar";
const FALLBACK_DELIVERABLES = [
  "Documento comercial estructurado en HTML",
  "Ruta de implementación por etapas",
  "Siguiente paso recomendado para activación",
];
const FALLBACK_STEPS = [
  "Discovery y aterrizaje de contexto",
  "Diseño de la solución y del alcance comercial",
  "Activación del siguiente paso con responsables definidos",
];
const SERVICE_PHRASE_PATTERNS = [
  /\b(cao bootcamp(?: chief agentic officer)?)\b/i,
  /\b(programa de empoderamiento)\b/i,
  /\b(workshop(?: zero risk)?)\b/i,
  /\b(asistentes? personalizados?)\b/i,
  /\b(desarrollo de agentes?)\b/i,
  /\b(desarrollo de software con ia)\b/i,
  /\b(automatizacion inteligente|automatización inteligente)\b/i,
  /\b(implementacion agentica|implementación agéntica)\b/i,
  /\b(notebooklm|segundo cerebro)\b/i,
  /\b(discovery)\b/i,
  /\b(consultoria estrategica|consultoría estratégica)\b/i,
];
const TITLE_CASE_SMALL_WORDS = new Set([
  "a",
  "al",
  "ante",
  "bajo",
  "cabe",
  "con",
  "contra",
  "de",
  "del",
  "desde",
  "durante",
  "e",
  "el",
  "en",
  "entre",
  "hacia",
  "hasta",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "o",
  "para",
  "por",
  "segun",
  "según",
  "sin",
  "so",
  "sobre",
  "tras",
  "u",
  "y",
]);

function normalizeForMatching(value: string): string {
  return compactWhitespace(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function stripUrlArtifacts(value: string): string {
  return compactWhitespace(value)
    .replace(/\b(?:https?:\/\/|www\.)[^\s<>"'`()[\]{}]+/gi, " ")
    .replace(/\b(?:https?|www)\b/gi, " ")
    .replace(/\b(?:[a-z0-9-]+\.)+[a-z]{2,63}(?:\/[^\s<>"'`()[\]{}]+)?/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

const PROPOSAL_NOISE_PATTERNS = [
  /\bProceso\s+detectado:\s*[^.]+\.?/gi,
  /\bEntregable\s+solicitado:\s*[^.]+\.?/gi,
  /\bResumen\s+del\s+proceso:\s*/gi,
  /\bPasos?\s+recomendados:\s*/gi,
  /\bGates?\s+a\s+respetar:\s*/gi,
  /\bEvidencia\s+requerida:\s*/gi,
  /\bRiesgos?\s+clave:\s*/gi,
  /\bContrato\s+de\s+salida\s+obligatorio[^.]*\.?/gi,
  /\bReglas:\s*/gi,
  /\bPlantilla\s+controlada:\s*/gi,
  /\bLimite:\s*\d+\s*caracteres[^.]*\.?/gi,
  /\bDocumento\s+listo\s+para\s+compartir\b/gi,
  /\bSCAFFOLD\s+INICIAL\b/gi,
  /\bPropuesta\s+base\b/gi,
  /\bProblema\s+Limite\b/gi,
  /\bResumen\s+Limite\b/gi,
  /\bSoluci[oó]n\s+Propuesta\b/gi,
  /\bentregable\s+dentro\s+de\b/gi,
  /\bQuiero que hagas una propuesta comercial\b/gi,
  /\bNecesito una propuesta comercial\b/gi,
  /\bpropuesta comercial para el cliente\b/gi,
  /\bverifica(?:r)?\s+la\s+plantilla(?:\s+de)?\b/gi,
  /\bplantilla(?:\s+de)?(?:\s+propuesta)?(?:\s+html)?\b/gi,
  /\btodo\s+lo\s+que\s+debas\s+llenar\s+en\s+ella\b/gi,
  /\bpreg[úu]ntamelo\s+antes\s+de\s+generarla\b/gi,
  /\bpretendo\s+generar\b/gi,
  /\bque\s+mas\s+datos\s+necesitas\b/gi,
  /\bhola\s+estas\s+ahi\b/gi,
  /\bRevisa toda tu\b/gi,
  /\bRecorre todos los SOP(?:s)?\b/gi,
  /\bdocumentes muy bien\b/gi,
  /\b(?:publ[ií]cala|publicala)\s+en\s+github\b[^.\n]*/gi,
  /\b(?:publ[ií]cala|publicala)\s+en\s+el\s+repositorio\s+de\s+github\b[^.\n]*/gi,
  /\brepositorio\s+de\s+github(?:\s+de\s+propuestas?\s+comerciales?)?\b[^.\n]*/gi,
  /\benv[ií]ame\s+el\s+link\s+de\s+descarga\s+de\s+github\b[^.\n]*/gi,
  /\barchivo\s+html\s+de\s+la\s+propuesta\b/gi,
  /\bhtml entregable\b/gi,
  /\bquiero\s+que\s+me\s+ayudes\s+a\s+co?n?struir\b/gi,
  /\bquiero\s+que\s+me\s+ayudes\s+a\s+consturir\b/gi,
  /\bbloques?\s+devueltos?\s+por\s+el\s+bot\b/gi,
  /\bnotas,\s*bloques\s+y\s+decisiones\s+de\s+esta\s+versi[oó]n\b/gi,
  /\b(?:referencia|ruta|respaldo)\s+interna\b/gi,
];

const INTERNAL_OPERATIONAL_ARTIFACT_PATTERNS = [
  /\b[a-z0-9._-]+\/assets(?:\/[a-z0-9._/-]+)?\b/gi,
  /\bassets\/[a-z0-9._/-]+\b/gi,
  /\breferences\/[a-z0-9._/-]+\b/gi,
  /\btemplate-package\/[a-z0-9._/-]+\b/gi,
  /\b[\w./-]+\.(?:md|html|json|yaml|yml)\b/gi,
  /\b[a-z0-9._-]+\.(?:md|html|json|yaml|yml)\b/gi,
];

function stripProposalNoise(value: string): string {
  let cleaned = stripInternalOperationalArtifacts(
    stripUrlArtifacts(stripMarkdownFormatting(value)),
  );
  for (const pattern of PROPOSAL_NOISE_PATTERNS) {
    cleaned = cleaned.replace(pattern, " ");
  }

  return compactWhitespace(stripInternalOperationalArtifacts(cleaned));
}

function stripInternalOperationalArtifacts(value: string): string {
  let cleaned = value;
  for (const pattern of INTERNAL_OPERATIONAL_ARTIFACT_PATTERNS) {
    cleaned = cleaned.replace(pattern, " ");
  }
  return compactWhitespace(cleaned);
}

function looksLikeInternalOperationalEntry(value: string): boolean {
  const normalized = compactWhitespace(value).toLowerCase();
  if (!normalized) {
    return false;
  }

  return (
    normalized.includes("/assets")
    || normalized.includes("assets/")
    || normalized.includes("references/")
    || normalized.includes("template-package/")
    || normalized.includes("bloques devueltos por el bot")
    || normalized.includes("notas, bloques y decisiones de esta versión")
    || normalized.includes("notas, bloques y decisiones de esta version")
    || normalized.includes("referencia interna")
    || normalized.includes("ruta interna")
    || normalized.includes("respaldo interno")
    || /\b[\w./-]+\.(?:md|html|json|yaml|yml)\b/i.test(normalized)
    || /\b[a-z0-9._-]+\.(?:md|html|json|yaml|yml)\b/i.test(normalized)
  );
}

export function formatProposalDisplayName(value: string): string {
  const compact = compactWhitespace(value);
  if (!compact) {
    return compact;
  }

  if (
    compact === SERVICE_PLACEHOLDER_NAME
    || compact === PROCESS_PLACEHOLDER_NAME
    || compact.includes("MetodologIA")
  ) {
    return compact;
  }

  return compact
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && TITLE_CASE_SMALL_WORDS.has(lower)) {
        return lower;
      }

      if (/^[A-ZÁÉÍÓÚÜÑ0-9]{2,}$/.test(word)) {
        return word;
      }

      if (/[A-ZÁÉÍÓÚÜÑ]/.test(word.slice(1)) && /[a-záéíóúüñ]/.test(word)) {
        return word;
      }

      if (
        !/[a-záéíóúüñ]/.test(word)
        && word.replace(/[^A-ZÁÉÍÓÚÜÑ0-9]/g, "").length >= 2
      ) {
        return word;
      }

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function isGenericCommercialProcessName(value: string): boolean {
  const normalized = normalizeForMatching(value);
  return /(^|[\s-])(comercial|presales|preventa|ventas|proposal|oferta|scouting|lead)([\s-]|$)/.test(normalized);
}

function isGenericStructuredDraftLabel(
  value: string,
  kind: "client" | "service" | "process",
): boolean {
  const normalized = normalizeForMatching(value);
  if (!normalized) {
    return true;
  }

  if (kind === "client") {
    return normalized.includes("cliente por confirmar");
  }

  if (kind === "service") {
    return (
      normalized === "propuesta comercial"
      || normalized === "propuesta de servicios metodologia"
      || normalized === "servicio por confirmar"
    );
  }

  return (
    normalized === "proceso comercial"
    || normalized === "proceso por precisar"
    || normalized === "ruta comercial"
  );
}

function isLowSignalStructuredDraftText(value: string, minLength = 32): boolean {
  const normalized = normalizeForMatching(value);
  if (!normalized || normalized.length < minLength) {
    return true;
  }

  return [
    "resumen ejecutivo",
    "reto principal",
    "ruta propuesta",
    "validar alcance",
    "propuesta comercial",
  ].some((token) => normalized === token || normalized.startsWith(`${token} `));
}

function inferServiceNameFromRequest(text: string): string | null {
  const normalized = normalizeForMatching(text);
  const rules: Array<{ when: RegExp[]; serviceName: string }> = [
    {
      when: [/ofimatica con ia/i, /google workspace/i],
      serviceName: "Ofimática con IA en Google Workspace",
    },
    {
      when: [/ofimatica con ia/i, /workspace/i],
      serviceName: "Ofimática con IA en Google Workspace",
    },
    {
      when: [/google workspace/i, /gemini/i],
      serviceName: "Ofimática con IA en Google Workspace",
    },
    {
      when: [/desarrollo de agentes?/i, /ia/i],
      serviceName: "Desarrollo de agentes con IA",
    },
    {
      when: [/propuestas? comerciales?/i, /presentaciones?/i],
      serviceName: "Propuestas comerciales asistidas por IA",
    },
    {
      when: [/presentaciones?/i, /ia/i],
      serviceName: "Presentaciones ejecutivas con IA",
    },
    {
      when: [/workshop/i, /clinica/i, /masterclass/i, /capacitacion/i],
      serviceName: "Workshop ejecutivo con IA",
    },
  ];

  for (const rule of rules) {
    if (rule.when.every((pattern) => pattern.test(normalized))) {
      return rule.serviceName;
    }
  }

  return null;
}

function compactWhitespace(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/\u202f/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMarkdownFormatting(value: string): string {
  return compactWhitespace(
    value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
      .replace(/^\s*[-*]\s+/gm, "")
      .replace(/\|/g, " | "),
  );
}

function normalizeCandidate(value: string): string {
  const normalized = stripProposalNoise(value)
    .replace(/,\s*(?:en\s+el\s+)?(?:cual|que)\s+se\s+.*$/i, "")
    .replace(/\b(?:cliente|servicio|objetivo|cronograma|moneda|pais|país|modalidad|siguiente paso)\b.*$/i, "")
    .replace(/\b(en html|html|propuesta|proposal|comercial|cotizacion|cotización)\b.*$/i, "")
    .trim();

  return normalized
    .replace(/[|:;,.\-]+$/g, "")
    .trim();
}

function sanitizeProposalClientName(value: string): string {
  const compact = compactWhitespace(value);
  if (!compact) {
    return CLIENT_PLACEHOLDER_NAME;
  }

  if (compact === CLIENT_PLACEHOLDER_NAME) {
    return compact;
  }

  return normalizeCandidate(compact)
    .replace(/\b(?:https?|www)\b$/i, "")
    .replace(/\b(?:com|co|org|net|io|info|site)\b$/i, "")
    .trim() || compact;
}

function dedupe<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function stripNumericOrBulletPrefix(value: string): string {
  return value
    .replace(/^(?:[-*•]\s+|\d+[.)]\s+)/, "")
    .trim();
}

function takeExcerpt(value: string, maxLength = 280): string {
  const compact = stripProposalNoise(value);
  if (compact.length <= maxLength) {
    return compact;
  }

  const shortened = compact.slice(0, maxLength);
  const breakpoint = shortened.lastIndexOf(" ");
  return `${(breakpoint > 120 ? shortened.slice(0, breakpoint) : shortened).trim()}...`;
}

function sanitizeSectionContent(value: string): string {
  const blockedPatterns = [
    /Proceso\s+detectado\s*:/i,
    /Entregable\s+solicitado\s*:/i,
    /Resumen\s+del\s+proceso\s*:/i,
    /Pasos?\s+recomendados\s*:/i,
    /Gates?\s+a\s+respetar\s*:/i,
    /Evidencia\s+requerida\s*:/i,
    /Riesgos?\s+clave\s*:/i,
    /Contrato\s+de\s+salida\s+obligatorio/i,
    /Reglas\s*:/i,
    /Plantilla\s+controlada/i,
    /Propuesta\s+base/i,
    /Problema\s+Limite/i,
    /Resumen\s+Limite/i,
    /entregable\s+dentro\s+de/i,
    /Bloques?\s+devueltos?\s+por\s+el\s+bot/i,
  ];
  const lines = value.split("\n").map((line) => line.trim());
  const cleaned = lines
    .filter((line) => !blockedPatterns.some((pattern) => pattern.test(line)))
    .join(" ");
  return stripProposalNoise(cleaned) || stripProposalNoise(value) || value;
}

function sanitizeStageContent(value: string): string {
  const blockedPatterns = [
    /Proceso\s+detectado\s*:/i,
    /Entregable\s+solicitado\s*:/i,
    /Resumen\s+del\s+proceso\s*:/i,
    /Pasos?\s+recomendados\s*:/i,
    /Gates?\s+a\s+respetar\s*:/i,
    /Evidencia\s+requerida\s*:/i,
    /Riesgos?\s+clave\s*:/i,
    /Contrato\s+de\s+salida\s+obligatorio/i,
    /Reglas\s*:/i,
    /Plantilla\s+controlada/i,
    /Propuesta\s+base/i,
    /Problema\s+Limite/i,
    /Resumen\s+Limite/i,
    /Soluci[oó]n\s+Propuesta/i,
    /Cronograma/i,
    /Inversi[oó]n/i,
    /Cierre\s+comercial/i,
    /Documento\s+listo\s+para\s+compartir/i,
    /entregable\s+dentro\s+de/i,
    /^Resumen$/i,
    /^Problema$/i,
    /^Soluci[oó]n\s+Propuesta$/i,
    /^Cronograma$/i,
    /^Inversi[oó]n$/i,
    /^Cierre comercial$/i,
    /^\s*Limite\s*:/i,
    /^ETAPA\s+\d+/i,
    /Bloques?\s+devueltos?\s+por\s+el\s+bot/i,
  ];
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean);
  const cleaned = lines
    .filter((line) => !blockedPatterns.some((pattern) => pattern.test(line)))
    .join(" ");
  return stripProposalNoise(cleaned) || "Bloque interno de plantilla resumido para mantener la trazabilidad.";
}

function normalizeStageTitle(value: string): string {
  const display = formatProposalDisplayName(value);
  const normalized = normalizeForMatching(display);

  if (normalized.includes("scaffold")) {
    return "Borrador Inicial";
  }

  if (normalized.includes("repaso") && normalized.includes("entendido")) {
    return "Repaso de lo Entendido";
  }

  if (normalized.includes("plan") && normalized.includes("accion")) {
    return "Plan de Accion";
  }

  if (normalized.includes("siguiente") && normalized.includes("paso")) {
    return "Siguiente Paso";
  }

  if (normalized.includes("cierre")) {
    return "Cierre";
  }

  return display;
}

function extractQuotedClientName(text: string): string | null {
  const quotedMatch = text.match(/["“”']([^"“”']{2,80})["“”']/);
  if (!quotedMatch) {
    return null;
  }

  return normalizeCandidate(quotedMatch[1]);
}

function findSectionByKeywords(
  sections: ProposalStageSection[],
  keywords: string[],
): ProposalStageSection | undefined {
  const normalizedKeywords = keywords.map((keyword) =>
    keyword
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
  );

  return sections.find((section) => {
    const normalizedTitle = section.title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return normalizedKeywords.some((keyword) => normalizedTitle.includes(keyword));
  });
}

function mergeKnowledgeChunks(...sources: Array<KnowledgeChunk[] | undefined>): KnowledgeChunk[] {
  const merged = new Map<string, KnowledgeChunk>();

  for (const source of sources) {
    for (const chunk of source ?? []) {
      merged.set(chunk.id, chunk);
    }
  }

  return [...merged.values()];
}

function buildReferences(chunks: KnowledgeChunk[]): ProposalTemplateReference[] {
  return chunks.slice(0, 4).map((chunk) => {
    const metaParts = [
      sanitizeDraftEntry(chunk.processName ?? "", 120),
      sanitizeDraftEntry(chunk.kind, 60),
    ].filter(Boolean);

    return {
      title:
        sanitizeDraftEntry(chunk.title || chunk.sectionTitle || "", 120)
        || "Referencia operativa",
      summary:
        takeExcerpt(
          sanitizeSectionContent(
            stripInternalOperationalArtifacts(chunk.summary || chunk.content),
          ),
          180,
        )
        || "Referencia operativa validada para respaldar la propuesta.",
      meta: metaParts.join(" · "),
    };
  });
}

function buildProposalSynopsis(parts: Array<string | null | undefined>, maxLength = 320): string {
  const compact = parts
    .map((part) => part?.trim() || "")
    .filter(Boolean)
    .join(" · ");

  if (!compact) {
    return "";
  }

  return takeExcerpt(sanitizeSectionContent(compact), maxLength);
}

function describeMethodologySource(source: string): string {
  const normalized = compactWhitespace(source);
  if (normalized.includes("/servicios")) {
    return "Base pública MetodologIA · Servicios";
  }
  if (normalized.includes("/recursos")) {
    return "Base pública MetodologIA · Recursos";
  }
  if (normalized.includes("/nosotros")) {
    return "Base pública MetodologIA · Equipo";
  }

  return "Base pública MetodologIA";
}

function buildMetrics(model: {
  steps: string[];
  deliverables: string[];
  sops: string[];
  references: ProposalTemplateReference[];
}): ProposalTemplateMetric[] {
  return [
    {
      value: String(Math.max(model.steps.length, 1)),
      label: "Fases base",
    },
    {
      value: String(Math.max(model.deliverables.length, 1)),
      label: "Entregables",
    },
    {
      value: String(Math.max(model.sops.length, 1)),
      label: "SOPs soporte",
    },
    {
      value: String(Math.max(model.references.length, 1)),
      label: "Referencias KB",
    },
  ];
}

export function extractClientNameFromRequest(text: string): string | null {
  const quoted = extractQuotedClientName(text);
  if (quoted) {
    return quoted;
  }

  const patterns = [
    /\bcliente\s*[:\-]\s*([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{2,80})/i,
    /\bcliente\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{2,80})/i,
    /\bpara\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{2,80})/i,
    /\bpropuesta\s+(?:comercial\s+)?(?:para|de)\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{2,80})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    const candidate = normalizeCandidate(match?.[1] ?? "");
    if (candidate.length >= 2) {
      return formatProposalDisplayName(candidate);
    }
  }

  return null;
}

export function extractRequestedServiceName(text: string): string | null {
  const labeledPatterns = [
    /\bservicio\s*[:\-]\s*([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{3,80})/i,
    /\boferta\s*[:\-]\s*([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{3,80})/i,
  ];

  for (const pattern of labeledPatterns) {
    const match = text.match(pattern);
    const candidate = normalizeCandidate(match?.[1] ?? "");
    if (candidate.length >= 3) {
      return candidate;
    }
  }

  for (const pattern of SERVICE_PHRASE_PATTERNS) {
    const match = text.match(pattern);
    const candidate = normalizeCandidate(match?.[1] ?? "");
    if (candidate.length >= 3) {
      return candidate;
    }
  }

  const genericPatterns = [
    /\bservicio\s+de\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{3,80})/i,
    /\bpropuesta\s+(?:comercial\s+)?de\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{3,80})/i,
    /\bsolucion\s+de\s+([A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ&().,\- ]{3,80})/i,
  ];

  for (const pattern of genericPatterns) {
    const match = text.match(pattern);
    const candidate = normalizeCandidate(match?.[1] ?? "");
    if (candidate.length >= 3) {
      return candidate;
    }
  }

  const inferred = inferServiceNameFromRequest(text);
  if (inferred) {
    return inferred;
  }

  return null;
}

export function slugifyClientName(clientName: string): string {
  const slug = sanitizeProposalClientName(clientName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return slug || CLIENT_PLACEHOLDER_SLUG;
}

export function formatProposalDate(
  date: Date = new Date(),
  timeZone = "America/Bogota",
): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function buildProposalFolderName(clientName: string, requestDate: string): string {
  return `${slugifyClientName(clientName)}-${requestDate}`;
}

export function parseProposalStageSections(text: string): ProposalStageSection[] {
  const normalizedText = text
    .replace(/\r/g, "")
    .replace(/\u202f/g, " ")
    .trim();
  const stagePattern = /^\s*(?:\*\*)?\s*ETAPA\s+\d+\s*\|\s*(.+?)\s*(?:\*\*)?\s*$/gim;
  const matches = [...normalizedText.matchAll(stagePattern)];

  if (matches.length === 0) {
    return [{
      title: "Contenido de la propuesta",
      body: takeExcerpt(sanitizeStageContent(normalizedText), 700),
    }];
  }

  return matches
    .map((match, index) => {
      const heading = match[1].trim();
      const start = match.index ?? 0;
      const bodyStart = start + match[0].length;
      const bodyEnd = index + 1 < matches.length
        ? (matches[index + 1].index ?? normalizedText.length)
        : normalizedText.length;
      const body = normalizedText.slice(bodyStart, bodyEnd).trim();

      return {
        title: normalizeStageTitle(heading),
        body: takeExcerpt(sanitizeStageContent(body || normalizedText), 700),
      };
    })
    .filter((section) => section.body.length > 0);
}

function buildProposalTemplateModel(
  requestText: string,
  clientName: string,
  requestDate: string,
  sections: ProposalStageSection[],
  context: ProposalKnowledgeContext = {},
  draft: ProposalDraft | null = null,
): ProposalTemplateModel {
  const structuredDraft = draft ?? null;
  const summarySection =
    findSectionByKeywords(sections, ["repaso", "entendido"])
    ?? sections[0];
  const planSection =
    findSectionByKeywords(sections, ["plan", "accion", "acción"])
    ?? sections[1]
    ?? summarySection;
  const scaffoldSection =
    findSectionByKeywords(sections, ["scaffold", "inicial", "propuesta", "solucion", "solución"])
    ?? sections[2]
    ?? planSection;
  const nextStepSection =
    findSectionByKeywords(sections, ["siguiente", "paso", "cierre"])
    ?? sections.at(-1)
    ?? scaffoldSection;
  const intake = context.intake ?? {};
  const internalProcessCatalog = context.internalProcessCatalog ?? [];
  const proposalProcessCatalog = internalProcessCatalog.filter((item) => !isGenericCommercialProcessName(item.processName));
  const executionPack =
    context.executionPack && !isGenericCommercialProcessName(context.executionPack.processName)
      ? context.executionPack
      : null;
  const primaryInternalProcess =
    proposalProcessCatalog.find((item) => item.isPrimary)
    ?? proposalProcessCatalog.find((item) => !isGenericCommercialProcessName(item.processName))
    ?? null;

  const mergedEvidence = mergeKnowledgeChunks(
    executionPack?.evidence,
    context.evidence,
  );
  const references = buildReferences(mergedEvidence);
  const serviceName = compactWhitespace(
    formatProposalDisplayName(
      stripUrlArtifacts(
        structuredDraft?.serviceName?.trim()
        || intake.serviceName?.trim()
        || context.serviceName?.trim()
      || extractRequestedServiceName(requestText)
      || executionPack?.deliverable
      || primaryInternalProcess?.processName
      || SERVICE_PLACEHOLDER_NAME,
      ),
    ),
  );
  const processName = compactWhitespace(
    stripUrlArtifacts(
      structuredDraft?.processName?.trim()
      || executionPack?.processName
      || primaryInternalProcess?.processName
      || (serviceName ? `Ruta de ${serviceName}` : "")
      || PROCESS_PLACEHOLDER_NAME,
    ),
  );
  const intakeObjective = compactWhitespace(intake.objective ?? "");
  const intakeScope = compactWhitespace(intake.scope ?? "");
  const intakeTimeline = compactWhitespace(intake.timeline ?? "");
  const intakeInvestment = compactWhitespace(intake.investment ?? "");
  const intakeNextStep = compactWhitespace(intake.nextStep ?? "");
  const catalogAssets = sanitizePublicEntries(
    proposalProcessCatalog.flatMap((item) => item.assets),
    180,
  ).slice(0, 8);
  const catalogSops = sanitizePublicEntries(
    proposalProcessCatalog.flatMap((item) => item.sops),
    180,
  ).slice(0, 8);
  const catalogGates = sanitizePublicEntries(
    proposalProcessCatalog.flatMap((item) => item.gates),
    180,
  ).slice(0, 6);
  const catalogPhases = sanitizePublicEntries(
    primaryInternalProcess?.phases.map((phase, index) => `${index + 1}. ${phase}`) ?? [],
    180,
  );
  const steps = dedupe(
    [
      ...sanitizeDraftEntries(structuredDraft?.steps ?? [], 180),
      ...sanitizePublicEntries(executionPack?.recommendedSteps ?? [], 180),
      ...catalogPhases,
    ]
      .map(stripNumericOrBulletPrefix)
      .filter(Boolean),
  ).slice(0, 6);
  const deliverables = dedupe(
    [
      ...sanitizeDraftEntries(structuredDraft?.deliverables ?? [], 180),
      ...sanitizePublicEntries(executionPack?.assets ?? [], 180),
      ...catalogAssets,
      ...(serviceName ? [`Documento comercial para ${serviceName}`] : []),
    ]
      .map(stripNumericOrBulletPrefix)
      .filter(Boolean),
  ).slice(0, 8);
  const risks = dedupe(
    [
      ...sanitizeDraftEntries(structuredDraft?.risks ?? [], 220),
      ...sanitizePublicEntries(executionPack?.risks ?? [], 220),
      ...(primaryInternalProcess
        ? [primaryInternalProcess.status === "needs_attention"
          ? `La ruta de soporte ${primaryInternalProcess.processName} todavía requiere validación documental antes de usarse como respaldo comercial.`
          : `Alinear la propuesta con la ruta de soporte ${primaryInternalProcess.processName} antes de compartirla.`]
        : []),
      ...(proposalProcessCatalog.some((item) => item.status === "needs_attention")
        ? ["Una o más rutas de soporte relacionadas requieren revisión documental antes de prometer alcance adicional."]
        : []),
      ...(intakeScope ? [`Verificar que el alcance de ${intakeScope} quede cerrado antes de enviar la versión final.`] : []),
    ],
  ).slice(0, 6);
  const synopsis = buildProposalSynopsis([
    clientName !== CLIENT_PLACEHOLDER_NAME ? `Propuesta para ${clientName}` : "",
    serviceName,
    intakeObjective ? `Objetivo: ${intakeObjective}` : "",
    intakeScope ? `Alcance: ${intakeScope}` : "",
    intakeTimeline ? `Cronograma: ${intakeTimeline}` : "",
    intakeInvestment ? `Inversión: ${intakeInvestment}` : "",
  ]);
  const summaryFallback = buildProposalSynopsis([
    clientName !== CLIENT_PLACEHOLDER_NAME
      ? `${clientName} necesita una propuesta ejecutiva para ${serviceName}.`
      : `Propuesta ejecutiva para ${serviceName}.`,
    intakeObjective ? `Objetivo: ${intakeObjective}` : "",
    primaryInternalProcess?.summary ?? executionPack?.summary ?? "",
  ]);
  const challengeFallback = takeExcerpt(
    sanitizeSectionContent(
      [
        intakeObjective,
        intakeScope ? `Alcance esperado: ${intakeScope}.` : "",
        intakeTimeline ? `Ventana estimada: ${intakeTimeline}.` : "",
        `La propuesta debe aterrizar ${serviceName} con alcance verificable, entregables claros y siguiente paso definido.`,
      ]
        .filter(Boolean)
        .join(" "),
    ),
    420,
  );
  const approachFallback = takeExcerpt(
    sanitizeSectionContent(
      [
        executionPack?.summary ?? primaryInternalProcess?.summary ?? "",
        steps.length > 0 ? `Ruta base: ${steps.slice(0, 4).join(" · ")}.` : "",
        deliverables.length > 0
          ? `Entregables visibles: ${deliverables.slice(0, 4).join(" · ")}.`
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    ),
    420,
  );
  const nextStepFallback = sanitizeSectionContent(
    intakeNextStep
    || nextStepSection?.body
    || (primaryInternalProcess
      ? `Validar el alcance, las dependencias y la evidencia mínima de ${primaryInternalProcess.processName} antes de compartir la propuesta.`
      : "Validar alcance, responsables, fecha de arranque y criterio de cierre para activar la siguiente conversación comercial."),
  );
  const model = {
    clientName,
    serviceName,
    processName,
    requestDate,
    summary:
      (structuredDraft?.summary ? sanitizeDraftEntry(structuredDraft.summary, 320) : "")
      || synopsis
      || takeExcerpt(
        sanitizeSectionContent(
          primaryInternalProcess?.summary
          || executionPack?.summary
          || scaffoldSection?.body
          || summarySection?.body
          || planSection?.body
          || summaryFallback,
        ),
        320,
      ),
    challenge: structuredDraft?.challenge
      ? sanitizeDraftEntry(structuredDraft.challenge, 420)
      : takeExcerpt(
        sanitizeSectionContent(
          intakeObjective
          || [
            intakeScope ? `Alcance: ${intakeScope}` : "",
            intakeTimeline ? `Cronograma: ${intakeTimeline}` : "",
            challengeFallback,
          ].filter(Boolean).join(" "),
        ),
        420,
      ),
    approach: structuredDraft?.approach
      ? sanitizeDraftEntry(structuredDraft.approach, 420)
      : takeExcerpt(
        sanitizeSectionContent(
          [
            intakeScope ? `Alcance: ${intakeScope}` : "",
            intakeTimeline ? `Cronograma: ${intakeTimeline}` : "",
            primaryInternalProcess?.summary ? `Base de trabajo: ${primaryInternalProcess.summary}` : "",
            executionPack?.summary ? `Ruta sugerida: ${executionPack.summary}` : "",
            planSection?.body ? `Nota de contexto: ${planSection.body}` : "",
            approachFallback,
          ]
            .filter(Boolean)
            .join(" "),
        ),
        420,
      ),
    nextStep: structuredDraft?.nextStep
      ? sanitizeDraftEntry(structuredDraft.nextStep, 240)
      : takeExcerpt(nextStepFallback, 240),
    steps: steps.length > 0 ? steps : FALLBACK_STEPS,
    deliverables: deliverables.length > 0 ? deliverables : FALLBACK_DELIVERABLES,
    assets: dedupe([
      ...sanitizeDraftEntries(structuredDraft?.assets ?? [], 180),
      ...sanitizePublicEntries(context.executionPack?.assets ?? [], 180),
      ...catalogAssets,
    ]).slice(0, 8),
    sops: dedupe([
      ...sanitizeDraftEntries(structuredDraft?.sops ?? [], 180),
      ...sanitizePublicEntries(context.executionPack?.sops ?? [], 180),
      ...catalogSops,
    ]).slice(0, 8),
    gates: dedupe([
      ...sanitizeDraftEntries(structuredDraft?.gates ?? [], 180),
      ...sanitizePublicEntries(context.executionPack?.gates ?? [], 180),
      ...catalogGates,
    ]).slice(0, 6),
    risks,
    references,
    internalProcessCatalog: proposalProcessCatalog.map((item) => ({
      processId: sanitizeDraftEntry(item.processId, 120),
      processName: sanitizeDraftEntry(item.processName, 120) || "Ruta operativa relacionada",
      summary: takeExcerpt(sanitizeSectionContent(item.summary), 220),
      status: item.status,
      matchReason: takeExcerpt(sanitizeSectionContent(item.matchReason), 120),
      isPrimary: item.isPrimary,
      phases: sanitizePublicEntries(item.phases, 120),
      gates: sanitizePublicEntries(item.gates, 120),
      assets: sanitizePublicEntries(item.assets, 120),
      sops: sanitizePublicEntries(item.sops, 120),
      relatedProcesses: sanitizePublicEntries(item.relatedProcesses, 120),
    })),
    metodologiaServices: (context.metodologia?.services ?? []).map((item) => ({
      title: item.title,
      summary: takeExcerpt(item.description, 220),
      meta: describeMethodologySource(item.source),
    })),
    metodologiaResources: (context.metodologia?.resources ?? []).map((item) => ({
      title: item.title,
      summary: takeExcerpt(item.description, 220),
      meta: describeMethodologySource(item.source),
    })),
    metodologiaFounders: (() => {
      const founders = context.metodologia?.founders ?? [];
      const requestedFounder = context.requestedByFounder ? normalizeForFounderMatch(context.requestedByFounder) : "";
      const preferred = context.requestedByFounder
        ? founders.filter((f) =>
          normalizeForFounderMatch(f.name).includes(requestedFounder))
        : founders;
      const pool = preferred.length > 0 ? preferred : founders;
      return pool.map((item) => ({
        title: `${item.name} · ${item.title}`,
        summary: takeExcerpt(item.bio, 260),
        meta: "Equipo fundador MetodologIA",
      }));
    })(),
    intake: {
      clientName,
      serviceName,
      objective: intakeObjective || null,
      geography: compactWhitespace(intake.geography ?? "") || null,
      scope: intakeScope || null,
      timeline: intakeTimeline || null,
      investment: intakeInvestment || null,
      nextStep: intakeNextStep || null,
    },
    sections,
  };

  return {
    ...model,
    metrics: buildMetrics(model),
  };
}

function buildDraftSections(draft: ProposalDraft): ProposalStageSection[] {
  const sanitizedSections = draft.sections
    .map((section) => {
      const title = sanitizeDraftEntry(section.title, 120) || "Seccion de propuesta";
      const body = sanitizeDraftEntry(section.body, 700);

      return {
        title,
        body,
      };
    })
    .filter((section) => section.body.length > 0);

  if (sanitizedSections.length > 0) {
    return sanitizedSections;
  }

  return [
    {
      title: "Repaso de lo Entendido",
      body: draft.summary,
    },
    {
      title: "Vision",
      body: draft.challenge,
    },
    {
      title: "Journey",
      body: draft.approach,
    },
    {
      title: "Cierre",
      body: draft.nextStep,
    },
  ];
}

function normalizeForFounderMatch(value: string): string {
  return compactWhitespace(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function stripStructuredDraftNoise(value: string): string {
  return compactWhitespace(
    stripProposalNoise(value)
      .replace(/\bETAPA\s+\d+\s*\|\s*[^.\n]+/gi, " ")
      .replace(/\bETAPA\s+\d+\b/gi, " ")
      .replace(/\s{2,}/g, " "),
  );
}

function sanitizeDraftEntry(value: string, maxLength = 160): string {
  const cleaned = takeExcerpt(stripStructuredDraftNoise(value), maxLength);
  return looksLikeInternalOperationalEntry(cleaned) ? "" : cleaned;
}

function sanitizeDraftEntries(values: string[], maxLength = 160): string[] {
  return dedupe(
    values
      .map((value) => sanitizeDraftEntry(value, maxLength))
      .filter(Boolean),
  );
}

function buildFallbackSectionsFromDraft(draft: ProposalDraft): ProposalStageSection[] {
  return [
    {
      title: "Resumen Ejecutivo",
      body: draft.summary,
    },
    {
      title: "Problema a Resolver",
      body: draft.challenge,
    },
    {
      title: "Ruta Propuesta",
      body: draft.approach,
    },
    {
      title: "Entregables Clave",
      body: draft.deliverables.length > 0
        ? `La propuesta contempla: ${draft.deliverables.slice(0, 4).join(" · ")}.`
        : "Los entregables finales siguen por confirmar.",
    },
    {
      title: "Siguiente Paso",
      body: draft.nextStep,
    },
  ];
}

function normalizeStructuredDraft(
  draft: ProposalDraft,
  context: ProposalKnowledgeContext,
): ProposalDraft {
  const intake = context.intake ?? {};
  const primaryProcess =
    context.internalProcessCatalog?.find((item) => item.isPrimary)
    ?? context.internalProcessCatalog?.[0];
  const fallbackServiceName =
    compactWhitespace(
      intake.serviceName
      ?? context.serviceName
      ?? context.executionPack?.deliverable
      ?? primaryProcess?.processName
      ?? draft.serviceName,
    ) || SERVICE_PLACEHOLDER_NAME;
  const fallbackProcessName =
    compactWhitespace(
      context.executionPack?.processName
      ?? primaryProcess?.processName
      ?? draft.processName,
    ) || PROCESS_PLACEHOLDER_NAME;
  const fallbackClientName =
    sanitizeProposalClientName(
      intake.clientName
      ?? draft.clientName
      ?? CLIENT_PLACEHOLDER_NAME,
    );
  const fallbackSummary = buildProposalSynopsis([
    `${fallbackClientName} necesita activar ${fallbackServiceName}.`,
    intake.objective ? `Objetivo: ${intake.objective}` : "",
    context.executionPack?.summary ?? primaryProcess?.summary ?? "",
  ], 320);
  const fallbackChallenge = takeExcerpt(sanitizeSectionContent([
    intake.scope ? `Alcance: ${intake.scope}` : "",
    intake.geography ? `Geografía: ${intake.geography}` : "",
    intake.timeline ? `Cronograma: ${intake.timeline}` : "",
    intake.investment ? `Inversión: ${intake.investment}` : "",
    intake.objective ? `Objetivo: ${intake.objective}` : "",
  ].filter(Boolean).join(" ")), 420);
  const fallbackApproach = takeExcerpt(sanitizeSectionContent([
    context.executionPack?.summary ?? primaryProcess?.summary ?? "",
    ...(context.executionPack?.recommendedSteps ?? []),
  ].filter(Boolean).join(" · ")), 420);
  const fallbackNextStep = takeExcerpt(
    intake.nextStep
    ?? `Validar alcance, responsables y fecha de arranque para ${fallbackServiceName}.`,
    240,
  );
  const steps = sanitizeDraftEntries(draft.steps, 180);
  const deliverables = sanitizeDraftEntries(draft.deliverables, 180);
  const assets = sanitizeDraftEntries(draft.assets, 180);
  const sops = sanitizeDraftEntries(draft.sops, 180);
  const gates = sanitizeDraftEntries(draft.gates, 180);
  const risks = sanitizeDraftEntries(draft.risks, 220);

  const normalizedDraft: ProposalDraft = {
    ...draft,
    clientName: !isGenericStructuredDraftLabel(draft.clientName, "client")
      ? sanitizeProposalClientName(draft.clientName)
      : fallbackClientName,
    serviceName: !isGenericStructuredDraftLabel(draft.serviceName, "service")
      ? formatProposalDisplayName(stripUrlArtifacts(draft.serviceName))
      : formatProposalDisplayName(fallbackServiceName),
    processName: !isGenericStructuredDraftLabel(draft.processName, "process")
      ? stripUrlArtifacts(draft.processName)
      : stripUrlArtifacts(fallbackProcessName),
    summary: !isLowSignalStructuredDraftText(draft.summary, 40)
      ? sanitizeDraftEntry(draft.summary, 320)
      : fallbackSummary,
    challenge: !isLowSignalStructuredDraftText(draft.challenge, 40)
      ? sanitizeDraftEntry(draft.challenge, 420)
      : fallbackChallenge,
    approach: !isLowSignalStructuredDraftText(draft.approach, 40)
      ? sanitizeDraftEntry(draft.approach, 420)
      : fallbackApproach,
    nextStep: !isLowSignalStructuredDraftText(draft.nextStep, 24)
      ? sanitizeDraftEntry(draft.nextStep, 240)
      : fallbackNextStep,
    steps: steps.length >= 2
      ? steps
      : sanitizePublicEntries(context.executionPack?.recommendedSteps ?? [], 180).slice(0, 6),
    deliverables: deliverables.length >= 2
      ? deliverables
      : sanitizePublicEntries(
        [
          ...(context.executionPack?.assets ?? []),
          ...(primaryProcess?.assets ?? []),
          `Documento comercial para ${fallbackServiceName}`,
        ],
        180,
      ).slice(0, 8),
    assets: assets.length > 0
      ? assets
      : sanitizePublicEntries(
        [...(context.executionPack?.assets ?? []), ...(primaryProcess?.assets ?? [])],
        180,
      ).slice(0, 8),
    sops: sops.length > 0
      ? sops
      : sanitizePublicEntries(
        [...(context.executionPack?.sops ?? []), ...(primaryProcess?.sops ?? [])],
        180,
      ).slice(0, 8),
    gates: gates.length > 0
      ? gates
      : sanitizePublicEntries(
        [...(context.executionPack?.gates ?? []), ...(primaryProcess?.gates ?? [])],
        180,
      ).slice(0, 6),
    risks: risks.length > 0
      ? risks
      : sanitizePublicEntries(
        [
          ...(context.executionPack?.risks ?? []),
          intake.scope ? `Validar alcance final de ${intake.scope}.` : "",
          primaryProcess ? `Alinear la activación con ${primaryProcess.processName}.` : "",
        ],
        220,
      ).slice(0, 6),
    sections: draft.sections
      .map((section) => ({
        title: sanitizeDraftEntry(section.title, 120) || "Seccion de propuesta",
        body: sanitizeDraftEntry(section.body, 700),
      }))
      .filter((section) => section.body),
    sourceMap: draft.sourceMap,
  };

  if (normalizedDraft.steps.length === 0) {
    normalizedDraft.steps = FALLBACK_STEPS;
  }
  if (normalizedDraft.deliverables.length === 0) {
    normalizedDraft.deliverables = FALLBACK_DELIVERABLES;
  }
  if (normalizedDraft.sections.length < 3) {
    normalizedDraft.sections = buildFallbackSectionsFromDraft(normalizedDraft);
  }

  return normalizedDraft;
}

function sanitizePublicEntries(values: string[], maxLength = 160): string[] {
  return dedupe(
    values
      .map((value) => sanitizeDraftEntry(value, maxLength))
      .map(stripNumericOrBulletPrefix)
      .filter((value) => !looksLikeInternalOperationalEntry(value))
      .filter(Boolean),
  );
}

export function buildProposalArtifact(
  requestText: string,
  proposalText: string,
  generatedAt: Date = new Date(),
  context: ProposalKnowledgeContext = {},
): ProposalArtifact {
  if (context.metodologiaReady === false) {
    throw new Error("MetodologIA knowledge unavailable; aborting proposal generation");
  }
  const parsedDraft = parseProposalDraft(proposalText);
  const structuredDraft = parsedDraft ? normalizeStructuredDraft(parsedDraft, context) : null;
  const clientName = sanitizeProposalClientName(
    context.intake?.clientName
    ?? structuredDraft?.clientName
    ?? extractClientNameFromRequest(requestText)
    ?? extractClientNameFromRequest(proposalText)
    ?? CLIENT_PLACEHOLDER_NAME,
  );
  const clientSlug = slugifyClientName(clientName);
  const requestDate = formatProposalDate(generatedAt);
  const folderName = buildProposalFolderName(clientName, requestDate);
  const sections = structuredDraft ? buildDraftSections(structuredDraft) : parseProposalStageSections(proposalText);
  const model = buildProposalTemplateModel(requestText, clientName, requestDate, sections, context, structuredDraft);

  return {
    clientName,
    clientSlug,
    serviceName: model.serviceName,
    processName: model.processName,
    requestDate,
    folderName,
    repoPath: `proposals/${folderName}/index.html`,
    fileName: `${folderName}.html`,
    html: renderProposalTemplate(model),
    sections,
  };
}
