# Proceso: Gestionar Operaciones Comerciales

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Director Financiero
**Audiencia:** Finanzas, Operaciones, Director Comercial
**Cierra:** FM-04, FM-07, FM-13, FM-19

---

## 1. Propósito y Alcance

Gobernar el ciclo financiero post-contrato: facturación, cobro, reconocimiento de ingresos, forecast, control de gastos, y resolución de disputas de pago.

**Incluye:**
- Emisión de facturas electrónicas (DIAN)
- Seguimiento de cartera y cobro
- Reconocimiento de ingresos (NIIF/IFRS 15)
- Forecast mensual de ARR/MRR
- Aprobación de gastos operativos
- Resolución de disputas de pago
- Reporte de varianza presupuestal

**NO incluye:**
- Negociación de precios (es input de `gestionar-presales-proceso.md`)
- Firma de contratos (es input de `checklist-pre-firma.md`)
- Delivery técnica (es input de `proceso-delivery-servicios`)

---

## 2. Fases del Proceso

```
FACTURAR → COBRAR → RECONOCER → REPORTAR → FORECAST
(Hitos/Mensual) (30d) (Al cumplir obligation) (Mensual) (Mensual)
```

---

## 3. SOPs del Proceso

| SOP | Ubicación | Cierra FM |
|-----|-----------|-----------|
| `facturar-servicio-sop.md` | `references/sop/sop-facturacion/` | FM-07 |
| `reconocer-ingresos-sop.md` | `references/sop/sop-reconocimiento-ingresos/` | FM-04 |
| `resolver-disputa-pago-sop.md` | `references/sop/sop-disputas-pagos/` | FM-19 |
| `forecast-arr-mrr-sop.md` | `references/sop/sop-forecast/` | Financial visibility |
| `aprobar-gasto-sop.md` | `references/sop/sop-aprobacion-gastos/` | FM-13 |

---

## 4. Assets del Proceso

| Asset | Ubicación | Propósito |
|-------|-----------|-----------|
| `playbook-precios-unificado.md` | `assets/` | Referencia canónica de precios por vertical |
| `plantilla-factura.md` | `assets/` | Template DIAN-compliant |
| `plantilla-reporte-varianza.md` | `assets/` | Template de reporte mensual |

---

## 5. KPIs

| KPI | Fórmula | Meta |
|-----|---------|------|
| DSO (Days Sales Outstanding) | Promedio de días entre facturación y cobro | < 45 días |
| Cartera >60 días | COP en facturas >60 días vencidas | < 5% del revenue |
| Precisión de forecast | |Forecast - Real| / Forecast | < 15% desviación |
| Aprobación de gastos en plazo | % gastos aprobados en <3 días | > 90% |
| Disputas resueltas en SLA | % disputas resueltas en <15 días | > 85% |

---

## Changelog

- v1.0.0 — Creación inicial / Javier Montaño + Claude
