const DEFAULT_COOLDOWN_MS = 15 * 60 * 1000;
const lastNotificationAt = new Map();
function getCooldownMs(env = process.env) {
    const raw = Number(env.QUOTA_NOTIFICATION_COOLDOWN_MS);
    if (Number.isFinite(raw) && raw >= 0) {
        return raw;
    }
    return DEFAULT_COOLDOWN_MS;
}
export function shouldSendQuotaNotification(agentName, provider, env = process.env, timestamp = Date.now()) {
    const cooldownMs = getCooldownMs(env);
    const key = `${agentName}:${provider}`.toLowerCase();
    const lastSentAt = lastNotificationAt.get(key);
    if (typeof lastSentAt === "number" && timestamp - lastSentAt < cooldownMs) {
        return false;
    }
    lastNotificationAt.set(key, timestamp);
    return true;
}
export function resetQuotaNotificationThrottleForTests() {
    lastNotificationAt.clear();
}
