# Handoff Protocol - MetodologIA
**Versión:** 2.1 | **SSOT:** Service Blueprint v2.1 | **Efectivo:** 2026-03-24

---

## 1. ESTRUCTURA GENERAL

### Fases de Transición
**F0 → F1 → F2 → F3 → F4 → F5**
Plus: **F4 ↔ F3** (regresión), **F3 ↔ F2** (rediseño)

### Supuestos Críticos
- Coach asignado NO ha excedido 10 clientes
- CRM actualizado antes de cada handoff
- Documentación obligatoria (SOP v2.x + Service Blueprint v2.1) completada
- Client enablement session comunicada (para F0→F1, F1→F2, F2→F3)
- Segmento verificado: P1-P4 (B2C) o E1-E3 (B2B)

---

## 2. HANDOFF F0 → F1 (Awareness → Diagnóstico)

### Checklist Saliente (F0)
- [ ] Propuesta aceptada y firmada
- [ ] Diagnóstico preliminar completado (industria, madurez IA, org structure)
- [ ] Stakeholders identificados (mín. 3 en B2B, 1 en B2C)
- [ ] Acceso técnico confirmado (datos, sistemas, credenciales)
- [ ] Briefing de F1 Coach programado (máx. 48h)
- [ ] Cliente informado de timeline: 5 días laborales

### Checklist Entrante (F1)
- [ ] Coach asignado ≤10 clientes activos
- [ ] Propuesta descargada y leída
- [ ] Stakeholders mapeados en CRM
- [ ] 1ra sesión diagnóstica programada (kickoff diagnosis)
- [ ] Plantillas de cuestionarios listos (Technical Assessment, Org Readiness)

### Artefactos Transferidos
| Artefacto | Origen | Destino | Formato |
|-----------|--------|---------|---------|
| Propuesta signada | F0 | F1 | PDF |
| Mapa stakeholders | F0 | F1 | CRM + PDF |
| Acceso técnico | F0 | F1 | Documento seguro |
| Diagnóstico preliminar | F0 | F1 | Confluence/Google Doc |

### SLA & Propiedad
- **Duración máxima:** 5 días laborales (SOL F0→F1)
- **Owner:** F0 Coach → F1 Coach (transfer call requerido)
- **Verificación:** Jefe de Fase F1 valida checklist antes de día 4

### Modo Fallo
- Si handoff incompleto después de día 3: Jefe de Fase F1 notifica a Operaciones
- Retraso >5 días = penalización NPS (cliente recibe comunicación de impacto)
- F1 NO inicia sesiones hasta checklist ✓

### B2C vs B2B
| Aspecto | B2C (P1-P4) | B2B (E1-E3) |
|--------|-----------|-----------|
| Stakeholders | 1-2 | 3-5+ |
| Acceso técnico | Self-service | IT governance requerida |
| Kickoff | Virtual (30 min) | Presencial o sesión 90 min |

### Plantilla Comunicación Cliente
```
ASUNTO: Bienvenido a tu Diagnóstico de IA - [Semana 1/2/3]
Tu Coach F1: [Nombre]
Próximo paso: [Fecha/Hora] kickoff diagnosis
Preparativos: Revisar acceso a [Sistema X], disponibilidad 3 stakeholders
¿Preguntas? Responde este email
```

### CRM Status
`Status: F0_COMPLETED` → `Status: F1_ACTIVE` | `Assigned to: [F1_Coach]` | `Phase_Start: [Hoy]`

---

## 3. HANDOFF F1 → F2 (Diagnóstico → Diseño)

### Checklist Saliente (F1)
- [ ] Diagnóstico final completado (informe 20-30 pgs)
- [ ] Recomendaciones priorizadas (roadmap 3-12 meses)
- [ ] Riesgos identificados y mitigation plans
- [ ] Presupuesto validado y desglosado por ruta
- [ ] Acta de cierre F1 signada (stakeholders)
- [ ] Artefactos digitales organizados en carpeta compartida

### Checklist Entrante (F2)
- [ ] Diagnóstico leído y validado
- [ ] Roadmap entendido; preguntas planteadas a F1 Coach
- [ ] Design workshop agenda elaborada (2-3 sesiones)
- [ ] Plantillas de diseño preparadas (según roadmap)
- [ ] Nuevo coach asignado (validar cap. ≤10 clientes)

### Artefactos Transferidos
- Diagnóstico final (PDF + acceso editable)
- Roadmap de IA (Excel + Gantt)
- Matriz de riesgos
- Presupuesto desglosado
- Registro de stakeholders actualizado

### SLA & Propiedad
- **Duración máxima:** 7 días (gap entre cierre F1 y kickoff F2)
- **Owner:** F1 Coach → F2 Coach (1:1 transfer call + docs review)
- **Gate:** F2 Jefe de Fase valida comprensión de roadmap antes de 1ra sesión

### Modo Fallo
- Diagnóstico incompleto → F1 Coach NO puede cerrar fase hasta completar
- Gap >7 días sin señal → Cliente recibe update semanal automático
- Discrepancia en roadmap → Scheduled calibration entre F1 & F2 Coaches

### B2C vs B2B
| Aspecto | B2C | B2B |
|--------|-----|-----|
| Complejidad diagnóstico | 2-5 recomendaciones | 8-15 recomendaciones |
| Roadmap granularidad | Mensual | Semanal (primeras 8 semanas) |
| Design workshops | 1-2 sesiones | 3-4 sesiones (multi-stakeholder) |

### Plantilla Comunicación Cliente
```
ASUNTO: Diagnóstico Completo + Plan de Diseño - [Mes/Trimestre]
Estimado [Cliente],
Tu diagnóstico está listo. Tu nuevo Coach de Diseño es [Nombre].
ADJUNTO: Informe ejecutivo (3 pgs) + Roadmap visual
Próximas sesiones de diseño: [Fechas]
Tu inversión F2: $[X] por [Modulo A/B/C]
¿Confirmamos calendario?
```

### CRM Status
`Status: F1_COMPLETED` → `Status: F2_ACTIVE` | `Assigned to: [F2_Coach]` | `Roadmap_ID: [UUID]`

---

## 4. HANDOFF F2 → F3 (Diseño → Práctica)

### Checklist Saliente (F2)
- [ ] Diseño final validado (spec document completo)
- [ ] Materiales de capacitación listos (slides, plantillas, case studies)
- [ ] AARC framework adaptado (Activar-Aprender-Replicar-Comprometer)
- [ ] Schedule F3 confirmado (sesiones semanales x12-16)
- [ ] Quality Gate F2→F3 pasado (Jefe Fase verifica 100% checklist)
- [ ] Cliente ha dado "go/no-go" para F3

### Checklist Entrante (F3)
- [ ] Coach F3 asignado; ≤10 clientes activos
- [ ] Diseño estudiado; preguntas a F2 Coach resueltas
- [ ] Plantillas AARC adaptadas para dominio cliente
- [ ] Sesión 1 de F3 scheduled (semana específica + día/hora)
- [ ] Equipo de práctica del cliente identificado (mín. 3 personas)

### Artefactos Transferidos
- Especificación de diseño (Google Doc + PDF frozen)
- Materiales de capacitación (Deck, templates, SOP cliente)
- Calendario F3 (Google Cal + CRM)
- Plan de evaluación (métricas, rubrics)
- Registro de prácticas previstas (primeras 4 semanas)

### Quality Gates (Gate 1: F2→F3 Entry)
- [ ] Spec completado y validado
- [ ] Capacitador F3 ready (cert. AARC completada)
- [ ] Cliente ha completado pre-work assessment
- [ ] Riesgos F2 mitigados (no outstanding issues)
- [ ] Presupuesto F3 confirmado

### SLA & Propiedad
- **Duración máxima:** 3 días (entre cierre F2 y 1ra sesión F3)
- **Owner:** F2 Coach entrega a F3 Coach (transfer session 90 min)
- **Quality Gate:** Jefe Fase F3 autoriza inicio basado en checklist + client readiness

### Modo Fallo
- Quality Gate fallido → F3 NO inicia; se programa sesión de resolución
- Gap >3 días → Cliente contactado diariamente
- Client readiness bajo → Se extiende en 1-2 semanas con sesiones nivelación

### B2C vs B2B
| Aspecto | B2C | B2B |
|--------|-----|-----|
| # sesiones F3 | 12 semanas | 20 semanas |
| Tamaño grupo práctica | 1-3 | 5-10+ |
| Intensidad AARC | Ligera (intro) | Intensiva (expertise deep-dive) |

### Plantilla Comunicación Cliente
```
ASUNTO: 🚀 Iniciamos tu Fase de Práctica - Semana [X]
Tu Coach de Práctica: [Nombre]
Primera sesión: [Día/Hora]
QUÉ ESPERAR: Activaciones, ejercicios reales, replicas de tus procesos
PREPARACIÓN: Lee el SOP Cliente (adjunto); trae 1 proceso real
Confirmá asistencia: [Link Calendly]
```

### CRM Status
`Status: F2_COMPLETED` → `Status: F3_ACTIVE` | `Assigned to: [F3_Coach]` | `F3_Phase_Week: 1` | `Quality_Gate: PASSED`

---

## 5. HANDOFF F3 → F4 (Práctica → Autonomía)

### Quality Gates en F3
**Gate 2 (Week 1):** Cliente participa activamente; AARC ciclos iniciados ✓
**Gate 3 (Week 3):** Cliente replica 1 ejercicio independientemente ✓
**Gate 4 (F3→F4 Exit):** Cliente demuestra autonomía en 2/3 competencias clave

### Checklist Saliente (F3)
- [ ] Cliente ha completado 100% sesiones F3 (o 90% con justificación)
- [ ] Portfolio de prácticas documentado (10-15 ejercicios completados)
- [ ] Competencias map completado (cliente auto-evalúa vs. rubric)
- [ ] Quality Gate F3→F4 pasado (Jefe Fase valida autonomía)
- [ ] Plan de post-F3 comunicado (F4 scope y duracion)

### Checklist Entrante (F4)
- [ ] Coach F4 asignado (típicamente mismo que F3, o con handoff call)
- [ ] Portfolio leído; gaps de competencia identificados
- [ ] Autonomy assessment tool listo (cliente self-assess + coach verify)
- [ ] Temas F4 priorizados (2-3 áreas de profundización)
- [ ] Cadencia F4 confirmada (quincenal o mensual)

### Artefactos Transferidos
- Portfolio de prácticas (folder con evidencias)
- Competencias map (planilla + rubric)
- Grabaciones de sesiones (subset: 3-5 sesiones clave)
- Reflexiones cliente (notas sobre learnings)
- Plan autonomía (roadmap 3-6 meses post-F3)

### Quality Gate (F3→F4 Exit)
- [ ] Cliente demuestra maestría L3+ en 2/3 competencias críticas
- [ ] Ausencias <10% en F3
- [ ] Coach F3 recomienda "go to autonomy"
- [ ] Cliente expresa confianza en aplicar solo (survey)
- [ ] Riesgos identificados en plan mitigation F4

### SLA & Propiedad
- **Duración máxima:** 2 días (entre cierre sesión F3 final y kickoff F4)
- **Owner:** F3 Coach → F4 Coach (puede ser mismo coach; si distinto, transfer call obligatoria)
- **Quality Gate:** Jefe Fase F4 autoriza inicio solo si Gate F3→F4 ✓

### Modo Fallo
- Quality Gate fallido → Cliente regresa a F3 por 4 semanas adicionales
- Regresar a F3: trigger = <2/3 competencias en L2; proceso en sección 7

### B2C vs B2B
| Aspecto | B2C | B2B |
|--------|-----|-----|
| Competencias críticas | 3 | 5 |
| Autonomy bar (mastery %) | 70% | 80% |
| F4 duration | 6-8 semanas | 12-20 semanas |

### Plantilla Comunicación Cliente
```
ASUNTO: ¡Felicidades! Entrás en tu Fase de Autonomía
Demostraste maestría en [Competencia A, B]. Tu Coach ahora es [Nombre - puede ser mismo].
En F4 vas a:
- Profundizar en casos propios
- Liderar implementaciones con support
- Prepararte para ser Advocacy Champion

Primera sesión F4: [Fecha] - quincenal/mensual

```

### CRM Status
`Status: F3_COMPLETED` → `Status: F4_ACTIVE` | `Assigned to: [F4_Coach]` | `Autonomy_Level: [L2/L3]` | `Quality_Gate: PASSED`

---

## 6. HANDOFF F4 → F5 (Autonomía → Advocacy)

### Checklist Saliente (F4)
- [ ] Cliente ha ejecutado 2+ implementaciones independientemente
- [ ] Advocacy readiness assessment completado
- [ ] Champion identificado (interno cliente, sponsor F5)
- [ ] Casos de éxito documentados (3+ ejemplos con ROI)
- [ ] Plan de community engagement definido (talks, mentoring, referrals)

### Checklist Entrante (F5)
- [ ] Champion entrenado en Advocacy program
- [ ] Métricas de advocacy definidas (referrals, content, events)
- [ ] Plataforma Advocacy comunicada (portal, comunidad, incentivos)
- [ ] Cronograma actividades advocacy (3-6 meses)

### Artefactos Transferidos
- Casos de éxito (docs + videos)
- Advocacy playbook (templates para talks, mentoring, content)
- Community platform credentials
- Incentive structure (referral bonuses, recognition)

### SLA & Propiedad
- **Owner:** F4 Coach → Advocacy Manager
- **SLA:** Iniciación F5 ≤5 días post-cierre F4

### B2C vs B2B
| Aspecto | B2C | B2B |
|--------|-----|-----|
| Advocacy form | Content creation | Industry speaking + referrals |
| Community | Closed Facebook group | LinkedIn community + webinars |

### CRM Status
`Status: F4_COMPLETED` → `Status: F5_ACTIVE` | `Assigned to: [Advocacy_Manager]` | `Champion: [Nombre]`

---

## 7. REGRESIÓN PROTOCOLS

### F4 → F3 (Autonomy Failure)

**Trigger:**
- Cliente no ejecuta sin coach support después 3 semanas F4
- Competencia score cae <L2 en evaluación midpoint F4
- Cliente solicita support intensivo

**Proceso:**
1. Coach F4 + Jefe Fase conversan (día 1-2)
2. Causa root analyzed (diseño insuficiente vs. ejecución débil)
3. Cliente notificado con email: "Estamos pivoteando a sesiones más intensivas"
4. Return to F3 por 4 semanas (sesiones semanales)
5. Re-evaluate autonomy en semana 4

**Re-entry F4:**
- Competencia ≥L2 en 2/3 áreas
- Coach & cliente acuerdan plan específico
- Cadencia F4 ajustada (más frecuente si es necesario)

### F3 → F2 (Design Flaw)

**Trigger:**
- Week 3 Gate: Cliente no replica ejercicio básico
- Múltiples clientes (n≥2 mismo coach) fallando mismo ejercicio
- Coach identifica gap fundamental en spec de diseño

**Proceso:**
1. Coach F3 + Jefe Fase + Coach F2 triada call (día 1)
2. Diagnosis: ¿es el cliente o el diseño?
3. Si diseño → diseño se ajusta (F2 Coach)
4. Cliente suspende F3 por 1-2 semanas
5. Sesiones F3 se re-run con nuevo material
6. Re-launch F3 con Gate Week 1 repetido

**Prevention:**
- Quality Gate F2→F3 incluye "pilot de 2-3 ejercicios con cliente"

---

## 8. HANDOFFS EXCEPCIONALES

### Client Pause
- Cliente requiere pausa (presupuesto, capacidad)
- Status: `PAUSED` + `Pause_End_Date: [Fecha]`
- Coach mantiene contact light (mensual check-in)
- SLA resumption: 3 días

### Segment Switch (P1→E1)
- Descubrimiento que cliente es B2B no B2C (o vice versa)
- Handoff entre "P track" coach → "E track" coach
- Review de materiales (AARC puede variar)
- Re-negotiate presupuesto & timeline si cambian fases

### Mid-Phase Cancellation
- Cliente cancela; fase incompleta
- Coach cierra documentación (what was completed, why cancelled)
- CRM: `Status: CANCELLED` + `Reason: [...]` + `Phase_Completion: X%`
- Finance: ajuste de invoice según servicios entregados

---

## 9. HANDOFF QUALITY METRICS

| Métrica | Target | Medición |
|---------|--------|----------|
| On-time handoff | 95% | Auditoría CRM timestamps |
| Checklist completeness | 100% | Checklist form en CRM |
| Client satisfaction @ handoff | NPS ≥8 | Micro-survey post-handoff |
| Coach knowledge transfer | 100% | Coach F_new puede responder 10 preguntas sobre cliente |
| Zero artefact loss | 100% | Auditoría folder structure |

**Reporting:** Jefe de Fase reporta métricas mensualmente a Operaciones.

---

## 10. ANTI-PATTERNS & PREVENCIÓN

| Anti-patrón | Síntoma | Prevención |
|-------------|---------|-----------|
| **Handoff tardío (>SLA)** | Cliente en limbo; stress NPS | Daily stand-up 3 días pre-handoff; reminder automático CRM |
| **Documentación incompleta** | F_new coach improvisa | Checklist obligatorio; no sign-off sin ✓ |
| **Stake-holder churn** | Nuevo sponsor desconoce contexto | Email al nuevo stakeholder + 1:1 kickoff con Jefe Fase |
| **Coach overload (>10 clientes)** | Calidad handoff degrada | Cap en CRM; alert si coach @ límite |
| **Artefact obsolescence** | Coach usa doc viejo | Version control en folder; latest = bolded |
| **No transfer call** | Handoff one-way; gaps | Mandatory 1hr call Owner → Owner |

---

## 11. COMMUNICATION TEMPLATES

### Template 1: Handoff Notification (Cliente)
```
ASUNTO: Tu próximo paso en MetodologIA ✨

Hola [Nombre],

¡Felicidades por completar tu fase [F_actual]! Hemos visto progreso en [específico].

Tu nuevo Coach es [Nombre Completo] (email: [email]; disponibilidad: [horarios]).

**Próxima sesión:** [Fecha/Hora]
**Lo que esperar:** [Breve descripción fase siguiente]
**Tareas tuyas:** [2-3 bullets]

¿Preguntas? Responde este email o agenda aquí: [Calendly link]

Seguimos adelante juntos,
[Coach Actual]
```

### Template 2: Coach-to-Coach Handoff Summary
```
HANDOFF [F_prev] → [F_next] | Cliente: [Nombre] | Fecha: [Hoy]

RESUMEN:
- Progreso: [1-2 sentences clave logros]
- Riesgos: [Bullets; mitigation plan]
- Stakeholder churn: [Si aplica]
- Próximos pasos cliente debe completar: [Bullets]

ARTEFACTOS: [Link folder compartida]
TRANSFER CALL: [Día/Hora confirmado]

Preguntas? Llamemos.
```

### Template 3: Client CRM Notification (Auto)
```
[14 días pre-handoff] Recordatorio: Tu siguiente fase inicia en 2 semanas
[7 días pre-handoff] Tu nuevo Coach se presentará en breve
[Día handoff] ¡Bienvenido a la fase [Siguiente]!
```

---

## 12. CRM STATUS MAPPING

```
F0: PROSPECT → F0_ACTIVE → F0_COMPLETED
F1: F1_ACTIVE → F1_COMPLETED
F2: F2_ACTIVE → F2_COMPLETED
F3: F3_ACTIVE → F3_WEEK1_GATE → F3_WEEK3_GATE → F3_COMPLETED
F4: F4_ACTIVE → F4_COMPLETED
F5: F5_ACTIVE → F5_COMPLETED / ADVOCATE_CHAMPION

Estados especiales:
- PAUSED (+ Pause_End_Date)
- CANCELLED (+ Cancellation_Reason + Phase_Completion%)
- REGRESSED_F3 (+ Regression_Reason)
```

---

## 13. ESCALATION MATRIX

| Issue | Trigger | Owner | Escalate to |
|-------|---------|-------|------------|
| Handoff >SLA | Gap days > SLA limit | Coach sender | Jefe Fase → Ops Manager |
| Quality Gate fail | Gate checkpoint ✗ | Jefe Fase | Operations + Product |
| Coach overload | >10 clientes | CRM alert | Talent Manager → Ops |
| Artefact loss | Folder/doc missing | Coach | Jefe Fase → IT + Operaciones |

---

**RESPONSABILIDADES FINALES**

- **Cada Coach:** Completar checklist saliente en CRM antes de handoff
- **Jefe Fase [Receptor]:** Validar checklist entrante + Quality Gates antes de iniciar fase nueva
- **Operaciones:** Auditoria SLA mensualmente; reportar anti-patterns
- **CRM Admin:** Mantener status transitions y recordatorios automáticos
- **Product:** Revisar artefactos transferidos; feedback mejora

---

**Documento versión 2.1 alineado con Service Blueprint v2.1. Próxima revisión: Q2 2026.**
