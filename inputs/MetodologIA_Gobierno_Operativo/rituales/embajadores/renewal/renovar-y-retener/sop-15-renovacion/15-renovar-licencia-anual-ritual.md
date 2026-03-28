---
id: "15"

segmento: "embajadores"
journey: "renewal"
proceso: "renovar-y-retener"
sop: "sop-15-renovacion"
ritual-slug: "15-renovar-licencia-anual"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "anual"
herramientas:

- "CRM"
- "DocuSign"
- "Google Docs"

entry-criteria:

- "Licencia con ≤45 días de vigencia"
- "Re-certificación anual completada o pendiente"
exit-criteria:

- "Licencia renovada con firma digital"
- "O terminación acordada con plan de transición"
kpi: "License Renewal Rate (Target: ≥80%)"
riesgos-controles:

- riesgo: "Embajador inactivo renueva por inercia (ocupa territorio sin operar)"

control: "Renovación condicionada a actividad mínima (≥3 clientes/año)"

- riesgo: "Renovación automática sin revisión de calidad"

control: "Re-certificación anual obligatoria como requisito de renovación"

- riesgo: "Embajador valioso se va por falta de atención"

control: "Conversación proactiva 45 días antes del vencimiento"
evidencias:

- "Licencia renovada (Drive)"
- "Re-certification_Status"
- "Activity report"
---

# Ritual: Renovar Licencia Anual — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Renovación ≠ automática.** Requiere 3 condiciones simultáneas:
>
> 1. Re-certificación aprobada
> 2. Actividad mínima cumplida (≥3 clientes/año)
> 3. Compliance de estándares sin infracciones activas
> Sin estas 3: conversación antes de renovar.

---

## 5. Ejecutar — Parte 1: Verificación de Requisitos

### 5.1 — Alertar 45 días antes de vencimiento

**Contexto:** No esperar al último día. 45 días es tiempo suficiente para re-certificar si falta y para tener conversaciones honestas.

**Script:** "[nombre], tu licencia de embajador vence el [fecha]. Quiero asegurar que tu renovación sea fluida. Revisemos juntos: ¿tienes la re-certificación al día? ¿Tu actividad del año?"
**Output:** Conversación proactiva iniciada.

**Evidencia:** CRM.

### 5.2 — Verificar requisito 1: Re-certificación

**Acción:** ¿La re-certificación anual fue completada y aprobada? Si no: programar URGENTE (Ritual 11).

**Output:** Re-cert: Approved / Pending / Expired.
**Evidencia:** CRM.

### 5.3 — Verificar requisito 2: Actividad mínima

**Acción:** ¿≥3 clientes atendidos en los últimos 12 meses?

**Output:** Activity: Met / Not Met (cuántos faltaron).
**Evidencia:** CRM query.

### 5.4 — Verificar requisito 3: Compliance

**Acción:** ¿Hay infracciones activas de R18 (auditoría)? ¿NDA breach? ¿Warning no resuelto?

**Output:** Compliance: Clean / Warning / Infraction.
**Evidencia:** CRM.

### 5.5 — Si todo OK: enviar licencia renovada para firma

**Script:** "[nombre], ¡todo en orden! Tu renovación está aprobada. Te envío la licencia actualizada para firma digital. Gracias por ser parte de la red otro año."

**Output:** Licencia enviada.
**Evidencia:** DocuSign.

### 5.6 — Si falta re-cert: programar re-certificación urgente

**Script:** "Tu re-certificación no está al día. Necesito que la completemos antes del [fecha]. Te propongo [fecha para assessment]."

**Output:** Re-cert agendada.
**Evidencia:** CRM.

### 5.7 — Si falta actividad: conversación sobre razones

**Script:** "Noté que este año solo tuviste [N] clientes, menos del mínimo (3). ¿Qué pasó? ¿Fue falta de demanda, falta de tiempo, o algo más? Quiero entender antes de tomar una decisión."

**Output:** Razones identificadas + plan de activación o terminación.
**Evidencia:** Notas.

### 5.8 — Si compliance issue: resolver primero

**Acción:** Si hay warning activo: resolver antes de renovar. Si hay infracción: escalar.

**Output:** Issue resuelto o escalado.
**Evidencia:** CRM.

### 5.9-5.10 — [Si no renueva: iniciar exit process, planificar transición de clientes del embajador a otro nodo, revocar accesos a IP]

---

## 6. Ejecutar — Parte 2: Exit Process (si no renueva)

### 6.1 — Exit interview

**Script:** "Aprecio tu tiempo en la red. ¿Qué funcionó bien? ¿Qué podríamos haber hecho mejor? Tu feedback nos ayuda a ser mejores."

**Output:** Exit feedback documentado.
**Evidencia:** CRM.

### 6.2 — Plan de transición de clientes

**Acción:** ¿El embajador tiene clientes activos? Si sí: transicionar a otro embajador o a MetodologIA central.

**Output:** Transition plan.
**Evidencia:** CRM.

### 6.3 — Revocar accesos progresivamente

**Acción:** Fase 1 (inmediato): revocar acceso a IP nuevos. Fase 2 (30 días): revocar acceso a Drive. Fase 3 (60 días): archivación completa.

**Output:** Accesos revocados por fases.
**Evidencia:** Drive + CRM.

### 6.4 — Archivar NDA (sigue vigente post-terminación)

**Script:** "Aunque tu licencia termina, el NDA sigue vigente por [X] años. Los materiales transferidos deben ser eliminados de tus sistemas. ¿Confirmamos?"

**Output:** NDA post-termination acknowledged.
**Evidencia:** CRM.

### 6.5-6.10 — [Actualizar Mapa de Nodos, revenue impact, territory reassignment, comunicar al equipo, actualizar pipeline de reclutamiento para la zona, métricas de renewal rate, retrospectiva del embajador]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 16 → activar-red-de-embajadores`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Renewal Decision Tree" (Prompt Pro)

```markdown
PROMPT:
"Analiza si este embajador MetodologIA debería renovar su licencia:

- Re-certificación: [status]
- Clientes en 12 meses: [N] (mínimo: 3)
- Compliance: [status]
- Revenue generado: [$X]
- NPS de sus clientes: [X]

Genera:
1. Diagnóstico en 3 líneas
2. Recomendación: Renovar / Renovar con condiciones / No renovar
3. Si 'No renovar': plan de exit y transición de clientes
Tono: empático pero riguroso."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
