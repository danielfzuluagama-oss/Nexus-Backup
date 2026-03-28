---
id: "11"

segmento: "representantes-comerciales"
journey: "success"
proceso: "gestionar-exito"
sop: "sop-11-success"
ritual-slug: "11-certificar-competencia-comercial"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "por-evento (30 días post-onboarding o primera venta)"
herramientas:

- "CRM"
- "Zoom"
- "Google Forms"

entry-criteria:

- "Rep tiene ≥30 días de actividad O cerró primera venta"

exit-criteria:

- "Evaluación de 2 dimensiones completada"
- "Certificación: Certified / Probation / Revoke"
kpi: "Certification Rate (Target: ≥75% certified en primer intento)"
leading-indicators:

- "Quiz score promedio"
- "Sales score promedio en mystery call"
- "% de probation que se certifican en re-try"

riesgos-controles:

- riesgo: "Certificar por default (sin evaluación real)"

  control: "Evaluación formal con score y evidencia"

- riesgo: "Rep certificado que vende mal"

  control: "Mystery Call: una llamada de venta del rep observada sin aviso"
evidencias:

- "Certification_Score (0-100)"
- "Mystery Call evaluada con rubric"
- "Certification status registrado"
---

# Ritual: Certificar Competencia Comercial — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **Certificación del rep tiene SOLO 2 dimensiones (vs 3 del embajador):**
>
> 1. **Conocimiento de Producto (0-50):** ¿Puede explicar los programas con precisión?
> 2. **Competencia de Venta (0-50):** ¿Puede ejecutar una venta consultiva real?
>
> **NO evalúa facilitación ni operación** (eso es solo para embajadores).

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** 30 días post-onboarding o cuando el rep cierra su primera venta (lo que ocurra primero).
- **Pre-ritual:** ¿El rep ha tenido actividad comercial? ¿Hay grabaciones de sus calls? ¿El quiz está actualizado?
- **Contexto:** La certificación valida que el rep puede representar a MetodologIA con calidad. No es un examen — es una verificación de que el onboarding funcionó. El mystery call es el diferenciador: evalúa venta real, no teoría.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Evaluar las competencias comerciales del rep y decidir si puede continuar autónomamente.
- **Definición de Éxito (DoD):**
  - [ ] Quiz de producto completado (0-50)
  - [ ] Mystery call evaluada (0-50)
  - [ ] Certification_Score calculado
  - [ ] Classification: Certified / Probation / Revoke
  - [ ] Feedback entregado
- **Definición de Éxito Comercial:** "Cada rep que representa MetodologIA en el mercado tiene competencia verificada."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Evalúa y decide certificación |
| **Responsible** | Sales Director / Growth Lead | Prepara quiz y evalúa mystery call |

| **Consulted** | Consultant Lead | Valida respuestas de producto |
| **Informed** | Ops | Actualiza status del rep |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Rep con ≥30 días de actividad o primera venta
- [ ] Quiz de 20 preguntas actualizado
- [ ] Grabaciones de calls del rep disponibles (o escenario de simulación)
- [ ] Rubric de evaluación (4 criterios × 5 pts) lista

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Quiz de producto (20 preguntas) | Forms | Sales Director |
| Grabaciones de calls del rep | CRM / Zoom | Rep |
| Rubric de venta (R05) | Drive | Sales Director |

---

## 5. Ejecutar — Parte 1: Evaluación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Quiz de conocimiento de producto (20 preguntas)

**Acción:** Quiz online con 20 preguntas: qué problema resuelve [programa], para quién es, pricing, diferenciadores, manejo de objeciones.

**Output:** Quiz_Score: [X]/50.
**Evidencia:** Google Forms results.

### 5.2 — Seleccionar call para mystery evaluation

**Contexto:** Si el rep ya tiene grabaciones de calls reales → evaluar una real. Si no → simular.

**Acción:** Seleccionar grabación sin avisar al rep cuál se evaluará.
**Output:** Call seleccionada.

**Evidencia:** Grabación.

### 5.3 — Evaluar mystery call con rubric (4 criterios)

**Acción:** Evaluar con los mismos 4 criterios de R05:

1. **Apertura:** ¿Capta atención? (1-12.5)
2. **Discovery:** ¿Pregunta antes de presentar? (1-12.5)
3. **Objeciones:** ¿Resuelve con valor? (1-12.5)
4. **Cierre:** ¿Pide siguiente paso? (1-12.5)
**Output:** Sales_Score: [X]/50.

**Evidencia:** Rubric completada.

### 5.4 — Calcular Certification_Score (0-100)

**Acción:** Quiz_Score (0-50) + Sales_Score (0-50) = Certification_Score.

**Output:** Certification_Score.
**Evidencia:** CRM.

### 5.5 — Clasificar: Certified / Probation / Revoke

**Acción:**

- **Certified (≥70):** Rep habilitado. Puede operar autónomamente.
- **Probation (50-69):** 30 días adicionales + coaching específico. Re-evaluación.
- **Revoke (<50):** Performance review formal. Considerar terminación.

**Output:** Classification.
**Evidencia:** CRM.

### 5.6 — Preparar feedback detallado por dimensión

**Acción:** Para cada dimensión: score, fortalezas, gaps, acciones recomendadas.

**Output:** Feedback document.
**Evidencia:** Doc.

### 5.7 — Feedback session (15 min)

**Script:** "Tu Certification Score es [X]: Quiz [Y]/50 + Sales [Z]/50. [Feedback por dimensión]. Lo que haces bien: [fortalezas]. Para mejorar: [gaps]. [Siguiente paso según classification]."

**Output:** Feedback entregado.
**Evidencia:** Notas.

### 5.8 — Si Certified: celebrar + habilitar funciones avanzadas

**Script:** "¡Oficialmente certificado como representante MetodologIA! A partir de ahora tienes acceso a [funciones avanzadas: propuestas premium, productos adicionales]."

**Output:** Certification celebrada + upgrades aplicados.
**Evidencia:** CRM — Certification_Status = Certified.

### 5.9 — Si Probation: crear plan de coaching de 30 días

**Acción:** Identificar el gap principal (producto o venta) y diseñar plan: sesiones de práctica, materiales adicionales, mentor.

**Output:** Coaching plan.
**Evidencia:** Doc + CRM tarea.

### 5.10 — Si Revoke: iniciar performance review

**Acción:** Reunión formal con Sales Director: ¿qué falló? ¿Es recuperable? ¿Es un problem de fit o de esfuerzo?

**Output:** Performance review iniciado.
**Evidencia:** CRM + Doc.

---

## 6. Ejecutar — Parte 2: Seguimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Registrar certificación en CRM

**Output:** CRM actualizado. **Evidencia:** CRM.

### 6.2 — Si Probation: ejecutar sesión de coaching semana 2

**Output:** Coaching ejecutado. **Evidencia:** Notas.

### 6.3 — Si Probation: ejecutar sesión de coaching semana 4

**Output:** Coaching ejecutado. **Evidencia:** Notas.

### 6.4 — Si Probation: re-evaluar en día 30

**Output:** Re-Certification_Score. **Evidencia:** Forms + Rubric.

### 6.5 — Analizar Certification Rate del programa

**Output:** Insights de efectividad del onboarding. **Evidencia:** Dashboard.

### 6.6 — Retroalimentar onboarding si el certification rate es bajo

**Output:** Feedback para R09. **Evidencia:** Nota.

### 6.7 — Compartir resultados con equipo

**Output:** Team update. **Evidencia:** Slack.

### 6.8 — Actualizar quiz si hay gaps recurrentes

**Output:** Quiz actualizado. **Evidencia:** Forms.

### 6.9 — Archivar evaluaciones

**Output:** Archivo. **Evidencia:** Drive.

### 6.10 — Cerrar ciclo R11

**Output:** Log. **Evidencia:** Log.

---

## 7-10. Producción, QA, Outputs y Cierre

### 7. Consolidación (7.1-7.10)

7.1-7.5 — Verificar que todos los Certified tienen accesos actualizados, documentar best practices, calibrar rubric.
7.6-7.10 — Generar reporte, retroalimentar proceso, archivar, cerrar ciclo.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Quiz de 20 preguntas completado
- [ ] Mystery call evaluada con rubric
- [ ] Certification_Score calculado (no estimado)
- [ ] Feedback entregado con acciones concretas
- [ ] Classification fundamentada

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| Certification_Score ≥ 70 (para Certified) | ☐ | Forms + Rubric |
| Feedback entregado | ☐ | Notas |

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Certification_Score | Numérico | CRM | Sales Director |
| Mystery call evaluation | Rubric | Drive | Sales Director |
| Coaching plan (si Probation) | Doc | Drive | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [12-supervisar-primera-venta-real](../../growth/expandir-valor/sop-12-expansion/12-supervisar-primera-venta-real-ritual.md)
- **Datos que hereda:** Certification_Score, gaps identificados, coaching plan
- **Condición de handoff:** Certification_Status = Certified

### KPI

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Certification Rate (primer intento) | — | ≥75% | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 12 → supervisar-primera-venta-real`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Sales Certification Evaluator" (Prompt Pro)

```markdown
PROMPT:
"Evalúa la competencia comercial de un representante:
Rep: [nombre], 30 días de actividad, [N] oportunidades abiertas, [N] calls realizadas.
Dimensión 1: Conocimiento de producto (generar quiz de 20 preguntas con respuestas)
Dimensión 2: Competencia de venta (evaluar grabación con 4 criterios: apertura, discovery, objeciones, cierre)
Output: Certification_Score /100, classification (Certified/Probation/Revoke), feedback detallado por dimensión."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
