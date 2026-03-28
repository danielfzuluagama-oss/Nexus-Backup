---
id: "03"

segmento: "empresas-enterprise"
journey: "discovery"
sop: "sop-03-discovery"
ritual-slug: "03-mapear-stakeholders"
version: "v1.0.0"
estado: "Piloto"
owners: [{dri: "Enterprise Sales", backup: "AI Agent"}]
entry-criteria: ["BANT ≥ 60 (Ritual 02)"]
exit-criteria: ["Stakeholder map completo: champion, decisor, influencer, blocker, end user"]
kpi: "Stakeholder Map Accuracy (Target: ≥80%)"
---

# Ritual: Mapear Stakeholders — Empresas/Enterprise (Sovereign v4.1)

> [!IMPORTANT]
> **ESTE ritual NO existe en PyME.** En enterprise hay 4-5 roles que influyen la decisión:
>
> - **Champion:** Quien empuja internamente (DirRH, Dir. Formación)
> - **Decisor:** Quien firma (VP, C-level)
> - **Influencer:** Quien opina (pares del champion)
> - **Blocker:** Quien puede frenar (Finance, Procurement, IT)
> - **End User:** Quien recibe el programa (equipos)

---

## 5. Ejecutar

### 5.1 — Research + champion intel

**Prompt:** "Mapea la estructura organizacional de [empresa] (100-1,000 empleados). Identifica: DirRH, Dir. Formación, VP relevante, CFO, Head of Procurement. LinkedIn URLs si están disponibles."

### 5.2 — Co-mapear con el champion

**Script:** "[champion], para que la propuesta avance internamente: ¿quién más necesita estar convencido? ¿Quién firma? ¿Quién podría frenar esto?"

**Output:** Stakeholder map co-validated.

### 5.3-5.10 — [Estrategia por stakeholder, armas para el champion, métricas]

---

## 6-10. [Estándar v4.1]

### Cierre

- **NEXT:** `empresas-enterprise → 04 → ejecutar-discovery-multi-stakeholder`

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Enterprise
