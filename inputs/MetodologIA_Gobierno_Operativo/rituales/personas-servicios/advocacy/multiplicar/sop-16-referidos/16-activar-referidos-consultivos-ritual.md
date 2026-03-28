---
id: "16"

segmento: "personas-servicios"
journey: "advocacy"
proceso: "multiplicar"
sop: "sop-16-referidos"
ritual-slug: "16-activar-referidos-consultivos"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "Consultant Lead"
frecuencia: "por-evento (post-programa exitoso) + trimestral (reactivación)"

herramientas:

- "CRM"
- "Email"
- "LinkedIn"

entry-criteria:

- "Cliente con NPS ≥ 8 o transformation narrative potente"
- "O: end-of-program con outcome achievement ≥75%"
exit-criteria:

- "Referral ask ejecutado con respeto"
- "≥1 referido recibido o razón de no-referral documentada"
kpi: "Referral Rate (Target: ≥30% de clientes satisfechos refieren ≥1)"
riesgos-controles:

- riesgo: "Pedir referidos a cliente insatisfecho"

control: "Solo pedir si NPS ≥ 8 o outcome ≥ 75%"

- riesgo: "El ask se siente transaccional"

control: "Pedir en el contexto de 'ayudar a alguien en situación similar'"
evidencias:

- "Referral ask documented"
- "Referrals received"
---

# Ritual: Activar Referidos Consultivos — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Principio:** El referral es el canal más valioso (#1 en Resonance Score). No se pide como transacción — se ofrece como servicio: "¿conoces a alguien en situación similar a la tuya de hace 3 meses?"

---

## 5. Ejecutar

### 5.1 — Identificar clientes referenciables (NPS ≥ 8 o outcome ≥ 75%)

**Acción:** Query CRM: clientes con NPS ≥ 8 AND outcome ≥ 75%.

**Output:** Lista de clientes referenciables.
**Evidencia:** CRM query.

### 5.2 — Ejecutar referral ask (por-evento, no batch)

**Contexto:** El mejor momento es en el cierre del programa o en un milestone de éxito. No un email masivo.

**Script:** "[nombre], tu transformación de [before] a [after] me impresionó. ¿Conoces a alguien en una situación similar a la tuya de hace [X meses]? No para venderte nada a ti — sino porque si alguien pasa por lo mismo, me encantaría ayudarle igual."
**Output:** Referral recibido o "no conozco a nadie".

**Evidencia:** CRM.

### 5.3 — Si recibe referido: agradecer + registrar source

**Script:** "Gracias por la confianza. Le contacto de tu parte y te cuento cómo fue."

**Acción:** Registrar en CRM: referral source = [cliente], referrer NPS = [X].
**Output:** Referido registrado.

**Evidencia:** CRM.

### 5.4 — Nurturing trimestral: reactivar referrals de clientes graduados

**Script (trimestral):** "Hola [nombre], espero que estés bien. ¿Cómo va [lo que trabajamos]? Si conoces a alguien que podría beneficiarse de algo similar, me encantaría conectar."

**Output:** Re-engagement.
**Evidencia:** CRM.

### 5.5-5.10 — [Registrar ratio de referrals, analizar qué clientes refieren más (profile pattern), crear "Ambassador Clients" category para super-referrers, testimonial capture, caso de estudio de referrals exitosos, métricas]

---

## 6-10. [Estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 17 → cultivar-lideres-de-opinion`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Referral Ask Script" (Prompt Pro)

```markdown
PROMPT:
"Genera un script de referral ask para un cliente consultivo:
Cliente: [nombre], Programa: [X], Before: [X], After: [X], NPS: [X].
El script debe:
1. Reconocer su transformación específica
2. Pedir referido como servicio (no como transacción)
3. Ser adaptable a conversación verbal y mensaje escrito
4. Incluir follow-up si dice 'lo pienso'
Tono: gratitud genuina, sin presión."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
