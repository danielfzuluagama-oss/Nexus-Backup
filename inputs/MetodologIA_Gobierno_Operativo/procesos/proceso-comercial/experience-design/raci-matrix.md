# RACI Matrix — Proceso Comercial MetodologIA

> **Documento**: RACI Matrix (Responsable, Accountable, Consulted, Informed)
> **Versión**: 1.0 — 10x Governance Standard
> **Fecha**: 2026-03-24
> **Owner RACI**: Leadership (Accountable) | Gobierno Operativo (Responsible)
> **Vigencia**: Q2 2026 | **Dependencias**: Service Blueprint v2.1, Customer Journey docs, SOPs (scouting, nurturing, discovery, structuring, delivery, success)
> **Cambios**: Inicial; ref. commitment a SOPs, MOTs, Quality Gates

---

## 1. Resumen Ejecutivo

Este documento declara quién es **Responsable (R), Accountable (A), Consulted (C), e Informed (I)** para cada actividad crítica en el proceso comercial de MetodologIA, desagregado por fase (F0-F5), segmento (B2C vs B2B), y rol.

**Principio de Governance**: Un solo Accountable por actividad. Múltiples Responsables admitidos solo si explícitamente documentados en SOP. Escalación automática si Accountable no responde en SLA.

---

## 2. Matriz RACI General (F0-F5)

### Leyenda
- **R** = Responsable (ejecuta la tarea)
- **A** = Accountable (responde por resultado; solo UNO por fila)
- **C** = Consultado (da input/aval antes de ejecutar)
- **I** = Informado (se notifica después)

### Roles Aplicables a Todas las Fases

| Rol | Descripción | Dedicación Típica |
|-----|-----------|------------------|
| **Leadership** | CEO/Co-founder; toma decisiones estratégicas | 10-20% |
| **Coach/Consultor** | Entrega 1:1, diagnóstico, diseño, práctica | 70-100% |
| **Sales (Scouting)** | Prospección, nurturing, calificación BANT | 60-80% |
| **Content Team** | Crea assets, email nurturing, webinars | 40-60% |
| **Tech/Platform** | Plataforma LMS, integración herramientas, analytics | 30-50% |
| **Operations** | Facturación, calendarios, contratos, NDA | 40-60% |
| **Client Success** | Onboarding F3, check-ins F4, NPS F5 | 50-70% |

---

## 3. RACI por Fase: Actividades Clave

### F0 — AWARENESS (Lead Generation, Prospección)

| Actividad | Sales | Content | Coach | Tech | Operations | Leadership | Escalacion SLA |
|-----------|-------|---------|-------|------|------------|-----------|-----------------|
| Generar leads (SEO, ads, eventos, referral) | **R/A** | **R** | I | I | I | I | Leadership si CAC > 30% budget |
| Nurturing: email sequences, webinars | Content/**A** | **R** | I | I | I | C | Content si abierta < 20% |
| Calificación BANT inicial (lead magnet) | Sales/**R/A** | C | I | C | I | C | Sales si conversión < 10% |
| Segmentación (B2C persona vs B2B empresa) | Sales/**R** | C | C | **R** | I | I | Sales si error > 5% leads |
| Outreach inicial (WhatsApp, email) | Sales/**R/A** | I | I | I | I | I | Sales si respuesta < 20% |
| Configurar landing/lead magnet | Tech/**R** | **A** | I | R | I | I | Content si tasa conversión < 15% |

**Momentos de Verdad**: MOT-1 (Relevancia) si CTR > 3% y Bounce < 40%
**Supuestos**: Personas/empresas claramente definidas; budget para ads; CRM operativo
**Anti-patrón**: Sales descalifica leads sin usar BANT → fix: entrenamiento + checklist

---

### F1 — DIAGNÓSTICO (Discovery, Baseline Report, Lead Qualification)

| Actividad | Sales | Coach | Operations | Tech | Leadership | Client Success | Escalacion SLA |
|-----------|-------|-------|-------------|------|-----------|-----------------|-----------------|
| Agendar sesión diagnóstico 1:1 | Sales/**R/A** | I | **R** | I | I | I | Sales si >7 días sin respuesta |
| Pre-sesión: recolectar info contexto (cuestionario) | Sales/**R** | I | **R/A** | C | I | I | Sales si cliente no completa |
| Conducir diagnóstico 1:1 (1h) | Coach/**R/A** | — | I | I | I | C | Coach si NPS < 5 → revisar facilitación |
| Generar Baseline Report (análisis + hallazgos) | Coach/**R** | A | I | **R** | I | C | Coach si retraso > 2 días |
| Crear Mapa de Oportunidad (3+ oportunidades cuantificables) | Coach/**R/A** | — | I | **R** | I | I | Coach si falta cuantificación |
| Compartir diagnóstico con cliente (async o síncrono) | Coach/**R** | I | I | **R** | I | **C/I** | Coach si NPS post-presentación < 6 |
| Decisión F1→F2 (cliente valida resonancia) | Coach/**C/A** | **R** | I | I | I | **R** | Coach si cliente no responde en 5 días |
| Registrar resultado en CRM (avance/no avance) | Sales/**R** | I | **A** | I | I | I | Sales si retraso > 1 día |

**Momentos de Verdad**: MOT-2 (Claridad) si conversión F1→F2 > 60% y NPS diagnóstico ≥ 7
**Quality Gate**: Baseline Report debe tener ≥ 3 oportunidades cuantificadas
**Supuestos**: Coach disponible en 5 días; cliente responde cuestionario; cliente puede asistir 1:1
**Anti-patrón**: Diagnóstico genérico (copy-paste) → fix: templating + cliente-specific research en SOP-discovery

---

### F2 — DISEÑO (Co-diseño Ruta, KPIs, Contratos)

| Actividad | Coach | Operations | Sales | Tech | Leadership | Client Success | Escalacion SLA |
|-----------|-------|-------------|-------|------|-----------|-----------------|-----------------|
| Agendar sesiones co-diseño (1-2 sesiones) | Coach/**R/A** | **R** | I | I | I | I | Coach si conflicto calendario > 1 semana |
| Co-diseñar Ruta de Evolución (roadmap) | Coach/**R/A** | I | C | **R** | I | I | Coach si cliente solicita cambios > 2 veces |
| Definir KPIs personalizados + Dashboard | Coach/**R** | I | C | **R/A** | I | C | Tech si dashboard > 2 semanas |
| Configurar herramientas (GPT custom, templates, etc.) | Tech/**R** | I | I | **A** | C | I | Tech si cliente no accede en 3 días |
| Generar Roadmap visual (Gantt, fases detalladas) | Coach/**R** | I | I | **R** | I | I | Coach si cliente pide > 2 iteraciones |
| Redactar ODS (Objective Development Sheet) | Coach/**R** | I | I | C | I | I | Coach si no firmado en 7 días |
| Gestionar contrato/NDA/Términos de pago | Operations/**R/A** | — | **C** | I | C | I | Operations si sin firma en 10 días |
| Confirmar capacidad (Max 10 clientes/coach en F3) | Coach/**R** | I | I | I | **A** | I | Leadership si excede capacidad |
| Orientation call (primer día F3): expectativas | Coach/**R** | I | I | I | I | **R** | Coach si cliente no asiste → reschedule |

**Momentos de Verdad**: MOT-2 completado si cliente "ve el roadmap claro" (NPS ≥ 8)
**Quality Gate**: ODS firmada antes de F2→F3; Dashboard accesible
**Supuestos**: Coach disponible para 2 sesiones; cliente elige 1 de 3 opciones de nivel; payment ready
**Anti-patrón**: Roadmap genérico reutilizado → fix: 1h investigación mínima por cliente en SOP-structuring

---

### F3 — PRÁCTICA (Bootcamp, Coaching, Implementación)

| Actividad | Coach | Tech | Client Success | Operations | Content | Leadership | Escalacion SLA |
|-----------|-------|------|-----------------|-------------|---------|-----------|-----------------|
| Administrar sesiones 1:1 semanales (máx 10 clientes/coach) | Coach/**R/A** | I | I | I | C | **A** | Leadership si backlog > 3 semanas |
| QA semanal: revisar progreso cliente vs KPI | Coach/**R/A** | **R** | I | I | I | I | Coach si NPS sesión < 6 |
| Entregar templates, playbooks, prompts personalizados | Coach/**R** | **R/A** | I | I | **R** | I | Tech si retraso > 2 días |
| Manejar obstáculos/refinar prompts en tiempo real | Coach/**R/A** | **C** | C | I | I | I | Coach si cliente bloquea > 1 semana |
| Generar Custom GPTs (si aplica) | Tech/**R** | **A** | I | I | I | C | Tech si > 5 días |
| Documentar learnings clave por tema | Coach/**R** | **R** | I | I | C | I | Coach si missing > 2 semanas |
| MOT-3 Aha! Moment (semana 3-4): validar aplicación real | Coach/**R/A** | C | **C** | I | I | I | Coach si NPS < 7 → remedial |
| Mantener async loop (Slack, email, dashboard updates) | Coach/**R** | **R** | **R** | I | I | I | Tech si respuesta > 24h |
| Adaptaciones mid-course si progreso < meta (-20%) | Coach/**R** | C | C | I | I | **A** | Leadership si requiere inversión extra |
| Acta de cierre F3: logros, autonomía, plan F4 | Coach/**R** | I | **R** | I | I | I | Coach si missing > 3 días post-F3 |

**Momentos de Verdad**: MOT-3 (Aha!) si NPS sesión > 8 Y cliente implementa ≥1 cambio en semana 3-4
**Quality Gate**: Autonomía medida ≥ 70%; ≥1 KPI movió; 60%+ módulos completados
**Supuestos**: Coach dedicado; cliente asigna 4-8 h/semana; platform estable; feedback loop async
**Anti-patrón**: Coach toma acción en vez de cliente → fix: "entrenamiento, no ejecución" en SOP-delivery
**Capacidad**: MAX 10 clientes F3 concurrentes/coach. MAX 20 personas bootcamp grupal.

---

### F4 — AUTONOMÍA (Post-Programa, Soberanía, Mantenimiento)

| Actividad | Client Success | Coach | Tech | Operations | Content | Leadership | Escalacion SLA |
|-----------|-----------------|-------|------|-------------|---------|-----------|-----------------|
| Entregar Autonomy Kit (templates, SOP personal, checklist) | Client Success/**R** | **A** | **R** | I | C | I | Client Success si > 3 días post-F3 |
| Sesión de cierre: revisión logros + plan autónomo | Coach/**R** | **A** | I | I | I | I | Coach si no completada en 5 días |
| Validar sostenibilidad de cambios (self-assessment) | Client Success/**R** | **C/A** | I | I | I | I | Client Success si respuesta < 7 días |
| Check-in mensual (async o síncrono) | Client Success/**R/A** | C | C | I | C | I | Client Success si falta 2 meses consecutivos |
| Alertas nuevas tools/actualizaciones recursos | Content/**R** | I | **R** | I | **A** | I | Content si retraso > 1 semana |
| Encuesta NPS post-F4 (umbral ≥ 8 para F5) | Client Success/**R** | I | I | I | I | **A** | Leadership si NPS < 7 → intervención |
| Gestionar licencias/acceso recurso perpetuo | Operations/**R** | I | **R** | **A** | I | I | Operations si acceso interrumpido |
| Captura de metrics finales (ROI, transformación) | Tech/**R** | **C** | **A** | I | I | I | Tech si 30 días sin data |

**Momentos de Verdad**: MOT-4 (Soberanía) si autonomía > 80% Y cliente mantiene hábitos > 30 días
**Quality Gate**: Autonomy Kit completado; NPS ≥ 7 en encuesta post-cierre; Plan mantenimiento documentado
**Supuestos**: Cliente dispuesto a mantener hábitos sin pago; acceso a recursos perpetuo asegurado; feedback loop async funciona
**Anti-patrón**: Abandonar cliente post-F3 → fix: check-ins mínimos obligatorios en SOP-success

---

### F5 — ADVOCACY (Embajadores, Referral, Casos de Éxito)

| Actividad | Client Success | Leadership | Content | Tech | Coach | Sales | Escalacion SLA |
|-----------|-----------------|-----------|---------|------|-------|-------|-----------------|
| Invitar a embajador (NPS ≥ 8, caso de éxito claro) | Client Success/**R** | **A** | C | I | C | C | Client Success si demora > 10 días |
| Producir caso de éxito (testimonial, video, escrito) | Content/**R** | **C/A** | A | **R** | I | I | Content si no publicado en 45 días |
| Activar programa referral (tracking link, incentivos) | Sales/**R** | I | I | **R** | I | **A** | Sales si > 2 semanas sin setup |
| Publicar en sitio web + redes sociales | Content/**R** | **C** | **A** | C | I | I | Content si > 3 semanas sin publicación |
| Gestionar embajador: invitaciones eventos, contenido UGC | Client Success/**R** | I | **C/A** | I | I | C | Client Success si evento sin embajador confirmado |
| Trackear referrals: atribución + comisiones (si aplica) | Sales/**R** | I | I | **R** | I | **A** | Sales si retraso > 5 días |
| Re-engagement anual (newsletter, invitaciones comunidad) | Content/**R** | I | **A** | I | I | C | Content si > 12 meses sin contacto |

**Momentos de Verdad**: MOT-5 (Sostenible) si autonomía > 80% sostenida 30+ días | MOT-6 (Escalable) si expansión ≥ 2 áreas | MOT-7 (Multiplicador) si ≥ 1 persona capacitada | MOT-8 (Embajador) si referral rate > 25%
**Quality Gate**: Testimonial aprobado; Caso de éxito publicado; Programa referral activo
**Supuestos**: Cliente acepta ser embajador; relación personal positiva; herramientas de tracking funcionales
**Anti-patrón**: Embajador en papel sin activación → fix: SOP-advocacy con check-ins trimestrales

---

## 4. RACI Segmentado: B2C vs B2B

### Diferencias Críticas en Asignación de Roles

#### B2C (Professional, Student, Executive, Autodidact)

| Actividad Clave | Rol Primario | Notas |
|-----------------|------------|-------|
| Prospección | Sales | Ads, content, referral; bajo ticket inicial |
| Diagnóstico | Coach 1:1 | Individual; rápido (1h) |
| Decisión compra | Individual client | Sin comité; decisión rápida |
| Entrega | Coach (1:1 o bootcamp grupal) | MAX 20 personas bootcamp |
| Success | Client Success + Coach async | Responsabilidad compartida |

**Supuestos B2C**: Cliente tiene autonomía decisional; asigna tiempo irregular; presupuesto personal

#### B2B (Small Biz, Enterprise, Corporate)

| Actividad Clave | Rol Primario | Notas |
|-----------------|------------|-------|
| Prospección + Nurturing | Sales + Account Manager | Ciclo 60-90 días; multi-stakeholder |
| Discovery | Coach + Stakeholder Liaison | Mapeo organizacional; múltiples conversaciones |
| Diseño | Coach + Project Owner (cliente) | Alineación ejecutiva; cambio organizacional |
| Decisión compra | Comité (Finance, IT, HR, Business) | Requiere aval ≥2 roles |
| Entrega | Coach + Ops (coordinación logística) | Puede ser cohorte interna; 10-20 personas |
| Success | Account Manager + Coach + Operations | Responsabilidad ejecutiva (sponsor) |

**Supuestos B2B**: Multi-stakeholder; largo ciclo; cambio organizacional; ROI justificado

---

## 5. Matriz de Propiedad de Momentos de Verdad (MOTs)

| MOT | Fase | Actividades Clave | Accountable | Responsable Ejecución | Quality Gate |
|-----|------|-------------------|-------------|----------------------|--------------|
| **MOT-1: Relevancia** | F0→F1 | Lead gen, nurturing, conversión landing | Sales/**A** | Sales + Content | CTR > 3%; Bounce < 40%; Lead BANT calificado |
| **MOT-2: Claridad** | F1→F2 | Diagnóstico, baseline report, roadmap | Coach/**A** | Coach + Tech | NPS diagnóstico ≥ 7; F1→F2 conversión > 60% |
| **MOT-3: Aha!** | F3 (wk 3-4) | Entrega templates, prompts custom, aplicación real | Coach/**A** | Coach + Tech | NPS sesión > 8; ≥1 cambio implementado |
| **MOT-4: Soberanía** | F4 (mes 1) | Autonomy Kit, sostenibilidad, check-in mensual | Client Success/**A** | Client Success + Coach | Autonomía > 80%; NPS ≥ 8; hábitos mantenidos |
| **MOT-5: Sostenible** | F4 (mes 1+) | Autonomy Kit, sostenibilidad, check-in mensual | Client Success/**A** | Client Success + Coach | Autonomía > 80% sostenida 30+ días; NPS ≥ 7 |
| **MOT-6: Escalable** | F4→F5 (1-3 meses) | Expansión a nuevas áreas, replicación de procesos | Client Success/**A** | Coach + Tech | Implementación en ≥ 2 áreas nuevas |
| **MOT-7: Multiplicador** | F5 (ongoing) | Capacitación de pares, documentación interna | Coach/**A** | Content + Client Success | ≥ 1 persona en la organización capacitada |
| **MOT-8: Embajador** | F5 (ongoing) | Caso de éxito, programa referral, comunidad | Leadership/**A** | Content + Client Success + Sales | Referral rate > 25%; ≥1 caso publicado |

---

## 6. Matriz de Escalación

### Criterios de Escalación Automática

| Situación | Responsable Inicial | Escalada a | SLA Respuesta | Acción |
|-----------|-------------------|-----------|---------------|--------|
| Cliente NPS < 5 en sesión | Coach | Leadership + Client Success | 24h | Debriefing calidad; remediación |
| Retraso entrega > 2 días | Responsable tarea | Accountable + Leadership | 24h | Re-priorización; recursos adicionales |
| Conflicto en asignación (cliente vs coach) | Coach | Leadership | 48h | Reasignación o negociación |
| Cliente en riesgo abandono (40%+ sessiones perdidas) | Coach | Client Success + Leadership | 48h | Intervención personal; re-engagement |
| Capacidad coach excedida (>10 clientes F3) | Coach | Leadership | Inmediato | Waitlist; asignar otro coach |
| Disputa contrato/pago | Operations | Leadership | 5 días | Resolución + plan makeup si aplica |
| Error crítico (datos cliente, confidencialidad) | Executor | Leadership + Compliance | Inmediato | Investigación + comunicación cliente |
| Falta Quality Gate (missing artefacto) | Responsable | Accountable | 24h | Fix o plan remediación explicito |

---

## 7. Supuestos Operativos Críticos

Para que esta RACI sea viable, **DEBE cumplirse**:

| Supuesto | Validación | Owner |
|----------|-----------|-------|
| Coaching team staffing: mín 3 coaches (20h c/u = 60h/semana disponible) | Revisión mensual headcount | Leadership |
| Sales team disponible: scouting 40h/semana + account mgmt 10h/semana | Revisión mensual allocation | Leadership |
| CRM (HubSpot) operativo y datos sincronizados F0-F5 | Daily check; alertas si sync > 2h delay | Operations |
| Plataforma bootcamp (LMS) estable: 99.5% uptime | Monitoreo SLA Tech | Tech |
| Herramientas AI base (ChatGPT, Claude, etc.) disponibles y actualizadas | Pre-onboarding check F3 | Tech |
| Cliente asigna 4-8 h/semana en F3 (contrato explícito) | Confirmación sesión 1 F3 | Coach |
| Decisor único o equipo coherente (max 3 personas B2B) | Discovery F1 | Coach + Sales |
| Internet estable cliente | Pre-screening F1 | Sales |
| Feedback loop async funcional (Slack, email, LMS) | Checkeo semanal | Tech + Client Success |
| No dual-hatting extremo (1 persona max 2 roles; excepto leadership) | Revisión trimestral | Leadership |

---

## 8. Anti-Patrones Comunes y Detección

| Anti-Patrón | Síntoma de Detección | Causa Raíz Típica | Fix |
|------------|---------------------|-----------------|-----|
| **Lead desclasificado sin BANT** | Sales descalifica; client reclama | Presión por conversion; BANT no documentado | Entrenamiento Sales + checklist obligatorio |
| **Diagnóstico genérico (copy-paste)** | Cliente dice "aplica a cualquiera" | Prisa; falta investigación | SOP-discovery: mín 1h prep por cliente |
| **Roadmap reutilizado sin adaptación** | Mismo roadmap F2 para clientes distintos | Template no actualizado | Templating + adaptación = 2h por cliente |
| **Coach executa en vez de entrenar** | Cliente no aprende; depende forever | Presión por resultados; baja autonomía | "Enseñar, no hacer" + Autonomy Kit en F4 |
| **NPS sesión no capturado** | Cambio sin validación cliente | Falta disciplina QA | Encuesta inline post-sesión (obligatoria) |
| **Omisión Autonomy Kit** | Cliente entra F4 sin templates | Prisa cierre F3 | Checklist F3→F4 con Kit requerido |
| **Abandono post-F3** | Cliente desaparece; sin check-ins F4 | Sin propiedad clara F4 | Client Success accountable F4 |
| **Referral no atribuido** | Sales no sabe de qué cliente viene | Sin tracking link; falta SOP | Sales active referral program con tracking |
| **Capilla del coach sin escalación** | Coach solo decide; no invoca leadership | Autonomía excesiva; falta governance | RACI explícito + escala automática |
| **Stakeholder B2B dejado atrás** | Comité desalineado; proyecto falla | Comunicación unidireccional | SOP-b2b: map stakeholders F1 + cadencia grupos |

**Detección**: Auditoría trimestral contra RACI; encuestas anónimas equipo; casos perdidos post-venta

---

## 9. Derechos de Decisión (Veto + Desempate)

### Por Fase y Tipo de Decisión

| Decisión | Fase(s) | Veto | Desempate | Documentación |
|----------|---------|------|-----------|-------------|
| Aprobar lead como calificado | F0→F1 | Sales (BANT check) | Leadership si duda | CRM flag + nota razón |
| Avance cliente a siguiente fase | F1→F2, F2→F3, etc. | Coach (quality gate) | Leadership si bloqueo | Criteria checklist firmado |
| Asignar coach a cliente | F2→F3 | Coach (capacidad) | Leadership si conflicto | Allocation sheet con SLA |
| Modificar roadmap mid-F3 | F3 | Coach (clinical call) | Leadership si $ impact | Change log + cliente acta |
| Rebajar precio/hacer excepción | Cualquier | Leadership (**A**) | Finance (si aplica) | Approval form + razón |
| Pasar cliente a "Rechazado" | Cualquier | Leadership + Coach | Leadership si coach objeta | Causal analysis + archivo |
| Activar embajador/caso éxito | F5 | Client (consentimiento) | Leadership si duda | Signed consent + brief |
| Suspender/remover cliente | Cualquier | Leadership (**A**) | Leadership (siempre) | Incident report + comunicación |

---

## 10. Restricciones de Capacidad (Duros + Blandos)

### Límites Duros (NO se puede exceder sin escalación)

| Límite | Razón | SLA Escalación | Remedio |
|--------|-------|-----------------|---------|
| **Max 10 clientes F3 por coach** | Calidad 1:1; fatiga → error | Inmediato (Leadership) | Waitlist o asignar Coach #2 |
| **Max 20 personas bootcamp grupal** | Dinámica grupo; retención | Inmediato (Leadership) | Split a 2 cohortes |
| **Max 1 coach principal B2B** | Claridad accountability | Pre-F3 (Leadership) | Designar 1 principal + soporte |
| **Max 3 idiomas mismo bootcamp** | Eficiencia traducción | Pre-F3 (Coach) | Cohorte separada |
| **SLA respuesta async < 24h** | Retención; NPS | Escalación a Coach si > 2x | Priorizar colas Slack |

### Límites Blandos (Monitoreo + trigger intervención)

| Métrica | Umbral Verde | Umbral Amarillo | Umbral Rojo | Owner |
|---------|------------|-----------------|-----------|-------|
| **F0→F1 conversión** | > 30% | 20-30% | < 20% | Sales |
| **F1→F2 conversión** | > 60% | 45-60% | < 45% | Coach |
| **F3 retención (completar 60%+)** | > 85% | 70-85% | < 70% | Coach + Leadership |
| **NPS sesión promedio** | ≥ 8 | 6-8 | < 6 | Coach |
| **MOT-3 logro (aha! moment)** | > 80% clientes | 60-80% | < 60% | Coach |
| **Referral rate (F5)** | > 25% | 15-25% | < 15% | Client Success |

**Acción Amarillo**: Revisión calidad + plan mejora en 2 semanas
**Acción Rojo**: Escalación Leadership + intervención inmediata

---

## 11. Traceabilidad y Referencias Cruzadas

### Documentos de Referencia (SSOT)

| Artefacto | Ubicación | Version | Owner | Cuando Consultar |
|-----------|----------|---------|-------|-----------------|
| **Service Blueprint v2.1** | experience-design/service-blueprint-general.md | 2.1 | Gobierno Operativo | Criterios fase, MOTs, supuestos |
| **Matriz Journeys v3.0** | experience-design/matriz-journeys-por-segmento.md | 3.0 | Content + Coach | Índice y overview de todas CJs |
| **Customer Journey General v3.0** | experience-design/customer-journey-general.md | 3.0 | Diseño Experiencia | Master journey (J0) aplicable todos |
| **Customer Journey B2C v3.0** | experience-design/customer-journeys-b2c-personas.md | 3.0 | Content + Coach | Detalle P1-P4 + painpoints + revenue |
| **Customer Journey B2B v3.0** | experience-design/customer-journeys-b2b-empresas.md | 3.0 | Sales + Coach | Detalle E1-E3 + stakeholders + escalación |
| **Handoff Protocol v2.1** | experience-design/handoff-protocol.md | 2.1 | Operaciones | Transiciones F0-F5, checklists, QA gates |
| **Assumptions Register v1.0** | experience-design/assumptions-register.md | 1.0 | Diseño Experiencia | Supuestos críticos validados/pendientes |
| **SOP Scouting** | proceso-comercial/*/sop/sop-scouting*.md | 1.0 | Sales | Lead gen, nurturing, calificación |
| **SOP Discovery (Diagnóstico)** | proceso-comercial/*/sop/sop-discovery*.md | 1.0 | Coach | Estructura sesión 1:1, cuestionario |
| **SOP Structuring (Diseño)** | proceso-comercial/*/sop/sop-structuring*.md | 1.0 | Coach + Tech | Roadmap, KPI, ODS |
| **SOP Delivery (Práctica)** | proceso-comercial/*/sop/sop-delivery*.md | 1.0 | Coach | Sesiones, templates, QA |
| **SOP Success (Post-F3)** | proceso-comercial/*/sop/sop-success*.md | 1.0 | Client Success | Check-ins, Autonomy Kit, advocacy |
| **Decision Log v1.0** | experience-design/decision-log.md | 1.0 | Diseño Experiencia / Leadership | Decisiones arquitectura, trade-offs |

### Integración con Otros Procesos

- **Proceso de Aliados** (embajadores, marca blanca): Escalación F5 si client = embajador; compensación en SOP-liquidación
- **Proceso de RH** (contratación coaches): Dimensionamiento equipo vs. capacidad límites aquí
- **Auditoría/Compliance** (AUDITORIA_COMPLIANCE.md): Validación trimestral vs. RACI

---

## 12. Governance y Cambios

### Revisión y Actualización

| Actividad | Frecuencia | Owner | Disparador |
|-----------|-----------|-------|-----------|
| Revisión RACI completa | Trimestral | Leadership | Q-end; cambios operativos > 10% |
| Auditoría de anti-patrones | Mensual | Gobierno Operativo | Casos perdidos; escalaciones > umbral |
| Revisión capacidad límites | Mensual | Leadership + Ops | Backlog o idle time detectado |
| Actualizar SOP si RACI cambia | Ad-hoc | Responsible SOP | Después aprobación cambio RACI |
| Comunicación cambios a equipo | 1 semana post-aprobación | Leadership | Todos los roles impactados |

### Versiones de este Documento

| Versión | Fecha | Cambios | Author |
|---------|-------|---------|--------|
| 1.0 | 2026-03-24 | Inicial; F0-F5 completo; B2C + B2B divergencia; MOTs; anti-patrones; escalación | Gobierno Operativo |

---

## 13. Checklist de Cumplimiento Diario

**Responsables de ejecutar estas validaciones c/día**:

- [ ] Coach: ¿Validé NPS sesión de hoy? ¿Registré en CRM? (MOT-3, F3)
- [ ] Sales: ¿Cuántos leads calificados BANT hoy? ¿Seguimiento < 24h? (F0)
- [ ] Operations: ¿Contratos firmados? ¿Calendarios actualizados? ¿Sync CRM OK? (F2-F3)
- [ ] Client Success: ¿Check-ins F4 agendados para semana? ¿NPS response rate > 50%? (F4-F5)
- [ ] Tech: ¿Plataforma uptime OK? ¿Dashboards actualizados? ¿Prompts custom entregados? (F3)
- [ ] Content: ¿Email nurturing enviado? ¿Caso éxito en production? (F0, F5)
- [ ] Leadership: ¿Escalaciones pendientes < 24h? ¿Capacidad coaches OK? (Governance)

---

**Documento vigente. Consulta Gobierno Operativo o Leadership para excepciones / interpretación.**
