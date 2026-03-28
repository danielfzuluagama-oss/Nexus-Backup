---
id: "12"

segmento: "personas-masivo"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "12-co-crear-con-genai"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Content Lead / AI Architect"
- backup: "Community Manager"
frecuencia: "asincrónica dinámica (disparada en hitos de implementación del curso)"
herramientas:

- "LMS / Plataforma"
- "GPT Custom Bots / Claude Projects"
- "Prompt Templates Repository"

entry-criteria:

- "Cliente activamente cursando módulos clave (Adoption Health > 50 en R11)"
- "El contexto del módulo exige redacción, análisis de data o creación de planes complejos"
exit-criteria:

- "Prompt Pack Entregado en el módulo correspondiente"
- "Cliente ejecutó el prompt y obtuvo un resultado hyper-personalizado"
- "Resultado/Output compartido en la Comunidad"

kpi: "AI Leverage Rate (Target: ≥40% de los clientes activos ejecutan los Prompts proporcionados)"
leading-indicators:

- "Copied-to-Clipboard Rate (¿Están copiando los prompts de la lección?)"
- "Quality of Work Submitted (Disminución drástica de errores basales en las tareas entregadas)"
- "Community AI Output Shares (Volumen de posts tipo 'Miren lo que la IA armó para mi caso de estudio')"

riesgos-controles:

- riesgo: "Síndrome de Reemplazo (La IA hace todo el trabajo, el cliente no aprende el concepto subyacente)"

  control: "El contenido enseña el 'Por Qué' de forma innegociable. El Prompt automatiza el 'Qué/Cómo' manual."

- riesgo: "Ansiedad Técnica (Clientes no saben usar ChatGPT/Claude)"

  control: "Incluir un Loom de 60s antes del prompt demostrando cómo copiar, pegar y rellenar corchetes."

- riesgo: "Prompt Rot (El prompt se vuelve inútil tras una actualización de OpenAI/Anthropic)"

  control: "Los prompts están alojados en una base de datos central en Notion y 'embebidos' en el curso para actualización masiva centralizada."
evidencias:

- "Repositorio de Prompts Maestros actualizado"
- "Uso de los prompts reportado en encuestas cualitativas del LMS"
- "Casos de éxito de tiempo ahorrado demostrables en la comunidad"
---

# Ritual: Co-Crear con GenAI — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En la Era de la Inteligencia, un programa educativo que no te da "Los Prompts" para acelerar su propia implementación, está cobrando por fricción innecesaria.
> Integrar IA aquí NO es un módulo bonus sobre "Cómo usar ChatGPT". Es insertar la IA como un *exoesqueleto metodológico* en cada lección difícil.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El consumo de contenido regular (R10) llega a un "Choke Point" (un paso donde el cliente normalmente se atasca por volumen de escritura/análisis).
- **Pre-ritual:** ¿Existen los bloques de corchetes [ ] claramente definidos en los prompts para que el cliente sepa qué reemplazar con su contexto?
- **Contexto:** Aprender a hacer un Plan de Marketing, una Dieta Semanal o una Proyección Financiera es duro. Antes, los alumnos abandonaban al ver la plantilla en blanco. Ahora, inyectándoles un Mega-Prompt metodológico en el momento exacto de la angustia de la hoja en blanco, transformamos el esfuerzo en edición, bajando el abandono a cero.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Acortar radicalmente el Time-to-Value del cliente proveyéndole la lógica algorítmica y los Prompts pre-validados para que la GenAI haga el 80% del trabajo pesado de su módulo.
- **Definición de Éxito (DoD):**
  - [ ] Cuellos de botella de implementación (Choke Points) identificados
  - [ ] Prompt Pack maestro testeado, redactado y embebido en el LMS
  - [ ] Instrucciones de "Zero Setup" incluidas (cómo usar sin saber ingeniería de prompts)
  - [ ] Resultados asombrosos ("Aha Moments") reportados por los clientes
- **Definición de Éxito del Lead:** "En la versión antigua habría tardado 3 semanas en armar esto. Con los prompts de la lección 4, armé la estructura maestra en 10 minutos y pasé la semana analizándola en vez de redactando."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Content Lead | Coherencia entre el Prompt y la currícula educativa enseñada |
| **Responsible** | AI Architect (or Growth) | Ingeniería, testeo y refinamiento técnico de los Prompts |

| **Consulted** | CX Lead | Monitorear en qué temas los alumnos siguen atascándose |
| **Informed** | Product Led | Uso de esta "capa de IA" como feature poderoso para marketing/ventas de R06 |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Matriz de Lecciones vs. Esfuerzo de Implementación (Detectar zonas de alto esfuerzo mental).
- [ ] Entornos de IA estándar recomendados y gratuitos (ChatGPT gratuito o Claude Sonnet).
- [ ] Plantilla visual de Prompts (Caja de código oscura, fácil de hacer Copy-Paste).

---

## 5. Ejecutar — Parte 1: Creación e Inyección de la Capa de IA

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Identificar el "Choke Point" del Módulo

**Acción:** Revisar la analítica de R11. ¿Dónde dejan de entregar tareas? Ej: "Redactar tus Core Values" o "Hacer tu matriz de contenido".

**Output:** Bottleneck diagnosticado.

### 5.2 — Ingeniería de Prompt Maestro (El "Exoesqueleto")

**Acción:** El AI Architect diseña un prompt pesado que obligue al LLM a seguir ESTRICTAMENTE la metodología MetodologIA (o del autor del curso). No puede alucinar frameworks de terceros.

**Regla:** El prompt incluye el frame, las restricciones y las columnas de salida esperadas.
**Output:** Prompt Crudo (Beta).

### 5.3 — Testeo de Robustez (Fool-proofing)

**Acción:** Probar el prompt en diferentes LLMs (GPT-4o, Claude 3.5). Romperlo a propósito dándole inputs vagos. Modificar el prompt para que el LLM pida aclaraciones si el input del cliente es malo.

**Output:** Prompt Validado (Golden Prompt).

### 5.4 — Creación del "Context Wrapper" (Variables del Cliente)

**Acción:** Separar claramente la parte 'Fija' del prompt de los Corchetes Editables que el alumno debe rellenar.

**Template:** "[Tu Industria], [Tu Dolor], [Tu Cliente Ideal]".
**Output:** Código Copy-Pasteable Lógico.

### 5.5 — Grabación del Micro-Tutorial Asincrónico

**Acción:** Loom < 2 minutos de la pantalla del profesor.

**Script:** "Copien este código oscuro de abajo. Vayan a Claude.ai. Péguenlo. Cambien estas 3 palabras entre corchetes con su caso real. Presionen Enter. Tienen 80% de la tarea lista. Editen el 20%. Empiezo el cronómetro, háganlo AHORA."
**Output:** Instrucción libre de fricción técnica.

### 5.6 — Embebido en la Plataforma en la Capa DO (R10)

**Acción:** Insertarlo justo debajo del contenido teórico, antes de la entrega de la tarea.

**Output:** Infraestructura viva en LMS.

### 5.7 — Lanzamiento del Reto Comunitario ("Prompt Challenge")

**Acción:** El Community Manager tira un reto asincrónico.

**Script:** "Gente del Módulo 3, este fin de semana es el reto del Mega-Prompt de Nichos de Mercado. El que comparta el output más inesperado (que la IA iluminó) se lleva un Módulo 7 adelantado."
**Output:** Excusa de participación social (Share Layer).

### 5.8 — Auditar el Sentimiento Generado ("Wow effect")

**Acción:** Monitorear el Slack/Discord buscando expresiones de asombro ("Me partió el cerebro lo que me sacó este prompt").

**Output:** Validación del Aha-Moment.

### 5.9 — Evolución Autoguiada del Prompt

**Acción:** Si varios clientes dicen "La IA me da respuestas muy robotizadas sobre finanzas", actualizar centralmente la instrucción de Tono en el Prompt pre-grabado del LMS.

**Output:** Mejora continua viva.

### 5.10 — Registrar "AI Leverage Usage"

**Output:** Métricas de adopción tecnológica informadas al equipo.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo Defensivo y Scaling

### 6.1-6.5 — Control de dependencia: Recordar periódicamente "La IA no piensa por ti, escurrale las piezas pero tú ajustas las tuercas". Re-centrar al humano en el loop

### 6.6-6.10 — Despliegue de un "GPT Personalizado / Custom Bot" en lugar de un prompt estático de texto, permitiendo que hablen con un bot "Experto en el Metodo del Curso" por medio de un link incrustado

### 7.1-7.5 — Vender el "Prompt Book" maestro como un Lead Magnet en R01, retroalimentando el funnel de marketing con herramientas desarrolladas para Delivery

### 7.6-7.10 — Escalar al infinito: Empezar a meter prompts a problemas más micro. (Ej. "Prompt para revisar si mi escritura del Mail1 rompe mis valores de marca")

---

## 8. Validación y Calidad (QA)

- [ ] Cero "Prompts Secretos / Vudú". Todo el prompt debe estar visible para que el alumno aprenda cómo funciona la IA al leer la ingeniería interna del código que estamos proveyendo.
- [ ] Evitar prompts específicos para herramientas privativas raras. Los Mega-Prompts deben funcionar en los foundation models estándar y públicos.
- [ ] Test rutinario mensual (OpenAI actualiza a veces sus weights y los prompts pierden impacto; requieren re-ajuste ciego).

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Golden Prompt Pack | MD/JSON | Repositorio Central | AI Architect |
| Embed in LMS | Component UI | Módulos del Curso | CX / Ops |
| Community Saves | Posts / Wins | Discord / Chat | Clientes |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [13-auditar-satisfaccion-nps](../sop-13-nps/13-auditar-satisfaccion-nps-ritual.md).
- **Condición de handoff:** El cliente, apalancado por su propio conocimiento y nuestra lógica robótica, cruzó la fase dura de la implementación a una velocidad 3-5X superior al promedio de programas genéricos de la industria.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Tarea "AI" completada | ≥70% que la inicia| 🟡 |
| Time-to-Complete task | Reducción del 50% | 🟡 |

- **NEXT:** `personas-masivo → 13 → auditar-satisfaccion-nps`
- **BLOCKERS:** `Actualizaciones de Modelos rompen lógica de Few-Shot prompting.`

---

## Modal 10x: El "Prompt Pack Factory" (Prompt Pro)

**Use case:** Tienes un libro / curso denso que enseña a hacer Planes Financieros para freelancers. Sabes que hacerlo a mano asusta al 80% de la clase. Necesitas que la IA lo automatice siguiendo el marco teórico de TÚ libro.

```markdown
PROMPT:
"Actúa como un AI Engineer especializado en Programas B2C B2B Educativos de alta gama.
Estoy diseñando un Módulo Rudo sobre: [Tema: Plan Financiero Táctico para Freelancers a 12 Meses].
Escríbeme el MEGA-PROMPT (Estilo few-shot, con restricciones extremas) que le voy a pegar a mis alumnos en su portal para que ellos lo usen en ChatGPT.
El Prompt debe:
1. Requerir que la IA actúe como MI framework [Nombre de Framework].
2. Forzar que el Alumno solo tanga que rellenar estos 3 datos: [Ingreso Promedio, Gastos Fijos, Meta Neta Mensual deseada].
3. Reprimir a la IA para que NO use consejos financieros tradicionales/bancos.
4. Escupir Output obligatoriamente como: 1 Tabla Markdown mes a mes con los KPI, y una lista de 3 acciones para reducir grasa según la meta.
Hazlo copy-pasteable completo. Robusto, inquebrantable e indudable."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
