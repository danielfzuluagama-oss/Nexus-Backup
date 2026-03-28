import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";
export const definition = {
    type: "function",
    function: {
        name: "prepare_process_execution",
        description: "Build an execution pack for a MetodologIA activity or deliverable so Nexus can assist or execute agentically with process grounding and evidence.",
        parameters: {
            type: "object",
            properties: {
                process_id: {
                    type: "string",
                    description: "Process id or process name where the activity belongs.",
                },
                deliverable: {
                    type: "string",
                    description: "Deliverable, activity, ritual, or operational output to execute.",
                },
                objective: {
                    type: "string",
                    description: "Optional business objective or execution context.",
                },
            },
            required: ["process_id", "deliverable"],
        },
    },
};
export async function execute(args) {
    const processId = typeof args.process_id === "string" ? args.process_id.trim() : "";
    const deliverable = typeof args.deliverable === "string" ? args.deliverable.trim() : "";
    const objective = typeof args.objective === "string" ? args.objective.trim() : "";
    if (!processId || !deliverable) {
        return "Error: process_id and deliverable are required.";
    }
    try {
        const kb = await getOperationalKnowledgeAccessor();
        const pack = await kb.createExecutionPack(processId, deliverable, objective);
        if (!pack) {
            return `Error: no pude construir ejecución para "${processId}".`;
        }
        const evidence = pack.evidence
            .map((chunk, index) => `${index + 1}. ${chunk.relPath}`)
            .join(" | ");
        return [
            `Ejecución de ${pack.deliverable} en ${pack.processName}`,
            `Objetivo: ${pack.objective}`,
            `Resumen del proceso: ${pack.summary}`,
            `Pasos recomendados: ${pack.recommendedSteps.join(" | ")}`,
            pack.gates.length > 0 ? `Gates: ${pack.gates.join(" | ")}` : "Gates: no detectados",
            pack.evidenceRequired.length > 0
                ? `Evidencia requerida: ${pack.evidenceRequired.join(" | ")}`
                : "Evidencia requerida: no detectada",
            pack.assets.length > 0 ? `Assets: ${pack.assets.join(" | ")}` : "Assets: no detectados",
            pack.sops.length > 0 ? `SOPs: ${pack.sops.join(" | ")}` : "SOPs: no detectados",
            `Riesgos: ${pack.risks.join(" | ")}`,
            evidence ? `Fuentes clave: ${evidence}` : "Fuentes clave: sin chunks relevantes",
        ].join("\n");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: no pude preparar la ejecución operativa. ${message}`;
    }
}
