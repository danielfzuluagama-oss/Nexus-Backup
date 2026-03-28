# L1 — Plantilla de SOP (Standard Operating Procedure)

- **Versión:** v1.0.0
- **Estado:** Estándar
- **Tipo:** Plantilla
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## Instrucciones de uso

1. Copiar desde `<!-- COMIENZA -->` hasta `<!-- FIN -->`
2. Reemplazar todos los `<PLACEHOLDER>`
3. Eliminar instrucciones entre `<!-- ... -->`
4. Validar con Quality Gate 8/8

---

<!-- COMIENZA LA PLANTILLA -->

## SOP: [NOMBRE]

- **Versión:** v[MAJOR.MINOR.PATCH]
- **Estado:** Hipótesis | Piloto | Validado | Estándar
- **Owner:** [NOMBRE O ROL]
- **Slug:** [kebab-case]
- **Ritual padre:** [nombre del ritual que gobierna este SOP, o "ninguno"]
- **Fecha:** [YYYY-MM-DD]

---

## Propósito

<1–2 frases: qué problema resuelve este SOP y por qué existe>

## Alcance

- **Aplica a:** <qué situaciones, sistemas, roles>
- **NO aplica a:** <exclusiones explícitas>

## Roles

| Rol | Persona/Equipo | Responsabilidad |
| --- | --- | --- |

| Ejecutor | [ROL] | Ejecuta los pasos |
| Aprobador | [ROL] | Valida el resultado |
| Informado | [ROL] | Recibe notificación |

## DoR (Definition of Ready)

Antes de iniciar, verifica:

- [ ] <condición 1>
- [ ] <condición 2>
- [ ] <condición 3>

**Regla:** Si falta algún ítem, NO inicies. Escala al Owner.

## Pasos

### Paso 1: [Nombre del paso]

- **Acción:** [qué hacer, exactamente]
- **Herramienta:** [qué se usa]
- **Output:** [qué produce este paso]
- **Evidencia:** [cómo se demuestra que se hizo]

### Paso 2: [Nombre del paso]

- **Acción:** [...]
- **Herramienta:** [...]
- **Output:** [...]
- **Evidencia:** [...]

<!-- Repetir pasos según necesidad -->

## DoD (Definition of Done)

El SOP se considera terminado cuando:

- [ ] <output 1 verificable>
- [ ] <output 2 verificable>
- [ ] Evidencia adjunta (link/path/ticket)
- [ ] Bitácora actualizada

## SLAs

| Métrica | Objetivo | Medición |
| --- | --- | --- |

| Tiempo de ejecución | [ej: ≤30 min] | [frecuencia] |
| Tasa de éxito 1ª pasada | [ej: ≥90%] | [frecuencia] |

## Excepciones

| Situación | Acción | Escala a |
| --- | --- | --- |

| [caso 1] | [acción] | [rol] |
| [caso 2] | [acción] | [rol] |

**Regla:** Toda excepción se registra en bitácora con razón y resolución.

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
| --- | --- | --- | --- |

| [riesgo 1] | [B/M/A] | [B/M/A] | [acción] |

---

## Changelog

- v[X.Y.Z] — [qué cambió] / [por qué]

<!-- FIN DE LA PLANTILLA -->
