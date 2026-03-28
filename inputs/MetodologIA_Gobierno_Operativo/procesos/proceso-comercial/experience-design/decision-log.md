# Decision Log — MetodologIA Experience Design

> **Documento**: Decision Log (Architecture Decision Records)
> **Versión**: 1.0
> **Fecha**: 2026-03-24
> **Propósito**: Registrar decisiones diseño experiencia cliente con contexto, alternativas, trade-offs, y trazabilidad
> **Vigencia**: Q2 2026 onwards
> **Owner**: Diseño Experiencia / Gobierno Operativo
> **Aplicabilidad**: Todos los segmentos (B2C P1-P4 + B2B E1-E3)

---

## Formato de Registro (ADR-lite)

Cada decisión incluye:
- **ID**: Decision-XXYYZZ (estratégica/segmentación/entrega/tech/comercial/operacional)
- **Fecha**: Decisión aprobada
- **Estado**: Vigente / Deprecated / En revisión
- **Contexto**: Por qué se tomó la decisión
- **Decisión**: Qué se eligió y por qué
- **Alternativas**: Opciones consideradas + razón rechazo
- **Trade-offs**: Qué se gana vs. qué se sacrifica
- **Consecuencias**: Impacto downstream
- **Reversibilidad**: 1 (fácil reversar) - 5 (muy costoso reversar)
- **Riesgo**: Low / Medium / High
- **Owner**: Responsable de mantener vigencia

---

## DECISIONES ESTRATÉGICAS (STRATEGIC)

### D-STRAT-001: Modelo de 6 Fases vs. 4 Lineales

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Sitio web heredado usaba 4 fases lineales (Tú→Juntos→Nosotros→Tú). Diagnóstico reveló insuficiencia para B2B y múltiples segmentos.

**Decisión**: Expandir a 6 fases no-lineales:
- F0 Awareness (customer initiation)
- F1 Diagnóstico (baseline assessment)
- F2 Diseño (co-design ruta)
- F3 Práctica (implementation + QA)
- F4 Autonomía (handoff + ongoing)
- F5 Advocacy (expansion + referral)

**Alternativas consideradas**:
- Mantener 4 fases (rechazado: insuficiente para F3 QA gates, no separaba autonomía de advocacy)
- 8 fases tipo Waterfall (rechazado: complejidad operativa excesiva)

**Trade-offs**:
- Ganancia: Mayor fidelidad a customer reality, permite QA gates diferenciados en F3
- Pérdida: Complejidad en roadmaps, exige reentrenamiento coaches

**Consecuencias**:
- Service Blueprint v2.0 rediseñado (37 MOTs)
- Métricas de fase específicas (FCP, QA Week 1/3/Final)
- Cambio en nomenclatura interna (legacy 4→6)

**Reversibilidad**: 4/5 (requiere re-arquitectura service blueprint, nuevos KPIs)
**Riesgo**: Low (validado en 50+ diagnósticos)
**Owner**: Jefe Diseño Experiencia

**Refs**: service-blueprint-general.md §2, matriz-journeys-por-segmento.md

---

### D-STRAT-002: Soberanía Digital como North Star (vs. Revenue / NPS)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Compañías adopción IA típicamente optimizan revenue o NPS. MetodologIA es activista de autonomía cliente.

**Decisión**: Declarar Soberanía Digital como North Star:
- Métrica primaria: "Lo que cliente sigue logrando sin MetodologIA"
- No revenue, no NPS, no completion rate
- Refleja valores fundacionales + diferenciador competitivo

**Alternativas**:
- Revenue por cliente (rechazado: misalignment con misión)
- NPS / CSAT (rechazado: vanity metric, no correlaciona con autonomía real)
- Completion rate (rechazado: mide adherencia, no maestría)

**Trade-offs**:
- Ganancia: Autenticidad marca, filtro selectivo clientes, resilencia a commoditización
- Pérdida: Difícil de vender a inversores convencionales, require cultura alineada

**Consecuencias**:
- Filtro de cliente BANT reorientado (busca autonomía-seekers, no quick-fixers)
- Métricas F4-F5 pivotadas (tracking post-programa outcomes)
- Cambio en messaging ventas y onboarding

**Reversibilidad**: 5/5 (es decisión cultural/misión)
**Riesgo**: Medium (differentiation pero puede limitar scale)
**Owner**: CEO / Diseño Experiencia

**Refs**: service-blueprint-general.md §1 (Principio Rector), customer-journey-general.md (Outcome Esperado F4-F5)

---

### D-STRAT-003: LATAM-only Geography + Spanish-only Language (Fase 1)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Fundadores hispanohablantes, mercado LATAM subestimado en adopción IA, contexto cultural diferente a EEUU.

**Decisión**:
- **Geografía**: Limitar a LATAM (México, Colombia, Chile, Perú, Brasil futuro)
- **Idioma**: Español exclusivo en F0-F3 (Python code comments en inglés)
- **Rationale**: Profundidad > escala. Dominancia cultural en región antes de expansión global.

**Alternativas**:
- Global en Day 1 (rechazado: quality diluida, complejidad operativa)
- Inglés desde inicio (rechazado: pierde autenticidad, fragmenta comunidad)
- Multiidioma en F0-F1 (rechazado: overhead translation)

**Trade-offs**:
- Ganancia: Comunidad cohesionada, diferencial regional, pricing premium
- Pérdida: TAM limitado, exige mercadeo LATAM específico

**Consecuencias**:
- Roadmap expansión: Portugués (Brasil) Q4 2026, Inglés Q2 2027
- Filtro geográfico en CRM (lead scoring LATAM)
- Contenido web/marketing localizado por país

**Reversibilidad**: 2/5 (idioma fácil, geografía requiere infraestructura)
**Riesgo**: Low (validado con 40+ clientes LATAM)
**Owner**: Growth / Diseño Experiencia

**Refs**: customer-journey-general.md (Contexto cultural)

---

## DECISIONES SEGMENTACIÓN (SEGMENTATION)

### D-SEG-001: 7 Segmentos (4 B2C + 3 B2B) vs. Más / Menos

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Análisis 200+ leads + 30 clientes históricos reveló patrones de comportamiento e inversión.

**Decisión**: Taxonomía oficial de 7 segmentos:
- **B2C**: P1 Professional (transición, 30-45y), P2 Student (uni, <25y), P3 Executive (C-level, >45y), P4 Autodidact (self-directed, varied)
- **B2B**: E1 Small Business (1-20 emp), E2 Enterprise (21-200 emp), E3 Corporate (200+)

**Alternativas**:
- 4 segmentos (rechazado: P3↔E2 overlap, insuficiente para pricing diferenciado)
- 12+ segmentos (rechazado: overhead operativo, journeys idénticas)
- Adicionar Freelancers, Retirados, Gobierno, NGOs, K-12, Médico/Legal (rechazado: ver D-SEG-002)

**Trade-offs**:
- Ganancia: Journeys diferenciados, pricing por WTP, operabilidad
- Pérdida: Clientes fronterizos requieren clasificación manual

**Consecuencias**:
- 7 customer journeys distintos (CJ-P1 a CJ-E3)
- Matriz de filtros CRM (lead scoring por segmento)
- Playbooks coaching diferenciados por segment

**Reversibilidad**: 3/5 (agregar segmento es bajo costo, quitar afecta clientes existentes)
**Riesgo**: Low
**Owner**: Diseño Experiencia

**Refs**: matriz-journeys-por-segmento.md, customer-journeys-b2c-personas.md, customer-journeys-b2b-empresas.md

---

### D-SEG-002: Segmentos Excluidos Explícitamente

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Demanda detectada de Freelancers, Retirados, Sector Público, NGOs, K-12, Médico/Legal.

**Decisión**: Excluir explícitamente:
- **Freelancers**: Overlap con P1/P4, margin insuficiente, churn alto (volatilidad ingresos)
- **Retirados**: Bajo LTV, motivación hobby, no B2B bridges
- **Sector Público / NGOs**: Budget delays (6-12m), compliance overhead, overhead legal
- **K-12**: COPPA compliance (edad <13), regulatory complexity USA/LATAM
- **Médico/Legal**: Regulatory (recetas, liability), compliance overhead (HIPAA-equivalente)

**Rationale**: Focus + profundidad. 7 segmentos requieren mastery operativa.

**Alternativas**:
- Incluir todos (rechazado: quality diluida, churn 80%+)
- Solo B2C (rechazado: pierde B2B margin)

**Trade-offs**:
- Ganancia: Operabilidad, menor churn, homogeneidad cohort
- Pérdida: TAM reducido ~20-30%

**Consecuencias**:
- Filtros negativos en lead scoring (exclusión automática)
- Messaging claro en web: "No aplica a sector público"
- Plan futuro: waitlist público para eventuales expansiones

**Reversibilidad**: 2/5 (fácil revertir si operabilidad mejora)
**Riesgo**: Low (validado en análisis de churn histórico)
**Owner**: Diseño Experiencia / Growth

**Refs**: D-SEG-001

---

### D-SEG-003: B2C→B2B Bridge Strategy (P3 → E2/E3)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: 60% de E2/E3 clientes iniciaron con P3 (execs usando bootcamp personal). Oportunidad de expansión interna.

**Decisión**: Bridge strategy explícita:
- Target: P3 Ejecutivos que logren maestría en F4 → proponen MetodologIA a sus organizaciones
- Tasa esperada: 50-60% de P3 → upgrade a E2/E3
- Mecanismo: Licencia de equipo (5+ participantes) con pricing escalonado

**Alternativas**:
- Vender E2/E3 directo (rechazado: long sales cycle, decision fatigue)
- Mantener P3/B2B separados (rechazado: pierde 30-40% potencial LTV)

**Trade-offs**:
- Ganancia: Menor CAC para B2B (viene referenciado), mejor fit, advocacy natural
- Pérdida: Requiere 3-4 mes extra de P3 coaching antes de bridge

**Consecuencias**:
- F3 coaching P3 incluye module "Escalabilidad Organizacional"
- F4 check-in mensual alude a oportunidades team
- CRM automation para detectar P3→E2 upgrade signals

**Reversibilidad**: 1/5 (bajo costo reversar, es workflow add)
**Riesgo**: Low
**Owner**: Diseño Experiencia

**Refs**: customer-journeys-b2c-personas.md (CJ-P3 §Escalabilidad), customer-journeys-b2b-empresas.md (CJ-E2 Origen)

---

## DECISIONES ENTREGA (DELIVERY)

### D-DEL-001: Modelo AARC (Activar-Aprender-Replicar-Comprometer) + Ratio 1:3:4:1

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Bootcamps tradicionales típicamente 50% teoría, 50% lab. Meta autonomía requiere rebalance.

**Decisión**: Estructura sesión tipo:
- **A (Activar)**: 10% tiempo — trigger contexto, pregunta provocadora
- **A (Aprender)**: 30% tiempo — cocreación competency, framework, herramienta
- **R (Replicar)**: 40% tiempo — casos reales cliente, hands-on, feedback tight-loop
- **C (Comprometer)**: 10% tiempo — commitment nextстeps, accountability check, referral ask

Sesión típica 90min = 9min / 27min / 36min / 9min

**Alternativas**:
- 50/50 teoría/lab (rechazado: insuficiente para F4 autonomía)
- 20/60/20 (rechazado: demasiado replicación, bajo understanding)
- Proporcional por segmento (rechazado: overhead coaches, quality inconsistente)

**Trade-offs**:
- Ganancia: Autonomía real, mayor engagement, lower churn
- Pérdida: Coaches necesitan maestría "live facilitation", más prep

**Consecuencias**:
- SOP Coaching by Phase (AARC tempo diferente F1 vs F3)
- Plantilla sesión standardizada en LMS
- Training coaches en "replication game design"

**Reversibilidad**: 2/5 (es workflow, fácil ajustar ratios)
**Riesgo**: Low
**Owner**: Jefe Coaches / Diseño Experiencia

**Refs**: service-blueprint-general.md §Capa 3 (Sesiones coaching guiadas)

---

### D-DEL-002: 3 Quality Gates en F3 (Week 1 Engagement, Week 3 Aha!, Final Autonomy Readiness)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: F3 típicamente 4-20 semanas sin checkpoints. Resultado: 40% abandono semana 2-3, 20% false completion.

**Decisión**: 3 QA gates mandatorios:
- **QG1 (Week 1 — Engagement)**: Asistencia + completitud homework. Trigger: "Qué barreras sientes?"
- **QG2 (Week 3 — Aha Moment!)**: 1ª implementación case real + documentación. Trigger: verificar "momentum"
- **QG3 (Final — Autonomy Readiness)**: Puede client diseñar su propio prompt/workflow sin coach? Decisión: Certification o Remedial Coaching.

Cada QG requiere coach decision: Continue / Remedial / Exit (refund opción)

**Alternativas**:
- Sin gates (rechazado: quality riesgo, churn silent)
- Gates semanales (rechazado: overhead coach 30%+)

**Trade-offs**:
- Ganancia: Visibilidad progreso, intervención temprana, quality assurance
- Pérdida: Algunos clientes salen en QG1 (transparencia, no bad match)

**Consecuencias**:
- Dashboard coaching por QG (red/yellow/green status)
- SOP escalation si cliente en riesgo
- Adjustable coaching intensidad basado en QG results

**Reversibilidad**: 2/5 (gates structure fácil ajustar)
**Riesgo**: Medium (requiere disciplina coaches)
**Owner**: Jefe Coaches / QA

**Refs**: service-blueprint-general.md §4 (Momentos de Verdad F3)

---

### D-DEL-003: Max 10 Clientes por Coach, Max 20 por Bootcamp Cohort

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Coaching 1:1 + grupo bootcamp requiere balance. Datos: ratio >1:20 causa churn, <1:10 infrautilización.

**Decisión**:
- **1:1 Coaching**: Max 10 clientes activos per coach (across phases)
- **Bootcamp Cohort**: Max 20 participantes por cohort (balance participación vs. intimidad)
- **Implicación**: Coach 1:1 + 2-3 bootcamp cohorts simultáneamente

**Alternativas**:
- 1:25 (rechazado: quality ↓40%, churn ↑)
- 1:8 (rechazado: infrautilización, economics no cierran)
- Bootcamp 60+ (rechazado: disengagement, no intimidad para vulnerability)

**Trade-offs**:
- Ganancia: Attention density, relationship depth, autonomy real
- Pérdida: Margin por participante baja, requiere scale coaches

**Consecuencias**:
- Headcount plan coaches: 1 per 10 clientes en pipeline
- Waitlist si cohort full (FOMO effect, conversion ↑)
- Economics: €20-50k per coach annual cost vs. €300-500k per coach revenue

**Reversibilidad**: 2/5 (es capacity constraint, reversible pero reputational risk)
**Riesgo**: Low (validado en 5+ cohorts)
**Owner**: Jefe Coaches / Operaciones

**Refs**: service-blueprint-general.md §Capa 3 (Sesiones coaching)

---

### D-DEL-004: Zoom/Teams para Delivery (vs. Custom Platform)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Tentación custom platform (Slack + Loom + Airtable integration). ROI vs. velocity trade-off.

**Decisión**: Usar Zoom/Teams como primary (no buildear):
- Zoom para 1:1 y bootcamp síncronos
- Teams para async (files, chat, announcements)
- Integration: Zoom recording → Teams (permanencia)
- Decision gate: buildear solo si adoption <60% o complaint rate >30%

**Alternativas**:
- Custom platform (rechazado: 6-9 mes dev, 80k+, maintenance burden)
- Loom + Discord (rechazado: silo información, inconsistencia)

**Trade-offs**:
- Ganancia: Time-to-market, zero maintenance, familiar UX
- Pérdida: Less "wow factor", hard to differentiate UX

**Consecuencias**:
- Onboarding focuses on Zoom/Teams hygiene (quality audio/lighting)
- LMS for content delivery (separate decision D-TECH-002)
- Analytics dashboards outside platform (Hubspot + custom Looker)

**Reversibilidad**: 1/5 (puede switch plataforma sin friction)
**Riesgo**: Low
**Owner**: Operaciones / Tech

**Refs**: service-blueprint-general.md §Capa 6 (LMS / Plataforma entrega)

---

## DECISIONES TECNOLOGÍA (TECHNOLOGY)

### D-TECH-001: HubSpot como CRM (vs. Salesforce / Pipedrive / Custom)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Necesidades CRM: lead scoring B2C/B2B, pipeline coaching, customer health, referral tracking.

**Decisión**: HubSpot (free/pro tier escalando a enterprise):
- Lead capture (form + Zapier integrations)
- Deal pipeline (5 stages: Awareness → Diagnostico → Diseño → Práctica → Autonomía)
- Contact segmentation (7 segments + custom properties)
- Reporting dashboard (CAC, LTV, churn by segment)
- Automation: email sequences F0-F1, QA alerts F3, advocacy tracking F5

**Alternativas**:
- Salesforce (rechazado: overkill para stage actual, $$$)
- Pipedrive (rechazado: weak reporting, no email automation nativa)
- Custom (rechazado: 200+ horas dev, 6 meses)
- Monday/Airtable (rechazado: CRM weak, es project mgmt)

**Trade-offs**:
- Ganancia: 80/20 coverage, ease of setup, costo lineal
- Pérdida: Less customization que Salesforce, some limitations forecast

**Consecuencias**:
- Integrations: Stripe (invoicing), Zoom (activity log), HubSpot <→ LMS
- Training interna 4h para team (lead scoring, reporting)
- Migration path to Salesforce if revenue >$5M annual

**Reversibilidad**: 1/5 (data exportable, low switching cost)
**Riesgo**: Low
**Owner**: Tech / Operations

**Refs**: service-blueprint-general.md §Capa 6 (CRM / Hubspot)

---

### D-TECH-002: LMS Interno vs. Google Drive + Notion + Loom (Light Stack)

**Estado**: En revisión
**Fecha**: 2026-03-24
**Contexto**: Decisión interina: usar light stack (Google Drive + Notion + Loom embeds) pending revenue threshold.

**Decisión**: Light stack hasta $500k annual revenue. Trigger decision to buildear/adopt at $500k:
- **Hoy**: Notion workspace (structured lessons + homework) + Google Drive (readings, templates)
- **Zoom recordings**: Embeds en Notion, also archived en Teams
- **Analytics**: Manual tracking (Looker sheets) de completion rates
- **Escalation**: If adoption <60% o cohort >50 people, reevaluate

**Alternativas**:
- Teachable / Kajabi (rechazado: expensive $300+/m, overkill features)
- Canvas / Open edX (rechazado: complexity, hosting required)
- Custom LMS (rechazado: engineering burden)

**Trade-offs**:
- Ganancia: Velocity, costo bajo, familiar UX
- Pérdida: Limited analytics, no certificate/badge system, manual admin

**Consequences**:
- Notion SOP para coaches (structure per bootcamp)
- Homework submission via Google Form (para tracking QG1)
- Escalation plan: Teachable evaluation Q3 2026

**Reversibilidad**: 1/5 (total data portability)
**Riesgo**: Medium (if scale hits, scramble to enterprise LMS)
**Owner**: Tech / Learning Design

**Refs**: D-DEL-004, service-blueprint-general.md §Capa 6

---

### D-TECH-003: Prompt Library (HubSpot + Internal Git Repo)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: F3 clientes necesitan custom prompts. Sistema versionado + audit trail.

**Decisión**:
- **Master library**: Private GitHub repo (prompts.metodologia.ai — main branch protected)
- **Client-specific**: Copy in HubSpot deal record + Notion page (versioning via Git tag per client)
- **QA**: Code review 1 coach + tech antes de deploy to client
- **Iteration**: Client feedback → GitHub issue → sprint de refinement

**Alternativas**:
- HubSpot only (rechazado: no version control, hard to diff)
- Google Drive (rechazado: no audit trail, collaboration messy)

**Trade-offs**:
- Ganancia: Audit trail, reusability, quality gate, knowledge capture
- Pérdida: Extra process step (Git commit mentality)

**Consequences**:
- SOP "Prompt Creation & Handoff" (includes Git flow)
- Training coaches en Git basics (30min)
- Analytics: Track prompt adoption (most useful by segment)

**Reversibilidad**: 1/5 (fácil migrar)
**Riesgo**: Low
**Owner**: Tech / Product

**Refs**: D-TECH-001

---

## DECISIONES COMERCIAL (COMMERCIAL)

### D-COM-001: Revenue Model por Segmento (P1 / P3 / E3 pricing)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: WTP analysis 50 leads + 15 clientes: huge variation por segmento. Unified pricing dejaría dinero.

**Decisión**: Tiered pricing por segmento (4 semanas 1:1 + 8 semanas bootcamp):
- **P1 (Professional transición)**: 200k-800k COP (~$50-200 USD) — economía tight, job search focus
- **P2 (Student)**: 100k-300k COP (~$25-75) — tight budget, university discounts possible
- **P3 (Executive)**: 800k-2.4M COP (~$200-600) — high WTP, soloing para team later
- **P4 (Autodidact)**: 200k-600k COP (~$50-150) — variable, incentivize referrals
- **E1 (Small Biz)**: 5M-15M COP (~$1.2-3.5k) — per employee pricing
- **E2 (Enterprise)**: 50M-150M COP (~$12-35k) — per seat, min 5 seats
- **E3 (Corporate)**: 30M-150M+ COP (~$7-40k+) — custom RFP, often annual contract

**Rationale**: Capture 70%+ WTP spread, economics sustain coaching quality

**Alternatives**:
- Unified pricing (rechazado: leaves ~35-40% revenue on table, unsustainable quality)
- Complex matrix (rechazado: sales friction, admin overhead)

**Trade-offs**:
- Ganancia: Revenue per client, profitability, sustainability
- Pérdida: Perception de inequality (mitigated by equal quality delivery)

**Consequences**:
- Pricing landing page con comparativa clara
- CRM automation para "pricing confidence" by segment
- Annual pricing review (Q1) basado en inflation + WTP surveys

**Reversibilidad**: 2/5 (pricing change delicado pero posible)
**Riesgo**: Low (validated with 20+ price tests)
**Owner**: Commercial / Growth

**Refs**: customer-journeys-b2c-personas.md §Investment, customer-journeys-b2b-empresas.md §Investment

---

### D-COM-002: Garantía de Autonomía (Money-Back + 30-Day Trial)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Buyer anxiety: "¿Y si no aprendo?" Meta is autonomía, not transaction. Alinear incentivos.

**Decisión**:
- **30-day trial period** (F0 + early F1): Full refund no questions if "no feel fit"
- **Autonomy guarantee post-F3**: If client can't independently design 1 prompt after F3, remedial coaching gratis OR refund 50%
- **F4 outcome**: If metrics not met by 90 days post-program, 1 month free coaching (net loss acceptable, builds trust)

**Rationale**: Soak up risk. Buyers who stay → advocates. Filter weak matches.

**Alternatives**:
- Standard refund (rechazado: doesn't address autonomy anxiety)
- No guarantee (rechazado: wrong signal for autonomy mission)

**Trade-offs**:
- Ganancia: Trust, advocacy, quality signal, filter bad-fit
- Pérdida: 5-10% refund rate, but churn post-program ↓ 30%

**Consequences**:
- LMS module: "How to Know You've Got It" (autonomy self-check)
- SOP Refund Process (escalation to CEO if >50% cohort)
- Marketing emphasis: "Money back promise" (conversion lift)

**Reversibility**: 2/5 (policy switch okay, trust impact gradual)
**Riesgo**: Medium (refund impact on runway, but offset by lower churn)
**Owner**: Commercial / Operations

**Refs**: D-STRAT-002 (Soberanía North Star), service-blueprint-general.md §Principio Rector

---

### D-COM-003: Distribution Channel (Direct-Only, No Affiliates/Resellers Phase 1)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Tentación partners resellers. Decision: control quality in Phase 1.

**Decisión**: Direct-to-client only (2026-2027):
- Web + content marketing + organic referral
- NO affiliates, NO Coursera/Udemy (control quality)
- After $2M revenue: evaluate white-label para corporate (2028+)

**Alternatives**:
- Affiliate network from Day 1 (rechazado: quality risk, loss of brand control)
- Exclusive partner (rechazado: leverage imbalance)

**Trade-offs**:
- Ganancia: Brand consistency, customer relationship, quality control
- Pérdida: Slower growth, high CAC initially

**Consequences**:
- CAC target: $200-500 per client (organic content + some paid ads)
- SEO/content focus (long-tail "IA adoption LATAM")
- Referral reward structure (10-15% commission for peer referrals)

**Reversibility**: 3/5 (adding channels okay, hard to shed low-quality partners)
**Riesgo**: Low (direct model proven SaaS)
**Owner**: Growth / Commercial

**Refs**: D-STRAT-003 (LATAM-only)

---

## DECISIONES OPERACIONAL (OPERATIONAL)

### D-OPS-001: 100 Check Standard (Quality Assurance Framework)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Quality variance coaches detected en early cohorts. Need systematic QA.

**Decisión**: Adopt "100 Check Standard":
- **100 items checklist** spanning: Lesson design (20), Facilitation (25), Assessment (20), Feedback (15), Admin (20)
- **Monthly 360 review**: Peer + manager + client feedback mapped to checklist
- **Tier system**: Bronze (<70), Silver (70-84), Gold (85-94), Platinum (95+)
- **Consequence**: Platinum coaches get 10% bonus, Bronze → coaching plan

**Rationale**: Distributed quality ownership. Coaches self-compete.

**Alternatives**:
- Manager-only audits (rechazado: overhead, resentment)
- Spot checks (rechazado: inconsistency)
- NPS-based (rechazado: lagging indicator)

**Trade-offs**:
- Ganancia: Coach empowerment, quality visibility, peer learning
- Pérdida: Time investment check calibration, some coaches defensive

**Consequences**:
- Quarterly check training (15 minutes, rotate items)
- Airtable dashboard: each coach progress vs. standard
- Promotion/retention tied to tiers (after Q2 2026)

**Reversibility**: 2/5 (framework flexible, easy adjust items)
**Riesgo**: Low (peer-based, less adversarial)
**Owner**: Jefe Coaches / People Ops

**Refs**: D-DEL-002 (QA gates), D-DEL-003 (Coach capacity)

---

### D-OPS-002: Weekly All-Hands + Monthly Strategic Review (Governance Cadence)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: Growth from 5 → 15 coaches + ops. Need communication structure.

**Decisión**:
- **Weekly All-Hands** (30min, Tuesday 9am LATAM time): Wins + blockers + quick wins (decisions <$500)
- **Monthly Strategic** (60min, last Friday): OKR review, campaign debrief, hiring, bigger decisions
- **Quarterly Offsite** (half-day): Team alignment, strategy refresh, celebration

**Governance rule**: Decisions >$5k need 48h notice in Slack, 1 week for hiring/major feature changes

**Alternatives**:
- Daily stand-ups (rechazado: burnout, async better for distributed)
- Ad-hoc (rechazado: misalignment, surprises)

**Trade-offs**:
- Ganancia: Alignment, fast decision-making, team morale
- Pérdida: Calendar overhead (10 hours/month per person)

**Consequences**:
- Slack channel #decisions (tracked via GitHub issues)
- Meeting templates (agenda, decisions, follow-ups)
- Recording + transcript for async catch-up

**Reversibility**: 1/5 (easy adjust cadence)
**Riesgo**: Low
**Owner**: CEO / Operations

**Refs**: governance structure (future decision log expansion)

---

### D-OPS-003: SOP Versioning & Ownership (Living Documents)

**Estado**: Vigente
**Fecha**: 2026-03-24
**Contexto**: SOPs outdated if not maintained. Need clarity on ownership.

**Decisión**:
- **Every SOP owner** (assigned in doc header): responsible for monthly review
- **Versioning**: MAJOR.MINOR (e.g., 2.1) — MAJOR on process change, MINOR on clarification/typo
- **Change log** bottom of each SOP
- **Deprecation**: When MAJOR bump, notify team 2 weeks before enforcement

**Rationale**: Prevents zombie docs, increases ownership

**Alternatives**:
- Central ops person maintains (rechazado: bottleneck, overhead)
- No formal versioning (rechazado: confusion, rollback risk)

**Trade-offs**:
- Ganancia: Clarity, accountability, versioning trail
- Pérdida: Requires discipline

**Consequences**:
- SOP template standardized (header includes owner, version, last review date)
- Slack reminder monthly: "SOP reviews due this week"
- Quarterly SOP audit (spot-check 5 random)

**Reversibility**: 1/5 (governance lightweight)
**Riesgo**: Low
**Owner**: Operations

---

## DECISIONES ABIERTAS (OPEN QUESTIONS)

Las siguientes decisiones están pendientes validación o requieren más contexto:

| ID | Pregunta | Dueño | Deadline |
|----|----------|-------|----------|
| D-OPEN-001 | ¿Expandir a Brasil (Portuguese)? Timing, canales entrada, hiring local coaches? | Growth | Q3 2026 |
| D-OPEN-002 | ¿Certificación post-F4? (Badge, credential, blockchain?) Risk: dilutes autonomía narrative | Product | Q2 2026 |
| D-OPEN-003 | ¿Modelo corporativo? (Internal MetodologIA team becomes "consulting division"?) Revenue upside pero distraction. | CEO | Q4 2026 |
| D-OPEN-004 | ¿Plataforma custom LMS? Trigger: $500k revenue or 50+ simultaneous clientes. Evaluate Q3. | Tech | Q3 2026 |
| D-OPEN-005 | ¿Affiliate/reseller program after scale? White-label para corporates (2028+) si revenue >$5M. | Commercial | 2028 |
| D-OPEN-006 | ¿Modelo asincrónico (bootcamp on-demand)?ía + complication. Piloto small cohort Q4 2026. | Product | Q4 2026 |

---

## DECISIONES DEPRECATED (CAMBIOS)

Decisions que fueron vigentes pero han sido reemplazadas:

### D-DEP-001: 4-Phase Model (Original Web)

**Histórico**: Sitio web original (Tú → Juntos → Nosotros → Tú)
**Reemplazado por**: D-STRAT-001 (6 fases)
**Fecha cambio**: 2026-03-24
**Impacto**: Service blueprint v1.0 → v2.0 rediseño, marketing messaging update

### D-DEP-002: Unified Pricing

**Histórico**: Mismo precio todos segmentos (cheaply validar)
**Reemplazado por**: D-COM-001 (tiered by segment)
**Fecha cambio**: 2026-03-15
**Impacto**: ~40% revenue lift, customer selection improvement

---

## MATRIZ DE CROSS-REFERENCES

| Decisión | Impacta |
|----------|--------|
| D-STRAT-001 (6 fases) | service-blueprint-general.md, todas CJs, SOPs by phase |
| D-STRAT-002 (Soberanía) | customer-journey-general.md §Outcome, F4-F5 metrics |
| D-SEG-001 (7 segmentos) | matriz-journeys-por-segmento.md, 7 distinct CJs, lead scoring |
| D-DEL-002 (QA gates) | service-blueprint-general.md §Momentos de Verdad, coaching SOP |
| D-TECH-001 (HubSpot) | lead scoring automation, funnel reporting |
| D-COM-001 (Pricing) | web pricing page, CRM deal stages, negotiation playbooks |

---

## PROCESS DE DECISIÓN FUTURO

Cuando se identifique necesidad nueva decisión:

1. **Proponente** abre issue en GitHub "Decision: [título]"
2. **Contexto + alternativas** shared in Slack #decisions
3. **Deliberación** (3-7 días, max 48h para urgentes)
4. **Decisión** tomada en weekly all-hands o CEO call (si urgente)
5. **Registro** ADR-lite en decision-log.md (este archivo)
6. **Comunicación** team via Slack + all-hands
7. **Impact assessment**: qué docs necesitan actualización (cross-reference)

---

## VERSIONING

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-03-24 | Initial 20 decisiones (6 estratégicas, 3 segmentación, 4 entrega, 3 tech, 3 comercial, 3 operacional) |

---

## Metadata

**Creado**: 2026-03-24
**Owner**: Diseño Experiencia / Gobierno Operativo
**Última revisión**: 2026-03-24
**Próxima revisión**: 2026-06-24 (Q2 close)
**Estado**: Vigente — Aprobado en All-Hands 2026-03-24
