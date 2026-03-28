# L2 — A-01: Paso a Paso Detallado

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Tipo:** Anexo
- **Ritual padre:** Declarar un Ritual (Meta-Ritual) — `declarar-un-ritual` v1.0.0

---

## 0) Pre-flight (2–5 min)

### Checklist de entrada (DoR)

Debes tener:

- [ ] `name` + `slug` (kebab-case)
- [ ] `status` inicial (Hipótesis o Piloto)
- [ ] `criticality` (bajo/medio/alto)
- [ ] DRI/Owner + backup
- [ ] Anexos/fuentes (o "sin fuentes")

**Si falta alguno → detén. No empieces sin DoR.**

### Pasos pre-flight

1. **Abrir plantilla** → Copiar `L1_PLANTILLA_RITUAL.md`
2. **Llenar metadata** → nombre, versión, estado, owner, slug, criticidad
3. **Listar insumos** → qué anexos/fuentes tienes disponibles
4. **Mover estado** → Hipótesis (si es nuevo) o Piloto (si ya se ejecutó informalmente)

**Output:** Archivo .md con metadata y lista de insumos. Estado = Hipótesis.

---

## 1) Juegos 0–2: Intención + Alcance + Condiciones (15–30 min)

### Pasos — Definición Inicial

1. **Juego 0 — Intención:**
   - Escribe brecha en 2 frases (hoy vs futuro)
   - Define resultado esperado observable
   - Lista 3–5 no-resultados
2. **Juego 1 — Alcance:**
   - 3 casos "cuándo usar" con ejemplos
   - 3 casos "cuándo NO usar" con ejemplos
   - Límites de responsabilidad
3. **Juego 2 — Condiciones:**
   - Declara repo, formatos (.md + .html), roles
   - Declara espejo Skills ⇄ Rituales
   - Declara política de datos (o "pendiente: SUPUESTO")

**Output:** Secciones Juego 0–2 completas. Cada una con checklist interno marcado.

---

## 2) Juego 3: Secuencia ejecutable (30–60 min)

### Pasos — Construcción Técnica

1. **Diagnóstico por insumo:**
   - Para cada anexo/fuente: ¿qué aporta? ¿qué falta?
   - Marcar SUPUESTOS explícitamente
2. **Banco de evidencia:**
   - 10–15 verdades operativas
   - Trade-offs explícitos (ej: "veracidad > velocidad")
3. **Estándares:**
   - Principios (≤10)
   - Checklist verificable
   - Antipatrones (señal → corrección)
4. **Construir Juegos 0–10** para el ritual objetivo
5. **Producir .md** (usando plantilla)
6. **Diseñar acelerador GenAI mínimo** (≥1 prompt con input/output/variables/antipatrón)
7. **Crear skill asociado:**
   - Carpeta kebab-case
   - SKILL.md con frontmatter
   - references/ con ritual completo (espejo)

**Output:** Borrador completo del ritual + skill + acelerador.

---

## 3) Juego 4: Gate de calidad (15–20 min)

### Pasos — Validación Crucial

1. **Aplicar Gold Checklist (A-03)** — 12 ítems
2. **Para cada "No pasa":** definir 1 acción + dueño + fecha
3. **Verificar DoD global:**
   - [ ] .md versionado
   - [ ] .html alineado (o plan de generación)
   - [ ] Acelerador GenAI con owner + límites + integración
   - [ ] Skill con SKILL.md + references espejo
4. **Ejecutar Adversarial+ ligero** (5 vectores: ambigüedad, edge cases, contradicciones, estrés, seguridad)
5. **Registrar hallazgos y fixes**

**Output:** Gate aprobado (o fixes pendientes con owner). Evidencia adjunta.

---

## 4) Juegos 5–7: Instrumentación + Aprendizaje + Packaging (15–20 min)

### Pasos — Operativo y Packaging

1. **Juego 5:** 3 métricas leading + 2 lagging + bitácora definida
2. **Juego 6:** Si ya hubo ejecución, AAR con 4 preguntas + ≤3 experimentos
3. **Juego 7:** Versión interna lista; si aplica, versión divulgable con apertura empática + CTA

**Output:** Métricas, registro, y packaging definidos.

---

## 5) Juegos 8–10: GenAI + Sostenibilidad + Excelencia (20–30 min)

### Pasos — Sostenibilidad y AI

1. **Juego 8:** Verificar que el acelerador está integrado al workflow (cuándo/cómo/qué verificar)
2. **Juego 9:** KSF (5–9) + Risk Register (top 10) + acciones proactivas
3. **Juego 10:**
   - DoD reforzada (checklist final completo)
   - 5 hábitos mínimos (disparador → acción)
   - Ruta de madurez con criterios de transición
   - Changelog actualizado

**Output:** Ritual completo. Listo para gate final.

---

## 6) Cierre y publicación (5–10 min)

### Pasos — Publicación Final

1. **Pasar Gold Checklist final** (A-03)
2. **Actualizar handoff.yaml** con versión, estado, DoD
3. **Commit al repositorio** con mensaje descriptivo
4. **Generar .html** (si aplica al momento)
5. **Sincronizar espejo** Rituales → Skills/references
6. **Registrar en bitácora** la ejecución completa

**Output:** Ritual publicado. Estado = Piloto (primera vez) o Validado (con evidencia suficiente).

---

## Tiempo total estimado

| Fase | Tiempo |
| --- | --- |

| Pre-flight | 2–5 min |
| Juegos 0–2 | 15–30 min |
| Juego 3 | 30–60 min |
| Juego 4 (Gate) | 15–20 min |
| Juegos 5–7 | 15–20 min |
| Juegos 8–10 | 20–30 min |
| Cierre | 5–10 min |
| **Total** | **~1.5–3 horas** |

---

## Changelog

- v1.0.0 — Paso a paso limpio alineado a meta-ritual v1.0 y L0 Glosario
