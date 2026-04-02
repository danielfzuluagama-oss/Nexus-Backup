const STANDBY_ENABLED_VALUES = new Set(["1", "true", "standby", "paused", "pause"]);

const DEFAULT_STANDBY_MESSAGE =
  "Nexus esta en pausa operativa en este momento. El bot sigue desplegado, pero la capa cognitiva esta desactivada temporalmente para controlar consumo. Intenta de nuevo mas tarde.";

export function isStandbyModeEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw =
    env.TELEGRAM_BOT_MODE ??
    env.TELEGRAM_STANDBY_MODE ??
    env.BOT_STANDBY_MODE ??
    "";

  return STANDBY_ENABLED_VALUES.has(raw.trim().toLowerCase());
}

export function getStandbyMessage(env: NodeJS.ProcessEnv = process.env): string {
  const custom = env.TELEGRAM_STANDBY_MESSAGE?.trim();
  return custom || DEFAULT_STANDBY_MESSAGE;
}
