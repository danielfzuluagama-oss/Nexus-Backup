# Calendario Tributario 2026 — MetodologIA

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Contador / Finanzas
**Cierra:** FMF-01 (Backcasting CFO)
**Base legal:** Decreto de plazos DIAN 2026 (actualizar cuando se publique)

> **NOTA:** Las fechas exactas dependen del ultimo digito del NIT. Actualizar con el decreto de plazos DIAN cuando se publique (tipicamente diciembre del ano anterior).

---

## Obligaciones Mensuales

| Obligacion | Formulario | Vencimiento | Responsable | Salida de Caja Est. COP | Penalidad 1 dia tarde | Penalidad 1 semana | Penalidad 1 mes |
|-----------|-----------|-------------|------------|------------------------|----------------------|-------------------|----------------|
| **Retencion en la fuente** | F-350 | Mes siguiente, segun NIT | Contador | Variable (11% de pagos a terceros) | Intereses moratorios (~0.08%/dia) | Intereses acumulados ~0.56% | Extemporaneidad 5% + intereses ~2.4% |
| **Autorretencion renta** (si aplica) | F-350 | Junto con retencion | Contador | Variable | Igual que retencion | Igual | Igual |
| **PILA** (salud, pension, ARL) | Planilla PILA | Antes del dia 10 del mes siguiente | Finanzas/RRHH | ~$500K-$2M (segun base) | Intereses moratorios | Suspension cobertura ARL | Responsabilidad solidaria activa |
| **Nomina** (si hay empleados) | Liquidacion interna | Dia 30 (quincena) o fin de mes | Finanzas | Segun nomina | Intereses moratorios laborales | 1 dia salario/dia mora cesantias | Demanda laboral potencial |

---

## Obligaciones Bimestrales (si ingresos >92.000 UVT)

| Obligacion | Formulario | Periodos | Vencimiento | Salida de Caja Est. |
|-----------|-----------|----------|-------------|-------------------|
| **IVA bimestral** | F-300 | Ene-Feb, Mar-Abr, May-Jun, Jul-Ago, Sep-Oct, Nov-Dic | Mes siguiente al cierre, segun NIT | 19% de ingresos gravados - IVA descontable |

## Obligaciones Cuatrimestrales (si ingresos <92.000 UVT — caso MetodologIA)

| Obligacion | Formulario | Periodos | Vencimiento | Salida de Caja Est. |
|-----------|-----------|----------|-------------|-------------------|
| **IVA cuatrimestral** | F-300 | Ene-Abr, May-Ago, Sep-Dic | Mes siguiente al cierre, segun NIT | 19% ingresos gravados - IVA descontable |

---

## Obligaciones ICA por Municipio

| Obligacion | Municipio | Periodos | Vencimiento | Tarifa | Salida de Caja Est. |
|-----------|----------|----------|-------------|--------|-------------------|
| **ICA Medellin** | Medellin | Bimestral (anticipos) + Anual | Segun calendario SHD Medellin | 4.14-11.04 por mil | ~0.5-1.1% de ingresos en Medellin |
| **ICA Bogota** (si opera) | Bogota | Bimestral | 2 meses post-cierre | 4.14-13.8 por mil | ~0.5-1.4% de ingresos en Bogota |
| **ICA otros** | Segun operacion | Anual o segun municipio | Segun municipio | Variable | Variable |

---

## Obligaciones Anuales

| Obligacion | Formulario | Vencimiento est. | Salida de Caja Est. | Penalidad por no presentar |
|-----------|-----------|-----------------|-------------------|--------------------------|
| **Renta PJ** | F-110 | Abril (segun NIT) | 35% de renta liquida - retenciones | 20% de consignaciones bancarias |
| **Renta PN** (si aplica) | F-210 | Ago-Oct (segun NIT) | Segun tabla progresiva | 20% de ingresos brutos |
| **Informacion Exogena** | XML (1001-1009, 2275) | Mar-Abr (segun NIT) | $0 (solo informativa) | 5%/mes de sumas no reportadas |
| **Certificados retencion** | Template MetodologIA | Antes del 31/03 | $0 | 5% retenciones no certificadas |
| **Estados financieros** | NIIF completos | Marzo (para asamblea) | $0 | Presuncion mala fe (C.Co. Art. 19) |
| **Asamblea socios** | Acta de asamblea | Antes del 31/03 | $0 | Irregularidad societaria |
| **Renovacion Camara Comercio** | RUES | Antes del 31/03 | ~$300K-$1M | Multas + perdida matricula |
| **ICA consolidada anual** | Segun municipio | Ene-Mar (segun municipio) | Segun liquidacion | Sanciones municipales |

---

## Obligaciones Eventuales

| Obligacion | Cuando | Responsable |
|-----------|--------|------------|
| Actualizacion RUT | Cuando cambien datos | Representante Legal |
| Resolucion de facturacion | Al agotarse consecutivos o vencer resolucion | Contador |
| Habilitacion facturador electronico | Al constituirse o cambiar proveedor tecnologico | Contador + TI |
| Registro RNBD | Al crear bases de datos; actualizar anualmente | OPD |

---

## Calendario Visual con Carga Tributaria

| Mes | Obligaciones clave | Carga relativa |
|-----|-------------------|---------------|
| **Ene** | PILA, Retencion dic, Renovacion Camara, ICA cierre anual | Media |
| **Feb** | PILA, Retencion ene, Preparar exogena, Consignar cesantias (14/02) | Media |
| **Mar** | PILA, Retencion feb, **Certificados retencion (31/03)**, **EEFF**, **Asamblea**, Exogena | **ALTA** |
| **Abr** | PILA, Retencion mar, **Renta PJ** (segun NIT), IVA cuatrimestral (Ene-Abr) | **ALTA** |
| **May** | PILA, Retencion abr | Baja |
| **Jun** | PILA, Retencion may, Prima servicios 1era mitad (30/06) | Media |
| **Jul** | PILA, Retencion jun | Baja |
| **Ago** | PILA, Retencion jul, IVA cuatrimestral (May-Ago), Renta PN (si aplica) | **ALTA** |
| **Sep** | PILA, Retencion ago | Baja |
| **Oct** | PILA, Retencion sep | Baja |
| **Nov** | PILA, Retencion oct | Baja |
| **Dic** | PILA, Retencion nov, IVA cuatrimestral (Sep-Dic), Prima 2da mitad (20/12), Preparar cierre | **ALTA** |

---

## Determinacion de Fecha por NIT

Las fechas exactas DIAN dependen del **ultimo digito del NIT** (sin digito de verificacion).

| Ultimo digito NIT | Tipicamente vence (referencia) |
|-------------------|-------------------------------|
| 1 | Primeros del rango |
| 2-3 | Segunda semana del rango |
| 4-5 | Tercera semana del rango |
| 6-7 | Cuarta semana del rango |
| 8-9-0 | Ultimos del rango |

**Accion:** Al publicarse el Decreto de Plazos 2026, el Contador debe:
1. Extraer la tabla exacta para el NIT de MetodologIA
2. Actualizar este calendario con fechas firmes
3. Programar alarmas a -30, -15, -5 dias de cada vencimiento

---

## Recordatorios Criticos

| Dias antes | Accion | Responsable |
|-----------|--------|------------|
| **-30** | Notificar a Finanzas para asegurar liquidez | Contador |
| **-15** | Declaracion preparada en borrador para revision | Contador |
| **-5** | Declaracion lista, pago programado | Contador + CFO |
| **Dia 0** | Presentar y pagar antes de las 23:59 | Contador |

---

## Changelog

- v2.0.0 — Salida de caja estimada, calculadora de penalidades, guia NIT, carga relativa mensual
- v1.0.0 — Creacion inicial
