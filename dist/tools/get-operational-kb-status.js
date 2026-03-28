import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";
export const definition = {
    type: "function",
    function: {
        name: "get_operational_kb_status",
        description: "Inspect the migration and coverage status of the Nexus operational knowledge base built from MetodologIA inputs.",
        parameters: {
            type: "object",
            properties: {
                process_id: {
                    type: "string",
                    description: "Optional process id or process name to inspect a single process coverage status.",
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
        if (processId) {
            const module = await kb.resolveProcess(processId);
            if (!module) {
                return `Error: no encontré estado para el proceso "${processId}".`;
            }
            return [
                `${module.processName} (${module.processId})`,
                `Estado: ${module.status}`,
                `Resumen: ${module.summary}`,
                `Cobertura: ${module.docCount} documentos, ${module.chunkCount} chunks`,
                module.sources.length > 0 ? `Fuentes: ${module.sources.join(" | ")}` : "Fuentes: no detectadas",
                module.sops.length > 0 ? `SOPs detectados: ${module.sops.join(" | ")}` : "SOPs detectados: no",
                module.assets.length > 0 ? `Assets detectados: ${module.assets.join(" | ")}` : "Assets detectados: no",
            ].join("\n");
        }
        const report = await kb.getReport();
        const ready = report.processes.filter((process) => process.status === "ready");
        const attention = report.processes.filter((process) => process.status === "needs_attention");
        return [
            "Estado de la base operativa de Nexus",
            `Documentos indexados: ${report.documentCount}`,
            `Chunks indexados: ${report.chunkCount}`,
            `Procesos declarados: ${report.declaredProcessCount}`,
            `Procesos listos: ${report.readyProcessCount}`,
            `Procesos con atención: ${report.needsAttentionProcessCount}`,
            ready.length > 0
                ? `Procesos listos: ${ready.map((process) => `${process.processId} (${process.docCount} docs, ${process.chunkCount} chunks)`).join(" | ")}`
                : "Procesos listos: ninguno",
            attention.length > 0
                ? `Procesos con atención: ${attention.map((process) => `${process.processId} (${process.docCount} docs, ${process.chunkCount} chunks)`).join(" | ")}`
                : "Procesos con atención: ninguno",
        ].join("\n");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: no pude inspeccionar el estado del KB operativo. ${message}`;
    }
}
