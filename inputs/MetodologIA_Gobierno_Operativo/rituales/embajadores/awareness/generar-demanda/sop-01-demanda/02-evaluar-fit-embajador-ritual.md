---
id: "02"

segmento: "embajadores"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-evaluar-fit-embajador"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Sales Director"
frecuencia: "por-evento (al detectar candidate Ready)"
herramientas:

- "CRM"
- "Zoom"
- "Google Docs"
- "NotebookLM"
entry-criteria:

- "Candidate_Score ≥80 (Ritual 01)"
- "Candidato taggeado Ready y con invitación aceptada"
- "Resumen IA del candidate disponible"

exit-criteria:

- "Fit qualitativo evaluado en conversación de 30 min"
- "Decisión: Invite / Develop / Decline documentada"
- "Si Invite: pipeline avanza a Ritual 03"

kpi: "Fit Approval Rate (Target: ≥60% de Ready → Invite)"
leading-indicators:

- "Tiempo promedio desde invitación hasta evaluación (<7 días)"
- "% de evaluaciones que detectan red flags"
riesgos-controles:

- riesgo: "Calificar por simpatía personal"

control: "Evaluación estructurada con 3 áreas + red flags checklist"

- riesgo: "Candidate con agenda oculta (quiere la IP para competir)"

control: "Pregunta directa sobre motivación: ¿servir o monetizar?"

- riesgo: "Demorar la evaluación y perder al candidate"

control: "SLA: evaluación en ≤7 días desde aceptación de invitación"
evidencias:

- "Fit Assessment Document"
- "Red Flags Checklist"
- "Decision logged en CRM"
---

# Ritual: Evaluar Fit de Embajador — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Objetivo:** Validar con profundidad cualitativa si el candidate Ready tiene fit real para operar como embajador. El Candidate Score fue cuantitativo — esto es la prueba humana.
> **KPI:** Fit Approval Rate (Target: ≥60% de Ready → Invite)

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Al recibir aceptación de invitación de un candidate Ready (Ritual 01).
- **Pre-ritual:** ¿El Candidate Score está completo? ¿El resumen IA está disponible? Si no, completar primero.
- **Contexto:** El score numérico detecta potencial, pero no detecta agenda oculta, inestabilidad emocional, o desalineación profunda. La conversación humana es el filtro final antes de invertir en perfilado y experiencia (Rituals 03-05).

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Ejecutar conversación exploratoria de 30 min que valide fit cualitativo en 3 áreas + chequee 5 red flags.
- **Definición de Éxito (DoD):**
  - [ ] 3 áreas cualitativas evaluadas
  - [ ] Red flags checklist completado (0 red flags confirmados)
  - [ ] Decisión documentada con razonamiento
- **Definición de Éxito del Candidate:** "Me sentí escuchado y entendí la oportunidad con claridad, sin presión."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Aprueba decisión final |
| **Responsible** | Growth Lead | Ejecuta la conversación exploratoria |

| **Consulted** | Consultant Lead | Aporta perspectiva sobre competencia metodológica |
| **Informed** | Content Lead | Recibe resultado para preparar perfilado |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Candidate Score completo (5 dimensiones)
- [ ] Resumen IA del candidate leído
- [ ] Guía de conversación preparada (3 áreas + 5 red flags)
- [ ] Sesión de 30 min agendada con el candidate

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Candidate Score + resumen IA | CRM (Ritual 01) | Growth Lead |
| Guía de conversación | Template estándar | Growth Lead |
| Red flags checklist | Documento de gobernanza | Sales Director |

---

## 5. Ejecutar — Parte 1: Setup y Descubrimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Releer resumen IA y Candidate Score

**Contexto:** Llegar a la conversación sabiendo quién es el candidate evita preguntas redundantes y demuestra respeto.

**Acción:** Releer el resumen IA, los 5 scores, y la zona target identificada en Ritual 01.
**Output:** Contexto internalizado.

**Evidencia:** —

### 5.2 — Preparar guía de conversación personalizada

**Contexto:** La conversación es semi-estructurada: 3 áreas fijas + espacio para hilos emergentes. Las preguntas se adaptan al perfil específico.

**Acción:** Personalizar la guía con preguntas específicas para este candidate basadas en sus datos.
**Output:** Guía de 8-10 preguntas lista.

**Evidencia:** Documento de guía.

### 5.3 — Abrir la conversación como iguales

**Contexto:** No es una entrevista de trabajo — es una conversación entre socios potenciales. El tono define la relación futura.

**Acción:** Abrir con reconocimiento genuino de su trayectoria.
**Script:** "Hola [nombre]. Gracias por tu tiempo. Te contacté porque tu trabajo con MetodologIA me impresionó — especialmente [logro específico]. No estoy aquí para entrevistarte; estoy aquí para explorar si tiene sentido que trabajemos juntos como socios."

**Output:** Marco de igualdad establecido.
**Evidencia:** —

### 5.4 — Explorar Área 1: Motivación (10 min)

**Contexto:** La motivación es el predictor más fuerte de éxito a largo plazo. Motivación de servicio > motivación de ingresos.

**Acción:** Preguntar directamente sobre el "por qué".
**Script:** "¿Qué te motiva a querer ser embajador? Si pudieras estar haciendo esto en 2 años, ¿cómo se vería tu semana ideal?"

**Output:** Motivación clasificada: Servicio / Impacto / Ingresos / Status / Mixta.
**Evidencia:** Notas de conversación.

### 5.5 — Profundizar motivación con pregunta de stress test

**Contexto:** La pregunta de stress test revela si la motivación es superficial o profunda.

**Acción:** Hacer pregunta provocadora.
**Script:** "Si en los primeros 6 meses solo tuvieras 1 cliente y ganaras menos de lo que ganas hoy, ¿seguirías haciéndolo? ¿Por qué?"

**Output:** Respuesta de stress test evaluada.
**Evidencia:** Notas.

### 5.6 — Explorar Área 2: Disponibilidad real (5 min)

**Contexto:** Entusiasmo sin tiempo = frustración para todos. Necesitamos ≥10h/mes reales, no aspiracionales.

**Acción:** Explorar agenda real del candidate.
**Script:** "Cuéntame cómo es tu semana típica hoy. ¿Cuántas horas reales podrías dedicar a facilitar, sin quitarle tiempo a tu familia o trabajo principal?"

**Output:** Horas disponibles estimadas (verificadas contra realidad).
**Evidencia:** Notas — campo Availability_Real.

### 5.7 — Explorar Área 3: Mercado local (5 min)

**Contexto:** Un embajador necesita demanda accesible. Si su zona no tiene mercado, no tendrá clientes aunque sea brillante.

**Acción:** Explorar su red y su contexto territorial.
**Script:** "En tu red de contactos y en tu industria, ¿cuántas personas crees que necesitarían lo que MetodologIA ofrece? ¿Ya te han pedido ayuda o recomendaciones?"

**Output:** Estimación cualitativa de mercado local.
**Evidencia:** Notas — campo Market_Potential.

### 5.8 — Ejecutar Red Flags Checklist (5 min, observación durante toda la sesión)

**Contexto:** Los red flags se observan durante toda la conversación, no se preguntan directamente. Son patrones de comportamiento, no respuestas.

**Acción:** Evaluar 5 red flags:

1. **Expectativa de ingreso pasivo** — ¿espera ganar dinero "sin hacer mucho"?
2. **Resistencia al NDA** — ¿incomodidad cuando se menciona el acuerdo legal?
3. **Falta de respeto por la IP** — ¿ya está usando materiales sin autorización?
4. **Sobreprometedor** — ¿promete resultados irreales a sus contactos?
5. **Agenda oculta** — ¿quiere la IP para crear su propio programa competidor?

**Output:** Checklist de 5 red flags: OK / Warning / Confirmed.

**Evidencia:** Red Flags Checklist completado.

### 5.9 — Explicar el modelo de embajador transparentemente

**Contexto:** El candidate merece entender exactamente qué implica ser embajador ANTES de decidir avanzar.

**Acción:** Explicar: NDA obligatorio, certificación, revenue share, estándares de calidad, mystery client anual, re-certificación.
**Script:** "Ser embajador no es ser freelancer que usa nuestra marca. Es ser parte de una red gobernada con estándares altos. Implica: certificación, NDA, auditorías, y un compromiso de calidad permanente. A cambio: IP curada, soporte, y una marca que trabaja para ti. ¿Esto resuena contigo?"

**Output:** Reacción del candidate evaluada.
**Evidencia:** Notas — campo Reaction_to_Model.

### 5.10 — Cerrar con siguiente paso claro

**Contexto:** No dejar la conversación sin un acuerdo explícito sobre qué sigue.

**Acción:** Proponer siguiente paso según evaluación.
**Script (si positivo):** "Me gustó nuestra conversación. El siguiente paso es perfilar tu zona y dominio con más detalle. Te contacto en 48h con los detalles. ¿Te parece?"

**Script (si dudoso):** "Aprecio tu honestidad. Basándome en lo que compartiste, quiero reflexionar un par de días y volver contigo. ¿Está bien?"
**Output:** Siguiente paso acordado.

**Evidencia:** CRM — nota "Next step agreed".

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Escribir notas estructuradas de la sesión

**Contexto:** Las notas deben ser objetivas, no impresionistas. Separar hechos de interpretación.

**Acción:** Documentar: motivación (verbalizada), disponibilidad (declarada), mercado (estimado), red flags (observados), reacción al modelo.
**Output:** Notas estructuradas en CRM.

**Evidencia:** CRM — nota "Fit Assessment Notes".

### 6.2 — Completar Fit Assessment Document

**Contexto:** El assessment es el documento que viaja con el candidate a través del pipeline.

**Acción:** Llenar assessment con 3 áreas (Motivación, Disponibilidad, Mercado) + scores cualitativos (Alto/Medio/Bajo) + Red Flags checklist.
**Output:** Fit Assessment completo.

**Evidencia:** Google Doc archivado.

### 6.3 — Evaluar resultado global

**Contexto:** La evaluación global combina las 3 áreas cualitativas con los red flags para una decisión clara.

**Acción:** Criterio: Si las 3 áreas son Alto o Medio + 0 red flags confirmados → Invite. Si alguna es Bajo o ≥1 red flag → Develop o Decline.
**Output:** Clasificación: Invite / Develop / Decline.

**Evidencia:** Fit Assessment — conclusión.

### 6.4 — Validar decisión con Sales Director

**Contexto:** Decisión colegiada para evitar bias individual, especialmente si el Growth Lead tiene relación personal con el candidate.

**Acción:** Presentar Fit Assessment al Sales Director. Discutir en 10 min.
**Output:** Decisión confirmada.

**Evidencia:** CRM — campo Decision_Status.

### 6.5 — Si Invite: comunicar al candidate y crear tarea Ritual 03

**Contexto:** Comunicar con entusiasmo profesional. El candidate debe sentir que fue seleccionado, no aceptado.

**Acción:** Enviar confirmación.
**Script:** "[nombre], excelente noticia. Después de nuestra conversación y nuestra evaluación interna, queremos avanzar contigo en el proceso de embajador. El siguiente paso es perfilar tu zona de operación y dominio de expertise. Te contacto esta semana para coordinar."

**Output:** Candidate notificado + tarea R03 creada.
**Evidencia:** CRM — nota + tarea.

### 6.6 — Si Develop: comunicar con plan de cultivo

**Contexto:** Develop no es rechazo — es "aún no". Comunicar con honestidad y respeto.

**Acción:** Enviar mensaje transparente.
**Script:** "[nombre], aprecio nuestra conversación. Creo en tu potencial, pero quiero ser honesto: [área específica] necesita madurar antes de avanzar. Mi propuesta: [acción concreta]. Nos volvemos a evaluar en 3 meses. ¿Te parece justo?"

**Output:** Candidate informado + plan de cultivo definido.
**Evidencia:** CRM — tarea de re-evaluación en 3 meses.

### 6.7 — Si Decline: cerrar con dignidad

**Contexto:** Declinar no es quemar puentes. El candidate puede ser un Promoter valioso aunque no sea embajador.

**Acción:** Comunicar con respeto total.
**Script:** "[nombre], nuestra conversación me confirmó que eres una persona valiosa para el ecosistema. Sin embargo, en este momento [razón general, no personal]. Quiero que sigamos en contacto — tu perspectiva es importante para nosotros."

**Output:** Relación preservada.
**Evidencia:** CRM — status "Declined — relationship maintained".

### 6.8 — Registrar razón de Develop/Decline para calibración

**Contexto:** Los motivos de no-avance retroalimentan Ritual 01 (scoring) y el programa de clientes.

**Acción:** Registrar motivo codificado: disponibilidad / mercado / motivación / red flag / timing.
**Output:** Motivo registrado.

**Evidencia:** CRM — campo Decline_Reason.

### 6.9 — Actualizar pipeline de embajadores

**Contexto:** El pipeline debe reflejar la realidad actual del funnel de reclutamiento.

**Acción:** Mover candidate al stage correspondiente: Invited / Developing / Declined.
**Output:** Pipeline actualizado.

**Evidencia:** CRM — pipeline view.

### 6.10 — Retroalimentar scoring de Ritual 01

**Contexto:** ¿El Candidate Score predijo correctamente el resultado del Fit qualitativo? Si no, calibrar.

**Acción:** Comparar Candidate Score vs Fit Assessment resultado. Registrar si hubo divergencia.
**Output:** Calibration insight.

**Evidencia:** Log de operaciones.

---

## 7. Ejecutar — Parte 3: Ejecución y Producción

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Actualizar Mapa de Nodos

**Contexto:** Cada decisión de fit cambia el mapa de la red.

**Acción:** Si Invite: agregar candidate como "In Pipeline" en su zona. Si Decline: liberar la zona para otros.
**Output:** Mapa actualizado.

**Evidencia:** Drive — Mapa de Nodos.

### 7.2 — Generar resumen de la evaluación para el archivo

**Contexto:** Un resumen ejecutivo facilita que cualquier persona del equipo entienda la situación del candidate sin leer todas las notas.

**Prompt de IA:**

```markdown

PROMPT:
"Resume esta evaluación de fit para embajador en 5 líneas:

- Candidate: [nombre]
- Score: [X]/100
- Motivación: [alta/media/baja — detalle]
- Disponibilidad: [horas/mes]
- Mercado: [estimación]
- Red flags: [lista]
- Decisión: [Invite/Develop/Decline]

Formato: 5 bullet points. Tono: analítico, sin adornos."
```

**Output:** Resumen ejecutivo archivado.

**Evidencia:** CRM — nota.

### 7.3 — Comunicar resultado al equipo

**Acción:** Notificar al equipo relevante (Content Lead si Invite, para preparar IP kit futuro).

**Output:** Equipo informado.
**Evidencia:** Slack/mensaje.

### 7.4 — Verificar que no hay candidates huérfanos en pipeline

**Acción:** CRM query: ¿hay candidates en "Ready" sin evaluación de fit después de 7 días?

**Output:** 0 huérfanos.
**Evidencia:** CRM query.

### 7.5 — Actualizar métricas de funnel

**Acción:** Registrar: # evaluados, # Invite, # Develop, # Decline, conversion rate.

**Output:** Métricas actualizadas.
**Evidencia:** Dashboard.

### 7.6 — Analizar patrones de red flags

**Contexto:** Si un red flag aparece frecuentemente, el pre-filtro de Ritual 01 necesita mejorar.

**Acción:** Revisar historial de red flags del último trimestre. ¿Hay patrón?
**Output:** Insight de patrones.

**Evidencia:** Nota.

### 7.7 — Revisar calidad de la conversación (auto-evaluación)

**Acción:** ¿Hice las preguntas correctas? ¿Detecté los red flags a tiempo? ¿El candidate se sintió respetado?

**Output:** Self-assessment del evaluador.
**Evidencia:** Nota personal.

### 7.8 — Archivar Fit Assessment en Drive

**Acción:** Guardar assessment en carpeta de embajadores con nomenclatura estándar.

**Output:** Archivo guardado.
**Evidencia:** Drive — carpeta embajadores.

### 7.9 — Verificar que scripts de comunicación se usaron correctamente

**Acción:** Revisar que el mensaje enviado al candidate fue personalizado (no un copy-paste genérico).

**Output:** Quality check.
**Evidencia:** Message review.

### 7.10 — Cerrar y preparar siguiente ciclo

**Acción:** ¿Hay más candidates Ready esperando evaluación? Si sí: agendar. Si no: esperar siguiente ciclo de Ritual 01.

**Output:** Agenda lista o ciclo cerrado.
**Evidencia:** CRM — tareas.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Fit Assessment Document completado con 3 áreas + red flags
- [ ] Decisión colegiada (Growth Lead + Sales Director) registrada
- [ ] Candidate notificado del resultado (cualquiera que sea)
- [ ] Motivo de Develop/Decline registrado en CRM
- [ ] Pipeline de embajadores actualizado
- [ ] Mapa de Nodos refleja el resultado

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| 3 áreas evaluadas | ☐ | Fit Assessment |
| Red flags checklist sin confirmados | ☐ | Checklist |
| Decisión colegiada registrada | ☐ | CRM |

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Fit Assessment Document | Google Doc | Drive / embajadores | Growth Lead |
| Red Flags Checklist | Checklist | Assessment | Growth Lead |
| Comunicación al candidate | Mensaje personalizado | Email/LinkedIn | Growth Lead |
| Resumen ejecutivo IA | Texto | CRM nota | AI Agent |

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [03-perfilar-zona-y-dominio](../../../discovery/descubrir-necesidad/sop-03-discovery/03-perfilar-zona-y-dominio.md)
- **Datos que hereda:** Fit Assessment, Candidate Score, zona target, motivación clasificada
- **Condición de handoff:** Fit = Invite + decisión colegiada = Go

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Fit Approval Rate | — | ≥60% | 🟡 |
| Tiempo invitación→evaluación | — | ≤7 días | 🟡 |

### Cierre

- **NEXT:** `embajadores → 03 → perfilar-zona-y-dominio`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Fit Conversation Navigator" (Prompt Pro)

**Use case:** Para cuando necesitas preparar la conversación de fit y anticipar escenarios.

```markdown
PROMPT:
"Prepara una guía de conversación de 30 min para evaluar el fit de un candidato a embajador MetodologIA.
Candidate: [nombre], Score: [X]/100, Zona: [X], Motivación declarada: [X].
Genera:
1. Pregunta de apertura que demuestre conocimiento del candidate
2. 3 preguntas para evaluar motivación (distinguir servicio vs ego)
3. 2 preguntas para evaluar disponibilidad real
4. 2 preguntas para evaluar mercado local
5. 1 pregunta de stress test
6. Script de cierre positivo y script de cierre neutro
Tono: conversacional, directo, respetuoso. Prohibido tono de entrevista de reclutamiento."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
