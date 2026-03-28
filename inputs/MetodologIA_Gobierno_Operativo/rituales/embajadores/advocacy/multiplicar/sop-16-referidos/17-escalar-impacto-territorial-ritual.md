---
id: "17"

segmento: "embajadores"
journey: "advocacy"
proceso: "multiplicar"
sop: "sop-16-referidos"
ritual-slug: "17-escalar-impacto-territorial"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "trimestral"
herramientas:

- "CRM"
- "Google Slides"
- "Perplexity"
- "Google Maps"
entry-criteria:

- "Red con ≥5 embajadores activos"
- "Datos de territorio y demand disponibles"
exit-criteria:

- "Mapa de cobertura actualizado"
- "Zonas no cubiertas identificadas y priorizadas"
- "Plan de reclutamiento para gaps definido"

kpi: "Territory Coverage (Target: ≥70% de zonas estratégicas con embajador activo)"
riesgos-controles:

- riesgo: "Expansión sin profundidad (muchas zonas, poco impacto)"

control: "Priorizar penetración en zonas existentes antes de abrir nuevas"

- riesgo: "Reclutamiento reactivo (esperar que lleguen)"

control: "Territorial scaling proactivo basado en datos de demanda"
evidencias:

- "Territory coverage map"
- "Gap analysis report"
- "Recruitment pipeline"
---

# Ritual: Escalar Impacto Territorial — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Doble loop:** Más embajadores en zonas con demanda → más clientes → más revenue → más embajadores. El escalamiento territorial es la máquina de crecimiento de la red.

---

## 5. Ejecutar — Parte 1: Mapeo y Análisis

### 5.1 — Actualizar mapa de cobertura actual

**Contexto:** El mapa cruza embajadores × zonas × dominios. Debe visualizarse para tomar decisiones.

**Acción:** Actualizar Mapa de Nodos con datos actuales: quién está dónde, con qué módulos, con cuántos clientes.
**Output:** Mapa actualizado.

**Evidencia:** Drive.

### 5.2 — Cruzar con datos de demanda

**Acción:** ¿Dónde hay leads no atendidos? ¿Dónde hay búsquedas sin conversión? ¿Dónde preguntan y no tenemos presencia?

**Prompt de IA:**

```markdown
PROMPT:
"Analiza la distribución de demanda vs cobertura de la Red de Embajadores MetodologIA:
Zonas con embajador: [lista con # clientes y revenue]
Zonas sin embajador: [lista con leads no atendidos]
Identifica:
1. Top 3 zonas de alta demanda sin embajador (priorizar reclutamiento)
2. Top 3 zonas con embajador pero bajo rendimiento (investigar)
3. Zonas con sobreposición ineficiente
4. Revenue potencial de cerrar los gaps
Formato: análisis con recomendaciones priorizadas."
```

**Output:** Gap analysis completado.

**Evidencia:** Reporte.

### 5.3 — Identificar zonas high-demand sin embajador

**Acción:** Las zonas con demanda demostrada pero sin presencia son la prioridad #1 de reclutamiento.

**Output:** Top zones prioritarias.
**Evidencia:** Mapa con gaps marcados.

### 5.4 — Priorizar by revenue potential

**Acción:** Estimar revenue potencial de cada gap zone. Priorizar por impacto.

**Output:** Ranking de zonas por opportunity.
**Evidencia:** Tabla.

### 5.5 — Retroalimentar Ritual 01 con zonas prioritarias

**Script al Growth Lead:** "Estas son las 3 zonas donde más urgimos embajadores: [X, Y, Z]. Ajusta tu Talent Scouting para buscar candidates en estas zonas."

**Output:** Dirección de reclutamiento ajustada.
**Evidencia:** CRM — tarea.

### 5.6-5.10 — [Evaluar capacidad de embajadores existentes para expandir zona, analizar performance por territorio, detectar sobreposiciones ineficientes, proponer reorganización si necesario, registrar métricas de coverage rate]

---

## 6. Ejecutar — Parte 2: Planning y Presentación

### 6.1 — Presentar plan de escalamiento en QBR de la red

**Acción:** En la reunión trimestral de la red (si existe) o al equipo interno: presentar el mapa, los gaps, las prioridades, y el revenue potencial.

**Output:** Plan presentado y aprobado.
**Evidencia:** Slides.

### 6.2-6.10 — [Definir targets de reclutamiento por zona, timeline de cobertura, resources needed, project revenue impact, partner opportunities, market intelligence insights, quarterly territory review, dashboard update, plan de acción Q+1 territorial]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 18 → auditar-compliance-y-calidad`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Territory Strategy Map" (Prompt Pro)

```markdown
PROMPT:
"Genera un análisis estratégico territorial para la Red de Embajadores MetodologIA.
Datos actuales: [N embajadores, X zonas cubiertas, Y zonas vacías].
Para cada zona cubierta: embajador, clientes, revenue, NPS.
Para cada zona vacía: leads no atendidos, demanda estimada.
Produce:
1. Heatmap de demanda vs cobertura (descripción para mapa visual)
2. Top 3 zonas de prioridad de reclutamiento con justificación
3. Top 3 oportunidades de reorganización territorial
4. Revenue incremental proyectado si se cubren las top 3 zonas
Formato: reporte ejecutivo de 2 páginas."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
