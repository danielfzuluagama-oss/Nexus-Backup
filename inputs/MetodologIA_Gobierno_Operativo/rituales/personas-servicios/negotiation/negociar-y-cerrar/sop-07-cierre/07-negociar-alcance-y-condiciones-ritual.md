---
id: "07"

segmento: "personas-servicios"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "07-negociar-alcance-y-condiciones"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Consultant Lead"
- backup: "Sales Director"
frecuencia: "por-evento (post revisión de propuesta)"
herramientas:

- "CRM"
- "Google Docs"
- "Zoom"

entry-criteria:

- "Propuesta presentada y revisada (Ritual 06)"
- "Lead ha manifestado objeciones o ajustes"
exit-criteria:

- "Alcance final acordado"
- "Condiciones finales documentadas"
- "Precio final confirmado (sin descuento — con ajuste de alcance si necesario)"

kpi: "Negotiation Closure Rate (Target: ≥65%)"
leading-indicators:

- "Tiempo de negociación (<7 días)"
- "# rounds de ajuste (target: ≤2)"
riesgos-controles:

- riesgo: "Scope creep en la negociación"

control: "Si el alcance cambia, el precio o timeline cambian proporcionalmente"

- riesgo: "Descuento que erosiona valor"

control: "NUNCA descuento. Alternativa: reducir alcance, ajustar timeline, o bonus de valor"

- riesgo: "Negociación emocional (lead se siente presionado)"

control: "Tono consultivo: 'encontremos lo que funciona para ambos'"
evidencias:

- "Propuesta final con ajustes"
- "Acuerdo verbal de condiciones"
---

# Ritual: Negociar Alcance y Condiciones — Personas Servicios (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Servicios
> **REGLA ABSOLUTA: Cero descuentos.** Si el lead quiere pagar menos → reducir alcance o ajustar timeline. El precio refleja valor, no negociación.
> **Principio: Si el alcance cambia, el precio cambia proporcionalmente.** Sin excepciones.

---

## 5. Ejecutar — Parte 1: Mapeo de Objeciones

### 5.1 — Escuchar objeciones sin defender

**Script:** "[nombre], ¿qué parte de la propuesta te genera dudas? Quiero escuchar todo antes de responder."

**Output:** Lista de objeciones/ajustes.
**Evidencia:** Notas.

### 5.2 — Clasificar cada objeción

**Acción:** ¿Es de precio, alcance, timeline, formato, o confianza?

- **Precio:** → opción de ajuste de alcance (NO descuento)
- **Alcance:** → evaluar si es scope creep o ajuste legítimo
- **Timeline:** → evaluar factibilidad
- **Formato:** → evaluar si es adaptable (presencial↔virtual, individual↔grupo)
- **Confianza:** → necesita más evidencia (caso de éxito, referencia)

**Output:** Objeciones clasificadas.

**Evidencia:** Doc.

### 5.3 — Para objeciones de precio: ofrecer alternativas

**Script:** "Entiendo que la inversión es considerable. Tenemos 3 opciones: (1) Programa completo como propuse: [precio]. (2) Versión reducida [qué se quita]: [precio menor]. (3) Programa con timeline extendido [pago en cuotas]: [mismo precio, diferente distribución]. ¿Cuál se alinea mejor?"

**Output:** Alternativa seleccionada.
**Evidencia:** Nota.

### 5.4 — Para objeciones de alcance: ajustar con honestidad

**Script:** "Si agregamos [X], necesitamos [más tiempo/más inversión]. Si quitamos [Y], podemos reducir a [precio]. Lo importante es que el resultado que acordamos se mantenga. ¿Qué es indispensable para ti?"

**Output:** Alcance ajustado.
**Evidencia:** Propuesta actualizada.

### 5.5 — Para objeciones de confianza: proveer evidencia

**Script:** "Entiendo tu cautela. Te puedo conectar con [cliente anterior en situación similar] que te cuente su experiencia directamente. ¿Te ayudaría?"

**Output:** Referencia ofrecida.
**Evidencia:** Nota.

### 5.6-5.10 — [Documentar versión final, confirmar con lead, preparar handoff a Ritual 08, CRM update, métricas]

---

## 6-10. [Cierre de negociación, documentación, QA, Outputs, Cierre — estándar v4.1]

### Cierre

- **NEXT:** `personas-servicios → 08 → cerrar-acuerdo-servicio`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Objection Navigator" (Prompt Pro)

```markdown
PROMPT:
"Un lead consultivo tiene estas objeciones sobre mi propuesta:
[lista de objeciones].
Propuesta original: [precio, alcance, timeline].
Para cada objeción, genera:
1. Clasificación (precio/alcance/timeline/formato/confianza)
2. Respuesta consultiva (no defensiva)
3. Alternativa concreta que mantiene el valor
REGLA: cero descuestos. Solo ajustes de alcance o timeline.
Tono: empático, firme en valor, consultivo."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Servicios
> **Powered by:** MetodologIA Governance Protocol
