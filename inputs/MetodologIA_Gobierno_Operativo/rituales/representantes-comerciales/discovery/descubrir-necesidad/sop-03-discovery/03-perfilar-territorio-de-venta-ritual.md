---
id: "03"

segmento: "representantes-comerciales"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "03-perfilar-territorio-de-venta"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "AI Agent"
frecuencia: "por-evento (candidato Invited)"
herramientas:

- "CRM"
- "Perplexity"
- "Google Sheets"

entry-criteria:

- "Candidato clasificado como Invite (Ritual 02)"
- "Scorecard R02 disponible"
exit-criteria:

- "Territorio mapped: # de empresas target, competencia, pricing benchmark"
- "Monthly Revenue Potential estimado"
- "Territory Assignment preparado"

kpi: "Territory Accuracy (Target: ≥70% del potencial estimado se materializa en Y1)"
leading-indicators:

- "# empresas target identificadas por territorio"
- "Revenue Potential estimado vs real"
- "Competitive density"

riesgos-controles:

- riesgo: "Sobre-estimar potencial del territorio"

  control: "Estimate conservador: usar bottom-up (# empresas × % penetración × ticket promedio)"

- riesgo: "Asignar territorio sin data"

  control: "IA research obligatorio antes de asignación"

- riesgo: "Overlap con zonas de embajadores no detectado"

  control: "Cross-check con mapa de nodos antes de confirmar"
evidencias:

- "Territory profile doc"
- "Revenue potential estimate (3 escenarios)"
- "Territory Assignment doc"
---

# Ritual: Perfilar Territorio de Venta — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **Focus 100% comercial:** Aquí NO se evalúa la capacidad del candidato (eso fue R02) — se evalúa si el TERRITORIO tiene suficiente potencial para justificar un representante.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Cuando un candidato pasa R02 con clasificación Invite.
- **Pre-ritual:** ¿El candidato tiene Fit_Status = Invite? ¿Su territorio propuesto está disponible? Si hay duda sobre el territorio, resolver antes de iniciar el profiling.
- **Contexto:** Un buen representante en un mal territorio = fracaso. Este ritual valida que el territorio tiene suficiente mercado para justificar la inversión de tiempo del rep. Usamos IA para acelerar la investigación, pero los números se validan con datos bottom-up.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Investigar y documentar el potencial comercial del territorio del candidato para tomar una decisión informada de asignación.
- **Definición de Éxito (DoD):**
  - [ ] Market intelligence completo (empresas, sectores, competencia)
  - [ ] Revenue Potential estimado en 3 escenarios
  - [ ] Territory Assignment doc preparado
  - [ ] Candidato valida el territorio como viable
  - [ ] Sales Director aprueba la asignación
- **Definición de Éxito Comercial:** "Cada territorio asignado tiene potencial demostrable para generar al menos $[X]/mes."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Aprueba asignación territorial |
| **Responsible** | AI Agent / Growth Lead | Ejecuta investigación de mercado |

| **Consulted** | Candidato | Valida información y aporta conocimiento local |
| **Informed** | Ops | Actualiza mapa territorial |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Candidato con Fit_Status = Invite (R02)
- [ ] Territorio propuesto definido (zona geográfica)
- [ ] Mapa de embajadores y reps activos disponible para overlap check
- [ ] Google Sheets template de Revenue Potential preparado
- [ ] Perplexity / IA disponible para research

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Mapa territorial actual | Drive | Ops |
| Template Revenue Potential | Sheets | Sales Director |
| Pricing actual de programas | Drive — Comercial | Sales Director |

---

## 5. Ejecutar — Parte 1: Investigación del Territorio

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Investigar mercado del territorio con IA

**Prompt de IA:**

```markdown

PROMPT:
"Investiga el mercado para servicios de formación y consultoría empresarial en [territorio]:
1. # estimado de empresas medianas y grandes (>50 empleados)
2. Sectores dominantes (industria, servicios, tech, etc.)
3. Competencia existente en formación/consultoría
4. Pricing benchmark de programas similares en la zona
5. Eventos y comunidades empresariales locales
Formato: 5 bullet points con datos verificables."
```

**Output:** Market intelligence del territorio.

**Evidencia:** Doc de investigación.

### 5.2 — Calcular Monthly Revenue Potential (bottom-up)

**Contexto:** Top-down ("el mercado vale $X millones") es inútil. Bottom-up ("hay N empresas, penetramos 3%, ticket promedio $Y") es accionable.

**Acción:** # empresas target × % penetración estimada (conservador 2%, probable 4%, optimista 7%) × ticket promedio.
**Output:** MRP en 3 escenarios: conservador / probable / optimista.

**Evidencia:** Sheet con cálculos.

### 5.3 — Verificar competencia directa y pricing

**Acción:** ¿Quién más vende formación y consultoría en esa zona? ¿A qué precios? ¿Qué gap deja la competencia que MetodologIA puede llenar?

**Output:** Competitive landscape con pricing benchmark.
**Evidencia:** Doc.

### 5.4 — Verificar overlap con embajadores y reps existentes

**Contexto:** Un territorio con embajador activo no necesariamente excluye un rep, pero la dinámica cambia: el rep y el embajador deben operar en sinergia, no en competencia.

**Acción:** Cruzar territorio propuesto con mapa de nodos. Documentar: overlap (sí/no), tipo (directo/parcial), acción necesaria.
**Output:** Overlap_Check: Clear / Partial_Overlap / Direct_Overlap.

**Evidencia:** Mapa territorial + nota.

### 5.5 — Identificar empresas target por nombre (top 20)

**Acción:** Con base en el research de mercado, nombrar las 20 empresas más probables de la zona. Incluir: nombre, sector, tamaño, contacto probable.

**Output:** Lista de 20 empresas target.
**Evidencia:** Sheet.

### 5.6 — Mapear canales de acceso del territorio

**Contexto:** ¿Cómo se llega a esas empresas? ¿Eventos locales? ¿Cámaras de comercio? ¿Academias? ¿Redes del candidato?

**Acción:** Identificar los 3-5 canales principales de acceso al mercado en el territorio.
**Output:** Channel map.

**Evidencia:** Doc.

### 5.7 — Validar con el candidato (knowledge local)

**Contexto:** El candidato conoce el territorio mejor que cualquier IA. Su input es gold para calibrar los números.

**Acción:** Compartir el research con el candidato. Preguntar: "¿Esto es correcto? ¿Qué falta? ¿Cuáles de estas 20 empresas conoces personalmente?"
**Output:** Research validado y enriquecido por el candidato.

**Evidencia:** Notas de la conversación.

### 5.8 — Definir Territory Assignment

**Acción:** Documentar:

- Zona geográfica exacta
- Sectores habilitados
- Productos que puede vender
- Exclusividad (sí/no, período)
- Revenue target (escenario probable)

**Output:** Territory Assignment doc.
**Evidencia:** Google Doc.

### 5.9 — Co-validar con Sales Director

**Acción:** Presentar Territory Assignment + Revenue Potential al Sales Director para aprobación. ¿El potencial justifica la asignación?

**Output:** Aprobación: Approved / Needs Adjustment / Rejected.
**Evidencia:** CRM — nota de aprobación.

### 5.10 — Registrar territorio y crear tarea R04

**Acción:** Si aprobado: registrar territorio asignado en CRM. Crear tarea: "Entrevista de Alineación Comercial — [nombre]" (Ritual 04).

**Output:** Territorio registrado + tarea R04 creada.
**Evidencia:** CRM + mapa territorial actualizado.

---

## 6. Ejecutar — Parte 2: Profundización y Documentación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Crear territory playbook para el rep

**Acción:** Compilar en un doc de 2 páginas: mercado, empresas target, competencia, pricing, canales, do's and dont's.

**Output:** Territory Playbook.
**Evidencia:** Drive.

### 6.2 — Identificar quick wins para el primer trimestre

**Acción:** De las 20 empresas target, ¿cuáles son las más accesibles? ¿El candidato tiene relación directa con alguna?

**Output:** Lista de 5 quick wins.
**Evidencia:** Sheet.

### 6.3 — Definir cadencia de reporting territorial

**Acción:** ¿Cada cuánto el rep reporta avance? ¿Qué métricas reporta? Definir: pipeline semanal + métricas mensuales.

**Output:** Reporting cadence definida.
**Evidencia:** Doc.

### 6.4 — Estimar ramp-up time del territorio

**Acción:** ¿Cuántos meses tomará al rep alcanzar su primer cierre? Variables: familiaridad con el mercado, red existente, complejidad del ciclo de venta.

**Output:** Ramp-up estimate: [N] meses hasta primera venta.
**Evidencia:** Nota.

### 6.5 — Definir métricas de éxito a 90 días

**Acción:** A 90 días: ¿cuántas oportunidades abiertas? ¿Cuántas propuestas enviadas? ¿Cuántas conversaciones de discovery?

**Output:** 90-day success metrics.
**Evidencia:** Doc.

### 6.6 — Preparar materiales localizados (si aplica)

**Acción:** ¿Necesita el territorio materiales con diferencias específicas? (ej: pricing regional, case studies locales, idioma).

**Output:** Localización requerida: Sí (lista) / No.
**Evidencia:** Ticket (si aplica).

### 6.7 — Registrar insights de la investigación para otros territorios

**Acción:** ¿El research reveló información útil para territorios vecinos o para el modelo de territorio en general?

**Output:** Cross-territory insights.
**Evidencia:** Nota para Growth Lead.

### 6.8 — Actualizar mapa territorial con asignación

**Acción:** Agregar al mapa: candidato, territorio, status (in process), revenue target.

**Output:** Mapa actualizado.
**Evidencia:** Drive.

### 6.9 — Verificar que toda la documentación está completa

**Acción:** Checklist: market intelligence + revenue potential + competitive landscape + territory assignment + playbook.

**Output:** Documentación completa: Sí / Gaps [lista].
**Evidencia:** Checklist.

### 6.10 — Registrar métricas del ciclo R03

**Acción:** # territorios perfilados, # aprobados, revenue potencial total, tiempo de profiling.

**Output:** Métricas R03.
**Evidencia:** Dashboard.

---

## 7. Ejecutar — Parte 3: Consolidación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Validar revenue estimate contra portafolio actual de reps

**Acción:** ¿El revenue estimado es consistente con lo que otros reps en territorios similares generan?

**Output:** Benchmark validation.
**Evidencia:** Nota.

### 7.2 — Identificar riesgos específicos del territorio

**Acción:** ¿Hay estacionalidad marcada? ¿Dependencia de un sector? ¿Regulaciones locales? ¿Competidor dominante?

**Output:** Risk assessment territorial.
**Evidencia:** Doc.

### 7.3 — Definir plan B si el territorio no rinde

**Acción:** ¿Qué pasa si a los 6 meses el territorio no produce? ¿Se reasigna al rep? ¿Se amplía la zona? ¿Se revisa el pricing?

**Output:** Contingency plan.
**Evidencia:** Doc.

### 7.4 — Preparar revenue forecast a 12 meses

**Acción:** Mes a mes: Q1 = ramp-up, Q2 = primeras ventas, Q3-Q4 = estabilización. Con los 3 escenarios.

**Output:** 12-month forecast.
**Evidencia:** Sheet.

### 7.5 — Compartir territory profile con Content Lead

**Acción:** ¿El contenido actual de MetodologIA resuena en este territorio? ¿Necesita adaptación?

**Output:** Content alignment check.
**Evidencia:** Slack/email.

### 7.6 — Generar reporte de Territory Assignment

**Acción:** One-pager: territorio, candidato, revenue potential, quick wins, riesgos, timeline.

**Output:** Reporte de 1 página.
**Evidencia:** Drive.

### 7.7 — Archivar investigación de mercado

**Acción:** Guardar market intelligence en carpeta de territorios para referencia futura.

**Output:** Archivo guardado.
**Evidencia:** Drive.

### 7.8 — Compartir aprendizajes de profiling territorial

**Acción:** ¿Qué fuentes de datos funcionaron mejor? ¿El IA research fue preciso?

**Output:** Process improvement nota.
**Evidencia:** Nota.

### 7.9 — Confirmar que R04 está agendado

**Acción:** Verificar que la tarea de entrevista de alineación (R04) está creada y agendada.

**Output:** R04 confirmado.
**Evidencia:** CRM.

### 7.10 — Cerrar ciclo R03

**Acción:** Marcar R03 como completado. Log de cierre con ajustes propuestos.

**Output:** R03 cerrado.
**Evidencia:** CRM + log.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Market intelligence completo (5 dimensiones)
- [ ] Revenue Potential calculado bottom-up (3 escenarios)
- [ ] Competitive landscape documentado
- [ ] Territory Assignment aprobado por Sales Director
- [ ] Overlap check ejecutado contra mapa de embajadores
- [ ] Quick wins identificados (≥5)
- [ ] Vocabulario consistente con Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| Revenue Potential ≥ mínimo viable | ☐ | Sheet |
| Territory Assignment aprobado | ☐ | CRM nota |
| No overlap con embajadores | ☐ | Mapa territorial |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Market Intelligence | Doc | Drive — Territorios | AI Agent |
| Revenue Potential (3 escenarios) | Sheet | Drive — Comercial | Growth Lead |
| Territory Assignment | Doc | Drive — Reps | Sales Director |
| Territory Playbook | 2 páginas | Drive — Reps | Growth Lead |

### Registro en CRM

- **Campos actualizados:** Territory_Assigned, Territory_Revenue_Target, Territory_Status, Overlap_Check
- **Valor registrado:** Territorio + revenue target + status
- **Timestamp:** Automático

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [04-ejecutar-entrevista-alineacion-comercial](04-ejecutar-entrevista-alineacion-comercial-ritual.md)
- **Datos que hereda:** Territory profile, revenue potential, quick wins, playbook
- **Condición de handoff:** Territory Assignment = Approved + Revenue Potential ≥ mínimo viable

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Territory Accuracy (Y1) | — | ≥70% | 🟡 |
| # territorios viables asignados | — | +3/semestre | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 04 → ejecutar-entrevista-alineacion-comercial`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Territory Intelligence Engine" (Prompt Pro)

**Use case:** Para investigar territorios en lote o comparar múltiples zonas.

```markdown
PROMPT:
"Genera un perfil de territorio para un representante comercial:
Territorio: [zona geográfica], Productos: [lista de programas con ticket promedio].
Analiza:
1. Tamaño del mercado (bottom-up: # empresas >50 empleados × sectores relevantes)
2. Competencia (players principales, pricing, gap de MetodologIA)
3. Canales de acceso (eventos, cámaras, academias, comunidades)
4. Quick wins (empresas accesibles inmediatamente)
5. Riesgos (estacionalidad, dependencia sectorial, regulación)
Output: territory profile + revenue potential 3 escenarios + recomendación (viable/marginal/no-go)."

```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
