# Template: Cuenta de Cobro para Contratistas Independientes

**Version:** 2.0.0
**Cierra:** FMF-06 (Backcasting CFO)
**Uso:** Para contratistas NO obligados a facturar (no responsables de IVA)

---

## CUENTA DE COBRO No. ____

**Fecha:** ____/____/________
**Ciudad:** Medellin

---

**COBRADOR (Prestador del servicio):**

| Campo | Valor |
|-------|-------|
| Nombre completo | |
| Cedula de ciudadania No. | de |
| Direccion | |
| Telefono | |
| Email | |
| Responsable de IVA? | NO (por eso emite cuenta de cobro, no factura) |
| Regimen tributario | No responsable de IVA / Regimen Simple de Tributacion |

---

**PAGADOR (MetodologIA):**

| Campo | Valor |
|-------|-------|
| Razon social | MetodologIA SAS |
| NIT | (completar) |

---

## Detalle del Servicio

| Concepto | Descripcion | Valor (COP) |
|---------|-------------|------------|
| (Descripcion del servicio prestado) | Periodo: __/__  a __/__/____ | $ |
| | | |
| **Subtotal** | | **$** |
| IVA | N/A (no responsable) | $0 |
| **Total a pagar** | | **$** |

---

## Deducciones Aplicadas por el Pagador

| Concepto | Base | Tarifa | Valor retenido |
|---------|------|--------|---------------|
| Retencion en la fuente (honorarios) | $ | __% | $ |
| Retencion de ICA (si aplica) | $ | __ por mil | $ |
| **Total deducciones** | | | **$** |
| **Neto a pagar** | | | **$** |

---

## Declaracion de Seguridad Social

Declaro que me encuentro al dia en el pago de aportes a seguridad social (salud, pension y ARL) sobre una base de cotizacion no inferior al 40% de mis ingresos brutos mensualizados, conforme a la Ley 100/1993 y el Decreto 1703/2002.

**Adjunto:** Planilla PILA del mes ____ pagada | Pendiente (NO se autoriza el pago sin este soporte)

---

## Datos Bancarios para Consignacion

| Campo | Valor |
|-------|-------|
| Banco | |
| Tipo de cuenta | Ahorros / Corriente |
| Numero de cuenta | |
| Titular | |

---

## Firma

Certifico que la informacion consignada es veraz y que el servicio descrito fue efectivamente prestado.

Nombre: ____________________________________
Cedula: ____________________________________
Firma: ____________________________________
Fecha: ____________________________________

---

## Checklist de Validacion — Finanzas MetodologIA

**Antes de procesar el pago, verificar TODOS los items:**

| # | Verificacion | OK? | Motivo de rechazo si falla |
|---|-------------|-----|--------------------------|
| 1 | NIT/CC del cobrador es correcto (validar digito verificacion) | | NIT erroneo invalida soporte fiscal |
| 2 | Nombre coincide con RUT del cobrador | | Inconsistencia documental |
| 3 | Planilla PILA del mes adjunta y pagada | | Sin PILA no se paga (Decreto 1703/2002) |
| 4 | Monto coincide con contrato/ODS vigente | | Diferencia no autorizada |
| 5 | Retencion en la fuente calculada correctamente (ver `tabla-retencion-fuente-2026.md`) | | Retencion incorrecta = sancion solidaria |
| 6 | Concepto de retencion correcto (honorarios vs servicios) | | Tarifa equivocada |
| 7 | Base de retencion = subtotal (no al neto) | | Base erronea |
| 8 | Si pago >100 UVT (~$4.7M): sera bancarizado | | No deducible si en efectivo |
| 9 | Cuenta de cobro firmada por el prestador | | Sin firma no es valida |
| 10 | Datos bancarios coinciden con titular | | Riesgo de fraude |

---

## Motivos Comunes de Rechazo y Solucion

| Motivo de Rechazo | Frecuencia | Como Corregir | Tiempo Estimado |
|-------------------|-----------|--------------|----------------|
| **NIT/CC erroneo** (digito verificacion incorrecto o numero mal digitado) | Alta | Solicitar RUT actualizado al cobrador, verificar en www.dian.gov.co | 1-2 dias |
| **PILA no adjunta o no corresponde al mes** | Alta | Solicitar planilla PILA pagada del mes de prestacion del servicio. No aceptar planillas de meses anteriores. | 1-5 dias |
| **Sin firma** | Media | Devolver para firma. No procesar cuentas de cobro digitales sin firma electronica o escaneada. | 1 dia |
| **Retencion mal calculada** (tarifa equivocada o base incorrecta) | Media | Recalcular segun tabla vigente. Verificar si el cobrador es declarante o no. | Inmediato |
| **Monto no coincide con contrato/ODS** | Baja | Verificar con el area que contrato el servicio. Si hay diferencia legitima, obtener aprobacion escrita del COO. | 1-3 dias |
| **Regimen tributario incorrecto** (emite cuenta de cobro pero es responsable de IVA) | Baja | Si es responsable de IVA, debe emitir factura electronica, no cuenta de cobro. Devolver y solicitar factura. | 3-5 dias |

---

## Campos de Control Interno MetodologIA (no compartir con el contratista)

| Campo | Valor |
|-------|-------|
| ODS/Contrato vinculado | |
| Aprobado por | |
| PILA verificada | SI / NO (NO PAGAR si NO) |
| Registrado en contabilidad | SI |
| Fecha de pago programada | |
| Numero de cuenta contable | (debito: gasto por honorarios/servicios) |

---

## Changelog

- v2.0.0 — Checklist de validacion pre-pago, motivos comunes de rechazo con solucion, defaults realistas
- v1.0.0 — Creacion inicial
