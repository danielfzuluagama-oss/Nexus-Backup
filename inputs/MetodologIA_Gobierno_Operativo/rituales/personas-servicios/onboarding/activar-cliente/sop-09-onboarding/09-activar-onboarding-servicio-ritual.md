---
id: "09"

segmento: "personas-servicios"
journey: "onboarding"
proceso: "activar-cliente"
sop: "sop-09-onboarding"
ritual-slug: "09-activar-onboarding-servicio"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Growth Lead"
frecuencia: "por-evento (post cierre)"
herramientas:

- "CRM"
- "Zoom"
- "Google Drive"
- "Calendly"
- "Loom"

entry-criteria:

- "Acuerdo firmado + pago procesado (Ritual 08)"
- "Primera sesión agendada"
exit-criteria:

- "Sesión kick-off completada"
- "Baseline del cliente documentada"
- "Todas las sesiones del programa agendadas"
- "Accesos y herramientas configurados"
kpi: "Onboarding Satisfaction (Target: NPS ≥ 9/10 del kick-off)"
riesgos-controles:

- riesgo: "Gap emocional entre el entusiasmo del cierre y la primera sesión"

control: "Video de bienvenida personal (Loom 60-90s) en <24h post-cierre"

- riesgo: "Cliente llega sin preparación"

control: "Pre-work enviado + reminder 48h antes + verify 24h antes"

- riesgo: "Expectativas no alineadas desde el inicio"

control: "Kick-off incluye definición de success criteria + working agreement"
evidencias:

- "Kick-off notes"
- "Baseline documentada"
- "Calendar con todas las sesiones"
- "Working agreement firmado"
---

# Ritual: Activar Onboarding de Servicio — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** Convertir el "compré un servicio" en "empecé una transformación". El kick-off no es administrativo — es el primer acto de la transformación.
> **Estructura kick-off (60 min):** Welcome (5) → Revisión de success criteria (10) → Baseline (15) → Working agreement (10) → Plan de sesiones (10) → Quick win prep (10).

---

## 5. Ejecutar — Parte 1: Pre Kick-off

### 5.1 — Enviar video de bienvenida Loom (60-90s, en <24h post-cierre)

**Script:** "[nombre], ¡bienvenido! Estoy genuinamente emocionado de trabajar contigo. En nuestra primera sesión vamos a establecer tu baseline y definir exactamente cómo se va a ver tu éxito. Prepárate para trabajar. ¡Nos vemos el [fecha]!"

**Output:** Video enviado.
**Evidencia:** CRM — nota con link.

### 5.2 — Configurar carpeta del cliente en Drive

**Acción:** Crear: `clientes/[nombre]-[programa]/` con subcarpetas: sesiones, artefactos, métricas.

**Output:** Carpeta lista con estructura.
**Evidencia:** Drive.

### 5.3 — Agendar TODAS las sesiones del programa

**Contexto:** Si agendas de a una, el momentum se pierde. Agendar todas al inicio.

**Acción:** Usar Calendly o coordinación directa para bloquear todas las sesiones.
**Output:** Calendario completo.

**Evidencia:** CRM + calendario.

### 5.4 — Enviar pre-work de kick-off

**Script:** "[nombre], para nuestra primera sesión te pido que reflexiones sobre: (1) ¿Qué resultado te haría decir 'esto valió cada centavo'? (2) ¿Cuál es el mayor obstáculo que anticipas? (3) Completa esta auto-evaluación: [link]. Esto nos ahorra tiempo y nos permite ir directo al trabajo."

**Output:** Pre-work enviado.
**Evidencia:** Email.

### 5.5 — Verify 24h antes

**Script:** "Mañana arrancamos. ¿Completaste el pre-work? ¿Alguna duda? Nos vemos a las [hora]."

**Output:** Confirmación.
**Evidencia:** —

---

## 6. Ejecutar — Parte 2: Kick-off Session (60 min)

### 6.1 — Welcome + reconocimiento de la decisión (5 min)

**Script:** "[nombre], quiero empezar reconociendo tu decisión. Invertir en tu desarrollo requiere coraje. Vamos a asegurarnos de que esta inversión se multiplique."

**Output:** Tono emocional correcto.
**Evidencia:** —

### 6.2 — Definir success criteria (10 min)

**Script:** "Del pre-work: ¿qué resultado te haría decir que esto valió cada centavo? Vamos a hacerlo medible: [resultado] + [indicador] + [timeframe]."

**Output:** 3 success criteria documentados.
**Evidencia:** Doc.

### 6.3 — Establecer baseline (15 min)

**Contexto:** El baseline es el "before" formal: dónde está el cliente HOY en las dimensiones que importan.

**Acción:** Auto-evaluación guiada (si no la hizo en pre-work) + conversación sobre el estado actual.
**Output:** Baseline scores / narrative documentados.

**Evidencia:** Doc.

### 6.4 — Working Agreement (10 min)

**Script:** "Para que esto funcione, propongo estas reglas de engagement: (1) Honestidad brutal — si algo no funciona, me lo dices. (2) Puntualidad — respetamos los tiempos de ambos. (3) Tareas entre sesiones — las hacemos o las renegociamos, pero no las ignoramos. (4) Confidencialidad — lo que compartes aquí se queda aquí. ¿Agregas algo?"

**Output:** Working agreement.
**Evidencia:** Doc firmado.

### 6.5 — Plan de sesiones (10 min)

**Acción:** Revisar el calendario de sesiones y explicar la estructura del programa.

**Output:** Plan comprendido.
**Evidencia:** —

### 6.6 — Preparar quick win para sesión 2 (10 min)

**Contexto:** El cliente necesita un resultado visible RÁPIDO para confirmar que tomó la decisión correcta.

**Acción:** Asignar una tarea que produzca un resultado tangible en <7 días.
**Script:** "Para nuestra próxima sesión, quiero que hagas [acción concreta]. Es algo que puedes hacer en [tiempo]. Cuando lo hagas, vas a notar [resultado esperado]. Esto es tu primer quick win."

**Output:** Quick win asignado.
**Evidencia:** CRM — tarea.

### 6.7-6.10 — [Actualizar CRM con baseline + success criteria, enviar resumen del kick-off al cliente, configurar cualquier herramienta adicional, registrar métricas de onboarding]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 10 → entregar-servicio-transformacional`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Kick-off Session Designer" (Prompt Pro)

```markdown
PROMPT:
"Diseña una sesión de kick-off de 60 min para un servicio consultivo.
Cliente: [nombre], Programa: [X], Dolor: [X], Duración: [X sesiones].
Estructura:
1. Welcome + reconocimiento de decisión (script)
2. Success criteria (template de 3 resultados medibles)
3. Baseline (auto-evaluación de 5 dimensiones)
4. Working agreement (reglas de engagement)
5. Plan de sesiones (calendario visual)
6. Quick win prep (tarea para primera semana)
Formato: agenda de 60 min con scripts de transición y templates."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
