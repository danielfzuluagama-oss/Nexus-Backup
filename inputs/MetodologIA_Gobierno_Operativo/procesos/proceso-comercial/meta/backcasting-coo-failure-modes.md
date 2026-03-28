# Backcasting COO — Modos de Fallo Operativo

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Director de Operaciones
**Método:** Backcasting — "¿En qué fallaría un COO novato en sus primeros 90 días?"

---

## Propósito

20 modos de fallo que un COO sin experiencia sufriría al operar MetodologIA, cada uno mapeado a un documento o proceso que lo cierra. **Gate de validación:** si un FM dice "Gap: sin mitigación", es riesgo abierto que las Fases 1-6 deben cerrar.

### Escala de severidad

- **CRITICO:** Exposición legal, pérdida financiera >10% revenue, o daño reputacional irreparable
- **ALTO:** Ineficiencia operativa, disputas con clientes/partners, cash flow comprometido
- **MEDIO:** Oportunidad perdida, fricción interna, métricas sin visibilidad

---

## Modos de Fallo

**FM-01** | Legal | CRITICO | Prob: Alta | Impacto: Inmediato
Los contratos son verticales (GTM, Reseller); un cliente multi-servicio no tiene marco unificado ni jurisdicción clara.
Mitigación parcial: `contrato-marco-alianza-gtm.md` y `contrato-marco-resellers.md` existen para aliados. Gap: no hay MSA para clientes directos.
→ `contrato-marco-servicios-msa.md` | Criterio: MSA firmable cubre ≥3 verticales con jurisdicción única | Edge: cliente internacional exige ley extranjera

**FM-02** | Compliance | CRITICO | Prob: Media | Impacto: Inmediato
Sin procedimiento de respuesta a brechas de datos personales; la SIC exige notificación en plazo y la respuesta sería improvisada.
Mitigación parcial: `acuerdo-tratamiento-datos-dpa.md` y `autorizacion-habeas-data.md` existen. Gap: no hay plan de respuesta a incidentes.
→ `plan-respuesta-brechas-datos.md` | Criterio: plan con roles, plazos SIC, y simulacro ejecutado | Edge: brecha originada por subprocesador tercero

**FM-03** | Pre-Sales | CRITICO | Prob: Alta | Impacto: 30d
Sales rep ofrece 40% de descuento sin autorización; no hay matriz formal de bandas de descuento ni escalamiento por monto.
Mitigación parcial: `checklist-pre-firma.md` valida precio vs. catálogo. Gap: no hay matriz de bandas de descuento con escalamiento.
→ `matriz-autoridad-descuentos.md` | Criterio: bandas definidas por monto con aprobadores por nivel | Edge: deal multi-vertical donde descuento aplica a un solo módulo

**FM-04** | Financiero | CRITICO | Prob: Media | Impacto: 90d
Revenue reconocido al 100% al firmar contrato; delivery dura 6 meses, costos se acumulan sin ingreso nuevo. Viola NIIF/IFRS 15.
Gap: sin mitigación.
→ `reconocer-ingresos-sop.md` | Criterio: SOP alineado a IFRS 15 con reconocimiento por performance obligation | Edge: contrato con hitos parcialmente entregados al cierre fiscal

**FM-05** | Legal | CRITICO | Prob: Alta | Impacto: Inmediato
Sitio web recolecta datos sin ToS ni Política de Privacidad publicada; violación directa de Ley 1581/2012 Art. 12.
Mitigación parcial: `autorizacion-habeas-data.md` existe para recolección directa. Gap: no hay ToS ni Política de Privacidad en web.
→ `terminos-de-servicio-tos.md` + `politica-de-privacidad.md` | Criterio: publicados en web con link en footer y checkbox en formularios | Edge: evento co-branded donde el co-host recolecta datos vía su propia landing

**FM-06** | Pre-Sales | ALTO | Prob: Alta | Impacto: 30d
Sin rúbrica de scoring, leads se califican por instinto; pipeline muestra $500M COP pero solo $50M es real.
Mitigación parcial: `caracterizacion.md` existe por vertical con arquetipos. Gap: no hay rúbrica de scoring cuantitativo.
→ `rubrica-scoring-leads.md` | Criterio: scoring con ≥5 variables ponderadas y umbral de calificación | Edge: lead corporativo que puntúa bajo en presupuesto pero es puerta a cuenta enterprise

**FM-07** | Operaciones Comerciales | ALTO | Prob: Alta | Impacto: 30d
Factura llega tarde o sin CUFE (DIAN); cliente rechaza y cobro se atrasa 30-60 días adicionales.
Gap: sin mitigación.
→ `facturar-servicio-sop.md` + `plantilla-factura.md` | Criterio: SOP con SLA de emisión ≤3 días post-hito y validación CUFE | Edge: factura a consorcio donde el pagador es diferente al firmante

**FM-08** | Legal | ALTO | Prob: Media | Impacto: 90d
En workshops se crea material (frameworks, código); sin cláusula de IP, el cliente asume propiedad sobre assets core de MetodologIA.
Mitigación parcial: `clausulas-estandar-contratos.md` referencia IP. Gap: no hay plantilla standalone de cesión/retención de IP.
→ `cesion-derechos-ip.md` | Criterio: plantilla que distingue IP preexistente, co-creada, y derivada | Edge: workshop donde el participante aporta código propio que se integra al entregable

**FM-09** | Onboarding | ALTO | Prob: Media | Impacto: 30d
Delivery arranca sin SLA definido; a los 30 días el cliente reclama "respuesta lenta" sin baseline contra qué medir.
Mitigación parcial: `anexo-a-sla-black-label.md` existe como template premium. Gap: no hay SOP para negociar baseline de SLA per deal.
→ `establecer-sla-baseline-sop.md` + `sla-baseline-template.md` | Criterio: SLA firmado antes de día 1 de delivery con métricas medibles | Edge: cliente con múltiples stakeholders que exigen SLAs distintos por módulo

**FM-10** | Legal | ALTO | Prob: Media | Impacto: 90d
Contrato marco con aliado vence sin detección; se siguen emitiendo ODS sobre contrato expirado — nulos en caso de disputa.
Gap: sin mitigación.
→ `proceso-ciclo-vida-contratos-clm.md` | Criterio: alertas automáticas a 90/60/30 días de vencimiento con owner asignado | Edge: contrato con renovación automática donde la contraparte envió carta de no-renovación no detectada

**FM-11** | Pre-Sales / Compensación | ALTO | Prob: Alta | Impacto: 30d
Sales rep espera 15% de comisión, la empresa dice 8%; no hay documento firmado que defina estructura de compensación.
Mitigación parcial: `liquidar-compensacion-10-20-70-sop.md` existe para embajadores. Gap: no hay matriz de compensación para ventas directas.
→ `matriz-compensacion-ventas.md` | Criterio: matriz firmada por cada rep antes de asignar territorio | Edge: deal cerrado por 2 reps de distintas verticales — split no definido

**FM-12** | Vendor Management | MEDIO | Prob: Media | Impacto: 30d
Plataforma LMS de bootcamps cae; sin due diligence, sin SLA con proveedor, sin plan B.
Gap: sin mitigación.
→ `checklist-due-diligence-proveedores.md` | Criterio: checklist aplicado a todo vendor >$5M COP/año con plan de contingencia | Edge: proveedor SaaS que cambia ToS unilateralmente eliminando features críticos

**FM-13** | Financiero | MEDIO | Prob: Media | Impacto: 90d
Programa élite cuesta 40% más de lo presupuestado; sin reporte mensual de varianza, desviaciones se acumulan silenciosamente.
Gap: sin mitigación.
→ `plantilla-reporte-varianza.md` + `aprobar-gasto-sop.md` | Criterio: reporte mensual con umbral de alerta a ±15% y escalamiento automático | Edge: varianza positiva (underrun) que oculta scope reducido sin aprobación

**FM-14** | Onboarding / Compliance | ALTO | Prob: Alta | Impacto: Inmediato
Cliente comparte datos personales en discovery antes de NDA/habeas data; MetodologIA procesa datos sin base legal.
Mitigación parcial: `checklist-pre-firma.md` valida NDA antes de firma. Gap: no hay gate que impida recibir datos personales en fase pre-sales.
→ `recolectar-datos-progresivo-sop.md` | Criterio: SOP define qué datos se aceptan en cada fase con gate de rechazo | Edge: cliente envía datos por canal no controlado (WhatsApp, email personal)

**FM-15** | Pre-Sales | ALTO | Prob: Alta | Impacto: Inmediato
Sales rep envía propuesta de COP 200M directamente al cliente sin aprobación interna; pricing incorrecto o alcance inalcanzable.
Gap: sin mitigación.
→ `aprobar-propuesta-sop.md` + `plantilla-propuesta-comercial.md` | Criterio: gates de aprobación por monto (≤$50M auto, ≤$200M Director, >$200M CEO) | Edge: propuesta "express" solicitada por el cliente con SLA de 24h

**FM-16** | Onboarding | MEDIO | Prob: Media | Impacto: 30d
Delivery arranca sin kickoff formal; equipo técnico no conoce al sponsor, expectativas desalineadas desde día 1.
Mitigación parcial: `02-BRIDGE-COMERCIAL-DELIVERY.md` define Gate H-01 con 7 artefactos. Gap: no hay SOP de ceremonia de kickoff.
→ `ejecutar-kickoff-sop.md` + `ceremonia-kickoff-template.md` | Criterio: kickoff ejecutado con acta firmada antes de iniciar delivery | Edge: proyecto con 3+ stakeholders en diferentes zonas horarias

**FM-17** | Pre-Sales | ALTO | Prob: Alta | Impacto: 30d
Sin ceremonia semanal de deal review; deals se estancan, no hay decisión formal de "kill" para oportunidades zombi.
Mitigación parcial: `L3_GOBIERNO_OPERATIVO.md` define cadencias. Gap: no hay ritual específico de deal review con formato y governance.
→ `deal-review-sop.md` + `deal-review-semanal-ritual.md` | Criterio: ritual semanal con decisión obligatoria advance/hold/kill por deal | Edge: deal "político" que nadie quiere matar porque el sponsor es referencia

**FM-18** | Pre-Sales / Legal | MEDIO | Prob: Media | Impacto: 30d
Cliente pide modificar 5 cláusulas; sin playbook, el rep acepta todo o escala todo, alargando cierre 30+ días.
Mitigación parcial: `clausulas-estandar-contratos.md` define cláusulas. Gap: no hay guía de qué es negociable, qué son red lines, ni path de escalamiento.
→ `negociar-contrato-sop.md` | Criterio: playbook con green/yellow/red por cláusula y SLA de respuesta legal ≤48h | Edge: cliente con departamento legal que exige papel membretado y firma notarial

**FM-19** | Operaciones Comerciales | MEDIO | Prob: Media | Impacto: 30d
Cliente disputa factura ("ese hito no se entregó"); sin SOP de resolución, cobro queda en limbo y cartera pasa >90 días.
Gap: sin mitigación.
→ `resolver-disputa-pago-sop.md` | Criterio: SOP con plazos de resolución (15d interno, 30d con cliente) y escalamiento | Edge: disputa donde el entregable fue aceptado verbalmente pero sin acta formal

**FM-20** | Governance | MEDIO | Prob: Baja | Impacto: 90d
Embajador comercial es también proveedor de un competidor; sin política de declaración de conflictos, la confianza del ecosistema se erosiona.
Gap: sin mitigación.
→ `politica-conflicto-intereses.md` | Criterio: política firmada por cada embajador/contractor con declaración anual | Edge: conflicto descubierto post-facto con deal ya cerrado a través del embajador

---

## Resumen de Cobertura

| Severidad | Total | Mitigación parcial | Sin mitigación |
|-----------|-------|--------------------|----------------|
| CRITICO   | 5     | 3                  | 2              |
| ALTO      | 10    | 4                  | 6              |
| MEDIO     | 5     | 1                  | 4              |
| **TOTAL** | **20**| **8**              | **12**         |

**60% de los modos de fallo no tienen mitigación alguna.** Esto es la brecha que las Fases 1-6 cierran.

---

## Mapa de Interdependencias

Las cascadas identificadas donde un FM no resuelto amplifica o desbloquea otros:

| FM origen | Cascada hacia | Mecanismo |
|-----------|---------------|-----------|
| FM-01 (sin MSA) | FM-08 (IP sin cláusula), FM-10 (CLM) | Sin marco unificado, las cláusulas de IP quedan dispersas y el CLM no tiene qué trackear |
| FM-04 (revenue prematuro) | FM-13 (sobrecosto), FM-07 (factura tardía) | Cash flow distorsionado oculta varianzas reales y presiona facturación apresurada |
| FM-05 (sin ToS web) | FM-02 (brecha datos), FM-14 (datos pre-NDA) | Sin base legal publicada, cualquier recolección de datos es vulnerable |
| FM-06 (scoring por instinto) | FM-17 (sin deal review), FM-15 (propuesta sin gate) | Pipeline inflado hace que deal review sea inútil y propuestas se envíen sin filtro |
| FM-10 (sin CLM) | FM-01 (MSA), FM-08 (IP) | Contratos vencidos invalidan MSA y cláusulas de IP asociadas |
| FM-11 (sin matriz compensación) | FM-03 (descuentos no autorizados) | Rep sin comisión clara infla descuentos para cerrar rápido |
| FM-15 (propuesta sin gate) | FM-03 (descuento), FM-09 (SLA sin baseline) | Propuesta no revisada puede incluir descuentos indebidos y SLAs inviables |
| FM-17 (sin deal review) | FM-06 (pipeline inflado), FM-11 (disputa comisión) | Sin higiene de pipeline, atribución de deals y comisiones se vuelve disputada |

**Cluster critico principal:** FM-01 → FM-08 → FM-10 forman un ciclo legal que debe resolverse como bloque en Fase 1.

---

## Matriz de Prioridad (Probabilidad x Severidad)

```
                    CRITICO              ALTO                 MEDIO
              ┌──────────────────┬──────────────────┬──────────────────┐
  Alta        │ FM-01, FM-03,    │ FM-06, FM-07,    │                  │
              │ FM-05            │ FM-11, FM-14,    │                  │
              │                  │ FM-15, FM-17     │                  │
              ├──────────────────┼──────────────────┼──────────────────┤
  Media       │ FM-02, FM-04     │ FM-08, FM-09,    │ FM-12, FM-13,    │
              │                  │ FM-10            │ FM-16, FM-18,    │
              │                  │                  │ FM-19            │
              ├──────────────────┼──────────────────┼──────────────────┤
  Baja        │                  │                  │ FM-20            │
              │                  │                  │                  │
              └──────────────────┴──────────────────┴──────────────────┘
```

**Lectura:** El cuadrante superior-izquierdo (Alta + CRITICO) es zona roja inmediata: FM-01, FM-03, FM-05. Deben cerrarse en Fase 1-2 sin excepción.

---

## Supuestos y Límites

Este backcasting **NO cubre** los siguientes riesgos, que requieren instrumentos separados:

1. **Riesgo reputacional por redes sociales** — Viralización negativa, crisis de PR, o cancel culture. Requiere playbook de comunicación de crisis.
2. **Conflicto entre fundadores / socios** — Disputas de equity, visión, o control. Requiere pacto de socios y acuerdo de accionistas.
3. **Colapso de mercado** — Recesión, cambio regulatorio que elimine la demanda, o entrada de competidor dominante. Requiere análisis de escenarios estratégicos.
4. **Riesgo técnico de plataforma** — Caída de infraestructura propia, pérdida de código fuente, o deuda técnica. Requiere BCP/DRP técnico.
5. **Riesgo de talento clave (key-person)** — Dependencia excesiva del fundador o de un consultor estrella. Requiere plan de sucesión.
6. **Fraude interno** — Malversación, falsificación de reportes, o colusión con proveedores. Requiere controles internos y auditoría.
7. **Riesgo cambiario** — Contratos en USD con costos en COP (o viceversa) sin cobertura. Requiere política de tesorería.

**Supuestos activos:**
- MetodologIA opera exclusivamente bajo jurisdicción colombiana (SIC, DIAN, leyes laborales colombianas).
- El equipo comercial es <10 personas en los primeros 12 meses.
- No hay operación internacional directa (las alianzas GTM cubren esos mercados).
- El founder actúa como CEO y el COO reporta directamente a él.

---

## Criterios de Aceptación del Backcasting

El gobierno operativo COO se considera **"done"** cuando se cumplen TODOS los siguientes criterios:

| # | Criterio | Evidencia requerida |
|---|----------|---------------------|
| 1 | Los 20 FMs tienen mitigación documentada (0 "sin mitigación") | Cada FM apunta a documento existente y revisado |
| 2 | Los 5 FMs CRITICOS tienen mitigación probada en al menos 1 caso real | Registro de caso + retrospectiva |
| 3 | Mapa de interdependencias validado: los 3 clusters principales cerrados como bloque | Checklist de cluster completado |
| 4 | Deal review semanal operando ≥4 semanas consecutivas con decisiones advance/hold/kill documentadas | Actas de 4 sesiones |
| 5 | Reporte de varianza mensual emitido ≥2 meses consecutivos | 2 reportes archivados |
| 6 | Simulacro de brecha de datos ejecutado con tiempo de respuesta ≤24h | Informe de simulacro |
| 7 | CLM operativo: 100% de contratos activos con fecha de vencimiento trackeada y alerta configurada | Export del registro CLM |
| 8 | 0 propuestas enviadas sin pasar por gate de aprobación en últimas 4 semanas | Log de aprobaciones |

**Estado mínimo viable:** Criterios 1-3 cerrados. Los criterios 4-8 se validan en operación continua durante los primeros 90 días post-implementación.

---

## Changelog

- v2.0.0 — Formato condensado (4 líneas por FM), mapa de interdependencias, matriz de prioridad, supuestos y límites, criterios de aceptación del backcasting / Javier Montaño + Claude
- v1.0.0 — Creación inicial con 20 modos de fallo / Backcasting COO / Javier Montaño + Claude
