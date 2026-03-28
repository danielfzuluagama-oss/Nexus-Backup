# L1 — Skill Blueprint v0

- **Versión:** v0.1.0
- **Estado:** Hipótesis
- **Tipo:** Skill Blueprint
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## Propósito

El Skill Blueprint define **cómo crear, evaluar y mantener skills**. Es el "skill del skill": un blueprint meta que garantiza consistencia, calidad y operabilidad en toda la capa AI-native.

## Definiciones (ref: L0_GLOSARIO)

- **Skill** = carpeta con `SKILL.md` que hace activable un ritual/SOP por IA
- **Skill Blueprint** = blueprint meta para crear/mantener skills

---

## 1. Estructura de carpeta obligatoria

```text
[skill-slug]/                      # kebab-case
├── SKILL.md                       # OBLIGATORIO — instrucciones del skill
├── references/                    # OBLIGATORIO — fuentes de verdad
│   └── rituales/                  # Mirror del repo de Rituales
│       └── [ruta-espejo]/
│           ├── [ritual].md
│           └── anexos/
├── assets/                        # OPCIONAL — imágenes, diagramas
└── scripts/                       # OPCIONAL — automatizaciones
```

**Regla de espejo:** `references/` refleja las rutas del repo de Rituales. Si el ritual cambia en el repo fuente, se sincroniza aquí (ver SOP de sincronización).

## 2. SKILL.md — Frontmatter obligatorio

```yaml
---
name: "[kebab-case]"

description: "[1–2 frases: qué hace y cuándo usarlo]"
metadata:
  version: "v[X.Y.Z]"
  status: "Hipótesis | Piloto | Validado | Estándar | Deprecado"
  owner: "[nombre o rol]"
  ritual_padre: "[slug del ritual que este skill activa]"
  created: "[YYYY-MM-DD]"
  updated: "[YYYY-MM-DD]"
---
```

## 3. SKILL.md — Secciones obligatorias

### 3.1 Instrucciones

```markdown
## Instrucciones

1. [paso 1]
2. [paso 2]
3. [paso 3]

- No avances si falta información crítica; pide anexos
- Produce outputs obligatorios según el ritual padre
```

### 3.2 Referencias

```markdown
## Referencias


- Ritual padre: `references/rituales/[ruta]/[ritual].md`
- Anexos: `references/rituales/[ruta]/anexos/`
```

### 3.3 Checklists

```markdown
## Checklists

### Ejecución

- [ ] Inputs completos
- [ ] Pasos numerados ejecutados
- [ ] Outputs generados

### Calidad (Gate)

- [ ] Evidencia mínima adjunta
- [ ] Criterios verificados
- [ ] Fixes aplicados

```

### 3.4 FAQ

```markdown
## FAQ


- **P:** [pregunta frecuente]
- **R:** [respuesta]
```

### 3.5 Antipatrones

```markdown
## Antipatrones

| Señal     | Corrección  |
| --------- | ----------- |

| [señal 1] | [qué hacer] |
```

### 3.6 Changelog

```markdown
## Changelog


- v[X.Y.Z] — [qué cambió] / [por qué]

```

## 4. Checklist de calidad del skill (QA)

Antes de declarar un skill como Piloto, debe pasar:

| #  | Check                                                             | Pasa  |
| -- | ----------------------------------------------------------------- | ----- |

| 1  | `SKILL.md` existe con frontmatter completo                        | [ ]   |
| 2  | `name` es kebab-case y único                                      | [ ]   |
| 3  | `description` describe cuándo usar (triggers)                     | [ ]   |
| 4  | `references/` contiene el ritual completo                         | [ ]   |
| 5  | Rutas en `references/` son espejo del repo de Rituales            | [ ]   |
| 6  | Instrucciones son pasos numerados y accionables                   | [ ]   |
| 7  | Checklists de ejecución y calidad existen                         | [ ]   |
| 8  | Al menos 1 antipatrón documentado                                 | [ ]   |
| 9  | Changelog tiene al menos 1 entrada                                | [ ]   |
| 10 | Se ha ejecutado al menos 1 vez con IA y el resultado fue correcto | [ ]   |

**Regla:** ≥8/10 = apto para Piloto. 10/10 = apto para Validado.

## 5. Ciclo de vida del skill

```text
[Hipótesis] → 1 ejecución correcta → [Piloto] → 5 ejecuciones → [Validado] → 90 días estable → [Estándar]
                                                                                                    ↓
                                                                                              [Deprecado]
```

- **Hipótesis:** Skill creado, no probado
- **Piloto:** Probado 1 vez con resultado correcto
- **Validado:** 5+ ejecuciones, QA ≥8/10, feedback incorporado
- **Estándar:** 90 días sin fallos, auditoría pasada
- **Deprecado:** Reemplazado o ya no aplica. Se archiva, no se elimina

---

## Changelog

- v0.1.0 — Skill Blueprint v0 inicial
