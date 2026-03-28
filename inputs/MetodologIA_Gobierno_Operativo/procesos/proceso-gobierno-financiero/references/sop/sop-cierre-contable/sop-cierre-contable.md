# SOP: Cierre Contable Mensual y Anual

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Contador Publico
**Cierra:** FMF-08, FMF-10 (Backcasting CFO)

---

## 1. Proposito

Garantizar que los libros contables se cierran mensualmente con informacion confiable, y que los estados financieros anuales se preparan conforme a NIIF para PYMES, listos para revision del revisor fiscal y aprobacion de la asamblea.

---

## 2. Cierre Contable Mensual

### Calendario

| Dia del mes siguiente | Actividad | Responsable |
|----------------------|-----------|------------|
| 1-3 | Recibir y registrar todas las facturas de compra del mes | Auxiliar contable |
| 1-3 | Verificar que todas las facturas de venta estan registradas | Auxiliar contable |
| 3-5 | Conciliaciones bancarias (todas las cuentas) | Contador |
| 3-5 | Registrar ingresos diferidos reconocidos en el mes | Contador |
| 5-7 | Calcular y registrar retenciones del mes | Contador |
| 5-7 | Registrar depreciaciones y amortizaciones | Contador |
| 7-8 | Registrar provisiones (garantias, cuentas incobrables, vacaciones, cesantias) | Contador |
| 8-10 | Revision de cuentas por cobrar: antiguedad y deterioro | Contador |
| 8-10 | Revision de cuentas por pagar: verificar que estan completas | Contador |
| 10-12 | Generar balance de prueba y verificar cuadre debitos = creditos | Contador |
| 12-15 | Generar estados financieros del mes (Balance, PyG) | Contador |
| 15 | Entrega de estados financieros mensuales al CFO/COO | Contador |

### Checklist de Cierre Mensual

```
## CIERRE CONTABLE — [Mes/Ano]

- [ ] Todas las facturas de venta registradas
- [ ] Todas las facturas de compra registradas
- [ ] Conciliaciones bancarias completadas (__ cuentas)
- [ ] Retenciones del mes calculadas y registradas
- [ ] PILA del mes registrado
- [ ] Depreciaciones y amortizaciones registradas
- [ ] Provisiones actualizadas
- [ ] Revenue reconocido conforme NIIF 15
- [ ] Ingresos diferidos reclasificados correctamente
- [ ] Balance de prueba cuadrado
- [ ] Estados financieros generados

Contador: _______________  Fecha cierre: _______________
```

---

## 3. Checklist de Conciliacion Obligatoria

**Estas cuentas DEBEN conciliar en cada cierre mensual sin excepcion:**

| # | Cuenta | Concilia contra | Tolerancia | Responsable |
|---|--------|----------------|-----------|------------|
| 1 | **Bancos** (todas las cuentas) | Extractos bancarios | $0 (exacto) | Contador |
| 2 | **Cuentas por cobrar — por cliente** | Facturas emitidas pendientes de cobro | $0 (exacto) | Contador |
| 3 | **Cuentas por pagar — por proveedor** | Facturas/cuentas de cobro recibidas pendientes | $0 (exacto) | Contador |
| 4 | **IVA por pagar** (2408) | Sumatoria de IVA generado en facturas del periodo | $0 | Contador |
| 5 | **IVA descontable** (2408) | Sumatoria de IVA en facturas de compra del periodo | $0 | Contador |
| 6 | **Retencion en la fuente por pagar** (2365-2368) | Sumatoria de retenciones practicadas en el mes | $0 | Contador |
| 7 | **Ingresos diferidos** (2805) | Contratos con facturacion anticipada - revenue reconocido | $0 | Contador |
| 8 | **Provisiones de prestaciones** (si hay empleados) | Calculo de prima, cesantias, vacaciones proporcionales | <$50K | Contador |

---

## 4. Templates de Asientos de Ajuste Comunes

### Ajuste 1: Depreciacion mensual

| Cuenta | Debito | Credito | Concepto |
|--------|--------|---------|---------|
| 5160 — Gasto depreciacion | $X | | Depreciacion mes [MM/AAAA] |
| 1592 — Depreciacion acumulada | | $X | Depreciacion acumulada equipo |

### Ajuste 2: Provision de prestaciones (prima + cesantias + vacaciones)

| Cuenta | Debito | Credito | Concepto |
|--------|--------|---------|---------|
| 5105 — Gasto prestaciones sociales | $X | | Provision prestaciones mes [MM/AAAA] |
| 2610 — Obligaciones laborales - cesantias | | $A | 8.33% del salario |
| 2610 — Obligaciones laborales - int. cesantias | | $B | 1% del salario |
| 2610 — Obligaciones laborales - prima | | $C | 8.33% del salario |
| 2610 — Obligaciones laborales - vacaciones | | $D | 4.17% del salario |

### Ajuste 3: Reconocimiento de ingreso diferido

| Cuenta | Debito | Credito | Concepto |
|--------|--------|---------|---------|
| 2805 — Ingresos diferidos | $X | | Revenue reconocido mes [MM/AAAA] segun NIIF 15 |
| 4135 — Ingresos por servicios | | $X | Ingreso del periodo por [concepto] |

### Ajuste 4: Retencion en la fuente por pagar

| Cuenta | Debito | Credito | Concepto |
|--------|--------|---------|---------|
| 2335 — Cuentas por pagar (tercero) | $X | | Neto pagado al proveedor |
| 2365 — Retencion en la fuente | | $Y | Retencion 11% honorarios |
| 1110 — Bancos | | $Z | Desembolso neto (X = Y + Z NO, X+Y es total, Z es lo que sale) |

*Nota: En la practica, al registrar la factura/cuenta de cobro se debita el gasto y se acreditan las retenciones y el pasivo neto.*

### Ajuste 5: Registro de PILA (aportes empleador)

| Cuenta | Debito | Credito | Concepto |
|--------|--------|---------|---------|
| 5105 — Gasto aportes patronales | $X | | PILA patronal mes [MM/AAAA] |
| 2370 — Retenciones y aportes de nomina | | $X | EPS 8.5% + AFP 12% + ARL + Caja + SENA + ICBF |

---

## 5. Red Flags Durante el Cierre

**Patrones que el Contador debe escalar al CFO/COO inmediatamente:**

| Red Flag | Que Indica | Accion |
|----------|-----------|--------|
| Gasto operativo del mes >130% del promedio de ultimos 3 meses | Gasto inusual no autorizado o error de registro | Verificar autorizacion, revisar facturas atipicas |
| Cuentas por cobrar de un cliente >90 dias | Riesgo de incobrabilidad | Activar gestion de cobro, evaluar provision de deterioro |
| Cuentas por cobrar totales >2x los ingresos del mes | Descalce de flujo de caja | Revisar politica de cobro, alertar tesoreria |
| Saldo bancario proyectado insuficiente para proximos 30 dias | Riesgo de iliquidez para pagos tributarios | Activar plan de contingencia de tesoreria |
| Facturas de venta sin registro >5 dias habiles | Posible sub-reporte de ingresos | Verificar con area comercial |
| Retenciones del mes significativamente diferentes al anterior sin explicacion | Error en calculo o en base | Revisar tabla de retencion y base de cada tercero |

---

## 6. Cierre Contable Anual

### Actividades adicionales al cierre de diciembre

| Actividad | Plazo | Responsable |
|----------|-------|------------|
| Inventario fisico de activos fijos | Diciembre | Operaciones + Contador |
| Evaluacion de deterioro de activos | Enero | Contador |
| Evaluacion de provision de cartera (CxC >90 dias) | Enero | Contador |
| Conciliacion fiscal (NIIF a base fiscal) | Enero-Febrero | Contador |
| Preparar estados financieros completos (5 estados + notas) | Febrero | Contador |
| Entrega a Revisor Fiscal para dictamen | Febrero | Contador |
| Correcciones derivadas de revision fiscal | Marzo | Contador |
| Aprobacion por Asamblea de Socios | Antes del 31/03 | Representante Legal |

### Estados Financieros Requeridos (NIIF para PYMES — Seccion 3)

1. **Estado de Situacion Financiera** (Balance General)
2. **Estado de Resultados Integral** (PyG)
3. **Estado de Cambios en el Patrimonio**
4. **Estado de Flujos de Efectivo** (metodo directo o indirecto)
5. **Notas a los Estados Financieros**

---

## 7. Estructura de Notas a los Estados Financieros

| Nota | Contenido |
|------|-----------|
| 1 | Informacion general de la entidad |
| 2 | Bases de preparacion y politicas contables |
| 3 | Efectivo y equivalentes |
| 4 | Cuentas por cobrar (antiguedad, deterioro) |
| 5 | Propiedad, planta y equipo |
| 6 | Intangibles (si aplica) |
| 7 | Cuentas por pagar |
| 8 | Obligaciones laborales |
| 9 | Impuestos por pagar y diferidos |
| 10 | Capital social y reservas |
| 11 | Ingresos operacionales por linea de servicio |
| 12 | Costos y gastos operacionales |
| 13 | Contingencias y compromisos |
| 14 | Transacciones con partes relacionadas (FMF-17) |
| 15 | Hechos posteriores al cierre |

---

## 8. Roles en el Cierre

| Rol | Responsabilidad | Requisito legal |
|-----|----------------|----------------|
| **Contador Publico** | Preparar EEFF, firmar declaraciones | Tarjeta profesional vigente (JCC) |
| **Revisor Fiscal** | Dictaminar EEFF, verificar cumplimiento | Contador publico independiente |
| **Representante Legal** | Aprobar y firmar EEFF, presentar a asamblea | Inscrito en Camara de Comercio |

---

## Changelog

- v2.0.0 — Checklist conciliacion obligatoria, 5 templates de asientos de ajuste, red flags durante cierre
- v1.0.0 — Creacion inicial
