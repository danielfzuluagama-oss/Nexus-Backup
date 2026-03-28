function log(level, message, data, instancePrefix) {
    const ts = new Date().toISOString();
    const parts = [`[${ts}]`];
    if (instancePrefix)
        parts.push(`[${instancePrefix}]`);
    parts.push(`[${level.toUpperCase()}]`);
    const prefix = parts.join(" ");
    if (data !== undefined) {
        console[level](prefix, message, data);
    }
    else {
        console[level](prefix, message);
    }
}
/** Default logger (no instance prefix — backward compatible). */
export const logger = {
    info: (msg, data) => log("info", msg, data),
    warn: (msg, data) => log("warn", msg, data),
    error: (msg, data) => log("error", msg, data),
};
/** Create a logger with an instance prefix, e.g. [PRISTINO] or [DEONTO]. */
export function createLogger(instanceName) {
    const prefix = instanceName.toUpperCase();
    return {
        info: (msg, data) => log("info", msg, data, prefix),
        warn: (msg, data) => log("warn", msg, data, prefix),
        error: (msg, data) => log("error", msg, data, prefix),
    };
}
