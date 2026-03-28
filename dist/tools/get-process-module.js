import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";
export const definition = {
    type: "function",
    function: {
        name: "get_process_module",
        description: "Return the operational module for a MetodologIA process, including phases, gates, assets, SOPs, metrics, and execution capabilities.",
        parameters: {
            type: "object",
            properties: {
                process_id: {
                    type: "string",
                    description: "Process id or process name. Leave empty to list available process modules.",
                },
            },
            required: [],
        },
    },
};
export async function execute(args) {
    const processId = typeof args.process_id === "string" ? args.process_id.trim() : "";
    try {
        const kb = await getOperationalKnowledgeAccessor();
        if (!processId) {
            const processes = await kb.listProcesses();
            return processes
                .map((process, index) => `${index + 1}. ${process.processId} — ${process.processName}\nEstado: ${process.status}\nResumen: ${process.summary}`)
                .join("\n\n");
        }
        const module = await kb.resolveProcess(processId);
        if (!module) {
            return `Error: no encontré un módulo de proceso para "${processId}".`;
        }
        return [
            `${module.processName} (${module.processId})`,
            `Estado: ${module.status}`,
            `Resumen: ${module.summary}`,
            module.owners.length > 0 ? `Owners: ${module.owners.join(", ")}` : "Owners: no definidos en fuente",
            module.phases.length > 0 ? `Fases: ${module.phases.join(" | ")}` : "Fases: no detectadas",
            module.gates.length > 0 ? `Gates: ${module.gates.join(" | ")}` : "Gates: no detectados",
            module.assets.length > 0 ? `Assets: ${module.assets.join(" | ")}` : "Assets: no detectados",
            module.sops.length > 0 ? `SOPs: ${module.sops.join(" | ")}` : "SOPs: no detectados",
            module.metrics.length > 0 ? `Métricas: ${module.metrics.join(" | ")}` : "Métricas: no detectadas",
            `Capacidades onboarding: ${module.capabilities.onboarding.join(" | ")}`,
            `Capacidades asistencia: ${module.capabilities.assistance.join(" | ")}`,
            `Capacidades ejecución: ${module.capabilities.execution.join(" | ")}`,
        ].join("\n");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: no pude cargar los módulos operativos de Nexus. ${message}`;
    }
}
