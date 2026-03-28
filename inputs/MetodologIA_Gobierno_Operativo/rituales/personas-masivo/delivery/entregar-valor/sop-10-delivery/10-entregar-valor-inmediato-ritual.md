---
id: "10"

segmento: "personas-masivo"
journey: "delivery"
proceso: "entregar-valor"
sop: "sop-10-delivery"
ritual-slug: "10-entregar-valor-inmediato"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Content Lead"
- backup: "Community Manager"
frecuencia: "continua (programada por cadencia de módulos/drip)"
herramientas:

- "LMS / Plataforma"
- "Motor de Email Drip (Klaviyo / ActiveCampaign)"
- "Stack de Comunidad (Discord / Circle / Skool)"

entry-criteria:

- "Quick win de Onboarding completado (Ritual 09)"
- "Cliente marcado como activado (`Onboarded_Activated`)"
exit-criteria:

- "Cliente consume el contenido orgánicamente módulo a módulo"
- "Cliente transiciona de consumidor pasivo a implementador activo mediante tareas"
- "Retroalimentación capturada vía NPS de medio programa"

kpi: "Content Completion Rate (Target: ≥50% de la cohorte completan ≥60% del contenido del programa)"
leading-indicators:

- "Module-to-Module Drop-off Rate (¿En qué módulo mueren?)"
- "% de clientes que envían tareas de aplicación"
- "DAU/WAU de la Comunidad (Daily/Weekly Active Users)"

riesgos-controles:

- riesgo: "Abandono post-quick win (El temido 'Engagement Cliff' o desierto de la semana 2)"

  control: "Implementar Drip Progresivo (por goteo) atado a milestones y ritmo semanal natural."

- riesgo: "Binge-watching pasivo (Ven el curso como Netflix y no aplican nada)"

  control: "Arquitectura L-D-S (Learn-Do-Share) obligatoria por módulo. Teoría < Tarea Práctica."

- riesgo: "Sensación de vacío o aislamiento digital (Pagué y estoy solo ante el mundo)"

  control: "Gamificación comunitaria asincrónica. Obligación sistemática de postear victorias intermedias."
evidencias:

- "Métricas de finalización (Completion flags) en el LMS"
- "Entregables de tareas de clientes alojados en la plataforma"
- "Resultados del Micro-NPS de mitad de trayecto"
---

# Ritual: Entregar Valor Inmediato — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Delivery masivo NO ES grabar 80 videos, subir un PDF y rezar.**
> El Delivery es Core Product. Es una orquestación conductual diseñada para sostener el momentum del cliente durante semanas.
> **La Ley del LEARN-DO-SHARE:** Cada molécula de enseñanza debe provocar una implementación inmediata y generar un loop social en la comunidad.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Automáticamente en el momento que el usuario concluye R09 (Setup y Activación inicial) y tiene la plataforma liberada para aprendizaje.
- **Pre-ritual:** ¿Están los triggers del Drip Email listos para no enviar el correo del Módulo 3 a alguien que se atascó en el Módulo 1?
- **Contexto:** Pasamos de la zona de "conversión" a la zona de "retención y utilidad". El usuario está motivado, pero la dopamina de la compra pronto cederá ante la fricción de aprender e implementar. Aquí es donde el diseño del contenido debe brillar por su claridad, concisión y orientación a la acción.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Orquestar el viaje de aprendizaje para que el cliente cruce sistemáticamente la brecha de implementación, minimizando el abandono pasivo.
- **Definición de Éxito (DoD):**
  - [ ] Secuencia de Drip Content fluyendo al ritmo del cliente
  - [ ] Tareas prácticas (DO) ejecutadas por el cliente
  - [ ] Interacción de la cohorte en la comunidad (SHARE)
  - [ ] Milestone Celebrations ejecutadas automáticamente
- **Definición de Éxito del Lead:** "Pensé que no tendría tiempo para esto, pero los módulos son tácticos, voy a mi ritmo, e implementar la tarea de la Semana 2 ya pagó el costo del curso completo."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Content Lead | Relevancia, actualización y curación del contenido maestro |
| **Responsible** | Community Manager | Dinamizar el espacio social y moderar dudas orgánicas |

| **Consulted** | CX / Ops | Resolver tickets técnicos ("El video 4 no carga") |
| **Informed** | Product Marketing | Retroalimentación para mejorar la promesa de ventas (R06) |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Contenido completo alojado, transcrito, indexado y QAeado en LMS.
- [ ] Drip Campaigns configuradas en el proveedor de email.
- [ ] Espacios comunitarios con canales segregados por módulos o niveles (\`#modulo-1-wins\`).
- [ ] Sistema de encuestas mid-program automatizado (NPS).

---

## 5. Ejecutar — Parte 1: El Loop de Aprendizaje (L-D-S)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparar Drip de Liberación de Contenido (LEARN)

**Contexto:** Todo de golpe asusta. Entregar Módulo N+1 secuencialmente.

**Script Base (Email Semanal):** "[Nombre], el framework de la Fase 2 ya está destrabado en tu portal. Esta semana atacamos [Cuello de botella específico]. Hay una sola lección que necesitas ver antes del miércoles: [Link]. Cero teoría extra. Implementa esto puro."
**Output:** Módulo destrabado y notificado.

### 5.2 — Ejecución de Plataforma: Visualización Asincrónica

**Acción:** El cliente visualiza las lecciones en LMS.

**Regla de UX:** Videos cortos (<12 min), material principal en texto plano anexo (escaneable), transcripts disponibles.
**Output:** Visualización Trackeada.

### 5.3 — Desplegar la Tarea de Aplicación Rígida (DO)

**Acción:** Al final o entre módulos, el cliente no puede "deslizar al siguiente". Debe bajar un worksheet, copiar un Notion template o enviar una respuesta.

**Contexto:** La retención la dicta la ejecución, no la retentiva mental.
**Output:** Tarea asignada.

### 5.4 — Promptear Feedback Comunitario (SHARE)

**Acción:** Al final del Worksheet/Tarea, forzar amablemente un loop social.

**Script:** "Ahora que definiste tu [Entregable], ve al canal #wins-modulo2 de Discord, pega el tuyo y dale feedback brutalmente honesto a 1 de tus compañeros."
**Output:** Cross-pollination asincrónica.

### 5.5 — Moderación y Presencia Invisible del CM

**Acción:** El Community Manager no es un profe. Da 'likes', pinea buenos trabajos, y taggea a otros ("@Juan, tú tenías un caso parecido, mira lo que armó @María").

**Output:** Sentido constructivo de rebaño.

### 5.6 — Milestone Celebrations Automatizadas (Gamificación)

**Acción:** Celebrar progreso fraccional (25%, 50%, 75%).

**Script Automático (25%):** "Pausa un segundo, [Nombre]. Acabas de cerrar toda la base estratégica (25% del programa). La mayoría de la gente fuera de esto ni siquiera termina de leer un libro. Has hecho el trabajo. Sigue así."
**Output:** Inyección de Dopamina.

### 5.7 — Sistema "At-Risk" Rescue (Si caen de ritmo)

**Contexto:** Cliente se queda 7 a 10 días estancado sin avanzar un % del LMS.

**Acción:** Drip de rescate paralelo.
**Script:** "Hola [nombre], soy yo de nuevo. Vi que cruzaste el Módulo 1 pero te frenaste ahí. El Módulo 2 es pesado, lo sé. Si tienes problemas con el ejercicio 2B, responde a este correo con tu borrador e intentaré desatorarlo."

**Output:** Recate de Churn temporal.

### 5.8 — Lanzar Micro-NPS Estructural (Mid-Program Audit)

**Acción:** A la mitad exacta del viaje formativo (Módulo N/2).

**Encuesta (1 click In-Email):** "¿Del 1 al 10, qué tan útil está siendo la implementación de esto en la vida real?"
**Output:** Sensor de percepción de valor crudo (Sentiment Analysis preventivo).

### 5.9 — Manejo de Detractores y Promotores (Derivados del NPS)

**Acción:**

- Promotores (9-10): Desviar orgánicamente hacia Up-Sells o Tiers Pro.
- Detractores (0-6): Disparar email personal del CX Lead para sesión resolutiva.
**Output:** Gestión dinámica del Customer Success.

### 5.10 — Taggear Completitud de Módulo en CRM

**Acción:** Sincronizar LMS -> CRM de modo que Marketing sepa quién va por qué nivel para no cruzar campañas erróneas.

**Output:** Datos maestros actualizados.

---

## 6-7. Ejecutar — Parte 2 y 3: Curación y Evolución

### 6.1-6.5 — Análisis forense del Drop-Off (Si el 40% muere en el video 3 del Modulo 4, el video está mal diseñado o la tarea es incomprensible. Refactorización ágil requerida)

### 6.6-6.10 — Community Harvesting: Extraer dudas recurrentes del Discord para crear un PDF de "FAQ Operativo" o un "Office Hours" asincrónico por loom y repartirlo a toda la cohorte

### 7.1-7.5 — Auditar material adjunto. (¿Los links a las herramientas externas de terceros sugeridas siguen activos?)

### 7.6-7.10 — Ceder el 1% de casos extraordinarios ("All-Stars" de la comunidad) a Sales para perfilación Enterprise u ofrecimiento de partner

---

## 8. Validación y Calidad (QA)

- [ ] Arquitectura Mobile-First asegurada (Los usuarios consumen masivamente podcasts/videos en tránsito).
- [ ] No existen "callejones sin salida" sin calls to action a las comunidades. Las lecciones no terminan en vacío.
- [ ] Cero dependencia "sincrónica": El alumno debe poder hacer esto a las 3:00 AM en domingo en Tokio sin necesitar que un soporte en vivo.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Engagement de Lecciones| Analytics Report| LMS Admin Repo| Content Lead |
| Tareas Desarrolladas | Cargas / Links | Discord / LMS | Clientes |
| Mid-Program NPS | Score numérico | CRM Dashboard | CX Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [11-medir-adopcion-contenido](../../success/gestionar-exito/sop-11-success/11-medir-adopcion-contenido-ritual.md). (El delivery continuo choca y se traslapa con la analítica de adopción y éxito tardío).
- **Condición de handoff:** El cliente está avanzando orgánicamente por el framework. Hemos validado mediante su feedback/NPS inicial que está percibiendo valor equivalente al pago.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Mid-Program Completion| ≥60% de la base | 🟡 |
| Índice de NPS 50% | Promedio ≥ 8.0 | 🟡 |

- **NEXT:** `personas-masivo → 11 → medir-adopcion-contenido`
- **BLOCKERS:** `Problemas nativos de integración/webhooks LMS <-> CRM`

---

## Modal 10x: El "Digital Delivery Orchestrator" (Prompt Pro)

**Use case:** Tienes un curso de 8 módulos grabado crudo y necesitas extraer la arquitectura de acompañamiento automático (L-D-S) de inicio a fin.

```markdown
PROMPT:
"Actúa como un Learning Architect para creadores de cursos Masivos (B2C/Prosumer).
El programa se llama [Producto] y consta de estos 4 Módulos en total: [Titulos de Modulos].
Necesito que estructures el Flow de Retención:
Para CADA Módulo, diséñame:
1. 'The DO': 1 Ejercicio práctico de 20 minutos (no más) que les haga ensuciarse las manos y tener su 1er outcome de esa semana.
2. 'The SHARE': El prompt exacto que les pediré que pongan en la Comunidad (ej. Discord) para mostrar lo que hicieron sin avergonzarse.
3. El 'Mid-Milestone Email' (solo para después del Módulo 2): Un texto dopamínico de 3 líneas felicitando su coraje y empujando a la Fase Pesada del curso. Enfoque Neo-Swiss, 0 fluff."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
