---
id: "05"

segmento: "personas-servicios"
journey: "evaluation"
proceso: "demostrar-valor"
sop: "sop-05-try-and-buy"
ritual-slug: "05-entregar-sesion-try-and-buy"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Growth Lead"
frecuencia: "por-evento (post-discovery con fit confirmado)"
herramientas:

- "CRM"
- "Zoom"
- "Google Docs"
- "Miro / Whiteboard"
entry-criteria:

- "Discovery completada con dolor validado (Ritual 04)"
- "Lead decidió avanzar a experiencia práctica"
- "Sesión de 90 min agendada"

exit-criteria:

- "Lead experimentó un micro-resultado tangible"
- "Before/After documentado por el lead"
- "Decisión del lead: avanzar a propuesta o no"

kpi: "Try-to-Proposal Rate (Target: ≥60%)"
leading-indicators:

- "% de sessions donde lead documenta before/after"
- "NPS de la sesión try & buy"
riesgos-controles:

- riesgo: "Sesión se siente como demo, no como experiencia"

control: "El lead TRABAJA en su problema real, no observa"

- riesgo: "Sobreprometer resultado del programa completo"

control: "Frame claro: 'Esto es 10% de lo que se puede lograr'"

- riesgo: "Lead se frustra si el micro-resultado no es espectacular"

control: "Definir expectativa realista al inicio de la sesión"
evidencias:

- "Before/After del lead"
- "Micro-resultado documentado"
- "Decisión del lead"
---

# Ritual: Entregar Sesión Try & Buy — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** El lead VIVE la transformación, no la escucha. 90 min donde trabaja en su problema real y sale con un micro-resultado tangible.
> **Estructura: 20/50/20:** Setup (20 min) → Work session (50 min con facilitación) → Debrief + decision (20 min).
> **REGLA:** El lead sale con ALGO que no tenía antes de entrar. Un insight, un plan, un framework aplicado, o una decisión tomada.

---

## 5. Ejecutar — Parte 1: La Sesión Try & Buy (90 min)

### 5.1 — Setup: Definir el "before" con el lead (10 min)

**Script:** "[nombre], antes de empezar quiero que capturemos tu 'antes'. Describe en 2-3 frases: ¿dónde estás hoy con respecto a [dolor validado]? ¿Cómo se siente? ¿Cuánto te cuesta (tiempo/energía/oportunidad)?"

**Output:** Before statement documentado por el lead.
**Evidencia:** Doc.

### 5.2 — Setup: Explicar la experiencia (10 min)

**Script:** "Hoy no voy a hacer una presentación ni una demo. Vamos a TRABAJAR en tu problema real durante 50 minutos. Yo facilito, tú trabajas. Al final vas a tener un [micro-resultado específico]. Esta experiencia es el 10% de lo que se puede lograr en un programa completo. ¿Arrancamos?"

**Output:** Expectativas alineadas.
**Evidencia:** —

### 5.3 — Work Session: Facilitar transformación en vivo (50 min)

**Contexto:** Este es el núcleo. El consultor facilita, el lead trabaja. La facilitación debe producir un output visible para el lead. Ejemplos: un plan de acción, un framework aplicado a su caso, una decisión difícil tomada, un proceso rediseñado.

**Acción:** Ejecutar el módulo de experiencia adaptado al dolor del lead. Parar cada 15 min para check-in: "¿Esto te está sirviendo? ¿Ajustamos?"
**Output:** Lead produce un output tangible.

**Evidencia:** Artefacto del lead.

### 5.4 — Capturar el "after" con el lead (5 min)

**Script:** "Ahora que trabajamos 50 minutos: describe tu 'después'. ¿Qué tienes ahora que no tenías antes? ¿Cómo te sientes respecto a [dolor]?"

**Output:** After statement documentado por el lead.
**Evidencia:** Doc.

### 5.5 — Debrief: Before vs After visible (5 min)

**Script:** "Mira tu before: [leer]. Ahora tu after: [leer]. En 50 minutos pasaste de [before] a [after]. Imagina qué pasa en [duración del programa completo]."

**Output:** Transformación visible para el lead.
**Evidencia:** —

### 5.6 — Decision moment: avanzar o no (10 min)

**Script — Si hay fit claro:** "[nombre], ¿esto es lo que necesitas pero más profundo y sostenido? Si tu respuesta es sí, te preparo una propuesta personalizada. Te la envío en 5 días."

**Script — Si hay duda:** "No necesitas decidir ahora. Procesa la experiencia de hoy. Te contacto en 72h para saber cómo estás."
**Script — Si no hay fit:** "Aprecio tu trabajo hoy. Creo que el micro-resultado fue útil, pero para el programa completo necesitas [condición]. Te sugiero [alternativa]."

**Output:** Decisión del lead.
**Evidencia:** CRM — Decision_R05.

### 5.7-5.10 — [Enviar artefacto al lead (su output de la sesión), registrar verbatims, actualizar pipeline, crear tarea R06 si avanza]

---

## 6-10. [Post-sesión, análisis, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 06 → presentar-propuesta-servicio`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Try & Buy Experience Designer" (Prompt Pro)

```markdown
PROMPT:
"Diseña una sesión Try & Buy de 90 min para un servicio consultivo.
Lead: [nombre], Dolor: [X], Módulo: [X].
Estructura 20/50/20:
1. Setup (20 min): captura de 'before', frame de la sesión
2. Work session (50 min): ejercicio facilitado que produce un micro-resultado tangible
3. Debrief (20 min): before vs after, decisión
El ejercicio del work session debe:

- Usar el problema real del lead (no caso hipotético)
- Producir un output visible (plan, framework, decisión)
- Demostrar el 10% de lo que el programa completo ofrece

Formato: agenda con scripts de transición."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
