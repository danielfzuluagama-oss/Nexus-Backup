---
name: scaffolding-recursivo-metodologia
description: Define y gobierna la arquitectura de sub-repos recursivos para Procesos, SOPs y Rituales en MetodologIA. Sovereign v4.0 con ruta dual.
metadata:
  version: v2.0.0
  status: Sovereign v4.0
  criticality: alto
---

# 066-scaffolding-recursivo-metodologia v2.0.0 (Sovereign v4.0)

Este skill garantiza que la **Fractalidad del Conocimiento** se mantenga en todo el repositorio. Ningún activo vive aislado; cada uno es un ecosistema.

## 1. Rutas Válidas (Dual Pattern)

### Ruta A: Sub-repo anidado (Legacy, válido)

Cada carpeta de activo (`proceso`, `sop`, `ritual`) en `procesos/proceso-comercial/` contiene:

```
procesos/proceso-comercial/<canal>/
├── <verbo>-<canal>-proceso.md
├── meta/knowledge-graph.md
└── references/
    ├── caracterizacion.md
    └── sop/<sop-id>/
        ├── <verbo>-<sop>-sop.md
        ├── meta/knowledge-graph.md
        └── references/rituales/<ritual-id>/
            └── <ritual-id>.md
```

### Ruta B: Ritual Network v4.0 (Nueva, canónica para runbooks)

La red de 8 segmentos × 18 rituales usa la nueva jerarquía plana:

```
rituales/<segmento>/
├── MANIFIESTO.md
└── <journey>/
    └── <proceso>/
        └── sop-XX-<sop-slug>/
            └── XX-<ritual-slug>.md
```

### Cuándo usar cada ruta

| Ruta | Cuándo usar |
| :--- | :--- |
| **Ruta A** | Procesos existentes en `procesos/proceso-comercial/` que ya tienen rituales desplegados |
| **Ruta B** | Nuevos rituales de la red 8×18 en `rituales/` con IDs canónicos 01–18 |

## 2. Estructura Mandatoria por Nivel

### Nivel L1 (Proceso) — Orquesta fases

1. **Archivo Core:** `<verbo>-<sustantivo>-<aclaratorio>-proceso.md`
2. **meta/:** `knowledge-graph.md`
3. **references/:** Caracterización + SOPs hijos

### Nivel L2 (SOP) — Explica el "Cómo"

1. **Archivo Core:** `sop-XX-<slug>.md` (Ruta B) o `<verbo>-<sop>-sop.md` (Ruta A)
2. **meta/:** `knowledge-graph.md`
3. **Rituales hijos:** Sub-carpetas con IDs canónicos

### Nivel L3 (Ritual) — Ejecución atómica

1. **Archivo Core:** `XX-<ritual-slug>.md` (Ruta B, formato runbook v4.0)
2. **Formato:** 10 macro + 30 micro-pasos (ver `TEMPLATE_RITUAL_RUNBOOK.md`)
3. **Es el nivel final de recursividad carpeta.**

## 3. Naming Rules (Innegociables)

| Regla | Ejemplo válido | Ejemplo prohibido |
| :--- | :--- | :--- |
| kebab-case | `captar-senal-demanda` | `CaptarSenalDemanda` |
| Verbo primero | `calificar-lead-b2c` | `lead-b2c-calificacion` |
| Sin sufijo `-ritual` en Ruta B | `01-captar-senal-demanda.md` | `01-captar-senal-demanda-ritual.md` |
| ID numérico al inicio (Ruta B) | `01-captar-senal.md` | `captar-senal-01.md` |
| Nombres genéricos prohibidos | `vender-empresas-b2b-proceso.md` | `proceso.md` |

## 4. Protocolo de Registro

Cada sub-repo debe ser registrado en:

1. **`MANIFIESTO.md`** del segmento (Ruta B) — tabla con ID, journey, proceso, sop, ritual-slug, path
2. **`INDICE_MAESTRO.md`** del repo raíz — para trazabilidad global
3. **`repositorio-canonico.json`** — para inventario automatizado

## 5. Guardrails de Atomicidad

- **Un archivo, un activo.** Prohibido mezclar proceso + SOP en un solo archivo.
- **Fractalidad consistente.** Si un SOP tiene rituales, estos viven como sub-carpetas (Ruta A) o archivos con ID (Ruta B).
- **No huérfanos.** Todo ritual tiene un SOP padre. Todo SOP tiene un proceso padre.

## 6. Changelog

- v2.0.0 — **Sovereign v4.0 Upgrade**: Ruta dual (A legacy + B v4.0), naming con IDs canónicos 01–18, template reference, protocolo de registro en MANIFIESTO.md.
- v1.0.0 — Versión inicial. Estructura mandatoria fractal.

---
Powered by MetodologIA Governance Protocol
