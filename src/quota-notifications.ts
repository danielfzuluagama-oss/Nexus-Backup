const DEFAULT_COOLDOWN_MS = 15 * 60 * 1000;

const lastNotificationAt = new Map<string, number>();

function getCooldownMs(env: NodeJS.ProcessEnv = process.env): number {
  const raw = Number(env.QUOTA_NOTIFICATION_COOLDOWN_MS);
  if (Number.isFinite(raw) && raw >= 0) {
    return raw;
  }
  return DEFAULT_COOLDOWN_MS;
}

export function shouldSendQuotaNotification(
  agentName: string,
  provider: string,
  env: NodeJS.ProcessEnv = process.env,
  timestamp = Date.now(),
): boolean {
  const cooldownMs = getCooldownMs(env);
  const key = `${agentName}:${provider}`.toLowerCase();
  const lastSentAt = lastNotificationAt.get(key);

  if (typeof lastSentAt === "number" && timestamp - lastSentAt < cooldownMs) {
    return false;
  }

  lastNotificationAt.set(key, timestamp);
  return true;
}

export function resetQuotaNotificationThrottleForTests(): void {
  lastNotificationAt.clear();
}
