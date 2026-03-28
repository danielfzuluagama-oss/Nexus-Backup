# Proceso: Gestionar Gobierno Financiero, Tributario y Contable

**Version:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** CFO / Contador Publico
**Audiencia:** Contador, Finanzas, COO, Revisor Fiscal, Representante Legal
**Contexto Legal:** Colombia — Estatuto Tributario, Codigo de Comercio, NIIF para PYMES, Ley 100/1993

---

## 1. Proposito

Garantizar el cumplimiento de TODAS las obligaciones financieras, tributarias, contables, de seguridad social, y de reporte ante la DIAN, municipios, Supersociedades, y entidades de seguridad social.

---

## 2. Decision Log: Por Que Existe Este Proceso Separado

| Pregunta | Respuesta |
|---------|----------|
| Por que separar gobierno financiero de operaciones comerciales? | Operaciones comerciales maneja el flujo de dinero con clientes (facturacion, cobro, compensacion). Gobierno financiero maneja cumplimiento regulatorio (DIAN, municipios, Supersociedades). **Audiencias distintas, cadencias distintas, consecuencias distintas.** |
| Que pasa si se mezclan? | El ritmo comercial (semanal, por deal) distorsiona el ritmo fiscal (mensual, bimestral, anual). Se pierden deadlines que no perdonan. |
| Donde se conectan? | En 3 puntos: (1) facturacion genera IVA y retencion, (2) pagos a contratistas generan obligaciones PILA, (3) ingresos reconocidos alimentan renta. Estos puntos de conexion estan documentados en los SOPs respectivos. |

---

## 3. Modelo de Madurez — Gobierno Financiero

| Nivel | Nombre | Caracteristicas | KPIs Asociados |
|-------|--------|----------------|---------------|
| **1 — Supervivencia** | Pagar impuestos a tiempo | Calendario tributario existe, se paga antes de vencer, contador contratado | 0 sanciones por extemporaneidad |
| **2 — Control** | Cierre mensual + forecast | Cierre contable mensual antes del dia 15, forecast tributario trimestral, PILA verificada | Cierre <15 dias, 100% PILA verificada |
| **3 — Optimizacion** | Planeacion tributaria + flujo de caja | Analisis de exenciones IVA, optimizacion de deducciones, proyeccion de flujo con carga tributaria | Tasa efectiva de tributacion optimizada |
| **4 — Estrategico** | Precios de transferencia, expansion | Documentacion de vinculados, estructura societaria para expansion internacional, auditoria voluntaria | Ready para due diligence de inversionista |

**MetodologIA hoy:** Nivel 1 (en construccion — estos documentos llevan de 0 a Nivel 1).
**Meta EOY 2026:** Nivel 2 consolidado. Todos los cierres mensuales completados, forecast tributario operativo, cero sanciones.

---

## 4. Ciclos del Proceso

```
MENSUAL:     Retencion + PILA + Cierre contable + Nomina (si aplica)
BIMESTRAL/CUATRIMESTRAL: Declaracion IVA (segun periodicidad)
TRIMESTRAL:  ICA (segun municipio) + Forecast tributario
ANUAL:       Renta + Exogena + Certificados retencion + EEFF + Revisoria fiscal
```

---

## 5. Artefactos del Proceso

### SOPs

| SOP | Cierra FMF | Ubicacion |
|-----|-----------|-----------|
| `sop-obligaciones-dian.md` | FMF-01, 02, 03, 11, 12 | `references/sop/sop-obligaciones-dian/` |
| `sop-pila-independientes.md` | FMF-05 | `references/sop/sop-pila-independientes/` |
| `sop-retencion-fuente.md` | FMF-04, 07, 21 | `references/sop/sop-retencion-fuente/` |
| `sop-cierre-contable.md` | FMF-08, 10 | `references/sop/sop-cierre-contable/` |
| `sop-defensa-auditoria-dian.md` | FMF-20 | `references/sop/sop-defensa-auditoria/` |
| `sop-nomina-parafiscales.md` | FMF-13 | `references/sop/sop-nomina-parafiscales/` |

### Assets y Politicas

| Documento | Cierra FMF | Ubicacion |
|-----------|-----------|-----------|
| `calendario-tributario-2026.md` | FMF-01 | `assets/` |
| `tabla-retencion-fuente-2026.md` | FMF-04 | `assets/` |
| `template-cuenta-de-cobro.md` | FMF-06 | `assets/templates/` |
| `template-certificado-retencion.md` | FMF-07 | `assets/templates/` |
| `templates-estados-financieros.md` | FMF-08 | `assets/templates/` |
| `politica-roles-financieros.md` | FMF-09, 10, 19, 22 | `meta/` |
| `politica-sagrilaft.md` | FMF-14 | `meta/` |
| `analisis-exenciones-iva-educacion.md` | FMF-16 | `meta/` |

---

## 6. KPIs por Nivel de Madurez

### Nivel 1 (Meta actual)

| KPI | Meta | Frecuencia |
|-----|------|-----------|
| Declaraciones presentadas a tiempo | 100% | Mensual |
| PILA de independientes verificada antes de pago | 100% | Mensual |
| Contador contratado con TP vigente | SI/NO | Unica vez |

### Nivel 2 (Meta EOY 2026)

| KPI | Meta | Frecuencia |
|-----|------|-----------|
| Cierre contable completado antes del dia 15 | 100% | Mensual |
| Certificados de retencion emitidos antes del 31/03 | 100% | Anual |
| Estados financieros aprobados antes del 31/03 | 100% | Anual |
| Forecast tributario actualizado | 100% | Trimestral |

---

## Changelog

- v2.0.0 — Decision log, modelo de madurez, posicion actual y meta EOY 2026, KPIs por nivel
- v1.0.0 — Creacion inicial
