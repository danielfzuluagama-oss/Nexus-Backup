---
id: "03"

segmento: "personas-servicios"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "03-enriquecer-perfil-consultivo"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "AI Agent"
frecuencia: "por-evento (lead Qualified, pre-sesión discovery)"
herramientas:

- "CRM"
- "LinkedIn"
- "Perplexity / NotebookLM"
- "Google Docs"
entry-criteria:

- "Lead con 4D Fit Score ≥ 70 (Ritual 02)"
- "Sesión discovery agendada (Ritual 04)"
exit-criteria:

- "Dossier de 1 página listo"
- "3 hipótesis de dolor formuladas"
- "Guía de preguntas personalizadas lista"
- "Dossier disponible ≥4h antes de la sesión"
kpi: "Dossier Completion Rate (Target: 100% de leads Qualified tienen dossier)"
leading-indicators:

- "Calidad del dossier (# de hipótesis validadas en discovery)"
- "Tiempo de preparación (<30 min por dossier)"
riesgos-controles:

- riesgo: "Llegar a discovery sin preparación"

control: "Dossier obligatorio ≥4h antes de la sesión — si no hay dossier, no hay sesión"

- riesgo: "Confirmar bias con la investigación"

control: "3 hipótesis incluyen 1 probable, 1 alternativa, 1 wildcard"

- riesgo: "Investigación invasiva que incomode al lead"

control: "Solo información pública: LinkedIn, publicaciones, empresa"
evidencias:

- "Dossier de 1 página en CRM"
- "3 hipótesis documentadas"
- "Guía de preguntas lista"
---

# Ritual: Enriquecer Perfil Consultivo — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** Pre-sesión enrichment con IA. Construir un dossier de 1 página con 3 hipótesis de dolor y una guía de preguntas personalizadas. El consultor llega a la sesión sabiendo, no pescando.
> **SLA:** Dossier listo ≥4h antes de la sesión.

---

## 5. Ejecutar — Parte 1: Investigación y Dossier

### 5.1 — Investigar perfil público (LinkedIn deep dive)

**Contexto:** LinkedIn es la fuente principal para servicios consultivos. Revisar: trayectoria, cambios recientes, publicaciones, endorsements, conexiones.

**Acción:** Dedicar 10 min a revisar el perfil completo.
**Output:** Notas de perfil.

**Evidencia:** Doc.

### 5.2 — Investigar empresa/contexto (Perplexity)

**Contexto:** ¿La empresa del lead está creciendo, pivoteando, o en crisis? Esto contextualiza el dolor.

**Prompt de IA:**

```markdown

PROMPT:
"Investiga el contexto profesional de [nombre] en [empresa]:
1. ¿Qué hace la empresa y cuál es su momento actual? (crecimiento, reestructuración, expansión)
2. ¿Cuál es el rol de [nombre] y cuánto tiempo lleva?
3. ¿Hay noticias recientes de la empresa relevantes?
4. ¿Qué retos típicos tiene alguien en ese rol en esa industria?
Formato: 4 bullet points con datos verificables. Fuentes citadas."
```

**Output:** Contexto empresarial.

**Evidencia:** Texto guardado.

### 5.3 — Formular Hipótesis 1: La más probable

**Contexto:** Basándose en el mensaje original + perfil + contexto, ¿cuál es el dolor más probable?

**Acción:** "Dado que [evidencia], mi hipótesis es que [nombre] está experimentando [dolor] porque [causa]."
**Output:** Hipótesis 1: Más Probable.

**Evidencia:** Dossier.

### 5.4 — Formular Hipótesis 2: La alternativa

**Contexto:** Si la Hipótesis 1 es incorrecta, ¿cuál sería la alternativa? Esto evita tunnel vision.

**Acción:** "Alternativamente, podría ser que el dolor real no es [H1] sino [H2], porque [razonamiento]."
**Output:** Hipótesis 2: Alternativa.

**Evidencia:** Dossier.

### 5.5 — Formular Hipótesis 3: La wildcard

**Contexto:** El wildcard es la hipótesis contraintuitiva — lo que no es obvio pero que, si es cierto, cambia todo el approach.

**Acción:** "¿Y si el dolor real es [algo no mencionado]? Señales que podrían indicarlo: [evidencia]."
**Output:** Hipótesis 3: Wildcard.

**Evidencia:** Dossier.

### 5.6 — Diseñar guía de preguntas personalizadas (8-10 preguntas)

**Contexto:** Las preguntas deben validar las 3 hipótesis + abrir espacio para lo no anticipado.

**Acción:** Diseñar:

- 2-3 preguntas para validar H1
- 2 preguntas para validar H2
- 1 pregunta para explorar H3
- 2-3 preguntas abiertas ("¿qué más debería saber?")

**Prompt de IA:**

```markdown

PROMPT:
"Genera 8 preguntas para una sesión de discovery consultivo con [nombre].
Contexto: [cargo, empresa, dolor percibido].
Hipótesis 1 (más probable): [X]
Hipótesis 2 (alternativa): [X]
Hipótesis 3 (wildcard): [X]
Las preguntas deben:

- Validar cada hipótesis sin revelarla
- Ser abiertas, no cerradas
- Empezar con 'how' y 'what', no con 'do you'
- Incluir 2 preguntas de impacto (¿qué pasa si no se resuelve?)
Tono: curiosidad genuina, no interrogatorio."
```

**Output:** Guía de 8-10 preguntas.

**Evidencia:** Dossier.

### 5.7 — Compilar dossier de 1 página

**Acción:** Compilar: (1) Perfil del lead, (2) Contexto empresarial, (3) 3 hipótesis, (4) Guía de preguntas, (5) Notas de precaución.

**Output:** Dossier de 1 página.
**Evidencia:** Google Doc.

### 5.8 — Verificar disponibilidad del dossier ≥4h antes

**Acción:** ¿El dossier está listo ≥4h antes de la sesión? Si no: priorizar.

**Output:** Timeline check.
**Evidencia:** Timestamp.

### 5.9 — Enviar dossier al consultor si no es el mismo

**Acción:** Si el consultor que ejecuta Ritual 04 no es quien preparó el dossier: compartir con briefing de 5 min.

**Output:** Consultor briefed.
**Evidencia:** Mensaje.

### 5.10 — Preparar CRM para la sesión

**Acción:** Verificar que el registro del lead tiene: Fit Score, canal, señal original, dossier vinculado, sesión agendada.

**Output:** CRM listo.
**Evidencia:** CRM.

---

## 6-10. [Estándar v4.1: follow-up del dossier, análisis post-discovery de accuracy de hipótesis, retroalimentación, QA, Outputs, Cierre]

### Cierre

- **NEXT:** `personas-servicios → 04 → ejecutar-sesion-discovery`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Pre-Discovery Dossier Engine" (Prompt Pro)

```markdown
PROMPT:
"Genera un dossier pre-discovery de 1 página para una sesión consultiva.
Lead: [nombre], Cargo: [X], Empresa: [X], Dolor percibido: [X].
Incluye:
1. Perfil ejecutivo (3 líneas)
2. Contexto empresarial (3 líneas)
3. Hipótesis 1: más probable + evidencia
4. Hipótesis 2: alternativa + evidencia
5. Hipótesis 3: wildcard + señales
6. 8 preguntas personalizadas (abiertas, no cerradas)
7. Notas de precaución (qué evitar en la conversación)
Formato: 1 página, secciones claras. Tono: analítico, preparatorio."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
