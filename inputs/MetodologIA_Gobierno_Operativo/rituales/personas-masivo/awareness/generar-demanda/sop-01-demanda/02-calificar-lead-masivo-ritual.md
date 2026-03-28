---
id: "02"

segmento: "personas-masivo"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-calificar-lead-masivo"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "AI Agent"
frecuencia: "asincrónica (SLA <48h tras R01)"
herramientas:

- "CRM (Lead Scoring Config)"
- "Perplexity / OpenAI"
- "Scripts de respuesta"

entry-criteria:

- "Cola de señales con `Signal_Score` ≥ 30 en CRM (output de R01)"
- "Life_Event_Type asignado"
exit-criteria:

- "Lead_Score multidimensional calculado (0-100 ponderado)"
- "Lead clasificado: Hot / Warm / Cool"
- "Hot leads inyectados a R03 (Enriquecer Perfil)"

kpi: "Qualification Velocity (Target: 100% de señales procesadas en <48h)"
leading-indicators:

- "% de señales iniciales que califican como Hot"
- "Accuracy del modelo (% de Hot leads que terminan convirtiendo)"
- "Velocidad promedio de procesamiento"

riesgos-controles:

- riesgo: "Acumular señales sin calificar (se enfría el Life Event)"

  control: "Alerta automática si lead permanece no-calificado >48h"

- riesgo: "Sobre-calificar por entusiasmo (falsos positivos Hot)"

  control: "Lead Score requiere evidencia objetiva en los 3 ejes (Signal, Content, Action)"

- riesgo: "Tratar a los masivos como enterprise (pérdida de eficiencia)"

  control: "Automatización de IA para la ponderación inicial del score"
evidencias:

- "Perfil en CRM actualizado con Lead_Score compuesto"
- "Status actualizado: calificado y tagueado (Hot/Warm/Cool)"
---

# Ritual: Calificar Lead Masivo — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Contexto Masivo:** A diferencia de Enterprise donde se invierte mucho tiempo en cada lead, en "Personas Masivo" la calificación debe ser rápida, basada en datos y modelada por el sistema.
> **La Triada de Calificación:** (1) Fuerza de la Señal (40%), (2) Afinidad al Contenido (30%), (3) Readiness de Acción (30%).

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Regularmente a medida que R01 alimenta la cola de señales (SLA estricta: <48 hrs por registro).
- **Pre-ritual:** ¿La cola de señales ≥30 pts está visible? ¿El modelo de scoring del CRM está activo?
- **Contexto:** Hemos capturado que alguien está en una transición ("Signal"). Ahora necesitamos predecir la probabilidad matemática de que nuestro formato masivo (curso, membresía, asset) sea la solución inmediata a esa transición. El objetivo es filtrar agresivamente: enfocar los recursos en contactar a los HOT, nutrir inteligentemente a los WARM, y dejar a los COOL en campañas completamente pasivas.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Convertir señales crudas en perfiles clasificados y puntuados, listos para un outreach contextual o para entrar a secuencias de nutrición automatizadas.
- **Definición de Éxito (DoD):**
  - [ ] Evaluación dimensional completada (Fuerza, Afinidad, Acción)
  - [ ] Core `Lead_Score` actualizado
  - [ ] Etiqueta de temperatura (Hot/Warm/Cool) aplicada
  - [ ] Acción de derivación ejecutada (R03, nurture o archivo)
- **Definición de Éxito del Lead:** "Estoy en la lista correcta con la intensidad de contacto correcta."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Eficiencia y accuracy del modelo de calificación |
| **Responsible** | AI Agent / Ops | Ejecuta el scoring algorítmico y asigna tags |

| **Consulted** | Marketing | Entiende qué cohortes están calificando mejor |
| **Informed** | Sales | Recibe a los leads Hot |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Lote de leads en CRM listos para revisión (provenientes de R01)
- [ ] Datos web/analytics conectados (para ver si han interactuado con contenido previo)
- [ ] Scripts de routing configurados (ej. triggers de email para secuencias Warm)

---

## 5. Ejecutar — Parte 1: Evaluación Multidimensional

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Triage de la cola de señales

**Acción:** Abrir vista CRM "R02 - To Format Qualification". Procesar en formato batch (uno por uno, sin cambiar de contexto).

**Output:** Lead activo seleccionado.
**Evidencia:** Pantalla CRM.

### 5.2 — Confirmar validez del Life Event

**Acción:** Releer el `Micro_Insight` y enlace original. ¿Sigue siendo válido? ¿Fue un falso positivo del R01?

**Output:** Go / No-Go para calificación.
**Evidencia:** Check mental.

### 5.3 — Evaluar Eje 1: Signal Strength (Max 40 pts)

**Acción:** Calificar la pureza de la señal original.

- [0-15] Mención colateral o suposición.
- [16-28] Declaración clara del momento de vida pero sin dolor agudo.
- [29-40] Declaración de transición + frustración u obstáculo mencionado ("necesito resolver esto").

**Output:** `Score_Eje_1`.
**Evidencia:** CRM field.

### 5.4 — Evaluar Eje 2: Content Affinity (Max 30 pts)

**Acción:** Cruce de datos (HubSpot/analytics/LinkedIn). ¿Esta persona nos conocía?

- [0-10] Totalmente frío, 0 touchpoints previos.
- [11-20] Follower reciente o liker esporádico.
- [21-30] Ha consumido contenido profundo (newsletter, posts largos, webinar gratuito en el pasado).

**Output:** `Score_Eje_2`.
**Evidencia:** CRM field.

### 5.5 — Evaluar Eje 3: Action Readiness (Max 30 pts)

**Acción:** Evaluar nivel de fricción actual en su comportamiento.

- [0-10] Modo lurker (solo mira).
- [11-20] Ha dejado comentarios sustanciales o contestado una encuesta/story.
- [21-30] Clic reciente alto-intento, intento de compra previo fallido, o envío de DM directo.

**Output:** `Score_Eje_3`.
**Evidencia:** CRM field.

### 5.6 — Calcular Lead Score Total (0-100)

**Acción:** Sumar Eje 1 + Eje 2 + Eje 3. Guardar número duro en CRM.

**Output:** `Final_Lead_Score`.
**Evidencia:** CRM field.

### 5.7 — Derivar a Nivel: Hot (≥70 pts)

**Acción:** Señal impecable. Mover inmediatamente a Tarea R03 (Enriquecer Perfil IA) para outreach manual o micro-respuesta hiper personal.

**Output:** Ruta: Fast-Track.
**Evidencia:** CRM status `Hot`.

### 5.8 — Derivar a Nivel: Warm (40-69 pts)

**Contexto:** Buen Life Event, pero les falta contexto sobre nosotros.

**Acción:** Enrolar en Secuencia Automática Inteligente (Nurturing educativo sobre su Life Event específico).
**Output:** Ruta: Auto-Nurture.

**Evidencia:** CRM status `Warm`.

### 5.9 — Derivar a Nivel: Cool (<40 pts)

**Acción:** Descartar de operaciones de Growth activo. Suscribir a newsletter de marca masiva (pasiva).

**Output:** Ruta: Passive-Pool.
**Evidencia:** CRM status `Cool`.

### 5.10 — Verificación SLA y Batch commit

**Acción:** Confirmar que todos los leads de R01 asignados en las últimas 48h fueron procesados. Marcar batch como completo.

**Output:** Cola R02 en cero.
**Evidencia:** Dashboard limpio.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo y Ajuste

### 6.1-6.5 — Revisar triggers de secuencias (¿Están saliendo los emails a los Warm?)

### 6.6-6.10 — Analizar demografía de los Hot leads (¿De dónde vienen?)

### 7.1-7.5 — Ajustar pesos de los campos (ej. si affinity importa más, subirle el max score a 40)

### 7.6-7.10 — Actualizar algoritmos CRM, purgar Cools antiguos, documentar

---

## 8. Validación y Calidad (QA)

- [ ] Matriz de scoring (Signal+Affinity+Readiness) evaluada, no solo intuición
- [ ] 0 leads en la cola R02 con más de 48 hrs de antigüedad (SLA cumplido)
- [ ] Los "Hot leads" presentan evidencia sólida (links y datos en CRM, no vacío)

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Perfil Puntuado | Record | CRM Leads | AI Agent/Growth |
| Nurture Enrolled list | Cohort | CRM Marketing | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [03-enriquecer-perfil-ia](../sop-03-discovery/03-enriquecer-perfil-ia-ritual.md) (Solo para la cohorte "Hot" derivando a Discovery).
- **Condición de handoff:** Todos los perfiles etiquetados y ruteados a su track correspondiente (Fast-Track, Auto-Nurture, Passive-Pool).

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| SLA Qualification Time | 100% < 48hrs | 🟡 |
| Ratio Hot/Total | Seguimiento orgánico | 🟡 |

- **NEXT:** `personas-masivo → 03 → enriquecer-perfil-ia`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Batch Lead Assessor"

**Use case:** Cuando R01 genera 50+ señales de un evento en vivo y es imposible scorear manualmente en menos de 48hs.

```markdown
PROMPT:
"Actúa como un Lead Scoring Engine implacable.
Te entregaré un log CSV con datos de [N] prospectos B2C masivos (Life Event, histórico de interacción, acción reciente).
Por favor:
1. Aplica un modelo [40/30/30]: Signal Strength (0-40), Content Affinity (0-30), Action Readiness (0-30).
2. Suma los scores con exactitud matemática.
3. Asigna Bucket (Hot ≥70, Warm 40-69, Cool <40).
4. Explica en 1 oración (columna 'Rationale') la razón principal del score asignado a cada row.
Muestra el output en tabla Markdown filtrado primero mostrando a todos los HOT descendente."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
