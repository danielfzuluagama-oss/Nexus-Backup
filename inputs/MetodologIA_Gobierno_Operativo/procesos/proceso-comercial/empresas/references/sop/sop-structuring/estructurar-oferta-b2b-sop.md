# SOP: Estructurar Oferta B2B

**Versión:** 2.0
**Fecha:** 2026-03-24
**Dueño:** Solution Architect / Sales Executive
**Duración:** 15-40 días
**Objetivo:** Diseñar arquitectura técnica, estimar esfuerzo, redactar propuesta comercial, y obtener aprobaciones internas

---

## 1. Propósito

Proceso de STRUCTURING: transformación de business case validado en propuesta técnica y comercial detallada, con validación interna de viabilidad y márgenes.

**Incluye:**
- Diseñar arquitectura técnica y solución conceptual detallada
- Estimar esfuerzo (horas, semanas) con desglose por componente
- Definir timeline, hitos, y deliverables
- Estructurar términos comerciales (precio, SLA, payment terms)
- Obtener aprobación interna (SA, Delivery Manager, Legal, Finance)
- Elaborar propuesta comercial (cliente-facing document)
- Calificar y gatekeep en Gate T1

---

## 2. Supuestos Explícitos del SOP

| # | Supuesto | Validación |
|---|----------|-----------|
| S1 | Solution Architect está disponible (2-3 semanas) para diseño detallado | Coordinar con SA Manager semana 1 de Structuring |
| S2 | Delivery Manager está disponible para estimar timeline y validar scope | Involucrar en semana 2 de Structuring |
| S3 | Sofka tiene capacidad técnica para resolver el problema identificado | Si no, descalificar antes de iniciar Structuring |
| S4 | Cliente confirma business case es "accurate ballpark" | Si cliente dice "numbers are off," rewind a Discovery |
| S5 | Presupuesto cliente es conocido (dentro de rango realista) | Si presupuesto es "unknown," descalificar |

---

## 3. Límites del SOP

### Límites Explícitos (SÍ hacemos esto)
✓ Diseñar arquitectura técnica y solución detallada
✓ Estimar esfuerzo y timeline
✓ Definir términos comerciales (precio, SLA, payment)
✓ Obtener aprobaciones internas (SA, Delivery, Legal)
✓ Elaborar propuesta comercial
✓ Calificar Gate T1

### Límites Explícitos (NO hacemos esto)
✗ Prometer deliverables sin validar con Delivery Manager
✗ Diseñar arquitectura sin input de IT cliente
✗ Estructurar términos sin aprobación Legal
✗ Enviar propuesta sin firma de SA + Delivery Manager
✗ Hacer descuentos >15% sin aprobación director
✗ Comprometerse a timeline fuera de capacidad actual

---

## 4. Fase 1: Diseño de Arquitectura Técnica

### Paso 4.1: Workshop de Arquitectura SA + Sales (Días 1-5)
**Actividad:** Solution Architect diseña solución detallada basada en discovery.

**Elementos de arquitectura a definir:**

**Componentes principales:**
- Sistemas principales (ERP, analytics, CRM, etc.)
- Data pipeline o integración
- Usuarios/roles
- Security y compliance
- Hosting (cloud, on-prem, hybrid)

**Diagrama técnico:**
- Arquitectura visual (flowchart)
- Integraciones con sistemas cliente
- Data flows
- Security zones

**Detalles de implementación:**
- Metodología (Agile, waterfall)
- Fases/sprints
- Roles requeridos (architects, developers, testers, etc.)
- Skills necesarios (expertise en X, Y, Z)
- Training/documentation required

**Checklist:**
- ¿SA ha validado con IT cliente que arquitectura es viable? → SÍ / NO
- ¿Diagrama de arquitectura es claro y completo? → SÍ / NO
- ¿Integraciones con sistemas cliente están mapeadas? → SÍ / NO
- ¿Requerimientos de seguridad/compliance están considerados? → SÍ / NO

### Paso 4.2: Estimar Esfuerzo (Días 5-10)
**Actividad:** SA estima horas de esfuerzo por componente.

**Estructura de estimado:**

```
COMPONENTE 1: [Name]
- Description: [Qué es, qué hace]
- User Story: [Requerimientos específicos]
- Effort estimate: 200 hours (4-5 semanas, 1 developer full-time)
- Deliverables: [Code, documentation, training]
- Risks: [Technical risks, complexity]

COMPONENTE 2: [Name]
[Similar structure]

...

TOTAL EFFORT: 800 hours (16-20 weeks, 1 team)
OR: 1000 hours (10 weeks, 2 teams in parallel)
```

**Directrices de estimación:**
- Ser realista (no optimistic)
- Incluir: coding, testing, documentation, training
- Incluir overhead (meetings, rework, learning curve)
- Utilizar team velocity si está disponible
- Documentar assumptions

**Checklist:**
- ¿Estimado incluye desarrollo, testing, documentation, training? → SÍ / NO**
- ¿Estimado es basado en data histórica (no puro guesstimate)? → SÍ / NO**
- ¿Estimado ha sido reviewed por otro SA (sanity check)? → SÍ / NO**

---

## 5. Fase 2: Estimación de Timeline y Delivery

### Paso 5.1: Coordinación con Delivery Manager (Día 10-12)
**Actividad:** Delivery Manager revisa estimado, valida timeline, identifica risks.

**Reunión SA + Delivery Manager + Sales:**
1. SA presenta arquitectura y esfuerzo estimado
2. Delivery Manager validates: "¿Podemos hacer esto en X semanas?"
3. Opciones:
   - Team disponible ahora → timeline es [start date] + [effort weeks]
   - Team ocupado → timeline es [start date cuando disponible] + [effort weeks]
   - Escalación paralela → timeline se reduce pero costo aumenta

**Output:**
- Delivery Manager confirma timeline (o propone alternativa)
- Identificación de risks (ej: "cliente lento en feedback," "legacy system integration complex")
- Propuesta de team (quién ejecutaría)

### Paso 5.2: Definir Timeline y Hitos (Día 12-15)
**Actividad:** Sales + Delivery Manager definen timeline y hitos para propuesta.

**Estructura de timeline:**

```
KICKOFF: Week 1
- Allocate team, setup environments, initial sync con cliente

PHASE 1 (Weeks 2-6): [Component 1] Design & Build
- Design: Weeks 2-3
- Development: Weeks 4-6
- Testing/Feedback: Week 6

PHASE 2 (Weeks 7-10): [Component 2] Build & Integrate
[Similar structure]

UAT (User Acceptance Testing): Weeks 10-12
- Client testing with production-like data
- Bug fixes and refinements

LAUNCH: Week 13
- Go-live, training, documentation handoff

POST-LAUNCH: Weeks 14-16
- Support, stabilization, optimization

TOTAL: 16 weeks (4 months)
```

**Checklist:**
- ¿Timeline incluye design, build, testing, UAT, launch, support? → SÍ / NO**
- ¿Hitos son realistas (no aggressive)? → SÍ / NO**
- ¿Delivery Manager ha confirmed team availability? → SÍ / NO**

---

## 6. Fase 3: Estructura de Términos Comerciales

### Paso 6.1: Calcular Precio (Días 15-18)
**Actividad:** Sales + Finance Manager calculan precio basado en esfuerzo.

**Fórmula:**
```
Total Effort Hours × Billable Rate per Hour = Total Professional Services
+ Infrastructure/Cloud costs (si aplica)
+ Licenses (si aplica)
+ Contingency (10-15% para risks)
= TOTAL PROJECT COST (TPC)

Recommended Markup (Margin target 30-35%):
TPC × 1.35 = PROPOSAL PRICE (with healthy margin)

Alternative: Cost-Plus Model
Cost + (Cost × 35%) = Price with 35% margin
```

**Ejemplos:**
- 800 hours × $150/hour = $120,000 (cost base)
- $120,000 × 1.35 = $162,000 (proposal price for ~$42k margin)

**Checklist:**
- ¿Precio cubre todos costos (labor, infra, contingency)? → SÍ / NO**
- ¿Margen es >25% (preferible >30%)? → SÍ / NO**
- ¿Precio es competitivo vs market? → SÍ / NO**

### Paso 6.2: Definir SLA y Payment Terms (Días 18-20)
**Actividad:** Sales + Legal definen términos comerciales.

**SLA (Service Level Agreements):**
- Availability: Ej: "99.5% uptime during normal business hours"
- Response time: Ej: "Critical bugs resolved within 4h, P2 within 24h"
- Performance: Ej: "System response time <2 seconds for 95% of queries"
- Support hours: Ej: "Monday-Friday 8 AM - 6 PM, 24h for critical issues"

**Payment Terms:**
- Option 1: 50% at contract signature, 50% at go-live
- Option 2: 30% at signature, 40% at design approval, 30% at go-live
- Option 3: Monthly installments (if project >6 months)
- Net X days: Ej: "Net 30" (payment due 30 days after invoice)

**Support & Warranty:**
- Post-launch support: Ej: "4 weeks of support included post-launch"
- Warranty: Ej: "30-day defect-free warranty on delivery"
- Change requests: "Ej: Out-of-scope changes billed at $X/hour"

**Checklist:**
- ¿SLA es realista (no overly aggressive)? → SÍ / NO**
- ¿Payment terms protegen cash flow (not all at end)? → SÍ / NO**
- ¿Legal ha reviewed términos? → SÍ / NO**

---

## 7. Fase 4: Elaboración de Propuesta Comercial

### Paso 7.1: Redactar Propuesta Cliente (Días 20-30)
**Actividad:** Sales redacta propuesta comercial (cliente-facing).

**Estructura estándar de propuesta:**

```
EXECUTIVE SUMMARY
[1 page]
- Problema: [Pain statement]
- Solución: [High-level approach]
- Inversión: $X
- Timeline: Y weeks
- Expected ROI: Z%

CURRENT STATE & PAIN ANALYSIS
[1-2 pages]
- Proceso actual: [How it works today]
- Problemas identificados: [Pain points discovered]
- Impacto: [Financial/operational impact]

PROPOSED SOLUTION
[2-3 pages]
- Solución: [High-level description]
- Arquitectura: [Diagram + description]
- Componentes principales: [List with brief explanation]
- Integraciones con sistemas cliente: [Mapping]
- Technical approach: [Methodology, tools, platforms]

IMPLEMENTATION TIMELINE
[1 page]
- Phase breakdown: [Phase 1, 2, 3... with weeks]
- Gantt-style timeline
- Key milestones: [Design approval, UAT start, launch, etc]
- Total duration: X weeks / Y months

INVESTMENT & TERMS
[1 page]
- Professional Services: $X
- Infrastructure/Licenses: $Y
- Total Project Cost: $X+Y
- Payment Schedule: [30% signature, 40% design approval, 30% launch]
- Support Included: [4 weeks post-launch]
- Warranty: [30-day defect-free]
- SLA: [Availability, response time, performance]

SUCCESS CRITERIA
[0.5 page]
- Metrics that define success for client
- Ej: "System live and stable by [date]," "Team trained and independent," etc.

NEXT STEPS
[0.5 page]
- If client wants to proceed: [Decision date], [Kickoff date], [First meeting agenda]
- Who to contact: [Sales contact, SA contact, PM contact]
- Timeline to decision: [Ej: "We recommend decision by [date] to start [target start date]"]
```

**Tone & Style:**
- Professional but conversational (not marketing-speak)
- Numbers and metrics (be specific)
- Client-centric (not "we will do X," but "this will allow you to...")
- Clear and readable (not technical jargon unless client is technical)

### Paso 7.2: QA y Revisiones Internas (Días 30-35)
**Actividad:** Propuesta revisada por SA, Delivery Manager, Legal, Sales Manager.

**Checklist de revisión:**

**Solution Architect:**
- ¿Arquitectura descrita es técnicamente correcta? → SÍ / NO
- ¿Estimado de esfuerzo es realista? → SÍ / NO
- ¿Propuesta es viable técnicamente? → SÍ / NO

**Delivery Manager:**
- ¿Timeline es realista dada nuestra capacity? → SÍ / NO
- ¿Recursos asignados están confirmados? → SÍ / NO
- ¿Risks están identificados y mitigación propuesta? → SÍ / NO

**Legal:**
- ¿Payment terms, SLA, warranty son estándar? → SÍ / NO
- ¿Liability clauses están presentes? → SÍ / NO
- ¿Change request process está definido? → SÍ / NO

**Sales Manager:**
- ¿Propuesta responde a pain identificado en Discovery? → SÍ / NO
- ¿ROI es claro para cliente? → SÍ / NO
- ¿Propuesta es competitiva en precio/valor? → SÍ / NO

**Rework loop:** Si hay feedback, Sales edita propuesta y vuelve a circulate para aprobación.

---

## 8. Fase 5: Aprobaciones Internas y Gate T1

### Paso 8.1: Obtener Aprobaciones Formales (Día 35-38)
**Actividad:** Circular propuesta para "sign-off" formal.

**Email de circulate:**
> "Hi all, please review attached proposal. Need your approval to send to client by [date]. Feedback by EOD [date]. Key items to review:
> - SA: Architecture and effort estimate
> - DM: Timeline and team allocation
> - Legal: Terms and conditions
> - SM: Overall positioning and competitiveness
> - Finance: Margin and pricing"

**Respuestas esperadas:**
- "Approved" → documento está listo
- "Approved with minor changes" → solicitar cambios específicos
- "Rejected" → identify blocker, rewind to diseño

**Checklist:**
- ¿SA ha signed off? → SÍ / NO
- ¿Delivery Manager ha signed off? → SÍ / NO
- ¿Legal ha signed off? → SÍ / NO
- ¿Sales Manager ha signed off? → SÍ / NO

### Paso 8.2: Aplicar Gate T1 (Día 38-40)
**Criterios binarios de calificación:**

- ¿Propuesta técnica con arquitectura, componentes, timeline? → **SÍ / NO**
- ¿Estimado de esfuerzo (horas/semanas) con desglose por módulo? → **SÍ / NO**
- ¿Términos comerciales (precio, SLA, payment terms) con legal OK? → **SÍ / NO**
- ¿Solution Architect y Delivery Manager aprobaron propuesta? → **SÍ / NO**
- ¿Presupuesto reafirmado o aceptado por cliente? → **SÍ / NO**

**Decisión:**
- **SI en 5/5:** PASAR a Close (lista para presentar a cliente)
- **SI en 4/5:** PASAR a Close con condiciones (ej: "Pending legal review of SLA")
- **SI en 3/5 o menos:** RETRABAJO de propuesta

**Output:** Oportunidad en CRM estatus "Structuring - Qualified" o "Structuring - Rework"

---

## 9. Casos Borde de Structuring

### Caso Borde 1: Arquitectura es más compleja de lo esperado
**Escenario:** SA revisa legacy systems de cliente, realiza que integración es 3x más complex.

**Acción:** SA presenta nuevo estimado (ej: 2400 hours vs 800 hours). Sales analiza opciones:
- Option A: Scope reduction (Module 3 pospone a Phase 2). Precio baja.
- Option B: Aceptar estimado más alto. Precio sube.
- Option C: Descalificar si presupuesto cliente no puede absorber incremento.

**Fallback:** Rewind a Discovery para validar con cliente si alcance es viable.

### Caso Borde 2: Delivery Manager dice "No hay team disponible until Q3"
**Escenario:** Sales quiere timeline Q2, Delivery Manager dice Q3.

**Acción:** Escalada a Director Delivery. Opciones:
- Traer resources externas (contractor) → costo aumenta
- Ralentizar el proyecto (4 meses → 6 meses) → renegociar con cliente
- Priorizar este proyecto → qué otros proyectos se retrasan?

**Fallback:** No prometer timeline que Delivery no puede sostener.

### Caso Borde 3: Legal says "SLA es irresponsible" (ej: 99.9% uptime)
**Escenario:** Sales propone SLA agresivo, Legal dice "impossible dada nuestra infra."

**Acción:** Legal y SA consensuan SLA realista (ej: 99% uptime con exclusiones). Sales actualiza propuesta.

**Fallback:** Never compromise quality/risk for a sale. Better descalificar que prometer y fallar.

### Caso Borde 4: Cliente pregunta "¿Pueden bajar precio?"
**Escenario:** Propuesta enviada a cliente. Feedback: "Precio es 20% más alto que competencia."

**Acción:** Análisis rápido:
- ¿Nuestro scope es > scope competencia? Si sí, reafirmar valor (documentar diferencias).
- ¿Nuestro margen permite descuento? Si >30%, considerar descuento <10%.
- ¿Reducir scope en lugar de precio? (Phase 2 vs Phase 1)

**Fallback:** No hacer "preço war." Mejor perder con dignidad.

---

## 10. Anti-Patterns de Structuring

### AP1: "Propuesta sin arquitectura detallada"
**Anti-pattern:** Propuesta says "We will implement ERP" sin diagrama, sin architecture details.

**Qué hacer:** Incluir arquitectura visual y descripción detallada de componentes.

### AP2: "Esfuerzo subestimado"
**Anti-pattern:** SA estima 500 horas, proyecto requiere 1000 horas. Sofka pierde dinero o delay.

**Qué hacer:** Ser realista. Mejor sobre-estimar y entregar early.

### AP3: "Propuesta sin aprobación interna"
**Anti-pattern:** Sales envía propuesta a cliente sin firma de SA, Delivery Manager.

**Qué hacer:** Gate T1 requiere aprobaciones formales. NO exceptions.

### AP4: "Términos comerciales sin Legal review"
**Anti-pattern:** Sales estructura términos sin consultar Legal. Luego cliente negocia y es problema.

**Qué hacer:** Legal review es obligatorio pre-envío.

### AP5: "Precio sin margen análisis"
**Anti-pattern:** Sales baja precio significativamente sin validar si margen es viable.

**Qué hacer:** Finance Manager debe validar margen pre-propuesta.

---

## 11. Decisiones de Diseño del SOP

### DD1: ¿Por qué Structuring toma 15-40 días?
**Justificación:** Rápido (15d) si scope simple. Largo (40d) si scope complejo, múltiples integraciones, legal review exhaustivo.
**Validación:** Media industry es 20-30 días para propuesta completa.

### DD2: ¿Por qué requerimos sign-off de SA + Delivery antes de enviar propuesta?
**Justificación:** Previene "sales lies" (promising lo que no podemos entregar). Reduce post-firma issues.
**Validación:** Con sign-off interno = 92% propuestas se convierten en contrato. Sin sign-off = 65%.

---

## 12. Fallbacks Operativos

### FB1: SA dice "Arquitectura requiere research" (no sabe si es viable)
**Plan A:** SA hace PoC/spike (1-2 weeks) para validar feasibility.
**Plan B:** Si spike says "viable," continua con estimado. Si "not viable," rewind a Discovery.
**Fallback:** No enviar propuesta si SA no confía en viabilidad arquitectura.

### FB2: Estimado incrementa significativamente en revisión Delivery Manager
**Plan A:** SA + DM alinean estimado. Si ambos confirman new estimate, update propuesta.
**Plan B:** Si nuevo estimado excede presupuesto cliente, presentar opción Phase 1/Phase 2.
**Fallback:** No prometer timeline irresponsable.

### FB3: Legal bloquea términos comerciales
**Plan A:** Sales + Legal encuentran middle ground (ej: SLA más realista).
**Plan B:** Si Legal says "no se puede," respetar. Better descalificar que legal risk.
**Fallback:** Never override Legal. They protect the company.

### FB4: Cliente pregunta por descuento en propuesta
**Plan A:** Preguntar: "¿Cuál es su ideal price?" Entender if negociable.
**Plan B:** Si descuento <10% y margen permite, considerar. Si >10%, presentar opciones:
- Scope reduction (Phase 1 ahora, Phase 2 luego)
- Extended timeline (más semanas, menos recursos, menos cost)
**Fallback:** No hagan pricing decisions sin Finance Manager approval.

---

## 13. Métricas de Structuring

| Métrica | Target | Acción |
|---------|--------|--------|
| Propuesta completada | 100% | Si no, no advance to Close |
| SA + DM sign-off | 100% | Required. No exceptions. |
| Timeline approved | 100% | DM must confirm |
| Legal review done | 100% | Required pre-send |
| Structuring duration | 20-30 días | Si >40 días, bottleneck |
| Propuesta quality | Cliente says "clear & comprehensive" | Post-presentation feedback |

---

**Dueño:** Solution Architect / Sales Executive
**Próxima revisión:** 2026-06-24
