---
name: crear-proceso-metodologia
description: Versión auto-contenida para la creación de Documentos Canónicos de Proceso (L3) en MetodologIA.
metadata:
  version: v3.0.0
  status: Entrusted Edition
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-ritual
---

# 065-crear-proceso-metodologia v3.0.0 (Entrusted Edition)

## 0. Entrusted Scaffolding

> **Standard**: This skill adheres to the **Entrusted Reference Standard** (MetodologIA Track).

* **SOTA**: `reference/state_of_the_art.md` (Process Theory 2025.Q1)
* **Governance**: `reference/best_practices.md` (MetodologIA Lock)
* **Ontology**: `reference/knowledge_graph.md` (Gov-Ops Method)
* **Gate**: `reference/self_evaluation.md` (Excellence Rubric)

## 1. Aesthetic Signature (Neo-Swiss Clean)

| Attribute | Value | Usage |
| :--- | :--- | :--- |
| **Primary** | `#122562` (Navy) | Backgrounds, Headers |
| **Accent** | `#FFD700` (Gold) | Highlights, CTAs |
| **Typography** | Poppins / Montserrat | Professional Clarity |
| **Composition** | Swiss Grid (Columnar) | Order & Balance |

---

## 2. Operational Workflow (Workflow Forge)

### 2.1 Fase de Definición (Observe)

* **RACI**: Definir Accountable único y responsabilidades HITL (Autor, Orchestrator, Revisor, Dueño).
* **KPI Analysis**: Identificar métricas Leading (señal temprana) e Impacto (Lagging).

### 2.2 Fase de Estructuración (Act)

* **FLOW**: Diagramar el flujo macro: `[Trigger] → [Fases] → [Gates] → [Output Final]`.
* **SOP MAPPING**: Identificar y declarar los SOPs (Nivel Mesos) necesarios.
* **MOAT SCAFFOLDING**: Crear el sub-repo de referencias for el nuevo proceso.

### 2.3 Fase de Verificación (Verify)

* **Quality Gate**: Auditar el borrador contra el "Checklist de Excelencia" (Sección 5).

---

## 3. Estructura Canónica Obligatoria (L1_PROCESO)

El output final debe contener EXACTAMENTE estas secciones:

* **Propósito**: Por qué existe y qué problema organizacional resuelve.
* **RACI Macro**: Tabla de responsabilidades para las actividades principales.
* **Fases del Proceso**: Objetivo, Input, Output, SOPs y Skills asociados por fase.
* **Gates**: Criterios, Evidencia mínima y Aprobador por cada puerta de calidad.
* **Métricas**: Tipo (Leading/Lagging), Frecuencia y Fuente (Dashboard).
* **Riesgos**: Matriz de Señal Temprana y Mitigación.
* **Artefactos Gobernados**: Tabla con Nombre, Tipo (SOP/Skill), Versión y Ubicación.

---

## 4. Protocolo de Registro

Todo proceso nuevo DEBE ser indexado en el registro central para garantizar la trazabilidad:

1. **Name**: Usar `kebab-case` para el nombre del archivo.
2. **Slug**: Definir la ruta canónica en `/docs/procesos/`.
3. **Registry**: Actualizar `coreIndexMaster.md` con la nueva referencia L3.

---

## 5. Guardrails Innegociables

* **Triple Loop Rule**: El proceso debe permitir el aprendizaje operacional (vía feedback loops).
* **Ritual Exclusion**: Un proceso NO define pasos atómicos; delega la ejecución a SOPs.
* **Accountability Gate**: Prohibido más de un "Accountable" (A) por actividad en la RACI.
* **Metric Link**: Al menos un KPI debe estar vinculado al estándar de métricas organizacional.
* **Void Pattern**: Si un input es desconocido, marcar como "PENDIENTE" con un plan de captura.

---

## 6. Checklist de Excelencia (Quality Gatekeeper)

* [ ] Propósito alineado a la estrategia organizacional.
* [ ] RACI completa sin ambigüedades.
* [ ] Flujo visualizable (Trigger -> Output).
* [ ] Gates con evidencia verificable (no subjetiva).
* [ ] KPI Leading definido para detectar fallos.
* [ ] Registro en `coreIndexMaster.md` verificado.

---

## 7. Antipatrones

| Señal | Corrección |
| :--- | :--- |
| Múltiples Accountables | Reducir a un único Accountable por línea de RACI. |
| Fases sin SOP asociado | Validar si la fase requiere un nuevo SOP o simplificación. |
| Mezcla de Procesos y Rituales | Separar la orquestación (Proceso) de la ejecución (Ritual). |

---

## 8. Changelog

* v3.0.0 — **Entrusted Upgrade**: Adopción de Scaffolding Entrusted, Identidad Visual Neo-Swiss y Protocolo de Registro.
* v2.1.0 — Upgrade Moat Edition.
* v2.0.0 — Versión auto-contenida con gobernanza L3.

---
Powered by MetodologIA Governance Protocol
