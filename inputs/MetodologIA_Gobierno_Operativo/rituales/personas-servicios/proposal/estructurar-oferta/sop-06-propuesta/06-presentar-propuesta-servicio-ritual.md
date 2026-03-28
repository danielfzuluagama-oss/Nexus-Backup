---
id: "06"

segmento: "personas-servicios"
journey: "proposal"
proceso: "estructurar-oferta"
sop: "sop-06-propuesta"
ritual-slug: "06-presentar-propuesta-servicio"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-evento (post Try & Buy con decisión positiva)"
herramientas:

- "CRM"
- "Google Docs"
- "Canva / Google Slides"
- "Zoom"
entry-criteria:

- "Try & Buy completada con decisión positiva (Ritual 05)"
- "Dolor validado + impacto cuantificado + verbatims capturados"
exit-criteria:

- "Propuesta 'espejo' presentada en sesión de 30 min"
- "Lead entiende: qué obtiene, cuánto tiempo, cuánto cuesta, cómo se mide"
- "5 días de reflexión iniciados"

kpi: "Proposal Acceptance Rate (Target: ≥50%)"
riesgos-controles:

- riesgo: "Propuesta genérica que no refleja el dolor del individuo"

control: "Propuesta 'espejo': usa las palabras del lead, no las del consultor"

- riesgo: "Precio presentado sin contexto de valor"

control: "SIEMPRE presentar precio DESPUÉS de demostrar el ROI del dolor"

- riesgo: "Lead siente que es una venta, no una solución"

control: "La propuesta empieza con 'tu dolor' y termina con 'tu resultado'"
evidencias:

- "Propuesta personalizada"
- "Sesión de 30 min ejecutada"
- "Q&A log"
---

# Ritual: Presentar Propuesta de Servicio — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **REGLA: La propuesta es un ESPEJO.** Empieza con las palabras exactas del lead (verbatims capturados en Discovery y Try & Buy). Si el lead no se reconoce en la propuesta, fracasó.
> **Estructura de la propuesta:**
>
> 1. Tu situación (en tus palabras)
> 2. El impacto que tiene (cuantificado en tu mundo)
> 3. Lo que propongo
> 4. Cómo se mide el éxito
> 5. La inversión
> 6. Siguiente paso

---

## 5. Ejecutar — Parte 1: Construir la Propuesta Espejo

### 5.1 — Extraer verbatims del discovery + try & buy

**Contexto:** La propuesta usa las PALABRAS del lead, no las del consultor. Si dijo "estoy atascado con mi equipo", la propuesta dice "tu situación: estás atascado con tu equipo", no "identificamos una brecha en la dinámica de equipo".

**Acción:** Extraer ≥5 verbatims del CRM.
**Output:** Verbatims listos.

**Evidencia:** Doc.

### 5.2 — Escribir sección 1: Tu Situación

**Script de la propuesta:** "Cuando hablamos, me dijiste: '[verbatim 1]'. También mencionaste que '[verbatim 2]'. Esto me mostró que [síntesis del dolor en sus términos]."

**Output:** Sección escrita.
**Evidencia:** Propuesta draft.

### 5.3 — Escribir sección 2: El Impacto

**Script:** "Hoy esto te cuesta: [horas/semana], [impacto en energía], y [costo de oportunidad]. Si esto sigue 6 meses más: [escenario]."

**Output:** Impacto cuantificado.
**Evidencia:** Propuesta draft.

### 5.4 — Escribir sección 3: Lo que Propongo

**Acción:** Describir el programa/servicio adaptado al dolor validado. Incluir: estructura, duración, frecuencia, modalidad.

**Output:** Propuesta de servicio.
**Evidencia:** Propuesta draft.

### 5.5 — Escribir sección 4: Cómo se Mide el Éxito

**Script:** "Sabremos que esto funcionó cuando: (1) [métrica 1 — en sus términos], (2) [métrica 2], (3) [métrica 3]. Mediremos antes, durante, y después."

**Output:** Success metrics definidas.
**Evidencia:** Propuesta draft.

### 5.6 — Escribir sección 5: La Inversión

**Contexto:** El precio se presenta DESPUÉS del impacto. Si el impacto es de $X/año y la inversión es $Y, el ROI se ve inmediatamente.

**Script:** "La inversión para este programa es [precio]. Si consideramos que hoy esto te cuesta [impacto cuantificado], el retorno se produce en [timeframe]."
**Output:** Pricing con contexto de ROI.

**Evidencia:** Propuesta draft.

### 5.7 — Presentar en sesión de 30 min (NO enviar por email solo)

**Script al abrir:** "[nombre], hoy te presento mi propuesta. La construí basándome en lo que me contaste en nuestra sesión de discovery y en lo que viviste en la experiencia. Si algo no se siente correcto, dímelo — la propuesta es para ti, no para mí."

**Output:** Propuesta presentada.
**Evidencia:** Sesión ejecutada.

### 5.8-5.10 — [Q&A abierta, iniciar reflexión de 5 días, enviar propuesta por email post-sesión]

---

## 6-10. [Follow-up, negociación, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 07 → negociar-alcance-y-condiciones`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Mirror Proposal Builder" (Prompt Pro)

```markdown
PROMPT:
"Construye una propuesta consultiva 'espejo' para [nombre].
Verbatims (sus palabras exactas): [lista de 5 frases].
Dolor validado: [X]. Impacto cuantificado: [horas, energía, oportunidad, costo].
Micro-resultado del Try & Buy: [X].
Programa propuesto: [descripción del servicio].
Genera la propuesta en 6 secciones:
1. Tu Situación (usar verbatims textuales)
2. El Impacto (cuantificado en sus términos)
3. Lo que Propongo (estructura con beneficios)
4. Cómo Medimos el Éxito (3 métricas observables)
5. La Inversión (con contexto de ROI)
6. Siguiente Paso
Tono: empático, directo, cero jerga. Neo-Swiss."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
