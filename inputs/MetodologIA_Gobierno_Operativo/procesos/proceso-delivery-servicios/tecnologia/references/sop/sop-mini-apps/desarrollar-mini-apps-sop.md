# Mini Apps — Acelerador Digital

## Metadata
- **Vertical**: TecnologIA
- **Tipo de Servicio**: Acelerador
- **Palanca Conectada**: 6 (Tecnología)
- **Owner**: Desarrollador de Soluciones Digitales
- **Versión**: 1.0 | Última actualización: 2026-03-24

---

## Propósito del Servicio

Diseñar, construir y desplegar aplicaciones web ligeras que resuelven un problema específico del cliente. No son apps enterprise — son herramientas puntuales que generan valor inmediato con mínima complejidad.

**Filosofía Core**: *"Solve ONE problem really well."* Una mini app es exitosa si el usuario la abre, hace lo que necesita, y cierra en <5 minutos.

---

## Stack Tecnológico Soportado

### Vibe Coding (Prototipaje rápido)
- **Bolt.new**: HTML/CSS/JS generado con IA, deploy en segundos
- **Lovable**: React boilerplate + IA, ideal para MVPs
- **Replit Agent**: Python/JavaScript + IA asistida

### Low-Code (Datos + lógica sin código)
- **Bubble**: Workflows visuales, base de datos nativa
- **Glide**: Mobile-first, excelente UX, integraciones
- **Softr**: Convierte sheets/airtable en app web

### Code (Control completo)
- **Python + Streamlit**: Data apps, dashboards, análisis
- **React + Vite**: SPAs con componentes reutilizables
- **Next.js**: Full-stack, SSR, serverless functions

### Hybrid (IA + Humano)
- IA genera 80% del código → Humano revisa, testea, refina 20%
- Estándar MetodologIA: No aceptar IA-generated puro sin revisión

---

## 3 Niveles de Complejidad

| Nivel | Duración | Flujos | Características | Inversión |
|-------|----------|--------|-----------------|-----------|
| **MVP** | 1 semana | 1 principal | Prototipo funcional, datos simples, sin integraciones | COP ~$600K |
| **Funcional** | 3 semanas | 3-5 flujos | Base de datos, autenticación básica, 1-2 integraciones | COP ~$3M |
| **Producción** | 6 semanas | 5+ flujos | Integraciones complejas, analytics, responsive, testing completo | COP ~$8M |

---

## Proceso de Entrega (Paso a Paso)

### 1. DISCOVERY (Día 1-2)
**Gatekeepers**: ¿Qué? ¿Quién? ¿Cuándo? ¿Con qué datos?

- ¿Qué problema específico resuelve la app?
- ¿Quién la usa? (perfil del usuario, edad, nivel técnico)
- ¿Con qué frecuencia? (diaria, semanal, evento puntual)
- ¿Qué datos necesita? (entrada del usuario, APIs externas, base de datos)
- ¿Dónde vive la app? (dominio propio, subdominio, embed en sitio)

**Entregable**: Brief de mini app (1 página A4 máximo)

### 2. WIREFRAME (Día 3-4)
**Validación visual antes de construir**

- Sketch de 3-5 pantallas principales (flujo completo)
- Puede ser: papel → foto, Figma, o generado con IA
- Identifica: inputs, outputs, decisiones (sí/no), errores
- Gate: **Cliente aprueba el flujo antes de Sprint 1**

**Herramientas**: Figma, Excalidraw, Adobe XD, o incluso papel escanado

### 3. SPRINT 1: FLUJO PRINCIPAL (Día 5-10)
**Construir el camino feliz (happy path)**

- Implementar 1 flujo principal completo
- Función central: enter data → process → output resultado
- Stack: elegir Vibe Coding si MVP, Code si requerimientos específicos
- Daily standup: 15min con cliente (async Slack ok)
- Demo al cliente: viernes día 10, en URL temporal

**Salida**: App funcional con flujo principal, sin edge cases

### 4. SPRINT 2: FLUJOS SECUNDARIOS (Día 11-16, solo si Funcional+)
**Completar la app**

- Agregar 2-4 flujos secundarios (alternativas, búsquedas, filtros)
- Integrar base de datos o API externa si aplica
- Autenticación básica (usuario/contraseña o SSO)
- Validación de datos, mensajes de error amigables

**Salida**: App 80% completada, pronta para testing

### 5. SPRINT 3: PRODUCCIÓN (Día 17-30, solo si Producción)
**Pulir y asegurar**

- Testing con usuarios reales (5+ personas)
- Responsive design: mobile, tablet, desktop
- Analytics: GA4 o Segment integrado
- Performance: optimización imágenes, lazy loading, caché
- Documentación: guía de uso + guía de administración

**Salida**: App lista para producción

### 6. DEPLOY (1-2 días)
**Publicar en dominio del cliente**

- Comprar/transferir dominio si necesario
- Configurar DNS, SSL (HTTPS)
- Hosting: Vercel, Netlify, Firebase, o servidor del cliente
- Testing final: acceso desde URL pública

**Checklist pre-launch**:
- ✅ HTTPS activo
- ✅ Dominio apunta correctamente
- ✅ Analytics activo
- ✅ Formularios funcionan
- ✅ Performance <3seg carga

### 7. TRAINING (1h)
**Capacitar al cliente**

- Cómo acceder a la app (URL, credenciales)
- Cómo usar el flujo principal
- Dónde ver datos (admin panel, si aplica)
- Cómo reportar bugs (email o Slack channel)
- FAQ: 3-5 preguntas comunes

### 8. SOPORTE (30 días)
**Post-entrega: bug fixes y ajustes menores**

- Response time: crítico <4h, normal <24h
- Alcance: bugs reales, ajustes UI menores
- NO incluye: nuevas features, rediseños, cambios de scope
- Hosting incluido: 3 meses. Después: cliente paga o MetodologIA cobra mantenimiento

---

## 10x Elevation Protocol: 7 Dimensiones

### 1. SUPUESTOS EXPLÍCITOS
**¿Qué damos por sentado que es verdad?**

- S1: El usuario final tiene conexión a internet estable
- S2: El usuario tiene acceso desde navegador moderno (Chrome, Safari, Edge)
- S3: El cliente puede mantener la app después del soporte inicial (o paga mantenimiento)
- S4: El problema que resuelve la mini app es recurrente (no es one-time)
- S5: Los datos generados por la app no requieren compliance (GDPR, HIPAA, etc.)
- S6: El volumen de usuarios es <10K/mes inicialmente
- S7: La mini app NO es misión crítica para el negocio

**Validación**: En Discovery, confirmar S4, S5, S6, S7 explícitamente. Si alguno falla → escalar a proyecto de Desarrollo Web completo.

### 2. LÍMITES
**¿Qué NO hace una mini app?**

| Límite | Razón |
|--------|-------|
| >1 integraciones complejas | Scope explosion, testing x10 |
| Pagos en tiempo real | PCI compliance, riesgo legal |
| Datos sensibles (DNI, salud, financiero) | Compliance, backups, seguridad |
| >100 campos de formulario | UX collapse, nadie llena |
| IA generativa dentro (ChatGPT API) | Costos token impredecibles, latencia |
| Offline-first / sync | Complejidad arquitectura |
| >1 idioma | Traducción = 2x testing |

**Gate**: Si cliente pide algo de esta lista → proponer Desarrollo Web nivel Producción o rechazar.

### 3. CRITERIOS BINARIOS
**Sí / No. No hay grises.**

| Criterio | Sí ✅ | No ❌ |
|----------|-------|-------|
| **Carga en <3seg?** | Acepta | Rechaza (optimizar) |
| **Flujo principal sin instrucciones?** | Acepta | Rechaza (mejorar UX) |
| **Funciona mobile + desktop?** | Acepta | Rechaza (responsive) |
| **Datos persisten?** | Acepta | Rechaza (debug storage) |
| **0 errores en 5 usuarios reales?** | Acepta | Rechaza (testing) |
| **Cliente explica valor en 1 frase?** | Acepta | Rechaza (pivota o cancela) |
| **Documentación básica existe?** | Acepta | Rechaza (documentar) |

**Proceso**: No entregar si alguno es No.

### 4. CASOS BORDE (5-7 Escenarios Críticos)

**CB-01: Scope Creep Disfrazado**
- Cliente pide "mini app" pero lista de features = app enterprise
- **Síntoma**: "Básicamente necesitamos un CRM para nuestro equipo"
- **Fallback**: "Esto es proyecto de Desarrollo Web 6 semanas, COP $8M. ¿Validamos con MVP de $600K primero?"
- **Salida**: Proponer MVP acotado o rechazar

**CB-02: Stack Insuficiente**
- Stack elegido (ej: Glide) no soporta feature crítico (ej: pagos recurrentes)
- **Síntoma**: Descubierto en Sprint 1, cliente es adamante
- **Fallback**: Evaluar alternativa (Bubble, código custom) o proponer feature workaround
- **Salida**: Change request + tiempo/costo adicional

**CB-03: Datos en Tiempo Real con Rate Limits**
- Mini app conecta a API externa que tiene latencia o límite de requests
- **Síntoma**: "La data debe refrescar cada 5 segundos" pero API permite 100 requests/día
- **Fallback**: Implementar refresh manual, caché con timestamp, o polling cada 1h
- **Salida**: Documentar en guía de uso: "Datos 1h de retraso"

**CB-04: Usuario Final No Técnico + UX Compleja**
- App requiere entender conceptos técnicos, pero usuario no tiene contexto
- **Síntoma**: Testing con 5 usuarios: 4 dicen "no entiendo"
- **Fallback**: Rediseñar flows, agregar tooltips, vídeo tutorial 2min
- **Salida**: Testing iterativo hasta 3/5 usuarios exitosos sin ayuda

**CB-05: Rediseño Completo Post-Sprint 1**
- Cliente aprobó wireframe, pero post-demo dice "no, otra cosa"
- **Síntoma**: "Me encanta pero la estructura está mal, empecemos de nuevo"
- **Fallback**: Congelar proyecto, proponer change request formal:
  - Tiempo: +1-2 semanas
  - Costo: +50% del MVP
  - Opción: Cancelar y devolver 50% del presupuesto
- **Salida**: Contrato modificado, aprobación ejecutiva

**CB-06: Hosting / Dominio Inaccesible**
- Dominio del cliente expiró, panel DNS sin acceso, o hosting desconfigured
- **Síntoma**: "Deploy listo, pero no podemos apuntar el dominio"
- **Fallback**: Comprar dominio temporal (.tech, .app, etc.), entregar con URL temporal
  - Cliente migra dominio después
  - O MetodologIA maneja DNS (cobro ~$50/mes)
- **Salida**: App funcional en URL temporal, tarea de migración asincrónica

**CB-07: App Exitosa, Cliente Quiere Escalar**
- Mini app genera traction, cliente quiere versión "completa" o "nativa"
- **Síntoma**: "Esto funciona genial. ¿Podemos convertirlo en app mobile?"
- **Fallback**: Esta es la mejor situación. Upsell:
  - App Producción nivel 2 (refactor + features): +$5M
  - App Nativa (React Native / Flutter): +$10M
  - Agente IA que opera la app: +$3M
- **Salida**: Pitch comercial, NDA firmado si new scope

---

## Criterios de Aceptación (Definition of Done)

Todos los siguientes deben ser **SÍ** antes de entregar:

- ☐ App carga en <3 segundos (PageSpeed Insights ≥75/100)
- ☐ Flujo principal completable sin instrucciones (UX = obvio)
- ☐ Funciona en mobile (iOS Safari, Chrome) y desktop (Chrome, Firefox, Safari, Edge)
- ☐ Datos persisten correctamente (localStorage, DB, o API backend)
- ☐ Cliente puede explicar el valor de la app en 1 frase clara
- ☐ 0 errores bloqueantes: testing con 5 usuarios reales, sin fallos críticos
- ☐ Documentación mínima: guía de uso (en Notion/PDF) + admin guide si aplica
- ☐ 0 links rotos, 0 imágenes faltantes, 0 console errors
- ☐ HTTPS activo, dominio apunta correctamente
- ☐ Analytics básico configurado (GA4 o alternativa)
- ☐ Responsable de soporte identificado en email del cliente

**Go/No-Go**: Revisión final viernes. Si <8/11 es SÍ → no va a producción.

---

## 5+ Anti-Patterns (Trampas Comunes)

**AP-01: La Mini App Que Creció**
- Agregar features hasta que ya no es "mini"
- La app pasa de 500KB a 5MB, carga en 12seg, tiene 50 flujos
- **Síntoma**: "Hemos estado optimizando por 2 meses"
- **Regla**: Después de Sprint 1 exitoso, congelar features. Si cliente quiere más → proyecto nuevo o Desarrollo Web

**AP-02: Vibe Coding sin Validación Humana**
- Generar código entero con IA, deployar directo sin revisión
- Resultado: seguridad débil, código innecesariamente complejo, bugs no visibles
- **Regla**: 100% del código IA-generated = revisión humana obligatoria + security scan básico (Snyk gratis)

**AP-03: App sin Usuario Real**
- Construir sin entender quién la usa, con qué frecuencia, en qué contexto
- Mini app sofisticada pero nadie la abre
- **Regla**: En Discovery, entrevistar 3+ usuarios potenciales (no solo cliente). En Sprint 1, testing con usuarios reales.

**AP-04: Deploy and Forget**
- Publicar y desconectarse. No monitorear si la app se usa, si hay errores, si es lenta
- Datos: 30% de las apps nunca se usan después del primer mes
- **Regla**: Analytics obligatorio. Check-in a mes 2, mes 3. Proponer soporte pago si crece uso.

**AP-05: Over-Engineering**
- Usar React + Next.js + Serverless + DB for lo que podría ser Google Sheet con formulario
- Costo: $8M, tiempo: 6 semanas. Alternativa: $200K, 3 días
- **Regla**: Vibe coding / low-code primero. Code último. Justificar por qué necesitas complejidad.

---

## 5 Decisiones de Diseño (Design Decisions)

**DD-01: MVP Primero, Siempre**
- Aunque cliente pida "Producción", empezar con MVP validado
- Razón: 40% de los MVPs fallan en validación (el problema no era real)
- Proceso: MVP ($600K) → validación con 50+ usuarios → decisión de escalar

**DD-02: Vibe Coding es Opción #1 para MVP**
- Razón: 80% de clientes valida idea con MVP, no escalas
- Escalación: Si exitoso → refactor a código custom en sprint 2
- No usar code desde inicio (costo x10, tiempo x5)

**DD-03: Hosting Incluido 3 Meses**
- Después: cliente migra a su hosting, o paga $50/mes mantenimiento
- Razón: No generar deuda técnica de hosting "huérfano"
- Clausula: Si cliente no da instrucciones en mes 3 → desactivar app, notificar via email

**DD-04: Mobile-First Design, Siempre**
- 75% de usuarios en LATAM acceden desde teléfono
- Wireframe y desarrollo: empezar en mobile (320px), escalar a desktop
- Testing: mobile primero, desktop segunda

**DD-05: Toda Mini App Incluye Analytics Mínimo**
- Qué: % usuarios que completan flujo, tiempo promedio, abandono por pantalla
- Tool: GA4 gratis, o Plausible ($9/mes)
- Reporte: dashboard mensual con insights + recomendaciones

---

## Fallbacks Operativos

| Escenario Crítico | Fallback Técnico | SLA Respuesta | Propietario |
|-------------------|------------------|---------------|-------------|
| App carga >5seg post-launch | Auditoría performance + compresión imágenes + caché | <24h | Dev |
| Stack no soporta feature crítico | Evaluar alternativa o feature workaround + change request | <48h | Tech Lead |
| Cliente no entrega contenido/datos | Generar placeholder con IA + scheduled review call | T+3 días | PM |
| Bug crítico encontrado en testing | Hot fix + re-test con usuario | <4h | Dev |
| Dominio/DNS inaccesible | Usar dominio temporal + documentar migration steps | <1 día | Ops |
| Usuario final no entiende app | Sesión de training + vídeo tutorial 2min + tooltips | <48h | PM |
| Cliente quiere feature nueva mid-project | Congelar scope + change request formal | En reunión | PM |

---

## Integraciones Verticales y Transversales

**Upstream**:
- entregar-tecnologia-proceso.md (delivery gate)

**Cross-Vertical**:
- Empoderamiento M12: Revolución Digital (mini apps + vibe coding como pieza clave)
- Sitios Web SOP (mini app puede vivir embebida en sitio web)
- Asistentes IA SOP (mini app + chatbot integrado)

**Downstream**:
- Si exitosa: upsell a app Producción (refactor + features)
- Si exitosa: upsell a Agente IA que opera la app (automación)
- Analytics → Comercial (case study → referrals)

---

## Checklist de Lanzamiento

- ☐ Discovery + Brief aprobado
- ☐ Wireframe aprobado por cliente
- ☐ Stack seleccionado y justificado
- ☐ Hosting/dominio listos (DNS apunta correctamente)
- ☐ Analytics integrado
- ☐ Testing con 5 usuarios reales: 0 bloqueantes
- ☐ Documentación: guía de uso + admin guide
- ☐ Sesión de training completada
- ☐ Responsable de soporte asignado
- ☐ Caso de éxito documentado (para referrals)

**Owner**: Desarrollador de Soluciones Digitales + PM de Proyecto
