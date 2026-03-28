---
id: "08"

segmento: "embajadores"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "08-formalizar-nda-y-licencia"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Legal"
frecuencia: "por-evento"
herramientas:

- "CRM"
- "DocuSign"
- "Google Drive"

entry-criteria:

- "Territorio y condiciones acordados (Ritual 07)"
- "Addendum validado por ambas partes"
- "Aprobación legal del acuerdo personalizado"

exit-criteria:

- "NDA firmado digitalmente por ambas partes"
- "Licencia de operación firmada digitalmente"
- "Documentos archivados en Drive/legal/"
- "CRM actualizado: Ambassador_Status = Contracted"
kpi: "Formalization Rate (Target: 100% — no exceptions)"
leading-indicators:

- "Tiempo desde acuerdo hasta firma (<7 días)"
- "% firmas sin retraso"
riesgos-controles:

- riesgo: "Operar sin NDA firmado"

control: "BLOQUEADOR ABSOLUTO: Rituals 09-10-11 no se ejecutan sin NDA confirmado"

- riesgo: "Firma demorada indefinidamente"

control: "Deadline de 7 días. Si no firma: conversación de clarificación"

- riesgo: "Cambio de mente post-negociación"

control: "Si hay dudas nuevas: resolverlas antes de enviar para firma"
evidencias:

- "NDA firmado (Drive/legal/)"
- "Licencia firmada (Drive/legal/)"
- "CRM — Ambassador_Status = Contracted"
---

# Ritual: Formalizar NDA y Licencia — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **REGLA DURA #1 DEL SEGMENTO:** NDA y licencia firmados digitalmente ANTES de cualquier transferencia de IP, toolkit, o acceso a recursos. Sin excepciones. Cero.
> **BLOQUEADOR:** Rituals 09, 10, 11 están condicionados a la firma completa.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Territorio y condiciones acordados (Ritual 07).
- **Pre-ritual:** ¿El acuerdo tiene la última versión aprobada por Legal? ¿El addendum está incorporado? ¿DocuSign está configurado?
- **Contexto:** Este ritual es administrativo pero CRÍTICO. Es el último gate antes de la transferencia de IP. Todo el pipeline anterior (5 rituales de evaluación + 2 de negociación) desemboca aquí. La firma no es un trámite — es un compromiso legal bilateral.

---

## 2-4. [Estándar completo]

---

## 5. Ejecutar — Parte 1: Setup y Descubrimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Compilar documentos finales para firma

**Contexto:** Todo debe estar en un solo paquete: NDA + Licencia + Addendum + Territory Map.

**Acción:** Compilar los 4 documentos en un paquete final para DocuSign.
**Output:** Paquete de firma listo.

**Evidencia:** Drive.

### 5.2 — Verificar que el acuerdo refleja exactamente lo negociado

**Contexto:** El peor error es enviar para firma un documento que no coincide con lo acordado verbalmente.

**Acción:** Cruzar el acuerdo con las notas de negociación (R07). Verificar: zona, módulos, revenue share, condiciones especiales.
**Output:** Verificación completada.

**Evidencia:** Checklist de verificación.

### 5.3 — Enviar para firma digital

**Acción:** Configurar DocuSign con ambos firmantes (Sales Director + Candidate). Enviar con mensaje personalizado.

**Script (email de envío):** "[nombre], adjunto el acuerdo final de embajador que refleja todo lo que acordamos. Revísalo una última vez y firma digitalmente cuando estés listo. Si surge alguna duda, escríbeme directamente. El plazo para firmar es 7 días calendario."
**Output:** Acuerdo enviado para firma.

**Evidencia:** DocuSign — track de envío.

### 5.4 — Monitorear firma (diario)

**Contexto:** No presionar, pero sí monitorear. Si no hay firma en 3 días: gentle check-in.

**Acción:** Revisar DocuSign diariamente. Si 3 días sin firma: enviar check-in.
**Script (día 3):** "[nombre], solo quería verificar si recibiste el acuerdo y si todo está claro. Estoy disponible para cualquier pregunta."

**Output:** Status de firma monitoreado.
**Evidencia:** CRM — notas de follow-up.

### 5.5 — Si firma: procesar en <24h

**Contexto:** Rapidez en el procesamiento demuestra profesionalismo y genera confianza.

**Acción:** Descargar documentos firmados, verificar que todas las firmas están completas, archivar.
**Output:** Documentos firmados procesados.

**Evidencia:** Drive/legal/.

### 5.6 — Archivar en Drive/legal/ con naming estándar

**Acción:** Guardar: `NDA-[nombre]-[fecha].pdf`, `Licencia-[nombre]-[fecha].pdf`, `Addendum-[nombre]-[fecha].pdf`.

**Output:** Archivos guardados con naming.
**Evidencia:** Drive.

### 5.7 — Actualizar CRM: Ambassador_Status = Contracted

**Acción:** Cambiar status del candidate en CRM. Registrar fecha de firma, # del documento, y link a Drive.

**Output:** CRM actualizado.
**Evidencia:** CRM — campos poblados.

### 5.8 — Notificar al equipo

**Acción:** Enviar comunicación: "Nuevo embajador contratado: [nombre], Zona: [X], Dominio: [módulos]. Onboarding inicia esta semana."

**Output:** Equipo informado.
**Evidencia:** Slack/email.

### 5.9 — Crear tarea de Ritual 09 (Onboarding)

**Acción:** Programar onboarding en CRM con deadline de inicio ≤7 días post-firma.

**Output:** Tarea R09 creada.
**Evidencia:** CRM — tarea.

### 5.10 — Enviar bienvenida formal al nuevo embajador

**Script:** "¡[nombre], bienvenido a la Red de Embajadores MetodologIA! Tu acuerdo está formalizado. El siguiente paso es tu onboarding, donde te prepararemos para operar. [Growth Lead] te contactará esta semana. Estamos emocionados de tenerte como socio."

**Output:** Bienvenida enviada.
**Evidencia:** CRM — nota.

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

### 6.1 — Si no firma en 7 días: conversación

**Script:** "[nombre], noté que aún no has firmado. ¿Surgió alguna duda o preocupación nueva? Prefiero hablar que asumir."

**Output:** Razón identificada.
**Evidencia:** CRM.

### 6.2 — Si hay dudas post-envío: resolverlas

**Acción:** Agendar llamada de 15 min para resolver. Si las dudas son sustantivas: volver a Ritual 07 para re-negociar.

**Output:** Dudas resueltas o re-negociación iniciada.
**Evidencia:** Notas.

### 6.3 — Si declina firmar: exit interview + cierre digno

**Script:** "[nombre], respeto tu decisión. ¿Puedo preguntarte qué cambió? No para pressionar — para aprender."

**Output:** Exit feedback.
**Evidencia:** CRM — Decline_Reason_R08.

### 6.4-6.10 — [Registrar motivo de no-firma, actualizar pipeline, revenue forecast adjustment, territory mapa update, retroalimentar negociación process, comunicar al equipo, métricas de formalization rate, batch processing si hay múltiples candidates, archivar documentación del pipeline completo, cerrar ciclo]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Checklist de Calidad (Section 8)

- [ ] NDA firmado por ambas partes
- [ ] Licencia firmada por ambas partes
- [ ] Addendum firmado (si aplica)
- [ ] Documentos archivados en Drive/legal/ con naming estándar
- [ ] CRM actualizado con Ambassador_Status = Contracted
- [ ] Equipo notificado
- [ ] Tarea R09 creada

### Cierre

- **NEXT:** `embajadores → 09 → ejecutar-onboarding-embajador`
- **BLOCKERS:** `NDA template needs Legal review if modified.`

---

## Modal 10x: El "Signature Follow-up Engine" (Prompt Pro)

```markdown
PROMPT:
"Genera una secuencia de 3 mensajes de follow-up para un candidato que no ha firmado su acuerdo de embajador:

- Mensaje 1 (Día 3): Check-in suave, ofrecer resolver dudas
- Mensaje 2 (Día 5): Recordatorio con valor, destacar lo que se pierde si no avanza
- Mensaje 3 (Día 7): Cierre del deadline con opción de conversación

Tono: respetuoso, sin presión, profesional. Prohibido tono de cobranza o urgencia artificial."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
