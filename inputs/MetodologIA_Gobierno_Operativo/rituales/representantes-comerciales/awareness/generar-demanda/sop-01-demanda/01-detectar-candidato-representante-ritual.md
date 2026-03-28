---
id: "01"

segmento: "representantes-comerciales"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "01-detectar-candidato-representante"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "quincenal"
herramientas:

- "CRM"
- "LinkedIn Sales Navigator"
- "Perplexity"

entry-criteria:

- "Territorios con demanda no cubierta identificados"
- "Perfil de Representante Ideal documentado"
- "Mapa territorial actualizado (overlap check con embajadores)"

exit-criteria:

- "≥3 candidatos con Sales_Score ≥ 60"
- "Cada candidato perfilado en 4 dimensiones comerciales"
- "Tareas de R02 creadas para top candidates"

kpi: "Pipeline de Representantes (Target: ≥5 candidatos calificados/trimestre)"
leading-indicators:

- "# perfiles evaluados por bloque"
- "% de candidatos con Score ≥ 60"
- "Distribución territorial de candidatos"

riesgos-controles:

- riesgo: "Confundir un buen vendedor genérico con un rep de MetodologIA"

  control: "Evaluar alineación con producto/mercado, no solo habilidad de venta"

- riesgo: "Reclutar reps en zonas ya cubiertas por embajadores"

  control: "Verificar mapa territorial antes de avanzar"

- riesgo: "Sesgo por relación personal"

  control: "Score calculado antes de la conversación — no después"
evidencias:

- "Sales_Score por candidato"
- "Territorio verificado (no overlap con embajadores)"
- "Lista clasificada: Ready / Promising / Not Fit"
---

# Ritual: Detectar Candidato a Representante — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **Diferencia con embajadores R01:** Aquí NO se busca maestría metodológica — se busca CAPACIDAD COMERCIAL + red de contactos en el territorio target.
> **4 dimensiones del Sales_Score:**
>
> 1. Red de contactos en target market (0-25)
> 2. Track record comercial verificable (0-25)
> 3. Conocimiento del mercado de formación/consultoría (0-25)
> 4. Disponibilidad y motivación (0-25)

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Quincenalmente, durante el bloque "Sales Talent Scouting" (45-60 min).
- **Pre-ritual:** ¿Hay territorios con demanda activa pero sin cobertura? ¿El mapa territorial está actualizado? ¿Hay feedback de clientes sobre zonas desatendidas? Si no hay señales frescas, primero ejecutar refresh de señales.
- **Contexto:** Los representantes comerciales son la fuerza de ventas externa de MetodologIA. A diferencia de los embajadores (que enseñan y multiplican), los reps VENDEN. Buscamos profesionales con red en el territorio target, experiencia en ventas consultivas de alto ticket, y alineación con el mercado de formación/consultoría. El scouting es proactivo — no esperamos que postulen.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Identificar ≥3 candidatos quincenales con potencial de representante comercial, scorearlos en 4 dimensiones y verificar territorio.
- **Definición de Éxito (DoD):**
  - [ ] ≥3 candidatos con Sales_Score calculado
  - [ ] Territorio verificado sin overlap con embajadores
  - [ ] Top candidates taggeados como "Rep_Candidate" en CRM
  - [ ] Tareas de R02 creadas para candidatos Ready
- **Definición de Éxito del Pipeline:** "La red comercial crece estratégicamente, cubriendo territorios de alta demanda sin canibalizar embajadores."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Define territorios prioritarios y aprueba candidatos |
| **Responsible** | Growth Lead / AI Agent | Ejecuta búsqueda, scoring y preparación de lista |

| **Consulted** | Ops | Valida mapa territorial y overlap |
| **Informed** | Content Lead | Sabe qué territorios se están cubriendo |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Mapa territorial actualizado (embajadores activos + reps activos + zonas vacantes)
- [ ] Perfil de Representante Ideal documentado (skills, experiencia, mercado)
- [ ] CRM con campos: Sales_Score, Network_Score, Track_Score, Market_Score, Availability_Score, Territory_Check
- [ ] LinkedIn Sales Navigator con filtros de búsqueda configurados

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Mapa territorial | Drive | Ops |
| Perfil de Representante Ideal | Drive — Comercial | Sales Director |
| Señales de demanda por territorio | CRM / Analytics | Growth Lead |

---

## 5. Ejecutar — Parte 1: Detección y Scoring

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)
> Cada micro-paso = 1 acción principal → 1 output verificable

### 5.1 — Identificar territorios con demanda no cubierta

**Contexto:** El scouting inicia por la demanda, no por los candidatos. Primero identificamos DÓNDE necesitamos cobertura, luego buscamos QUIÉN la puede dar.

**Acción:** Revisar mapa territorial: ¿dónde hay señales de demanda (leads entrantes, downloads, eventos) pero no hay embajador ni representante activo?
**Output:** Lista de territorios prioritarios (target: 2-3 por ciclo).

**Evidencia:** Mapa territorial marcado.

### 5.2 — Buscar perfiles comerciales en territorios target

**Contexto:** LinkedIn Sales Navigator es la fuente primaria. Buscamos vendedores consultivos, no vendedores transaccionales.

**Acción:** LinkedIn Sales Navigator: filtrar por territorio + keywords: "ventas consultivas", "business development", "formación empresarial", "consultoría", "servicios profesionales".
**Script de búsqueda:** Filtros: Territorio target + Industry: Management Consulting, Professional Training, E-Learning + Seniority: Manager, Director, VP.

**Output:** Lista de candidatos brutos (target: ≥10).
**Evidencia:** LinkedIn — búsqueda guardada.

### 5.3 — Evaluar Dimensión 1: Red de Contactos en Target Market (0-25)

**Contexto:** Un rep sin red necesita construirla desde cero. Un rep con red empieza a vender desde día 1.

**Acción:** ¿Cuántas conexiones tiene en el target market? ¿Publica contenido? ¿Tiene engagement de decisores? ¿Lo taggen en conversaciones de negocio?
**Script:** Criterio:

- 0-10: Red pequeña o fuera del target
- 11-18: Red media con algunos decisores
- 19-25: Red amplia con decisores activos en target market

**Output:** Network_Score: [X]/25 por candidato.
**Evidencia:** CRM.

### 5.4 — Evaluar Dimensión 2: Track Record Comercial (0-25)

**Contexto:** Los resultados pasados son el mejor predictor de resultados futuros. Buscamos evidencia verificable, no claims.

**Acción:** ¿Ha vendido servicios de alto ticket antes? ¿Puede nombrar cuentas, montos, o resultados? ¿Ha trabajado con ciclos de venta de 2-6 meses?
**Script:** Criterio:

- 0-10: Sin track record en servicios similares
- 11-18: Experiencia en ventas pero de productos distintos
- 19-25: Track record probado en consultoría/formación de alto ticket

**Output:** Track_Score: [X]/25 por candidato.
**Evidencia:** CRM.

### 5.5 — Evaluar Dimensión 3: Conocimiento del Mercado (0-25)

**Contexto:** Un rep que no entiende el mercado de formación y consultoría no puede hacer discovery efectivo.

**Acción:** ¿Habla el idioma del buyer (ROI de capacitación, TCO de consultoría, métricas de transformación)? ¿Entiende la dinámica del mercado (estacionalidad, presupuestos, regulaciones)?
**Script:** Criterio:

- 0-10: Desconoce el mercado
- 11-18: Conocimiento superficial
- 19-25: Conocimiento profundo con visión de tendencias

**Output:** Market_Score: [X]/25 por candidato.
**Evidencia:** CRM.

### 5.6 — Evaluar Dimensión 4: Disponibilidad y Motivación (0-25)

**Contexto:** Entusiasmo sin disponibilidad = frustración. Un rep part-time puede funcionar, pero necesita ≥15h/mes dedicadas.

**Acción:** ¿Es su actividad principal o secundaria? ¿Puede dedicar ≥15h/mes? ¿Qué lo motiva — ingreso variable, crecimiento profesional, autonomía?
**Script:** Criterio:

- 0-10: Sin tiempo claro o motivación financiera únicamente
- 11-18: Actividad secundaria con disponibilidad parcial
- 19-25: Actividad principal o dedicación seria confirmada

**Output:** Availability_Score: [X]/25 por candidato.
**Evidencia:** CRM.

### 5.7 — Calcular Sales_Score (0-100) + verificar territorio

**Contexto:** El score numérico objetiva la decisión. El territorio check evita canibalización con embajadores.

**Acción:** Sumar 4 dimensiones. ADEMÁS: verificar en mapa territorial que el candidato no opera en zona ya cubierta por embajador o rep activo.
**Output:** Sales_Score + Territory_Check: Clear / Overlap.

**Evidencia:** CRM + mapa territorial.

### 5.8 — Filtrar candidatos con Score ≥ 60 y Territory_Check = Clear

**Contexto:** Score < 60 o territorio con overlap = no avanza. Pero se registra para análisis y posible re-evaluación futura.

**Acción:** Clasificar:

- **Ready** (Score ≥ 75 + Clear): Avanza a R02
- **Promising** (Score 60-74 + Clear): Re-evaluar en 2 meses
- **Not Fit** (Score < 60 o Overlap): Archivar con motivo

**Output:** Lista clasificada.
**Evidencia:** CRM — campo Rep_Status.

### 5.9 — Usar IA para generar resumen de candidatos Ready

**Prompt de IA:**

```markdown

PROMPT:
"Analiza estos candidatos a Representante Comercial MetodologIA:
Por cada uno: nombre, territorio, Sales_Score (Network + Track + Market + Availability), territorio status.

Genera resumen de 3 líneas por candidato: fortaleza principal, riesgo principal, y recomendación (Ready/Promising/Not Fit).
Tono: analítico, directo, cero adornos."
```

**Output:** Resumen IA por candidato Ready.

**Evidencia:** CRM — texto guardado.

### 5.10 — Registrar candidatos y crear tareas R02 para Ready

**Acción:** Para cada candidato Ready: taggear como "Rep_Candidate" en CRM. Crear tarea: "Evaluar Perfil Comercial — [nombre]" (Ritual 02).

**Output:** Tareas R02 creadas.
**Evidencia:** CRM — tareas activas.

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Verificar mapa territorial con pipeline actualizado

**Contexto:** El mapa debe reflejar no solo reps/embajadores activos sino también candidatos en pipeline.

**Acción:** Agregar candidatos Ready y Promising al mapa con status de pipeline.
**Output:** Mapa territorial actualizado con pipeline.

**Evidencia:** Drive — mapa.

### 6.2 — Priorizar candidatos por impacto territorial

**Acción:** Ordenar Ready por: Sales_Score × Territory_Priority. Candidato en zona vacante de alta demanda = prioridad absoluta.

**Output:** Ranking priorizado.
**Evidencia:** Lista ordenada en CRM.

### 6.3 — Research profundo de top candidates (LinkedIn deep dive)

**Acción:** Para cada top 3: revisar trayectoria reciente, employers, publicaciones, endorsements, mutual connections.

**Output:** Contexto profesional detallado.
**Evidencia:** CRM — nota "LinkedIn deep dive".

### 6.4 — Validar fuentes de ingreso del candidato (compatibilidad)

**Contexto:** Un rep que representa marcas competidoras genera conflicto de interés.

**Acción:** ¿Qué otras marcas/productos representa actualmente? ¿Hay conflicto de interés directo? ¿La representación de MetodologIA es complementaria o competitiva con su portafolio?
**Output:** Compatibility check: Compatible / Conflict.

**Evidencia:** Nota.

### 6.5 — Decisión colegiada: Sales Director + Growth Lead

**Acción:** Reunión de 15 min para revisar top candidates y decidir: Invite / Develop / Pass.

**Output:** Decisión colegiada por candidato.
**Evidencia:** CRM — campo Decision_Status.

### 6.6 — Preparar plan de cultivo para Promising

**Acción:** Para cada Promising: identificar gap principal (ej: "necesita más red en el territorio" o "sin track record en servicios") y definir acción de cultivo.

**Output:** Plan de cultivo con fecha de re-evaluación (2 meses).
**Evidencia:** CRM — tarea programada.

### 6.7 — Registrar motivo de Not Fit para análisis

**Acción:** ¿Por qué no califica? ¿Hay un patrón? Esto retroalimenta el perfil de Representante Ideal.

**Output:** Insight registrado por Not Fit.
**Evidencia:** CRM — nota.

### 6.8 — Preparar approach personalizado para Invite

**Script:** "Hola [nombre]. He seguido tu trayectoria en [sector] y tu red en [territorio]. Estamos buscando un representante comercial para cubrir esa zona con nuestra oferta de formación/consultoría. ¿Te interesa una conversación de 20 min para explorar?"

**Output:** Approach personalizado listo.
**Evidencia:** Borrador guardado.

### 6.9 — Enviar approach y registrar en CRM

**Acción:** Enviar por canal preferido del candidato (LinkedIn DM o email). Registrar fecha + canal + mensaje.

**Output:** Approach enviado.
**Evidencia:** CRM — nota "Approach sent" + timestamp.

### 6.10 — Registrar métricas del ciclo

**Acción:** Registrar: # perfiles evaluados, # Ready/Promising/Not Fit, territorios cubiertos vs vacantes, funnel conversion.

**Output:** Métricas del ciclo.
**Evidencia:** Dashboard.

---

## 7. Ejecutar — Parte 3: Producción y Consolidación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Tracking de respuestas a approaches enviados

**Acción:** Monitorear respuestas a los approaches. Marcar en CRM: Responded / No Response / Declined.

**Output:** Status de respuesta actualizado.
**Evidencia:** CRM.

### 7.2 — Seguimiento a no-respuestas (follow-up a 5 días)

**Script:** "Hola [nombre], quería asegurarme de que viste mi mensaje sobre la representación en [territorio]. Entiendo que estás ocupado — si prefieres, te envío un one-pager con el modelo y conversamos cuando te funcione."

**Output:** Follow-up enviado.
**Evidencia:** CRM — nota.

### 7.3 — Agendar R02 para candidatos que respondieron positivamente

**Acción:** Crear tarea: "Evaluar Perfil Comercial — [nombre]" con fecha de sesión confirmada.

**Output:** Sesión R02 agendada.
**Evidencia:** CRM — tarea + calendario.

### 7.4 — Actualizar perfil de Representante Ideal basado en aprendizajes

**Contexto:** Cada ciclo de scouting revela qué funciona y qué no. El perfil ideal se calibra continuamente.

**Acción:** ¿Los candidatos Ready comparten características no previstas? ¿Hay una dimensión que predice mejor el éxito?
**Output:** Ajuste al perfil ideal.

**Evidencia:** Doc actualizado.

### 7.5 — Verificar que todo candidato evaluado tiene registro completo

**Acción:** Cruzar lista de evaluados vs registros CRM. Verificar campos: 4 scores, territory check, decision, motivo.

**Output:** 0 candidatos huérfanos.
**Evidencia:** CRM — query de verificación.

### 7.6 — Generar reporte quincenal de Sales Pipeline

**Acción:** Compilar: # candidatos evaluados, # Ready/Promising/Not Fit, territorios cubiertos, pipeline growth rate.

**Output:** Reporte de 1 página.
**Evidencia:** Drive — reporte archivado.

### 7.7 — Compartir insights territoriales con equipo

**Acción:** Enviar 3 bullet points al equipo: "Los territorios con más demanda son [X]. Los mejores candidatos vienen de [Y]. Gap principal: [Z]."

**Output:** Insights compartidos.
**Evidencia:** Slack/email.

### 7.8 — Archivar datos del ciclo para análisis longitudinal

**Acción:** Guardar lista de evaluados + scores + decisiones en Drive para tracking trimestral.

**Output:** Archivo del ciclo.
**Evidencia:** Drive — carpeta de scouting reps.

### 7.9 — Verificar pipeline health: diversidad territorial

**Acción:** ¿Hay concentración excesiva en una zona? ¿Hay zonas sin ningún candidato en pipeline?

**Output:** Pipeline health assessment.
**Evidencia:** Dashboard.

### 7.10 — Cerrar bloque y definir ajustes para siguiente ciclo

**Acción:** Registrar aprendizajes del ciclo: qué criterios afinar, qué canales explorar, qué territorios priorizar.

**Output:** Log de cierre con ajustes.
**Evidencia:** Nota en log de operaciones.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Todos los candidatos evaluados tienen 4 scores completos en CRM
- [ ] Territory check ejecutado contra mapa de embajadores y reps activos
- [ ] Cada score tiene criterio documentado (no es "feeling")
- [ ] Candidatos Invite tienen approach personalizado (no template genérico)
- [ ] No se usó "gratis/gratuito" en ninguna comunicación
- [ ] Vocabulario consistente con Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| ≥3 candidatos evaluados | ☐ | CRM query |
| Sales_Score calculado (4 dimensiones) | ☐ | CRM campos |
| Territory_Check ejecutado | ☐ | Mapa territorial |
| Decisión colegiada registrada | ☐ | CRM nota |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Candidatos con Sales_Score | CRM records | CRM | Growth Lead |
| Resúmenes IA por candidato | Texto | CRM notas | AI Agent |
| Mapa territorial actualizado | Mapa visual | Drive | Ops |
| Reporte quincenal de pipeline | 1 página | Drive | Sales Director |

### Registro en CRM

- **Campos actualizados:** Sales_Score, Network_Score, Track_Score, Market_Score, Availability_Score, Territory_Check, Rep_Status, Decision_Status
- **Valor registrado:** Score completo + decisión + territorio
- **Timestamp:** Automático al guardar

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [02-evaluar-perfil-comercial](02-evaluar-perfil-comercial-ritual.md)
- **Datos que hereda:** Sales_Score, resumen IA, territorio target, approach enviado
- **Condición de handoff:** Sales_Score ≥ 75 + Territory_Check = Clear + decisión colegiada = Invite + approach respondido

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Pipeline de Representantes (trimestral) | — | ≥5 | 🟡 |
| Ready Rate (% evaluados con Score ≥ 75) | — | ≥25% | 🟡 |
| Territorios cubiertos | — | +2/trimestre | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 02 → evaluar-perfil-comercial`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Sales Rep Scout Engine" (Prompt Pro)

**Use case:** Para evaluar candidatos en lote o cuando necesitas ampliar búsqueda.

```markdown
PROMPT:
"Evalúa estos [N] candidatos a Representante Comercial MetodologIA:
Por cada uno: nombre, territorio, red de contactos, experiencia de ventas, mercado de especialización.
Evalúa 4 dimensiones (0-25):
1. Red de contactos en target market (cantidad + calidad de decisores)
2. Track record comercial en servicios de alto ticket (resultados verificables)
3. Conocimiento del mercado de formación/consultoría (idioma del buyer)
4. Disponibilidad y motivación (tiempo real, no aspiracional)
Output: tabla con scores + Sales_Score total + recomendación (Ready/Promising/Not Fit) + verificación de territorio.

Tono: analítico, directo, zero-hype."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
