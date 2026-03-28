# L0 — Glosario Canónico

- **Versión:** v1.1.0
- **Estado:** Estándar
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## Regla de uso

Todo artefacto del sistema **MetodologIA Gobierno Operativo** DEBE usar estos términos tal como están definidos aquí. Si un término no aparece, se agrega aquí primero, luego se usa.

---

## Términos

| # | Término | Definición canónica | Notas |
| --- | --- | --- | --- |

| 1 | **Ritual** | Procedimiento operativo repetible, verificable, sostenible y divulgable. Estructura: Juegos 0–10. | NO es inspiración ni hábito aislado |
| 2 | **Meta-ritual** | Ritual que declara cómo declarar otros rituales. Se auto-aplica. | Fuente de verdad: L2_META_RITUAL |

| 3 | **SOP** (Standard Operating Procedure) | Procedimiento estándar paso a paso con DoR, DoD, SLAs, evidencias y excepciones. Más estrecho que un ritual. | Un ritual puede contener ≥1 SOPs |
| 4 | **Skill** | Carpeta con `SKILL.md` que hace activable un ritual/SOP por IA. Contiene instrucciones, `references/`, checklists, antipatrones y changelog. | Capa AI-native |

| 5 | **Skill Blueprint** | Blueprint meta para crear, evaluar y mantener skills. Define estructura, QA, versionado y ciclo de vida de skills. | Anteriormente "SKULL". Skill del skill |
| 6 | **Documento Canónico de Proceso** | Fuente de verdad del proceso que gobierna SOPs/skills. Declara propósito, alcance, RACI, flujo, métricas, riesgos y versionado. | Capa de gobierno |

| 7 | **Juego** | Fase numerada (0–10) within a ritual. Each game has objective, inputs, steps, outputs, checklist, metrics, risks and mitigations. | 0=Intención, 10=Excelencia |
| 8 | **Gate** | Punto de control con criterios observables, evidencia mínima y umbral de aprobación. Si no pasa, no avanza. | Binario: pasa / no pasa |

| 9 | **Gold Checklist** | Checklist canónico de publicación (12 ítems). Gate humano que complementa la validación automatizada. | L2_A03 |
| 10 | **DoR** (Definition of Ready) | Condiciones mínimas que DEBEN cumplirse ANTES de iniciar un paso, juego o proceso. | Bloquea inicio si falta algo |

| 11 | **DoD** (Definition of Done) | Criterios observables que definen "terminado" sin debate. Outputs obligatorios. | Bloquea cierre si falta algo |
| 12 | **Acelerador GenAI** | Activo de IA generativa (prompt, copiloto, notebook, agente) integrado al workflow de un ritual con owner, límites, veracidad y guía de uso. | Mínimo 1 por ritual |

| 13 | **Espejo / Mirror** | Regla: `references/` del repo de Skills refleja las rutas y contenido del repo de Rituales. Una sola realidad operativa. | Mecanismo: SUPUESTO (submodule, symlink o script) |
| 14 | **Handoff** | Documento YAML con metadata operativa: asset, ownership, gates, DoD, métricas, riesgos, changelog. Permite transferencia sin contexto oral. | Archivo `handoff.yaml` |

| 15 | **Adversarial+** | Validación obligatoria contra 5 vectores: ambigüedad, edge cases, contradicciones, estrés, seguridad. | Sin hallazgos severidad alta = apto |
| 16 | **AAR** (After Action Review) | Retrospectiva post-ejecución con 4 preguntas: ¿Qué debía pasar? ¿Qué pasó? ¿Por qué la diferencia? ¿Qué cambiaremos? | Cada ejecución deja 1 AAR |

| 17 | **Plantilla** | Estructura reutilizable para capturar información y estandarizar outputs. Contiene secciones, placeholders e instrucciones. | L1_PLANTILLA_* |
| 18 | **Estándar** | Regla verificable de calidad mínima o excelencia, con intención, criterio observable, métrica y antipatrón. | 18 estándares mínimos en v0.9 |

| 19 | **Checklist** | Lista de verificación basada en observables. Cada ítem es binario (pasa/no pasa) y requiere evidencia. | Diferente de "lista de tareas" |
| 20 | **Métrica leading** | Indicador adelantado que predice resultados futuros (ej: adherencia, % gate aprobado 1ª). | Actúa antes del resultado |

| 21 | **Métrica lagging** | Indicador de resultado pasado (ej: reducción de retrabajo, tiempo de ciclo). | Confirma después del resultado |
| 22 | **RACI** | Responsible (ejecuta) / Accountable (rinde cuentas) / Consulted (opina) / Informed (se le notifica). | Máx 1 Accountable por artefacto |

| 23 | **DRI** (Directly Responsible Individual) | Persona específica con autoridad y responsabilidad final sobre un artefacto o decisión. | Sinónimo de Owner en contexto MetodologIA |
| 24 | **Ruta de madurez** | Progresión de estados: Hipótesis → Piloto → Validado → Estándar → Deprecado. Cada transición requiere evidencia. | DA-03 |

| 25 | **Prompt Maestro / CREATE** | Spec-prompt autocontenido para ser usado con IA generativa. Es un artefacto auxiliar, NO un ritual canónico. | DA-04 |
| 26 | **Bitácora** | Registro cronológico de ejecuciones con timestamps, decisiones, hallazgos y outputs. | Evidencia para transiciones de estado |

| 27 | **KSF** (Key Success Factors) | Factores clave de éxito (5–9) que determinan la sostenibilidad de un ritual. | Juego 9 |
| 28 | **CTA** (Call To Action) | Acción siguiente clara y específica que se le pide al lector/usuario. | Obligatorio en versión divulgable |

| 29 | **ENTRUSTED** | Framework de 15 dimensiones de calidad (Claridad, Precisión, Profundidad, Coherencia, Valor, entre otras) usado en el Excellence Loop para evaluar artefactos. Escala 1–10. | Fuente: Governance PDF §Excellence Loop |
| 30 | **Excellence Loop** | Ciclo de mejora: Hipótesis → Piloto → Validado → Estándar. Incluye scoring con ENTRUSTED. Piloto→Validado requiere Score >9.0; Validado→Estándar requiere 10/10 + Adversarial+. Score <8.0 = bloqueo + revisión manual. | Fuente: Governance PDF |

| 31 | **Paquete Mínimo Publicable** | Requisito de publicación: 5 componentes obligatorios — (1) Encabezado de Autoridad, (2) Ficha Rápida 60s, (3) Definición sin Confusiones, (4) Criterios de Éxito/DoD, (5) Casos Borde. | Fuente: Governance PDF |
| 32 | **HITL** (Human-in-the-Loop) | Modelo de 4 roles de gobernanza: Autor (redacción), Orchestrator (cumplimiento de flujo), Revisor/IA (Excellence Loop + ENTRUSTED), Dueño (aprobación final + riesgo). | Fuente: Governance PDF |

| 33 | **Regla de Autoridad Documental** | El documento canónico es la única fuente de verdad contractual. Los anexos son puramente de soporte y no pueden contradecir al documento principal. | Fuente: Governance PDF |
| 34 | **Gatear-Caminar-Correr** | Hoja de ruta de madurez operativa: Gatear (Piloto) = bajo riesgo/experiencia; Caminar (Iteración) = estabilizar proceso; Correr (Escala) = autonomía + Zero-Hallucination. | Fuente: Governance PDF |

| 35 | **RAG-First Architecture** | Principio: todo Skill debe tener trazabilidad documental. El Documento Operativo y su System Prompt correspondiente están vinculados bidireccionalmente. Skill Espejo = reflejo de la verdad operativa. | Fuente: Governance PDF |
| 36 | **DCRL** | Detect → Clarify → Resolve → Learn. Protocolo para cerrar ambigüedad: detectar señal ambigua, clarificar con preguntas dirigidas, resolver con decisión explícita, aprender preferencias. | Fuente: v0.7.1 §KB03 |

| 37 | **TAC** (Trust–Accuracy Correlation) | Correlación entre confianza percibida por el usuario y exactitud real del sistema/output. Métrica de calibración para pilotos GenAI. | Fuente: v0.7.1 §KB08 |
| 38 | **TCE** (Trust Calibration Error) | Diferencia entre la confianza del usuario y la fiabilidad real del sistema. Se busca minimizar. | Fuente: v0.7.1 §KB08 |

| 39 | **Void Pattern** | Patrón obligatorio en RAG: si no hay evidencia/datos, mostrar explícitamente el hueco y el siguiente paso para recolectar la información faltante. Prohibido rellenar. | Fuente: v0.7.1 §KB08 |
| 40 | **Paradox UI** | Patrón obligatorio en RAG: si hay conflicto entre fuentes, mostrar vista "Versus" con ambas posiciones y exigir decisión explícita. Prohibido ocultar el conflicto. | Fuente: v0.7.1 §KB08 |

| 41 | **Niveles de incertidumbre** | 4 niveles operativos para GenAI/RAG: Nivel 1 (ambiental/informativo), Nivel 2 (marcadores/badges), Nivel 3 (inspección/auditoría bajo demanda), Nivel 4 (forzamiento cognitivo/Uncertainty Gate). Criticidad gobierna nivel aplicable. | Fuente: v0.7.1 §KB08 |

---

## Changelog

- v1.1.0 — Ampliado de 28 a 41 términos. Integra hallazgos de Governance PDF (ENTRUSTED, Excellence Loop, Paquete Mínimo Publicable, HITL, Regla de Autoridad Documental, Gatear-Caminar-Correr, RAG-First Architecture) y v0.7.1 (DCRL, TAC, TCE, Void Pattern, Paradox UI, Niveles de incertidumbre). Renombrado SKULL → Skill Blueprint
- v1.0.0 — Glosario inicial con 28 términos canónicos
