---
id: "15"

segmento: "personas-servicios"
journey: "renewal"
proceso: "renovar-y-retener"
sop: "sop-15-renovacion"
ritual-slug: "15-renovar-programa-recurrente"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Consultant Lead"
frecuencia: "por-evento (30 días antes de vencimiento)"
herramientas:

- "CRM"
- "Google Docs"
- "Zoom"

entry-criteria:

- "Retainer o programa con ≤30 días de vigencia"
- "NPS y outcome data disponibles"
exit-criteria:

- "Renovación confirmada + nuevo período activo"
- "O cierre digno con graduation package"
kpi: "Renewal Rate (Target: ≥70%)"
riesgos-controles:

- riesgo: "Renovar por inercia sin revisar resultados"

control: "Review obligatoria de outcome + NPS antes de renovar"

- riesgo: "Cliente insatisfecho renueva por comodidad y luego cancela"

control: "Conversación honesta 30 días antes: ¿esto te sigue sirviendo?"

- riesgo: "Perder cliente valioso por falta de outreach"

control: "Alerta automática 30 días antes de vencimiento"
evidencias:

- "Renewal decision documented"
- "Updated agreement (if renewed)"
- "Exit feedback (if not renewed)"
---

# Ritual: Renovar Programa Recurrente — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Principio:** Renovar porque FUNCIONA, no por comodidad. Si el servicio no está produciendo resultados, la conversación honesta es más valiosa que una renovación vacía.

---

## 5. Ejecutar

### 5.1 — Alerta 30 días antes de vencimiento

**Script:** "[nombre], tu [retainer/programa] termina el [fecha]. Quiero agendar 30 min para revisar juntos si tiene sentido renovar. No es una llamada de ventas — es un check de valor."

**Output:** Sesión agendada.
**Evidencia:** CRM.

### 5.2 — Review de resultados pre-sesión

**Acción:** Compilar: outcomes logrados, NPS, # de sesiones, artefactos producidos, ROI estimado.

**Output:** Review doc.
**Evidencia:** CRM.

### 5.3 — Conversación de renovación (30 min)

**Script:** "Hagamos un balance honesto. Empezaste con [dolor]. Hoy estás en [resultado]. Tu NPS fue [X]. ¿Esto te está sirviendo? ¿Qué ajustarías si renovamos?"

**Output:** Feedback + decisión del cliente.
**Evidencia:** Notas.

### 5.4 — Si renueva: actualizar acuerdo + ajustar si necesario

**Acción:** Renovar con ajustes basados en feedback. No renovar IGUAL — mejorar.

**Output:** Acuerdo actualizado.
**Evidencia:** DocuSign.

### 5.5 — Si no renueva: graduation con gratitud

**Script:** "Aprecio el camino que recorrimos juntos. Tu puerta está siempre abierta. Te envío tu graduation package con todo lo que construimos."

**Output:** Graduation + cierre.
**Evidencia:** CRM.

### 5.6-5.10 — [Exit interview si no renueva, referral ask, registrar renewar rate, retroalimentar oferta, métricas]

---

## 6-10. [Estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 16 → activar-referidos-consultivos`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Renewal Value Check" (Prompt Pro)

```markdown
PROMPT:
"Prepara una conversación de renovación para un cliente consultivo.
Cliente: [nombre], Programa: [X], Duración: [X meses], NPS: [X].
Outcomes logrados: [lista].
Genera:
1. Script de apertura (reconocer resultados)
2. 3 preguntas para evaluar si la renovación tiene valor
3. Propuesta de renovación con mejoras basadas en feedback
4. Script de cierre si no renueva (con graduation message)
Tono: honesto, consultivo, sin presión."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
