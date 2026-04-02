import type { ControlledTemplateName } from "./controlled-deliverables.js";

export type TelegramIntentKind =
  | "operational_lookup"
  | "operational_onboarding"
  | "operational_execution"
  | "agent";

export type TelegramResponseMode =
  | "default"
  | "staged_plan"
  | "staged_deliverable";

export interface TelegramIntent {
  kind: TelegramIntentKind;
  responseMode: TelegramResponseMode;
  audienceRole: string;
  deliverable: string;
  templateName: ControlledTemplateName | null;
  normalizedMessage: string;
  reason: string;
}

const OPERATIONAL_KEYWORDS = [
  "proceso",
  "process",
  "workflow",
  "playbook",
  "fase",
  "fases",
  "gate",
  "gates",
  "asset",
  "assets",
  "sop",
  "sops",
  "rol",
  "roles",
  "owner",
  "owners",
  "responsable",
  "responsables",
  "entregable",
  "deliverable",
  "presales",
  "onboarding",
  "induccion",
];

const ONBOARDING_KEYWORDS = [
  "onboarding",
  "onboard",
  "induccion",
  "induction",
  "nuevo integrante",
  "resumen del proceso",
];

const EXECUTION_KEYWORDS = [
  "ejecutar",
  "execution",
  "entregar",
  "crear",
  "generar",
  "scaffold",
  "plantilla",
  "template",
  "html",
  "propuesta",
  "proposal",
  "brief",
  "entregable",
];

const DELIVERABLE_KEYWORDS = [
  "propuesta",
  "proposal",
  "comercial",
  "brief",
  "assessment",
  "diagnostico",
  "diagnóstico",
  "auditoria",
  "auditoría",
  "html",
  "plantilla",
  "template",
];

const PLAN_KEYWORDS = [
  "plan",
  "roadmap",
  "pasos",
  "step by step",
  "por etapas",
  "fases",
  "como lo harias",
  "como lo harías",
  "implementacion",
  "implementación",
  "accion",
  "acción",
];

export function normalizeForMatching(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAnyKeyword(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(normalizeForMatching(keyword)));
}

export function inferAudienceRole(normalizedMessage: string): string {
  if (normalizedMessage.includes("cliente")) return "cliente";
  if (normalizedMessage.includes("implementador")) return "implementador";
  if (normalizedMessage.includes("pm")) return "pm";
  if (normalizedMessage.includes("ae")) return "ae";
  if (normalizedMessage.includes("lider")) return "lider";
  return "nuevo integrante";
}

export function inferControlledTemplate(
  normalizedMessage: string,
): ControlledTemplateName | null {
  if (
    normalizedMessage.includes("propuesta")
    || normalizedMessage.includes("proposal")
    || normalizedMessage.includes("comercial")
    || normalizedMessage.includes("cotizacion")
  ) {
    return "proposal";
  }

  if (normalizedMessage.includes("brief")) {
    return "brief";
  }

  if (
    normalizedMessage.includes("assessment")
    || normalizedMessage.includes("diagnostico")
    || normalizedMessage.includes("auditoria")
  ) {
    return "assessment";
  }

  if (
    normalizedMessage.includes("plan")
    || normalizedMessage.includes("roadmap")
    || normalizedMessage.includes("scaffold")
    || normalizedMessage.includes("plantilla")
    || normalizedMessage.includes("template")
    || normalizedMessage.includes("html")
  ) {
    return "execution_plan";
  }

  return null;
}

export function inferDeliverableLabel(
  normalizedMessage: string,
  templateName: ControlledTemplateName | null,
): string {
  if (normalizedMessage.includes("html")) return "html entregable";
  if (templateName === "proposal") return "propuesta comercial";
  if (templateName === "brief") return "brief estrategico";
  if (templateName === "assessment") return "assessment operativo";
  if (normalizedMessage.includes("plan")) return "plan de accion";
  return "entregable operativo solicitado";
}

export function classifyTelegramIntent(
  text: string,
  options: { hasMedia?: boolean } = {},
): TelegramIntent {
  const normalizedMessage = normalizeForMatching(text);
  const hasMedia = options.hasMedia ?? false;
  const audienceRole = inferAudienceRole(normalizedMessage);
  const templateName = inferControlledTemplate(normalizedMessage);
  const deliverable = inferDeliverableLabel(normalizedMessage, templateName);
  const mentionsOperational = includesAnyKeyword(normalizedMessage, OPERATIONAL_KEYWORDS);
  const wantsOnboarding = includesAnyKeyword(normalizedMessage, ONBOARDING_KEYWORDS);
  const wantsExecution = includesAnyKeyword(normalizedMessage, EXECUTION_KEYWORDS);
  const wantsDeliverable = includesAnyKeyword(normalizedMessage, DELIVERABLE_KEYWORDS);
  const wantsPlan = hasMedia || includesAnyKeyword(normalizedMessage, PLAN_KEYWORDS);

  if (mentionsOperational && wantsOnboarding) {
    return {
      kind: "operational_onboarding",
      responseMode: "default",
      audienceRole,
      deliverable,
      templateName,
      normalizedMessage,
      reason: "Operational onboarding keywords detected.",
    };
  }

  if (mentionsOperational && wantsExecution) {
    return {
      kind: "operational_execution",
      responseMode: templateName ? "staged_deliverable" : "staged_plan",
      audienceRole,
      deliverable,
      templateName: templateName ?? "execution_plan",
      normalizedMessage,
      reason: "Operational execution request detected.",
    };
  }

  if (mentionsOperational) {
    return {
      kind: "operational_lookup",
      responseMode: "default",
      audienceRole,
      deliverable,
      templateName,
      normalizedMessage,
      reason: "Operational lookup keywords detected.",
    };
  }

  if (wantsDeliverable) {
    return {
      kind: "agent",
      responseMode: "staged_deliverable",
      audienceRole,
      deliverable,
      templateName: templateName ?? "proposal",
      normalizedMessage,
      reason: "Deliverable-oriented request detected.",
    };
  }

  if (wantsPlan) {
    return {
      kind: "agent",
      responseMode: "staged_plan",
      audienceRole,
      deliverable,
      templateName: templateName ?? "execution_plan",
      normalizedMessage,
      reason: hasMedia
        ? "Media input defaults to staged comprehension and action planning."
        : "Planning keywords detected.",
    };
  }

  return {
    kind: "agent",
    responseMode: "default",
    audienceRole,
    deliverable,
    templateName,
    normalizedMessage,
    reason: "Default full-agent route.",
  };
}
