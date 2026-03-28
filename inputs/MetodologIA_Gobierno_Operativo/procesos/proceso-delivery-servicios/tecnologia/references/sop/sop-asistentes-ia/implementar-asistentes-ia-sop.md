# SOP: Implementar Asistentes IA — Amplificador Cognitivo

**Metadata**
- Vertical: TecnologIA
- Tipo: Amplificador
- Palanca MetodologIA: 5 (IA y Automatización Inteligente)
- Owner: Implementador IA Senior
- Versión: 1.0
- Fecha: 2026-03-24
- Estado: Activo

---

## 1. PROPÓSITO Y SCOPE

### Propósito Estratégico
Diseñar, construir y desplegar asistentes de IA personalizados que amplifican la capacidad cognitiva del cliente: análisis, síntesis, escritura, decisión, atención al cliente.

El asistente es un **Amplificador Cognitivo** — no reemplaza expertise, sino que multiplica su velocidad y escala.

### Scope de Servicio
- Cobertura: Startups, PyMEs, empresas medianas (up to 500 empleados)
- Plataformas soportadas: ChatGPT Custom GPTs, Claude Projects, Gemini Gems, chatbots custom (Voiceflow, Botpress), asistentes vía API
- Casos de uso: Análisis de datos, síntesis de información, generación de contenido, atención al cliente, soporte operativo
- Límite: No incluye entrenamiento de modelos custom (ver SOP de agentes para esto)

---

## 2. SUPUESTOS EXPLÍCITOS (Asunciones Base)

1. **Cliente tiene claridad parcial sobre la tarea**: El cliente sabe QUÉ quiere automatizar pero no CÓMO. Nosotros ayudamos a clarificar.
2. **Conocimiento está documentado o en mentes**: Los datos/procedimientos del cliente existen (documentos, emails, o en la mente de expertos). No creamos información desde cero.
3. **Plataforma elegida es accesible**: El cliente tiene acceso a las APIs y herramientas (cuenta activa, permisos, presupuesto).
4. **Cambios de alcance son pagos**: El cliente acepta que variaciones post-discovery son adicionales.
5. **IA actual es "buena para tareas cerradas"**: El asistente funciona mejor en tareas bien definidas (no en contextos altamente ambiguos).
6. **Cliente participa en testing**: Sin retroalimentación real del usuario, no podemos validar que el asistente funciona.
7. **30 días de soporte incluyen refinamiento agresivo**: Los primeros 30 días son críticos; después, es mantenimiento.

---

## 3. LÍMITES (Qué NO Hacemos)

| Límite | Razón | Alternativa |
|--------|-------|-------------|
| Entrenar modelo custom | Fuera de alcance (costo prohibitivo para este servicio) | Usar modelos base + prompt engineering |
| Garantizar 100% accuracy | IA genera alucinaciones; 90% es excelente | Audit humano en paralelo para decisiones críticas |
| Soportar >5 idiomas | Cada idioma duplica testing. Máx 3 idiomas. | Cliente elige idiomas prioritarios |
| Integración con >10 sistemas | Costo de integración crece exponencialmente | Priorizar 3 sistemas core |
| Garantizar privacidad data EU | Si cliente maneja GDPR strict, usar on-prem | Documentar dónde reside data |
| Automático sin intervención | Siempre hay un humano que revisa | Por eso tenemos "training" en soporte |
| Cambios después de 30 días sin costo | 30 días es el período incluido | Después, por horas o SLA adicional |

---

## 4. CRITERIOS DE ACEPTACIÓN BINARIOS

Cada criterio es **sí/no**, no escala. Cliente debe validar cada uno antes de dar por completado:

1. **Corrección**: ☐ Asistente responde correctamente al 90%+ de 10 queries de test predefinidas con cliente
2. **Tono**: ☐ Tone of voice alineado a marca del cliente (validado con 3+ ejemplos reales)
3. **Completitud Knowledge**: ☐ Cero "No sé" en preguntas sobre documentos cargados en knowledge base
4. **Usabilidad**: ☐ Cliente puede usar sin soporte durante 30 minutos de testing libre
5. **Documentación**: ☐ Guía de usuario + guía de mantenimiento entregadas y validadas
6. **Performance**: ☐ Tiempo de respuesta <5 segundos en 95% de las queries
7. **Escalabilidad**: ☐ Asistente maneja 100 queries/día sin degradación (si aplicable)
8. **Satisfacción**: ☐ Net Promoter Score o survey ≥8/10 post-entrega

**Gate Crítico**: Todos los 8 criterios deben ser ☑ antes de cierre. Si alguno es ☐, extender soporte.

---

## 5. CASOS BORDE (5-7 Escenarios de Estrés)

### Caso 1: Knowledge Base Caótica
**Escenario**: Cliente tiene 500 documentos sin estructura (PDFs, emails, Word docs, drives sin carpetas claras).
**Trigger**: Cliente no tiene su información organizada.
**Decisión Diseño**: Fase Discovery incluye 4-8h de curación de documentos. Si excede, es adicional.
**Fallback**: Generar "Índice Maestro" (1 documento que mapea todos los docs) → asistente aprende índice primero.

### Caso 2: Alucinación del Asistente
**Escenario**: Asistente inventa información que no está en los docs ("La empresa fundó X en 1985" cuando no hay evidencia).
**Trigger**: Testing con queries sobre datos no presentes en knowledge base.
**Decisión Diseño**: Configurar asistente para NO generar si no está en docs (mode="search_only", no synthesis).
**Fallback**: Entrenar cliente en prompt: "Pregunta por X, no por Y" (donde Y es prone to hallucinations).

### Caso 3: Multiidioma (ES/EN/PT)
**Escenario**: Cliente opera en 3 países, quiere asistente trilingüe.
**Trigger**: Cliente menciona equipos en múltiples países.
**Decisión Diseño**: 1 asistente con instrucciones en 3 idiomas (testing duplicado por idioma).
**Fallback**: Crear 3 asistentes separados (más simple, menos costos).

### Caso 4: Plataforma No Soporta Feature
**Escenario**: Cliente quiere asistente en GPT Custom pero necesita function_calls (que GPT soporta pero cliente no sabe).
**Trigger**: Feature requerido incompatible con plataforma elegida.
**Decisión Diseño**: Matriz de compatibilidad (Discovery, día 2). Si falta, proponer plataforma alternativa.
**Fallback**: Redesign del asistente sin esa feature.

### Caso 5: Uso Dual (Internal + Customer-Facing)
**Escenario**: Asistente para equipo interno de ventas + asistente públicamente visible para clientes (compliance diferente).
**Trigger**: Cliente quiere monetizar o exponer asistente.
**Decisión Diseño**: Crear 2 versiones con knowledge base compartida pero prompts/escalations diferentes.
**Fallback**: Iniciar con versión interna; después lanzar versión pública (fase 2).

### Caso 6: Datos Sensibles (Compliance, GDPR, etc.)
**Escenario**: Cliente es fintech, asistente procesa datos de clientes. GDPR + normativa local aplica.
**Trigger**: Cliente opera en EU o maneja información PII/sensible.
**Decisión Diseño**: Aislamiento de data (on-prem si es posible) + auditoría de compliance. Costo adicional.
**Fallback**: Documentar limitaciones; derivar a consultor de compliance.

### Caso 7: Cliente Cambia Plataforma Mid-Project
**Escenario**: Día 10 de 21: Cliente decide pasar de GPT Custom a Claude Projects.
**Trigger**: Cliente quiere cambio post-discovery.
**Decisión Diseño**: Modificación es adicional (nuevas 2-3h de redev). Aceptar si cliente paga delta.
**Fallback**: Completar en plataforma original; migración post-entrega es responsabilidad del cliente.

---

## 6. DECISIONES DE DISEÑO CON JUSTIFICACIÓN

| ID | Decisión | Justificación | Riesgo Mitigado |
|----|----------|---------------|-----------------|
| DD-01 | **Plataforma agnóstica**: No forzamos plataforma. Cliente elige. | Cada cliente tiene stack diferente. Forzar crea fricción y vendor lock-in. | Cliente elige herramienta que YA usa. |
| DD-02 | **Testing con queries reales**: Usamos preguntas del cliente, no genéricas. | Queries genéricas ("¿Cuál es tu nombre?") no revelan si el asistente funciona en contexto real. | Validamos que asistente resuelve problema real. |
| DD-03 | **Knowledge base curada > exhaustiva**: Cargar 50 docs bien curados vs. 500 desordenados. | Asistente con knowledge confusa es peor que asistente sin knowledge. | Asistente es preciso, no ruidoso. |
| DD-04 | **Training presencial 1h obligatorio**: Antes de entregar, sesión en vivo con cliente. | Cliente que no entiende cómo usar el asistente no lo usa. | Adopción + confianza en la herramienta. |
| DD-05 | **30 días soporte incluido**: No abandonamos post-entrega. | Los asistentes mejoran con uso real. Prompts refinan, Knowledge Base expande. | Proyecto termina con cliente satisfecho. |

---

## 7. ANTI-PATTERNS (5+ Trampas a Evitar)

### Anti-Pattern 1: "El Asistente Genérico"
**Qué es**: Entregar un prompt básico sin personalización real de marca, tono, o conocimiento del cliente.
**Síntoma**: Cliente dice "Parece ChatGPT normal, no nuestro asistente."
**Cómo evitar**: Invertir 2 días en personalidad (system prompt único, ejemplos de conversación, tone guidelines).

### Anti-Pattern 2: "Knowledge Dump"
**Qué es**: Cargar TODOS los documentos del cliente sin curación. Asistente confuso.
**Síntoma**: Asistente mezcla info contradictoria, genera respuestas que contradicen docs.
**Cómo evitar**: Curación iterativa. Empezar con top 20 docs; expandir según testing.

### Anti-Pattern 3: "Demo-Driven Development"
**Qué es**: Mostrar demos impresionantes ("Asistente que escribe emails en 10 segundos") pero no funciona en producción con datos reales.
**Síntoma**: Testing con cliente revela que "funciona" solo con preguntas del demo.
**Cómo evitar**: Testing con datos reales desde día 3. No demos = no cuenta como validación.

### Anti-Pattern 4: "Sin Testing Usuario Real"
**Qué es**: Validar internamente ("Nosotros lo probamos y funciona") pero cliente nunca lo prueba antes de entrega.
**Síntoma**: Cliente descubre problemas post-entrega cuando no hay tiempo de fijar.
**Cómo evitar**: 2-3 días dedicados a "cliente toquetea el asistente" con nosotros presentes.

### Anti-Pattern 5: "Abandonar Post-Entrega"
**Qué es**: Entregar y desaparecer. Cliente se queda con asistente que "funciona a medias" sin soporte.
**Síntoma**: Asistente nunca se refina. Cliente lo abandona en 2 meses.
**Cómo evitar**: 30 días de soporte agresivo (bugs, ajustes de prompt, Knowledge Base updates).

---

## 8. TRES NIVELES DE COMPLEJIDAD

### Nivel 1: BÁSICO (1 Semana, ~COP $800K)

**Qué entregamos**: GPT Custom o Claude Project funcional con personalidad y conocimiento curado del cliente.

**Proceso**:
- Day 1-2: Discovery (entrevista, documentos, brief de asistente)
- Day 3-4: Diseño personalidad (system prompt, tono, ejemplos)
- Day 5: Implementación en plataforma elegida
- Day 6: Testing con cliente
- Day 7: Entrega + training 1h
- Days 8-35: 30 días soporte

**Gate de Aceptación**: 6 de 8 criterios mínimo (Corrección, Tono, Usabilidad, Documentación, Performance, Satisfacción).

**Casos típicos**: Asistente para análisis de documentos, redacción de emails, respuestas a FAQs internas.

---

### Nivel 2: AVANZADO (3 Semanas, ~COP $2.5M)

**Qué entregamos**: Asistente con RAG (Retrieval-Augmented Generation) + Knowledge Base + búsqueda en documentos propios del cliente.

**Proceso**:
- Week 1: Discovery + análisis de documentos + curación
- Week 2: Diseño RAG + Knowledge Base indexing + integración
- Week 3: Testing iterativo con cliente + refinamiento + entrega
- Days 22-50: 30 días soporte

**Gate de Aceptación**: 7 de 8 criterios (Corrección, Completitud Knowledge, Usabilidad, Documentación, Performance, Escalabilidad, Satisfacción).

**Casos típicos**: Asistente de soporte al cliente (conoce los docs de la empresa), analizador de reportes, asesor interno basado en knowledge base.

---

### Nivel 3: ENTERPRISE (6 Semanas, ~COP $5M)

**Qué entregamos**: Asistente integrado a sistemas del cliente (CRM, WhatsApp, Slack, web) con webhook + API + multi-canal.

**Proceso**:
- Week 1-2: Discovery + arquitectura de integraciones
- Week 3-4: Desarrollo RAG + Knowledge Base + API setup
- Week 5: Integraciones (CRM/Slack/WhatsApp/Web)
- Week 6: Testing end-to-end + entrega
- Days 43-73: 30 días soporte

**Gate de Aceptación**: Todos 8 criterios.

**Casos típicos**: Asistente WhatsApp para atención al cliente, integración a Hubspot, chatbot incrustado en web + Slack.

---

## 9. PROCESO PASO A PASO (6 Fases)

### Fase 1: DISCOVERY (Days 1-2)

**Entrada**: Proyecto ganado (contrato firmado).

**Actividades**:
1. Entrevista estructurada (Kickoff, 1h):
   - ¿Qué tarea cognitiva quieres amplificar? (análisis, síntesis, atención al cliente, otra)
   - ¿Qué documentos/datos tienes? (PDFs, Notion, Drive, Confluence, emails)
   - ¿Qué plataforma prefieres? (GPT, Claude, Gemini, custom chatbot)
   - ¿Quién es el usuario final? (equipo interno, cliente externo, mixto)
   - ¿Datos sensibles? (compliance, GDPR, PII)
2. Auditoría de documentos (2-4h):
   - Revisar knowledge base del cliente
   - Identificar gaps, inconsistencias
   - Proponer estructura (index, categorías, prioridades)
3. Crear Brief de Asistente (2h):
   - Nombre y propósito (1 párrafo)
   - Persona/tono
   - Casos de uso top 5
   - Límites ("El asistente NO hace...")
   - Plataforma recomendada (si cliente no tiene preference)

**Entrega**: Brief de Asistente + Documento de Knowledge Base Map.

---

### Fase 2: DISEÑO DE PERSONALIDAD (Days 3-4)

**Entrada**: Brief aprobado.

**Actividades**:
1. System Prompt (4h):
   - Rol/personalidad del asistente
   - Límites y instrucciones de comportamiento
   - Ejemplos de 3-5 conversaciones ideales
   - Instrucciones para "No Sé" (cuándo decir "No tengo esa info")
2. Knowledge Base Map (2h):
   - Documentos clave por categoría
   - Prioridades (críticos vs. nice-to-have)
   - Plan de carga (qué docs cargamos en MVP)
3. Ejemplos de conversación (2h):
   - 5 escenarios reales cliente
   - Respuestas ideales esperadas
   - Edge cases ("¿Qué pasa si preguntan X?")
4. Gate Review (1h):
   - Cliente aprueba/rechaza la "personalidad" del asistente
   - Iteramos si necesario (1-2 rondas típico)

**Entrega**: System Prompt finalizado + Knowledge Base Map + Ejemplos de Conversación + Persona Document.

**Go/No-Go Gate**: Cliente debe aprobar personalidad antes de pasar a Construcción.

---

### Fase 3: CONSTRUCCIÓN (Days 5-10/15/30 según nivel)

**Entrada**: Diseño aprobado.

**Actividades**:
1. Setup de plataforma (1-2h):
   - Crear account/project en plataforma elegida
   - Configurar autenticación
   - Setup de API keys (si aplicable)
2. Cargar Knowledge Base (4-8h según tamaño):
   - Procesar documentos (PDF -> texto, extracción)
   - Indexar y cargar en plataforma
   - Testear retrieval (¿el asistente encuentra la info?)
3. Implementar System Prompt (2-4h):
   - Copiar prompt en asistente
   - Ajustar plataforma-specific (GPT instruction syntax vs. Claude system prompt)
   - Testing básico ("¿El asistente responde en tono correcto?")
4. Integraciones (si Nivel 2+):
   - Conectar a CRM, Slack, WhatsApp, etc.
   - Configurar webhooks
   - Testing de flujo end-to-end
5. QA Interno (2-3h):
   - 10 queries de test (propias) para validar funcionalidad
   - Bug fixing
   - Performance testing (respuesta time, hallucinations)

**Entrega**: Asistente funcional en plataforma + access para cliente.

---

### Fase 4: TESTING CON CLIENTE (Days 6-8 / 15-17)

**Entrada**: Asistente funcional.

**Actividades**:
1. Sesión de onboarding (1h):
   - Mostrar asistente en vivo
   - Explicar cómo usarlo
   - Dar acceso (login/link)
2. Período de testing libre (2-4h):
   - Cliente prueba con sus casos reales
   - Anotamos problemas, gaps, surprises
   - Nosotros disponibles para preguntas en Slack/email
3. Sesión de feedback (1-2h):
   - Revisar notas de cliente
   - Categorizas bugs vs. feature requests vs. design tweaks
   - Priorizar fixes (críticos this week, nice-to-have later)
4. Refinamiento iterativo (2-3h):
   - Ajustes a system prompt basados en feedback
   - Cargar documentos faltantes
   - Retest de escenarios problemáticos

**Entrega**: Asistente refinado basado en feedback real.

---

### Fase 5: ENTREGA + TRAINING (Day 9 / Day 18)

**Entrada**: Asistente testado y aprobado.

**Actividades**:
1. Documentación (2-3h antes de sesión):
   - Guía de usuario (cómo usar, casos de uso, ejemplos)
   - Guía de mantenimiento (cómo actualizar Knowledge Base, cómo dar feedback)
   - Troubleshooting guide (qué hacer si falla, cómo escalar)
2. Sesión de training presencial (1h, sincrónico):
   - Demo vivo del asistente
   - Handoff de acceso (credenciales, links, documentación)
   - Q&A
   - Establecer canales de soporte (email, Slack)
3. Checklist de entrega:
   - ☐ Acceso funcional confirmado
   - ☐ Cliente puede usar sin soporte (probado en vivo)
   - ☐ Documentación entregada y leída
   - ☐ Expectativas de soporte (30 días) confirmadas

**Entrega**: Asistente live + Documentación completa + Expectativas claras.

---

### Fase 6: SOPORTE (Days 10-35 / 18-49)

**Entrada**: Asistente entregado.

**SLA de Soporte (30 días)**:
- **Bugs críticos** (asistente no funciona): Respuesta <4h, fix <24h
- **Bugs menores**: Respuesta <24h, fix <3 días
- **Feature requests**: Documentamos pero NO incluimos (post-soporte)
- **Optimización de prompt**: Incluido (refinamiento basado en uso real)

**Actividades típicas**:
- Cliente reporta: "Asistente no entiende questions sobre X"
- Nuestro action: Investigar, ajustar prompt, cargar más docs sobre X, retest
- Comunicar: "Ajustamos el prompt. Prueba de nuevo."

**Cierre de soporte**:
- Day 30: Revisión final
  - ¿Todos 8 criterios de aceptación se mantienen? ☑
  - ¿Cliente satisfecho? (NPS ≥8) ☑
  - ¿Documentación actualizada? ☑
- Entregar acceso a "modo self-service" (cliente puede actualizar Knowledge Base sin nosotros)
- Proponer SLA post-30 días (opcional, pago adicional)

---

## 10. FALLBACKS OPERATIVOS (Plan B)

| Problema | Fallback | Costo |
|----------|----------|-------|
| Asistente "muere" mid-project (cliente decide abortar) | Documentar todo lo hecho. Entregar documentación como learning. Reembolso proporcional. | Pérdida de ingresos |
| Knowledge Base es muy grande (100k+ documentos) | Usar subset prioritario (top 20% de docs). Expandir post-entrega. | Más soporte post-30 días |
| Cliente quiere cambiar plataforma mid-project | Aceptar como adicional (nuevas 2-3h de redev). Si no paga, completar en plataforma original. | +COP $300K aproximado |
| Asistente consistentemente alucina | Pasar a "search-only mode" (sin synthesis). Menos potente, pero preciso. | Scope reduction |
| Cliente no participa en testing | Extender soporte a 45 días. Testing es responsabilidad del cliente. | +COP $200K |
| Plataforma tiene outage | Usar plataforma backup (ej: GPT → Claude). Sin costo adicional. | Riesgo mitigation |
| Cliente quiere multi-idioma (post-discovery) | Adicional por idioma (+1 semana, +COP $500K por idioma). | Payment upfront |

---

## 11. MÉTRICAS DE ÉXITO

**Métrica 1: Accuracy del Asistente**
- KPI: 90%+ de queries respondidas correctamente
- Medición: Manual review de 20 queries reales post-entrega
- Owner: Implementador IA

**Métrica 2: Adopción del Cliente**
- KPI: Cliente usa asistente 5+ veces/semana en mes 1
- Medición: Dashboard de uso (queries/semana)
- Owner: Customer Success

**Métrica 3: Net Promoter Score (NPS)**
- KPI: NPS ≥8/10 (1-10 scale)
- Medición: Post-entrega survey
- Owner: Customer Success

**Métrica 4: Time-to-Value**
- KPI: Cliente "siente valor" dentro de 2 semanas
- Medición: Cualitativa (feedback en sesión de testing)
- Owner: Implementador IA

---

## 12. INTEGRACIONES UPSTREAM/DOWNSTREAM

**Upstream**:
- `entregar-tecnologia-proceso.md` (fase Discovery depende de este marco general)

**Cross-vertical**:
- `Empoderamiento M10` (participantes aprenden a refinar sus propios asistentes)
- `Comercial B2B` (empresas que compran asistentes para sus equipos)

**Downstream**:
- Caso de éxito → Comercial para referral + upsell (Nivel 2/3)
- Post-30 días: SLA adicional (soporte ongoing)

---

## 13. ROLES Y RESPONSABILIDADES

| Rol | Responsabilidad | Horas Estimadas |
|-----|-----------------|-----------------|
| Implementador IA Senior | Discovery, Diseño, Construcción, Testing, Entrega | 40-60h |
| Especialista en Knowledge | Auditoría de docs, curación, indexing | 8-16h |
| QA / Testing | Testing interno, reporte de bugs | 4-8h |
| Customer Success | Onboarding, training, soporte post-30 días | 2-4h |

---

## Versión: 1.0 | Próxima revisión: 2026-Q3 | Propietario: Vertical TecnologIA
