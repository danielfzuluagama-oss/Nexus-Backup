---
id: "02"

segmento: "personas-servicios"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-calificar-lead-consultivo"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-evento (al captar señal con Resonance ≥ 50)"
herramientas:

- "CRM"
- "Google Docs"
- "NotebookLM"

entry-criteria:

- "Señal capturada con Resonance_Score ≥ 50 (Ritual 01)"
- "Micro-respuesta enviada y con respuesta positiva del individuo"
exit-criteria:

- "4D Fit Score calculado"
- "Lead clasificado: Qualified / Developing / Not Fit"
- "Qualified avanza a Ritual 03"

kpi: "Qualification Rate (Target: ≥40% de señales se califican como Qualified)"
leading-indicators:

- "Tiempo desde señal hasta calificación (<24h)"
- "Accuracy del Fit Score (% de Qualified que llegan a propuesta)"
riesgos-controles:

- riesgo: "Calificar por simpatía o rapport social"

control: "Fit Score objetivo con 4 dimensiones ANTES de la conversación"

- riesgo: "Descartar leads con dolor real pero baja capacidad expresada"

control: "Dimensión 'urgencia' pondera intención vs capacidad"

- riesgo: "Pipeline saturado con leads semi-calificados"

control: "SLA: calificar en <24h — no acumular"
evidencias:

- "4D Fit Score en CRM"
- "Classification: Qualified / Developing / Not Fit"
- "Tarea de R03 creada (si Qualified)"
---

# Ritual: Calificar Lead Consultivo — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** Calificar objetivamente si el lead tiene FIT para un servicio consultivo, usando un score de 4 dimensiones. La calificación se hace ANTES de la sesión discovery — no después.
> **4 Dimensiones del Fit Score:**
>
> 1. **Dolor** (0-25): ¿Tiene un dolor real y articulado?
> 2. **Urgencia** (0-25): ¿Necesita resolverlo ahora o "algún día"?
> 3. **Capacidad de inversión** (0-25): ¿Puede pagar un servicio consultivo?
> 4. **Alineación metodológica** (0-25): ¿Lo que necesita es lo que ofrecemos?

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Lead responde positivamente a la micro-respuesta del Ritual 01.
- **Pre-ritual:** ¿Tengo suficiente información para estimar las 4 dimensiones? Si no: pedir más contexto antes de calificar.
- **Contexto:** La calificación previene que el consultor invierta 60 min de discovery en alguien que no tiene fit. El Fit Score es objetivo para evitar que el rapport personal influya en la evaluación.

---

## 5. Ejecutar — Parte 1: Recolección de Información

### 5.1 — Revisar toda la información disponible del lead

**Contexto:** Antes de puntuar, consolidar todo lo que sabemos: mensaje original, perfil LinkedIn, referencia (si aplica), micro-insight IA.

**Acción:** Compilar un mini-dossier de 1 párrafo.
**Output:** Contexto consolidado.

**Evidencia:** CRM — nota.

### 5.2 — Evaluar Dimensión 1: Dolor (0-25)

**Contexto:** El dolor debe ser articulado, no vago. "Quiero mejorar" = 5pts. "Mi equipo de 8 personas pierde 10h/semana en reuniones sin decisión" = 25pts.

**Acción:** ¿El lead articuló un dolor específico en su mensaje? ¿Es concreto y medible?
**Script de criterio:**

- 0-10: Dolor vago, no articulado, parece casualidad
- 11-18: Dolor real pero genérico ("necesito ayuda con liderazgo")
- 19-25: Dolor específico con impacto medible ("pierdo 3 clientes/mes por X")

**Output:** Pain_Score: [X]/25.

**Evidencia:** CRM.

### 5.3 — Evaluar Dimensión 2: Urgencia (0-25)

**Contexto:** Urgencia baja = procrastinación eterna. Urgencia alta = acción inmediata.

**Acción:** ¿Hay un deadline externo? ¿Un evento que fuerza la decisión? ¿O es "algún día"?
**Script de criterio:**

- 0-10: "Algún día quiero..." / sin timeline
- 11-18: "Este trimestre necesito..." / presión interna
- 19-25: "Antes de [fecha específica] tengo que..." / presión externa

**Output:** Urgency_Score: [X]/25.

**Evidencia:** CRM.

### 5.4 — Evaluar Dimensión 3: Capacidad de Inversión (0-25)

**Contexto:** La capacidad se infiere del perfil, no se pregunta directamente en esta etapa.

**Acción:** Revisar: seniority, empresa, industria, historial de inversiones en desarrollo profesional.
**Script de criterio:**

- 0-10: Perfil junior, no decision maker, startup early stage
- 11-18: Mid-career, presupuesto probable pero no confirado
- 19-25: Senior, decision maker, inversiones previas en servicios similares

**Output:** Investment_Score: [X]/25.

**Evidencia:** CRM.

### 5.5 — Evaluar Dimensión 4: Alineación Metodológica (0-25)

**Contexto:** ¿Lo que necesita el lead es lo que MetodologIA ofrece? Si necesita terapia, no somos la respuesta. Si necesita consultoría operativa con IA, sí lo somos.

**Acción:** ¿El dolor del lead se resuelve con nuestros módulos/programas?
**Script de criterio:**

- 0-10: Necesita algo que no ofrecemos
- 11-18: Match parcial — adaptación necesaria
- 19-25: Match directo con módulo/programa existente

**Output:** Alignment_Score: [X]/25.

**Evidencia:** CRM.

### 5.6 — Calcular 4D Fit Score (0-100)

**Acción:** Sumar: Pain + Urgency + Investment + Alignment = Fit_Score.

**Output:** Fit_Score: [X]/100.
**Evidencia:** CRM.

### 5.7 — Clasificar: Qualified (≥70) / Developing (50-69) / Not Fit (<50)

**Acción:** Clasificar y taggear en CRM.

**Output:** Classification.
**Evidencia:** CRM — tag.

### 5.8 — Si Qualified: crear tarea de Ritual 03 (Enriquecer Perfil)

**Script al equipo:** "Lead calificado: [nombre], Fit Score: [X]/100. Dolor: [resumen]. Urgencia: [alta/media]. Discovery esta semana."

**Output:** Tarea R03 creada.
**Evidencia:** CRM.

### 5.9 — Si Developing: nurturing personalizado

**Script al lead:** "[nombre], aprecio tu interés. Creo que hay potencial para trabajar juntos, pero quiero darte más contexto antes de agendar una sesión. Te comparto [recurso relevante]. Hablamos en 2 semanas."

**Output:** Nurturing activado.
**Evidencia:** CRM — tarea de re-evaluación.

### 5.10 — Si Not Fit: cerrar con valor

**Script:** "[nombre], gracias por contactarme. Basándome en lo que me compartes, creo que lo que necesitas es [alternativa — no MetodologIA]. Te recomiendo [recurso o persona]. Si en el futuro cambia tu situación, mi puerta está abierta."

**Output:** Cierre con valor.
**Evidencia:** CRM.

---

## 6-7. [Registro, métricas, retroalimentación a Ritual 01, análisis de precision del Fit Score, dashboard — estándar v4.1]

## 8-10. [QA, Outputs, Cierre — estándar completo]

### Cierre

- **NEXT:** `personas-servicios → 03 → enriquecer-perfil-consultivo`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Consultative Lead Qualifier" (Prompt Pro)

```markdown
PROMPT:
"Califica este lead consultivo usando el 4D Fit Score:
Lead: [nombre], Canal: [inbound/referido/posicional], Mensaje: [texto original].
Perfil: [cargo, empresa, industria, seniority].
Evalúa 4 dimensiones (0-25 cada una):
1. Dolor: ¿articulado y específico, o vago?
2. Urgencia: ¿hay deadline o evento forzante?
3. Capacidad de inversión: ¿el perfil sugiere capacidad?
4. Alineación: ¿lo que necesita es lo que ofrecemos?
Output: scores + Fit Score total + clasificación (Qualified/Developing/Not Fit) + micro-respuesta sugerida.

Tono: analítico, objetivo."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
