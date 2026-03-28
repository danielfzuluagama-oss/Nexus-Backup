# Ritual: {{RITUAL_NOMBRE}} — {{SEGMENTO}} (Sovereign v4.0)

---
id: "{{XX}}"
segmento: "{{SEGMENTO_SLUG}}"
journey: "{{JOURNEY_SLUG}}"
proceso: "{{PROCESO_SLUG}}"
sop: "sop-{{XX}}-{{SOP_SLUG}}"
ritual-slug: "{{XX}}-{{RITUAL_SLUG}}"
version: "v1.0.0"
estado: "Piloto"
owners:
  - dri: "{{DRI}}"
  - backup: "{{BACKUP}}"
frecuencia: "{{diaria|semanal|por-evento|trimestral}}"
herramientas:
  - "CRM"
  - "{{HERRAMIENTA_2}}"
  - "{{HERRAMIENTA_3}}"
entry-criteria:
  - "{{CONDICIÓN DE ENTRADA 1}}"
  - "{{CONDICIÓN DE ENTRADA 2}}"
exit-criteria:
  - "{{CONDICIÓN DE SALIDA 1}}"
  - "{{CONDICIÓN DE SALIDA 2}}"
kpi: "{{NOMBRE_KPI}} (Target: {{VALOR}})"
leading-indicators:
  - "{{INDICADOR ADELANTADO 1}}"
  - "{{INDICADOR ADELANTADO 2}}"
riesgos-controles:
  - riesgo: "{{DESCRIPCIÓN RIESGO 1}}"
    control: "{{MITIGACIÓN 1}}"
  - riesgo: "{{DESCRIPCIÓN RIESGO 2}}"
    control: "{{MITIGACIÓN 2}}"
evidencias:
  - "{{ARTEFACTO 1}} ({{UBICACIÓN: CRM/Drive/Ticket}})"
  - "{{ARTEFACTO 2}} ({{UBICACIÓN}})"
---

> [!IMPORTANT]
> **Estado:** Sovereign v4.0 — {{SEGMENTO}}
> **Objetivo:** {{OBJETIVO EN UNA LÍNEA}}
> **KPI:** {{NOMBRE_KPI}} (Target: {{VALOR}})

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** {{Evento o condición que activa este ritual}}
- **Pre-ritual:** ¿Se completó el ritual anterior ({{XX-1}}-{{slug-anterior}})? Si no, retroceder.
- **Contexto de negocio:** {{Por qué este paso existe en el journey del segmento}}

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** {{Verbo + resultado medible}}
- **Definición de Éxito (DoD):**
  - [ ] {{Criterio observable 1}}
  - [ ] {{Criterio observable 2}}
  - [ ] {{Criterio observable 3}}
- **Definición de Éxito del Cliente:** {{Cómo sabe el cliente que recibió valor}}

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |
| **Accountable** | {{DRI}} | {{Qué decide}} |
| **Responsible** | {{Ejecutor}} | {{Qué hace}} |
| **Consulted** | {{Consultor}} | {{Qué aporta}} |
| **Informed** | {{Informado}} | {{Qué recibe}} |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] {{Insumo 1 disponible}}
- [ ] {{Insumo 2 disponible}}
- [ ] {{Acceso a herramientas verificado}}

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |
| {{Material 1}} | {{Dónde se obtiene}} | {{Quién lo prepara}} |
| {{Material 2}} | {{Dónde se obtiene}} | {{Quién lo prepara}} |

---

## 5. Ejecutar — Parte 1: Setup y Descubrimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)
> Cada micro-paso = 1 acción principal → 1 output verificable

### 5.1 — {{Nombre del micro-paso}}

- **Input(s):** {{artefacto/dato requerido}}
- **Acción(es):** {{verbo operativo, checklistable}}
- **Output(s):** {{artefacto/evidencia concreta}}
- **Evidencia:** {{CRM / Drive / Ticket — dónde queda registrado}}

### 5.2 — {{Nombre del micro-paso}}

- **Input(s):** {{output de 5.1}}
- **Acción(es):** {{verbo operativo}}
- **Output(s):** {{artefacto/evidencia}}
- **Evidencia:** {{ubicación}}

### 5.3 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.4 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.5 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.6 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.7 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.8 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.9 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 5.10 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output consolidado de Parte 1}}
- **Evidencia:** {{ubicación}}

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — {{Nombre del micro-paso}}

- **Input(s):** {{output consolidado de Parte 1}}
- **Acción(es):** {{verbo operativo}}
- **Output(s):** {{artefacto/evidencia}}
- **Evidencia:** {{ubicación}}

### 6.2 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.3 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.4 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.5 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.6 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.7 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.8 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.9 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 6.10 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output consolidado de Parte 2}}
- **Evidencia:** {{ubicación}}

---

## 7. Ejecutar — Parte 3: Ejecución y Producción

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — {{Nombre del micro-paso}}

- **Input(s):** {{output consolidado de Parte 2}}
- **Acción(es):** {{verbo operativo}}
- **Output(s):** {{artefacto/evidencia}}
- **Evidencia:** {{ubicación}}

### 7.2 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.3 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.4 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.5 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.6 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.7 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.8 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.9 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{output}}
- **Evidencia:** {{ubicación}}

### 7.10 — {{Nombre del micro-paso}}

- **Input(s):** {{input}}
- **Acción(es):** {{acción}}
- **Output(s):** {{OUTPUT FINAL DEL RITUAL — artefacto principal}}
- **Evidencia:** {{ubicación final}}

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Todos los outputs de pasos 5-7 están registrados
- [ ] El KPI del ritual es medible con los datos actuales
- [ ] Ningún micro-paso usa "gratis/gratuito/sin costo"
- [ ] Las evidencias están en CRM (si aplica)
- [ ] El vocabulario es consistente con el Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |
| Outputs verificables en CRM | ☐ | {{link}} |
| DoD cumplido (Paso 2) | ☐ | {{link}} |
| Sin blockers abiertos | ☐ | {{link}} |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |
| {{Artefacto principal}} | {{.md/.pdf/.json}} | {{CRM/Drive/Repo}} | {{DRI}} |
| {{Artefacto secundario}} | {{formato}} | {{ubicación}} | {{responsable}} |

### Registro en CRM

- **Campo actualizado:** {{nombre del campo en CRM}}
- **Valor registrado:** {{qué se registra}}
- **Timestamp:** Automático al guardar

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [{{XX+1}}-{{slug-siguiente}}](../sop-{{XX+1}}-{{sop-slug}}/{{XX+1}}-{{slug-siguiente}}.md)
- **Datos que hereda:** {{qué outputs de este ritual son inputs del siguiente}}
- **Condición de handoff:** {{qué debe ser verdad para pasar}}

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |
| {{KPI principal}} | {{medición}} | {{target}} | 🟢/🟡/🔴 |
| {{Leading 1}} | {{medición}} | {{target}} | 🟢/🟡/🔴 |

### Cierre

- **NEXT:** `{{SEGMENTO}} → {{XX+1}} → {{slug-siguiente}}`
- **BLOCKERS:** `{{faltantes de fuentes/datos, o NONE}}`

---

> **Standard:** MetodologIA Sovereign v4.0 — Runbook Template
> **Powered by:** MetodologIA Governance Protocol

<!--
  @license Copyleft
  @copyright MetodologIA
  @template TEMPLATE_RITUAL_RUNBOOK v1.0.0
  @standard Sovereign v4.0 (10 macro + 30 micro)
-->
