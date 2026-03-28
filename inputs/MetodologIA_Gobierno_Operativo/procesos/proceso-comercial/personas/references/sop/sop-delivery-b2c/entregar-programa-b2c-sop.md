# SOP: Entregar Programa B2C

> **Codigo**: SOP-DELIVERY-B2C-001
> **Version**: 2.0
> **Fecha**: 2026-03-24
> **Fase Blueprint**: F3 — Practica
> **Aplica a**: Todos los sub-segmentos B2C (P1, P2, P3, P4)
> **Prerequisito**: SOP Structuring B2C completado (F2 cerrado, ODS firmada)
> **Output**: Cliente con Aha! Moment verificado, Autonomy Kit entregado, listo para F4 (Autonomia)

---

## 1. Proposito

Estandarizar la entrega de todos los programas B2C (bootcamps, coaching, talleres) asegurando que cada cliente alcance el **Aha! Moment** (MOT-3) con aplicación inmediata verificada, complete todos los Quality Gates, y tenga los recursos para mantener autonomía post-programa, independientemente del sub-segmento.

---

## 2. Alcance

| Programa | Sub-Segmentos | Duracion | Formato | Capacidad/Coach |
|----------|---------------|----------|---------|-----------------|
| Taller Estrategia ($200k) | P1, P4 | 1 sesion (3h) | Grupal | Max 30 personas |
| Bootcamp Amplificacion IA ($800k) | P1, P2 | 6 semanas (18h) | Grupal + 2 sesiones 1:1 | 2 cohortes/trimestre |
| Bootcamp Ofimatica IA ($800k) | P4 | 4 semanas (12h) | Grupal pequeño (max 8) | 4 grupos/trimestre |
| Bootcamp Ventas IA ($800k) | P1 | 6 semanas (18h) | Grupal + 2 sesiones 1:1 | 2 cohortes/trimestre |
| Coaching Liderazgo ($2.4M) | P3 | 8 sesiones (12h) | 1:1 exclusivo | Max 3 clientes/mes |

---

## 3. Handoff Incoming (Requisitos de F2)

**Antes de iniciar entrega, validar que exista:**

- [ ] ODS firmada y vigente (cliente + MetodologIA)
- [ ] Baseline Report completado (estado actual del cliente, KPIs iniciales)
- [ ] Ruta personalizada documentada (programa, módulos, adaptaciones específicas)
- [ ] Acceso confirmado a plataforma/LMS del cliente
- [ ] Prompts y GPTs custom preparados para el perfil específico
- [ ] Calendario tentativo comunicado y confirmado con cliente
- [ ] Contacto de emergencia y timezone validado
- [ ] Requerimientos de accesibilidad o adaptaciones identificadas y documentadas

**Si algún criterio no está cumplido**: escalas a Ops, NO inicia sesión 1 hasta completar.

---

## 4. Procedimiento

### Paso 1: Preparacion Pre-Inicio (D-7 a D-1)

| Accion | Responsable | Herramienta | Criterio de Exito |
|--------|-------------|-------------|-------------------|
| Revisar ODS y ruta personalizada del cliente | Coach/Facilitador | CRM + ODS | Contexto completo cargado, adaptaciones identificadas |
| Revisar Baseline Report de F1 | Coach | Analytics + CRM | KPIs iniciales documentados como snapshot |
| Configurar prompts y GPTs custom segun perfil | Equipo delivery | Repositorio prompts | Templates adaptados al rol/sector/nivel |
| Revisar requeriemientos de accesibilidad | Coach + Ops | ODS + formulario | Adaptaciones tech/pedagógicas confirmadas |
| Preparar materiales de sesion 1 + welcome kit | Coach | Biblioteca playbooks | Materiales listos, revisados y testeados |
| Enviar welcome kit al cliente | Automatizacion | Email + WhatsApp | Confirmacion recibida + link plataforma accesible |
| Configurar acceso a plataforma/LMS | Ops | LMS | Cliente logueado exitosamente (testear antes de día 1) |
| Agendar sesión 1 con recordatorio 48h previo | Ops | Calendar + CRM | Confirmación recibida del cliente |

**Welcome Kit incluye**:
- Bienvenida personalizada con 1 insight clave del Baseline
- Calendario de todas las sesiones con timezone confirmado
- Acceso a plataforma (usuario + contraseña temporal)
- Canal WhatsApp/comunidad con normas claras
- "Tu semana 1": expectativas, primer ejercicio, deadline
- Guía de tecnología (cómo acceder, navegación básica, soporte tech)

---

### Paso 2: Sesion de Apertura (Dia 1)

| Accion | Detalle | Duracion |
|--------|---------|----------|
| **Encuadre** | Explicar metodologia AARC, expectativas, reglas de juego, confidencialidad | 10 min |
| **Baseline Check** | Revisitar Baseline Report de F1 — "Aqui estabas hace X días" | 5 min |
| **North Star** | Co-definir meta personal medible para el programa (ej: "reducir X tarea 50%") | 10 min |
| **Quick Win** | Ejercicio practico que demuestre valor en <30 min (aplicado a caso real cliente) | 30 min |
| **Ajustes** | Validar pacing, preguntar sobre timezone, workload, accesibilidad | 5 min |
| **Cierre** | Asignar primer ejercicio real para aplicar en su contexto + deadline clara | 10 min |

**Criterio de exito**: Cliente sale con Quick Win completado + North Star documentada + primer ejercicio asignado.

**Documentar en CRM**: Meta específica, fecha target para Aha!, adaptaciones aplicadas, timestamp de comienzo.

---

### Paso 3: Ciclo de Sesiones (Semanas 1-N) — Modelo AARC con Asignacion Temporal

Cada sesion sigue el modelo **AARC** con tiempos explícitos (variar según duracion sesion):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ A — ACTIVAR (10 min)   │ Revisar avances desde ultima sesion             │
│                        │ Celebrar wins, abordar obstaculos               │
├────────────────────────┼──────────────────────────────────────────────────┤
│ A — APRENDER (30 min)  │ Nuevo contenido/herramienta/tecnica             │
│                        │ Demostracion en vivo con caso real               │
│                        │ Preguntas tecnicas resueltas                     │
├────────────────────────┼──────────────────────────────────────────────────┤
│ R — REPLICAR (40 min)  │ Ejercicio practico durante la sesion            │
│                        │ Aplicar a caso propio del cliente                │
│                        │ Coach circunda dando feedback real-time          │
├────────────────────────┼──────────────────────────────────────────────────┤
│ C — COMPROMETER (10 min)│ Definir accion concreta para la semana          │
│                        │ Fecha limite + metrica de exito clara            │
│                        │ Enviar resumen por escrito en 24h               │
└──────────────────────────────────────────────────────────────────────────┘
```

**Nota**: Para sesiones de duracion distinta, mantener ratio 1:3:4:1 aproximadamente.

**Frecuencia de check-ins entre sesiones**:
- P1, P2: WhatsApp grupal (lunes/miercoles tips) + 1 check individual/semana (preguntas tecnicas)
- P3: Email formal + disponibilidad async (respuesta en 24h)
- P4: WhatsApp individual + video corto paso-a-paso (máx 3 min) + check semanal telefónico

**Registro por sesion**: Asistencia, engagement visual (participacion), ejercicio completado si/no, NPS, bloqueadores identificados.

---

### Paso 4: Monitoreo de Progreso (Continuo)

| Metrica | Frecuencia | Target | Accion si Falla |
|---------|------------|--------|-----------------|
| Asistencia a sesiones | Semanal | > 80% | Contacto directo dentro de 24h (coach directo) |
| Completitud de ejercicios inter-sesion | Semanal | > 70% | Agendar sesión 1:1 rescate para debuggear bloqueador |
| NPS por sesion | Post-sesion | > 8 | Feedback abierto: "Qué no funcionó?" + ajuste siguiente sesion |
| Aplicacion en contexto real documentada | Quincenal | Al menos 1 caso nuevo/2 semanas | Sesion 1:1 de soporte 30 min (modelo Socrático) |
| Velocidad de respuesta a homework | Dentro plazo | > 80% | Extender plazo + simplificar siguiente tarea |

---

## 5. Quality Gates (Control Points)

**Cada SOP F3 tiene 3 gates obligatorios con criterios binarios PASS/FAIL.**

### Gate 1: Semana 1 — Engagement Inicial (D+7)

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Asistencia a sesión 1 | Si | No |
| [ ] North Star documentada y comunicada | Si | No |
| [ ] Quick Win completado en sesión 1 | Si | No |
| [ ] Cliente completó primer ejercicio inter-sesion | Si | No |
| [ ] NPS sesión 1 >= 7 | Si | No |
| [ ] Acceso a plataforma confirmado y testeado | Si | No |

**Criterio final**: 5+ PASS = **GREEN**, AVANZA. Menos de 5 = **RED**, agendar sesión rescate 1:1 con coach senior.

---

### Gate 2: Semana 3 — "Aha! Moment" (D+21)

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Cliente aplicó herramienta en su contexto real (documentado) | Si | No |
| [ ] Resultado medible reportado (tiempo, $ ahorrado, output mejorado) | Si | No |
| [ ] Cliente expresa entusiasmo genuino (NPS >= 8 O comentario positivo espontaneo) | Si | No |
| [ ] Ejercicios completados consecutivos >= 70% | Si | No |
| [ ] Asistencia >= 80% | Si | No |

**Criterio final**: 4/5 PASS = **GREEN**, AVANZA. Menos de 4 = **YELLOW**, rescate + adaptacion modulos, re-evaluar week 5. Si falla week 5 = **RED**, escalacion a lider delivery.

---

### Gate 3: Final — Autonomy Readiness (Ultima sesion)

| Criterio | PASS | FAIL |
|----------|------|------|
| [ ] Cliente tiene al menos 3 casos de uso reales aplicados | Si | No |
| [ ] NPS final >= 7 | Si | No |
| [ ] Autonomy Kit entregado y confirmado recibido (email con archivo) | Si | No |
| [ ] Plan de mantenimiento documentado (habitos minimos post-programa) | Si | No |
| [ ] Portfolio compilado (entregables, evidencia, metricas antes/despues) | Si | No |
| [ ] Testimonial o video corto grabado (consentimiento confirmado) | Si | No |

**Criterio final**: 5/6 PASS = **GREEN**, completado exitosamente. 4/6 = **YELLOW**, 1:1 de refuerzo antes de cierre. Menos de 4 = **RED**, no avanza a F4 (retencion).

---

### Protocolo de Falla en Gate

1. **Comunicar en 24h**: Email al cliente explicando hallazgo + plan de rescate (sin culpa, tono supportivo)
2. **Agendar 1:1**: Coach + cliente (no grupal), 30 min máximo
3. **Diagnosticar bloqueador**: Técnico? Pedagogía? Contexto del cliente? Expectativas?
4. **Adaptar**: Siguiente sesión modificada específicamente para bloqueador
5. **Re-evaluar**: Siguiente gate como checkpoint

---

## 6. Verificar Aha! Moment (Ritual Detallado — Gate 2)

**Ritual**: `verificar-aha-moment-ritual`

### Evidencia Requerida (al menos 2 de 3):

| Tipo | Ejemplo | Como Capturar |
|------|---------|---------------|
| **Caso documentado** | "Usé ChatGPT custom para armar propuesta en 30 min (antes 2h)" | Screenshot + resumen escrito del cliente |
| **Metrica cuantitativa** | Horas ahorradas, $ generados, % mejora en métrica cliente | Número con contexto: "Logré reducir X en 25%" |
| **Entusiasmo genuino** | NPS 9-10 + comentario positivo espontaneo | Encuesta post-sesion + Slack/WhatsApp |

### Entrevista de Validacion (10 min, en sesión grupal o 1:1):

```
1. "¿Ya usaste [la herramienta] en algo real en tu trabajo?"
   → Si no: problema, rescate.
   → Si si: "Cuéntame qué pasó. ¿Cuánto tiempo te ahorró?"

2. "¿Qué fue lo más sorprendente?"
   → Escuchar si respuesta es positiva/entusiasta (tono, no solo palabras)

3. "¿Lo recomendarías a un colega?"
   → NPS proxy: Si si → 8+. Si duda → 6-7. Si no → <6
```

### Si Aha! Moment NO ocurre en semana 4:

1. **Agendar sesion de rescate 1:1** (30 min, dentro de 72h)
2. **Diagnosticar bloqueador específico**:
   - "¿Qué te frena para aplicarlo?" (escucha activa)
   - Tipologia: Tecnica (no entiende), Pedagogia (ejemplo no aplica), Contexto (no tiene caso real)
3. **Adaptar siguiente modulo** directamente al bloqueador identificado
4. **Sesion remedial**: Nuevo caso de uso, nuevo ejercicio, feedback inmediato
5. **Escalar a lider de delivery si persiste en semana 5**: Revisar si cliente es right-fit para programa

---

## 7. Edge Cases y Protocolos de Respuesta

### Caso 1: Cliente Pierde 3+ Sesiones Consecutivas

**Trigger**: Ausencia sin aviso 3 veces.

**Protocolo**:
1. Contacto directo via WhatsApp/llamada dentro de 24h (coach personalmente)
2. Preguntar sin asumir: "Qué pasó? Hay algo que no funciona?"
3. Opciones segun respuesta:
   - Bloqueador tecnico → resolver con Ops
   - Conflicto contexto (reuniones, workload) → renegociar horario/formato
   - Desinteres → oferta: "Pausamos 2 semanas, volvés luego?" (no cancelar)
   - Crisis personal → ofrecer sesion 1:1 reducida + posible extension plazo
4. Si cliente no contacta en 5 días → escalar a lider (posible cancelacion)

---

### Caso 2: Cliente Quiere Cambiar de Programa Mid-Way

**Trigger**: Cliente pide pivotear a otro programa en semana 3+.

**Protocolo**:
1. Validar por qué (no es el right-fit? Descubrió necesidad diferente? Oferta competencia?)
2. Si es pedagógico (mejor opción para su caso): aceptar, documentar en ODS v2, ajustar ruta
3. Si es por insatisfaccion: **NO permitir pivot hasta hacer 1:1 rescate** (resolver raiz)
4. Si es oferta competencia: **hablar con lider comercial**, posible ajuste ODS (precio/duracion)
5. Documentar decision en CRM para próximas interacciones

---

### Caso 3: Contexto del Cliente Cambia (ej: cambio de rol, empresa)

**Trigger**: Cliente comunica cambio laboral durante programa.

**Protocolo**:
1. Validar impacto en programa (¿sigue siendo relevante?)
2. Opciones:
   - **Adaptación en vivo**: Pivotear casos de uso al nuevo contexto (más común)
   - **Pausa + resume**: Si cambio es muy disruptivo, pausar 2 semanas, retomar luego
   - **Cancelacion con refund parcial**: Si nuevo rol hace programa irrelevante
3. Documentar cambio en ODS, comunicar a lider de delivery
4. Reschedul si aplica (ej: cambiar de bootcamp grupal a coaching 1:1)

---

### Caso 4: Cliente con Discapacidad / Accesibilidad

**Trigger**: Cliente comunica discapacidad visual, auditiva, motora, neurodiverso.

**Protocolo** (validar en Handoff Incoming):
- **Visual**: Zoom con descripcion de pantalla, materiales en PDF accesible, audios de pasos
- **Auditiva**: Subtítulos en vivo, chat para preguntas, materiales por escrito
- **Motora**: Permitir micrófono solo (sin video), longer breaks cada 30 min, sesiones más cortas
- **ADHD/Autismo**: Timer visual para cada bloque AARC, agenda con breaks, reducir distracciones

**Acción**: Coach toma 30 min pre-sesion 1 para testear setup. Ajustes no son "costo", son **standard de inclusión**.

---

### Caso 5: Cliente en Timezone Radicalmente Diferente

**Trigger**: Cliente en Asia/Australia con sesiones pensadas para LATAM.

**Protocolo**:
1. Reconocer en sesion 1: "Hay diferencia horaria significativa"
2. Opciones:
   - **Async-first**: Videos prerecordados, ejercicios asincronos, 1 sesion semanal en horario viable
   - **Rotacion**: Cada 2 sesiones cambia horario (justo para el)
   - **Grabacion + Q&A**: Sesion grupal grabada, cliente ve después, Q&A vía email
3. Comunicar expectativa clara: "Respuesta en 24h, no instantanea"
4. Ajustar check-ins: WhatsApp async (no WhatsApp grupal en tiempo real)

---

## 8. Fail Modes and Recovery

### Paso 1: Pre-Inicio (Preparacion)

| Falla | Síntoma | Acción Inmediata | Recovery |
|-------|---------|------------------|----------|
| ODS no firmada a tiempo | Se intenta iniciar sin firma | HOLD sesion 1, contactar lider comercial | Ops persigue firma, delay comunicado al cliente con fecha nueva |
| Acceso a plataforma no funciona | Cliente no puede loguearse day 1 | Ops en call emergente con cliente | Usar backup (email, Drive) para materiales, resolver tech antes day 2 |
| Materiales no listos | Coach improvisa sesion 1 | Usar playbook template generico, menos personalizacion | Coach prepara overnight, recupera personalizacion en semana 1 |
| Cliente no contactable pre-inicio | No responde a welcome kit | Llamada telefonica directo (ops) | Si no contacta en 48h, presunir cancel, marcar como "no-show" |

---

### Paso 3: Sesiones (Ciclo AARC)

| Falla | Síntoma | Acción Inmediata | Recovery |
|-------|---------|------------------|----------|
| Cliente no hace ejercicio inter-sesion | Llega a sesion sin homework hecho | Preguntar bloqueador, simplificar tarea siguiente | Acortar ciclo: ejercicio más pequeño, deadline más cercano |
| Grupo no conecta (P1, P2 grupal) | Silencios, poca participacion, clientes distraidos | Coach hace "round-robin" (pregunta directa a cada uno), pide anecdota | Cambiar dinamica: breakout groups, ejercicio individual vs grupal |
| Cliente cuestiona metodologia | "¿Esto realmente funciona?" en voz alta | Responder con honestidad: "Funciona si la aplicas, veamos tu caso" | Pivot a caso de éxito del cliente mismo, demostrar valor inmediato |
| Coach se queda sin tiempo (Accion >40min) | No alcanza a terminar bloque REPLICAR | Extender sesion 15 min (no cortar Comprometer), o agendar sesion extra | Para próximas sesiones, reducir scope del A-Aprender para ganar tiempo |
| Cliente desconecta (tecnicamente) | Cae de Zoom/llamada durante sesion | Llamar inmediatamente (coach usa telefono), reincorporar en <2 min | Revisar ISP, ofrecer sesion de backup, usar chat como backup |

---

### Paso 5-6: Cierre

| Falla | Síntoma | Acción Inmediata | Recovery |
|-------|---------|------------------|----------|
| No hay Aha! Moment observable en gate final | Cliente completó pero sin caso real aplicado | NO dar "pass" a Gate 3, pero tampoco castigo | Extender programa 2 semanas (sin costo), enfoque 100% en 1 caso real |
| NPS final <6 | Cliente insatisfecho, riesgo de refund | Agendar 1:1 inmediata con lider, escuchar griefs | Oferta: refund parcial (50%) + 2 sesiones 1:1 gratis post-programa |
| Portfolio incompleto | No hay evidencia compilada | Coach corre contra reloj para compilar antes cierre oficial | Enviar portfolio dentro 5 días post-cierre (explicar delay) |
| Cliente solicita reembolso | Insatisfaccion ex-post | 1:1 con lider delivery (no coach), escuchar con empatia | Reembolso: 100% si falla antes gate 2, 50% si falla gate 2-3, 0% si gate 3 pass |

---

## 9. Capacity Model (Gestión de Recursos)

### Maximos por Coach/Facilitador

| Rol | Programa | Grupos/Trimestre | Clientes Simultaneos | Notas |
|-----|----------|-----------------|---------------------|-------|
| Coach grupal (P1,P2,P4) | Bootcamp 6sem | 2 cohortes | 16-20 clientes (grupo de 8-10 x 2) | 1 programa distinto por trimestre |
| Coach grupal (P3) | Coaching 1:1 | N/A | 3-4 clientes | Sesiones 45 min, máx 2/semana per cliente |
| Facilitador (P1) | Taller 3h | 10 talleres | 300 personas (30 x 10) | Sin overlap, espaciados min 3 días |

### Capacidad por Programa (Trimestre)

| Programa | Cap. Trimestral | Coaches Requeridos | Bottleneck |
|----------|-----------------|-------------------|------------|
| Bootcamp Amplificacion IA (6 sem, 18h grupal) | 2 cohortes x 10 = 20 clientes | 2 coaches full (1 por cohorte) | Scheduling intensivo |
| Bootcamp Ofimatica IA (4 sem, grupal pequeño) | 4 grupos x 8 = 32 clientes | 1 coach (4 ciclos secuencial) | Tiempo total 16 semanas (full trimestre) |
| Coaching Liderazgo 1:1 (8 sesiones) | 3 clientes x 1 = 3 clientes | 1 coach (12-15h/mes) | Baja volumetría, alto margen |

### Curva de Demanda y Reserva

- **Reserva obligatoria**: 15% capacity no asignada (urgencies, rescates, adaptaciones)
- **Forecast rolling**: Ops proyecta 4 semanas adelante, comunica gaps a lider comercial
- **Escalamiento**: Si demand > capacity, prioridad a P1/P2 (mayor LTV), defer P4 a trimestre siguiente

---

## 10. Adaptaciones por Sub-Segmento (Tabla Comparativa Comprimida)

| Dimension | P1 Transicion | P2 Estudiante | P3 Ejecutivo | P4 Autodidacta |
|-----------|---------------|---------------|--------------|-----------------|
| **Casos de uso** | Automatizar workflows rol actual | Tesis, investigación, presentaciones | Estrategia IA, board presentations | Ofimatica (Word, Excel, Email) |
| **Horario sesiones** | Nocturna/sábado (compat laboral) | Intensivo 2x/week (3 semanas) | Flexible 45 min, async preferido | Pausado 1x/week, misma hora |
| **Tamaño grupo** | 8-12 | 6-10 | 1:1 exclusivo | Max 8 |
| **Duracion programa** | 6 semanas | 3 semanas | 8 sesiones (flexible) | 4 semanas |
| **Frecuencia check-in** | WhatsApp grupal diario + 1:1 semanal | Discord grupal intensivo | Email async formal | WhatsApp 1:1 + video paso-a-paso |
| **Soporte extra** | Templates por industria/función | Comunidad activa (Discord) | Sesion rescate sin costo | Guías impresas + paciencia pedagógica |
| **Accesibilidad standard** | Considerar workload laboral | Considerar exámenes/calendarios acad | Microsessions <1h permitidas | Ritmo lento, ejemplos concretos |
| **Success metric** | Aplicacion inmediata documentada | Portfolio academico completado | ROI strategico identificado | Autonomia en tareas ofimatica |

---

## 11. Sesion de Cierre (Ultima Sesion — Detallado)

| Accion | Duracion | Responsable | Entregable |
|--------|----------|-------------|-----------|
| **Retrospectiva** | 20 min | Coach | Documento: Baseline vs. Ahora (3-4 metricas clave) |
| **Portfolio de Casos** | 15 min | Coach + Cliente | PDF compilado: 3+ casos reales aplicados con antes/despues |
| **Autonomy Kit** | 15 min | Coach | ZIP entregado con: prompts custom (3-5), templates (2-3), guía de mantenimiento (1-pager) |
| **Plan de Mantenimiento** | 10 min | Coach | Documento: "Cómo mantener lo aprendido" — 3-5 habitos minimos semanales |
| **NPS Final** | 5 min | Automatizacion | Encuesta de cierre (NPS + 2 preguntas abiertas) |
| **Testimonial/Video** | 10 min | Coach | Video corto (30 seg) O texto de testimonial (consentimiento grabado) |
| **Next Steps F4** | 5 min | Coach | Presentar opciones: check-ins mensuales ($X), embajador/referral, sin costo |

**Documentacion en CRM**: Link a portfolio, NPS final, fecha cierre oficial, handoff a F4 lead.

---

## 12. Handoff Outgoing a F4 (Success Management)

**Antes de cerrar SOP F3, entregar a F4 exactamente esto:**

- [ ] Portfolio de casos (PDF con 3+ casos documentados)
- [ ] Autonomy Kit entregado (ZIP confirmado recibido)
- [ ] NPS final (numero >= 7 para cierre exitoso)
- [ ] Baseline Report original + Final Report (comparacion antes/despues)
- [ ] Plan de Mantenimiento (documento 1-pager con habitos semanales)
- [ ] Testimonial grabado o escrito (para marketing/future clients)
- [ ] Listado de 3-5 prompts/templates custom usados (para que cliente siga usando)
- [ ] Documento: "Proximos pasos F4" (opciones, pricing, timeline)
- [ ] Datos para success scoring: engagement, Aha! achievement, autonomy readiness %

**Si cualquier elemento falta**: SOP F3 no se cierra, no entra a F4 hasta completar.

---

## 13. Rituales Asociados

- `ejecutar-sesion-coaching-ritual` — Checklist pre/durante/post sesión individual
- `facilitar-bootcamp-grupal-ritual` — Guía para sesiones grupales (control tiempo AARC, engagement)
- `verificar-aha-moment-ritual` — Protocolo de validación del MOT-3 (evidencia requerida)
- `gate-week1-ritual` — Checklist Gate 1 (engagement inicial)
- `gate-week3-ritual` — Checklist Gate 2 (Aha! moment)
- `gate-final-ritual` — Checklist Gate 3 (autonomy readiness)

---

## 14. Metricas de Salud del SOP

| KPI | Formula | Target | Frecuencia | Accion Si Falla |
|-----|---------|--------|------------|-----------------|
| Completion Rate | Clientes que pasan Gate 3 / Total iniciados | > 85% | Por cohorte | Revisar fail modes por programa |
| Aha! Rate | Clientes con Aha! verificado (Gate 2) / Total | > 75% | Por cohorte | Auditar 3 sesiones 1:1 rescate |
| NPS Promedio Final | Promedio NPS cierre | > 70 | Por cohorte | Si < 70, revisar pedagogia + coach |
| Time to Aha! | Dias desde inicio hasta Gate 2 PASS | < 21 dias | Por cliente | Si > 21, investigar bloqueador |
| Autonomy Readiness | % que pasa Gate 3 sin necesidad rescate | > 70% | Por cohorte | Reforzar entrenamiento coaches |
| Handoff Completeness | % cohorts con 8/8 elementos F4 entregados | = 100% | Por cohorte | Marcar como "incomplete" si falta |
| Cost per Completion | (Coach hours + ops + tech) / # completions | < presupuesto | Trimestral | Optimizar duraciòn sesiones |

---

## 15. Escalamiento y Governance

| Situacion | Trigger | Accion | Responsable | Timeline |
|-----------|---------|--------|------------|----------|
| Gate 1 FAIL | Asistencia/engagement bajo semana 1 | Sesion rescate 1:1 con coach senior | Lider delivery | 48h |
| Gate 2 YELLOW | Aha! no confirmado semana 3 | Diagnostico bloqueador + sesion remedial | Coach | Semana 4 |
| Gate 2 RED | Aha! falla semana 5 | Escalar a lider delivery, plan B (pausa/pivot) | Lider delivery | Semana 5 |
| Desercion (3+ ausencias) | Cliente no responde | Contacto directo coach + lider, oferta pausa | Coach + Lider | 72h |
| NPS < 6 sostenido | 2+ sesiones consecutivas | Review contenido/pedagogia + ajuste sesion siguiente | Coach + Lider | 5 dias |
| Solicitud refund | Cliente pide dinero devuelta | 1:1 con lider (no coach), evaluacion por gate pasado | Lider + Admin | 3 dias |
| Overflow capacity | Demand > supply de coaches | Prioridad P1/P2, defer P4, o recluta coach trainee | Lider + HR | 2 semanas |

---

## 16. Dependencias y Gobernanza

> **Gobierno**: Este SOP cierra los Gaps G1-G3 detectados en la Matriz de Journeys (engagement, aha!, autonomy).
> **Dependencia upstream**: sop-structuring-b2c (F2) — debe entregar ODS + Baseline completo
> **Dependencia downstream**: sop-success-b2c (F4) — recibe Handoff con portfolio + NPS + autonomy metrics
> **Revision**: Trimestral (por cohorte) o al agregar nuevo programa al portafolio.
> **Dueño del SOP**: Director de Delivery B2C
> **Ultima revision**: 2026-03-24 (v2.0, +10x quality)
