# L2 — A-02: SIPOC (1 página)

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Tipo:** Anexo (SIPOC)
- **Ritual padre:** Declarar un Ritual (Meta-Ritual) — `declarar-un-ritual` v1.0.0

---

## Propósito (1 frase)

Este proceso existe para **convertir conocimiento operativo + anexos en un ritual publicable (Juegos 0–10)** con **gates verificables, evidencia mínima y anti-drift**, y termina cuando **pasa Gold Checklist (Piloto) o Gate Completo (Validado/Estándar)**.

---

## SIPOC

### S — Suppliers (Proveedores)

| Proveedor | Qué entrega |
| --- | --- |

| Owner/DRI del ritual | Decisión de declarar + criticidad + resources |
| Autor | Conocimiento del tema + anexos + draft |

| Stakeholders | Contexto, restricciones, expectativas |
| Repo de Rituales | Plantilla + convenciones + glosario |

### I — Inputs (Entradas)

| Input | Formato | Obligatorio |
| --- | --- | --- |

| Nombre + slug (kebab-case) | Texto | ✅ |
| Estado inicial (Hipótesis/Piloto) | Texto | ✅ |
| Criticidad (bajo/medio/alto) | Texto | ✅ |
| DRI/Owner + backup | Texto | ✅ |

| Anexos/fuentes | .md, .pdf, links | ✅ (o "sin fuentes") |
| L1_PLANTILLA_RITUAL.md | .md | ✅ |
| L0_GLOSARIO.md | .md | ✅ |

### P — Process (Proceso)

```text
[DoR check] → [Juegos 0–2: Intención+Alcance+Condiciones]
            → [Juego 3: Secuencia ejecutable]
            → [Juego 4: Gate de calidad + Adversarial+]

            → [Juegos 5–7: Instrumentación+Aprendizaje+Packaging]
            → [Juegos 8–10: GenAI+Sostenibilidad+Excelencia]
            → [Cierre: publicación + sync espejo]

```

### O — Outputs (Salidas)

| Output | Formato | Gate |
| --- | --- | --- |

| Ritual completo (.md versionado) | Markdown | Gold Checklist |
| Ritual (.html alineado) | HTML | Sync verificado |
| Acelerador GenAI (≥1) integrado al workflow | Según tipo | DoD Juego 8 |
| Skill asociado (SKILL.md + references espejo) | Carpeta | QA Skill Blueprint |

| Bitácora de ejecución | Markdown | Completitud |
| Handoff.yaml actualizado | YAML | Campos completos |

### C — Customers (Clientes)

| Cliente | Necesidad |
| --- | --- |

| Equipo operativo | Ejecutar el ritual sin dudas |
| IA/Agentes | Activar el ritual via skill |
| Nuevos miembros | Onboarding autoservicio |
| Stakeholders | Visibilidad de estado y métricas |

---

## Trigger (qué lo inicia)

- Decisión de formalizar un procedimiento nuevo o informal
- Solicitud de un stakeholder
- Hallazgo en auditoría de que falta ritual para un proceso existente

## Restricciones

- No iniciar sin DoR completo
- No publicar sin Gold Checklist aprobado
- No declarar "Estándar" sin 90 días de evidencia

---

## Changelog

- v1.0.0 — SIPOC limpio alineado a meta-ritual v1.0
