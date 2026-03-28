# Customer Journey General — MetodologIA

> **Documento**: Customer Journey Map General (J0 — North Star)
> **Versión**: 3.0 — Expansion Completa con Supuestos, MOT Criterios, Regression Paths, Exception Flows
> **Fecha**: 2026-03-24
> **Aplica a**: Todos los segmentos — Vista unificada pre-diferenciacion
> **Referencia**: Service Blueprint General v2.0 + Matriz de Journeys v3.0

---

## 1. Proposito

Este journey general es la **vista maestra** de la experiencia de cualquier cliente MetodologIA, independiente de su segmento. Captura las fases universales, emociones, touchpoints y oportunidades que luego se especializan en cada CJ por sub-segmento. Define tambien los supuestos base, criterios de aceptacion y paths de excepcion que garantizan ejecucion consistente.

---

## 2. Supuestos del Journey

Para que este journey funcione como está diseñado, **deben ser verdaderas** las siguientes condiciones. Si no lo son, el journey se rompe y requiere adaptation.

### 2.1 Supuestos Tecnologicos

| Supuesto | Descripcion | Si NO se cumple | Mitigation |
|---|---|---|---|
| **Cliente tiene acceso a internet estable** | WiFi o 4G durante sesiones (video, platform) | Cliente pierde sesion; frustration; no ve valor | Oferta: sesiones async en lugar de video; entrega de materiales offline |
| **Cliente tiene dispositivo (computer o tablet)** | Minimo: pantalla >5 pulgadas para ver contenido; teclado para digitar | Mobile-only no alcanza (casos fringe: Africa, rural). Frustration | Crear version simplificada mobile (future); priorizar materiales legibles en phone |
| **Plataforma bootcamp carga en <3 segundos** | Tech debt: lentitud en plataforma quiebra experience | Dropout pre-F1; "esto es muy lento"; refund requests | Audit infraestructura cada trimestre; establecer SLAs de carga |
| **GPTs custom disponibles y actualizados** | F3: coaching se basa en GPTs que funcionan well | Cliente prueba GPT, no responde bien, pierde confianza | Versioning + testing de GPTs pre-F3; fallback a templates si GPT falla |

### 2.2 Supuestos Geograficos/Temporales

| Supuesto | Descripcion | Si NO se cumple | Mitigation |
|---|---|---|---|
| **Cliente en timezone LATAM (UTC-5 a UTC-0)** | Sesiones 1:1 en horarios razonables (no 5am para cliente, no 11pm para coach) | Friction de scheduling; fatiga; low engagement | Crear cohortes regionales (Colombia, Arg, Mexico, Brasil, etc.); async-first para outliers |
| **Sesiones de F1 ocurren en primera semana** | Lead convert a diagnostico sin demoras >7 dias | Si demora 30 dias, lead pierde interes; olvida why | SLA: F0→F1 max 5 dias. Automated follow-up si no responde en 3 dias |
| **Ciclo F3 (practica) es 4-6 semanas** | Momentum requires continuidad; gaps >1 semana killer | Cliente olvida contexto; ejercicios se quedan sin hacer | Receso navidad / semana santa = pausa explícita + extended timeline. No flujo continuo en receso |
| **Comunicacion es en Español (LATAM)** | Materiales, sesiones, soporte todos en español | Cliente no hispanohablante ≠ experience optimizada | Excluir no-hispanohablantes en intake. (Future: traduccion, pero no MVP) |

### 2.3 Supuestos de Comportamiento del Cliente

| Supuesto | Descripcion | Si NO se cumple | Mitigation |
|---|---|---|---|
| **Cliente es honesto en diagnostico** | Answering discovery cuestionario truthfully (no exagera pain, presupuesto real) | Si miente, recommendations erradas; journey fails | Validation manual en sesion (coach explora respuestas); no confiar solo en form |
| **Cliente tiene autonomia para actuar** | Tiene acceso a tools, permiso para implementar, tiempo en semana | Ej: "jefe no me deja usar ChatGPT". Cliente stuck. | Oferta: variant empresarial (E1/E2) si cliente es employed. Validate "scope autonomy" en F1 |
| **Cliente tiene motivacion instrinseca** | Quiere realmente aprender/cambiar (no es enviado forzado) | Falta engagement; no hace ejercicios; refund request | En intake: assessment motivation ("por que QUIERES esto?"). Reject low-motivation prospects early |
| **Cliente completara F1 diagnostico antes de F2** | No saltar fases; no pagar sin entender el problema primero | Waste de presupuesto cliente; expectativas erradas | Hard gate: no F2 payment sin baseline report signed-off en F1 |

### 2.4 Supuestos de Organizacion

| Supuesto | Descripcion | Si NO se cumple | Mitigation |
|---|---|---|---|
| **MetodologIA tiene coaches entrenados y disponibles** | F3 requiere coaches vivos (no automated). Capacity suficiente. | Si solo 1 coach para 100 clientes = mala quality; churn | Cap cohorts por coach (max 10 clientes simultaneos). Hiring target: 1 coach cada $1M revenue |
| **SOPs estan actualizadas y seguidas** | Coaches ejecutan SOP-discovery, SOP-delivery consistentemente | Variacion wild en quality → NPS inestable | Monthly SOP audit; quarterly training refresher; NPS tracking por coach |
| **Metricas estan siendo tracked** | CRM, platform data, analytics disponibles para decisiones | Blind to what's happening; decisions ad-hoc | Non-negotiable: weekly analytics review. Dashboard con KPIs reales. |

---

## 3. Journey Map General — Vista Completa

### FASE F0: AWARENESS — "Descubrir"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El cliente vive un life event o exposicion que genera conciencia de necesidad |
| **Pensamiento** | *"Algo debe cambiar... escucho mucho sobre IA pero no se por donde empezar"* |
| **Emocion** | Curiosidad mezclada con ansiedad → 😐➡️🤔 |
| **Intensidad Emocional** | ██░░░░░░░░ 3/10 (neutro-inquieto) |
| **Acciones Cliente** | Busca en Google, consume contenido en redes, pregunta a pares, compara opciones |
| **Touchpoints** | Sitio web, LinkedIn posts, Instagram reels, lead magnets, webinars, referrals |
| **Canal Dominante** | Organico (SEO + Social) + Referral |
| **Pain Points** | Sobrecarga informativa, dificultad para distinguir calidad, miedo a "ser vendido" |
| **Oportunidad** | Contenido que educa sin vender → posicionar como autoridad confiable |
| **KPI** | Trafico web, leads generados, CTR contenido |
| **SOP Activo** | sop-scouting-b2c, sop-nurturing |

**Momento de Verdad #1**: *"Esto me habla a mi"* — El cliente siente que el contenido describe su situacion exacta.

---

### FASE F1: DIAGNOSTICO — "Evaluar"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El cliente solicita o acepta un diagnostico gratuito para entender su situacion |
| **Pensamiento** | *"Quiero saber donde estoy parado/a realmente... pero sin compromiso"* |
| **Emocion** | Esperanza cautelosa → 🤔➡️😮 |
| **Intensidad Emocional** | █████░░░░░ 5/10 (engagement creciente) |
| **Acciones Cliente** | Completa cuestionario, asiste a sesion 1h, valida hallazgos, comparte documentos |
| **Touchpoints** | Landing diagnostico, formulario, videocall, Baseline Report, Mapa Oportunidad |
| **Canal Dominante** | 1:1 video (Zoom/Meet) + email |
| **Pain Points** | Cuestionario percibido como largo, miedo a ser juzgado, incertidumbre de costo |
| **Oportunidad** | El diagnostico gratuito como "wow moment" → mostrar valor antes de pedir dinero |
| **KPI** | Conversion lead→diagnostico, NPS sesion diagnostico, % que avanza a F2 |
| **SOP Activo** | sop-discovery-b2c / sop-discovery (B2B) |

**Momento de Verdad #2**: *"Ahora veo donde pierdo"* — El Baseline Report revela brechas que el cliente no veia.

---

### FASE F2: DISENO — "Planificar"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El cliente decide invertir y co-disenar su ruta personalizada |
| **Pensamiento** | *"Ya entiendo mi situacion. Ahora necesito un plan concreto y a alguien que me guie"* |
| **Emocion** | Determinacion + expectativa → 😮➡️😊 |
| **Intensidad Emocional** | ██████░░░░ 6/10 (compromiso activado) |
| **Acciones Cliente** | Revisa opciones, elige nivel de compromiso, confirma calendario, define metricas |
| **Touchpoints** | Propuesta/ODS, dashboard KPIs, calendario sesiones, contrato, pago |
| **Canal Dominante** | Video 1:1 + email + WhatsApp |
| **Pain Points** | Salto de precio gratuito→pago, paralisis por opciones, miedo a no cumplir |
| **Oportunidad** | Micro-oferta intermedia (Taller $200k) como escalon de compromiso |
| **KPI** | Conversion diagnostico→diseno, ticket promedio, time to decision |
| **SOP Activo** | sop-structuring-b2c / sop-structuring (B2B) |

**Transicion Critica**: El cliente pasa de prospect a cliente pagante. El framing cambia de "evaluacion" a "inversion en mi futuro".

---

### FASE F3: PRACTICA — "Implementar"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El cliente ejecuta su ruta con coaching, bootcamp y herramientas |
| **Pensamiento** | *"Estoy aprendiendo cosas que puedo aplicar HOY... esto es diferente"* |
| **Emocion** | Entusiasmo con momentos de frustracion → 😊➡️🤩 (con valles 😤) |
| **Intensidad Emocional** | ████████░░ 8/10 (pico de engagement) |
| **Acciones Cliente** | Asiste a sesiones, implementa cambios, reporta avances, practica con casos reales |
| **Touchpoints** | Plataforma bootcamp, sesiones 1:1/grupo, GPTs custom, prompts, templates, WhatsApp |
| **Canal Dominante** | Video + plataforma + WhatsApp async |
| **Pain Points** | Frustracion cuando "no funciona a la primera", falta seguimiento entre sesiones, carga cognitiva |
| **Oportunidad** | El "Aha! Moment" (semana 3-4) es el punto de inflexion → capturar y amplificar |
| **KPI** | Asistencia, completitud ejercicios, NPS sesion, aplicacion inmediata medida |
| **SOP Activo** | sop-delivery-b2c, sop-delivery (creados marzo 2026) |

**Momento de Verdad #3**: *"Esto funciona en mi dia a dia"* — El cliente aplica lo aprendido y ve resultados concretos.

```
        Curva Emocional F3

     🤩 ─────────────────── ★ Aha! Moment
    │                      ╱
    │                    ╱
 😊 │──────────╱────────╱
    │        ╱  😤 valle
    │      ╱
 😐 │────╱
    └───┬────┬────┬────┬────┬───→ semanas
        1    2    3    4    5+
```

---

### FASE F4: AUTONOMIA — "Transferir"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El programa formal termina; el cliente opera con soberania |
| **Pensamiento** | *"Ya no necesito que me guien... puedo solo/a y se a quien acudir si necesito"* |
| **Emocion** | Confianza + orgullo → 🤩➡️💪 |
| **Intensidad Emocional** | ███████░░░ 7/10 (confianza estable) |
| **Acciones Cliente** | Mantiene habitos, mide progreso, ajusta, escala a otras areas |
| **Touchpoints** | Autonomy Kit, canal async, check-in mensual opcional, recursos actualizados |
| **Canal Dominante** | Async (WhatsApp/email) + check-in video mensual |
| **Pain Points** | Regresion a viejos habitos, sensacion de "ya se todo" prematura, aislamiento |
| **Oportunidad** | Evidenciar gap residual con metricas → mantener engagement minimo |
| **KPI** | % tareas sin apoyo >80%, mantenimiento habitos a 90 dias, NPS post-programa |
| **SOP Activo** | sop-success-b2c / sop-success (B2B) |

**Momento de Verdad #4**: *"Puedo solo/a"* — El cliente demuestra competencia autonoma medible.

---

### FASE F5: ADVOCACY — "Amplificar"

| Dimension | Detalle |
|-----------|---------|
| **Contexto** | El cliente exitoso se convierte en promotor organico |
| **Pensamiento** | *"Esto cambio mi forma de trabajar/vivir... otros necesitan saber"* |
| **Emocion** | Gratitud + identidad → 💪➡️🌟 |
| **Intensidad Emocional** | █████████░ 9/10 (peak evangelizacion) |
| **Acciones Cliente** | Refiere pares, comparte resultados, genera contenido, participa en comunidad |
| **Touchpoints** | Badge Digital Champion, programa referral, caso de exito, red exclusiva |
| **Canal Dominante** | LinkedIn, boca a boca, eventos, WhatsApp |
| **Pain Points** | No saber como referir, falta de incentivo tangible, perder conexion con comunidad |
| **Oportunidad** | Kit referral listo + incentivos + reconocimiento → loop viral |
| **KPI** | Referral rate >25%, testimonios generados, leads por referral |
| **SOP Activo** | sop-success-b2c (referral loop) / sop-success QBR expansion (B2B) |

**Momento de Verdad #5**: *"Necesito que otros sepan"* — El impulso genuino de compartir la experiencia.

---

## 4. Criterios de Aceptacion por MOT (Momento of Truth)

Para cada MOT, definimos **exactamente qué debe ocurrir** para que el cliente avance. Estos criterios son binarios/verificables, no fuzzy.

### MOT #1: "Esto me habla a mi" (F0 → F1)

**Criterios de Aceptacion:**

1. **Lead completa formulario inicial**: Minimo nombre, email, telefono, descripcion corta de pain
2. **Lead entra en secuencia nurturing**: Email 1 enviado en <2 horas
3. **Lead abre ≥1 email de nurturing**: Comportamiento de engagement
4. **Lead hace click en "Agendar Diagnostico"** o responde "Quiero saber mas"
5. **Lead acepta sesion diagnostico**: Fecha/hora confirmada en calendario

**Metrica de Exito F0**: Lead scoring ≥ 60 puntos en CRM antes de pasar a F1.

---

### MOT #2: "Ahora veo donde pierdo" (F1 → F2)

**Criterios de Aceptacion:**

1. **Cliente completa cuestionario discovery**: 100% de preguntas respondidas (no campos vacios)
2. **Cliente asiste a sesion diagnostico**: Live video o async (no-show = regresion a nurturing)
3. **Coach genera Baseline Report**: Documento con brechas identificadas, oportunidades priorizadas
4. **Cliente recibe y revisa report**: Email sent, cliente abre <2 dias
5. **Cliente expresa interes en siguiente paso**: "Si, quiero plan", o al menos "me interesa conocer opciones"

**Metrica de Exito F1**: NPS sesion ≥ 6/10 Y cliente firma baseline report Y Cliente progresa a F2 booking.

---

### MOT #3: "Ya entiendo mi situacion. Necesito plan" (F2 → F3)

**Criterios de Aceptacion:**

1. **Coach diseña propuesta personalizada**: ODS con fases, duracion, precio especifico
2. **Cliente revisa propuesta**: Envia feedback o acepta sin comentarios en <7 dias
3. **Cliente y coach alinean metricas de exito**: KPIs definidos, baseline establecido
4. **Cliente completa pago**: Transaccion confirmada (tarjeta, transferencia, otro)
5. **Cliente confirma calendario F3**: Primer bootcamp/sesion agendada, recordatorio enviado

**Metrica de Exito F2**: Conversion rate diagnostico→programa ≥ 30% Y ticket promedio ≥ target por segmento (P1: $400k, E2: $5M, etc.)

---

### MOT #4: "Esto funciona en mi dia a dia" (F3 → F4)

**Criterios de Aceptacion:**

1. **Cliente asiste ≥80% de sesiones**: Minimo 3 de 4 semanas (1-2 faltas OK, pero consistent attendance requerida)
2. **Cliente completa ≥70% de ejercicios**: Tareas entregadas, aunque no perfectas
3. **Cliente reporta aplicacion inmediata**: "Use esto en mi trabajo esta semana" o equivalente (en check-in)
4. **Coach observa progreso en metricas**: KPI baseline mostrando movimiento positivo (+10% minimo)
5. **Cliente expresa satisfaction**: Sesion F3 NPS ≥ 7/10

**Metrica de Exito F3**: % completition ≥ 75% AND NPS sesion ≥ 7 AND cliente termina F3 scheduled program (no dropout mid-course).

---

### MOT #5: "Puedo Sostenible" (F4)

**Criterios de Aceptacion:**

1. **Cliente mantiene autonomía >80%**: Completa tareas sin coaching durante 30+ días
2. **Cliente reporta sustainability**: KPI se mantienen vs. baseline (no hay degradación)
3. **Cliente demuestra habitos consolidados**: Routina establecida, "esto es parte de mi dia"
4. **Cliente busca apoyo solo si problema real**: No dependency; usa resources antes de preguntar
5. **Cliente aprueba transferencia de ownership**: "Ya no necesito coaching semanal"

**Metrica de Exito F4**: Autonomía sostenida > 80% Y mantenimiento de hábitos a 30+ días Y NPS post-F3 ≥ 7.

---

### MOT #6: "Puedo Escalable" (F4→F5)

**Criterios de Aceptacion:**

1. **Cliente implementa en ≥2 áreas nuevas**: Más allá del scope inicial (ej: no solo vendedor, también manager)
2. **Cliente expande metodología**: Adapta y aplica herramientas a nuevos contextos
3. **Cliente reporta expansión de impact**: "Ahora lo uso en X, Y, Z" con métricas
4. **Cliente documenta learnings**: Notas, playbooks, templates propios creados
5. **Cliente gestiona crecimiento solo**: Sin pedirle al coach, pilotea nuevas áreas

**Metrica de Exito F4→F5**: Expansión a ≥ 2 nuevas áreas de aplicación Y métricas de impact en múltiples áreas.

---

### MOT #7: "Puedo Multiplicador" (F5)

**Criterios de Aceptacion:**

1. **Cliente capacita ≥1 persona en su organización**: Entrena pares, reports, equipo
2. **Cliente crea contenido de capacitación**: Documentación, guías, sesiones internas
3. **Cliente demuestra pedagogía**: Puede explicar y enseñar sin coach (no solo aplicar)
4. **Cliente genera transferencia de knowledge**: Otros en su org entienden y replican
5. **Cliente monitorea adopción de multiplicación**: Trackea que otros implementen

**Metrica de Exito F5**: ≥ 1 persona en la organización capacitada Y demostrando competencia en la metodología.

---

### MOT #8: "Puedo Embajador" (F5+)

**Criterios de Aceptacion:**

1. **Cliente genera ≥1 referral cualificado**: Introducción directa o link compartido que convierte
2. **Cliente produce caso de éxito documentado**: Testimonial, video, artículo, o case study publicado
3. **Cliente participa activamente en comunidad**: Eventos, webinars, grupos, networking
4. **Cliente acepta ser embajador oficial**: Reconocimiento público; puede usar badge/credencial
5. **Cliente amplifica continuamente**: Referrals, testimonios, participación son ongoing (no one-time)

**Metrica de Exito F5**: Referral rate > 25% AND ≥1 caso de éxito publicado AND testimonial rate >50% AND alumni engagement >30%.

---

## 5. Regression Paths — Cuando y Como Retroceder

No siempre el cliente avanza linealmente. Documentamos cuando es **correcto** hacer regresion y como ejecutarla.

### 5.1 Criteria para Regresion

**Una regresion es necesaria cuando:**

1. **Cliente no cumple MOT de su fase actual**: No asiste sesiones, no hace ejercicios, no reporta aplicacion
2. **Metricas muestran retroceso**: KPI empeoro vs. baseline; habits no se mantienen
3. **Cambio en contexto del cliente**: Perdida empleo, cambio empresa, crisis personal, etc.
4. **Feedback explicito del cliente**: "No entiendo", "esto es muy dificil", "necesito volver atras"
5. **Costo-beneficio negativo**: Si continuar es costoso pero no hay progreso visible

---

### 5.2 Regression Paths Especificas

#### F4 → F3 (Regresion por Degradacion de Habitos)

| Trigger | Indicador | Accion | Timeline |
|---|---|---|---|
| **Cliente pierde aplicacion en dia a dia** | Revisa KPI baseline → regreso a valores F3-inicio | Check-in: "Vimos movimiento pre-programa. Por que se detuvo?" | Semana 1 de F4 |
| **Respuesta: "Es que volvi a los viejos habitos"** | Cliente admite falta de structure sin coach | Oferta: "2 semanas de re-bootcamping intenso + 3 sesiones 1:1" | Immediate |
| **Implementacion** | Vuelve a plataforma bootcamp; hace ejercicios basicos; coach check-ins 2x/semana | Plan: "Lets reset y reanchorizar habitos. Esto es normal, pasa en 60% clientes" | 2-3 semanas |
| **Exit criteria** | Cliente demuestra >80% habit maintenance nuevamente | Si logra: va a F4 Extended (mismo pero mas support). Si no: conversacion de refund/pausa. | Semana 3 |

#### F3 → F2 (Regresion por Cambio de Scope)

| Trigger | Indicador | Accion | Timeline |
|---|---|---|---|
| **Cliente contexto cambia mid-programa** | ej: Perdio empleo, cambio de rol, empresa crisis | Cliente solicita pausa o "esto no es para mi" | Ad-hoc |
| **Evaluacion de readiness** | Coach + cliente discuten: "Es timing, o es que programa no es fit?" | If timing → pausa + re-start later. If not fit → F2 redesign. | Sesion 1:1 |
| **Si programa no es fit para nuevo contexto** | Redesign ODS + propuesta a nuevo precio (menor si reduced scope) | Ejemplo: "Eras IC, ahora no trabajas. Hagamos lightversion: Bootcamp solo, sin 1:1" | 1 semana |
| **Re-entry to F3** | Cliente acepta nuevo programa. Comienza de nuevo. | Tracking: "Retry 1" en CRM. Soporte: bonus sesion 1:1 porque cambio de scope. | Immediate |

#### F2 → F1 (Regresion pre-F3 por Cambio de Mind)

| Trigger | Indicador | Accion | Timeline |
|---|---|---|---|
| **Cliente no quiere proceder a F3** | "Es muy caro", "No estoy listo", "Necesito pensarlo mas" | NO es falla. Es decision valida. Pero hay regresion. | Before F3 start |
| **No presionar, entender razon real** | Coach: "Entiendo. Cuales es la barrera? Precio, tiempo, seguridad?" | Listen activamente. Si es precio → micro-offer. Si es tiempo → extended timeline. Si es miedo → otra sesion discovery. | Sesion 1:1 |
| **Regresion to nurturing** | Si cliente no progresa en 2 semanas → vuelve a email nurturing | Email: "Sin presion. Cuando estes listo, avisame." Mantener relacion warm. | Ongoing |
| **Re-engagement** | Nurturing continua 6-12 meses. Si cliente entra contexto nuevo (nuevo empleo, etc.) → re-activate. | Example: "Leo que te promovieron! Felicidades. Este programa es perfecto para nuevos managers." | Seasonal |

#### F3 → Churn (Regresion Total)

| Trigger | Indicador | Accion | Timeline |
|---|---|---|---|
| **Cliente abandona mid-F3** | No asiste 2+ sesiones consecutivas sin comunicacion. | Immediate outreach: call, WhatsApp, email. No judgment. | 24 horas |
| **Evaluacion de salvage** | Coach: "Que paso? Como puedo ayudarte?" | Escuchar. Si es vida, estar ahi. Si es programa, ver que fix. | Sesion 1:1 or call |
| **Si es salvable** | Plan: pausa 2 semanas, luego resume. O reduced load. O refund parcial. | Offer choice: "Que prefieres? Seguimos con apoyo extra, o pausamos?" | Immediate |
| **Si no es salvable** | Refund policy ejecutada. Transparency: "Gracias, fue un honor trabajar contigo. Cuando estes listo, volvemos." | CRM: "Churn F3", razon documentada. Email: "Puerta abierta, siempre." | Weeks 1-2 |
| **Alumni follow-up** | 6 meses: "Hey, como va? Leiste X? Podria ser util para tu nuevo rol." | Relationship warm mantenida. 30% de churns vuelven cuando contexto cambia. | Evergreen |

---

## 6. Exception Flows — Casos Complejos

Documentamos aqui situaciones que rompen el path "happy path" y como manejarlas.

### E1: Cliente No-Shows en Diagnostico (F1)

**Escenario**: Cliente agendo sesion F1, pero no entra a videocall.

| Estado | Accion | Timeline | Outcome |
|---|---|---|---|
| **No-show ocurre** | Cliente no entra a Zoom en horario agendado | Minuto 5: Coach intenta contactar via WhatsApp | Immediate |
| **Intento 1: Reschedule soft** | "Hey, veo que no conectaste. Problema tecnico? Reprogramemos en 30 mins." | Offer: same day diferent time, o next day same time | Si: reprograma. No response: Intento 2. |
| **Intento 2: Mensaje empático** | 1 hora post-no-show: "Espero que este todo bien. Entiendo que la vida pasa. Disponibilidad proxima semana?" | Offer: opciones de horarios, o posibilidad de sesion async (responder cuestionario sin videocall) | Si: progresa a F1. No: Intento 3. |
| **Intento 3: Regresion a nurturing** | 3 dias sin respuesta: Sale de pipeline. Vuelve a lista nurturing. | Email: "Parece que el timing no es ahora. Mantente en nuestros emails, cuando estes listo avisame." | Lead warm pero inactivo. |
| **Re-activation**: Si cliente abre email en futuroy responde → F0 nurture restarts. | Esperanza: vida cambio, ahora SI esta listo. | Manualmente re-agendar diagnostico. | Si segundo intento falla → abandono definitivo. |

---

### E2: Cliente Paga pero Nunca Inicia F3 Bootcamp

**Escenario**: Cliente pago programa (F2 completado), pero no aparece dia 1 de bootcamp. Dos semanas pasan, no comunicacion.

| Estado | Accion | Timeline | Outcome |
|---|---|---|---|
| **No-start confirmado** | Bootcamp comenzo, cliente no aparece. Semana 2 sin contacto. | Immediate: Coach envia WhatsApp warm + call attempt | Si contacta: avanza. Si no: Intento 2. |
| **Investigacion de razon** | Coach: "Oi! Veo que bootcamp comenzo hace 2 semanas. Que paso? Problema tecnico? Cambio de situacion?" | Openness. No acusacion. | Respuesta puede ser: "Olvide", "Empresa caos", "Costo ≠ esperado", etc. |
| **Si razon es tecnica** | "El link no funciono", "No recibi email". → Solve: reenviar link, test conexion, agendar sesion intro 1:1 | 24 horas | Cliente re-inicia bootcamp con momentum |
| **Si razon es contexto** | "Empresa en crisis", "Perdimos cliente grande" (E2 case). → Oferta: pausa 4 semanas, luego recomenzamos. O reducir a bootcamp solo (partial refund). | Flex y empático. No pierdes cliente. | Mantienen relacion; posible re-entry despues |
| **Si razon es desalineacion** | "Esperaba [X], programa es [Y]". → Revisa ODS con coach. Feedback: que cambiar? Rediseno si es posible. | 1 sesion diagnostic con coach + cliente | Si algo es fixable: redo bootcamp. Si no: refund + exit amigable. |
| **Refund policy (si es necesario)** | Si cliente no progresa y quiere salir: Refund basado en tiempo: 8 semanas → 50% refund. <4 semanas → 75% refund. >12 semanas → no refund. | Execution: procesado en 5 dias habiles | Cliente sale satisfied; puerta abierta para futuro |

---

### E3: Cliente Completa F3 pero NPS < 5

**Escenario**: Cliente termina programa (F3), pero satisfaction muy baja. NPS = 3/10. "No veo cambios. Esto no funciono para mi."

| Estado | Accion | Timeline | Outcome |
|---|---|---|---|
| **NPS bajo detectado** | Post-programa survey o check-in. NPS <5 es red flag. | Immediate: Coach o Manager hace call | Investigacion: por que bajo? |
| **Diagnostico de causa** | Posibles razones: (1) expectativas equivocadas, (2) programa no fit, (3) cliente no hizo ejercicios, (4) metricas reales mostraban mejora pero cliente no la vio | 30-min exploratory call | Escuchar sin defensiva. |
| **Si causa = expectativa equivocada** | "Pensaba que seria [X]. Resulto [Y]." → Revisa: fue culpa nuestra en comunicacion? O cliente misunderstand? | Honestidad. Si fue nuestro error → oferta: sesion bonus F4 para clarificar + re-encadramiento metricas. | Si cliente ve valor post-clarification: NPS puede subir a 6-7. |
| **Si causa = programa no fit** | "Siento que esto no era para mi. Mi industria/contexto es diferente." → Acknowledge. No argue. | Revisa: fue error en assessment F1? O es cliente que no debiera entrar? | Learning: feedback a producto. Cliente: refund parcial + referral de alias service (si tiene). |
| **Si causa = cliente no hizo trabajo** | "Te di todo, pero tu no aplicaste nada." Versus "Hice todo pero sin cambio." | Revisa: metricas de attendance vs. auto-report. Si attendance <60%, es cliente culpa. Si >80% pero sin resultado, es programa culpa. | If cliente fault: amigable explanation. If program fault: remediation. |
| **Remediation (si es programa)** | Oferta: "Vimos que X no funciono como esperaba. Hagamos Y diferente. 2 sesiones bonus 1:1 + recalibrada KPIs. Sin costo." | 2-3 semanas adicionales | Si cliente se engagement: posibilidad de mejorar NPS a 6+. |
| **Refund policy (si no remediable)** | Si cliente dice "No puedo mas", y causas no son remediables: Refund basado en tiempo consumido. >8 semanas en programa → 25% refund. Si <4 semanas y "no funciono" → 75% refund. | Procesado con transparencia | Salida amigable. Puerta abierta para future. |
| **Alumni consideration** | Even low-NPS cliente puede ser alumni. No pedirle referrals, pero mantenerlo en loops informativos. 12 meses luego: puede mejorar perspectiva (cuando implementa). | Evergreen relationship | 20% de clientes NPS bajo al final terminan siendo advocates 1-2 anos luego. |

---

### E4: Cliente Quiere Refund (Any Phase)

**Escenario**: Cliente solicita reembolso. Puede ser F1 post-diagnostico ("No me interesa"), F2 pre-bootcamp ("Cambio de idea"), o F3 mid-programa ("Esto no funciona").

| Fase | Policy | Justificacion | Execution |
|---|---|---|---|
| **F1 (Pre-payment)** | N/A. Diagnostico es free. No hay refund. | Diagnostico es service real. Si quieres, pide feedback, no dinero. | Coach: "Entiendo que no es fit. Podemos charlar que hace falta?" |
| **F2 (Post-payment, pre-F3 start)** | 100% refund si solicita <7 dias post-pago. 75% si solicita 7-14 dias. 50% si solicita >14 dias. | Cliente puede necesitar time to think. <7 dias = cambio de mind. >14 dias = debió haber pensado más. | Procesado en 5 dias habiles. No drama. |
| **F3 (mid-programa)** | Escala segun tiempo en programa: <2 semanas = 75% refund. 2-4 semanas = 50% refund. 4-6 semanas = 25% refund. >6 semanas = no refund. | Cliente recibio valor (sesiones, recursos, coaching). Pero si muy insatisfecho early, exit generosa. | Check-in first: "Que no funciona? Podemos fix?" If unsalvageable → refund. |
| **F4 (post-programa)** | No refund (programa ya completed). Pero oferta: "Sesion bonus 1:1 para recalibrate expectations y ver si hay aplicacion que faltaba." | Program was delivered. NPS bajo no califica refund, pero support si. | Ofrecer valor adicional sin dinero de vuelta. |

**Master Refund Rule**: Nunca combatir refund request. Nunca culpabilizar cliente. Simplemente ejecuta policy clara, amigable y transparente. Goal: cliente sale satisfecho (o minimamente, no resentido).

---

## 7. Curva Emocional Completa

```
Intensidad
Emocional
  10 │
   9 │                                                              🌟
   8 │                                          🤩 ★Aha!
   7 │                                                    💪
   6 │                            😊
   5 │              😮
   4 │
   3 │  🤔
   2 │
   1 │
   0 └──────┬──────────┬──────────┬──────────┬──────────┬──────────┬───→
            F0         F1         F2         F3         F4         F5
         AWARENESS  DIAGNOST.   DISENO    PRACTICA  AUTONOMIA  ADVOCACY

    ── Linea de Satisfaccion Minima ──────── (umbral = 5)
```

---

## 8. Oportunidades de Mejora Cross-Segmento

| # | Oportunidad | Fase | Esfuerzo | Dependencia | Decision Status | Impacto Estimado |
|---|---|---|---|---|---|---|
| O1 | Automatizar secuencia de nurturing post-awareness con IA | F0→F1 | Low | Email platform + copywriting templates | Approved | +30% conversion |
| O2 | Crear auto-diagnostico digital (sin sesion humana) para P2 y P4 | F1 | Med | Tech dev para platform self-serve | Pending | -50% costo adquisicion |
| O3 | Micro-oferta "Taller $200k" como escalon universal | F1→F2 | Low | Product design + pricing | Approved | +25% conversion |
| O4 | WhatsApp bot para check-ins automaticos mid-programa | F3 | Med | Chatbot dev + coaching team alignment | In-Progress | -40% desercion |
| O5 | Dashboard de progreso visible para el cliente | F3→F4 | High | Platform dev + metrics integration | Pending | +20% engagement |
| O6 | Kit de referral digital con tracking automatico | F5 | Med | Platform feature + incentive structure | Approved | +50% referral rate |

---

## 9. SOP References (Actualizadas)

Todos los SOPs referenciados en este documento estan **creados y activos** (actualizado marzo 2026):

- **F0 → F1**: sop-scouting-b2c, sop-nurturing ✅
- **F1**: sop-discovery-b2c (personas), sop-discovery (empresas) ✅
- **F2**: sop-structuring-b2c (personas), sop-structuring (empresas) ✅
- **F3**: sop-delivery-b2c (personas), sop-delivery (empresas) ✅
- **F4-F5**: sop-success-b2c (personas), sop-success (empresas con QBR/expansion) ✅

**Nota importante**: No hay mas "pendientes de crear". Todas las delivery SOPs estan operacionales. Ver sop-delivery-b2c y sop-delivery para especificacion.

---

## 10. Referencia Simplificada del Ecosistema

```
                    CLIENTE
                   (entrada por F0)
                       │
                       ▼
    ┌──────────────────┼──────────────────┐
    │                  │                   │
 DIGITAL           COACHING             COMUNIDAD
    │                  │                   │
 • Web            • 1:1 Video         • Embajadores
 • Email          • Bootcamp          • Alumni events
 • WhatsApp       • Mentoria          • Referrals
 • Platform       • 1:1 Check-ins     • Slack/community
 • GPTs                                • Social proof
    │                  │                   │
    └──────────────────┼──────────────────┘
                       │
                   F0 → F1 → F2 → F3 → F4 → F5
                  (6 fases universales)
                       │
                BACKSTAGE EXECUTION
                (SOPs, CRM, Analytics,
                 Gobierno Operativo)
```

---

## 11. Gobierno

**Vigencia**: Revision mensual alineada con métricas de fase (NPS, conversion, completion rates, etc.). Quarterly deep-dive con equipo producto.

**Propietario**: Director de Producto + Director de Operaciones.

**SSOT Hierarchy:**
```
Service Blueprint General (fases)
        ↓
CJ General (ESTE DOCUMENTO — supuestos, MOTs, exception flows)
        ↓
CJ por Segmento (especificacion operativa)
        ↓
SOPs por Fase (ejecucion diaria)
```

**Ultimo Update**: 2026-03-24 — Added: Supuestos del Journey (5 categorias), Criterios de Aceptacion por MOT (binarios/verificables), Regression Paths (F4→F3, F3→F2, F2→F1, churn), Exception Flows (E1-E4: no-shows, non-starters, low NPS, refunds), updated SOP references (todos los delivery SOPs now CREATED).

**Cambios Retirados**:
- Removed: "Notas de Renovacion Web" (moved to website-strategy doc)
- Removed: "Mapa de Dependencias Extendido" (moved to README del proceso comercial)
- Compressed: "Ecosystem Map" en referencia simplificada

