---
id: "14"

segmento: "personas-servicios"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "14-proponer-expansion-servicio"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-evento (post programa completo o mid-program expansion)"
herramientas:

- "CRM"
- "Google Docs"
- "Zoom"

entry-criteria:

- "Cliente completó programa con outcome achievement ≥75%"
- "O: dolor adyacente identificado durante el programa"
exit-criteria:

- "Propuesta de expansión presentada (nuevo programa o retainer)"
- "Decisión del cliente documentada"
kpi: "Expansion Rate (Target: ≥30% de clientes se expanden)"
riesgos-controles:

- riesgo: "Percepción de upselling forzado"

control: "La expansión solo se propone si hay dolor REAL no atendido"

- riesgo: "Expandir sin resultado comprobado del programa actual"

control: "Outcome achievement ≥75% como prerequisito"
evidencias:

- "Expansion proposal"
- "Client decision"
---

# Ritual: Proponer Expansión de Servicio — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Principio:** La expansión se GANA con resultados, no se pide con ventas. Si el programa actual produjo resultados, la expansión se sugiere naturalmente.
> **3 tipos de expansión:** (1) Programa avanzado (depth), (2) Programa de dominio nuevo (breadth), (3) Retainer (continuidad).

---

## 5. Ejecutar

### 5.1 — Identificar señales de expansión durante el programa

**Contexto:** Las señales aparecen naturalmente: "¿y esto aplica también para [dominio adyacente]?" o "Cuando terminemos, ¿puedo seguir contigo?"

**Acción:** Registrar señales de expansión durante R10 y R11.
**Output:** Expansion signals log.

**Evidencia:** CRM.

### 5.2 — Post-programa: conversación de continuidad (no de venta)

**Script:** "[nombre], tu programa terminó y tus resultados fueron: [impacto]. Ahora tienes 3 opciones: (1) Graduarte — tienes todas las herramientas. (2) Ir más profundo en [tema]. (3) Un retainer mensual para soporte continuo. Sin presión — ¿qué te resuena más?"

**Output:** Preferencia del cliente.
**Evidencia:** CRM.

### 5.3 — Si retainer: presentar modelo de soporte continuo

**Script:** "El retainer incluye [N sesiones/mes, acceso a mí por WhatsApp, 1 revisión trimestral]. La inversión es [precio]. Esto te da [beneficio vs no tener retainer]."

**Output:** Retainer propuesto.
**Evidencia:** Propuesta.

### 5.4 — Si nuevo programa: utilizar Rituals 03-06 (pipeline completo)

**Contexto:** Un nuevo programa sigue el mismo pipeline pero con tiempo acelerado (ya no hay que calificar — ya hay relación).

**Output:** Pipeline R03-R06 activado (versión fast track).
**Evidencia:** CRM.

### 5.5-5.10 — [Documentar decisión, si acepta: formalizar, si no: cerrar con gratitud, registrar expansion rate, retroalimentar oferta de servicios, métricas]

---

## 6-10. [Formalización, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 15 → renovar-programa-recurrente`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Expansion Conversation Script" (Prompt Pro)

```markdown
PROMPT:
"Diseña un script de conversación de expansión post-programa consultivo.
Cliente: [nombre], Programa completado: [X], Outcome: [X]%, NPS: [X].
Dolor adyacente identificado: [X].
Genera:
1. Apertura (reconocer resultados sin autobombo)
2. 3 opciones de continuidad (graduarse / profundizar / retainer)
3. Script para cada opción
4. Script de cierre si no expande
Tono: consultivo, sin presión, orientado al resultado del cliente."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
