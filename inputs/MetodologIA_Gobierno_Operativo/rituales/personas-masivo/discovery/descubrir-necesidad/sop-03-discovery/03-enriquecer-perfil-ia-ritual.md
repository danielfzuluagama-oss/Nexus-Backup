---
id: "03"

segmento: "personas-masivo"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "03-enriquecer-perfil-ia"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "AI Agent"
- backup: "Growth Lead"
frecuencia: "asincrónica (SLA <24h post R02)"
herramientas:

- "CRM"
- "Perplexity / OpenAI"
- "LinkedIn Profiler"
- "Brand Mentions scraper"
entry-criteria:

- "Lead clasificado como Hot (Score ≥ 70) en R02"
- "Canal de contacto válido (email/LinkedIn) identificado"
exit-criteria:

- "Perfil enriquecido con: industry, role, pain points inferidos"
- "Content consumption pattern proyectado"
- "AI Profile Score calculado y guardado en CRM"
- "Personalización inicial lista para R04 (Diagnóstico) o R05 (Try/Buy)"
kpi: "Enrichment Rate (Target: 100% de leads Hot enriquecidos en <24h)"
leading-indicators:

- "% de campos críticos completados exitosamente"
- "AI Confidence Score promedio (>80% = High)"
- "Tiempo promedio de enriquecimiento por perfil"

riesgos-controles:

- riesgo: "Enriquecimiento invasivo o 'creepy' (uso de datos privados)"

  control: "Solo usar información estríctamente pública y profesional (LinkedIn bio, posts, empresa)"

- riesgo: "AI hallucinations (IA inventa dolores que el lead no tiene)"

  control: "Etiquetar claramente datos 'verificados' vs datos 'inferidos' en el CRM"

- riesgo: "Cuello de botella (enriquecer manualemente frena el pipeline)"

  control: "Batch processing delegable 100% a IA con intervención humana solo en QA"
evidencias:

- "Enriched profile en CRM con logs de IA"
- "AI_Profile_Score"
- "Content Path Recommendation documentado"
---

# Ritual: Enriquecer Perfil con IA — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En Enterprise, el 'discovery' es una llamada de 45 mins. En Masivo, el 'discovery' es un análisis algorítmico asincrónico.
> Usamos IA para leer la huella digital del lead Hot, inferir su dolor actual basado en su Life Event detectado en R01, y decidir qué ruta de contenido enviarle, TODO **sin requerir su tiempo**.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Automáticamente cuando un lead en la cola recibe el Tag `Hot` (Lead Score ≥ 70) en R02.
- **Pre-ritual:** ¿El webhook/automatización entre CRM y la capa de IA está funcionando?
- **Contexto:** Tienes un lead de alto potencial ("Hot"). Si le envías contenido genérico, perderás la ventaja del Life Event. Si pides una reunión de discovery, añadirás demasiada fricción para un producto masivo. La solución es el Discovery Asincrónico: dejar que la IA deduzca lo que necesitamos saber para personalizar el primer contacto.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Construir un perfil profundo 360° del lead utilizando exclusivamente open source intelligence (OSINT) e IA, para personalizar la primera oferta de valor (R04 o R05).
- **Definición de Éxito (DoD):**
  - [ ] Industria y Rol identificados
  - [ ] Top 3 Pain Points inferidos
  - [ ] Patrón de consumo de contenido proyectado
  - [ ] Recomendación de producto/asset asignada
  - [ ] `AI_Profile_Score` (completeness) calculado
- **Definición de Éxito del Lead:** "Me enviaron exactamente el artículo o herramienta que necesitaba para mi industria en este preciso momento."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Calidad y precisión de la data del CRM |
| **Responsible** | AI Agent | Ejecutar el scraping, análisis inferencial y update de CRM |

| **Consulted** | Content Lead | Conecta Pain Points inferidos con Assets existentes |
| **Informed** | Ops | Estabilidad de las integraciones API |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Lote de leads `Hot` en cola de enriquecimiento
- [ ] Prompts de Profile Enrichment testeados y listos en la plataforma de IA
- [ ] Acceso a URL del perfil de LinkedIn / Twitter / Blog del lead
- [ ] Catálogo de "Try & Buy" assets mapeados por Dolor/Industria

---

## 5. Ejecutar — Parte 1: Scraping e Inferencia

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparar trigger de enriquecimiento (Batch)

**Acción:** El sistema de automatización (o el operador humano en batch de 30 mins) recoge todos los leads `Hot` de las últimas 24h.

**Output:** Lista de targets.
**Evidencia:** Cola de tareas de IA iniciada.

### 5.2 — Recopilación OSINT (Open Source Intelligence)

**Acción:** Scrapear data cruda pública: Bio de LinkedIn, headline, último rol, tamaño de empresa actual, últimos 3 posteos, comentarios recientes a referentes de la industria.

**Output:** Raw digital footprint.
**Evidencia:** JSON/Texto plano en memoria.

### 5.3 — Inferencia 1: Hard Data (Rol & Industria)

**Acción:** La IA limpia los títulos "creativos" (ej. "Chief Happiness Ninja") y los normaliza a taxonomía estándar (ej. "HR Director", "Software", "Mid-Market").

**Output:** `Normalized_Role`, `Normalized_Industry`.
**Evidencia:** CRM fields actualizados.

### 5.4 — Inferencia 2: Pain Point Projection

**Contexto:** Si cruzamos [Life Event detectado en R01] + [Rol] + [Industria], podemos inferir el dolor con 80% de accuracy.

**Prompt de IA:** "Este [Rol] en la industria [Industria] acaba de experimentar [Life Event]. Genera sus 3 preocupaciones/obstáculos más probables en este preciso instante."
**Output:** Top 3 Pain Points (marcados como *Inferidos*).

**Evidencia:** CRM field.

### 5.5 — Inferencia 3: Content Affinity Projection

**Acción:** Analizar su huella de interacción previa (Likes, Comments). ¿Prefiere posts técnicos (how-to), piezas de opinión (thought leadership), videos cortisol-cortos, long-form newsletters?

**Output:** Preferred Content Format.
**Evidencia:** CRM field.

### 5.6 — Product Match (Asignación de Asset)

**Acción:** Basado en el Eje de Dolor (Paso 5.4) y el Formato Preferido (Paso 5.5), la IA selecciona el mejor "Try & Buy" (R05) o "Diagnóstico Digital" (R04) de nuestro catálogo.

**Output:** `Recommended_Next_Step_Asset`.
**Evidencia:** CRM field.

### 5.7 — Calcular AI Profile Score (Confidence completeness)

**Acción:** ¿Qué porcentaje de los campos se llenaron con data pura vs inferencia ciega?

- High Confidence (Score ≥80): Tenemos posts recientes, bio clara.
- Medium (50-79): Rol claro pero poca actividad reciente.
- Low (<50): Perfil fantasma, mucha inferencia.

**Output:** `AI_Profile_Score`.
**Evidencia:** CRM field.

### 5.8 — Escribir "Icebreaker" hiper-personalizado

**Acción:** La IA genera la primera línea del outreach futuro. Ej: "Vi que lideras el equipo de Ops en un SaaS de Salud. Con el reciente fund-raising (Life Event), armar la capa de datos suele ser un caos."

**Output:** Texto Icebreaker (Aprobación humana pendiente).
**Evidencia:** CRM field.

### 5.9 — Triage de la confianza (High vs Low)

**Acción:**

- Si Confidence es High/Medium → Enviar directamente a R04/R05 (Outreach personalizado automático).
- Si Confidence es Low → Pausar. Requiere ojo humano para evitar mensajes fuera de contexto.
**Output:** Ruteo de estado.

### 5.10 — Registrar métricas de enriquecimiento

**Output:** Métricas diarias de enrichment run. **Evidencia:** Dashboard.

---

## 6-7. Ejecutar — Parte 2 y 3: QA y Optimización

### 6.1-6.5 — Revisión humana aleatoria (10% de los perfiles High Confidence) para medir alucinaciones

### 6.6-6.10 — Reportar a Content Lead si hay "Pain Points" recurrentes sin un Asset que lo cubra (Content Gap)

### 7.1-7.5 — Refinar prompt de inferencia agregando ejemplos de buenos 'icebreakers'

### 7.6-7.10 — Actualizar taxonomía de roles, limpiar datos huérfanos, cerrar sprint de enriquecimiento

---

## 8. Validación y Calidad (QA)

- [ ] `AI_Profile_Score` asignado a todos (nada ciego pasa al flujo)
- [ ] Los pain points inferidos tienen sentido humano (no son obviedades robóticas)
- [ ] No se utilizaron datos personales sensibles/privados, solo ámbito profesional
- [ ] SLA de 24hs tras R02 cumplido

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Perfil 360 masivo | CRM Object | CRM | AI Agent |
| Icebreakers generados | CSV/CRM | CRM | AI Agent |
| Recomendación de Asset | Field | CRM | AI Agent |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [04-ejecutar-diagnostico-digital](04-ejecutar-diagnostico-digital-ritual.md) (si la recomendación es autoevaluación) o [05-entregar-try-and-buy](../demostrar-valor/sop-05-try-and-buy/05-entregar-try-and-buy-ritual.md) (si la recomendación es un asset hard).
- **Condición de handoff:** Perfil rico, pain point inferido y asset seleccionado.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Enrichment Completion | 100% de leads Hot | 🟡 |
| High Confidence Ratio | ≥60% de la base | 🟡 |

- **NEXT:** `personas-masivo → 04 → ejecutar-diagnostico-digital`
- **BLOCKERS:** `API Limiting en herramientas de scraping OSINT`

---

## Modal 10x: El "Mass Profile Enricher" (Prompt Pro)

**Use case:** Cuando necesitas enriquecer un batch CSV de 100+ Hot leads en un solo batch script usando la API de Claude o ChatGPT.

```markdown
PROMPT:
"Actúa como un perfilador de comportamiento B2C nivel experto.
Te proporciono este lote CSV de [N] prospectos. Contiene: Nombre, URL (LinkedIn/Twitter), Life Event detectado.
Por cada uno, haz OSINT rápido y devuelve 1 fila por lead con la siguiente data:
1. Normalized_Industry (Usa taxonomía GICS)
2. Normalized_Role
3. Top_3_Pain_Points (Inferidos por la transición del Life Event vs Rol)
4. Preferred_Content_Type (Snackable, Long-form, Tool/Template, o Video)
5. Personal_Icebreaker (1 oración abriendo conversación sin vender nada, conectando su transición profesional con un insight útil)
6. Confidence_Level (High/Medium/Low basado en la cantidad de data pública disponible)
Devuelve en formato tabla."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
