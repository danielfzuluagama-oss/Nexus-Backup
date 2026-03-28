# SOP: Diagnóstico de Madurez Digital
**Versión:** 1.1 (Elevado 10x) | **Fecha:** 2026-03-24 | **Certif. Moat:** SOP-CON-DIAG-2401

---

## OBJETIVO

Evaluación holística de madurez digital cliente en 3 semanas. Output: Reporte 30-40 págs, scoring DART, recomendaciones priorizadas, propuestas Tracción/Evolución accionables.

---

## SUPUESTOS EXPLÍCITOS

1. **Supuesto: Acceso a liderazgo.** 4-6 C-level/directores disponibles para entrevista. Si no → diagnóstico incompleto, bias hacia lower-level perceptions
2. **Supuesto: Stack documentado.** Cliente tiene arquitectura diagramas, lista de herramientas. Si no → audit técnico +50% horas (requiere renegociación scope)
3. **Supuesto: Honestidad en respuestas.** Entrevistas asumen respuestas auténticas (no "polished PR narrative"). Si detectamos mentira → confrontar respetuosamente o escalate
4. **Supuesto: Estabilidad org.** Cliente no en restructura/crisis/despidos durante diagnóstico. Si cambia → pause, re-scope, o renegociar timeline
5. **Supuesto: Decisor financiero claro.** Sponsor + CFO alineados en budget Tracción/Evolución. Si no → propuesta va a limbo, no decision

---

## LÍMITES DEL PROCESO

**Diagnóstico NO cubre:**
- Implementation: Somos evaluadores, no ejecutores (ver SOP-traccion, SOP-evolucion)
- Selección de herramientas específicas: Recomendamos frameworks, no "debes comprar Salesforce"
- Garantía de resultados: Diagnóstico informa, cliente decide e implementa (variabilidad en ejecución ajena a nosotros)
- Benchmarking vs competencia: Nos comparamos a industria, no a "tu rival X"
- Estrategia corporativa: Diagnosticamos madurez digital, no viabilidad negocio total

**Handoff:**
- Si cliente descalificado para Diagnóstico → referencia a consultor alternativo o sugerir esperar 6 meses
- Post-Diagnóstico entregable → propuestas Tracción (ver sop-traccion.md) o Evolución (ver sop-evolucion.md)

---

## TRIGGER & ENTRADA

**Trigger:** Cliente pasó discovery, necesidad de Diagnóstico o Consultoría identificada.

**Entrada:**
- Información básica cliente (industria, tamaño, contexto)
- Contactos clave (CEO, CTO, CMO, COO)
- Disponibilidad (cuándo pueden hacer entrevistas)
- Budget (si hay, cuál es rango)

---

## RESPONSABLES

| Rol | Tarea | Horas |
|-----|-------|-------|
| **Consultor Senior** | Liderazgo, entrevistas, análisis | 30h |
| **Analista de Datos** | Audit técnico, scoring, gráficos | 15h |
| **Especialista Temático** | Profundización área especialidad | 10h |
| **Admin** | Scheduling, documentación | 5h |

---

## SEMANA 1: DISCOVERY (3-4 DÍAS)

### Día 1: Kick-off Interno + Preparación

**Actividades:**
- Lectura de contexto cliente
- Preparación de guías de entrevista (4-5 pre-drafted)
- Setup de Miro board para mapping
- Confirmación de calendarios con cliente

### Día 2-4: Entrevistas & Audit

**Entrevistas (4-6 personas, 60 min c/una):**

1. **CEO/Sponsor:** Visión estratégica, prioridades, frustración, presupuesto
2. **CTO:** Arquitectura técnica, stack, pain points, capacity
3. **CMO:** Estrategia digital, customer experience, marketing tech
4. **COO:** Procesos, eficiencia, people capability, change readiness
5. **Head IT:** Operaciones, seguridad, compliance, modernización
6. **Otros (opcional):** Head HR (skills/culture), Head Finance (ROI perspective)

**Estructura de Entrevista (60 min):**
- 0-5: Warmup, contexto
- 5-20: Visión de futuro (3 años), estrategia
- 20-40: Desafíos & pain points actuales, intentos previos de cambio
- 40-55: Capacidades actuales, recursos, presupuesto
- 55-60: Preguntas, cierre, next steps

**Audit Técnico (2-3 horas, con CTO/IT):**
- Stack actual (herramientas, lenguajes, frameworks)
- Infraestructura (cloud vs on-prem, auto vs manual scaling)
- Integración (sistemas hablan entre sí? qué datos están siloed?)
- Seguridad & compliance (GDPR, certifications, vulnerabilities)
- Data strategy (qué datos tienen, cómo los usan, data governance)
- Roadmap técnico actual (qué planes IT tenía)

**Documentación de Discovery:**
- Notas transcritas de entrevistas
- Fotos/screenshots de sistemas
- Org chart actual (roles, títulos, reportes)
- Procesos críticos documentados (si existen)
- Documentación técnica (architecture diagrams, stack, etc.)

---

## SEMANA 2: ANÁLISIS (4-5 DÍAS)

### Análisis de Madurez Digital

**Frameworks:**

1. **DART (Digital Adoption Readiness Template)** - 5 dimensiones

   | Dimensión | Métrica | Scoring (0-20) | Notas |
   |-----------|---------|----------------|-------|
   | **Tecnología** | Cloud, AI, data, seguridad | X/20 | Ej: 15/20 = buen stack pero data governance débil |
   | **Procesos** | Automatización, workflows, integración | Y/20 | Ej: 10/20 = muchos procesos manuales |
   | **People** | Skills, mentalidad, capacidad | Z/20 | Ej: 12/20 = algunos evangelistas pero muchos novatos |
   | **Culture** | Apertura cambio, velocidad, experimentación | W/20 | Ej: 8/20 = risk-averse, comité approvals |
   | **Leadership** | Visión, comunicación, accountability | V/20 | Ej: 16/20 = CEO fuerte, algunos managers reticentes |

   **Total Score:** X + Y + Z + W + V = 0-100

2. **Gap Analysis vs Benchmarks:**
   - Industry average (Gartner/McKinsey)
   - Best-in-class (qué sí hace bien similar industria)
   - Gaps identificados (dónde está más atrás)

3. **Identificación de Palancas:**
   - "Dónde el máximo impacto con mínima inversión?"
   - Análisis de costo vs beneficio potencial
   - Ej: "Automatizar onboarding (2 sem, $1M) = 200h ahorradas/año"

4. **ROI Potencial:**
   - Estimación de ahorro de horas (eficiencia)
   - Revenue potential (si transformación abre nuevos mercados)
   - Risk mitigation (si hay vulnerabilidades)
   - Ejemplo: "Madurez digital +30 pts = $5M ingresos adicionales en 2 años"

### Documentación de Análisis

- Scoring matrix (5 dimensiones × 20 pts)
- Gap analysis (visual comparison vs benchmarks)
- Identification de 3-5 pain points raíz
- ROI estimation por cada inciativa potencial

---

## SEMANA 2-3: SÍNTESIS & RECOMENDACIONES (4 DÍAS)

### Redacción de Reporte (40 páginas típico)

**Estructura:**

1. **Portada + Table of Contents** (1 página)

2. **Executive Summary** (3 páginas)
   - Hallazgo 1 (dato impactante)
   - Hallazgo 2 (dato impactante)
   - Hallazgo 3 (dato impactante)
   - Top 3 recomendaciones (bullets)
   - Roadmap de alto nivel (1 imagen)
   - Estimación de ROI/inversión

3. **Análisis Detallado de Madurez** (10 páginas)
   - DART scoring (gráfico radar + detalle)
   - Gap analysis (tabla comparativa)
   - Descripción de cada dimensión (strengths + gaps)
   - Benchmarking vs industria (visual)
   - Summary: "En este momento, ustedes están en [X]% madurez digital. La industria promedio está en [Y]%"

4. **Recomendaciones Estratégicas** (5 páginas)

   **Formato para cada recomendación:**
   - Número & Nombre (ej: "Rec 1: Automatizar Order-to-Cash")
   - Descripción breve (½ página)
   - Impacto esperado (reducción de time, costo, error)
   - Inversión estimada (desarrollo, capacitación, etc.)
   - Timeline (semanas para implementar)
   - ROI ($ ahorro / inversión)
   - Facilidad (Low/Medium/High — qué tan disruptivo)
   - Dependencias (qué otros cambios requiere)

   **Priorización típica:**
   - Rec 1 (High impact, Low effort, Low disruption) = Quick Win
   - Rec 2 (High impact, Medium effort, Medium disruption) = Foundation
   - Rec 3-5 (High impact, High effort, High disruption) = Strategic

5. **Roadmap de Transformación** (3 páginas)

   **Visual Timeline (24 meses):**
   - Fase 0 (Sem 1-4): Foundation (soporte, governance, team)
   - Fase 1 (Sem 5-12): Quick Wins (Rec 1, quick wins paralelos)
   - Fase 2 (Sem 13-20): Foundation Building (Rec 2, capability building)
   - Fase 3 (Sem 21-24): Strategic (Rec 3-5, escala)

   **Indicadores de progreso:** T-Index, adoption rate, ROI acumulativo

6. **Apéndices** (5 páginas)
   - Metodología (qué es DART, cómo scoramos)
   - Detalles técnicos (stack analysis, seguridad findings)
   - Entrevistas resumen (quién entrevistamos, contexto)
   - Benchmarks (datos de Gartner/McKinsey/industria)

### Creación de Visuales

**Scorecard de Madurez (1 página):**
- Gráfico radar: 5 dimensiones, score actual vs target
- Tabla: Score dimension, gap vs industry, palanca identificada
- Resumen: "En 24 meses, queremos llegar a 75/100 madurez"

**ROI Dashboard (1 página):**
- Timeline: Qué se implementa cuándo
- Bar chart: ROI acumulativo por fase
- Ejemplo: "Y-axis = $M saved, X-axis = semanas. Línea sube de 0 a $15M en 24 meses"

**Roadmap Visual (1 página):**
- Gantt chart: Fases, hitos, duración
- Dependencias: Qué debe suceder primero
- Milestones: Qué es diferente en Sem 4, 12, 20, 24

---

## SEMANA 3: PRESENTACIÓN & PROPUESTA (2 DÍAS)

### Día 1: Presentation to Leadership (90 min)

**Preparación:**
- Deck 30-40 slides (keynote/PowerPoint)
- Dry run interno (30 min)

**Presentation Structure (90 min):**

| Tiempo | Sección | Facilitador |
|--------|---------|-------------|
| 0-5 | Apertura | Consultor | Contexto, estructura de conversación |
| 5-20 | Hallazgos Clave | Consultor | Top 3 insights (storytelling, no death by slides) |
| 20-30 | Madurez Digital Scoring | Analista | DART gráficos, gap analysis, benchmarking |
| 30-45 | Top 3 Recomendaciones | Consultor | Descripción, impact, effort, ROI |
| 45-60 | Roadmap & Timeline | Consultor | 24 meses plan, fases, hitos |
| 60-75 | ROI & Business Case | Analista | Investment vs return, payback period |
| 75-90 | Q&A & Propuesta | Consultor | Preguntas, propuesta Tracción o Evolución |

**Tone:** Executive-friendly (números, no jargon), confident, collaborative

### Día 1-2: Redacción de Propuesta de Siguiente Paso

**Propuesta de Tracción** (2 páginas):
- Objetivo: Implementar Rec 1 (Quick Win) en 6 semanas
- Scope: Exact entregables, timeline, equipo
- Investment: $18M COP
- Expected ROI: X% de la recomendación (ej: 40% del impacto total)
- CTA: "¿Aceptan que iniciemos?. Kick-off en [fecha]"

**Propuesta de Evolución** (2 páginas):
- Objetivo: Implementar Rec 1-3 (transformación profunda) en 16 semanas
- Scope: Co-diseño modelo operativo, change management, transfer
- Investment: $35M COP
- Expected ROI: 80%+ de impacto full roadmap
- CTA: Similar a Tracción

---

## DOCUMENTACIÓN FINAL

**Entregables:**

1. ✅ Reporte Diagnóstico (30-40 págs PDF)
2. ✅ Scorecard Visual (1 sheet)
3. ✅ ROI Dashboard (1 sheet)
4. ✅ Roadmap Timeline (1 sheet)
5. ✅ Presentation Deck (30-40 slides)
6. ✅ Propuesta Tracción (2 págs)
7. ✅ Propuesta Evolución (2 págs)

**Almacenamiento:**
- Reporte PDF: Drive compartido con cliente
- Visuals: Tabla/infographics en Google Slides
- Presentation: Keynote editable (para si quieren cambiar)
- Propuestas: PDF individuales

---

## CASOS BORDE & DECISIONES DE DISEÑO

### Caso Borde 1: Cliente rehúsa acceso a liderazgo (ej: CEO "no tengo tiempo")

**Trigger:** ≥2 C-suite declinan entrevista o ofrecen delegate subordinado

**Acción:**
- Escalate a sponsor/CFO: "Diagnóstico requiere context CEO-level; sin ello, resultados serán incompletos"
- Opción A: Reprogramar después que CEO disponible (delay 2-4 weeks)
- Opción B: Proceder con leadership disponible + nota: "Diagnóstico parcial, falta contexto estratégico C-suite"
- Opción C: Rechazar engagement (if diagnóstico <70% completo)

**Risk:** Reporte weak → propuestas débiles → baja conversion Tracción/Evolución

---

### Caso Borde 2: Tech stack "undocumented" (legacy, spaghetti code)

**Trigger:** CTO "no tenemos diagrams, es muy complejo"

**Acción:**
- Estimación audit: +15-20h adicionales de analista de datos
- Renegociación: (a) Extend scope + timeline, o (b) Cliente pagaa audit extra ($200-300k COP), o (c) Proceder con "tech assessment incompleto" disclaimer
- Recomendación: Casi siempre opción (a) o (b) — diagnóstico deficiente = propuestas débiles

---

### Caso Borde 3: Cliente miente/hides problemas (ej: "seguridad sólida" pero tiene 0 encryption)

**Trigger:** Durante audit técnico descubrimos contradicción vs entrevista

**Acción:**
- Validación respetuosa: "Vimos [X], que contradice [Y] que mencionaste. ¿Podemos aclarar?"
- Posibilidad: Diferencia perceptual (CEO cree seguro; IT sabe que no)
- Documentar: "Hallazgo: Brecha entre percepción liderazgo vs realidad técnica" (común, included en reporte)
- Si deception intencional: Escalate a Legal (raro, <1% casos)

---

### Caso Borde 4: Cambio ejecutivo durante diagnóstico (ej: CEO se va, nuevo llega)

**Trigger:** Cambio leadership sem 2 de diagnóstico

**Acción:**
- Pausa 1 semana; onboard nuevo CEO a contexto diagnóstico
- Entrevista new CEO (si perspectiva diferente, nota en reporte "cambio leadership puede afectar prioritización")
- Procede diagnosis sin delay; reporte menciona transition
- Awareness: Recomendaciones pueden cambiar post-presentation con nueva visión

---

### Caso Borde 5: Presupuesto Tracción/Evolución "no existe"

**Trigger:** QBR presentation, liderazgo ama recomendaciones pero dice "no hay budget"

**Acción:**
- CSM: "ROI de Tracción es 2-4x. ¿Podemos reasignar presupuesto de [X proyecto que ha fracasado]?"
- Opción A: Diagnóstico solo (info pura, cliente lo usa internamente)
- Opción B: Tracción diluido (menor scope, $12M COP en lugar de $18M)
- Opción C: Esperar siguiente ciclo budget (Q3/Q4)
- Acción: NO forzar venta; preservar relación. Cliente volverá cuando budget exista

---

### Decisión: 3 semanas vs 5 semanas

**Elegimos 3 porque:**
- Cliente decision window típica = 2-3 semanas (después olvidan)
- 5 semanas → propuestas llegan tarde, momentum pierde
- Precisión: 3 semanas = 80% calidad de diagnostic (curva diminishing returns después)
- Trade-off: Velocidad > perfección. Mejor diagnostic rápido que perfect diagnóstico tarde

---

## KPIs POST-DIAGNÓSTICO (Gates Binarios)

| Métrica | Estándar Pass | Estándar Fail | Acción si Fail |
|---------|---|---|---|
| **Clarity Score (encuesta post)** | ≥8/10 | <8/10 | Sesión claridad extra 60 min |
| **NPS Diagnóstico** | ≥7/10 | <7 | Feedback call; entender qué mejorar |
| **Conversion a Tracción** | ≥30% | <30% | Post-mortem: propuesta unclear? Budget no existe? |
| **Conversion a Evolución** | ≥10% | <10% | Esperado; Evolución es long-play |
| **Tiempo a Decisión** | ≤14 días | >14 días | Si >21 días → probabilidad close ↓ 70% |

**Overall Gate:** ¿Clarity + NPS ambos ≥7? If Yes → propuestas enviadas, CSM toma ownership. If No → revisión interna, qué falló

---

## CHECKLIST: FIN DE DIAGNÓSTICO

- [ ] 4-6 entrevistas completadas
- [ ] Audit técnico documentado
- [ ] DART scoring finalizado
- [ ] Gap analysis vs benchmarks completo
- [ ] Reporte diagnóstico escrito (30-40 págs)
- [ ] Visuales (scorecard, ROI, roadmap) creadas
- [ ] Presentation deck finalizado
- [ ] Propuestas Tracción + Evolución redactadas
- [ ] Dry run de presentation completado
- [ ] Presentation a leadership realizada
- [ ] Feedback compilado
- [ ] Propuesta(s) enviada(s)

---

**Fin de SOP: Diagnóstico**
