---
id: "08"

segmento: "empresas-smallbusiness"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "08-cerrar-acuerdo-y-agendar-kickoff"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Account Executive (AE) / Finanzas"
- backup: "Sales Director"
frecuencia: "por-evento (una vez el CEO da el SÍ final a la propuesta comercial o contrato digital)"
herramientas:

- "Herramienta de Firmas (PandaDoc / DocuSign)"
- "Plataforma de Checkout B2B (Stripe / Deel / Wire Transfer Manager)"
- "Agenda de Onboarding (Calendly Team)"
- "CRM (Closed Won Automation)"
entry-criteria:

- "Acuerdo documentado aceptado verbal o por correo por el Decision Maker."
- "Todos los bloqueos superados (R07 completado con éxito)."
exit-criteria:

- "Documento Maestro firmado digitalmente (Legal Bind)."
- "Factura enviada / Pago parcial procesado mediante checkout automatizado."
- "Sesión de Kickoff agendada en calendario de ambas partes en menos de 7 días hábiles."
- "CRM a estado 'Closed Won' disparando celebraciones globales."
kpi: "Time to Kickoff (Target: ≤7 días post-firma real, frenando remordimiento del comprador)"
leading-indicators:

- "Días entre Acuerdo Verbal y Firma Efectiva (Target: < 48 hrs)"
- "Días entre Factura enviada y Primer Abono (Target: < 72 hrs en PyME)"
- "Asistencia perfecta al evento agendado de Kickoff"

riesgos-controles:

- riesgo: "Remordimiento del Comprador (El CEO duda de su decisión una vez que manda el pago y hay silencio por 5 días de lado nuestro)"

  control: "Welcome Sequence inmediata. T-0 horas se envía un video introductorio y un 'Setup Táctico' ligero que mantiene al CEO ocupado y emocionado."

- riesgo: "Síndrome de 'Lo paga la contadora el mes próximo' (Acuerdo firmado, dinero en el limbo)"

  control: "Gate Financiero Duro: El Kickoff (R09) no arranca si el anticipo estipulado no golpeó las cuentas de la empresa. Disciplina operativa salva empresas B2B."

- riesgo: "AE desaparece tras cobrar y lanza al Lead al abismo de Operaciones (Mala transición)"

  control: "El AE debe ser el 'Host' en los primeros 5 minutos del Kickoff. Introduce al Delivery Team de MetodologIA, edifica a sus compañeros, y luego se retira."
evidencias:

- "PandaDoc Status = `Completed`"
- "Link de pago Stripe confirmado / Recibo de Transferencia anexado"
- "Deal en Hubspot movido de columna"
---

# Ritual: Cerrar Acuerdo y Agendar Kickoff — Empresas/SmallBusiness (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Small Business
> **Objetivo:** En PyMEs, la burocracia de compra es inexistente. En Corporate pueden tardar meses en Procurement; en PyMEs, de la firma al Kickoff deberían pasar 3 días.
> Tu trabajo aquí es eliminar el "Buyer's Remorse" (remordimiento de compra) orquestando un onboarding inicial (cobro + agendamiento) tan liso y veloz que el cliente sienta que contrató a élite táctica.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El instante mágico en el que la plataforma de Proposals (EJ. PandaDoc) notifica "El Cliente X ha firmado el documento". Y entra Inbound la orden.
- **Pre-ritual:** ¿Finanzas está alertada si hay algún término Custom de división de boletes/facturas según lo negociado en R07?
- **Contexto:** El Account Executive está en lo más alto de su euforia (acaba de cerrar una comisión). Es justamente aquí donde se descuidan los detalles que joden la experiencia de usuario. El cierre B2B es un baile sincronizado entre legal, pagos, y la inyección de confianza al cliente. Cero lag.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Formalizar legal y financieramente el acuerdo de SmallBusiness, sellar el ingreso transaccional (ARR/MRR o Setup), y transicionar suavemente la energía comercial inicial hacia la estructuración del canal de entrega (Delivery).
- **Definición de Éxito (DoD):**
  - [ ] Firmas electrónicas recabadas de manera inmutable.
  - [ ] Enlace B2B de pago (Stripe/Bank Transfer Guide) emitido y monitoreado.
  - [ ] Welcome Pack asíncrono enviado.
  - [ ] El Kick-Off (R09) está puesto en el calendario.
- **Definición de Éxito del Lead:** "Firmé ayer, pagué hoy en la mañana con tarjeta, y al minuto ya tenía la invitación a la Junta Inicial del martes siguiente junto a un video de los siguientes pasos."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Velocidad del flujo Cash-Cycle (Quote to Cash) |
| **Responsible** | Account Executive | Perseguir firma, emitir invoice request y programar onboarding |

| **Consulted** | Delivery / Ops Team | Emitir disponibilidad de agenda para el Kickoff B2B |
| **Informed** | Toda la empresa | Notificación de `Closed-Won` en #Sales Slack channel (Cultura) |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] "Handoff Document" mínimo (En el CRM) para Ops Team lleno (Saber qué se le vendió).
- [ ] Links de Stripe directos (Si es pago con CC) o Plantillas de Banking Routing (Si es Wire Transfer).
- [ ] Email de "Welcome to the Program" diagramado y personalizado.

---

## 5. Ejecutar — Parte 1: Orquestación Financiera y Legales (Firma & Dinero)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Emisión del Instrumento de Firma Digital

**Acción:** Generar y enviar vía CMS el Contrato MSAS o el Order Form.

**Output:** Documento en Bandeja del CEO.

### 5.2 — Confirmación y Fondeo Tecnológico

**Acción:** AE recibe notificación de documento Full-Signed.

**Output:** Deal cerrado a nivel legal.

### 5.3 — Gatillo de Emisión de Factura / Checkout B2B

**Acción:** AE genera la factura vía sistema (Xero/Quickbooks) o dispara Checkout (Stripe). "Tu contrato llegó, genial. Por acá saldamos el set-up inicial acordado".

**Output:** Flujo de Caja en tránsito.

### 5.4 — Notificación de Closed-Won Formal (CRM)

**Acción:** Mover columna a 'Closed Won'. Disparar automatizaciones corporativas (Ping de Slack, sumatoria de cuota cumplida, dashboard refresh).

**Output:** Morale de equipo + Métricas reales.

### 5.5 — Creación de Entorno B2B (Si aplica Hub)

**Acción:** Creación de carpeta en Drive corporativo "Cliente_X", o de su Slack Connect channel.

**Output:** Infraestructura de comunicación inicial.

### 5.6-5.10 — [Aviso a Ops con los 'Términos Raros' pactados (Ej: 'Este cliente no opera los Jueves'), confirmación o persecución moderada si la transferencia demora más de 72 Hrs (Follow-up de Finanzas, no de ventas), confirmación interna de conciliación de cuenta de banco, marcaje del LTV previsto del cliente]

---

## 6. Ejecutar — Parte 2: Aceleración (Orquestando el Kickoff)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Envío del 'Enlace de Kickoff' de Alta Fricción Reducida

**Acción:** No ir y venir con correos para agendar ("¿Puedes el martes?"). Usar enlace Calendly grupal o RoundRobin del equipo de Onboarding. "Por favor elige tu bloque de 45 mins aquí para el Kickoff oficial."

**Output:** Agendamiento fluido sin fricción.

### 6.2 — Bloqueo en Calendario Compartido

**Acción:** CEO bloquea cita. AE + Ops Team automáticamente requeridos en el evento.

**Output:** Reunión anclada.

### 6.3 — Envío de 'Welcome Pack' Asíncrono (Red de Seguridad Post-Compra)

**Acción:** Disparar un video de 3 mins del Sales Team / Founder agradenciendo o un PDF de "Qué esperar los próximos 30 días".

**Output:** Aislamiento del Buyer's Remorse. (Tranquilidad química en el cerebro del CEO).

### 6.4 — Diseño del Brief de Handoff Interno

**Acción:** El AE DEBE (es mandatorio) llenar un Brief interno para Ops: "Cuidado, su CEO está apurado, su DirRH es algo resistente al cambio. Les vendimos la opción Core. Objetivo primordial a 30 días fijado en la firma: Bajar rotación".

**Output:** Trasferencia de la Mente Comercial a la Operativa.

### 6.5 — Inyección del Pre-Work Liviano para el Kickoff

**Acción:** (Adjunto a la cita) "Para reventar la eficiencia del martes, necesitamos una lista de los Emails de tus 5 directivos en este Excel. Nada más."

**Output:** El cliente invierte esfuerzo (Sunk-cost) anclándolo rápido.

### 6.6-6.10 — [Establecer en el calendario que el AE asistirá los primeros 5 mins a la cita para 'Entregar la Antorcha', preparar minuta de Kick-off pre-llenada, confirmación automática 24 hrs previa a la cita con links funcionales validados]

---

## 7. Ejecutar — Parte 3: Gobernanza del Onboarding Precoz

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Auditoría de Integridad del Ciclo Cerrado

**Acción:** (Día 3 Post-Acuerdo). Sales Lead verifica. Deal Cerrado? ✓. Pagado? ✓. Documentado? ✓. Kickoff Existe? ✓.

**Output:** Saneo del pipeline.

### 7.2 — Manejo de la Parálisis (MIA post firma)

**Acción:** Si el CEO firma, no paga ni agenda el Kickoff. Protocolo Flash. AE le manda un Voice Note relajado asumiendo un fallo logístico, bajando presión pero poniendo fecha límite suave.

**Output:** Reactivación transaccional táctica.

### 7.3 — Celebración Directa en LinkedIn / Referidos (Opcional Táctico)

**Acción:** Si corresponde, y con permiso. Conectar o seguir el progreso macro de la empresa.

**Output:** Expansión digital natural de la marca B2B.

### 7.4 — Traspaso del Riesgo (Handoff a R09)

**Acción:** Todo queda documentado para que el Especialista de Onboarding tome el volante.

**Output:** Finalización de la Fase de Negociación pura.

### 7.5 — Desconexión AE

**Acción:** AE cierra sus tasks de adquisición, registra comisiones prospectadas, y recarga pipeline superior y R01s en su mente.

**Output:** Reset orgánico de Capacidad Operativa.

### 7.6-7.10 — [Notificación mensual al archivo de Sales Analytics de "Por qué ganamos", recolección mental del Insight principal ("Ganamos porque el competidor reaccionó lento"), almacenamiento permanente de PDFs legales en Drive seguro, asignación de Lifecycle State en HubSpot a `Customer` puro]

---

## 8. Validación y Calidad (QA)

- [ ] Velocidad Cero Absoluto: Prohibido tener "Leads Cerrados con Firma" rebotando 15 días sin que Operaciones les genere el Kickoff. Falla que genera refund y demandas. Onboarding debe suceder < 7 Días.
- [ ] Regla de Preservación Legal B2B: Nadie arranca labores de entrega, ni asesora técnicamente, ni manda una plantilla, hasta que Finanzas confirme el flag `PAID`. Somos consultores de Standard Oro, no se trabaja en promesa en Pymes.
- [ ] Muerte al Vacío de Información (Silo): Prohibición de que Operaciones asista al Kick-off haciendo la terrible pregunta "Y bien... cuéntenme, ¿qué problemas tienen ustedes?" (Esto enfurece al B2B: 'Acabo de contárselo 2 horas a tu vendedor'). El AE debió transferir TODO el briefing para el Handoff.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Deal Closed Won | CRM Move | Hubspot Pipeline | AE |
| Revenue Procesado | Notificación Stripe | Finance Channel | AE/Finanzas |
| Sesión Onboarding Start| Confirmación Calendario| Schedule Corporativo | Onboarding/AE |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [09-ejecutar-onboarding-empresarial](../../fulfillment/ejecutar-programa/sop-08-operativa/09-ejecutar-onboarding-empresarial-ritual.md) O `Handoff a Corporate` si existió un Upsell meteórico y se saltó la cerca de Pyme a Enterprise.
- **Condición de handoff:** El contrato está archivado. El dinero fluyó (al menos el inicio operativo). La expectativa de Kick-off ha sido seteada, bloqueada e inyectada con Dopamina comercial (Cero Remordimientos de compra). El Caza/Vendedor entrega la presa al Productor/Delivery en perfecta condición para iniciar.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Time to Kickoff | ≤ 7 Días post-firma | 🟡 |
| Tasa de Abono Recaudado| 100% SLA previo | 🟡 |

- **NEXT:** `empresas-smallbusiness → 09 → ejecutar-onboarding-empresarial`
- **BLOCKERS:** `Problemas en plataformas de pagos internacionales para tarjetas de Pymes LATAM o retenciones corporativas raras en aduana digital.`

---

## Modal 10x: El "Buyer's Silence Defuser" (Prompt Pro)

**Use case:** Hoy es Lunes. Firmaste el PDF el jueves pasado con ese CEO. La factura salió de inmediato. Llevas 4 días sin ver el Wire Transfer entrar, y tus correos de "Agenda aquí tu kickoff" están siendo ghosteados. Estás entrando en pánico de que se arrepintió durante el fin de semana. No puedes sonar desesperado pidiendo el dinero. Necesitas un empujón hiper-discreto que lo haga accionar sin ofenderlo.

```markdown
PROMPT:
"Actúa como un Especialista en Crisis Comunicacional B2B y Account Executive de clase mundial.
Tengo un CEO de PyME que ya firmó el contrato de su cuenta, pero se ha convertido en 'Fantasma' y no ha procesado el pago de Setup tras 4 días, bloqueando la agenda de su Kickoff conmigo.
No quiero preguntarle '¿Ya pagaste?' ni sonar necio.
Redacta UN SOLO EMAIL HIPER-BREVE (El 'Safety Net Message').
En este mail, asumo la culpa de que él está súper ocupado apagando un incendio, le doy el pretexto táctico para salvar cara ('Quizás [Módulo administrativo] retuvo el trámite interno'), y anclo un gancho ineludible ('Tengo que pedir la agenda con el equipo y si no confirmo hoy te pierdes el slot de esta semana que querías').
Todo en tono Cero-Agresivo, High-Status, Consultivo Absoluto."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Small Business
> **Powered by:** MetodologIA Governance Protocol
