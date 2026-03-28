---
id: "04"

segmento: "personas-masivo"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "04-ejecutar-diagnostico-digital"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Content Lead"
frecuencia: "asincrónica automática (trigger post-R03/R05)"
herramientas:

- "CRM Marketing Automation"
- "Typeform / Tally / Google Forms"
- "Zapier / Make / n8n"

entry-criteria:

- "Perfil enriquecido (Ritual 03) con Asset asignado tipo 'Assessment'"
- "AI Profile Score ≥ Medium"
exit-criteria:

- "Invitación al diagnóstico digital enviada e interactuada"
- "Auto-evaluación completada en ≤5 minutos"
- "Diagnosis Score calculado automáticamente por dimensión"
- "Reporte de resultados hiper-personalizado (3 insights) entregado en <60s"
kpi: "Diagnostic Completion Rate (Target: ≥40% de leads invitados lo completan)"
leading-indicators:

- "Open Rate y Click-Through Rate del correo de invitación"
- "Drop-off rate dentro del cuestionario (en qué pregunta abandonan)"
- "Time-to-complete (Promedio < 5 min)"

riesgos-controles:

- riesgo: "Diagnóstico demasiado largo o complejo (abandono masivo)"

  control: "Hard limit: Máximo 12 preguntas de fricción cero (selección múltiple/likert)"

- riesgo: "Resultado genérico o aburrido que no aporta valor al usuario"

  control: "La automatización de IA genera 3 insights específicos y contrarian basados en los cruces de sus respuestas"

- riesgo: "Fallo en la entrega del resultado promueve desconfianza"

  control: "SLA estricto de webhook: Resultado en bandeja de entrada en <60 segundos"
evidencias:

- "Respuestas raw almacenadas en CRM form data"
- "Diagnosis Dashboard actualizado"
- "Copia del Diagnostic Report personalizado entregado al usuario"
---

# Ritual: Ejecutar Diagnóstico Digital — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** Un diagnóstico digital masivo no es una "encuesta". Es un producto de valor en sí mismo. Debe servir dos propósitos simultáneamente:
>
> 1) Para el usuario: Una radiografía clara de sus brechas ("ah, por esto no avanzo").
> 2) Para MetodologIA: Calificación profunda de su dolor ("este lead necesita el Curso X, no la Membresía Y").
> **REGLA MATEMÁTICA:** ≤12 preguntas. ≤5 minutos reales. Resultado instantáneo.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Cuando el enriquecimiento (R03) determina que el mejor asset para el lead es ganar claridad sobre su dolor mediante un assessment.
- **Pre-ritual:** ¿El diagnóstico pertinente al Life Event del lead está publicado y los webhooks están verdes?
- **Contexto:** En el mundo masivo (B2C/Prosumers), la gente no paga consultorías para descubrir sus problemas, pero aman los tests y radiografías. El diagnóstico digital gamifica el 'discovery'. Le das un diagnóstico gratuito y preciso, y el lead, a cambio, te cuenta exactamente cuáles son sus puntos débiles calificados, listo para recibir tu propuesta comercial de solución (R06).

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Ejecutar una auto-evaluación autogestionada que cualifique la severidad del dolor del lead mientras le entrega un mapa de acción inmediato.
- **Definición de Éxito (DoD):**
  - [ ] Correo de invitación (icebreaker) enviado con éxito
  - [ ] Diagnóstico iniciado y finalizado sin rebote
  - [ ] Webhook capturó `Diagnosis_Score` y dimensiones
  - [ ] Reporte personalizado IA generado y enviado en <60s
  - [ ] Lead taggeado en CRM con su dolor principal
- **Definición de Éxito del Lead:** "Invertí 4 minutos de mi tiempo y ahora entiendo matemáticamente por qué mi estrategia estaba fallando."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Tasa de conversión (envíos vs respuestas completas) |
| **Responsible** | Content Lead | Diseño y redacción de las preguntas (cero fricción) |

| **Consulted** | AI Dev / Ops | Mantiene el webhook de respuesta AI en <60s |
| **Informed** | Sales | Visualiza el mapa de dolores consolidado |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Formulario digital operativo (Tally/Typeform) y mobile-optimized
- [ ] Lógica de scoring configurada (escalas de 1-5, pesos por dimensión)
- [ ] Icebreaker del lead enriquecido (generado en R03)
- [ ] Zapier/Logic app validada enviando un test en <60s

---

## 5. Ejecutar — Parte 1: Inyección y Experiencia del Lead

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Enviar invitación "Zero-Pressure" (Outreach)

**Acción:** Disparar email/DM usando el icebreaker de R03.

**Script Base:** "[nombre], vi que pasaste recientemente a [rol/Life Event]. En mi experiencia, los primeros 90 días ahí dictan tu éxito. Armé una herramienta gratuita de 5 mins que diagnostica exactamente dónde tienes fricción estructural en [Área]. Lo completas y te devuelve un reporte a medida:"
**Output:** Invitación entregada.

**Evidencia:** CRM tracking.

### 5.2 — Fricción Cero: Landing & Pregunta 1

**Contexto:** El drop-off ocurre en los primeros 15 segundos.

**Acción:** La primera pregunta debe ser absurdamente fácil y no intrusiva (ej. "En una palabra, ¿cómo describirías el estado actual de los procesos de tu equipo?"). Pantalla limpia, progreso visual (1/12).
**Output:** Auto-evaluación iniciada.

**Evidencia:** Form Analytics.

### 5.3 — Lead completa el Core Assessment (Dimensions)

**Contexto:** Son 3-4 dimensiones clave agrupadas.

**Acción:** Lead responde mix de opciones (Likert, Si/No). Cada respuesta mapeada con pesos para el cálculo backend.
**Output:** Dataset de respuestas completado (Submit).

**Evidencia:** Base de datos.

### 5.4 — Procesar webhook y calcular score primario

**Acción:** El sistema captura el payload casi en tiempo real. Asigna puntos a cada dimensión (ej. Tools: 8/10, Rituals: 3/10, Strategy: 5/10).

**Output:** `Diagnosis_Score_Global`.
**Evidencia:** Log de automatización.

### 5.5 — Generar insights cruzados con IA (Personalización Hard)

**Acción:** Payload pasa a LLM con prompt de análisis.

**Regla:** El prompt cruza la "Dimensión más fuerte" y la "Dimensión más débil".
**Output:** 3 párrafos de resultado.

**Evidencia:** LLM response log.

### 5.6 — Entregar el Diagnosis Report (Instant Gratification)

**Acción:** Enviar email automático dinámico (o mostrar en pantalla final).

**Template Estructural:**

- SCORE GLOBAL: [XX/100]
- TU SÚPER PODER HOY: [Dimensión Fuerte] ("Tienes esto cubierto.")
- EL CUELLO DE BOTELLA: [Dimensión Débil] ("Si arreglas esto, desatas el potencial.")
- INSIGHT EXPERTO: [Dato del LLM sobre qué hacer al respecto.]
**Output:** Valor entregado.

**Evidencia:** CRM Email dispatch.

### 5.7 — Presentar el Soft-Pitch / Puente Comercial (Upsell encubierto)

**Acción:** En el mismo reporte (al final), conectar el "Cuello de Botella" con una oferta específica.

**Script:** "Viendo que tu fricción principal está en [Dimensión Débil], diseñé [Producto/Curso/Asset] para resolver exactamente eso de manera modular. Échale un ojo acá."
**Output:** Tráfico dirigido a R06 o R05.

**Evidencia:** CTR de la página de resultados.

### 5.8 — Taggear Lead según Resultado (Dolor calificado)

**Acción:** CRM tag automáticos. Ej: Si sacó bajo en "Herramientas", tag=`Pain_TechStack`. Si sacó bajo en "Gobernanza", tag=`Pain_Process`.

**Output:** Segmentación profunda en base lista.
**Evidencia:** CRM Tags.

### 5.9 — Manejo de Abandono (Cart Recovery)

**Acción:** Si lead abrió email (5.1) pero no clickeó, o clickeó pero no terminó (drop-off).

**Script (a +48h):** "A veces el día se nos va encima. La herramienta de diagnóstico de [Tema] sigue abierta y he visto que a gente en [Industria] le está ahorrando 2h semanales al detectar sus puntos ciegos. Link aquí."
**Output:** Recovery activado.

### 5.10 — Consolidar el Dashboard de Diagnósticos

**Acción:** Registrar completions totales del día vs envíos.

**Output:** Métricas del funnel de discovery.
**Evidencia:** Dashboard.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo y Ajuste

### 6.1-6.5 — Analizar Drop-off por pregunta (¿La pregunta 7 hace que todos se vayan? Reescribirla)

### 6.6-6.10 — Analizar "Distribución de Dolores" (Si el 80% saca mal score en un área, enfocar el marketing ahí)

### 7.1-7.5 — Refinar prompt de IA si los insights se sienten "demasiado robóticos" o chatBot

### 7.6-7.10 — Revisar CTR del Soft-Pitch, limpiar pipeline, documentar iteración del form

---

## 8. Validación y Calidad (QA)

- [ ] Límite mantenido: No más de 12 preguntas por test
- [ ] Flow testeado: El reporte llega consistentemente en menos de 60 segundos
- [ ] Fallback activo: Si la API de IA cae, se envía un reporte pre-redactado estándar en vez de "error"
- [ ] No existe "Dead End": El reporte de resultados tiene un Call to Action claro (hacia R05 o R06)

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Diagnóstico completo | JSON / Webhook | CRM/Typeform | Automation Ops |
| Personalized Report | HTML Email | Bandeja Lead | AI Agent |
| Segmentación (Pain Tags) | Metadatos CRM | Lead Profile | CRM System |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [05-entregar-try-and-buy](../demostrar-valor/sop-05-try-and-buy/05-entregar-try-and-buy-ritual.md) (si la ruta decidida era valor antes de pitch) o [06-presentar-oferta-digital](../../proposal/estructurar-oferta/sop-06-propuesta/06-presentar-oferta-digital-ritual.md) (si el puente comercial generó intención directa).
- **Condición de handoff:** Diagnóstico validó la necesidad específica del cliente, el cliente obtuvo un mini-win instantáneo (insight) y ahora tenemos un "gancho" semántico para nuestra oferta ("Como vimos en tu reporte, tu equipo sufre en...").

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Completion Rate | ≥40% de invitados | 🟡 |
| Soft-Pitch CTR | ≥15% de completados | 🟡 |

- **NEXT:** `personas-masivo → 05 → entregar-try-and-buy`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Digital Diagnostic Designer" (Prompt Pro)

**Use case:** Estás armando un nuevo assessment desde cero para una cohorte específica y necesitas el armazón lógico completo y las de lógica algorítmica.

```markdown
PROMPT:
"Actúa como Product Marketing Manager y Diagnostic Designer B2C.
Voy a lanzar un assessment de 5 minutos sobre [Tema, ej: 'Madurez del liderazgo junior'].
Diseña la estructura completa:
1. Las 3 Dimensiones a evaluar (Ej: Self-Management, People Ops, Strategy).
2. Para cada dimensión, dame 4 preguntas de escala de dolor (Likert 1-5).
   REGLA: Deben ser preguntas específicas sobre comportamientos, no vaguedades. (Ej. 'Tardo más de 1h en preparar un 1:1' en lugar de '¿Soy buen líder?').
3. Define la lógica de scoring (0-60 max score general).
4. Redacta el COPY de los 3 Resultados Genéricos base (High Performant / Average / At Risk) que luego mi IA usará como ancla para hiper-personalizar.
5. Danos la frase "Icebreaker" recomendada para invitar a la gente a hacerlo."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
