# SOP: Resolución de Disputas de Pago

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Finanzas / COO
**Cierra:** FM-19 (Backcasting COO)

---

## 1. Propósito

Establecer el procedimiento para resolver disputas cuando un cliente rechaza, cuestiona o demora el pago de una factura.

---

## 2. SLA de Resolución

| Plazo | Acción |
|-------|--------|
| **0-5 días hábiles** | Acuse de recibo de la disputa + investigación inicial |
| **5-15 días hábiles** | Resolución o escalamiento |
| **15-30 días hábiles** | Resolución final o derivación a Legal |

---

## 3. Procedimiento

### Paso 1: Recepción de la disputa (Día 0)
- Finanzas recibe notificación del cliente (email, llamada, o rechazo formal de factura)
- Registrar disputa con ID: `DISP-[AAAA]-[###]`
- Clasificar tipo:

| Tipo | Descripción |
|------|-------------|
| **Error de factura** | Datos incorrectos, monto errado, IVA mal calculado |
| **Disputa de entregable** | Cliente alega que el hito/servicio no se completó |
| **Disputa de calidad** | Cliente alega que el servicio no cumple estándares pactados |
| **Disputa de alcance** | Cliente alega que se facturó algo fuera del alcance de ODS |
| **Falta de presupuesto** | Cliente no tiene fondos (problema de cash flow del cliente) |

### Paso 2: Investigación (Días 1-5)
| Tipo | Acción | Responsable |
|------|--------|------------|
| Error de factura | Verificar datos vs. ODS y RUT. Si hay error, emitir nota crédito + nueva factura | Finanzas |
| Disputa de entregable | Solicitar evidencia a Delivery (acta de entrega, informes) | Operaciones |
| Disputa de calidad | Activar revisión con Delivery Manager y SPOC cliente | Operaciones + Delivery |
| Disputa de alcance | Revisar ODS y comparar con lo facturado | Operaciones + Legal |
| Falta de presupuesto | Negociar plan de pagos con Sales Rep | Finanzas + Sales Rep |

### Paso 3: Resolución (Días 5-15)
| Resultado | Acción |
|-----------|--------|
| **MetodologIA tiene la razón** | Enviar respuesta formal al cliente con evidencias. Mantener factura vigente. |
| **Error de MetodologIA** | Emitir nota crédito. Nueva factura si aplica. Disculpa formal. |
| **Responsabilidad compartida** | Negociar ajuste parcial. Documentar acuerdo. |
| **Sin resolución** | Escalar a Director Comercial + Legal (ver Paso 4) |

### Paso 4: Escalamiento (Días 15-30)
- Director Comercial contacta al SPOC ejecutivo del cliente
- Si no hay resolución en 30 días, activar `CL-01: Resolución de Disputas` (cláusulas estándar)
- Legal evalúa acción formal

### Paso 5: Cierre
- Documentar resolución en registro de disputas
- Actualizar cartera y sistema contable
- Identificar acción preventiva (¿cómo evitar que se repita?)

---

## 4. Registro de Disputa

```
## REGISTRO DE DISPUTA DE PAGO

**ID:** DISP-[AAAA]-[###]
**Fecha de apertura:** [_______________]
**Factura disputada:** [Número]
**Monto disputado:** COP $[_______________]
**Cliente:** [_______________]
**Tipo:** ☐ Error | ☐ Entregable | ☐ Calidad | ☐ Alcance | ☐ Presupuesto
**Descripción:** [_______________]
**Responsable de investigación:** [_______________]
**Resolución:** [_______________]
**Fecha de cierre:** [_______________]
**Acción preventiva:** [_______________]
**Estado:** ☐ Abierta | ☐ En investigación | ☐ Escalada | ☐ Resuelta
```

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-19 / Javier Montaño + Claude
