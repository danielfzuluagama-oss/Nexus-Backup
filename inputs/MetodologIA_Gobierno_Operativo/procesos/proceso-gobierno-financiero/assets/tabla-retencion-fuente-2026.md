# Tabla de Retencion en la Fuente — Ano Gravable 2026

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Contador
**Cierra:** FMF-04 (Backcasting CFO)
**UVT 2026 estimada:** ~$47.065 COP (actualizar con resolucion DIAN)

> Actualizar cuando la DIAN publique el valor oficial de la UVT para 2026.

---

## Tarjeta Rapida: Los 5 Pagos Mas Comunes de MetodologIA

**Usar esta seccion como referencia diaria antes de procesar cualquier pago.**

| # | Vas a pagar a... | Concepto retencion | Tarifa | Base minima | Ejemplo: pago $5M |
|---|-----------------|-------------------|--------|-------------|-------------------|
| 1 | Facilitador independiente (PN declarante) | Honorarios | **11%** | $0 | Retienes $550.000 |
| 2 | Facilitador independiente (PN NO declarante) | Honorarios | **10%** | $0 | Retienes $500.000 |
| 3 | Proveedor de software (PJ) | Servicios | **4%** | >4 UVT (~$188K) | Retienes $200.000 |
| 4 | Alquiler salon para workshop | Arrendamiento inmueble | **3.5%** | >27 UVT (~$1.27M) | Retienes $175.000 |
| 5 | Plataforma LMS del exterior | Servicios + Reteiva 100% | **4% renta + 100% IVA** | $0 | Retienes $200K + todo el IVA |

---

## Tabla Completa — Personas Naturales

| Concepto | Base min (UVT) | Base min (COP est.) | Tarifa Declarantes | Tarifa No Declarantes |
|---------|---------------|-------------------|-------------------|---------------------|
| Honorarios | 0 | $0 | 11% | 10% |
| Servicios en general | 4 | ~$188.260 | 4% | 6% |
| Consultoria/Asesoria | 0 | $0 | 11% | 10% |
| Arrendamiento inmuebles | 27 | ~$1.270.755 | 3.5% | 3.5% |
| Arrendamiento muebles | 0 | $0 | 4% | 4% |
| Compras (bienes muebles) | 27 | ~$1.270.755 | 2.5% | 3.5% |
| Transporte (carga) | 4 | ~$188.260 | 1% | 1% |
| Transporte (pasajeros) | 27 | ~$1.270.755 | 3.5% | 3.5% |
| Otros ingresos tributarios | 27 | ~$1.270.755 | 2.5% | 3.5% |

## Tabla Completa — Personas Juridicas

| Concepto | Base min (UVT) | Base min (COP est.) | Tarifa |
|---------|---------------|-------------------|--------|
| Honorarios | 0 | $0 | 11% |
| Servicios en general | 4 | ~$188.260 | 4% |
| Consultoria/Asesoria | 0 | $0 | 11% |
| Compras (bienes muebles) | 27 | ~$1.270.755 | 2.5% |
| Arrendamiento inmuebles | 27 | ~$1.270.755 | 3.5% |

## Retencion de IVA (Reteiva)

| Concepto | Tarifa | Cuando aplica |
|---------|--------|-------------|
| Regimen comun a regimen comun | 15% del IVA | Cuando MetodologIA es gran contribuyente o designado |
| Servicios desde el exterior | 100% del IVA | Siempre que se pague servicio digital o profesional del exterior |

---

## Retencion sobre Ingresos Laborales (Nomina)

Procedimiento 1 (mensual) — Art. 383-386 ET:

| Rango ingreso laboral gravable mensual (UVT) | COP estimado | Tarifa marginal |
|-----------------------------------------------|-------------|----------------|
| 0 a 95 | hasta ~$4.471.175 | 0% |
| 95 a 150 | hasta ~$7.059.750 | 19% |
| 150 a 360 | hasta ~$16.943.400 | 28% |
| 360 a 640 | hasta ~$30.121.600 | 33% |
| 640 a 945 | hasta ~$44.476.425 | 35% |
| 945 a 2.300 | hasta ~$108.249.500 | 37% |
| >2.300 | superior | 39% |

**Nota:** Aplicar sobre ingreso laboral gravable DESPUES de deducir aportes obligatorios a salud, pension, dependientes (10% hasta 32 UVT), intereses de vivienda, y medicina prepagada.

---

## Casos Especiales (Edge Cases)

### Pagos a Regimen Simple de Tributacion (RST)

| Situacion | Retencion aplicable | Nota |
|----------|-------------------|------|
| Pago a persona del RST | **NO se practica retencion de renta** | El RST reemplaza el impuesto de renta. Art. 911 ET. |
| Reteiva | **NO se practica** | RST no es responsable de IVA en la mayoria de actividades |
| Documento soporte | Emitir **documento soporte en adquisiciones** (Res. DIAN 000167/2021) si el proveedor RST no emite factura electronica | Obligatorio para deducibilidad |

### Pagos a No Residentes Fiscales

| Tipo de pago | Tarifa retencion | Base legal |
|-------------|-----------------|-----------|
| Servicios tecnicos, asistencia tecnica, consultoria | **15%** (si hay CDI) o **20%** (sin CDI) | Art. 408 ET |
| Regalias (licencias de software) | **15%** o **20%** | Art. 408 ET |
| Intereses | **15%** o **20%** | Art. 408 ET |
| Servicios digitales (SaaS, cloud) | **20%** sobre el valor pagado | Verificar si aplica CDI |
| IVA en servicios del exterior | **100% del IVA** (mecanismo de retencion) | Art. 437-2 ET |

**CDI vigentes Colombia:** Chile, Espana, Suiza, Canada, Mexico, Corea, India, Portugal, Reino Unido, Francia, Republica Checa, Italia, Japon (verificar vigencia).

### Pagos en Especie (No Monetarios)

| Situacion | Tratamiento |
|----------|------------|
| Pago con bienes o servicios en vez de dinero | La retencion se practica sobre el **valor comercial** del bien/servicio entregado |
| Como se paga la retencion si no hay flujo de caja? | El agente de retencion debe asumir el costo de la retencion y declararla normalmente |
| Base legal | Art. 27 ET: ingreso se realiza cuando se recibe, incluyendo pagos en especie |

---

## Changelog

- v2.0.0 — Tarjeta rapida 5 pagos comunes, edge cases (RST, no residentes, pagos en especie)
- v1.0.0 — Creacion inicial
