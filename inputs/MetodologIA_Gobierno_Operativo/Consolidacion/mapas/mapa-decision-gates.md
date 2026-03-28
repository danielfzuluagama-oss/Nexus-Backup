# MAPA DE DECISION GATES - Criterios de Avance

**Versión:** 1.0
**Generado:** 2026-03-24
**Propósito:** Criterios exhaustivos para cada gate de decisión en 3 vertientes
**Audience:** Deal Managers, Operations, Auditors, Decision Makers
**Alcance:** 18 gates totales (8 B2B, 6 B2C, 4 GTM)

---

## SÍNTESIS EJECUTIVA

Este documento define TODOS los gates de decisión que determinan el avance, pausa o eliminación de oportunidades en el ecosistema MetodologIA. Cada gate incluye:

1. **Criterios de paso:** Qué debe cumplirse
2. **Data requerida:** Qué información necesita el decision-maker
3. **Quién decide:** Rol responsable
4. **Posibles outcomes:** Verde (avanza) | Ambar (condicional) | Rojo (rechaza o rescata)
5. **Escalation path:** A quién escalar si es necesario
6. **Timing:** Cuándo se debe ejecutar este gate

**Objetivo:** Zero ambigüedad en decisiones comerciales. Todos deben saber exactamente cuándo pasar un opportunity al siguiente stage.

---

## GATES B2B: ENTERPRISE SALES (8 GATES)

### GATE G1: ICP Qualification
**Ubicación en Flujo:** Post Scouting / Pre Discovery
**Timing:** Días 5-10 post primer contacto
**Owner:** Account Executive + Sales Operations

#### Criterios de Paso (Verde)

**ICP Score > 70 (10 factores ponderados):**

| Factor | Peso | Criterio Verde | Peso mínimo |
|--------|------|-----------------|-----------|
| Company Size (Employees) | 15% | 50-10,000 employees (target: 100-5,000) | ≥11 |
| Annual Revenue | 15% | $10M-$500M (target: $50M-$200M) | ≥11 |
| Industry Fit | 15% | Vertical objetivo (tech, finance, retail, manufacturing) | ≥11 |
| Budget Availability | 15% | Evidence de presupuesto en el próximo 6 meses | ≥11 |
| Geographic Proximity | 10% | Dentro de zona servida (local o remote-friendly) | ≥7 |
| Tech Stack Compatibility | 10% | Compatible con nuestro stack (integraciones existentes) | ≥7 |
| Decision Timeline | 10% | Decisión esperada en 3-6 meses (NOT >12 months) | ≥7 |
| Pain Point Relevance | 5% | Al menos 1 pain crítico que resolvemos | ≥4 |
| Executive Sponsor ID | 3% | Champion identificado (mín. director level) | ≥2 |
| No Incumbent Threat | 2% | No en contrato exclusivo con competidor | ≥2 |

**Fórmula:** Score = SUM(Factor × Peso) / 100
- **Resultado:** Score >70 = VERDE (Advance to Discovery)

#### Criterios Ambar (Neutral - 50-70 Score)

- Missing budget confirmation but 50% likely
- Champion identified but not yet executive sponsor
- Pain point exists but lower priority (could escalate later)
- Timeline 6-12 months (borderline)
- Unknown tech stack compatibility (needs research)

**Acción:** Enrich data for 2-4 weeks, then re-score
- Additional research (LinkedIn, company news, Crunchbase)
- Stakeholder calls to confirm budget/timeline
- Re-assessment: If >70 → Discovery | If still 50-70 → Nurture | If <50 → Park

#### Criterios Rojo (Rechazo - Score < 50)

- Company too small (<50 employees) or too large (>20,000)
- Revenue <$10M or >$1B (outside our sweet spot)
- Industry not in target verticals
- No discernible budget in next 12 months
- Geographic barrier (can't serve effectively)
- Under exclusive contract with direct competitor
- Timeline >18 months out
- No executive sponsor possible (lack of hierarchy)

**Acción:** Nurture tag and revisit in 90 days
- Add to automated nurture sequence (quarterly touch)
- Flag for re-score when trigger event occurs (funding, IPO, M&A)
- Document reason for parking (for audit)

#### Data Requerida para Decisión

- [ ] Company financials (revenue, employee count, funding)
- [ ] Industry vertical confirmation
- [ ] Budget allocation (confirmed or estimated)
- [ ] Org chart (minimum: CEO, CFO/CRO, CTech)
- [ ] Tech stack details (platforms, databases, APIs)
- [ ] Current pain points (from conversation or research)
- [ ] Timeline from stakeholder communication
- [ ] Incumbent competitors (if any)
- [ ] Geographic location
- [ ] Growth trajectory (hiring, expansion plans)

#### Quién Decide

**Primary:** Account Executive (with Sales Manager input)
**Secondary:** Sales Operations (validates scoring)
**Escalation:** Sales Director (if ambiguous or high-touch)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE (>70) | Advance to Discovery | Immediately | AE |
| AMBAR (50-70) | Enrich data / Re-score | 2-4 weeks | AE + Sales Ops |
| ROJO (<50) | Nurture queue / Re-visit | 90 days | Marketing + Sales |

#### Escalation Path (Si Ambigüedad)

1. **Primer escalón:** Sales Manager reviews scoring, asks AE for justification
2. **Segundo escalón:** Sales Director decides if exception warranted
3. **Tercer escalón:** VP Sales (for high-value edge cases or strategic accounts)

**Criteria para escalación:** Potential ACV >$1M, strategic customer, unique situation

---

### GATE G2: Green Light (Tech + Political Validation)
**Ubicación en Flujo:** Post Discovery / Pre Proposal
**Timing:** Día 30-45 post primer contact (end of Discovery phase)
**Owner:** Sales Manager + Delivery Lead

#### Criterios de Paso (Verde)

**Both technical AND political validation required:**

**Technical Green Light (All must be YES):**
- [ ] CTO/VP Eng can implement (no blockers identified)
- [ ] Integration with current stack is feasible
- [ ] Data migration path exists (if applicable)
- [ ] Security/compliance requirements understood and achievable
- [ ] Performance requirements can be met
- [ ] Implementation timeline realistic (AE + Delivery agree)

**Political Green Light (Minimum 70% alignment):**
- [ ] Executive sponsor identified (C-level or board-reporting)
- [ ] Sponsor understands ROI and is champion for deal
- [ ] At least 2 additional stakeholders (CFO, operations, users) aligned
- [ ] No known political blockers (competing priorities, budget conflicts)
- [ ] Clear procurement/approval process mapped
- [ ] Budget owner committed to funding

**Combined Green Light Score:**
- Tech score (weighted): 50%
- Political score (weighted): 50%
- **Final:** (Tech Score × 0.5) + (Political Score × 0.5) = Final Score
- **Threshold:** ≥70 for VERDE

#### Criterios Ambar (Conditional)

- Technical feasible but with 1-2 risks (mitigable)
- Political alignment 60-70% (some resistance but manageable)
- Timeline tight but possible (requires heroic effort)
- Sponsor championing but without full C-suite support yet

**Acción:** Remediation plan required
- Address specific technical risks with engineering input
- Political coaching: Help sponsor build broader coalition
- Clear timeline: 2-week remediation before re-scoring

#### Criterios Rojo (Rejection)

- Technical blockers: Cannot integrate, security fails, timeline impossible
- Political blockers: No sponsor, budget denied, competing initiative wins
- Misalignment: Customer priorities changed, use case no longer relevant
- Internal conflict: Delivery says "unviable", Engineering says "risky"

**Acción:** Kill deal or attempt rescue
- Explicit conversation with sponsor: "What needs to change?"
- Engineering deep-dive: Can we solve the technical issue?
- If no path forward → Document and move on

#### Data Requerida para Decisión

**Technical:**
- [ ] Architecture review completed by CTO
- [ ] Integration assessment (API compatibility, data sync)
- [ ] Security audit (encryption, compliance, access control)
- [ ] Performance testing (scalability, latency, uptime)
- [ ] Implementation plan (phases, timeline, resources)
- [ ] Risk register (what could go wrong?)

**Political:**
- [ ] Executive sponsor identified (name, title, verified)
- [ ] Org chart with stakeholder map
- [ ] Internal alignment assessment (CFO, ops, IT, users)
- [ ] Budget confirmation (amount, source, approval authority)
- [ ] Competitive threats (other vendors being considered?)
- [ ] Timeline validation (when do they need to decide?)

#### Quién Decide

**Primary:** Sales Manager (with CTO/Delivery Lead input)
**Secondary:** Customer Success Manager (feasibility validation)
**Escalation:** VP Sales + VP Operations (if conflict or high stakes)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Advance to Proposal | Immediately | Sales Manager |
| AMBAR | Remediation plan | 2 weeks max | AE + Delivery |
| ROJO | Kill / Rescue attempt | Decision within 1 week | Sales Manager + VP |

#### Escalation Path (Si Conflicto)

1. **Tech vs. Sales conflict:** CTO + VP Operations + VP Sales align
2. **Political risk unclear:** Sales Manager speaks with sponsor directly
3. **Budget not confirmed:** CFO/Sponsor conversation (not Sales' job to force)
4. **Timeline impossible:** Renegotiate or kill

---

### GATE G3: Profitability Sign-Off (COO/Finance Validation)
**Ubicación en Flujo:** Pre Proposal Submit (internal gate)
**Timing:** Día 35-45 (parallel to proposal creation)
**Owner:** Sales Manager + COO/Finance

#### Criterios de Paso (Verde)

**Profitability Metrics (All must pass):**

```
Gross Margin % = (Revenue - COGS) / Revenue

Target by deal size:
- <$50K ACV:   Target GM ≥75%
- $50K-$250K:  Target GM ≥70%
- $250K-$500K: Target GM ≥65%
- >$500K:      Target GM ≥60%

Formula:
COGS = (Implementation × Cost/hr) + (First year support × Cost/hr) + (Infra)
```

**Example:**
- ACV: $150K
- Implementation cost: $20K (5 weeks × 2 engineers)
- First-year support: $15K (reactive support)
- Infrastructure: $5K
- Total COGS: $40K
- Gross Margin: ($150K - $40K) / $150K = 73% ✓ PASSES (target 70%)

**Additional Profitability Checks:**

- [ ] Discount % within authorized bands (AE authority or pre-approved)
- [ ] Payment terms don't exceed 90 days (cash flow risk)
- [ ] Professional services margin >40% (if services bundled)
- [ ] Contract value >LTV of acquisition cost (payback <18 months)
- [ ] No abnormal concessions (free services, extended trial, etc.)

#### Criterios Ambar (Conditional)

- GM at lower end of range (60-65%) but strategic account
- Requires discount within pre-approved bands
- Payment terms 91-120 days (acceptable with CFO sign-off)
- Services margin 35-40% (acceptable if core product healthy)

**Acción:** COO/CFO conditional approval with conditions
- Must be explicitly documented as "conditional approval"
- Condition: "GM must improve to >65% by year 2 OR we reduce scope"
- AE must commit to upsell/expansion target

#### Criterios Rojo (Rejection)

- GM <55% (unprofitable)
- ACV < customer acquisition cost × 2 (payback >24 months)
- Discount exceeds authorized authority without CEO approval
- Customer is known for non-payment or disputes
- Payment terms >180 days (unacceptable cash flow impact)

**Acción:** Renegotiate or kill
- Sales Manager negotiates with customer for better terms
- If customer won't budge → Present as ROJO to VP Sales
- Decision: Proceed anyway (with CEO sign-off) or walk away

#### Data Requerida para Decisión

- [ ] Proposed ACV (base + optional add-ons)
- [ ] Discount % (if any)
- [ ] Implementation plan (hours, resources, cost estimate)
- [ ] Year-1 support plan (reactive, proactive, 24/7?)
- [ ] Infrastructure costs (cloud, hosting, third-party services)
- [ ] Payment terms (monthly, quarterly, annual, deferred)
- [ ] Professional services breakdown (if bundled)
- [ ] Customer's default risk (payment history check)
- [ ] Upside potential (expansion, upsell in year 2+)

#### Quién Decide

**Primary:** COO or Finance Manager
**Secondary:** Sales Manager (provides business context)
**Escalation:** CFO (if policy exception needed) or CEO (if strategic override)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Approve proposal | Immediately | COO |
| AMBAR | Conditional approval | Pending conditions | COO + Sales Manager |
| ROJO | Renegotiate or kill | Within 5 days | Sales Manager + VP Sales |

---

### GATE G4: Market Ready QA (Proposal Delivery Approval)
**Ubicación en Flujo:** Pre Proposal Submit (final check)
**Timing:** Día 40-45 (24 hours before send)
**Owner:** Sales Ops + Legal/Compliance

#### Criterios de Paso (Verde)

**Proposal Quality Checklist (All must be YES):**

- [ ] **Spelling & grammar:** Zero typos (run spell check, human review)
- [ ] **Pricing accuracy:** All numbers match CRM + Finance approval
- [ ] **Dates consistent:** Signature date, start date, renewal date all aligned
- [ ] **Legal language:** Standard terms or customer-agreed modifications
- [ ] **Compliance:** SOC2, GDPR, data handling clauses all present
- [ ] **Covers all scope:** Everything discussed in discovery is in proposal
- [ ] **ROI validated:** Business case numbers realistic and documented
- [ ] **SLAs clear:** Uptime, support response times, escalation process defined
- [ ] **Payment terms exact:** Match agreement (not ambiguous)
- [ ] **Signature authority:** Authorized signers for both MetodologIA and customer
- [ ] **Track changes off:** No red-line edits visible in final version
- [ ] **Branding correct:** Logo, colors, document format match brand standards
- [ ] **Contact info accurate:** All email/phone numbers verified

**Scoring:** All 13 items must be YES for VERDE

#### Criterios Ambar (Minor Issues)

- 1-2 minor formatting issues (easily fixable)
- Spell-check missed something but content is clear
- SLA language acceptable but not optimal
- Signature page authority needs verification (not yet confirmed)

**Acción:** Fix and re-review within 24 hours
- Create corrected version
- Send to customer with "minor updates" note
- Re-check before final send

#### Criterios Rojo (Blocking Issues)

- Wrong pricing numbers (customer will reject)
- Legal clause missing (compliance risk)
- Scope doesn't match discovery (will cause disputes)
- Signature authority missing (cannot execute)
- Red-line edits visible (unprofessional)
- SLAs conflict with internal capability
- Customer's legal team hasn't reviewed (risky to send)

**Acción:** Fix before sending, no exceptions
- Coordinate with legal/finance to resolve
- Re-review with customer if substantive changes
- Delay send by 48h if necessary to get right

#### Data Requerida para Decisión

- [ ] Signed proposal draft (ready to send)
- [ ] Finance pricing sign-off (email confirmation)
- [ ] Legal review (compliance checklist)
- [ ] Customer signature authority (confirmed)
- [ ] Scope document (linked or attached)
- [ ] SOW/Implementation plan (if separate document)
- [ ] SLA definitions (uptime, response time, availability)
- [ ] Spell-check report (clean)
- [ ] Branding verification (logo, colors, format)

#### Quién Decide

**Primary:** Sales Operations Manager
**Secondary:** Legal/Compliance (if needed)
**Escalation:** Sales Director (for exceptions or customer special requests)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Send proposal to customer | Same day | AE |
| AMBAR | Fix issues + re-review | 24 hours | Sales Ops + AE |
| ROJO | Do not send until fixed | 48 hours | Sales Ops + Legal |

---

### GATE G5: Deal Health (Post Signature Check-in)
**Ubicación en Flujo:** Post Signature / Pre Activation
**Timing:** Within 48 hours of signature (red flag for risk)
**Owner:** AE + Customer Success Manager

#### Criterios de Paso (Verde - Healthy Deal)

**Green Light Checklist (All should be YES):**

- [ ] **Sponsor engaged:** Executive sponsor returns calls/emails promptly
- [ ] **Timeline clear:** Kickoff date confirmed, resources allocated on customer side
- [ ] **Budget confirmed:** Payment processed or scheduled per terms
- [ ] **Implementation team assigned:** Named contacts on customer side identified
- [ ] **No surprises:** Customer has no new concerns or blockers
- [ ] **Excitement level:** Customer expressing enthusiasm (not regret)
- [ ] **Legal satisfied:** No post-signature legal questions or reinterpretations

**Scoring:** 6+ items YES = VERDE

#### Criterios Ambar (At Risk - Requires Active Management)

- Sponsor still engaged but slower communication
- Timeline slipping (kickoff delayed by 2-3 weeks)
- Budget processing delayed but committed
- Implementation team partially assigned
- Minor new concerns surfaced (should be addressable)
- Excitement level neutral (professional but not enthusiastic)
- No blockers yet but uncertainty on customer side

**Acción:** Yellow flag - Increase touch frequency
- Weekly check-ins with sponsor + implementation team
- Proactive risk mitigation (offer kick-off services, training, etc.)
- AE + CSM joint ownership of deal health
- Timeline: Move from Ambar to Verde within 2 weeks OR escalate to Red

#### Criterios Rojo (Dead/Dying Deal - Requires Rescue)

- Sponsor has disengaged (not responding to contacts)
- Timeline slipping significantly (kickoff pushed 4+ weeks)
- Budget approval stalled or denied
- Implementation team not being assembled
- Serious new concerns (technical feasibility, political support)
- Customer expressing regret or "buyer's remorse"
- Legal reinterpretation threatening deal economics

**Acción:** Escalate and attempt rescue
- Executive-to-executive call (AE's manager to customer's sponsor)
- Root cause analysis: What's the real issue?
- Rescue plan: What needs to happen to restore confidence?
- Timeline: 1-week rescue attempt, then make renewal decision

#### Data Requerida para Decisión

- [ ] Post-signature survey of customer (brief call)
- [ ] Finance confirmation: Payment received or scheduled
- [ ] Implementation plan shared and acknowledged
- [ ] Sponsor availability (confirmed meeting with AE)
- [ ] No new escalations or legal questions
- [ ] Customer feedback on proposal experience
- [ ] Kickoff meeting scheduled or at least proposed
- [ ] MetodologIA delivery resources allocated

#### Quién Decide

**Primary:** Account Executive
**Secondary:** Customer Success Manager (health assessment)
**Escalation:** AE's Manager (if Ambar or Red)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Proceed to Activation | Immediately | CSM |
| AMBAR | Intensive management | 2 weeks | AE + CSM |
| ROJO | Rescue attempt or escalate | 1 week | Manager + AE |

---

### GATE G6: Activation Success (72-Hour Checkpoint)
**Ubicación en Flujo:** Post Activation / Pre Customer Success Mode
**Timing:** Day 3 post-kickoff
**Owner:** Customer Success Manager

#### Criterios de Paso (Verde)

**Quick Win Achieved + Team Setup:**

- [ ] **Quick win completed:** First small success delivered (baseline metric, user trained, feature working)
- [ ] **CSM assigned:** Named customer success manager introduced
- [ ] **Users trained:** Power users have received initial training (virtual or in-person)
- [ ] **Support access:** Customer knows how to access support (Slack, portal, phone)
- [ ] **Dashboard set up:** Initial dashboard/analytics visible (shows early signals)
- [ ] **Communication cadence:** First weekly check-in scheduled
- [ ] **Enthusiasm sustained:** Customer feedback is positive on quick win

**Scoring:** 6+ items YES = VERDE

#### Criterios Ambar (Partial Progress)

- Quick win in progress but not yet complete (2-3 days behind)
- CSM assigned but not yet had customer conversation
- Users trained on 1 of 3 expected modules
- Support access set up but not yet tested
- Dashboard partial (needs 1-2 more data sources)
- Communication cadence proposed but not yet scheduled
- Customer feedback neutral (no complaints, but not excited)

**Acción:** Acceleration plan
- Identify blocker: What's slowing quick win?
- Intensify support (add additional engineer/resource)
- Daily check-ins with customer until back on track
- Timeline: Return to Green within 48 hours OR escalate

#### Criterios Rojo (Blocked or Negative)

- Quick win impossible (technical blocker, scope mismatch)
- CSM not available or customer refusing specific CSM
- Users unwilling to train (adoption risk)
- Support access not working (technical issue)
- Dashboard data unavailable (integration failure)
- Customer expressing regret or frustration
- Timeline slipping significantly (activation >7 days)

**Acción:** Escalate to Rescue Protocol
- Engineering jump in if technical blocker
- AE + CSM + Delivery lead joint call with customer
- Root cause: Is this a product issue, expectation mismatch, or our delivery?
- Options: Fix quickly, adjust scope, or escalate for executive decision

#### Data Requerida para Decisión

- [ ] Quick win completion status (document results)
- [ ] User training feedback (attendees, questions asked)
- [ ] System access verification (can users log in?)
- [ ] Dashboard data validation (metrics populated?)
- [ ] Customer sentiment check (quick survey or call)
- [ ] Support ticket (if any issues) and resolution
- [ ] CSM onboarding plan (timeline for full handoff)

#### Quién Decide

**Primary:** Customer Success Manager
**Secondary:** Delivery Lead (if technical component)
**Escalation:** VP Customer Success (if Rojo or high-touch account)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Hand off to CS normal cadence | Day 3+ | CSM |
| AMBAR | Acceleration plan | 48 hours | Delivery + CSM |
| ROJO | Rescue protocol | Within 5 days | VP CS + AE |

---

### GATE G7: Monthly Health Score Review
**Ubicación en Flujo:** Ongoing (Monthly)
**Timing:** 1st of each month (or recurring monthly)
**Owner:** Customer Success Manager

#### Criterios de Paso (Verde - Healthy Customer)

**Health Score Calculation (Weighted):**

```
Health Score = (Usage × 0.40) + (Business Metrics × 0.35) + (Engagement × 0.25)

Usage (0-100):
- Monthly active users: (Actual / Expected) × 50
- Feature adoption breadth: (# features used / # available) × 50
- Login frequency: (Avg logins/week) vs. benchmark
- Green if: ≥70

Business Metrics (0-100):
- Revenue impact vs. baseline: (Current value - Baseline) / Baseline × 50
- ROI on track: % of promised ROI materialized × 50
- Green if: ≥70 OR on clear path to achieve in next 3 months

Engagement (0-100):
- Support tickets (lower is better): Benchmark vs. expectations × 30
- NPS sentiment: Customer sentiment score × 40
- Quarterly business review: Happened? Positive feedback? × 30
- Green if: ≥70
```

**Final Health Score = Weighted average of above**
- **VERDE:** Score ≥75 (Healthy, growing, engaged)
- **AMBAR:** Score 50-74 (At risk, needs attention)
- **ROJO:** Score <50 (Critical risk, possible churn)

#### Criterios Ambar (At Risk - Intervention Required)

- Usage declining but not yet critical
- ROI delayed but achievable (timeline extended)
- Support volume high but responding to questions (not dysfunction)
- Engagement score low but customer willing to re-engage
- Sentiment: Neutral to slightly negative

**Acción:** Intervention plan
- Root cause analysis: Why is health declining?
- Collaborative problem-solving: What does customer need?
- New quick wins: Find small success to re-energize
- Escalation if champion changed or executive support wavering
- Timeline: 2-week intensive intervention, then re-score

#### Criterios Rojo (Critical Risk - Possible Churn)

- Usage near zero (not using product)
- ROI not materializing (no evidence of promised value)
- Multiple support issues unresolved (frustration building)
- Sentiment: Negative, considering alternatives
- NPS score <6 (detractor)
- No executive sponsor engagement in 4+ weeks
- Talking to competitors (known or suspected)

**Acción:** Rescue Protocol Activated
- Executive-to-executive call: "What needs to change?"
- Root cause analysis: Product issue, expectations mismatch, or wrong use case?
- Focused remediation: 30-day plan to improve
- Options: Pivot use case, enhance support, reduce scope, or exit gracefully

#### Data Requerida para Decisión

- [ ] Product usage metrics (logins, features used, session duration)
- [ ] Business metrics (revenue impact, ROI vs. baseline)
- [ ] Support interactions (volume, sentiment, resolution time)
- [ ] Customer feedback (NPS, surveys, call sentiment)
- [ ] Engagement indicators (QBR attendance, email opens, training participation)
- [ ] External signals (customer news, staff changes, org restructuring)
- [ ] Competitive signals (mentioned competitor, RFP process, trials elsewhere)

#### Quién Decide

**Primary:** Customer Success Manager
**Secondary:** AE (if high-touch or expansion opportunity)
**Escalation:** VP Customer Success (if Rojo) or AE Manager (if rescue attempt)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Continue CS normal cadence | Ongoing | CSM |
| AMBAR | Intervention plan | 2 weeks | CSM + AE |
| ROJO | Rescue protocol or escalate | 1 week | VP CS + AE |

---

### GATE G8: Renewal & Expansion Readiness (QBR Gate)
**Ubicación en Flujo:** 90 days pre-renewal
**Timing:** Quarter before renewal date (quarterly cadence)
**Owner:** Account Executive + Customer Success Manager

#### Criterios de Paso (Verde - Ready to Renew & Expand)

**Renewal Readiness Metrics:**

- [ ] **Health score:** Green for last 2+ months
- [ ] **NPS:** Score ≥7 (Passive or Promoter)
- [ ] **ROI achieved:** Customer saw promised value
- [ ] **Usage stable or growing:** Feature adoption maintained or increased
- [ ] **QBR positive:** Business review showed success and alignment
- [ ] **No budget issues:** Customer confirmed budget for renewal (in hand or approved)
- [ ] **Executive sponsor:** Still engaged and supportive
- [ ] **Expansion identified:** 2+ new use cases or teams for upsell

**Scoring:** 6+ items YES = VERDE for renewal

#### Expansion Opportunity (Add-on):

- Existing customer happy (Green health)
- NPS ≥8 (Promoter)
- New use case identified with expected ROI >100%
- Budget authority confirmed for expansion (additional $)
- Timeline: Can implement new use case in next quarter
- AE confidence: High likelihood of close

**Scoring:** 4+ items = Expansion opportunity exists

#### Criterios Ambar (Likely to Renew but Not Expand)

- Health score Ambar (improving but not fully green)
- NPS 6-7 (Passive, needs engagement to become Promoter)
- ROI achieved but not exceeded
- Usage stable but flat (not growing)
- QBR attended but feedback mixed (some positive, some concerns)
- Budget likely but not yet confirmed
- Expansion possible but customer not yet sold on need

**Acción:** Renewal-focused plan
- Executive re-engagement: Drive health to Green before renewal
- New quick wins: Find ways to exceed current ROI
- Expansion education: Plant seeds for future growth
- Timeline: Aim to move to Verde within 30 days

#### Criterios Rojo (At Risk for Non-Renewal)

- Health score Red
- NPS ≤5 (Detractor)
- ROI not met (customer considering exit)
- Usage declining (disengagement)
- QBR negative (unmet expectations)
- Budget denied or reallocated
- Executive sponsor left or disengaged
- Customer in active outreach with competitors

**Acción:** Renewal rescue protocol
- Emergency executive call: "What will it take to keep your business?"
- Root cause: Product, service, or expectation issue?
- Remediation offer: Free services, feature priority, pricing adjustment
- Timeline: Intense 2-week effort, then escalate to leadership if at risk

#### Data Requerida para Decisión

- [ ] Health score trend (last 3 months)
- [ ] NPS score and trend
- [ ] ROI calculation (promised vs. actual)
- [ ] Usage metrics (logins, features, data volume)
- [ ] QBR meeting notes and feedback
- [ ] Budget confirmation (email from CFO or budget owner)
- [ ] Customer executive feedback (retention confidence)
- [ ] Expansion use cases identified
- [ ] Competitive threat assessment
- [ ] Churn risk indicators (if any)

#### Quién Decide

**Primary:** Account Executive
**Secondary:** Customer Success Manager + AE Manager
**Escalation:** VP Sales (if at risk for non-renewal or large expansion)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Proceed with renewal + expansion | 60 days pre-renewal | AE |
| AMBAR | Renewal focus, expansion secondary | 45 days pre-renewal | AE + CSM |
| ROJO | Rescue attempt or prepare for exit | 90 days pre-renewal | VP Sales + AE |

---

## GATES B2C: DIRECT-TO-CONSUMER (6 GATES)

### GATE G1: Life Event Relevancia
**Ubicación en Flujo:** Post Detection
**Timing:** Within 24 hours of signal detection
**Owner:** Marketing Automation + Growth Lead

#### Criterios de Paso (Verde)

**Event Relevance Score (5 factors):**

```
Life Event Score = Sum(Factor points) / 5

| Factor | Yes (+20) | No (0) |
|--------|-----------|--------|
| Event type matches our targeting | Matrimonio, mudanza, cambio trabajo | No relevance |
| Timing within 14 days (recent) | Detectado <14 días atrás | >14 días o anticipo |
| Persona in target demographic | Age 25-65, has income | Outside range |
| Geographic location covered | Serves our area | Outside service area |
| Not already customer | New potential | Existing customer |

Score ≥16/20 (80%) = GREEN → Qualify lead
Score 10-15 = AMBAR → Monitor or light nurture
Score <10 = ROJO → Archive or very long-term nurture
```

#### Criterios de Decisión

**VERDE (≥80%):** Life event highly relevant
- Immediate action: Reach out with personalized message
- Tone: Empathetic to event (congratulations, condolences, etc.)
- Offer: Free consultation, discount, or relevant resource
- Timeline: Contact within 24-48 hours of event detection

**AMBAR (60-80%):** Possibly relevant
- Action: Add to nurture sequence (light touchpoints)
- Tone: Educational (not salesy)
- Offer: Free content (guide, webinar, assessment)
- Timeline: Quarterly touch-points, re-evaluate in 90 days

**ROJO (<60%):** Low relevance
- Action: Archive and monitor for future signals
- Re-engage: Only if customer shows additional signals

#### Data Requerida para Decisión

- [ ] Source of event detection (LinkedIn, Facebook, Crunchbase, etc.)
- [ ] Event date / timing
- [ ] Person name, email, phone (if available)
- [ ] Company (if B2B element)
- [ ] Demographic info (age, location, income bracket)
- [ ] Current customer status (confirm not existing)
- [ ] Relevance justification (why this event matters to them)

#### Quién Decide

**Primary:** Marketing Automation system (rules-based) or Growth Lead (manual review)
**Secondary:** Growth Manager (for edge cases or strategic accounts)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Outreach + Qualify | <48h | Growth Lead |
| AMBAR | Nurture sequence | 90 days | Marketing |
| ROJO | Archive | N/A | System |

---

### GATE G2: Lead Score Qualification
**Ubicación en Flujo:** Post Initial Contact
**Timing:** Within first week of contact
**Owner:** Growth Marketing Lead

#### Criterios de Paso (Verde)

**Lead Score Calculation (3 components, 100 points total):**

```
Lead Score = (Life Event Relevance × 0.40) + (Engagement × 0.30) + (Low Friction × 0.30)

Component 1: Life Event Relevance (40 points max)
- Event type exact match: +15 points
- Event within 7 days: +10 points
- Demographics match target: +10 points
- No competitive signals: +5 points
- Subtotal: 0-40 points

Component 2: Engagement (30 points max)
- Email opened: +5 points
- Clicked email link: +10 points
- Visited website: +7 points
- Downloaded resource: +8 points
- Subtotal: 0-30 points

Component 3: Low Friction (30 points max)
- No obvious objections: +15 points
- Email responsive: +10 points
- No competitive engagement: +5 points
- Subtotal: 0-30 points

FINAL SCORE = Sum of all components
VERDE: ≥60 points
AMBAR: 40-59 points
ROJO: <40 points
```

**Example:**
- Event relevance: 35 points (event exact match, 5 days old, target demographic)
- Engagement: 22 points (opened email, clicked, visited site)
- Low friction: 20 points (no objections stated, responsive)
- **Total: 77 points = VERDE**

#### Criterios de Decisión

**VERDE (≥60 points):** Qualified lead
- Action: Invite to webinar, offer consultation, or send nurture sequence
- Tone: Sales-oriented (introduce solution)
- Offer: Demo, free trial, webinar with limited spots
- Timeline: Immediate personalized outreach

**AMBAR (40-59 points):** Potentially qualified
- Action: Continue nurture with focused messaging
- Tone: Educational with sales elements
- Offer: Free resource, assessment, or guide
- Timeline: 2-4 week nurture sequence, then re-score

**ROJO (<40 points):** Not yet qualified
- Action: Add to long-term nurture (monthly)
- Tone: Purely educational
- Offer: Blog articles, podcasts, whitepapers (no sales)
- Timeline: Monitor for engagement improvement

#### Data Requerida para Decisión

- [ ] Email engagement data (opens, clicks, timestamps)
- [ ] Website activity (pages visited, duration, resources downloaded)
- [ ] Stated objections or concerns (from conversations)
- [ ] Competitive signals (mentions of alternatives)
- [ ] Explicit interest signals (webinar signup, demo request)
- [ ] Life event confirmation (double-check relevance)
- [ ] Lead source quality indicator

#### Quién Decide

**Primary:** Lead Scoring Algorithm (rules-based)
**Secondary:** Growth Lead (for manual review/override)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Sales outreach / Invite | <24h | Growth Lead |
| AMBAR | Nurture sequence | 21-28 days | Marketing |
| ROJO | Long-term nurture | 90-day cycles | Marketing |

---

### GATE G3: Emotional Anchor Mapped
**Ubicación en Flujo:** Post Initial Sales Conversation
**Timing:** Within first conversation (discovery call)
**Owner:** Sales / Growth Lead

#### Criterios de Paso (Verde)

**Emotional Anchor Framework (Must identify all 3 elements):**

```
Element 1: Core Emotion Identified
- What feeling drives the decision? (excitement, fear, relief, empowerment)
- Examples:
  • New parent: FEAR (protecting family) + EXCITEMENT (new chapter)
  • Changed jobs: ANXIETY (proving self) + AMBITION (growth)
  • Bought house: PRIDE (achievement) + ANXIETY (affordability)

Element 2: Desire/Problem Articulated
- What is the person ultimately seeking?
- Examples:
  • Safety/security
  • Status/achievement
  • Control/mastery
  • Freedom/independence
  • Connection/belonging

Element 3: Solution Vision Validated
- Does person envision how your solution helps their emotion?
- Can they articulate: "With your product, I would feel..."

VERDE Criteria: All 3 elements identified + Person can articulate connection
AMBAR Criteria: 2 elements identified + Need more discovery
ROJO Criteria: 1 or 0 elements identified + Poor fit
```

#### Criterios de Decisión

**VERDE (All 3 elements identified):**
- Action: Proceed to personalized nurture sequence
- Messaging: Lead with emotional benefit, not feature
- Copy: Use their language ("you can finally..." "no more worry about...")
- Timeline: Advance immediately to next phase

**AMBAR (2 elements, need more discovery):**
- Action: Schedule second conversation or extended discovery
- Messaging: Ask deeper questions about their goal/feeling
- Copy: Share case study of similar person / emotion
- Timeline: 1 week for second touchpoint, re-assess

**ROJO (1 or fewer elements identified):**
- Action: May not be good fit; consider pause or pivot
- Messaging: Educate about other solutions or defer
- Copy: Redirect to relevant resource (different product)
- Timeline: Option to re-engage if life circumstances change

#### Data Requerida para Decisión

- [ ] Conversation notes (discovery call transcript or summary)
- [ ] Identified emotion(s)
- [ ] Stated problem or goal (verbatim quote if possible)
- [ ] Customer's vision of ideal outcome
- [ ] How product could help (customer's own words)
- [ ] Objections or concerns raised
- [ ] Readiness to move forward (timeline)

#### Quién Decide

**Primary:** Sales/Growth Lead (from discovery conversation)
**Secondary:** Marketing Lead (for messaging calibration)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Personalized nurture | Immediately | Sales |
| AMBAR | Second discovery | 1 week | Sales |
| ROJO | Pause or pivot | Decision in call | Sales + Marketing |

---

### GATE G4: Friction Audit Complete & Low Risk
**Ubicación en Flujo:** Mid-Nurture Phase
**Timing:** Week 2-3 of engagement
**Owner:** Sales / Marketing Lead

#### Criterios de Paso (Verde)

**Friction Audit Checklist (Identify and assess blockers):**

```
Friction Category | Example Friction | Risk Level | Mitigation |
|-----------------|------------------|-----------|-----------|
| **Price/Budget** | Concern: Too expensive | ✗ High | Offer payment plan |
|  | Concern: Need approval | ✓ Medium | Provide ROI doc |
|  | Concern: No budget | ✗ High | Follow up in 6 months |
|
| **Complexity** | Concern: Too complicated | ✓ Medium | Offer setup service |
|  | Concern: Tech support needed | ✓ Medium | Provide live training |
|  | Concern: Data migration pain | ✗ High | Manual data import |
|
| **Trust/Safety** | Concern: Unknown brand | ✓ Medium | Share case studies |
|  | Concern: Data security | ✓ Medium | Share SOC2 cert |
|  | Concern: No guarantees | ✓ Medium | Offer money-back |
|
| **Timing** | Concern: Busy right now | ✓ Medium | Offer guided walkthrough |
|  | Concern: Waiting for event | ✓ Low | Schedule follow-up |
|  | Concern: Wrong timing | ✗ High | Pause, re-engage later |
|
| **Competitive** | Concern: Comparing us to X | ✓ Medium | Provide comparison guide |
|  | Concern: Existing vendor | ✗ High | Delay, re-approach in year |
|  | Concern: Better free alternative | ✗ High | Accept and move on |
```

**VERDE Criteria:** All identified frictions are either NONE or ✓ MEDIUM (mitigable)
**AMBAR Criteria:** 1-2 ✗ HIGH frictions but customer willing to address
**ROJO Criteria:** 3+ ✗ HIGH frictions or customer says "not interested"

#### Criterios de Decisión

**VERDE (Low friction, all mitigable):**
- Action: Proceed with nurture focused on friction reduction
- Messaging: Specifically address each friction point
- Offer: Provide friction-specific solutions (payment plan, training, guarantee)
- Timeline: Close attempt in next 2-3 weeks

**AMBAR (1-2 high friction):**
- Action: Develop remediation plan with customer input
- Messaging: Empathize, then show how friction can be resolved
- Offer: Extended trial, refund guarantee, or partner support
- Timeline: 2-week remediation period, then retry

**ROJO (3+ high friction or explicit "not interested"):**
- Action: Acknowledge mismatch, suggest alternative
- Messaging: "Not the right fit, but here's what might work..."
- Offer: Different product, free resource, or re-engagement trigger
- Timeline: Option to follow up in future cycle

#### Data Requerida para Decisión

- [ ] Friction identified (from conversation and survey)
- [ ] Customer's own words (direct quote of concern)
- [ ] Risk assessment (high/medium/low)
- [ ] Root cause (why this friction exists)
- [ ] Potential remedy (can we address it?)
- [ ] Customer willingness to engage (receptive or resistant?)
- [ ] Timeline (urgent friction vs. parking friction)

#### Quién Decide

**Primary:** Sales/Growth Lead
**Secondary:** Product/Delivery (for feasibility of remedies)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Friction-focused nurture | 2-3 weeks | Sales |
| AMBAR | Remediation conversation | 1 week | Sales + Product |
| ROJO | Pause or offer alternative | Within week | Sales |

---

### GATE G5: Aha Moment Detected
**Ubicación en Flujo:** Final nurture / conversion prep
**Timing:** Days 21-35 post-lead qualification
**Owner:** Sales/Growth Lead

#### Criterios de Paso (Verde)

**Aha Moment Indicators (Must have 2+ strong signals):**

```
Signal Type | Strong (✓) | Weak (◐) | None (✗) |
|-----------|-----------|---------|---------|
| **Engagement** | Opened 4+ emails, clicked 2+, attended demo | Opened 2-3, clicked 1 | 0-1 opens |
| **Behavior** | Visited product page 3+ times, spent 5+ min | Visited 1-2 times | No visits |
| **Communication** | Direct question asked about product/pricing | General inquiry | No communication |
| **Emotional Signal** | Says "this would solve..." / excitement tone | Neutral/interested | Skeptical or disengaged |
| **Intent Signal** | Asks about trial/pricing/timeline | Passive | Not asking questions |

VERDE: 2+ Strong signals
AMBAR: 2+ Weak signals + 1 Strong
ROJO: Mostly weak/no signals
```

**Context:** Aha moment = Customer has had the realization that your solution solves their problem

#### Criterios de Decisión

**VERDE (Strong aha signals):**
- Action: Move to sales conversation / close phase
- Messaging: "Sounds like you're ready to try..." (direct)
- Offer: Demo, free trial, or purchase option
- Timeline: Close attempt immediately (this week)

**AMBAR (Weak aha signals):**
- Action: Continue education nurture, wait for stronger signal
- Messaging: More case studies, feature education, ROI content
- Offer: Webinar, assessment, or extended nurture sequence
- Timeline: 2 more weeks of nurture, then re-assess

**ROJO (No aha moment):**
- Action: Pause outreach, re-segment to long-term nurture
- Messaging: Shift to pure education (remove sales tone)
- Offer: Blog, podcast, community resources
- Timeline: Re-engage when new life event triggers new interest

#### Data Requerida para Decisión

- [ ] Email engagement metrics (opens, clicks, last activity date)
- [ ] Website behavior (pages visited, time on site, resources downloaded)
- [ ] Conversation transcripts or notes (if call happened)
- [ ] Explicit signals (questions asked, objections raised)
- [ ] Emotional tone assessment (excited, neutral, skeptical)
- [ ] Buying signals (asks about price, timeline, features)
- [ ] Competitive activity (comparing to alternatives?)

#### Quién Decide

**Primary:** Sales/Growth Lead or Automation (rules-based trigger)
**Secondary:** Sales Manager (for override or escalation)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Sales close attempt | <48h | Sales |
| AMBAR | Continued nurture | 2 weeks | Marketing + Sales |
| ROJO | Archive to long-term | N/A | Marketing |

---

### GATE G6: NPS & Referral Readiness
**Ubicación en Flujo:** Post-purchase (Month 1-2)
**Timing:** Day 30-45 post-purchase
**Owner:** Customer Success / Growth

#### Criterios de Paso (Verde)

**NPS Score + Activation + Satisfaction:**

```
NPS Score Breakdown:
- Promoter (9-10): Ready for referral
- Passive (7-8): Satisfied, referral possible
- Detractor (0-6): At risk for churn, not ready for referral

VERDE Criteria:
- NPS Score ≥8 (Promoter) AND
- Product actively used (3+ logins in past 30 days) AND
- Explicit positive feedback (survey or conversation) AND
- Customer willing to refer ("Would you recommend to a friend?" = enthusiastic YES)

Scoring: All 4 items = VERDE
Scoring: 3/4 items = AMBAR
Scoring: 1-2 items = ROJO
```

#### Criterios de Decisión

**VERDE (NPS ≥8, active, willing to refer):**
- Action: Invite to referral program
- Offer: Incentive (commission, discount, reward)
- Engagement: Provide referral link, email template, social share
- Timeline: Activate immediately

**AMBAR (NPS 7-8 or 3/4 criteria):**
- Action: Nurture toward Promoter status
- Offer: Expanded training, exclusive feature access, or success consultation
- Engagement: Continue value delivery to push to VERDE
- Timeline: Re-assess in 30 days

**ROJO (NPS ≤6 or 1-2/4 criteria):**
- Action: Rescue protocol, not referral program
- Offer: Support, troubleshooting, or refund if customer unhappy
- Engagement: Diagnose why not satisfied
- Timeline: Address issues before asking for referrals

#### Data Requerida para Decisión

- [ ] NPS survey response (score 0-10)
- [ ] Product usage metrics (logins, features used)
- [ ] Customer satisfaction feedback (verbal or written)
- [ ] Willingness to refer (explicit question)
- [ ] Time since purchase (day 30-45 window)
- [ ] Support interactions (any issues escalated?)
- [ ] Customer segment (segment for referral quality match)

#### Quién Decide

**Primary:** Customer Success Manager or Automated Survey System
**Secondary:** Growth Manager (for referral program enrollment)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Referral program enrollment | Immediately | Growth |
| AMBAR | Success plan to increase NPS | 30 days | CS + Growth |
| ROJO | Issue resolution / Rescue | Urgent | CS + Sales |

---

## GATES GTM: GO-TO-MARKET / PARTNERSHIPS (4 GATES)

### GATE G1: Partner Fit Assessment
**Ubicación en Flujo:** Post Initial Partner Contact
**Timing:** Within 2 weeks of initial outreach
**Owner:** Partner Manager

#### Criterios de Paso (Verde)

**Partner Fit Score (8 weighted factors, 100 points total):**

```
Factor | Weight | Criteria Verde | Points |
|--------|--------|-----------------|--------|
| **Market Complementarity** | 20% | No direct competition, some overlap in customer | 20 |
|  |  | (e.g., we solve X, they solve Y, both needed by customer) | |
|
| **Target ICP Overlap** | 15% | ≥50% customer overlap in target market | 15 |
|  |  | (same industries, company sizes, geographies) | |
|
| **Technical Capability** | 15% | Can implement/integrate our solution | 15 |
|  |  | OR Can resell/support our solution | |
|
| **Company Maturity** | 10% | Established processes, >$1M revenue, 10+ employees | 10 |
|  |  | (Mature enough to execute partnership) | |
|
| **Reference Quality** | 10% | ≥2 strong references (customer satisfaction >80%) | 10 |
|  |  | OR Known to be reputable in market | |
|
| **Shared Values** | 10% | Mission alignment (not just transactional) | 10 |
|  |  | Customer-first mentality, ethical practices | |
|
| **Financial Stability** | 10% | No recent bankruptcies, layoffs, or leadership changes | 10 |
|  |  | Able to invest in partnership | |
|
| **Motivation Clarity** | 10% | Clear reason to partner with us (not desperate) | 10 |
|  |  | Specific customer segment they want to reach | |

**TOTAL SCORE = Sum of factor scores**
VERDE: ≥70 points
AMBAR: 50-69 points
ROJO: <50 points
```

**Example Scoring:**
- Complementarity: 18/20 (they do implementation, we provide software)
- ICP Overlap: 12/15 (60% overlap in mid-market)
- Technical: 15/15 (can integrate APIs)
- Maturity: 8/10 (growing company, 30 people)
- References: 9/10 (1 strong reference verified)
- Values: 8/10 (customer-focused but profit-driven)
- Financial: 9/10 (stable, no red flags)
- Motivation: 8/10 (clear expansion strategy)
- **TOTAL: 87 points = VERDE**

#### Criterios de Decisión

**VERDE (≥70 points):**
- Action: Proceed to certification/enablement phase
- Next step: Pitch meeting + capability deep-dive
- Timeline: Schedule certification within 30 days

**AMBAR (50-69 points):**
- Action: Additional exploratory meetings to assess fit
- Focus: Address specific gaps (financial stability check, reference call, capability test)
- Timeline: 30-day exploration period, then re-score

**ROJO (<50 points):**
- Action: Politely decline partnership
- Communication: "Not the right fit now, but we'd love to reconnect if circumstances change"
- Timeline: Document reasons, revisit in 12-24 months

#### Data Requerida para Decisión

- [ ] Company background (age, revenue, funding, structure)
- [ ] Leadership bios and experience
- [ ] Customer list (names, industries, sizes)
- [ ] Current offerings and capabilities
- [ ] Technology stack and integration experience
- [ ] Reference contacts and conversation feedback
- [ ] Financial stability indicators (news, growth, layoffs)
- [ ] Stated partnership motivation and goals

#### Quién Decide

**Primary:** Partner Manager
**Secondary:** VP Sales or Partnership Director (for final approval)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Schedule pitch + deep-dive | <1 week | Partner Mgr |
| AMBAR | Additional assessment | 30 days | Partner Mgr |
| ROJO | Decline + document | Immediate | Partner Mgr |

---

### GATE G2: Certification Passed
**Ubicación en Flujo:** Post Training Completion
**Timing:** Week 4-6 of partnership journey
**Owner:** Partner Manager + Product Lead

#### Criterios de Paso (Verde)

**Technical Certification Exam + Assessment:**

```
Component | Score Required | Method |
|---------|----------------|--------|
| **Product Knowledge Exam** | ≥80% (16/20 questions) | 20-question assessment |
| **Architecture Understanding** | ≥80% | Diagram-based question |
| **Integration Capability** | ≥80% | Hands-on lab deployment |
| **Support Process** | ≥80% | Scenario-based questions |
| **Sales Competency** | ≥80% | Sales pitch evaluation |

VERDE: All 5 components ≥80%
AMBAR: 4/5 components ≥80%, 1 component 70-80%
ROJO: <3 components ≥80%
```

**Example:**
- Product Knowledge: 18/20 (90%) ✓
- Architecture: 9/10 (90%) ✓
- Integration Lab: Passed (90% ✓
- Support Scenarios: 8/10 (80%) ✓
- Sales Pitch: 85% ✓
- **RESULT: VERDE (all passed)**

#### Criterios de Decisión

**VERDE (All passed):**
- Action: Approve as certified partner
- Authorization: Can resell/implement immediately
- Benefits: Access to lead sharing, co-marketing funds, training materials
- Timeline: Activate in partner program immediately

**AMBAR (4/5 passed, 1 weak):**
- Action: Conditional approval + remediation
- Requirement: Retrain in weak area, retest within 10 days
- Limitation: Limited partner benefits until fully certified
- Timeline: Retest by day 10, or revoke certification

**ROJO (<3 passed):**
- Action: Do not approve; offer extended training
- Option 1: Retry training + testing in 2 weeks
- Option 2: Decline partnership if gap too large (not tech-capable)
- Timeline: Decision within 5 days

#### Data Requerida para Decisión

- [ ] Exam scores (all 5 components)
- [ ] Lab deployment results (working implementation)
- [ ] Sales pitch recording or evaluator notes
- [ ] Training attendance (all modules completed)
- [ ] Partner feedback on training (quality, clarity)
- [ ] Questions or concerns during training

#### Quién Decide

**Primary:** Product/Technical Lead (conducts certification)
**Secondary:** Partner Manager (approves advancement)
**Escalation:** VP Sales (if marginal case or exception needed)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Activate as certified partner | Immediately | Partner Mgr |
| AMBAR | Remediation + retest | 10 days | Training Lead |
| ROJO | Extended training or decline | 5 days | VP Sales |

---

### GATE G3: Pipeline Health Check (Ongoing)
**Ubicación en Flujo:** Monthly / Quarterly (Ongoing)
**Timing:** Monthly cadence (first Monday of month)
**Owner:** Partner Manager

#### Criterios de Paso (Verde - Active Pipeline)

**Pipeline Health Metrics:**

```
Metric | Target | Green | Ambar | Red |
|--------|--------|-------|-------|------|
| **Active Opportunities in Pipeline** | >3 | ≥3 opp | 1-2 opp | 0 opp |
|  | (deals in various stages) | | | |
|
| **Pipeline ARR Value** | >$200K | ≥$200K | $100-200K | <$100K |
|  | (total revenue if all deals close) | | | |
|
| **Deal Velocity (Avg Days to Close)** | <120 days | <120d | 120-180d | >180d |
|  | (from initial contact to close) | | | |
|
| **Partner Engagement Score** | Regular | Weekly calls | Bi-weekly | Monthly+ |
|  | (frequency of contact with us) | & updates | updates | lags |
|
| **Deal Quality** | >30% win rate | >30% | 20-30% | <20% |
|  | (partner sourced deal close rate) | | | |

VERDE: ≥4 metrics in green column
AMBAR: 2-3 metrics in green, rest ambar
ROJO: <2 metrics in green OR 1+ in red column
```

#### Criterios de Decisión

**VERDE (Active, healthy pipeline):**
- Action: Continue standard co-selling cadence
- Cadence: Monthly business review calls
- Support: Regular enablement, marketing support
- Timeline: Ongoing partnership execution

**AMBAR (Dormant or declining pipeline):**
- Action: Reactivation conversation required
- Question: "What's blocking the pipeline? How can we help?"
- Support: Additional training, co-selling support, lead generation assistance
- Timeline: 30-day improvement plan, re-check in 60 days

**ROJO (No pipeline or major issues):**
- Action: Formal review meeting + decision point
- Options: 1) Re-commitment to co-selling 2) Escalate support 3) Terminate partnership
- Timeline: Decision within 30 days

#### Data Requerida para Decisión

- [ ] CRM pipeline report (all partner-sourced opportunities)
- [ ] Deal status by stage (discovery, proposal, closing)
- [ ] Expected close dates for each opportunity
- [ ] Deal size and ARR value
- [ ] Partner engagement indicators (call frequency, response time)
- [ ] Win rate on partner deals (closed vs. lost)
- [ ] Partner feedback on barriers or blockers
- [ ] Marketing activity (webinars, content, joint campaigns)

#### Quién Decide

**Primary:** Partner Manager
**Secondary:** VP Sales (for ROJO decisions)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Continue standard cadence | Ongoing | Partner Mgr |
| AMBAR | Reactivation plan | 60 days | Partner Mgr + VP Sales |
| ROJO | Review meeting / Decision | 30 days | VP Sales |

---

### GATE G4: SLA Compliance & Partnership Health (Quarterly)
**Ubicación en Flujo:** Quarterly (Every 3 months)
**Timing:** End of each quarter (last week)
**Owner:** Partner Manager + Operations

#### Criterios de Paso (Verde)

**SLA Compliance Scorecard (5 metrics, weighted):**

```
SLA Metric | Target | Weight | Green | Ambar | Red |
|----------|--------|--------|-------|-------|------|
| **Response Time to Inquiries** | 48h | 25% | ≤48h | 49-72h | >72h |
| (Partner replies to our messages) | | | | | |
|
| **Lead Quality Score** | >60% | 25% | >60% | 40-60% | <40% |
| (% leads that meet our criteria) | | | | | |
|
| **Lead Follow-up Timeliness** | <10 days | 20% | <10d | 10-15d | >15d |
| (Days from lead share to contact) | | | | | |
|
| **Quote Accuracy & Completeness** | >90% | 15% | >90% | 75-90% | <75% |
| (% proposals with no errors) | | | | | |
|
| **Escalation Resolution SLA** | <5 days | 15% | <5d | 5-10d | >10d |
| (Time to resolve support issues) | | | | | |

Weighted Score = Sum(Metric Score × Weight)
VERDE: ≥90 points
AMBAR: 70-89 points
ROJO: <70 points
```

**Example Calculation:**
- Response Time: 90% compliance × 25% = 22.5 points
- Lead Quality: 65% quality × 25% = 16.25 points
- Lead Follow-up: 95% on-time × 20% = 19 points
- Quote Accuracy: 92% × 15% = 13.8 points
- Escalation Resolution: 100% × 15% = 15 points
- **TOTAL: 86.55 points = AMBAR (close to Verde)**

#### Criterios de Decisión

**VERDE (≥90 points):**
- Action: Celebrate success + plan expansion
- Offer: Increased co-marketing budget, exclusive territory, deeper integration
- Timeline: Renewal + expansion conversation (if contract near end)

**AMBAR (70-89 points):**
- Action: Improvement plan required
- Support: Identify specific gaps, offer training/resources to improve
- Timeline: 60-day improvement period, re-score next quarter

**ROJO (<70 points):**
- Action: Formal performance improvement plan (PIP) or exit
- Terms: 30-60 day PIP with specific metrics to hit
- Alternative: Partner may choose to exit
- Timeline: Decision within 30 days

#### Data Requerida para Decisión

- [ ] Response time logs (partner replies to emails/calls)
- [ ] Lead quality review (% sourced leads vs. target)
- [ ] Lead follow-up timeline (days from share to first contact)
- [ ] Proposal/quote audit (accuracy and completeness)
- [ ] Support ticket backlog (escalations and resolution time)
- [ ] Partner feedback (any issues they've raised?)
- [ ] Revenue generated (deals closed, ARR attributed)
- [ ] Customer satisfaction (customer NPS from partner-sourced deals)

#### Quién Decide

**Primary:** Partner Manager
**Secondary:** VP Sales (for ROJO or expansion decisions)
**Escalation:** CEO (for strategic partner termination)

#### Posibles Outcomes

| Outcome | Next Step | Timeline | Owner |
|---------|-----------|----------|-------|
| VERDE | Expansion conversation | Immediate | Partner Mgr + VP Sales |
| AMBAR | Improvement plan | 60 days | Partner Mgr |
| ROJO | PIP or exit | 30-60 days | VP Sales + Partner Mgr |

---

## ESCALATION MATRIX GENERAL

When a gate decision cannot be made at primary level:

```
Decision Complexity | Primary | Escalate To | Timeline |
|------------------|---------|------------|----------|
| Ambiguous fit | AE | Sales Mgr | 2 days |
| Conflicting opinions | AE + Delivery | VP Sales + VP Ops | 5 days |
| Exception to policy | Sales Mgr | VP Sales | 3 days |
| Strategic decision | AE | VP Sales + CEO | 5 days |
| Customer dissatisfaction | CSM | VP Customer Success | 2 days |
| Partnership termination | Partner Mgr | VP Sales + CEO | 5 days |
```

---

## SUMMARY TABLE: All 18 Gates at a Glance

| Gate | Vertical | Timing | Owner | VERDE | AMBAR | ROJO |
|------|----------|--------|-------|-------|-------|------|
| **G1: ICP Qual** | B2B | Days 5-10 | AE | Score >70 | 50-70 | <50 |
| **G2: Green Light** | B2B | Days 30-45 | Sales Mgr | Tech+Pol ✓ | Gaps | Blockers |
| **G3: Profitability** | B2B | Days 35-45 | COO | GM target | Conditional | <Target |
| **G4: Market Ready** | B2B | Days 40-45 | Sales Ops | QA pass | Minor fixes | Major issues |
| **G5: Deal Health** | B2B | Post-sig | AE+CSM | Healthy | At risk | Risky |
| **G6: Activation** | B2B | Day 3 | CSM | Quick win ✓ | Partial | Blocked |
| **G7: Health Score** | B2B | Monthly | CSM | >75 | 50-75 | <50 |
| **G8: Renewal Ready** | B2B | 90d pre | AE | Verde+Expand | Renew only | At risk |
| **G1: Life Event** | B2C | <24h | Marketing | ≥80% fit | 60-80% | <60% |
| **G2: Lead Score** | B2C | <1 week | Growth | ≥60 pts | 40-59 | <40 |
| **G3: Emotional Anchor** | B2C | Week 1 | Sales | All 3 ✓ | 2/3 | 1-0 |
| **G4: Friction Audit** | B2C | Weeks 2-3 | Sales | Low risk | 1-2 high | 3+ high |
| **G5: Aha Moment** | B2C | Days 21-35 | Sales | 2+ strong | 2+ weak | None |
| **G6: NPS & Referral** | B2C | Days 30-45 | CS | NPS≥8 | NPS 7-8 | NPS≤6 |
| **G1: Partner Fit** | GTM | Week 2 | Ptnr Mgr | ≥70 pts | 50-69 | <50 |
| **G2: Certification** | GTM | Weeks 4-6 | Product | All 5 ✓ | 4/5 ✓ | <3 pass |
| **G3: Pipeline Health** | GTM | Monthly | Ptnr Mgr | Active | Dormant | Dead |
| **G4: SLA Compliance** | GTM | Quarterly | Ptnr Mgr | ≥90 pts | 70-89 | <70 |

---

**FIN DEL MAPA DE DECISION GATES**

*Última actualización: 2026-03-24*
*Próxima revisión: 2026-06-24 (quarterly)*
*Auditoría recomendada: Semestral*
