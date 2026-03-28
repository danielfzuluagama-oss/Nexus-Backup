type Level = "info" | "warn" | "error";

export interface Logger {
  info: (msg: string, data?: unknown) => void;
  warn: (msg: string, data?: unknown) => void;
  error: (msg: string, data?: unknown) => void;
}

function log(level: Level, message: string, data?: unknown, instancePrefix?: string): void {
  const ts = new Date().toISOString();
  const parts = [`[${ts}]`];
  if (instancePrefix) parts.push(`[${instancePrefix}]`);
  parts.push(`[${level.toUpperCase()}]`);
  const prefix = parts.join(" ");
  if (data !== undefined) {
    console[level](prefix, message, data);
  } else {
    console[level](prefix, message);
  }
}

/** Default logger (no instance prefix — backward compatible). */
export const logger: Logger = {
  info: (msg: string, data?: unknown) => log("info", msg, data),
  warn: (msg: string, data?: unknown) => log("warn", msg, data),
  error: (msg: string, data?: unknown) => log("error", msg, data),
};

/** Create a logger with an instance prefix, e.g. [PRISTINO] or [DEONTO]. */
export function createLogger(instanceName: string): Logger {
  const prefix = instanceName.toUpperCase();
  return {
    info: (msg: string, data?: unknown) => log("info", msg, data, prefix),
    warn: (msg: string, data?: unknown) => log("warn", msg, data, prefix),
    error: (msg: string, data?: unknown) => log("error", msg, data, prefix),
  };
}
