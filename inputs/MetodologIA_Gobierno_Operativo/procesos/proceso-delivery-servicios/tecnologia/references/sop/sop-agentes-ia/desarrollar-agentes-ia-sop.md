# SOP: Desarrollar Agentes IA — Amplificador Operativo

**Metadata**
- Vertical: TecnologIA
- Tipo: Amplificador
- Palancas MetodologIA: 5 (IA), 6 (Tecnología y Procesos)
- Owner: Arquitecto de Agentes IA
- Versión: 1.0
- Fecha: 2026-03-24
- Estado: Activo

---

## 1. PROPÓSITO Y SCOPE

### Propósito Estratégico
Diseñar, construir y desplegar agentes de IA autónomos que ejecutan tareas, toman decisiones y operan workflows sin intervención humana constante. El agente es un **Amplificador Operativo** — ejecuta trabajo, no responde preguntas.

**Diferencia clave con Asistentes**: Un asistente RESPONDE cuando le preguntas. Un agente ACTÚA por su cuenta según triggers, reglas y objetivos.

### Scope de Servicio
- Cobertura: Empresas medianas a grandes (50+ empleados)
- Plataformas soportadas: Claude Code agents, Cursor agents, n8n, Make/Zapier, Python custom agents, LangChain/LangGraph, CrewAI
- Casos de uso: Automatización de workflows, clasificación de datos, generación de reportes, prospección, alertas, orquestación multi-step
- Límite: No incluye infraestructura on-prem o configuración de data warehouses (scope de DevOps)

---

## 2. SUPUESTOS EXPLÍCITOS (Asunciones Base)

1. **Workflow actual existe y es manual**: El cliente ejecuta algo hoy de forma manual (o semimanual). Queremos automatizar eso.
2. **Reglas de decisión son explícitas o inferibles**: Podemos extraer "si X, entonces Y" del flujo actual. No requerimos ML training.
3. **Triggers están bien definidos**: Sabemos cuándo el agente debe despertar (email, mensaje, schedule, webhook).
4. **Datos son accesibles**: Las fuentes de data están accesibles vía API o exportación. No hay "data en PDFs scaneados".
5. **Escala es predecible**: Cliente sabe aproximadamente cuántas veces/día el agente actuará.
6. **Cambios de proceso son raros**: Si el cliente cambia radicalmente su workflow, el agente requiere redesign.
7. **Humano revisa en paralelo inicialmente**: Durante piloto, humano y agente trabajan en paralelo.

---

## 3. LÍMITES (Qué NO Hacemos)

| Límite | Razón | Alternativa |
|--------|-------|-------------|
| Agente con ML training custom | Fuera de alcance (requiere data scientist + tiempo) | Usar reglas lógicas + IA generativa |
| Full autonomy sin human-in-the-loop | Demasiado riesgoso (errores del agente = impacto directo) | Siempre hay escalation rules |
| Soportar >10 integraciones simultáneas | Costo de testing exponencial | Priorizar 3-4 integraciones core |
| Agente que modifica data crítica sin audit | Compliance + risk (quién es responsable si falla) | Audit log + aprobación humana para high-impact |
| Automatizar decisiones altamente creativas | IA no es creativa a nivel de experto humano | Asistente IA + humano creativo |
| Garantizar 99.99% uptime | Sistemas distribuidos requieren infraestructura robusta | Garantizar 99% en 1ª fase |
| Cambios post-deployment sin redesign | Agentes son frágiles a cambios de contexto | Cambios son adicionales o requieren redesign |

---

## 4. CRITERIOS DE ACEPTACIÓN BINARIOS

Cada criterio es **sí/no**. Cliente debe validar cada uno antes de movimiento a producción:

1. **Automatización**: ☐ Agente completa el workflow end-to-end sin intervención humana en ≥80% de los casos
2. **Velocidad**: ☐ Tiempo de ejecución del agente ≤50% del tiempo manual actual (medido en 10 runs reales)
3. **Precisión**: ☐ Tasa de error ≤5% (errores que requieren intervención humana post-facto)
4. **Escalation**: ☐ Escalation rules funcionan (agente sabe cuándo pedir ayuda, humano lo valida)
5. **Monitoreo**: ☐ Dashboard de monitoreo funcional (logs, alertas, métricas visibles)
6. **Documentación**: ☐ Diagrama de flujo + guía de troubleshooting entregadas
7. **Operabilidad**: ☐ Cliente puede pausar/reiniciar el agente sin soporte técnico
8. **Satisfacción**: ☐ Net Promoter Score o survey ≥8/10 post-entrega

**Gate Crítico**: Piloto debe cumplir 6/8. Producción requiere 8/8.

---

## 5. CASOS BORDE (5-7 Escenarios de Estrés)

### Caso 1: Decisión Incorrecta con Alto Impacto
**Escenario**: Agente responde mal a un cliente VIP, produce churn. Impacto: revenue.
**Trigger**: Decisión de agente tiene downstream consequences significativas.
**Decisión Diseño**: Human-in-the-loop obligatorio para clientes VIP. Agente genera response + humano aprueba/rechaza.
**Fallback**: Revert a manual (humano lo hace). Agente aprende de error.

### Caso 2: API de Terceros Cambia/Falla
**Escenario**: Agente integrado a Hubspot. Hubspot actualiza API. Workflow se rompe.
**Trigger**: Dependencia en terceros sin control.
**Decisión Diseño**: Versión pinning de APIs. Circuit breaker (si falla, fallback). Monitoring de API changes.
**Fallback**: Notificación a equipo. Rollback a versión anterior de API.

### Caso 3: Volumen de Triggers Mayor al Esperado
**Escenario**: Agente espera 50 emails/día. Recibe 500 emails/día. Se satura.
**Trigger**: Escala cambia (viral content, marketing campaign, etc.).
**Decisión Diseño**: Rate limiting + queue. Agente procesa en orden. Alertar si cola crece.
**Fallback**: Aumentar compute. Paralizar agentes (múltiples instancias).

### Caso 4: Cliente Quiere Más Scope Mid-Project
**Escenario**: "Agente, además de clasificar emails, quiero que genere respuestas + envíe". Scope creep.
**Trigger**: Producto en uso, cliente pide expansión.
**Decisión Diseño**: Nueva tareas son adicionales (pago). Requieren redesign. No se agregan a piloto.
**Fallback**: Documentar request. Post-MVP, proponer Fase 2.

### Caso 5: Datos Sucios/Inconsistentes
**Escenario**: Data en CRM es caótica (duplicados, campos vacíos, inconsistencias). Agente produce garbage output.
**Trigger**: Cliente tiene hygiene data pobre.
**Decisión Diseño**: Pre-requisito: data cleaning (proyecto separado). Agente assume data limpia.
**Fallback**: Reducir scope (agente trabaja solo con datos limpios/validados).

### Caso 6: Regulaciones Impiden Automatización
**Escenario**: Fintech. Regulación exige que humano apruebe cada transacción. Agente no puede ser fully autonomous.
**Trigger**: Industria con regulaciones estrictas (fintech, healthcare, legal).
**Decisión Diseño**: Agente genera + propone. Humano aprueba (bot en Slack con approve/reject buttons).
**Fallback**: Audit log exhaustivo. Compliance review pre-deployment.

### Caso 7: Multi-Agent Conflict
**Escenario**: 2 agentes operan sobre el mismo recurso. Agente 1 dice "hacer X". Agente 2 dice "hacer Y". Conflicto.
**Trigger**: Multi-agent systems sin coordinación.
**Decisión Diseño**: Mutex / locking (solo 1 agente accede a recurso por vez). Coordinator agent.
**Fallback**: Simplificar a 1 agente. Evitar conflicts.

---

## 6. DECISIONES DE DISEÑO CON JUSTIFICACIÓN

| ID | Decisión | Justificación | Riesgo Mitigado |
|----|----------|---------------|-----------------|
| DD-01 | **Human-in-the-loop en decisiones high-impact** | IA puede fallar. Humano es última línea de defensa. | Errores del agente no derivan en disaster. |
| DD-02 | **Piloto paralelo 1 semana mínimo** | Antes de darle autonomía total, comparar agente vs. manual. | Validar que agente es mejor (no peor). |
| DD-03 | **Dashboard de monitoreo es entregable obligatorio** | Sin visibilidad, no sabemos si agente está enfermo. | Detectar problemas rápido. |
| DD-04 | **Escalation rules definidas ANTES de construir** | Si las diseñamos después, el agente ya falla sin saber escalar. | Agente sabe cuándo pedir ayuda. |
| DD-05 | **Preferir no-code cuando sea posible** (Zapier/Make vs. custom code) | Menor costo de mantenimiento. Menor curva de aprendizaje. | Longevidad post-implementación. |

---

## 7. ANTI-PATTERNS (5+ Trampas a Evitar)

### Anti-Pattern 1: "Full Autonomy Día 1"
**Qué es**: Lanzar agente a producción con autonomía total sin período de piloto paralelo.
**Síntoma**: Primer error del agente causa disaster. Cliente pierde confianza.
**Cómo evitar**: Piloto paralelo es OBLIGATORIO. Mínimo 1 semana. Humano y agente trabajan en paralelo.

### Anti-Pattern 2: "El Agente Invisible"
**Qué es**: No monitorear post-deployment. Asumir que "funciona solo".
**Síntoma**: Agente falla silenciosamente. Cliente se entera 3 días después.
**Cómo evitar**: Dashboard de monitoreo + alertas. Revisión diaria en semana 1.

### Anti-Pattern 3: "Scope Creep Agentico"
**Qué es**: Cliente pide "un poco más" cada semana. Agente crece sin control.
**Síntoma**: Scope original: 5 tareas. Semana 3: 12 tareas. Agente es Frankenstein.
**Cómo evitar**: Scope congelado en Discovery. Cambios post-piloto son Fase 2 (pago).

### Anti-Pattern 4: "Sin Escalation Rules"
**Qué es**: Agente no sabe cuándo escalar a humano. Continúa intentando cosas imposibles.
**Síntoma**: Agente falla, reintenta, falla, reintenta. Loop infinito.
**Cómo evitar**: Escalation rules diseñadas ANTES de construcción. Agente: "Si no puedo, pido ayuda".

### Anti-Pattern 5: "Complexity Addiction"
**Qué es**: Usar multi-agent system orquestado cuando un workflow simple resuelve el problema.
**Síntoma**: Proyecto que debería ser 2 semanas toma 8. Costo: 4x.
**Cómo evitar**: "La herramienta más simple que resuelve el problema". Preferir Zapier/Make/n8n antes que custom code.

---

## 8. TRES NIVELES DE COMPLEJIDAD

### Nivel 1: SIMPLE (2 Semanas, ~COP $1.5M)

**Qué entregamos**: 1 workflow automatizado con 1 trigger, 1 decisión, 1 output.

**Ejemplo**: "Cuando llega email de cliente, clasificar urgencia (baja/media/alta), responder con template automático, guardar en CRM."

**Proceso**:
- Days 1-3: Discovery del workflow actual + mapeo
- Days 4-5: Diseño del agente + escenarios de test
- Days 6-9: Construcción (típicamente en Zapier/Make)
- Days 10: Testing interno
- Days 11: Piloto paralelo
- Days 12: Entrega + training
- Days 13-42: 30 días soporte

**Gate de Aceptación**: 6 de 8 criterios (Automatización, Velocidad, Precisión, Escalation, Documentación, Satisfacción).

**Plataforma recomendada**: Zapier, Make, o n8n (no-code).

---

### Nivel 2: COMPUESTO (4 Semanas, ~COP $4M)

**Qué entregamos**: Multi-step workflow con 2-3 decisiones condicionales, 2-3 integraciones, monitoring.

**Ejemplo**: "Monitorear menciones en redes (Twitter, Instagram), agrupar por sentimiento (positivo/negativo), generar reporte semanal, alertar si hay crisis."

**Proceso**:
- Weeks 1: Discovery detallado + análisis de datos
- Week 2: Diseño de agente + arquitectura de integraciones
- Weeks 3-4: Construcción + testing iterativo + dashboard
- Week 5: Piloto paralelo (1 semana)
- Days 29-59: 30 días soporte

**Gate de Aceptación**: 7 de 8 criterios (+ Monitoreo funcional).

**Plataforma recomendada**: n8n (mejor para workflows complejos), o Make con custom code blocks.

---

### Nivel 3: ORQUESTADOR (8 Semanas, ~COP $10M)

**Qué entregamos**: Multi-agent system donde agentes especializados colaboran. Orquestación, resolución de conflictos, auto-scaling.

**Ejemplo**: "Agente de prospección" (busca leads) + "Agente de contenido" (genera posts) + "Agente de análisis" (mide resultados). Los 3 se coordinan vía Coordinator agent.

**Proceso**:
- Weeks 1-2: Discovery + análisis de workflows complejos
- Weeks 3-4: Diseño arquitectónico de multi-agent
- Weeks 5-6: Desarrollo de agentes individuales
- Week 7: Integración + testing de colaboración
- Week 8: Dashboard + monitoring avanzado
- Weeks 9+: Piloto paralelo (2 semanas)
- Days 57-87: 30 días soporte

**Gate de Aceptación**: Todos 8 criterios.

**Plataforma recomendada**: Custom (Python + LangChain/LangGraph), o Claude Code agents, o Cursor agents.

---

## 9. PROCESO PASO A PASO (6 Fases)

### Fase 1: DISCOVERY (Days 1-3)

**Entrada**: Proyecto ganado.

**Actividades**:
1. Mapeo de workflow actual (4h):
   - ¿Qué pasos hace el usuario hoy para completar esta tarea?
   - Documentar flujo: inputs → decisiones → outputs
   - Identificar bottlenecks (dónde gasta más tiempo, dónde hay errores)
   - ¿Quién ejecuta? (1 persona, equipo, sistema?)
2. Entrevista con usuario final (2h):
   - Observar usuario en contexto real
   - ¿Qué datos necesita? ¿Dónde están?
   - ¿Qué decisiones toma? (cómo decide entre opción A vs. B)
   - ¿Cuál es el objetivo final?
3. Análisis de data (4h):
   - ¿Data está en sistemas accesibles? (CRM, email, drive)
   - ¿Data es limpia? (consistente, completa)
   - ¿Quién tiene acceso? (permisos, credenciales)
4. Crear mapa de automatización (4h):
   - Qué pasos pueden ser automáticos (agente)
   - Qué pasos requieren humano (escalation)
   - Triggers: cuándo el agente actúa
   - Outputs: qué hace el agente al terminar

**Entrega**: Documento de flujo actual + Mapa de automatización.

---

### Fase 2: DISEÑO DE AGENTE (Days 4-7)

**Entrada**: Mapa de automatización aprobado.

**Actividades**:
1. Definir triggers (2h):
   - Email recibido? Schedule (cada lunes 9am)? Webhook manual?
   - Trigger debe ser específico y testeable
2. Definir decisiones (4h):
   - ¿Qué decidiría el humano en esta bifurcación?
   - Si A → acción 1. Si B → acción 2. Si C → escalar a humano.
   - Decisiones deben ser lógicas (no creativas/ambiguas)
3. Definir acciones (4h):
   - Cuando decisión = "procesar", qué hace el agente? (enviar email, crear card en Trello, etc)
   - Acciones son integraciones (API calls)
4. Definir escalation rules (2h):
   - Cuándo no puede decidir, agente escala
   - Ejemplo: "Si confianza < 60%, pedir aprobación humana"
5. Diagrama de flujo (2h):
   - Dibujar en Miro/Figma/draw.io
   - Mostrar al cliente
   - Gate: Cliente aprueba o solicita cambios

**Entrega**: Diagrama de flujo + Especificación de decisiones + Especificación de acciones + Tabla de escalation rules.

**Go/No-Go Gate**: Cliente debe aprobar diseño antes de Construcción.

---

### Fase 3: CONSTRUCCIÓN (Days 8-20/30/50)

**Entrada**: Diseño aprobado.

**Actividades**:
1. Setup de herramienta (2h):
   - Crear workspace en Zapier/Make/n8n
   - Conectar integraciones (OAuth, API keys)
   - Testear conexión a cada API
2. Build del workflow (8-24h según complejidad):
   - Implementar en herramienta elegida
   - Paso a paso según diagrama de flujo
   - Insertar lógica condicional
   - Configurar acciones
3. Integración de AI (si aplicable, 4-8h):
   - Llamadas a LLM (OpenAI, Claude, etc)
   - Prompt engineering para decisiones
   - Testing de respuestas
4. Testing interno (4-6h):
   - 20 test cases (happy path + edge cases)
   - Bug fixing
   - Performance testing (ejecución time)
5. Setup de monitoring (4h):
   - Logs: registrar cada ejecución del agente
   - Alertas: si falla, notificar
   - Dashboard: visualizar métricas

**Entrega**: Agente funcional + Logs + Alertas + Dashboard.

---

### Fase 4: PILOTO PARALELO (Days 21-27 / 31-37 / 51-57)

**Entrada**: Agente funcional.

**Actividades**:
1. Setup paralelo (1h):
   - Agente opera sobre los MISMOS inputs que humano
   - Resultados del agente son revisados por humano, no ejecutados aún
   - Duración: 1 semana (100+ executions idealmente)
2. Comparación (daily, 1h):
   - ¿Agente produce resultado igual o mejor que humano?
   - ¿Tiempo de agente < tiempo de humano?
   - ¿Errores del agente?
   - Documentar en spreadsheet
3. Análisis post-piloto (4h):
   - Revisar datos de piloto
   - Calcular: % automatización, % error, tiempo promedio
   - ¿Cumple criterios de aceptación?
4. Refinamiento basado en datos (4-8h):
   - Ajustar thresholds de decisión
   - Refinar prompts si es IA
   - Agregar escalation rules si es necesario

**Entrega**: Piloto report + Data de comparación (agente vs. humano) + Agente refinado.

**Go/No-Go Gate**: 80%+ automatización y <5% error antes de pasar a Producción.

---

### Fase 5: DEPLOYMENT A PRODUCCIÓN (Days 28-30)

**Entrada**: Piloto aprobado.

**Actividades**:
1. Pre-flight checklist (2h):
   - ☐ Monitoring está en vivo
   - ☐ Alertas están configuradas
   - ☐ Escalation rules funcionan
   - ☐ Rollback plan está documentado
2. Deployment (2h):
   - Activar agente en producción
   - Humano-in-the-loop para 24-48h iniciales
   - Monitoreo intensivo (logs, alertas)
3. Semana 1 de producción (daily):
   - Revisión de ejecuciones (10-20% de casos)
   - Ajustes rápidos si es necesario
   - Comunicación con cliente (cómo va el agente)

**Entrega**: Agente en vivo en producción.

---

### Fase 6: SOPORTE + OPTIMIZACIÓN (Days 31-60)

**Entrada**: Agente en producción.

**SLA de Soporte (30 días)**:
- **Outage (agente no funciona)**: Respuesta <1h, fix <4h
- **Degradación (agente lento)**: Respuesta <4h, fix <24h
- **Errores nuevos**: Respuesta <24h, fix <3 días
- **Optimización** (agilizar, mejorar accuracy): Incluido

**Actividades típicas**:
- Cliente reporta: "Agente dejó de funcionar con un tipo de email"
- Nuestro action: Investigar logs, identificar patrón, ajustar, retest
- Comunicar: "Ajustamos la lógica. Debería funcionar ahora."

**Optimization post-deployment (optional, pago)**:
- Auto-scaling: Si volumen crece, agregar más instancias del agente
- Mejora de accuracy: Entrenar modelo con feedback real
- Expansión: Agregar nuevos workflows/decisiones

---

## 10. FALLBACKS OPERATIVOS (Plan B)

| Problema | Fallback | Costo |
|----------|----------|-------|
| Agente falla en producción | Rollback a proceso manual. Investigar. Redeployar en 24h. | Downtime operacional |
| API de tercero falla | Usar API backup (si existe) o fallback manual. | Downtime del agente |
| Decisiones del agente son incorrectas | Pasar a human-in-the-loop (agente propone, humano aprueba). | Reduce automatización % |
| Performance del agente degrada | Agregar compute/memory. Optimizar queries. | Costo infra adicional |
| Cliente quiere cambiar workflow mid-piloto | Documentar cambio. Nueva Fase 2. Costo adicional. | Retraso de 2-4 semanas |
| Monitoreo falla | Setup monitoring backup (email alerts). Manual checks daily. | Mayor overhead operacional |
| Multi-agent conflict | Reducir a 1 agente. Evitar parallelismo. Simplificar. | Scope reduction |

---

## 11. MÉTRICAS DE ÉXITO

**Métrica 1: Tasa de Automatización**
- KPI: ≥80% de tasks completadas sin intervención humana
- Medición: (tasks completed by agent) / (total tasks) en 30 días
- Owner: Arquitecto IA

**Métrica 2: Precisión del Agente**
- KPI: ≤5% error rate (human review post-facto)
- Medición: (errors detected) / (total executions)
- Owner: QA + Customer

**Métrica 3: Velocidad vs. Manual**
- KPI: Agente completa tarea en ≤50% del tiempo manual
- Medición: avg(agente time) vs. avg(manual time)
- Owner: Arquitecto IA

**Métrica 4: Customer Satisfaction**
- KPI: NPS ≥8/10
- Medición: Post-deployment survey
- Owner: Customer Success

**Métrica 5: Uptime del Agente**
- KPI: 99%+ uptime (excluye mantenimiento)
- Medición: (available hours) / (total hours)
- Owner: DevOps/SRE

---

## 12. INTEGRACIONES UPSTREAM/DOWNSTREAM

**Upstream**:
- `entregar-tecnologia-proceso.md` (framework general de delivery)

**Cross-vertical**:
- `Empoderamiento M09` (productividad: cómo equipos usan agentes)
- `Empoderamiento M11` (automatizaciones no-code: Zapier/Make)
- `Consultoría` (diagnósticos identifican workflows automatizables)

**Downstream**:
- Caso de éxito → Comercial para referral
- Post-30 días: SLA adicional (monitoring/optimization contínua)
- Expansión: Nuevos agentes / multi-agent orchestration

---

## 13. ROLES Y RESPONSABILIDADES

| Rol | Responsabilidad | Horas Estimadas |
|-----|-----------------|-----------------|
| Arquitecto Agentes IA | Discovery, Diseño, Supervisión construcción, Piloto | 50-80h |
| Especialista n8n/Zapier | Construcción del workflow, testing | 30-60h |
| Especialista en IA | Prompts, LLM integrations (si aplicable) | 10-20h |
| QA / Testing | Testing piloto, comparación agente vs. manual | 8-12h |
| DevOps | Monitoring setup, alertas, infraestructura | 4-8h |
| Customer Success | Onboarding, training, soporte post-30 días | 2-4h |

---

## 14. DOCUMENTACIÓN REQUERIDA (Entregables)

1. **Flujo de Diseño** (Diagrama Miro/Figma)
   - Triggers → Decisiones → Acciones → Outputs
   - Escalation rules explícitas

2. **Especificación Técnica**
   - Integraciones (API endpoints, auth)
   - Decisiones (lógica condicional)
   - Acciones (qué hace el agente en cada caso)

3. **Dashboard de Monitoreo**
   - Ejecuciones por hora/día
   - Tasa de error
   - Logs de acciones
   - Alertas activas

4. **Guía de Troubleshooting**
   - "Si el agente no funciona, checa..."
   - Pasos para pausar/reiniciar
   - Cómo escalar a soporte

5. **Training Presencial** (1h)
   - Demo del agente en vivo
   - Cómo revisar logs
   - Cómo pausar si es necesario
   - Canales de comunicación para bugs

---

## Versión: 1.0 | Próxima revisión: 2026-Q3 | Propietario: Vertical TecnologIA
