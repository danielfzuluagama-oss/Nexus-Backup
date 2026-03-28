---
id: "11"

segmento: "personas-masivo"
journey: "success"
proceso: "gestionar-exito"
sop: "sop-11-success"
ritual-slug: "11-medir-adopcion-contenido"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Growth / CX Lead"
- backup: "Content Lead"
frecuencia: "semanal (análisis automatizado) + mensual (auditoría forense)"

herramientas:

- "LMS Analytics (Teachable/Kajabi/Kajabi/Notion)"
- "CRM Dashboard"
- "Looker / Google Data Studio"

entry-criteria:

- "Cohorte de clientes completó sus primeras 2 semanas en el programa (Post R10)"
- "Volumen de datos de visualización e interacción disponible"
exit-criteria:

- "Health Score calculado por cada cliente activo"
- "Segmentación ejecutada (Champions, Active, At-Risk, Dormant)"
- "Disparo de intervenciones automatizadas a grupos de riesgo"

kpi: "Content Adoption Score (Target: ≥60% de la base mantiene engagement >50%)"
leading-indicators:

- "Login Frequency (Dias desde el último login)"
- "Task Completion Rate (Ratio Tareas/Videos Vistos)"
- "Community Post Ratio (Clientes que escriben vs Clientes que solo leen)"

riesgos-controles:

- riesgo: "Confundir Vanity Metrics (Video views) con Adopción real (Ejecución)"

  control: "El algoritmo del Adoption Score pondera más la entrega de tareas (50%) que la visualización pasiva de videos (25%)."

- riesgo: "Reaccionar tarde al Churn (El cliente pide refund antes de que notemos que no entra)"

  control: "Alerta automática en Slack interno si un cliente 'Premium' pasa 10 días sin loguearse en el primer mes."

- riesgo: "Parálisis por análisis (Mucha data, cero acción)"

  control: "El dashboard solo tiene 3 colores (Verde, Amarillo, Rojo) atados a Playbooks de Rescue específicos."
evidencias:

- "Dashboard de Salud de Cohorte actualizado"
- "Listado Forense de Drop-Off points en el contenido"
- "Rescue emails enviados a clientes 'At-Risk'"
---

# Ritual: Medir Adopción de Contenido — Personas Masivo (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Personas Masivo
> **Objetivo:** Adopción no es "cuánta gente ve mis videos", es "cuánta gente está cambiando su comportamiento basándose en mi producto".
> En productos masivos, el silencio del cliente no es aprobación, a menudo es abandono. Este ritual es el radar que convierte los datos crudos del LMS en inteligencia de retención accionable.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** El motor de analítica corre en background permanentemente, pero el Ritual de gobierno (lectura y decisión) se ejecuta todos los viernes.
- **Pre-ritual:** ¿Las APIs entre el LMS (donde están viendo el curso) y el CRM (donde gestionamos su ciclo de vida) están mapeando correctamente los "Completion Flags"?
- **Contexto:** En B2B, el Success Manager llama al cliente por Zoom. En B2C Masivo, el Success Manager es un algoritmo que lee telemetría silenciosa. Si notas que 400 personas dejaron de ver el curso exactamente en el minuto 4:15 del Módulo 3, no tienes un problema de clientes flojos, tienes un problema de diseño de contenido que requiere cirugía inmediata.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Cuantificar el verdadero nivel de compromiso de la base de clientes y accionar intervenciones programáticas para salvar a los rezagados y potenciar a los promotores.
- **Definición de Éxito (DoD):**
  - [ ] Adoption Score calculado y actualizado para el 100% de la base activa
  - [ ] Nudges (empujoncitos) automatizados disparados a la cohorte 'Amarilla'
  - [ ] Reporte de "Puntos de Fricción de Contenido" enviado al Content Lead
  - [ ] Identificados los candidatos a Casos de Éxito (Cohorte 'Verde')
- **Definición de Éxito del Lead:** "Pensé que era un número más, pero el sistema se dio cuenta de que me quedé trabado en la plantilla financiera y me mandó un recurso extra justo a tiempo."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | CX Lead | Tasa global de retención y finalización del programa |
| **Responsible** | Data / Ops | Mantener el dashboard de adopción libre de latencia |

| **Consulted** | Content Lead | Para re-grabar o ajustar módulos con alto drop-off |
| **Informed** | Growth Lead | Impacto de la adopción en la tasa de Up-sell / Cross-sell |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] LMS Analytics Tool integrada y funcional (Ej. Mixpanel, Amplitude o nativa).
- [ ] Fórmula de "Customer Health Score" validada en el CRM.
- [ ] Templates de email "Rescue" redactados.
- [ ] Criterios de Drop-Off estadísticamente significativos definidos (Ej. >15% de caída en un solo video es alerta).

---

## 5. Ejecutar — Parte 1: Ingesta de Datos y Scoring

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Extracción Semanal de Telemetría (Viernes)

**Acción:** El sistema (o analista) exporta los logs crudos del LMS. Variables clave: Last Login Date, Total Videos Watched, Modules Completed, Quizzes Passed.

**Output:** Dataset de adopción crudo.

### 5.2 — Extracción de Telemetría Comunitaria

**Acción:** Extraer métricas de la plataforma social (Discord/Circle). Variables clave: Posts creados, Comentarios hechos, DM's enviados.

**Output:** Dataset de engagement social.

### 5.3 — Cálculo Motorizado del Health Score

**Acción:** Correr el algoritmo (Content 30% + Tareas 50% + Comunidad 20%).

**Regla:** Un cliente que vio el 100% de los videos pero no hizo tareas tiene peor Health Score que uno que vio el 40% de los videos y completó todas sus tareas asignadas.
**Output:** `Health_Score` (0-100) por cliente actualizado en CRM.

### 5.4 — Segmentación Trinivel Automática

**Acción:** El CRM distribuye etiquetas basándose en el score de hoy.

- **Champions (>80):** Terminan rápido, participan, entregan.
- **Active (40-79):** Ritmo normal, silenciosos pero consistentes.
- **At-Risk (<40):** 7+ días sin entrar, cero tareas entregadas.

**Output:** Base de datos segmentada por salud.

### 5.5 — Análisis de "Puntos de Sangrado" (Content Forensics)

**Acción:** Olvidar a las personas, mirar a los activos. Buscar el "Drop-off Rate" por video. Si el Módulo 2 Lección 3 tiene una caída de retención del 60% en el minuto 4:00, hay un problema grave (Ej. audio malo, teoría incomprensible, link roto).

**Output:** Flag de Contenido Peligroso.

### 5.6 — Disparo de Rescue Automático (Cohorte At-Risk)

**Acción:** El CRM envía correo táctico a los <40.

**Script:** "Llevas unos días en pausa. En la universidad está bien sentarse atrás, pero aquí viniste por un resultado. Si el módulo [Último módulo visitado] te trabó, dímelo respondiendo este email. Te voy a pasar un atajo."
**Output:** Campaña de rescate iniciada.

### 5.7 — Derivación de los Champions (Aislamiento de Promotores)

**Acción:** Los >80 son separados. Se detienen los correos de "tienes que estudiar" y se cambian por correos de "eres un rockstar".

**Output:** Lista de candidatos para R12 y R13.

### 5.8 — Reporte Forense al Content Lead

**Contexto:** Marketing no puede escalar un producto roto.

**Acción:** Enviar breve Slack/Email con los "3 peores videos de la semana".
**Mensaje:** "El video de Finanzas está matando la adopción. Corten la explicación teórica y re-súbanlo con 5 minutos directos al grano."

**Output:** Feedback loop de producto.

### 5.9 — Conciliación de Cohortes (Lifetime Adopton)

**Acción:** Comparar ¿La cohorte de Febrero está adoptando el contenido un 10% más rápido que la de Enero gracias al nuevo Onboarding (R09)?

**Output:** Insight estratégico macro.

### 5.10 — Consolidación de Dashboard R11 Semanal

**Output:** PDF o Link de Looker actualizado. **Evidencia:** KPI general reportado al equipo.

---

## 6-7. Ejecutar — Parte 2 y 3: Micro-Intervenciones y Pruning

### 6.1-6.5 — Intervención "Hard Rescue" (Llamada manual o WA personal del founder a un cliente perdido cuyo LTV justifique el esfuerzo)

### 6.6-6.10 — "Pruning" (Poda) de inactivos de la Comunidad. Quien no se loguea en 30 días, pierde acceso temporal al canal de chat principal para no diluir la cultura de ejecución de los activos

### 7.1-7.5 — Testear un "Skip Button" para lecciones con alto drop-off, a ver si el problema es que el contenido es demasiado básico para un perfil experto

### 7.6-7.10 — Actualizar ponderaciones del Health Score basado en la correlación real con refounds (ej. Si el 90% de los refunds vienen de gente que no entró al Discord, el peso del Discord sube estructuralmente)

---

## 8. Validación y Calidad (QA)

- [ ] Cero falsos positivos: El tracker de video no debe contar "visto" si el cliente simplemente saltó al final del video y lo cerró. Debe medir "Tiempo continuo de reproducción".
- [ ] No acosar: Si un lead cae en At-Risk, y el Rescue Email no es respondido, no enviamos 5 correos más suplicándole que estudie. Pasa a Dormant.
- [ ] Los reportes forenses de contenido deben ser obligatorios antes de plantear la filmación de un nuevo curso. (No creas nuevos productos si no sabes por qué la gente no termina este).

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Health Segments | CRM Lists | ActiveCampaign / HubSpot| Data / CX Lead |
| Content Drop-off | Analytics View | LMS | Ops |
| Rescue Campaigns | Email Log | CRM | Growth Lead |

---

## 10. Cierre y Handoff

- **Siguiente ritual:** [12-co-crear-con-genai](12-co-crear-con-genai-ritual.md) O [13-auditar-satisfaccion-nps](../sop-13-nps/13-auditar-satisfaccion-nps-ritual.md).
- **Condición de handoff:** Sabemos exactamente, con precisión quirúrgica matemática, quién está triunfando con nuestro material y quién se está rindiendo. El sistema intervino al segundo grupo y aisló al primero para la siguiente fase.

| Indicador | Target | Estado |
| :--- | :--- | :--- |

| Active User Ratio | ≥60% con Score >50 | 🟡 |
| Cohort Rescue Rate | ≥15% retoman tras email| 🟡 |

- **NEXT:** `personas-masivo → 12 → co-crear-con-genai`
- **BLOCKERS:** `Problemas de lectura de API en el LMS no permiten datos en tiempo real`

---

## Modal 10x: El "Adoption Health Analyzer" (Prompt Pro)

**Use case:** Tienes un dump CSV crudo de 5,000 usuarios de tu LMS y necesitas priorizar la intervención de rescate antes del fin de semana. No tienes tiempo de armar el dashboard en Looker.

```markdown
PROMPT:
"Actúa como Data Scientist Especializado en Customer Success B2C.
Aquí tienes un payload (CSV) crudo con la telemetría de mi cohorte de estudiantes de este mes.
Columnas: [UserID, Dias_Desde_Ultimo_Login, Porcentaje_Videos_Vistos, Tareas_Entregadas (0-1)].
Calcula un Health Score Normalizado de 0 a 100 para cada fila usando esta regla:

- 50 puntos si Tareas_Entregadas = 1 / 0 puntos si = 0.
- 0.3 puntos por cada 1% de videos vistos (Max 30pts).
- 20 puntos si Dias_Desde_Ultimo_Login < 4 / 0 puntos si es > 4.

Devuélveme exclusivamente las filas de los 'At-Risk' (Score < 40) ordenados de mayor LTV (si está disponible) a menor, listos para que yo meta esa lista en mi mailchimp y los rescate hoy.
Justifica cualquier rareza estadística que detectes (ej. Si hay gente con 100% de videos pero 0 tareas)."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Personas Masivo
> **Powered by:** MetodologIA Governance Protocol
