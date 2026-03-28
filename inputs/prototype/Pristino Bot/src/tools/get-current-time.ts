import type { ToolDefinition } from "./registry.js";

/**
 * ARCHITECT OPERATOR MODULE: TIME SYNCHRONIZATION KERNEL (PHASE 1)
 * 
 * OBJETIVO:
 * Anclar el contexto temporal del Agente al vector de realidad presente anclado a zonas horarias IANA.
 * Es crucial para la fiabilidad de ejecucion del Calendar Orchestrator y para evadir alucinaciones cronologicas del LLM.
 * 
 * TRADE-OFFS Y DECISIONES DE DISENO:
 * - Se delega integramente en el motor nativo de fechas de Node (V8) para evadir dependencias pesadas como moment o luxon.
 * - Tolerancia de fallback agresiva: Ante el mal formato de un timezone inyectado, retorna forzosamente formato ISO absoluto evitando colapsos sintacticos.
 */

export const definition: ToolDefinition = {
  type: "function",
  function: {
    name: "get_current_time",
    description:
      "Get the current date and time. Optionally specify a timezone (IANA format, e.g. 'America/New_York', 'Europe/London', 'Asia/Tokyo').",
    parameters: {
      type: "object",
      properties: {
        timezone: {
          type: "string",
          description: "IANA timezone (e.g. 'America/Bogota'). Defaults to UTC.",
        },
      },
      required: [],
    },
  },
};

/**
 * INYECCION TEMPORAL ACTIVA
 * Despliega la estampa de tiempo actual del sistema anfitrion formateada legiblemente para la inyeccion semantica del LLM.
 */
export function execute(args: Record<string, unknown>): string {
  const tz = typeof args.timezone === "string" ? args.timezone : "UTC";
  try {
    return new Date().toLocaleString("en-US", {
      timeZone: tz,
      dateStyle: "full",
      timeStyle: "long",
    });
  } catch {
    return new Date().toISOString();
  }
}
