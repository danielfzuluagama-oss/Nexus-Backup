export type ControlledTemplateName =
  | "execution_plan"
  | "proposal"
  | "brief"
  | "assessment";

export interface ControlledFieldSpec {
  key: string;
  heading: string;
  required: boolean;
  maxLength: number;
  placeholder: string;
}

export interface ControlledTemplateSpec {
  name: string;
  fields: ControlledFieldSpec[];
}

export const CONTROLLED_DELIVERABLE_TEMPLATES: Record<
  ControlledTemplateName,
  ControlledTemplateSpec
> = {
  execution_plan: {
    name: "Execution Plan",
    fields: [
      {
        key: "objective",
        heading: "Objetivo",
        required: true,
        maxLength: 420,
        placeholder: "Define el objetivo operativo exacto y el resultado esperado.",
      },
      {
        key: "scope",
        heading: "Alcance",
        required: true,
        maxLength: 520,
        placeholder: "Delimita proceso, actores, inputs y fronteras del trabajo.",
      },
      {
        key: "inputs",
        heading: "Insumos y Dependencias",
        required: true,
        maxLength: 650,
        placeholder: "Lista assets, SOPs, gates, owners y dependencias mínimas.",
      },
      {
        key: "steps",
        heading: "Pasos de Ejecución",
        required: true,
        maxLength: 1200,
        placeholder: "Secuencia breve de pasos accionables, uno por línea.",
      },
      {
        key: "evidence",
        heading: "Evidencia de Cierre",
        required: true,
        maxLength: 650,
        placeholder: "Qué evidencia debe quedar para considerar la tarea cerrada.",
      },
      {
        key: "risks",
        heading: "Riesgos y Controles",
        required: true,
        maxLength: 650,
        placeholder: "Riesgos principales y control preventivo para cada uno.",
      },
      {
        key: "next_step",
        heading: "Siguiente Paso",
        required: true,
        maxLength: 260,
        placeholder: "Acción inmediata y única que desbloquea la ejecución.",
      },
    ],
  },
  proposal: {
    name: "Proposal",
    fields: [
      {
        key: "summary",
        heading: "Resumen",
        required: true,
        maxLength: 600,
        placeholder: "Sintetiza la propuesta en lenguaje ejecutivo.",
      },
      {
        key: "problem",
        heading: "Problema",
        required: true,
        maxLength: 900,
        placeholder: "Describe el dolor, fricción o necesidad a resolver.",
      },
      {
        key: "solution",
        heading: "Solución Propuesta",
        required: true,
        maxLength: 1400,
        placeholder: "Explica enfoque, entregables y valor generado.",
      },
      {
        key: "timeline",
        heading: "Cronograma",
        required: false,
        maxLength: 700,
        placeholder: "Resume fases, hitos o tiempos estimados.",
      },
      {
        key: "investment",
        heading: "Inversión",
        required: false,
        maxLength: 500,
        placeholder: "Deja nota de esfuerzo, presupuesto o placeholder pendiente.",
      },
    ],
  },
  brief: {
    name: "Strategic Brief",
    fields: [
      {
        key: "objective",
        heading: "Objetivo",
        required: true,
        maxLength: 420,
        placeholder: "Qué decisión o resultado debe habilitar este brief.",
      },
      {
        key: "background",
        heading: "Antecedentes",
        required: true,
        maxLength: 900,
        placeholder: "Contexto mínimo para comprender el pedido.",
      },
      {
        key: "approach",
        heading: "Enfoque",
        required: true,
        maxLength: 1100,
        placeholder: "Método, hipótesis o estrategia recomendada.",
      },
      {
        key: "deliverables",
        heading: "Entregables",
        required: true,
        maxLength: 700,
        placeholder: "Lista compacta de salidas esperadas.",
      },
    ],
  },
  assessment: {
    name: "Assessment Report",
    fields: [
      {
        key: "executive_summary",
        heading: "Resumen Ejecutivo",
        required: true,
        maxLength: 650,
        placeholder: "Conclusión principal y decisión sugerida.",
      },
      {
        key: "context",
        heading: "Contexto y Alcance",
        required: true,
        maxLength: 900,
        placeholder: "Qué se evaluó, con qué límites y para qué propósito.",
      },
      {
        key: "findings",
        heading: "Hallazgos Principales",
        required: true,
        maxLength: 1400,
        placeholder: "Hallazgos concretos, riesgos y evidencias clave.",
      },
      {
        key: "recommendations",
        heading: "Recomendaciones",
        required: true,
        maxLength: 1000,
        placeholder: "Recomendaciones accionables, no genéricas.",
      },
      {
        key: "next_steps",
        heading: "Próximos Pasos",
        required: true,
        maxLength: 420,
        placeholder: "Siguiente acción prioritaria y criterio de avance.",
      },
    ],
  },
};

function getTemplate(templateName: ControlledTemplateName): ControlledTemplateSpec {
  return CONTROLLED_DELIVERABLE_TEMPLATES[templateName];
}

export function summarizeControlledTemplate(
  templateName: ControlledTemplateName,
): string {
  const template = getTemplate(templateName);
  return template.fields
    .map((field) => `${field.heading}<=${field.maxLength}c`)
    .join(" | ");
}

export function renderControlledScaffold(
  templateName: ControlledTemplateName,
  seed: Record<string, string> = {},
): string {
  const template = getTemplate(templateName);
  const lines: string[] = [`Plantilla controlada: ${template.name}`];

  for (const field of template.fields) {
    lines.push("");
    lines.push(field.heading);
    lines.push(
      `Limite: ${field.maxLength} caracteres${field.required ? " | obligatorio" : " | opcional"}`,
    );
    lines.push(seed[field.key]?.trim() || `[Pendiente] ${field.placeholder}`);
  }

  return lines.join("\n").trim();
}
