# SOP: Retención en la Fuente — Cálculo, Aplicación y Certificación

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Contador / Finanzas
**Cierra:** FMF-04, FMF-07, FMF-21 (Backcasting CFO)
**Base legal:** Estatuto Tributario Arts. 365-419, 406-415 (no residentes), Decreto 1625/2016, Resolución DIAN 000167/2021

---

## 1. Propósito

Aplicar correctamente retenciones en la fuente, declararlas vía F-350 sin errores, emitir certificados anuales, y generar documentos soporte para pagos a no obligados a facturar.

**Decisión de diseño:** Este SOP es independiente del SOP de facturación. La persona que recibe y valida una factura no es siempre la persona que calcula y aplica la retención. Separar estos procesos permite: (a) segregación de funciones, (b) especialización del cálculo tributario en Contabilidad, (c) auditoría independiente de cada paso.

---

## 2. Tarifas de Retención 2026

> UVT 2026 estimada: ~$47.065. Actualizar con decreto de reajuste anual. [SUPUESTO]

### 2.1 Pagos Nacionales (residentes fiscales colombianos)

| Concepto | Base mínima (UVT) | Base mínima (COP est.) | Tarifa | Aplica a en MetodologIA |
|---------|-------------------|----------------------|--------|------------------------|
| Honorarios (declarante renta) | 0 | $0 | 11% | Consultores, facilitadores |
| Honorarios (NO declarante renta) | 0 | $0 | 10% | Freelancers sin declaración |
| Servicios en general | 4 | ~$188.260 | 4% | Proveedores de servicios |
| Consultoría (Dto. 2201/2016) | 0 | $0 | 11% | Consultorías especializadas |
| Compras (bienes muebles) | 27 | ~$1.270.755 | 2.5% | Materiales, equipos |
| Arriendo bienes muebles | 0 | $0 | 4% | Alquiler de equipos |
| Arriendo bienes inmuebles | 27 | ~$1.270.755 | 3.5% | Alquiler de oficinas, salones |
| Transporte (carga) | 4 | ~$188.260 | 1% | Envíos, logística |
| Otros ingresos tributarios | 27 | ~$1.270.755 | 2.5% | Residual |

### 2.2 Pagos a No Residentes (Art. 406-415 ET)

| Concepto | Tarifa | Base legal | Notas |
|---------|--------|-----------|-------|
| Servicios técnicos, asistencia técnica, consultoría | 20% | Art. 408 ET | Reducible por convenio de doble imposición (CDI) |
| Regalías, licencias de software | 20% | Art. 408 ET | Verificar si hay CDI con país del proveedor |
| Servicios digitales / software como servicio | 20% | Art. 408 ET | Incluye SaaS, PaaS, IaaS pagados al exterior |
| Comisiones | 20% | Art. 408 ET | |
| Intereses | 15% | Art. 408 ET | 5% si hay CDI aplicable |
| Dividendos a no residentes | 10% | Art. 245 ET | Tarifa especial |

**Procedimiento para pagos a no residentes:**

| Paso | Acción |
|------|--------|
| 1 | Verificar residencia fiscal del proveedor (¿tiene NIT colombiano? ¿Tiene CDI?) |
| 2 | Si hay CDI vigente (España, Chile, Suiza, México, Canadá, India, UK, etc.): solicitar **certificado de residencia fiscal** del país de origen para aplicar tarifa reducida |
| 3 | Calcular retención sobre el 100% del pago bruto (no hay base mínima en UVT para no residentes) |
| 4 | Retener ANTES de transferir. El giro al exterior se hace neto de retención |
| 5 | Declarar en F-350 con código de concepto correspondiente a no residentes |
| 6 | Emitir certificado de retención al no residente (lo necesita para su declaración en país de origen) |

### 2.3 Pagos en Moneda Extranjera — TRM Aplicable

| Momento | TRM a usar | Base legal |
|---------|-----------|-----------|
| Factura del proveedor | TRM de la fecha de la factura (para registro contable) | Art. 285 ET |
| Retención en la fuente | TRM de la fecha del pago o abono en cuenta, lo que ocurra primero | Art. 366 ET, Concepto DIAN 013105/2018 |
| Si hay diferencia en cambio entre factura y pago | La diferencia es ingreso/gasto financiero, no modifica la retención | Art. 288 ET |

**Regla práctica:** Consultar TRM en superfinanciera.gov.co el día del pago. Documentar TRM usado y fuente.

### 2.4 Autorretención de renta (si aplica)

| Concepto | Tarifa | Aplica si |
|---------|--------|---------|
| Autorretención especial de renta | 0.40% - 1.60% | MetodologIA es autorretenedor (verificar RUT responsabilidad 15) |

---

## 3. Procedimiento al Pagar a un Tercero

### Paso 1: Recibir soporte

| Tipo de tercero | Documento requerido | Si no lo presenta |
|----------------|--------------------|--------------------|
| PJ o PN obligada a facturar | Factura electrónica con CUFE | NO PAGAR |
| PN no obligada a facturar | Cuenta de cobro (`template-cuenta-de-cobro.md`) | MetodologIA genera documento soporte en adquisiciones |
| Independiente | Factura/cuenta de cobro + planilla PILA pagada | NO PAGAR sin PILA (`sop-pila-independientes.md`) |
| No residente | Invoice/factura del exterior | MetodologIA genera documento soporte + retención Art. 406+ |

### Paso 2: Calcular retención

1. Identificar concepto de pago (honorarios, servicios, compras, pago al exterior...)
2. Verificar si el monto supera la base mínima en UVT (no aplica para no residentes)
3. Si supera: aplicar tarifa sobre base gravable
4. Si NO supera: no retener, pero registrar para información exógena

### Paso 3: Registrar contablemente

| Cuenta | Débito | Crédito |
|--------|--------|---------|
| Gasto/Costo por el servicio | X | |
| Retención en la fuente por pagar (2365XX) | | X |
| Bancos / Cuentas por pagar | | X (neto) |

### Paso 4: Declarar y pagar (F-350)

Ver Sección 4 — Procedimiento de Conciliación Mensual.

### Paso 5: Certificado de retención (anual)

- Antes del **31 de marzo** del año siguiente
- Para CADA tercero retenido (nacionales Y no residentes)
- Usando `template-certificado-retencion.md`
- Conservar copia firmada por 5 años

---

## 4. Conciliación Mensual de Retenciones (Pre-F-350)

Ejecutar entre el día 1 y el día 5 del mes siguiente al periodo.

| Paso | Acción | Responsable | Evidencia |
|------|--------|-------------|-----------|
| 1 | Extraer del sistema contable: listado de todas las retenciones causadas en el mes, agrupadas por concepto y tarifa | Contador | Reporte contable |
| 2 | Cruzar con soportes: verificar que cada retención tiene factura/cuenta de cobro/documento soporte correspondiente | Auxiliar contable | Cruce sin diferencias |
| 3 | Verificar bases y tarifas: recalcular al menos 20% de las retenciones del mes (muestreo) para detectar errores de tarifa o base | Contador | Hoja de verificación |
| 4 | Conciliar saldo de cuenta 2365 (retención por pagar) contra acumulado de retenciones del mes | Contador | Conciliación firmada |
| 5 | Si hay diferencias: identificar causa, corregir contablemente, documentar | Contador | Nota de ajuste |
| 6 | Pre-llenar F-350 y revisar antes de envío | Contador | Borrador F-350 revisado |
| 7 | Presentar F-350 antes del vencimiento (ver `calendario-tributario-2026.md`) | Contador | Acuse de recibo DIAN |
| 8 | Pagar valor total retenido a DIAN | Finanzas | Recibo de pago |

---

## 5. Errores Comunes y Cómo Corregirlos

| Error | Cómo detectarlo | Cómo corregirlo |
|-------|-----------------|-----------------|
| **Tarifa equivocada** (ej. 4% en vez de 11% a honorarios) | Cruce de concepto vs. tarifa en conciliación mensual | Si se retuvo DE MENOS: cobrar al beneficiario la diferencia o asumir como mayor gasto. Si se retuvo DE MÁS: el beneficiario puede solicitar devolución, o se descuenta de pagos futuros con autorización escrita. Corregir F-350 con corrección voluntaria. |
| **Base equivocada** (ej. retener sobre valor con IVA incluido cuando no aplica) | Verificar si la base incluye IVA indebidamente | La retención de renta se calcula sobre la base gravable SIN IVA (salvo retención de IVA que tiene su propia lógica). Corregir F-350. |
| **Retención sobre ingreso exento** (ej. retener a entidad sin ánimo de lucro con certificación) | Revisar RUT del tercero — responsabilidad 04 o certificación DIAN de no sujeto | Devolver retención al beneficiario. Presentar F-350 de corrección. |
| **No retener cuando debía retener** | Auditoría interna o requerimiento DIAN | Asumir la retención no practicada como gasto no deducible. Presentar F-350 de corrección con sanción reducida (Art. 588 ET). |
| **F-350 presentado con errores** | Notificación DIAN o detección interna | Corrección voluntaria dentro de los 2 años siguientes (Art. 588 ET): sanción del 10% si es dentro de los primeros 2 meses, 20% después. |
| **F-350 no presentado** | Calendario tributario vencido sin acuse | Presentar inmediatamente. Sanción por extemporaneidad: 5% por mes de retraso sobre valor a pagar (Art. 641 ET). |

---

## 6. Documento Soporte en Adquisiciones (Resolución DIAN 000167/2021)

Obligatorio cuando MetodologIA paga a personas no obligadas a facturar. Sin este documento, el gasto NO es deducible.

| Campo | Obligatorio |
|-------|------------|
| Nombre/razón social y NIT del adquirente (MetodologIA) | SÍ |
| Nombre y documento del vendedor/prestador | SÍ |
| Fecha de la operación | SÍ |
| Descripción del servicio o bien | SÍ |
| Valor de la operación | SÍ |
| Forma de pago | SÍ |
| Discriminación del IVA (si aplica) | SÍ |
| Firma del adquirente | SÍ |

---

## 7. Template de Certificado de Retención

```
CERTIFICADO DE RETENCIÓN EN LA FUENTE — AÑO GRAVABLE [AAAA]

Agente retenedor:
- Razón social: [MetodologIA ___]
- NIT: [___]
- Dirección: [___]

Sujeto de retención:
- Nombre: [___]
- NIT/CC/Pasaporte: [___]
- Dirección: [___]
- País de residencia fiscal: [___]

Durante el año gravable [AAAA] se practicaron las siguientes retenciones:

| Concepto | Base gravable (COP) | Tarifa (%) | Valor retenido (COP) |
|---------|-------------------|-----------|---------------------|
| Honorarios | $[___] | 11% | $[___] |
| Servicios | $[___] | 4% | $[___] |
| Pagos al exterior | $[___] | 20% | $[___] |
| IVA retenido | $[___] | 15% | $[___] |
| TOTAL | $[___] | | $[___] |

Valor total pagado en el año: COP $[___]
Valor total retenido en el año: COP $[___]

Expedido conforme al Art. 381 del Estatuto Tributario.

[Ciudad], [Fecha]

______________________________
[Nombre del Representante Legal o Contador]
[Cargo]
[Tarjeta Profesional del Contador: TP-XXXXX]
```

---

## 8. Criterio de Estabilidad del Proceso

El proceso de retención en la fuente se considera **estable** cuando:

- **F-350 presentado a tiempo** con **cero errores** durante **6 meses consecutivos**
- Cero requerimientos DIAN relacionados con retenciones en el periodo
- 100% de certificados de retención emitidos antes del 31 de marzo
- Conciliación mensual ejecutada y firmada cada mes sin excepción
- Cero diferencias sin explicar entre cuenta 2365 y F-350

Si alguno de estos criterios falla, el proceso requiere intervención del Owner para identificar causa raíz.

---

## Changelog

- v2.0.0 — Reescritura completa: pagos a no residentes (Art. 406+ ET), TRM para pagos en moneda extranjera, conciliación mensual pre-F-350, errores comunes y correcciones, criterio de estabilidad, justificación de separación de facturación / Javier Montaño + Claude
- v1.0.0 — Creación inicial / Cierra FMF-04, 07, 21 / Javier Montaño + Claude
