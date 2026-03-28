# Matriz de Trazabilidad — Cierre de Brechas COO

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Propósito:** Verificar que cada modo de fallo del backcasting tiene al menos un documento que lo cierra.

---

## Trazabilidad FM → Documento(s) de Cierre

| FM | Descripción | Severidad | Documento(s) de Cierre | Fase | Estado |
|----|-------------|-----------|----------------------|------|--------|
| FM-01 | Sin MSA paraguas | CRÍTICO | `contrato-marco-servicios-msa.md` | F1 | ✅ CREADO |
| FM-02 | Sin plan de respuesta a brechas de datos | CRÍTICO | `plan-respuesta-brechas-datos.md` | F1 | ✅ CREADO |
| FM-03 | Descuento no autorizado | CRÍTICO | `matriz-autoridad-descuentos.md` | F2 | ✅ CREADO |
| FM-04 | Revenue reconocido prematuramente | CRÍTICO | `reconocer-ingresos-sop.md` | F3 | ✅ CREADO |
| FM-05 | Sin ToS ni Privacy Policy en web | CRÍTICO | `terminos-de-servicio-tos.md` + `politica-de-privacidad.md` | F1 | ✅ CREADO |
| FM-06 | Leads calificados por instinto | ALTO | `rubrica-scoring-leads.md` | F2 | ✅ CREADO |
| FM-07 | Factura tardía o incorrecta | ALTO | `facturar-servicio-sop.md` | F3 | ✅ CREADO |
| FM-08 | IP cedida sin cláusula estándar | ALTO | `cesion-derechos-ip.md` | F1 | ✅ CREADO |
| FM-09 | Onboarding sin baseline de SLA | ALTO | `sla-baseline-template.md` + `establecer-sla-baseline-sop.md` (stub) | F4 | ✅ CREADO (template) |
| FM-10 | Contrato vence sin detección | ALTO | `proceso-ciclo-vida-contratos-clm.md` | F1 | ✅ CREADO |
| FM-11 | Disputa de comisión | ALTO | `matriz-compensacion-ventas.md` | F2 | ✅ CREADO |
| FM-12 | Proveedor cae sin due diligence | MEDIO | `checklist-due-diligence-proveedores.md` | F1 | ✅ CREADO |
| FM-13 | Sobrecosto no detectado | MEDIO | `aprobar-gasto-sop.md` | F3 | ✅ CREADO |
| FM-14 | Datos personales antes de NDA/Habeas | ALTO | `gestionar-onboarding-cliente-proceso.md` (reglas por fase) | F4 | ✅ CREADO |
| FM-15 | Propuesta sin gate de aprobación | ALTO | `aprobar-propuesta-sop.md` + `plantilla-propuesta-comercial.md` | F2 | ✅ CREADO |
| FM-16 | Sin ceremonia de kickoff | MEDIO | `ceremonia-kickoff-template.md` + `ejecutar-kickoff-sop.md` (stub) | F4 | ✅ CREADO (template) |
| FM-17 | Deal review inexistente | ALTO | `deal-review-sop.md` | F2 | ✅ CREADO |
| FM-18 | Sin playbook de negociación | MEDIO | `negociar-contrato-sop.md` | F2 | ✅ CREADO |
| FM-19 | Sin proceso de disputas de pago | MEDIO | `resolver-disputa-pago-sop.md` | F3 | ✅ CREADO |
| FM-20 | Conflicto de intereses no declarado | MEDIO | `politica-conflicto-intereses.md` | F1 | ✅ CREADO |

---

## Resumen de Cierre

| Severidad | Total | Cerrados | Pendientes |
|-----------|-------|----------|-----------|
| CRÍTICO | 5 | **5** | 0 |
| ALTO | 10 | **10** | 0 |
| MEDIO | 5 | **5** | 0 |
| **TOTAL** | **20** | **20** | **0** |

**Cobertura: 100% de modos de fallo tienen al menos un documento de cierre.**

---

## Items con SOPs Stub (requieren desarrollo posterior)

Estos items tienen templates/procesos creados pero sus SOPs detallados son stubs por desarrollar:

1. `establecer-sla-baseline-sop.md` — SOP detallado para negociación de SLA
2. `ejecutar-kickoff-sop.md` — SOP detallado de la ceremonia (template existe)
3. `definir-metricas-exito-sop.md` — SOP para co-definir métricas con cliente
4. `recolectar-datos-progresivo-sop.md` — SOP detallado de recolección progresiva
5. `calificar-oportunidad-presales-sop.md` — SOP detallado de calificación
6. `gestionar-enablement-sop.md` — SOP de habilitación del equipo
7. `forecast-arr-mrr-sop.md` — SOP de forecast mensual
8. `playbook-precios-unificado.md` — Consolidación de pricing por vertical
9. `plantilla-reporte-varianza.md` — Template de varianza presupuestal

---

## Changelog

- v1.0.0 — Creación inicial con 20/20 FMs cerrados / Javier Montaño + Claude
