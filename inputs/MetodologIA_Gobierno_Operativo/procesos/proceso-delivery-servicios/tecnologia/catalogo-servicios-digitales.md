# CATÁLOGO DE SERVICIOS DIGITALES — TecnologIA

**Versión:** 1.0
**Último actualizado:** 2026-03-24
**Propietario:** Líder de Servicios Digitales
**Vertiente:** TecnologIA — Aceleradores y Amplificadores

---

## RESUMEN EJECUTIVO

MetodologIA entrega 4 líneas de servicios digitales que aceleran y amplifican impacto usando tecnología:

| Línea | Qué Es | Palancas | Complejidad | Duración | Inversión |
|-------|--------|---------|------------|----------|-----------|
| **Asistentes IA** | Asistente personalizado cognitivo | Palanca 5 | 1-6 semanas | $800K - $5M COP |
| **Agentes IA** | Agente autónomo que ejecuta | Palanca 5+6 | 2-8 semanas | $1.5M - $10M COP |
| **Mini Apps** | App web ligera + funcional | Palanca 6 | 1-6 semanas | $600K - $8M COP |
| **Sitios Web** | Presencia digital profesional | Palanca 3+4+6 | 1-6 semanas | $500K - $12M COP |

---

## LÍNEA 1: ASISTENTES IA — Amplificador Cognitivo

### Qué Es

Asistente personalizado que piensa, responde y ejecuta tareas cognitivas en nombre del cliente. Amplifica capacidad cerebral usando modelos de IA (GPT-4, Claude, Gemini, etc.).

**Casos de uso:**
- Analista que necesita "segundo cerebro" para análisis rápido
- Emprendedor que requiere asesor disponible 24/7 para decisiones
- Equipo legal que necesita revisor rápido de documentos
- Docente que necesita tutor inteligente para estudiantes
- Consultor que necesita asistente que genere opciones, resúmenes, draft

### Plataformas Soportadas

| Plataforma | Tipo | Mejor Para | Setup | Mantenimiento |
|-----------|------|-----------|-------|--------------|
| **ChatGPT Custom GPTs** | Cloud SaaS | Usuarios no-tech, rápido TTM | <1 día | Bajo (OpenAI mantiene) |
| **Claude Projects** | Cloud SaaS | Privacidad, reasoning profundo | <1 día | Bajo (Anthropic mantiene) |
| **Gemini Gems** | Cloud SaaS | Integración Google Workspace | <1 día | Bajo |
| **Chatbot Custom (Node/Python)** | Self-hosted | Control total, integraciones | 3-5 días | Medio (MetodologIA mantiene) |
| **Slack/Teams Bot** | Integration | Team collaboration | 1-2 días | Bajo-Medio |
| **WhatsApp Bot** | Integration | Customer service, SMB | 2-3 días | Medio |

### Niveles de Complejidad

#### Nivel Básico (1 semana, ~$800K COP)
**Qué se entrega:**
- 1 Asistente en plataforma cloud (ChatGPT GPT o Claude Project)
- Prompt engineering optimizado (~50 iteraciones testing)
- Knowledge base hasta 5 documentos (PDFs, text files, URLs)
- Training: 1h video + 1h soporte síncrono

**Ejemplo:** Asesor de negocio SMB que analiza sus reportes mensuales, sugiere estrategias, genera presentaciones.

**Stack:** ChatGPT API + Knowledge Retrieval (built-in)

---

#### Nivel Medio (3 semanas, ~$2.5M COP)
**Qué se entrega:**
- 1-2 Asistentes especializados
- Knowledge base RAG (Retrieval Augmented Generation) con 10-50 documentos
- Historial de conversaciones persistente
- Analytics básicas (queries, respuesta quality, feedback)
- API integration con 1 sistema externo (Salesforce, Slack, Sheets)
- Training: Video + docs + 2h soporte

**Ejemplo:** Asistente de ventas que accede CRM, propone next-best-action, auto-genera follow-up emails.

**Stack:** Claude API + Pinecone/Weaviate (vector DB) + n8n (orchestration) + webhooks

---

#### Nivel Avanzado/Enterprise (6 semanas, ~$5M COP)
**Qué se entrega:**
- 3+ Asistentes especializados (cada uno optimizado para rol específico)
- Knowledge base enterprise (100+ documentos, múltiples formatos)
- Multi-turn reasoning con memory largo
- Integraciones complejas (2-3 sistemas, APIs custom)
- Fine-tuning custom si justificado
- Seguridad: Authentication, encryption, audit logs
- Performance monitoring + SLA
- Training: Video + docs + 4h workshops + on-call 30 días

**Ejemplo:** Asistente "Chief of Staff" que coordina calendar, email, research, estrategia. Accede Slack, Gmail, CRM, Docs. Toma decisiones semi-autónomas.

**Stack:** Claude API + Custom RAG pipeline + PostgreSQL + Auth0 + Datadog monitoring + Custom wrapper API

---

### Entregables (Todos los Niveles)

**Software:**
- Asistente funcional en producción (URL, credentials, acceso)
- Code/prompts documentados (GitHub repo o GitLab, README)
- Knowledge base indexado y testeado

**Documentación:**
- User Manual (cómo usar, ejemplos, límites)
- Technical Spec (arquitectura, integraciones, datos)
- Maintenance Guide (cómo agregar datos, updates, troubleshooting)

**Training:**
- Video walkthrough (screencast, 10-15 min)
- Live Q&A session (1h, Nivel Básico) o workshop (2-4h, Advanced)
- Slack/email support 30 días

---

### Decisión de Compra: Asistentes IA

**¿Cuándo contratar?**
- ✅ Necesita análisis/síntesis rápida sin personas
- ✅ Quiere disponibilidad 24/7 para preguntas
- ✅ Tiene documentos/datos que requiere "entender"
- ✅ Busca acelerar procesos cognitivos

**¿Cuándo no?**
- ❌ Necesita datos en tiempo real (ej: stock prices actualizado cada segundo)
- ❌ Aplicación must-be-100%-accurate legal/médica sin supervisión
- ❌ Prefiere chatbot que solo conecta a humanos (usar herramienta barata como Typeform)

---

## LÍNEA 2: AGENTES IA — Amplificador Operativo

### Qué Es

Agente autónomo que actúa, decide y ejecuta workflows sin supervisión manual. Toma decisiones, ejecuta tareas, genera reportes. Amplifica capacidad operativa.

**Casos de uso:**
- Prospection bot que identifica leads, envía emails, actualiza CRM
- Data analyst bot que hace queries SQL, genera reportes, distribuye
- HR bot que procesa candidatos, programa entrevistas, envía documentos
- E-commerce bot que procesa órdenes, maneja devoluciones, actualiza inventory
- Social media bot que publica, responde, analiza engagement

### Plataformas Soportadas

| Plataforma | Tipo | Mejor Para | Curva Aprendizaje |
|-----------|------|-----------|------------------|
| **Claude Code (Interactive) + Python** | Agentic | Agentes que razonan, deciden | Media |
| **Cursor Agents** | IDE-native | Agentes de coding/automation | Media |
| **n8n** | Low-code workflow | Workflows visuales, integraciones | Baja |
| **Make (Zapier alt)** | Low-code workflow | Automatizaciones básicas-medias | Baja |
| **LangChain/LlamaIndex** | Custom Python | Full control, escalabilidad | Alta |
| **Anthropic Compute** | Custom | Agentes long-running, complejos | Alta |

### Niveles de Complejidad

#### Nivel Simple (2 semanas, ~$1.5M COP)
**Qué se entrega:**
- 1 Agente dedicado (1 workflow único)
- Trigger: Scheduler, webhook, manual button
- Acción: Máx 5-7 pasos automatizados
- Datos: Accede 1-2 fuentes (Spreadsheet, API pública, email)
- Entrega: Report por email, actualización de hoja, webhook response
- Monitoring: Error logs básicos

**Ejemplo:** Agente "Daily Report" que cada mañana tira datos de analytics, genera gráficos, envía email al equipo.

**Stack:** n8n o Make (low-code)

---

#### Nivel Compuesto (4 semanas, ~$5M COP)
**Qué se entrega:**
- 2-3 Agentes que coordinan
- Triggers: Múltiples (schedule, webhook, form submission, manual)
- Acciones: 10-15 pasos, decisión lógica (if/else, loops)
- Datos: 3-5 fuentes (APIs privadas, DBs, files, webhooks)
- Razonamiento: Agente toma decisiones (ej: "¿si lead es hot, auto-schedule?")
- Error handling: Retry lógica, fallback emails
- Monitoring: Dashboard básico, Slack alerts

**Ejemplo:** Agente "Lead Nurture" que recibe leads de Typeform, califica con IA, envía emails personalizados a Mailchimp, actualiza Salesforce, pone en LinkedIn, programa follow-up.

**Stack:** Claude API + n8n + 3-5 API integrations

---

#### Nivel Orquestador (8 semanas, ~$10M COP)
**Qué se entrega:**
- 5+ Agentes especializados coordinados
- Multi-agent reasoning (agentes "hablan" entre sí)
- Datos: 7+ fuentes internas y externas
- Decisiones complejas: Machine learning classification, custom business logic
- Escalabilidad: Maneja 1000s ejecuciones/día sin degradación
- Observabilidad: Full logging, tracing, monitoring dashboard
- Seguridad: Rate limiting, auth, encryption, audit trail
- Performance SLA: 99.5% uptime, <2min ejecución típica

**Ejemplo:** Agente "Operaciones Completas" que procesa órdenes end-to-end: recibe vía shopify, chequea inventory, actualiza fulfillment, coordina con proveedores, auto-genera factura, maneja devoluciones, propone upsells.

**Stack:** Claude API + FastAPI backend + Celery (task queue) + PostgreSQL + Redis + Datadog

---

### Entregables (Todos los Niveles)

**Software:**
- Agente(s) en producción (endpoint URL si API, o scheduled task)
- Source code documentado (repo con README, docstrings)
- Configuration file para triggers, pasos, integraciones

**Documentación:**
- Workflow diagram (visual, ASCII o Miro)
- User guide (cómo trigger, qué esperar, cómo debug)
- Integration specs (qué APIs accede, qué permisos necesita)
- Troubleshooting (errores comunes, cómo arreglar)

**Monitoring:**
- Logging setup (ver qué hizo el agente)
- Alert rules (notificación si error)
- Dashboard básico (ejecutiones, tasa éxito)

---

### Decisión de Compra: Agentes IA

**¿Cuándo contratar?**
- ✅ Workflow repetitivo, manual, tedioso
- ✅ Requiere coordinación multi-step o multi-sistema
- ✅ Debe ejecutar 24/7 sin humano
- ✅ Tomar decisiones simples (pero rápido)

**¿Cuándo no?**
- ❌ Workflow requiere discreción alta / decisiones complejas (humano mejor)
- ❌ Una sola task manual que toma <5 min (costo > beneficio)
- ❌ Sistema legacy sin APIs (integración imposible/cara)

---

## LÍNEA 3: MINI APPS — Acelerador Digital

### Qué Es

Aplicación web ligera que resuelve un problema específico. Mini, enfocada, funcionalmente completa. Acelera y simplifica procesos.

**Casos de uso:**
- ROI Calculator para vendedor (cliente pone datos, ve retorno)
- Team Availability Checker (todos ponen disponibilidad, app muestra free slot)
- Expense Manager (equipo sube recibos, app agrupa, exporta a accounting)
- Internal KPI Dashboard (sales pipelines, support tickets, dev sprints en 1 pág)
- Course Enrollment App (estudiantes se registran, pagan, acceden contenido)
- Survey & Feedback Collector (branded, con análisis)

### Stack Soportado

| Stack | Tipo | Mejor Para | TTM |
|-------|------|-----------|-----|
| **Bolt / Lovable (AI-powered)** | Vibe coding | MVP rápido (<1 semana) | <3 días |
| **Replit / Glitch** | Cloud IDE | Coding simple, deployment fácil | <1 semana |
| **Bubble / Glide** | No-code | Funcionalidad compleja, no código | 1-2 semanas |
| **Streamlit (Python)** | Python app | Dashboards, data apps, análisis | <1 semana |
| **React/Next.js + Supabase** | Full-stack code | Control total, escalabilidad | 2-3 semanas |
| **SvelteKit / Astro** | Modern SSR | Performance, SEO si aplica | 2-3 semanas |

---

### Niveles de Complejidad

#### MVP (1 semana, ~$600K COP)
**Qué se entrega:**
- 1 Core feature enfocada (ej: calculator, checker, form)
- 1-2 pantallas simples
- Almacenamiento: CSV export ó Sheets integration
- Deploy: URL pública + acceso
- No auth requerida (ó auth básica)

**Ejemplo:** ROI Calculator que recibe inversión/retorno, calcula meses payback, genera imagen exportable.

**Stack:** Bolt, Lovable, o Streamlit

---

#### Funcional (3 semanas, ~$3M COP)
**Qué se entrega:**
- 2-3 features coordinadas
- 3-5 pantallas con navegación clara
- Almacenamiento: Base de datos (Supabase, Firebase, Airtable)
- Auth: Login básico (email/password ó Google Sign-In)
- Validación de datos
- Responsive (mobile + desktop)
- Export: PDF, CSV, email

**Ejemplo:** Expense Manager donde equipo sube recibos, app categoriza, acumula por mes, genera reportes, exporta a accounting software.

**Stack:** Bubble, Glide, o React + Supabase

---

#### Producción (6 semanas, ~$8M COP)
**Qué se entrega:**
- 4+ features con lógica compleја
- 8+ pantallas, flujos de usuario sofisticados
- Base de datos normalizada, índices
- Auth avanzada (roles, permissions, 2FA)
- Payment integration (Stripe, PayPal) si aplica
- Notificaciones (email, SMS, push)
- Análisis (Google Analytics, Mixpanel)
- Performance optimizado (<2s load)
- Security: HTTPS, rate limiting, input validation
- SLA: 99.5% uptime

**Ejemplo:** Course Enrollment App con registro estudiante, pago, acceso contenido, progress tracking, certificados, admin dashboard.

**Stack:** Next.js/React + Supabase + Stripe + Segment

---

### Entregables (Todos los Niveles)

**Software:**
- App en producción (URL pública)
- Source code (GitHub repo, open ó private)
- .env variables documentadas
- Database schema (si aplica)

**Documentación:**
- User guide (cómo usar, features principales)
- Admin guide (cómo agregar usuarios, datos, etc.)
- Technical docs (stack, cómo deployar updates)

**Hosting & Maintenance:**
- Hosting pagado 3 meses (post-ese, cliente o MetodologIA pagan)
- Automatic backups configuradas
- Monitoring + Slack alerts

---

### Decisión de Compra: Mini Apps

**¿Cuándo contratar?**
- ✅ Problema específico, no necesita 100 features
- ✅ Presupuesto limitado pero urgente
- ✅ Puede empezar básico, agregar features después
- ✅ Audience pequeño-mediano (<10k usuarios)

**¿Cuándo no?**
- ❌ Necesita aplicación masiva (100k+ usuarios) → startup/empresa tech
- ❌ Compliance regulatoria fuerte (HIPAA, SOC2) → producto enterprise
- ❌ Arquitectura hyper-compleja (100s features, 1000s datos) → custom dev

---

## LÍNEA 4: SITIOS WEB — Amplificador de Marca

### Qué Es

Presencia digital profesional para marca personal, negocio, o e-commerce. Amplifica visibilidad, genera leads, vende directamente.

**Casos de uso:**
- Coach/consultor: Portfolio + blog + contacto + calendario booking
- SMB: Presencia corporativa, servicios, blog, contacto
- E-commerce: Catálogo, carrito, checkout, orden tracking
- Creador: Portafolio, tienda digital (cursos, ebooks, prints)
- Afiliado: Landing page para promo, blog con SEO, email capture

### Stack Soportado

| Stack | Tipo | Mejor Para | SEO | Ecommerce |
|-------|------|-----------|-----|-----------|
| **Framer** | Vibe/Visual | Diseño hermoso, rápido | Bueno | Limitado |
| **Webflow** | Visual builder | Control total, scalable | Excelente | Bueno |
| **WordPress + Theme** | CMS | Blog, contenido, extensible | Excelente | Sí (WooCommerce) |
| **Shopify** | E-commerce native | Tienda primaria | Bueno | Excelente |
| **Custom React/Next.js** | Full-stack code | Control máximo | Controlable | Sí |
| **Statamic / Craft** | Modern CMS | Developers, custom content | Excelente | Integrable |

---

### Niveles de Complejidad

#### Landing Page (1 semana, ~$500K COP)
**Qué se entrega:**
- 1 página larga (hero + features + CTA + footer)
- Responsive (mobile-first)
- CTA: Email capture, button link, o contact form
- Analytics: Google Analytics + conversion tracking
- SEO básico: Meta tags, Open Graph, sitemap
- Hosting: 3 meses incluidos
- Dominio: Punto a tu dominio existente ó nuevo (.com/.co)

**Ejemplo:** Landing page de coach que explica oferta, beneficios, testimonios, CTA "Agendar llamada".

**Stack:** Framer o Webflow

---

#### Sitio Institucional (3 semanas, ~$2M COP)
**Qué se entrega:**
- 5-10 páginas (Home, About, Services, Blog, Contact, Legal)
- Navegación lógica, CTA multi-nivel
- Blog: 5 posts iniciales (SEO optimizados)
- Contacto: Formulario + email automático + Calendly integración
- Testimonios/casos de éxito
- Team/About página
- Responsive + performance optimizado
- Analytics: GA4, conversiones, heatmap
- SEO: Technical SEO, keywords, backlink strategy
- SSL, HTTPS, seguridad
- Hosting: 3 meses incluidos

**Ejemplo:** Sitio PYME: Quiénes somos, qué hacemos, servicios (3-4 líneas), portfolio, blog, contacto, team.

**Stack:** Webflow o WordPress

---

#### E-commerce (6 semanas, ~$12M COP)
**Qué se entrega:**
- Catálogo: 50-500+ productos
- Diseño: Homepage, categorías, producto detail, carrito
- Checkout: Stripe/PayPal/Mercado Pago integration
- Orden management: Admin panel, email confirmación, tracking
- Inventory: Stock management, variantes (color, talla)
- Shipping: Integración con proveedores (envíos, costos)
- Marketing: Email (abandoned cart), SMS, push
- Analytics: Tráfico, conversiones, AOV, retention
- SEO: Indexación de productos, schema markup
- Performance: <2s page load, image optimization
- Hosting + CDN: 3 meses incluidos
- Training: 2h operación (cómo agregar productos, manejar órdenes)

**Ejemplo:** Tienda online de ropa/accesorios con Shopify o Webflow + Stripe.

**Stack:** Shopify o custom (Next.js + Stripe + Supabase)

---

### Entregables (Todos los Niveles)

**Sitio Web:**
- Dominio configurado (DNS, SSL)
- Sitio publicado (URL pública funcional)
- Admin access (para cliente actualizar contenido)

**Documentación:**
- How-to: Cómo editar content, agregar blog posts, manejar contactos
- SEO guide: Keywords, cómo escribir posts, backlink strategy
- Technical guide: Stack, cómo deployar cambios, backups
- Analytics guide: Qué métricas importan, dashboard

**Marketing Essentials:**
- Google Analytics setup + conversion tracking
- Google Business Profile (si relevante)
- Sitemap XML + robots.txt
- Meta tags + Open Graph

**Training:**
- Video walkthrough (15-20 min)
- 1h live training para client team
- Slack/email support 30 días

---

### Decisión de Compra: Sitios Web

**¿Cuándo contratar?**
- ✅ Necesita presencia online profesional
- ✅ Quiere SEO + blog + lead generation
- ✅ Vende productos/servicios directamente
- ✅ Requiere integración con calendarios, email, CRM

**¿Cuándo no?**
- ❌ Solo necesita landing page simple (usar Framer 1 día, DIY)
- ❌ Plataforma social ya funciona (Instagram shopping, etc.)
- ❌ Sistema legacy enterprise complejo

---

## MATRIZ DE DECISIÓN

### ¿Cuál Servicio Necesitas?

```
┌─ ¿Necesitas AUTOMATIZAR tareas repetitivas?
│  ├─ SÍ, procesos operativos → AGENTES IA
│  └─ NO
│
├─ ¿Necesitas AMPLIFICAR capacidad cognitiva/análisis?
│  ├─ SÍ → ASISTENTES IA
│  └─ NO
│
├─ ¿Necesitas aplicación web para problema específico?
│  ├─ SÍ → MINI APPS
│  └─ NO
│
└─ ¿Necesitas presencia digital / vender online?
   ├─ SÍ → SITIOS WEB
   └─ NO → Probablemente no TecnologIA
```

---

## MATRIZ COMPARATIVA: SERVICIO × COMPLEJIDAD × TIMELINE × INVERSIÓN

| Línea | Básico | Medio | Avanzado |
|-------|--------|-------|----------|
| **Asistentes IA** | 1 sem / $800K | 3 sem / $2.5M | 6 sem / $5M |
| **Agentes IA** | 2 sem / $1.5M | 4 sem / $5M | 8 sem / $10M |
| **Mini Apps** | 1 sem / $600K | 3 sem / $3M | 6 sem / $8M |
| **Sitios Web** | 1 sem / $500K | 3 sem / $2M | 6 sem / $12M |

**Nota:** Rangos son referenciales. Casos específicos pueden variar ±30% según:
- Complejidad integraciones
- Disponibilidad cliente feedback
- Dependencias externas
- Cambios de alcance

---

## BUNDLING: PAQUETES COMBINADOS

### Pack 1: "Presencia Digital Completa" ($3.5M - $5M)
**Incluye:**
- 1 Sitio Web Institucional (Landing + 5-8 págs)
- 1 Asistente IA (Básico: FAQs, lead qualification)
- Setup Google Analytics + Email automático
- **Ventaja:** Sitio web + automático responder preguntas frecuentes
- **Timeline:** 4-5 semanas

### Pack 2: "Operaciones Automáticas" ($4M - $8M)
**Incluye:**
- 2 Agentes IA (Simple: prospection + reporting)
- 1 Mini App (Funcional: dashboard/tracker)
- Integración CRM/Salesforce
- Monitoring + Slack alerts
- **Ventaja:** End-to-end automatización de proceso
- **Timeline:** 5-7 semanas

### Pack 3: "Tienda Digital + Asistente" ($3M - $6M)
**Incluye:**
- 1 Sitio Web E-commerce (básico/funcional)
- 1 Asistente IA (customer service, product recommendations)
- Stripe/Mercado Pago integrado
- Email marketing automático
- **Ventaja:** Vender + soporte automático
- **Timeline:** 4-6 semanas

### Pack 4: "PMO Completo — Coach" ($2M - $3.5M)
**Incluye:**
- 1 Landing Page hermosa (Framer)
- 1 Asistente IA (responde preguntas sobre coaching)
- 1 Mini App (client progress tracker)
- Calendly + email automation
- **Ventaja:** Portfolio + lead capture + client engagement
- **Timeline:** 3-4 semanas

---

## CONEXIÓN A PROGRAMA DE EMPODERAMIENTO

### Módulo 9: Agentes IA → Línea AGENTES IA
- **Enseña:** Cómo diseñar, buildear, deployar agentes con Claude/n8n
- **Empoderamiento:** Participante construye 1 agente propio en M9
- **TecnologIA Loop:** Participante decide: ¿DIY (implementó en M9)? ¿O contratar Llave en Mano?

### Módulo 10: Asistentes IA → Línea ASISTENTES IA
- **Enseña:** Prompt engineering, RAG, knowledge bases, fine-tuning
- **Empoderamiento:** Participante deploye 1 asistente en M10
- **TecnologIA Loop:** ¿Quiere producción enterprise? → Contrata avanzado

### Módulo 11: Automatizaciones → Línea AGENTES IA (Complemento)
- **Enseña:** Workflows, APIs, integraciones, orquestación
- **Empoderamiento:** Participante integra sistemas en M11
- **TecnologIA Loop:** ¿Necesita multi-agente system? → Contrataría orquestador

### Módulo 12: Mini Apps & Vibe Coding → Línea MINI APPS
- **Enseña:** Vibe coding (Bolt/Lovable), low-code (Bubble), deployment
- **Empoderamiento:** Participante construya 1 app funcional en M12
- **TecnologIA Loop:** ¿Quiere producción escalable? → Co-creación o Llave en Mano

---

## MODOS DE ENTREGA × LÍNEAS DE SERVICIO

| Línea | Llave en Mano | Co-Creación | DIY Guiado |
|-------|--------------|-------------|-----------|
| **Asistentes IA** | Sí (recomendado) | Sí (M10) | Sí (M10 + DIY) |
| **Agentes IA** | Sí | Sí (M9/M11) | Sí (M9 + DIY) |
| **Mini Apps** | Sí (recomendado) | Sí (M12) | Sí (M12 + DIY) |
| **Sitios Web** | Sí (recomendado) | Sí (M12+) | Parcial (DIY diseño, dev soporte) |

---

## PRICING REFERENCE CARD

### Asistentes IA
- **Básico:** $800K (1 semana, prompt + basic RAG)
- **Medio:** $2.5M (3 semanas, RAG + 1 integración)
- **Avanzado:** $5M (6 semanas, 3+ asistentes, enterprise security)

### Agentes IA
- **Simple:** $1.5M (2 semanas, 1 workflow simple)
- **Compuesto:** $5M (4 semanas, 2-3 agentes coordinados)
- **Orquestador:** $10M (8 semanas, 5+ agentes, multi-system)

### Mini Apps
- **MVP:** $600K (1 semana, 1 feature, Bolt/Lovable)
- **Funcional:** $3M (3 semanas, 2-3 features, DB + auth)
- **Producción:** $8M (6 semanas, 4+ features, payments, analytics)

### Sitios Web
- **Landing:** $500K (1 semana, 1 página, CTA)
- **Institucional:** $2M (3 semanas, 5-10 págs, blog)
- **E-commerce:** $12M (6 semanas, catálogo + checkout + fulfillment)

---

## PRÓXIMOS PASOS DESPUÉS DE CONTRATAR

### Post-Entrega (G-CIERRE ✓)

1. **Case Study:** MetodologIA documenta resultado → Comercial usa para prospecting
2. **Referral:** Cliente satisfecho refiere otro → Descuento o bono de referral
3. **Upsell:** "Ya tiene Asistente. ¿Necesita Agente para automatizar?" → Siguiente contrato
4. **Soporte Extensión:** Post 30 días, oferta contrato soporte anual (bug fixes, minor updates)

---

**Última revisión:** 2026-03-24
**Próxima revisión:** 2026-09-24 (6 meses)
