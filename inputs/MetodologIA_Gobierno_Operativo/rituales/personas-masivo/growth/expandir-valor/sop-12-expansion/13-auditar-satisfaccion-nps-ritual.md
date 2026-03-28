---
id: "13"

segmento: "personas-masivo"
journey: "growth"
proceso: "expandir-valor"
sop: "sop-12-expansion"
ritual-slug: "13-auditar-satisfaccion-nps"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "CX Lead"
- backup: "Growth Lead"
frecuencia: "asincrónica dinámica (trigger post-100% completion o Día 30)"
herramientas:

- "NPS Software (Delighted / Typeform / AskNicely)"
- "CRM Marketing Automation"
- "Looker / Google Data Studio"

entry-criteria:

- "Cliente completó el 100% del programa (Adoption = High)"
- "O Cliente alcanzó el Día 30 desde la activación (Time-based trigger)"
exit-criteria:

- "NPS Score (0-10) y Feedback cualitativo (Verbatim) capturados"
- "Ruteo automático ejecutado según score (Detractor/Passive/Promoter)"
- "Alerta inmediata a CX si el score es ≤6"

kpi: "NPS Response Rate (Target: ≥20% de la base encuestada responde)"
leading-indicators:

- "Score Promedio Mensual"
- "Ratio de Promotores vs Detractores (NPS absoluto)"
- "Volumen de Verbatims accionables"

riesgos-controles:

- riesgo: "Fatiga de encuestas (Nadie responde un form de 10 preguntas)"

  control: "Hard Limit: La encuesta tiene solo 1 clic (número en el correo) y 1 caja de texto opcional. Fin."

- riesgo: "Score inflado por sesgo de supervivencia (Solo responden los que terminaron súper felices)"

  control: "El trigger por tiempo (Día 30) captura a los que abandonaron en silencio."

- riesgo: "Data estéril (Medimos el NPS pero nadie hace nada con el feedback de los scores bajos)"

  control: "Automatización innegociable: Un score ≤6 levanta ticket mandatorio en la cola de soporte (RACI: CX Lead)."
evidencias:

- "Registro de NPS_Score en el perfil del cliente en CRM"
- "Dashboard Consolidado de NPS Mensual"
- "Tickets de Soporte generados para detractores resueltos"
---

# Ritual: Auditar Satisfacción NPS — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** En ventas masivas, el NPS no es una métrica de ego para RRSI, es un switch de ruteo de negocio:
> Los que dan 9-10 son oro puro para escalabilidad (Testimonios y Referidos). Los que dan 0-6 son fallas estructurales del producto que revelan exactamente por qué nos estancaremos en churn.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Se dispara algorítmicamente en el hito de completitud (Paso 5.4 del R10) o al cumplirse el cumpleaños de 1 mes del cliente en la plataforma, lo que pase primero.
- **Pre-ritual:** ¿Está integrada la herramienta de encuestas para que el 'clic' numérico caiga directo en el CRM, sin requerir re-escribir el email?
- **Contexto:** El cliente ha tenido tiempo suficiente (30 días o todo el temario) para juzgar empíricamente el Valor vs Precio. Su opinión en este instante específico dicta su Permeabilidad al Upsell (R14) o su Riesgo de Refund/Difamación.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Capturar el Net Promoter Score estandarizado, clasificar a la base y detonar los Playbooks de mitigación (para detractores) y amplificación (para promotores).
- **Definición de Éxito (DoD):**
  - [ ] NPS Survey enviado sin fricción (In-email click)
  - [ ] Score capturado y asignado al registro de CRM
  - [ ] Workflow de detractor (Notificación CX) ejecutado
  - [ ] Workflow de promotor (Upsell/Referral prompt) ejecutado
- **Definición de Éxito del Lead:** "Me tomó 2 segundos decirles lo que pienso, y cuando puse un 5, alguien me escribió para arreglar mi problema."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Ops Lead | Integridad del flujo de datos (Delighted -> CRM) |
| **Responsible** | CX Lead | Intervenir a los Detractores (<6) y cerrar su ticket |

| **Consulted** | Product / Content | Para detectar patrones en el verbatim de los detractores |
| **Informed** | Growth Lead | Saber el volumen de Promotores disponibles para R14 |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Software de NPS transaccional conectado al CRM.
- [ ] Template visual del Email NPS (Pregunta única + botones 0 al 10 embebidos).
- [ ] Zaps/Reglas creadas para derivación trinivel (0-6 / 7-8 / 9-10).
- [ ] SLA de respuesta acordado con CX para detractores (Max 24h).

---

## 5. Ejecutar — Parte 1: Ingesta y Segmentación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparo Automático de la Encuesta

**Contexto:** El email debe ser estéril, corporativo y puro, para no sesgar emocionalmente ("¡Por favor califícanos alto!").

**Script:** "Llevas [30 días / completaste el programa]. Queremos saber la verdad desnuda. Del 0 al 10, ¿qué tan probable es que recomiendes este producto a un colega o amigo?"
**Output:** Campaña enviada.

### 5.2 — Captura Fricción Cero (In-Email Click)

**Acción:** El usuario hace clic en el número "8" directamente en su bandeja de entrada. La página siguiente solo dice: "Gracias. Opcional: ¿Cual fue la razón principal de tu calificación?".

**Output:** Captura limpia del score numérico.

### 5.3 — Sincronización Inmediata con CRM

**Acción:** El score (8) y el estado (Pasivo) se copian a un `custom_field` en el CRM del Contacto.

**Output:** Lead unificado.

### 5.4 — Ruteo: El Flujo del Detractor (0-6)

**Acción:** El sistema frena la automatización de marketing (sacar de listas de upsell) y levanta alerta roja.

**Output:** Ticket creado en el Board de CX.
**Evidencia:** Slack Alert (Canal `#nps-alerts`).

### 5.5 — CX Lead Triage (El Rescue Call)

**Acción:** CX Lead lee el ticket y el verbatim (Si dejó). Si puso "4" y no dejó comentario, se envía email manual en <24h.

**Script:** "[Nombre], vi que calificaste tu experiencia con un [Nota]. Soy [CX Lead]. Algo falló de nuestro lado y quiero arreglarlo. Si tienes 2 minutos, dime en qué nos quedamos cortos. No es un bot, te leo yo."
**Output:** Intervención manual cualitativa.

### 5.6 — Ruteo: El Flujo del Pasivo (7-8)

**Acción:** Los pasivos están satisfechos pero no emocionados. No recomendarán el producto orgánicamente.

**Automatización:** Guardar score, no hacer alertas, enviarlos a Nutrición de Contenido (Newsletter estándar) para seguir madurándolos antes de ofrecer Up-Sell (R14).
**Output:** Lead en Holding Pattern.

### 5.7 — Ruteo: El Flujo del Promotor (9-10)

**Acción:** Oro puro. Estos clientes están eufóricos con el ROI.

**Automatización:** Actualizar tag a `Brand_Promoter`. Esperar 48 horas post-encuesta.
**Output:** Pipeline para Upsell / Referidos.

### 5.8 — El Peticionario de Testimonio (Día 3 post-Promotor)

**Acción:** Enviar email táctico pidiendo favor social (Review pública o Video).

**Script:** "¡Wow! Gracias por el [10]. Significa el mundo para el equipo. Si este método realmente te ayudó con [Dolor Inicial], ¿tendrías 60 segundos para grabarnos un video acá [Link de VideoAsk]? Usamos esos casos para las clases. Si no puedes, no pasa nada, seguimos a full."
**Output:** Harvest de Social Proof para R07 (Confianza Social).

### 5.9 — Consolidar el Dashboard NPS Macro

**Acción:** Visualizar el ratio neto (Promotores % - Detractores %) semanal y mes a mes.

**Output:** Termómetro de producto.
**Evidencia:** Data Studio / Dashboard interno.

### 5.10 — Cerra Ticket de Detractor

**Acción:** Una vez que CX Lead responde/mitiga el problema del detractor, marcar el evento como `Resolved_Negative` y documentar la lección para el Content Lead.

**Output:** Ciclo de dolor cerrado.

---

## 6-7. Ejecutar — Parte 2 y 3: Minería de Datos y Feedback Loop

### 6.1-6.5 — Word Cloud Forense: Exportar todos los Verbatims de los Detractores (0-6) a Chat-GPT y pedirle: "Dime cuáles son los 3 procesos que más frustran a mis clientes, ignorando ruido aislado"

### 6.6-6.10 — Sesión de "Product Review" mensual: Presentar los descubrimientos del Word Cloud a Product/Content para que rediseñen el módulo o la oferta responsable de la frustración

### 7.1-7.5 — Re-encuestar (NPS de Segunda Vuelta) a clientes de permanencia larga (Mes 6 o Año 1) para medir desgaste del producto en el tiempo (LTV Sentiment)

### 7.6-7.10 — A/B Test del email de solicitud de Referidos / Video Testimonial, buscando el mayor ratio de conversión posible para alimentar el ecosistema

---

## 8. Validación y Calidad (QA)

- [ ] Prevención de Fatiga: Un usuario nunca debe recibir más de un SMS/Email de NPS por programa (A menos de que haya un trigger de largo plazo justificado).
- [ ] No mendigar calificaciones: No se ofrecen "descuentos" a cambio de poner un 10. Eso contamina matemáticamente la métrica y destruye la percepción "Sovereign".
- [ ] Confidencialidad: Si el verbatim incluye datos privados del cliente (ej. menciona su negocio/finanzas como excusa del mal score), asegurar que ese verbatim no se suba a dashboards públicos de la empresa.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Global NPS Score | Métrica (0-100) | Dashboard General | Ops Lead |
| Detractor Alert Tickets | CRM Board | Hub de Soporte | CX Lead |
| Repositorio de Testimonios| Videos/Textos | Notion / CMS | Content Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [14-detectar-upsell-masivo](14-detectar-upsell-masivo-ritual.md) (Solo para el flujo de Promotores o Pasivos calientes).
- **Condición de handoff:** Sabemos exactamente qué clientes aman la marca y están listos para gastar más dinero o traer amigos (Growth), y qué clientes odian la marca y deben ser contenidos y compensados operativamente (Damage Control).

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Tasa de Respuesta NPS | ≥20% enviadas | 🟡 |
| Intervención CX (detractores)| < 24h sla | 🟡 |

- **NEXT:** `personas-masivo → 14 → detectar-upsell-masivo`
- **BLOCKERS:** `Bajas tasas de open-rate en los correos encubren el verdadero nivel de detractores`

---

## Modal 10x: El "NPS Verbatim Analyzer" (Prompt Pro)

**Use case:** Tienes 500 respuestas abiertas opcionales de NPS del último trimestre y no tienes 3 horas para leerlas una por una. Necesitas extraer el veneno y la miel en 10 segundos.

```markdown
PROMPT:
"Actúa como Product Marketing Manager y CX Analyst nivel Senior.
Te pego abajo un JSON/CSV crudo con 500 respuestas Verbatim del NPS (Texto abierto opcional). Algunas son quejas largas, otras son 'todo bien', otras son halagos a funciones específicas.
Ejecuta tu análisis y dame:
1. THE POISON: Las 3 quejas estructurales más urgentes de arreglar (Omite caprichos aislados, busca patrones repetidos). Dame el 'Por qué' duele.
2. THE HONEY: Las 3 'features' o Módulos que la gente más amó. (El verdadero valor percibido de mi producto, para que yo refuerce mi marketing con eso).
3. THE COPY: Redáctame un correo genérico pero altamente empático de 4 líneas que enviaré a todos los detractores pidiendo disculpas y anunciando que 'el equipo de producto ya está trabajando en [Veneno #1]'. Neo-Swiss Tone, humilde y firme."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
