---
id: "17"

segmento: "representantes-comerciales"
journey: "advocacy"
proceso: "multiplicar"
sop: "sop-16-referidos"
ritual-slug: "17-escalar-cobertura-territorial"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "semestral"
herramientas:

- "CRM"
- "Google Sheets"
- "Mapa territorial"

entry-criteria:

- "≥5 reps activos con coverage data"

exit-criteria:

- "Mapa territorial actualizado"
- "White spaces identificados y priorizados"
- "Plan de expansión aprobado"

kpi: "Territory Coverage (Target: ≥60% de territorios viables cubiertos)"
leading-indicators:

- "# territorios cubiertos vs total viables"
- "Revenue per territory"
- "White spaces con demanda verificada"

riesgos-controles:

- riesgo: "Expandir territorios sin reps calificados"

  control: "Solo abrir territorio si hay candidato viable (R01 Score ≥ 60)"

- riesgo: "Over-coverage en territorios premium, 0 en secundarios"

  control: "Balance obligatorio: ≥1 rep en cada región tier-1"
evidencias:

- "Territory coverage map actualizado"
- "White space list priorizada"
- "Expansion plan aprobado"
---

# Ritual: Escalar Cobertura Territorial — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **Scaling territorial es el ritual de ESTRATEGIA del segmento.** No es operativo — es directivo.
> **4 preguntas:** ¿Dónde estamos? ¿Dónde no estamos? ¿Dónde deberíamos estar? ¿Con quién?

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Semestralmente, como parte del planning estratégico del programa de reps.
- **Pre-ritual:** ¿Data territorial actualizada? ¿Revenue por territorio consolidado? ¿Pipeline de candidatos de R01 disponible?
- **Contexto:** El scaling territorial es la estrategia de crecimiento del programa de reps. No se trata de agregar más reps — se trata de cubrir los territorios correctos con las personas correctas. Cada white space con demanda verificada es una oportunidad perdida.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Evaluar la cobertura territorial actual, identificar white spaces, y definir plan de expansión priorizado.
- **Definición de Éxito (DoD):**
  - [ ] Mapa territorial actualizado con performance data
  - [ ] White spaces identificados y priorizados
  - [ ] Plan de expansión aprobado por Sales Director
  - [ ] R01 activado para territorios priorizados

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Decide prioridades de expansión |
| **Responsible** | Growth Lead | Analiza data y prepara plan |

| **Consulted** | Reps actuales | Insights de terreno |
| **Informed** | Finance | Budget para nuevos reps |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Data territorial actualizada (revenue, coverage, performance por zona)
- [ ] Señales de demanda por territorio (leads, downloads, eventos)
- [ ] Pipeline de candidatos de R01 (si existe)
- [ ] Budget de expansión confirmado (o en process)

---

## 5. Ejecutar — Parte 1: Análisis y Planificación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Actualizar mapa territorial con data de performance

**Acción:** Por cada territorio cubierto: rep asignado, quota, attainment, revenue, # deals, win rate.

**Output:** Mapa actualizado con performance data.
**Evidencia:** Sheet.

### 5.2 — Identificar white spaces (territorios sin cobertura con demanda)

**Acción:** Territorios con señales de demanda (leads, downloads, eventos, market research) pero sin rep.

**Output:** White space list priorizada.
**Evidencia:** Sheet.

### 5.3 — Evaluar viabilidad de expansión con IA

**Prompt de IA:**

```markdown

PROMPT:
"Analiza estos territorios para expansión de representantes comerciales:
Territorios cubiertos: [lista con rep, quota, attainment].
Territorios sin cobertura: [lista con revenue potencial estimado].
Genera:
1. Heat map de prioridad (high/medium/low) por white space
2. # de reps adicionales necesarios
3. Perfil de rep ideal por territorio
4. Timeline recomendado
Output: expansion plan priorizado."
```

**Output:** Expansion plan.

**Evidencia:** Doc.

### 5.4 — Priorizar: ¿cuáles white spaces primero?

**Acción:** Criterios: revenue potential × demand signals × candidate availability.

**Output:** Top 3 territorios priorizados.
**Evidencia:** Sheet.

### 5.5 — Evaluar performance de territorios actuales

**Acción:** ¿Algún territorio está underperforming? ¿El rep no funciona o el territorio no funciona?

**Output:** Territory health assessment.
**Evidencia:** Sheet.

### 5.6 — Decidir: ¿reasignar territorios underperforming?

**Acción:** Si un territorio underperforma por el rep (no por el mercado): considerar reasignación.

**Output:** Reasignment decision (si aplica).
**Evidencia:** Nota.

### 5.7 — Definir plan de expansión (aprobado por Sales Director)

**Acción:** Plan: territorios a abrir, perfil de rep necesario, timeline, budget.

**Output:** Expansion plan aprobado.
**Evidencia:** Doc.

### 5.8 — Activar R01 para territorios priorizados

**Acción:** Crear tareas R01 para iniciar scouting en los territorios priorizados.

**Output:** R01 activados.
**Evidencia:** CRM.

### 5.9 — Conectar con pipeline de candidatos existente

**Acción:** ¿Hay candidatos en la lista de Promising (R01) que cubran los territorios priorizados?

**Output:** Pipeline cross-check.
**Evidencia:** CRM.

### 5.10 — Registrar métricas R17

**Output:** Métricas semestrales. **Evidencia:** Dashboard.

---

## 6-7. Ejecutar — Parte 2 y 3: Ejecución y Consolidación

### 6.1-6.5 — Monitorear ejecución del plan de expansión, conectar con R01

### 6.6-6.10 — Comparar coverage actual vs target, ajustar plan

### 7.1-7.5 — Generar reporte de cobertura territorial, compartir con board

### 7.6-7.10 — Archivar, documentar aprendizajes, cerrar ciclo

---

## 8. Validación y Calidad (QA)

- [ ] Mapa territorial con data actualizada
- [ ] White spaces identificados con demanda verificada
- [ ] Plan de expansión aprobado
- [ ] R01 activado para top priorities

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Territory coverage map | Sheet/visual | Drive | Growth Lead |
| White space analysis | Sheet | Drive | Growth Lead |
| Expansion plan | Doc | Drive | Sales Director |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [18-auditar-etica-y-compliance-comercial](../../governance/gobernar-ecosistema/sop-18-gobernanza/18-auditar-etica-y-compliance-comercial-ritual.md)
- **Condición de handoff:** Expansion plan aprobado + R01 activados

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Territory Coverage | ≥60% viables | 🟡 |
| White space conversion | ≥2/semestre | 🟡 |

- **NEXT:** `representantes-comerciales → 18 → auditar-etica-y-compliance-comercial`
- **BLOCKERS:** `NONE`

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
