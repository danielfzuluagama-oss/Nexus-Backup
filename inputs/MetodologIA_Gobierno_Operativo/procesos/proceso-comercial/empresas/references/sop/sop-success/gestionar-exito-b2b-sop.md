# SOP: Gestionar Éxito B2B

**Versión:** 2.0
**Fecha:** 2026-03-24
**Dueño:** Success Manager / Delivery Manager
**Duración:** Ongoing (12+ meses post-firma)
**Objetivo:** Asegurar adopción exitosa, satisfacción del cliente, identificación de expansión y upsell

---

## 1. Propósito

Proceso de SUCCESS MANAGEMENT: post-venta systematic para asegurar que cliente obtiene valor esperado, está satisfecho, y es candidato para expansión/recompra.

**Incluye:**
- Onboarding corporativo (primeras 4 semanas)
- Monitoreo de adopción técnica (semanas 4-24)
- Preparación y ejecución de QBRs (business reviews)
- Identificación de expansión/upsell opportunities
- Gate R-01: Feedback a Venta sobre recompra potential

---

## 2. Supuestos Explícitos del SOP

| # | Supuesto | Validación |
|---|----------|-----------|
| S1 | Success Manager está assigned pre-launch | Coordinar con Delivery Manager antes de kickoff |
| S2 | Cliente está motivated a adoptar solución (no fue "vendida contra su will") | Si cliente es reluctant, flag en Delivery Manager |
| S3 | Team Sofka está disponible para support post-launch | Presupuestar 4 weeks de support post-launch |
| S4 | Cliente tiene champions internos (users que "will champion" solución) | Identificar en onboarding |
| S5 | Métricas de éxito fueron definidas en proposal (success criteria) | Si no, definir en onboarding con cliente |

---

## 3. Límites del SOP

### Límites Explícitos (SÍ hacemos esto)
✓ Onboarding corporativo (training, documentation)
✓ Monitoreo de adopción
✓ QBRs (quarterly business reviews)
✓ Identificación de expansión/upsell
✓ Feedback a Venta (Gate R-01) para recompra
✓ Soporte técnico post-launch (4 weeks)

### Límites Explícitos (NO hacemos esto)
✗ Mantenimiento operativo a perpetuidad (es customer support, no sales success)
✗ Desarrollo de features nuevas (es roadmap, no success management)
✗ Reparación de bugs sistémicos (es warranty, no success management)
✗ Hosting/Infrastructure management (es operations, no success)
✗ Resolución de conflictos empresa-Sofka (es Legal/Escalations, no success)

---

## 4. Fase 1: Onboarding Corporativo (Semanas 1-4 Post-Launch)

### Paso 4.1: Coordinación de Onboarding (Día 1)
**Actividad:** Success Manager coordina con cliente para onboarding plan.

**Componentes de onboarding:**

1. **Executive Kickoff (Day 1, 1 hour)**
   - Sponsor CxO + Delivery Manager + Success Manager
   - Confirmación de timeline, expectations, support model
   - Q&A sobre solución y rollout

2. **Technical Kickoff (Day 2-3, 2 hours)**
   - IT Manager + Sofka architects
   - Setup técnico, accesos, data migration, integraciones
   - Q&A técnicos

3. **User Training (Week 1-2, 2-3 days)**
   - Training sessions by role (admins, power users, regular users)
   - Hands-on practice in test environment
   - Training materials (manuals, videos, quick-start guides)

4. **Data Migration & Setup (Week 1-3)**
   - Migrar data histórica
   - Setup inicial (users, roles, configurations)
   - Validation de data integrity

5. **Go-Live Support (Week 4)**
   - 24/7 support during launch (critical issues)
   - Issue tracking and resolution
   - User escalations

**Checklist:**
- ¿Kickoff ejecutivo completado? → SÍ / NO
- ¿Kickoff técnico completado? → SÍ / NO
- ¿Training sessions ejecutadas? → SÍ / NO
- ¿Data migration completada y validada? → SÍ / NO
- ¿Go-live ejecutada sin critical issues? → SÍ / NO

### Paso 4.2: Definir Success Criteria (Día 2-3)
**Actividad:** Alinear con cliente sobre qué significa "éxito" en primeros 3 meses.

**Ejemplo de success criteria:**
- "System is live and stable (99% uptime) by [date]"
- "All users trained and confident using system by [date]"
- "Team is independent (no need for Sofka support for day-to-day issues) by [week 12]"
- "Initial benefits realized (% cost reduction, or days saved) by [date]"
- "[Specific business outcome] achieved by [date]"

**Documentación:**
- Email a cliente: "Here's our understanding of success criteria for your implementation. Please confirm these align with your expectations."
- Registrar en CRM: "Success criteria: [list]"

---

## 5. Fase 2: Monitoreo de Adopción (Semanas 4-24)

### Paso 5.1: Weekly Check-ins (Semanas 1-8 Post-Launch)
**Actividad:** Success Manager hace weekly calls con cliente (main user contact).

**Agenda:**
- How is adoption going?
- Any issues or blockers?
- Training effectiveness feedback?
- Anything we can improve?

**Registro:**
- Email summary post-call a cliente y equipo interna
- Escalación automática si hay critical issues
- Update CRM con adoption status

**Frequency:** Weekly primeras 8 semanas. Luego bi-weekly (semanas 8-24).

### Paso 5.2: Adopción Metrics (Weeks 4-24)
**Actividad:** Track metrics de adopción para entender si cliente está getting value.

**Métricas típicas (varían según solución):**

```
USAGE METRICS:
- % de users activos (logins, transactions)
- Horas/semana de system usage
- Número de workflows completados

BUSINESS METRICS:
- % de costo reducido vs baseline (si objetivo era cost reduction)
- Horas ahorradas/semana vs baseline
- Nuevos ingresos generados (si aplicable)

SUPPORT METRICS:
- Número de support tickets
- Tiempo promedio de resolución
- % de issues resueltos por cliente (self-service)
```

**Monthly report a cliente:**
> "Month 2 adoption summary: 85% of users logging in weekly, completing avg 50 workflows/week. Cost reduction trending at 22% vs target of 25% (on track for Q3 targets). 12 support tickets, avg resolution time 4 hours. Overall adoption is strong."

### Paso 5.3: Intervención si Adopción es Lenta (Weeks 4-24)
**Escenario:** Usage metrics muestran baja adopción (ej: <50% users activos).

**Acción:**
1. Diagnóstico (call con client): "¿Por qué usage está bajo? ¿Training fue insuficiente? ¿Hay resistencia cultural?"
2. Intervención:
   - Si training insuficiente: schedule refresher training
   - Si resistencia cultural: facilitar change management session (CxO reaffirms importance)
   - Si usability issue: flag to product team, consider workaround
3. Seguimiento: 2-week check-in post-intervention

**Escalation:** Si adopción no mejora en 4 semanas post-intervention, escalar a Delivery Manager.

---

## 6. Fase 3: QBRs (Quarterly Business Reviews)

### Paso 6.1: Preparación de QBR (Semana 11, 23, 35, etc. Post-Launch)
**Actividad:** Success Manager prepara QBR presentation para cliente (45-60 min).

**Agenda de QBR:**

```
SLIDE 1: EXECUTIVE SUMMARY
- Implementation status: Complete/on-track
- Adoption status: [% users, usage metrics]
- Business value realized: [% cost reduction, hours saved, etc.]
- Customer satisfaction: [NPS, sentiment]

SLIDE 2: ADOPTION & USAGE
- User adoption curve (% of users engaged over time)
- Usage patterns by department/role
- Key user feedback

SLIDE 3: BUSINESS VALUE REALIZATION
- Target vs Actual: Cost reduction, time saved, revenue, etc.
- Gap analysis: If not on track, why? Mitigation plan?
- Forecasted Q4 value

SLIDE 4: SUPPORT & ISSUES
- Summary of issues encountered and resolutions
- Outstanding items (bugs, enhancements)
- SLA compliance (% of issues resolved on-time)

SLIDE 5: LEARNINGS & IMPROVEMENTS
- What went well
- What could be improved (process, training, product)
- Recommendations for optimization

SLIDE 6: EXPANSION OPPORTUNITIES
- [See next section: Identifying Expansion/Upsell]
- Potential modules/features that could add value
- Timeline and investment for expansion

SLIDE 7: ROADMAP & NEXT STEPS
- Q4 priorities
- Support model evolution (reducing support as client becomes independent)
- Decision timeline for expansions
```

**Preparation checklist:**
- ¿Adopción metrics están actualizados? → SÍ / NO
- ¿Business value está cuantificado? → SÍ / NO
- ¿Issues y resolutions están documentadas? → SÍ / NO
- ¿Expansion opportunities están identificadas? → SÍ / NO

### Paso 6.2: Ejecutar QBR (Semanas 12, 24, 36)
**Actividad:** Presentar QBR a sponsor CxO + key stakeholders.

**Participants:**
- Sponsor CxO (confirmar commitment para expansion)
- Success Manager (Success ownership)
- Delivery Manager (si changes to support model)
- Key user (representative of adopters)

**Estructura:**
- 10 min: Executive summary
- 15 min: Adoption & value realization
- 10 min: Issues & improvements
- 15 min: Expansion opportunities (deep-dive)
- 10 min: Next steps & decision making

**Post-QBR:**
- Email recap + slides a cliente
- Action items documented (ours and theirs)
- Expansion decision timeline: "We recommend deciding by [date] to start [target start]"
- Registrar feedback en CRM: "Client sentiment: [positive/neutral/concerned]"

---

## 7. Fase 4: Identificación de Expansión/Upsell

### Paso 7.1: Mapear Expansion Opportunities (Ongoing)
**Actividad:** Success Manager identifica continuamente oportunidades de expansión.

**Tipos de expansión:**

**1. Module/Feature Expansion (Same problem area, broader scope)**
- Cliente implementó Phase 1 (cost reduction), Phase 2 (risk management) sería natural next
- Ej: Implementaron inventory management, ahora adding demand planning

**2. Vertical Expansion (Same solution, new department)**
- Cliente implementó solución en Finance, Sales dept también podría beneficiarse
- Ej: ERP live en Finance (manufacturing), Operations (supply chain) sería next user

**3. Adjacent Product Expansion (Different problem area)**
- Cliente problema fue implemented, ahora tiene different pain area Sofka puede resolver
- Ej: Implementaron analytics para data visibility, ahora necesitan automation

**Discovery process:**
- En adopción monitoring: Pregunta "¿Otros areas donde similar problema existe?"
- En QBRs: Incluir slide sobre opportunities (ver paso anterior)
- En support interactions: Flag si user menciona "It would be great if we could also..."

**Documentación:**
- Oportunidad identificada → registro en CRM como "Expansion Opportunity"
- Tamaño estimado: "Phase 2 would be $X investment, $Y annual benefit"
- Timeline: "Ideal timing would be Q2 2027 después que team está fully trained"

### Paso 7.2: Preparar Expansion Sales Process
**Escenario:** Expansion opportunity está identificada, cliente está interesado.

**Proceso:**
- Gate R-01: Feedback a Sales team que cliente es candidate para recompra
- Sales Manager: Asignar Sales Executive a expansion opportunity
- Sales Executive: Ejecutar mini-discovery con new department/area
- Replicar workflow estándar (Discovery → Structuring → Close)

**Timing:**
- Típicamente expansión ocurre 6-12 meses post-initial launch
- Cuando cliente está "comfortable" con solución inicial

---

## 8. Casos Borde de Success Management

### Caso Borde 1: Cliente está muy unhappy (NPS <4/10)
**Escenario:** QBR feedback muestra cliente frustrated con solución.

**Acción:**
1. Diagnóstico 1:1 con CxO: "¿Cuál es el issue?" (escalate if needed)
2. Root cause analysis: Problema técnico? Expectativas no met? Process issue?
3. Remediation plan:
   - Si problema técnico: roadmap fix con timeline
   - Si expectativas: reframe success criteria (set realistic goals)
   - Si process: propose change management support
4. Recovery plan: "Here's what we'll do to fix this. Timeline. Accountability."
5. Follow-up en 4 weeks para verificar mejora

**Escalation:** Si customer NPS <3/10 y no mejora, escalate a Delivery Director / VP.

### Caso Borde 2: Adopción está stuck (usuarios no lo usan, vuelven a proceso viejo)
**Escenario:** 3 months post-launch, pero users siguen usando legacy system.

**Acción:**
1. Diagnóstico: "¿Por qué no están using la nueva solución?" (change management issue, UX issue, training issue?)
2. Intervención:
   - Si training issue: Refresher training intensivo
   - Si UX issue: Procesar como product feedback, propose workarounds
   - Si change management: CxO necesita "mandate" (ej: "Legacy system shuts down 2027-Q2")
3. Roadmap: "If adoption improves, we can proceed with expansion. If not, we need to address this."

**Fallback:** Si adoption no mejora, expansion NO procede until primary solution is adopted.

### Caso Borde 3: Cliente quiere descuento en renewal o expansion
**Escenario:** QBR presenta expansion opportunity, cliente dice "Interesado, pero queremos 20% descuento en precio total (original + expansion)."

**Acción:**
1. Validar: ¿Descuento es dealbreaker para cliente? ¿Sin descuento = no sale?
2. Escalate a Sales Manager + Finance: "Qué margen tenemos? ¿Podemos absorber descuento?"
3. Options:
   - Aceptar 10-15% descuento si margen permite
   - Proponer "bundle pricing" (original + expansion cheaper together than separately)
   - Proponer staged approach (expansion Q1 at normal price, renewal negotiation at Q1)
4. Decisión: No hacer unilateral descuentos. Finance + Sales Manager approval.

### Caso Borde 4: Customer says "We're going to use competitor for Phase 2"
**Escenario:** Expansion identified, but client says "Vendor X has better tool for this module."

**Acción:**
1. No defensiveness. Pregunta: "¿Qué capabilities tiene vendor X que no tenemos?"
2. Análisis: ¿Es verdad? ¿Podríamos cubrir con our product o partner integration?
3. Options:
   - Si podemos cubrir: Presentar propuesta alternativa con partnership model
   - Si no podemos cubrir: Gracefully concede. "Excellent. We can help coordinate handoff/integration."
4. Salvage: "Even if Phase 2 is with [vendor], would you consider us for [other expansion area]?"
5. Learning: Feedback a product team sobre capabilities gap

**Fallback:** No todos expansions son nuestras. Better para cliente usar best-of-breed, even si es competencia.

---

## 9. Anti-Patterns de Success Management

### AP1: "No onboarding, throw over wall to support"
**Anti-pattern:** Post-launch, support team debe entrenar users porque no hay onboarding.

**Qué hacer:** Robust onboarding (training, documentation, 4-week support) es non-negotiable.

### AP2: "Success Manager desaparece después de month 2"
**Anti-pattern:** Success Manager engaged primeros 8 weeks, luego "client is mature now."

**Qué hacer:** Continuous engagement (check-ins, QBRs) durante 12+ months.

### AP3: "QBR es "here's what we delivered," no business focus"
**Anti-pattern:** QBR presented como "we built X, client should be happy."

**Qué hacer:** QBR must focus on business value: ROI, adoption, satisfaction, expansion.

### AP4: "No expansion planning"
**Anti-pattern:** Success Manager doesn't pro-actively identify expansion.

**Qué hacer:** Expansion planning es parte de success management role.

### AP5: "Churn because of poor support"
**Anti-pattern:** Customer unhappy post-launch, support is slow/unresponsive.

**Qué hacer:** 4-week post-launch support must be robust (24/7 for critical issues).

---

## 10. Decisiones de Diseño del SOP

### DD1: ¿Por qué 4 weeks de post-launch support, no indefinido?
**Justificación:** 4 weeks es tiempo típico para stabilize solución. Luego client debe ser "independent."
**Alternativa:** Indefinite support → Support costs unsustainable.
**Validación:** Con structured 4-week support, 80% de clientes son independent month 2. Sin structured support, 40% requiere support ongoing.

### DD2: ¿Por qué QBRs son quarterly, no monthly o annual?
**Justificación:** Monthly es overkill (not enough data to show trends). Annual es demasiado long (issues can go unaddressed).
**Validación:** Quarterly is industry standard para business reviews post-implementation.

---

## 11. Fallbacks Operativos

### FB1: Customer unreachable para onboarding
**Plan A:** Email con agenda + call link, request confirmation 48h before.
**Plan B:** Si no responde, call CxO directly: "We're ready to launch. Can you unblock your team's availability?"
**Fallback:** Si cliente cancela kickoff múltiples veces, descalificar launch (project risk).

### FB2: Adopción muy baja (20% of users) después de 4 semanas
**Plan A:** Root cause analysis call con customer.
**Plan B:** Intensify: Refresher training, executive mandate, process changes.
**Plan C:** Si no mejora en 4 semanas post-intervention, escalate.
**Fallback:** Si adopción queda stuck <30%, expansion NO procede.

### FB3: Support tickets piling up (SLA breaches)
**Plan A:** Triage: Critical vs non-critical. Resolve critical first.
**Plan B:** Escalate to Delivery Manager: Need more support resources.
**Plan C:** Communicate transparently a customer: "We're at capacity, here's timeline for resolution."
**Fallback:** Never let SLA breaches go unaddressed. Risks customer satisfaction + expansion.

### FB4: Customer NPS <4/10
**Plan A:** Escalate immediately to Delivery Director.
**Plan B:** Diagnostic call con CxO to understand root cause.
**Plan C:** Remediation plan with timeline + accountability.
**Plan D:** Follow-up in 2 weeks. If still low, executive intervention required.
**Fallback:** At this NPS, expansion is not possible. Focus on recovery.

---

## 12. Métricas de Success Management

| Métrica | Target | Acción |
|---------|--------|--------|
| Onboarding completion | 100% | Critical for success |
| User adoption (% active) | >70% by month 3 | Si <50%, intervene |
| System uptime/SLA compliance | >99% | Si <95%, escalate |
| Support ticket SLA | 95% on-time resolution | Si <80%, bottleneck |
| Customer NPS (post-implementation) | >7/10 | Si <4, major concern |
| Expansion identified | 50-80% of customers | Success metric |
| Time to identify expansion | 3-6 months | Too early = premature; Too late = lost opportunity |
| Expansion close rate | 40-60% of identified opportunities | From expansion ID to signed |

---

## 13. Responsabilidades

| Role | Responsabilidad |
|------|-----------------|
| Success Manager | Onboarding, adoption monitoring, QBRs, expansion identification |
| Delivery Manager | Technical support (4 weeks post-launch), infrastructure, issue resolution |
| Sales Executive | Expansion sales (once identified and client interested) |
| Customer (Sponsor CxO) | Allocate time for training, mandate adoption, participation in QBRs |

---

## 14. Cross-references

- **← Delivery Process:** Handoff from Delivery to Success post-launch
- **← Sales Process (Gate R-01):** Feedback from Success to Sales about expansion/recompra opportunities
- **→ Sales Process (if expansion):** Expansion opportunities transition to Sales for new contract

---

**Dueño:** Success Manager / Delivery Manager
**Próxima revisión:** 2026-06-24
