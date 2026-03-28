---
id: "18"

segmento: "personas-servicios"
journey: "governance"
proceso: "gobernar-ecosistema"
sop: "sop-18-gobernanza"
ritual-slug: "18-autorizar-facilitador-certificado"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Consultant Lead"
frecuencia: "por-evento + anual (re-certificación)"

herramientas:

- "CRM"
- "Zoom"
- "Google Forms"
- "Google Docs"
entry-criteria:

- "Facilitador aspirante identificado (interno o externo)"
- "Portfolio de programas requiere más capacidad"
exit-criteria:

- "Facilitador evaluado en 3 dimensiones"
- "Certificación: Authorized / Developing / Not Ready"
- "Si Authorized: puede facilitar bajo marca MetodologIA"

kpi: "Facilitator Quality Score (Target: ≥85/100 promedio)"
leading-indicators:

- "NPS de clientes atendidos por facilitadores certificados"
- "Outcome achievement rate vs facilitador principal"
riesgos-controles:

- riesgo: "Facilitador diluye la calidad del servicio"

control: "Certificación de 3 dimensiones + shadow obligatorio + auditoría trimestral"

- riesgo: "Facilitar sin certificación (operar antes de autorizar)"

control: "BLOQUEADOR: No hay sesiones asignadas sin certificación vigente"

- riesgo: "Re-certificación vencida"

control: "Alerta 30 días antes de vencimiento"
evidencias:

- "Certification scores (3 dimensiones)"
- "Shadow evaluation"
- "Facilitator_Status en CRM"
---

# Ritual: Autorizar Facilitador Certificado — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** Asegurar que todo facilitador que opere bajo la marca MetodologIA en servicios consultivos cumpla estándares de calidad verificables.
> **3 dimensiones (análogas a embajadores R11):**
>
> 1. **Conocimiento metodológico** (quiz, ≥80%)
> 2. **Competencia facilitadora** (role-play, ≥80%)
> 3. **Manejo de relación consultiva** (caso de estudio con 3 escenarios, ≥80%)

---

## 5. Ejecutar — Parte 1: Evaluación

### 5.1 — Verificar pre-requisitos

**Acción:** ¿El aspirante tiene experiencia de facilitación? ¿Ha observado ≥3 sesiones de un facilitador senior? ¿Conoce la metodología?

**Output:** Pre-requisites: Met / Not Met.
**Evidencia:** CRM.

### 5.2 — Dimensión 1: Conocimiento (quiz)

**Acción:** Quiz de 20 preguntas sobre metodología, frameworks, y protocolos. Proctored, 40 min.

**Output:** Knowledge_Score: [X]%.
**Evidencia:** CRM.

### 5.3 — Dimensión 2: Facilitación (role-play)

**Acción:** Role-play de 30 min facilitando un módulo al evaluador.

**Rubric:** Claridad, escucha, adaptabilidad, presencia, alineación metodológica (10 criterios, 1-5 cada uno).
**Output:** Facilitation_Score: [X]/50.

**Evidencia:** Rubric.

### 5.4 — Dimensión 3: Relación Consultiva (caso de estudio)

**Acción:** 3 escenarios escritos que evalúan: (1) manejo de cliente difícil, (2) boundary setting (alcance vs promesa), (3) ética profesional.

**Escenario 1:** "Un cliente te pide que canceles la sesión de hoy y la uses para hablar de un problema personal que no está en el alcance del programa. ¿Cómo manejas?"
**Escenario 2:** "Un cliente dice que tu programa no funciona y quiere un reembolso a mitad del programa. ¿Qué haces?"

**Escenario 3:** "Un colega facilitador te pide que compartas tus notas de sesión de un cliente porque quiere 'aprender'. ¿Procedes?"
**Output:** Ethics_Score: [X]/30.

**Evidencia:** Doc.

### 5.5 — Consolidar y decidir

**Acción:** Las 3 dimensiones se aprueban independientemente (≥80% cada una).

**Output:** Certification: Authorized / Developing / Not Ready.
**Evidencia:** CRM — Facilitator_Status.

### 5.6 — Si Authorized: shadow obligatorio (primer caso real)

**Acción:** El facilitador ejecuta su primer caso con un senior observando (análogo a R12 de embajadores).

**Output:** Shadow evaluation.
**Evidencia:** Rubric de observación.

### 5.7-5.10 — [Si Authorized: notificar al equipo, asignar sesiones, emitir certificado, programar re-certificación anual. Si Developing: plan de 30 días. Si Not Ready: feedback honesto + ruta de preparación. Si re-certificación vencida: suspender asignaciones.]

---

## 6-10. [Gobernanza continua, auditoría, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `SEGMENTO COMPLETO — personas-servicios v4.1 terminado`
- **BLOCKERS:** `Facilitator quality monitoring requires quarterly NPS comparison.`

---

## Modal 10x: El "Facilitator Certification Builder" (Prompt Pro)

```markdown
PROMPT:
"Genera un assessment de certificación para facilitador consultivo MetodologIA.
Dominio: [módulos/programas].
Produce:
1. Quiz de 20 preguntas (mixto) sobre metodología + protocolos consultivos
2. Escenario de role-play (situación, personaje del evaluador, 10 criterios)
3. 3 escenarios éticos contextualizados (cliente difícil, boundary setting, confidencialidad)
Cada item con respuesta ideal documentada.
Nivel: profesional — no trivial."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
