# Backcasting CTO / CISO — Modos de Fallo Tecnológicos y de Seguridad

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / CISO / COO
**Método:** Backcasting — "¿Qué le reprocharía un auditor de seguridad informática a una empresa de servicios tech sin gobierno TI?"
**Marco Legal:** Colombia — Ley 1273/2009, Ley 1581/2012, ISO 27001 (referencia)

---

## Modos de Fallo

### FMT-01: Sin Política de Seguridad de la Información
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Seguridad / CRÍTICO |
| **Descripción** | No existe documento que defina principios, roles, clasificación de información, controles de acceso, uso aceptable, y gestión de incidentes. Sin política, cada persona decide por su cuenta qué es seguro. |
| **Mitigación** | `plan-respuesta-brechas-datos.md` cubre incidentes de datos personales, pero NO hay política general de seguridad TI. |
| **Doc requerido** | `politica-seguridad-informacion.md` |

### FMT-02: Sin Control de Accesos — Passwords Compartidas, Sin MFA
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Accesos / Identidad / CRÍTICO |
| **Descripción** | Cuentas de plataformas (LMS, CRM, Drive, facturación, redes sociales) con credenciales compartidas, sin MFA, sin registro de quién tiene acceso a qué. Al desvincular, los accesos no se revocan. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `sop-gestion-accesos.md` + `inventario-accesos-plataformas.md` |

### FMT-03: Sin Backups — Pérdida de Datos Irrecuperable
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Continuidad / CRÍTICO |
| **Descripción** | Documentos críticos (contratos, EEFF, material de cursos, CRM) sin backup automatizado. Si se borra un Drive o se pierde un laptop, no hay recuperación. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `sop-backup-recuperacion.md` |

### FMT-04: Sin Inventario de Activos Tecnológicos
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Infraestructura / ALTO |
| **Descripción** | No se sabe cuántos laptops, licencias, dominios, suscripciones cloud, APIs existen. Sin inventario, no se protege lo que no se conoce. Licencias expiran sin aviso. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `inventario-activos-tecnologicos.md` |

### FMT-05: Sin Gestión de Incidentes de TI
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Operaciones TI / ALTO |
| **Descripción** | Cuando una plataforma cae (LMS, sitio web, CRM): no hay procedimiento de reporte, diagnóstico, SLA interno, ni comunicación a afectados. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `sop-incidentes-ti.md` |

### FMT-06: Sin SLA con Proveedores Tech
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Vendor Management / ALTO |
| **Descripción** | Plataformas críticas (LMS, videoconferencia, email, facturación) sin SLA documentado. Si el proveedor LMS cae 48h durante un bootcamp en vivo, no hay recurso contractual. |
| **Mitigación** | `checklist-due-diligence-proveedores.md` cubre selección pero no SLA operativo ongoing. |
| **Doc requerido** | `plantilla-sla-proveedores-tech.md` |

### FMT-07: Sin Política de Desarrollo Seguro / No-Code Seguro
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Desarrollo / MEDIO |
| **Descripción** | Si MetodologIA construye herramientas internas (dashboards, automatizaciones, plataformas con IA), no hay guía de seguridad: validación de inputs, manejo de secretos, dependencias vulnerables, review antes de producción. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `politica-desarrollo-seguro.md` |

### FMT-08: Sin Plan de Continuidad de Negocio (BCP) Tecnológico
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Continuidad / ALTO |
| **Descripción** | Si Google desactiva la cuenta, si el dominio expira, si el proveedor de facturación cierra: no hay plan B documentado. No se conocen RTO/RPO de servicios críticos. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `plan-continuidad-negocio-ti.md` |

### FMT-09: API Keys y Secretos en Texto Plano
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Seguridad / ALTO |
| **Descripción** | API keys (NotebookLM, OpenAI, DIAN, pasarelas de pago) en archivos .env sin cifrar, compartidas por chat, o hardcodeadas. Una filtración expone todo. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `politica-seguridad-informacion.md` (sección gestión de secretos) |

### FMT-10: Sin Política de Uso Aceptable de IA Generativa
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | IA / Compliance / MEDIO |
| **Descripción** | Equipo usa IA (Claude, ChatGPT, NotebookLM) sin guía sobre qué datos pueden ir a prompts, qué información del cliente NO debe ir a LLMs externos, qué outputs pueden entregarse como propios. Riesgo de filtrar datos confidenciales. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `politica-uso-aceptable-ia.md` |

### FMT-11: Dominio y DNS Sin Governance
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Infraestructura / MEDIO |
| **Descripción** | Sin claridad sobre dueño del dominio, vencimiento, auto-renovación, acceso al panel DNS. Si el dominio expira, toda la operación digital se detiene. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `inventario-activos-tecnologicos.md` (sección dominios) |

### FMT-12: Sin Offboarding Tecnológico
| Campo | Valor |
|-------|-------|
| **Cat / Sev** | Accesos / RRHH / ALTO |
| **Descripción** | Al desvincular embajador, facilitador o empleado no hay checklist de revocación: Drive, CRM, LMS, Slack, email, repositorios, herramientas de IA. Ex-colaboradores retienen acceso indefinidamente. |
| **Mitigación** | NINGUNA |
| **Doc requerido** | `sop-gestion-accesos.md` (sección offboarding) + cross-ref RRHH |

---

## Mapa de Interdependencias

```
FMT-01 (Política Seguridad) ──────► FMT-09 (Secretos) — la política define las reglas de secretos
       │
       ├──► FMT-02 (Accesos) ──► FMT-12 (Offboarding) — sin control de accesos, offboarding imposible
       │
       └──► FMT-10 (IA) — la política de seguridad enmarca el uso de IA

FMT-03 (Backups) ◄──► FMT-08 (BCP) — sin backups, no hay BCP viable
FMT-04 (Inventario) ──► FMT-05 (Incidentes) — sin saber qué existe, no se puede gestionar incidentes
FMT-06 (SLA Proveedores) ──► FMT-08 (BCP) — los SLA definen los RTO esperados
```

---

## Matriz de Priorización

| Prioridad | FMTs | Criterio | Plazo sugerido |
|-----------|------|----------|----------------|
| **P0 — Hacer ya** | FMT-01, FMT-02, FMT-03 | Sin estos, todo lo demás es teatro. Exposición legal directa (Ley 1273). | Semana 1-2 |
| **P1 — Mes 1** | FMT-05, FMT-08, FMT-09, FMT-12 | Operación sin red de seguridad. Un incidente sin protocolo = caos. | Semana 3-4 |
| **P2 — Mes 2** | FMT-04, FMT-06, FMT-10 | Importante pero no existencial. La empresa funciona sin esto, con riesgo. | Semana 5-8 |
| **P3 — Trimestre 1** | FMT-07, FMT-11 | Riesgo moderado. Relevante cuando haya desarrollo interno. | Mes 2-3 |

---

## Estimación de Exposición Financiera

| FMT | Escenario peor caso | Costo estimado (COP) | Probabilidad |
|-----|---------------------|-----------------------|-------------|
| FMT-01+09 | Brecha de datos personales de clientes → sanción SIC | $50M - $400M | Media |
| FMT-02+12 | Ex-colaborador roba base de clientes o borra archivos | $20M - $100M | Alta |
| FMT-03 | Pérdida total de Drive corporativo sin backup | $30M - $80M (reconstrucción + revenue perdido) | Media |
| FMT-08 | Proveedor LMS cae durante bootcamp de $50M+ | $15M - $50M (reembolsos + reputación) | Media-Baja |
| FMT-06 | Proveedor sin SLA no responde en 48h durante evento en vivo | $10M - $30M | Media |
| **Total exposición combinada** | | **$125M - $660M** | |

---

## Supuestos y Límites

1. **Supuesto:** MetodologIA opera principalmente con servicios cloud (Google Workspace, LMS SaaS). Si hay infraestructura on-premise, se requieren FMTs adicionales.
2. **Supuesto:** El equipo es <20 personas. Con crecimiento, los FMTs de MFA y accesos escalan en complejidad.
3. **Supuesto:** No se manejan datos de salud ni datos financieros regulados (no aplica PCI-DSS ni HIPAA-equivalente colombiano).
4. **Límite:** Este análisis no cubre seguridad física (oficinas, cerraduras, CCTV).
5. **Límite:** No incluye compliance de propiedad intelectual de contenido educativo (eso es proceso de Certificación y Calidad).

---

## Resumen

| Severidad | Total | Con mitigación | Sin mitigación |
|-----------|-------|---------------|----------------|
| CRÍTICO | 3 | 1 | 2 |
| ALTO | 6 | 1 | 5 |
| MEDIO | 3 | 0 | 3 |
| **TOTAL** | **12** | **2** | **10** |
