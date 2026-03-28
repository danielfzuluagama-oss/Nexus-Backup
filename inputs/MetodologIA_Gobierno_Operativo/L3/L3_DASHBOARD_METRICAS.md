# L3 — Dashboard de Métricas

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Fecha:** 2026-02-14

---

## Propósito

Definir las métricas críticas del sistema de gobierno operativo MetodologIA: qué medir, cómo, con qué frecuencia, quién es responsable y cuáles son los umbrales de acción. Convierte los KPIs del governance PDF en un dashboard operable.

---

## KPIs Primarios (4)

> Fuente: Governance PDF §KPIs

| KPI | Descripción | Objetivo | Frecuencia | Owner | Fuente de datos |
| --- | ----------- | -------- | ---------- | ----- | --------------- |
| **KPI-01 Velocidad** | Tiempo de ciclo desde inicio de declaración hasta publicación | ≤300 segundos | Por ejecución | Autor | Bitácora de ejecución |
| **KPI-02 Calidad** | % de artefactos que cumplen 100% con la plantilla canónica correspondiente | 100% | Mensual | Revisor/IA | Auditoría manual/script |
| **KPI-03 Trazabilidad** | % de skills con vinculación RAG-First verificada (references/ = espejo exacto) | 100% | Trimestral | Steward | Log de sync + auditoría |
| **KPI-04 Adopción** | Evidencia de Uso Real: bitácoras con ejecuciones documentadas | Uso documentado por cada artefacto activo | Mensual | Steward | Bitácoras |

---

## Métricas Leading (señales tempranas)

| # | Métrica | Qué predice | Umbral sano | Acción si fuera de umbral | Owner |
| --- | ------- | ----------- | ----------- | ------------------------- | ----- |
| L1 | **Adherencia a SOP** — % de publicaciones que siguen el SOP completo | Calidad de outputs | ≥90% | Reforzar onboarding, simplificar SOP | Orchestrator |
| L2 | **Gate aprobado 1ª pasada** — % de artefactos que pasan gate sin iteración | Madurez del proceso | ≥80% | Revisar DoR, mejorar plantillas | Revisor/IA |
| L3 | **Divergencias de espejo** — # de divergencias detectadas post-publicación | Integridad RAG | 0 | Ejecutar SOP Sincronizar inmediatamente | Owner de sync |
| L4 | **Score ENTRUSTED promedio** — promedio de score ENTRUSTED en evaluaciones | Tendencia de calidad | ≥9.0 | Reforzar Excellence Loop, mentoring | Steward |
| L5 | **Artefactos en Draft >30 días** — # de artefactos que no avanzan a Piloto | Acumulación / FOMO | ≤3 | Sustracción Estratégica: deprecar o simplificar | Steward |
| L6 | **Tiempo de respuesta del Dueño** — tiempo entre solicitud de aprobación y decisión | Velocidad de flujo | ≤48h | Escalar a Steward | Orchestrator |

---

## Métricas Lagging (resultados)

| # | Métrica | Qué confirma | Umbral esperado | Frecuencia | Owner |
| --- | ------- | ------------ | --------------- | ---------- | ----- |
| G1 | **Reducción de retrabajo** — % de reducción en iteraciones post-publicación vs baseline | Efectividad del sistema | Reducción ≥20% vs trimestre anterior | Trimestral | Steward |
| G2 | **Tiempo de ciclo real** — mediana de tiempo desde necesidad hasta publicación | Eficiencia del proceso | Tendencia descendente | Mensual | Steward |
| G3 | **Tasa de deprecación exitosa** — % de deprecaciones completadas sin incidentes | Salud del catálogo | 100% | Por evento | Steward |
| G4 | **Auditoría limpia** — % de checks pasados en auditoría trimestral | Integridad general | ≥95% | Trimestral | Steward |

---

## Métricas GenAI (si aplica)

| # | Métrica | Qué mide | Cómo medir | Owner |
| --- | ------- | -------- | ---------- | ----- |
| AI1 | **TAC** (Trust–Accuracy Correlation) | Calibración entre confianza percibida y exactitud real | Encuesta post-ejecución + verificación manual de output | Owner del acelerador |
| AI2 | **TCE** (Trust Calibration Error) | Gap entre confianza del usuario y fiabilidad del sistema | TAC ideal (1.0) − TAC real | Owner del acelerador |
| AI3 | **Uso correcto del acelerador** — % de ejecuciones donde se usó según el workflow | Integración GenAI | Bitácora + checklist de veracidad | Autor |
| AI4 | **Void/Paradox aplicado** — % de casos donde se detectó falta/conflicto de datos y se aplicó el patrón correcto | Honestidad del sistema | Revisión de outputs GenAI | Revisor de veracidad |

---

## Señales de alerta (Red Flags)

| Señal | Indica | Acción inmediata |
| ----- | ------ | ---------------- |
| Score ENTRUSTED < 8.0 en cualquier artefacto | Calidad insuficiente | Bloquear publicación + revisión manual |
| 0 ejecuciones documentadas en 30 días para un artefacto Piloto | Artefacto fantasma | Evaluar deprecación |
| Divergencias espejo > 0 por más de 24h | Integrity breach | Sync de emergencia |
| 2+ cadencias consecutivas sin ejecutar | Gobierno muerto | Escalar + simplificar cadencia |
| Gate aprobado 1ª pasada < 50% | Proceso roto | AAR urgente del proceso |

---

## Formato de registro (bitácora mínima — 2 min)

Cada ejecución se registra con:

| Campo | Ejemplo |
| ----- | ------- |
| Fecha | 2026-02-14 |
| Artefacto | L2_SOP_PUBLICAR_RITUAL |
| Versión | v1.0.0 |
| Ejecutor | Nombre/Rol |
| Resultado | OK / FALLO / PARCIAL |
| Score ENTRUSTED | 9.2 |
| Notas | "Gate pasó en 1ª. Sin divergencias" |
| Tiempo | 12 min |

---

## Cadencia de revisión del dashboard

| Frecuencia | Qué se revisa | Quién |
| ---------- | ------------- | ----- |
| Semanal | L1–L6 (leading) | Orchestrator + Autor activo |
| Mensual | KPI-01 a KPI-04 + G1–G2 | Steward + Owners |
| Trimestral | Todo el dashboard + G3–G4 + AI1–AI4 | Steward + todos |

---

## Changelog

- v1.0.0 — Dashboard inicial. 4 KPIs primarios (del governance PDF), 6 leading, 4 lagging, 4 GenAI, 5 señales de alerta, formato de bitácora, cadencia de revisión
