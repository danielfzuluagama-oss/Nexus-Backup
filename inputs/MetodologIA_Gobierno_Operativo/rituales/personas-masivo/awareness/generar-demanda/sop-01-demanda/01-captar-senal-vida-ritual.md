---
id: "01"

segmento: "personas-masivo"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "01-captar-senal-vida"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Content Lead"
frecuencia: "quincenal (bloque de 30-45 min)"
herramientas:

- "CRM"
- "LinkedIn Sales Navigator"
- "Perplexity"
- "Instagram"
- "Google News"

entry-criteria:

- "Dashboard de señales activas configurado en CRM"
- "Keywords de Life Events definidas por segmento"
- "Canales de monitoreo abiertos"

exit-criteria:

- "≥3 señales de vida capturadas con Signal_Score ≥ 30"
- "Cada señal tiene Life_Event_Type + Emotional_Frame asignado"
- "Tareas de calificación (R02) creadas"

kpi: "Signal Capture Rate (Target: ≥5 señales calificables por bloque)"
leading-indicators:

- "# de señales brutas detectadas por bloque"
- "% de señales que superan el umbral (Score ≥ 30)"
- "Channel mix balance (diversidad de fuentes)"

riesgos-controles:

- riesgo: "Confundir actividad social genérica con intención real"

  control: "Solo registrar señales con Life_Event verificable (promoción, cambio, crisis, transición)"

- riesgo: "Depender de un solo canal de detección (ej. solo LinkedIn)"

  control: "Balance requerido: 40% LinkedIn, 30% contenido propio, 20% referidos, 10% otros"

- riesgo: "Señales registradas sin acción (se enfrían y mueren)"

  control: "SLA estricto: señal registrada → calificación R02 en <48h"
evidencias:

- "Registros CRM con Signal_Score, Life_Event_Type, Emotional_Frame"
- "Micro-Insight personalizado generado por señal"
- "Try_Buy_Asset preliminar seleccionado"
---

# Ritual: Captar Señal de Vida — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** Detectar señales de vida (Life Events) que indiquen que un individuo está en momento de apertura para consumo masivo de conocimiento. No se busca cualquier "like" — se buscan MOMENTOS DE TRANSICIÓN.
> **7 Life Events clave:** Promoción, Cambio de trabajo, Emprender, Retorno académico, Crisis profesional, Expansión de equipo, Pivot de carrera.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Bloque agendado quincenal de 30-45 min "Signal Mining".
- **Pre-ritual:** ¿El dashboard de señales está limpio? ¿Las keywords de Life Events están afinadas según los últimos aprendizajes?
- **Contexto:** El consumidor de productos masivos (cursos, playbooks, conocimiento) rara vez envía un email diciendo "quiero comprar tu producto". Su señal es PÚBLICA pero INVISIBLE si no la buscas activamente: un post celebrando su promoción, un comentario en un foro sobre "necesito reinventarme", un cambio de titular en LinkedIn. El Signal Mining es la habilidad proactiva de capturar estas transiciones.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Capturar sistemáticamente señales de vida (Life Events) de individuos en momentos de transición que podrían beneficiarse de los activos masivos de MetodologIA.
- **Definición de Éxito (DoD):**
  - [ ] ≥3 señales brutas identificadas y documentadas
  - [ ] Signal_Score inicial calculado para cada una
  - [ ] Life_Event_Type / Emotional_Frame etiquetados
  - [ ] Micro-Insight redactado
  - [ ] Señales ≥30 enviadas a R02 (Calificar Lead)
- **Definición de Éxito del Individuo (Lead):** "Alguien notó genuinamente en qué etapa profesional estoy y me aportó algo relevante, sin venderme agresivamente."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Garantiza el volumen y calidad del top-of-funnel |
| **Responsible** | Growth Lead / AI Agent | Ejecuta monitoreo, filtra ruido, registra en CRM |

| **Consulted** | Content Lead | Calibra qué contenido resuena con qué señales |
| **Informed** | Sales Director | Visibilidad sobre salud del pipeline masivo |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] CRM configurado con campos: `Signal_Score`, `Life_Event_Type`, `Emotional_Frame`, `Micro_Insight`
- [ ] Queries de búsqueda (booleanas) listas para LinkedIn/Twitter
- [ ] Posteos recientes de contenido listos para revisar (social listening)
- [ ] Banco de Try & Buy assets disponible y mapeado a Life Events

---

## 5. Ejecutar — Parte 1: Detección Activa

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Activar bloque de Signal Mining

**Contexto:** El scouting masivo exige hiperfoco.

**Acción:** Bloquear calendario (45 mins). Abrir dashboard de CRM, Sales Navigator, y perfiles de RRSS clave en pantalla dividida. Apagar notificaciones.
**Output:** Entorno configurado.

**Evidencia:** Timestamp de inicio.

### 5.2 — Canal 1: Redes (búsqueda booleana)

**Contexto:** Buscar activamente las 7 transiciones clave.

**Script de búsqueda:** "emocionado de anunciar" OR "nuevo rol" OR "buscando reinventarme" OR "primer día en" OR "decidí emprender"
**Acción:** Ejecutar búsquedas en LinkedIn y Twitter. Filtrar por 2nd connections o industria objetivo.

**Output:** Lista cruda de señales detectadas (target: ≥5).
**Evidencia:** URLs.

### 5.3 — Canal 2: Contenido propio (Social Listening)

**Contexto:** Interacciones de alta profundidad en contenido de MetodologIA.

**Acción:** Escanear últimos 5 posts. Buscar: ¿quién dejó un comentario largo? ¿quién compartió aportando su propia perspectiva? ¿quién mandó un DM de agradecimiento? (Ignorar "likes" vacíos).
**Output:** Señales inbound extraídas.

**Evidencia:** URLs/Screenshots.

### 5.4 — Canal 3: Referidos y menciones orgánicas

**Acción:** Revisar menciones de marca, tags en posts de terceros, o correos de "te presento a...".

**Output:** Señales de recomendación extraídas.
**Evidencia:** Texto plano.

### 5.5 — Filtrado rápido (Ruido vs Señal)

**Acción:** Descartar bots, perfiles falsos, cuentas de empresas (buscamos personas), o rants sin Life Event atado.

**Output:** Shortlist limpia (target: ≥3).
**Evidencia:** Descarte mental/visual.

### 5.6 — Clasificar Life Event Type para la Shortlist

**Acción:** Etiquetar cada señal en CRM: Promoción, Cambio trabajo, Emprender, Retorno académico, Crisis profesional, Expansión equipo, Pivot de carrera.

**Output:** Etiqueta `Life_Event_Type` en CRM.
**Evidencia:** CRM.

### 5.7 — Asignar Emotional Frame

**Contexto:** Define la vibra del eventual contacto.

**Acción:** Leer entre líneas. ¿Es un post festivo? (Aspiración). ¿Es un rant sobre la industria? (Frustración). ¿Pide ayuda? (Transición/Curiosidad). Etiquetar en CRM.
**Output:** Etiqueta `Emotional_Frame` en CRM.

**Evidencia:** CRM.

### 5.8 — Calcular Signal Score inicial (0-100)

**Acción:** Asignar puntaje rápido (gut check calibrado).

- Relevance al producto masivo (+25)
- Intensidad de la emoción (+20)
- Calidad del canal/fuente (+20)
- Frescura (<24h = +20)
- Perfil demográfico base (+15)

**Output:** `Signal_Score` en CRM.
**Evidencia:** CRM.

### 5.9 — Borrador de Micro-Insight (IA assist)

**Acción:** Usar GenAI para sacar un insight rápido de 2 líneas que conecte su Life Event con nuestra tesis operativa. (Ej: "La transición de técnico a manager requiere sistemas, no solo carisma").

**Output:** `Micro_Insight` documentado.
**Evidencia:** CRM.

### 5.10 — Disparar transición a Calificación (R02)

**Acción:** Las señales con Score ≥ 30 se marcan como "Pending Qualification". Las de Score < 30 se taggean para una lista pasiva de newsletter de marca general.

**Output:** Tareas batch creadas para Ritual 02.
**Evidencia:** Cola de tareas R02.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo y Ajuste

### 6.1-6.5 — Analizar eficacia de búsquedas (qué keywords funcionaron hoy)

### 6.6-6.10 — Retroalimentar al equipo de contenido ("estamos viendo mucha gente transicionando a IA, hagan post")

### 7.1-7.5 — Refinar el banco de prompts booleanos para Signal Navigator

### 7.6-7.10 — Update de métricas masivas, cierre contable del bloque de 45 mins

---

## 8. Validación y Calidad (QA)

- [ ] Bloque de 45 mins respetado (timeboxing)
- [ ] Mix de canales respetado (no 100% de la misma fuente)
- [ ] `Signal_Score` asignado a todas las capturas (no hay entradas vacías)
- [ ] Life Events verificables y no "adivinados"

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Pipeline de señales crudas | Registro CRM | CRM Leads | Growth Lead |
| Life Event distribution report | Dashboard | CRM Data | AI Agent |
| Nuevas keywords a monitorear | Lista | Config Doc | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [02-calificar-lead-masivo](02-calificar-lead-masivo-ritual.md)
- **Condición de handoff:** Shortlist de señales (Score ≥ 30) lista con contexto (Life Event + Frame + Insight) en el CRM para su calificación profunda.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Señales totales capturadas | ≥5 / bloque | 🟡 |
| Señales ≥ 30 pts | ≥3 / bloque | 🟡 |

- **NEXT:** `personas-masivo → 02 → calificar-lead-masivo`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Life Event Signal Scanner"

**Use case:** Cuando necesitas procesar un volcado CSV de cientos de menciones de marca o posts capturados vía scraping ético.

```markdown
PROMPT:
"Analiza este lote de [N] señales raw (CSV adjunto).
Por cada row:
1. Detecta si hay un Life Event real (Promoción, Cambio, Emprender, Pivot, Crisis, Equipo, Academia) o es ruido.
2. Si es ruido, marca DESCARTAR.
3. Si es Life Event, determina Emotional Frame (Aspiración, Frustración, Transición, Curiosidad).
4. Proyecta un Signal Score (0-100) priorizando inmediatez y match demográfico.
5. Escribe un Micro-Insight Neo-Swiss de 20 palabras.
Devuelve el resultado en formato tabla Markdown, ordenado por Signal Score descendente."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
