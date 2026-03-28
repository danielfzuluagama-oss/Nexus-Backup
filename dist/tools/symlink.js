import fs from 'fs';
import path from 'path';
import { logger } from '../logger.js';
import { registerTool } from './registry.js';
export async function initializeOpenClawSymlinks(registryPath) {
    logger.info("Iniciando escaneo hibrido de OpenClaw Symlink Registry", { registryPath });
    // 1. CARGA DECLARATIVA (openclaw-registry.json)
    if (fs.existsSync(registryPath)) {
        try {
            const rawData = fs.readFileSync(registryPath, 'utf8');
            const registry = JSON.parse(rawData);
            // Eliminado el linter targetWarning para map
            for (const skill of registry.skills) {
                if (skill.status !== "active") {
                    logger.info("Omitiendo skill pendiente de instalacion", { name: skill.name });
                    continue;
                }
                const toolName = `${skill.namespace}_${skill.name}`;
                const definition = {
                    type: "function",
                    function: {
                        name: toolName,
                        description: skill.description,
                        parameters: skill.parameters
                    }
                };
                const executor = async (args) => {
                    logger.info("Ejecutando OpenClaw Skill", { toolName, args });
                    return "Ejecucion estructural mockeada pre-Fase3 para: " + toolName;
                };
                registerTool(definition, executor);
                logger.info("Symlink inyectado y Skill registrado exitosamente", { toolName });
            }
        }
        catch (error) {
            logger.error("Error critico parsing OpenClaw Registry", { error });
        }
    }
    else {
        logger.warn("No se encontro el archivo de registro JSON Mapeado OpenClaw", { registryPath });
    }
    // 2. CARGA DINAMICA POR DISCOVERY FISICO (.openclaw-skills symlinks Antigravity)
    const globalVaultPath = path.resolve(process.cwd(), ".openclaw-skills"); // Directorio enlazado localmente
    try {
        if (fs.existsSync(globalVaultPath)) {
            const symlinkFiles = await fs.promises.readdir(globalVaultPath);
            logger.info(`Boveda fisica abierta, ${symlinkFiles.length} skills detectados para hidratacion futura/pasiva en Antigravity.`);
            // Fase 3 requerirá parsear el .md / frontmatter de cada archivo para instanciar la Herramienta LLM real de cada uno.
        }
        else {
            logger.warn("El vault fisico de symlinks globales (.openclaw-skills) no fuel localizados en la raiz de Pristino.");
        }
    }
    catch (e) {
        logger.warn("Fallo el chequeo direccional al vault de symlinks fisico.");
    }
}
