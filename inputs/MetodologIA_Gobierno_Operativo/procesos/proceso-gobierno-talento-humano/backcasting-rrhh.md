# Backcasting RRHH — Modos de Fallo de Talento Humano y Derecho Laboral

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** RRHH / COO
**Método:** Backcasting — "¿Qué demanda laboral ganaría un ex-colaborador por falta de governance de RRHH?"
**Marco Legal:** Colombia — CST, Ley 100/1993, Ley 1010/2006, Ley 2191/2022

---

## Modos de Fallo

### FMRH-01: Sin Contrato Laboral o de Prestación de Servicios Estandarizado
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Vinculación / CRITICO |
| **Descripción** | Vinculados sin contrato escrito, o cada contrato es diferente. Sin contrato escrito, se presume laboral a término indefinido (Art. 24 CST). |
| **Doc requerido** | `template-contrato-laboral.md` + `template-contrato-prestacion-servicios.md` |

### FMRH-02: Riesgo de Reclasificación Laboral de Independientes
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Clasificación / CRITICO |
| **Descripción** | "Contratista" con horario fijo, exclusividad, subordinación, herramientas de MetodologIA, pago mensual fijo → juez reclasifica como empleado. Pago retroactivo de TODAS las prestaciones (hasta 3 años). |
| **Doc requerido** | `checklist-clasificacion-laboral.md` |

### FMRH-03: Sin Proceso de Contratación Estandarizado
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Contratación / ALTO |
| **Descripción** | No hay checklist: verificación de antecedentes, documentos, ni inducción formal. |
| **Doc requerido** | `sop-contratacion.md` |

### FMRH-04: Sin Proceso de Desvinculación
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Desvinculación / CRITICO |
| **Descripción** | No hay checklist de terminación: liquidación, paz y salvo, entrega de cargo, revocación de accesos. Errores en liquidación = demandas. |
| **Doc requerido** | `sop-desvinculacion.md` + `template-paz-y-salvo.md` |

### FMRH-05: Sin Reglamento Interno de Trabajo (RIT)
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Regulatorio / ALTO |
| **Descripción** | Art. 104 CST obliga a empresas con >5 trabajadores permanentes a tener RIT publicado y depositado ante MinTrabajo. Sin RIT, sanciones disciplinarias inaplicables. |
| **Doc requerido** | `reglamento-interno-trabajo.md` (cuando aplique el umbral) |

### FMRH-06: Sin Comité de Convivencia Laboral
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Acoso laboral / ALTO |
| **Descripción** | Ley 1010/2006 y Resolución 652/2012 obligan a constituir Comité de Convivencia. Sin comité, no se gestionan quejas y hay sanciones de MinTrabajo. |
| **Doc requerido** | `acta-constitucion-comite-convivencia.md` (cuando aplique) |

### FMRH-07: Sin Política de Desconexión Laboral
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Bienestar / MEDIO |
| **Descripción** | Ley 2191/2022: derecho a desconexión fuera de horario. Sin política, mensajes a las 11pm esperando respuesta inmediata. Incumplimiento = acoso laboral. |
| **Doc requerido** | `politica-desconexion-laboral.md` |

### FMRH-08: Sin SG-SST
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | SST / CRITICO (si hay empleados) |
| **Descripción** | Decreto 1072/2015 obliga a TODA empresa con 1+ empleado a implementar SG-SST. Sin SST: multas hasta 500 SMMLV (~$780M COP en 2026). |
| **Doc requerido** | `politica-sgsst.md` + evaluación de implementación |

### FMRH-09: Sin Evaluación de Desempeño
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Gestión / MEDIO |
| **Descripción** | Sin evaluaciones, no hay base para promoción, compensación variable, o terminación por bajo desempeño. Terminar sin evidencia = indemnización obligatoria. |
| **Doc requerido** | `sop-evaluacion-desempeno.md` |

### FMRH-10: Sin Plan de Capacitación
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Desarrollo / MEDIO |
| **Descripción** | MetodologIA vende formación pero no documenta la formación interna. SENA puede auditar el cumplimiento del aporte del 2% verificando programas de capacitación. |
| **Doc requerido** | `sop-capacitacion.md` |

---

## Mapa de Interdependencias

```
FMRH-01 (Contratos) ──► FMRH-02 (Clasificación) — sin contrato estándar, el riesgo de reclasificación es máximo
       │
       └──► FMRH-04 (Desvinculación) — sin contrato claro, la liquidación se complica

FMRH-03 (Contratación) ──► FMRH-08 (SST) — examen médico de ingreso es parte de ambos
                       ──► FMRH-01 (Contratos) — la contratación estandarizada incluye firma de contrato

FMRH-07 (Desconexión) ◄──► FMRH-06 (Convivencia) — la desconexión previene quejas que llegan al Comité

FMRH-09 (Desempeño) ──► FMRH-04 (Desvinculación) — sin evaluaciones, no hay base para terminar por bajo desempeño
```

---

## Matriz de Priorización

| Prioridad | FMRHs | Criterio | Plazo sugerido |
|-----------|-------|----------|----------------|
| **P0 — Hacer ya** | FMRH-01, FMRH-02, FMRH-04, FMRH-08 | Exposición legal directa. Demanda o multa puede llegar mañana. | Semana 1-2 |
| **P1 — Mes 1** | FMRH-03, FMRH-07 | Operación sin estándar. Cada contratación es una ruleta. | Semana 3-4 |
| **P2 — Mes 2** | FMRH-05, FMRH-06 | Depende del umbral de empleados. Preparar para cuando aplique. | Mes 2 |
| **P3 — Trimestre 1** | FMRH-09, FMRH-10 | Importante pero no urgente. La empresa funciona sin esto (con riesgo). | Mes 2-3 |

---

## Estimación de Exposición Financiera

| FMRH | Escenario peor caso | Costo estimado (COP) | Probabilidad |
|------|---------------------|-----------------------|-------------|
| FMRH-02 | Reclasificación laboral de 1 "contratista" de 3 años | $50M - $120M (prestaciones retroactivas + intereses + UGPP) | Alta |
| FMRH-04 | Liquidación mal calculada, mora Art. 65 CST por 6 meses | $15M - $60M (1 salario/día de mora) | Alta |
| FMRH-08 | Multa por no implementar SG-SST | Hasta $780M (500 SMMLV) | Media (si hay inspección) |
| FMRH-01 | Presunción de contrato indefinido por falta de contrato escrito | $30M - $80M por persona | Media |
| FMRH-05+06 | Sanción MinTrabajo por falta de RIT o Comité | $5M - $20M | Baja (depende de inspección o queja) |
| **Total exposición combinada** | | **$100M - $1.060M** | |

---

## Supuestos y Límites

1. **Supuesto:** MetodologIA tiene <10 empleados directos actualmente. Los umbrales de RIT (>5) y Comité de Convivencia aplican diferente según tamaño.
2. **Supuesto:** La mayoría de facilitadores están vinculados como independientes. Si son >3, la exposición por reclasificación se multiplica.
3. **Supuesto:** No hay sindicato ni pacto colectivo. Si se forma, se necesitan FMRHs adicionales.
4. **Límite:** Este análisis no cubre seguridad social de contratistas extranjeros (si los hay, se necesita análisis específico).
5. **Límite:** No incluye temas tributarios de nómina (retención en la fuente, aportes parafiscales). Eso es del proceso financiero.

---

## Resumen

| Severidad | Total | Sin mitigación |
|-----------|-------|----------------|
| CRITICO | 4 | 4 |
| ALTO | 3 | 3 |
| MEDIO | 3 | 3 |
| **TOTAL** | **10** | **10** |
