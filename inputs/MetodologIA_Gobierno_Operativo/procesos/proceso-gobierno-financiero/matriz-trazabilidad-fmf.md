# Matriz de Trazabilidad — Cierre de Brechas CFO/Contador/Revisor Fiscal

**Version:** 2.0.0
**Fecha:** 2026-03-25

---

## Trazabilidad FMF con Criterios de Aceptacion y Riesgo Residual

| FMF | Descripcion | Sev | Documento(s) de Cierre | Estado | Criterio de Aceptacion | Riesgo Residual | Prox. Revision |
|-----|------------|-----|----------------------|--------|----------------------|----------------|---------------|
| 01 | Sin calendario tributario | CRIT | `calendario-tributario-2026.md` | CREADO | Calendario actualizado con decreto DIAN, revisado por Contador, alarmas programadas a -30/-15/-5 dias | BAJO: depende de actualizacion anual con decreto | 2026-12-15 |
| 02 | Renta no preparada | CRIT | `sop-obligaciones-dian.md` (sec. renta) | CREADO | SOP ejecutado en primer cierre anual, conciliacion NIIF-fiscal completada, declaracion presentada a tiempo | MEDIO: primer cierre sin historico, errores de conciliacion posibles | 2027-04-30 |
| 03 | IVA sin SOP | CRIT | `sop-obligaciones-dian.md` (sec. IVA) | CREADO | Primera declaracion IVA cuatrimestral presentada con SOP, IVA generado vs descontable conciliado | BAJO: proceso repetitivo, se estabiliza en 2do periodo | 2026-09-15 |
| 04 | Retencion sin tabla | ALTO | `tabla-retencion-fuente-2026.md` | CREADO | Tabla validada por Contador con UVT oficial 2026, usada en al menos 3 pagos a terceros sin error | BAJO: tabla es referencia estatica, actualizar anualmente | 2027-01-15 |
| 05 | PILA sin verificar | CRIT | `sop-pila-independientes.md` + checklist | CREADO | 100% de pagos a independientes con PILA verificada durante 3 meses consecutivos | MEDIO: depende de cumplimiento del contratista, posible resistencia | 2026-07-01 |
| 06 | Cuenta cobro sin formato | MEDIO | `template-cuenta-de-cobro.md` | CREADO | Template usado en 100% de cuentas de cobro recibidas, checklist de validacion aplicado, 0 rechazos por formato | BAJO: riesgo operativo menor | 2026-12-31 |
| 07 | Certificados retencion sin SOP | ALTO | `sop-retencion-fuente.md` (sec. certificados) | CREADO | Certificados 2025 emitidos antes del 31/03/2026 a todos los terceros retenidos | MEDIO: depende de datos completos de terceros | 2027-03-15 |
| 08 | EEFF sin template | CRIT | `sop-cierre-contable.md` | CREADO | Primer cierre mensual completado antes del dia 15, EEFF anuales 2025 aprobados por asamblea | ALTO: primer cierre sin practicas establecidas, curva de aprendizaje | 2026-06-15 |
| 09 | RF sin evaluar obligatoriedad | CRIT | `politica-roles-financieros.md` (evaluacion) | CREADO | Evaluacion completada con datos reales 2025, decision documentada, si obligatorio: RF designado antes 31/03 | BAJO: evaluacion es puntual y clara | 2027-01-31 |
| 10 | Contador no definido | CRIT | `politica-roles-financieros.md` (rol contador) | CREADO | Contador contratado con TP vigente verificada en JCC, contrato o acuerdo firmado | **BLOQUEANTE si no se ejecuta** — nada mas funciona sin contador | 2026-04-15 |
| 11 | Exogena sin preparar | ALTO | `sop-obligaciones-dian.md` (sec. exogena) | CREADO | Formatos XML generados y validados con prevalidador DIAN, presentados a tiempo | MEDIO: primer ano, posibles errores de formato | 2027-04-30 |
| 12 | ICA no declarado | ALTO | `calendario-tributario-2026.md` (sec. ICA) | CREADO | Municipios de operacion identificados, tarifas aplicadas, declaraciones presentadas | MEDIO: depende de claridad sobre donde se prestan servicios presenciales | 2026-06-30 |
| 13 | Nomina sin proceso | CRIT | `sop-nomina-parafiscales.md` | CREADO | Si hay empleados: primera nomina liquidada con SOP, PILA patronal pagada, prestaciones provisionadas | BAJO si no hay empleados hoy. ALTO si se contrata sin SOP. | 2026-12-31 |
| 14 | SAGRILAFT sin sistema | ALTO | `politica-sagrilaft.md` | CREADO | Regimen determinado (SAGRILAFT/PTEE), oficial designado, KYC integrado en due diligence, capacitacion anual realizada | MEDIO: depende de disciplina en vinculacion | 2026-12-31 |
| 15 | Control consecutivo factura | MEDIO | `sop-obligaciones-dian.md` (sec. facturacion) | CREADO | Revision mensual de consecutivo sin saltos durante 3 meses, resolucion vigente verificada | BAJO: control sencillo y automatizable | 2026-09-30 |
| 16 | Exenciones IVA educacion | MEDIO | `analisis-exenciones-iva-educacion.md` | CREADO | Analisis validado por asesor tributario, decision de licencia MEN documentada con costo-beneficio | BAJO: decision clara (no buscar licencia hasta $200M en bootcamps) | 2027-06-30 |
| 17 | Precios transferencia | MEDIO | Evaluacion en `politica-roles-financieros.md` nota 14 | MENCIONADO | Transacciones con vinculados cuantificadas, si >umbrales: documentacion de PT preparada | BAJO: probablemente no aplica aun | 2027-03-31 |
| 18 | Flujo caja sin proyeccion | ALTO | `forecast-arr-mrr-sop.md` (actualizar) + calendario | CREADO | Forecast trimestral incluye pagos tributarios del calendario, alertas de iliquidez a -30 dias | MEDIO: depende de actualizacion constante del forecast | 2026-07-01 |
| 19 | Soportes costos sin politica | ALTO | `politica-roles-financieros.md` (sec. 8) | CREADO | 100% de gastos con soporte completo durante 3 meses, gastos sin soporte reclasificados como no deducibles | MEDIO: requiere cambio de habitos operativos | 2026-09-30 |
| 20 | Defensa auditoria sin protocolo | ALTO | `sop-defensa-auditoria-dian.md` | CREADO | Checklist pre-auditoria completado, directorio de contacto actualizado, primer simulacro de respuesta a requerimiento | MEDIO: nunca se ha probado en situacion real | 2026-12-31 |
| 21 | Doc soporte adquisiciones | ALTO | `sop-retencion-fuente.md` (sec. doc soporte) | CREADO | Documentos soporte emitidos para 100% de compras a no obligados a facturar durante 3 meses | MEDIO: depende de identificar correctamente a quienes aplica | 2026-09-30 |
| 22 | Archivo sin politica | MEDIO | `politica-roles-financieros.md` (sec. 9) | CREADO | Ubicacion de archivo definida, backup configurado, plazos de retencion implementados en sistema | BAJO: una vez configurado, es mantenimiento | 2026-12-31 |

---

## Resumen

| Severidad | Total | Cerrados | Riesgo Residual Promedio |
|-----------|-------|----------|------------------------|
| CRITICO | 8 | **8** | MEDIO (primer ano sin historico) |
| ALTO | 10 | **10** | MEDIO (requiere disciplina operativa) |
| MEDIO | 4 | **4** | BAJO |
| **TOTAL** | **22** | **22 (100%)** | **MEDIO-BAJO** |

---

## Proximas Acciones Criticas (Orden de Prioridad)

| Prioridad | FMF | Accion Inmediata | Deadline |
|----------|-----|-----------------|----------|
| **1** | 10 | Contratar contador con TP vigente | 2026-04-15 |
| **2** | 01 | Actualizar calendario con decreto plazos DIAN 2026 | Al publicarse decreto |
| **3** | 08 | Completar primer cierre contable mensual | 2026-05-15 |
| **4** | 05 | Verificar PILA en proximos 3 pagos a independientes | Proximo pago |
| **5** | 03 | Preparar primera declaracion IVA cuatrimestral | 2026-05 (Ene-Abr) |

---

## Changelog

- v2.0.0 — Criterios de aceptacion, riesgo residual, fecha proxima revision, acciones priorizadas
- v1.0.0 — Creacion inicial
