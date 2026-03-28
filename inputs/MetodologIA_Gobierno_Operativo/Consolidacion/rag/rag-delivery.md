# RAG Memory | Proceso de Delivery de Servicios

**Generado:** 24 de Marzo de 2026
**Fuente Repo:** `/MetodologIA_Gobierno_Operativo/procesos/proceso-delivery-servicios/`
**Versión:** 1.0 - Consolidación Completa de Delivery
**Clasificación:** Operativo - Proceso de Entrega de Servicios

---

## TABLA DE CONTENIDOS RÁPIDA

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Visión General del Delivery](#visión-general-del-delivery)
3. [Conexión con Proceso Comercial](#conexión-con-proceso-comercial)
4. [Estructura por Vertical](#estructura-por-vertical)
5. [Principios Clave de Delivery](#principios-clave-de-delivery)
6. [Ciclo de Vida de Delivery](#ciclo-de-vida-de-delivery)
7. [Handoff Comercial → Delivery](#handoff-comercial--delivery)
8. [Puertas de Calidad en Delivery](#puertas-de-calidad-en-delivery)
9. [Procedimientos de Escalación](#procedimientos-de-escalación)
10. [Relación con Rituales QBR](#relación-con-rituales-qbr)
11. [Métricas de Éxito de Delivery](#métricas-de-éxito-de-delivery)

---

## RESUMEN EJECUTIVO

El **Proceso de Delivery de Servicios** de MetodologIA es el conjunto de prácticas, rituale, workflows y assets que transforman un contrato comercial firmado en un servicio entregado exitosamente al cliente. Abarca la gestión completa desde kick-off hasta cierre, garantizando que cada cliente reciba el valor prometido, en tiempo, dentro de presupuesto, y con calidad consistente.

El delivery es **igual de importante que la venta** en MetodologIA. Un excelente proceso comercial sin delivery de calidad = cliente insatisfecho, sin renovación, sin referencias. Un buen delivery sin comercio = equipo sin presión de pipeline, sin crecimiento.

Delivery opera en **3 verticals paralelos** que espejo la estructura comercial:
- **Empresas (B2B):** Implementaciones complejas, 3-12 meses, múltiples stakeholders
- **Personas (B2C):** Programas educativos, 1-12 semanas, modelos estandarizados
- **Aliados (GTM):** Co-delivery con partners, variable según modelo de alianza

---

## VISIÓN GENERAL DEL DELIVERY

### Definición Operativa

**Delivery** = Periodo que comienza con firma de contrato/ODT y termina con aceptación formal del cliente de entregables, o finalización del servicio/programa.

### Responsabilidades Primarias en Delivery

1. **Delivery Manager / Project Manager:** Propietario de proyecto; responsable por cronograma, scope, quality, presupuesto
2. **Delivery Consultant / Implementador:** Ejecutor técnico; responsable por calidad del trabajo, documentación, customer education
3. **Client Success Manager:** Responsable por satisfacción del cliente, escalations, relación interpersonal
4. **Technical Lead:** Para proyectos complejos; supervisa technical quality, arquitectura, best practices
5. **Quality Assurance:** Valida que entregables cumplan especificación, está libre de defects

### Handoff Key

El handoff de Sales → Delivery ocurre en **Kick-Off Meeting** cuando:
- Contrato está firmado ✓
- Orden de Trabajo (ODT) está aprobada ✓
- Recursos de Delivery están assigned ✓
- Cliente ha nombrado stakeholders/points of contact ✓
- Todos los documentos pre-requisito (SLA, SPOC ficha, etc.) están compartidos ✓

---

## CONEXIÓN CON PROCESO COMERCIAL

```
PROCESO COMERCIAL (Sales-Driven)     TRANSICIÓN     PROCESO DELIVERY (Delivery-Driven)

Scouting                                                            (No hay delivery aún)
    ↓
Discovery                                                           (No hay delivery aún)
    ↓
Structuring                                                         (Pre-delivery planning)
    ↓
SUCCESS: Approval Ritual          ←GATE: Contrato Firmado→        INICIO DELIVERY
(Deal Closed)                      ←GATE: ODT Aprobada →           (Kick-Off)
                                   ←GATE: Recursos Asignados→
                                   ←HANDOFF: Success Manager→
                                        ↓
                                  KICK-OFF MEETING (Ritual)
                                        ↓
                                  IMPLEMENTATION PHASE
                                        ↓
                                  TESTING/VALIDATION PHASE
                                        ↓
                                  GO-LIVE / LAUNCH PHASE
                                        ↓
                                  POST-DELIVERY SUPPORT PHASE
                                        ↓
                                  CLOSURE & ACCEPTANCE (Ritual)
                                        ↓
                                  RENEWAL OPPORTUNITY / QBR (Ritual)
```

### Transferencia de Conocimiento de Sales a Delivery

**El AE/SDR que cerró el deal debe transferir a Delivery Manager:**

1. **Account Context:** Quién es el cliente, qué industria, qué problema específico tienen
2. **Discovery Insights:** Notas de conversaciones clave, dolores identificados, objetivos de éxito del cliente
3. **Stakeholder Map:** Quiénes son EB/TS/UC, quién es champion, quiénes son saboteadores potenciales
4. **Scope Details:** Qué exactamente se vendió; qué está in scope vs out of scope
5. **Deal Economics:** Presupuesto del cliente, expectativa de precio, si hay negotiate pendiente
6. **Success Criteria:** Qué significa "éxito" para este cliente (métrica específica si aplica)
7. **Timeline Constraints:** Si cliente tiene fecha hard deadline (ej: "debe estar live antes del cierre fiscal")
8. **Political Context:** Dinámicas internas, quién presiona pro/contra solución, quién puede bloquear

**Ritua: Transfer de Conocimiento Comercial a Delivery** (típicamente 1-2 horas, 1-2 semanas post-firma)

---

## ESTRUCTURA POR VERTICAL

### Empresas B2B - Delivery Structure

**Carpeta:** `/procesos/proceso-delivery-servicios/empresas/`

**Subcarpetas:**
- `assets/` - Templates, checklists, documentos estándar
- `meta/` - Knowledge graph, arquitectura de procesos
- `references/` - SOPs, guías, best practices

**Tipos de Delivery B2B:**

1. **Workshop/Event Delivery**
   - Duración: 1-5 días
   - Ciclo: Prep (2 semanas) → Evento (1-5 días) → Síntesis (1 semana)
   - Entregables: Materiales, notas, reporte ejecutivo
   - Dificultad: Media (logística + facilitation)

2. **Diagnóstico/Audit Delivery**
   - Duración: 2-6 semanas
   - Ciclo: Recolección (2-4 semanas) → Análisis (1-2 semanas) → Presentación (1 semana)
   - Entregables: Report 50-100 pág, presentación, recomendaciones
   - Dificultad: Media-Alta (research intensity + analysis)

3. **Implementación/Transformación Delivery**
   - Duración: 3-12 meses
   - Ciclo: Design (2-4 sem) → Build (4-8 sem) → Test (2-4 sem) → Deploy (1-2 sem) → Optimize (4-8 sem)
   - Entregables: Sistema live, training, documentation, post-launch support
   - Dificultad: Alta (complejidad técnica + change management)

### Personas B2C - Delivery Structure

**Carpeta:** `/procesos/proceso-delivery-servicios/personas/`

**Estructura:**
- `assets/` - Materiales de curso, syllabus, templates de assignment
- `meta/` - Arquitectura educativa, mapeo de competencias
- `references/` - Guías para instructores, best practices pedagógicas

**Tipos de Delivery B2C:**

1. **Bootcamp Delivery** (Programa educativo intensivo)
   - Duración: 4-12 semanas
   - Modalidad: Online, presencial, o híbrido
   - Intensidad: 20-40 horas/semana
   - Ciclo: Pre-bootcamp orientation → Weekly modules (4-12 semanas) → Final project → Graduation
   - Entregables: Certificación, portfolio, acceso a alumni network
   - Dificultad: Alta (pedagogy + cohort management + assessment)

2. **Programa Élite Delivery** (Executive coaching, mastermind)
   - Duración: 3-6 meses típicamente
   - Modalidad: Principalmente virtual, con sesiones presenciales opcionas
   - Intensidad: 5-15 horas/semana + 1:1 coaching
   - Ciclo: Intake interviews → Group sessions (bi-weekly) → 1:1 coaching → Capstone project
   - Entregables: Transformation metrics, network relationships, ongoing access to community
   - Dificultad: Alta (coaching expertise + group dynamics)

3. **Certificación Online Delivery** (Self-paced, structured)
   - Duración: 4-8 semanas (self-paced)
   - Modalidad: Online learning platform
   - Intensidad: 5-10 horas/semana flexible
   - Ciclo: Module completions → Quizzes → Final exam → Certification
   - Entregables: Digital certificate, badge, continuing education credits si aplica
   - Dificultad: Media (content + platform management)

### Aliados GTM - Delivery Structure

**Carpeta:** `/procesos/proceso-delivery-servicios/aliados/`

**Estructura:**
- `assets/` - Co-delivery templates, partner enablement materials
- `meta/` - Partnership delivery architecture
- `references/` - Partner SOP, escalation guides

**Tipos de Delivery Aliados:**

1. **Co-Delivery (Partnership Implementation)**
   - Partner participa en delivery junto con MetodologIA
   - Típicamente: Partner aporta industry expertise, MetodologIA aporta metodología core
   - Ciclo: Handoff entre MetodologIA y Partner → Ejecución paralela → Integración de outputs
   - Desafío: Coordinación, claridad de roles, consistencia de quality

2. **Marca Blanca Delivery**
   - Partner entrega bajo su branding
   - MetodologIA proporciona materials/templates/support behind scenes
   - Ciclo: Partner delivers mostly independently; MetodologIA available para escalations
   - Desafío: Quality control cuando no eres el que entrega

3. **Delivery Híbrido**
   - Combinación: Partner entrega parte, MetodologIA entrega parte
   - Ciclo: Definir clear handoff points → Ambos ejecutan en paralelo → Integración
   - Desafío: Coordinación más compleja

---

## PRINCIPIOS CLAVE DE DELIVERY

### 1. Entrega = Expectativa + 1

El trabajo no es "cumplir" lo que se prometió. Es **cumplir + sorprender positivamente**.

**Ejemplos:**
- Si se vendió "Diagnóstico + Report", entrega "Diagnóstico + Report + 30-min Feedback Call + 3 meses de follow-up questions"
- Si se vendió "Workshop de 3 días", entrega "3 días de workshop + pre-workshop materials + post-workshop synthesis + 1 month of office hours"

Principio: Cada cliente debería pensar "Wow, eso valió mucho más que lo que pagué."

### 2. Scoping es Sagrado

99% de problemas en delivery vienen de scope creep o scope mal entendido.

**Scoping Ritual:**
- Al kick-off: Confirm scope con cliente línea por línea
- Si cliente pide algo out of scope: Documentar como "Change Request", estimar esfuerzo+impacto, conseguir aprobación
- No hagas change requests gratis; o aceptas el delay, o cobra extra, o negocia scope reduction

### 3. Comunicación > Perfección

Un proyecto que se atrasa pero se comunica bien = cliente satisfecho (o al menos informed).
Un proyecto que de repente aparece atrasado en final = cliente enojado.

**Comunicación Cadence (Ritual):**
- **Semanal:** Status update (email o Slack) con % completion, risks, next week plan
- **Bi-weekly:** Steering committee call (cliente + MetodologIA leadership) si proyecto es grande (>USD 100K)
- **Upon Exception:** Inmediato si algo sale del plan (delay, risk materializa, scope change request)

### 4. Calidad es No Negociable

Presupuesto apretado, deadline ajustado → aún así, quality es no-negotiable. Antes, negocia scope reducido o timeline extendido.

**Quality Gates (ver sección abajo):** Cada entregable debe pasar gate de quality antes de ir a cliente.

### 5. Customer Success Obsession

Success Manager es aliado del cliente, no de MetodologIA. Job es asegurar cliente tenga éxito y quiera renovar.

**Esto significa:**
- Si cliente va a fallar al usar solución, intervenir temprano
- Si cliente tiene una pain point no cubierto, buscar solución (incluso si está out of scope, help find solution)
- Si cliente quiere cambiar dirección mid-project, work with them on implications

### 6. Documentación es Deliverable

No importa qué tan bien ejecutes: si no documentas, el cliente no puede replicar/mantener sin ti.

**Documentación debe incluir:**
- What (qué se hizo)
- Why (por qué se hizo de esa forma)
- How (cómo replicarlo)
- When (cuándo usar esto)
- Troubleshooting (qué hacer si XYZ va mal)

---

## CICLO DE VIDA DE DELIVERY

### Fase 0: Pre-Kick-Off (Semana 1 post-firma)

**Objetivo:** Prepare proyecto para éxito; asegurar todos los recursos están listos

**Actividades:**

1. **Assign Delivery Team**
   - Delivery Manager: Nombrado y acepta ownership
   - Delivery Consultant(s): Asignados según expertise requerida
   - QA Lead: Identificado para revisar entregables
   - Success Manager: Conectado con cliente

2. **Deep Dive Discovery (si aplica)**
   - Si delivery requiere información técnica detallada (ej: diagnóstico), equipo entrevista stakeholder clave
   - Documentar: Current state assessment, constraints técnicos, políticas internas

3. **Resource Planning**
   - Crear project plan con hitos clave
   - Asegurar recursos (licencias de herramientas, acceso a datos, etc.) están secured
   - Validar que equipo no tiene conflictos de tiempo con otros proyectos

4. **Customer Communication**
   - Email: "Welcome, aquí es tu Delivery Manager [Name], esperamos trabajar contigo"
   - Share: SPOC ficha, SLA document, customer success playbook
   - Agendar: Kick-off meeting (típicamente 2-3 días después de transfer)

5. **Create Delivery Artifact**
   - Proyecto creado en proyecto management system (Asana, Monday, etc.)
   - Todas las tasks creadas con dueño, fecha, descripción clara
   - Customer tiene acceso si se requiere visibility

---

### Fase 1: Kick-Off (Semana 1-2)

**Ritual: Ejecutar Kick-Off de Proyecto**

**Propósito:** Alinear todas las partes en mismo understanding de alcance, cronograma, roles, éxito

**Participantes:**
- Customer: Sponsor ejecutivo + stakeholders técnicos/operacionales
- MetodologIA: Delivery Manager + Technical Lead + Success Manager
- Opcionalmente: Sales AE (para context final, luego se retira)

**Agenda Estándar (3-4 horas):**

1. **Welcome & Icebreaker** (15 min)
   - Presentaciones breves
   - Tone-setting: "Estamos aquí para asegurar éxito mutuo"

2. **Project Vision & Outcomes** (30 min)
   - Revisit problema que está siendo resuelto
   - Revisit objetivos de éxito (métrica específica si aplica)
   - Alinear en qué significa "éxito" para proyecto

3. **Scope Review** (45 min)
   - Línea por línea de ODT/contrato
   - "In Scope" vs "Out of Scope" clarificado explícitamente
   - Change request process explicado

4. **Cronograma & Hitos** (30 min)
   - Cronograma de trabajo presentado
   - Hitos clave: Start → Milestone 1 → Milestone 2 → Final Delivery
   - Dependencias cliente (cuándo necesitan información, acceso, decisions)
   - Calendar de meetings agendada

5. **Roles & Responsabilidades** (30 min)
   - RACI matriz revisada:
     - MetodologIA: Qué se compromete
     - Customer: Qué necesita proveer
     - Ambos: Decisiones conjuntas
   - Customer nombra:
     - Project Sponsor (ejecutivo)
     - Project Lead (operacional, daily contact)
     - Technical Lead (si aplica)
     - Financial contact (approvals de invoices)

6. **SLA & Communication** (20 min)
   - SLA explicado (response times, availability)
   - Communication cadence:
     - Weekly status: Email every Friday
     - Bi-weekly steering: Meeting call every other Tuesday
     - Escalation path: Si issue, cómo se escalona
   - Contact info compartida

7. **Risks & Mitigation** (20 min)
   - Delivery team presenta riesgos identificados (ej: customer delays, technical unknowns)
   - Customer contribuye riesgos de su lado (ej: executive turnover, budget freeze)
   - Mitigation strategies documentadas

8. **Next Steps & Close** (10 min)
   - Primer hito clave confirmado
   - Pre-work assignments (qué customer debe enviar antes de siguiente meeting)
   - Meeting notes enviadas dentro de 24h; customer confirma alignment

**Outputs de Kick-Off:**
- ✓ Project Charter (documento firmado por sponsor MetodologIA + customer sponsor)
- ✓ RACI Matrix
- ✓ Cronograma Detallado
- ✓ Risk Register (riesgos + mitigaciones)
- ✓ Communication Plan (cadence + contacts)
- ✓ Statement of Work confirmado

---

### Fase 2: Implementación (Duración Variable)

**Objetivo:** Ejecutar el trabajo; mantener momentum; entregar entregables de calidad

**Actividades Recurrentes:**

1. **Weekly Status Meetings (Ritual)**
   - Duración: 30-60 min
   - Attendees: Delivery Manager + Customer Project Lead (+ others as needed)
   - Cadencia: Mismo día/hora cada semana
   - Agenda:
     - % Completion de cada workstream
     - Risks that emerged
     - Blockers que necesitan customer action
     - Upcoming week focus
   - Output: Sent to steering committee mismo día

2. **Bi-weekly Steering Committee (Ritual, si proyecto >$100K)**
   - Duración: 60 min
   - Attendees: MetodologIA PM + Tech Lead + Success Manager + Customer Sponsor + Project Lead
   - Cadencia: Bi-weekly, mismo horario
   - Agenda:
     - High-level status (are we on track?)
     - Budget status (on budget?)
     - Any escalations
     - Customer satisfaction temperature check
     - Next two weeks priorities

3. **Continuous Quality Review**
   - Mientras se crea cada deliverable, QA revisa
   - Si falta algo o calidad es baja, vuelve a delivery team
   - No sale a cliente hasta pasar QA gate (ver Puertas de Calidad abajo)

4. **Change Management**
   - Si customer requiere cambio al scope:
     - Documentar change request (what, why, urgency)
     - Estimar impacto (timeline, budget, quality)
     - Present options (add time, add budget, remove scope)
     - Conseguir customer approval
     - Update schedule + budget

5. **Issue Tracking**
   - Cualquier problema/bloqueador documentado inmediatamente
   - Classify: Severity (P1/P2/P3), Owner, Target resolution date
   - Escalate si es P1 (service degradation, customer major impact)

6. **Documentation**
   - Mientras se implementa, documentación es creada en paralelo (no después)
   - Típicamente: Developer crea doc mientras builds, QA revisa doc

---

### Fase 3: Testing/Validation (Duración: 2-4 semanas típicamente)

**Objetivo:** Validar que solución cumple con requisitos antes de go-live

**Actividades:**

1. **Quality Assurance Testing (QA Ritual)**
   - QA ejecuta test plan:
     - Functional testing: Funciona cada feature como se describe?
     - Integration testing: Funciona con sistemas existentes del customer?
     - Usability testing: ¿Pueden usuarios típicos usar sin frustration?
     - Performance testing: ¿Es fast enough? ¿Escala?
     - Security testing: ¿Hay vulnerabilities?
   - Output: QA Report con bugs encontrados, clasificados por severity
   - P1 bugs: Must fix before go-live
   - P2 bugs: Should fix if time permits, else fix post-go-live
   - P3 bugs: Backlog para future updates

2. **Customer Acceptance Testing (UAT)**
   - Customer runs tests en ambiente staging con help de MetodologIA team
   - Customer confirms: "Sí, esto funciona para nosotros"
   - Típicamente 1-2 weeks, customer dedica 2-4 horas/día
   - Output: UAT Sign-Off (customer autoriza go-live)

3. **Documentation Review**
   - Documentación técnica revisada por Technical Lead
   - Documentación de usuario revisada por customer representatives
   - Feedback incorporado

4. **Training Delivery (si aplica)**
   - Customer team recibe training en cómo usar solución
   - Training puede ser: Workshops en vivo, videos grabados, o self-paced materials
   - Típicamente 1-3 days de training
   - Output: Signed training attendance sheet

5. **Go-Live Readiness Review**
   - Pre-go-live meeting: Checklist de 10+ items
     - Database migración completada ✓
     - All P1 bugs fixed ✓
     - Customer trained ✓
     - Rollback plan preparado ✓
     - Support equipo standing by ✓
   - Si algún item no está ready, atrasar go-live

---

### Fase 4: Go-Live / Lanzamiento (1-2 semanas)

**Objetivo:** Mover solución a producción; asegurar transición suave; resolver issues day-1

**Actividades:**

1. **Go-Live Execution**
   - Puede ser: Big bang (todo goes live at once) o Phased (rollout gradual)
   - Typical go-live window: Early morning (8 AM) or evening (8 PM) para minimizar impact
   - Típicamente: 2-4 horas window cuando equipo está standing by
   - Personas involucradas: Delivery team + Customer IT + MetodologIA support

2. **Go-Live Support** (Ritual: Live Support Desk)
   - Durante primeras 24-48 horas: Equipo "on call" 24/7 si customer operación es 24/7
   - Centro de issues: Slack channel o war room específico
   - Priority: Anything blocking customer operación = P1, resuelve within 1 hour
   - Issues documentadas, categorizar como bug (fix permanently) vs. training need (document better)

3. **Post-Go-Live Stabilization**
   - Primera semana: Equipo dedica 50% tiempo a supporting go-live, fixing issues
   - Segunda semana: Taper off, customer becomes more independent
   - Typical P1 issues esperadas en primeros días; taper off

4. **Go-Live Retrospective** (Ritual, ~1 week post go-live)
   - Reunión: Delivery team + Customer lead
   - Discusión:
     - What went well?
     - What went badly?
     - What would we do differently?
   - Output: Lessons learned documented

---

### Fase 5: Post-Delivery Support (2-8 semanas típicamente)

**Objetivo:** Customer operando independientemente; MetodologIA available para escalations/optimization

**Estructura:**

1. **Included Support Period** (Definido en contrato/ODT, típicamente 30-60 días)
   - Unlimited "support hours" para customer questions
   - Included: Bug fixes, "how do I" questions, minor enhancements
   - Excluded: Major new features, significant optimization work
   - Response time: Via SLA (P1 within 4 hours, etc.)

2. **Support Cadence**
   - Weekly 30-min "office hours" check-in
     - Discusión: How is it going? Any blockers?
     - Opportunity para early course correction si issues
   - Bi-weekly: Steering committee summary (if customer wants continued visibility)

3. **Optimization Planning** (if relevant)
   - Hacia final de support period: Conversation sobre "now that you've used it for month, what optimizations make sense?"
   - Típicamente: "Phase 2 of engagement"
   - Puede resultar en nueva ODT/contrato si customer wants optimization

4. **Knowledge Transfer Validation**
   - Customer debe ser able to operate independently by end of support period
   - Si no están ready, extend support o adiciona training
   - Meta: Customer no debería depender de MetodologIA para day-to-day operations

---

### Fase 6: Cierre & Aceptación Formal (Final ritual)

**Ritual: Validar Entregables & Cierre Proyecto**

**Propósito:** Formalizar que proyecto está completo; customer acepta entregables; documento cierre

**Actividades:**

1. **Final Deliverable Review**
   - Checklist de todos los entregables identificados en ODT
   - Customer revisa y firma "Aceptación de Entregables" si todo está completo
   - Documento: Acceptance Certificate

2. **Final Financial True-Up**
   - Si había change orders, confirmar todos fueron paid
   - Si había retainer o contingency, confirmar usage
   - Final invoice emitida si aplica

3. **Lessons Learned Documentation**
   - Equipo de delivery completa "Lessons Learned" document:
     - What worked well (replicar en future projects)
     - What didn't work (avoid next time)
     - Ideas para mejorar proceso
   - Output: Añadido a knowledge base para future reference

4. **Archive & Handoff**
   - Proyecto "closed" en project management system
   - Todos los documentos archivados (para auditoría/reference future)
   - Access a knowledge base preserved indefinidamente para customer reference

5. **Success Celebration (Optional but Recommended)**
   - Team + Customer celebran success
   - Can be: Email callout, virtual celebration, or lunch/drinks if in-person possible
   - Purpose: Strengthen relationship, close on positive note

---

## HANDOFF COMERCIAL → DELIVERY

### El Momento Crítico

El handoff de Sales a Delivery es **el momento más crítico** en customer journey. Si se hace bien, proyecto starts on right foot. Si se hace mal, proyecto starts con customer expectations not aligned.

### Pre-Handoff Checklist (Sales Manager valida antes de cerrar deal)

- [ ] Contrato firmado por ambas partes
- [ ] ODT (u orden de servicio) generado y aprobado
- [ ] Dinero: Primera factura enviada si applicado; pago recibido si required upfront
- [ ] Customer legal contact nombrado? Email confirmado?
- [ ] Customer technical contact nombrado? Email confirmado?
- [ ] Customer project sponsor identificado?
- [ ] SLA document compartido si applicable?
- [ ] SPOC ficha compartida?
- [ ] Customer ha confirmado no-show commitment (ej: "Sí, Project Lead estará en kick-off")?

**Si alguno no está ready:** No cerramos deal; retraso es mejor que starting en caos.

### Handoff Meeting (Sales AE + Delivery Manager)

**Duración:** 2 horas
**Cuando:** 1-2 días después de firma contrato

**Agenda:**

1. **Account Overview** (30 min)
   - Quién es customer? Industria? Tamaño?
   - Estructura org: Quién es quien, cómo se toman decisiones
   - Political landscape: Quién apoya, quién podría sabotear

2. **Problem Statement** (20 min)
   - Cuál es el problema que estamos resolviendo?
   - Por qué es pain point para customer?
   - Qué outcomes importan más a customer? (ej: speed > cost, o cost > speed)

3. **Discovery Insights** (30 min)
   - Key quotes de customer ("El problema es que...")
   - Técnicas/herramientas que already están usando
   - Constraints: Budget, timeline, technical, organizational
   - Relationships: Quién es champion (presiona por solución), quién es bloqueador

4. **Scope & Success Criteria** (20 min)
   - Qué exactamente se vendió (línea por línea de scope)
   - Qué está explícitamente out of scope
   - Métrica de éxito si aplica (ej: "reducir tiempo de proceso en 40%")
   - Deal economics: Presupuesto, terms, payment schedule

5. **Timeline Constraints** (10 min)
   - Cuando necesita go-live customer?
   - Hay deadlines específicas (ej: "antes del cierre fiscal")?
   - Vacaciones o blackout periods a considerar?

6. **Q&A** (10 min)
   - Delivery Manager pregunta clarifications
   - Delivery Manager identifica riesgos

### Handoff Artifact

**Documento: "Handoff Brief"** creado por Sales, entregado a Delivery

```
HANDOFF BRIEF
=============

Customer Name: [Name]
Customer Industry: [Industry]
Contract Value: [Amount]
Contract Duration: [12 months, etc.]
ODT Name: [ODT-2026-B2B-001, etc.]

PROBLEM STATEMENT:
[1 paragraph describing problem customer is solving]

OUTCOMES CUSTOMER CARES ABOUT:
1. [Outcome 1 + why important]
2. [Outcome 2 + why important]
3. [Outcome 3 + why important]

STAKEHOLDER MAP:
- Sponsor (Executive): [Name, Title, Email, Phone]
- Project Lead (Operational): [Name, Title, Email, Phone]
- Technical Lead: [Name, Title, Email, Phone]
- Blocker/Skeptic (if identified): [Name, Title, Concern]

SCOPE SUMMARY:
In Scope:
- [Item 1]
- [Item 2]
- [Item 3]

Out of Scope:
- [Item 1]
- [Item 2]

SUCCESS METRICS:
[If applicable, e.g., "30% improvement in process time", or "All 50 employees trained to proficiency"]

CONSTRAINTS:
- Timeline: [Go-live by date]
- Budget: [If discussed]
- Technical: [Legacy systems, integrations needed, etc.]
- Organizational: [Politics, change readiness, capacity constraints]

KEY RISKS IDENTIFIED:
1. [Risk 1] - Likelihood: High/Medium/Low, Impact: High/Medium/Low
2. [Risk 2]

CHAMPION QUOTES:
- "[Quote about problem]" - [Name, role]
- "[Quote about why solution matters]" - [Name, role]

NEXT STEPS FOR DELIVERY:
1. [Item 1, e.g., "Confirm technical requirements with customer IT"]
2. [Item 2]

Sales AE: [Name]
Date: [Date]
Delivery Manager Received & Acknowledged: [Signature]
```

---

## PUERTAS DE CALIDAD EN DELIVERY

**Quality Gates** son checkpoints donde deliverables son revisados antes de ir a customer. Si no pasan gate, vuelven a delivery team para fixes.

### Gate 1: Scope Confirmation Gate

**Cuando:** En kick-off, antes de implementación empieza

**Quién:** Delivery Manager + Customer Sponsor

**Checklist:**
- [ ] Scope documento (anexo a ODT) es claro para ambas partes
- [ ] Definition de done (cómo sabremos cuando estamos listos) es explícito
- [ ] Timeline hitos son realistic y customer-confirmed
- [ ] Pre-requisitos de customer (información, access, decisions) son claros

**Pass Criteria:** Ambas partes firman "Scope Confirmed" documento

---

### Gate 2: Deliverable Quality Gate (Iterativo)

**Cuando:** Cada vez que deliverable está "complete" pero antes de ir a customer

**Quién:** QA Lead + Tech Lead revisan; Delivery Manager verifica

**Checklist por Tipo:**

**Para Documentos (Reports, Plans, etc.):**
- [ ] Contenido es accurate (facts, numbers)
- [ ] Estructura es lógica (fácil de seguir)
- [ ] Writing es clear (no ambigüedad, sin jargon)
- [ ] Formatting es professional (consistent fonts, layout)
- [ ] Grammar/spelling: Zero errors
- [ ] Sources: Todas las fuentes citadas, bibliography incluida si aplica

**Para Trainings/Workshops:**
- [ ] Agenda es clara y achievable en tiempo asignado
- [ ] Materiales son engaging (no muerte por PowerPoint)
- [ ] Instructor está prepared (ha rehearsed)
- [ ] Logística confirmada (room, tech, materials)
- [ ] Post-event evaluation mechanisms en lugar (cómo mediremos aprendizaje)

**Para Implementaciones/Sistemas:**
- [ ] Funciona per specification (feature parity)
- [ ] Performance acceptable (fast enough, no crashes)
- [ ] Secure (no vulnerabilities)
- [ ] Documented (usuario puede usar independently)
- [ ] Tested (QA y UAT completados)

**Output:** QA Sign-Off o "Rework Required" con specific feedback

---

### Gate 3: Customer Acceptance Gate

**Cuando:** Final entrega antes de project closure

**Quién:** Customer Project Lead + Sponsor (+ Technical Lead si aplica)

**Checklist:**
- [ ] Entregables meet requirements per ODT
- [ ] Quality is acceptable
- [ ] Timeline was met (or customer aware of delays + approved)
- [ ] Team interaction was professional y helpful
- [ ] Customer feels confident to operate independently (for implementation projects)
- [ ] Customer is satisfied overall (NPS scoring if applicable)

**Output:** "Acceptance Certificate" firmado por customer

---

## PROCEDIMIENTOS DE ESCALACIÓN

### When to Escalate

Escalación es needed cuando:
1. **Risk is materializing:** Timeline at risk, budget blown, quality concerns
2. **Customer is unhappy:** NPS low, sentiment negative, complaints
3. **Resource issue:** Team member sick, overloaded, can't deliver on assignment
4. **Scope ambiguity:** What customer is asking for doesn't match scope
5. **External blocker:** Customer not providing required information, no access, decisions delayed

### Escalation Path

**Level 1: Project Level (Delivery Manager → Customer Project Lead)**
- Try to resolve within project context
- If customer misunderstanding, clarify scope
- If timeline risk, offer options (delay, add resources, reduce scope)
- Target: Resolve within 24-48 hours

**Level 2: Steering Committee (Delivery Manager + Tech Lead → Customer Sponsor + MetodologIA Director)**
- If Level 1 didn't resolve, escalate to steering committee
- Typical: Formal meeting, document decision, communicate back
- Target: Resolve within 3-5 working days

**Level 3: Executive (VP Delivery/VP Client Success → VP/C-Level Customer)**
- If Level 2 didn't resolve or issue is political/strategic
- Rare, reserved for customer satisfaction at risk or large financial impact
- Target: Resolve within 1-2 weeks

### Communication in Escalation

**Critical:** When escalating, don't:
- Blame customer ("They didn't provide information on time")
- Blame MetodologIA team ("Our PM wasn't managing this properly")

Instead:
- Acknowledge issue
- Provide options (not ultimatums)
- Frame as "Let's partner to find best path forward"
- Offer trade-offs transparently (time vs budget vs scope)

---

## RELACIÓN CON RITUALES QBR

### QBR (Quarterly Business Review) Ritual

QBR es ritua que ocurre **post-delivery**, típicamente 60-90 días después de project closure.

**Propósito:** Evaluar:
1. Está customer obteniendo value promised?
2. Hay additional opportunities?
3. Qué necesita customer for next phase?

**Participants:**
- Customer: Sponsor + Project Lead
- MetodologIA: Success Manager + Account Executive (si existe) + Delivery leadership (si project recent)

**Agenda:**

1. **Value Realization** (30 min)
   - Original success metric: Alcanzado?
   - Evidence: Data, feedback, testimonials
   - If metric not hit: Why? What's needed?

2. **Adoption & Usage** (15 min)
   - Si es sistema/software: Utilización metrics
   - Si es training: Application de aprendizajes en day-to-day
   - Challenges: Qué está dificultando adopción?

3. **Customer Satisfaction** (15 min)
   - NPS score (if measured)
   - Sentiment: Overall happiness?
   - Feedback: Lo que estuvo bien, lo que mejoraría

4. **Expansion Opportunities** (20 min)
   - Nuevos problemas que identify?
   - Áreas adicionales donde MetodologIA puede help?
   - Budget para próxima fase (si aplicable)?

5. **Next Steps** (10 min)
   - Qué pasa after this QBR?
   - Renewal conversation? (si contrato termina pronto)
   - Phase 2 proyecto? (si hay additional scope)
   - Ongoing support? (si está en support period)

**Output:**
- QBR Summary documento
- Si renewal: Start renewal conversation
- Si Phase 2: Create new ODT/project

---

### Connection: Delivery Success → QBR Success

El trabajo de delivery **directamente impacta** el QBR:

- **Good Delivery:**
  - Customer had great experience
  - Value realization on track
  - Customer ready to expand or renew
  - QBR es celebration of success
  - Renewal sale es likely

- **Poor Delivery:**
  - Customer frustrated
  - Value realization delayed/missing
  - Customer considering alternatives
  - QBR es crisis management
  - Renewal at risk

**Implicación:** Delivery team es partly responsible para renewal success. Quality matters economically.

---

## MÉTRICAS DE ÉXITO DE DELIVERY

### Métricas Internas (MetodologIA tracks)

1. **On-Time Delivery Rate**
   - % de proyectos que finalizaron on schedule
   - Target: >90%
   - Insight: Si bajo, indicates estimation problem o resource problem

2. **On-Budget Delivery Rate**
   - % de proyectos que finalizaron within budget
   - Target: >90%
   - Insight: Si bajo, indicates scope creep or estimation problem

3. **Quality Metrics**
   - % de deliverables que pass QA first time (no rework)
   - Target: >85%
   - Insight: Si bajo, indicates training or process issue

4. **Defect Rate**
   - # de P1/P2 bugs found post-delivery (30 days)
   - Target: <5% of projects have P1 bugs, <15% have P2 bugs
   - Insight: Shows testing quality

5. **Resource Utilization**
   - % de billable hours vs total hours worked
   - Target: >80%
   - Insight: If low, indicates bench time or internal work

6. **Team Satisfaction**
   - Team NPS (do consultants enjoy projects)
   - Target: >7/10 average
   - Insight: If low, burnout risk, retention risk

### Métricas Externas (Customer & Business-Facing)

1. **Customer NPS**
   - "Would you recommend MetodologIA to peer?"
   - Target: >50 (Net Promoter Score)
   - Insight: Direct correlation to renewal likelihood

2. **Value Realization Score**
   - Did customer achieve stated success metrics?
   - Target: >80% of projects achieve 80%+ of metrics
   - Insight: Are we delivering on promises?

3. **Expansion Rate**
   - % of delivery customers that generate additional revenue
   - Target: >40%
   - Insight: Good delivery = expansion opportunity

4. **Renewal Rate**
   - % of customers whose contracts renew
   - Target: >75%
   - Insight: Customer satisfaction directly impacts business

5. **Customer Health Score**
   - Composite of NPS, engagement, communication, problem tickets
   - Target: >70% of customers in "Green" status
   - Insight: Early warning of at-risk customers

6. **Time-to-Value**
   - How long until customer sees first benefit
   - Target: <50% of project duration
   - Insight: Early wins build momentum

---

## BEST PRACTICES EN DELIVERY

### 1. Start Strong, Finish Strong

Primeras 2 semanas set tone. Si kick-off es caótico, proyecto starts in deficit.
Última semana es chance to leave positive impression. Invest en celebration, not just closure.

### 2. Manage Stakeholders, Not Just Tasks

The "task" is easy; managing 5 stakeholders with conflicting priorities is hard.
Invest time en stakeholder management early. Alignment upstream prevents firefighting downstream.

### 3. Over-Communicate on Timeline

If you think project is at risk, say it 3 weeks early, not 3 days early.
Customer prefers early warning + proactive solution over last-minute crisis.

### 4. Document While You Build

Documenting post-project is 2x harder and 2x slower.
Commit to documenting as you go. Allocate 15-20% of time to documentation.

### 5. Schedule Breaks Between Projects

Delivery is intensity work. Team burnout is real.
Budget 1-2 weeks between major projects for team to recharge.

### 6. Invest in Delivery Manager Training

Delivery Managers are most important role. Invest in training, mentorship, development.
Good PM can salvage bad project; bad PM can tank good project.

### 7. Run Retrospectives for Big Projects

Lessons are learned immediately after project, then forgotten.
Commit to 1-hour retrospective within 1 week of project close.
Document learnings; use in future projects.

---

## MATRIZ RÁPIDA: DELIVERY POR VERTICAL

| Elemento | B2B Empresas | B2C Personas | Aliados GTM |
|----------|------------|------------|-----------|
| **Duración Típica** | 3-12 meses | 1-12 semanas | Variable |
| **Kickoff Ceremony** | Full day, executive sponsor | Half day, student onboarding call | Half day, partner + MetodologIA |
| **Communication Cadence** | Weekly + Bi-weekly steering | Weekly instructor check-in | Weekly + Monthly steering |
| **Primary Success Metric** | Scope delivered, customer can operate independently | Certification rate + NPS | Deal success + Partner satisfaction |
| **Primary Risk** | Scope creep, stakeholder misalignment | Low engagement/completion | Partner execution quality |
| **Post-Delivery Period** | 30-60 days support | 7-14 days alumni onboarding | 14-30 days partner support |
| **Renewal Probability** | High (if quality good) | Medium (depends on outcome) | High (if partner generated revenue) |

---

## CONCLUSIÓN

Delivery es donde **promises become reality**. The sales team makes the promise; the delivery team keeps it.

Una empresa con average sales pero excellent delivery = sustainable business.
A empresa con excellent sales but mediocre delivery = customer graveyard.

MetodologIA commits to delivery excellence because:
1. **Customer Success First:** Our job is customer success, not just invoicing
2. **Reputation:** Quality delivery generates referrals, word-of-mouth, expansion
3. **Economics:** Good delivery customer stays 3+ years and expand; bad delivery customer leaves in 12 months

**Principle:** In MetodologIA, Delivery Team is not "backoffice support." Delivery team is frontline of customer success.

---

**Documento de Referencia Consolidado**
**Próxima Revisión:** 24 de Junio 2026
**Propietario:** VP Delivery / Head of Client Success
**Clasificación:** Operativo - Confidencial Interno
