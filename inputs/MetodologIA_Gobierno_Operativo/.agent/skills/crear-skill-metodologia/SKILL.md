---
name: crear-skill-metodologia
description: Forja nuevas capacidades IA-native (Skills) integradas en el Gobierno MetodologIA. Úsalo cuando el usuario pida "crear un skill", "automatizar un nuevo ritual" o "diseñar una capacidad autónoma".
metadata:
  version: v2.2.0
  status: Estándar
  criticality: alto
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-ritual
---

# crear-skill-metodologia (Moat Edition)

Este skill es el **Baluarte de Diferenciación** de MetodologIA. No solo crea archivos; orquesta un ecosistema de alta densidad contextual, garantizando que cada capacidad sea un **"Sovereign Asset"** fundamentado en evidencia, trazabilidad y diseño defensivo.

## 1. Protocolo de Ejecución

1. **SYNERGISTIC LOADING:** Cargar el contexto desde el sub-repo de referencia (`estado-del-arte`, `body-of-knowledge`, `best-practices`, `use-cases`, `prompts`) antes de proponer cualquier lógica.
2. **EVIDENCE TRIANGULATION:** Garantizar que cada regla técnica se sustenta en al menos 3 fuentes o pro-tips de los pilares de referencia (Evidencia v10x).
3. **TRIPLE LOOP VALIDATION:**
   - **Loop 1 (Lógica):** Alineación con la Ontología MetodologIA.
   - **Loop 2 (Calidad):** Cumplimiento de QA-14 y Rúbrica de Excelencia (10/10).
   - **Loop 3 (Adversarial):** Simulación de fallos ("Void UI") y resolución de paradojas de diseño.
4. **PACKAGING & TRACEABILITY:** Generar la estructura modular kebab-case y mapear cada instrucción 1:1 a su origen documental.

## 2. Estructura del SKILL.md (Blueprint v1)

Cada `SKILL.md` debe ser autónomo y contener:

- **Instrucciones:** Pasos numerados y accionables para la IA.
- **Guardrails:** Instrucciones de seguridad y manejo de incertidumbre.
- **Referencias de Contexto:** Rutas a los 5 archivos de conocimiento (`estado-del-arte`, `body-of-knowledge`, `best-practices`, `use-cases`, `prompts`).
- **Checklists:** Listas de Ejecución, Calidad (Gate) y Veracidad (RAG).
- **Guía Táctica:** Archivo `references/paso-a-paso.md` alineado al estándar operativo.
- **Antipatrones:** Tabla de Señal vs Corrección.
- **Changelog:** Historial de versiones (SemVer).

## 3. Checklist de Calidad del Skill (QA-14)

Para declarar un skill como PILOTO, debe cumplir:

- `SKILL.md` existe con frontmatter completo.
- `name` es kebab-case y único.
- `criticality` definido (bajo/medio/alto).
- `references/` contiene los 5 pilares operativos + `paso-a-paso.md`.
- `meta/knowledge-graph.md` homologado visualmente.
- Guardrails incluyen **Void Pattern** y **Paradox UI**.
- FAQ tiene al menos 2 entradas.
- Adversarial+ ejecutado (0 hallazgos severidad alta).

## 4. Fase de Certificación (Gate)

Todo skill debe pasar por el ritual de **Certificación de Excelencia** antes de ser estandarizado:
1. **RUBRIC CHECK:** Autoevaluación 10/10.

2. **LINT PURGE:** Cero advertencias de formato.

3. **LOG RECORD:** Registro de trazabilidad en `L4_CONSOLIDACION`.

## 4. Reglas de Transición (ENTRUSTED)

- **Piloto:** QA ≥ 10/14.
- **Validado:** QA ≥ 12/14 + 5 ejecuciones reales.
- **Estándar:** QA 14/14 + Score ENTRUSTED 10/10 + 90 días estable.

## 5. El Moat de MetodologIA (Diferenciación)

Para lograr el estado de **Moat**, el skill debe:
- **Sobrepasar Expectativas:** Inyectar siempre un "Factor Sorpresa" (un escenario no previsto por el usuario pero crítico para la operación).
- **Diseño Defensivo:** El skill debe ser capaz de decir "NO" o "DETENERSE" si detecta una brecha de evidencia técnica.
- **Trazabilidad de Élite:** El usuario debe poder auditar el origen de cada palabra en el skill final.
- **Identidad Soberana:** Todo activo visual generado debe cumplir con el estándar **Neo‑Swiss Clean and Soft Explainer** (Referencia: `visual-identity.md`).

## 6. FAQ

- **P:** ¿Puede un skill en estado "Piloto" ser usado en producción?
- **R:** Sí, pero no puede ser usado en flujos críticos hasta que alcance estado "Validado" (>12/14 QA).
- **P:** ¿Es obligatorio tener los 5 archivos de knowledge para un skill nuevo?
- **R:** Sí. El estándar v2.1.0 exige los 5 pilares para garantizar que el agente tiene contexto suficiente para "sorprender y sobrepasar expectativas".

## 7. Antipatrones

| Señal | Corrección |
| --- | --- |
| Skill sin references espejo | Sincronizar con el repo de rituales antes de cualquier uso. |

## 8. Changelog

- v2.2.0 — **Moat Upgrade**: Inyección obligatoria de `paso-a-paso.md` y Puerta de Certificación 10/10.
- v2.1.0 — Evolución a metodología de Alto Contexto (5 pilares: Estado del Arte, BoK, Best Practices, Use Cases, Prompts).
- v2.0.0 — Versión auto-contenida con QA-14 y Blueprint v1 integrado.
- v1.0.0 — Versión inicial con dependencias externas.

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
