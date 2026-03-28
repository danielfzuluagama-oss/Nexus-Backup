# SOP: Aprobación de Gastos

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** COO / Finanzas
**Cierra:** FM-13 (Backcasting COO)

---

## 1. Propósito

Controlar los gastos operativos mediante bandas de aprobación por monto, asegurando que ningún gasto significativo se ejecute sin autorización del nivel correspondiente.

---

## 2. Bandas de Aprobación

| Monto (COP) | Aprobador | Medio | Plazo |
|-------------|-----------|-------|-------|
| < 500K | Manager directo | Email | 1 día hábil |
| 500K - 5M | Director del área | Email con justificación | 2 días hábiles |
| 5M - 20M | COO | Email + presupuesto del proyecto | 3 días hábiles |
| > 20M | CEO | Reunión + aprobación escrita | 5 días hábiles |

---

## 3. Gastos Pre-Aprobados (no requieren solicitud individual)

| Categoría | Límite mensual | Condición |
|-----------|---------------|-----------|
| Licencias de software recurrentes (ya contratadas) | Valor del contrato | Renovación automática aprobada |
| Viáticos de ventas (visitas a clientes) | COP 2M / mes / sales rep | Conforme a política de viáticos |
| Materiales para workshops (impresión, suministros) | COP 500K / evento | Con ODS asociada |

---

## 4. Procedimiento

### Paso 1: Solicitud
Solicitante envía email con:
- Concepto del gasto
- Monto estimado (COP + IVA)
- Proyecto/ODS asociado (si aplica)
- Proveedor propuesto
- Justificación
- ¿Estaba presupuestado? SÍ/NO

### Paso 2: Aprobación
Aprobador verifica contra presupuesto y responde APROBADO / RECHAZADO.

### Paso 3: Ejecución
Solicitante ejecuta el gasto y entrega comprobante (factura del proveedor).

### Paso 4: Registro
Finanzas registra el gasto en el sistema contable y actualiza el tracking de varianza presupuestal.

---

## 5. Reporte de Varianza Mensual

Finanzas genera un reporte mensual (`plantilla-reporte-varianza.md`) comparando gastos reales vs. presupuestados:

| Categoría | Presupuesto | Real | Varianza | % Desviación |
|-----------|------------|------|----------|-------------|
| [___] | COP $[___] | COP $[___] | COP $[___] | __% |

**Regla:** Si la varianza acumulada supera 15% del presupuesto trimestral, COO debe presentar plan de acción.

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-13 / Javier Montaño + Claude
