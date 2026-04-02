import {
  summarizeControlledTemplate,
  type ControlledTemplateName,
} from "./controlled-deliverables.js";
import type { TelegramIntent } from "./telegram-intents.js";

function buildTemplateHint(templateName: ControlledTemplateName | null): string {
  if (!templateName) return "";
  if (templateName === "proposal") {
    return "Plantilla controlada sugerida: dossier ejecutivo con Hero, Diagnóstico, Journey, Programa, Modalidades, Objeciones, Credenciales, Equipo, Metodologías, ROI, Condiciones, FAQ, Glosario y Cierre.";
  }
  return `Plantilla controlada sugerida: ${summarizeControlledTemplate(templateName)}.`;
}

export function buildAgentResponseContract(intent: TelegramIntent): string | null {
  if (intent.responseMode === "default") {
    return null;
  }

  const templateHint = buildTemplateHint(intent.templateName);

  if (intent.responseMode === "staged_deliverable") {
    return [
      "Contrato de salida obligatorio para esta solicitud.",
      "Responde en cuatro bloques y en este orden exacto.",
      "ETAPA 1 | REPASO DE LO ENTENDIDO: confirma el pedido, el objetivo y los vacíos críticos sin inventar nada.",
      "ETAPA 2 | PLAN DE ACCION: define la secuencia de trabajo más corta y útil.",
      `ETAPA 3 | SCAFFOLD INICIAL: construye un borrador controlado por campos cortos. ${templateHint}`.trim(),
      "ETAPA 4 | SIGUIENTE PASO: deja una sola acción inmediata para continuar.",
      "Reglas: manten cada bloque compacto, accionable y sin relleno. Si falta información, dilo en ETAPA 4.",
    ].join("\n");
  }

  return [
    "Contrato de salida obligatorio para esta solicitud.",
    "Responde en cuatro bloques y en este orden exacto.",
    "ETAPA 1 | REPASO DE LO ENTENDIDO: resume lo que entendiste del pedido o del audio transcrito.",
    "ETAPA 2 | PLAN DE ACCION: enumera el camino de trabajo más corto y claro usando guiones simples.",
    `ETAPA 3 | SCAFFOLD INICIAL: entrega una estructura de trabajo compacta y controlada. ${templateHint}`.trim(),
    "ETAPA 4 | SIGUIENTE PASO: deja una sola acción inmediata para continuar sin ambigüedad.",
    "Reglas: no inventes contexto faltante, evita rodeos y mantén la respuesta orientada a ejecución.",
  ].join("\n");
}
