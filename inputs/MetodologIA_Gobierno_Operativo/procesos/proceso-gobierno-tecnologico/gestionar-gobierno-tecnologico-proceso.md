# Proceso: Gestionar Gobierno Tecnológico y Seguridad de la Información

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** CTO / CISO (o COO si no hay CTO dedicado)

---

## 1. Propósito

Proteger los activos digitales, garantizar la continuidad operativa de las plataformas, gestionar accesos de forma segura, y establecer prácticas de desarrollo y uso de IA responsables.

---

## 2. Supuestos Críticos

Si alguno de estos es falso, el proceso se rompe:

1. **Google Workspace es el hub central** — Si se migra a otro proveedor, todas las SOPs de backup, accesos y BCP deben reescribirse.
2. **Equipo <20 personas** — Con >20, se necesita herramienta de Identity & Access Management (IAM) formal, no gestión manual.
3. **No hay infraestructura on-premise** — Todo es SaaS/cloud. Si se adquiere un servidor, se necesita un FMT adicional.
4. **El CTO/COO tiene tiempo para ejecutar esto** — Si nadie dedica >4h/semana a gobierno TI, los rituales se abandonan en <3 meses.

---

## 3. Anti-patrones a Evitar

| Anti-patrón | Señal de alerta | Corrección |
|------------|----------------|------------|
| **"Security Theater"** — Documentos perfectos que nadie sigue | Políticas bonitas pero MFA no activado, passwords compartidas por WhatsApp | Verificar cumplimiento mensual, no solo existencia de documentos |
| **"Single Admin Hero"** — Todo depende de una persona | Solo 1 persona sabe las passwords de admin, tiene acceso a DNS, gestiona backups | Mínimo 2 personas con acceso admin a cada sistema crítico |
| **"Checkbox Compliance"** — Hacer lo mínimo para "cumplir" | Backups configurados pero nunca probados, inventario desactualizado 6 meses | Cada control tiene verificación programada con evidencia |

---

## 4. Decision Log

| Decisión | Alternativa considerada | Por qué se eligió esta |
|----------|------------------------|----------------------|
| Gestión de accesos manual (spreadsheet) | Herramienta IAM (Okta, JumpCloud) | Equipo <20 no justifica USD$5-10/usuario/mes. Migrar cuando >20 personas. |
| Backup cloud-to-cloud (Google → otro cloud) | Backup cloud-to-local (disco externo) | Menor riesgo de pérdida física, acceso remoto, costo ~USD$10/mes. Disco externo como segunda copia para datos CRÍTICOS. |
| ISO 27001 como referencia, no certificación | Certificarse ISO 27001 | Certificación cuesta >$50M COP + auditor anual. Usar como guía hasta que un cliente corporativo lo exija contractualmente. |

---

## 5. Artefactos del Proceso

### Políticas

| Documento | Cierra FMT | Ubicación |
|-----------|-----------|-----------|
| `politica-seguridad-informacion.md` | FMT-01, 09 | `meta/` |
| `politica-desarrollo-seguro.md` | FMT-07 | `meta/` |
| `politica-uso-aceptable-ia.md` | FMT-10 | `meta/` |

### SOPs

| SOP | Cierra FMT | Ubicación |
|-----|-----------|-----------|
| `sop-gestion-accesos.md` | FMT-02, 12 | `references/sop/sop-gestion-accesos/` |
| `sop-backup-recuperacion.md` | FMT-03 | `references/sop/sop-backup-recuperacion/` |
| `sop-incidentes-ti.md` | FMT-05 | `references/sop/sop-incidentes-ti/` |

### Assets

| Asset | Cierra FMT | Ubicación |
|-------|-----------|-----------|
| `inventario-activos-tecnologicos.md` | FMT-04, 11 | `assets/` |
| `plantilla-sla-proveedores-tech.md` | FMT-06 | `assets/templates/` |
| `plan-continuidad-negocio-ti.md` | FMT-08 | `assets/` |

---

## 6. Cadencias

| Actividad | Frecuencia | Responsable | Evidencia |
|----------|-----------|------------|-----------|
| Revisión de inventario de accesos | Mensual | CTO/COO | Acta de revisión firmada |
| Verificación de backups | Semanal (automática) + mensual (manual) | TI | Log de verificación |
| Actualización de inventario de activos | Trimestral | TI | Inventario con fecha de actualización |
| Simulacro de recuperación de desastres | Semestral | CTO + equipo | Acta de simulacro + tiempo medido |
| Revisión de política de seguridad | Anual | CTO/CISO | Versión actualizada del documento |
| Auditoría de accesos revocados post-offboarding | Mensual | TI + RRHH | Checklist completado vs. inventario |

---

## 7. Modelo de Madurez

| Nivel | Nombre | Descripción | Estado actual |
|-------|--------|-------------|---------------|
| **1 — Inicial** | Reactivo | No hay políticas ni SOPs. Se reacciona cuando algo falla. | **<-- AQUÍ** |
| **2 — Definido** | Documentado | Políticas y SOPs escritos. Cadencias establecidas. Accesos gestionados en spreadsheet. | **META Q2 2026** |
| **3 — Gestionado** | Medido | Métricas de cumplimiento activas. Simulacros ejecutados. Backups verificados con evidencia. | META Q4 2026 |
| **4 — Optimizado** | Automatizado | IAM formal, monitoreo con IA, backup verification automática, alertas proactivas. | META 2027 |
