---
id: "11"

segmento: "embajadores"
journey: "success"
proceso: "gestionar-exito"
sop: "sop-11-success"
ritual-slug: "11-certificar-competencia"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-evento (inicial) + anual (re-certificación)"

herramientas:

- "CRM"
- "Zoom"
- "Google Forms"
- "Google Docs"
entry-criteria:

- "IP kit transferido (Ritual 10)"
- "Pre-work de certificación completado"
- "≥30 días desde onboarding"

exit-criteria:

- "3 dimensiones evaluadas independientemente"
- "Resultado: Certified / Remediation / Not Certified"
- "Si Certified: habilitado para Shadow (Ritual 12)"

kpi: "First-Attempt Certification Rate (Target: ≥70%)"
leading-indicators:

- "Pre-work completion rate"
- "Score promedio por dimensión"
riesgos-controles:

- riesgo: "Certificar por cortesía (no por competencia)"

control: "Rubric objetiva estandarizada — no subjetiva"

- riesgo: "Re-attempt sin preparación"

control: "30 días mínimo entre intentos + plan de remediación específico"

- riesgo: "Assessment desactualizado (no refleja la metodología actual)"

control: "Revisión semestral del banco de preguntas y escenarios"
evidencias:

- "Certification scores (3 dimensiones)"
- "Certification_Status en CRM"
- "Rubric completada"
- "Certificado digital emitido (si aprueba)"
---

# Ritual: Certificar Competencia — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **3 dimensiones de certificación — independientes:**
>
> 1. **Conocimiento** (quiz escrito, 20 preguntas, ≥80% para aprobar)
> 2. **Competencia facilitadora** (role-play en vivo, rubric de 10 criterios, ≥80%)
> 3. **Alineación ética** (caso de estudio con 3 dilemas, ≥80%)
>
> **Las 3 se aprueban independientemente.** Puedes aprobar 2 y reprobar 1 — solo repites la que falta.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Pre-work completado + ≥30 días desde onboarding.
- **Pre-ritual:** ¿El pre-work fue completado? ¿El quiz está actualizado? ¿Los escenarios de role-play están preparados?
- **Contexto:** La certificación es la última gate antes de la operación. Un embajador mediocre con certificación degrada la marca de toda la red. La certificación debe ser rigurosa pero justa: objetiva, repetible, y con camino de remediación.

---

## 5. Ejecutar — Parte 1: Dimensión 1 — Conocimiento (Quiz)

### 5.1 — Verificar pre-work completado

**Contexto:** Si el pre-work no fue completado, el quiz es prematuro y frustrante para ambas partes.

**Acción:** Verificar con el embajador y en CRM que todo el material fue estudiado.
**Output:** Pre-work confirmed / Not complete (→ re-agendar).

**Evidencia:** CRM.

### 5.2 — Ejecutar quiz escrito (20 preguntas, 40 min, proctored)

**Contexto:** El quiz evalúa comprensión conceptual de la metodología: principios, frameworks, vocabulario, procesos.

**Acción:** Administrar quiz en Google Forms con timer de 40 min. Proctored = evaluador presente en Zoom.
**Script al inicio:** "Este quiz tiene 20 preguntas, tienes 40 minutos. No es trampa — es para asegurar que la base conceptual está sólida. Si no apruebas hoy, tienes otra oportunidad en 30 días. ¿Listo?"

**Output:** Quiz completado.
**Evidencia:** Google Forms — respuestas.

### 5.3 — Calificar quiz automáticamente

**Acción:** Google Forms auto-califica. Resultado: % correcto.

**Output:** Knowledge_Score: [X]%.
**Evidencia:** CRM — campo Knowledge_Score.

### 5.4 — Si ≥80%: Dimensión 1 APROBADA

**Script:** "¡Aprobaste con [X]%! Tu conocimiento conceptual está sólido. Pasamos a la evaluación práctica."

**Output:** D1 = Pass.
**Evidencia:** CRM.

### 5.5 — Si <80%: identificar gaps y registrar

**Acción:** Revisar qué preguntas falló. ¿Hay patrón? ¿Son temas conceptuales o terminología?

**Script:** "Tu score fue [X]%. Las áreas donde necesitas reforzar son: [temas]. Te preparo un plan de estudio focalizado."
**Output:** Gaps identificados + plan de remediación.

**Evidencia:** CRM.

---

## 6. Ejecutar — Parte 2: Dimensión 2 — Competencia Facilitadora (Role-Play)

### 6.1 — Ejecutar role-play (45 min)

**Contexto:** El embajador facilita una sesión completa ante un evaluador que actúa como participante/cliente. Se evalúa con rubric de 10 criterios.

**Acción:** El evaluador (Consultant Lead) asume el rol de participante y evalúa en silencio con rubric.
**Script al inicio:** "Ahora vamos a la práctica. Quiero que facilites una sesión de [módulo] como si yo fuera un participante real. Tienes 30 minutos. Yo te voy a hacer preguntas reales y a veces difíciles — trata de manejarlas como lo harías con un cliente."

**Output:** Session facilitada.
**Evidencia:** Rubric.

### 6.2 — Calificar con rubric de 10 criterios

**Acción:** Evaluar:

1. Apertura y enganche
2. Claridad de explicación
3. Uso de materiales (slides, templates)
4. Manejo de preguntas
5. Escucha activa
6. Adaptabilidad a la audiencia
7. Gestión del tiempo
8. Presencia y confianza
9. Alineación con la metodología
10. Cierre y call-to-action

Score por criterio: 1-5. Total: /50. ≥40/50 (80%) = Pass.
**Output:** Competence_Score: [X]/50.

**Evidencia:** Rubric completada.

### 6.3 — Feedback inmediato (10 min)

**Script:** "Excelente esfuerzo. Tus fortalezas fueron [X, Y]. Tu principal área de mejora es [Z]. Mi recomendación específica: [acción concreta]."

**Output:** Feedback entregado.
**Evidencia:** Notas.

### 6.4-6.5 — [Si ≥80%: D2 = Pass → avanzar a D3. Si <80%: plan de desarrollo de 30 días + segundo intento]

---

## 7. Ejecutar — Parte 3: Dimensión 3 — Alineación Ética (Caso de Estudio)

### 7.1 — Presentar caso ético (3 escenarios, 20 min escrito)

**Contexto:** Los dilemas éticos revelan cómo pensará el embajador cuando nadie lo observa. Es el test más importante para la protección de la marca.

**Acción:** Presentar 3 escenarios escritos. El embajador responde por escrito en 20 min.

**Escenario 1 — IP Leak:**
"Un cliente satisfecho te pide los templates originales de MetodologIA para replicar el programa internamente en su empresa. Es un cliente VIP que genera el 40% de tu revenue. ¿Qué haces y por qué?"

**Escenario 2 — Scope Creep:**
"Un conocido te ofrece un proyecto lucrativo que está fuera de tu dominio autorizado. Necesita que lo ejecutes la próxima semana. No hay tiempo para pedir autorización. ¿Cómo procedes?"

**Escenario 3 — Quality vs Revenue:**
"Estás a fin de mes con los números apretados. Un lead nuevo quiere empezar mañana pero no encaja en tu perfil de cliente ideal. ¿Lo aceptas?"

**Output:** Respuestas escritas.

**Evidencia:** Documento.

### 7.2 — Calificar respuestas éticas

**Acción:** Evaluar con rubric: ¿protege la IP? ¿respeta el alcance de su licencia? ¿prioriza calidad sobre revenue? Score: /30. ≥24 (80%) = Pass.

**Output:** Ethics_Score: [X]/30.
**Evidencia:** Rubric.

### 7.3-7.5 — [Si ≥80%: D3 = Pass. Si <80%: conversación profunda sobre alineación + re-evaluación en 30 días]

---

## 8. Consolidación y Decisión Final

### 8.1 — Consolidar 3 scores

**Acción:** D1 Knowledge + D2 Competence + D3 Ethics. Las 3 deben ser ≥80% para Certified.

**Output:** Certification_Status: Certified / Partial (indicar qué falta) / Not Certified.
**Evidencia:** CRM.

### 8.2 — Si las 3 ≥80%: CERTIFIED 🎉

**Script:** "¡[nombre], felicitaciones! Estás certificado como Embajador MetodologIA. Tu certificado digital estará en tu email en 24h. El siguiente paso es tu primer caso real bajo supervisión."

**Acción:** Emitir certificado digital, actualizar CRM, notificar a la red.
**Output:** Certificado emitido + red notificada.

**Evidencia:** CRM — Certification_Status = Certified.

### 8.3 — Programar re-certificación anual

**Acción:** Crear tarea en CRM: re-certificación en 12 meses.

**Output:** Tarea creada.
**Evidencia:** CRM.

---

## 9-10. [Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 12 → supervisar-primer-caso-real`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Certification Assessment Builder" (Prompt Pro)

```markdown
PROMPT:
"Genera un assessment de certificación para embajador MetodologIA en el dominio [módulos].
Produce:
1. Quiz de 20 preguntas (mixto: multiple choice + respuesta corta) sobre [módulos]
2. Escenario de role-play (situación, personaje del evaluador, criterios de evaluación)
3. 3 dilemas éticos contextualizados al dominio del embajador
Cada pregunta/escenario debe tener una respuesta ideal documentada.
Nivel: profesional — no trivial."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
