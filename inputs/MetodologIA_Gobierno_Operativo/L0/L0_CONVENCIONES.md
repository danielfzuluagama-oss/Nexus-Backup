# L0 — Convenciones y Estándares de Evidencia

- **Versión:** v1.0.0
- **Estado:** Estándar
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## 1) Naming de archivos

- **Patrón:** `LAYER_TIPO_NOMBRE_vX.Y.Z.md`
  - Ejemplos: `L2_META_RITUAL_DECLARAR_UN_RITUAL_v1.0.md`, `L1_PLANTILLA_SOP.md`
- **Slugs:** kebab-case para identificadores internos (ej: `declarar-un-ritual`)
- **Extensiones:** `.md` (fuente de verdad), `.html` (lectura), `.yaml` (config/handoff)
- **Prohibido:** espacios en nombres de archivo, caracteres especiales, `(1)` suffixes

## 2) Versionado semántico (SemVer)

- **Formato:** `vMAJOR.MINOR.PATCH` (ej: `v1.2.3`)
- **MAJOR:** Reestructura secciones fundamentales o rompe compatibilidad con plantillas/procesos existentes
- **MINOR:** Agrega contenido, secciones o reglas sin romper lo existente
- **PATCH:** Correcciones, clarificaciones, typos, mejoras de redacción
- **Regla:** Todo cambio → línea en changelog del artefacto. Sin changelog, no se publica

## 3) Estructura de carpetas

```text
MetodologIA_Gobierno_Operativo/
├── meta/     # Decisiones, deprecación, índice, README
├── L0/       # Fundamentos (glosario, convenciones)
├── L1/       # Plantillas base (ritual, SOP, canónico, SKULL v0)
├── L2/       # Artefactos fundacionales v1 (meta-ritual, SOPs, SKULL v1, anexos)
├── L3/       # Gobierno operativo (RACI, cadencias, métricas)
├── L4/       # Consolidación (post-piloto)
└── piloto/   # Ejecución piloto (bitácora, AAR)
```

## 4) Formato de evidencia

Cada claim, gate o decisión que requiera evidencia debe incluir al menos UNO de:

| Tipo | Formato | Ejemplo |
| --- | --- | --- |

| Link | URL clickable | `https://repo.example.com/commit/abc123` |
| Path | Ruta relativa al repo | `L2/L2_A01_PASO_A_PASO.md#juego-3` |
| Ticket | ID de ticket/issue | `JIRA-1234` o `GH-issue#42` |
| Captura | Screenshot con fecha | `evidencia/2026-02-14_gate_aprobado.png` |
| Bitácora | Entrada en bitácora con timestamp | `piloto/PILOTO_BITACORA.md#2026-02-14` |

**Regla:** Si no hay evidencia, el ítem cuenta como "No pasa" en cualquier gate.

## 5) Formato de SUPUESTO

Cuando falta información y se toma una decisión provisional:

```markdown
SUPUESTO: [Descripción de lo que se asume]

- Validar con: [quién y cómo]
- Fecha límite: [cuándo]
- Si se invalida: [acción alternativa]

```

**Regla:** Los SUPUESTOS se registran como riesgos abiertos hasta que se validan.

## 6) Formato de changelog

Cada artefacto incluye al final:

```markdown
## Changelog


- vX.Y.Z — [Qué cambió] / [Por qué] / [Quién]
- vX.Y.W — [Qué cambió] / [Por qué] / [Quién]
```

**Regla:** Orden cronológico descendente (más reciente arriba). Sin changelog → no se publica.

## 7) Formato de metadata (header)

Todo artefacto comienza con:

```markdown
# [Título del artefacto]


- **Versión:** vX.Y.Z
- **Estado:** Hipótesis | Piloto | Validado | Estándar | Deprecado
- **Owner:** [Nombre o rol]
- **Fecha:** YYYY-MM-DD
```

## 8) Idioma y estilo

- **Idioma:** Español claro, accionable
- **Siglas:** Siempre expandidas al primer uso (ej: "DoD (Definition of Done)")
- **Pasos:** Siempre numerados
- **Listas:** Bullets para opciones; números para secuencias
- **Prohibido:** Narrativa sin acciones, tablas decorativas sin datos, "excelencia" sin observables

---

## Changelog

- v1.0.0 — Convenciones iniciales (8 reglas)
