# L1 — Plantilla de Documento Canónico de Proceso

- **Versión:** v1.0.0
- **Estado:** Estándar
- **Tipo:** Plantilla
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## Instrucciones de uso

1. Copiar desde `<!-- COMIENZA -->` hasta `<!-- FIN -->`
2. Este documento gobierna SOPs y Skills — NO es un SOP él mismo
3. Reemplazar todos los `<PLACEHOLDER>`

---

<!-- COMIENZA LA PLANTILLA -->

## Documento Canónico: [NOMBRE DEL PROCESO]

- **Versión:** v[MAJOR.MINOR.PATCH]
- **Estado:** Hipótesis | Piloto | Validado | Estándar
- **Owner:** [NOMBRE O ROL]
- **Fecha:** [YYYY-MM-DD]

---

## 1. Propósito

<2–3 frases: por qué existe este proceso, qué problema resuelve a nivel organizacional>

## 2. Alcance

- **Incluye:** <qué cubre>
- **Excluye:** <qué NO cubre>
- **Dependencias:** <otros procesos, sistemas o políticas que este proceso requiere>

## 3. RACI

| Actividad | Responsible | Accountable | Consulted | Informed |
| --- | --- | --- | --- | --- |

| [actividad 1] | [rol] | [rol] | [rol] | [rol] |
| [actividad 2] | [rol] | [rol] | [rol] | [rol] |

**Regla:** Máximo 1 Accountable por actividad.

## 4. Flujo del proceso

```text
[Trigger] → [Fase 1: <nombre>] → [Gate 1] → [Fase 2: <nombre>] → [Gate 2] → [Output final]
```

### Fase 1: [Nombre]

- **Objetivo:** [...]
- **Input:** [...]
- **Output:** [...]
- **SOPs asociados:** [links a SOPs L2]
- **Skills asociados:** [links a skills]

### Fase 2: [Nombre]

- **Objetivo:** [...]
- **Input:** [output de Fase 1]
- **Output:** [...]
- **SOPs asociados:** [...]

<!-- Repetir fases según necesidad -->

## 5. Gates

| Gate | Criterios | Evidencia mínima | Aprobador |
| --- | --- | --- | --- |

| Gate 1 | [criterios] | [evidencia] | [rol] |
| Gate 2 | [criterios] | [evidencia] | [rol] |

## 6. Métricas

| Métrica     | Tipo    | Frecuencia | Owner | Fuente  |
| ----------- | ------- | ---------- | ----- | ------- |

| [métrica 1] | Leading | [freq]     | [rol] | [dónde] |
| [métrica 2] | Lagging | [freq]     | [rol] | [dónde] |

## 7. Riesgos

| Riesgo    | Señal temprana | Mitigación    | Owner |
| --------- | -------------- | ------------- | ----- |

| [riesgo]  | [señal]        | [mitigación]  | [rol] |
| [riesgo]  | [señal]        | [mitigación]  | [rol] |

## 8. Gobierno y evolución

- **Cadencia de revisión:** <semanal/mensual/trimestral>
- **Change management:** <quién aprueba cambios mayores>
- **Deprecación:** <cuándo y cómo se retira este proceso>

## 9. Artefactos gobernados

| Artefacto | Tipo | Versión | Estado | Ubicación |
| --- | --- | --- | --- | --- |

| [nombre] | SOP | v[X.Y] | [estado] | [path] |
| [nombre] | Skill | v[X.Y] | [estado] | [path] |

---

## Changelog

- v[X.Y.Z] — [qué cambió] / [por qué]

<!-- FIN DE LA PLANTILLA -->
