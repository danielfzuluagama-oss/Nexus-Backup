import type { KnowledgeChunk, ProcessModule } from "../knowledge/operational-kb.js";

export interface ProposalProcessCatalogItem {
  processId: string;
  processName: string;
  summary: string;
  status: ProcessModule["status"];
  matchReason: string;
  isPrimary: boolean;
  phases: string[];
  gates: string[];
  assets: string[];
  sops: string[];
  relatedProcesses: string[];
}

interface RankedProcessModule {
  module: ProcessModule;
  score: number;
  reasons: string[];
}

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  const normalized = normalizeText(value);
  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function dedupe<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function pickTop(values: string[], limit: number): string[] {
  return dedupe(values).slice(0, limit);
}

function buildSearchSpace(module: ProcessModule): string {
  return normalizeText([
    module.processId,
    module.processName,
    module.status,
    module.summary,
    module.owners.join(" "),
    module.phases.join(" "),
    module.gates.join(" "),
    module.assets.join(" "),
    module.sops.join(" "),
    module.metrics.join(" "),
    module.relatedProcesses.join(" "),
    module.variants.join(" "),
    module.capabilities.onboarding.join(" "),
    module.capabilities.assistance.join(" "),
    module.capabilities.execution.join(" "),
  ].filter(Boolean).join(" "));
}

function scoreModule(
  module: ProcessModule,
  normalizedMessage: string,
  queryTokens: string[],
  evidenceProcessIds: Set<string>,
  primaryProcessId?: string | null,
): RankedProcessModule {
  const searchSpace = buildSearchSpace(module);
  const reasons: string[] = [];
  let score = 0;

  if (primaryProcessId && module.processId === primaryProcessId) {
    score += 1000;
    reasons.push("proceso rector detectado");
  }

  if (evidenceProcessIds.has(module.processId)) {
    score += 250;
    reasons.push("evidencia indexada");
  }

  const directCues = [
    module.processId,
    module.processName,
    ...module.variants,
    ...module.relatedProcesses,
  ]
    .map(normalizeText)
    .filter(Boolean);

  if (directCues.some((cue) => normalizedMessage.includes(cue))) {
    score += 180;
    reasons.push("coincidencia de nombre");
  }

  const tokenHits = queryTokens.filter((token) => searchSpace.includes(token));
  if (tokenHits.length > 0) {
    score += tokenHits.length * 16;
    reasons.push(`${tokenHits.length} coincidencias léxicas`);
  }

  const summaryHits = queryTokens.filter((token) => normalizeText(module.summary).includes(token));
  if (summaryHits.length > 0) {
    score += summaryHits.length * 10;
    reasons.push("coincide con el resumen operativo");
  }

  const capabilityText = normalizeText([
    ...module.capabilities.onboarding,
    ...module.capabilities.assistance,
    ...module.capabilities.execution,
  ].join(" "));
  const capabilityHits = queryTokens.filter((token) => capabilityText.includes(token));
  if (capabilityHits.length > 0) {
    score += Math.min(capabilityHits.length * 8, 32);
    reasons.push("coincide con capacidades operativas");
  }

  if (score > 0) {
    if (module.status === "ready") {
      score += 12;
    } else {
      score -= 10;
      reasons.push("requiere atención");
    }

    if (module.phases.length > 0) score += 4;
    if (module.gates.length > 0) score += 4;
    if (module.assets.length > 0) score += 2;
    if (module.sops.length > 0) score += 2;
  }

  return { module, score, reasons };
}

function buildMatchReason(ranked: RankedProcessModule): string {
  const parts = ranked.reasons.slice(0, 3);
  if (parts.length === 0) {
    return "Catálogo operativo relacionado";
  }
  return parts.join(" · ");
}

export function buildProposalProcessCatalog(
  message: string,
  modules: ProcessModule[],
  evidence: KnowledgeChunk[],
  primaryProcessId?: string | null,
  limit = 4,
): ProposalProcessCatalogItem[] {
  const normalizedMessage = normalizeText(message);
  const queryTokens = tokenize(normalizedMessage);
  const evidenceProcessIds = new Set(
    evidence
      .map((chunk) => chunk.processId)
      .filter((processId): processId is string => Boolean(processId)),
  );

  const ranked = modules
    .map((module) =>
      scoreModule(module, normalizedMessage, queryTokens, evidenceProcessIds, primaryProcessId),
    )
    .filter((item) => item.score > 0 || item.module.processId === primaryProcessId)
    .sort((a, b) =>
      b.score - a.score
      || a.module.processName.localeCompare(b.module.processName)
      || a.module.processId.localeCompare(b.module.processId))
    .slice(0, limit);

  return ranked.map((rankedModule) => ({
    processId: rankedModule.module.processId,
    processName: rankedModule.module.processName,
    summary: rankedModule.module.summary,
    status: rankedModule.module.status,
    matchReason: buildMatchReason(rankedModule),
    isPrimary: rankedModule.module.processId === primaryProcessId
      || (!primaryProcessId && ranked[0]?.module.processId === rankedModule.module.processId),
    phases: pickTop(rankedModule.module.phases, 4),
    gates: pickTop(rankedModule.module.gates, 4),
    assets: pickTop(rankedModule.module.assets, 4),
    sops: pickTop(rankedModule.module.sops, 4),
    relatedProcesses: pickTop(rankedModule.module.relatedProcesses, 3),
  }));
}
