# MetodologIA — Value Chain Analysis

> **Flujos de Valor · Cadena de Valor · Cadena de Suministro**
> **v1.0 | 2026-03-25 | Owner: Javier Montaño**
> **Técnicas**: Lean VSM, Porter Value Chain, Supply Chain Mapping, Theory of Constraints (TOC)
> **Vigencia**: Q2-Q4 2026 | **Dependencias**: Service Blueprint v2.1, RACI Matrix v1.0, Customer Journey docs

---

## 1. RESUMEN EJECUTIVO

Este documento analiza la cadena de valor de MetodologIA desde tres perspectivas complementarias:

1. **Flujos de Valor (Lean VSM)** — Identifica dónde se crea valor para el cliente, dónde hay desperdicio, y cuál es el cuello de botella operacional que limita throughput.
2. **Cadena de Valor (Porter)** — Descompone actividades primarias y de soporte; identifica qué genera diferenciación competitiva.
3. **Cadena de Suministro (SCOR)** — Mapea proveedores, operaciones internas, y canales de distribución; identifica riesgos y oportunidades de optimización.

**Hallazgo Crítico**: F3 (Práctica) es el constraint del sistema. Máximo 30 clientes concurrentes (3 coaches × 10 clientes/coach) → máximo ~120-150 clientes/año throughput.

---

## 2. FLUJOS DE VALOR (VALUE STREAM MAPPING — LEAN)

**Referencia**: Womack & Jones (1996) Lean Thinking; Goldratt (1984) Theory of Constraints

**Objetivo**: Eliminar muda (desperdicio), optimizar mura (irregularidad), y eliminar muri (sobrecarga).

### 2.1 Mapa del Flujo Completo

```
┌─────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│     │    │ F0       │    │ F1       │    │ F2       │    │ F3       │    │ F4       │    │ F5       │
│LEAD │ →  │Awareness │ →  │Diagnóstico│→  │  Diseño  │ →  │ Práctica │ →  │Autonomía │ →  │ Advocacy │ → VALOR
│     │    │          │    │          │    │          │    │          │    │          │    │          │
└─────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘

PT:   0h      2h            3h              4h              100h+           4h              2h
LT:  0-0      1-4 sem       1-2 sem         1-3 sem         4-20 sem        6-8 sem         3-6 mes
VA%: —        5%            30%             25%             80%             10%             5%
                                                              ↑ CONSTRAINT (TOC — DRUM)
```

**Leyenda**:
- **PT** = Process Time (tiempo de procesamiento activo)
- **LT** = Lead Time (tiempo total calendar, inicio a fin)
- **VA%** = Value-Added % (qué % crea valor vs. espera)
- **CONSTRAINT** = Cuello de botella; limita throughput del sistema

### 2.2 Métricas Detalladas por Fase

| Fase | PT (h) | LT (sem) | WT (sem) | VA% | FTE* | Clientes/Semana | Constraint? | Owners |
|------|--------|----------|----------|-----|-----|-----------------|------------|--------|
| **F0** Awareness | 2 | 1-4 | 0-3 | 5% | 0.05 | 10-20 leads/sem | No | Sales, Content |
| **F1** Diagnóstico | 3 | 1-2 | 0-1 | 30% | 0.10 | 2-4 diag/sem | No | Coach, Sales |
| **F2** Diseño | 4 | 1-3 | 0-2 | 25% | 0.15 | 2-3 designs/sem | No | Coach, Tech, Ops |
| **F3** Práctica | 100-200 | 4-20 | 3-19 | 80% | 100%* | 0.3 clients/sem (max 10/coach) | **YES** | Coach, Tech, CS |
| **F4** Autonomía | 4 | 6-8 | 6-8 | 10% | 0.10 | 1-2 clients/sem | No | Client Success, Coach |
| **F5** Advocacy | 2 | 3-6 | 3-6 | 5% | 0.05 | 1-2 clients/sem | No | Client Success, Content |

**\* Notas**:
- **F3 FTE**: 1 coach dedicado = 100% FTE dedicado a 10 clientes max
- **Clientes/Semana**: throughput; F3 es bottleneck
- **3 coaches activos** en 2026-Q1 → 30 clientes máximo concurrentes

### 2.3 Métricas Agregadas del Sistema

| Métrica | Valor | Interpretación |
|---------|-------|-----------------|
| **Total Lead Time** | 15-52 semanas | Desde lead hasta embajador; mediana ~6-8 meses |
| **Total Process Time** | 115 horas | ~3 semanas de 40h; vs. LT = muy baja VA% |
| **Process Cycle Efficiency (PCE)** | PT/LT = 8-12% | Extremadamente bajo; ~80-90% es espera |
| **Takt Time (demanda)** | 1 cliente/3.3 semanas | Basado en constraint F3; si demanda > takt, se forma queue |
| **WIP Limit recomendado (F3)** | 30 clientes máx | = 3 coaches × 10 clientes; threshold crítico |
| **Theoretical Maximum Throughput** | 120-150 clientes/año | (30 clients × 4-5 rotaciones/año); capped por F3 |

### 2.4 Análisis de Constraint (Theory of Constraints — Goldratt DBR)

**Framework DBR** (Drum-Buffer-Rope):

| Elemento | Rol | Descripción | Acción |
|----------|-----|-------------|--------|
| **DRUM** | F3 (Práctica) | Cadence del constraint; 10 clientes/coach = heartbeat del sistema | Never starve F3; gestionar calendario |
| **BUFFER** | F2 (Diseño pipeline) | Stock de clientes listos pero no en F3; absorbe variabilidad F0-F1 | Target: 3-5 clientes ready-to-start |
| **ROPE** | F0-F1 (Intake) | Cadence de prospección / diagnóstico; tied to F3 capacity | Intake rate = F3 throughput rate; no oversell |

**Implicaciones**:
- Si 3 coaches → max 30 en F3 → max ~120-150/año throughput
- Si demanda > 150/año → MUST hire coaches or redesign F3 (group bootcamp, etc.)
- F0-F1 → Sobreoptimizar aquí **NO CREA VALOR**; es waste si no hay F3 capacity

### 2.5 Análisis de Desperdicios (Lean — 7 Wastes adaptados a Servicios)

| Desperdicio | Ocurre en | Manifestación | Impacto | Mitigación |
|-------------|-----------|---------------|--------|-----------|
| **1. Espera (Wait)** | F0-F1, entre-fases | Cliente espera 3-7 días diagnóstico; demora handoff F2→F3 | LT extenso; cliente frío | SLA < 5 días; handoff automation checklist |
| **2. Motion (Movimiento)** | F1-F2-F3 | Cambio de contexto coach (10 clientes); admin scattered | Cogn. overload → errors | Calendario bloqueado; batch sessions por cliente |
| **3. Over-processing** | F1, F2 | Diagnóstico genérico copy-paste; roadmap over-engineered | Tiempo → sin customización | Template + cliente-specific research (1h mín) |
| **4. Inventory (WIP)** | F0-F3 | 20+ leads en pipeline; 5+ en F1; capacidad F3 fija | $ stuck; stale leads | FIFO queue + max WIP limits per phase |
| **5. Defects (Rework)** | F1-F3 | Cliente no resonó con diagnóstico; pivot mid-bootcamp | Horas rebote; cliente frustrado | Quality gates (baseline report + Baseline validation) |
| **6. Talent** | F3 | Coach overload; 15+ clientes = 0 quality | Burnout; NPS ↓ | Hire + train; max 10/coach enforced |
| **7. Knowledge Loss** | F3-F5 | Learnings no documentados; cada cliente custom | Reinventar wheel | Knowledge base; templating system |

---

## 3. CADENA DE VALOR (PORTER VALUE CHAIN)

**Referencia**: Porter (1985) *Competitive Advantage*; adaptada para servicios educativos AI

**Objetivo**: Identificar qué crea diferenciación; dónde se genera margen.

### 3.1 Actividades Primarias

#### **PA-1: INBOUND LOGISTICS (F0-F1: Captación e Intake)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Lead generation, nurturing, calificación, diagnóstico | SEO, ads, email, sales, coach | — | CAC, conversion rate |
| **Key Activities** | (1) Lead magnet + landing; (2) Email sequences; (3) BANT qualification; (4) Diagnóstico 1:1 | Content, Tech, Sales | — | — |
| **Recursos críticos** | Lead magnet asset; CRM; email platform; coach availability | Tech, Content | — | — |
| **Cost** | ~$2k-5k/mes (CAC budget) + FTE Sales + Coach time (F0-F1) | — | — | CAC = $500-1,500/client |
| **Diferenciador** | Segmentación clara (P1-P4, E1-E3); diagnóstico profundo (Baseline Report) vs. generic nurturing | — | — | Baseline Report quality > competitors |

**VA Analysis**: ~35% de LT input está aquí; ~10-15% VA%; alta espera → oportunidad MPro

---

#### **PA-2: OPERATIONS / CORE DELIVERY (F2-F3: Diseño + Práctica)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Co-diseño roadmap, KPIs, custom tools; coaching 1:1 semanal + feedback | Coach, Tech, templates, LMS | **PRIMARY** | NPS, autonomy %, KPI motion |
| **Key Activities** | (1) Sesiones co-diseño (2h); (2) Roadmap visual; (3) Custom GPT generation; (4) Weekly 1:1s (40-200h total); (5) Real-time obstacle resolution | Coach 100% FTE, Tech | **PRIMARY** | — |
| **Recursos críticos** | Coach expertise; custom GPT platform; LMS (templates, playbooks); async communication tools | Coach, Tech | **HIGH** | — |
| **Cost** | ~$50k-80k/coach/año (salary) = $40-160 per client hour | — | **+30-50%** | Revenue/coach = $100k-200k/año |
| **Diferenciador** | Coaching quality + autonomy focus (not dependency); custom GPT tuning; high touch but teaching for independence | — | **PRIMARY** | Autonomy % > 80%; coach switch-off |

**VA Analysis**: ~65% de LT output aquí; ~80% VA%; donde valor ocurre; CONSTRAINT del sistema

---

#### **PA-3: OUTBOUND LOGISTICS (F4-F5: Autonomía + Advocacy)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Autonomy kit delivery, check-ins, embajador recruitment, case study production | Client Success, Content, Coach | **+10-20%** | NPS, referral rate, case studies |
| **Key Activities** | (1) Autonomy Kit (SOP personal, templates, checklist); (2) Monthly check-ins; (3) Embajador invitation; (4) Case study production (video, written) | Client Success, Content | **MEDIUM** | — |
| **Recursos críticos** | Autonomy kit template; async comms platform; production studio (video) | Client Success, Content, Tech | **MEDIUM** | — |
| **Cost** | ~$20k-30k/year for Client Success team (shared across 30-50 clients) = $400-600/client | — | **+10-15%** | CAC recovery; lifetime value |
| **Diferenciador** | Systematic handoff + perpetual access model; embajador network as distribution; case study proof | — | **SECONDARY** | Referral conversion; brand lift |

**VA Analysis**: ~20% de LT; ~7% VA%; high-touch post-sale; generates word-of-mouth

---

#### **PA-4: MARKETING & SALES (F0 + F5: Awareness + Advocacy Loop)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Brand positioning, content marketing, sales strategy, embajador activation | Leadership, Content, Sales, Client Success | — | Brand awareness, lead volume, referral $$ |
| **Key Activities** | (1) Thought leadership (blog, LinkedIn); (2) Webinar series; (3) Sales playbook + sequencing; (4) Referral program | Content, Sales, Leadership | — | — |
| **Recursos críticos** | Content calendar; CRM; sales team; embajador management | Content, Sales | — | — |
| **Cost** | ~$30k-50k/year (content + sales overhead) | — | — | Customer Acquisition Cost (CAC) |
| **Diferenciador** | Authentic case studies (F5 embajadores) vs. generic testimonials; thought leadership (AI + governance) | — | **SECONDARY** | Case study volume & credibility |

**VA Analysis**: ~15% de LT; ~5% VA%; enablement y awareness; critical but not direct delivery

---

#### **PA-5: SERVICE SUPPORT (F3-F4: Obstacle Resolution + Sustainability)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Real-time obstacle resolution, prompt refinement, platform support, sustainability check-ins | Coach, Tech, Client Success | **+5-10%** | NPS, resolution time, churn rate |
| **Key Activities** | (1) Async problem-solving (Slack, email); (2) Custom prompt tuning; (3) Platform fixes; (4) Post-F3 sustainability calls | Coach, Tech, Client Success | — | — |
| **Recursos críticos** | Async comms protocol; prompt library; LMS stability; SOP for common issues | Tech, Coach | — | — |
| **Cost** | Embedded in F3 coach + Tech team overhead | — | — | Low marginal cost if streamlined |
| **Diferenciador** | 24h response SLA; custom prompt tuning (not generic support); knowledge base self-service | — | **MEDIUM** | Support quality; autonomy fostering |

**VA Analysis**: High VA% (embedded in F3); enables coaching effectiveness; retention lever

---

### 3.2 Actividades de Soporte

#### **SA-1: HUMAN RESOURCES (Hiring, Training, Culture)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Recruitment, onboarding, coaching training, culture (AARC values) | Leadership, Operations | — | Coach retention, quality, NPS impact |
| **Key Leverage Point** | Coach quality = #1 lever on NPS + autonomy outcomes | Coach expertise | **CRITICAL** | — |
| **Cost** | ~$20k-30k/coach/year (training + recruitment overhead) | — | — | — |
| **Crítico porque** | Coach is 80% of value delivery; skill/mindset directly impacts client outcomes | — | **CRITICAL** | — |

---

#### **SA-2: TECHNOLOGY & INFRASTRUCTURE (LMS, GPT, Analytics)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Custom GPT generation, LMS (Webflow/Notion), CRM integration, analytics dashboard | Tech team, external vendors (OpenAI) | **+5-10%** | Platform uptime, custom GPT quality, analytics |
| **Key Leverage Point** | Custom GPT = tool client autonomy + coach efficiency + differentiation | Tech | **SECONDARY** | Custom GPT adoption rate |
| **Cost** | ~$30k-50k/year (tech team + APIs) | — | — | — |
| **Crítico porque** | Enables coach scaling (tools vs. time); customization = competitive moat | — | **MEDIUM** | — |

---

#### **SA-3: OPERATIONS & FINANCE (Contracts, Billing, Admin)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Contract management, invoicing, compliance, calendar management, CRM ops | Operations, Finance | — | Payment on-time %, contract SLA, cycle time |
| **Key Leverage Point** | Removes friction for coaches + clients; enables scaling | Operations | **MEDIUM** | Cash flow, operational SLA |
| **Cost** | ~$20k-30k/year (Operations team + tools) | — | — | — |
| **Crítico porque** | Frees coach time for high-value activities; billing integrity | — | **MEDIUM** | — |

---

#### **SA-4: STRATEGIC PLANNING & LEADERSHIP (Vision, Decisions, Optimization)**

| Aspecto | Descripción | Recursos | Margen | KPIs |
|---------|-------------|----------|--------|------|
| **Qué hace** | Vision, OKRs, decision-making (pricing, segmentation, hiring), process improvement | Leadership | — | Strategy execution, team alignment, innovation |
| **Key Leverage Point** | Constraint management (DBR), capacity planning, segment optimization | Leadership | **CRITICAL** | — |
| **Cost** | Embedded in founder/CEO time | — | — | — |
| **Crítico porque** | Determines where resources flow; F3 constraint identification + roadmapping | — | **CRITICAL** | — |

---

### 3.3 Análisis de Margen: ¿Dónde se crea y consume?

**Asunción de Base**:
- **Precio promedio cliente**: $300k-500k COP/año (mix B2C/B2B)
- **Duración promedio**: 20 semanas (F0-F5 = 6 meses, luego F4 ongoing)

**Descomposición de Margen**:

| Fase/Actividad | Costo | % Revenue | Margen Contribución | Notas |
|---|---|---|---|---|
| **F0-F1 Intake** | $5k (CAC + Sales + Coach time) | 8-10% | ~$25-50k | High upfront; amortized |
| **F2-F3 Delivery** | $40-80k (coach 100% FTE × 10 clients) | 60-70% | ~$180-350k | **Primary value zone** |
| **F4-F5 Post-sale** | $5k (Client Success + Content) | 10-15% | ~$30-75k | Retention + word-of-mouth |
| **Tech + Infrastructure** | $10k (GPT, LMS, APIs) | 5% | ~$15-25k | Custom GPT ROI high |
| **Operations + Admin** | $5k (billing, contracts, calendar) | 5% | ~$15-25k | Enablement; low-value-add |
| **Leadership + Overhead** | $10k (strategy, planning, optimization) | 8% | ~$24-40k | Constraint mgmt critical |
| **TOTAL COST** | ~$75k per 10 clients | ~100% | **$290-565k** | Margin 50-60% if priced well |

**Implicación**: F3 is where 60-70% of margin is created. Optimizing F3 is 10x more important than optimizing F0-F1.

---

### 3.4 Cadena de Valor: Ventaja Competitiva de MetodologIA

| Diferenciador | Ubicación | Magnitud | Defensibilidad |
|---|---|---|---|
| **Coach Quality + Autonomy Focus** | F2-F3 (Delivery) | **HIGH** | **HIGH** (skill-based; hard to copy) |
| **Custom GPT Tuning** | F2-F3 (Tech enablement) | **MEDIUM** | **MEDIUM** (technology moat) |
| **Baseline Report (F1)** | Inbound (Intake clarity) | **MEDIUM** | **LOW** (easily copied) |
| **Systematic Embajador Network (F5)** | Outbound (Advocacy) | **MEDIUM** | **HIGH** (brand + referral moat) |
| **AI Governance Thought Leadership** | Marketing | **MEDIUM** | **LOW** (content easily replicated) |

**Conclusión**: Primary competitive advantage = **Coach Quality + Autonomy Mindset**. Secondary = Custom GPT + Embajador network. Focus is correct.

---

## 4. CADENA DE SUMINISTRO (SUPPLY CHAIN MAPPING — SCOR Model)

**Referencia**: SCOR Model (Supply Chain Operations Reference) v12, adapted for service delivery

### 4.1 Mapa de Proveedores Upstream (Tier 1 + Tier 2)

#### **Tier 1 Proveedores Críticos**

| Proveedor | Servicio | Dependencia | Riesgo | Mitigation |
|---|---|---|---|---|
| **OpenAI (GPT API)** | Custom GPT generation, completion API | **CRITICAL** | API downtime, cost increase, model deprecation | (1) Fallback to o1-mini; (2) cost monitoring monthly |
| **Google Workspace + Sheets** | Email, calendar, collaboration | **HIGH** | Service outage; data loss | Built-in redundancy; SOC2 compliance |
| **Stripe** | Payment processing | **HIGH** | Fraud, downtime, chargeback | PCI compliance; fraud monitoring |
| **Notion/Webflow (LMS)** | Learning platform, templates, CRM | **HIGH** | Downtime, UI changes, pricing | Backup exports monthly; vendor diversity considered |
| **Slack** | Async communication, customer support | **MEDIUM** | Downtime, notification fatigue | Fallback email + scheduled meetings |
| **Calendly/Google Calendar** | Scheduling, meeting mgmt | **MEDIUM** | Bugs, sync issues | Dual integration; manual override capability |

#### **Tier 2 Proveedores Secundarios**

| Proveedor | Servicio | Dependencia | Riesgo |
|---|---|---|---|
| **AWS (hosting, backup)** | Infrastructure, data backup | MEDIUM | Cost, region latency |
| **Loom (video recording)** | Case study production, async updates | LOW | Can use OBS Studio if needed |
| **Zapier (automation)** | Workflow automation (CRM → email, forms → tracking) | LOW | Zaps breaking, learning curve |
| **LinkedIn** | Thought leadership, lead source | MEDIUM | Algorithm changes, shadow banning |

---

### 4.2 Core Operations (Operaciones Internas)

#### **PLAN (Demand Forecasting + Capacity Planning)**

| Actividad | Owner | Cadencia | KPI | Input |
|---|---|---|---|---|
| **Demand Forecast** | Sales + Leadership | Monthly | Pipeline $ vs. capacity | CRM pipeline, historical conversion |
| **Capacity Plan (Coaches)** | Leadership | Quarterly | FTE needed vs. budget | Client pipeline; churn forecast; F3 constraint |
| **Resource Allocation** | Leadership + Ops | Monthly | WIP limits per phase; intake gates | Demand vs. supply; quality metrics |
| **Inventory (WIP) Mgmt** | Operations | Weekly | Queues F0-F2; F3 load | Service Blueprint handoff; SLA |

**Target State**: Intake = F3 throughput (rope tied to drum). Today: intake often > capacity → pile-up in F1-F2.

---

#### **PRODUCE (Service Delivery)**

| Stage | Owner | Process | Duration | Quality Gate |
|---|---|---|---|---|
| **F0-F1 Production** | Sales + Coach | Lead capture → Diagnosis delivery | 1-4 weeks | Baseline Report quality; NPS ≥ 6 |
| **F2 Production** | Coach + Tech | Roadmap co-design + tool setup | 1-3 weeks | ODS signed; dashboard live |
| **F3 Production** | Coach (PRIMARY) | Weekly 1:1s + feedback loop + adaptation | 4-20 weeks | MOT-3 hit; NPS ≥ 8; autonomy ≥ 70% |
| **F4-F5 Production** | Client Success | Autonomy kit + check-ins + embajador activation | 6+ weeks | Autonomy sustained; case study approved |

**Key Constraint**: F3 production = 10 clients per coach max; 3 coaches = 30 concurrent clients max.

---

#### **DELIVER (Shipment to Customer)**

| Activity | Mechanism | Owner | SLA |
|---|---|---|---|
| **Asset Delivery** | Cloud files (Notion, Drive, custom GPT) | Tech + Coach | Day 1 of phase (F2) |
| **Communication** | Email + Slack async + scheduled 1:1s | Coach + Client Success | Async: 24h response; sync: scheduled weekly |
| **Feedback Loop** | Session recordings, progress dashboard, weekly check-ins | Coach + Tech | Real-time (embedded in coaching) |
| **Support** | Obstacle resolution, prompt tuning, platform fixes | Coach + Tech | 48h max for non-critical |

---

### 4.3 Downstream (Distribución, Segmentos, Canales)

#### **Canales de Distribución**

| Canal | Segmento | Mechanism | Volume | Revenue Share |
|---|---|---|---|---|
| **Direct Sales (1:1 discovery call)** | E2-E3 (B2B), P3 (exec) | Sales-led; high touch | ~40-50% | ~45-50% |
| **Self-Serve (Webinar → Lead Magnet)** | P1-P2 (B2C), P4 | Content-led; low touch | ~30-40% | ~30-35% |
| **Referral / Embajador Network** | All | Previous clients + embajadores | ~15-25% | ~20-30% (higher margin) |
| **Partnerships (future)** | E1-E3 | Co-deliver with partners | <5% (not yet active) | TBD |

#### **Segmentación de Clientes (Downstream Personalization)**

| Segmento | Profile | Entry Point | Typical Price | Cadence | Volume |
|---|---|---|---|---|---|
| **P1** Profesional en Transición | 25-40 yrs, mid-level, carrera shift | Referral + LinkedIn | $300k-800k | 12-16 sem | 10-15/yr |
| **P2** Estudiante Univ. | 18-25 yrs, career exploration | Beca + webinar | $0-200k | 8-12 sem | 5-10/yr |
| **P3** Ejecutivo / C-Level | 40-60 yrs, high-stakes decisions | Direct sales + referral | $800k-2.4M | 16-20 sem | 5-10/yr |
| **P4** Autodidacta | 30-50 yrs, learning for hobby | Self-serve + community | $0-800k | 8-16 sem | 10-20/yr |
| **E1** Small Biz (1-20 emp) | Owner/manager-driven | Sales or referral | $200k-800k | 12-16 sem | 3-5/yr |
| **E2** Mid-Market (21-200 emp) | Formal procurement | Sales-led | $2M-8M | 16-20 sem | 2-3/yr |
| **E3** Corporate (200+ emp) | Multi-stakeholder | Strategic sales | $10M-50M+ | 20+ sem | 1-2/yr |

**Total Addressable Market (TAM)**: ~30-50 clients/year if F3 capacity optimized to 150/yr. Today: ~40-50 (below potential).

---

### 4.4 Métricas de Supply Chain (Actual vs. Target)

| Métrica | Definición | Actual 2026-Q1 | Target 2026-Q4 | Gap |
|---|---|---|---|---|
| **Forecast Accuracy** | Pipeline $ vs. actual signed | ~70% (±20%) | 85% (±15%) | -15pp |
| **Perfect Order Rate** | Handoffs completed on time, no rework | ~75% | 95% | -20pp |
| **Cycle Time Reduction** | Average LT (today: 24 weeks) → (target: 16) | 24 weeks | 16 weeks | -33% |
| **WIP Turns** | Revenue ÷ WIP inventory | 1.5x/yr | 3x/yr (higher turnover) | -50% |
| **Supplier Quality (Vendor DPMO)** | OpenAI API uptime, payment processing errors | 99.9% (1 outage/yr) | 99.95% | -0.05pp |
| **Fill Rate (Availability)** | % of demand served (vs. lost to capacity) | 80% (20 clients turned away) | 100% (150/yr) | -20pp |

---

### 4.5 Matriz de Riesgo: Upstream, Core, Downstream

#### **Upstream (Supplier) Risks**

| Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|
| **OpenAI API degradation / cost spike** | 3/5 (model changes frequent) | 4/5 (core to custom GPT) | **HIGH** | (1) Monitor costs weekly; (2) fallback to o1-mini; (3) explore LLaMA local models |
| **Google Workspace outage** | 1/5 (Google has 99.99% SLA) | 3/5 (comms broken 24h) | MEDIUM | Fallback email + Slack; offline calendar copies |
| **Stripe payment decline** | 2/5 (fraud/chargeback spike risk) | 3/5 (revenue delayed) | MEDIUM | PCI + fraud monitoring; customer communication SOP |
| **Notion / LMS downtime** | 2/5 (Notion ~99.9% uptime) | 3/5 (clients can't access) | MEDIUM | Weekly exports to Drive; migration plan to Webflow |

---

#### **Core Operations Risks**

| Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|
| **Coach burnout / churn** | 4/5 (high-touch, 10 clients max) | 5/5 (immediate service gap) | **CRITICAL** | (1) Max 10 clients/coach enforced; (2) Hire coach #4 by Q3; (3) well-being check-ins monthly |
| **F3 bottleneck worsens (30+ clients queue)** | 3/5 (demand growing) | 4/5 (LT → 52+ weeks; churn risk) | **HIGH** | (1) F3 capacity expansion roadmap; (2) group bootcamp alternative; (3) intake gate at F2 exit |
| **Quality drift (NPS F3 < 7)** | 2/5 (selection criteria tight) | 4/5 (brand + retention hit) | **HIGH** | (1) Weekly QA spot-checks; (2) NPS tracking; (3) retraining if drift observed |

---

#### **Downstream (Customer) Risks**

| Risk | Probability | Impact | Severity | Mitigation |
|---|---|---|---|---|
| **Demand cliff (sales pipeline dries up)** | 2/5 (content + referral stable) | 4/5 (revenue drops 40%+) | **HIGH** | (1) Diversify channels; (2) thought leadership; (3) embajador network |
| **Client churn post-F3 (autonomy doesn't stick)** | 3/5 (sustainable behavior hard) | 3/5 (lifetime value ↓; referrals drop) | MEDIUM | (1) MOT-4 quality gate; (2) check-in protocol F4-F5; (3) perpetual access model |
| **Segment saturation (market size limits)** | 2/5 (B2C limited in Colombia) | 3/5 (revenue cap ~$3-5M) | MEDIUM | (1) Expand to other LatAm; (2) B2B focus; (3) partner channel |

---

### 4.6 Plan de Optimización Supply Chain (6-12 meses)

#### **Priority 1: Expand F3 Capacity (CRITICAL)**

| Initiative | Timeline | Owner | Investment | Expected ROI |
|---|---|---|---|---|
| Hire Coach #4 (on-ramp + training) | Q2 2026 | Leadership + HR | $80k (salary + training) | +$200k-300k revenue; reduce constraint stress |
| Evaluate group bootcamp model (F3 variant) | Q2-Q3 2026 | Leadership + Coach | $20k (design + pilot) | Potential 2x throughput if 80%+ quality maintained |
| Custom GPT automation (reduce coach setup time) | Q2 2026 | Tech | $10k (dev) | -5h/client onboarding; time reinvested in quality |

**Success Metric**: F3 throughput → 40+ clients/yr (vs. current ~30); LT → 18-20 weeks (vs. current 24)

---

#### **Priority 2: Reduce Cycle Time F0-F2 (MEDIUM)**

| Initiative | Timeline | Owner | Investment | Expected ROI |
|---|---|---|---|---|
| Automate lead scoring + BANT qualification (Zapier) | Q2 2026 | Operations + Tech | $3k (Zapier + integration) | -2 days diagnosis SLA; improve lead-to-diagnosis conversion |
| Template library + diagnosis checklist (SOP) | Q2 2026 | Coach + Content | $5k (time) | -1 day diagnosis delivery; consistency across coaches |
| Intake gate (max WIP F1-F2 = 5) | Immediately | Operations | $0 | Reduced wait time; better quality |

**Success Metric**: LT F0-F2 → 4-6 weeks (vs. current 5-8); reduce queue-up at F2→F3

---

#### **Priority 3: Improve Perfect Order Rate + Quality (HIGH)**

| Initiative | Timeline | Owner | Investment | Expected ROI |
|---|---|---|---|---|
| Weekly quality checklist (NPS, autonomy, KPI motion) | Immediately | Coach + Client Success | $0 | Early detection of issues; rework reduction -20% |
| Handoff protocol audit (SOP-discovery, SOP-delivery) | Q1-Q2 2026 | Operations + Coach | $3k (time) | Reduce escalations; improve SLA adherence |
| Baseline Report quality gate (must have ≥3 opp. quantified) | Immediately | Coach | $0 | Reduce F1→F2 rework; improve F2 clarity |

**Success Metric**: Perfect Order Rate → 90%+ (vs. current 75%); rework reduction -30%

---

#### **Priority 4: Vendor Risk Mitigation (MEDIUM)**

| Initiative | Timeline | Owner | Investment | Expected ROI |
|---|---|---|---|---|
| Cost monitoring OpenAI API (weekly dashboard) | Immediately | Tech | $0 (add to Zapier) | Cost control; early warning of price changes |
| LMS backup automation (Notion → Drive exports daily) | Q2 2026 | Tech | $2k (Zapier automation) | Disaster recovery; compliance |
| Stripe redundancy review (backup payment processor?) | Q3 2026 | Operations + Finance | $5k | Payment resilience; reduced chargebacks |

**Success Metric**: Supplier DPMO → 99.95%; zero unplanned outages; cost within ±5% forecast

---

## 5. SÍNTESIS: IMPLICACIONES ESTRATÉGICAS

### 5.1 El Constraint es F3 — Focus Aquí

**Dato Crítico**: 3 coaches × 10 clients/coach = 30 concurrent = ~120-150 clients/year max throughput.

**Si quieres 2x revenue (300-400 clients/year)**:
1. Hire 3+ más coaches (total 6-7), OR
2. Redesign F3 to group bootcamp (higher risk re: quality), OR
3. Accept revenue cap of ~$3-5M and optimize margins instead

**Recomendación**: Mix of (1) + partial (2). Hire Coach #4 by Q3 2026. Pilot group bootcamp Q3-Q4.

---

### 5.2 Valor se crea en F2-F3, no en F0-F1

**Insight**: 60-70% of margin is in delivery (F2-F3); only 10-15% in intake (F0-F1).

**Implicación**: Overinvesting in lead generation, content, or sales optimization is waste if F3 is constrained. **Rope the intake to the drum (F3 capacity).**

**Action**: Cap intake rate at F3 throughput. Today: ~30 clients/year → intake should be ~30/year. If sales tries to close 60, reject politely or queue.

---

### 5.3 Competitive Advantage = Coach Quality (Hard to Copy)

**Diferentiator Ranking**:
1. **Coach expertise + autonomy mindset** — Hardest to copy; training = 6-12 months
2. Custom GPT + tool stack — Medium difficulty; technology moat = 1-2 years
3. Embajador network — Medium difficulty; brand moat = 2+ years
4. Baseline report + thought leadership — Easy to copy; <6 months

**Focus hiring and training on (1). This is the moat.**

---

### 5.4 Waste Elimination Opportunities (Low-Hanging Fruit)

| Waste | Estimated Impact | Timeline | Owner |
|---|---|---|---|
| Reduce wait time F1→F2 (currently 3-7 days) | -2 days LT; +10% satisfaction | Immediately | Operations |
| Baseline report template + checklist | -1 day delivery; +quality consistency | Q2 | Coach + Content |
| Auto-scaling intake gate (max WIP per phase) | Smoother flow; -queue stress | Immediately | Operations |
| Weekly QA spot-checks (NPS, autonomy, KPI motion) | Early issue detection; -rework | Immediately | Coach + Client Success |

**Total Potential Impact**: -4-5 days LT; -20% rework; +5-10% NPS. No cost if well-executed.

---

### 5.5 Supply Chain Resilience

**Tier 1 Risks** (Suppliers):
- **OpenAI API**: Monitor costs monthly; fallback plan ready. Cost spike = 3-5% margin hit max if managed.
- **Google + Stripe**: <99.99% SLA; acceptable risk. Backup comms protocol needed.

**Tier 2 Risks** (Core ops):
- **Coach churn**: CRITICAL. Max 10/coach rule + well-being checks + hire ahead of demand.
- **F3 bottleneck**: CRITICAL. If not solved by Q3, revenue capped; churn risk grows.

**Tier 3 Risks** (Customer):
- **Demand cliff**: Manageable if diversified channels. Embajador network = insurance.
- **Churn post-F3**: MOT-4 quality gate + F4 check-ins = mitigation.

**Overall**: Medium risk profile. No existential threats if supplier diversification + coach bench maintained.

---

## 6. CROSS-REFERENCES A DOCUMENTOS RELACIONADOS

**En la carpeta `experience-design/`**:

- **Service Blueprint v2.1** — SSOT para fases (F0-F5), MOTs, metricas
- **RACI Matrix v1.0** — Responsabilidades por actividad, SLAs, escalacion
- **Customer Journey General (J0)** — Experiencia cliente northstar
- **CJs B2C Personas (P1-P4)** — Segmentacion, personalizacion por persona
- **CJs B2B Empresas (E1-E3)** — Segmentacion, personalizacion por tamaño empresa
- **Handoff Protocol v2.1** — Procedimientos F0→F1→F2→F3→F4→F5
- **Decision Log v1.0** — Decisiones estrategicas: segmentacion, pricing, delivery model
- **Assumptions Register v1.0** — Supuestos criticos operativos

**Cross-check importante**: Métricas en este documento (LT, PT, VA%, constraint F3) deben ser SSOT y referenciadas en todos los documentos anteriores. Si hay discrepancia, este documento (value-chain-analysis.md) is canonical para:
- Constraint identification (F3 = 10 clients/coach max)
- Throughput limits (120-150 clients/year)
- Margen decomposition (F2-F3 = 60-70% value)

---

## 7. CHANGELOG

| Versión | Fecha | Owner | Cambios |
|---------|-------|-------|---------|
| **v1.0** | 2026-03-25 | Javier Montaño | Initial declaration: VSM (3 coaches, F3 constraint), Porter Value Chain (coach quality = primary differentiator), SCOR supply chain (OpenAI, Google, Stripe Tier 1), optimization roadmap (hire coach #4, group bootcamp pilot, automation) |

---

**Última actualización**: 2026-03-25 | **Owner**: Javier Montaño | **Próxima revisión**: 2026-06-25 (Q2 close) | **Responsable de sincronización**: Gobierno Operativo

