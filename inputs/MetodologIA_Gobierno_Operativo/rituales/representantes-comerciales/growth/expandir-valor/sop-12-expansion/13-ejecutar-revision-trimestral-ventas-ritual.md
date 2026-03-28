---
id: "13"

segmento: "representantes-comerciales"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "13-ejecutar-revision-trimestral-ventas"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "trimestral"
herramientas:

- "CRM"
- "Google Sheets"
- "Zoom"

entry-criteria:

- "Rep con ≥1 trimestre de actividad"

exit-criteria:

- "Performance review completado"
- "Quota attainment calculado"
- "Plan del próximo trimestre definido con 3 acciones concretas"

kpi: "Quota Attainment (Target: ≥80% del plan)"
leading-indicators:

- "Win rate (%)"
- "Avg deal size ($)"
- "Avg sales cycle (días)"
- "Pipeline coverage ratio"
riesgos-controles:

- riesgo: "QBR ceremonial sin acción"

  control: "Cada QBR produce 3 acciones concretas para el siguiente trimestre"

- riesgo: "Rep underperforming sin consecuencias"

  control: "2 trimestres consecutivos <50% quota = performance review formal"
evidencias:

- "QBR document"
- "Quota attainment %"
- "3 acciones del próximo Q con owner y fecha"
---

# Ritual: Ejecutar Revisión Trimestral de Ventas — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **QBR del rep es 100% COMERCIAL.** 30 min:
>
> 1. Resultados (10 min): ¿Cuánto vendiste vs plan?
> 2. Pipeline (10 min): ¿Qué hay en el funnel?
> 3. Plan Q+1 (10 min): ¿Qué vas a hacer diferente?

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Al cierre de cada trimestre, para cada rep con ≥1Q de actividad.
- **Pre-ritual:** ¿Los datos del CRM están actualizados? ¿El QBR report está pre-generado?
- **Contexto:** El QBR es el momento de verdad. No es una revisión burocrática — es una conversación de rendimiento que produce acción. El rep que no alcanza quota no es necesariamente malo; puede necesitar más soporte, otro territorio, o más productos. El QBR revela qué está pasando y qué hacer al respecto.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Revisar el rendimiento del rep, evaluar pipeline, y definir plan accionable para Q+1.
- **Definición de Éxito (DoD):**
  - [ ] QBR report pre-generado con IA
  - [ ] 3 bloques de 10 min completados
  - [ ] Quota attainment calculado y discutido
  - [ ] 3 acciones concretas definidas para Q+1
  - [ ] QBR doc archivado
- **Definición de Éxito del Rep:** "Sé exactamente cómo me fue, por qué, y qué voy a hacer diferente."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Conduce el QBR y aprueba plan Q+1 |
| **Responsible** | Growth Lead | Prepara data y QBR report |

| **Consulted** | Rep | Aporta contexto de campo |
| **Informed** | Finance | Sabe el revenue real de cada rep |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] CRM actualizado con deals del trimestre
- [ ] QBR report pre-generado
- [ ] Pipeline actual del rep exportado
- [ ] Quota del trimestre confirmada

---

## 5. Ejecutar — Parte 1: QBR

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Preparar QBR report con IA

**Prompt de IA:**

```markdown

PROMPT:
"Genera un QBR report para un representante comercial:
Rep: [nombre], Territorio: [X], Trimestre: QX.
Data: ventas cerradas [$], oportunidades abiertas [N], deals perdidos [N], quota [$].
Calcula: quota attainment %, win rate, avg deal size, avg sales cycle.
Output: 1-page report con score semáforo (🟢🟡🔴) por métrica."
```

**Output:** QBR report pre-generado.

**Evidencia:** Sheet.

### 5.2 — Bloque 1: Resultados (10 min)

**Script:** "Este trimestre: $[X] vendidos vs $[Y] de plan = [Z]% attainment. Win rate: [X]%. Deals perdidos: [N]. Las 3 razones principales de pérdida fueron: [lista]."

**Acción:** Discutir: ¿qué funcionó? ¿Qué no? ¿Fue un tema de actividad, de calidad de pipeline, o de cierre?
**Output:** Resultados revisados y contextualizados.

**Evidencia:** Notas.

### 5.3 — Bloque 2: Pipeline actual (10 min)

**Script:** "Tu pipeline tiene [N] oportunidades por $[X]. ¿Cuáles tienen mayor probabilidad de cierre? ¿Cuáles están estancadas >30 días? ¿Necesitas soporte en alguna?"

**Acción:** Revisar deal por deal. Identificar deals estancados y definir acción.
**Output:** Pipeline health check.

**Evidencia:** CRM.

### 5.4 — Bloque 3: Plan Q+1 (10 min)

**Script:** "Para el próximo trimestre: (1) Tu quota es $[X]. (2) Define 3 acciones concretas para mejorar. (3) ¿Necesitas algo de mi parte — más soporte en propuestas, más productos, otro territorio?"

**Output:** Plan Q+1 con 3 acciones.
**Evidencia:** Doc.

### 5.5 — Definir 3 acciones concretas con owner y fecha

**Acción:** Cada acción tiene: descripción, responsable, fecha límite. No más de 3 — focalizados.

**Output:** 3 acciones documentadas.
**Evidencia:** Doc.

### 5.6 — Evaluar si el rep necesita soporte adicional

**Acción:** ¿Coaching? ¿Más productos? ¿Ajuste de territorio? ¿Materiales específicos?

**Output:** Soporte needed: Sí (lista) / No.
**Evidencia:** Nota.

### 5.7 — Si 2Q consecutivos <50% quota: iniciar performance review

**Acción:** Reunión formal: ¿es un problema de fit, de esfuerzo, de mercado, o de soporte?

**Output:** Performance review (si aplica).
**Evidencia:** Doc.

### 5.8 — Celebrar wins del trimestre

**Script:** "Quiero reconocer [logro específico del rep]. Esto es exactamente lo que buscamos."

**Output:** Reconocimiento dado.
**Evidencia:** —

### 5.9 — Documentar QBR

**Acción:** Guardar: quota attainment, pipeline health, 3 acciones Q+1, soporte necesario.

**Output:** QBR doc archivado.
**Evidencia:** Drive.

### 5.10 — Registrar métricas R13

**Output:** Métricas. **Evidencia:** Dashboard.

---

## 6-7. Ejecutar — Parte 2 y 3: Seguimiento y Consolidación

### 6.1-6.5 — Seguimiento de acciones Q+1 en weekly calls

### 6.6-6.10 — Comparar performance entre reps, ajustar quotas si hay data nueva

### 7.1-7.5 — Generar reporte agregado de todos los reps, compartir con Finance

### 7.6-7.10 — Archivar QBRs, calibrar proceso, cerrar ciclo

---

## 8. Validación y Calidad (QA)

- [ ] QBR report con datos verificados
- [ ] 3 bloques ejecutados (no solo resultados)
- [ ] 3 acciones definidas con owner y fecha
- [ ] Performance review activado si 2Q <50%

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| QBR report | 1 página | Drive | Growth Lead |
| 3 acciones Q+1 | Doc | Drive | Sales Director |
| Pipeline health | CRM view | CRM | Rep |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [14-expandir-portafolio-de-productos](14-expandir-portafolio-de-productos-ritual.md) (si elegible)
- **Condición de handoff:** QBR completado + 3 acciones definidas

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Quota Attainment | ≥80% | 🟡 |
| Win Rate | ≥30% | 🟡 |

- **NEXT:** `representantes-comerciales → 14 → expandir-portafolio-de-productos`
- **BLOCKERS:** `NONE`

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
