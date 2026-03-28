---
id: "08"

segmento: "personas-masivo"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "08-cerrar-compra-digital"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Ops Lead"
frecuencia: "asincrónica automática (trigger post-clic en checkout)"
herramientas:

- "Stripe / LemonSqueezy / MercadoPago"
- "Zapier / Make (Orquestación)"
- "CRM / Sistema de LMS"

entry-criteria:

- "Lead hizo clic en el CTA de compra (R06 o R07)"
- "Inició sesión de checkout"
exit-criteria:

- "Transacción financiera procesada y verificada"
- "Generación y envío automático de factura/recibo (Compliance)"
- "Creación de usuario y ruteo a Plataforma (Entregable)"
- "Welcome Campaign disparada en <1 min"
kpi: "Checkout Completion Rate (Target: ≥75% de quienes inician checkout lo completan exitosamente)"
leading-indicators:

- "Tasa de rechazo de pago (declines rate)"
- "Tiempo promedio en página de checkout"
- "Tasa de recuperación de abandonos parciales de checkout (Cart Rescue)"

riesgos-controles:

- riesgo: "Fricción en checkout (formulario muy largo, abandono)"

  control: "Hard limit: Pedir solo Email y Tarjeta inicial. Solicitar Nombre/Facturación post-pago si es posible (1-Click Buy)."

- riesgo: "Falla de integración (El cobro pasa pero el acceso no llega)"

  control: "Monitoreo en tiempo real de Zapier; Fallback automático a lista de envío manual si API falla."

- riesgo: "Síndrome de Arrepentimiento Post-Compra (Buyer's Remorse)"

  control: "El trigger del 'Welcome Email' debe ser inmediato y celebrar la decisión, reafirmando el ROI."
evidencias:

- "Cargo exitoso en pasarela de pagos"
- "Log de cuenta creada en LMS/Plataforma"
- "Lead CRM state actualizado a 'Customer/Student'"
---

# Ritual: Cerrar Compra Digital — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** La ejecución del cierre digital debe ser implacablemente fluida. El momento del pago es el punto de máxima vulnerabilidad psicológica del usuario ("¿Estoy cometiendo un error?").
> El objetivo de R08 no es solo cobrar el dinero, es entregar dopamina, seguridad y acceso instantáneo, blindando la decisión tomada.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** En tiempo real, en el milisegundo en que el usuario ingresa sus datos de pago en la plataforma de transacción.
- **Pre-ritual:** ¿La pasarela de pago soporta los métodos de pago locales del buyer persona (ej. cuotas, Pix, transferencias)? ¿Está el tax rate correcto?
- **Contexto:** En B2B (Enterprise), cerrar implica contratos firmados por Legal. En B2C (Masivo), "cerrar" es una transferencia de bits de una Master/Visa hacia nuestro Stripe. Este segundo es sagrado. Cualquier lentitud en la carga de la página, cualquier campo innecesario, anula ventas ganadas. La fricción operativa debe ser CERO.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Ejecutar la captura financiera sin fricción y orquestar el 'Despacho Digital Instantáneo' que transiciona al lead de Prospecto a Cliente Activo.
- **Definición de Éxito (DoD):**
  - [ ] Pago capturado (Charge succeeded)
  - [ ] Factura emitida al correo del usuario
  - [ ] Credenciales de LMS/Producto generadas
  - [ ] Welcome Sequence (R09 Setup) notificada
  - [ ] Pipeline CRM avanza a "Closed Won"
- **Definición de Éxito del Lead:** "Pagué y literalmente 10 segundos después ya estaba adentro de la plataforma viendo el módulo 1 de bienvenida."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Ops Lead | Integridad del flujo de pago y de las integraciones API |
| **Responsible** | Growth Lead | UI/UX del checkout y automatizaciones de correos |

| **Consulted** | Finance | Conformidad fiscal, facturación automática |
| **Informed** | Support / CX | Listo para atajar casos edge (ej. pago cruzado, error de tipeo en email) |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Checkout Page optimizada (Trust badges, SSL visible, resumen claro del producto).
- [ ] Email de confirmación de pedido (Order Receipt).
- [ ] Conexión sólida Pasarela-Pila (Stripe -> Zapier -> CRM / LMS).
- [ ] Secuencia de Cart Recovery activada en el email provider.

---

## 5. Ejecutar — Parte 1: El Milisegundo Crítico

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Presentar Checkout Optimizado

**Contexto:** El usuario hace click en "Comprar".

**Acción:** Renderizar la página de checkout.

- A la derecha: Resumen de lo que se lleva (Value Stack recordatorio) + Garantía.
- A la izquierda: Formulario minimalista (Email, Tarjeta). Sin distracciones, sin navbar.
**Output:** Inicio de transacción.

### 5.2 — Captura y Procesamiento Segundos (Anti-Fraude)

**Acción:** La pasarela evalúa seguridad (3D Secure, CVC, Anti-fraud checks).

**Output:** Aprobación / Rechazo (Decline).

### 5.3 — Manejo Automático de Declines (Rechazo de Tarjeta)

**Contexto:** Un 10-15% de transacciones fallan por fondos o bloqueos del banco.

**Acción:** Redirección a página de "Pago Rechazado Soft".
**Script:** "Parece que tu banco bloqueó preventivamente el cobro (es normal con compras digitales). Llama rápido, autorízalo, e inténtalo de nuevo. O usa otra tarjeta." Envío de enlace de rescate por correo.

**Output:** Rescue Decline Process.

### 5.4 — Ejecución de Webhook (Post-Aprobación)

**Acción:** Almacenamiento seguro. Stripe dispara payload de "charge.succeeded" a la orquestación central (Make/Zapier).

**Output:** Trigger de sistemas.

### 5.5 — Mutación de Estado en CRM (Closed Won)

**Acción:** Lead es taggeado como `Customer_ProductoX`. Se añade el Life-Time Value (LTV). Flujos de Nurturing agresivo de ventas son abortados inmediatamente (evitar correos de "compra ya" a alguien que acaba de comprar).

**Output:** CRM limpio.

### 5.6 — Aprovisionamiento del Entregable (Credenciales)

**Acción:** Zapier llama al LMS o Plataforma (Ej. Teachable, Kajabi, Notion invite). Crea usuario con el correo del checkout.

**Output:** Login generado.

### 5.7 — Generación de Factura (Compliance)

**Acción:** El sistema fiscal genera el PDF (Invoice/Receipt) validado.

**Output:** Factura lista.

### 5.8 — Despacho Inmediato: The "Welcome & Access" Email

**Regla:** Este correo DEBE llegar en menos de 1 minuto.

**Acción:** Enviar email consolidado: Celebrando la decisión (Dopamina) + Enlace de Login Mágico (Acceso) + Enlace a Factura (Paz mental).
**Template:** "Ya estás dentro. Este es oficialmente el inicio de la actualización de tus [Life Event area]. Tus accesos están abajo. Nos vemos del otro lado."

**Output:** Delivery Confirmado.

### 5.9 — Redirección a la "Thank You Page" Estratégica

**Acción:** La página web post-compra no dice solo "gracias". Re-empaqueta e instruye el comportamiento inmediato: "Revisa tu inbox ahora. Si no llegó en 3 minutos, revisa Spam. Mírate este video de 1 min sobre por dónde arrancar (R09 Onboarding)."

**Output:** Expectativas niveladas.

### 5.10 — Registrar Métricas Diarias R08

**Output:** LTV, Revenue MRR reportado. **Evidencia:** Sales Dashboard actualizándose.

---

## 6-7. Ejecutar — Parte 2 y 3: Rescate y Soporte

### 6.1-6.5 — Cart Abandonment Campaign: Disparar a la Hora 1 (FAQs), Hora 24 (Social Proof final)

### 6.6-6.10 — Manejo manual/customer tier de pagos por transferencia bancaria / Pix si el usuario lo requiere

### 7.1-7.5 — Auditar tasas de rechazo de la pasarela. ¿Hay una IP de zona específica causando bloqueos del anti-fraude?

### 7.6-7.10 — Conciliación bancaria cruzada, documentar problemas de IVA / Tax, cierre del ciclo transaccional

---

## 8. Validación y Calidad (QA)

- [ ] Checkeos Diarios: Verificar log de errores de Zapier (Zero-tolerance para "pagó pero el LMS no generó la cuenta").
- [ ] No existen "Dead links" en el proceso de checkout.
- [ ] Emails transaccionales (facturas/accesos) configurados en IPs dedicadas para asegurar deliverability 100% y que no caigan en Spam.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Captura de Valor | MRR / LTV | Stripe/Pasarela | Finance |
| Client Profile | Customer Tag | CRM | Growth |
| Entregables | Access Link | Client Inbox | Ops / Automation |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [09-activar-onboarding-express](../../onboarding/activar-cliente/sop-09-onboarding/09-activar-onboarding-express-ritual.md).
- **Condición de handoff:** La venta comercial finalizó. Inicia formalmente el proceso de "Success / Delivery". El cliente tiene todo lo técnico resuelto y entra fresco al Onboarding.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Checkout Completion | ≥75% success | 🟡 |
| Time to Access Delivery| < 1 min | 🟡 |

- **NEXT:** `personas-masivo → 09 → activar-onboarding-express`
- **BLOCKERS:** `Problemas de Rate Limits o lentitud con pasarelas de pago externas`

---

## Modal 10x: El "Checkout Optimizer" (Prompt Pro)

**Use case:** Vas a lanzar una landing de checkout nuevo y requieres un set completo de copies atómicos diseñados para reventar toda fricción de último momento.

```markdown
PROMPT:
"Actúa como un CRO (Conversion Rate Optimization) Specialist experto en B2C.
Producto a vender: [Nombre del curso/asset], Precio: [USD 150].
El lead está en la pasarela de pago leyendo la parte derecha de la pantalla antes de poner la tarjeta de crédito.
Genérame:
1. Copy resumido del 'Value Stack' en 4 bullets poderosos que re-ancle por qué está pagando esto. (No listes features, lista transformaciones).
2. El 'Micro-Copy' de garantía de riesgo que irá justo debajo del input de tarjeta (2 líneas que eliminen el Buyer's Remorse inmediato).
3. Texto de la 'Thank You Page' que sea accionable y marque qué tiene que hacer el usuario entre el segundo 0 y el segundo 60 post-pago.
Cien por ciento accionable y directo al punto."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
