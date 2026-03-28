# L1 — Plantilla de Ritual

- **Versión:** v1.0.0
- **Estado:** Estándar
- **Tipo:** Plantilla
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## Instrucciones de uso

1. Copiar este archivo completo
2. Reemplazar todos los `<PLACEHOLDER>` con contenido real
3. Eliminar instrucciones entre `<!-- ... -->`
4. Pasar Gold Checklist (L2_A03) antes de publicar

---

<!-- COMIENZA LA PLANTILLA — COPIAR DESDE AQUÍ -->

## Ritual: [NOMBRE]

- **Versión:** v[MAJOR.MINOR.PATCH]
- **Estado:** Hipótesis | Piloto | Validado | Estándar
- **Owner (rol):** [NOMBRE O ROL]
- **Audiencia:** [interno/externo + nivel]
- **Slug:** [kebab-case]
- **Criticidad:** bajo | medio | alto

---

## Brecha que cierra

- **Problema (hoy):** <qué pasa si no existe este ritual>
- **Resultado esperado (observable):** <qué se observará cuando funcione>
- **No-resultados (NO promete):** <mín 3 cosas que este ritual NO hace>

## Principios (máx 10)

1. <principio 1>
2. <principio 2>

## Alcance y límites

- **Cuándo usar (≥3):** *casos* concretos>
- **Cuándo NO usar (≥3):** *casos* concretos>
- **Exclusiones:** <qué está fuera de alcance>
- **Límites de responsabilidad:** <hasta dónde llega este ritual>

## Roles y responsabilidades

| Rol                         | Persona/Equipo | RACI |
| --------------------------- | -------------- | ---- |

| Owner del ritual            | [ROL]          | A    |
| Autor                       | [ROL]          | R    |
| Revisor de calidad          | [ROL]          | C    |
| Usuario final               | [ROL]          | I    |
| Owner del acelerador GenAI  | [ROL]          | R    |
| Revisor de veracidad        | [ROL]          | C    |

## Condiciones operativas (DoR global)

- [ ] Repositorio con control de versiones disponible
- [ ] Formatos de salida: Markdown (.md) + HTML
- [ ] Owner asignado
- [ ] Anexos/fuentes identificados

## Outputs obligatorios (DoD global)

- [ ] Documento Markdown (.md) versionado
- [ ] Documento HTML alineado al .md
- [ ] Al menos 1 acelerador GenAI integrado al workflow
- [ ] Al menos 1 skill asociado (carpeta con `SKILL.md`)
- [ ] Ritual completo en `references/` del skill (rutas espejo)

---

## Juego 0 — Intención

- **Objetivo:** Declarar impacto, brecha, resultado esperado y no-resultados
- **Entradas:** Contexto del ritual
- **Pasos:**
  1. Escribe brecha (hoy vs futuro) en 2 frases
  2. Define resultado esperado (observable)
  3. Lista no-resultados (3–5)
- **Outputs:** Ficha de intención
- **Checklist:** [ ] Brecha clara [ ] No-resultados [ ] Resultado observable

## Juego 1 — Alcance y límites

- **Objetivo:** Prevenir mal uso
- **Entradas:** Ficha de intención
- **Pasos:**
  1. Define 3 casos "cuándo usar"
  2. Define 3 casos "cuándo NO usar"
  3. Define límites de responsabilidad
- **Outputs:** Alcance/no-alcance
- **Checklist:** [ ] Ejemplos concretos [ ] Límites explícitos

## Juego 2 — Condiciones

- **Objetivo:** Asegurar ejecutabilidad en entorno real
- **Entradas:** Herramientas, canales, cadencia, roles
- **Pasos:**
  1. Declara repositorio y formatos
  2. Declara roles (ritual + IA)
  3. Declara política de datos (si no existe, crear borrador mínimo)
- **Outputs:** Condiciones operativas
- **Checklist:** [ ] Repo + roles + formatos [ ] Datos

## Juego 3 — Secuencia ejecutable

- **Objetivo:** Convertir insumos en ritual declarado
- **Entradas:** Anexos + contexto
- **Pasos:**
  1. Diagnóstico de materiales
  2. Banco de evidencia: verdades operativas + trade-offs
  3. Estándares
  4. Construcción de juegos 0–10
  5. Producción de outputs obligatorios
  6. Diseño del acelerador GenAI
  7. Creación del skill asociado
- **Outputs:** Ritual completo + skill(s) + acelerador
- **Checklist:** [ ] Pasos numerados [ ] Outputs por paso [ ] Skill creado

## Juego 4 — Gate de calidad

- **Objetivo:** Validar sin debate
- **Criterios de gate:**
  - Claridad operativa: 2/3 personas lo ejecutan sin dudas
  - Verificabilidad: checklists completos
  - DoD: outputs obligatorios + skill + acelerador integrado
  - Trazabilidad: decisiones explícitas
  - Seguridad: riesgos y límites de datos explícitos
- **Evidencia mínima:** .md + .html + 1 ejecución registrada + acelerador + skill + references
- **Outputs:** Aprobado / No aprobado + fixes

## Juego 5 — Instrumentación

- **Objetivo:** Medir adopción, calidad e impacto
- **Pasos:**
  1. Define 3 métricas leading y 2 lagging
  2. Define registro único (bitácora)
  3. Define señales tempranas y acciones correctivas
- **Outputs:** Registro y métricas

## Juego 6 — Aprendizaje (AAR)

- **Objetivo:** Mejora continua
- **Preguntas AAR:**
  1. ¿Qué se suponía que debía pasar?
  2. ¿Qué pasó realmente?
  3. ¿Por qué hubo diferencia?
  4. ¿Qué cambiaremos?
- **Outputs:** Lecciones + ≤3 experimentos

## Juego 7 — Packaging

- **Objetivo:** Versión interna vs divulgable
- **Pasos:**
  1. Genera versión interna (.md + .html + skill)
  2. Genera versión divulgable (más corta, mismos invariantes)
  3. Cierra con CTA
- **Outputs:** Dos versiones

## Juego 8 — Powered by GenAI

- **Objetivo:** Amplificar el ritual sin romper el método
- **Entregables GenAI (mín 1):**
  - Prompt Library: nombre, propósito, input/output, variables, antipatrón
  - Asistente/Copiloto: rol, límites, guardrails, verificación
  - Notebook: fuentes, preguntas canónicas, actualización
- **DoD Juego 8:** Existe ≥1 acelerador, tiene owner + límites + veracidad + integración al workflow

## Juego 9 — Sostenibilidad

- **KSF (5–9):** [factores clave de éxito]
- **Risk Register (top 10):** [riesgo → mitigación]
- **Acciones proactivas (3–7):** [acciones]

## Juego 10 — Excelencia, Adopción y Evolución

- **DoD reforzada (checklist final):**
  - [ ] .md versionado
  - [ ] .html alineado
  - [ ] Acelerador GenAI integrado
  - [ ] Skill con references espejo
  - [ ] Gate aprobado + Adversarial+ ejecutado
  - [ ] Changelog actualizado
- **Hábitos mínimos (5):** [disparador → acción]
- **Ruta de madurez:** Hipótesis (1 ejecución) → Piloto (5 ejecuciones) → Validado (métricas estables) → Estándar (90 días + auditoría)

---

## Handoff (YAML)

```yaml
ritual_name: "[NOMBRE]"
slug: "[kebab-case]"
version: "v[X.Y.Z]"
status: "[Hipótesis|Piloto|Validado|Estándar]"
owner_role: "[...]"
definition_of_done:

  - "[output 1]"
  - "[output 2]"
changelog:

  - "v[X.Y.Z] — [qué cambió]"

```

---

## Changelog

- v[X.Y.Z] — [qué cambió] / [por qué] / [quién]

<!-- FIN DE LA PLANTILLA -->
