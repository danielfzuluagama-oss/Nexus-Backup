---
name: playbook-forge
description: The Operational Architect. Transforms raw ritual JSON data into rigorous, interactive Playbook HTMLs using the Moat Standard template.
metadata:
  version: v1.0.0
  status: Active
  owner: Javier Montaño
  steward: Pristino Agent
  ritual_padre: publicar-ritual
---

# 175-playbook-forge v1.0.0

## 1. Goal

To operationalize the "Playbook Transformation" by enforcing a strict **Data-First** architecture. This skill prohibits manual HTML editing of rituals. Instead, it demands that all operational knowledge be captured in standardized JSON, then compiled into immutable, self-contained HTML artifacts.

## 2. Protocolo de Ejecución: The Build Cycle

### 2.1 Data Ingestion (JSON)
* **Schema**: Every ritual must be defined in a `.json` file co-located with its HTML.
* **Atomic Law**: 8-10 steps per ritual. No more, no less.
* **Fields**: Must include `meta` (id, version), `playbook` (breadcrumb, tldr), `steps` (title, desc, output), and `glossary`.

### 2.2 Compilation (Build)
* **Action**: Execute `node scripts/build-playbook.js <ritual.json>`.
* **Standard**: Uses `templates/playbook-ritual-template.html` as the SINGLE source of truth for UI/UX.

### 2.3 Validation (Verify)
* **Check**: Generated HTML must render:
    1. **Header**: Simplified (No B2B/B2C toggle).
    2. **Onboarding**: Breadcrumb + Badge + TL;DR.
    3. **Interactive**: Modals for steps + Tooltips for glossary.

## 3. Gold Checklist (Guardrails Innegociables)

| Ítem | Requisito |
| --- | --- |
| **Separation of Concerns** | Content in JSON, Structure in Template. NEVER edit ritual HTML manually. |
| **Atomic Law** | 8-10 Steps. If >10, split ritual. If <8, deepen granularity. |
| **100 Check Standard** | Every playbook must display the 100-Point Badge (1 Prompt, 0 Delay, 0 Friction, ✓ Entrusted). |
| **Self-Contained** | Output HTML must work offline (no external CSS/JS dependencies except fonts/icons if permitted). |

## 4. FAQ

- **P:** ¿Cómo cambio el color de un botón en un ritual específico?
- **R:** No lo haces. Cambias el `templates/playbook-ritual-template.html` y reconstruyes TODOS los rituales. La consistencia es soberana.

- **P:** ¿Puedo añadir un paso 11?
- **R:** No. La Ley Atómica (8-10 pasos) es un hard-constraint de diseño cognitivo. Si necesitas más, estás mezclando dos rituales.

## 5. Changelog

- v1.0.0 — Initial release. Support for JSON-driven build system.
