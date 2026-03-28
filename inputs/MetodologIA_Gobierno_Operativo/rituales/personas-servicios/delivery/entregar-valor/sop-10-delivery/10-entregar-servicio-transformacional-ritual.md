---
id: "10"

segmento: "personas-servicios"
journey: "delivery"
proceso: "entregar-valor"
sop: "sop-10-delivery"
ritual-slug: "10-entregar-servicio-transformacional"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-sesión (durante todo el programa)"
herramientas:

- "CRM"
- "Zoom"
- "Google Docs"
- "Miro / Whiteboard"
- "Loom"

entry-criteria:

- "Kick-off completado con baseline y success criteria (Ritual 09)"
- "Sesión agendada con pre-work asignado"
exit-criteria:

- "Cada sesión produce un artefacto tangible para el cliente"
- "Progress visible medido contra baseline"
- "Post-session summary enviado en <24h"

kpi: "Client Progress Rate (Target: ≥80% de sesiones con artefacto producido)"
leading-indicators:

- "NPS mid-program (sesión 3-4)"
- "Completion rate de tareas inter-sesión"
riesgos-controles:

- riesgo: "Sesiones se vuelven 'conversaciones' sin output"

control: "Cada sesión DEBE producir un artefacto (plan, decisión, framework aplicado)"

- riesgo: "Cliente no hace tareas inter-sesión"

control: "Renegociar workload en lugar de ignorar; si persiste, conversación honesta"

- riesgo: "Progreso invisible (el cliente siente que no avanza)"

control: "Revisión de baseline vs actual en cada sesión"
evidencias:

- "Artefacto por sesión"
- "Post-session summary"
- "Progress tracker (baseline vs current)"
---

# Ritual: Entregar Servicio Transformacional — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **REGLA POR SESIÓN:** Cada sesión = 1 artefacto tangible. Si el cliente sale sin algo nuevo (un plan, una decisión, un framework aplicado), la sesión falló.
> **Estructura por sesión (60 min):** Check-in (5) → Review tarea (10) → Work block (35) → Capture artifacts (5) → Preview next (5).

---

## 5. Ejecutar — Parte 1: Pre-Sesión

### 5.1 — Revisar progreso y preparar sesión

**Acción:** Leer post-session summary anterior + verificar si completó tarea inter-sesión + preparar agenda para hoy.

**Output:** Agenda de la sesión lista.
**Evidencia:** Notas.

### 5.2 — Verificar tarea inter-sesión (pre-check)

**Acción:** ¿El cliente completó su tarea? Si no: no juzgar, pero traer a la sesión.

**Output:** Task status: Done / Partial / Not done.
**Evidencia:** CRM.

---

## 6. Ejecutar — Parte 2: Sesión en Vivo (60 min)

### 6.1 — Check-in (5 min)

**Script:** "¿Cómo estás? ¿Qué cambió desde la última sesión?" (No small talk — check-in genuino sobre su progreso y bienestar).

**Output:** Estado actual del cliente.
**Evidencia:** —

### 6.2 — Review de tarea (10 min)

**Script (si la hizo):** "Cuéntame qué pasó cuando hiciste [tarea]. ¿Qué descubriste?"

**Script (si no la hizo):** "Noté que la tarea no se completó. No es un juicio — quiero entender qué pasó. ¿Fue el tiempo, la claridad, o la motivación?"
**Output:** Insights de la tarea (o razones de no-completion).

**Evidencia:** Notas.

### 6.3 — Work block (35 min)

**Contexto:** Aquí es donde se produce la transformación. El consultor facilita, el cliente trabaja. Cada sesión trabaja un módulo o aspecto del programa que se alinea con los success criteria.

**Acción:** Facilitar el bloque de trabajo con el framework/herramienta del programa.
**Output:** Artefacto del cliente (plan, decisión, framework aplicado).

**Evidencia:** Doc.

### 6.4 — Capture artifacts (5 min)

**Script:** "Antes de cerrar: ¿qué te llevas hoy? Escríbelo en tus palabras: 'hoy aprendí/decidí/construí [X]'."

**Output:** Cliente articula su takeaway.
**Evidencia:** Doc.

### 6.5 — Preview y tarea (5 min)

**Script:** "La próxima sesión trabajamos [tema]. Para prepararte: [tarea]. Es [duración estimada]. ¿Es manejable?"

**Output:** Tarea asignada.
**Evidencia:** CRM.

---

## 7. Ejecutar — Parte 3: Post-Sesión

### 7.1 — Enviar post-session summary en <24h

**Script del summary:**
"[nombre], resumen de nuestra sesión:

- **Check-in:** [estado]
- **Tarea anterior:** [resultado]
- **Trabajo de hoy:** [lo que hicimos]
- **Tu takeaway:** [sus palabras]
- **Tarea para próxima:** [detalle]
- **Progreso vs objetivo:** [# sesiones completadas / total, avance visible]"
**Output:** Summary enviado.

**Evidencia:** Email.

### 7.2 — Actualizar progress tracker

**Acción:** Comparar baseline vs current en las dimensiones definidas en kick-off.

**Output:** Progress visible.
**Evidencia:** CRM / Doc.

### 7.3 — Mid-program check (sesión 3-4)

**Script:** "Llevamos [N] sesiones. Quiero hacer un check honesto: ¿estás avanzando hacia lo que definimos como éxito? ¿Hay algo que deba ajustar en mi facilitación?"

**Output:** Feedback mid-program.
**Evidencia:** NPS mid-program.

### 7.4-7.10 — [Ajustar plan si es necesario, registrar insights, preparar siguiente sesión, célébrar milestones visibles, retroalimentar programa, métricas, dashboard]

---

## 8-10. [QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 11 → medir-progreso-cliente`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Session Architect" (Prompt Pro)

```markdown
PROMPT:
"Diseña la agenda de una sesión consultiva de 60 min.
Cliente: [nombre], Sesión: [# de N], Módulo: [tema del programa].
Success criteria del programa: [X].
Tarea de la sesión anterior: [X].
Estructura 5/10/35/5/5:
1. Check-in (pregunta de apertura)
2. Review de tarea (preguntas de exploración)
3. Work block (ejercicio/framework con output tangible)
4. Capture (template para que el cliente articule takeaway)
5. Preview y tarea (qué viene + asignación específica)

Formato: agenda con scripts. Tono: facilitación, no enseñanza."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
