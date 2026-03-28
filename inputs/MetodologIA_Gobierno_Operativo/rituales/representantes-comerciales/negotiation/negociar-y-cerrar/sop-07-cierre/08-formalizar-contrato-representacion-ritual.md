---
id: "08"

segmento: "representantes-comerciales"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "08-formalizar-contrato-representacion"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Legal"
frecuencia: "por-evento (términos acordados)"
herramientas:

- "CRM"
- "DocuSign"
- "Google Drive"

entry-criteria:

- "Términos negociados y acordados (Ritual 07 o aceptación directa R06)"
- "Legal sign-off"
exit-criteria:

- "Contrato firmado por ambas partes"
- "NDA comercial firmado"
- "Onboarding scheduled en ≤7 días"

kpi: "Time to Signature (Target: ≤3 días desde acuerdo verbal)"
leading-indicators:

- "Tiempo entre acuerdo verbal y envío de contrato"
- "% de contratos firmados en ≤3 días"
- "% de onboardings agendados en ≤7 días post-firma"

riesgos-controles:

- riesgo: "Demora en firma enfría al candidato"

  control: "Contrato pre-preparado con campos variables. Enviar en <24h post-acuerdo."

- riesgo: "Sin NDA"

  control: "BLOQUEADOR: NDA comercial firmado antes de acceso a materiales de venta"

- riesgo: "Contrato con errores en datos del rep"

  control: "Double-check de nombre, territorio, comisión, productos antes de enviar"
evidencias:

- "Contrato firmado (DocuSign)"
- "NDA firmado"
- "Onboarding date confirmed"
---

# Ritual: Formalizar Contrato de Representación — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **NDA del rep es MÁS LIMITADO que el de embajadores:** Cubre información comercial (pricing, pipeline, comisiones), NO IP metodológica.
> **Fast close:** Contrato en <24h, firma en ≤3 días, onboarding en ≤7 días.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Cuando el candidato acepta los términos (Decision = Accept en R06 o Agreed en R07).
- **Pre-ritual:** ¿Los términos finales están documentados? ¿Legal aprobó? ¿El template de contrato está listo?
- **Contexto:** La velocidad es crítica aquí. Cada día entre el "sí" verbal y la firma es un día en que el candidato puede enfriarse o recibir otra oferta. Contrato en <24h, firma en ≤3 días, onboarding en ≤7 días. El NDA comercial es bloqueador — sin firma, no hay acceso a materiales.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Formalizar la relación con firma de contrato y NDA, y agendar onboarding.
- **Definición de Éxito (DoD):**
  - [ ] Contrato generado con datos correctos en <24h
  - [ ] Contrato + NDA enviados vía DocuSign
  - [ ] Ambos documentos firmados
  - [ ] Onboarding agendado en ≤7 días
  - [ ] Equipo interno notificado
  - [ ] Accesos CRM limitados configurados
- **Definición de Éxito del Rep:** "Firmé, sé cuándo empieza el onboarding, y me siento bienvenido al equipo."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Garantiza cierre en ≤3 días |
| **Responsible** | Legal / Ops | Genera contrato y gestiona firma |

| **Consulted** | Finance | Valida términos de comisión |
| **Informed** | Growth Lead, Content Lead | Saben que hay nuevo rep |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Términos finales documentados y aprobados
- [ ] Template de contrato con campos variables listo
- [ ] NDA comercial template listo
- [ ] DocuSign configurado
- [ ] Datos del candidato verificados (nombre legal, email, territorio)

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Contrato template | Drive — Legal | Legal |
| NDA comercial template | Drive — Legal | Legal |
| Términos finales | CRM notas R06/R07 | Sales Director |

---

## 5. Ejecutar — Parte 1: Generación y Envío

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Generar contrato con términos acordados

**Acción:** Template del contrato con campos variables: [nombre legal], [territorio], [productos habilitados], [comisión %], [mínimos de actividad], [exclusividad], [duración].

**Output:** Contrato generado.
**Evidencia:** Doc.

### 5.2 — Double-check de todos los datos

**Acción:** Verificar: nombre legal correcto, territorio exacto, productos listados, comisión %, duración, cláusulas de terminación.

**Output:** 0 errores en datos.
**Evidencia:** Checklist de verificación.

### 5.3 — Enviar contrato + NDA en <24h via DocuSign

**Script (email):** "[nombre], aquí está el contrato con los términos que acordamos y el NDA comercial. Ambos documentos están en DocuSign — firma digital. Si tienes alguna duda de último momento, escríbeme antes de firmar."

**Output:** Documentos enviados.
**Evidencia:** DocuSign tracking.

### 5.4 — Monitorear firma (target: ≤3 días)

**Acción:** DocuSign envía recordatorios automáticos. Si no hay firma en día 2: follow-up personal.

**Output:** Tracking de firma activo.
**Evidencia:** DocuSign.

### 5.5 — Follow-up día 2 si no hay firma

**Script:** "[nombre], quería verificar que recibiste los documentos en DocuSign. ¿Todo claro? Si necesitas algo antes de firmar, aquí estoy."

**Output:** Follow-up enviado.
**Evidencia:** CRM.

### 5.6 — Confirmar firma de contrato

**Acción:** Verificar que contrato está firmado por ambas partes.

**Output:** Contrato firmado.
**Evidencia:** DocuSign — completed.

### 5.7 — Confirmar firma de NDA

**Acción:** Verificar que NDA comercial está firmado. BLOQUEADOR: sin NDA, no se da acceso a materiales.

**Output:** NDA firmado.
**Evidencia:** DocuSign — completed.

### 5.8 — Agendar onboarding (≤7 días post-firma)

**Script:** "¡Bienvenido al equipo! Tu onboarding de ventas está agendado para [fecha]. Duración: [X horas]. Antes de la sesión recibirás tu Sales Toolkit. ¿Funciona la fecha?"

**Output:** Onboarding agendado.
**Evidencia:** Calendar + CRM.

### 5.9 — Notificar al equipo interno

**Script (interno):** "Nuevo representante comercial: [nombre], Territorio: [X], Productos: [lista], Comisión: [X]%. Onboarding: [fecha]. Welcome email: [Growth Lead]. Toolkit: [Content Lead]."

**Output:** Equipo notificado.
**Evidencia:** Slack/email.

### 5.10 — Configurar accesos CRM limitados

**Acción:** Crear usuario CRM para el rep con acceso limitado: solo puede ver/editar sus propias oportunidades. No tiene acceso a pipeline general ni a information de otros reps/embajadores.

**Output:** CRM access configurado.
**Evidencia:** CRM — usuario activo.

---

## 6. Ejecutar — Parte 2: Welcome y Preparación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Enviar welcome email personalizado

**Script:** "[nombre], bienvenido oficialmente a MetodologIA como representante comercial de [territorio]. Esto es lo que viene: (1) Onboarding de ventas: [fecha], (2) Sales Toolkit: lo recibes antes del onboarding, (3) Tu primer weekly call: [fecha]. Estamos emocionados de tenerte."

**Output:** Welcome email enviado.
**Evidencia:** Email.

### 6.2 — Crear carpeta Drive del rep

**Acción:** Crear `representantes/[nombre]/` con subcarpetas: contrato, sales-toolkit, pipeline, reportes.

**Output:** Carpeta creada.
**Evidencia:** Drive.

### 6.3 — Archivar contrato firmado en Drive

**Acción:** Subir contrato y NDA firmados a la carpeta del rep.

**Output:** Documentos archivados.
**Evidencia:** Drive.

### 6.4 — Actualizar mapa territorial: territorio = activo

**Acción:** Cambiar status del territorio de "in process" a "active — [nombre del rep]".

**Output:** Mapa actualizado.
**Evidencia:** Drive.

### 6.5 — Actualizar pipeline CRM: status = contracted

**Acción:** Marcar candidato como "Contracted" en pipeline.

**Output:** Pipeline actualizado.
**Evidencia:** CRM.

### 6.6 — Preparar agenda de onboarding (R09)

**Acción:** Coordinar con Consultant Lead y Content Lead: agenda, materiales, toolkit listo.

**Output:** Agenda de onboarding confirmada.
**Evidencia:** Doc.

### 6.7 — Configurar reporting semanal para el rep

**Acción:** Crear template de reporte semanal en CRM/Sheet. Compartir con el rep.

**Output:** Template de reporting listo.
**Evidencia:** Sheet.

### 6.8 — Agregar rep al canal de comunicación del equipo

**Acción:** Invitar al rep al canal de Slack/WhatsApp del equipo comercial.

**Output:** Rep conectado al equipo.
**Evidencia:** Slack/WhatsApp.

### 6.9 — Registrar métricas R08

**Acción:** Time-to-signature, # contratos del período, territory coverage post-firma.

**Output:** Métricas.
**Evidencia:** Dashboard.

### 6.10 — Verificar que todo está listo para R09

**Acción:** Checklist: contrato ✓, NDA ✓, CRM ✓, Drive ✓, accesos ✓, onboarding agendado ✓, toolkit preparándose ✓.

**Output:** R09 readiness: confirmed.
**Evidencia:** Checklist.

---

## 7. Ejecutar — Parte 3: Consolidación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Celebrar internamente la nueva incorporación

**Output:** Anuncio al equipo. **Evidencia:** Slack.

### 7.2 — Verificar que Finance tiene datos de comisión

**Output:** Finance notified. **Evidencia:** Email.

### 7.3 — Generar reporte de onboarding del período

**Output:** Reporte. **Evidencia:** Drive.

### 7.4 — Analizar funnel completo R01→R08

**Output:** Funnel analysis. **Evidencia:** Dashboard.

### 7.5 — Retroalimentar playbook de recruitment

**Output:** Process improvement notes. **Evidencia:** Nota.

### 7.6 — Verificar que no hay candidatos contractados sin onboarding

**Output:** 0 gaps. **Evidencia:** CRM.

### 7.7 — Compartir territorial update con equipo de embajadores

**Output:** Cross-team update. **Evidencia:** Slack.

### 7.8 — Archivar documentación del cierre

**Output:** Archivo. **Evidencia:** Drive.

### 7.9 — Planificar primer touchpoint post-onboarding (R11)

**Output:** Tarea anticipada. **Evidencia:** CRM.

### 7.10 — Cerrar ciclo R08

**Output:** Log de cierre. **Evidencia:** Log.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Contrato firmado por ambas partes
- [ ] NDA comercial firmado
- [ ] Time-to-signature ≤3 días
- [ ] Onboarding agendado ≤7 días post-firma
- [ ] Accesos CRM configurados
- [ ] Equipo notificado
- [ ] Mapa territorial actualizado

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| Contrato + NDA firmados | ☐ | DocuSign |
| Onboarding scheduled | ☐ | Calendar |
| CRM access configured | ☐ | CRM |

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Contrato firmado | PDF | Drive + DocuSign | Legal |
| NDA comercial firmado | PDF | Drive + DocuSign | Legal |

| CRM user del rep | CRM record | CRM | Ops |
| Onboarding agendado | Calendar event | Calendar | Sales Director |

### Registro en CRM

- **Campos:** Contract_Status, NDA_Status, Contract_Date, Onboarding_Date, Territory_Status
- **Timestamp:** Automático

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [09-ejecutar-onboarding-de-ventas](../../onboarding/activar-cliente/sop-09-onboarding/09-ejecutar-onboarding-de-ventas-ritual.md)
- **Datos que hereda:** Contrato, territorio, productos, comisión, agenda de onboarding
- **Condición de handoff:** Contract_Status = Signed + NDA_Status = Signed + Onboarding_Date confirmed

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Time to Signature | — | ≤3 días | 🟡 |
| Onboarding scheduled rate | — | 100% en ≤7 días | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 09 → ejecutar-onboarding-de-ventas`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Fast Contract Generator" (Prompt Pro)

```markdown
PROMPT:
"Genera un contrato de representación comercial:
Rep: [nombre], Territorio: [X], Productos: [lista], Comisión: [X]%.
Obligaciones: [mínimos de actividad], Exclusividad: [tipo], Duración: [X meses].
Incluir cláusulas de: terminación (30 días aviso), propiedad intelectual (limitada a comercial), ética, reporting.
NDA comercial anexo (scope: pricing, pipeline, comisiones — NO metodología).
Formato: legal pero legible. Idioma: español."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
