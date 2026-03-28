# Template: SLA Baseline

**Version:** 2.0.0
**Cierra:** FM-09 (Backcasting COO)
**Uso:** Completar durante ceremonia de kickoff (F3) para cada ODS

---

## SLA BASELINE — [Nombre del Cliente] — ODS [Referencia]

| Dimension | Floor (minimo MetodologIA) | Valor Acordado | Ceiling (maximo razonable) | Estandar MetodologIA | Penalizacion (si aplica) |
|---|---|---|---|---|---|
| **Tiempo de respuesta a consultas** | 24h habiles | ___h habiles | 2h habiles | 8h habiles | N/A |
| **Tiempo de resolucion de incidentes** | 48h habiles | ___h habiles | 4h habiles | 24h habiles | N/A |
| **Frecuencia de reportes** | Mensual | Semanal / Quincenal / Mensual | Diario (solo sprints criticos) | Quincenal | N/A |
| **Disponibilidad de plataforma** (si aplica) | 95% | ___% | 99.95% | 99.5% | ___% credito por hora de downtime |
| **Plazo de entrega de hitos** | Conforme a ODS +10d | Conforme a ODS +/- ___d | Conforme a ODS exacto | +/- 5 dias | N/A |
| **Calidad de entregables** | 3 rondas de revision | Max ___ ronda(s) de revision | 1 ronda (entregable definitivo) | 2 rondas | N/A |
| **Escalamiento** | N1: 8h -> N2: 24h -> N3: 48h | N1: ___h -> N2: ___h -> N3: ___h | N1: 1h -> N2: 2h -> N3: 4h | N1: 4h -> N2: 8h -> N3: 24h | N/A |

### Guia de uso Floor / Ceiling

- **Floor:** Lo minimo que MetodologIA puede comprometer sin comprometer calidad. Si un cliente pide algo por debajo del floor, se esta comprometiendo algo irreal.
- **Ceiling:** Lo maximo que un cliente deberia esperar. Si pide algo por encima del ceiling (Ej: respuesta en 30 minutos, 99.99% uptime), requiere un engagement dedicado con pricing diferente y equipo exclusivo.
- **Valor Acordado:** Debe estar entre Floor y Ceiling. Negociar hacia el estandar MetodologIA. Alejarse del estandar solo con justificacion documentada.

---

## Triggers de Renegociacion de SLA

El SLA baseline se renegocia cuando ocurre cualquiera de los siguientes eventos:

| Trigger | Accion | Responsable | Plazo |
|---|---|---|---|
| **Cambio de alcance formal** (Change Request aprobado) | Revisar si el nuevo alcance requiere ajustar tiempos de respuesta o frecuencia de reportes | PM | Dentro de los 5 dias habiles post-aprobacion del CR |
| **Cambio de equipo MetodologIA** (Delivery Lead o PM cambia) | Renegociar SLA si el nuevo equipo tiene capacidad diferente | Director Comercial | Antes del primer entregable del nuevo equipo |
| **Cambio de equipo cliente** (SPOC o sponsor cambia) | Validar que el nuevo SPOC acepta los SLA actuales | PM + CSM | Dentro de 3 dias habiles del cambio |
| **Fusion, adquisicion, o reestructuracion del cliente** | Revisar si cambia el contexto regulatorio, los stakeholders, o la prioridad del proyecto | Director Comercial | Evaluar en 10 dias habiles post-notificacion |
| **Incumplimiento sistematico** (3+ violaciones del mismo SLA en 30 dias) | Reunion de recalibracion. Puede ser que el SLA era irreal o que hay un problema operativo | PM + Director Comercial | Programar dentro de 5 dias habiles de la 3ra violacion |
| **Extension de contrato / renovacion** | Recalibrar SLA basado en la experiencia del engagement anterior | CSM + PM | Como parte del proceso de renovacion en CLM |

---

## Firmas

**SPOC Cliente:** _________________________ Fecha: _____________
**Project Manager MetodologIA:** _________________________ Fecha: _____________

---

v2.0.0 — Floor/ceiling por dimension, triggers de renegociacion / Javier Montano + Claude
