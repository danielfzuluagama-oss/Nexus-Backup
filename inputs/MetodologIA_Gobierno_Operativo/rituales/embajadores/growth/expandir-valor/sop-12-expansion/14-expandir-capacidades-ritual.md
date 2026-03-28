---
id: "14"

segmento: "embajadores"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "14-expandir-capacidades"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Content Lead"
- backup: "Growth Lead"
frecuencia: "por-evento (post QBR o al lanzar nuevo módulo)"
herramientas:

- "CRM"
- "Google Drive"
- "Zoom"

entry-criteria:

- "QBR completada (Ritual 13)"
- "Performance Score ≥70"
- "Demanda identificada en el territorio"
- "Embajador solicita o muestra capacidad para expansión"
exit-criteria:

- "Nuevo módulo/servicio autorizado"
- "IP adicional transferida con checklist"
- "Mini-certificación del nuevo módulo aprobada"

kpi: "Capability Expansion Rate (Target: ≥40% de embajadores expanden ≥1 módulo/año)"
riesgos-controles:

- riesgo: "Expandir sin demanda comprobada"

control: "Opportunity sizing del nuevo módulo en la zona"

- riesgo: "Expandir sin competencia verificada"

control: "Mini-certificación obligatoria para cada módulo nuevo"

- riesgo: "Demasiados módulos diluyen la calidad"

control: "Máximo 1 módulo nuevo por trimestre"
evidencias:

- "New module authorization"
- "Additional IP transfer checklist"
- "Mini-certification scores"
---

# Ritual: Expandir Capacidades — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Modelo de expansión:** Módulo base → Módulo avanzado → Nuevo dominio temático → Territorio adicional. Cada expansión requiere: (1) demanda comprobada, (2) competencia del embajador, (3) IP transfer adicional con checklist.

---

## 5. Ejecutar — Parte 1: Evaluar Oportunidad de Expansión

### 5.1 — Identificar oportunidad (fuente: QBR, mercado, o solicitud)

**Contexto:** Las oportunidades de expansión vienen de 3 fuentes: (1) La QBR reveló demanda no cubierta en la zona, (2) MetodologIA lanza un nuevo módulo, (3) El embajador lo solicita proactivamente.

**Acción:** Documentar la oportunidad con datos: ¿qué módulo? ¿hay demanda? ¿el embajador tiene base?
**Output:** Oportunidad documentada.

**Evidencia:** CRM.

### 5.2 — Opportunity sizing del nuevo módulo en la zona

**Prompt de IA:**

```markdown

PROMPT:
"Evalúa la oportunidad de expansión para un embajador MetodologIA.
Embajador: [nombre], Zona: [X], Módulo actual: [Y].
Nuevo módulo propuesto: [Z].
Analiza:
1. ¿Hay demanda para [Z] en [zona]? (datos de mercado)
2. ¿La base de clientes actuales del embajador necesita [Z]?
3. ¿Hay competencia para [Z] en la zona?
4. Revenue incremental estimado
Formato: reporte de 5 puntos. Recomendación: Expand / Wait / Skip."
```

**Output:** Opportunity sizing completado.

**Evidencia:** Reporte.

### 5.3 — Evaluar readiness del embajador

**Acción:** ¿El embajador tiene Performance Score ≥70? ¿Su módulo actual es sólido? ¿Tiene tiempo para un módulo más?

**Output:** Readiness: Ready / Not Ready + razón.
**Evidencia:** CRM.

### 5.4 — Aprobación de Sales Director

**Acción:** Presentar caso de expansión con datos.

**Output:** Expansion approved / Denied.
**Evidencia:** CRM.

### 5.5-5.10 — [Si approved: diseñar mini-certificación para nuevo módulo, transferir IP adicional con checklist firmado (mini R10), entrenar en nuevo módulo (sesión 1:1 o cohorte), supervisar primer caso del módulo nuevo, actualizar licencia si cambia el alcance, registrar métricas]

---

## 6. Ejecutar — Parte 2: Mini-Certificación y Activación

### 6.1 — Mini-certificación (versión light de R11)

**Contexto:** No es una certificación completa — es una validación focalizada en el nuevo módulo.

**Acción:** Quiz de 10 preguntas + 1 role-play de 15 min del nuevo módulo.
**Output:** Mini-cert: Pass / Fail.

**Evidencia:** Scores.

### 6.2-6.10 — [Si Pass: activar módulo en CRM, actualizar Territory Map, primer shadow del nuevo módulo, revenue impact tracking, comunicar a la red, celebrar expansión, retroalimentar programa de expansión, actualizar IP kit, métricas]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 15 → renovar-licencia-anual` (cuando aplique)
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Expansion Decision Engine" (Prompt Pro)

```markdown
PROMPT:
"Evalúa si un embajador MetodologIA debería expandir su dominio.
Performance Score actual: [X]/100.
Módulo actual: [Y]. Módulo propuesto: [Z].
Zona: [A]. Clientes actuales: [N].
Analiza:
1. ¿El Performance Score justifica la confianza? (≥70 = sí)
2. ¿Hay evidence de demanda? (leads no atendidos, solicitudes)
3. ¿El embajador tiene tiempo? (<20h/mes dedicadas actualmente)
4. Revenue incremental projections (conservador/esperado/optimista)
Output: recomendación con justificación en 5 bullets."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
