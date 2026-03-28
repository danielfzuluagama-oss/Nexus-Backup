---
id: "03"

segmento: "empresas-smallbusiness"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "03-enriquecer-perfil-empresa"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "SDR / BDR"
- backup: "AI Agent (Automation)"
frecuencia: "por-evento (SLA < 24h tras la calificación del R02)"
herramientas:

- "CRM (Hubspot/Salesforce)"
- "Perplexity / ChatGPT (Research Agent)"
- "LinkedIn Premium / Sales Navigator"
- "BuiltWith / Datanyze (Technographics)"
entry-criteria:

- "Lead calificado (SMB_Score ≥ 60) en etapa 'Qualified / Discovery Scheduled' (Ritual 02)"
- "Dominio web corporativo y perfil de LinkedIn del contacto disponibles"
exit-criteria:

- "Company Profile One-Pager completado en CRM"
- "Hipótesis de Dolor (Pain Hypothesis) redactada para el AE"
- "Mapa de relaciones (Stakeholders clave) identificado si existe"

kpi: "Enrichment SLA Cumpolido (Target: 100% de los leads enriquecidos 24h previas a la llamada de Discovery)"
leading-indicators:

- "Porcentaje de campos obligatorios completados en el CRM"
- "Precisión de la estimación de Revenue/Tamaño (vs realidad)"
- "Volumen de 'Icebreakers' contextuales generados"

riesgos-controles:

- riesgo: "Síndrome del Parálisis por Análisis (El SDR pierde 4 horas investigando una PyME minúscula)"

  control: "Timeboxing Feroz. Máximo 15 minutos por cuenta. Lo que no se encuentra con IA en 15 mins, se pregunta en la llamada."

- riesgo: "Confiar ciegamente en datos desactualizados de LinkedIn"

  control: "Cross-check de vitalidad: ¿Cuándo fue su última publicación? ¿Tienen vacantes abiertas publicadas el último mes?"

- riesgo: "Ir a ciegas a la llamada de Discovery (El vendedor pregunta '¿y a qué se dedican?')"

  control: "Hard Blocker Ops: El Dashboard del AE no le permite ver el Link de Zoom si el One-Pager de Enriquecimiento no está llenado."
evidencias:

- "Campos de cuenta en el CRM (Industria, Tamaño, Stack Técnico) actualizados"
- "Research Brief (Nota interna) adjunto al Deal"
- "Brief Automático enviado al Account Executive"
---

# Ritual: Enriquecer Perfil de Empresa — Empresas/SmallBusiness (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Small Business
> **Objetivo:** Enriquecer una PyME es radicalmente distinto a una Enterprise. No hay reportes anuales públicos, ni organigramas en la prensa.
> El objetivo no es saberlo todo; es saber lo suficiente para estructurar una Hipótesis Ejecutiva: *¿Por qué una empresa de 35 empleados en esta industria necesita comprar nuestro producto hoy?*

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Inmediatamente después de que un prospecto agenda su llamada de Discovery, o el SDR mueve un Lead saliente a fase 'Qualified'.
- **Pre-ritual:** ¿Las APIs de enriquecimiento automático en el CRM (ej. Clearbit/Apollo) han hecho la primera pasada base?
- **Contexto:** En B2B, el crimen capital de las ventas es preguntarle a un CEO algo que estaba en el primer párrafo de su página web. El Account Executive (AE) debe entrar a la llamada como un consultor estratégico que ya entiende el contexto macro del cliente, dedicando la charla exclusivamente a diagnosticar el dolor interno.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Armar al Account Executive con un "Arma de Inteligencia" (One-Pager) de 15 minutos de preparación, que le permita dirigir la sesión de Discovery desde una posición de autoridad y relevancia absoluta.
- **Definición de Éxito (DoD):**
  - [ ] Datos firmográficos duros (Tamaño, vertical, antigüedad) mapeados.
  - [ ] Contexto situacional (Crecimiento, estancamiento, contrataciones) detectado.
  - [ ] Icebreaker comercial altamente personalizado diseñado.
  - [ ] Paquete de inteligencia inyectado al CRM.
- **Definición de Éxito del Vendedor (AE):** "Leí el brief 10 minutos antes de la llamada. Entré sabiendo que acaban de abrir operaciones en Colombia y que usan un CRM viejo. Rompí el hielo con eso, el CEO sintió que lo conocía de años, y el trato avanzó al doble de velocidad."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | SDR Manager | Velocidad y cobertura del enriquecimiento pre-llamada |
| **Responsible** | SDR / AI Agent | Ejecución táctica del research y llenado del CRM |

| **Consulted** | Account Executive | Demandar mayor profundidad si el Deal es Ticket Alto y el Brief es pobre |
| **Informed** | Marketing | Analizar tendencias agregadas de las cuentas enriquecidas |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Plantilla del "Company One-Pager" estandarizada como Propiedad/Objeto en Hubspot/Salesforce.
- [ ] Prompts de Perplexity corporativos afinados para extraer 'Firmographics'.
- [ ] Tool de Technographics (Ej. BuiltWith) lista para ver si usan plataformas competidoras.

---

## 5. Ejecutar — Parte 1: Inteligencia Artificial Rápida (Macro)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Disparo Automático (Primer Vaciado)

**Acción:** Herramienta nativa de CRM usa el Dominio Web para poblar Industry, Revenue Range, Year Founded.

**Output:** Base de datos gris.

### 5.2 — Extracción Inteligente con AI Agent (Perplexity/ChatGPT)

**Acción:** SDR inyecta la URL en el Prompt Institucional. "Resume qué venden, su propuesta de valor única, y nombra a sus top 3 competidores nacionales."

**Output:** Resumen Ejecutivo (El "Qué Hacen").

### 5.3 — Technographics Scan (Rayos X Tecnológicos)

**Acción:** (Si aplica) Escanear el dominio para ver qué herramientas pagan. ¿Pagan Shopify Plus? Tienen presupuesto. ¿Usan WordPress gratis? Ticket promedio bajo.

**Output:** Contexto de sofisticación de la PyME.

### 5.4 — Análisis del Decision Maker (El CEO/Dueño)

**Acción:** Escanear el perfil de LinkedIn del Decisor. ¿Es un Founder Técnico o Administrativo? ¿Tiene años en la industria o es joven agresivo?

**Output:** Psicografía del Comprador.

### 5.5 — Análisis de Tensión Operativa (Hiring)

**Acción:** Revisar pestaña "Empleos" de la empresa. Si buscan "Gerente de Operaciones", la empresa está sufriendo dolores de estructura. Si buscan 10 "Vendedores", buscan crecimiento agresivo.

**Output:** Vector de Dolor Corporativo.

### 5.6-5.10 — [Validación de presencia en noticias/PR, detección de subsidiarias o dependencias, rastreo de alianzas estratégicas publicadas, cruce de datos financieros públicos en su país (si aplica), consolidación macro del One-Pager]

---

## 6. Ejecutar — Parte 2: Formulación Estratégica ("The Why")

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Redacción de la Hipótesis del Dolor (Pain Hypothesis)

**Acción:** Unir los puntos. "Son una agencia de 30 personas, acaban de perder a su Director Creativo y contratan mucho talento Junior." -> *Hipótesis: Necesitan un programa de Onboarding porque los Seniors no tienen tiempo de entrenar a los Juniors.*

**Output:** Tesis de Venta.

### 6.2 — Forjado del Icebreaker (El Rompehielo)

**Acción:** SDR diseña la frase de apertura para el Vendedor.

**Script Ej:** "Noté en LinkedIn que celebraron 5 años la semana pasada, felicidades. Y vi que están transicionando al modelo remoto."
**Output:** Relacionamiento (Rapport) instantáneo.

### 6.3 — Mapeo de Posibles Bloqueadores (Stakeholders Fantasma)

**Acción:** En una PyME, si el CEO domina todo pero tiene un "Director Financiero" o un "Socio Oculto", eso frenará el cierre. SDR intenta rastrear si existe un Co-Founder silencioso en LinkedIn.

**Output:** Estrategia de evasión de objeciones.

### 6.4 — Estimación de Presupuesto Real Ajustado

**Acción:** Refinar el SMB_Score (R02). Si la web está rota, el budget es 'Cero' aunque tengan 50 empleados. Si tienen la web espectacular y patrocinan foros, el presupuesto es sano.

**Output:** Calibración final del Ticket Esperado.

### 6.5 — Inserción en Propiedades Custom (CRM)

**Acción:** Alimentar la ficha de Cuenta. Pegar el "One-Pager" en el panel fijado superior de Hubspot/Salesforce.

**Output:** Trazabilidad operativa duradera.

### 6.6-6.10 — [Configuración de alertas si la empresa menciona a la competencia en el intertanto, atado de notas de prensa al Deal, taggeo de sector económico profundo, envío de alerta a Marketing si es de un sector sin Casos de Éxito, auditoría ortográfica del perfil (para evitar que el CRM envíe correos mal programados a 'Empresa S.L.')]

---

## 7. Ejecutar — Parte 3: Traspaso de Inteligencia y Gobernanza

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Notificación de Payload al Account Executive

**Acción:** "Ping" automático en Slack/Teams al AE asignado: `@diego / Deal: EmpresaX / Research Listo / Hypothesis: Pain en Onboarding`.

**Output:** Activación del Vendedor.

### 7.2 — '10-Minute Prep' del AE (Día de la Llamada)

**Acción:** El Vendedor DEBE leer el One-Pager oficial 10 mins antes de entrar al Zoom.

**Output:** Calibración mental del AE.

### 7.3 — Verificación Cruzada del Vendedor

**Acción:** El AE verifica rápdiamente si el Research del SDR hace sentido o si hay vacíos pidiendo una rápida iteración.

**Output:** Auto-corrección del escuadrón comercial.

### 7.4 — Bloqueo Preventivo del Pitch "Enlatado"

**Acción:** Las notas exigen que el AE conecte el Slide #4 de MetodologIA con el dolor de "Contratación de Juniors" detectado. Prohibido usar el Deck genérico.

**Output:** Presentación Boutique garantizada.

### 7.5 — Feedback Post-Llamada al SDR

**Acción:** El AE le dice al SDR: "La hipótesis fue perfecta, di en el clavo" o "Nada que ver, su dolor real era otro".

**Output:** Inteligencia de Máquina mejorada.

### 7.6-7.10 — [Limpieza de 'Dead Links' en el CRM, actualización de la base de datos maestra con insights reales tras la llamada, consolidación del Time-to-Enrichment para evitar retrasos, reporteo de calidad de leads]

---

## 8. Validación y Calidad (QA)

- [ ] Prohibición del Análisis Profundo Innecesario: El SDR no debe armar un PDF de 20 páginas de una empresa de 15 personas. El One-Pager es un archivo TXT de 5 bullets. Velvet-speed.
- [ ] Regla de "No Leer el Sitio Web en Voz Alta": El AE no debe usar el Research para decir "Vi que hacen X, Y y Z". Eso suena a bot. Debe usar el Research para decir: "Asumo que como hacen X su problema debe ser Y."
- [ ] Data Limpia es Data Santa: Jamás llenar un campo del CRM con "Info Desconocida". Si no se sabe, queda vacío para que el sistema obligue al AE a preguntar en vivo.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Enriched One-Pager | Nota Anclada | CRM Account View | SDR |
| Hipótesis de Dolor | Campo de Texto | Deal Record | SDR |
| Alerta Caleidoscópica| Notificación | Slack de Ventas | Sistema |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [04-ejecutar-discovery-con-ceo](04-ejecutar-discovery-con-ceo-ritual.md)
- **Condición de handoff:** El Account Executive tiene una radiografía asimétrica del prospecto. Entra a la llamada como una autoridad lista para desafiar al CEO, no como un novato haciendo preguntas interrogatorio de censo poblacional.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Time-to-Enrich (SLA) | < 2 horas post Cita | 🟡 |
| Research Accuracy Hit | > 80% post-llamada | 🟡 |

- **NEXT:** `empresas-smallbusiness → 04 → ejecutar-discovery-con-ceo`
- **BLOCKERS:** `PyMEs "Fantasma" que ocultan totalmente su presencia digital y empleados para evitar impuestos/outsourcing`

---

## Modal 10x: El "One-Pager Research AI" (Prompt Pro)

**Use case:** Tienes agendada a la PyME "Tecnologías Acme S.A.". Tienes su URL web y sabes que tienen unos 25 empleados. Entras en 30 minutos a la llamada y necesitas munición.

```markdown
PROMPT:
"Actúa como Analista de Inteligencia Corporativa e Investigador Forense B2B.
Aquí está el dominio del prospecto: [URL] y su LinkedIn: [URL LNKD].
Ejecuta tu rutina de Enriquecimiento y devuélveme un ONE-PAGER de lectura de 2 minutos máximo, con esta estructura exacta militar:
1. FIRMOGRAPHICS ROUNDUP: ¿Qué hacen resumido en 1 frase entendible por un niño de 10 años? Tipo de modelo (B2B/B2C).
2. TRAYECTORIA Y TAMAÑO: Antigüedad aproximada y señal de crecimiento (¿Están de capa caída o contratando a manos llenas?).
3. THE PAIN HYPOTHESIS: Infiere 2 dolores operativos masivos que una empresa de ese tamaño exacto, en esa industria exacta, DEBE estar sufriendo a la sombra en este instante (Sé específico, no digas 'falta de ventas', di 'cuellos de botella del fundador').
4. EL ICEBREAKER: Dame 1 frase táctica que mi vendedor debe decir en el primer minuto para ganarse el respeto del CEO instantáneamente por haber hecho la tarea."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Small Business
> **Powered by:** MetodologIA Governance Protocol
