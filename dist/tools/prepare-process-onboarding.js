import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";
export const definition = {
    type: "function",
    function: {
        name: "prepare_process_onboarding",
        description: "Build an onboarding pack for a MetodologIA operational process so Nexus can onboard a person, team, or client with evidence and process structure.",
        parameters: {
            type: "object",
            properties: {
                process_id: {
                    type: "string",
                    description: "Process id or process name to onboard.",
                },
                audience_role: {
                    type: "string",
                    description: "Who is being onboarded, for example PM, AE, cliente, implementador.",
                },
                objective: {
                    type: "string",
                    description: "Optional onboarding objective or context.",
                },
            },
            required: ["process_id"],
        },
    },
};
export async function execute(args) {
    const processId = typeof args.process_id === "string" ? args.process_id.trim() : "";
    const audienceRole = typeof args.audience_role === "string" && args.audience_role.trim()
        ? args.audience_role.trim()
        : "nuevo integrante";
    const objective = typeof args.objective === "string" ? args.objective.trim() : "";
    if (!processId) {
        return "Error: process_id is required.";
    }
    try {
        const kb = await getOperationalKnowledgeAccessor();
        const pack = await kb.createOnboardingPack(processId, audienceRole, objective);
        if (!pack) {
            return `Error: no pude construir onboarding para "${processId}".`;
        }
        const evidence = pack.evidence
            .map((chunk, index) => `${index + 1}. ${chunk.relPath}`)
            .join(" | ");
        return [
            `Onboarding de ${pack.processName} para ${pack.audienceRole}`,
            `Resumen: ${pack.summary}`,
            `Checklist inicial: ${pack.checklist.join(" | ")}`,
            `Walkthrough: ${pack.walkthrough.join(" | ")}`,
            pack.essentialAssets.length > 0
                ? `Assets esenciales: ${pack.essentialAssets.join(" | ")}`
                : "Assets esenciales: no detectados",
            pack.essentialSops.length > 0
                ? `SOPs esenciales: ${pack.essentialSops.join(" | ")}`
                : "SOPs esenciales: no detectados",
            `Preguntas de arranque: ${pack.firstQuestions.join(" | ")}`,
            evidence ? `Evidencia base: ${evidence}` : "Evidencia base: sin chunks relevantes",
        ].join("\n");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: no pude preparar el onboarding operativo. ${message}`;
    }
}
