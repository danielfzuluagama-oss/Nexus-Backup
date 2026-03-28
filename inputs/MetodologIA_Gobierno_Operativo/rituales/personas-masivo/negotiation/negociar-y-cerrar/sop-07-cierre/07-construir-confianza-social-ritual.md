---
id: "07"

segmento: "personas-masivo"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "07-construir-confianza-social"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Community Manager"
- backup: "Content Lead"
frecuencia: "asincrónica automática (trigger post-abandono de oferta)"
herramientas:

- "CRM Marketing Automation"
- "Base de Datos de Testimonios (Notion/Airtable)"
- "WhatsApp Business API / Intercom"

entry-criteria:

- "Lead visitó la Landing de Oferta (R06) pero no compró"
- "Lead clickeó CTA Soft ('Tengo dudas / Hablar con experto')"
- "Lead abandonó el checkout"

exit-criteria:

- "Objeciones latentes mapeadas y respondidas"
- "Prueba social relevante al perfil enviada (Matched Social Proof)"
- "Lead decide cerrar (avanza a R08) o de-priorizar (Cooled down)"

kpi: "Trust Conversion Rate (Target: ≥30% de los leads en este ritual terminan comprando)"
leading-indicators:

- "Open y Response rate de los mensajes de confianza"
- "Clicks en los casos de estudio / testimonios enviados"
- "Reducción de 'Tiempo en etapa de decisión'"

riesgos-controles:

- riesgo: "Spamming de follow-ups (destruye la marca y se siente desesperado)"

  control: "Hard limit: Máximo 3 touchpoints de valor. Al tercero, withdraw formal (Ruptura/Takeaway)."

- riesgo: "Enviar testimonios desalineados (ej. enviar el caso de un diseñador junior a un CEO B2B)"

  control: "Sistema de etiquetado: La prueba social se empareja algorítmicamente por Life Event y Role detectados en R03."

- riesgo: "Ganar el argumento, perder la venta (debatir agresivamente con el lead)"

  control: "Las objeciones no se discuten, se neutralizan mostrando una historia de alguien más que pensaba igual y tuvo éxito."
evidencias:

- "Touchpoints enviados registrados en CRM"
- "Apertura de links a Casos de Estudio"
- "Cambio de lead status a 'Won' o 'Nurture'"
---

# Ritual: Construir Confianza Social — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En ventas masivas B2C, la venta no se cae por "presupuesto" sino por "duda de ROI". El usuario cree en el producto, duda de SÍ MISMO ("¿Seré capaz de aplicar esto?").
> **REGLA DE ORO:** La prueba social genérica ("El producto es genial! - Juan") no sirve. El único testimonio que convierte es el Matched Social Proof: Mostrar a una persona idéntica al lead, con el mismo dolor inicial del lead, resolviéndolo con el producto.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El lead llega al umbral de la compra (R06) pero frena. El sistema lo detecta vía abandono de carrito, tiempo excesivo en página de precios sin clic, o ingreso voluntario por el Soft CTA ("Tengo dudas").
- **Pre-ritual:** ¿La base de testimonios está mapeada con etiquetas de Industria, Cargo y Dolor para que la IA/CRM pueda cruzar la data?
- **Contexto:** Estás negociando silencio o indecisión. En masivo, no persigues a un lead por teléfono para negociar $200 USD. Negocias con asincronía psicológica: Muestras la transformación de otros para bajar el riesgo percibido del lead.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Reducir la incertidumbre del prospecto emparejando sus dudas no-habladas con evidencia documental de éxito en pares similares.
- **Definición de Éxito (DoD):**
  - [ ] Objeción principal (precio, tiempo, esfuerzo o fit) identificada / inferida.
  - [ ] "Matched Testimonial" o Caso de Uso enviado vía email o WA.
  - [ ] Secuencia de confianza (3 pasos) completada.
  - [ ] Prospecto recuperado a Checkout (R08) o cerrado como Lost-to-Nurture.
- **Definición de Éxito del Lead:** "Pensé que este curso era para marketers, no para ingenieros, pero acabo de leer el caso de un CTO que lo aplicó y me voló la cabeza."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Rendimiento general de la campaña de Trust |
| **Responsible** | Community Manager / Ops | Organizar la base de testimonios y los scripts |

| **Consulted** | AI Agent | Matchmaking entre Perfil_Lead (R03) y Testimonio |
| **Informed** | Product Led | Feedback continuo sobre por qué la gente no compra |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Lote de leads marcados como `Visited_Offer_No_Convert` o `Checkout_Abandoned`.
- [ ] Matriz de Objeciones mapeadas a Assets (Respuestas documentadas a objeciones).
- [ ] Banco de Testimonios indexado (ej. Video de 30s de Mariana, Founder B2B).
- [ ] Scripts redactados en tono Neo-Swiss (No-pressure, High-confidence).

---

## 5. Ejecutar — Parte 1: El Flujo Asincrónico de Confianza

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Triaje del estado de objeción (Duda explícita vs implícita)

**Acción:**

- Si viene por CTA Soft: Leyó las preguntas y dudas explícitas del prospecto.
- Si viene por Abandono (Implícita): Asumir la objeción estadística primaria (Generalmente: Tiempo de implementación o Miedo a fallar).
**Output:** Objeción Target definida.

### 5.2 — Matchmaking de Evidencia (El Caso Espejo)

**Acción:** Consultar el Banco de Testimonios cruzando la Industria/Rol del lead (obtenido en R03).

**Output:** Testimonio ideal seleccionado.
**Evidencia:** Asset link copiado.

### 5.3 — Touchpoint 1: La Neutralización (Día 1)

**Script:** "[Nombre], vi que le diste una vuelta a [Producto] pero no entraste. Si es un tema de [Objeción inferida, ej: si toma mucho tiempo], quería mostrarte rápido el caso de [Nombre Testimonio], que está en [Industria similar] y tenía la misma reserva. Spoiler: Lo implementó en X horas. Aquí está su historia (Link)."

**Output:** TP1 enviado.

### 5.4 — Touchpoint 2: ROI Logic & Risk Reversal (Día 3)

**Regla:** Si no reaccionó al TP1, atacar por el lado lógico del riesgo.

**Script:** "Algo que olvidé mencionar sobre la certificación de [Tema] es nuestra garantía condicional. Si procesas el Módulo 1 y sientes que el ROI no es matemático, no tiene sentido que sigas dentro. Te reembolsamos. Toda la balanza de riesgo está de mi lado. Link de acceso."
**Output:** TP2 enviado.

### 5.5 — Manejo de respuestas manuales (Live Chat / WA)

**Contexto:** Algunos leads responderán por email o WhatsApp (si el CTA Soft era un chat).

**Acción:** Responder en menos de 2h laborables. Usar la regla de "Agree, Isolate, Evidenciate" (Dar la razón, Aislar la objeción, Mostrar evidencia). Nunca discutir.
**Output:** Conversación 1:1 sostenida.

**Evidencia:** CRM Chat Log.

### 5.6 — Touchpoint 3: The Takeaway (Día 5)

**Contexto:** Cerrar el ciclo y retirar la presión. A menudo, esto genera que la gente compre meses después porque no fuiste "pesado".

**Script:** "[Nombre], voy a dejar de insistir con esto para no hacer ruido en tu bandeja. Asumiré que ahora no es el momento de atacar [Dolor/Life Event]. Si en el futuro vuelve a ser prioridad, ya sabes dónde encontrarme. Te seguiré enviando mi newsletter semanal. Abrazo."
**Output:** TP3 enviado. Cierre formal.

### 5.7 — Actualizar Status de Lead (Derivación final)

**Acción:**

- Si compra en el proceso → `Won` → Mover a R08.
- Si no compra post TP3 → `Cooled_Down` → Mover a Nurturing de Largo Plazo.
**Output:** Funnel limpio.

### 5.8 — Clasificar Feedback Crítico ("Por qué no compran")

**Acción:** Si el prospecto explica explícitamente por qué no compra (Ej. "no tiene app móvil", "muy caro para latam"), registrar ese macro-motivo en el CRM.

**Output:** Loss Reason capturada.
**Evidencia:** CRM Drop reason.

### 5.9 — Alimentar el backlog de testimonios

**Acción:** Notar qué perfiles NO tienen testimonios "espejo" buenos en el banco y pedir a Customer Success que busque ex-alumnos de ese perfil para entrevistarlos.

**Output:** Solicitud de social proof.

### 5.10 — Registrar Métricas R07

**Output:** Métricas del funnel de objeciones. **Evidencia:** Dashboard.

---

## 6-7. Ejecutar — Parte 2 y 3: Monitoreo y Ajuste

### 6.1-6.5 — Revisar Loss Reasons predominantes (¿Perdemos por precio o por onboarding?)

### 6.6-6.10 — A/B Test del Takeaway email (A veces genera el 30% de las ventas de esta etapa)

### 7.1-7.5 — Auditar la matriz de objeciones (¿Apareció una objeción nueva que no teníamos documentada?)

### 7.6-7.10 — Actualizar testimonios "gastados", documentar, archivar

---

## 8. Validación y Calidad (QA)

- [ ] Hard Stop aplicado: Un prospecto NUNCA recibe un 4to follow-up de venta pura en la misma ventana de compra.
- [ ] No enviamos "descuentos por desesperación". Esta es una marca Sovereign, el precio se defiende con el valor, no degradando el producto.
- [ ] El tono de las interacciones 1:1 es de consultor de alto nivel, no de vendedor a comisión urgido.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Conversión Post-Trust | CRM KPI | Dashboard Sales | Growth Lead |
| Listado Loss Reasons | Report | CRM Data | Ops / AI Agent |
| Matriz de Objeciones | Doc | Notion/Wiki | Content Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [08-cerrar-compra-digital](08-cerrar-compra-digital-ritual.md) O vuelve a Fase de Nurturing.
- **Condición de handoff:** Toda duda razonable fue contestada con evidencia empírica. El lead tomó su decisión y el pipeline quedó purgado.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Trust Conversion Rate | ≥30% de retomes | 🟡 |
| Win-Back post-Takeaway (TP3) | Seguimiento | 🟡 |

- **NEXT:** `personas-masivo → 08 → cerrar-compra-digital`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Social Proof Matcher" (Prompt Pro)

**Use case:** Tienes un abandono de carrito importante. Necesitas que la IA busque en tu base de testimonios el caso perfecto.

```markdown
PROMPT:
"Tengo un prospecto [Rol: VP Engineering], [Industria: Fintech], que abandonó el checkout de [Producto]. 
La última página que visitó fue la FAQ del tiempo de implementación.
Asumo Objeción: Miedo al Time-to-Value.
En mi base de testimonios (JSON adjunto) tengo 50 historias.
1. Busca y extrae el testimonio que más se parezca a su rol/industria y hable de 'velocidad' o 'rápido'.
2. Escribe el Email Touchpoint 1 (Máximo 80 palabras) aplicando 'El Caso Espejo'. Saluda, pon el testimonio entre comillas, y cierra sin pedirle que compre, solo recordando que el link de enrollment sigue activo. Tono Directo y Corporativo."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
