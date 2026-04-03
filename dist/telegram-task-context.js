const TASK_CONTEXT_KEY = "__nexusTaskContext";
function normalizeNullableString(value) {
    if (typeof value !== "string") {
        return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}
function normalizeNullableTimestamp(value) {
    return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}
function normalizeNullableDuration(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}
export function getTelegramUpdateUserId(update) {
    const candidateIds = [
        update.message?.from?.id,
        update.edited_message?.from?.id,
        update.callback_query?.from?.id,
        update.inline_query?.from?.id,
        update.chosen_inline_result?.from?.id,
        update.my_chat_member?.from?.id,
        update.chat_member?.from?.id,
        update.chat_join_request?.from?.id,
    ];
    return candidateIds.find((candidateId) => typeof candidateId === "number" && Number.isInteger(candidateId) && candidateId > 0);
}
export function buildTelegramExecutionId(botName, updateId, userId) {
    const normalizedBotName = botName.trim().toLowerCase() || "telegram";
    const normalizedUpdateId = Number.isInteger(updateId) && updateId > 0 ? updateId : 0;
    const userSegment = typeof userId === "number" && Number.isInteger(userId) && userId > 0
        ? `-${userId}`
        : "";
    return `${normalizedBotName}${userSegment}-${normalizedUpdateId}-${Date.now().toString(36)}`;
}
export function createTelegramTaskContext(params) {
    return {
        executionId: normalizeNullableString(params.executionId)
            ?? buildTelegramExecutionId(params.botName, params.updateId, params.userId),
        source: params.source,
        ingressReceivedAt: normalizeNullableTimestamp(params.ingressReceivedAt),
        queuedAt: normalizeNullableTimestamp(params.queuedAt),
        traceHeader: normalizeNullableString(params.traceHeader),
        webhookPath: normalizeNullableString(params.webhookPath),
    };
}
export function parseTelegramTaskContext(raw) {
    if (!raw || typeof raw !== "object") {
        return null;
    }
    const candidate = raw;
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
export function attachTelegramTaskContext(update, taskContext) {
    update[TASK_CONTEXT_KEY] = taskContext;
    return update;
}
export function readTelegramTaskContext(update) {
    return parseTelegramTaskContext(update[TASK_CONTEXT_KEY]);
}
