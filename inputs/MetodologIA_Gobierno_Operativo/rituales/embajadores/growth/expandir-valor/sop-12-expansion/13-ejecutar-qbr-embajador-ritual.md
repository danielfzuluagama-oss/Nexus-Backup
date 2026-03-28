---
id: "13"

segmento: "embajadores"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "13-ejecutar-qbr-embajador"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Sales Director"
frecuencia: "trimestral"
herramientas:

- "CRM"
- "Google Slides"
- "Zoom"

entry-criteria:

- "Embajador operando independientemente (Ritual 12 Pass)"
- "≥90 días desde activación (o desde última QBR)"
exit-criteria:

- "QBR ejecutada (60 min bidireccional)"
- "Performance Score calculado"
- "Plan de acción Q+1 acordado"

kpi: "QBR Completion Rate (Target: 100% de embajadores activos)"
leading-indicators:

- "Performance Score promedio de la red"
- "% de embajadores con action plan Q+1 definido"
riesgos-controles:

- riesgo: "QBR se convierte en monólogo del evaluador"

control: "Estructura bidireccional: 50% review MetodologIA, 50% review del embajador"

- riesgo: "Embajador inactivo evita la QBR"

control: "QBR obligatoria como condición de renovación (Ritual 15)"

- riesgo: "Problemas no escalados a tiempo"

control: "QBR es el momento formal para escalar issues"
evidencias:

- "QBR deck"
- "Performance Score"
- "Action plan Q+1"
---

# Ritual: Ejecutar QBR de Embajador — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **La QBR es BIDIRECCIONAL:** No solo evaluamos al embajador — el embajador evalúa a MetodologIA. ¿Recibe el soporte que necesita? ¿La IP está al día? ¿El revenue share se cumple?
> **Performance Score = 5 componentes:** Clientes atendidos, NPS de sus clientes, revenue generado, compliance de estándares, contribución a la red.

---

## 5. Ejecutar — Parte 1: Preparación

### 5.1 — Compilar datos de performance del trimestre

**Contexto:** Los datos deben estar listos ANTES de la QBR — la sesión es para análisis y decisión, no para buscar números.

**Acción:** Extraer de CRM: clientes atendidos, revenue generado, NPS de sus clientes, incidents/complaints, contribuciones a la red.
**Output:** Dashboard de performance.

**Evidencia:** CRM query.

### 5.2 — Calcular Performance Score (5 componentes)

**Acción:** Score ponderado:

- Clientes atendidos vs target (20%)
- Revenue generado vs forecast (20%)
- NPS de sus clientes (20%)
- Compliance de estándares (20%)
- Contribución a la red — peer learning, referrals, content (20%)

**Output:** Performance_Score: [X]/100.

**Evidencia:** CRM.

### 5.3 — Preparar QBR deck (2 partes)

**Acción:** Crear presentación:

**Parte 1 — MetodologIA evalúa al embajador:** métricas, performance score, highlights, concerns.
**Parte 2 — Embajador evalúa a MetodologIA:** preguntas preparadas para el embajador.

**Output:** QBR deck listo.
**Evidencia:** Slides.

### 5.4 — Enviar pre-read al embajador (48h antes)

**Script:** "[nombre], tu QBR trimestral es el [fecha]. Te comparto un preview de tus métricas para que llegues preparado. También quiero que vengas con tu feedback: ¿qué necesitas de nosotros?"

**Output:** Pre-read enviado.
**Evidencia:** Email.

### 5.5-5.10 — [Agendar sesión de 60 min, preparar preguntas para parte bidireccional, revisar action plan Q anterior, identificar temas de expansión potencial, detectar señales de inactividad, check de compliance previo]

---

## 6. Ejecutar — Parte 2: Sesión QBR (60 min)

### 6.1 — Abrir con reconocimiento (5 min)

**Script:** "[nombre], antes de los números: quiero reconocer [logro específico del trimestre]. Tu impacto en [zona] es visible."

**Output:** Tono positivo establecido.
**Evidencia:** —

### 6.2 — Parte 1: Review de performance (20 min)

**Acción:** Recorrer métricas con el embajador. Sin sorpresas — ya vio el pre-read.

**Script:** "Tu Performance Score del trimestre es [X]/100. Tus fortalezas: [X]. Tu área de oportunidad: [Y]. ¿Coincide con tu percepción?"
**Output:** Performance discutida.

**Evidencia:** Notas.

### 6.3 — Parte 2: Feedback bidireccional (20 min)

**Script:** "Ahora es tu turno. ¿Qué funciona bien del soporte que recibes? ¿Qué falta? ¿Hay algo de MetodologIA que te dificulta operar? Sé honesto — este es el espacio."

**Output:** Feedback del embajador documentado.
**Evidencia:** Notas.

### 6.4 — Compliance check (5 min)

**Acción:** Verificar: ¿usa materiales correctos? ¿Respeta brand guidelines? ¿Hay issues pendientes?

**Output:** Compliance: OK / Warning.
**Evidencia:** Nota.

### 6.5 — Plan de acción Q+1 (10 min)

**Script:** "Para los próximos 3 meses, propongo: (1) Meta de clientes: [X], (2) Soporte que te damos: [Y], (3) Desarrollo: [Z]. ¿Qué ajustas?"

**Output:** Action plan Q+1 acordado.
**Evidencia:** Doc.

### 6.6-6.10 — [Detectar expansion potential (más módulos/territorio), detectar riesgo de inactividad, escalar issues si los hay, celebrar logros, registrar métricas]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 14 → expandir-capacidades` (si hay expansion potential)
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "QBR Deck Generator" (Prompt Pro)

```markdown
PROMPT:
"Genera un QBR deck para un embajador MetodologIA.
Datos: nombre: [X], zona: [X], clientes: [N], revenue: [$X], NPS promedio: [X], compliance: [OK/Warning].
Estructura:
Slide 1: Executive Summary (3 bullet con lo más importante)
Slide 2: Performance Score desglosado (5 componentes)
Slide 3: Highlights del trimestre
Slide 4: Áreas de mejora
Slide 5: Preguntas bidireccionales (para el embajador)
Slide 6: Plan Q+1 propuesto
Tono: ejecutivo, visual, sin filler."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
