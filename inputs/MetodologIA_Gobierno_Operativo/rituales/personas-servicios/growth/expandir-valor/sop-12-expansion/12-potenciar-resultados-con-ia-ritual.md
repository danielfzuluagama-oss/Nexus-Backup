---
id: "12"

segmento: "personas-servicios"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "12-potenciar-resultados-con-ia"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Content Lead"
frecuencia: "por-sesión (integración continua)"
herramientas:

- "CRM"
- "Perplexity / Claude / ChatGPT"
- "NotebookLM"
- "Zoom"
entry-criteria:

- "Cliente en programa activo (Ritual 10 en curso)"
- "Al menos 2 sesiones completadas"
exit-criteria:

- "Cliente usa ≥1 herramienta IA para potenciar los resultados del programa"
- "AI toolkit personalizado entregado"
- "Quick win con IA demostrado"

kpi: "AI Adoption Rate (Target: ≥60% de clientes adoptan ≥1 herramienta)"
riesgos-controles:

- riesgo: "IA como distracción, no como multiplicador"

control: "Solo integrar IA que acelere los success criteria definidos"

- riesgo: "Cliente intimidado por la IA"

control: "Demo en vivo: 'te muestro cómo lo uso yo primero'"

- riesgo: "Dependencia de IA sin comprensión"

control: "Enseñar el framework primero, luego la IA. La IA potencia, no sustituye."
evidencias:

- "AI toolkit personalizado"
- "Quick win con IA documentado"
- "AI Adoption log en CRM"
---

# Ritual: Potenciar Resultados con IA — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Principio:** La IA no es un tema separado — se integra DENTRO del programa para multiplicar resultados. Cada herramienta de IA que se introduce debe servir a un success criterion específico.
> **NO dar una lista de herramientas.** SÍ demostrar un uso con SU problema real.

---

## 5. Ejecutar — Parte 1: Diagnóstico de Oportunidad IA

### 5.1 — Identificar qué success criterion puede acelerarse con IA

**Contexto:** No toda tarea merece IA. Buscar las tareas repetitivas, intensivas en análisis, o que consumen tiempo desproporcionado.

**Acción:** Revisar los 3 success criteria. ¿Cuál tiene un bottleneck que la IA puede eliminar?
**Output:** Oportunidad IA identificada.

**Evidencia:** Nota.

### 5.2 — Seleccionar herramienta específica

**Acción:** Matchear: tipo de tarea → herramienta. Ej: análisis de texto → Claude. Research → Perplexity. Organización de conocimiento → NotebookLM.

**Output:** Herramienta seleccionada.
**Evidencia:** Nota.

### 5.3 — Crear prompt personalizado para SU caso

**Prompt de IA:**

```markdown

PROMPT:
"Crea un prompt de IA personalizado para un cliente consultivo.
Cliente: [nombre], Reto: [dolor], Success criterion: [X].
El prompt debe:
1. Ser copy-pasteable (listo para usar)
2. Resolver una tarea específica que el cliente repite semanalmente
3. Reducir el tiempo de esa tarea en ≥50%
4. Producir un output que el cliente pueda usar directamente
Formato: prompt listo + instrucción de uso en 3 pasos."

```

**Output:** Prompt personalizado.

**Evidencia:** Doc.

### 5.4 — Demo en vivo durante la sesión (10-15 min)

**Script:** "Mira: esta tarea que te toma [X horas/semana] se puede resolver así [demo en vivo con su data]. ¿Ves? El output es [resultado]. Puedes hacer esto cada [frecuencia]."

**Output:** Cliente experimenta el multiplicador.
**Evidencia:** Artefacto generado en vivo.

### 5.5-5.10 — [Entregar AI toolkit personalizado, asignar tarea IA inter-sesión, verificar adopción en siguiente sesión, iterar prompt, documentar quick wins, registrar AI Adoption en CRM]

---

## 6-10. [Seguimiento, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 13 → ejecutar-revision-trimestral`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "AI Integration Advisor" (Prompt Pro)

```markdown
PROMPT:
"Diseña un plan de integración de IA para un cliente de servicio consultivo.
Cliente: [nombre], Programa: [X], Success criteria: [lista].
Identifica:
1. Top 3 tareas del cliente que pueden acelerarse con IA
2. Para cada tarea: herramienta recomendada + prompt listo
3. Ahorro de tiempo estimado por semana
4. Plan de adopción de 3 pasos (demo → práctica guiada → uso independiente)
Formato: plan de 1 página. Tono: práctico, no evangélico."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
