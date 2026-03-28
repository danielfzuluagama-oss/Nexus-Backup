# SOP: Tracción - Implementación Rápida (4-8 semanas)
**Versión:** 1.1 (Elevado 10x) | **Fecha:** 2026-03-24 | **Certif. Moat:** SOP-CON-TRACC-2401

---

## OBJETIVO

Implementar 2-3 quick wins de alto impacto en 6 semanas (típico). Prueba de concepto demostrada, ROI cuantificado 2-4x, momentum de cambio institucionalizado, identificación temprana de recompra (Evolución).

---

## SUPUESTOS EXPLÍCITOS

1. **Supuesto: Equipo interno dedicado 50%+.** Si equipo tiene <50% disponibilidad → velocidad ↓50%, scope reducida, timeline +2 semanas
2. **Supuesto: Sponsor ejecutivo disponible semanal.** Si sponsor desaparece → proyecto muere. Requerir commitment antes kick-off
3. **Supuesto: Tecnología/herramientas funcionales.** Si stack falla durante sprint (ej: servidor down) → MDL no responsible por delay
4. **Supuesto: Datos existentes accesibles.** Baseline metrics disponibles para comparar antes vs después. Si no → métricas "soft" (qualitative)
5. **Supuesto: Decisiones ágiles (max 24h).** Si cliente requiere comité approval para cada decision → velocidad crash, cambiar a Evolución

---

## LÍMITES DEL PROCESO

**Tracción NO cubre:**
- Transformación profunda: Solo quick wins 2-3 (no cambio cultural/sistémico). Si cliente quiere deeper → sugerir Evolución
- Cambio de personas: Si resistencia masiva (>50% team), MDL puede aconsejar pero no "fuerza" cambios
- Escalabilidad post-proyecto: Tracción prueba concepto. Cliente es responsible por rollout a resto organización
- Soporte indefinido: SLA = fin Sem 8 handoff. Post-Sem 8 = support ad-hoc pago

**Trigger & Entrada**

**Trigger:** Cliente cerró Diagnóstico (propuesta Tracción enviada) O cliente sabe exactamente 1-2 iniciativas específicas (directo a Tracción, skip Diagnóstico)

**Entrada Requerida:**
- ✓ Propuesta Tracción aceptada + firmada
- ✓ 2-3 objetivos SMART ultra-definidos (no vagos)
- ✓ Equipo interno ≥3 personas dedicadas (50%+ disponibilidad confirmada)
- ✓ Sponsor ejecutivo identificado + disponibilidad semanal confirmada
- ✓ Baseline metrics identificadas (cómo medimos éxito)

**Entrada Ideal Adicional:**
- Acceso a datos históricos (benchmark)
- Diagrama de cambio (quién afecta, cómo

---

## CASOS BORDE

### Caso Borde 1: Equipo interno "no disponible" (presupuesto/otros proyectos)

**Trigger:** Kick-off externo, cliente dice "el equipo está 80% allocated"

**Acción (24h escalate):**
- Opción A: Pause Tracción hasta equipo available (reschedule Sem 5-6)
- Opción B: MDL sourcing recursos temporales externo (contractors) → +$3-5M COP
- Opción C: Reducir scope (1 quick win en lugar de 2-3) → timeline 4 semanas
- **Recomendación:** Opción A. Tracción con equipo desenfocado = fracaso virtual

---

### Caso Borde 2: Sponsor abandons (ej: se va empresa, presupuesto cortado)

**Trigger:** Semana 3 de proyecto, sponsor dice "pause"

**Acción (48h):**
- Director contacta CEO/CFO inmediatamente
- Diagnóstico: ¿Pausa temp o cancelación?
- Si pausa <4 semanas: Renegociar timeline, mantener equipo si possible
- Si pausa >4 semanas o cancelación: Transición ordenada, documentar progress, opción recompra en futuro

**SLA:** Response <24h, decisión formal <5 días

---

### Caso Borde 3: Métrica "no existe" (cliente no sabe medir)

**Trigger:** Sem 1 planning, cliente dice "no tracked antes"

**Acción:**
- Proxies: Usar datos indirectos si metrics perfectas no exist
  - "Eficiencia": Usar # de pasos en proceso (antes 15 pasos → después 8)
  - "Speed": Usar "average days to close" (antes 10 → después 5)
  - "Quality": User satisfaction (1-10 scale)
- Documentar: "Baseline inferred from..." (transparency)

**Risk:** ROI calculation menos precise. Pero mejor that zero data.

---

### Caso Borde 4: Scope Creep ("pequeño cambio más")

**Trigger:** Sem 3, cliente pide "mientras estamos aquí, ¿pueden arreglar X?"

**Acción:**
- Evaluación: ¿Está dentro scope? (Si SÍ → absorb)
- Si NO: "Esto es out-of-scope. Cuesta [Y]. Options: (a) agregar a propuesta, (b) postergar a Tracción 2, (c) rechazar"
- **Gate:** Scope creep >20% → requiere re-negotiación contrato + extension timeline

---

## SEMANA 1: SPRINT PLANNING

### Kick-off Interno (Día 0, 4h)
- Review de propuesta, contexto cliente
- Asignación de roles (Consultor lead, especialista, admin)
- Preparación de templates (sprint plan, daily standup sheet, demo checklist)

### Kick-off Externo (Día 1, 3h)
- Bienvenida, explicación de modelo sprint
- Presentación de equipo MetodologIA
- Definición de 2-3 objetivos SMART (refinamiento si es necesario)
- Asignación de equipo interno (roles: sponsor, executive, power users, IT)
- Setup de herramientas: Slack, Jira, Miro, shared dashboard

### Sprint Planning (Día 2-3, 4h)
- Desglose de cada objetivo en tareas semanales
- Identificación de blockers potenciales
- Definition de "done" para cada sprint
- Calendario de dailies, demos, retros

**Output:** Sprint roadmap 6 semanas (visual Jira/Miro)

---

## SEMANAS 1-6: EJECUCIÓN POR SPRINT

### Sprint A (Sem 1-2): Quick Win 1

**Ejemplo: Automatizar Aprobaciones de Órdenes**

**Lun-Mar (Planificación & Educación):**
- Lun: Kick-off sprint (30 min), asignación de tareas
- Mar: Educación (workshop 2h sobre flujo aprobaciones nuevo, herramienta, business case)
- Entregables: Flowchart de nuevo proceso, user stories, training slides

**Mié-Jue (Piloto & Test):**
- Mié: Prototipado (fake data test, walkthroughs con power users)
- Jue: Piloto en vivo (20 órdenes reales, equipo observa, documenat issues)
- Entregables: Lista de issues encontrados, sugerencias de ajuste

**Vie (Demo & Feedback):**
- Demo a stakeholders (30 min: "Así funciona el nuevo proceso")
- Feedback recopilado
- Ajustes rápidos si críticos
- Retro: "¿Qué salió bien? ¿Qué aprendimos?"

**Documentación:**
- Proceso nuevo documentado (1 página + flowchart)
- Lista de "How to..." guide (2 págs)
- Troubleshooting común (½ página)
- Metrics baseline (tiempo antes/después, error rate)

---

### Sprint B (Sem 3-4): Quick Win 2

Mismo formato que Sprint A, objetivo diferente.

**Ejemplo: Integrar CRM + Contabilidad**

---

### Sprint C (Sem 5-6, Opcional): Quick Win 3 o Profundización

**Opción A:** Tercer quick win independiente
**Opción B:** Profundizar impacto Win 1 & 2 (rollout a más áreas, 10% → 50%)

---

## SEMANA 6-8: MEDICIÓN, COMUNICACIÓN, HANDOFF

### Medición de Impacto (Sem 6)

**Metrics Documentadas:**
- Time savings: Horas ahorradas por proceso (antes vs después)
- Cost savings: $ ahorrados (time value, errores evitados, overhead reducido)
- Quality: Error rate reduction (ej: manual data entry errors -70%)
- Velocity: Speed (ej: approval time 5 días → 1 día)
- NPS: User satisfaction (¿cuánto les gusta el nuevo proceso?)

**Business Case (1-2 págs):**
- Investment: $18M COP
- Savings/Revenue: $XX ahorrado o generado
- ROI: X multiplier (ej: 2.5x = 45M COP of value)
- Payback period: Sem 4

### Comunicación Interna (Sem 7)

**All-Hands Celebration:**
- Reconocimiento de equipo + usuarios
- Storytelling de antes vs después
- Números: Horas ahorradas, dinero generado
- "¡Demostramos que el cambio es posible!"

**Internal Evangelization:**
- Testimonios de users: "Así cambió para mí"
- Video 2 min de demoviación
- LinkedIn post (si cliente permite)

### Capacitación & Handoff (Sem 8)

**Super User Training (2-3 sesiones, 2h c/una):**
- Cómo usar el nuevo proceso (hands-on)
- Troubleshooting común
- Cómo entrenar a otros

**Manager Training (1 sesión, 1h):**
- Cómo monitorear adoption
- Cómo reforzar el cambio
- Cómo medir success

**IT Handoff (1 sesión, 1h, si aplica):**
- Cómo soportar la solución
- Troubleshooting técnico
- Escalations

**Documentación Entregada:**
- Playbooks (3-5 documentos, 1-2 págs c/uno)
- Process flowcharts (visual + descriptivo)
- FAQ (preguntas comunes, respuestas)
- Video tutorials (3-5 videos, 3-5 min c/uno)

---

## OUTPUTS DE TRACCIÓN

1. **Sprint Reports** (semanal, 1 página c/uno = 6 págs total)
   - Progreso vs plan
   - Blockers & mitigation
   - Preview de siguiente semana

2. **Business Case & ROI** (2 págs)
   - Metrics baseline vs post
   - $ impact
   - ROI multiplier

3. **Playbooks & Documentación** (5-10 documentos)
   - How-to guides
   - Process flowcharts
   - FAQ
   - Video links

4. **Capacitación** (3-5 sesiones documentadas)
   - Recording + slides
   - Attendance log
   - Q&A resumen

5. **Propuesta de Recompra** (2 págs, opcional)
   - Escalamiento: Extender Win 1 a más áreas
   - Evolución: "¿Quieren transformación profunda?"

---

## KPIs POST-TRACCIÓN

| Métrica | Target | Medición |
|---------|--------|----------|
| **Adoption Rate** | ≥70% users en 2 semanas | Logs sistema, surveys |
| **ROI Delivered** | ≥2x investment | Business case metrics |
| **Time-to-Value** | Sem 2-3 | Cuándo se vio impacto |
| **NPS Cliente** | ≥7/10 | Post-project survey |
| **Recompra Rate** | ≥30% | % que aceptan siguiente fase |

---

## CHECKLIST: FIN TRACCIÓN

- [ ] Kick-off interno + externo completado
- [ ] 2-3 sprints completados (6 semanas)
- [ ] Demos realizadas (Fri cada sprint)
- [ ] Métricas baseline + post documentadas
- [ ] Business case escrito
- [ ] Capacitaciones realizadas
- [ ] Documentación entregada
- [ ] Celebration/storytelling completado
- [ ] Handoff confirmado
- [ ] Propuesta recompra enviada (si aplica)

---

**Fin de SOP: Tracción**
