---
id: "01"

segmento: "embajadores"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "01-detectar-candidato-embajador"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Consultant Lead"
frecuencia: "quincenal"
herramientas:

- "CRM"
- "LMS Analytics"
- "LinkedIn"
- "NotebookLM"
entry-criteria:

- "Pipeline de egresados/clientes activos disponible"
- "Criterios de Digital Champion definidos"
- "Mapa de Nodos actualizado (territorios cubiertos vs vacantes)"

exit-criteria:

- "Candidates identificados y taggeados en CRM"
- "Candidate Score calculado por 5 dimensiones"
- "Top candidates priorizados para Ritual 02"

kpi: "Candidate Pipeline (Target: ≥5 new candidates/trimestre)"
leading-indicators:

- "# egresados con Adoption = Power User"
- "# clientes con NPS sostenido ≥ 9 por ≥3 meses"
riesgos-controles:

- riesgo: "Seleccionar por entusiasmo sin competencia"

control: "Candidate Score objetivo con 5 dimensiones cuantificables"

- riesgo: "Pipeline insuficiente"

control: "Ampliar fuentes: clientes personas + servicios + aliados existentes"

- riesgo: "Sesgo por relación personal"

control: "Score calculado antes de la conversación — no después"
evidencias:

- "Candidate list en CRM con scores"
- "Fuente de cada candidato documentada"
---

# Ritual: Detectar Candidato a Embajador — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Objetivo:** Identificar proactivamente egresados y clientes excepcionales que tienen potencial para operar como nodos soberanos del ecosistema. No se espera a que pidan — se detecta.
> **KPI:** Candidate Pipeline (Target: ≥5 new candidates/trimestre)

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Quincenalmente, durante el bloque "Talent Scouting" (60 min).
- **Pre-ritual:** ¿Hay egresados de los últimos 6 meses sin evaluar? ¿Ha habido nuevos NPS ≥ 9? Si no hay datos frescos, primero ejecutar un refresh de CRM.
- **Contexto:** Los embajadores no se autopostulan — se detectan. Las fuentes son: Ritual 18 de personas-masivo (Digital Champions), Ritual 18 de personas-servicios (Facilitadores Certificados), y aliados activos con track record. El scoring es objetivo para evitar sesgos de simpatía.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Identificar ≥2 candidates quincenales con potencial de embajador, scorearlos objetivamente.
- **Definición de Éxito (DoD):**
  - [ ] Al menos 2 candidates con Candidate Score calculado
  - [ ] Cada candidate tiene fuente documentada
  - [ ] Top candidates taggeados como "Ambassador_Candidate" en CRM
- **Definición de Éxito del Ecosistema:** Se garantiza que la red crece con calidad, no con cantidad.

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Define criterios de selección y prioriza candidatos |
| **Responsible** | Consultant Lead / AI Agent | Ejecuta el scoring y prepara la lista |

| **Consulted** | Sales Director | Valida alignment estratégico de los candidates |
| **Informed** | Content Lead | Recibe lista para preparar IP kits futuros |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] CRM con campos: Adoption_Level, NPS_History, Referral_Count, Content_Created
- [ ] Mapa de Nodos actualizado (quién opera dónde)
- [ ] Criterios de certificación definidos (para calibrar el scoring)
- [ ] Pipeline de egresados de últimos 6 meses exportado

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Lista de Power Users / NPS ≥ 9 | CRM query | Ops |
| Mapa de Nodos actual | Drive compartido | Growth Lead |
| Criterios de certificación | Skill crear-ritual | Content Lead |

---

## 5. Ejecutar — Parte 1: Setup y Descubrimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)
> Cada micro-paso = 1 acción principal → 1 output verificable

### 5.1 — Activar bloque de Talent Scouting

**Contexto:** El scouting no es un "cuando me acuerde" — es un bloque protegido de 60 min quincenal.

**Acción:** Abrir CRM + Mapa de Nodos en pantalla dividida. Revisar el estado del pipeline de candidates.
**Output:** Entorno de trabajo activo con datos frescos.

**Evidencia:** Timestamp de inicio registrado.

### 5.2 — Exportar pool de egresados/clientes elegibles

**Contexto:** El pool viene de 3 fuentes: (1) Digital Champions de masivo, (2) Facilitadores Certificados de servicios, (3) Clientes con ≥6 meses y NPS ≥ 9.

**Acción:** En CRM, filtrar: `(Adoption = Power_User OR Status = Digital_Champion OR Status = Certified_Facilitator) AND Relationship_Age ≥ 6 months AND NPS_Avg ≥ 9`.
**Output:** Lista de elegibles (target: ≥10 por ciclo).

**Evidencia:** CRM query guardada.

### 5.3 — Eliminar ya evaluados y activos

**Contexto:** No re-evaluar a quienes ya están en pipeline activo de embajadores o ya fueron evaluados y descartados en los últimos 3 meses.

**Acción:** Cruzar lista de elegibles con el pipeline de embajadores en CRM. Eliminar duplicados y evaluados recientes.
**Output:** Lista limpia de NEW candidates.

**Evidencia:** CRM — filtro aplicado.

### 5.4 — Evaluar Dimensión 1: Maestría Metodológica (0-20)

**Contexto:** ¿Domina la metodología lo suficiente para enseñarla? No basta con haberla aprendido — debe haberla aplicado y producido artefactos de calidad sin supervisión.

**Acción:** Revisar para cada candidate: artefactos producidos, co-creaciones, calidad de outputs en programas, feedback de consultores.
**Script:** Criterio: ≥3 artefactos de calidad = 20pts, 1-2 artefactos = 12pts, solo consumption = 5pts.

**Output:** Mastery_Score (0-20) por candidate.
**Evidencia:** CRM — campo Mastery_Score.

### 5.5 — Evaluar Dimensión 2: Capital Social (0-20)

**Contexto:** Un embajador sin audiencia ni red profesional tendrá dificultades para generar demanda. El capital social es un multiplicador, no un lujo.

**Acción:** Revisar LinkedIn: # de connections relevantes, engagement en posts, presencia en eventos, comunidades activas. Revisar si genera contenido propio.
**Script:** Criterio: >1000 LinkedIn connections relevantes + contenido propio = 20pts, 500-1000 + algún contenido = 12pts, <500 o inactivo = 5pts.

**Output:** Social_Capital_Score (0-20) por candidate.
**Evidencia:** CRM — campo Social_Capital_Score.

### 5.6 — Evaluar Dimensión 3: Track Record de Resultados (0-20)

**Contexto:** Los resultados verificables son la evidencia más fuerte de competencia. ¿El candidate puede demostrar que MetodologIA le sirvió?

**Acción:** Revisar Transformation Milestones documentados, testimonios, cambios medibles en su carrera/negocio.
**Script:** Criterio: ≥2 resultados medibles y documentados = 20pts, 1 resultado anecdótico = 12pts, sin evidencia = 5pts.

**Output:** Results_Score (0-20) por candidate.
**Evidencia:** CRM — campo Results_Score.

### 5.7 — Evaluar Dimensión 4: Alineación de Valores (0-20)

**Contexto:** La alineación de valores es indetectable en los datos — se infiere del comportamiento observado. Un embajador desalineado puede dañar la marca irreparablemente.

**Acción:** Revisar: comunicaciones previas, contenido publicado, cómo habla de MetodologIA en público, si ha respetado NDA o guidelines.
**Script:** Criterio: Discurso público coherente + respeto por IP + integridad demostrada = 20pts, neutro = 12pts, red flags = 0pts.

**Output:** Values_Score (0-20) por candidate.
**Evidencia:** CRM — campo Values_Score.

### 5.8 — Evaluar Dimensión 5: Capacidad Operativa (0-20)

**Contexto:** Entusiasmo sin capacidad operativa = frustración. ¿El candidate tiene tiempo, herramientas, y estabilidad para operar?

**Acción:** Evaluar: ¿tiene negocio propio o empleo complementario? ¿Puede dedicar ≥10h/mes? ¿Tiene infraestructura mínima (Zoom, laptop, internet)?
**Script:** Criterio: Negocio propio + ≥10h/mes + infraestructura = 20pts, empleo complementario + disponibilidad parcial = 12pts, sin tiempo claro = 5pts.

**Output:** Operations_Score (0-20) por candidate.
**Evidencia:** CRM — campo Operations_Score.

### 5.9 — Calcular Candidate Score total (0-100)

**Contexto:** El score total determina si el candidate entra al pipeline activo o queda en "desarrollo" para reevaluar en 3 meses.

**Acción:** Sumar: Mastery + Social Capital + Results + Values + Operations = Candidate_Score (0-100).
**Output:** Candidate_Score registrado.

**Evidencia:** CRM — campo Candidate_Score.

### 5.10 — Clasificar: Ready (≥80) / Developing (60-79) / Not Yet (<60)

**Contexto:** Ready avanza a evaluación cualitativa (Ritual 02). Developing se revisa en 3 meses con plan de cultivo. Not Yet se cierra con respeto.

**Acción:** Clasificar cada candidate. Si Ready: taggear como "Ambassador_Candidate" en CRM.
**Output:** Lista clasificada con pipeline status.

**Evidencia:** CRM — tag + clasificación visible.

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Verificar Mapa de Nodos (zonas cubiertas vs vacantes)

**Contexto:** Un candidate Ready es más valioso si opera en una zona vacante. La priorización debe considerar la estrategia territorial.

**Acción:** Cruzar la lista de candidates Ready con el Mapa de Nodos: ¿en qué zona/dominio operaría cada uno?
**Output:** Candidates con Zone_Match (vacante/compartida/saturada).

**Evidencia:** Nota de zona por candidate.

### 6.2 — Priorizar por impacto estratégico

**Contexto:** No todos los candidates Ready tienen el mismo impacto potencial. Un candidate en zona vacante con alto score es prioridad absoluta.

**Acción:** Ordenar por: Candidate_Score × Zone_Priority. Top 2-3 son prioridad del ciclo.
**Output:** Ranking priorizado.

**Evidencia:** Lista ordenada en CRM.

### 6.3 — Investigar perfil público de top candidates (LinkedIn deep dive)

**Contexto:** Antes de invitar, conocer al candidate en profundidad para personalizar la invitación.

**Acción:** Para cada top candidate: revisar trayectoria reciente, publicaciones, endorsements, cambios.
**Output:** Contexto profesional actualizado.

**Evidencia:** Nota "LinkedIn deep dive" en CRM.

### 6.4 — Usar IA para generar resumen de candidate

**Contexto:** Un resumen estructurado por IA acelera la decisión y reduce bias.

**Prompt de IA:**

```markdown
PROMPT:
"Analiza este perfil de candidato a embajador MetodologIA:

- Nombre: [X]
- Rol actual: [X]
- Score: Maestría [X]/20, Capital Social [X]/20, Resultados [X]/20, Valores [X]/20, Operativo [X]/20
- Zone: [X]
Genera un resumen de 5 líneas: fortalezas principales, riesgo principal, y recomendación (Invite/Develop/Not Yet).
Tono: analítico, objetivo, sin adornos."
```

**Output:** Resumen IA de 5 líneas por candidate.

**Evidencia:** Texto guardado en CRM.

### 6.5 — Decisión colegiada: Growth Lead + Sales Director

**Contexto:** La decisión de invitar a un candidate no es individual — es colegiada para evitar bias y asegurar alineación estratégica.

**Acción:** Reunión de 15 min con Growth Lead y Sales Director para revisar top candidates y decidir: Invite / Develop / Not Yet.
**Output:** Decisión por candidate.

**Evidencia:** CRM — campo Decision_Status.

### 6.6 — Preparar plan de cultivo para candidates Developing

**Contexto:** Developing no es "rechazado" — es "aún no". El plan de cultivo define qué necesita mejorar y cuándo se re-evalúa.

**Acción:** Para cada Developing: identificar gap principal y definir acción de cultivo (ej: "necesita producir 2 artefactos más" o "necesita activar LinkedIn").
**Output:** Plan de cultivo con fecha de re-evaluación (3 meses).

**Evidencia:** CRM — tarea programada.

### 6.7 — Registrar insights de candidates Not Yet

**Contexto:** Incluso los Not Yet aportan data: ¿por qué no califican? ¿Hay un patrón? Esto retroalimenta Rituals 01-02 de personas-masivo y servicios.

**Acción:** Registrar motivo de Not Yet: falta de resultados, falta de tiempo, desalineación de valores, etc.
**Output:** Insight registrado.

**Evidencia:** CRM — nota.

### 6.8 — Actualizar Mapa de Nodos con pipeline

**Contexto:** El Mapa debe reflejar no solo embajadores activos sino también el pipeline: quién está en camino.

**Acción:** Agregar candidates Invite y Developing al mapa con status de pipeline.
**Output:** Mapa actualizado.

**Evidencia:** Drive — Mapa de Nodos.

### 6.9 — Preparar invitación personalizada para candidates Invite

**Contexto:** La invitación debe ser personal, no un template. Debe demostrar que conocemos al candidate y valoramos su contribución.

**Acción:** Redactar invitación que referencia logros específicos del candidate y la zona donde operaría.
**Script:** "Hola [nombre]. He observado tu trayectoria con MetodologIA: [logro específico]. Tu dominio de [tema] y tu presencia en [zona] te convierten en un candidato excepcional para nuestra red de embajadores. Me gustaría contarte cómo funciona. ¿Tienes 30 min esta semana?"

**Output:** Invitación personalizada lista para enviar (Ritual 02).
**Evidencia:** Borrador guardado.

### 6.10 — Registrar métricas del ciclo

**Contexto:** Las métricas del ciclo retroalimentan la calibración del scoring y la estrategia de reclutamiento.

**Acción:** Registrar: # elegibles, # candidates Ready/Developing/Not Yet, # Invite, zonas cubiertas.
**Output:** Métricas del ciclo en dashboard.

**Evidencia:** Dashboard actualizado.

---

## 7. Ejecutar — Parte 3: Ejecución y Producción

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Enviar invitaciones a candidates Invite

**Contexto:** La invitación abre el flujo de Ritual 02. El timing importa: enviar cuando el candidate está activo y receptivo.

**Acción:** Enviar las invitaciones personalizadas del paso 6.9 por el canal preferido del candidate (LinkedIn DM o email).
**Output:** Invitaciones enviadas.

**Evidencia:** CRM — nota "Invite sent" con timestamp.

### 7.2 — Crear tarea de Ritual 02 por cada Invite

**Contexto:** Cada invitación debe tener seguimiento estructurado.

**Acción:** Crear tarea en CRM: "Evaluar Fit Embajador — [nombre]" con deadline de 7 días.
**Output:** Tareas programadas.

**Evidencia:** CRM — tareas activas.

### 7.3 — Activar nurturing para candidates Developing

**Contexto:** No dejar a Developing en el limbo. Mantener contacto con contenido de valor que cultive las dimensiones débiles.

**Acción:** Inscribir en secuencia de nurturing específica para embajadores en desarrollo.
**Output:** Nurturing activado.

**Evidencia:** CRM — status "Ambassador_Developing".

### 7.4 — Actualizar scoring model si hay patrones

**Contexto:** Si múltiples candidates fallan en la misma dimensión, el scoring model puede necesitar recalibración o el programa de clientes necesita ajustarse.

**Acción:** Analizar distribución de scores: ¿hay alguna dimensión consistentemente baja?
**Output:** Insight de calibración.

**Evidencia:** Nota en log de operaciones.

### 7.5 — Verificar que todo candidate evaluado tiene registro completo

**Contexto:** CRM governance: ningún candidate evaluado queda sin registro.

**Acción:** Cruzar lista de evaluados vs registros CRM. Verificar que todos los campos están poblados.
**Output:** 0 candidates huérfanos.

**Evidencia:** CRM — query de verificación.

### 7.6 — Generar reporte quincenal de Talent Pipeline

**Contexto:** El reporte informa al Sales Director y al equipo sobre el estado de la red.

**Acción:** Compilar: # candidates evaluados, # Invite/Developing/Not Yet, zonas cubiertas, pipeline growth rate.
**Output:** Reporte de 1 página.

**Evidencia:** Drive — reporte archivado.

### 7.7 — Compartir aprendizajes con equipo de personas

**Contexto:** Los insights del scouting retroalimentan los programas de personas-masivo y personas-servicios: ¿qué perfil de egresado tiene mejor potencial de embajador?

**Acción:** Enviar 3 bullet points al Content Lead: "Los mejores candidates tienen estas características: [X, Y, Z]".
**Output:** Retroalimentación enviada.

**Evidencia:** Mensaje/slack.

### 7.8 — Archivar datos del ciclo

**Contexto:** Todo ciclo de scouting se archiva para poder analizar tendencias a lo largo del año.

**Acción:** Guardar lista de evaluados + scores + decisiones en Drive.
**Output:** Archivo del ciclo.

**Evidencia:** Drive — carpeta de scouting.

### 7.9 — Verificar pipeline health

**Contexto:** Un pipeline sano tiene diversidad de zonas, dominios, y stages.

**Acción:** Revisar: ¿hay concentración excesiva en una zona? ¿Hay zonas sin candidates? ¿Cuántos están en cada stage?
**Output:** Pipeline health assessment.

**Evidencia:** Dashboard.

### 7.10 — Cerrar bloque y preparar siguiente ciclo

**Contexto:** Definir qué cambiará en el siguiente ciclo: nuevos criterios, nuevas fuentes, ajustes de scoring.

**Acción:** Registrar aprendizajes del ciclo y definir ajustes.
**Output:** Log de cierre con ajustes propuestos.

**Evidencia:** Nota en log de operaciones.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Todos los candidates evaluados tienen los 5 scores completos en CRM
- [ ] Cada score tiene criterio documentado (no es "feeling")
- [ ] Candidates Invite tienen invitación personalizada (no template genérico)
- [ ] Mapa de Nodos actualizado con pipeline
- [ ] No se usó "gratis/gratuito" en ninguna comunicación
- [ ] Vocabulario consistente con Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| ≥2 candidates evaluados | ☐ | CRM query |
| Candidate Score calculado (5 dimensiones) | ☐ | CRM campos |
| Decisión colegiada registrada | ☐ | CRM nota |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Candidates con Candidate Score | CRM records | CRM | Growth Lead |
| Resúmenes IA por candidate | Texto | CRM notas | AI Agent |
| Mapa de Nodos actualizado | Mapa visual | Drive | Growth Lead |
| Reporte quincenal de pipeline | 1 página | Drive | Ops |

### Registro en CRM

- **Campos actualizados:** Candidate_Score, Mastery_Score, Social_Capital_Score, Results_Score, Values_Score, Operations_Score, Decision_Status
- **Valor registrado:** Score completo + decisión + zona target
- **Timestamp:** Automático al guardar

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [02-evaluar-fit-embajador](02-evaluar-fit-embajador.md)
- **Datos que hereda:** Candidate Score, resumen IA, zona target, invitación personalizada
- **Condición de handoff:** Candidate Score ≥80 + decisión colegiada = Invite + invitación enviada

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Candidate Pipeline (trimestral) | — | ≥5 | 🟡 |
| Ready Rate (% de evaluados que son Ready) | — | ≥30% | 🟡 |

### Cierre

- **NEXT:** `embajadores → 02 → evaluar-fit-embajador`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Ambassador Scout Engine" (Prompt Pro)

**Use case:** Para cuando necesitas evaluar candidates en lote o te falta contexto.

```markdown
PROMPT:
"Analiza esta lista de [N] candidatos a embajador MetodologIA.
Por cada uno proporciono: nombre, NPS, meses de relación, artefactos producidos, zona geográfica.
Evalúa cada candidato en 5 dimensiones (0-20 cada una):
1. Maestría Metodológica (calidad de artefactos)
2. Capital Social (presencia profesional)
3. Track Record (resultados verificables)
4. Alineación de Valores (coherencia discurso-acción)
5. Capacidad Operativa (tiempo + infraestructura)

Output: tabla con scores + recomendación (Ready/Developing/Not Yet) + riesgo principal.
Tono: analítico, cero adornos."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
