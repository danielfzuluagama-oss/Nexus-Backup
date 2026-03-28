---
id: "08"

segmento: "personas-servicios"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "08-cerrar-acuerdo-servicio"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Consultant Lead"
frecuencia: "por-evento (negociación cerrada)"
herramientas:

- "CRM"
- "Stripe / Transfer"
- "DocuSign / Google Docs"
- "Calendly"
entry-criteria:

- "Alcance y condiciones acordados (Ritual 07)"
- "Lead confirmó intención de proceder"
exit-criteria:

- "Acuerdo firmado"
- "Pago procesado (anticipo o total)"
- "Primera sesión agendada"
- "CRM: Deal_Status = Closed Won"
kpi: "Close Rate (Target: ≥45% de proposals se cierran)"
riesgos-controles:

- riesgo: "Cambio de mente post-acuerdo verbal"

control: "Cierre rápido: enviar acuerdo en <24h + agendar inicio"

- riesgo: "Pago demorado indefinidamente"

control: "Anticipo como requisito para agendar primera sesión"

- riesgo: "Gap largo entre cierre e inicio"

control: "Primera sesión ≤7 días después del pago"
evidencias:

- "Acuerdo firmado"
- "Comprobante de pago"
- "Primera sesión agendada en CRM"
---

# Ritual: Cerrar Acuerdo de Servicio — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **Velocidad de cierre:** Acuerdo verbal → envío de documento en <24h → firma en ≤3 días → pago → primera sesión en ≤7 días desde pago. La velocidad demuestra profesionalismo y evita ghosting.

---

## 5. Ejecutar — Parte 1: Formalización

### 5.1 — Generar acuerdo de servicio personalizado

**Acción:** Completar template con: nombre, servicio, alcance, duración, precio, condiciones, política de cancelación.

**Output:** Acuerdo listo.
**Evidencia:** Google Doc.

### 5.2 — Enviar para firma en <24h

**Script:** "[nombre], aquí está el acuerdo que refleja todo lo que acordamos. Revísalo y firma cuando estés listo. Te sugiero que lo firmes antes del [fecha] para que podamos arrancar la próxima semana."

**Output:** Acuerdo enviado.
**Evidencia:** DocuSign.

### 5.3 — Procesar pago

**Acción:** Enviar link de pago (anticipo o total, según acuerdo).

**Script:** "Al firmar, te envío el link de pago. Una vez procesado, agendamos tu primera sesión."
**Output:** Pago procesado.

**Evidencia:** Comprobante.

### 5.4 — Agendar primera sesión

**Acción:** Usar Calendly o coordinación directa. Primera sesión ≤7 días post-pago.

**Script:** "¡Listo! Tu primera sesión está agendada para el [fecha]. Te envío un recordatorio con lo que necesitas preparar."
**Output:** Primera sesión agendada.

**Evidencia:** CRM + calendario.

### 5.5 — Enviar welcome email con pre-work

**Script:**
"[nombre], bienvenido al programa [nombre del programa].

Tu primera sesión es: [fecha + hora + link].
Para prepararte:

1. [Pre-work específico — lectura, reflexión, o auto-evaluación]
2. [Herramientas necesarias — accesos, apps]
3. [Mindset — qué esperar de la primera sesión]
Si tienes dudas, escríbeme directamente."
**Output:** Welcome email enviado.

**Evidencia:** Email.

### 5.6-5.10 — [Actualizar CRM: Deal Closed Won, notificar al equipo, crear carpeta del cliente en Drive, programar sesiones del programa completo, archivar acuerdo firmado]

---

## 6-10. [Post-cierre, kick-off prep, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 09 → activar-onboarding-servicio`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Fast Close Sequence" (Prompt Pro)

```markdown
PROMPT:
"Genera una secuencia de cierre rápido para un servicio consultivo:
Lead: [nombre], Servicio: [X], Precio: [$X], Primera sesión: [fecha propuesta].
Produce:
1. Email de envío de acuerdo (profesional, conciso)
2. Welcome email post-firma (con 3 items de pre-work específicos)
3. Reminder 24h antes de primera sesión
Tono: profesional, emocionante, sin urgencia artificial."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
