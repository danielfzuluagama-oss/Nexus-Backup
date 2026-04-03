export type ThreadConversationKind = "general" | "proposal" | "clarification" | "operational";
export type ThreadMessageRole = "user" | "assistant" | "system";
export type ThreadProposalStatus = "collecting" | "ready" | "drafted" | "published" | "clarification";

export interface ThreadProposalState {
  status: ThreadProposalStatus;
  clientName?: string | null;
  serviceName?: string | null;
  objective?: string | null;
  geography?: string | null;
  scope?: string | null;
  timeline?: string | null;
  investment?: string | null;
  nextStep?: string | null;
  completenessScore?: number;
  missingRequired?: string[];
  missingRecommended?: string[];
  openQuestions?: string[];
  updatedAt?: Date;
}

export interface ThreadMemorySnapshot {
  threadId: string;
  userId: string;
  title: string;
  status: "active" | "archived" | "pinned";
  agent: string;
  conversationKey?: string;
  conversationKind?: ThreadConversationKind;
  summary?: string;
  summaryVersion?: number;
  summaryUpdatedAt?: Date;
  lastMessageRole?: ThreadMessageRole;
  lastMessagePreview?: string;
  lastUserMessagePreview?: string;
  lastAssistantMessagePreview?: string;
  lastMessageAt?: Date;
  messageCount?: number;
  proposalState?: ThreadProposalState | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreadMemoryPatch {
  title?: string;
  status?: "active" | "archived" | "pinned";
  agent?: string;
  conversationKey?: string;
  conversationKind?: ThreadConversationKind;
  summary?: string;
  summaryVersion?: number;
  summaryUpdatedAt?: Date;
  lastMessageRole?: ThreadMessageRole;
  lastMessagePreview?: string;
  lastUserMessagePreview?: string;
  lastAssistantMessagePreview?: string;
  lastMessageAt?: Date;
  messageCount?: number;
  proposalState?: ThreadProposalState | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProposalSummaryInput {
  status: ThreadProposalStatus;
  clientName?: string | null;
  serviceName?: string | null;
  objective?: string | null;
  geography?: string | null;
  scope?: string | null;
  timeline?: string | null;
  investment?: string | null;
  nextStep?: string | null;
  completenessScore?: number;
  missingRequired?: string[];
  missingRecommended?: string[];
  openQuestions?: string[];
}

interface TurnSummaryInput {
  userMessage?: string | null;
  assistantMessage?: string | null;
}

function compactWhitespace(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/\u202f/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripMemoryNoise(value: string): string {
  return compactWhitespace(
    value
      .replace(/<\/?SYSTEM_OVERRIDE>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/\bURI:\s*\S+/gi, " ")
      .replace(/\bhttps?:\/\/\S+/gi, " ")
      .replace(/\bwww\.\S+/gi, " "),
  );
}

export function previewMemoryText(value: string | null | undefined, maxLength = 180): string {
  const cleaned = stripMemoryNoise(value ?? "");
  if (!cleaned) {
    return "";
  }
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  const shortened = cleaned.slice(0, maxLength);
  const breakpoint = shortened.lastIndexOf(" ");
  return `${(breakpoint > 80 ? shortened.slice(0, breakpoint) : shortened).trim()}...`;
}

function compactList(values: Array<string | null | undefined>): string {
  return values
    .map((value) => previewMemoryText(value))
    .filter(Boolean)
    .join(" · ");
}

function normalizeSummaryFragment(value: string | null | undefined): string {
  return previewMemoryText(value, 220);
}

export function buildProposalThreadSummary(input: ProposalSummaryInput): string {
  const statusLabels: Record<ThreadProposalStatus, string> = {
    collecting: "recopilación de datos",
    ready: "lista para generar borrador",
    drafted: "borrador generado",
    published: "publicada",
    clarification: "aclaración en curso",
  };

  const fragments = [
    `Propuesta comercial en ${statusLabels[input.status] ?? input.status} para ${normalizeSummaryFragment(input.clientName) || "cliente por confirmar"}.`,
    input.serviceName ? `Servicio: ${normalizeSummaryFragment(input.serviceName)}.` : "",
    input.objective ? `Objetivo: ${normalizeSummaryFragment(input.objective)}.` : "",
    input.geography ? `Mercado: ${normalizeSummaryFragment(input.geography)}.` : "",
    input.scope ? `Alcance: ${normalizeSummaryFragment(input.scope)}.` : "",
    input.timeline ? `Cronograma: ${normalizeSummaryFragment(input.timeline)}.` : "",
    input.investment ? `Inversión: ${normalizeSummaryFragment(input.investment)}.` : "",
    input.nextStep ? `Siguiente paso: ${normalizeSummaryFragment(input.nextStep)}.` : "",
    input.completenessScore != null ? `Completitud: ${Math.round(input.completenessScore)}%.` : "",
    input.missingRequired?.length ? `Pendientes obligatorios: ${compactList(input.missingRequired)}.` : "",
    input.missingRecommended?.length ? `Pendientes recomendados: ${compactList(input.missingRecommended)}.` : "",
    input.openQuestions?.length ? `Preguntas abiertas: ${compactList(input.openQuestions)}.` : "",
  ];

  return compactWhitespace(fragments.filter(Boolean).join(" "));
}

export function buildGeneralThreadSummary(
  title: string | null | undefined,
  turn: TurnSummaryInput = {},
): string {
  const normalizedTitle = previewMemoryText(title, 80) || "Conversación en curso";
  const userPreview = previewMemoryText(turn.userMessage, 180);
  const assistantPreview = previewMemoryText(turn.assistantMessage, 180);

  const fragments = [
    normalizedTitle.startsWith("Conversación") ? "Conversación en curso" : normalizedTitle,
    userPreview ? `Última solicitud: ${userPreview}` : "",
    assistantPreview ? `Última respuesta: ${assistantPreview}` : "",
  ];

  return compactWhitespace(fragments.filter(Boolean).join(" · "));
}

export function buildThreadMemoryContext(snapshot: ThreadMemorySnapshot | null | undefined): string {
  if (!snapshot) {
    return "";
  }

  const lines = [
    "Memoria persistida del hilo:",
    `- Título: ${previewMemoryText(snapshot.title, 100) || "Conversación en curso"}`,
    `- Tipo: ${snapshot.conversationKind ?? "general"}`,
  ];

  if (snapshot.summary) {
    lines.push(`- Resumen: ${previewMemoryText(snapshot.summary, 260)}`);
  }
  if (snapshot.lastUserMessagePreview && snapshot.lastUserMessagePreview !== snapshot.summary) {
    lines.push(`- Última solicitud: ${previewMemoryText(snapshot.lastUserMessagePreview, 180)}`);
  }
  if (snapshot.lastAssistantMessagePreview) {
    lines.push(`- Última respuesta: ${previewMemoryText(snapshot.lastAssistantMessagePreview, 180)}`);
  }
  if (snapshot.proposalState) {
    const proposal = snapshot.proposalState;
    lines.push(`- Estado comercial: ${proposal.status}`);
    lines.push(`- Cliente: ${previewMemoryText(proposal.clientName, 120) || "por confirmar"}`);
    lines.push(`- Servicio: ${previewMemoryText(proposal.serviceName, 120) || "por confirmar"}`);
    if (proposal.objective) {
      lines.push(`- Objetivo: ${previewMemoryText(proposal.objective, 220)}`);
    }
    if (proposal.missingRequired?.length) {
      lines.push(`- Campos pendientes: ${compactList(proposal.missingRequired)}`);
    }
    if (proposal.missingRecommended?.length) {
      lines.push(`- Datos recomendados pendientes: ${compactList(proposal.missingRecommended)}`);
    }
    if (proposal.openQuestions?.length) {
      lines.push(`- Preguntas abiertas: ${compactList(proposal.openQuestions)}`);
    }
  }
  if (snapshot.messageCount != null) {
    lines.push(`- Mensajes acumulados: ${snapshot.messageCount}`);
  }

  return lines.join("\n");
}
