---
name: auditoria-conformidad-metodologia
description: Proceso autónomo de auditoría y conformidad para asegurar que el repositorio MetodologIA cumple con los estándares L0-L4.
metadata:
  version: v2.2.0
  status: Estándar (Moat Edition)
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-ritual
---

# 064-auditoria-conformidad-metodologia v2.2.0 (Moat Edition)

## 0. Scaffolding (Moat Edition)

> **Standard**: This skill adheres to the **MetodologIA Moat Standard**.
>
### 3.1 Fase de Escaneo (Observe)

* **FILESYSTEM AUDIT:** Verificar Naming y Estructura profunda (estándar L0).
* **METADATA AUDIT:** Verificar Header, Versión y Changelog (estándar L0).

### 3.2 Fase de Análisis (Act)

* **GOVERNANCE AUDIT:** Verificar RACI y Ownership (estándar L3).
* **QUALITY AUDIT:** Ejecutar Gold Checklist de 18 ítems (Sección 2.3).

### 3.3 Fase de Cierre (Verify)

- **Loop 1 (Fidelidad de Estructura):** ¿Existen los sub-repos `references/` (con `paso-a-paso.md`) y `meta/` (con `knowledge-graph.md`)?
- **Loop 2 (Coherencia Táctica):** ¿El protocolo del `SKILL.md` es ejecutable siguiendo el `paso-a-paso.md`?
- **Loop 3 (Identidad Visual):** ¿Los grafos Mermaid usan el estándar Neo-Swiss (Oxford Blue: #122562, Cyber Yellow: #FFD700)?

## 2. Estándares de Conformidad Embebidos

### 2.1 Baseline (L0)

- **Naming:** `LAYER_TIPO_NOMBRE_vX.Y.Z.md`. Sin espacios ni caracteres especiales.
- **SemVer:** `vMAJOR.MINOR.PATCH`.
- **Header Obligatorio:** Debe incluir Versión, Estado, Owner y Fecha.
- **Changelog:** Obligatorio al final del archivo, orden cronológico descendente.
- **Evidencia:** Reclamos/decisiones sin evidencia clicable = "No pasa".

### 2.2 Gobernanza (L3)

- **Accountability:** Máximo 1 persona "Accountable" (A) por actividad.
- **Entrusted Score:** Según criticidad (Baja >7.0, Media >8.0, Alta >9.0).
- **Cadencias:** Verificar si el artefacto tiene una cadencia de revisión definida.

### 2.3 18 Estándares Mínimos (Meta-Ritual)

Verificar cumplimiento de:

1. Identidad versionada.
2. Doble formato (.md + .html).
3. Brecha y no-resultados.
4. Alcance y no-alcance (3 de cada).
5. Roles y ownership.
6. Procedimiento ejecutable (numerado).
7. Gate con evidencia.
8. DoD reforzada.
9. Métricas leading/lagging.
10. Registro y trazabilidad (bitácora).
11. Riesgos y mitigación (top 10).
12. Adversarial+ obligatorio (si criticidad alta).
13. Acelerador GenAI mínimo (≥1).
14. Acelerador integrado al workflow.
15. Packaging divulgable.
16. Evolución controlada (changelog).
17. Skill asociado (SKILL.md).
18. Espejo de references completo (incluyendo `paso-a-paso.md`).
19. Grafo de Conocimiento homologado visualmente.

## 3. Guardrails Operativos

- **Zero-Hallucination:** Si no existe evidencia física de un claim, reportar como FALLO de conformidad.
- **Evidence Path:** Las rutas de evidencia deben ser clicables y existir en el repo.
- **Void Pattern:** No sugerir contenido para llenar huecos de información; marcar como brecha de auditoría.

## 4. FAQ

- **P:** ¿Qué pasa si un artefacto no tiene slug definido?
- **R:** Reportar como FALLO de conformidad (estándar L0/L3).

## 5. Antipatrones

| Señal | Corrección |
| --- | --- |
| Aprobar sin evidencia clicable | Marcar como No Pasa; la evidencia es innegociable. |

## 7. Changelog

- v2.2.0 — **Standardization Upgrade**: Verificación mandatoria de `paso-a-paso.md` y Homologación de Grafos de Conocimiento.
- v2.1.0 — **Upgrade Moat Edition**: Integración de sub-repo de referencias, Triple Loop Validation y 5 pilares de conocimiento.
- v1.0.0 — Versión inicial autónoma integrando estándares L0-L4.

---
Powered by MetodologIA Governance Protocol

<!--
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @steward Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
-->
