# Nexus - Agentic Development Kit

Este repositorio es un backup completo del proyecto Nexus. 

## Reconstrucción de la Base de Conocimiento

Debido a los límites de tamaño de archivo de GitHub (100MB), el archivo de base de conocimiento operativa se ha dividido en partes. Para utilizar este repositorio después de clonarlo, debes reconstruir el archivo original ejecutando el siguiente comando:

```bash
cat workspace/knowledge/nexus-operational-kb.json.part-* > workspace/knowledge/nexus-operational-kb.json
```

### Archivos Divididos:
- `workspace/knowledge/nexus-operational-kb.json.part-aa`
- `workspace/knowledge/nexus-operational-kb.json.part-ab`

*Nota para Antigravity: Si estás leyendo esto después de una descarga inicial, por favor ejecuta el comando anterior antes de empezar a trabajar con el módulo de conocimiento.*

## Estructura del Proyecto

- `agents/`: Definiciones de agentes (orquestador, analista, etc.).
- `inputs/`: Insumos del proyecto, metodologías y guías.
- `src/`: Código fuente del bot y herramientas.
- `workspace/`: Espacio de trabajo para conocimiento y artefactos generados.

## Operacion Firebase

- Runbook del CLI: [docs/operations/firebase-cli-runbook.md](/Volumes/backup/Antigravity/Nexus/docs/operations/firebase-cli-runbook.md)

---
*Backup realizado por Antigravity el 2026-04-01 (Dossier v2026 + Core Bot).*
