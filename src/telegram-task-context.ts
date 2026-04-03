import type { Update } from "@grammyjs/types";

export type TelegramTaskSource = "webhook" | "pubsub-push" | "local";

export interface TelegramTaskContext {
  executionId: string;
  source: TelegramTaskSource;
  ingressReceivedAt: number | null;
  queuedAt: number | null;
  traceHeader: string | null;
  webhookPath: string | null;
  workerReceivedAt?: number | null;
  queueWaitMs?: number | null;
}

type UpdateWithTaskContext = Update & {
  __nexusTaskContext?: TelegramTaskContext;
};

const TASK_CONTEXT_KEY = "__nexusTaskContext";

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeNullableTimestamp(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

function normalizeNullableDuration(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

export function getTelegramUpdateUserId(update: Update): number | undefined {
  const candidateIds = [
    (update as { message?: { from?: { id?: number } } }).message?.from?.id,
    (update as { edited_message?: { from?: { id?: number } } }).edited_message?.from?.id,
    (update as { callback_query?: { from?: { id?: number } } }).callback_query?.from?.id,
    (update as { inline_query?: { from?: { id?: number } } }).inline_query?.from?.id,
    (update as { chosen_inline_result?: { from?: { id?: number } } }).chosen_inline_result?.from?.id,
    (update as { my_chat_member?: { from?: { id?: number } } }).my_chat_member?.from?.id,
    (update as { chat_member?: { from?: { id?: number } } }).chat_member?.from?.id,
    (update as { chat_join_request?: { from?: { id?: number } } }).chat_join_request?.from?.id,
  ];

  return candidateIds.find((candidateId) =>
    typeof candidateId === "number" && Number.isInteger(candidateId) && candidateId > 0,
  );
}

export function buildTelegramExecutionId(
  botName: string,
  updateId: number,
  userId?: number,
): string {
  const normalizedBotName = botName.trim().toLowerCase() || "telegram";
  const normalizedUpdateId = Number.isInteger(updateId) && updateId > 0 ? updateId : 0;
  const userSegment =
    typeof userId === "number" && Number.isInteger(userId) && userId > 0
      ? `-${userId}`
      : "";

  return `${normalizedBotName}${userSegment}-${normalizedUpdateId}-${Date.now().toString(36)}`;
}

export function createTelegramTaskContext(params: {
  botName: string;
  updateId: number;
  userId?: number;
  source: TelegramTaskSource;
  ingressReceivedAt?: number | null;
  queuedAt?: number | null;
  traceHeader?: string | null;
  webhookPath?: string | null;
  executionId?: string | null;
}): TelegramTaskContext {
  return {
    executionId:
      normalizeNullableString(params.executionId)
      ?? buildTelegramExecutionId(params.botName, params.updateId, params.userId),
    source: params.source,
    ingressReceivedAt: normalizeNullableTimestamp(params.ingressReceivedAt),
    queuedAt: normalizeNullableTimestamp(params.queuedAt),
    traceHeader: normalizeNullableString(params.traceHeader),
    webhookPath: normalizeNullableString(params.webhookPath),
  };
}

export function parseTelegramTaskContext(raw: unknown): TelegramTaskContext | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const candidate = raw as Record<string, unknown>;
  const executionId = normalizeNullableString(candidate.executionId);
  const source = candidate.source;

  if (!executionId) {
    return null;
  }

  if (source !== "webhook" && source !== "pubsub-push" && source !== "local") {
    return null;
  }

  return {
    executionId,
    source,
    ingressReceivedAt: normalizeNullableTimestamp(candidate.ingressReceivedAt),
    queuedAt: normalizeNullableTimestamp(candidate.queuedAt),
    traceHeader: normalizeNullableString(candidate.traceHeader),
    webhookPath: normalizeNullableString(candidate.webhookPath),
    workerReceivedAt: normalizeNullableTimestamp(candidate.workerReceivedAt),
    queueWaitMs: normalizeNullableDuration(candidate.queueWaitMs),
  };
}

export function attachTelegramTaskContext<T extends Update>(
  update: T,
  taskContext: TelegramTaskContext,
): T {
  (update as UpdateWithTaskContext)[TASK_CONTEXT_KEY] = taskContext;
  return update;
}

export function readTelegramTaskContext(update: Update | Record<string, unknown>): TelegramTaskContext | null {
  return parseTelegramTaskContext((update as UpdateWithTaskContext)[TASK_CONTEXT_KEY]);
}
