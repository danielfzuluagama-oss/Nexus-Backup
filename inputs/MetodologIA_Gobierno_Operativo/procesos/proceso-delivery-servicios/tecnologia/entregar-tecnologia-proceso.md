# PROCESO: Entregar TecnologIA — Aceleradores y Amplificadores

**Versión:** 1.0
**Último actualizado:** 2026-03-24
**Propietario:** Líder de Servicios Digitales
**Vertiente:** Servicios de Tecnología
**Estado:** Operativo

---

## PROPÓSITO

Entregar implementaciones tecnológicas que actúan como **aceleradores** (velocidad) y **amplificadores** (impacto) del resultado profesional y empresarial de nuestros clientes. Cada solución tecnológica activa una o más de las 3 Palancas finales del marco MetodologIA:
- **Palanca 5:** Inteligencia Artificial (IA)
- **Palanca 6:** Tecnología (Software & Web)
- **Palanca 7:** Metodología (Implementación)

---

## METADATOS DEL PROCESO

| Dimensión | Descripción |
|-----------|------------|
| **Vertical** | TecnologIA — Aceleradores y Amplificadores |
| **Líneas de Servicio** | 4: Asistentes IA, Agentes IA, Mini Apps, Sitios Web |
| **Modos de Entrega** | Llave en Mano, Co-Creación, DIY Guiado |
| **Punto de Entrada** | Handoff desde Comercial (H-01: Lead Calificado, H-03: Programa) |
| **Punto de Salida** | Servicio Cerrado (G-CIERRE: Satisfacción ≥8/10) |
| **Owner** | Líder de Servicios Digitales |
| **Stakeholders** | Cliente, Equipo de Implementación, Comercial (Referrals) |
| **Duración Típica** | 3-8 semanas (depende de línea y complejidad) |
| **Próximos Procesos** | Comercial (Referrals, Upsells), Programa de Empoderamiento (M9-M12) |

---

## SUPUESTOS EXPLÍCITOS

1. **Cliente:** Tiene competencia digital básica (email, navegación web). Si requiere capacitación profunda, entra en Programa de Empoderamiento.
2. **MetodologIA:** Tiene capacidad técnica probada en las 4 líneas de servicio (equipo, herramientas, metodología).
3. **Modelo de Precios:** Value-based (no hourly). Cada servicio tiene inversión referencial vinculada a complejidad, no a horas.
4. **Entregable Definido:** Cada línea de servicio genera un entregable binario (funciona/no funciona) con criterios de aceptación claros.
5. **Conexión a Empoderamiento:** Los Módulos 9-12 del Programa enseñan las habilidades. TecnologIA las IMPLEMENTA como servicio profesional.

---

## LÍMITES DEL PROCESO

**Comienza cuando:**
- Comercial ha hecho handoff formalmente (H-01 o H-03 completado)
- Cliente ha firmado SOW con acuerdo en línea de servicio, modo y inversión
- Equipo Tecnología está disponible para Discovery

**Termina cuando:**
- G-CIERRE ejecutada: Satisfacción del cliente ≥8/10 (encuesta post-entrega)
- Documentación entregada, training completado, accesos compartidos
- 30 días de soporte post-launch finalizados

**Fuera de alcance:**
- Capacitación profunda (→ Programa de Empoderamiento)
- Mantenimiento post-soporte (→ SaaS / Contrato de Soporte)
- Cambios de alcance no aprobados (→ Change Order)

---

## FASES DEL PROCESO

### FASE 1: DISCOVERY (Semana 1)

**Objetivo:** Entender profundamente qué necesidad resuelve la tecnología, qué palancas activa, y establecer alcance, timeline e inversión.

#### Actividades Clave

**D1.1 — Kickoff & Context Mapping (Día 1, ~2h)**
- Reunión Síncrona: Cliente + Implementador + Facilitador
- Mapeo rápido: Contexto del cliente, desafío actual, visión deseada
- Entender: ¿Quién usa esto? ¿Qué problema resuelve? ¿Qué métricas importan?
- Deliverable: Notas de kickoff, Canvas de Necesidad 1-pág

**D1.2 — Alineación de Modo de Entrega (Día 1, ~1h)**
- Decidir: ¿Llave en Mano? ¿Co-Creación? ¿DIY Guiado?
  - **Llave en Mano:** MetodologIA construye, cliente revisa/aprueba
  - **Co-Creación:** Cliente participa activamente en diseño/construcción (dentro de Consultoria)
  - **DIY Guiado:** Cliente construye durante Empoderamiento M9-M12, Metodología guía
- Registrar en SOW

**D1.3 — Scope & Constraint Definition (Días 1-2, ~3h async)**
- Definir límites explícitos: ¿Qué SÍ entra? ¿Qué NO?
- Mapear dependencias externas (integraciones, datos, terceros)
- Identificar riesgos iniciales
- Deliverable: Scope Statement (máx 1 pág)

**D1.4 — Brief de Servicio (Día 2, ~2h)**
- Síntesis: Qué construiremos, para quién, por qué, en cuánto tiempo, cuánto cuesta
- Estructura:
  ```
  Línea de Servicio: [Asistente IA / Agente IA / Mini App / Sitio Web]
  Modo: [Llave en Mano / Co-Creación / DIY Guiado]
  Complejidad: [Básica / Media / Avanzada / Enterprise]
  Alcance: [Lista de features/funcionalidades]
  Timeline: [Fecha inicio - Fecha entrega estimada]
  Inversión: [Rango COP, desglose opcional]
  Success Metrics: [3-5 KPIs que definen éxito]
  ```
- Gate: Cliente aprueba Brief o requests cambios (máx 3 iteraciones)

#### Criterios de Aceptación — DISCOVERY

✅ Brief aprobado por cliente
✅ Modo de entrega decidido y documentado
✅ Alcance no ambiguo (cliente puede recitar qué se entrega)
✅ Riesgos iniciales identificados + plan de mitigación
✅ Equipo de implementación asignado y disponible

#### Casos Borde — DISCOVERY

- **C1:** Cliente quiere "todo": Ayudarlo a priorizar. Proponer Fase 2 con features adicionales.
- **C2:** Cambio de alcance a mitad: Detener, hacer Change Order formal, rebasar timeline.
- **C3:** Cliente desaparece: Pausa automática a 14 días. Si no hay feedback, close.
- **C4:** Dependencia externa no disponible: Roadmap alternativa o posponer.
- **C5:** Descubrimiento: Cliente puede hacer esto DIY más barato: Pivotear a Empoderamiento M9-M12.

---

### FASE 2: DISEÑO (Semana 2)

**Objetivo:** Crear la arquitectura técnica y visual de la solución. Gate de diseño antes de construcción.

#### Actividades Clave

**D2.1 — Arquitectura Técnica (Día 1, ~4h)**
- Definir stack tecnológico (plataformas, integraciones, infraestructura)
- Mapear flujos de datos, seguridad, escalabilidad
- Para IA: Prompt engineering inicial, modelo seleccionado, context window
- Para Apps: Stack (frontend/backend), DB, hosting
- Para Web: Plataforma (Framer/Webflow/WordPress), DNS, SSL
- Deliverable: Diagrama arquitectónico ASCII o simple, 1-2 págs

**D2.2 — Diseño UX/UI o Prompts (Días 1-2, ~6h)**
- **Asistentes IA:** Wireframe de conversación, tone of voice, ejemplo de prompts
- **Agentes IA:** Flowchart de lógica del agente, decisión trees
- **Mini Apps:** Wireframes de pantallas principales, user flows
- **Sitios Web:** Sitemap, wireframes de páginas clave, inspiración visual
- Enfoque: Simplicidad, claridad, velocidad
- Entregable: Figma file o documento con wireframes + notas de diseño

**D2.3 — Plan de Construcción (Día 2, ~2h)**
- Sprint calendar: ¿Cuántos sprints de 5 días? ¿Demo cuándo?
- Hitos clave: Integración, testing, pre-launch
- Riesgos técnicos: Plan B para cada uno
- Deliverable: Timeline detallado + riesgos

**D2.4 — Gate de Diseño (Fin de Semana 2, ~1h)**
- Reunión síncrona: Presentar diseño, recibir feedback
- Cliente aprueba O requests cambios
- Si cambios: max 2 iteraciones, luego entrar a construcción
- Gate: Design Approval signed-off

#### Criterios de Aceptación — DISEÑO

✅ Arquitectura técnica documentada y viable
✅ Diseño aprobado por cliente (cliente firma/confirma)
✅ No hay ambigüedad en "qué se construye"
✅ Plan de construcción realista (baselined con histórico interno)
✅ Riesgos técnicos identificados con mitigaciones

#### Anti-patterns — DISEÑO

🚫 Diseño "perfecto" que toma >2 semanas (muerte por perfección)
🚫 Cliente quiere redesign cada 3 días (fijar en SOW: máx 2 iteraciones)
🚫 Prompts de IA generados sin testear (probar con datos reales)
🚫 Stack tecnológico no disponible/no testeado (usar default probados)
🚫 No documentar por "es obvio" (escribirlo, siempre)

---

### FASE 3: CONSTRUCCIÓN (Semanas 3-N, típicamente 2-6 semanas)

**Objetivo:** Desarrollar iterativamente, demostrar progreso semanal, recibir feedback continuo.

#### Actividades Clave

**C3.1 — Sprint Kickoff (Día 1, ~1h)**
- Confirmar objetivo del sprint (qué se entrega en 5 días)
- Asignar tasks, identificar blockers
- Definir "Definition of Done" para semana

**C3.2 — Desarrollo Iterativo (Días 1-4, ~30h/sprint)**
- Build según arquitectura & diseño
- IA: Prompt engineering iterativo, RAG setup si aplica, testing con datos
- Apps: Frontend + Backend, integración, testing manual
- Web: Diseño → HTML/CSS → Responsive → CMS setup → Content
- Principio: Completar en pequeños incrementos, siempre "shippable"
- Daily standup (15min async): Qué hizo, qué hace hoy, blockers

**C3.3 — Demo Semanal (Día 5, ~1h)**
- Presentar working version a cliente (vivo, funcional)
- Registro: Qué funciona, qué falta, feedback
- Gate: Cliente valida "esto avanza en la dirección correcta"
- Si feedback: Stack en backlog, reprioritizar si necesario

**C3.4 — Iteración (Post-demo, ~2h)**
- Incorporar feedback en siguiente sprint
- Crear tickets para cambios aprobados
- Comunicar: Si feedback requiere tiempo extra, new timeline

#### Criterios de Aceptación — CONSTRUCCIÓN

✅ Demo semanal ejecutada (cliente atestigua)
✅ Código/prompts documentados (50% comentarios mínimo)
✅ No hay regression (features previos aún funcionan)
✅ Feedback de cliente incorporado o explicado por qué no
✅ Build está en estado "deployable" (sin compilacion errors, sin debug code)

#### Anti-patterns — CONSTRUCCIÓN

🚫 "Casi listo, demostraremos la semana que viene" (demo cada 5 días, no negociable)
🚫 Cliente descubre requisito nuevo en Semana 5 (discovery y scope fueron suficientes)
🚫 Código spaghetti sin documentación (escribir como si otro lo leerá mañana)
🚫 Testing solo al final (testing continuo en cada sprint)
🚫 Cambios "quick" sin aprobación (todo entra por change request)

---

### FASE 4: ENTREGA (Semana N+1)

**Objetivo:** Deploy a producción, capacitación de cliente, documentación completa, handoff formal.

#### Actividades Clave

**E4.1 — Pre-Launch Checklist (Día 1, ~4h)**
- Verificar: Performance, seguridad, accesibilidad, UX
- Testing en navegadores/dispositivos reales
- Backup & disaster recovery setup (si aplica)
- Monitoreo/analytics configurado
- Deliverable: Checklist signed-off

**E4.2 — Launch a Producción (Día 2, ~3h)**
- Deploy (o publish si es web)
- Verificar en vivo: URLs, funciones, integraciones
- Rollback plan ready si algo falla
- Registro: Fecha/hora launch, versión, estado

**E4.3 — Capacitación del Cliente (Día 2-3, ~3h)**
- Modo Llave en Mano: Training video + doc + 1h soporte síncrono
- Modo Co-Creación: Cliente ya lo sabe (skip)
- Modo DIY Guiado: Cliente ya aprendió en M9-M12 (minimal review)
- Contenido:
  - Cómo usar (casos de uso común)
  - Cómo mantener (actualizaciones, seguridad)
  - Quién contactar si error
  - FAQ

**E4.4 — Documentación Entregada (Día 3, ~2h)**
- Technical docs (arquitectura, instrucciones deploy, API si aplica)
- User docs (cómo usar, screenshots/video)
- Maintenance guide (qué hacer si error, backups, updates)
- Credenciales: Acceso compartido seguro (1Password, vault, etc.)
- Handoff: Cliente tiene acceso a todo

**E4.5 — Gate de Entrega (Fin Día 3, ~1h)**
- Checklist: ¿Funciona? ¿Cliente sabe usarlo? ¿Docs entregadas?
- Firma de acceptancia: Cliente confirma satisfacción
- Cierre formal: SOW marked "Completed"

#### Criterios de Aceptación — ENTREGA

✅ Solución en producción y funcional
✅ Cliente puede operar independientemente (training + docs demuestran esto)
✅ Documentación técnica + usuario disponible
✅ Credenciales compartidas securely
✅ Cliente firma de acceptancia

#### Anti-patterns — ENTREGA

🚫 Launch sin testing (resultado: bugs a producción)
🚫 Documentación "en progreso" (entregada incompleta)
🚫 Cliente recibe acceso pero no sabe usar (training obligatorio)
🚫 Equipo no disponible post-launch para preguntas (30 días soporte fijo)
🚫 Versión en staging pero nunca pusheada a prod (deploy = ejecución, no plan)

---

### FASE 5: SOPORTE POST-LAUNCH (30 días)

**Objetivo:** Estabilizar, corregir bugs descubiertos, ajustar menores, cerrar exitosamente.

#### Actividades Clave

**S5.1 — SLA de Soporte (Días 1-30)**
- Respuesta: <24h a reportes de bugs
- Resolución: Bug fixes críticos <5 días, menores <14 días
- Cambios: Solo hotfixes, no feature development
- Límite: Max 20h soporte (post-ese límite, soporte pago)

**S5.2 — Issue Triage (Continuo)**
- Cliente reporta problema
- Implementador: Reproduce, clasifica (bug/feature/user error)
- Bug: Fix, test, deploy
- Feature: Documente, proponga como Phase 2
- User error: Clarifica documentación o da training

**S5.3 — Performance Monitoring (Continuo)**
- Apps: Monitor uptime, latency, error logs
- Asistentes: Monitor response quality, token usage
- Web: Google Analytics, SEO basics
- Action: Si algo degrada, investiga root cause

**S5.4 — Gate de Cierre (Día 30, ~1h)**
- Encuesta: Satisfacción del cliente (escala 1-10)
- Criterio de éxito: ≥8/10
- Si ≥8: Cierre exitoso, generador de referrals/case study
- Si <8: Entender por qué, intentar arreglar en 5 días más (máx extensión)
- Deliverable: Post-Implementation Survey, case study brief

#### Criterios de Aceptación — SOPORTE

✅ Todos los bugs reportados triados <24h
✅ Bugs críticos resueltos <5 días
✅ Satisfacción encuesta ≥8/10
✅ Documentación actualizada si se descubrieron gaps
✅ Case study iniciado (para Comercial referrals)

---

## GATES DE DECISIÓN

| Gate | Criterio de Paso | Criterio de Fallo | Acción Fallo |
|------|-----------------|------------------|-------------|
| **G-DISCOVERY** | Brief aprobado + modo definido | Cliente rechaza alcance | Iterar brief max 3 veces, luego pause |
| **G-DISEÑO** | Diseño aprobado + arch viable | Diseño rechazado 2x | Reconceptualizar o escalar a partner |
| **G-DEMO** | Demo ejecutada + feedback ingresado | No hay demo (bloqueo técnico) | Reprogramar mismo día o día siguiente |
| **G-ENTREGA** | Solución en prod + cliente lo entiende | Solución no funciona | Rollback, fix 48h, relaunch |
| **G-CIERRE** | Satisfacción ≥8/10 + docs entregadas | Satisfacción <8/10 | Extend soporte 5 días, re-encuesta |

---

## CONEXIONES A OTROS PROCESOS

### → Desde Comercial
- **Punto de entrada:** H-01 (Lead Calificado) o H-03 (Desde Programa)
- **Qué Comercial prepara:** SOW firmado, expectativa seteada, intro call agendada
- **Transferencia:** Handoff meeting, Comercial → TecnologIA, cliente presente

### → Hacia Programa de Empoderamiento (M9-M12)
- **Módulo 9 — Agentes IA:** Enseña habilidades de agentes. TecnologIA las implementa Llave en Mano.
- **Módulo 10 — Asistentes IA:** Enseña prompts & RAG. TecnologIA los escala.
- **Módulo 11 — Automatizaciones:** Enseña workflows & APIs. TecnologIA los orquesta.
- **Módulo 12 — Mini Apps:** Enseña vibe coding & low-code. TecnologIA DIY guiado.
- **Loop:** Participante aprende en Empoderamiento → Implementa DIY o contrata TecnologIA Llave en Mano.

### → Desde Consultoria
- **Engagement:** Tier 2/3 Consultoria puede incluir implementación TecnologIA como entregable
- **Modelo:** Consultoria define problema → TecnologIA implementa solución
- **Facturación:** Separada (Consultoria + TecnologIA facturan por separado)

### → Hacia Comercial (Referrals & Upsells)
- **Post-Cierre:** TecnologIA genera case study exitoso
- **Comercial:** Usa case study para prospecting similar
- **Upsell:** "Ya tienen Asistente IA. Ahora agreguemos Agente para automatizar."
- **Referral:** Cliente satisfecho refiere a otros

---

## MÉTRICAS DEL PROCESO

### Métricas de Eficiencia

1. **Time-to-Demo:** Días desde kickoff a primera demo (target: ≤5)
2. **Sprint Velocity:** Features completadas por sprint (baseline por línea de servicio)
3. **Demo Consistency:** % demos completadas en tiempo (target: 100%)
4. **Scope Creep:** Feature requests no planeadas / total features (target: <15%)

### Métricas de Calidad

5. **Build Quality:** Bugs reportados post-launch / total features (target: <1 bug por 10 features)
6. **Documentation Coverage:** % documentación asignado vs entregado (target: 100%)
7. **Accessibility:** WCAG 2.1 AA compliance (target: 100% para web, 90%+ para apps)
8. **Performance:** Page load <3s (web), response <2s (IA), uptime >99.5% (apps)

### Métricas de Satisfacción

9. **NPS Post-Delivery:** Net Promoter Score 30 días post-launch (target: ≥50)
10. **Acceptance Rate:** % servicios con G-CIERRE satisfacción ≥8/10 (target: ≥90%)
11. **Support Volume:** Tickets soporte por servicio entregado (target: <5/proyecto)
12. **Referral Rate:** % clientes que refieren a otros (target: ≥40%)

### Métricas de Negocio

13. **Proyecto Rentabilidad:** Inversión realizado vs planeado (target: ±10%)
14. **Ciclo Completo:** Días desde Discovery a G-CIERRE (benchmark por línea)
15. **Mix de Servicios:** % cada línea (Asistentes, Agentes, Apps, Web) para optimizar portfolio
16. **Repeat Rate:** % clientes que contrata 2+ servicios (target: ≥30%)

---

## DECISIONES DE DISEÑO

### 1. Por qué Demo Semanal (no avances async)

**Decisión:** Demo síncrona + viva cada 5 días de construcción.

**Alternativas consideradas:**
- ❌ Avances async (screenshots + video): Cliente pierde contexto, feedback llega tarde
- ❌ Demo bi-semanal: Desfase de 10 días entre cambios, frustración
- ❌ Continuo deployment sin formal demo: Cliente pierde visibilidad

**Justificación:** Demo en vivo crea momentum, sincroniza expectativa, detecta gaps early. Costo (1h/semana) < riesgo de desalineación.

---

### 2. Por qué Value-based Pricing (no hourly)

**Decisión:** Inversión fija por servicio + complejidad, no billing por horas.

**Alternativas consideradas:**
- ❌ Hourly billing: Incentiva lentitud, cliente inquieto por "meter más horas"
- ❌ T&M + cap: Difícil estimar cap, siempre hay presión de overruns

**Justificación:** Value-based alinea incentivos (MetodologIA eficiente = ganancia), es predecible para cliente, escala mejor. Requiere robust scoping (D1-D2) pero eso es inevitable.

---

### 3. Por qué 30 días soporte post-launch (no ilimitado)

**Decisión:** SLA: Respuesta <24h, resolución <14h bugs. Máx 20h consumo post-esse, soporte pago.

**Alternativas consideradas:**
- ❌ Soporte ilimitado: Cliente procrastina issues, MetodologIA consume indefinidamente
- ❌ Sin soporte: Cliente frustrado en day 1 con pregunta

**Justificación:** 30 días cubre settling, training clarifications, minor adjustments. Evita "perpetual support" trap. Incentiva cliente aprenda durante training.

---

### 4. Por qué 3 Modos de Entrega

**Decisión:** Llave en Mano (Metodología construye) / Co-Creación (cliente participa) / DIY Guiado (cliente construye en Empoderamiento).

**Alternativas consideradas:**
- ❌ Solo Llave en Mano: Cliente no aprende, dependency eternal
- ❌ Solo DIY Guiado: Requiere Empoderamiento previo, excluye mercado que quiere "háganlo por mí"

**Justificación:** 3 modos atienden 3 segmentos (delegadores, colabs, aprendices). Diversifica ingresos, reduce presión sobre Empoderamiento, genera referral loop.

---

### 5. Por qué Satisfacción ≥8/10 como criterio de cierre

**Decisión:** G-CIERRE requiere 8+ en encuesta post-implementation.

**Alternativas consideradas:**
- ❌ 7/10: Demasiado bajo, permite trabajo mediocre
- ❌ 9/10: Perfeccionismo paralizante, costo > beneficio

**Justificación:** 8/10 = "muy bueno, lo recomiendo". Métrica SMART, correlaciona con referrals (dato histórico). Permite 1-2 áreas mejora sin ser "fracaso". Incentiva excelencia sin delirio.

---

## FALLBACKS & CONTINGENCIA

### Si descubrimiento revela necesidad diferente

1. **Día 1:** Identificar misalignment
2. **Día 2:** Proponer 2 opciones: Pivotar SOW (nueva inversión) o cerrar
3. **Decisión cliente:** Dentro 48h
4. **Output:** Nuevo SOW ó formal close con "no era el fit"

### Si equipo técnico se queda corto (bug complejo, arquitectura frágil)

1. **Identificar:** En primera demo o pre-launch
2. **Acción:** Escalar a arquitecto sénior, hacer refactor antes de launch
3. **Timeline:** Extender máx 5 días (comunicar al cliente)
4. **Costo:** MetodologIA absorbe si es error interno; cliente paga si scope creep

### Si cliente desaparece/no responde a demos

1. **Día 1 sin feedback:** Reminder async
2. **Día 3:** Llamada síncrona "¿dónde estamos?"
3. **Día 7 sin respuesta:** Pause proyecto, comunicar formalmente
4. **Día 14:** Close proyecto, oferta de re-engagement (nueva inversión)

### Si post-launch satisfacción <8/10

1. **Encuesta:** Entender causa específica
2. **Opciones:**
   - Bug: Fix inmediato
   - Missing feature: Proponer Phase 2 (nueva inversión)
   - User error: Retraining, docs mejoradas
   - Expectativa no cumplida: Honest conversation, revisión SOW
3. **Extensión:** Máx 5 días soporte adicional; post-ese, nuevo contrato

---

## ANTI-PATTERNS CRÍTICOS

### 1. "Casi funciona" a Production

**Patrón:** Launch solución con bugs conocidos "será para Phase 2"

**Por qué malo:** Cliente la entrega a sus usuarios → mala experiencia, baja satisfacción, sin referral

**Prevención:** Pre-launch checklist non-negotiable. Si bug, no lanzar.

### 2. Cliente Escondido (No responde)

**Patrón:** Cliente dice "en 3 días te doy feedback" → desaparece 2 semanas

**Por qué malo:** Timeline derrapaje, equipo idle/distracted, proyecto muere

**Prevención:** SLA de cliente explícito en SOW ("respuesta dentro 48h a demos"). Escalate a Comercial si incumple.

### 3. Scope Creep Infinito

**Patrón:** "Mientras estás en ello, ¿podemos agregar...?" → feature tras feature sin costo

**Por qué malo:** Fecha delivery mueve 5 veces, cliente insatisfecho igual porque "esperaba más"

**Prevención:** SOW explícita. Todo nuevo = Change Order (formal, con inversión adicional).

### 4. Documentación Post-Delivery

**Patrón:** "Te envío documentación en 1 mes" después de G-ENTREGA

**Por qué malo:** Cliente lo necesita día 1, memory fade, nunca se entrega

**Prevención:** Documentación en paralelo a construcción. Entregada en G-ENTREGA junto código.

### 5. Tech Stack Inexplorado

**Patrón:** "Vamos a usar [herramienta nueva] que escuché que es buena"

**Por qué malo:** En el proceso real, resulta que tiene límites, curva aprendizaje, bugs desconocidos

**Prevención:** Stack probado. Default: lo que MetodologIA ya domina. Excepciones: justificadas, testeadas pre-proyecto.

---

## RESUMEN VISUAL — TIMELINE TIPO

```
Semana 1 — DISCOVERY
├─ D1: Kickoff (2h)
├─ D1-D2: Scope (3h)
└─ D2: Brief Final + Aprobación ✓ G-DISCOVERY

Semana 2 — DISEÑO
├─ D1: Arquitectura (4h)
├─ D1-D2: Wireframes/Prompts (6h)
├─ D2: Plan de construcción (2h)
└─ Fin semana: Gate Diseño ✓ G-DISEÑO

Semana 3-N — CONSTRUCCIÓN (típicamente 2-4 sprints)
├─ Cada Sprint (5 días):
│  ├─ D1: Kickoff
│  ├─ D2-D4: Build (30h)
│  └─ D5: Demo ✓ G-DEMO
├─ Feedback → Backlog siguiente sprint
└─ Última semana: Pre-launch QA

Semana N+1 — ENTREGA
├─ D1: Pre-launch checklist (4h) ✓ G-ENTREGA checklist
├─ D2: Deploy + Training (3h)
├─ D3: Docs + Handoff (2h)
└─ D3: Acceptancia ✓ G-ENTREGA formal

Semanas N+2 a N+5 — SOPORTE (30 días)
├─ Respuesta bugs <24h
├─ Resolución <5 días bugs críticos
└─ D30: Post-implementation survey ✓ G-CIERRE
    (Satisfacción ≥8/10)

Total típico: 5-8 semanas (Discovery + Diseño + 2-4 sprints construcción + Entrega + Soporte)
```

---

## REFERENCIAS

- **Empoderamiento Módulos 9-12:** Fuente de habilidades que TecnologIA operacionaliza
- **Consultoria Tiers 2-3:** Contexto para implementaciones complejas
- **Comercial H-01, H-03:** Punto de entrada del cliente
- **Palancas 5, 6, 7:** Marco conceptual que justifica cada decisión técnica

---

**Próxima revisión:** 2026-09-24 (6 meses)
