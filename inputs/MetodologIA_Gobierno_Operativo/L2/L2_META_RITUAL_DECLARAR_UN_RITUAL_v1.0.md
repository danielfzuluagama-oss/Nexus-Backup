# Meta-Ritual MetodologIA: Declarar un Ritual

- **Versión:** v1.1.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Audiencia:** Equipos internos que diseñan, operan y publican rituales; versión divulgable opcional
- **Slug:** `declarar-un-ritual`
- **Criticidad:** alto
- **Fecha:** 2026-02-14
- **Regla de Autoridad:** Este documento es la fuente de verdad contractual. Los anexos (A-01, A-02, A-03) son de soporte y no pueden contradecirlo

---

## Propósito

Convertir conocimiento difuso (anexos + contexto) en un **ritual operable** (AI-native), con **estructura por Juegos (0–10)**, control documental, gobernanza liviana y fricción mínima.

¿Quieres que un procedimiento sea repetible aunque cambie la persona que lo ejecuta? No se logra con "documentación bonita". Se logra con **contratos claros + gates verificables + evidencia mínima + mejora continua**.

---

## Brecha que cierra

- **Problema (hoy):** Rituales inconsistentes según quién los ejecuta; falta estándar operable y capa de activación AI-native
- **Resultado esperado:** Cualquier equipo declara un ritual repetible, verificable y activable por IA siguiendo este meta-ritual
- **No-resultados:**
  1. NO sustituye la estrategia ni la toma de decisiones
  2. NO automatiza procesos que no están definidos
  3. NO garantiza adopción sin hábitos y onboarding
  4. NO define la política de datos para IA (dependencia externa)

---

## Principios (10)

1. Método primero; herramienta después
2. Intención antes que intensidad
3. Todo ritual tiene alcance y no-alcance
4. Pasos ejecutables, siempre numerados
5. Todo gate tiene evidencia mínima verificable
6. DoD define terminado sin debate
7. Medición con señales tempranas (leading) y resultados (lagging)
8. IA amplifica: límites, veracidad, escalamiento a humano
9. Versionado + changelog como parte del método
10. AI-native exige capa de activación: skills con references espejadas

---

## Alcance y límites

- **Cuándo usar:**
  1. Declarar un nuevo ritual/procedimiento desde cero
  2. Formalizar un procedimiento informal que ya se ejecuta
  3. Actualizar un ritual existente a una nueva versión
- **Cuándo NO usar:**
  1. Crear un prompt/acelerador GenAI SIN procedimiento asociado (→ otro ritual)
  2. Documentar una política o estrategia (→ otro formato)
  3. Definir métricas organizacionales sin procedimiento (→ dashboard)
- **Límites:** Este meta-ritual declara cómo declarar rituales. No declara aceleradores GenAI ni skills de forma aislada

---

## Roles y responsabilidades

### RACI operativo

| Rol                        | RACI | Responsabilidad                    |
|----------------------------|------|------------------------------------|
| Owner del ritual           | **A**| Rinde cuentas del ritual completo  |
| Autor                      | **R**| Ejecuta la declaración             |
| Revisor de calidad         | **C**| Valida gate y Adversarial+         |

| Usuario final              | **I**| Ejecuta el ritual declarado        |
| Owner del acelerador GenAI | **R**| Crea y mantiene el acelerador      |
| Revisor de veracidad       | **C**| Valida outputs de IA               |

### Modelo HITL de gobernanza (4 roles)

> Fuente: Governance PDF §Roles de Gobernanza

| Rol HITL | Función | Qué valida |
| --- | --- | --- |

| **Autor** | Redacción | Crea el borrador del artefacto |
| **Orchestrator** | Cumplimiento de flujo | Asegura que el flujo de publicación (Draft → Excellence Loop → Review → Publish) se respete |

| **Revisor/IA** | Excellence Loop + ENTRUSTED | Evalúa contra las 15 dimensiones ENTRUSTED. Score <8.0 = bloqueo |
| **Dueño** | Aprobación final + riesgo | Decisión final: APPROVED / REJECTED. Asume el riesgo del artefacto publicado |

---

## Condiciones operativas (DoR global)

- [ ] `name` + `slug` (kebab-case)
- [ ] `status` inicial (Hipótesis o Piloto)
- [ ] `criticality` (bajo/medio/alto)
- [ ] DRI/Owner + backup
- [ ] Anexos/fuentes identificados (o "sin fuentes")
- [ ] Repositorio con control de versiones disponible

---

## Outputs obligatorios (DoD global)

- [ ] Documento Markdown (.md) versionado
- [ ] Documento HTML alineado al .md
- [ ] Al menos 1 acelerador GenAI integrado al workflow
- [ ] Al menos 1 skill asociado (carpeta con `SKILL.md`)
- [ ] Ritual completo en `references/` del skill (rutas espejo)
- [ ] Gate aprobado con evidencia mínima

---

## Juegos 0–10

> Cada juego incluye objetivo, entradas, pasos, outputs, checklist, métricas, riesgos y mitigaciones. Para pasos detallados de cada juego, ver **Anexo A-01 (Paso a Paso)**.

### Juego 0 — Intención

- **Objetivo:** Declarar impacto, brecha, resultado esperado y no-resultados
- **Entradas:** Contexto del ritual (problema, audiencia, entorno, restricciones)
- **Pasos:**
  1. Escribe brecha (hoy vs futuro) en 2 frases
  2. Define resultado esperado (observable)
  3. Lista no-resultados (3–5)
- **Outputs:** Ficha de intención
- **Checklist:** brecha clara; no-resultados; resultado observable
- **Métricas:** Claridad (1–5); retrabajo por alcance
- **Riesgos:** Objetivo vago → exigir ejemplos de uso/no uso (Juego 1)

### Juego 1 — Alcance y límites

- **Objetivo:** Prevenir mal uso
- **Entradas:** Ficha de intención
- **Pasos:**
  1. Define 3 casos "cuándo usar"
  2. Define 3 casos "cuándo NO usar"
  3. Define límites de responsabilidad
- **Outputs:** Alcance/no-alcance
- **Checklist:** Ejemplos concretos; límites explícitos
- **Métricas:** % ejecuciones fuera de alcance
- **Riesgos:** Scope creep → no-alcance obligatorio

### Juego 2 — Condiciones

- **Objetivo:** Asegurar ejecutabilidad en entorno real
- **Entradas:** Herramientas, canales, cadencia, roles
- **Pasos:**
  1. Declara repositorio con control de versiones
  2. Declara formatos obligatorios: .md + .html
  3. Declara repos y espejo (Rituales: fuente de verdad; Skills: capa de activación)
  4. Declara roles (ritual + IA)
  5. Declara política de datos (si no existe: crear borrador mínimo)
- **Outputs:** Condiciones operativas
- **Checklist:** Repo + roles + formatos + espejo + datos
- **Métricas:** Tiempo para encontrar el ritual; tiempo para actualizar; divergencias entre repos
- **Riesgos:** "Dos verdades" → regla de espejo + revisión periódica

### Juego 3 — Secuencia ejecutable

- **Objetivo:** Convertir insumos en ritual declarado + capa AI-native
- **Entradas:** Anexos + contexto
- **Pasos:**
  1. Diagnóstico de materiales (por insumo)
  2. Banco de evidencia: verdades operativas + trade-offs
  3. Estándares (principios + checklist + antipatrones)
  4. Construcción de juegos 0–10 para el ritual objetivo
  5. Producción de outputs: .md + .html
  6. Diseño del acelerador GenAI mínimo
  7. Creación del skill asociado (SKILL.md + references espejo)
- **Outputs:** Ritual completo + skill(s) + acelerador GenAI
- **Checklist:** Pasos numerados; outputs por paso; skill creado; references completas
- **Métricas:** Tiempo total; bloqueos; divergencias
- **Riesgos:** References incompletas → gate lo bloquea

### Juego 4 — Gate de calidad

- **Objetivo:** Validar sin debate
- **Criterios de gate:**
  - Claridad operativa: 2/3 personas lo ejecutan sin dudas críticas
  - Verificabilidad: checklists y observables completos
  - DoD: outputs obligatorios + skill + acelerador integrado
  - Trazabilidad: decisiones y trade-offs explícitos
  - Seguridad: riesgos y límites de datos explícitos
- **Evidencia mínima:** .md + .html + 1 ejecución registrada + acelerador + skill + references
- **Outputs:** Aprobado / No aprobado + fixes requeridos
- **Checklist:** Ver Anexo A-03 (Gold Checklist 12 ítems)
- **Paquete Mínimo Publicable** (5 componentes obligatorios para publicación):
  1. **Encabezado de Autoridad** — metadata: nombre, versión, estado, owner, criticidad, fecha
  2. **Ficha Rápida 60s** — resumen ejecutivo que permite entender el artefacto en ≤60 segundos
  3. **Definición sin Confusiones** — qué ES y qué NO ES, sin ambigüedad
  4. **Criterios de Éxito / DoD** — observables que definen "terminado"
  5. **Casos Borde** — excepciones y edge cases documentados
- **Flujo de publicación:** Draft → Excellence Loop → Review → Owner Approval → Publish (APPROVED / REJECTED)

### Juego 5 — Instrumentación

- **Objetivo:** Medir adopción, calidad e impacto
- **Pasos:**
  1. Define 3 métricas leading y 2 lagging
  2. Define registro único (bitácora de ejecuciones)
  3. Define señales tempranas y acciones correctivas
- **Outputs:** Registro y métricas definidos
- **Métricas leading:** Adherencia; % gate aprobado 1ª; uso correcto del acelerador
- **Métricas lagging:** Reducción de retrabajo; tiempo de ciclo
- **Riesgos:** Medir demasiado → mínimo viable de medición

### Juego 6 — Aprendizaje (AAR)

- **Objetivo:** Mejora continua
- **Entradas:** Bitácora de ejecución
- **Preguntas AAR:**
  1. ¿Qué se suponía que debía pasar?
  2. ¿Qué pasó realmente?
  3. ¿Por qué hubo diferencia?
  4. ¿Qué cambiaremos?
- **Outputs:** Lecciones + decisiones + ≤3 experimentos
- **Riesgos:** Retro sin acción → exigir "próximo experimento"

### Juego 7 — Packaging

- **Objetivo:** Versión interna vs divulgable
- **Pasos:**
  1. Genera versión interna (.md + .html + skill)
  2. Genera versión divulgable (más corta, mismos invariantes)
  3. Apertura divulgable: pregunta retórica empática + "Spoiler alert: No es X. Es Y."
  4. Cierra con CTA
- **Outputs:** Dos versiones
- **Riesgos:** Divulgable pierde rigor → invariantes no se tocan

### Juego 8 — Powered by GenAI

- **Objetivo:** Amplificar el ritual con GenAI sin romper el método
- **Principio:** IA amplifica; si el proceso está roto, amplifica el error

#### Tabla criticidad → nivel de incertidumbre

> Fuente: v0.7.1 §KB08

| Criticidad | Nivel | Comportamiento |
| --- | --- | --- |

| **Baja** | 1–2 | Informativo: señales ambientales + badges (Hecho/Inferencia/Especulación) |
| **Media** | 2–3 | Marcadores + auditoría bajo demanda (overlay de fuentes) |

| **Alta** | 4 | Forzamiento cognitivo: Uncertainty Gate + confirmación explícita con parámetros |

#### Patrones obligatorios (RAG)

- **Void Pattern:** Si no hay evidencia/datos → muestra explícitamente el hueco + siguiente paso para recolectar. Prohibido rellenar
- **Paradox UI:** Si hay conflicto entre fuentes → vista "Versus" con ambas posiciones + decisión explícita. Prohibido ocultar
- **DCRL:** Detect → Clarify → Resolve → Learn. Protocolo para cerrar ambigüedad en tiempo real

#### Entregables GenAI (mín 1)

- **Prompt Library:** nombre, propósito, input/output, variables, ejemplo, antipatrón, cuándo NO usar
- **Asistente/Copiloto:** rol, límites, guardrails, flujo, veracidad, escalamiento. Incluye DCRL + niveles de incertidumbre
- **Notebook:** fuentes, preguntas canónicas, checklist veracidad, actualización
- **DoD Juego 8:** Existe ≥1 acelerador; tiene owner + límites + veracidad + integración al workflow
- **Riesgos:** Alucinación → checklist de veracidad + escalamiento; datos sensibles → política de datos; confianza mentirosa → prohibida (antipatrón)

#### Métricas GenAI

- **TAC** (Trust–Accuracy Correlation): medir en pilotos GenAI
- **TCE** (Trust Calibration Error): minimizar diferencia entre confianza percibida y fiabilidad real

### Juego 9 — Sostenibilidad y Abundancia

- **KSF (7):** Autonomía; Adherencia; Calidad; Veracidad; Seguridad; Mantenimiento; AI-native

#### Risk Register operativo (top 10)

1. Ritual ambiguo → checklists + ejemplos
2. HTML desalineado → mecanismo de sync
3. Acelerador huérfano → ownership obligatorio
4. IA inventa → veracidad + revisión
5. Falta de adopción → hábitos + onboarding
6. Estrés → mínimos innegociables
7. Fuga de datos → política de datos
8. Cambios sin control → gobernanza
9. Espejo roto (skills vs rituales) → verificación de rutas + owner de sync
10. Medición inexistente → métricas mínimas

#### Riesgos de gobernanza (4 patrones nombrados)

> Fuente: Governance PDF §Risk Register

| Riesgo | Patrón | Mitigación |
| --- | --- | --- |

| **Coleccionista Reactivo** | FOMO: acumular rituales/SOPs sin uso real | Sustracción Estratégica: eliminar antes de agregar |
| **Náufrago Digital** | Herramientas obsoletas acumuladas | Revisión Semestral: auditar y deprecar |

| **Ambigüedad Contractual** | Anexos contradicen al documento maestro | Regla de Autoridad Documental: canónico = verdad |
| **Alucinación Operativa** | Procesos irreales o imposibles de ejecutar | Zero-Hallucination: estándar de realismo operativo |

- **Acciones proactivas:** Publicar Piloto primero; prueba de autonomía con 3 perfiles; bitácora obligatoria; chequeo de espejo en cada release

### Juego 10 — Excelencia, Adopción y Evolución

- **DoD reforzada (checklist final):**
  - [ ] .md versionado
  - [ ] .html alineado
  - [ ] Acelerador GenAI integrado
  - [ ] Skill con references espejo (RAG-First Architecture)
  - [ ] Gate aprobado + Adversarial+ ejecutado (0 hallazgos severidad alta)
  - [ ] Changelog actualizado
  - [ ] Paquete Mínimo Publicable completo (5 componentes)

#### Excellence Loop (ciclo de mejora continua)

> Fuente: Governance PDF §Excellence Loop

Ciclo: **Hipótesis → Piloto → Validado → Estándar**

| Transición | Umbral ENTRUSTED | Condición adicional |

| --- | --- | --- |
| Piloto → Validado | Score > 9.0 | 5 ejecuciones + prueba de autonomía |

| Validado → Estándar | 10/10 | + Adversarial+ aprobado + 90 días estable |
| **Bloqueo** | Score < 8.0 | Bloqueo automático + revisión manual obligatoria |

| Refinamiento automático | Score 9.0–9.9 | Iteración ENTRUSTED sin intervención humana |

**15 dimensiones ENTRUSTED:** Claridad, Precisión, Profundidad, Coherencia, Valor (y 10 más según el framework completo).

#### Hoja de ruta Gatear-Caminar-Correr

> Fuente: Governance PDF §Madurez

| Etapa | Fase | Objetivo | Criterio de salida |
| --- | --- | --- | --- |

| **Gatear** | Piloto | Bajo riesgo, ganar experiencia | 1 ejecución E2E + bitácora |
| **Caminar** | Iteración | Estabilizar proceso, resolver edge cases | 5 ejecuciones + métricas estables |

| **Correr** | Escala | Autonomía operativa + Zero-Hallucination | 90 días + auditoría + adopción alta |

- **Hábitos mínimos (5):**
  1. Terminar jornada → actualizar bitácora (2 min)
  2. Cierre semanal → revisar métricas
  3. Publicar cambio → actualizar changelog
  4. Usar acelerador → checklist de veracidad
  5. Falla gate → AAR + fix
- **Onboarding:** 1 semana: 1 ritual + 1 skill + gate. 1 mes: 2 rituales + acelerador + medir impacto

#### KPIs operativos

> Fuente: Governance PDF §KPIs

| KPI | Métrica | Objetivo |
| --- | --- | --- |

| KPI-01 Velocidad | Tiempo de ciclo (de inicio a publicación) | ≤300 segundos |
| KPI-02 Calidad | Conformidad con plantilla canónica | 100% |
| KPI-03 Trazabilidad | Vinculación documental RAG-First | 100% |
| KPI-04 Adopción | Evidencia de Uso Real (no solo declaración) | Uso documentado |

---

## 18 Estándares mínimos

Cada estándar: Intención → Criterio observable → Métrica → Antipatrón.

1. **Identidad versionada** — nombre + versión + estado + owner visibles → % rituales con owner → doc huérfano
2. **Doble formato IA-ready** — .md y .html sincronizados → tiempo de sync → HTML desactualizado
3. **Brecha y no-resultados** — problema→resultado+no-resultados → retrabajo por expectativas → promete todo
4. **Alcance y no-alcance** — 3 "cuándo usar" + 3 "cuándo no" → % ejecuciones fuera → "sirve para todo"
5. **Roles y ownership** — owner ritual + owner acelerador → tiempo desbloqueo → "todos son responsables"
6. **Procedimiento ejecutable** — pasos numerados + output/paso → tasa finalización → narrativa sin acciones
7. **Gate con evidencia** — criterios + evidencia + umbral → % gate 1ª → aprobación informal
8. **DoD reforzada** — DoD por juegos críticos → defectos post-pub → "cuando se sienta bien"
9. **Métricas leading/lagging** — ≥3 leading + 2 lagging → consistencia medición → solo vanidosas
10. **Registro y trazabilidad** — bitácora ejecuciones + decisiones → % registradas → chats sueltos
11. **Riesgos y señales tempranas** — top 10 con mitigación → incidentes prevenidos → "no va a pasar"
12. **Adversarial+ obligatorio** — 5 vectores probados → 0 hallazgos alta → publicar sin stress test
13. **Acelerador GenAI mínimo** — ≥1 activo entregado → reducción fricción → "solo documento"
14. **Acelerador integrado al workflow** — cuándo/cómo dentro del ritual → % uso correcto → prompt sin contexto
15. **Packaging divulgable** — versión divulgable con CTA → tasa adopción → intraducible
16. **Evolución controlada** — versionado + changelog + gobernanza → tiempo hallazgo→fix → cambios sin control
17. **Skill asociado** — SKILL.md + descripción clara → activación correcta → ritual sin skill
18. **Espejo de references** — references contiene ritual+anexos espejo → divergencias = 0 → references incompletas
19. **Acrónimos aclarados** — cada acrónimo aparece como SIGLA (expansión) en primer uso → 0 acrónimos sin aclaración por documento → siglas opacas

---

## Trade-offs explícitos

> Fuente: v0.7.1 §3.3

| Trade-off | Regla |
| --- | --- |

| Transparencia vs carga | Por defecto Nivel 1–2. Subir a Nivel 3–4 solo por criticidad o señal de riesgo |
| Velocidad vs veracidad | Aceptar fricción extra cuando reduce riesgo crítico |
| Automatización vs agencia | Acciones irreversibles exigen confirmación explícita y/o escalamiento humano |

---

## Excepciones y casos borde (Top 5)

> Fuente: Governance PDF §Excepciones

| Señal | Acción |
| --- | --- |

| Restricción IT | Generar spec agnóstica de plataforma |
| Datos sensibles | Aplicar anonimización antes de procesar |
| No-show (participante) | Reprogramar + fee si aplica |

| Cambio de canal | Recalibrar el ritual al nuevo canal |
| Fallo en quality gate | Bloquear publicación + revisión manual |

---

## Taxonomía mínima (ref: L0_GLOSARIO)

| Concepto | Definición operativa |
| --- | --- |

| Estrategia | Dirección y elecciones para lograr un resultado |
| Proceso | Flujo con etapas (qué pasa y en qué orden) |
| Procedimiento | Instrucciones paso a paso (cómo hacerlo) |
| Checklist | Verificación basada en observables |
| Plantilla | Estructura para capturar info y estandarizar outputs |
| Estándar | Regla verificable de calidad mínima/excelencia |
| Skill | Paquete (carpeta) que hace activable un workflow por IA |

---

## Anexos (archivos separados)

- **A-01:** Paso a paso detallado → `L2_A01_PASO_A_PASO.md`
- **A-02:** SIPOC (1 página) → `L2_A02_SIPOC.md`
- **A-03:** Gold Checklist (12 ítems) → `L2_A03_GOLD_CHECKLIST.md`

---

## Consciencia de lo que sigue

Este meta-ritual declara el procedimiento para declarar procedimientos y habilita la capa AI-native con skills. El siguiente paso natural: declarar un ritual hermano — **"Declarar un Acelerador"** — con el mismo rigor.

> Este documento cierra en Piloto cuando se ejecuta al menos una vez end-to-end con: .md + .html + acelerador integrado + skill con references espejo, y se registra evidencia en bitácora.

---

## Changelog

- v1.1.0 — Integra contenido de Governance PDF (HITL roles, Excellence Loop con ENTRUSTED scoring, Paquete Mínimo Publicable, flujo de publicación, KPIs, 4 riesgos nombrados, Gatear-Caminar-Correr, Regla de Autoridad Documental, excepciones/casos borde) y v0.7.1 (criticidad→niveles de incertidumbre, Void/Paradox/DCRL, TAC/TCE, trade-offs, 19° estándar de acrónimos). Glosario alineado a v1.1.0
- v1.0.0 — Versión canónica fusionando v0.9 (contenido) + v1.4 (estructura modular). Alineada a L0 Glosario y L0 Convenciones
