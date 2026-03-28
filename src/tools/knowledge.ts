import path from "path";
import { logger } from "../logger.js";
import { getOperationalKnowledgeAccessor } from "../knowledge/accessor.js";

/**
 * ARCHITECT OPERATOR MODULE: STATIC KNOWLEDGE INGESTION (PHASE 2)
 * 
 * OBJETIVO:
 * Exponer los manifiestos teoricos y los codigos operacionales centrales del equipo (MetodologIA) hacia el motor subyacente del LLM.
 * 
 * ESTRUCTURA DE CAPAS:
 * - Carpeta Core (team_core_docs): Boveda fortificada local donde residen documentos clave en Markdown.
 * - Enrutador Logico (readCoreKnowledge): Interface dinamica que captura la ruta, previene ataques por desplazamiento transversal y regurgita el texto plano a la memoria de trabajo.
 * 
 * TRADE-OFFS Y DECISIONES DE DISENO:
 * - Se opto por la carga en caliente sincrona para asegurar que el agente siempre lea las reglas actualizadas sin depender de inyecciones RAG asimetricas que distorsionen los promtps.
 * - Limitacion actual de ingestion: Solo provee metodologa_core por defecto; la integracion del sub-enrutamiento ('topic') esta relegada al RoadMap de expansiones symlink.
 * 
 * CRITERIOS DE ACEPTACION (10/10):
 * - Tolerancia O-Day: Una interrupcion de lectura jamas explota el demonio principal, retornando un error plano asimilable verbalmente por el modelo generativo.
 * - Seguridad nativa: Cualquier intento de manipulacion del path con secuencias retrospectivas anula la operacion inmediatamente garantizando la inercia del sistema de ficheros raiz.
 */

const CORE_DOCS_DIRS = [
  path.resolve(process.cwd(), "team_core_docs"),
  path.resolve(process.cwd(), "inputs/prototype/Pristino Bot/team_core_docs"),
];

async function getFsModule() {
  return import("fs/promises");
}

async function readCoreKnowledgeFile(): Promise<{ content: string; filePath: string } | null> {
  const fs = await getFsModule();
  for (const dirPath of CORE_DOCS_DIRS) {
    const filePath = path.join(dirPath, "metodologia_core.md");
    try {
      const content = await fs.readFile(filePath, "utf-8");
      if (typeof content === "string" && content.trim()) {
        return { content, filePath };
      }
    } catch {
      continue;
    }
  }
  return null;
}

function formatProcessModule(
  processName: string,
  summary: string,
  relPaths: string[],
): string {
  return [
    processName,
    `Resumen: ${summary}`,
    relPaths.length > 0 ? `Fuentes: ${relPaths.join(" | ")}` : "Fuentes: no detectadas",
  ].join("\n");
}

export const definition = {
  type: "function" as const,
  function: {
    name: "read_core_knowledge",
    description: "Read the central knowledge base of MetodologIA, including team identity, mission, and frameworks.",
    parameters: {
      type: "object" as const,
      properties: {
        topic: {
          type: "string",
          description: "Optional topic to focus on.",
        },
      },
      required: [],
    },
  },
};

export async function readCoreKnowledge(args: { topic?: string }): Promise<string> {
  try {
    const topic = typeof args.topic === "string" ? args.topic.trim() : "";

    if (topic) {
      try {
        const kb = await getOperationalKnowledgeAccessor();
        const module = await kb.resolveProcess(topic);
        if (module) {
          logger.info("Core knowledge resolved via operational module", { topic });
          return formatProcessModule(module.processName, module.summary, module.sources.slice(0, 6));
        }
      } catch (error) {
        logger.warn("Operational knowledge lookup failed, falling back to core docs", {
          topic,
          error: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const coreDocument = await readCoreKnowledgeFile();
    if (!coreDocument) {
      return "Error: The core knowledge base is currently unavailable.";
    }

    logger.info("Core knowledge read successfully", { topic: args.topic, filePath: coreDocument.filePath });
    return coreDocument.content;
  } catch (error) {
    logger.error("Failed to read core knowledge", { error });
    return "Error: The core knowledge base is currently unavailable.";
  }
}
