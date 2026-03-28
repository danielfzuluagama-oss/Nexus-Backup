import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";
export const definition = {
    type: "function",
    function: {
        name: "search_operational_knowledge",
        description: "Search the Nexus knowledge base built from MetodologIA operational inputs, processes, rituals, standards, and consolidated RAG assets.",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "Question, activity, deliverable, or operational concept to retrieve.",
                },
                process_id: {
                    type: "string",
                    description: "Optional process id or process name to narrow the search.",
                },
                limit: {
                    type: "number",
                    description: "Maximum number of chunks to return. Defaults to 5.",
                },
            },
            required: ["query"],
        },
    },
};
export async function execute(args) {
    const query = typeof args.query === "string" ? args.query.trim() : "";
    const processId = typeof args.process_id === "string" ? args.process_id.trim() : undefined;
    const limit = typeof args.limit === "number" && args.limit > 0 ? Math.floor(args.limit) : 5;
    if (!query) {
        return "Error: query is required.";
    }
    try {
        const kb = await getOperationalKnowledgeAccessor();
        const matches = await kb.search(query, { processId, limit });
        if (matches.length === 0) {
            return `No encontré evidencia relevante en la base operativa para: ${query}`;
        }
        const lines = matches.map((match, index) => {
            const score = typeof match.score === "number" ? match.score.toFixed(1) : "0.0";
            const location = match.processName
                ? `${match.processName} · ${match.relPath}`
                : match.relPath;
            return [
                `${index + 1}. [score ${score}] ${location}`,
                `Resumen: ${match.summary}`,
                `Fragmento: ${match.content.slice(0, 500)}`,
            ].join("\n");
        });
        return lines.join("\n\n");
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: la base operativa de Nexus no está disponible todavía. ${message}`;
    }
}
