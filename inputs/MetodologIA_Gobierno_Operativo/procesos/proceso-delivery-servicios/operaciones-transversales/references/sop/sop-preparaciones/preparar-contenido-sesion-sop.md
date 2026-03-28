# Preparar Contenido de Sesión — SOP

## Metadata
- **Vehículo**: Operación Transversal (Pre-delivery)
- **Proceso padre**: Operaciones Transversales
- **Frecuencia**: Pre cada sesión de delivery (masterclass, workshop, clínica, mentoría, lab)
- **Owner**: Facilitador asignado (C-Level o Embajador)
- **Última actualización**: 2026-03-24
- **Versión**: 1.0
- **Clasificación**: Operativo-Core

---

## Propósito

Estandarizar la preparación de contenido antes de CUALQUIER sesión de delivery en MetodologIA. Este SOP cubre la cadena completa de preparación para cinco tipos de átomos de aprendizaje:

- **Masterclass**: presentación estructurada (60 min), slides + guía facilitación + pre-work
- **Workshop**: práctico intensivo (60-180 min), ejercicios + herramientas + datasets
- **Clínica IA**: consultoría grupal (60 min), casos reales + prompts + troubleshooting guide
- **Mentoría**: 1:1 personalizada (60 min), agenda adaptada + progress review
- **Lab**: ambiente técnico (120-180 min), sandbox + datasets + instrucciones paso a paso

MetodologIA utiliza arquitectura de **Atom-Molecule-Organism**:

**ATOMS** (unidades atómicas):
- Masterclass (1h)
- Workshop (1h-3h)
- Clínica IA (1h)
- Mentoría (1h)
- Lab (2-3h)

**MOLECULES** (combinaciones de atoms):
- Ciclo Semanal: MC + WS + Clínica
- Sprint Bootcamp: MC + Lab + Workshop intensivo
- Sprint Consultoría: Mentoría + Clínica + Workshop aplicado

**ORGANISMS** (organismos completos):
- Empoderamiento IA (16 semanas)
- Digital Champions (programa anual)
- Consultoría Continua (modular)

Cada átomo requiere preparación específica. Este SOP **estandariza el prep** garantizando consistencia, calidad y adaptabilidad across all atoms y molecules.

---

## 1. SUPUESTOS EXPLÍCITOS (9)

Antes de iniciar preparación, validar que TODOS estos supuestos sean verdaderos:

1. **Sesión programada y confirmada**: fecha, hora, duración en calendario + confirmación de asistentes
2. **Tipo de sesión identificado**: Masterclass | Workshop | Clínica | Mentoría | Lab (determina template + workflow)
3. **Módulo/tema asignado**: alineado a curriculum y producto estratégico (ej: "IA Generativa para RH", "Prompting Avanzado")
4. **Outcomes sesión anterior disponibles**: si es secuencial, resultados/retroalimentación de sesión N-1
5. **Lista de participantes confirmada**: con levels (beginner/intermediate/advanced) y roles
6. **Acceso a plataforma/herramientas validado**: Slack, Zoom, Google Drive, sandbox técnico, LMS
7. **Facilitador tiene expertise**: domain knowledge + experiencia facilitando ese tema específico
8. **Librería de contenido existe**: templates base, frameworks, ejercicios previos, guías de referencia
9. **Ventana T-48h disponible mínimo**: no comprometer con crisis operativas; si <48h, invocar fallback

Si algún supuesto falla: **detener prep** y escalar a Operations Lead.

---

## 2. LÍMITES (Scope)

| Dimension | Incluido | NO incluido |
|-----------|----------|-----------|
| **Inicio temporal** | T-72h (inicio prep contenido) | T-73h o antes (curricular design) |
| **Fin temporal** | T-2h (contenido locked) | T-1h o después (cambios post-lock) |
| **Tipos de sesión** | MC, WS, Clínica, Mentoría, Lab | Otros formatos ad-hoc |
| **Actividades** | diseño contenido, validación, peer review | Facilitar la sesión (facilitar-* SOPs) |
| **Post-sesión** | NO incluido | Análisis, retro, iteration (post-delivery SOPs) |
| **Curricular** | NO: diseño curriculum o programa | Contenido específico sesión |
| **Infraestructura** | Validar acceso (no setup) | Setup plataforma (IT ops) |

**Responsable de límites**: Operations Lead ratifica T-72h window al asignar facilitador.

---

## 3. CRITERIOS DE ACEPTACIÓN (10)

Sesión lista para delivery si y solo si TODOS estos criterios pasan:

| # | Criterio | Validación | Responsable |
|---|----------|-----------|-------------|
| 1 | Slides/materiales listos T-48h | Slides versionadas, peer-reviewed, assets embebidos | Facilitador |
| 2 | Ejercicios testeados y validados | Ran end-to-end, timing probado, soluciones listas | Facilitador |
| 3 | Pre-work diseñado y enviado T-48h | Actividad pre-sesión, max 30 min, envío a cohort | Facilitador |
| 4 | Facilitator guide completado | Timings exactos, transiciones, preguntas clave, notas | Facilitador |
| 5 | Tech requirements documentados | Herramientas, accesos, backups, contingencias | Facilitador |
| 6 | Backup content ready | Si demo falla, pivot plan documentado | Facilitador |
| 7 | Contenido personalizado por cohort | Level-appropriate, contexto empresa si B2B, idioma OK | Facilitador |
| 8 | Accessibility check pass (DUA) | Color contrast, text size, alt text, transcripts | QA Lead |
| 9 | Tiempo estimado = slot | Contenido cabe en duración asignada ±5 min max | Facilitador |
| 10 | Peer review completado | Otro facilitador o C-Level review + sign-off | Peer/C-Level |

**Handoff**: Solo cuando todos 10 criterios = ✓ puede moverse a "Ready for Delivery"

---

## 4. CASOS BORDE (7)

| Caso | Trigger | Protocolo | Escalation |
|------|---------|-----------|-----------|
| **Cambio facilitador last-minute** | <48h antes sesión | Content handoff checklist: sync call 30min, materiales en Drive, facilitator guide walkthrought, cobertura de Q&A anticipated | Ops Lead + new facilitator |
| **Cambio tema <48h** | Pivote curricular | Rapid content pivot: usar template de tema, ejercicios core, pre-work simplified, skip nice-to-haves, self-review (no peer review si time crunch) | C-Level approval |
| **Cohort level inesperado** | Arrived mix de levels | Tiered content: 2-3 versions (básico/intermedio), ejercicios con paths, post-sesión material for catch-up | Facilitador + Mentors |
| **Sesión anterior no se entregó** | Catch-up necesario | Condensed recap (10min): key concepts de N-1, link a recording/slides, ejercicio summary, move forward | Facilitador + Mentoría |
| **Guest speaker se integra** | Guest join 1-2 semanas antes | Integration protocol: briefing call (45min), slot asignado claro en agenda, slides guest + facilitador aligned, practice run con transitions | Facilitador + Speaker |
| **Materiales requieren traducción** | Cohort multiidioma | Translation workflow: inglés primary, simultaneous translation para sesión o pre-translated docs, glossary shared, +30% time budget | Ops Lead + translator |
| **Tools/versiones desactualizadas** | Content references outdated tech | Update protocol: version check 1 semana antes, tools upgrade en sandbox, nuevas screenshots, new walkthroughs, test completamente | Tech Lead + Facilitador |

---

## 5. DECISIONES DE DISEÑO (5)

1. **T-72h start** → Serio prep, no last-minute panic. Obliga planificación real. Owner: Ops Lead (confirma window).

2. **Materials lock T-2h** → Previene tweaking infinito. Qué está locked: slides finales, ejercicios, pre-work, facilitator guide. Qué permite: anotaciones minuto último (~5 notas máximo). Owner: Facilitador.

3. **Peer review mandatory** → QA gate. Otro facilitador o C-Level revisa contenido antes de sesión. Catches: errors, timing issues, alignment gaps, accessibility. Owner: Peer/C-Level designado.

4. **Pre-work siempre incluido** → Activates prior knowledge. Evita "cold start". Máx 30 min, entregado T-48h. Puede ser: video corto, lectura, quiz, ejercicio warm-up. Owner: Facilitador.

5. **Content by atom type, no by program** → Reusabilidad. Masterclass "IA Generativa" = reutilizable en Empoderamiento AND Champions AND Consultoría. Reduces duplication, improves consistency. Owner: Content Library Lead.

---

## 6. ANTI-PATTERNS (Qué NO hacer)

| Anti-Pattern | Impacto | Mitigación |
|--------------|--------|-----------|
| Preparar contenido noche anterior | Calidad baja, no testiado, facilitador stresado | T-72h window, Ops enforces |
| No facilitator guide (improvising) | Incoherencia, timing blown, cohort confused | Guide template + checklist |
| Copy-paste sesión anterior sin adaptación | Desconexión con cohort actual, contexts outdated | Personalization checklist (3 items min) |
| Sin backup plan si tech falla | Demo breaks = sesión compromised | Fallback protocol mandatory |
| Sin pre-work (cold start) | Cohort no activated, low engagement | Pre-work template (30 min max) |

---

## 7. FALLBACKS (Contingencias)

| Contingencia | Criterio Trigger | Protocolo |
|--------------|-----------------|-----------|
| **Librería contenido vacía para tema** | Topic nuevo, no templates disponibles | Crear desde scratch con quality flag. Peer review + QA mandatory. T-72h minimiza este risk. |
| **Peer reviewer no disponible** | Busy o sick | Self-review checklist (12 items, 30 min), C-Level spot-check, reduce scope si necesario |
| **T-48h no cumplido** | Crisis operativa comprime timeline | Compressed prep: T-12h mínimum mandatorio. Skip nice-to-haves. Peer review = self-review checklist. Ops Lead approval. |
| **Materiales requieren traducción última hora** | Cohort multiidioma inesperado | English primary delivery + live translation. Pre-translated docs opcional (slower). +30% budget sesión. |
| **Facilitador no puede preparar contenido** | Illness, otro commitment | Delegate a co-facilitador (con handoff call 1h). O reschedule sesión. Nunca deliver sin prep. |

---

## WORKFLOWS (WF-01 a WF-05)

### WF-01: Preparar Masterclass
**Duración**: 60 min | **Owner**: Facilitador | **T-window**: T-72h a T-2h

**Pasos**:
1. Template masterclass: slide structure (opening, 3-5 core concepts, closing), speaker notes
2. Diseñar pre-work: actividad 20-30 min (video, quiz, reading) enviada T-48h
3. Crear facilitator guide: timings exact, transiciones, 5+ key questions, stories/examples
4. Testear slides: visual check, embebidos assets, video plays, no typos
5. Facilitator guide walkthrough: 1h private run, timing verification
6. Pre-work validation: send to 2-3 cohort members, gather feedback
7. Peer review: otro facilitador lee guide + slides, signs off
8. Materials lock: versión final en Google Drive, read-only access para cohort

**Validar**: slides (✓), pre-work (✓), guide (✓), peer review (✓), timing (✓)

---

### WF-02: Preparar Workshop
**Duración**: 90 min | **Owner**: Facilitador | **T-window**: T-72h a T-2h

**Pasos**:
1. Template workshop: objective clara, 2-3 ejercicios progresivos, herramientas requeridas
2. Diseñar ejercicios: instrucciones claras (step-by-step), archivos template, soluciones
3. Preparar datasets: datos reales o simulados, cleaned, en formato accesible (CSV, JSON, Google Sheets)
4. Test completo: run ejercicios end-to-end, timing por ejercicio, notas de troubleshooting
5. Herramientas checklist: acceso confirmado, permisos OK, sandbox listo
6. Facilitator guide: instrucciones, timing, Q&A anticipated, troubleshooting guide
7. Pre-work: ejercicio warm-up o lectura (máx 20 min)
8. Peer review: otro facilitador valida ejercicios, data, timing
9. Materials lock: ejercicios, datasets, guide en Google Drive

**Validar**: ejercicios (✓), datasets (✓), herramientas (✓), timings (✓), peer review (✓)

---

### WF-03: Preparar Clínica IA
**Duración**: 60 min | **Owner**: Facilitador | **T-window**: T-72h a T-2h

**Pasos**:
1. Casos reales: seleccionar 2-3 casos (de client, de cohort, de portfolio), anonymized si necesario
2. Prompts estructurados: prompt template para cada caso, show bad/good examples
3. Troubleshooting guide: errores comunes, cómo detectar, cómo pivot
4. Facilitator guide: flujo de preguntas, cuándo intervenir, cómo guiar sin dar soluciones
5. Pre-work: caso preview + prompt básico para que intenten antes
6. Test de casos: run cases end-to-end, timing por caso, notas
7. Peer review: otro facilitador valida casos, prompts, guide
8. Materials lock: casos (slides), prompts, troubleshooting guide, recordings ejemplo si hay

**Validar**: casos reales (✓), prompts (✓), guide (✓), timing (✓), peer review (✓)

---

### WF-04: Preparar Mentoría
**Duración**: 60 min | **Owner**: Mentor | **T-window**: T-72h a T-2h

**Pasos**:
1. Agenda personalizada: revisión previa mentee (goals, blockers, progress), temas para sesión
2. Progress review template: qué hizo desde última sesión, qué aprendió, qué blocked
3. Framework consultivo: preguntas Socráticas, reflection prompts, action items
4. Recursos contexto: papers, ejemplos, templates relevantes para goals del mentee
5. Pre-work: mentee prepara 5-10 min notas de progress/blockers
6. Facilitator notes: coach personalization, anticipated challenges, follow-up actions
7. Self-review: mentor valida agenda relevancia, timing, recursos
8. Materials lock: agenda + resources en Drive, acceso mentee

**Validar**: agenda personalizada (✓), resources (✓), framework (✓), notas prep (✓)

---

### WF-05: Preparar Lab
**Duración**: 120-180 min | **Owner**: Facilitador | **T-window**: T-72h a T-2h

**Pasos**:
1. Ambiente técnico: sandbox setup (VM, cloud instance, repo), credenciales, acceso verificado
2. Datasets: archivos en sandbox, versiones correctas, paths documentados
3. Instrucciones paso a paso: screenshots, video walkthrough (5-10 min), docs con pasos
4. Ejercicios graduales: comenzar simple, incrementar complejidad, cada ejercicio 30-45 min
5. Test completo: facilitador run todo el lab, timing total, notas de troubleshooting
6. Troubleshooting guide: errores comunes, cómo debuggear, cuando/cómo pedir help
7. Post-lab resources: documentación, código snippets, fuentes de referencia
8. Pre-work: intro sandbox, login test, environment check (15 min)
9. Peer review: otro facilitador valida setup, ejercicios, timing, guide
10. Materials lock: sandbox access URLs, instrucciones, guide, troubleshooting en Drive

**Validar**: sandbox (✓), datasets (✓), ejercicios (✓), timings (✓), troubleshooting guide (✓), peer review (✓)

---

## CONTENT CHECKLIST POR TIPO DE ÁTOMO

| Item | Masterclass | Workshop | Clínica | Mentoría | Lab |
|------|-------------|----------|---------|----------|-----|
| **Slides/Contenido Visual** | Sí (requerido) | Sí (ejercicios) | Sí (casos) | No | No |
| **Facilitator Guide** | Sí | Sí | Sí | Sí (agenda) | Sí |
| **Pre-work** | Sí | Sí | Sí | Sí | Sí |
| **Ejercicios** | No | Sí (2-3 min) | Sí (2-3 casos) | No | Sí (3-5 ejercicios) |
| **Datasets** | No | Sí (requerido) | No | No | Sí (requerido) |
| **Ambiente Técnico** | No | Opcional | No | No | Sí (requerido) |
| **Troubleshooting Guide** | No | Sí | Sí | No | Sí |
| **Peer Review** | Sí | Sí | Sí | Sí (self-review) | Sí |
| **Timing Validation** | Sí (60 min) | Sí (60-180 min) | Sí (60 min) | Sí (60 min) | Sí (120-180 min) |
| **Backup Content** | Sí | Sí | Sí | No | Sí |

---

## MÉTRICAS DE CALIDAD

| Métrica | Target | Frecuencia | Owner |
|---------|--------|-----------|-------|
| % Content ready T-48h | 100% | Per sesión | Facilitador |
| % Peer review completado | 100% | Per sesión | QA Lead |
| % Facilitator guide quality score | ≥85/100 | Per sesión | Peer reviewer |
| % Pre-work submission rate | ≥70% | Post-sesión | Cohort |
| % Timing accuracy (est vs actual) | ±5 min | Post-sesión | Facilitador |
| % Accessibility pass rate (DUA) | 100% | Per sesión | QA Lead |
| % Content personalization items (min 3) | 100% | Per sesión | Facilitador |
| % Cohort satisfaction (NPS contenido) | ≥8.0/10 | Post-sesión | Analytics |

---

## CONEXIONES CON OTROS SOPS

- **facilitar-masterclass-sop**: ejecución de contenido prep-ready
- **facilitar-workshop-sop**: delivery de workshop con dataset + ejercicios
- **facilitar-clinica-ia-sop**: facilitar casos + prompts durante sesión
- **facilitar-mentoria-sop**: 1:1 con agenda personalizada
- **facilitar-lab-sop**: guiar cohort en sandbox técnico
- **diseño-curricular-sop**: mapea contenido a outcomes; precursor a prep
- **post-delivery-analisis-sop**: analiza calidad contenido entregado
- **content-library-management-sop**: mantiene templates + frameworks
- **accessibility-compliance-sop**: DUA validation
- **platform-tools-setup-sop**: acceso plataforma (precondición)

---

## ECUACIÓN METODOLOÍA

```
Calidad Sesión = (Prep Rigor × Facilitador Expertise × Peer Review × Personalization × Tech Readiness) / (Time Pressure × Scope Creep × Fatiga Facilitador)
```

**Componentes optimizadores**:
- Prep Rigor = T-72h window + artifact checklist (10 items) + fallbacks
- Facilitador Expertise = domain knowledge + facilitation experience (supuesto #7)
- Peer Review = otro set de ojos, QA gate (criterio #10)
- Personalization = 3+ items por cohort (criterio #7, WF design)
- Tech Readiness = acceso validado + backup plans (criterio #5-6, WF-02/WF-05)

**Componentes que introducen riesgo**:
- Time Pressure = <T-48h → compressed prep
- Scope Creep = cambios post-lock (prohibido por design)
- Fatiga Facilitador = acumular muchas sesiones sin descanso

**Objetivo**: Mantener ratio ~3:1 o mejor (3 optimizadores por cada 1 riesgo).

---

## RESPONSABILIDADES

| Rol | Responsabilidad Principal | Inputs Requeridos | Outputs |
|-----|---------------------------|------------------|---------|
| **Facilitador** | Preparar contenido end-to-end | Topic, cohort profile, T-72h window | Slides, ejercicios, guide, pre-work, locked materials T-2h |
| **Peer Reviewer** | QA contenido + sign-off | Materiales facilitador | Checklist review, feedback, sign-off |
| **Operations Lead** | Enforce T-72h window, escalate issues | Calendario sesiones | Confirmación window, escalations |
| **C-Level/Mentor** | Mentoría prep validation | Agenda mentee | Sign-off personalización, context |
| **QA Lead** | Accessibility + compliance | Materiales finales | DUA check pass/fail |
| **Tech Lead** | Tool version + sandbox validation | WF-02/WF-05 reqs | Confirmación tools, datasets, troubleshooting |

---

## PLANTILLAS Y ARTEFACTOS

**Disponibles en Content Library**:
- Masterclass Slide Template (Google Slides)
- Workshop Exercise Template (Google Docs)
- Clínica AI Case Template (Google Docs)
- Mentoría Agenda Template (Google Docs)
- Lab Instructions Template (Markdown)
- Facilitator Guide Template (Google Docs)
- Pre-work Activity Template (Google Forms)
- Peer Review Checklist (Google Sheets)
- Troubleshooting Guide Template (Markdown)
- Accessibility Checklist (Google Sheets)

---

## VERSIÓN Y CONTROL

| Versión | Fecha | Cambio | Author |
|---------|-------|--------|--------|
| 1.0 | 2026-03-24 | Initial SOP con 7 sections + 5 WFs | MetodologIA Ops |

---

**Última revisión**: 2026-03-24
**Próxima revisión**: 2026-06-24 (Q2 learning cycle)
**Dueño de documento**: Operations Lead, MetodologIA Gobierno Operativo
