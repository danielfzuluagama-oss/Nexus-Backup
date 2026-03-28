# L2 — Skill Blueprint v1

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Fecha:** 2026-02-14

---

## Propósito

El Skill Blueprint v1 define **cómo crear, evaluar, versionar, sincronizar y deprecar skills**. Es el blueprint meta que garantiza consistencia, calidad y operabilidad en toda la capa AI-native. Evolución del v0 con: ejemplo concreto, QA reforzado (Adversarial+), procedimiento de deprecación, y alineación al governance PDF (Excellence Loop, ENTRUSTED, RAG-First).

## Definiciones (ref: L0_GLOSARIO v1.1.0)

- **Skill** = carpeta con `SKILL.md` que hace activable un ritual/SOP por IA
- **Skill Blueprint** = blueprint meta para crear/mantener skills (anteriormente "SKULL")
- **RAG-First Architecture** = todo Skill tiene trazabilidad documental bidireccional con su ritual padre
- **Espejo / Mirror** = `references/` refleja las rutas y contenido del repo de Rituales

---

## 1. Estructura de carpeta obligatoria

```text
<skill-slug>/                      # kebab-case
├── SKILL.md                       # OBLIGATORIO — instrucciones del skill
├── references/                    # OBLIGATORIO — fuentes de verdad
│   └── rituales/                  # Mirror del repo de Rituales
│       └── <ruta-espejo>/
│           ├── <ritual>.md
│           └── anexos/
│               ├── A01_*.md
│               ├── A02_*.md
│               └── A03_*.md
├── assets/                        # OPCIONAL — imágenes, diagramas
├── scripts/                       # OPCIONAL — automatizaciones
└── examples/                      # OPCIONAL — outputs de ejemplo
```

**Regla de espejo:** `references/` refleja EXACTAMENTE las rutas del repo de Rituales. Sincronización via `SOP: Sincronizar Espejo` (L2_SOP_SINCRONIZAR_ESPEJO.md). Divergencias permitidas = 0.

## 2. SKILL.md — Frontmatter obligatorio

```yaml
---
name: "<kebab-case>"

description: "<1–2 frases: qué hace y cuándo usarlo>"
metadata:
  version: "v<X.Y.Z>"
  status: "Hipótesis | Piloto | Validado | Estándar | Deprecado"
  owner: "<nombre o rol>"
  ritual_padre: "<slug del ritual que este skill activa>"
  criticality: "bajo | medio | alto"
  created: "<YYYY-MM-DD>"
  updated: "<YYYY-MM-DD>"
  deprecated: "<YYYY-MM-DD o null>"
  replaced_by: "<slug del skill sucesor o null>"
---
```

**Campos nuevos en v1:** `criticality`, `deprecated`, `replaced_by`.

## 3. SKILL.md — Secciones obligatorias

### 3.1 Instrucciones

Pasos numerados y accionables que la IA ejecuta:

```markdown
## Instrucciones

1. <paso 1 — acción concreta>
2. <paso 2 — acción concreta>
3. <paso 3 — acción concreta>

### Guardrails

- No avances si falta información crítica; pide anexos
- Produce outputs obligatorios según el ritual padre
- Si generas contenido con incertidumbre: aplica Void Pattern (muestra el hueco)
- Si encuentras conflicto entre fuentes: aplica Paradox UI (muestra ambas posiciones)
```

### 3.2 Referencias

```markdown
## Referencias


- Ritual padre: `references/rituales/<ruta>/<ritual>.md`
- Anexos: `references/rituales/<ruta>/anexos/`
- Sincronización: `L2_SOP_SINCRONIZAR_ESPEJO.md`

```

### 3.3 Checklists

```markdown
## Checklists

### Ejecución

- [ ] Inputs completos (DoR del ritual padre verificado)
- [ ] Pasos numerados ejecutados en orden
- [ ] Outputs generados según DoD del ritual padre

### Calidad (Gate)

- [ ] Evidencia mínima adjunta
- [ ] Criterios verificados contra Gold Checklist
- [ ] Adversarial+ ejecutado (0 hallazgos severidad alta)
- [ ] Fixes aplicados si hubo hallazgos

### Veracidad (si GenAI/RAG)

- [ ] Void Pattern aplicado donde falta evidencia
- [ ] Paradox UI aplicado donde hay conflicto
- [ ] Nivel de incertidumbre apropiado a criticidad

```

### 3.4 FAQ

```markdown
## FAQ


- **P:** ¿Cuándo uso este skill vs ejecutar el ritual manualmente?
- **R:** <respuesta específica al skill>

- **P:** ¿Qué hago si references/ está desactualizado?
- **R:** Ejecutar SOP Sincronizar Espejo antes de usar el skill
```

### 3.5 Antipatrones

```markdown
## Antipatrones

| Señal | Corrección |
| ----- | ---------- |

| Usar skill sin verificar references/ | Ejecutar sync antes |
| Rellenar huecos de información | Aplicar Void Pattern |
| Ocultar conflictos entre fuentes | Aplicar Paradox UI |
| Publicar skill sin test funcional | Mínimo 1 ejecución correcta |
| Skill sin owner | Asignar owner antes de publicar |
```

### 3.6 Changelog

```markdown
## Changelog


- v<X.Y.Z> — <qué cambió> / <por qué>

```

## 4. Checklist de calidad del skill (QA) — 14 ítems

Antes de declarar un skill como Piloto, debe pasar:

| # | Check | Pasa |
| --- | ----- | ---- |

| 1 | `SKILL.md` existe con frontmatter completo (todos los campos) | [ ] |
| 2 | `name` es kebab-case y único en el catálogo | [ ] |
| 3 | `description` describe cuándo usar (triggers claros) | [ ] |
| 4 | `criticality` definida (bajo/medio/alto) | [ ] |
| 5 | `references/` contiene el ritual completo + anexos | [ ] |

| 6 | Rutas en `references/` son espejo verificado del repo de Rituales | [ ] |
| 7 | Instrucciones son pasos numerados y accionables | [ ] |
| 8 | Guardrails incluyen Void Pattern y Paradox UI | [ ] |
| 9 | Checklists de ejecución, calidad y veracidad existen | [ ] |
| 10 | Al menos 2 antipatrones documentados | [ ] |
| 11 | FAQ tiene al menos 2 entradas | [ ] |
| 12 | Changelog tiene al menos 1 entrada | [ ] |
| 13 | Se ha ejecutado al menos 1 vez con IA y el resultado fue correcto | [ ] |
| 14 | Adversarial+ ejecutado con 0 hallazgos severidad alta | [ ] |

**Regla de transición:**

| Transición | Requisito QA | Requisito ENTRUSTED |

| ---------- | ------------ | ------------------- |
| Hipótesis → Piloto | ≥10/14 QA checks | Score > 8.0 |
| Piloto → Validado | ≥12/14 QA checks + 5 ejecuciones | Score > 9.0 |

| Validado → Estándar | 14/14 QA checks + 90 días estable | 10/10 + Adversarial+ |

## 5. Ciclo de vida del skill

```text
[Hipótesis] → 1 ejecución OK → [Piloto] → 5 ejecuciones → [Validado] → 90 días → [Estándar]
                                                                                        ↓
                                                                                   [Deprecado]
```

### Estados

| Estado | Significado | Criterio de entrada | Criterio de salida |
| ------ | ----------- | ------------------- | ------------------ |

| **Hipótesis** | Skill creado, no probado | SKILL.md + references/ existen | 1 ejecución correcta |
| **Piloto** | Probado, funciona | QA ≥10/14, 1 test OK | 5 ejecuciones, QA ≥12/14 |

| **Validado** | Consistente y confiable | 5+ ejecuciones, feedback incorporado | 90 días sin fallos, auditoría |
| **Estándar** | Producción, uso general | QA 14/14, ENTRUSTED 10/10 | Deprecación formal |

| **Deprecado** | Reemplazado o ya no aplica | Decisión del Owner + registro | — (archivado) |

### Procedimiento de deprecación

1. **Declarar:** Owner decide deprecar. Documenta razón y fecha en frontmatter (`deprecated`, `replaced_by`)
2. **Notificar:** Informar a todos los usuarios del skill. Indicar el skill sucesor (si existe)
3. **Período de gracia:** 30 días donde ambos skills (viejo y nuevo) coexisten
4. **Archivar:** Mover a carpeta `archive/` del catálogo. NO eliminar — mantener para referencia histórica
5. **Registrar:** Entrada en changelog: `vX.Y.Z — DEPRECADO: <razón>. Sucesor: <slug>`

## 6. Versionado del skill

Usa versionado semántico (semver):

| Tipo | Cuándo | Ejemplo |
| ---- | ------ | ------- |

| **Major** (X.0.0) | Cambio breaking: reestructura de instructions, cambio de ritual padre | v1.0.0 → v2.0.0 |
| **Minor** (X.Y.0) | Nueva funcionalidad compatible: nuevo antipatrón, nueva FAQ, mejora de guardrails | v1.0.0 → v1.1.0 |

| **Patch** (X.Y.Z) | Fix de bug, corrección de typo, actualización de references sin cambio funcional | v1.0.0 → v1.0.1 |

**Regla:** Todo cambio requiere entrada en changelog con: qué cambió + por qué.

---

## 7. Ejemplo concreto: Skill "Declarar un Ritual"

```yaml
---
name: "declarar-un-ritual"

description: "Activa el meta-ritual para declarar un nuevo ritual. Usar cuando se necesita crear un ritual desde cero, formalizar uno informal, o actualizar a nueva versión."
metadata:
  version: "v1.0.0"
  status: "Piloto"
  owner: "Steward de Coherencia MetodologIA"
  ritual_padre: "declarar-un-ritual"
  criticality: "alto"
  created: "2026-02-14"
  updated: "2026-02-14"
  deprecated: null
  replaced_by: null
---
```

### Estructura real

```text
declarar-un-ritual/
├── SKILL.md
├── references/
│   └── rituales/
│       └── declarar-un-ritual/
│           ├── L2_META_RITUAL_DECLARAR_UN_RITUAL_v1.0.md
│           └── anexos/
│               ├── L2_A01_PASO_A_PASO.md
│               ├── L2_A02_SIPOC.md
│               └── L2_A03_GOLD_CHECKLIST.md
└── examples/
    └── ritual-ejemplo-output.md
```

### Instrucciones (extracto)

1. Lee el meta-ritual completo desde `references/`
2. Solicita al usuario: nombre del ritual, problema, audiencia, entorno, restricciones
3. Ejecuta Juegos 0–10 en orden, produciendo outputs por juego
4. Aplica Gold Checklist (12 ítems) antes de cerrar
5. Genera handoff.yaml con metadata operativa
6. Si usa GenAI/RAG: aplica tabla criticidad→incertidumbre y patrones Void/Paradox

### QA resultado: 12/14 (Piloto)

- Pendientes: FAQ con 2 entradas (solo tiene 1), Adversarial+ formal (ejecutado informal)

---

## Changelog

- v1.0.0 — Skill Blueprint v1. Evolución del v0: agrega criticality en frontmatter, guardrails Void/Paradox/DCRL, QA reforzado (14 ítems vs 10), procedimiento de deprecación, versionado semver detallado, ejemplo concreto (skill "Declarar un Ritual"), reglas de transición con ENTRUSTED scoring, checklist de veracidad para GenAI/RAG
- v0.1.0 — Skill Blueprint v0 inicial (L1)
