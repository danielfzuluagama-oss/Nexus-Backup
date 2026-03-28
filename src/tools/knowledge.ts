import fs from "fs/promises";
import path from "path";
import { logger } from "../logger.js";

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

const CORE_DOCS_DIR = path.resolve(process.cwd(), "team_core_docs");

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
    // La operacion en crudo asume el documento manifiesto principal de la arquitectura metodologica interna.
    // Proxima refactorizacion debe parsear el argumento 'topic' frente a una tabla pre-validada de ficheros estaticos seguros.
    const filePath = path.join(CORE_DOCS_DIR, "metodologia_core.md");
    
    // Filtro critico de seguridad para evitar saltos de directorio.
    if (!filePath.startsWith(CORE_DOCS_DIR)) {
      return "Error: Invalid path access attempt.";
    }

    const content = await fs.readFile(filePath, "utf-8");
    logger.info("Core knowledge read successfully", { topic: args.topic });
    return content;
  } catch (error) {
    logger.error("Failed to read core knowledge", { error });
    return "Error: The core knowledge base is currently unavailable.";
  }
}
