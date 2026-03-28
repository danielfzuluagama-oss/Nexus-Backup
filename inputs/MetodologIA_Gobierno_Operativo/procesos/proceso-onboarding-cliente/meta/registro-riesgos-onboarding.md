# Registro de Riesgos de Onboarding

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Project Manager
**Uso:** Iniciar en F3 (kickoff), actualizar durante F4, cerrar al terminar el engagement
**Cierra:** FM-09 parcial (componente de riesgo del onboarding)

---

## Instrucciones

Identificar riesgos durante la ceremonia de kickoff (bloque 60-70 min). Cada riesgo se evalúa con Probabilidad × Impacto. Revisión mínima quincenal durante delivery.

---

## Riesgos Pre-Cargados (comunes en MetodologIA)

Estos riesgos aparecen recurrentemente. El PM los revisa en cada kickoff y activa los que aplican.

| ID | Riesgo | Prob. default | Impacto default | Mitigación estándar | Owner default |
|----|--------|-------------|----------------|--------------------|----|
| R-01 | Sponsor ejecutivo no disponible para decisiones | Media | Alto | Definir delegado con autoridad en F3 | PM |
| R-02 | Cliente no entrega accesos a sistemas en plazo | Alta | Medio | SLA de accesos en F3 (5 días). Escalar a SPOC si >5d | PM |
| R-03 | Cambio de SPOC mid-engagement | Baja | Alto | Mini-kickoff con nuevo SPOC en 48h | PM |
| R-04 | Scope creep (cliente pide "extras" fuera de ODS) | Alta | Medio | Change request formal (`formulario-f4-operacion.md`) | PM |
| R-05 | Facilitador/consultor asignado no disponible | Baja | Alto | Backup certificado identificado en staffing | Delivery Lead |
| R-06 | Resistencia al cambio del equipo del cliente | Media | Alto | Sesión de change management en semana 1 | Facilitador |
| R-07 | Datos del cliente de baja calidad para diagnóstico | Media | Medio | Validar calidad de datos en semana 1. Si inaceptable, redefinir alcance. | Consultor |
| R-08 | Budget freeze del cliente mid-engagement | Baja | Crítico | Cláusula de terminación con pago proporcional en MSA | Director Comercial |

---

## Registro del Engagement

```
## REGISTRO DE RIESGOS — [Cliente] — ODS [Ref]

**Fecha de creación:** [___]
**Última actualización:** [___]

| ID | Riesgo | Prob | Impacto | Score (PxI) | Mitigación | Owner | Status | Fecha cierre |
|----|--------|------|---------|------------|-----------|-------|--------|-------------|
| R-01 | [___] | A/M/B | A/M/B/C | [1-9] | [___] | [___] | ☐ Abierto / ☐ Mitigado / ☐ Materializado / ☐ Cerrado | [___] |
```

**Scoring:** Probabilidad (Alta=3, Media=2, Baja=1) × Impacto (Crítico=4, Alto=3, Medio=2, Bajo=1). Score >6 = acción inmediata. Score 4-6 = monitoreo activo. Score <4 = aceptar y monitorear.

---

v1.0.0 — Registro de riesgos con riesgos pre-cargados / Javier Montaño + Claude
