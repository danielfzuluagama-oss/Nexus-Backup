---
name: homologar-knowledge-graph-metodologia
description: Skill para estandarizar la estética y semántica de los grafos Mermaid en todo el repositorio MetodologIA.
metadata:
  version: v1.0.0
  status: Estándar (Moat Edition)
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-referencia
---

# 069-homologar-knowledge-graph-metodologia v1.0.0 (Moat Edition)

## 1. Goal

Asegurar que todos los grafos de conocimiento (`knowledge-graph.md`) del repositorio sigan el mismo lenguaje visual, niveles de abstracción y estándares de colimetría. Este skill garantiza que el operador pueda leer cualquier grafo del sistema sin curva de aprendizaje adicional.

## 2. Meta-Protocol: Visual Symmetry

1. **Loop 1 (Semántica):** ¿Los IDs de los nodos siguen la convención kebab-case?

2. **Loop 2 (Estética):** ¿Se aplican las clases de estilo corporativas (Blue/Gold/Grey)?

3. **Loop 3 (Limpieza):** ¿Se han eliminado redundancias visuales o nodos obsoletos?

## 3. Protocolo de Ejecución

### 3.1 Fase de Auditoría Visual (Observe)

- **IDENTIFY:** Localizar el archivo `knowledge-graph.md`.
- **CHECK SYMBOLS:** Verificar uso de `-->` vs `-.->`.

### 3.2 Fase de Refactor (Act)

- **INJECT CLASSES:** Aplicar `classDef` estandarizado al inicio del Mermaid.
- **SLUG ALIGNMENT:** Renombrar etiquetas de nodos para que coincidan con los nombres reales de los skills/archivos.

### 3.3 Fase de Cierre (Verify)

- **RENDER TEST:** Verificar que el Mermaid sea válido y se renderice sin errores.

## 4. Changelog
- v1.0.0 — Versión inicial: Homologación visual de la arquitectura operativa.

---
Powered by MetodologIA Architecture Protocol

<!--
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @steward Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
-->
