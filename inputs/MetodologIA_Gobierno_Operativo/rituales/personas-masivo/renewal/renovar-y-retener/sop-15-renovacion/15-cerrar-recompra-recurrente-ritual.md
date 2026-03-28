---
id: "15"

segmento: "personas-masivo"
journey: "renewal"
proceso: "renovar-y-retener"
sop: "sop-15-renovacion"
ritual-slug: "15-cerrar-recompra-recurrente"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth Lead / Operations"
- backup: "Marketing Automation"
frecuencia: "continua (disparada D-30 antes del vencimiento de suscripción)"
herramientas:

- "CRM Marketing Automation"
- "Stripe Billing / Plataforma de Pagos (ReCharge)"
- "LMS Analytics"

entry-criteria:

- "Cliente con modelo de suscripción activa a D-30 de expirar"
- "O Cliente de pago único que calificó para un producto de 'Mantenimiento / Alumni'"
exit-criteria:

- "Renovación cobrada automáticamente (MRR/ARR retenido)"
- "O Cliente pausado/cancelado con Exit Survey completado"
kpi: "Net Retention Rate (NRR) (Target: ≥85% de retención de cohortes anuales)"
leading-indicators:

- "Volumen de 'Card Expiring' warnings resueltos"
- "Open Rate de los correos de Pre-Expiry (D-15)"
- "Ratio de Downgrade (bajan de plan pero no churnean)"

riesgos-controles:

- riesgo: "Churn Involuntario (La tarjeta caducó, el banco bloqueó, nadie le avisó)"

  control: "Dunning Process implacable: La campaña de recuperación de pagos fallidos arranca el D-0 y no para hasta el D+14."

- riesgo: "Síndrome de la Suscripción Olvidada (Cliente se enoja porque le cobraron sin avisar)"

  control: "Transparencia extrema. D-15 se avisa el cobro inminente, pero anclándolo a un reporte de su progreso (Value Snapshot)."

- riesgo: "El cliente cancela porque no tiene tiempo para consumir el contenido"

  control: "Bypass de Cancelación: Ofrecer un 'Pause Account for 3 months' en 1 clic antes del botón final de cancelar."
evidencias:

- "Factura de Renovación pagada en Stripe"
- "Tag de CRM actualizado a `Retained_Year_2`"
- "Logs del Dunning Process para cobros fallidos"
---

# Ritual: Cerrar Recompra Recurrente — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** La retención no se gana el Día 364 suplicando que no se vayan. Se gana el Día 1 con Onboarding y se consolida con el Value Snapshot pre-renovación.
> Un MRR (Ingreso Recurrente) predecible requiere tratar a la Inercia Financiera como un riesgo, no como una estrategia.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Exactamente 30 días antes del ciclo de renovación anual (o 7 días antes en suscripciones mensuales).
- **Pre-ritual:** ¿Está parametrizado el Dunning Process en Stripe y el CRM para sincronizarse bidireccionalmente?
- **Contexto:** En B2C Masivo, los clientes cancelan suscripciones durante limpiezas financieras impulsivas. Si el cargo les llega por sorpresa, pedirán refund y se irán molestos. Si se les avisa con gracia validando el valor retenido, la renovación se vuelve una re-decisión consciente y feliz.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Sistematizar la captura de renovaciones reduciendo a 0% el churn involuntario por fricción de pagos, y minimizando el churn voluntario mediante recordatorios de valor.
- **Definición de Éxito (DoD):**
  - [ ] Value Snapshot enviado (D-15)
  - [ ] Tarjetas próximas a expirar actualizadas proactivamente
  - [ ] Cargo automático de renovación exitoso
  - [ ] Off-boarding digno y captado en Survey para los que cancelan
- **Definición de Éxito del Lead:** "Me recordaron amablemente que se venía el cobro anual, me mostraron todo lo que usé la plataforma, y me fue fácil actualizar mi tarjeta que estaba por vencer."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Finance / Ops Lead | MRR retenido y control de Refunds |
| **Responsible** | Automation Ops | Cadenas de Dunning y pre-warnings activas |

| **Consulted** | CX Lead | Intervenir cancelaciones de cuentas de alto perfil/antigüedad |
| **Informed** | Growth Lead | Conocer la tasa de fuga para ajustar el CAC permitido |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Stripe Dunning Management configurado (Reintentos: D+1, D+3, D+7).
- [ ] Email templates transaccionales redactados por CX (no por el contador).
- [ ] Link de "Update Payment Method" fricción-cero.
- [ ] Botón de "Pausar Membresía" operativo en el panel de usuario.

---

## 5. Ejecutar — Parte 1: Pre-Warning y Value Recap

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Identificar Filtro de Vencimientos Inminentes (D-30)

**Acción:** El sistema detecta tarjetas expirando *antes* de la fecha de cobro de renovación.

**Output:** Alerta temprana.

### 5.2 — Campaña de Mantenimiento de Hardware (Proactiva)

**Acción:** Si la tarjeta expira, disparar email.

**Script:** "Hola [nombre], el mes que viene toca tu renovación, pero notamos que tu tarjeta terminada en [1234] caduca pronto. Evita cortes de servicio actualizándola en 1 clic aquí: [Link Seguro]."
**Output:** Prevención de Churn Involuntario.

### 5.3 — Enviar el "Value Snapshot" (D-15)

**Contexto:** Recordarles el valor antes del cobro es clave legal y ética.

**Script:** "[Nombre], llevas 1 año con nosotros. En este tiempo completaste [X] módulos y fuiste parte de [Y] hitos comunitarios. Tu membresía se renueva en 15 días automáticamente para asegurar tu precio actual."
**Output:** Anclaje psicológico de valor.

### 5.4 — Ejecución de Cargo Automático (D-0)

**Acción:** Stripe/Gateway procesa el pago.

**Output:** Resolución binaria (Success/Fail).

### 5.5 — El Happy Path (Success)

**Acción:** Disparo de factura y celebración.

**Script:** "Renovación exitosa. Entramos al Año 2. Aquí está tu recibo y tu acceso prioritario al nuevo Módulo de [Novedad]."
**Output:** Retención Lograda.

### 5.6 — El Pain Path: Activación del Dunning (Cobro Fallido D+0)

**Acción:** El banco rechaza el cargo. Se congela acceso condicionalmente.

**Script (Suave):** "Hubo un pequeño problema procesando la renovación. A veces los bancos bloquean cargos por error. Tu acceso sigue activo por 3 días más. Clic aquí para re-intentar o cambiar la tarjeta."
**Output:** Grace Period activado.

### 5.7 — Escalada de Dunning (D+3 y D+7)

**Acción:** Reintentos automáticos del gateway. El tono del correo sube la urgencia.

**Script D+7:** "Tu cuenta entrará en suspensión a la medianoche. Perderás el historial X y el precio Legacy Y."
**Output:** Urgencia final.

### 5.8 — El flujo de Cancelación Voluntaria (Off-boarding)

**Contexto:** Si durante el D-15 decide cancelar, no esconder el botón.

**Acción:** El usuario entra al portal a cancelar. Presentar el "Cancellation Wall".
**Cancellation Wall:** 1era Pantalla: "¿Carga pesada de trabajo? Puedes pausar el cobro por 3 meses". 2da Pantalla: Down-sell (Bajar al plan LITE). 3era Pantalla: Cancelar definitivamente.

**Output:** Retención por mitigación de alternativas.

### 5.9 — Exit Survey (Requisito Post-Cancelación)

**Acción:** Disparo de Typeform de 2 clics.

**Script:** "Cancelación procesada. Se te extrañará. ¿Nos ayudas con 1 clic? ¿Por qué te vas? [Precio] [Falta de tiempo] [Ya logré el objetivo] [Me voy con la competencia]."
**Output:** Churn Intelligence Data.

### 5.10 — Revocación de Accesos y Limpieza de CRM

**Acción:** Retirar tokens LMS y remover de listas activas de Email/Discord.

**Output:** Infraestructura sanitizada.

---

## 6-7. Ejecutar — Parte 2 y 3: Recovery y Pricing Power

### 6.1-6.5 — Win-Back Campaign (D+60): "Hace 2 meses nos dejaste. Lanzamos la versión 2.0 y arreglamos el problema que nos marcaste en tu encuesta de salida. Vuelve con este pase mensual"

### 6.6-6.10 — Analizar correlación de Churn vs Uso: Confirmar la hipótesis estadística de que "Quien no se loguea en los 45 días previos a la renovación, cancela el 90% de las veces" para crear intervenciones tempranas (R11)

### 7.1-7.5 — Testear "Annual Upgrades" a mitad de término. (Si están pagando $50/mes, al mes 6 ofrecerles pasarse a Anual con 25% de ahorro para cerrar el LTV por adelantado)

### 7.6-7.10 — Ajustes de Pricing (Grandfathering): Asegurar que los clientes renovados más antiguos conserven sus precios "Legacy", usando ese beneficio como el ancla de mayor retención de la compañía

---

## 8. Validación y Calidad (QA)

- [ ] Stripe Webhooks auditados: Las cancelaciones/fallos en la pasarela deben impactar instantáneamente el LMS. No queremos dar acceso gratis por fallas de API.
- [ ] Transparencia legal plena: Correos pre-renovación son obligatorios en muchas jurisdicciones. Jamás omitir el D-15.
- [ ] No culpar al cliente: El dunning copy jamás debe sonar cobrador ("Debes dinero"), sino servicial ("Tu banco bloqueó el intento, ayudémosle a desbloquearlo").

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Dunning Success Rate | % Recuperado | Stripe Dashboard | Finance / Ops |
| Cancelation Wall Analytics| Drop-off Funnel| Mixpanel | Growth Lead |
| Exit Survey Tracker | Airtable/Sheet | CRM | CX Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [16-activar-referidos-organicos](16-activar-referidos-organicos-ritual.md) O re-inyección al ecosistema como Alumni.
- **Condición de handoff:** El MRR/ARR sano del negocio ha sido bloqueado y asegurado para el siguiente ciclo. Los que se fueron nos dejaron data invaluable exacta sobre por qué el producto falló en su vida.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Churn Involuntario Neto | < 2% de los fallos | 🟡 |
| Renewal Rate Absoluto | ≥85% base activa | 🟡 |

- **NEXT:** `personas-masivo → 16 → activar-referidos-organicos`
- **BLOCKERS:** `Alta tasa de declinaciones bancarias en tarjetas LATAM requiriendo pasarelas locales`

---

## Modal 10x: El "Graceful Dunning Engine" (Prompt Pro)

**Use case:** Tienes una tasa brutal de pérdida de membresías del 10% mensual solo porque las tarjetas fallan y tus correos automáticos suenan agresivos y la gente decide "rendirse y dejar que muera" en vez de actualizar su plástico.

```markdown
PROMPT:
"Actúa como un experto en Finanzas Conductuales y B2C Copywriting.
Necesito reconstruir mi secuencia de Dunning (recuperación de cobros fallidos) para mi membresía digital masiva.
Actualmente mando un mail automático de la pasarela que dice: 'Pago Fallido. Actualice tarjeta'. Me odian.
Escríbeme la secuencia D+0 (El día que falla), D+3, y D+7.
Reglas:
1. El Tono (Neo-Swiss) debe culpar al Banco/Procesador, no al cliente, aliándonos con él ('A veces Visa se pone paranoico...').
2. Se debe inyectar Miedo a la Pérdida de Progreso en el D+3 (Aislar lo que han logrado y que se pausará).
3. El correo final (D+7) no es de enojo, es de despedida melancólica con puerta abierta.
Incluye los Textos de Asunto, cortísimos y punchy."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
