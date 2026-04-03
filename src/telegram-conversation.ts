export interface TelegramConversationIdentity {
  chatId?: number | string | null;
  userId?: number | string | null;
  messageThreadId?: number | string | null;
}

function normalizeTelegramId(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined) {
    return null;
  }

  const normalized = String(value).trim();
  return normalized ? normalized.replace(/[^a-zA-Z0-9_-]+/g, "_") : null;
}

export function getTelegramMessageThreadId(
  message: { message_thread_id?: unknown } | null | undefined,
): number | null {
  const raw = message?.message_thread_id;
  return typeof raw === "number" && Number.isInteger(raw) && raw > 0 ? raw : null;
}

export function buildTelegramConversationKey(identity: TelegramConversationIdentity): string {
  const chatId = normalizeTelegramId(identity.chatId);
  const userId = normalizeTelegramId(identity.userId);
  const messageThreadId = normalizeTelegramId(identity.messageThreadId);

  if (chatId) {
    return messageThreadId
      ? `telegram_chat_${chatId}_thread_${messageThreadId}`
      : `telegram_chat_${chatId}_thread_root`;
  }

  if (userId) {
    return messageThreadId
      ? `telegram_user_${userId}_thread_${messageThreadId}`
      : `telegram_user_${userId}_thread_root`;
  }

  return messageThreadId
    ? `telegram_unknown_thread_${messageThreadId}`
    : "telegram_unknown_thread_root";
}
