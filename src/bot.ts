import { Bot, InputFile } from "grammy";
import type { AgentRuntime } from "./runtime.js";
import { runAgent, type AgentDeps } from "./agent.js";
import { formatForTelegram, splitMessageHtml, stripHtml } from "./format.js";
import { transcribeAudio } from "./audio.js";
import {
  sanitizeInput,
  SECURITY_INPUT_BLOCKED_MESSAGE,
} from "./security.js";
import { getOperationalKnowledgeAccessor } from "./knowledge/accessor.js";
import type {
  ExecutionPack,
  OnboardingPack,
  ProcessModule,
} from "./knowledge/operational-kb.js";
import { shouldSendQuotaNotification } from "./quota-notifications.js";
import { getStandbyMessage, isStandbyModeEnabled } from "./telegram-controls.js";
import {
  classifyTelegramIntent,
  inferAudienceRole,
  normalizeForMatching,
  type TelegramIntent,
} from "./telegram-intents.js";
import {
  buildTelegramConversationKey,
  getTelegramMessageThreadId,
} from "./telegram-conversation.js";
import {
  renderControlledScaffold,
  type ControlledTemplateName,
} from "./controlled-deliverables.js";
import { buildAgentResponseContract } from "./response-contracts.js";
import {
  buildProposalArtifact,
  extractClientNameFromRequest,
  formatProposalDate,
  parseProposalStageSections,
  slugifyClientName,
  isGenericCommercialProcessName,
  type ProposalKnowledgeContext,
} from "./proposals/proposal-artifact.js";
import { parseProposalDraft } from "./proposals/proposal-draft.js";
import { buildProposalProcessCatalog } from "./proposals/operational-catalog.js";
import { loadMetodologiaKnowledge } from "./proposals/metodologia-knowledge.js";
import {
  assessProposalIntake,
  buildProposalClarificationReply,
  type ProposalIntakeAssessment,
} from "./proposals/proposal-intake.js";
import {
  getGitHubProposalsConfig,
  publishProposalArtifact,
  type PublishedProposalArtifact,
} from "./proposals/github-publisher.js";
import {
  formatProposalValidationError,
  validateProposalArtifactHtml,
  type ProposalValidationIssue,
} from "./proposals/proposal-validation.js";
import { composeCommercialProposalDraft } from "./proposals/proposal-composer.js";
import {
  isTelegramConversationUpdateStale,
  recordTelegramConversationUpdate,
} from "./telegram-update-guard.js";
import type { ThreadProposalState } from "./thread-memory.js";

/**
 * TELEGRAM GATEWAY — Multimodal ingress/egress and agent orchestration.
 *
 * Responsibilities: whitelist auth, media routing (audio/photo/document/animation),
 * agent timeout protection (env-configurable hard limit), and HTML fallback on Telegram parse errors.
 *
 * Trade-offs:
 * - Telegram's HTML parser rejects unbalanced tags; fallback to stripHtml() recovers delivery
 *   at the cost of formatting. This is preferable to message loss.
 * - agentDeps.ecosystem is resolved lazily via runtime.ecosystem getter so that ecosystem
 *   initialized after bot creation (in index.ts) is still available at message time.
 * - The timeout defaults to 120s and can be tuned via AGENT_TIMEOUT_MS. Long tasks should still
 *   be decomposed into faster operational or sub-agent steps whenever possible.
 */
const DEFAULT_AGENT_TIMEOUT_MS = 120_000;
const MIN_AGENT_TIMEOUT_MS = 15_000;
const PROPOSAL_CONTINUATION_KEYWORDS = [
  "continua",
  "continuar",
  "sigue",
  "sigamos",
  "avanza",
  "completa",
  "ajusta",
  "refina",
  "corrige",
  "actualiza",
  "version final",
  "versión final",
  "siguiente paso",
  "hazlo",
  "hazla",
  "generalo",
  "generala",
];
const PROPOSAL_FIELD_HINT_KEYWORDS = [
  "alcance",
  "scope",
  "cronograma",
  "timeline",
  "objetivo",
  "servicio",
  "cliente",
  "inversion",
  "inversión",
  "precio",
  "pricing",
  "modalidad",
  "entregables",
  "deliverables",
  "moneda",
];
const CAPABILITY_EXPLORATION_KEYWORDS = [
  "que puedes hacer",
  "qué puedes hacer",
  "que mas puedes hacer",
  "qué más puedes hacer",
  "otras capacidades",
  "capacidades del bot",
  "que sabes",
  "qué sabes",
  "skills",
  "agentes",
  "workflow",
  "workflows",
  "asistentes",
  "herramientas",
  "menu",
  "menú",
];

function getAgentTimeoutMs(): number {
  const raw = Number(process.env.AGENT_TIMEOUT_MS);
  if (Number.isFinite(raw) && raw >= MIN_AGENT_TIMEOUT_MS) {
    return Math.floor(raw);
  }
  return DEFAULT_AGENT_TIMEOUT_MS;
}

function detectProcessMention(
  normalizedMessage: string,
  modules: ProcessModule[],
): ProcessModule | null {
  let bestModule: ProcessModule | null = null;
  let bestScore = 0;

  for (const module of modules) {
    const candidates = [
      module.processId,
      module.processName,
      ...module.variants,
      ...module.relatedProcesses,
    ];

    for (const candidate of candidates) {
      const normalizedCandidate = normalizeForMatching(candidate);
      if (!normalizedCandidate) continue;

      let score = 0;
      if (normalizedMessage.includes(normalizedCandidate)) {
        score = 100 + normalizedCandidate.length;
      } else {
        const tokens = normalizedCandidate
          .split(" ")
          .map((token) => token.trim())
          .filter((token) => token.length >= 3);

        if (tokens.length > 0 && tokens.every((token) => normalizedMessage.includes(token))) {
          score = tokens.length * 10 + normalizedCandidate.length;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestModule = module;
      }
    }
  }

  return bestModule;
}

function hasExplicitProcessMention(
  normalizedMessage: string,
  module: ProcessModule,
): boolean {
  const candidates = [
    module.processId,
    module.processName,
    ...module.variants,
  ];

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeForMatching(candidate);
    if (!normalizedCandidate) continue;

    if (normalizedMessage.includes(normalizedCandidate)) {
      return true;
    }

    const tokens = normalizedCandidate
      .split(" ")
      .map((token) => token.trim())
      .filter((token) => token.length >= 3);

    if (tokens.length > 0 && tokens.every((token) => normalizedMessage.includes(token))) {
      return true;
    }
  }

  return false;
}

function buildOperationalRisks(module: ProcessModule): string[] {
  const risks: string[] = [];

  if (module.status === "needs_attention") {
    risks.push("La documentacion del proceso sigue incompleta y requiere atencion antes de operar con autonomia.");
  }
  if (module.gates.length > 0) {
    risks.push("Saltar gates rompe la trazabilidad del proceso y puede invalidar el siguiente handoff.");
  }
  if (module.assets.length > 0) {
    risks.push("Usar assets desactualizados o incompletos puede deteriorar la calidad del entregable.");
  }
  if (module.sops.length > 0) {
    risks.push("Ejecutar sin SOP vigente aumenta el riesgo de desviaciones y retrabajo.");
  }

  if (risks.length === 0) {
    risks.push("Validar owner, evidencia y criterio de cierre antes de avanzar al siguiente hito.");
  }

  return risks.slice(0, 3);
}

function formatOnboardingFastPathReply(
  module: ProcessModule,
  pack: OnboardingPack,
): string {
  const riskText = buildOperationalRisks(module).join(" | ");
  const assetText =
    pack.essentialAssets.length > 0
      ? pack.essentialAssets.join(" | ")
      : module.assets.length > 0
        ? module.assets.slice(0, 6).join(" | ")
        : "No detecte assets esenciales explicitados en el modulo.";
  const sopText =
    pack.essentialSops.length > 0
      ? pack.essentialSops.join(" | ")
      : module.sops.length > 0
        ? module.sops.slice(0, 6).join(" | ")
        : "No detecte SOPs esenciales explicitados en el modulo.";
  const ownerText =
    module.owners.length > 0 ? module.owners.join(" | ") : "Owners no definidos en la fuente operativa.";

  return [
    `Respuesta directa del KB operativo para ${module.processName}.`,
    `Objetivo: ${pack.summary}`,
    module.phases.length > 0
      ? `Fases clave: ${module.phases.join(" | ")}`
      : `Walkthrough recomendado: ${pack.walkthrough.join(" | ")}`,
    `Roles u owners: ${ownerText}`,
    `Entradas y salidas operativas mas visibles: ${assetText}`,
    `Gates y SOPs clave: ${[...module.gates.slice(0, 4), ...pack.essentialSops.slice(0, 4)].join(" | ") || sopText}`,
    `Riesgos clave: ${riskText}`,
    `Preguntas de arranque: ${pack.firstQuestions.slice(0, 3).join(" | ")}`,
  ].join("\n");
}

function formatModuleFastPathReply(module: ProcessModule): string {
  return [
    `Respuesta directa del KB operativo para ${module.processName}.`,
    `Resumen: ${module.summary}`,
    module.phases.length > 0 ? `Fases: ${module.phases.join(" | ")}` : "Fases: no detectadas en el modulo.",
    module.owners.length > 0 ? `Owners: ${module.owners.join(" | ")}` : "Owners: no definidos en fuente.",
    module.gates.length > 0 ? `Gates: ${module.gates.join(" | ")}` : "Gates: no detectados.",
    module.assets.length > 0 ? `Assets clave: ${module.assets.slice(0, 6).join(" | ")}` : "Assets clave: no detectados.",
    module.sops.length > 0 ? `SOPs clave: ${module.sops.slice(0, 6).join(" | ")}` : "SOPs clave: no detectados.",
    `Riesgos clave: ${buildOperationalRisks(module).join(" | ")}`,
  ].join("\n");
}

function formatStageBlock(title: string, body: string[]): string {
  return [title, ...body.filter(Boolean)].join("\n");
}

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildPublishedProposalReply(
  clientName: string,
  publication: PublishedProposalArtifact,
): string {
  const viewLabel = publication.pagesReady ? "Ver propuesta" : "Abrir en GitHub";
  const lines = [
    `HTML autocontenido publicado para <b>${escapeTelegramHtml(clientName)}</b>.`,
    `<a href="${publication.viewUrl}">${viewLabel}</a>`,
  ];

  if (publication.pagesReady) {
    lines.push(`<a href="${publication.githubUrl}">Abrir en GitHub</a>`);
  }

  lines.push(`<a href="${publication.downloadUrl}">Descargar HTML</a>`);

  if (!publication.pagesReady) {
    lines.push("GitHub Pages sigue propagando el sitio; el enlace público puede tardar unos minutos en quedar listo.");
  }

  return lines.join("\n");
}

function buildProposalReadyReply(clientName: string, serviceName?: string): string {
  return [
    `Propuesta comercial estructurada para <b>${escapeTelegramHtml(clientName)}</b>.`,
    serviceName ? `Servicio priorizado: <b>${escapeTelegramHtml(serviceName)}</b>.` : "",
    "Ya quedó generada en HTML canónico y lista para revisión o publicación.",
  ].filter(Boolean).join("\n");
}

function buildProposalFallbackReply(clientName: string, hasAttachment = false): string {
  return [
    `No pude publicar el enlace de GitHub para <b>${escapeTelegramHtml(clientName)}</b> en este intento.`,
    hasAttachment
      ? "Te adjunto el HTML autocontenido para que puedas revisarlo o descargarlo desde Telegram."
      : "La versión final quedó bloqueada antes de generar el adjunto; si quieres, reintento con el bloque corregido.",
  ].join("\n");
}

function compactLogValue(value: string | null | undefined, maxLength = 180): string | null {
  if (!value) {
    return null;
  }

  const compact = value.replace(/\s+/g, " ").trim();
  if (!compact) {
    return null;
  }

  return compact.length <= maxLength
    ? compact
    : `${compact.slice(0, Math.max(1, maxLength - 3)).trim()}...`;
}

function describeUnknownError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function summarizeProposalValidationIssues(
  issues: ProposalValidationIssue[],
): Array<{
  code: string;
  blocking: boolean;
  message: string;
  evidence: string | null;
}> {
  return issues.slice(0, 5).map((issue) => ({
    code: issue.code,
    blocking: issue.blocking,
    message: compactLogValue(issue.message, 180) ?? issue.message,
    evidence: compactLogValue(issue.evidence, 120),
  }));
}

function shouldRequireProposalIntake(intent: TelegramIntent): boolean {
  return intent.templateName === "proposal" && intent.kind === "agent";
}

interface BuildProposalKnowledgeContextOptions {
  proposalMode?: boolean;
}

interface ProposalHistoryMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

function includesAnyNormalizedKeyword(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(normalizeForMatching(keyword)));
}

function hasProposalConversationSignals(
  recentMessages: ProposalHistoryMessage[],
  threadMemoryContext?: string,
): boolean {
  const normalizedThreadContext = normalizeForMatching(threadMemoryContext ?? "");
  if (
    normalizedThreadContext.includes("tipo proposal")
    || normalizedThreadContext.includes("estado comercial")
  ) {
    return true;
  }

  return recentMessages.some((message) => {
    const normalizedMessage = normalizeForMatching(message.content);
    if (!normalizedMessage) {
      return false;
    }
    if (normalizedMessage.includes("propuesta comercial")) {
      return true;
    }
    return classifyTelegramIntent(message.content).templateName === "proposal";
  });
}

function shouldPreserveProposalConversationContext(
  currentText: string,
  currentIntent: TelegramIntent,
  recentMessages: ProposalHistoryMessage[],
  threadMemoryContext?: string,
): boolean {
  const normalizedCurrentMessage = currentIntent.normalizedMessage || normalizeForMatching(currentText);
  if (!normalizedCurrentMessage) {
    return false;
  }

  if (includesAnyNormalizedKeyword(normalizedCurrentMessage, CAPABILITY_EXPLORATION_KEYWORDS)) {
    return false;
  }

  if (currentIntent.templateName === "proposal") {
    return true;
  }

  if (!hasProposalConversationSignals(recentMessages, threadMemoryContext)) {
    return false;
  }

  if (currentIntent.kind !== "agent") {
    return false;
  }

  if (currentIntent.templateName) {
    return false;
  }

  if (currentIntent.responseMode !== "default") {
    return false;
  }

  if (includesAnyNormalizedKeyword(normalizedCurrentMessage, PROPOSAL_CONTINUATION_KEYWORDS)) {
    return true;
  }

  if (includesAnyNormalizedKeyword(normalizedCurrentMessage, PROPOSAL_FIELD_HINT_KEYWORDS)) {
    return true;
  }

  return false;
}

function resolveProposalClientSlug(text: string | null | undefined): string | null {
  if (!text) {
    return null;
  }

  const clientName = extractClientNameFromRequest(text);
  return clientName ? slugifyClientName(clientName) : null;
}

function buildProposalConversationText(
  currentText: string,
  recentMessages: ProposalHistoryMessage[],
  threadMemoryContext?: string,
): string {
  const previousUserMessages = recentMessages
    .filter((message) => message.role === "user")
    .map((message) => message.content.trim())
    .filter(Boolean)
    .slice(-3)
    .reverse();

  const current = currentText.trim();
  const currentClientSlug = resolveProposalClientSlug(current);
  const recentContextClientSlug = currentClientSlug
    ? [...previousUserMessages, threadMemoryContext ?? ""]
        .map((segment) => resolveProposalClientSlug(segment))
        .find((slug): slug is string => Boolean(slug))
        ?? null
    : null;

  if (currentClientSlug && recentContextClientSlug && currentClientSlug !== recentContextClientSlug) {
    return current;
  }

  return [current, ...previousUserMessages, threadMemoryContext]
    .filter(Boolean)
    .join("\n");
}

function buildProposalThreadState(
  assessment: ProposalIntakeAssessment,
  status: ThreadProposalState["status"],
): ThreadProposalState {
  const snapshot = assessment.snapshot;
  return {
    status,
    clientName: snapshot.clientName,
    serviceName: snapshot.serviceName,
    objective: snapshot.objective,
    geography: snapshot.geography,
    scope: snapshot.scope,
    timeline: snapshot.timeline,
    investment: snapshot.investment,
    nextStep: snapshot.nextStep,
    completenessScore: assessment.completenessScore,
    missingRequired: assessment.missingRequiredFields.map((field) => field.label),
    missingRecommended: assessment.missingRecommendedFields.map((field) => field.label),
    openQuestions: assessment.missingRequiredFields.map((field) => field.prompt),
    updatedAt: new Date(),
  };
}

async function buildProposalKnowledgeContext(
  text: string,
  log: AgentRuntime["logger"],
  senderName?: string | null,
  options: BuildProposalKnowledgeContextOptions = {},
): Promise<ProposalKnowledgeContext> {
  const kb = await getOperationalKnowledgeAccessor();
  const normalizedMessage = normalizeForMatching(text);
  const proposalMode = options.proposalMode ?? false;
  const [modules, evidence] = await Promise.all([
    kb.listProcesses(),
    kb.search(text, { limit: 8 }),
  ]);

  const detectedModule =
    detectProcessMention(normalizedMessage, modules)
    ?? modules.find((module) => module.processId === evidence.find((chunk) => chunk.processId)?.processId)
    ?? null;
  const genericCommercialModule = detectedModule
    ? isGenericCommercialProcessName(detectedModule.processName)
    : false;
  const explicitModuleMention = detectedModule
    ? hasExplicitProcessMention(normalizedMessage, detectedModule)
    : false;
  const useExecutionPack =
    Boolean(detectedModule)
    && !genericCommercialModule
    && (!proposalMode || explicitModuleMention);
  const internalProcessCatalog = buildProposalProcessCatalog(
    text,
    modules,
    evidence,
    useExecutionPack && detectedModule ? detectedModule.processId : null,
  );

  let executionPack: ExecutionPack | null = null;
  if (useExecutionPack && detectedModule) {
    executionPack = await kb.createExecutionPack(
      detectedModule.processId,
      "propuesta comercial",
      text,
    );
  }

  let metodologiaKnowledge: ProposalKnowledgeContext["metodologia"] | undefined;
  let metodologiaReady: boolean | undefined;
  try {
    const mk = await loadMetodologiaKnowledge();
    metodologiaKnowledge = {
      services: mk.services,
      resources: mk.resources,
      founders: mk.founders,
      fetchedAt: mk.fetchedAt,
    };
    metodologiaReady = mk.services.length > 0 && mk.resources.length > 0 && mk.founders.length > 0;
  } catch (error) {
    log.warn("MetodologIA public knowledge could not be loaded", {
      error: error instanceof Error ? error.message : String(error),
    });
    metodologiaKnowledge = {
      services: [{
        title: "MetodologIA · Servicios",
        description: "Servicios de workshops, bootcamps, consultoría y programas élite potenciados con IA.",
        source: "https://metodologia.info/servicios/index",
      }],
      resources: [{
        title: "MetodologIA · Recursos",
        description: "Recursos y valores agregados publicados por MetodologIA.",
        source: "https://metodologia.info/recursos/index",
      }],
      founders: [
        { name: "Daniel Zuluaga", title: "Chief Efficiency Officer", bio: "Estratega de eficiencia y optimización operativa." },
        { name: "Germán Eliécer Sepúlveda", title: "Chief Ecosystem Officer", bio: "Constructor de ecosistemas y alianzas estratégicas." },
        { name: "Javier Montaño", title: "Chief Empowerment Officer", bio: "Diseñador de sistemas y metodologías de alto rendimiento." },
        { name: "Katherine Oquendo", title: "Chief Enablement Officer", bio: "Líder de entornos habilitadores y experiencia." },
      ],
      fetchedAt: new Date(),
    };
    metodologiaReady = true;
  }

  log.info("Proposal knowledge context resolved", {
    processId: detectedModule?.processId ?? null,
    evidenceCount: evidence.length,
    executionPack: executionPack?.processId ?? null,
    proposalMode,
    explicitModuleMention,
    internalCatalogCount: internalProcessCatalog.length,
    metodologiaReady,
  });

  return {
    serviceName: executionPack?.deliverable ?? undefined,
    executionPack,
    evidence,
    internalProcessCatalog,
    metodologia: metodologiaKnowledge,
    metodologiaReady,
    requestedByFounder: senderName || null,
  };
}

function buildExecutionScaffoldSeed(
  module: ProcessModule,
  pack: ExecutionPack,
  templateName: ControlledTemplateName,
): Record<string, string> {
  const sharedScope = `Proceso: ${module.processName}. Entregable: ${pack.deliverable}.`;
  const steps = pack.recommendedSteps.join("\n- ");
  const evidence = pack.evidenceRequired.join(" | ");
  const risks = pack.risks.join(" | ");

  if (templateName === "proposal") {
    return {
      summary: [
        `Dossier ejecutivo para ${pack.deliverable} dentro de ${module.processName}.`,
        `Objetivo: ${pack.objective}.`,
        "Estructura sugerida: Hero, Vision, Journey, Programa, Modalidades, Objeciones, Credenciales, Equipo, Metodologias, ROI, Condiciones, FAQ, Glosario y Cierre.",
      ].join("\n"),
      problem: [
        `Contexto y dolor: ${module.summary}.`,
        `Lo que se quiere resolver: ${pack.summary}.`,
      ].join("\n"),
      solution: [
        "Ruta propuesta:",
        `- ${steps}`,
        "",
        "Bloques sugeridos:",
        "- Vision",
        "- Journey",
        "- Programa",
        "- Modalidades",
        "- Objeciones",
        "- Credenciales",
        "- Equipo",
        "- Metodologias",
        "- ROI",
        "- Condiciones",
        "- FAQ",
        "- Glosario",
        "- Cierre",
      ].join("\n"),
      timeline: [
        "Cronograma sugerido:",
        `- ${pack.recommendedSteps.slice(0, 4).join("\n- ")}`,
      ].join("\n"),
      investment: "[Pendiente] Definir inversion, modalidad y criterio de cierre con datos reales.",
    };
  }

  if (templateName === "brief") {
    return {
      objective: pack.objective,
      background: module.summary,
      approach: `Secuencia sugerida:\n- ${steps}`,
      deliverables: [pack.deliverable, ...pack.assets.slice(0, 3)].join(" | "),
    };
  }

  if (templateName === "assessment") {
    return {
      executive_summary: `Assessment operativo base para ${pack.deliverable}.`,
      context: `${sharedScope} Objetivo: ${pack.objective}`,
      findings: risks,
      recommendations: `Aplicar:\n- ${steps}`,
      next_steps: "Confirmar owner, gate de entrada y evidencia mínima antes de ejecutar.",
    };
  }

  return {
    objective: pack.objective,
    scope: `${sharedScope} Objetivo: ${pack.objective}`,
    inputs: [...pack.assets.slice(0, 4), ...pack.sops.slice(0, 3)].join(" | ") || "Pendiente de precisar inputs.",
    steps: `- ${steps}`,
    evidence: evidence || "Pendiente de precisar evidencia de cierre.",
    risks,
    next_step: "Confirmar owner, input faltante y gate de inicio.",
  };
}

function formatExecutionFastPathReply(
  module: ProcessModule,
  pack: ExecutionPack,
  templateName: ControlledTemplateName,
): string {
  const scaffold = renderControlledScaffold(
    templateName,
    buildExecutionScaffoldSeed(module, pack, templateName),
  );

  return [
    formatStageBlock("ETAPA 1 | REPASO DE LO ENTENDIDO", [
      `Proceso detectado: ${module.processName}.`,
      `Entregable solicitado: ${pack.deliverable}.`,
      `Objetivo: ${pack.objective}.`,
    ]),
    formatStageBlock("ETAPA 2 | PLAN DE ACCION", [
      `Resumen del proceso: ${pack.summary}`,
      `Pasos recomendados: ${pack.recommendedSteps.join(" | ")}`,
      pack.gates.length > 0 ? `Gates a respetar: ${pack.gates.join(" | ")}` : "",
      pack.evidenceRequired.length > 0
        ? `Evidencia requerida: ${pack.evidenceRequired.join(" | ")}`
        : "",
      `Riesgos clave: ${pack.risks.join(" | ")}`,
    ]),
    formatStageBlock("ETAPA 3 | SCAFFOLD INICIAL", [scaffold]),
    formatStageBlock("ETAPA 4 | SIGUIENTE PASO", [
      "Confirma owner, input faltante y criterio de cierre para pasar del scaffold a la ejecución.",
    ]),
  ].join("\n\n");
}

async function tryOperationalRoute(
  text: string,
  intent: TelegramIntent,
  log: AgentRuntime["logger"],
): Promise<string | null> {
  const normalizedMessage = intent.normalizedMessage || normalizeForMatching(text);
  if (!normalizedMessage) return null;
  if (intent.kind === "agent") {
    return null;
  }

  try {
    const kb = await getOperationalKnowledgeAccessor();
    const modules = await kb.listProcesses();
    const module = detectProcessMention(normalizedMessage, modules);

    if (!module) {
      return null;
    }

    if (intent.kind === "operational_onboarding") {
      const audienceRole = intent.audienceRole || inferAudienceRole(normalizedMessage);
      const pack = await kb.createOnboardingPack(module.processId, audienceRole, text);
      if (pack) {
        log.info("Operational fast path resolved", {
          processId: module.processId,
          mode: "onboarding",
        });
        return formatOnboardingFastPathReply(module, pack);
      }
    }

    if (intent.kind === "operational_execution") {
      const templateName = intent.templateName ?? "execution_plan";
      const pack = await kb.createExecutionPack(
        module.processId,
        intent.deliverable,
        text,
      );
      if (pack) {
        log.info("Operational fast path resolved", {
          processId: module.processId,
          mode: "execution",
          template: templateName,
        });
        return formatExecutionFastPathReply(module, pack, templateName);
      }
    }

    log.info("Operational fast path resolved", {
      processId: module.processId,
      mode: "module",
    });
    return formatModuleFastPathReply(module);
  } catch (error) {
    log.warn("Operational fast path skipped after lookup failure", {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Instantiates a Grammy Bot mapped to a specific AgentRuntime. 
 * This isolates bot state in multi-agent environments.
 */
export function createBot(runtime: AgentRuntime): Bot {
  const bot = new Bot(runtime.credentials.telegramBotToken);
  const log = runtime.logger;

  // Build dependency container; ecosystem resolved lazily so post-construction init is captured
  const getAgentDeps = (): AgentDeps => ({
    llm: runtime.llm,
    memory: runtime.memory,
    config: runtime.config,
    ecosystem: runtime.ecosystem ?? undefined,
  });

  /**
   * [QUOTA MONITORING LAYER]
   * Listen for quota exhaustion events from the LLM provider and notify all authorized users.
   */
  runtime.onQuotaExhausted = (owner, provider) => {
    if (!shouldSendQuotaNotification(runtime.instanceName, provider)) {
      log.info("Suppressing duplicate quota notification during cooldown", {
        owner,
        provider,
        agent: runtime.instanceName,
      });
      return;
    }

    const message =
      `⚠️ <b>AVISO DE CUOTA</b>\n\n` +
      `El pool de API de <b>${provider}</b> para el agente <i>${runtime.instanceName}</i> ` +
      `reporto agotamiento o rate limit en una o mas claves. ` +
      `El sistema intentara continuar con otras credenciales disponibles. ` +
      `Ultimo owner reportado: <b>${owner}</b>.`;
    
    for (const userId of runtime.config.allowedUserIds) {
      bot.api.sendMessage(userId, message, { parse_mode: "HTML" }).catch(err => {
        log.error("Failed to send quota notification", { userId, error: err });
      });
    }
  };

  /**
   * [SECURITY LAYER: WHITELIST AUTHORIZATION]
   * Silently drops messages from unregistered User IDs to prevent unauthorized LLM usage.
   * Silent drops are cheaper and safer than explicit rejections (prevents enumeration).
   */
  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;
    log.info("Incoming update", { 
      updateId: ctx.update.update_id,
      userId, 
      username: ctx.from?.username,
      chatId: ctx.chat?.id,
      text: ctx.message?.text?.slice(0, 50)
    });

    if (!userId || !runtime.config.allowedUserIds.includes(userId)) {
      log.warn("Rejected unauthorized user or missing ID", { 
        userId, 
        allowedIds: runtime.config.allowedUserIds 
      });
      // Optionally notify the user in console but not in Telegram to avoid bot spamming
      return;
    }
    log.info("User authorized", { userId });
    await next();
  });

  // Handle all incoming messages (text, photos, gifs, etc.)
  bot.on("message", async (ctx) => {
    const userId = ctx.from.id;
    const updateId = ctx.update.update_id;
    const messageThreadId = getTelegramMessageThreadId(ctx.message);
    const conversationContext = {
      conversationKey: buildTelegramConversationKey({
        chatId: ctx.chat?.id,
        userId,
        messageThreadId,
      }),
    };
    const conversationKey = conversationContext.conversationKey;
    let text = ctx.message.text || ctx.message.caption || "";
    let pendingMsgId: number | null = null;
    let proposalKnowledgeContext: ProposalKnowledgeContext | null = null;
    let proposalIntakeAssessment: ProposalIntakeAssessment | null = null;
    let threadId: string | null = null;
    let threadMemoryContext = "";
    let semanticMemoryContext = "";
    const describeThreadMemory =
      typeof runtime.memory.describeThreadMemory === "function"
        ? runtime.memory.describeThreadMemory.bind(runtime.memory)
        : async () => "";
    const describeSemanticMemory =
      typeof runtime.memory.describeSemanticMemory === "function"
        ? runtime.memory.describeSemanticMemory.bind(runtime.memory)
        : async () => "";
    const updateThreadMemory =
      typeof runtime.memory.updateThreadMemory === "function"
        ? runtime.memory.updateThreadMemory.bind(runtime.memory)
        : async () => {};
    const dismissPendingReply = async () => {
      if (!pendingMsgId) return;
      await ctx.api.deleteMessage(ctx.chat.id, pendingMsgId).catch(() => {});
      pendingMsgId = null;
    };
    const isStaleConversationUpdate = async (): Promise<boolean> => {
      try {
        return await isTelegramConversationUpdateStale(
          runtime.instanceName,
          conversationKey,
          updateId,
        );
      } catch (error) {
        log.warn("Failed to verify Telegram conversation freshness", {
          userId,
          updateId,
          conversationKey,
          error: error instanceof Error ? error.message : String(error),
        });
        return false;
      }
    };
    const executeIfFresh = async <T>(
      label: string,
      action: () => Promise<T>,
    ): Promise<T | null> => {
      if (await isStaleConversationUpdate()) {
        log.info("Skipping stale Telegram response", {
          userId,
          updateId,
          conversationKey,
          label,
        });
        return null;
      }

      return action();
    };
    const replyFresh = (
      content: string,
      options?: { parse_mode?: "HTML" },
    ) =>
      executeIfFresh("reply", () =>
        options ? ctx.reply(content, options) : ctx.reply(content),
      );
    const replyWithDocumentFresh = (
      document: InputFile,
      options?: { caption?: string },
    ) =>
      executeIfFresh("reply_document", () =>
        options ? ctx.replyWithDocument(document, options) : ctx.replyWithDocument(document),
      );
    const sendMessageFresh = (
      targetChatId: number,
      content: string,
      useHtml = true,
    ) =>
      executeIfFresh("send_message", () =>
        useHtml
          ? ctx.api.sendMessage(targetChatId, content, { parse_mode: "HTML" })
          : ctx.api.sendMessage(targetChatId, content),
      );
    const sendDocumentFresh = (
      targetChatId: number,
      document: InputFile,
      options?: { caption?: string },
    ) =>
      executeIfFresh("send_document", () =>
        options
          ? ctx.api.sendDocument(targetChatId, document, options)
          : ctx.api.sendDocument(targetChatId, document),
      );

    // --- SKIP SERVICE MESSAGES ---
    // Telegram forum topics generate service messages (forum_topic_created, etc.)
    // that have no text and no media. These must be silently skipped.
    const msg = ctx.message as unknown as Record<string, unknown>;
    if (msg.forum_topic_created || msg.forum_topic_edited || msg.forum_topic_closed
        || msg.forum_topic_reopened || msg.general_forum_topic_hidden
        || msg.general_forum_topic_unhidden
        || msg.new_chat_members || msg.left_chat_member
        || msg.new_chat_title || msg.new_chat_photo || msg.delete_chat_photo
        || msg.group_chat_created || msg.pinned_message
        || msg.migrate_to_chat_id || msg.migrate_from_chat_id) {
      log.info("Skipping service message", { userId, type: Object.keys(msg).filter(k => typeof msg[k] !== 'undefined' && !['message_id','from','chat','date'].includes(k)).slice(0,3) });
      return;
    }

    await recordTelegramConversationUpdate(runtime.instanceName, conversationKey, updateId).catch((error) => {
      log.warn("Failed to register latest Telegram conversation update", {
        userId,
        updateId,
        conversationKey,
        error: error instanceof Error ? error.message : String(error),
      });
    });

    if (isStandbyModeEnabled()) {
      log.info("Standby mode enabled; skipping agent cognition", {
        userId,
        updateId,
      });
      await replyFresh(getStandbyMessage());
      return;
    }

    // --- MULTIMODAL MIDDLEWARE (ROUTING & EXTRACTION) ---
    // Enter multimodal block if ANY media is present (voice/audio always override text).
    // After service message filter above, a no-text-no-media message is a sticker/contact/etc — safe to skip.
    const hasMedia = !!(ctx.message.voice || ctx.message.audio || ctx.message.photo || ctx.message.document || ctx.message.animation);
    if (!hasMedia && text) {
      const sanitized = sanitizeInput(text);
      if (!sanitized.safe) {
        log.warn("Blocked unsafe text message before intent classification", {
          userId,
          reason: sanitized.reason,
        });
        await replyFresh(SECURITY_INPUT_BLOCKED_MESSAGE);
        return;
      }
      text = sanitized.cleaned;
    }

    if (hasMedia) {
      if (ctx.message.voice || ctx.message.audio) {
         try {
           const pendingReply = await replyFresh("Extrayendo y transcribiendo audio...");
           pendingMsgId = pendingReply?.message_id ?? null;

           const file = await ctx.getFile();
           if (file.file_path) {
             const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
             const transcript = await transcribeAudio(url, runtime.credentials.groqApiKeys[0].key);
              // Audio transcripts are user input and must be security-checked before the LLM sees them.
              const sanitized = sanitizeInput(transcript || "Mudo o ininteligible");
              if (!sanitized.safe) {
                log.warn("Audio transcript flagged by security", { userId, reason: sanitized.reason });
                await dismissPendingReply();
                await replyFresh(SECURITY_INPUT_BLOCKED_MESSAGE);
                return;
              }
              text = `<SYSTEM_OVERRIDE>
CRÍTICO: ESTE ES UN AUDIO TRANSCRITO. ESTÁS OBLIGADO A PROCESARLO Y SEGUIR EL PROTOCOLO DE REFLEXIÓN MULTI-AGENTE.
NUNCA digas que no puedes leer multimedia.

[AUDIO TRANSCRITO]
"${sanitized.cleaned}"
</SYSTEM_OVERRIDE>`;

           } else {
             text = "[El sistema intentó descargar el audio, pero Telegram retuvo el archivo remoto]";
           }
         } catch (e) {
             log.error("Audio extraction or transcription failed", { userId, error: e });
             text = "[Fallo crítico en el motor de extracción de audio Groq Whisper]";
         }
      }
      else if (ctx.message.photo) {
         const photo = ctx.message.photo[ctx.message.photo.length - 1];
         const rawCaption = ctx.message.caption || "";
         const sanitizedCaption = rawCaption ? sanitizeInput(rawCaption) : null;
         const caption = sanitizedCaption?.safe ? sanitizedCaption.cleaned : "";
         if (sanitizedCaption && !sanitizedCaption.safe) {
           log.warn("Photo caption omitted after security scan", { userId, reason: sanitizedCaption.reason });
         }
         try {
            const file = await ctx.api.getFile(photo.file_id);
            if (!file.file_path) {
              text = "[Telegram retuvo la imagen; el archivo excede el limite de descarga del bot o no esta disponible]";
            } else {
              const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
              text = `<SYSTEM_OVERRIDE>
El usuario envio una IMAGEN.${caption ? ` Caption: "${caption}".` : ""}
URI: ${url}
Responde confirmando recepcion. Indica que la URI esta lista para inspeccion profunda via Vision si el usuario lo requiere. Sugiere una accion concreta.
</SYSTEM_OVERRIDE>`;
            }
         } catch(e) {
            text = "[Fallo en la extraccion de la URI de la imagen desde Telegram]";
         }
      } 
      else if (ctx.message.document) {
         const mime = ctx.message.document.mime_type || "desconocido";
         const name = ctx.message.document.file_name || "Documento";
         const rawCaption = ctx.message.caption || "";
         const sanitizedCaption = rawCaption ? sanitizeInput(rawCaption) : null;
         const caption = sanitizedCaption?.safe ? sanitizedCaption.cleaned : "";
         if (sanitizedCaption && !sanitizedCaption.safe) {
           log.warn("Document caption omitted after security scan", { userId, reason: sanitizedCaption.reason });
         }
         try {
            const file = await ctx.api.getFile(ctx.message.document.file_id);
            if (!file.file_path) {
              text = `[El documento "${name}" excede el limite de descarga del bot de Telegram (20MB)]`;
            } else {
              const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
              text = `<SYSTEM_OVERRIDE>
El usuario envio un DOCUMENTO: "${name}" (${mime}).${caption ? ` Nota: "${caption}".` : ""}
URI: ${url}
Confirma recepcion. Ofrece delegar a Document Intelligence para analisis profundo o extraccion de datos.
</SYSTEM_OVERRIDE>`;
            }
         } catch(e) {
            text = "[Fallo en la extraccion del documento desde los servidores de Telegram]";
         }
      }
      else if (ctx.message.animation) text = "[El usuario ha enviado un GIF animado, asúmelo como un gesto lúdico]";
      else text = "[Multimedia genérica no identificada]";
    }

    // --- AGENT COGNITION EXECUTION ---
    if (pendingMsgId) {
      // Changed UI to reflect the new 10x Qualitative Multi-Agent Loop
      await ctx.api.editMessageText(ctx.chat.id, pendingMsgId, "Audio transcrito. Iniciando Reflexión Agéntica Profunda y Síntesis...").catch(() => {});
    }

    const timeoutMs = getAgentTimeoutMs();
    const agentTimeoutPromise = new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error("Agent timeout")), timeoutMs)
    );
    // The timeout must stay live even if we return early from the proposal gate.
    agentTimeoutPromise.catch(() => {});

    let proposalConversationText = text;
    const currentIntent = classifyTelegramIntent(text, { hasMedia });
    let intent = currentIntent;
    try {
      threadId = await runtime.memory.getOrCreateActiveThread(
        userId,
        runtime.instanceName,
        conversationContext,
      );
      const recentMessages = await runtime.memory.getRecentMessages(
        userId,
        6,
        threadId,
        runtime.instanceName,
      );
      threadMemoryContext = await describeThreadMemory(userId, threadId, runtime.instanceName);
      if (
        shouldPreserveProposalConversationContext(
          text,
          currentIntent,
          recentMessages,
          threadMemoryContext,
        )
      ) {
        proposalConversationText = buildProposalConversationText(text, recentMessages, threadMemoryContext);
        intent = classifyTelegramIntent(proposalConversationText, { hasMedia });
      }
    } catch (error) {
      log.warn("Failed to load proposal conversation history", {
        userId,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    log.info("Telegram intent classified", {
      userId,
      kind: intent.kind,
      responseMode: intent.responseMode,
      template: intent.templateName,
      reason: intent.reason,
    });
    if (proposalConversationText !== text) {
      log.info("Proposal conversation context preserved across turns", {
        userId,
        contextLength: proposalConversationText.length,
      });
    }
    const proposalMode = intent.kind === "agent" && intent.templateName === "proposal";
    // Proposal content must not stay in shared Telegram chats; route it to the user's private chat instead.
    const deliverProposalPrivately = proposalMode && ctx.chat?.type !== "private";
    const proposalDeliveryTargetId = deliverProposalPrivately ? userId : ctx.chat.id;

    const sendProposalText = async (content: string, useHtml = true) => {
      if (deliverProposalPrivately) {
        return sendMessageFresh(proposalDeliveryTargetId, content, useHtml);
      }

      return useHtml
        ? replyFresh(content, { parse_mode: "HTML" })
        : replyFresh(content);
    };

    if (deliverProposalPrivately) {
      log.info("Proposal delivery routed to private chat", {
        userId,
        sourceChatId: ctx.chat.id,
        targetChatId: proposalDeliveryTargetId,
        chatType: ctx.chat.type,
      });
    }

    if (proposalMode) {
      semanticMemoryContext = await describeSemanticMemory(
        userId,
        proposalConversationText,
        threadId ?? undefined,
        runtime.instanceName,
      ).catch((error) => {
        log.warn("Failed to load semantic proposal memory", {
          userId,
          error: error instanceof Error ? error.message : String(error),
        });
        return "";
      });
    }

    if (shouldRequireProposalIntake(intent)) {
      proposalKnowledgeContext = await buildProposalKnowledgeContext(
        proposalConversationText,
        log,
        ctx.from?.first_name,
        { proposalMode },
      ).catch((error) => {
        log.warn("Failed to resolve proposal context before intake validation", {
          userId,
          error: error instanceof Error ? error.message : String(error),
        });
        return {} as ProposalKnowledgeContext;
      });

      const intakeAssessment = assessProposalIntake(proposalConversationText, proposalKnowledgeContext);
      proposalIntakeAssessment = intakeAssessment;
      proposalKnowledgeContext = {
        ...(proposalKnowledgeContext ?? {}),
        serviceName: intakeAssessment.snapshot.serviceName ?? proposalKnowledgeContext?.serviceName ?? undefined,
        threadMemoryContext,
        semanticMemoryContext: semanticMemoryContext || undefined,
        intake: intakeAssessment.snapshot,
      };
      log.info("Proposal intake assessed", {
        userId,
        ready: intakeAssessment.isReady,
        completenessScore: intakeAssessment.completenessScore,
        missingRequired: intakeAssessment.missingRequiredFields.map((field) => field.id),
        missingRecommended: intakeAssessment.missingRecommendedFields.map((field) => field.id),
      });

      if (!intakeAssessment.isReady) {
        if (await isStaleConversationUpdate()) {
          if (pendingMsgId) {
            await dismissPendingReply();
          }
          log.info("Skipping stale proposal clarification turn", {
            userId,
            updateId,
            conversationKey,
          });
          return;
        }

        if (pendingMsgId) {
          await dismissPendingReply();
        }

        if (threadId) {
          await updateThreadMemory(userId, threadId, {
            conversationKind: "proposal",
            proposalState: buildProposalThreadState(intakeAssessment, "clarification"),
          }).catch((error) => {
            log.warn("Failed to persist proposal clarification state", {
              userId,
              error: error instanceof Error ? error.message : String(error),
            });
          });
        }

        await sendProposalText(buildProposalClarificationReply(intakeAssessment));
        return;
      }
    }

    // --- TIMEOUT PROTECTION CIRCUIT BREAKER ---
    // Forces the promise to resolve internally if the LLM/Agent gets stuck processing tools
    log.info("Running agent cognition...", { userId, textLength: text.length });
    let proposalDraftJson: string | null = null;
    let proposalArtifactClientName: string | null = null;
    let resolvedProposalKnowledgeContext: ProposalKnowledgeContext | null = proposalKnowledgeContext ?? null;
    const ensureProposalKnowledgeContext = async (
      stage: "draft" | "artifact",
    ): Promise<ProposalKnowledgeContext> => {
      if (!resolvedProposalKnowledgeContext) {
        const contextStartedAt = Date.now();
        const baseProposalKnowledgeContext = await buildProposalKnowledgeContext(
          proposalConversationText,
          log,
          ctx.from?.first_name,
          { proposalMode },
        )
          .catch((error) => {
            log.warn("Failed to enrich proposal knowledge context", {
              userId,
              stage,
              error: error instanceof Error ? error.message : String(error),
            });
            return {} as ProposalKnowledgeContext;
          });

        resolvedProposalKnowledgeContext = {
          ...baseProposalKnowledgeContext,
          semanticMemoryContext: semanticMemoryContext || baseProposalKnowledgeContext.semanticMemoryContext,
        };

        log.info("Proposal knowledge context ready", {
          userId,
          stage,
          elapsedMs: Date.now() - contextStartedAt,
          hasExecutionPack: Boolean(resolvedProposalKnowledgeContext.executionPack),
          evidenceCount: resolvedProposalKnowledgeContext.evidence?.length ?? 0,
          processMatches: resolvedProposalKnowledgeContext.internalProcessCatalog?.length ?? 0,
        });
      } else if (
        semanticMemoryContext
        && semanticMemoryContext !== resolvedProposalKnowledgeContext.semanticMemoryContext
      ) {
        resolvedProposalKnowledgeContext = {
          ...resolvedProposalKnowledgeContext,
          semanticMemoryContext,
        };
      }

      return resolvedProposalKnowledgeContext;
    };
    const cognitionTask = (async () => {
      const directResponse = await tryOperationalRoute(text, intent, log);
      if (directResponse) {
        return directResponse;
      }

      if (proposalMode) {
        const resolvedProposalKnowledgeContext = await ensureProposalKnowledgeContext("draft");

        const draftStartedAt = Date.now();
        const proposalDraft = await composeCommercialProposalDraft(getAgentDeps(), {
          userId,
          requestText: proposalConversationText,
          knowledgeContext: resolvedProposalKnowledgeContext,
          agentName: runtime.instanceName,
        });
        log.info("Proposal draft composed", {
          userId,
          elapsedMs: Date.now() - draftStartedAt,
          clientName: proposalDraft.clientName,
          serviceName: proposalDraft.serviceName,
          steps: proposalDraft.steps.length,
          deliverables: proposalDraft.deliverables.length,
        });

        proposalDraftJson = JSON.stringify(proposalDraft);
        proposalArtifactClientName = proposalDraft.clientName;
        return buildProposalReadyReply(proposalDraft.clientName, proposalDraft.serviceName);
      }

      const responseContract = buildAgentResponseContract(intent);
      if (responseContract) {
        return runAgent(getAgentDeps(), userId, text, {
          responseContract,
          conversationContext,
        });
      }

      return runAgent(getAgentDeps(), userId, text, { conversationContext });
    })();

    let result = await Promise.race([
      cognitionTask,
      agentTimeoutPromise,
    ]).catch((err) => {
      log.error("Message handling failed or timed out", { userId, error: err.message || err });
      return `Lo siento, la solicitud tardó demasiado en procesarse (Timeout ${Math.floor(timeoutMs / 1000)}s). Por favor intenta de nuevo.`;
    });

    log.info("Agent cognition complete", { userId, resultLength: result.length });

    if (await isStaleConversationUpdate()) {
      if (pendingMsgId) {
        await dismissPendingReply();
      }
      log.info("Aborting stale Telegram update after cognition", {
        userId,
        updateId,
        conversationKey,
      });
      return;
    }

    let proposalArtifact:
      | ReturnType<typeof buildProposalArtifact>
      | null = null;
    let proposalArtifactBlocked = false;
    let publishedProposal: PublishedProposalArtifact | null = null;
    let proposalPublishFailed = false;

    if (proposalMode) {
      try {
        const resolvedProposalKnowledgeContext = await ensureProposalKnowledgeContext("artifact");

        const artifactStartedAt = Date.now();
        const candidateProposalArtifact = buildProposalArtifact(
          proposalConversationText,
          proposalDraftJson ?? result,
          new Date(),
          resolvedProposalKnowledgeContext,
        );
        log.info("Proposal artifact built", {
          userId,
          elapsedMs: Date.now() - artifactStartedAt,
          clientName: candidateProposalArtifact.clientName,
          serviceName: candidateProposalArtifact.serviceName,
          htmlLength: candidateProposalArtifact.html.length,
        });
        proposalArtifactClientName = candidateProposalArtifact.clientName;

        const proposalValidation = validateProposalArtifactHtml(candidateProposalArtifact.html);
        if (!proposalValidation.valid) {
          proposalPublishFailed = true;
          proposalArtifactBlocked = true;
          log.warn("Proposal artifact failed canonical validation", {
            userId,
            clientName: candidateProposalArtifact.clientName,
            repoPath: candidateProposalArtifact.repoPath,
            fileName: candidateProposalArtifact.fileName,
            validationIssueCount: proposalValidation.issues.length,
            blockingIssueCount: proposalValidation.issues.filter((issue) => issue.blocking).length,
            validationIssueCodes: [...new Set(proposalValidation.issues.map((issue) => issue.code))],
            validationIssues: summarizeProposalValidationIssues(proposalValidation.issues),
            error: formatProposalValidationError(proposalValidation),
          });
        } else {
          proposalArtifact = candidateProposalArtifact;
          const githubConfig = getGitHubProposalsConfig();

          if (githubConfig) {
            try {
              publishedProposal = await publishProposalArtifact(proposalArtifact, githubConfig);
              log.info("Proposal artifact published to GitHub", {
                userId,
                repoPath: publishedProposal.repoPath,
                viewUrl: publishedProposal.viewUrl,
                githubUrl: publishedProposal.githubUrl,
                pagesReady: publishedProposal.pagesReady,
                verificationOk: publishedProposal.verification?.ok ?? null,
              });
              if (!publishedProposal.pagesReady) {
                log.warn("GitHub Pages still propagating proposal publication", {
                  userId,
                  repoPath: publishedProposal.repoPath,
                  pagesUrl: publishedProposal.pagesUrl,
                });
              }
              if (publishedProposal.verification && !publishedProposal.verification.ok) {
                log.warn("Published proposal link verification reported degraded status", {
                  userId,
                  repoPath: publishedProposal.repoPath,
                  issues: publishedProposal.verification.issues,
                  pagesReady: publishedProposal.pagesReady,
                });
              }
            } catch (error) {
              proposalPublishFailed = true;
              log.warn("Proposal GitHub publication failed", {
                userId,
                clientName: proposalArtifact.clientName,
                repoPath: proposalArtifact.repoPath,
                fileName: proposalArtifact.fileName,
                githubOwner: githubConfig.owner,
                githubRepo: githubConfig.repo,
                githubBranch: githubConfig.branch,
                publishTransports: {
                  rest: Boolean(githubConfig.token?.trim()),
                  ssh: Boolean(githubConfig.sshKey?.trim()),
                },
                error: describeUnknownError(error),
              });
            }
          } else {
            proposalPublishFailed = true;
            log.info("Proposal artifact generated without GitHub publishing config", {
              userId,
              fileName: proposalArtifact.fileName,
            });
          }
        }
      } catch (error) {
        proposalPublishFailed = true;
        log.warn("Proposal artifact generation failed before publication", {
          userId,
          clientName: proposalArtifactClientName,
          error: describeUnknownError(error),
        });
      }

      if (!proposalArtifact && !proposalArtifactBlocked) {
        const fallbackDraft = proposalDraftJson ? parseProposalDraft(proposalDraftJson) : null;
        const clientName =
          proposalArtifactClientName
          ?? proposalKnowledgeContext?.intake?.clientName
          ?? extractClientNameFromRequest(proposalConversationText)
          ?? extractClientNameFromRequest(result)
          ?? "Cliente por confirmar";
        const requestDate = formatProposalDate(new Date());
        const folderName = `${slugifyClientName(clientName)}-${requestDate}`;
        proposalArtifact = {
          clientName,
          clientSlug: slugifyClientName(clientName),
          serviceName: "Propuesta comercial",
          processName: "Proceso por precisar",
          requestDate,
          folderName,
          repoPath: `proposals/${folderName}/index.html`,
          fileName: `${folderName}.html`,
          sections: fallbackDraft?.sections ?? parseProposalStageSections(result),
          html: formatStageBlock("Propuesta", [result]),
        } as ReturnType<typeof buildProposalArtifact>;
        proposalPublishFailed = true;
        log.warn("Proposal artifact downgraded to fallback HTML attachment", {
          userId,
          clientName: proposalArtifact.clientName,
          repoPath: proposalArtifact.repoPath,
          fileName: proposalArtifact.fileName,
          hadStructuredDraft: Boolean(fallbackDraft),
        });
      }
    }

    if (threadId && !(await isStaleConversationUpdate())) {
      try {
        if (proposalMode && proposalIntakeAssessment) {
          const proposalStatus = publishedProposal
            ? "published"
            : proposalArtifact
              ? "drafted"
              : "ready";
          await updateThreadMemory(userId, threadId, {
            conversationKind: "proposal",
            proposalState: buildProposalThreadState(proposalIntakeAssessment, proposalStatus),
          });
        } else {
          await updateThreadMemory(userId, threadId, {
            conversationKind: "general",
            lastUserMessagePreview: text,
            lastAssistantMessagePreview: result,
          });
        }
      } catch (error) {
        log.warn("Failed to persist thread memory snapshot", {
          userId,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    } else if (threadId) {
      log.info("Skipping stale thread-memory persistence", {
        userId,
        updateId,
        conversationKey,
      });
    }

    // --- EGRESS FALLBACK & FORMATTING LOOP ---
    // Ensures robust message delivery even if Telegram's strict HTML parser fails
    const sendWithFallback = async (replyChunks: string[], useHtml = true) => {
      log.info("Sending response to Telegram...", { userId, chunkCount: replyChunks.length, useHtml });
      for (let i = 0; i < replyChunks.length; i++) {
        const chunk = replyChunks[i];
        try {
          await sendProposalText(chunk, useHtml);
          log.info("Sent chunk successfully", { userId, chunkIndex: i });
        } catch (err: unknown) {
             const errObj = err as { description?: string };
             log.error("Failed to send reply chunk", { userId, chunkIndex: i, error: err, chunkPreview: chunk.slice(0, 100) });
             
             if (useHtml && errObj?.description?.includes("can't parse entities")) {
                log.warn("Telegram HTML parse error, retrying as plain text", { userId });
                const plainChunk = stripHtml(chunk);
                await sendWithFallback([plainChunk], false);
             }
        }
      }
    };

    // Parse Markdown to Telegram-HTML
    const htmlFormatted = formatForTelegram(result);
    const chunks = splitMessageHtml(htmlFormatted);

    // Remove the tracking message to give a clean final output
    if (pendingMsgId) {
      await dismissPendingReply();
    }

    await sendWithFallback(chunks, true);

    if (publishedProposal && proposalArtifact) {
      await sendProposalText(
        buildPublishedProposalReply(proposalArtifact.clientName, publishedProposal),
        true,
      ).then(() => {
        log.info("Sent published proposal links", {
          userId,
          clientName: proposalArtifact.clientName,
          repoPath: publishedProposal.repoPath,
          viewUrl: publishedProposal.viewUrl,
          githubUrl: publishedProposal.githubUrl,
        });
      }).catch((error) => {
        log.error("Failed to send published proposal links", {
          userId,
          error,
        });
      });
    }

    if (proposalArtifact && proposalPublishFailed) {
      await sendProposalText(buildProposalFallbackReply(proposalArtifact.clientName, true), true).catch((error) => {
        log.error("Failed to send proposal fallback notice", {
          userId,
          error,
        });
      });
    }

    if (!proposalArtifact && proposalMode) {
      const clientName =
        proposalArtifactClientName
        ?? proposalKnowledgeContext?.intake?.clientName
        ?? extractClientNameFromRequest(text)
        ?? extractClientNameFromRequest(result)
        ?? "Cliente por confirmar";
      log.warn("Proposal artifact missing before delivery", {
        userId,
        clientName,
        artifactBlocked: proposalArtifactBlocked,
        proposalPublishFailed,
        hadDraftJson: Boolean(proposalDraftJson),
        hadPublishedProposal: Boolean(publishedProposal),
      });
      await sendProposalText(buildProposalFallbackReply(clientName, false), true).catch((error) => {
        log.error("Failed to send proposal fallback notice (no artifact)", {
          userId,
          error,
        });
      });
    }

    if (proposalArtifact) {
      const proposalDocument = new InputFile(Buffer.from(proposalArtifact.html, "utf8"), proposalArtifact.fileName);
      const proposalCaption = `HTML autocontenido generado para ${proposalArtifact.clientName}.`;

      const sendProposalDocument = deliverProposalPrivately
        ? () => sendDocumentFresh(
            proposalDeliveryTargetId,
            proposalDocument,
            { caption: proposalCaption },
          )
        : () => replyWithDocumentFresh(
            proposalDocument,
            { caption: proposalCaption },
          );

      await sendProposalDocument().catch((error) => {
        log.error("Failed to send proposal HTML document", {
          userId,
          error,
        });
      }).then((deliveryResult) => {
        if (!deliveryResult) {
          return;
        }
        log.info("Sent proposal HTML document", {
          userId,
          clientName: proposalArtifact.clientName,
          fileName: proposalArtifact.fileName,
          deliveredPrivately: deliverProposalPrivately,
          targetChatId: deliverProposalPrivately ? proposalDeliveryTargetId : ctx.chat?.id ?? null,
        });
      });
    }
  });


  // Error handler
  bot.catch((err) => {
    log.error("Bot error", { error: err.error });
    err.ctx.reply("An error occurred. Please try again.").catch(() => {});
  });

  return bot;
}
