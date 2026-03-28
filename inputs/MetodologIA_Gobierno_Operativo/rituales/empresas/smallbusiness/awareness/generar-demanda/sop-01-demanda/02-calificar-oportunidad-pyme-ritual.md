---
id: "02"

segmento: "empresas-smallbusiness"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-calificar-oportunidad-pyme"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Account Executive (AE) / Sales Lead"
- backup: "SDR / BDR"
frecuencia: "continua (SLA de 2 horas tras recepción de señal)"
herramientas:

- "CRM (Pipeline de Calificación)"
- "Perplexity / Clay (Data Enrichment)"
- "Herramienta de Agendamiento (Calendly/ChiliPiper)"

entry-criteria:

- "Lead con Señal de Necesidad (Need Signal) registrado en CRM (Ritual 01)"
- "Fuente y contexto documentado"
exit-criteria:

- "Oportunidad puntuada en Criterios BANT (Budget, Authority, Need, Timing)"
- "Decisión de descarte (Disqualified), nutrición (Nurture) o paso fluido a Discovery (Qualified)"
- "Agendamiento de llamada exploratoria conseguido (para los Qualified)"

kpi: "Sales Qualified Lead (SQL) Conversion Rate (Target: ≥40% de MQLs avanzan a SQL)"
leading-indicators:

- "Tiempo Medio de Respuesta (SLA < 2 horas en horario comercial)"
- "Tasa de Agendamiento D1 (Discovery meeting agendada al primer toque)"
- "Porcentaje de Disqualified por 'No Presupuesto'"

riesgos-controles:

- riesgo: "Síndrome de 'Hopium' (Dejar leads basura en pipeline por esperanza irracional de que comprarán)"

  control: "Criterio de Descalificación Feroz. Menos de 40 puntos en SMB_Score se bloquea instantáneamente y pasa a marketing masivo."

- riesgo: "Contactar a Mando Medio sin poder adquisitivo en lugar del CEO (Error fatal en PyMEs)"

  control: "Check de Autoridad Obligatorio. En empresas < 50 empleados, si no hay CEO/Dueño en el deal, el deal no avanza de etapa."

- riesgo: "Persecusión acosadora al tratar de agendar la llamada"

  control: "Double-Touch System: Toque 1 valora el dolor. Toque 2 invita a sesión consultiva no comprometida. Tono hiper-profesional."
evidencias:

- "SMB_Score documentado en la ficha técnica del CRM"
- "Registro de decisión (Win/Loss de calificación preliminar)"
- "Llamada de Discovery agendada y aceptada en calendario"
---

# Ritual: Calificar Oportunidad PyME — Empresas/SmallBusiness (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Empresas / Small Business
> **Objetivo:** La calificación no sirve para aceptar clientes, sirve para descartarlos rápido. En B2B PyME, el recurso más caro es el tiempo del vendedor o consultor experimentado.
> Calificar ferozmente protege el ancho de banda para las oportunidades de 6 cifras y evita trabajar gratis haciendo propuestas que no se van a poder pagar.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Inmediatamente al recibir un Lead calificado como "MQL" proveniente del R01.
- **Pre-ritual:** ¿Existe claridad absoluta en el umbral mínimo de facturación/empleados que exige el precio de nuestro producto?
- **Contexto:** Es muy común que micro-emprendedores envíen señales de dolor ("Ayuda, no vendo"). Estos no son PyMEs consolidadas. Intentar venderles consultoría o plataformas corporativas es desgastante y terminará en quejas por precio alto. La calificación (BANT/MEDDIC lite) separa la aspiración de la capacidad de compra real.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Filtrar matemáticamente el caudal de ruido entrante, validando si la Señal de Necesidad cuenta con el Presupuesto (Abolity), la Autoridad, la Necesidad estructurada y el Timing necesario para justificar una inmersión completa (Discovery).
- **Definición de Éxito (DoD):**
  - [ ] Contexto del lead pre-investigado.
  - [ ] Metodología de Scoring (BANT u otra) aplicada en base a información cruzada.
  - [ ] Determinación binaria clara de Go / No-Go (Qualified / Nurturing / Dropped).
  - [ ] Llamada/Siguiente Paso orquestado exitosamente con prospectos cualificados.
- **Definición de Éxito del Lead:** "Recibí un contacto ultra-eficiente donde me validaron en 2 minutos si mi empresa tenía el tamaño y la problemática correcta para trabajar con ellos, sin hacerme perder media hora en una llamada inútil."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Proteger la calidad y win-rate del pipeline en sus fases iniciales |
| **Responsible** | Account Executive / SDR Sr | Calificar y separar la paja del trigo con precisión quirúrgica |

| **Consulted** | Growth Lead | Evaluar si las campañas traen Caca leads o Leads Calificados |
| **Informed** | Product Delivery | Para alertar si entran perfiles fuera de ICP forzando la ingeniería |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Matriz de Scoring configurada en CRM (O en tabla manual) para SMBs.
- [ ] Definición estricta de "Disqualification Criteria" (Ej: 'Freelancers', 'Startups Pre-revenue', 'Consultoras Unipersonales').
- [ ] Argumentarios (Scripts) de Descalificación Suave (Cómo decir 'No eres fit' derivándolos a un infoproducto B2C y dejándolos felices).

---

## 5. Ejecutar — Parte 1: El Diagnóstico Estructural (Scoring)

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Triage Inbound (Primeros 15 mins)

**Acción:** AE revisa el MQL asignado. Cruzar dominio web y LinkedIn del founder.

**Output:** Contexto base adquirido (Evitar hacerle preguntas en vivo que Google responde en 10s).

### 5.2 — Evaluación 'Need' (0-40 Puntos)

**Criterios:** ¿El dolor encaja en nuestros 3 casos de uso principales? ¿Genera un sangrado económico o es un "Nice to have"?

**Acción:** Asignar puntaje hipotético leyendo la señal (R01).
**Output:** Need Score.

### 5.3 — Evaluación 'Ability/Presupuesto' (0-30 Puntos)

**Criterios:** PyME > 10 empleados = Nómina >$X. Por proxy, ¿tienen capacidad para un fee de $Y USD Mensuales? ¿Han usado agencias/software antes?

**Acción:** Asignar puntaje proxy (LinkedIn Insights + Perplexity).
**Output:** Presupuesto estimado.

### 5.4 — Evaluación 'Authority' (0-30 Puntos)

**Criterios:** ¿El contacto es CEO, Propietario o Director General? En empresas <50 personas, los Directores RH recomiendan, pero NO firman cheques grandes de consultoría solos.

**Acción:** Validar Rol de quien emitió la señal.
**Output:** Autoridad Confirmada / Mapeo de Ruta al CEO.

### 5.5 — Cálculo de SMB_Score Final

**Acción:** Sumatoria Ponderada = Need + Ability + Authority.

**Output:** Clasificación paramétrica generada.

### 5.6 — Decisión de Corte: Qualified (≥ 60)

**Acción:** Lead es apto para proceso Consultivo High-touch. Pasa a flujos de priorización máxima.

**Output:** Deal activo.

### 5.7 — Decisión de Corte: Develop / Nurturing (40-59)

**Acción:** Existe Dolor, pero falta madurez (presupuesto inestable o autoridad confusa).

**Output:** Enviar al CRM a campaña automatizada a largo plazo. No invertir tiempo de ventas 1v1 constante.

### 5.8 — Decisión de Corte: Not Fit (< 40)

**Acción:** Cerrar Deal. Motivo: `No-Fit (Size/Budget)`.

**Output:** Pipeline Purificado.

### 5.9 — El 'Soft Disqualification' / Downsell

**Acción:** A los Not-Fit se les contacta: "Hola [X], somos especialistas pero requieren presupuesto corporativo. Sin embargo, para tu etapa, entra a nuestro segmento de 'Personas/Masivo' que te salvará la vida por un décimo del costo [Link B2C]".

**Output:** Monetización del rechazo.

### 5.10 — Actualización Formal de Etapa de Negocio (CRM)

**Acción:** Status avanza a 'Targeting / Contacted'.

**Output:** Métricas alineadas.

---

## 6. Ejecutar — Parte 2: Interceptación y Primer Toque Caleidoscópico

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Preparación del "Gancho Consultivo"

**Acción:** Formular la Hipótesis del Dolor. "No le voy a pedir reunión para mostrarle la empresa. Voy a pedir reunión porque noté un riesgo operativo de escala en él."

**Output:** Tesis de prospección lista.

### 6.2 — Primer Toque Asíncrono (Día 0)

**Acción:** Correo ultra-conciso (o mensaje directo de ventas si es vía Linkedin).

**Script Base:** "Hola Diego, vi el post donde buscaban perfiles Sr por la alta rotación técnica. En agencias de ese tamaño (30 pax) solemos ver que el problema no es el recruiting, sino el onboarding. Si armamos un mapa de brechas de onboarding para ustedes, ¿tendrían 15 min el martes para verlo?"
**Output:** Gancho enviado y trackeado en CRM (Copia CC para trazabilidad).

### 6.3 — Revisión de Aperturas / CTR (Día 1)

**Acción:** Si abrieron el correo MÁS de 2 veces o hicieron clic, la intención es altísima.

**Output:** Alerta de SDR de Interés Temprano.

### 6.4 — Seguimiento 'Value Bumper' (Día 2 - Si no respondió)

**Acción:** Email número 2 en el mismo hilo. Sin recriminar. Sumando valor.

**Script Base:** "Diego, te sumo algo para contexto rápido. Una checklist de 1 pag de cómo filtramos ese perfil de rotación que mencionaste. Si te sirve armar un proceso robusto sobre esto, avísame." (Link al Notion).
**Output:** Persistencia Inteligente.

### 6.5 — Respuesta Positiva: Despliegue del Cierre de Agendamiento

**Acción:** El lead responde: "Me interesa".

**Respuesta Inmediata:** Disparar Calendly o agenda asimétrica ("Genial. Elige horario aquí: [Link] o sugiero Jueves 10 AM, y yo me adapto").
**Output:** Cierre Logístico.

### 6.6-6.10 — [Respuesta a Objeciones iniciales de "Estoy muy ocupado" con "Justamente es para ahorrarte horas", confirmación automática de calendar, recordatorio automático a las 24 y 2 hrs, actualización de Deal Amount hipotético]

---

## 7. Ejecutar — Parte 3: Transición al Discovery y Gobernanza del Pipeline

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Briefing de Traspaso (SDR to AE) (Solo si aplica)

**Contexto:** En equipos grandes, el que califica no siempre es el que ejecuta la Demo.

**Acción:** El SDR consolida en Notas internas: Objeto de interés, barreras percibidas, tamaño del ego del dueño.
**Output:** Handover Contextual Listo.

### 7.2 — Confirmación de Cita con Micro-Pre-Work

**Acción:** Mandar al prospecto (al aceptar reunión) una pequeña misión no obligatoria.

**Script:** "Para que la sesión sea híper rentable para ti, podrías tener a mano (pero no enviarme) el % de rotación o el costo del problema que enfrentan. Nos enfocaremos agresivamente en la solución en la llamada."
**Output:** Prospecto "Seteado mentalmente" (Pre-framing).

### 7.3 — Verificación de Asistencia de Stakeholders Secundarios

**Acción:** Asegurar que si el CEO es el Decisor pero la molestia es técnica, invite a su CTO o HR Lead para ahorrar un segundo ciclo (Discovery múltiple preventivo).

**Output:** Agenda Optimada.

### 7.4 — Consolidación de Calificación Final

**Acción:** Mover el Deal en CRM de `Qualifying` a `Discovery Call Scheduled`.

**Output:** Reflejar tasa de SQL (Sales Qualified Leads) Oficial.

### 7.5 — Feedback Loop Inverso a Marketing/Growth

**Acción:** Si de cada 10 leads, 8 fueron Not-Fit por "Falta de Presupuesto", alertar inmediatamente al R01 y a Marketing que las campañas están atrayendo Startups Bootstrapped en lugar de PyMEs Maduras. Redirigir Segmentación urgéntenamente.

**Output:** Ahorro de Capital Publicitario o tiempo operativo.

### 7.6-7.10 — [Registro de SLAs, Auditorías del embudo de descalificación por Sales Lead para evitar 'lazy reps' matando deals buenos, reportes gerenciales, consolidación de cohortes de entrada]

---

## 8. Validación y Calidad (QA)

- [ ] Integridad BANT: Asegurar que TODO lead movido a Fase Discovery tenga los 3 criterios mayores (Need, Presupuesto estimado, Autoridad del contacto en pipeline) rellenados explícitamente en campos del software.
- [ ] Etiqueta Profesional: No se aceptan descalificaciones groseras o fantasmas (Ghosting). Un prospecto no cualificado debe recibir un "No" elegante acompañado de material gratuito gratuito. La marca se protege.
- [ ] Seguimiento Caleidoscópico: No se califica quemando puentes. Quizás hoy la Startup pre-revenue no tiene presupuesto corporativo, pero si logra su Serie A será objetivo claro. Se la descarta amablemente, y se agenda follow-up a 9 meses.

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Disqualification Wall | Dashboard Drop | CRM Analíticas | Sales Lead |
| Pipeline Cualificado | Deals en etapa 'Discovery' | CRM Tablero | AE |
| Citas Confirmadas (SQLs)| Evento Digital | GCal / O365 | AE / SDR |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [03-enriquecer-perfil-empresa](../discovery/descubrir-necesidad/sop-03-discovery/03-enriquecer-perfil-empresa-ritual.md) O re-circulación B2C si desciende de target.
- **Condición de handoff:** Existe un encuentro oficial acordado en tiempo en un canal digital o presencial. AE ya sabe quién es el prospecto, porqué sufre y a nivel directivo cuán solvente parece el Deal.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| MQL to SQL Win-Rate | ≥ 40% a nivel embudo | 🟡 |
| No-Show Citas (D1) | < 15% cancelan agendamiento | 🟡 |

- **NEXT:** `empresas-smallbusiness → 03 → enriquecer-perfil-empresa`
- **BLOCKERS:** `Problemas detectados al tratar de hablar con Decisores; barrera instalada por Executive Assistants.`

---

## Modal 10x: El "BANT Proxy Constructor" (Prompt Pro)

**Use case:** Te pasaron la URL de la web y de LinkedIn de una PyME B2B de Marketing pero no sabes si tienen el presupuesto de $20,000 USD que requiere tu programa. No quieres llamar a preguntar "oiga, cuánta plata tiene" porque te van a colgar. Necesitas un Perfil Financiero por Proxy.

```markdown
PROMPT:
"Actúa como un Especialista en Venture Capital y Due Diligence B2B.
Tengo el perfil de esta empresa [Copiar/Pegar el texto público sobre la empresa, la URL, años y número de empleados].
Mi objetivo es venderles un servicio ticket alto ($10,000 as a one-off). Quiero hacerle un Scoring a su Presupuesto BANT en la sombra sin hablar con ellos.
Analiza sus señales observables: Antigüedad de la empresa vs Crecimiento de plantilla. Ubicación HQ vs Apertura de sedes. Nivel de 'Glamour' Corporativo Invertido asomado en sus páginas de empleo. Ofertas de vacantes recientes activas.
Redáctame un perfil de Hipótesis Financiera corto estipulando su probabilidad real de tener caja libre, y en caso afirmativo, dame un guion (Hook de valor corporativo de 4 líneas) enfocado al CEO o dueño para un toque inicial en LinkedIn."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Empresas / Small Business
> **Powered by:** MetodologIA Governance Protocol
