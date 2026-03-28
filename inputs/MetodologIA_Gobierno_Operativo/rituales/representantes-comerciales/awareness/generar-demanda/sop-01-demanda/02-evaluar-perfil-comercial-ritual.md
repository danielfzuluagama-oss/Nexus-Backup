---
id: "02"

segmento: "representantes-comerciales"
journey: "awareness"
proceso: "generar-demanda"
sop: "sop-01-demanda"
ritual-slug: "02-evaluar-perfil-comercial"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Growth Lead"
frecuencia: "por-evento (candidato con Sales_Score ≥ 60)"
herramientas:

- "CRM"
- "Zoom"
- "Google Docs"

entry-criteria:

- "Sales_Score ≥ 60 (Ritual 01)"
- "Territorio verificado (no overlap)"
exit-criteria:

- "Conversación de 20 min ejecutada"
- "Fit comercial evaluado: Invite / Develop / Decline"
- "Resultado comunicado al candidato"

kpi: "Commercial Fit Rate (Target: ≥50% de contactados tienen fit)"
leading-indicators:

- "% de candidatos contactados que aceptan la conversación"
- "% de Invite vs Develop vs Decline"
- "Time-to-evaluation (días desde R01 hasta R02)"

riesgos-controles:

- riesgo: "Candidato excelente vendedor pero éticamente cuestionable"

  control: "Red flags: promesas irreales, desprecio por el cliente, solo motivación económica"

- riesgo: "Candidato quiere ser embajador, no representante"

  control: "Diferenciar claramente en la conversación: rep = venta, embajador = venta + operación"

- riesgo: "Evaluación sesgada por carisma del candidato"

  control: "Usar scorecard estructurado, no impresiones"
evidencias:

- "Fit classification"
- "Notas de conversación estructuradas"
- "Scorecard de evaluación completado"
---

# Ritual: Evaluar Perfil Comercial — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **Conversación de 20 min (no 30 como embajadores):** El rep es un perfil más transaccional — necesita claridad rápida sobre qué gana y qué se espera de él.
> **3 áreas de evaluación:** Estilo de venta (consultivo vs presión), ética comercial, alineación con MetodologIA.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Cuando un candidato con Sales_Score ≥ 60 y Territory_Check = Clear responde positivamente al approach (Ritual 01).
- **Pre-ritual:** ¿El candidato tiene Score ≥ 60? ¿Respondió al approach? ¿Se confirmó la llamada?
- **Contexto:** Esta conversación no es una entrevista de trabajo — es una evaluación de fit mutuo. El candidato también nos evalúa a nosotros. En 20 min debemos determinar: (1) ¿vende con ética?, (2) ¿entiende la venta consultiva?, (3) ¿quiere ser rep o quiere ser embajador? Los red flags descalifican inmediatamente.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Evaluar el fit comercial del candidato a través de una conversación estructurada de 20 min.
- **Definición de Éxito (DoD):**
  - [ ] Conversación de 20 min ejecutada
  - [ ] Scorecard completado (3 áreas evaluadas)
  - [ ] Clasificación asignada: Invite / Develop / Decline
  - [ ] Resultado comunicado al candidato
  - [ ] Siguiente acción definida (R03 para Invite, nurturing para Develop, cierre para Decline)
- **Definición de Éxito del Proceso:** "Cada rep que avanza a R03 tiene fit comercial verificado — cero sorpresas."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Aprueba criterios de evaluación y decisión final |
| **Responsible** | Sales Director / Growth Lead | Conduce la conversación de evaluación |

| **Consulted** | Ops | Valida compatibilidad territorial |
| **Informed** | Content Lead | Sabe qué tipo de rep se está incorporando |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Sales_Score del candidato consultado (4 dimensiones)
- [ ] Resumen IA del candidato revisado (de R01)
- [ ] Scorecard de evaluación preparado (3 áreas × criterios)
- [ ] Zoom/llamada agendada y confirmada
- [ ] Scripts de conversación revisados

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Resumen IA del candidato | CRM — notas R01 | Growth Lead |
| Scorecard de evaluación | Template estándar | Sales Director |
| Scripts por outcome | Drive — Comercial | Sales Director |

---

## 5. Ejecutar — Parte 1: Evaluación Cualitativa

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)
> Cada micro-paso = 1 acción principal → 1 output verificable

### 5.1 — Abrir conversación con frame claro

**Contexto:** El candidato debe saber en 30 segundos qué es esto y qué puede esperar. Sin ambigüedad.

**Script:** "[nombre], soy [nombre] de MetodologIA. Estamos buscando representantes comerciales en [territorio] para comercializar nuestros programas de formación y consultoría. No es un empleo — es una representación con comisión por venta. Quiero explorar si tiene sentido para ambos. Son 20 min. ¿Arrancamos?"
**Output:** Conversación iniciada con frame establecido.

**Evidencia:** CRM — nota "R02 started".

### 5.2 — Explorar estilo de venta (7 min)

**Contexto:** El estilo de venta revela la filosofía del candidato. Buscamos venta consultiva — alguien que entiende el dolor del cliente antes de ofrecer la solución.

**Script:** "Cuéntame cómo vendes hoy. ¿Cuál es tu approach? Dame un ejemplo de una venta reciente de la que estés orgulloso."
**Acción:** Escuchar activamente. ¿Habla del cliente o habla de sí mismo? ¿Entiende el dolor o solo el cierre?

**Output:** Sales_Style: Consultive / Transactional / Pressure.
**Evidencia:** Notas de conversación.

### 5.3 — Explorar ética comercial (6 min)

**Contexto:** La ética no se declara — se revela en las decisiones difíciles. La pregunta clave es sobre rechazar un deal.

**Script:** "¿Cuándo fue la última vez que le dijiste a un prospect 'esto no es para ti'? ¿Qué hiciste?"
**Red Flags:** Nunca rechaza un deal. Promete lo que sea para cerrar. No menciona al cliente como persona. Solo habla de comisiones.

**Output:** Ethics_Flag: Clean / Warning / Red.
**Evidencia:** Notas.

### 5.4 — Diferenciar representante vs embajador

**Contexto:** Algunos candidatos buscan autonomía total (quieren ser embajadores, no reps). Otros quieren solo vender (reps puros). La claridad aquí evita frustración futura.

**Script:** "Importante: el representante comercial VENDE, pero NO opera el programa. La entrega la hacemos nosotros o un embajador certificado. Tu valor está en abrir puertas, cerrar deals, y mantener la relación comercial. ¿Eso te alinea?"
**Output:** Role_Alignment: Yes / Wants_More (potential embajador) / No.

**Evidencia:** Notas.

### 5.5 — Explorar expectativas de ingreso

**Contexto:** Transparencia total sobre el modelo de comisiones. Si las expectativas son irrealistas, mejor saberlo ahora.

**Script:** "Nuestro modelo es comisión por venta cerrada. No hay base fija. ¿Eso funciona para tu situación actual? ¿Cuál es tu expectativa de ingreso mensual por esta actividad?"
**Output:** Income_Expectation: Realistic / Aspirational / Unrealistic.

**Evidencia:** Notas.

### 5.6 — Evaluar conocimiento del mercado de formación/consultoría

**Script:** "¿Conoces el mercado de formación y consultoría empresarial en [territorio]? ¿Quiénes son los principales players? ¿Qué frustra a las empresas de este tipo de servicios?"

**Acción:** Evaluar profundidad del conocimiento. No necesita ser experto, pero debe entender la dinámica.
**Output:** Market_Knowledge: Deep / Surface / None.

**Evidencia:** Notas.

### 5.7 — Completar scorecard de evaluación

**Acción:** Inmediatamente tras la llamada, completar el scorecard:

| Área | Score | Criterio |
| :--- | :--- | :--- |

| Estilo de venta | Consultive / Transactional / Pressure | ¿Entiende al cliente? |
| Ética comercial | Clean / Warning / Red | ¿Rechaza deals malos? |
| Alineación de rol | Yes / Wants_More / No | ¿Quiere ser rep? |
| Expectativa de ingreso | Realistic / Aspirational / Unrealistic | ¿Compatible? |
| Conocimiento del mercado | Deep / Surface / None | ¿Entiende el buyer? |

**Output:** Scorecard completado.

**Evidencia:** CRM — scorecard.

### 5.8 — Clasificar: Invite / Develop / Decline

**Acción:**

- **Invite:** Consultivo + Clean + Aligned + Realistic → avanza a R03
- **Develop:** Potencial pero necesita calibración (ej: estilo transaccional pero ético, o surface knowledge) → nurturing 30 días
- **Decline:** Pressure + Red flag + No aligned + Unrealistic → agradecer y cerrar

**Output:** Classification.
**Evidencia:** CRM — Fit_Status.

### 5.9 — Comunicar resultado al candidato

**Script — Invite:** "Me gustó mucho la conversación. Creo que hay un match. El siguiente paso es mapear tu territorio y definir cómo arrancar. ¿Te parece si agendamos una sesión de 30 min la próxima semana?"

**Script — Develop:** "Aprecio tu interés. Veo potencial, pero quiero que tengas más contexto sobre nuestro mercado antes de avanzar. Te voy a enviar algunos recursos y reconectamos en un mes."
**Script — Decline:** "Gracias por tu tiempo. Después de evaluar, creo que nuestro modelo de representación no es el mejor fit para tu perfil actual. Te deseo mucho éxito."

**Output:** Resultado comunicado.
**Evidencia:** CRM — nota.

### 5.10 — Crear siguiente acción según classification

**Acción:**

- Invite → crear tarea R03: "Perfilar Territorio — [nombre]"
- Develop → crear tarea de nurturing: 3 recursos + reconexión en 30 días
- Decline → cerrar registro con motivo documentado

**Output:** Siguiente acción creada.
**Evidencia:** CRM — tarea.

---

## 6. Ejecutar — Parte 2: Documentación y Análisis

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Documentar notas detalladas de la conversación

**Acción:** Estructurar notas: apertura, estilo de venta (citas directas), ética (respuesta a pregunta de rechazo), alineación, expectativas, conocimiento.

**Output:** Notas estructuradas.
**Evidencia:** CRM — campo R02_Notes.

### 6.2 — Registrar red flags identificados

**Acción:** Si hubo warnings o red flags: documentar con la frase exacta del candidato que generó la alerta.

**Output:** Red flags documentados (o: "ninguno").
**Evidencia:** CRM — campo Red_Flags.

### 6.3 — Actualizar Sales_Score con datos cualitativos

**Contexto:** Los datos cuantitativos de R01 ahora se enriquecen con la evaluación cualitativa de R02.

**Acción:** Ajustar dimensión de "Disponibilidad y Motivación" si la conversación reveló datos nuevos. Actualizar CRM.
**Output:** Sales_Score refinado.

**Evidencia:** CRM.

### 6.4 — Enviar recursos a candidatos Develop

**Acción:** Para cada Develop: enviar 3 recursos: (1) overview del mercado de formación, (2) case study de un rep exitoso, (3) artículo sobre venta consultiva.

**Output:** Recursos enviados.
**Evidencia:** Email + CRM nota.

### 6.5 — Analizar patrones: ¿qué perfil tiene mejor fit?

**Contexto:** Después de múltiples R02, emergen patrones. ¿Los mejores candidatos vienen de consultoría? ¿De ventas de tecnología? ¿Los de seguros son mejores?

**Acción:** Revisar los últimos 5-10 candidatos evaluados: ¿hay un perfil que predice Invite?
**Output:** Insight de perfil.

**Evidencia:** Nota analítica.

### 6.6 — Retroalimentar R01 con insights de evaluación

**Acción:** Si la conversación reveló que el scoring de R01 no captura algo importante (ej: candidatos con alto score pero ética cuestionable): proponer ajuste al scoring model.

**Output:** Feedback para R01.
**Evidencia:** Nota para Growth Lead.

### 6.7 — Verificar mapa territorial post-evaluación

**Acción:** Si el candidato fue Invite: marcar territorio como "in process". Si Decline: verificar si hay otros candidatos en pipeline para ese territorio.

**Output:** Mapa territorial actualizado.
**Evidencia:** Drive.

### 6.8 — Preparar brief para R03 (si Invite)

**Acción:** Compilar para el siguiente ritual: Sales_Score + notas de conversación + territory + expectativas + estilo de venta.

**Output:** Brief de handoff.
**Evidencia:** CRM — notas R02 completas.

### 6.9 — Registrar métricas del ciclo R02

**Acción:** Registrar: # de conversaciones ejecutadas, # Invite/Develop/Decline, tiempo promedio de evaluación.

**Output:** Métricas actualizadas.
**Evidencia:** Dashboard.

### 6.10 — Verificar que todo candidato evaluado tiene registro completo

**Acción:** Cruzar lista de candidatos evaluados vs registros CRM. Verificar: scorecard, classification, notas, siguiente acción.

**Output:** 0 candidatos sin registro completo.
**Evidencia:** CRM — query de verificación.

---

## 7. Ejecutar — Parte 3: Seguimiento y Consolidación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Seguimiento a candidatos Develop (día 30)

**Acción:** Reconectar con candidatos en Develop. ¿Revisaron los recursos? ¿Cambió algo en su situación?

**Output:** Status actualizado: Upgrade to Invite / Stay Develop / Decline.
**Evidencia:** CRM.

### 7.2 — Re-evaluar candidatos Develop con nueva data

**Acción:** Si el candidato revisó recursos y muestra mayor comprensión del mercado: re-evaluar scorecard.

**Output:** Scorecard actualizado.
**Evidencia:** CRM.

### 7.3 — Cerrar definitivamente candidatos Decline con nota de gratitud

**Acción:** Enviar nota de agradecimiento a candidatos Decline que no recibieron follow-up.

**Output:** Ciclo cerrado con respeto.
**Evidencia:** Email.

### 7.4 — Compartir best practices de conversaciones exitosas

**Acción:** Si una conversación fue particularmente efectiva: documentar las preguntas y técnicas que funcionaron.

**Output:** Best practice documentada.
**Evidencia:** Drive.

### 7.5 — Analizar conversion rate del funnel R01 → R02

**Acción:** De los candidatos evaluados en R01, ¿qué % avanzó a R02? ¿Qué % fue Invite? ¿El funnel está sano?

**Output:** Funnel analysis.
**Evidencia:** Dashboard.

### 7.6 — Generar reporte de evaluaciones del período

**Acción:** Compilar: # evaluaciones, # por outcome, insights principales, recomendaciones para mejorar el proceso.

**Output:** Reporte de 1 página.
**Evidencia:** Drive.

### 7.7 — Calibrar scripts de conversación basado en feedback

**Acción:** ¿Alguna pregunta no funcionó? ¿Algún script generó confusión? Ajustar para siguiente ciclo.

**Output:** Scripts actualizados.
**Evidencia:** Drive.

### 7.8 — Archivar evaluaciones del período

**Acción:** Guardar scorecards + notas + outcomes en carpeta histórica.

**Output:** Archivo del período.
**Evidencia:** Drive.

### 7.9 — Verificar pipeline de candidatos Invite

**Acción:** ¿Todos los Invite tienen tarea R03 creada? ¿Hay alguno sin seguimiento?

**Output:** Pipeline health check.
**Evidencia:** CRM.

### 7.10 — Cerrar ciclo R02 y preparar siguiente

**Acción:** Log de cierre: aprendizajes, ajustes propuestos, candidatos pendientes.

**Output:** Log de cierre.
**Evidencia:** Nota en log de operaciones.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Conversación de 20 min completa con scorecard
- [ ] Classification asignada con criterio documentado
- [ ] Resultado comunicado al candidato
- [ ] Siguiente acción creada para cada outcome
- [ ] Red flags documentados (si los hubo)
- [ ] No se usó "gratis/gratuito" en ninguna comunicación
- [ ] Vocabulario consistente con Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| Scorecard completado (5 áreas) | ☐ | CRM |
| Classification fundamentada | ☐ | CRM notas |
| Resultado comunicado | ☐ | CRM nota |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Scorecard de evaluación | Tabla | CRM | Sales Director |
| Notas de conversación | Texto estructurado | CRM | Evaluador |
| Brief de handoff (Invite) | Resumen | CRM notas | Growth Lead |
| Reporte de evaluaciones | 1 página | Drive | Sales Director |

### Registro en CRM

- **Campos actualizados:** Fit_Status, Sales_Style, Ethics_Flag, Role_Alignment, Income_Expectation, Market_Knowledge, R02_Notes, Red_Flags
- **Valor registrado:** Scorecard completo + classification + notas
- **Timestamp:** Automático al guardar

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [03-perfilar-territorio-de-venta](../../discovery/descubrir-necesidad/sop-03-discovery/03-perfilar-territorio-de-venta-ritual.md)
- **Datos que hereda:** Sales_Score refinado, scorecard R02, territory, estilo de venta, expectativas
- **Condición de handoff:** Classification = Invite + conversación ejecutada + registro completo

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Commercial Fit Rate | — | ≥50% Invite | 🟡 |
| Conversación → Invite (conversion) | — | ≥40% | 🟡 |
| Time-to-evaluation | — | ≤7 días desde R01 | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 03 → perfilar-territorio-de-venta`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Sales Rep Fit Navigator" (Prompt Pro)

**Use case:** Para preparar la conversación y anticipar escenarios.

```markdown
PROMPT:
"Prepara una conversación de 20 min para evaluar un candidato a Representante Comercial:
Candidato: [nombre], Sales_Score: [X], Territorio: [X].
Genera:
1. Pregunta de apertura sobre estilo de venta (debe revelar si es consultivo o de presión)
2. 2 preguntas de ética comercial (con red flags documentados)
3. Script de diferenciación rep vs embajador
4. Pregunta sobre expectativas de ingreso
5. Scripts para cada outcome: Invite / Develop / Decline
Tono: directo, profesional, sin rodeos."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
