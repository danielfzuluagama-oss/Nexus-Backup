---
id: "11"

segmento: "personas-servicios"
journey: "success"
proceso: "gestionar-exito"
sop: "sop-11-success"
ritual-slug: "11-medir-progreso-cliente"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Growth Lead"
frecuencia: "sesión-sobre-sesión + milestone assessment formal"

herramientas:

- "CRM"
- "Google Docs"
- "Google Forms"

entry-criteria:

- "Programa en ejecución (Ritual 10)"
- "Baseline y success criteria definidos (Ritual 09)"
exit-criteria:

- "Progress visible y documentado vs baseline"
- "Mid-program y end-of-program assessments completados"
- "Cliente articula su transformación en sus propias palabras"

kpi: "Client Outcome Achievement Rate (Target: ≥75% logran ≥2 de 3 success criteria)"
riesgos-controles:

- riesgo: "Progreso invisible = cliente siente que no avanza"

control: "Comparación baseline vs actual en cada milestone (visual)"

- riesgo: "Auto-reporte inflado (cliente dice que mejoró pero no es real)"

control: "Triangular: auto-reporte + artefactos producidos + observación del consultor"

- riesgo: "No medir = no saber si el servicio FUNCIONA"

control: "Assessments obligatorios (mid y end)"
evidencias:

- "Mid-program assessment"
- "End-of-program assessment"
- "Transformation narrative (en palabras del cliente)"
---

# Ritual: Medir Progreso del Cliente — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **3 tipos de medición:** (1) Session-over-session (micro), (2) Mid-program assessment (macro), (3) End-of-program assessment (final). Las 3 son obligatorias.

---

## 5. Ejecutar — Parte 1: Medición Continua

### 5.1 — Session-over-session tracking

**Contexto:** Cada sesión (Ritual 10) produce un post-session summary con progreso. Aquí se agrega al tracke longitudinal.

**Acción:** Actualizar progress tracker con takeaways de la última sesión.
**Output:** Tracker actualizado.

**Evidencia:** Doc.

### 5.2 — Mid-program assessment (sesión N/2)

**Acción:** En la sesión de la mitad del programa, ejecutar evaluación formal.

**Script:** "[nombre], llevamos la mitad del programa. Es momento de medir dónde estás vs dónde empezaste. Vamos a revisar tus 3 success criteria uno por uno."
**Acción:** Para cada success criterion: ¿dónde empezó (baseline)? → ¿dónde está ahora? → ¿cuánto falta?

**Output:** Mid-program scores.
**Evidencia:** Assessment doc.

### 5.3 — Ajustar plan si hay gaps

**Contexto:** Si un success criterion lleva retraso, ajustar las sesiones restantes.

**Script:** "Estás avanzando bien en [criterio 1 y 2], pero [criterio 3] lleva retraso. Propongo que dediquemos las próximas 2 sesiones a enfocarnos en esto. ¿De acuerdo?"
**Output:** Plan ajustado.

**Evidencia:** Doc.

### 5.4 — Solicitar NPS mid-program

**Script:** "Quick question: en una escala del 1 al 10, ¿qué tan probable es que recomiendes este programa? ¿Por qué?"

**Output:** NPS mid-program + verbatim.
**Evidencia:** CRM.

### 5.5-5.10 — [Si NPS < 7: conversación honesta sobre qué ajustar, celebrar progreso visible, compartir before/after visual con el cliente, documentar insights, preparar end-of-program assessment, actualizar métricas]

---

## 6. Ejecutar — Parte 2: End-of-Program Assessment

### 6.1 — Assessment final (última sesión o sesión dedicada)

**Script:** "Esta es nuestra sesión de cierre. Vamos a medir exactamente qué logramos. Tus 3 success criteria eran: [lista]. Veamos cada uno."

**Acción:** Para cada criterion: baseline → current → delta.
**Output:** End-of-program scores.

**Evidencia:** Assessment final.

### 6.2 — Capturar Transformation Narrative

**Contexto:** La narrativa del cliente EN SUS PALABRAS es el asset más valioso: sirve como testimonial (si lo autoriza) y como evidencia de impacto.

**Script:** "En tus propias palabras: ¿qué cambió para ti durante este programa? Si tuvieras que contárselo a un colega en 2 minutos, ¿qué le dirías?"
**Output:** Transformation narrative.

**Evidencia:** Texto en CRM.

### 6.3 — Solicitar NPS final + testimonial

**Script:** "¿Me darías tu feedback formal? (1) NPS, (2) ¿puedo usar tu experiencia (anónima o con nombre) para ayudar a otros?"

**Output:** NPS final + testimonial autorizado.
**Evidencia:** Google Form.

### 6.4 — Entregar "graduation package"

**Acción:** Compilar y enviar: todos los artefactos del programa, progress tracker final, resources para continuidad.

**Script:** "Te envío tu 'paquete de graduación'. Incluye todo lo que produjimos juntos. Es tuyo para usar y compartir."
**Output:** Package enviado.

**Evidencia:** Email.

### 6.5-6.10 — [Calcular ROI del programa (impacto vs inversión), actualizar portfolio de resultados, registrar métricas, identificar expansion opportunities, handoff a R12 o R14 si hay expansion, cerrar programa en CRM]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 12 → potenciar-resultados-con-ia` (si aplica)
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Program Impact Analyzer" (Prompt Pro)

```markdown
PROMPT:
"Analiza el impacto de un programa consultivo:
Cliente: [nombre], Programa: [X], Duración: [N sesiones].
Success criteria:
1. [criterion 1]: baseline [X] → current [Y]
2. [criterion 2]: baseline [X] → current [Y]
3. [criterion 3]: baseline [X] → current [Y]
NPS: [X]. Inversión: [$X].
Genera:
1. Impact summary (3 líneas)
2. ROI cualitativo y cuantitativo
3. Transformation narrative (template en primera persona del cliente)
4. Recomendación de continuidad (más sesiones / nuevo programa / graduado)
Tono: celebratorio pero riguroso."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
