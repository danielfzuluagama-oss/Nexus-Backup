# SOP: Forecast de ARR/MRR

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Finanzas
**Frecuencia:** Mensual (día 10 de cada mes para el mes en curso + 2 meses adelante)

---

## 1. Propósito

Generar una proyección mensual de ingresos recurrentes y no recurrentes, basada en contratos firmados + pipeline ponderado, para informar decisiones de contratación, inversión y cash flow.

---

## 2. Definiciones

| Término | Definición |
|---------|-----------|
| **ARR** (Annual Recurring Revenue) | Ingreso anualizado de contratos recurrentes (suscripciones, programas continuos) |
| **MRR** (Monthly Recurring Revenue) | ARR / 12 |
| **Revenue No Recurrente** | Ingresos puntuales (workshops, consultorías one-shot) |
| **Pipeline Ponderado** | Valor del pipeline × probabilidad de cierre según clasificación |

---

## 3. Factores de Ponderación del Pipeline

| Clasificación del lead | Probabilidad | Factor |
|----------------------|-------------|--------|
| HOT (score ≥18) | 70% | 0.70 |
| WARM (score 12-17) | 30% | 0.30 |
| NURTURE (score 7-11) | 5% | 0.05 |
| Propuesta enviada (awaiting response) | 50% | 0.50 |
| Propuesta aceptada (en negociación) | 80% | 0.80 |
| Contrato firmado (en setup) | 95% | 0.95 |

---

## 4. Procedimiento

### Paso 1: Recopilar datos de contratos firmados (Día 1-3)

| Fuente | Datos | Responsable |
|--------|-------|------------|
| Registro CLM | Contratos activos, valor, calendario de facturación | Operaciones |
| Sistema contable | Revenue reconocido mes anterior, cuentas por cobrar | Finanzas |
| Delivery Managers | % de avance de ODS activas (para revenue por % de completion) | Delivery |

### Paso 2: Recopilar datos de pipeline (Día 3-5)

| Fuente | Datos | Responsable |
|--------|-------|------------|
| CRM / Pipeline tracker | Deals activos con score, monto estimado, fecha estimada de cierre | Director Comercial |
| Sales Reps | Actualización de status de cada deal | Sales Reps |

### Paso 3: Calcular forecast (Día 5-8)

```
Forecast Mes N =
  Revenue de contratos firmados (cierto)
  + Pipeline ponderado con cierre estimado en Mes N
  + Ingreso diferido que se reconoce en Mes N (ref: reconocer-ingresos-sop.md)
```

**Calcular para:** Mes en curso + Mes N+1 + Mes N+2

### Paso 4: Comparar con cuota y presupuesto (Día 8-9)

| Comparación | Análisis |
|------------|---------|
| Forecast vs. Cuota trimestral | ¿Estamos en track? Si <80% de cuota, alertar. |
| Forecast vs. Presupuesto de gastos | ¿Cash flow es positivo? Si forecast < gastos proyectados, alertar COO. |
| Forecast actual vs. Forecast mes anterior | ¿Mejoramos o empeoramos? Explicar variaciones >10%. |

### Paso 5: Presentar y documentar (Día 10)

| Acción | Responsable | Audiencia |
|--------|------------|-----------|
| Presentar forecast en reunión mensual de dirección | COO | CEO, Director Comercial, Finanzas |
| Documentar en reporte mensual | Finanzas | Archivo |

---

## 5. Template de Forecast

```
## FORECAST MENSUAL — [Mes/Año]

**Fecha de generación:** [___]
**Generado por:** [___]

### Revenue Cierto (Contratos firmados)

| Cliente | ODS | Valor total | Revenue este mes | Método |
|---------|-----|-------------|-----------------|--------|
| [___] | [___] | COP $[___] | COP $[___] | Hito / % avance / Lineal |
| **Subtotal** | | | **COP $[___]** | |

### Pipeline Ponderado

| Deal | Valor | Clasificación | Factor | Valor ponderado | Cierre estimado |
|------|-------|-------------|--------|----------------|----------------|
| [___] | COP $[___] | HOT/WARM/Propuesta | [0.XX] | COP $[___] | [Mes] |
| **Subtotal** | | | | **COP $[___]** | |

### Resumen

| Concepto | Mes Actual | Mes N+1 | Mes N+2 |
|---------|-----------|---------|---------|
| Revenue cierto | COP $[___] | COP $[___] | COP $[___] |
| Pipeline ponderado | COP $[___] | COP $[___] | COP $[___] |
| **Forecast total** | **COP $[___]** | **COP $[___]** | **COP $[___]** |
| Cuota | COP $[___] | COP $[___] | COP $[___] |
| % vs cuota | __% | __% | __% |

### Alertas
[Variaciones >10% vs mes anterior, riesgos de cash flow, deals en riesgo]
```

---

## Changelog

- v1.0.0 — Creación inicial / Javier Montaño + Claude
