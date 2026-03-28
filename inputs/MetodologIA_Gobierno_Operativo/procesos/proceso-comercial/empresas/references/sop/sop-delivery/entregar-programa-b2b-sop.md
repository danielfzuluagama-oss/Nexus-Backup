# SOP: Entregar Programa B2B

> **Codigo**: SOP-DELIVERY-B2B-001
> **Version**: 2.0
> **Fecha**: 2026-03-24
> **Fase Blueprint**: F3 — Practica
> **Aplica a**: Todos los sub-segmentos B2B (E1, E2, E3)
> **Prerequisito**: SOP Structuring B2B completado (F2 cerrado, ODS/contrato firmado)
> **Output**: Organizacion con Aha! Moment verificado a nivel equipo, adoption >= 60%, lista para F4 (Autonomia)

---

## 1. Proposito

Estandarizar la entrega de programas empresariales (workshops, bootcamps corporativos, programas a medida) asegurando que:
- **Adopcion sea a nivel equipo** (no solo una persona focal)
- **Aha! Moment organizacional** ocurra con metricas de impacto verificables
- **Stakeholders clave** sean gestionados (HR, IT, procurement, unions segun aplique)
- **Cambio organizacional** sea comunicado y resistencia manejada
- **Compromisos de contrato** sean cumplidos y auditados

---

## 2. Alcance

| Programa | Sub-Segmento | Duracion | Formato | Tamaño Participantes |
|----------|--------------|----------|---------|----------------------|
| Workshop Express | E1 | 1-2 dias | Grupal (equipo completo) | 3-12 personas |
| Bootcamp Corporativo | E1, E2 | 4-8 semanas | Grupal + coaching gerencial | 8-20 personas |
| Bootcamp Venta Amplificada | E2 | 6-8 semanas | Equipo comercial + Director | 10-25 personas |
| Programa A Medida | E3 | 8-16 semanas | Multi-area + steering committee | 40-100 personas (multi-cohorte) |
| Deploy Marca Blanca | E3 (via aliado) | Variable | Customizado por aliado | Variable segun aliado |

---

## 3. Handoff Incoming (Requisitos de F2)

**Antes de iniciar entrega, validar que exista:**

- [ ] ODS/Contrato firmado (ambas partes) y vigente
- [ ] Business Case documentado (ROI esperado, metricas clave)
- [ ] Sponsor ejecutivo identificado y confirmado (VP/Director/Fundador segun E1/E2/E3)
- [ ] Champions internos nominados (1 per 10 participantes)
- [ ] Baseline organizacional capturada (metricas pre-programa)
- [ ] Acceso a plataforma/LMS confirmado para equipo completo
- [ ] Permisos IT validados (GPTs, integraciones, datos sensibles)
- [ ] Comunicacion interna pre-kickoff aprobada por sponsor
- [ ] Calendarios bloqueados para participantes (tiempo protegido en agenda)
- [ ] Requerimientos de compliance documentados (NDA, GDPR, politicas IA)

**Si algún criterio no está cumplido**: NO iniciar Kickoff, comunicar a lider comercial fecha nueva.

---

## 4. Procedimiento

### Paso 1: Kickoff Organizacional (D-14 a Dia 1)

#### 1A: Comunicacion Interna Pre-Kickoff (D-14 a D-7)

| Elemento | E1 | E2 | E3 | Responsable |
|----------|----|----|-----|------------|
| **Comunicacion interna** | Email informal del sponsor | Email + reunion de alineacion | Campaña formal (email + town hall + Slack) | Sponsor + Ops |
| **Aprobacion permisos** | Verbal | IT + HR review | IT + Legal + HR formal | Sponsor |
| **Preparacion champions** | Charla informal 30 min | Sesion preparacion 1h | Sesion intensiva 2h + manual | Coach delivery |
| **Baseline data setup** | Manual en spreadsheet | CRM export | BI dashboard + API integration | Ops + BI team |

#### 1B: Kickoff Meeting Agenda (Dia 1 — detallado)

| Segmento | Duracion | Contenido | E1 | E2 | E3 |
|----------|----------|-----------|----|----|-----|
| **Intro sponsor** | 5 min | "Por qué hacemos esto, vision clara" | Si | Si | Si |
| **Presentacion programa** | 15 min | Metodologia, formato, calendario | Si | Si | Si |
| **Business case** | 10 min | ROI esperado, metricas de exito, beneficios concretos | Si | Si | Si |
| **Quick Win org** | 15 min | Ejercicio demo mostrando valor en <15 min | Si | Si | Si |
| **Roles y responsabilidades** | 10 min | Sponsor, champions, participantes, coach | Si | Si | Si |
| **Calendario y compromisos** | 10 min | Sesiones, fechas, tiempo requerido por persona | Si | Si | Si |
| **Preguntas + cierre** | 5-10 min | Abrir espacio para dudas, energizar | Si | Si | Si |

**Criterio de exito**: 80%+ asistencia, Q&A respondidas, calendarios bloqueados confirmados.

**Documentar**: Foto de grupo (permisos), NPS kickoff, lista asistentes presentes/ausentes.

---

### Paso 2: Ciclo de Sesiones por Modelo AARC-Org con Asignacion Temporal

Cada sesion sigue el modelo **AARC** adaptado a contexto organizacional, con tiempos explícitos:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ A — ACTIVAR (10 min)    │ Review de avances del equipo                  │
│                         │ Compartir wins + resolver bloqueos org.       │
│                         │ Celebrar adopciones iniciales                 │
├─────────────────────────┼──────────────────────────────────────────────┤
│ A — APRENDER (30 min)   │ Nuevo modulo con caso de uso del sector      │
│                         │ Demo con datos/contexto real de la empresa   │
│                         │ Validar relevancia (no generico)              │
├─────────────────────────┼──────────────────────────────────────────────┤
│ R — REPLICAR (35 min)   │ Ejercicio en equipo con caso real propio      │
│                         │ Cada participante aplica a su area/rol        │
│                         │ Coach circunda, captura obstaculos            │
├─────────────────────────┼──────────────────────────────────────────────┤
│ C — COMPROMETER (5 min) │ Accion grupal + individual para la semana     │
│                         │ Champion valida cumplimiento (async)          │
│                         │ Owner por tarea clara                         │
└──────────────────────────────────────────────────────────────────────────┘
```

**Nota**: Para sesiones distinta duracion, mantener ratio 1:3:3.5:0.5 aproximadamente.

**Diferenciacion por sub-segmento**:

| Dimension | E1 Small Biz | E2 Enterprise | E3 Corporate |
|-----------|-------------|---------------|--------------|
| Tamaño grupo | 3-10 (todo el equipo) | 10-20 (equipo funcional) | 15-30 por area, múltiples cohortes |
| Frecuencia | 2x/semana (intensivo) | 1x/semana | 1x/semana por area + steering semanal |
| Duracion sesion | 1.5h | 2h | 1.5-2h |
| Coaching gerencial | No aplica | 1:1 con Director (quincenal, 30 min) | 1:1 con VP (semanal, 45 min) + 1:1 per champion (semanal, 30 min) |
| Follow-up | WhatsApp grupal (diario) | Dashboard + email (semanal) | Dashboard + steering committee (quincenal) |
| Documentacion | Chat recap | Slide recap + action items | Minuta formal + KPI updates |

**Check-in inter-sesion**:
- E1: WhatsApp grupal diario (tips + motivacion)
- E2: Email semanal + dashboard update
- E3: Dashboard daily, steering committee quincenal, email semanal

---

### Paso 3: Gestion de Champions Internos (Ritual Detallado)

**Ritual**: `gestionar-champions-internos-ritual`

Los champions son el **mecanismo de transferencia de conocimiento y sostenibilidad** post-programa. Sin champions fuertes, adopcion muere post-F3.

#### Ciclo de Vida del Champion

| Fase | Timing | Accion | Resultado Esperado | Responsable |
|------|--------|--------|-------------------|------------|
| **Seleccion** | Pre-inicio (F2) | Sponsor + coach identifican 1 champion por cada 10 participantes. Criterios: influencia, entusiasmo, acceso a decision-makers | Champions nominados, comunicados, confirmados | Sponsor + Coach |
| **Formacion Intensiva** | Semana 1-2 | Sesion extra 1.5h solo champions: rol como "multipliers", herramientas, metricas de adopcion, plan de cascada a equipo | Champions habilitados con playbook + metricas | Coach |
| **Activacion Grupal** | Semana 3+ | Champions lideran parte del bloque REPLICAR (15 min), reportan adopcion semanal, escalan bloqueadores | Ownership distribuido, feedback loop abierto | Champions + Coach |
| **Certificacion** | Semana penultima | Evaluacion: ¿lideró 3+ sesiones? ¿Capturó metrics? ¿Resolvió 2+ bloqueadores? | Badge de champion (formal), referencia para future programs | Lider delivery |

#### Metricas de Champion

| Metrica | Target | Frecuencia | Accion Si Falla |
|---------|--------|-----------|-----------------|
| Asistencia sesion champions | 100% | Semanal | Follow-up directo si ausencia |
| Liderazgo en REPLICAR | 1+ sesiones dirigidas | Cada 2 sesiones | Re-entrenar con coach 1:1 |
| Reporte adopcion completo | 100% respuestas dashboard | Semanal | Reminder + support form (no datos perdidos) |
| Escalamientos resueltos | 80% bloqueadores solucionados | Semanal | Coach toma como 1:1 si champion "stuck" |
| Adoption rate equipo champion | >= 70% | Quincenal | Revisar si champion es right-fit |

---

### Paso 4: Stakeholder Management (Mas Alla de Participantes Directos)

**Paso crítico en E2/E3 — sin gestión proactiva, sabotaje silencioso mata adoption.**

#### Identificacion de Stakeholders Secundarios

| Stakeholder | E1 | E2 | E3 | Accion |
|-------------|----|----|-----|--------|
| **IT/Tech** | Bajo | Alto | Muy Alto | Acceso a GPTs, integraciones, permisos datos, soporte tech en vivo |
| **RRHH** | Bajo | Medio | Alto | Feedback desarrollo, alineacion con learning paths, tracking de horas |
| **Procurement/Finance** | No aplica | Bajo | Alto | Validar invoicing, contratos add-on, cambios scope |
| **Unions** | No aplica | Bajo | Bajo | Notificar (si aplica), validar no viola convenios |
| **Compliance/Legal** | No aplica | Bajo | Alto | NDA, GDPR, politicas IA, risk assessment |
| **Comunicaciones Corporativas** | No aplica | Bajo | Medio | Amplificar resultados, testimonials, case study |

#### Tactil de Gestión (por stakeholder)

| Stakeholder | Frecuencia | Canal | Contenido | Owner |
|-------------|-----------|-------|-----------|-------|
| **IT** | Semanal | Email tech + chat | Status acceso, issues tech, requests nuevos | Ops + Coach |
| **RRHH** | Semanal | Email | Attendance, engagement, learning feedback | Coach |
| **Procurement** | Bifurcal (si hay cambios) | Email formal | Change orders, invoicing status, timeline updates | Lider + Admin |
| **Compliance** | Pre + post | Email formal | Baseline data handling, final metrics extraction | Lider |
| **Communications** | Bi-semanal | Meeting + assets | Success stories, metrics highlights, testimonial requests | Coach + Comms |

---

### Paso 5: Monitoreo de Adopcion (Continuo + Ritual)

**Ritual**: `verificar-adopcion-equipo-ritual`

#### Metricas de Adopcion por Ola

| Metrica | Frecuencia | Target E1 | Target E2 | Target E3 | Accion Si Falla |
|---------|-----------|-----------|-----------|-----------|-----------------|
| **Asistencia equipo** | Semanal | > 85% | > 80% | > 75% | Contacto sponsor si >2 ausencias recurrentes |
| **Ejercicios completados** | Semanal | > 70% | > 65% | > 60% | Simplificar tarea, deadline extendida |
| **Adopcion herramienta IA** (activo usando) | Quincenal | 80% equipo | 70% equipo | 60% equipo | 1:1 con resistentes, demo case use |
| **NPS sesion** | Post-sesion | > 8 | > 7.5 | > 7 | Coach ajusta ritmo/contenido |
| **Casos reales aplicados (documentados)** | Quincenal | 1 por persona | 1 per persona | 1 per area | Agendar sesion rescate 1:1 |
| **Dashboard health score** | Diario | NA | >=70% | >=70% | Investigar drivers baja (tech, contexto, resistencia?) |

#### Escenario: Adopcion < 50% en Semana 3 (Diagnostico Sistematico)

```
Bajo Adoption Detected
     │
     ├─ STEP 1: Emergency sponsor call (30 min)
     │  └─ Pregunta abierta: "¿Qué está pasando en tu equipo?"
     │     └─ Tomar nota: resistencia tecnica? Cultural? Contexto?
     │
     ├─ STEP 2: Champion roundtable (30 min, separado con coach)
     │  └─ "¿Cuál es el bloqueador #1 que está escuchando?"
     │     └─ Tipologia: Falta tiempo? No entiendo? Jefe no promueve? Herramienta no funciona?
     │
     ├─ STEP 3: Diagnostico detallado
     │  ├─ CULTURAL: "Siempre lo hicimos asi" / "Miedo a cambio"
     │  │  └─ Plan: Sesion "Quick Wins Skeptics" (45 min), casos de exito concretos
     │  │
     │  ├─ TECNICA: "No entiendo la herramienta"
     │  │  └─ Plan: Soporte 1:1 adicional (30 min x resistentes), demo interactivo
     │  │
     │  ├─ ORGANIZACIONAL: "No tengo tiempo" / "Mi jefe no me deja"
     │  │  └─ Plan: Renegociar tiempo protegido con sponsor + comunicacion formal
     │  │
     │  └─ CONTEXTO: "No aplica a mi rol"
     │     └─ Plan: Pivotar ejemplos a casos especificos del rol/area
     │
     ├─ STEP 4: Intervention plan
     │  └─ Implementar fix + medir adoption semana 4
     │     └─ Si sigue <50%: escalation a lider delivery
     │
     └─ STEP 5: Seguimiento
        └─ Re-medir week 4, week 5
           └─ Target: volver a >70% o plan B (reducir scope? Alargar duracion?)
```

---

### Paso 6: Aha! Moment Organizacional (Semana 3-6, segun E)

**Ritual**: `verificar-aha-momento-org-ritual`

El Aha! no es individual — es **el momento en que el equipo como colectivo se da cuenta del impacto**.

| Criterio | E1 Trigger | E2 Trigger | E3 Trigger | Evidencia Requerida |
|----------|-----------|-----------|-----------|-------------------|
| **Momento tipico** | Dia 2-3 (durante workshop) | Semana 4-5 (deal cerrado) | Mes 2-3 (area reporta mejora) | Documentado en acta/email |
| **Tipo de evento** | Equipo completa tarea en 1/3 del tiempo | Sales deal cerrado con nuevo sistema IA | Productividad +40% en metricas tracked | Antes/despues cuantificado |
| **Validacion** | Fundador expresa "wow esto funciona" | Director + sales data confirman | Steering committee + KPI dashboard | NO opinion, SI datos |
| **Comunicacion** | Comunicado a equipo en call | Celebrado en team meeting + chat | Presentado a steering + board | Memo interno + testimonial |

#### Protocolo de Validacion Aha!

1. **Trigger**: Coach observa señal (entusiasmo en sesion, caso real completado, comentario positivo en chat)
2. **Verificacion cuantitativa** (48h):
   - ¿Hay dato que soporte el "sentimiento"?
   - Ejemplo: "Hicimos deal en 30% menos tiempo" → pedir email con propuesta adjunta
3. **Sponsor confirmation** (email): "¿Confirmas que el equipo esta usando IA en X y viendo resultado Y?"
4. **Documentacion formal**: Acta o memo interno con firma de sponsor (para ROI tracking)
5. **Celebracion publica**: Comunicado a equipo, champions refuerzan adopcion

---

### Paso 7: Cierre y Handoff a F4 (Diferenciado por E)

| Accion | E1 | E2 | E3 |
|--------|----|----|-----|
| **Retrospectiva** | Reunion cierre (1h grupal) | Sesion cierre + presentacion resultados (1.5h) | QBR formal con steering (2h) |
| **Entregables** | Playbook basico (10 paginas) | Playbook + dashboard + 2+ casos (30 paginas) | Playbook multi-area + train-the-trainer guide (100+ paginas) |
| **Champions** | 1 champion informal (sin certificacion) | 2-3 certificados con badge + plan post | 5+ certificados con plan anual |
| **Plan F4** | Check-in trimestral (opcional) | QBR trimestral + soporte async (incluido 90 dias) | Contrato mantenimiento anual + expansion roadmap |
| **ROI Evidence** | Horas ahorradas/semana (estimado) | Pipeline velocity + win rate + $ impact | Productividad por area + ROI total validado |
| **Caso Exito** | Testimonial texto breve | Caso detallado (3 paginas) | Caso emblematico publicable (incluye video) |
| **Timeline** | Cierre en ultim sesion | Cierre +5 dias post ultim sesion | Cierre +15 dias (steering validation) |

---

## 5. Change Management Checklist (E2/E3 Especifico)

**El cambio organizacional requiere comunicacion planeada, no improviso.**

### Pre-Programa (F2 final, antes Kickoff)

- [ ] Mensaje del sponsor comunicado a lider de area (email + reunion 1:1)
- [ ] RRHH informada de programa (itinerario, impacto en horas, development aspect)
- [ ] IT confirmada (acceso, integraciones, data handling)
- [ ] Communicaciones corporativas briefeadas (resultados esperados, caso exito plan)
- [ ] Champions identificados y pre-informados (confidencial)

### Durante Programa (Semanal)

- [ ] Semana 1: "We kicked off" — comunicado a lider/team no-participantes
- [ ] Semana 2: "Quick wins emerging" — ejemplo concreto de valor
- [ ] Semana 3: "Team is excited" — testimonial breve de participante
- [ ] Semana 4+: "Real impact" — metrica concreta (horas, $, calidad)

### Post-Programa (Primeros 30 dias)

- [ ] "Program complete" — memo de cierre con ROI
- [ ] "Champions certified" — presentacion publica de champions (ceremonia light)
- [ ] "Expansion roadmap" — siguiente fase (F4 plan, otros equipos?)

### Templates a Usar

- Email plantilla pre-programa (sponsor customiza)
- Slack template para updates
- PPT slide para town halls
- 1-pager para RRHH (learning tracking)

---

## 6. Contract Compliance y Tracking

**Deliverables comprometidos en ODS DEBEN cumplirse 100%. Cada desviacion requiere acuerdo escrito.**

### Elementos del Contrato a Auditar

| Elemento | Documento | Responsable Tracking | Frecuencia | Criterio Pass |
|----------|-----------|---------------------|-----------|-----------------|
| **Sesiones** | ODS | Coach | Semanal | Numero y duracion exacto |
| **Participantes** | ODS | Ops | Bi-semanal | % asistencia >= threshold ODS |
| **Entregables** | ODS Exhibit | Coach | Al cierre | 100% completados y entregados |
| **Metricas ROI** | ODS Schedule A | Lider | Quincenal | Datos recolectados, metodologia clara |
| **Disponibilidad soporte** | ODS | Ops | Semanal | Respuesta <24h a requests |
| **Timeline** | ODS | Ops | Diario | No delays, o re-negocion formal |

### Proceso de Change Order (si se necesita pivotear)

1. **Trigger**: Cambio solicitado por cliente (scope, timing, participantes)
2. **Eval rapida**: ¿Impacta contractor? ¿Extra cost? ¿Timeline?
3. **Comunicacion**:
   - Si sin costo/impacto mínimo → email de OK (log en CRM)
   - Si con impacto → formal change order (ODS amendment) → ambas firmas
4. **Implementacion**: No avanza sin firma
5. **Archivado**: Todos los change orders en carpeta cliente (auditable)

### Metricas de Compliance

| KPI | Formula | Target | Accion Si Falla |
|-----|---------|--------|-----------------|
| Contract adherence | Deliverables cumplidos on-time / Total | 100% | Formal apology + remediation plan |
| SLA response time | Responses <24h / Total requests | 95% | Escalation to lider |
| Attendance vs ODS | Actual / Expected (segun ODS) | >95% | Reschedule + comunicado escrito |

---

## 7. Risk Register (Top 5 Risks para B2B)

| # | Risk | Probabilidad | Impacto | Mitigation | Owner |
|---|------|---------|---------|----------|-------|
| 1 | **Baja adoption (<50% week 3)** | ALTA | ALTO | Sponsor alignment call + diagnostico (ver paso 5) + champions activados | Coach + Sponsor |
| 2 | **Sponsor loses interest / cambio jefatura** | MEDIA | MUY ALTO | Kickoff alineacion fuerte + QBR bi-semanal con sponsor | Lider delivery |
| 3 | **IT bloquea acceso a herramientas mid-programa** | MEDIA | ALTO | Pre-kicks: IT sign-off formal + escalation path claro | Ops + IT |
| 4 | **Participantes no tienen tiempo (workload)** | ALTA | MEDIO | Tiempo protegido en ODS + sponsor refuerza en kickoff + flexible formats | Sponsor |
| 5 | **ROI no materializa / dificil de medir** | MEDIA | MEDIO | Metricas baselines claras en F2 + tracking weekly + reframes realistic targets | Lider + BI |

### Plan de Respuesta por Risk

**Risk 1 — Low adoption**: Escalation path → sponsor call (day 2) → diagnostico (day 3) → intervention (day 4) → re-measure (day 10)

**Risk 2 — Sponsor turnover**: Ejecutar "new sponsor onboarding" (30 min 1:1, recap case, confirm commitment) + steering committee (no depender de una persona)

**Risk 3 — IT blockers**: Pre-programa IT audit (semana 0) + escalation path directo (coach → Ops → IT director) + contingency (offline mode/email?)

**Risk 4 — Time constraint**: Kickoff negotia "time protection" with sponsor → manager gets weekly email validando asistencia → flexible sesion format (async options for async-ready E3s)

**Risk 5 — ROI gap**: Mensual tracking (week 1, 4, 8, 12) contra baseline → si trending down, agendar sponsor call (week 6) → reframe targets realistic o intensify adoption

---

## 8. Invoicing Triggers y Milestone-Based Payments

**Critical para cash flow: facturacion debe estar 100% alineada a hitos entrega, no "al final".**

### E1: Workshop Express (una unica sesion)

- **Milestone 1 (Kickoff)**: 30% facturado al día de sesion
- **Milestone 2 (Cierre)**: 70% facturado dentro 5 dias post-sesion (con delivery confirmado)
- **Condition**: Entregables completos (playbook, testimonial, NPS>7)

### E2: Bootcamp Corporativo (4-8 semanas)

- **Milestone 1 (Kickoff)**: 25% facturado al inicio
- **Milestone 2 (Week 4 — Aha! Achieved)**: 35% facturado si Aha! verificado + adoption >60%
- **Milestone 3 (Week 8 — Cierre)**: 40% facturado si entregables completos + ROI metodologia

**Condiciones**: Si Aha! no se alcanza week 4 → 50% solo → extender 2 semanas sin costo extra

### E3: Programa A Medida (8-16 semanas)

- **Milestone 1 (Kickoff)**: 20% facturado
- **Milestone 2 (Month 1 — Steering QBR #1)**: 15% facturado si steering completado + metricas tracked
- **Milestone 3 (Month 2-3 — Aha! Org)**: 30% facturado si 2+ areas showing adoption + ROI indicators positive
- **Milestone 4 (Final — Cierre + Champion Certification)**: 35% facturado si 100% entregables + champions certified + expansion roadmap

**Condiciones**: Si <50% adoption por month 2 → 70% solo (no 100%) + plan de recuperacion (extra sesiones sin costo)

### Estructura General de Condiciones

| Fase | Condicion Invoice | % Total |
|------|------------------|---------|
| **Kickoff** | Asistencia sponsor + comunicacion completada | 20-30% |
| **Mid (Aha!)** | Aha! moment documentado + adoption >= threshold | 30-35% |
| **Final (Cierre)** | Entregables 100%, ROI metodologia, champions cert | 35-50% |

**Note**: Invoicing is 100% tied to delivery milestones, **no pago por "intención"**. Si cliente no cumple su side (ejemplo: sponsor no asiste a steering), no es culpa MetodologIA, pero invoicing se retiene.

---

## 9. Governance Especial E3 (Corporate)

Para corporaciones se agrega una capa de governance formal:

| Elemento | Detalle |
|----------|---------|
| **Steering Committee** | Reuniones quincenales: VP sponsor + TI lead + RRHH lead + Lider MetodologIA. Agenda: KPIs semana, blockers escalados, roadmap decisions. Minuta formal, accionables con owners. |
| **Change Management** | Comunicacion interna planificada antes de cada fase (ver step 5). Template corporativo para mensajes, aprobacion de sponsor antes publicar. |
| **Compliance + Data Governance** | Documentacion de procesos: cómo se almacenan datos sensibles, NDA signed, GDPR validation, politicas corporativas IA. Audit trail. |
| **Reporting Cadence** | Semanal: dashboard adoption (automated pull). Quincenal: steering meeting. Mensual: executivo summary (1-pager con KPIs + next priorities). Trimestral: formal ROI report + expansion strategy. |
| **Escalamiento** | Path claro: Champion → Area Leader → VP Sponsor → Steering. Si bloqueador tech: Champion → IT Champion → IT Director → Steering. |
| **Sponsor Continuity** | Si sponsor changes: "sponsor onboarding" call (30 min, recap case, confirm commitment) + steering briefing. No delays de programa. |

---

## 10. Quality Gates (Control Points)

**Cada SOP F3 B2B tiene 3 gates obligatorios con criterios binarios.**

### Gate 1: Semana 1 — Engagement y Baseline (D+7)

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Kickoff completado, 80%+ asistencia | Si | No |
| [ ] Business case revisado, sponsor alineado | Si | No |
| [ ] Baseline metricas capturadas en dashboard | Si | No |
| [ ] Champions formados (sesion 1:1 completada) | Si | No |
| [ ] Acceso plataforma 100% participantes | Si | No |
| [ ] NPS kickoff >= 7 | Si | No |

**Criterio final**: 5+ PASS = **GREEN**, AVANZA. Menos de 5 = **RED**, remediation antes semana 2.

---

### Gate 2: Semana 3-4 — Aha! Moment Organizacional

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Equipo documenta 1+ caso real aplicado (por area E3) | Si | No |
| [ ] Adoption >= target (80% E1, 70% E2, 60% E3) | Si | No |
| [ ] Aha! validado por sponsor (email confirm) | Si | No |
| [ ] Asistencia >= 80% | Si | No |
| [ ] NPS promedio sesiones >= target (8 E1, 7.5 E2, 7 E3) | Si | No |

**Criterio final**: 4/5 PASS = **GREEN**, AVANZA. Menos de 4 = **YELLOW**, diagnostico rapid + intervention + re-test week 5.

---

### Gate 3: Final — Autonomy y Handoff

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Champions certificados (3+ sesiones lideradas) | Si | No |
| [ ] Playbook entregado y confirmado recibido | Si | No |
| [ ] ROI metodologia documentada (antes/despues) | Si | No |
| [ ] Plan F4 (soporte post, expansion roadmap) comunicado | Si | No |
| [ ] Caso exito redactado (listo para marketing) | Si | No |
| [ ] Sponsor + steering aprueban cierre (email) | Si | No |

**Criterio final**: 5/6 PASS = **GREEN**, completado. 4/6 = **YELLOW**, cierre parcial + seguimiento 30 dias. Menos de 4 = **RED**, extension fase + re-test.

---

## 11. Capacity Model (Gestion de Recursos)

### Maximos por Facilitador/Coach

| Rol | Programa | Grupos/Trimestre | Participantes Simultaneos | Notas |
|-----|----------|-----------------|---------------------------|-------|
| Coach grupal (E1,E2) | Workshop/Bootcamp | 4-6 | 40-120 personas | Secuencial, no overlap, 1-2 semanas entre cohorts |
| Coach corporativo (E3) | Programa medida | 1 | 80-100 (multi-cohorte gestionada) | Tiempo full, requiere coordinacion multi-area |
| Facilitador auxiliar | E3 steering | 1 | N/A | 2h/semana por programa E3 |

### Capacidad Trimestral por Programa

| Programa | Cap. Trimestral | Coaches Requeridos | Bottleneck |
|----------|-----------------|-------------------|------------|
| Workshop Express (1-2 dias) | 12 talleres x 30 personas = 360 clientes | 1 coach (4-6 workshops secuencial) | Scheduling intensivo, travel |
| Bootcamp Corporativo (4-8 sem) | 2-3 bootcamps x 15 personas = 30-45 clientes | 1-2 coaches (per bootcamp) | Duracion larga (full month x 2-3) |
| Programa A Medida E3 (8-16 sem) | 1 programa x 80 personas = 80 clientes | 1 coach full + 1 auxiliar | Duracion muy larga, coordinacion multi-area |

### Bottleneck Analysis

- **E1 Workshops**: Escalabilidad alta (replicas faciles), bottleneck = coach travel
- **E2 Bootcamps**: Moderada (content personalizado/sector), bottleneck = duracion (6-8 semanas full)
- **E3 Programas**: Baja (muy custom), bottleneck = duracion + complexity coordinacion multi-area

---

## 12. Handoff Outgoing a F4 (Success / Expansion)

**Antes de cerrar SOP F3, entregar a F4 exactamente esto:**

- [ ] Playbook completado (E1: 10pg, E2: 30pg, E3: 100+pg) + confirmacion recibida
- [ ] Dashboard adopcion final + ROI tracking (E2/E3: formato BI, exportable)
- [ ] Champions certificados (nombre, rol, contact, plan post-programa)
- [ ] Caso exito redactado (marketing-ready, 3-5 paginas + video si aplica)
- [ ] ROI report formal (antes/despues comparison, metricas validadas)
- [ ] Plan F4 (soporte continuado, frequency, cost, expansion roadmap)
- [ ] Steering committee approva cierre (email formal)
- [ ] Change orders compilados (si aplica)
- [ ] Testimonial/quotes grabados (consentimiento confirmado)

**Si cualquier elemento falta**: SOP F3 no se cierra, no entra a F4.

---

## 13. Rituales Asociados

- `ejecutar-bootcamp-corporativo-ritual` — Checklist sesion a sesion para facilitador (AARC timing, engagement, doc)
- `verificar-adopcion-equipo-ritual` — Protocolo quincenal de medicion de adopcion (dashboard pull, diagnostico)
- `gestionar-champions-internos-ritual` — Ciclo de vida del champion (seleccion → formacion → activacion → certificacion)
- `gate-week1-ritual` — Checklist Gate 1 (kickoff success)
- `gate-week3-ritual` — Checklist Gate 2 (Aha! validation)
- `gate-final-ritual` — Checklist Gate 3 (autonomy + handoff)
- `change-management-comms-ritual` — Secuencia de comunicaciones internas (plantillas + calendar)

---

## 14. Metricas de Salud del SOP

| KPI | Formula | Target | Frecuencia | Accion Si Falla |
|-----|---------|--------|------------|-----------------|
| **Org Completion Rate** | Empresas que pasan Gate 3 / Total iniciadas | > 90% | Por programa | Auditar 3 close-out calls |
| **Team Adoption Rate** | % equipo usando IA herramienta diariamente (30 dias post) | > 70% | 30d post | Engagement plan F4 |
| **Champion Certification Rate** | Champions certificados / Nominados | > 85% | Por programa | Re-formacion + extended runway |
| **ROI Verificado** | Empresas con ROI medible documentado | > 80% | 90d post | Metodologia review, maybe re-measurement |
| **Expansion Rate** | Empresas que contratan servicios F4/expansion | > 40% | 6 meses post | Analizar: product fit? pricing? sales? |
| **Aha! Rate** | Organizaciones con Aha! moment verificado (Gate 2) | > 85% | Por programa | Diagnostico adopcion, pedagogy review |
| **Steering Completion** (E3 only) | Steering meetings ocurridas / scheduled | 100% | Semanal | Reschedule immediately, no delays |
| **Contract Compliance** | Deliverables on-time / Total commitments | 100% | Por programa | Change order o remediation plan |

---

## 15. Escalamiento y Governance

| Situacion | Trigger | Accion | Responsable | Timeline |
|-----------|---------|--------|------------|----------|
| **Gate 1 FAIL** | Kickoff no completado o baseline no capturada | Re-schedule kickoff, remediate blockers (tech/comms) | Ops + Sponsor | 5 dias |
| **Gate 2 YELLOW** | Adoption <60% semana 3 | Diagnostico + intervention (ver paso 5) | Coach + Sponsor | 48h |
| **Gate 2 RED** | Adoption <50% semana 5 | Escalation a lider delivery, plan B (scope/timeline) | Lider + Sponsor | 72h |
| **Risk: Sponsor turnover** | Sponsor changes mid-programa | "New sponsor onboarding" (30 min) + steering briefing | Lider + New sponsor | 48h |
| **Risk: IT blocks access** | Acceso denegado a herramienta(s) | Escalation path: Coach → Ops → IT Director | Ops + IT | 24h |
| **NPS <7 sostenido** | 2+ sesiones NPS baja | Content review + coaching ajuste + feedback loop | Coach + Lider | 5 dias |
| **ROI appears negative** | Metricas trending down | Sponsor call (diagnostico) + intervention (week 6) | Lider + Sponsor | 72h |
| **Solicitud refund / cancel** | Cliente solicita reversa | 1:1 con lider (no coach), evaluacion por gate pasado | Lider + Admin | 3 dias |

---

## 16. Dependencias y Gobernanza

> **Gobierno**: Este SOP cierra los Gaps G2-G4 detectados en la Matriz de Journeys (adopcion a nivel equipo, stakeholder management, ROI).
> **Dependencia upstream**: sop-structuring-b2b (F2) — debe entregar ODS + Business Case + Baseline
> **Dependencia downstream**: sop-success-b2b (F4) — recibe Handoff con playbook + champions + ROI + expansion roadmap
> **Revision**: Trimestral (por cohorte) o al agregar nuevo programa E2/E3 al portafolio.
> **Dueño del SOP**: Director de Delivery B2B (Enterprise)
> **Última revision**: 2026-03-24 (v2.0, +10x quality con 9 mejoras sistémicas)
