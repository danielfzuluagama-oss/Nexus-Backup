# SOP: Facturación de Servicios

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Finanzas / COO
**Cierra:** FM-07 (Backcasting COO)

---

## 1. Propósito

Garantizar que las facturas se emitan correctamente, en el momento adecuado, con el formato DIAN requerido, y se radiquen ante el cliente sin demora.

---

## 2. Momentos de Facturación

| Modelo de servicio | Cuándo facturar | Evidencia requerida |
|-------------------|----------------|-------------------|
| **Workshop (evento único)** | Al completar el evento | Lista de asistencia firmada |
| **Bootcamp (cohorte)** | Anticipo al inicio + mensual | Matrícula firmada + informe de avance |
| **Consultoría (por hitos)** | Al completar cada hito definido en ODS | Acta de entrega firmada por SPOC cliente |
| **Programa Élite (mensual)** | Mensual, el primer día hábil | Informe de actividades del mes anterior |
| **Suscripción/Plataforma** | Mensual, recurrente | N/A (automático) |

---

## 3. Procedimiento

| Paso | Acción | Responsable | Plazo | Evidencia |
|------|--------|------------|-------|-----------|
| 1 | Delivery/Operaciones confirma hito cumplido o período completado | Delivery Manager / Operaciones | Día de cumplimiento | Acta de entrega o informe |
| 2 | Finanzas verifica datos de facturación en registro CLM (NIT, razón social, dirección) | Finanzas | 1 día hábil | Datos verificados vs. RUT |
| 3 | Finanzas genera factura electrónica en sistema de facturación DIAN | Finanzas | 2 días hábiles post-verificación | Factura con CUFE |
| 4 | Finanzas envía factura al email de contabilidad del cliente (registrado en `checklist-pre-firma.md`) | Finanzas | Mismo día de generación | Acuse de recibo |
| 5 | Finanzas registra factura en sistema de cartera con fecha de vencimiento | Finanzas | Mismo día | Registro en sistema |
| 6 | Si no hay confirmación de recepción en 3 días hábiles, Finanzas contacta SPOC cliente | Finanzas | 3 días post-envío | Email de seguimiento |

---

## 4. Requisitos de Factura Electrónica (DIAN)

| Campo | Valor |
|-------|-------|
| Tipo de documento | Factura Electrónica de Venta |
| Resolución DIAN | [Número de resolución vigente] |
| CUFE | Generado automáticamente por el software |
| Formato | XML UBL 2.1 + representación gráfica PDF |
| IVA | 19% (salvo servicios exentos o excluidos) |
| Retención en la fuente | Según tabla de retenciones vigente |
| Nota crédito | Si se requiere ajuste post-emisión |

---

## 5. Manejo de Excepciones

| Excepción | Acción |
|-----------|--------|
| Cliente rechaza factura por error en datos | Emitir nota crédito + nueva factura en <2 días hábiles |
| Cliente solicita factura a nombre de otra entidad | Verificar que la entidad esté en el contrato/ODS. Si no, requiere enmienda contractual |
| Factura por anticipo (antes de delivery) | Emitir conforme a ODS. Nota: el ingreso NO se reconoce aún (ver `reconocer-ingresos-sop.md`) |
| Servicio pro-bono | No facturar. Registrar como "servicio sin contraprestación" en sistema |

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-07 / Javier Montaño + Claude
