---
id: "14"

segmento: "personas-masivo"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "14-detectar-upsell-masivo"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Content Lead"
frecuencia: "asincrónica automática (segmentada por perfil)"
herramientas:

- "CRM Marketing Automation"
- "Motor Analítico de LMS"
- "Checkout Platform (1-Click Upsell links)"

entry-criteria:

- "Cliente marcado como Promotor (NPS 9-10) en R13"
- "O Cliente cruzó el umbral >60% de Content Completion Score en R11"
- "Cliente NO tiene tickets de soporte (CX) hostiles abiertos"

exit-criteria:

- "Oferta dinámica de Next-Best-Product asignada"
- "Campaña de Upsell/Cross-sell de 3 días disparada"
- "Conversión de venta o caída a Nurturing registrada"

kpi: "LTV Expansion Rate (Target: ≥15% de Promotores compran un segundo producto en los primeros 60 días)"
leading-indicators:

- "Click-Through-Rate (CTR) de la campaña de Upsell"
- "Offer View-to-Conversion Rate en la página secundaria"
- "Volumen de clientes de front-end escalando a ofertas de back-end"

riesgos-controles:

- riesgo: "Ofrecer el segundo producto demasiado pronto (El cliente no ha tenido su primer 'Win' y se siente ordeñado)"

  control: "Hard Lock: La campaña de up-sell NUNCA dispara antes de validar que el Adopion Health Score (R11) es alto."

- riesgo: "Ofrecer el producto equivocado (Fricción Cognitiva)"

  control: "Smart Routing: Si compró el curso para Managers, no ofrecerle el curso para Juniors; mandarlo al bundle de Productividad Ejecutiva."

- riesgo: "Descontar desesperadamente para vender de nuevo (Daño de Marca)"

  control: "Vender valor condicional ('Ya diste el paso 1, el problema que vas a enfrentar ahora es el Paso 2'). Cero descuentos agresivos."
evidencias:

- "Lead movido a la automatización `Current_Buyer_Upsell_Sequence`"
- "Generación de enlaces customizados de carrito con token de sesión"
- "Venta exitosa registrada en pasarela como (Recurring/Upsell)"
---

# Ritual: Detectar Upsell Masivo — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** El error B2C clásico es vender un curso y luego spammear al comprador con el resto del catálogo sin criterio.
> El Upsell Soberano es **Secuencialidad Deductiva**. Sabes en qué problema se metió el cliente al resolver su problema anterior. Le ofreces la medicina para esa nueva enfermedad, no una ensalada.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El pipeline algorítmico evalúa diariamente. Si el cliente emite NPS 9-10 (R13) O cruza el hito del 60% de compleción de curso base con notas altas (R11), se destraba el puente al Nivel 2.
- **Pre-ritual:** ¿Está lista la "Escalera de Valor" de productos trazada matemáticamente? (Ej: Producto A naturalmente causa la necesidad de resolver B -> Recomendar Producto B).
- **Contexto:** El LTV (Life-Time Value) de una empresa de info-productos masivos muere si cuesta mil dólares adquirir a un cliente que solo te paga $100 una vez. La rentabilidad reside exclusivamente en identificar a las cohortes más felices y venderles el acceso premium, coaching grupal, o la membresía transversal B2B asincrónica.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Inyectar el producto "Backend" correcto al perfil adecuado en su momento de máxima temperatura actitudinal (Dopamina post-resultado/promotor), elevando el ticket promedio de la base.
- **Definición de Éxito (DoD):**
  - [ ] El Next Best Product (NBP) ha sido calculado para el Promotor
  - [ ] Serie de Up-Sell (Pitch de contexto temporal) enviada
  - [ ] Página de Checkout fricción-cero servida
  - [ ] Conversión económica efectuada O tagueo en CRM (`Upsell_Rejected`)
- **Definición de Éxito del Lead:** "Me resolvieron el dolor principal la semana pasada, y cuando vi venir el segundo embotellamiento natural de fase 2, literalmente me ofrecieron el framework para atajarlo antes de que me golpeara."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Maximización del % de Expansion MRR/LTV de Base Activa |
| **Responsible** | Content Lead | Lógica del NBP (Que producto A realmente conecte con B) |

| **Consulted** | CX Lead | Bloquear upsells para clientes que tengan quejas activas |
| **Informed** | Sales Team | Visualizar Promotores que califican para Tickets de >$2K High-Ticket |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Matriz Smart-Routing configurada en el CRM (If TAG = Product_A -> Send Upsell Pitch B).
- [ ] Landing page(s) de Up-Sell optimizadas con copy de "Siguiente nivel lógico".
- [ ] Link de "1-Click Upsell" activo si el pago anterior (Stripe) permite hacer cargos autorizados sin retipear tarjeta.
- [ ] Listas de exclusión verificadas (No enviar Upsell de B a quien ya compró B).

---

## 5. Ejecutar — Parte 1: Perfilamento Inteligente e Inyección

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — El Filtro de "Temperatura Limpia"

**Acción:** El CRM cruza la data. Tienen que ser [Promotores o Completadores] Y [No tener quejas] Y [No haber comprado ya el Upsell propuesto].

**Output:** Active Upsell Roster (Lista viva dinámica).

### 5.2 — Asignación Estructural (Smart Routing)

**Contexto:** Elegir qué ofrecer.

**Acción:** Reglas de ruteo if/then.

- *Ejemplo:* Si consumió Modulo 3 (Ventas B2B), Upsell = Toolkit de Cold Emails. Si consumió Modulo 4 (Ads B2C), Upsell = Librería de Plantillas Creativas.

**Output:** Oferta dinámica pre-asignada por metadatos.

### 5.3 — Upsell Táctico #1: El "One-Click / Order Bump" (Para compras <$49)

**Acción:** Si la compra post-curso es pequeña, insertarlo como un correo relámpago con ancla psicológica.

**Script:** "Viendo que dominaste [Módulo X], hay un toolkit que la clase ejecutiva usa para hacer eso al 300% de velocidad. Toma aquí, clic directo, agrégalo y a correr."
**Output:** Fast-lane Upsell ofrecido.

### 5.4 — Upsell Estratégico #2: El "Next Logical Step" (Para compras de High Value)

**Acción:** Si la oferta de back-end es pesada (ej. Escalada a programa de $500), se requiere una mini-docu-serie de 2 emails.

**Script Email 1:** "Resolviste el problema Y. Genial. Pero ahora tu agenda se complicará tratando de sostener eso a largo plazo sin el framework de automatización Z..." (Siembra dolor futuro natural).
**Output:** Puente cognitivo sembrado.

### 5.5 — Disparo de la Checkout Link Personalizada

**Acción:** (Día 2 del Upsell Estratégico). El cliente recibe el enlace a una pasarela simplificada. Si la plataforma de pago la soporta (Stripe Billing), botón "1-Click Update", el usuario apreta un botón y factura los $500 al método guardado.

**Output:** Disparo de cierre acelerado.

### 5.6 — Rutina de Fallback: Abandono de Carrito en Upsell

**Acción:** Si dio clic al email pero no dio clic al 1-Click Buy, disparar correo de recuperación de 4 horas "Oops".

**Script:** "El sistema mostró que viste el programa fase 2 pero saliste. Si es un tema de caja, o si no te convence el timing, no pasa nada. Pero te dejo esto abierto hasta mañana en caso de que lo pensaras."
**Output:** Recovery disparado.

### 5.7 — Mutación en CRM (Second Order Purchase)

**Acción:** Tras cobro, borrar el flag de prospecto Upsell, añadir tag `Repeat_Buyer` o `VIP_Cohort` e inyectarlo automáticamente en la nueva currícula de Delivery (Loop a R10).

**Output:** Cliente en doble órbita de adopción.
**Evidencia:** Lead record.

### 5.8 — Escalada hacia Human-Led Sales (Top LTV)

**Acción:** Si el cliente ya es un Promotor, ya compró el Frontend, y acaba de comprar el Backend ($), es el 1% élite. Notificar al Canal de Ventas Humanas (#high-ticket-alerts) para evaluar si es una Organización Enterprise oculta bajo un email de Gmail que merece escalada B2B humana (Tier Superior).

**Output:** Calificación automática High-End.

### 5.9 — Soft-Close (Rendición con dignidad)

**Acción:** Pasadas 72 horas del envío del Upsell sin cobrar, el Lead regresa a su zona segura.

**Script (Si hubiese automatización de newsletter posterior):** Se remueve del carril urgente, asumiendo su "No, pero gracias" y se mantiene en la lista global de nutrición mensual silenciosa.
**Output:** `Upsell_Declined_Gracefully`.

### 5.10 — Calcular KPIs "LTV Expansion Analytics"

**Output:** LTV Real vs CAC inicial proyectado en Tablero Looker de la compañía. (Si gasté 100 y gané 150 Front + 50 Back = ROI sano). **Evidencia:** KPI Data View.

---

## 6-7. Ejecutar — Parte 2 y 3: Curación y Estrategia

### 6.1-6.5 — Mapas de Calor de Producto Cruzado (Si los del curso A nunca compran el curso B, desarmar esa ruta. El Next Logical Step que diseñamos estaba mal)

### 6.6-6.10 — Optimización Cripto/Frictionless: Revaluar constantemente si hay plataformas (Shopify/Stripe Vaults) que mejoren el ratio de pago a 1-click para el Checkout de Upsell

### 7.1-7.5 — Reevaluar Threshold de NPS: ¿Qué pasa si abro el Upsell también a los pasivos (NPS 7-8)? A/B Test del conversion rate y el refund rate

### 7.6-7.10 — Incorporación del Flash-Discount Condicional (Probar si enviar un cupón mágico de "Te regalo mis ganancias de tu primer curso si entras al segundo en las próximas 4h" revienta el LTV neto total de la compañía para bien o para mal)

---

## 8. Validación y Calidad (QA)

- [ ] Prevención de Canibalismo: Jamás ofrecer con descuento un Back-End a la misma base de datos de manera genérica; enfurece a quienes lo pagaron precio normal y devalúa la marca.
- [ ] Seguridad PII: El 1-Click checkout es un feature poderoso pero requiere adherencias estrictas de PCI; jamás mostrar números de tarjeta crudos en los enlaces customizados del correo email.
- [ ] List Matching Exclusivo: Cero errores "Ofertar a Pedro comprar el Curso B, cuando Pedro ya compró y está atascado en el Curso B". Auditar Zaps mensualmente.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Smart Routes List| Rules Table | CRM/HubSpot | Growth Lead |
| LTV Expanded Metric | USD / ROI | Data View | Ops / Finance |
| VIP Promoters Alert | Slack Ping | #Ventas-Human | Automation Bot |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [15-cerrar-recompra-recurrente](../../renewal/renovar-y-retener/sop-15-renovacion/15-cerrar-recompra-recurrente-ritual.md) O escalada a programa High-Ticket asistido por humanos B2B.
- **Condición de handoff:** Toda la curva del LTV del cliente Masivo fue extraída orgánicamente. Se resolvió su problema basal, quedó feliz (NPS) y subió de nivel de ticket invirtiendo más en su propia transformación.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Upsell Conversion | ≥15% base de Promotores | 🟡 |
| LTV Lift Neto | Aumento del 25% | 🟡 |

- **NEXT:** `personas-masivo → 15 → cerrar-recompra-recurrente`
- **BLOCKERS:** `Dificultades técnicas en la tokenización de tarjetas limitando el One-Click buy`

---

## Modal 10x: El "Upsell Intelligence Engine" (Prompt Pro)

**Use case:** Tienes un lead que acaba de cruzar tu Curso Fase 1 de Marketing Digital con excelentes notas. Tienes un menú de 3 "Fases 2" posibles y necesitas escribir el puente táctico para venderle su segunda opción sin parecer un spammer ansioso.

```markdown
PROMPT:
"Actúa como Growth Architect de Retención Nivel Genio.
Tengo este perfil B2C: Tomó el [Curso Inicial A], amó el 'Módulo 2 (Copywriting)', lo aplicó y su NPS fue 10.
Tengo estas opciones posibles para cruzar la venta de Back-End: [Producto Backend B: Facebook Ads], [Producto Backend C: Escalada de Email Marketing para E-commerce], [Producto Backend D: Pack de Plantillas de Ventas Directas].
Genera 2 cosas:
1. THE DEDUCTION: ¿Bajo qué lógica unívoca descarto 2 productos y ataco exclusivamente el tercero, dado que su obsesión fue el módulo de Copywriting?
2. THE PITCH (El Puente Cognitivo): Redacta un correo corto de 5 líneas Neo-Swiss que inyectaré a mi máquina con su nombre, usando el concepto psicológico del 'Siguiente Dolor que acabas de ganar', conectando elegantemente su éxito en 'A' como excusa para atacar 'D'. Muestra seguridad y nada de escasez."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
