# L2 — A-03: Gold Checklist (12 ítems) — Gate de Publicación

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Tipo:** Anexo (Checklist)
- **Ritual padre:** Declarar un Ritual (Meta-Ritual) — `declarar-un-ritual` v1.0.0

---

## Cómo se usa (60s)

1. Evalúa los 12 ítems
2. Marca **Pasa / No pasa**
3. Si **No pasa**, define **1 acción** + **dueño** + **fecha**
4. Adjunta **evidencia clicable** (link/path/ticket)

**Regla:** Si un ítem no tiene evidencia, cuenta como "No pasa".

---

## Gold Checklist

| # | Ítem | Pasa | Evidencia | Acción (si No pasa) |
| --- | --- | --- | --- | --- |

| 1 | **Identidad:** nombre + versión + estado + owner visibles | [ ] | | |
| 2 | **Doble formato:** existe .md versionado Y .html alineado | [ ] | | |

| 3 | **Brecha + no-resultados:** problema → resultado + lista de no-resultados | [ ] | | |
| 4 | **Alcance:** ≥3 "cuándo usar" + ≥3 "cuándo NO usar" | [ ] | | |

| 5 | **Roles:** owner del ritual + owner del acelerador asignados | [ ] | | |
| 6 | **Procedimiento:** pasos numerados con output por paso | [ ] | | |

| 7 | **Gate:** criterios + evidencia mínima + umbral definidos | [ ] | | |
| 8 | **DoD:** outputs obligatorios verificables (.md + .html + acelerador + skill) | [ ] | | |

| 9 | **Métricas:** ≥3 leading + ≥2 lagging con owner y frecuencia | [ ] | | |
| 10 | **Riesgos:** top riesgos con mitigación y señales tempranas | [ ] | | |

| 11 | **Acelerador GenAI:** ≥1 activo, integrado al workflow (cuándo/cómo usar) | [ ] | | |
| 12 | **Skill asociado:** SKILL.md + references espejo del ritual completo | [ ] | | |

---

## Umbrales

| Nivel | Criterio | Resultado |
| --- | --- | --- |

| **Gate Mínimo (Piloto)** | ≥10/12 pasan + los "No pasa" tienen acción + dueño + fecha | Publicar como Piloto |
| **Gate Completo (Validado)** | 12/12 pasan + evidencia completa | Publicar como Validado |

| **Bloqueante** | Ítems 1, 6, 7 u 8 NO pasan | No publicar hasta fix |

---

## Cuándo aplicar

- **Antes de publicar** cualquier ritual como Piloto o superior
- **Después de cambios mayores** (MAJOR version bump)
- **En auditorías periódicas** (trimestral)

---

## Changelog

- v1.0.0 — Gold Checklist unificado (12 ítems) consolidando A-03 original (12), checklist 8/8 (v0.8) y checklist 16 (v0.9 §5.B)
