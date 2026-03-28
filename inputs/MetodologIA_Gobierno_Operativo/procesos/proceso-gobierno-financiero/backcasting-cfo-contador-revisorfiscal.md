# Backcasting CFO / Contador / Revisor Fiscal — Modos de Fallo Financiero-Contable

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** CFO / Contador / COO
**Metodo:** Backcasting — "Que le reprocharia un revisor fiscal a un COO que lleva 6 meses sin gobierno financiero?"
**Contexto Legal:** Colombia — Estatuto Tributario, Codigo de Comercio, NIIF para PYMES, Ley 100/1993, Ley 1581/2012

---

## Proposito

Identificar los **22 modos de fallo** financieros, tributarios, contables y de seguridad social que un CFO, contador publico, o revisor fiscal senalarian como incumplimientos o riesgos graves. Esta version incluye interdependencias, exposicion financiera estimada, y matriz de priorizacion.

---

## Escala de Severidad

| Nivel | Significado | Rango de Exposicion COP |
|-------|-----------|------------------------|
| **CRITICO** | Sanciones DIAN, demandas laborales, inhabilitacion del contador, responsabilidad penal | >$50M o riesgo penal |
| **ALTO** | Multas, intereses moratorios, perdida de beneficios tributarios, contingencias fiscales | $5M - $50M |
| **MEDIO** | Desorden contable, ineficiencia operativa, riesgo en auditoria | <$5M |

---

## Matriz Compacta de 22 FMFs

| FMF | Categoria | SEV | Prob | Vel | Exposicion COP est. | Doc Requerido |
|-----|----------|-----|------|-----|---------------------|--------------|
| 01 | DIAN/Tributario | CRIT | Alta | Rapida | $5M-$50M (sanciones multiples) | `calendario-tributario-2026.md` |
| 02 | DIAN/Renta | CRIT | Alta | Lenta | 20% de consignaciones bancarias | `sop-obligaciones-dian.md` |
| 03 | DIAN/IVA | CRIT | Alta | Media | IVA no declarado + 29% EA intereses | `sop-obligaciones-dian.md` |
| 04 | DIAN/Retencion | ALTO | Alta | Media | 100% del valor no consignado | `tabla-retencion-fuente-2026.md` |
| 05 | Seg. Social | CRIT | Alta | Lenta | Solidaridad por prestaciones no cotizadas | `sop-pila-independientes.md` |
| 06 | Documental | MEDIO | Media | Lenta | <$1M (rechazos operativos) | `template-cuenta-de-cobro.md` |
| 07 | DIAN/Retencion | ALTO | Alta | Lenta | 5% retenciones no certificadas | `sop-certificados-retencion.md` |
| 08 | Contable/NIIF | CRIT | Alta | Lenta | Sin credito ni licitaciones | `sop-cierre-contable.md` |
| 09 | Auditoria/CCo | CRIT | Media | Lenta | Decisiones de junta anulables | `politica-roles-financieros.md` |
| 10 | Contable/Legal | CRIT | Alta | Rapida | Declaraciones como no presentadas | `politica-roles-financieros.md` |
| 11 | DIAN/Informativa | ALTO | Alta | Lenta | 5%/mes de sumas no reportadas | `sop-obligaciones-dian.md` |
| 12 | Municipal | ALTO | Media | Lenta | $2M-$10M por municipio | `calendario-tributario-2026.md` |
| 13 | Laboral/SS | CRIT | Alta (si hay empleados) | Rapida | Prision 48-108 meses | `sop-nomina-parafiscales.md` |
| 14 | Compliance | ALTO | Baja | Lenta | Multas hasta $312M + disolucion | `politica-sagrilaft.md` |
| 15 | DIAN/Facturacion | MEDIO | Media | Media | Inconsistencias detectadas en cruce | `facturar-servicio-sop.md` (actualizar) |
| 16 | Tributario/IVA | MEDIO | Baja | Lenta | Reliquidacion IVA + 100% inexactitud | `analisis-exenciones-iva-educacion.md` |
| 17 | DIAN/Internacional | MEDIO | Baja | Lenta | Sanciones precios transferencia | `evaluacion-precios-transferencia.md` |
| 18 | Tesoreria | ALTO | Alta | Rapida | Iliquidez en vencimiento tributario | `forecast-arr-mrr-sop.md` (actualizar) |
| 19 | Tributario/Renta | ALTO | Alta | Media | 100% diferencia por inexactitud | `politica-roles-financieros.md` |
| 20 | Auditoria/DIAN | ALTO | Media | Media | Consolidacion pretensiones DIAN | `sop-defensa-auditoria-dian.md` |
| 21 | DIAN/Facturacion | ALTO | Alta | Media | Gastos no deducibles | `sop-retencion-fuente.md` |
| 22 | Contable/Legal | MEDIO | Media | Lenta | Indefension en auditoria | `politica-roles-financieros.md` |

**Velocidad de materializacion:** Rapida = <30 dias | Media = 1-6 meses | Lenta = >6 meses

---

## Matriz de Priorizacion (Probabilidad x Severidad)

```
                    SEVERIDAD
                    MEDIO          ALTO           CRITICO
              +----------------+----------------+----------------+
  Alta        | FMF-06         | FMF-04,07,11   | FMF-01,02,03   |
  Prob        |                | FMF-18,19,21   | FMF-05,08,10,13|
              +----------------+----------------+----------------+
  Media       | FMF-15,22      | FMF-12,20      | FMF-09         |
  Prob        |                |                |                |
              +----------------+----------------+----------------+
  Baja        | FMF-16,17      | FMF-14         |                |
  Prob        |                |                |                |
              +----------------+----------------+----------------+

  LEER: Esquina superior derecha = ACTUAR PRIMERO
```

**Cuadrante de accion inmediata (Alta Prob + CRITICO):** FMF-01, 02, 03, 05, 08, 10, 13
Estos 7 FMFs representan riesgo existencial: sin mitigarlos, la empresa no sobrevive una auditoria.

---

## Mapa de Interdependencias

```
FMF-10 (Contador no definido)
  └──> BLOQUEA: FMF-01,02,03,04,07,08,11 (sin contador, nada se firma ni presenta)

FMF-01 (Sin calendario tributario)
  └──> ALIMENTA: FMF-02,03,12,18 (sin fechas, se incumple todo lo demas)

FMF-08 (Sin cierre contable)
  └──> BLOQUEA: FMF-02 (renta depende de cierre), FMF-11 (exogena depende de cierre)

FMF-05 (PILA sin verificar)
  └──> ALIMENTA: FMF-19 (gastos no deducibles sin PILA)

FMF-04 (Retencion sin tabla)
  └──> ALIMENTA: FMF-07 (certificados), FMF-21 (doc soporte)

FMF-19 (Sin politica soportes)
  └──> AMPLIFICA: FMF-20 (indefension en auditoria DIAN)
```

**Orden de ejecucion optimo:** FMF-10 → FMF-01 → FMF-08 → FMF-04 → FMF-05 → resto

---

## Detalle Expandido por FMF

### FMF-01: Sin Calendario Tributario
**Sancion:** 5% del impuesto a cargo por mes de retraso (Art. 641 ET). Minima 2026: ~$472.000 (10 UVT).
**Mitigacion actual:** NINGUNA → Doc: `calendario-tributario-2026.md`

### FMF-02: Declaracion de Renta No Preparada
**Sancion:** 20% de consignaciones bancarias o ingresos brutos (Art. 643 ET).
**Mitigacion actual:** NINGUNA → Doc: `sop-obligaciones-dian.md`

### FMF-03: IVA Sin SOP
**Sancion:** Extemporaneidad + intereses moratorios (~29% EA). Si MetodologIA es cuatrimestral (<92.000 UVT ingresos).
**Mitigacion parcial:** `facturar-servicio-sop.md` menciona IVA 19% pero NO cubre declaracion.

### FMF-04: Retencion en la Fuente Sin Tabla
**Sancion:** Responsabilidad solidaria (Art. 370 ET). No consignar: 100% del valor (Art. 665 ET).
**Mitigacion parcial:** Playbook menciona "tipicamente 11%" sin tabla detallada.

### FMF-05: PILA Independientes Sin Verificar
**Sancion:** Responsabilidad solidaria por prestaciones no cotizadas + reclasificacion laboral.
**Mitigacion actual:** NINGUNA. SOP compensacion 10/20/70 no menciona PILA.

### FMF-06: Cuenta de Cobro Sin Formato
**Impacto:** Rechazos operativos, demoras en pagos, riesgo de soportes incompletos.
**Mitigacion actual:** NINGUNA → Doc: `template-cuenta-de-cobro.md`

### FMF-07: Certificados de Retencion Sin SOP
**Sancion:** 5% de retenciones no certificadas (Art. 667 ET). Plazo: 31 de marzo.
**Mitigacion actual:** NINGUNA

### FMF-08: Estados Financieros Sin Cierre
**Sancion:** Presuncion de mala fe en procesos judiciales (Art. 19 num. 3 C.Co.). Sin credito ni licitaciones.
**Mitigacion actual:** NINGUNA → Doc: `sop-cierre-contable.md`

### FMF-09: Revisor Fiscal Sin Evaluar Obligatoriedad
**Umbral 2026:** Activos >$7.800M o Ingresos >$4.680M (est. SMMLV 2026 ~$1.560.000).
**Mitigacion actual:** NINGUNA → Doc: `politica-roles-financieros.md`

### FMF-10: Contador Publico No Definido
**Sancion:** Declaraciones sin firma = no presentadas (Art. 580 ET num. 4). BLOQUEANTE.
**Mitigacion actual:** NINGUNA → Doc: `politica-roles-financieros.md`

### FMF-11: Informacion Exogena Sin Preparar
**Sancion:** 5%/mes de sumas no reportadas (Art. 651 ET). Cruce DIAN detecta inconsistencias.
**Mitigacion actual:** NINGUNA

### FMF-12: ICA Municipal No Declarado
**Impacto:** Sanciones municipales + intereses. Tarifas 4.14 a 13.8 por mil.
**Mitigacion actual:** NINGUNA

### FMF-13: Nomina y Parafiscales Sin Proceso
**Sancion:** Responsabilidad penal del representante legal (Art. 271A CP): prision 48-108 meses.
**Aplica si:** Hay empleados directos. Si solo hay contratistas, ver FMF-05.

### FMF-14: SAGRILAFT Sin Sistema
**Aplica si:** Ingresos o activos >30.000 UVT (~$1.416M). Si no: PTEE simplificado.
**Sancion:** Multas hasta 200 SMMLV (~$312M) + posible disolucion.
**Mitigacion parcial:** `checklist-due-diligence-proveedores.md` cubre KYC parcial.

### FMF-15: Factura Electronica — Control Consecutivo
**Impacto:** Cruce DIAN detecta inconsistencias si hay saltos o anulaciones sin nota credito.
**Mitigacion parcial:** `facturar-servicio-sop.md` existe pero no cubre anulacion.

### FMF-16: Exenciones IVA Educacion
**Riesgo doble:** Cobrar IVA indebidamente o dejar de cobrarlo. Requiere analisis por servicio.
**Mitigacion parcial:** Playbook menciona exencion sin analisis especifico.

### FMF-17: Precios de Transferencia
**Aplica si:** Transacciones con vinculados >61.000 UVT patrimonio o >31.000 UVT ingresos.
**Mitigacion actual:** NINGUNA. Evaluar vinculacion con Sofka/JM Labs.

### FMF-18: Flujo de Caja Sin Proyeccion Tributaria
**Impacto:** Iliquidez en vencimientos de IVA, retencion, renta, ICA, PILA.
**Mitigacion parcial:** `forecast-arr-mrr-sop.md` existe pero NO incluye pagos tributarios.

### FMF-19: Soportes de Costos Sin Politica
**Sancion:** Rechazo de deducciones → mayor impuesto + 100% inexactitud (Art. 647 ET).
**Mitigacion actual:** NINGUNA

### FMF-20: Defensa ante Auditoria DIAN
**Riesgo:** Plazos perentorios (15 dias habiles / 3 meses). Sin protocolo = consolidacion pretensiones DIAN.
**Mitigacion actual:** NINGUNA → Doc: `sop-defensa-auditoria-dian.md`

### FMF-21: Documento Soporte Adquisiciones
**Base legal:** Resolucion DIAN 000167/2021. Sin documento soporte, gasto no deducible.
**Mitigacion actual:** NINGUNA

### FMF-22: Archivo y Conservacion Documental
**Plazos:** 5 anos tributarios (Art. 632 ET) / 10 anos comerciales (Art. 60 C.Co.).
**Mitigacion actual:** NINGUNA

---

## Resumen de Cobertura

| Severidad | Total | Con mitigacion parcial | Sin mitigacion |
|-----------|-------|----------------------|----------------|
| CRITICO | 8 | 1 | 7 |
| ALTO | 10 | 2 | 8 |
| MEDIO | 4 | 1 | 3 |
| **TOTAL** | **22** | **4** | **18** |

**82% de los FMFs no tienen mitigacion alguna.**

---

## Supuestos y Limites de Este Analisis

| # | Supuesto | Impacto si es Incorrecto |
|---|---------|-------------------------|
| 1 | MetodologIA esta constituida como SAS en Colombia | Si es persona natural, cambian formularios y umbrales |
| 2 | SMMLV 2026 = $1.560.000 (estimado) | Afecta umbrales de revisor fiscal, SAGRILAFT, exoneraciones |
| 3 | UVT 2026 = $47.065 (estimado) | Afecta bases de retencion y umbrales DIAN |
| 4 | No hay empleados directos aun (solo contratistas) | Si hay empleados, FMF-13 pasa a prioridad maxima inmediata |
| 5 | Operacion principal en Medellin, posible Bogota | Si hay mas municipios, se multiplican obligaciones ICA |
| 6 | No hay transacciones con vinculados internacionales | Si las hay, FMF-17 escala a ALTO |

**Limite:** Este analisis NO reemplaza asesoria tributaria profesional. Es un mapa de riesgos para priorizar accion.

---

## Changelog

- v2.0.0 — Formato compacto, matriz priorizacion, interdependencias, exposicion financiera, supuestos y limites
- v1.0.0 — Creacion inicial con 22 FMFs
