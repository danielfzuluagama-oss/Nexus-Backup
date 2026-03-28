---
id: "03"

segmento: "embajadores"
journey: "discovery"
proceso: "descubrir-necesidad"
sop: "sop-03-discovery"
ritual-slug: "03-perfilar-zona-y-dominio"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Growth Lead"
- backup: "AI Agent"
frecuencia: "por-evento (candidate con Fit = Invite)"
herramientas:

- "CRM"
- "Perplexity / NotebookLM"
- "Google Maps"
- "LinkedIn Sales Navigator"
entry-criteria:

- "Candidate con Fit = Invite (Ritual 02)"
- "Zona target preliminar identificada"
- "Mapa de Nodos accesible"

exit-criteria:

- "Zone Profile completo (1 página)"
- "Dominio de expertise documentado"
- "Opportunity sizing estimado"
- "No-overlap con embajadores existentes verificado"
kpi: "Zone Coverage Rate (Target: ≥80% de zonas estratégicas con embajador activo o en pipeline)"
leading-indicators:

- "Tiempo de perfilado por candidate (<60 min)"
- "Fuentes verificadas por perfil (≥3)"
riesgos-controles:

- riesgo: "Zona ya cubierta por otro embajador (overlap)"

control: "Verificar Mapa de Nodos ANTES de invertir en perfilado profundo"

- riesgo: "Zona sin mercado suficiente"

control: "Opportunity sizing objetivo con datos de demanda"

- riesgo: "Dominio demasiado amplio o vago"

control: "Máximo 2 módulos/servicios autorizados inicialmente"
evidencias:

- "Zone Profile Document"
- "Opportunity Sizing Report"
- "Mapa de Nodos actualizado"
---

# Ritual: Perfilar Zona y Dominio — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **Objetivo:** Entender DÓNDE y EN QUÉ va a operar el embajador. La zona puede ser geográfica (Medellín, CDMX) o temática (IA para educación, gestión de proyectos). El dominio define qué módulos/servicios puede entregar.
> **KPI:** Zone Coverage Rate (Target: ≥80%)

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Al confirmar Fit = Invite (Ritual 02).
- **Pre-ritual:** ¿El Mapa de Nodos está actualizado? ¿Hay data de demanda disponible? Si no, actualizar primero.
- **Contexto:** El perfilado de zona es el puente entre "este candidate es bueno" y "este candidate puede operar aquí". Sin zona definida, no hay licencia. Sin opportunity sizing, no hay business case.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Producir un Zone Profile de 1 página que defina: territorio, dominio, oportunidad, y status de overlap.
- **Definición de Éxito (DoD):**
  - [ ] Zone Profile completado
  - [ ] Opportunity sizing con ≥3 fuentes de datos
  - [ ] No-overlap confirmado (o diferenciación documentada)
  - [ ] Candidate validó su zona
- **Definición de Éxito del Candidate:** "Puedo ver exactamente dónde y cómo voy a operar."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Growth Lead | Aprueba Zone Profile final |
| **Responsible** | AI Agent + Growth Lead | Ejecuta investigación y perfilado |

| **Consulted** | Candidate | Valida datos y refina zona |
| **Informed** | Sales Director | Recibe perfil para aprobación de licencia futura |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Fit Assessment completado (Ritual 02)
- [ ] Mapa de Nodos actualizado con embajadores activos
- [ ] Acceso a herramientas de investigación (Perplexity, LinkedIn, Google Maps)
- [ ] Catálogo de módulos/servicios MetodologIA disponible

---

## 5. Ejecutar — Parte 1: Setup y Descubrimiento

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Verificar Mapa de Nodos antes de invertir tiempo

**Contexto:** Si la zona ya está cubierta, investigar overlap ANTES de hacer perfilado profundo. No invertir 60 min de investigación en una zona saturada.

**Acción:** Revisar Mapa de Nodos: ¿hay embajador activo en la zona donde operaría este candidate?
**Output:** Overlap status: Clear / Potential Overlap / Saturated.

**Evidencia:** Nota de overlap check.

### 5.2 — Si overlap: evaluar diferenciación posible

**Contexto:** Overlap no es bloqueador automático — dos embajadores en la misma ciudad pueden coexistir si operan en dominios diferentes (uno en IA para educación, otro en gestión de proyectos).

**Acción:** Si hay overlap: ¿los dominios son diferentes? ¿El mercado es suficiente para dos? Si sí: documentar diferenciación. Si no: reasignar zona o pausar.
**Output:** Decisión: Proceed with differentiation / Reassign zone / Pause.

**Evidencia:** Nota de decisión.

### 5.3 — Definir territorio (geográfico o temático)

**Contexto:** El territorio es el espacio donde el embajador tiene licencia para operar. Puede ser una ciudad, una región, un sector industrial, o un dominio temático.

**Acción:** Basándose en el Fit Assessment y la conversación del Ritual 02: ¿dónde tiene más influencia y más mercado este candidate?
**Script de confirmación con candidate:** "Basándome en nuestra conversación, pienso que tu zona natural es [X]. ¿Estás de acuerdo o ves otra oportunidad?"

**Output:** Territorio definido.
**Evidencia:** Zone Profile — sección Territorio.

### 5.4 — Definir dominio de expertise (módulos autorizados)

**Contexto:** Un embajador no está autorizado a entregar TODOS los módulos — solo aquellos donde demostró competencia. Esto protege la calidad y da espacio para expandir (Ritual 14).

**Acción:** Cruzar la Maestría Metodológica del candidate con el catálogo de módulos. Inicialmente autorizar máximo 2 módulos.
**Output:** Dominio definido con ≤2 módulos iniciales.

**Evidencia:** Zone Profile — sección Dominio.

### 5.5 — Investigar mercado local con IA

**Contexto:** El opportunity sizing debe basarse en datos, no en intuición del candidate.

**Prompt de IA:**

```markdown

PROMPT:
"Investiga el mercado para servicios de consultoría y formación en [dominio] en [zona geográfica].
Analiza:
1. Tamaño estimado de mercado (# empresas y profesionales en el sector)
2. Competencia existente (¿quién más ofrece algo similar?)
3. Tendencias de demanda (¿está creciendo o decreciendo?)
4. Ticket promedio del mercado para servicios similares
5. Barreras de entrada
Formato: 5 bullet points con datos específicos. Fuentes citadas."
```

**Output:** Reporte de mercado de 5 puntos.

**Evidencia:** Reporte guardado en Drive.

### 5.6 — Calcular Opportunity Sizing

**Contexto:** El opportunity sizing estima el potencial de revenue del candidate en su zona. Es la base del business case para la licencia.

**Acción:** Estimar: # clientes potenciales × ticket promedio × frecuencia = Revenue potencial anual.
**Output:** Opportunity sizing en revenue potencial.

**Evidencia:** Zone Profile — sección Opportunity Sizing.

### 5.7 — Mapear competencia local

**Contexto:** La competencia local define la posición del embajador en su mercado. ¿Es el único? ¿Hay sustitutos?

**Acción:** Identificar 2-3 competidores o sustitutos en la zona y documentar su posicionamiento.
**Output:** Mapa competitivo de la zona.

**Evidencia:** Zone Profile — sección Competencia.

### 5.8 — Identificar aliados locales potenciales

**Contexto:** El embajador no necesita operar solo — puede tener aliados locales (co-facilitadores, cámaras de comercio, universidades).

**Acción:** Investigar en LinkedIn si el candidate tiene conexiones con instituciones o profesionales que complementen su oferta.
**Output:** Lista de aliados potenciales.

**Evidencia:** Zone Profile — sección Aliados.

### 5.9 — Compilar Zone Profile de 1 página

**Contexto:** El Zone Profile es el documento que acompaña al candidate hasta la licencia. Debe ser conciso, visual, y accionable.

**Acción:** Compilar: (1) Territorio, (2) Dominio (módulos), (3) Opportunity Sizing, (4) Competencia, (5) Aliados, (6) Overlap Status.
**Output:** Zone Profile de 1 página.

**Evidencia:** Google Doc.

### 5.10 — Validar Zone Profile con el candidate

**Contexto:** El candidate debe ver y aprobar su Zone Profile antes de que se formalice.

**Acción:** Enviar el Zone Profile al candidate para validación.
**Script:** "Te comparto el perfil de tu zona de operación como embajador. Revísalo y dime si hay algo que ajustar — quiero asegurarme de que refleja tu realidad."

**Output:** Zone Profile validado (o ajustado).
**Evidencia:** Confirmación del candidate.

---

## 6. Ejecutar — Parte 2: Alineación y Decisión

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Incorporar ajustes del candidate

**Acción:** Si el candidate sugirió cambios, evaluar e incorporar los que sean válidos (datos locales que no teníamos).

**Output:** Zone Profile final.
**Evidencia:** Doc actualizado.

### 6.2 — Presentar Zone Profile a Sales Director para aprobación

**Acción:** El Sales Director aprueba la zona como viable para licencia.

**Output:** Zone approved / Zone requires adjustment.
**Evidencia:** CRM — nota.

### 6.3 — Verificar que opportunity sizing justifica la inversión

**Contexto:** Si el revenue potencial no justifica la inversión en certificación + IP transfer, pausar o reasignar.

**Acción:** ¿El revenue potencial anual ≥ [mínimo viable]? Si no: conversation honesta con candidate.
**Output:** Business case Go/No-Go.

**Evidencia:** Nota de decisión.

### 6.4 — Actualizar Mapa de Nodos con zona confirmada

**Acción:** Agregar la zona como "In Pipeline" en el Mapa de Nodos.

**Output:** Mapa actualizado.
**Evidencia:** Drive.

### 6.5 — Registrar Zone Profile en CRM

**Acción:** Campos: Zone_Type (geo/tematic), Zone_Name, Domain_Modules, Opportunity_Sizing, Overlap_Status.

**Output:** CRM actualizado.
**Evidencia:** CRM.

### 6.6 — Crear tarea de Ritual 04 (entrevista de alineación)

**Acción:** Programar la entrevista de alineación profunda ahora que la zona está definida.

**Output:** Tarea R04 creada.
**Evidencia:** CRM — tarea.

### 6.7 — Compartir Zone Profile con Content Lead

**Contexto:** Content Lead necesita saber qué módulos preparar para el IP kit del candidate.

**Acción:** Enviar Zone Profile con dominio de modules autorizados.
**Output:** Content Lead informado.

**Evidencia:** Mensaje.

### 6.8 — Documentar insights de investigación para la red

**Acción:** ¿La investigación de mercado reveló algo útil para otros embajadores o para la estrategia general? Registrar.

**Output:** Insight compartido.
**Evidencia:** Log.

### 6.9 — Verificar consistencia con pipeline global

**Acción:** ¿Esta nueva zona cambia la distribución geográfica o temática del pipeline?

**Output:** Pipeline review.
**Evidencia:** Dashboard.

### 6.10 — Registrar métricas de perfilado

**Acción:** Tiempo de perfilado, fuentes usadas, calidad del opportunity sizing.

**Output:** Métricas.
**Evidencia:** Dashboard.

---

## 7. Ejecutar — Parte 3: Ejecución y Producción

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Archivar Zone Profile en Drive

**Acción:** Guardar en carpeta de embajadores con naming: `zone-profile-[nombre]-[zona]-[fecha].md`.

**Output:** Archivo guardado.
**Evidencia:** Drive.

### 7.2 — Enviar confirmación al candidate

**Script:** "[nombre], tu zona de operación está confirmada: [zona] con foco en [módulos]. El siguiente paso es una entrevista de alineación profunda con nuestro Sales Director. Te contacto pronto con la fecha."

**Output:** Candidate informado.
**Evidencia:** CRM — nota.

### 7.3 — Generar brief ejecutivo para Ritual 04

**Acción:** Compilar brief para la entrevista de alineación: Candidate Score + Fit Assessment + Zone Profile.

**Output:** Brief listo.
**Evidencia:** Doc.

### 7.4 — Verificar que todos los documentos están vinculados en CRM

**Acción:** CRM debe tener links a: Candidate Score, Fit Assessment, Zone Profile.

**Output:** CRM completo.
**Evidencia:** CRM review.

### 7.5 — Actualizar dashboard de pipeline

**Acción:** Mover candidate al stage "Zone Profiled" en pipeline.

**Output:** Pipeline actualizado.
**Evidencia:** Dashboard.

### 7.6 — Comparar zones profiles del trimestre

**Contexto:** ¿Hay tendencias en las zonas que atraen candidates?

**Acción:** Revisar zonas perfiladas en el último trimestre.
**Output:** Trend insight.

**Evidencia:** Nota.

### 7.7 — Retroalimentar estrategia de reclutamiento

**Acción:** Si hay zonas de alta demanda sin candidates: alertar al equipo para activar sourcing dirigido.

**Output:** Alerta de gap enviada si aplica.
**Evidencia:** Mensaje.

### 7.8 — Quality check de Zone Profile

**Acción:** ¿El zone profile tiene ≥3 fuentes de datos? ¿El opportunity sizing es realista?

**Output:** QA pass/fail.
**Evidencia:** Nota.

### 7.9 — Verificar que no hay candidates en "perfilado" por más de 14 días

**Acción:** SLA check: ningún candidate debe estar en stage "Zone Profiling" por más de 14 días.

**Output:** SLA check.
**Evidencia:** CRM query.

### 7.10 — Cerrar y registrar aprendizajes

**Acción:** ¿Qué fuentes de datos funcionaron mejor? ¿Qué preguntas al candidate fueron más útiles?

**Output:** Aprendizajes registrados.
**Evidencia:** Log.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Zone Profile completo con 6 secciones
- [ ] Opportunity sizing con ≥3 fuentes de datos
- [ ] No-overlap verificado contra Mapa de Nodos
- [ ] Dominio limitado a ≤2 módulos iniciales
- [ ] Candidate validó su zone profile
- [ ] Sales Director aprobó la zona

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| Zone Profile completo | ☐ | Google Doc |
| Opportunity sizing ≥ mínimo viable | ☐ | Reporte |
| No-overlap o diferenciación documentada | ☐ | Mapa de Nodos |

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Zone Profile | Google Doc | Drive / embajadores | Growth Lead |
| Opportunity Sizing Report | Texto + datos | Zone Profile | AI Agent |

| Mapa de Nodos actualizado | Visual | Drive | Growth Lead |
| Brief para Ritual 04 | Compilación | CRM | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [04-ejecutar-entrevista-alineacion](04-ejecutar-entrevista-alineacion.md)
- **Datos que hereda:** Zone Profile, Candidate Score, Fit Assessment, Opportunity Sizing
- **Condición de handoff:** Zone Profile aprobado por Sales Director + candidate

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Zone Coverage Rate | — | ≥80% | 🟡 |
| Tiempo de perfilado | — | <60 min | 🟡 |

### Cierre

- **NEXT:** `embajadores → 04 → ejecutar-entrevista-alineacion`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Zone Intelligence Engine" (Prompt Pro)

**Use case:** Para investigar zonas rápidamente cuando tienes múltiples candidates.

```markdown
PROMPT:
"Genera un Zone Profile de 1 página para un candidato a embajador MetodologIA en [zona].
Dominio: [módulos/servicios].
Incluye:
1. Tamaño de mercado estimado (# empresas y profesionales en el sector)
2. Competidores o sustitutos (2-3 más relevantes)
3. Tendencias de demanda (últimos 12 meses)
4. Aliados potenciales (instituciones, gremios, universidades)
5. Recomendación: ¿es una zona viable para un embajador? Sí/No + razón.

Formato: documento de 1 página con secciones claras. Fuentes citadas."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
