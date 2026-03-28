---
name: definir-paso-a-paso-metodologia
description: Estándar para la fragmentación de procesos en pasos atómicos. Governs macro-steps (10), sub-algorithms (3×10), and micro-steps (1 acción) in MetodologIA.
metadata:
  version: v3.0.0
  status: Sovereign v4.0
  owner: Javier Montaño
  steward: Javier Montaño
---

# 128-definir-paso-a-paso v3.0.0 (Sovereign v4.0)

## 0. Scaffolding (Sovereign v4.0)

> **Standard**: This skill adheres to the **MetodologIA Sovereign v4.0 Standard**.
>
> * **Template**: `templates/TEMPLATE_RITUAL_RUNBOOK.md`
> * **Governance**: `references/best-practices.md`
> * **Ontology**: `meta/knowledge-graph.md`

## 1. Goal

Garantizar que cada ritual tenga una **densidad operativa óptima** a tres niveles de granularidad:

- **Nivel Macro (10 pasos):** El ritual completo, de trigger a cierre
- **Nivel Sub-Algoritmo (3 × 10):** Las partes 5, 6 y 7, con 10 micro-pasos cada una
- **Nivel Micro (1 acción):** Cada micro-paso es una acción atómica con input/output

## 2. Las Leyes del Paso Atómico (v4.0)

### Nivel 1: Macro-Steps

1. **Ley del Macro-10:** Un ritual tiene EXACTAMENTE 10 pasos macro, en el orden canónico:
   1. trigger-y-contexto
   2. objetivo-y-definicion-de-exito
   3. roles-y-responsables
   4. preparacion-e-insumos
   5. ejecutar-parte-1-setup-y-descubrimiento
   6. ejecutar-parte-2-alineacion-y-decision
   7. ejecutar-parte-3-ejecucion-y-produccion
   8. validacion-y-calidad-qa
   9. outputs-y-evidencias
   10. cierre-y-handoff

### Nivel 2: Sub-Algoritmo (Partes 5, 6, 7)

2. **Ley del Sub-10:** Cada parte ejecutiva (5, 6, 7) tiene EXACTAMENTE 10 micro-pasos.
3. **Ley del Núcleo 30:** El núcleo ejecutable del ritual es 5.1–5.10 + 6.1–6.10 + 7.1–7.10 = 30 micro-pasos.

### Nivel 3: Micro-Step

4. **Ley de la Acción Simple:** Cada micro-paso tiene UNA acción principal (verbo operativo).
5. **Ley del Trío Obligatorio:** Cada micro-paso DEBE incluir:
   - `Input(s):` qué necesita para ejecutarse
   - `Acción(es):` verbo operativo, checklistable
   - `Output(s):` artefacto/evidencia concreta
6. **Ley de la Evidencia:** Donde aplique, cada micro-paso indica dónde queda la evidencia (CRM/Drive/Ticket).
7. **Ley 9:1 (Valor):** Antes de proponer negocio, el ritual debe haber entregado valor tangible en 9 puntos de contacto previos.
8. **Ley de la Cadena:** El output de un micro-paso es el input del siguiente (cadena ininterrumpida).

## 3. Workflow de Definición

1. **Identificar el Corazón:** Definir el output final del ritual (Paso 7.10).
2. **Diseñar hacia atrás:** Desde 7.10, definir los 9 pasos previos de Parte 7 (producción).
3. **Diseñar Parte 6:** Los 10 pasos de alineación y decisión que preparan la Parte 7.
4. **Diseñar Parte 5:** Los 10 pasos de setup y descubrimiento que alimentan la Parte 6.
5. **Verificar cadena:** Output de 5.10 → Input de 6.1. Output de 6.10 → Input de 7.1.
6. **Validar conteo:** 10 + 10 + 10 = 30 micro-pasos exactos.
7. **Envolver con Macro:** Completar pasos 1-4 y 8-10 (contexto, QA, cierre).

## 4. Guardrails

- **Macro Range:** [10] es innegociable para rituales.
- **Sub-Algorithm Range:** [10] por cada parte (5, 6, 7) es innegociable.
- **Micro simplicity:** Si un micro-paso tiene más de 1 acción principal, dividir.
- **Void Pattern:** Si falta evidencia para un paso, marcar como "PENDIENTE".

## 5. Antipatrones

| Señal | Corrección |
| --- | --- |
| Micro-paso con 3+ acciones | Dividir en micro-pasos separados. |
| Parte 5 con solo 6 pasos | Buscar touchpoints de valor (validaciones, prompts IA, micro-auditorías). |
| Output de 5.10 no conecta con 6.1 | Agregar paso puente o reorganizar. |
| Macro con 12 pasos | Comprimir macro a 10, delegar granularidad a sub-algoritmo. |

## 6. Changelog

- v3.0.0 — **Sovereign v4.0 Upgrade**: Tres niveles de atomicidad (macro/sub/micro), ley del trío obligatorio (input/acción/output), ley del núcleo 30, workflow de diseño hacia atrás.
- v2.1.0 — Upgrade Moat Edition: Integración de estándares Moat y ajuste de rango.
- v1.0.0 — Versión inicial.

---
Powered by MetodologIA Governance Protocol
