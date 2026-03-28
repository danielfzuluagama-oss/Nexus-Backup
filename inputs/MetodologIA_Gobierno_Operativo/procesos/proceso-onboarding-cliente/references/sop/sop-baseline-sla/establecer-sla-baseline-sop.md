# SOP: Establecer SLA Baseline

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Operaciones
**Cierra:** FM-09 (Backcasting COO)
**Momento de ejecución:** Durante ceremonia de kickoff (F3) o dentro de los 5 días posteriores

---

## 1. Propósito

Definir, negociar y documentar los niveles de servicio (SLA) específicos para cada engagement, usando los estándares de MetodologIA como punto de partida y ajustando según el tipo de servicio y las expectativas del cliente.

---

## 2. Entradas (DoR — Definition of Ready)

- [ ] Contrato firmado (MSA + ODS) con alcance definido
- [ ] Tipo de servicio identificado (Workshop / Bootcamp / Consultoría / Programa Élite)
- [ ] SPOC del cliente designado y disponible
- [ ] `sla-baseline-template.md` impreso o disponible digitalmente

---

## 3. Procedimiento

### Paso 1: Seleccionar defaults por tipo de servicio (5 min)

| Dimensión | Workshop | Bootcamp | Consultoría | Programa Élite |
|-----------|----------|----------|-------------|----------------|
| **Tiempo de respuesta a consultas** | 24h hábiles | 12h hábiles | 8h hábiles | 4h hábiles |
| **Tiempo de resolución de incidentes** | N/A | 48h hábiles | 24h hábiles | 12h hábiles |
| **Frecuencia de reportes** | Post-evento | Semanal | Quincenal | Semanal |
| **Disponibilidad de plataforma** | N/A | 99% | 99.5% | 99.9% |
| **Plazo de entrega de hitos** | N/A | Conforme a syllabus | ±5 días de ODS | ±3 días de ODS |
| **Rondas de revisión por entregable** | N/A | 1 | 2 | 3 |
| **Escalamiento Nivel 1→2→3** | N/A | 8h→24h→48h | 4h→8h→24h | 2h→4h→12h |

**Responsable:** Project Manager
**Evidencia:** Defaults pre-llenados en `sla-baseline-template.md`

### Paso 2: Presentar defaults al cliente (10 min)

Durante el bloque 50-60 min de la ceremonia de kickoff:
1. Compartir el template con los valores default pre-llenados
2. Explicar cada dimensión y qué significa en términos prácticos
3. Preguntar: "¿Estos niveles de servicio se alinean con sus expectativas?"

**Responsable:** Project Manager
**Evidencia:** Template presentado

### Paso 3: Negociar ajustes (10 min)

Si el cliente solicita niveles más estrictos:

| Solicitud del cliente | Evaluación | Acción |
|----------------------|-----------|--------|
| Dentro del rango estándar (ver defaults arriba) | Aceptable | Ajustar sin aprobación adicional |
| Más estricto que estándar pero técnicamente posible | Requiere validación | Consultar con Delivery Lead. Aprobar si hay capacidad |
| Significativamente más estricto (ej. 99.99% uptime, respuesta 1h) | Requiere aprobación COO + posible costo adicional | Escalar a COO. Si implica costo, reflejar en ODS o adenda |
| Incluye penalizaciones financieras | Requiere aprobación CEO | Escalar a CEO. Penalizaciones >5% del valor mensual = RED LINE |

**Responsable:** Project Manager (con escalamiento según tabla)
**Evidencia:** Notas de negociación

### Paso 4: Documentar y firmar (5 min)

1. Completar `sla-baseline-template.md` con los valores acordados
2. Ambas partes firman (SPOC cliente + Project Manager)
3. Adjuntar al expediente del contrato en registro CLM
4. Enviar copia al cliente por email dentro de 24h post-kickoff

**Responsable:** Project Manager
**Evidencia:** Template firmado + email de envío

### Paso 5: Configurar monitoreo (Día +1 a +3)

1. Configurar alertas o recordatorios para medir cumplimiento de SLA
2. Definir cómo se reportará el cumplimiento (dashboard, informe, email)
3. Incluir métricas de SLA en el reporte periódico acordado

**Responsable:** Project Manager + TI (si hay componente de plataforma)
**Evidencia:** Herramienta de monitoreo configurada

---

## 4. Salidas (DoD — Definition of Done)

- [ ] `sla-baseline-template.md` completado y firmado por ambas partes
- [ ] Copia enviada al cliente por email
- [ ] SLA registrado en expediente CLM del contrato
- [ ] Monitoreo configurado
- [ ] Equipo de delivery informado de los SLA comprometidos

---

## 5. Excepciones

| Situación | Acción |
|-----------|--------|
| Cliente no quiere definir SLA | Documentar que se ofreció y el cliente declinó. Aplicar defaults internos como referencia. |
| ODS ya incluye SLA detallado | Validar que el SLA de ODS es alcanzable. Usar como baseline sin renegociar. |
| Cliente pide SLA superiores a nuestra capacidad actual | No comprometer. Escalar a COO para evaluar inversión en capacidad vs. declinación. |

---

## 6. Supuestos

SUPUESTO: El Project Manager tiene autoridad para comprometer SLA dentro del rango estándar sin aprobación adicional.
- Validar con: COO
- Fecha límite: Al aprobar este SOP
- Si se invalida: Toda negociación de SLA requiere aprobación de Operaciones

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-09 / Javier Montaño + Claude
