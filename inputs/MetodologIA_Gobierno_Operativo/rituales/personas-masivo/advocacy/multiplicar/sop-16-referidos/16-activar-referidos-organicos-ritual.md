---
id: "16"

segmento: "personas-masivo"
journey: "advocacy"
proceso: "multiplicar"
sop: "sop-16-referidos"
ritual-slug: "16-activar-referidos-organicos"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead"
- backup: "Community Manager"
frecuencia: "asincrónica automática (ligado a momentos de Dopamina/NPS Alto)"
herramientas:

- "Software de Afiliados/Referrals (Rewardful/ReferralCandy/PartnerStack)"
- "Marketing Automation CRM"
- "Página de Destino Oculta (Partner Hub)"

entry-criteria:

- "Cliente completó un hito mayor del curso (Ej. Completó Módulo Final)"
- "O Cliente puntuó NPS 9-10 (Promotor validado)"
exit-criteria:

- "Cliente activó su link único de referido"
- "Cliente recomendó activamente generando tráfico medible"
- "Cálculo en vivo del K-Factor y el CPA negativo validado"

kpi: "Viral Coefficient / K-Factor (Target: K > 0.1, y ≥15% base activa convirtiéndose en afiliados referidores)"
leading-indicators:

- "Referral Link Activation Rate (Clientes que solicitan su link)"
- "Shares per User (Ratio de enlaces compartidos)"
- "Conversion Rate MQL de fuente Referido"

riesgos-controles:

- riesgo: "Mendigar a los clientes (Sonamos desesperados pidiendo que nos traigan ventas)"

  control: "Cambio de marco conceptual: 'Dale $100 de descuento a un amigo', transfiere poder, no desesperación."

- riesgo: "Fricción Técnica (Es muy difícil sacar el link y compartirlo)"

  control: "1-Click Copy. El link mágico de referido debe vivir en su dashboard principal de LMS."

- riesgo: "Miedo a vender a los amigos (Fricción social)"

  control: "Darles Assets (Swipes, textos, historias de IG) pre-fabricados para descargarle la carga cognitiva de cómo explicar nuestro producto."
evidencias:

- "Altas en la plataforma de Referral Partner"
- "Pago de comisiones/recompensas liquidado en Stripe"
- "Volumen de 'Referred MQLs' en los cohortes de ingreso"
---

# Ritual: Activar Referidos Orgánicos — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** Adquirir en frío (Ads) es la forma más cara de vivir. Adquirir de la boca de un cliente transformado cuesta un 80% menos y convierte 5x mejor.
> El objetivo de este ritual es transformar pasivamente el Goodwill (buena voluntad) del cliente en una máquina descentralizada de CAC-$0 mediante infraestructuras de recompensa a 1 clic.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El "Ask" se dispara automáticamente en 2 ventanas temporales críticas: (1) 48h después de un NPS 10, o (2) 2 horas después de recibir el certificado de graduación del programa.
- **Pre-ritual:** ¿Está definido el Modelo Económico de recompensa? (Ej. Gana $50 cash vs Gana 3 meses gratis vs Descuento Doble Cara).
- **Contexto:** En B2C Masivo, los Promotores silenciosos no sirven. Quieren halagarte, pero no saben cómo. Tu trabajo es darles el sable, la armadura y la dirección hacia la batalla exacta, pero haciéndolo sentir que todo es un acto de estatus y benevolencia para sus amigos.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Orquestar y automatizar el boca a boca convirtiendo el éxito de los alumnos en un motor de adquisición viral que colapse el CAC promedio (Customer Acquisition Cost) de la empresa.
- **Definición de Éxito (DoD):**
  - [ ] Sistema de tracking transaccional en pie
  - [ ] Invites disparados automáticamente a perfiles "Promotor"
  - [ ] Alta de Embajadores (Generación de Links)
  - [ ] Recompensas (Payouts/Credits) liberadas sistemáticamente sin esfuerzo manual
- **Definición de Éxito del Lead:** "Me encantó tanto el programa que se lo comenté a mi socio. Me pasaron un link, él entró con descuento y a mi me regalaron un mes extra en la comunidad. Win-Win perfecto."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Minimizar el CAC General usando Referidos (K-Factor) |
| **Responsible** | Affiliate / Ops | Pagar/Acreditar las recompensas sin retraso |

| **Consulted** | Finanzas | Aprobar la estructura de comisiones/descuentos del Double-Sided reward |
| **Informed** | CX Lead | Resolver problemas con el código de descuento del amigo |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Arquitectura de Recompensa Double-Sided seleccionada ("Dale $50, gana $50").
- [ ] Integración Software de Referidos (Rewardful) activa con Stripe y CRM.
- [ ] Portal del Afiliado/Referidor brandeado (Donde sacan su link y ven sus clics).
- [ ] Activos 'Swipeables' creados (2 emails pre-escritos, 1 post de LinkedIn, 1 Story de IG).

---

## 5. Ejecutar — Parte 1: Orquestación del Pedido (The Ask)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparo del Email de Ascensión (The Ask)

**Contexto:** Se envía solo a los altamente satisfechos.

**Script Base:** "Casi nadie termina este curso, y tú lo hiciste. Tienes el nivel para el Inner Circle. Te he activado un link privado. Úsalo para invitar a un colega: tú le das $100 off a él en su entrada, y el sistema te deposita automáticamente $100 a ti (o te lo abona al próximo año). Ayúdame a traer a gente seria."
**Output:** Solicitud de referidos enviada.

### 5.2 — Landing Page de "Partner Secreto"

**Acción:** El link del email debe llevar a una página de fricción casi nula (O pre-loguear al usuario a través del token del correo).

**Output:** Lead genera visualmente su link `brand.com/tu-nombre`.

### 5.3 — Provisión del Armamento (Swipes)

**Acción:** Justo debajo del link, la instrucción dice "No pienses qué escribirle a tu amigo. Copia esto por Whatsapp y pon tu link al final."

**Output:** Carga cognitiva eliminada.

### 5.4 — Gamificación: El "First Referral" Push

**Acción:** Si pasaron 7 días desde que aceptó ser referidor pero no tiene clics, enviar un empujón suave de la comunidad.

**Script:** "Ayer 15 colegas cobraron su recompensa por traer a sus amigos de la oficina. Tu link sigue en cero. Si no sabes a quién pasárselo, publícalo en tu LinkedIn con este texto exacto adjunto."
**Output:** Activación social temprana.

### 5.5 — El Bucle Inverso: Email Automático Post-Venta Exitosa

**Acción:** (Día 10) El amigo del referidor compra usando el link.

**Disparo Automático:** "¡Ka-ching! [Nombre del amigo] acaba de entrar gracias a ti. Tu recompensa está procesándose. Esa es la manera. ¿A quién más conoces que necesite esto?"
**Output:** Golpe de Dopamina y refuerzo del loop viral.

### 5.6 — Liquidación de Recompensas (The Payout)

**Regla Legal/Financiera:** Los pagos o créditos ocurren a los D+30 (Por si el amigo pide refund).

**Acción:** Growth/Finance aprueba bulk-payouts en Stripe/Rewardful, y Stripe emite la orden de abono de crédito o PayPal.
**Output:** Credibilidad transaccional (Pagar a tiempo genera fans mortales).

### 5.7 — Leaderboard de Referidos en la Comunidad

**Acción:** Si la dinámica es pública, el CM pinea un post con el "Top 5 conectores del mes". El status social impulsa a la base a querer figurar.

**Output:** Reconocimiento No-monetario.

### 5.8 — Limpieza de "Fraudes" de Referidos

**Acción:** Bloqueo automatizado: Evitar que alguien se auto-refiera usando su segundo correo de gmail simplemente para ganar el 50% de la comisión en una cuenta paralela. Configurar filtros de IP si es masivo.

**Output:** Sistema limpio y rentable.

### 5.9 — Medición del Impacto Blended CAC

**Acción:** Calcular (Adspend Mensual / (Nuevos Clientes de Pago + Nuevos Clientes Referidos)).

**Output:** Visibilidad empírica de cómo los referidos abaratan el gasto en Facebook/Google Ads.

### 5.10 — Feedback Loop de Audiencia

**Acción:** Los leads referidos tienen un comportamiento diferente. ¿Son mejores? ¿Tienen un LTV más alto que los fríos? Se traslada este dato a Marketing (Si los referidos son mejores, podemos pagar más comisión de referido).

**Output:** Dato maestro ajustado.

---

## 6-7. Ejecutar — Parte 2 y 3: Compresión Viral y Expansión

### 6.1-6.5 — Crear el "Micro-Affiliate Tier": Transformar a Influencers pequeños (alumnos con 5M views en TikTok) de referidores normales a Partners B2B, aumentando su comisión base o dándoles un código nominal personalizado ("Usa el código EDUARDO")

### 6.6-6.10 — Inyectar el enlace de referidos en "Bienes Raices Digitales Muertos" (En la firma de todos nuestros emails de soporte de CX, bajo los videos free de youtube, en el header de las facturas enviadas)

### 7.1-7.5 — Probar dinámicas de Escasez: "Doble comisión de referido pero sólo en las próximas 48 horas como aguinaldo de verano"

### 7.6-7.10 — Calcular exactamente el K-Factor del producto (Si de cada 10 clientes, obtenemos 2 ventas referidas matemáticamente consistentes, el K-Factor es 0.2)

---

## 8. Validación y Calidad (QA)

- [ ] Cero retrasos de comisión: Si se promete un pago el Día 30, el sistema debe liquidarlo o enviar un email informando. Odiar a una marca por falta de pago anula 10x todo el esfuerzo metodológico.
- [ ] No canibalizar el modelo principal: Un link de referido no debe posicionar orgánicamente por encima del nombre de búsqueda de marca originando competencia por las propias palabras clave del SEM de la compañía corporativa.
- [ ] Copy del 'Amigo': El landing page que recibe al referido no debe ser genérico, debe decir "Bienvenido. Estás acá porque uno de los top % de nuestros alumnos pensó que eres el perfil correcto. Has desbloqueado el descuento privado de tu amigo."

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Links Únicos | Base de Afiliados | PartnerStack/CRM | Ops |
| Referred MRR | Revenue Tagged | Stripe Analytics | Growth Lead |
| Bucle de Payout | Transacciones | Pasarela Fiscal | Finance |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [01-captar-senal-vida](../../discovery/descubrir-necesidad/sop-01-lead/01-captar-senal-vida-ritual.md) (El ciclo inicia nuevamente, pero con el Referral Traffic inyectándose limpio a la fase 1).
- **Condición de handoff:** El alumno "Personas Masivo" no solo fue exitoso y renovado, sino que plantó las semillas de la próxima generación reduciendo matemáticamente la presión financiera de crecimiento sobre la compañía. Fin del Journey principal.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Activación de Links | ≥15% base promotores | 🟡 |
| Blend CAC Reduction | Δ -15% Net | 🟡 |

- **NEXT:** `END OF JOURNEY -> Vuelve a R01 (vía Lead Generado por Referido)`
- **BLOCKERS:** `Limitaciones con billeteras locales impidiendo el cash-payout automático en ciertos países`

---

## Modal 10x: El "Viral Architecture Builder" (Prompt Pro)

**Use case:** Estás listo para encender tu programa de afiliados masivo entre tus estudiantes de "Academia de Código B2C". No sabes qué recompensa Double-sided poner que sea sexy pero no destruya el margen.

```markdown
PROMPT:
"Actúa como un Growth Architect obsesionado con el K-Factor Viral.
Mi negocio tiene un curso digital B2C de $500, con un 80% de gross margin general. CAC en Ads es caro ($150).
Quiero montar una recompensa agresiva 'Double-Sided' y un plan de ataque para mis egresados más top NPS.
Genera lo siguiente:
1. EL CÁLCULO DE RECOMPENSA: Recomiéndame en dólares (no %) un 'Give & Get' (Dale X de descuento al amigo, llévate Y cash tú). Que luzca jugoso y asimétrico, pero que me cueste lo mismo o menos que mi CAC actual en MetaAds ($150).
2. EL EMAIL DE ORO: El correo exacto 'The Ask' que dispararé a mis egresados, anclando su ego al proceso. Debe hacer sentir que este código de descuento secreto es un 'Asset de Poder' que tienen en la industria, no un trabajito de ventas multinivel. Neo-Swiss Tone, frío pero electrizante."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
