import { z } from "zod/v4";

export interface ProposalDraftSection {
  title: string;
  body: string;
}

export interface ProposalDraftTraceabilityEntry {
  section: string;
  sources: string[];
  note?: string;
}

export interface ProposalDraft {
  clientName: string;
  serviceName: string;
  processName: string;
  summary: string;
  challenge: string;
  approach: string;
  nextStep: string;
  steps: string[];
  deliverables: string[];
  assets: string[];
  sops: string[];
  gates: string[];
  risks: string[];
  sections: ProposalDraftSection[];
  sourceMap: ProposalDraftTraceabilityEntry[];
}

export const ProposalDraftSectionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
});

export const ProposalDraftTraceabilityEntrySchema = z.object({
  section: z.string().min(1),
  sources: z.array(z.string().min(1)),
  note: z.string().optional(),
});

export const ProposalDraftSchema = z.object({
  clientName: z.string().min(1),
  serviceName: z.string().min(1),
  processName: z.string().min(1),
  summary: z.string().min(1),
  challenge: z.string().min(1),
  approach: z.string().min(1),
  nextStep: z.string().min(1),
  steps: z.array(z.string().min(1)).default([]),
  deliverables: z.array(z.string().min(1)).default([]),
  assets: z.array(z.string().min(1)).default([]),
  sops: z.array(z.string().min(1)).default([]),
  gates: z.array(z.string().min(1)).default([]),
  risks: z.array(z.string().min(1)).default([]),
  sections: z.array(ProposalDraftSectionSchema).default([]),
  sourceMap: z.array(ProposalDraftTraceabilityEntrySchema).default([]),
});

export type ProposalDraftInput = z.input<typeof ProposalDraftSchema>;

function extractJsonCandidate(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return "";
  }

  const fencedMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) {
    return trimmed.slice(start, end + 1).trim();
  }

  return trimmed;
}

export function parseProposalDraft(text: string): ProposalDraft | null {
  try {
    const candidate = extractJsonCandidate(text);
    if (!candidate) {
      return null;
    }

    const parsed = JSON.parse(candidate);
    const result = ProposalDraftSchema.safeParse(parsed);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function buildDraftResponseContract(): string {
  return [
    "You are composing a commercial proposal draft for HTML rendering.",
    "Return ONLY a single valid JSON object. Do not wrap it in markdown fences.",
    "Do not include any ETAPA labels, prompt residue, URLs, or commentary outside the JSON object.",
    "Do not include internal paths, filenames, folder names, debug notes, source reasoning, or raw asset references in any public field.",
    "If the source mentions SOPs, assets, or internal process artifacts, rewrite them into client-facing language or omit them when they are operational-only.",
    "The JSON must match this shape:",
    "{",
    '  "clientName": string,',
    '  "serviceName": string,',
    '  "processName": string,',
    '  "summary": string,',
    '  "challenge": string,',
    '  "approach": string,',
    '  "nextStep": string,',
    '  "steps": string[],',
    '  "deliverables": string[],',
    '  "assets": string[],',
    '  "sops": string[],',
    '  "gates": string[],',
    '  "risks": string[],',
    '  "sections": [{"title": string, "body": string}],',
    '  "sourceMap": [{"section": string, "sources": string[], "note"?: string}]',
    "}",
    "Populate the fields from the provided service knowledge, intake, SOPs, and evidence. If a fact is missing, use a conservative 'por confirmar' phrasing instead of inventing it.",
  ].join("\n");
}
