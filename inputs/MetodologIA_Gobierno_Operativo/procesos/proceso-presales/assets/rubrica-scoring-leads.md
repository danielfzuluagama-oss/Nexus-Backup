# Rubrica de Scoring de Leads

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Director Comercial
**Cierra:** FM-06 (Backcasting COO)
**Uso:** Completar para CADA lead antes de ingresarlo al pipeline. Tiempo: 5-10 min. Responsable: Sales Rep asignado.

---

## Dimensiones de Scoring

### D1: PRESUPUESTO (Budget)

| Score | Criterio |
|-------|---------|
| 5 | Presupuesto asignado y confirmado para este tipo de servicio |
| 4 | Presupuesto existe pero requiere aprobacion interna |
| 3 | Indicios de capacidad de pago, sin presupuesto especifico |
| 2 | Empresa con revenue suficiente, sin senales de presupuesto |
| 1 | Sin informacion de presupuesto, empresa pequena o startup early-stage |

### D2: AUTORIDAD (Authority)

| Score | Criterio |
|-------|---------|
| 5 | Contacto directo es el decision-maker (CxO, VP, Director) |
| 4 | Contacto tiene acceso directo al decision-maker y puede influir |
| 3 | Gerente medio, necesita escalar pero tiene canal |
| 2 | Contacto es operativo, lejos del decision-maker |
| 1 | Sin contacto con decisor, solo formulario web |

### D3: NECESIDAD (Need)

| Score | Criterio |
|-------|---------|
| 5 | Dolor cuantificado, impacto medible (>10% costo o >20% tiempo), urgencia explicita |
| 4 | Dolor identificado, impacto estimado, proyecto en agenda del trimestre |
| 3 | Dolor reconocido pero no cuantificado, interes genuino |
| 2 | Interes exploratorio, "queremos entender opciones" |
| 1 | Sin dolor claro, contacto por curiosidad o benchmarking |

### D4: TIMELINE (Timing)

| Score | Criterio |
|-------|---------|
| 5 | Resolver en proximos 30 dias, deadline externo |
| 4 | Proyecto planificado para proximos 90 dias |
| 3 | Interes para este semestre, sin fecha firme |
| 2 | Planificacion para proximo ano |
| 1 | Sin timeline, "algun dia" |

### D5: FIT (Encaje)

| Score | Criterio |
|-------|---------|
| 5 | Necesidad mapeada a servicio del catalogo, experiencia previa en la industria |
| 4 | Servicio disponible, requiere customizacion menor (<20%) |
| 3 | Servicio parcialmente disponible, requiere adaptacion significativa |
| 2 | Servicio tangencial, fuera del core pero tecnicamente posible |
| 1 | Fuera del alcance, requeriria capacidad nueva |

---

## Clasificacion

**Score Total = D1 + D2 + D3 + D4 + D5 = ___/25**

| Rango | Clasificacion | Accion |
|-------|-------------|--------|
| **18-25** | **HOT** | Prioridad maxima. Deal Review inmediato. Asignar Solution Architect. |
| **12-17** | **WARM** | Pipeline activo. Proximo Deal Review semanal. Programar follow-up. |
| **7-11** | **NURTURE** | Devolver a marketing. Re-evaluar en 30 dias. |
| **5-6** | **DISCARD** | No califica. Registrar motivo y archivar. |

---

## Bonificaciones por Fuente

Aplicar DESPUES del score base. No cambian la puntuacion de las dimensiones individuales, pero ajustan el total.

| Condicion | Ajuste | Justificacion |
|-----------|--------|--------------|
| Referido de cliente existente (warm intro) | +2 | Autoridad implicitamente validada por relacion de confianza |
| Lead de evento donde hubo interaccion directa | +1 | Interes demostrado con inversion de tiempo |
| Inbound desde contenido tecnico (whitepaper, webinar) | +1 | Auto-segmentacion por interes tecnico |
| Lead que llega solo por formulario generico web | 0 | Sin senal adicional |

> Los bonos pueden mover un lead de WARM a HOT. La clasificacion final se basa en el total ajustado.

---

## Triggers de Re-Score

No re-scorear "cuando hay nueva info". Re-scorear SOLO en estos eventos especificos:

| Trigger | Que cambia | Accion |
|---------|-----------|--------|
| Cliente confirma asignacion de presupuesto | D1 sube | Re-score inmediato |
| Nuevo stakeholder entra a la conversacion (CxO, VP) | D2 sube | Re-score inmediato |
| Cliente comunica deadline externo (regulatorio, board) | D4 sube | Re-score inmediato |
| Han pasado 30 dias sin avance | D4 baja | Re-score + decidir si pasa a NURTURE |
| Sponsor original deja la empresa | D2 baja dramaticamente | Re-score urgente; posible HOLD |
| Cliente menciona competidor evaluando | D4 sube, urgencia | Re-score + escalar a Director Comercial |

---

## Calibracion entre Reps

**Problema:** Dos reps pueden scorear el mismo lead con 5 puntos de diferencia.

**Solucion: Ejercicio Mensual de Calibracion**
1. Director Comercial selecciona 3 leads reales anonimizados del mes anterior
2. Cada rep los scorea independientemente (10 min)
3. Se comparan scores en sesion grupal (20 min)
4. Para cada dimension con >1 punto de desviacion, se discute y se documenta el criterio correcto
5. Se actualizan ejemplos concretos en esta rubrica si es necesario

**Meta:** Desviacion maxima de 1 punto por dimension entre cualquier par de reps en los leads de calibracion.

---

## Benchmarks Historicos

> Actualizar trimestralmente. Los primeros valores son linea base del Q1 de operacion.

| Metrica | Q1 (Baseline) | Target Q2 |
|---------|---------------|-----------|
| Score promedio leads HOT | [Registrar] | N/A (linea base) |
| % leads HOT del total | [Registrar] | 20-30% |
| Conversion HOT -> Propuesta enviada | [Registrar] | >60% |
| Conversion WARM -> Propuesta enviada | [Registrar] | >25% |
| % leads que cambian de clasificacion en re-score | [Registrar] | <30% (estabilidad) |

---

## Registro (Score Card)

```
## SCORE CARD — [Nombre del Lead]

**Fecha:** [___]  **Sales Rep:** [___]
**Fuente:** [ ] Marketing | [ ] Referido | [ ] Embajador | [ ] Aliado | [ ] Prospeccion | [ ] Evento
**Empresa:** [___]  **Contacto:** [___]  **Cargo:** [___]

| Dimension | Score | Evidencia |
|-----------|-------|-----------|
| D1: Presupuesto | __/5 | [___] |
| D2: Autoridad | __/5 | [___] |
| D3: Necesidad | __/5 | [___] |
| D4: Timeline | __/5 | [___] |
| D5: Fit | __/5 | [___] |
| **Subtotal** | **__/25** | |
| Bono fuente | +__ | [___] |
| **TOTAL AJUSTADO** | **__/27** | |

**Clasificacion:** [ ] HOT | [ ] WARM | [ ] NURTURE | [ ] DISCARD
**Decision:** [___]
**Proximo paso:** [___]
**Fecha de re-score programado:** [___]
```
