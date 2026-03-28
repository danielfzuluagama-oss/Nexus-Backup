---
id: "07"

segmento: "empresas-smallbusiness"
journey: "negotiation"
proceso: "negociar-y-cerrar"
sop: "sop-07-cierre"
ritual-slug: "07-negociar-alcance-y-presupuesto"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Account Executive (AE) / Sales Lead"
- backup: "Sales Director"
frecuencia: "por-evento (si el cliente no aceptó la Propuesta R06 en la llamada o presentó objeciones de costo)"
herramientas:

- "CRM (Hubspot/Salesforce)"
- "Calculadora de Scope/Pricing (GSheets / Excel)"
- "Teléfono (Llamadas asíncronas tácticas)"
- "Herramienta de videollamada (Zoom)"
entry-criteria:

- "Propuesta presentada exhaustivamente (Ritual 06)."
- "El prospecto manifestó intención de compra pero levantó un 'Blocker' (Precio, Timing, Características)."
exit-criteria:

- "Objeción neutralizada."
- "Acuerdo de Alcance redimensionado firmado o validado por email."
- "Pricing final sellado listo para facturación (R08)."

kpi: "Negotiation Close Rate (Target: ≥70% de los tratos que entran a fase de objeción terminan cerrando)"
leading-indicators:

- "Ratio de Descuentos Otorgados (Target: < 5% sobre el Total Contract Value)"
- "Tiempo Promedio de Negociación (Target: < 5 días desde que inician las objeciones)"
- "Número de Toques requeridos para sortear la objeción"

riesgos-controles:

- riesgo: "Síndrome del Descuento Fácil (Bajar el precio porque 'ya casi lo cierro' sin quitar features)"

  control: "Regla del Trueque. Bajar el ticket es posible, pero obliga a quitar un módulo en frente del cliente. Defiende el margen; entrena al cliente a respetar tu precio."

- riesgo: "Negociar por correo electrónico (Ping pong de correos de 10 días)"

  control: "Si hay 2 correos debatiendo una cláusula o un precio, es obligatorio levantar el teléfono. Las guerras de teclados matan la empatía B2B."

- riesgo: "Confundir un 'No tengo presupuesto' falso con uno real"

  control: "Test de Prioridad. 'Si esto fuera gratis, ¿lo implementaríamos mañana?' Si dicen Sí, el problema es el precio. Si dudan, el problema es que el R06 falló en mostrar valor."
evidencias:

- "Nuevo Presupuesto/Scope validado adjunto al CRM"
- "Registro de Win/Loss Rate de Negociación por representante"
- "Email de Alineación Final 'As-Agreed'"
---

# Ritual: Negociar Alcance y Presupuesto — Empresas/SmallBusiness (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Small Business
> **Objetivo:** En PyMEs el dinero quema. Si te piden un descuento, no es porque sean malvados de Compras; es flujo de caja de su propio bolsillo. La negociación aquí no es sobre cláusulas de responsabilidad civil como en Enterprise; es hiper-práctica: "No puedo pagarte $10k cash hoy. ¿Me dejas en 3 cuotas o le quitamos la asesoría VIP?".

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Se activa cuando la Propuesta (R06) no recibe un "SÍ" rotundo. Abarca los días intermedios entre que la propuesta se presentó y el Deal entra a Closed/Won o Closed/Lost.
- **Pre-ritual:** ¿Identificaste en el CRM exactamente qué causó la pausa? ¿Miedo? ¿Precio? ¿Timing?
- **Contexto:** El Account Executive debe dejar de ser un Presentador y convertirse en un Asesor de Ajustes. El marco mental no es 'El cliente es tacaño', es 'El cliente necesita que yo le diseñe un traje que le quede a la medida de su billetera actual, sin que mi traje pierda calidad'.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Resolver objeciones operativas o financieras protegiendo el margen del producto (mediante trade-offs) y blindando la urgencia del trato para evitar que la oportunidad enfríe.
- **Definición de Éxito (DoD):**
  - [ ] Objeción Raíz identificada (No quedarse con el primer 'Es caro').
  - [ ] Alternativas de recorte de alcance (Down-sell) presentadas en vivo.
  - [ ] Alineación y concesiones recíprocas estructuradas.
  - [ ] Cierre verbal de los nuevos términos.
- **Definición de Éxito del Lead:** "Fue una negociación justa. No me regalaron el trabajo, me dijeron lo que podíamos hacer con los $7,000 que yo tenía en caja. Cedimos ambos. Son profesionales."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Protección del Margen Comercial Promedio |
| **Responsible** | Account Executive | Ejecución táctica del manejo de objeciones y cierres |

| **Consulted** | Delivery / Ops | Si AE promete tiempos raros ("Empecemos en 3 días para que cierre hoy") |
| **Informed** | Marketing | Si recurrentemente se pierden negocios por la Objeción 'Falta de Confianza/Autoridad' |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Matriz de "Trade-Offs" interna (Saber qué piezas del producto se pueden extraer sin romperlo para bajar el ticket).
- [ ] Argumentario Fuerte para "Objeción de Costo de Oportunidad".
- [ ] Claridad absoluta del Bottom-Line (El precio mínimo debajo del cual es mejor perder el Deal).

---

## 5. Ejecutar — Parte 1: El Diagnóstico de la Objeción (Aislamiento)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Identificación Temprana (Primeras 24hr Post Propuesta)

**Acción:** AE revisa las métricas de PandaDoc. ¿Lo abrió? Si no, enviar ping. Si respondió con un "Pero", activar modo Resolución.

**Output:** Respuesta al fuego.

### 5.2 — Llamada Táctica Rompe-Hielo (El 'Direct Dial')

**Acción:** NO responder la objeción por correo. Llamar. "Hola Carlos, recibí el correo sobre el alcance, tengo la pantalla abierta. Dame 2 mins de contexto fino."

**Output:** Contexto oral capturado (tono de voz indica si es farol o realidad).

### 5.3 — Aislamiento de la Objeción (Regla de Oro de Ventas)

**Acción:** "¿Entiendo Carlos. A parte del precio, ¿hay alguna otra cosa que te detenga de empezar el Lunes? Si yo arreglo lo financiero hoy, ¿firmas?"

**Output:** Objeción aislada. Evita que salten de una excusa a otra.

### 5.4 — Análisis del 'Por Qué' Real (The 5 Whys en Precio)

**Acción:** Indagar. "¿Es un tema de Flujo de Caja (No tienen $10k juntos hoy) o es un tema de Presupuesto (Nunca asignarían $10k a esto)?"

**Output:** Táctica Definida (Dividir pagos vs Esculpir Scope).

### 5.5 — El Re-Anclaje del Dolor (El Espejo Inverso)

**Acción:** "Entiendo el dolor de flujo Carlos. Pero acordamos que esto te cuesta $3k mensuales operativos. Esperar un mes para ahorrar caja es quemar $3k reales."

**Output:** Aversión a la pérdida reactivada.

### 5.6-5.10 — [Uso del silencio post-anclaje, validación de que estamos negociando con el CEO y no con su socio fantasma, documentación rápida en CRM de la objeción para histórico, decisión en milisegundos de bajar al Tier 2 del producto (Downsell)]

---

## 6. Ejecutar — Parte 2: La Danza del Alcance (Scope vs Price)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Negativa Táctica al Descuento Frontal

**Acción:** "No bajaré el precio solo por ajustarme, porque no bajaremos la calidad de horas de mis consultores."

**Output:** Set de parámetros éticos (Autoridad).

### 6.2 — Esculpir el Alcance (Scope Sculpting)

**Acción:** Presentar alternativa. "Si tienes $7,000, yo me ajusto a ti. Pero quitamos las 4 sesiones de seguimiento VIP y el reporte final en directo. Dejamos el Core intacto. ¿Movemos eso?"

**Output:** Propuesta Modular A/B.

### 6.3 — División Estratégica de Riesgo (Split Payments)

**Acción:** (Si el problema es Flujo de Caja pero quieren el Full Scope). "Te doy el plan Full. Pagas el 50% hoy al Kickoff, 50% el día 30 del programa."

**Output:** Remoción absoluta de la objeción financiera táctica.

### 6.4 — Solicitud de Reciprocidad Comercial

**Acción:** "Yo me ajusté a tus pagos, ¿tú puedes asegurarme firmar hoy para meterte al sprint de operaciones del Lunes que ya casi cierra?"

**Output:** Intercambio de Incomodidad Equitativo.

### 6.5 — Resolución de Objeciones Técnicas ('Esto parece complicado de implementar')

**Acción:** "Lo asumo yo. Las primeras 2 sesiones mi equipo operará el tablero contigo. Mínima fricción para tu lado."

**Output:** Seguridad de Onboarding blindada.

### 6.6-6.10 — [Recolección de confirmación oral, evitar sobrevender o añadir promesas adicionales ('Scope Creep' gratuito), verificación final ('Entonces estamos 100% alineados'), silencio celebratorio austero, actualización mental de la comisión ajustada del AE]

---

## 7. Ejecutar — Parte 3: Consolidación y Transición a Cierre

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Protocolo de 'As-Agreed Email' (A los 10 mins)

**Acción:** Enviar correo resumen blindado. "Para confirmar lo charlado: Ajustamos Scope (Fuera el módulo VIP). Ajustamos precio a $X. Y te damos 2 pagos."

**Output:** Huella documental.

### 7.2 — Re-Gatillado de la Propuesta CMS

**Acción:** En PandaDoc/DocuSign, ajustar las variables, generar nueva versión y presionar 'Enviar'.

**Output:** Documento oficial final a la espera de firma electrónica.

### 7.3 — Actualización Forense en CRM Status

**Acción:** Confirmar en Hubspot: Stage `Contract Negotiation` actualizado. Amount ajustado (Por ej, bajó de 10k a 7k).

**Output:** Reflejo fidedigno financiero.

### 7.4 — Alerta a Delivery / Operaciones (Si bajó Scope)

**Acción:** Slack a equipo de operaciones. `@delivery Deal X a punto de cerrar. Ojo, se negoció SIN módulo VIP. No lo consideren en el Kickoff`.

**Output:** Prevención de fugas de horas.

### 7.5 — Handoff al Ritual de Facturación (R08)

**Acción:** Marcar la Alarma 24 hrs. Si se firma, pasa automático.

**Output:** Cierre de la etapa.

### 7.6-7.10 — [Manejo de objeción 'Ghosting' post-acuerdo (Si el CEO dice 'Sí' y desaparece 4 días, se envía el Email de Ruptura 'Break-Up Email' para detonar FOMO), Taggeo de tipo de objeción prevalente para el reporte mensual, celebración interna de la defensa de margen]

---

## 8. Validación y Calidad (QA)

- [ ] Margen Preservado: ¿El descuento supera el umbral máximo pre-aprobado (Ej: 15%) y se dio sin remover ningún entregable? (Falla crítica del AE, reentrenamiento necesario).
- [ ] Velocidad en Modificación Documental: El prospecto no debe esperar 48 horas para ver la nueva propuesta ajustada en precio. Si el momentum se apaga, el competidor entra. (SLA: < 2 Hrs).
- [ ] No Negociar por Texto: Si un prospecto pone una objeción pesada vía mail (Ej. "Es muy caro, lo hará otra agencia"), un AE Elite LA LLAMA, no manda un PDF suplicando.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Email de Configuración | As-Agreed Mail | Bandeja B2B | AE |
| Deal Value Modificado | Nomenclatura USD | Hubspot Pipeline | AE |
| Contrato/Propuesta Nueva| CMS Doc (PandaDoc)| Repositorio Legal | AE |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [08-cerrar-acuerdo-y-agendar-kickoff](08-cerrar-acuerdo-y-agendar-kickoff-ritual.md) O `Closed-Lost` definitivo si nadie cede.
- **Condición de handoff:** Las cartas están selladas, el scope es final, el cliente sabe exactamente qué va a recibir a cambio de su cheque sin ambigüedades. El precio es ley.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Tiempo Fase Negociación| < 5 días máximo | 🟡 |
| Win-Rate Post Objeción | ≥ 70% rescatado | 🟡 |

- **NEXT:** `empresas-smallbusiness → 08 → cerrar-acuerdo-y-agendar-kickoff`
- **BLOCKERS:** `PyMES solicitando términos de crédito extendido (Acordar 90 días no es aplicable a modelos de consultoría ágil).`

---

## Modal 10x: El "Give & Get Constructor" (Prompt Pro)

**Use case:** Estás a punto de levantar el teléfono. El CEO dice que solo tiene la MITAD del budget prometido inicialmente por un castigo tributario externo de la PyME. Tratarás de bajar el Scope a la mitad sin que él sienta que pierde valor y sin que tu agencia pierda margen operativo (trabajar gratis).

```markdown
PROMPT:
"Actúa como Negociador de Alto Riesgo B2B y Maestro en fijación de precios (Pricing Architect).
El perfil de cliente que estoy cerrando: CEO de Pyme Logística. Ticket Original: $10,000 USD por un Plan de Mejora Continua que incluía Auditoría, 4 Talleres presenciales y 3 meses de Soporte Remoto para su equipo de Puntos de Venta.
Petición del cliente: Solo tiene $5,000 USD líquidos este trimestre.
Misión: Dame un Guion de Negociación Telefónica de 3 pasos (El 'Trade-Off' Táctico).
Quiero que recortes exactamente los Entregables Duros que más horas operativas me cuestan a mí como Consultora (Soporte presencial), los conviertas en auto-gestionables o asíncronos para el cliente, y me dés la frase exacta para que el CEO sienta que él GANÓ agilidad operativa a cambio de usar su propio equipo, permitiéndome aceptar los $5,000 sin quemar nuestro margen de ganancia real."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Small Business
> **Powered by:** MetodologIA Governance Protocol
