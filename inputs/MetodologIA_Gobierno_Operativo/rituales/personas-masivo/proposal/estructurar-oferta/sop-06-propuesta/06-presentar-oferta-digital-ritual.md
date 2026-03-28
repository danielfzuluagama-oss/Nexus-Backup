---
id: "06"

segmento: "personas-masivo"
journey: "proposal"
proceso: "estructurar-oferta"
sop: "sop-06-propuesta"
ritual-slug: "06-presentar-oferta-digital"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Content Lead"
frecuencia: "asincrónica automática (trigger post-Asset consumption)"
herramientas:

- "CRM Marketing Automation"
- "Landing Page Builder / CMS"
- "Checkout System (Stripe/Shopify etc.)"

entry-criteria:

- "Lead consumió Try & Buy (R05) o viene de puente directo R04"
- "Engagement metrics mínimos validados (superó barrera térmica en Lead Score)"
exit-criteria:

- "Página de Oferta hiper-personalizada dinámicamente u ofrecida por segmento"
- "Oferta presentada a través de campaña automatizada multicanal (Email/Ads)"
- "Objeciones anticipadas con FAQ anidado dentro de la página"
- "2 opciones de CTA claras y rastreables (Soft y Hard)"
kpi: "Offer View-to-Conversion Rate (Target: ≥5% al checkout final)"
leading-indicators:

- "Landing Page View Rate (Click-through desde R05)"
- "Time-on-Page (¿Se quedan leyendo el Value Stack?)"
- "Scroll Depth hacia la tabla de Pricing/FAQ"

riesgos-controles:


- riesgo: "Landing page genérica que olvida por qué vino el usuario (Desconexión cognitiva)"

  control: "Variables dinámicas (o al menos segmentación por Life Event) en el H1 de la landing."

- riesgo: "Sticker Shock (Precio presentado sin haber anclado el valor y ROI antes)"

  control: "Arquitectura de página estricta: Value Stack primero, Pricing al fondo, Garantía pegada al precio."

- riesgo: "Tono agresivo 'Last Chance to Buy' (Destruye marca Neo-Swiss)"

  control: "Cero falsas escaseces. Los urgency triggers deben ser reales (cohortes que cierran) o basados en su propio Time-to-Value perdido."

evidencias:

- "Logs de campaña Email (Click to Landing)"
- "Analytics de la Landing Page (Heatmaps/Scroll)"
- "Intenciones de CTA registradas en CRM (Lead status = 'In Negotiation/Decision')"

---

# Ritual: Presentar Oferta Digital — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En productos masivos, la "Propuesta" es una experiencia digital asincrónica (Landing Page + Email Sequence), no un PDF adjunto.
> La Oferta Digital asume el rol del cerrador comercial. Debe ser exhaustiva, impecable estéticamente, y desarmar preventivamente las 5 objeciones clásicas (Tiempo, Dinero, Trust, Fit, Effort).

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Automáticamente tras el consumo exitoso del Asset (R05), o cuando el usuario hace clic proactivamente en los CTAs de evaluación.
- **Pre-ritual:** ¿Las automatizaciones de abandono de Landing Page / Carrito están activas? ¿El pricing stack es correcto?
- **Contexto:** El usuario probó el producto (Try & Buy) y descubrió su brecha de dolor (Diagnostic). Su sistema límbico está abierto a una solución. Si la oferta digital que presentas ahora es confusa, genérica o parece de baja calidad, matarás todo el momentum creado en fases anteriores. El "Proposal" masivo es puro diseño de persuasión de guante blanco.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Presentar el producto/servicio masivo como la continuación natural y lógica del valor ya experimentado, maximizando la tasa de conversión autónoma.
- **Definición de Éxito (DoD):**
  - [ ] Email de pitching transicional enviado
  - [ ] Lead visita la Landing Page de Oferta
  - [ ] Value stack y Garantía claras
  - [ ] Estructura Dual CTA presente
  - [ ] (Avanzado) Lead llega al Checkout (R08) o levanta la mano para dudas (R07)
- **Definición de Éxito del Lead:** "Esta oferta entiende exactamente lo que necesito ahora. El precio tiene sentido respecto al valor que ya me demostraron gratis."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Tasa de conversión de la página de oferta |
| **Responsible** | Content Lead | Copies, arquitectura de la página, estructura del Value Stack |

| **Consulted** | AI Dev | Segmentación dinámica del layout web |
| **Informed** | Customer Success | Saber qué se le prometió al prospecto |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Email Sequence de Pitching (3 correos: Lógica, Miedo, Urgencia real)
- [ ] Landing Page configurada con: H1 relevante, Value Stack explícito, FAQ predictivo.
- [ ] Testimonios y Social Proof alineados al arquetipo del lead
- [ ] Checkout links probados en live/test mode

---

## 5. Ejecutar — Parte 1: Arquitectura y Lanzamiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparar el Correo de Enlace ("El Pitch Lógico")

**Acción:** Enviar email transicional post-consumo de Asset.

**Script Base:** "[nombre], la clave para dejar de pelear contra [Dolor diagnosticado] no es más herramientas, es un sistema base. El framework que probaste en [Asset] pertenece al Módulo 1 de [Nombre Programa]. Decidí abrirte el acceso a la plataforma completa. Revisa el plan de estudios exacto aquí: [Link Landing]."
**Output:** Email enviado.

**Evidencia:** CRM Outbound.

### 5.2 — Landing Page: El "Hero Section" Alineado

**Regla UI:** El H1 de la página debe resonar con el Life Event del segmento.

**Acción:** Mostrar la promesa principal y el "Subtítulo de alivio" inmediatamente. Un video VSL (Video Sales Letter) corto (<3 mins) de alta fidelidad Neo-Swiss si es posible.
**Output:** Hero renderizado.

**Evidencia:** Web UX.

### 5.3 — Landing Page: El Value Stack (El "Qué" Exacto)

**Acción:** En lugar de párrafos, usar bullets visuales pesados comprobando todo lo que incluye usando la fórmula Ecuación de Valor (Entregable + Resultado + Tiempo + Eliminación de Fricción).

**Output:** Percepción de valor anclada.
**Evidencia:** Web UI.

### 5.4 — Landing Page: Testimonios Específicos (Clonación)

**Acción:** Inyectar historias de éxito de personas SIMILARES al lead. (ej. Si el lead es Manager B2B, mostrar review de Manager B2B, no de un freelance Junior).

**Output:** Refuerzo de confianza social.
**Evidencia:** Web UI.

### 5.5 — Landing Page: FAQ Anticuerpos (Desarmar Objeciones)

**Contexto:** Los 3 anticuerpos clásicos son: No tengo dinero (Valor vs Precio), No tengo tiempo (Tiempo de consumo), ¿Servirá para mí? (Fit).

**Acción:** Publicar 5 preguntas frecuentes hiper-directas que respondan a esto sin evasivas.
**Output:** Objeciones anuladas.

**Evidencia:** Web UI.

### 5.6 — Landing Page: Garantía Inversa de Riesgo

**Acción:** Presentar claramente la política de reembolso o garantía condicional ("Si completas el módulo 1 y no ves valor, te devuelvo el dinero").

**Output:** Reducción dramática del Drop-off pre-checkout.
**Evidencia:** Web UI.

### 5.7 — Landing Page: Estructura Dual CTA

**Acción:** Al final de la página, NO forzar solo la venta ruda.

- **CTA Hard:** "Comenzar Ahora" (Lleva directo al checkout de R08).
- **CTA Soft:** "¿Tienes dudas si es para tu caso? Hablemos 10 min o chatea por WA" (Lleva a R07 Construcción de Confianza).

**Output:** Red de retención para leads dubitativos.

**Evidencia:** Web Analytics.

### 5.8 — Correo #2 ("El Pitch Emocional/Fear of Regret") a las +48h

**Contexto:** Si no compró tras el Correo 1.

**Script Base:** Detallar el costo de la inacción. "Puedes seguir resolviendo [Dolor] usando prueba y error por los próximos 12 meses, o puedes implementar mi sistema en 4 semanas."
**Output:** Sequence continuation.

**Evidencia:** CRM Automation.

### 5.9 — Correo #3 ("El Pitch Cierre/FAQ") a las +96h

**Contexto:** Último empuje pasivo.

**Script Base:** Resumir las dudas comunes recibidas por otros y recordatorio del enlace. Cierre limpio, cero presión destructiva.
**Output:** Sequence finalized.

### 5.10 — Taggear Status de Negociación

**Acción:** CRM tag. Lead que visita la landing page `Visited_Offer`. Lead que cliquea CTA pero no compra `Checkout_Abandoned`.

**Output:** Embudo poblado para remarketing.
**Evidencia:** CRM Tags.

---

## 6-7. Ejecutar — Parte 2 y 3: Optimización y Recuperación

### 6.1-6.5 — Implementar Retargeting pasivo (Anuncios Meta/LinkedIn enseñando testimonios a visitantes de la Landing)

### 6.6-6.10 — Analizar "Campaña de Carrito Abandonado" Automática (Post click en CTA Hard)

### 7.1-7.5 — Instalar/Analizar mapas de calor (Microsoft Clarity o Hotjar) sobre la Landing para detectar bloqueos visuales

---

### 7.6-7.10 — A/B Test del Hero text, A/B Test del nombre del Botón, reportar al board

---

## 8. Validación y Calidad (QA)

- [ ] La Landing Page DEBE ser Mobile-First (más del 60% de tráfico masivo vendrá del celular).
- [ ] No hay links escapatorios en la Landing page (sin navbar, sin footer a blogs). Es una página de flujo único.
- [ ] Garantía de riesgo claramente validada y legalmente correcta.
- [ ] Dual CTA activo para no perder a los leads de perfil analítico que requieren R07.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Oferta Digital Live | Landing Page | Website Server | Content Lead |
| Pitch Sequence | Emal Automations | CRM | Growth Lead |
| Heatmaps & CTR | Data Report | Analytics Hub | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [08-cerrar-compra-digital](../../negotiation/negociar-y-cerrar/sop-07-cierre/08-cerrar-compra-digital-ritual.md) (si clickean Hard CTA) O [07-construir-confianza-social](../../negotiation/negociar-y-cerrar/sop-07-cierre/07-construir-confianza-social-ritual.md) (si clickean Soft CTA o rebotan necesitando nurturing conversacional de ventas asistidas).
- **Condición de handoff:** El plomo ha sido expuesto frontalmente al puente de valor. Todas las cartas están sobre la mesa.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Offer View Rate | ≥50% de T&B consumers | 🟡 |
| Checkout Initiation | ≥15% de viewers | 🟡 |

- **NEXT:** `personas-masivo → 07 → construir-confianza-social` OR `08 → cerrar-compra-digital`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Digital Offer Personalizer" (Prompt Pro)

**Use case:** Tienes tu borrador genérico de la Landing Page pero necesitas refinar toda la batería de emails (el tejido conectivo) para un segmento de buyer-persona específico en menos de 10 minutos.

```markdown
PROMPT:
"Actúa como un Copywriter de Respuesta Directa nivel Master.
A partir de este contexto: Lead Buyer Persona: [Descripción de su dolor], Asset Gratuito que consumió: [Qué aprendió], Producto que vendo: [Detalles, Precio, Garantía].
Genérame una secuencia de 3 correos de lanzamiento de oferta estructurada bajo Logics/Emotion/Urgency:
1. Email de Pitch Lógico (Inmediato): Conecta el asset gratuito con el paid wall. Focus on ROI.
2. Email Emocional (+48h): Toca el 'Cost of Inaction'. ¿Qué pasa si no asume este reto?
3. Email FAQ/Cierre (+96h): Directo al punto, despeja 3 dudas, no presión pero sí urgencia contextual.
Formato: Asunto de Clic Alto (corto), Cuerpo escaneable (máximo 100 palabras por mail), Tono Neo-Swiss generoso pero contundente."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
