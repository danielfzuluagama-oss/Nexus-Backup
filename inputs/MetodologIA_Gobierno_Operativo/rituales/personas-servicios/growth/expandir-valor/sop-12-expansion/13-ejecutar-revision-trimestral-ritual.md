---
id: "13"

segmento: "personas-servicios"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "13-ejecutar-revision-trimestral"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Consultant Lead"
frecuencia: "trimestral"
herramientas:

- "CRM"
- "Google Slides"
- "Google Sheets"

entry-criteria:

- "≥3 clientes activos en el pipeline"
- "Datos de programa actualizados en CRM"
exit-criteria:

- "Revisión ejecutada con métricas de todos los clientes activos"
- "Portfolio health score calculado"
- "Acciones Q+1 definidas"

kpi: "Portfolio Health Score (Target: ≥80/100)"
riesgos-controles:

- riesgo: "Operamos a ciegas sin revisar el portafolio"

control: "Revisión trimestral obligatoria del pipeline y resultados"

- riesgo: "Recency bias (solo ver los últimos clientes)"

control: "Revisión de TODOS los clients activos, incluyendo los silenciosos"
evidencias:

- "Portfolio review deck"
- "Health score por cliente"
- "Q+1 action plan"
---

# Ritual: Ejecutar Revisión Trimestral — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Objetivo:** Revisión macro del portafolio de servicios consultivos. No es una QBR de un cliente — es el health check del NEGOCIO de servicios.
> **Portfolio Health Score = 5 dimensiones:**
>
> 1. Revenue Pipeline (30%)
> 2. Client Outcome Rate (25%)
> 3. NPS promedio (20%)
> 4. Retention / Renewal Rate (15%)
> 5. Referral Rate (10%)

---

## 5. Ejecutar

### 5.1-5.5 — [Compilar métricas de todos los clientes activos, calcular Health Score por cliente y promedio del portfolio, identificar clientes at-risk (NPS < 7 + outcome gaps), identificar expansion opportunities, detectar capacity constraints (# sesiones/semana)]

### 5.6-5.10 — [Construir review deck, presentar al equipo, definir acciones Q+1 (nuevos clientes, renovaciones, expansions), ajustar pricing si hay patrones, calibrar oferta de servicios vs demand]

---

## 6-10. [Análisis profundo, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 14 → proponer-expansion-servicio`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Portfolio Health Dashboard" (Prompt Pro)

```markdown
PROMPT:
"Genera un análisis de salud del portafolio de servicios consultivos MetodologIA.
Clientes activos: [N]. Datos por cliente: NPS, revenue, completion rate, renewal status.
Calcula:
1. Portfolio Health Score (5 dimensiones ponderadas)
2. Top 3 clientes con riesgo (red flags)
3. Top 3 oportunidades de expansión
4. Revenue forecast Q+1
5. Recomendaciones de acción (3 prioridades)
Formato: reporte ejecutivo de 1 página."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
