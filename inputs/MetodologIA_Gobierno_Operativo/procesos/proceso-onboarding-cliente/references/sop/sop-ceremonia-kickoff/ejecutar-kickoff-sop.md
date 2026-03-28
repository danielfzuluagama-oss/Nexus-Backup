# SOP: Ejecutar Ceremonia de Kickoff

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Operaciones / Project Manager
**Cierra:** FM-16 (Backcasting COO)
**Template asociado:** `ceremonia-kickoff-template.md`

---

## 1. Propósito

Garantizar que todo engagement inicia con una ceremonia de kickoff formal que alinea expectativas, define métricas de éxito, establece SLA, identifica riesgos, y genera el compromiso mutuo necesario para un delivery exitoso.

---

## 2. Entradas (DoR)

- [ ] Contrato firmado (MSA + ODS)
- [ ] `formulario-f2-contratacion.md` completado al 100%
- [ ] `checklist-pre-firma.md` aprobado
- [ ] Equipo de delivery asignado y confirmado
- [ ] Primer pago (anticipo) recibido o confirmado

---

## 3. Procedimiento

### PRE-KICKOFF (D-5 a D-1)

| Paso | Acción | Responsable | Plazo | Evidencia |
|------|--------|------------|-------|-----------|
| 1.1 | Confirmar fecha, hora y formato (presencial/virtual) con SPOC cliente | Project Manager | D-5 | Email de confirmación |
| 1.2 | Enviar invitación calendario a todos los participantes (MetodologIA + cliente) | Project Manager | D-5 | Invitación enviada |
| 1.3 | Solicitar al cliente: lista de stakeholders que asistirán + organigrama | Project Manager | D-5 | Respuesta del cliente |
| 1.4 | Preparar presentación de kickoff usando `ceremonia-kickoff-template.md` | Project Manager | D-3 | Presentación lista |
| 1.5 | Pre-llenar `sla-baseline-template.md` con defaults del tipo de servicio | Project Manager | D-3 | Template pre-llenado |
| 1.6 | Revisar ODS y preparar resumen de alcance, entregables, y cronograma | Project Manager | D-2 | Resumen ejecutivo |
| 1.7 | Briefing interno del equipo MetodologIA (15 min): quién es el cliente, qué esperan, roles | Project Manager | D-1 | Briefing realizado |
| 1.8 | Verificar logística: sala reservada / link de videoconferencia funcionando / materiales impresos | Admin / PM | D-1 | Check logístico |

### KICKOFF (Día 0 — 90 minutos)

| Tiempo | Bloque | Responsable | Acción detallada |
|--------|--------|------------|-----------------|
| 0-10 | **Bienvenida** | Director Comercial | Agradecer confianza. Presentar MetodologIA en 2 min. Contextualizar el proyecto. Transferir a PM. |
| 10-20 | **Presentaciones** | Todos | Ronda: nombre, rol, una expectativa para este proyecto. PM toma nota. |
| 20-35 | **Alcance y entregables** | Project Manager | Recorrer ODS: alcance, exclusiones, entregables, cronograma con fechas. Confirmar que el cliente está de acuerdo. Resolver dudas. |
| 35-50 | **Métricas de éxito** | PM + SPOC cliente | Ejecutar `definir-metricas-exito-sop.md`: co-crear 3-5 métricas SMART. Documentar. |
| 50-60 | **SLA y comunicación** | Project Manager | Ejecutar `establecer-sla-baseline-sop.md`: presentar defaults, negociar ajustes, firmar. Definir canal, frecuencia, formato de comunicación. |
| 60-70 | **Riesgos y dependencias** | PM + SPOC | Identificar top 3-5 riesgos. Para cada uno: probabilidad, impacto, mitigación, owner. Registrar en `registro-riesgos-onboarding.md`. |
| 70-80 | **Próximos pasos** | Project Manager | Definir acciones de Semana 1 para ambas partes. Asignar responsables y fechas. |
| 80-85 | **Compromisos del cliente** | PM → SPOC | Confirmar: accesos, disponibilidad de stakeholders, documentación pendiente. |
| 85-90 | **Cierre** | Director Comercial | Palabras de energía. Foto del equipo (presencial) o screenshot (virtual). |

### POST-KICKOFF (D+1 a D+3)

| Paso | Acción | Responsable | Plazo | Evidencia |
|------|--------|------------|-------|-----------|
| 3.1 | Enviar minuta del kickoff a todos los participantes | Project Manager | D+1 (24h) | Email con minuta |
| 3.2 | Enviar SLA baseline firmado al SPOC cliente | Project Manager | D+1 | Email con PDF |
| 3.3 | Crear espacio de trabajo compartido (carpeta Drive, canal Slack/Teams) | PM + TI | D+2 | Espacio creado + accesos verificados |
| 3.4 | Registrar riesgos identificados en `registro-riesgos-onboarding.md` | Project Manager | D+1 | Registro actualizado |
| 3.5 | Completar `formulario-f3-kickoff.md` con datos recolectados | Project Manager | D+1 | Formulario completado |
| 3.6 | Verificar que accesos solicitados al cliente fueron entregados | Project Manager | D+3 | Accesos funcionando |
| 3.7 | Programar primera sesión de trabajo / primer entregable | Delivery Lead | D+3 | Invitación enviada |

---

## 4. Salidas (DoD)

- [ ] Minuta de kickoff enviada a todos los participantes (24h)
- [ ] SLA baseline firmado y distribuido
- [ ] Métricas de éxito documentadas y acordadas
- [ ] Riesgos registrados con owner y mitigación
- [ ] Formulario F3 completado
- [ ] Espacio de trabajo compartido creado
- [ ] Primera sesión de trabajo programada

---

## 5. Reglas de Escalamiento

| Situación | Acción |
|-----------|--------|
| Sponsor ejecutivo del cliente no asiste al kickoff | Escalar a Director Comercial. Reprogramar bloque de métricas de éxito con sponsor en sesión separada (máx 5 días). |
| Cliente no entrega accesos en D+3 | Enviar recordatorio formal. Si en D+5 sigue sin accesos, escalar a SPOC ejecutivo + Director Comercial. Documentar como riesgo. |
| Desalineación de alcance detectada en kickoff | STOP. No continuar. Escalar a Director Comercial + Legal. Resolver antes de iniciar delivery. |

---

## 6. Supuestos

SUPUESTO: El Director Comercial está disponible para los bloques de bienvenida y cierre. Si no, puede delegar a Sales Manager.
- Validar con: Director Comercial
- Si se invalida: PM asume bienvenida y cierre

---

## Changelog

- v1.0.0 — Creación inicial / Cierra FM-16 / Javier Montaño + Claude
