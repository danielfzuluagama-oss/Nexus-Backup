---
name: crear-ritual-metodologia
description: Versión auto-contenida del meta-ritual para declarar rituales operativos en el Gobierno MetodologIA. Formato Sovereign v4.0 con 10 pasos macro + 30 micro-pasos.
metadata:
  version: v3.0.0
  status: Sovereign v4.0
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-ritual
  template: templates/TEMPLATE_RITUAL_RUNBOOK.md
---

# 066-crear-ritual-metodologia v3.0.0 (Sovereign v4.0)

## 0. Scaffolding (Sovereign v4.0)

> **Standard**: This skill adheres to the **MetodologIA Sovereign v4.0 Standard**.
>
> * **Template**: `templates/TEMPLATE_RITUAL_RUNBOOK.md` (fuente de verdad estructural)
> * **SOTA**: `references/estado-del-arte.md`
> * **Governance**: `references/best-practices.md`
> * **Ontology**: `meta/knowledge-graph.md`
> * **Cases**: `references/use-cases.md`

Este skill operacionaliza el proceso canónico para la creación de nuevos rituales, incorporando el formato Sovereign v4.0: **10 pasos macro con sub-algoritmo de 30 micro-pasos** en las partes 5-7.

## 1. Goal

Operacionalizar la creación de rituales en formato **runbook ejecutable** que cumple:

- **10 pasos macro** fijos (trigger → cierre-y-handoff)
- **30 micro-pasos** atómicos distribuidos en Partes 5, 6 y 7 (10 cada una)
- Cada micro-paso con **input / acción / output / evidencia** obligatorios
- **IDs canónicos 01–18** fijos por segmento comercial
- Vocabulario canónico (Try & Buy, nunca "gratis/gratuito")
- Naming kebab-case sin sufijo `-ritual`

## 2. IDs Canónicos (Mapa 01–18)

Todos los segmentos comparten la misma intención macro por ID:

| ID | Intención macro |
| :--- | :--- |
| 01 | Captar señal de demanda / entrada |
| 02 | Calificar lead / oportunidad |
| 03 | Enriquecer contexto con IA |
| 04 | Ejecutar discovery / diagnóstico |
| 05 | Entregar Try & Buy (módulo 1) |
| 06 | Presentar propuesta / oferta |
| 07 | Construir confianza / handoff a decisor |
| 08 | Cerrar deal / formalizar |
| 09 | Onboarding / activación |
| 10 | Entregar valor / ejecutar servicio |
| 11 | Medir adopción / métricas |
| 12 | Co-crear con GenAI / multiplicar |
| 13 | Auditar satisfacción / QBR |
| 14 | Detectar expansión / upsell |
| 15 | Cerrar renovación / recompra |
| 16 | Activar referidos / voz a voz |
| 17 | Activar multiplicadores / K-factor |
| 18 | Transferencia de IP / autorización de rol |

## 3. Meta-Protocol: Triple Loop Synchronization

1. **Loop 1 (Intención):** ¿El ritual resuelve una brecha de sincronización observable?
2. **Loop 2 (Coherencia):** ¿El output actualiza correctamente el CRM y genera evidencia?
3. **Loop 3 (Eficiencia):** ¿Cada micro-paso es una acción simple con output verificable?

## 4. Protocolo de Ejecución: El Forjado del Ritual

### 4.1 Fase de Identificación (Observe)

- **IDENTIFY:** Capturar intención macro (del mapa 01–18) y segmento destino.
- **TEMPLATE:** Cargar `TEMPLATE_RITUAL_RUNBOOK.md` como scaffold.
- **SCOPE:** Definir entry-criteria, exit-criteria y KPI.

### 4.2 Fase de Diseño (Act)

- **FRONTMATTER:** Completar TODOS los campos del bloque inicial (id, segmento, journey, proceso, sop, owners, frecuencia, herramientas, entry/exit-criteria, KPI, leading-indicators, riesgos, evidencias).
- **MACRO-STEPS (1-4, 8-10):** Completar los 7 pasos envolventes (trigger, objetivo, roles, preparación, QA, outputs, cierre).
- **SUB-ALGORITHM (5-7):** Diseñar los 30 micro-pasos:
  - **Parte 5** (Setup y Descubrimiento): 5.1–5.10
  - **Parte 6** (Alineación y Decisión): 6.1–6.10
  - **Parte 7** (Ejecución y Producción): 7.1–7.10
- **MICRO-STEP RULE:** Cada micro-paso (X.Y) DEBE contener:
  - `Input(s):` artefacto/dato requerido
  - `Acción(es):` verbo operativo, checklistable
  - `Output(s):` artefacto/evidencia concreta
  - `Evidencia:` ubicación (CRM/Drive/Ticket)

### 4.3 Fase de Verificación (Verify)

- **QUALITY GATE:** Validar contra el Gold Checklist (Sección 5).
- **NAMING CHECK:** Verificar kebab-case, sin sufijo `-ritual`, path correcto.
- **COUNT CHECK:** Confirmar exactamente 10 + 10 + 10 = 30 micro-pasos.
- **LANGUAGE CHECK:** Cero instancias de "gratis/gratuito/sin costo".

## 5. Gold Checklist (Guardrails Innegociables)

| Ítem | Requisito |
| --- | --- |
| **Identidad** | id, segmento, journey, proceso, sop, ritual-slug, versión, owners visibles. |
| **Frontmatter completo** | Todos los campos del bloque inicial poblados. |
| **Macro 10-step** | Exactamente 10 pasos macro en el orden canónico. |
| **Sub-algoritmo 30** | Partes 5, 6, 7 con exactamente 10 micro-pasos cada una. |
| **Micro-step format** | Cada micro-paso tiene input / acción / output / evidencia. |
| **Naming** | kebab-case, sin `-ritual`, ID 01–18 al inicio del nombre. |
| **Vocabulario** | Try & Buy, nunca "gratis/gratuito/sin costo". |
| **DoD/DoR** | Presentes en Pasos 2 y 4 respectivamente. |
| **Handoff** | Paso 10 conecta explícitamente con siguiente ritual (NEXT). |
| **CRM evidence** | Si aplica al segmento, los micro-pasos indican dónde queda la evidencia. |

## 6. Naming & Path Standard

```
rituales/<segmento>/<journey>/<proceso>/sop-XX-<sop-slug>/XX-<ritual-slug>.md
```

- Todo en kebab-case
- Sin sufijo `-ritual` en el nombre del archivo
- Consistencia 1:1 entre carpeta `sop-XX-*` y archivo `XX-*.md`
- IDs 01–18 fijos por segmento

## 7. Guardrails AI-Native

- **Void Pattern:** Si no hay evidencia clara, marcar como "PENDIENTE" y prohibido inventar.
- **Paradox UI:** Ante contradicciones, mostrar ambas fuentes y solicitar resolución.
- **Atomic Law:** Macro = 10 pasos fijos. Sub-algoritmo = 3 × 10 micro-pasos. Micro-paso = 1 acción principal.
- **9:1 Rule:** 9 touchpoints de valor por 1 de oferta.

## 8. Antipatrones

| Señal | Corrección |
| --- | --- |
| Inventar pasos para "rellenar" | Marcar como brecha y pedir input al Owner. |
| Micro-paso sin input/output | Agregar obligatoriamente o fusionar con otro paso. |
| Más de 10 micro-pasos en una parte | Dividir. Máximo innegociable: 10 por parte. |
| Usar "gratis" o "sin costo" | Reemplazar por "Try & Buy: vive el módulo 1, sin riesgo". |
| Nombre con sufijo `-ritual` | Eliminar sufijo. Solo `XX-slug.md`. |

## 9. FAQ

- **P:** ¿Cómo manejo un paso que no tiene evidencia física?
- **R:** Aplicar el Void Pattern: marcar como PENDIENTE y describir qué acción humana se requiere para obtenerla.

- **P:** ¿Puedo tener menos de 10 micro-pasos en una parte?
- **R:** No. Si la parte no requiere 10 pasos naturales, buscar touchpoints de valor (validaciones intermedias, prompts IA, micro-auditorías) para llegar al mínimo 10.

## 10. Changelog

- v3.0.0 — **Sovereign v4.0 Upgrade**: Formato 10 macro + 30 micro-pasos, IDs canónicos 01–18, template reference, naming sin `-ritual`, micro-step format con input/acción/output/evidencia.
- v2.1.0 — Upgrade Moat Edition: Integración de sub-repo de referencias, Triple Loop Sync.
- v2.0.0 — Versión auto-contenida con lógica de Juegos 0-10 y Gold Checklist integrados.
- v1.0.0 — Versión inicial con dependencias externas.

---
Powered by MetodologIA Governance Protocol

<!--
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @steward Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
-->
