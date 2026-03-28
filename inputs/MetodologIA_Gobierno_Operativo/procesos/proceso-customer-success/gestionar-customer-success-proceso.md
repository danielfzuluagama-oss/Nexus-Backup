# Proceso Misional: Customer Success — Exito del Cliente

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Chief Enablement Officer (Katherine Oquendo) + Director Comercial
**Tipo:** MISIONAL — Genera retencion, renovacion, y advocacy
**Filosofia:** "El exito del cliente es el revenue recurrente de MetodologIA"

---

## Tabla de Referencias Cruzadas (centralizada)

| Artefacto externo | Usado en fase | Proposito |
|---|---|---|
| `02-BRIDGE-COMERCIAL-DELIVERY.md` | Handoff (Gate H-01) | Paquete de handoff de delivery a CS |
| `formulario-f4-operacion.md` | Acompanamiento | NPS de hitos, actas de entrega |
| `gestionar-presales-proceso.md` | Expansion | Canal para nuevas propuestas |
| `plan-respuesta-brechas-datos.md` | Fuera de alcance | Crisis de datos / incidentes |
| `sop-health-check.md` | Health Check | Ejecucion de health checks 30/60/90 |
| `sop-seguimiento-post-delivery.md` | Cierre | Seguimiento post-entrega |
| `sop-upsell-crosssell.md` | Expansion | Identificacion y ejecucion de upsell |
| Proceso de Comunidad / Alumni | Advocacy | Auto-invitacion de NPS >= 9 |

**NO cubre:** Crisis de comunicacion (ver `plan-respuesta-brechas-datos.md`), gestion de incidentes de seguridad, ni escalamiento regulatorio.

---

## 1. Proposito

Garantizar que cada cliente logre la **transformacion prometida** (soberania estrategica, no solo entregables). Detectar riesgo de churn, activar upsell/cross-sell, y convertir clientes satisfechos en referentes.

**Pregunta que responde:** El cliente logro lo que necesitaba? Volveria? Nos recomendaria?

---

## 2. Fases del Proceso

```
HANDOFF -> ACOMPANAMIENTO -> HEALTH CHECK -> CIERRE -> EXPANSION -> ADVOCACY
(D+0)      (ongoing)         (30/60/90d)    (fin ODS)   (upsell)     (referencia)
```

### Fase 1: HANDOFF (Recibir al cliente post-delivery)

**Trigger:** Gate H-01 de `02-BRIDGE-COMERCIAL-DELIVERY.md` completado.

| Paso | Accion | Responsable |
|---|---|---|
| 1.1 | Recibir paquete de handoff (7 artefactos del Bridge) | CSM |
| 1.2 | Revisar metricas de exito acordadas en kickoff | CSM |
| 1.3 | Programar health checks a 30, 60, y 90 dias | CSM |
| 1.4 | Presentarse al SPOC cliente como punto de contacto post-delivery | CSM |

### Fase 2: ACOMPANAMIENTO (durante delivery)

| Paso | Accion | Frecuencia | Responsable |
|---|---|---|---|
| 2.1 | Check-in con SPOC cliente: "Como va la experiencia?" | Quincenal | CSM |
| 2.2 | Revisar NPS de hitos entregados | Por hito | CSM |
| 2.3 | Si NPS < 7: activar protocolo de recuperacion | Cuando ocurra | CSM + Director |
| 2.4 | Documentar insights del cliente (dolores adicionales, oportunidades) | Continuo | CSM |

### Fase 3: HEALTH CHECK (30/60/90 dias post-inicio)

**SOP:** `sop-health-check.md`

| Dia | Foco | Preguntas clave | Output |
|---|---|---|---|
| **D+30** | Arranque | El equipo se adapto? Los accesos funcionan? El facilitador conecta? | Health Score + acciones correctivas |
| **D+60** | Traccion | Se ven resultados intermedios? Las metricas de exito avanzan? | Health Score + ajuste de plan si necesario |
| **D+90** | Impacto | Se cumplieron las metricas de exito? El cliente percibe valor? | Health Score + decision: expandir/renovar/cerrar |

**Health Score (0-100):**

| Dimension | Peso | Indicadores |
|---|---|---|
| Engagement | 25% | Asistencia a sesiones, uso de plataforma, respuesta a comunicaciones |
| Progreso | 25% | % de hitos completados vs. plan |
| Satisfaccion | 25% | NPS + feedback cualitativo |
| Resultados | 25% | Avance en metricas de exito definidas en kickoff |

---

## 3. Playbook por Zona de Health Score

### VERDE (80-100): Expandir

| Accion | Responsable | Timing |
|---|---|---|
| Celebrar con el cliente: enviar resumen de logros | CSM | En el health check |
| Explorar dolor adicional: "Que otro desafio tienen en el roadmap?" | CSM | En el check-in quincenal |
| Proponer siguiente servicio del catalogo alineado al roadmap del cliente | CSM -> Sales Rep | Dentro de 15 dias del health check verde |
| Solicitar referencia o testimonial | CSM | Si NPS >= 9 |
| Invitar a programa de Comunidad / Alumni | CSM | Automatico si NPS >= 9 |

### AMARILLO (60-79): Estabilizar

| Accion | Responsable | Timing |
|---|---|---|
| Reunion de diagnostico con SPOC: que esta fallando? | CSM | Dentro de 3 dias del health check |
| Involucrar al Director Comercial + Delivery Lead | CSM | En la reunion de diagnostico |
| Plan de accion escrito con 3-5 acciones concretas | CSM + Delivery Lead | Dentro de 5 dias del health check |
| Follow-up semanal hasta que el score suba a >= 80 | CSM | Semanal |
| Si no mejora en 30 dias, escalar a CEO | CSM + Director Comercial | D+30 del plan de accion |

### ROJO (<60): Salvar

| Accion | Responsable | Timing |
|---|---|---|
| Escalamiento inmediato a CEO | CSM | Dentro de 24h del health check |
| Reunion de crisis con sponsor del cliente | CEO + Director Comercial | Dentro de 48h |
| Analisis de causa raiz: es delivery? es expectativas? es relacion? | Delivery Lead + CSM | En la reunion de crisis |
| Plan de rescate con compromiso de ambas partes | CEO | Dentro de 5 dias de la reunion de crisis |
| Si el plan de rescate falla en 30 dias, negociar cierre ordenado | Director Comercial | D+30 del plan de rescate |
| Post-mortem documentado (que aprendimos, que cambiamos) | CSM | Dentro de 5 dias del cierre |

---

## 4. Senales Tempranas de Churn (detectar antes de que el Health Score baje)

| Senal | Severidad | Accion inmediata |
|---|---|---|
| 3+ emails del CSM sin respuesta del SPOC | MEDIA | Llamar por telefono. Si no contesta, contactar al sponsor. |
| Cambio de SPOC sin aviso | ALTA | Contactar al sponsor para entender el contexto. Reprogramar un mini-onboarding con el nuevo SPOC. |
| Cliente menciona "congelamiento de presupuesto" o "revision de gastos" | ALTA | Reunir al Director Comercial. Preparar caso de ROI cuantificado para defender la inversion. |
| Cliente menciona que esta "evaluando alternativas" o "viendo opciones" | CRITICA | Escalar a CEO en 24h. Programar reunion con sponsor para entender que ofrecen los competidores y que podemos mejorar. |
| Sponsor ejecutivo deja la empresa | CRITICA | Identificar al nuevo sponsor en 48h. Si no hay sponsor, el proyecto esta en riesgo de cancelacion. |
| Retraso de pago >30 dias sin comunicacion | ALTA | Operaciones contacta a facturacion del cliente. Si no hay respuesta, el Director Comercial contacta al sponsor. |
| Asistencia a sesiones cae <50% por 2 semanas consecutivas | MEDIA | CSM habla con SPOC: "Noto que la participacion bajo. Hay algo que podamos ajustar?" |

---

## 5. Fase 4: CIERRE (fin de ODS)

**SOP:** `sop-seguimiento-post-delivery.md`

| Paso | Accion | Responsable | Plazo |
|---|---|---|---|
| 4.1 | Reunion de cierre con SPOC: presentar resultados vs. metricas de exito | CSM + Delivery Lead | Ultima semana de ODS |
| 4.2 | Enviar encuesta NPS final | CSM | Dia de cierre |
| 4.3 | Solicitar testimonial / caso de exito (si NPS >= 8) | CSM | Dia de cierre |
| 4.4 | Entregar certificado de participacion (si aplica) | Operaciones | D+5 post-cierre |
| 4.5 | Generar informe de cierre: que se logro, que queda pendiente, recomendaciones | CSM | D+5 post-cierre |
| 4.6 | Transitar al Gate R-01 del Bridge (regreso a comercial para upsell) | CSM -> Director Comercial | D+10 post-cierre |

### Fase 5: EXPANSION (upsell / cross-sell / renovacion)

**SOP:** `sop-upsell-crosssell.md`

| Trigger | Accion | Responsable |
|---|---|---|
| Health Score >= 80 + metricas cumplidas | Proponer siguiente servicio del roadmap del cliente | CSM + Sales Rep |
| Cliente menciona dolor nuevo (detectado en health check) | Conectar con el servicio correcto del catalogo | CSM -> Sales Rep |
| ODS por vencer en 30 dias (alerta CLM) | Proponer renovacion con scope ajustado | CSM + Sales Rep |
| Alumni de bootcamp pide nivel avanzado | Proponer Programa Elite o consultoria | CSM |

**Regla:** Toda propuesta de expansion se canaliza por presales. El CSM identifica, el Sales Rep ejecuta.

### Fase 6: ADVOCACY (convertir en referente)

| Accion | Criterio | Responsable |
|---|---|---|
| Solicitar testimonial escrito | NPS >= 9 | CSM |
| Invitar a ser case study (video/articulo) | NPS >= 9 + resultados cuantificables | Marketing + CSM |
| Invitar a ser speaker en evento MetodologIA | NPS >= 9 + liderazgo visible | Chief Ecosystem |
| Proponer como referencia para prospects | NPS >= 8 + disposicion confirmada | Sales Rep + CSM |
| Invitar al programa de embajadores | NPS >= 9 + red de contactos valiosa | Chief Ecosystem |
| **Auto-invitar a Comunidad / Alumni** | NPS >= 9 (automatico) | Sistema / CSM |

**Integracion con Comunidad:** Todo cliente que alcance NPS >= 9 en cualquier health check o cierre es automaticamente candidato al pipeline de Alumni + Advocacy. El CSM envia la invitacion dentro de los 5 dias habiles del NPS. El Alumni pipeline alimenta: testimoniales, case studies, referidos, speakers, y co-creacion de contenido.

---

## 6. KPIs y Decision de Diseno

| KPI | Meta | Frecuencia | Por que esta meta |
|---|---|---|---|
| Health Score promedio del portfolio | >= 75/100 | Mensual | 75 es el umbral entre "en riesgo" y "saludable". Debajo, el portfolio tiene problemas sistemicos. |
| NPS promedio de cierre | >= 8.5/10 | Mensual | 8.5 pone a MetodologIA en el cuartil superior de consultoria en LATAM. |
| **Net Revenue Retention (NRR)** | **> 110%** | Trimestral | **Decision:** 110% es el benchmark SaaS adaptado a servicios. Significa que el revenue de expansion (upsell + cross-sell) supera al revenue perdido por churn. Si NRR < 100%, estamos encogiendo. Si NRR = 100-110%, estamos reteniendo pero no creciendo desde la base instalada. >110% = crecimiento organico saludable. |
| % clientes con expansion en 12 meses | > 30% | Trimestral | Si menos del 30% expande, o el servicio inicial no genera valor suficiente para repetir, o el CSM no esta identificando oportunidades. |
| Churn rate | < 10% anual | Trimestral | >10% indica problemas de product-market fit o de delivery, no solo de CS. |
| Testimonials / case studies generados | >= 2 por trimestre | Trimestral | Combustible para el flywheel de marketing. Sin testimoniales frescos, la confianza se erosiona. |

---

v2.0.0 — Playbook por zona, senales de churn, decision NRR, integracion Comunidad, limites del proceso / Javier Montano + Claude
