---
id: "18"

segmento: "embajadores"
journey: "governance"
proceso: "gobernar-ecosistema"
sop: "sop-18-gobernanza"
ritual-slug: "18-auditar-compliance-y-calidad"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Sales Director"
- backup: "Legal"
frecuencia: "trimestral (audit) + anual (mystery client)"

herramientas:

- "CRM"
- "Google Drive"
- "Zoom"
- "Google Forms"
entry-criteria:

- "Embajador activo con ≥90 días de operación"

exit-criteria:

- "Auditoría completada con Compliance_Score calculado"
- "Mystery Client ejecutado (si corresponde — anual)"
- "Acciones correctivas definidas (si aplica)"

kpi: "Compliance Score promedio de la red (Target: ≥90/100)"
leading-indicators:

- "% embajadores en Green (≥80)"
- "# infracciones de NDA detectadas"
- "NPS promedio de clientes de los embajadores"

riesgos-controles:

- riesgo: "Embajador modifica la metodología sin autorización"

control: "Auditoría de materiales + mystery client verifica adherencia"

- riesgo: "IP compartida con terceros no autorizados"

control: "Watermark tracking + NDA compliance check"

- riesgo: "Calidad del servicio diverge del estándar"

control: "NPS de clientes del embajador + mystery client"

- riesgo: "Inactividad prolongada con acceso a IP"

control: "90 días sin actividad = suspensión de accesos"
evidencias:

- "Compliance Score por embajador"
- "Audit report"
- "Mystery client report (anual)"
- "Corrective actions log"
---

# Ritual: Auditar Compliance y Calidad — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **RITUAL MÁS CRÍTICO DEL SEGMENTO.** La reputación de MetodologIA depende de la calidad de CADA embajador. Auditar sin excepciones.
>
> **3 niveles de auditoría:**
>
> 1. **Trimestral:** Revisión de métricas + compliance check de materiales
> 2. **Semestral:** Revisión profunda + feedback de clientes del embajador
> 3. **Anual:** Mystery Client — evaluador se presenta como cliente potencial

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Trimestralmente para todos los embajadores activos.
- **Pre-ritual:** ¿Los datos de performance están frescos? ¿El banco de mystery clients está actualizado?
- **Contexto:** La auditoría es la garantía de calidad de la red. Un embajador que no es auditado puede desviarse de los estándares gradualmente, sin intención. La auditoría no es castigo — es mantenimiento preventivo de la marca compartida.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Calcular Compliance Score para cada embajador activo, detectar desviaciones, y definir acciones correctivas antes de que el daño sea irreversible.
- **Definición de Éxito (DoD):**
  - [ ] Compliance Score calculado para 100% de embajadores activos
  - [ ] Acciones correctivas definidas para todos los Yellow/Red
  - [ ] Mystery Client ejecutado para ≥1 embajador/trimestre (rotativo)
- **Definición de Éxito del Ecosistema:** "La marca que comparto con MetodologIA está protegida por un sistema de calidad riguroso."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Aprueba acciones correctivas + escala legal si necesario |
| **Responsible** | Growth Lead + AI Agent | Ejecuta auditorías y calcula scores |

| **Consulted** | Consultant Lead | Valida calidad metodológica |
| **Informed** | Legal | Recibe alertas de NDA breach |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] CRM con datos de performance actualizados
- [ ] Acceso al Drive para verificar materiales
- [ ] Banco de evaluadores Mystery Client (para auditoría anual)
- [ ] NDA vigentes archivados
- [ ] Compliance Score template listo

---

## 5. Ejecutar — Parte 1: Auditoría Trimestral

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)

### 5.1 — Compilar métricas del embajador

**Contexto:** Los datos son la base objetiva de la auditoría. Sin datos, la auditoría es subjetiva y controversial.

**Acción:** Extraer de CRM: clientes atendidos, revenue, NPS de sus clientes, incidencias reportadas, contribución a la red.
**Output:** Performance report del trimestre.

**Evidencia:** CRM query.

### 5.2 — Verificar compliance de materiales

**Contexto:** ¿El embajador usa los materiales autorizados, en la versión correcta, sin modificaciones no aprobadas?

**Acción:** Solicitar al embajador muestra de materiales actuales. Comparar con versión autorizada del IP kit.
**Script:** "[nombre], como parte de nuestra revisión trimestral, necesito que me compartas una muestra de los materiales que estás usando actualmente. Esto nos ayuda a asegurarnos de que tienes la versión más actualizada."

**Output:** Materials_Compliance: OK / Deviation (modificación menor) / Violation (cambio no autorizado).
**Evidencia:** Audit log con comparativa.

### 5.3 — Verificar NDA compliance

**Contexto:** ¿El embajador ha compartido IP con terceros? ¿Usa la marca correctamente? Se verifica en el contenido público.

**Acción:** Revisar: LinkedIn, website personal (si tiene), materiales públicos, posts.
**Output:** NDA_Compliance: OK / Warning (uso ambiguo de marca) / Breach (IP expuesta).

**Evidencia:** Screenshots + audit log.

### 5.4 — Recopilar NPS de clientes del embajador

**Contexto:** El NPS de sus clientes es la métrica más directa de calidad percibida.

**Acción:** Enviar micro-encuesta a 3-5 clientes del embajador.
**Script del survey:** "Recientemente trabajaste con [nombre del embajador]. En una escala del 1 al 10, ¿qué tan probable es que lo recomiendes? ¿Un comentario breve sobre tu experiencia?"

**Output:** Client_NPS del embajador.
**Evidencia:** Survey results.

### 5.5 — Calcular Compliance Score (0-100)

**Contexto:** El score ponderado integra todas las dimensiones en un solo número de governance.

**Acción:** Score ponderado:

- Performance vs targets (30%)
- Materials Compliance (25%)
- NDA Compliance (25%)
- Client NPS (20%)

**Output:** Compliance_Score: [X]/100.

**Evidencia:** CRM — campo Compliance_Score.

### 5.6 — Verificar actividad mínima (90 días)

**Contexto:** Un embajador con acceso a IP pero sin actividad es un riesgo: IP expuesta sin retorno.

**Acción:** ¿≥1 cliente en los últimos 90 días?
**Output:** Activity_Status: Active / Warning / Inactive.

**Evidencia:** CRM.

### 5.7 — Clasificar resultado: Green / Yellow / Red

**Acción:**

- **Green (≥80):** Aprobado. Reconocer + continuous improvement.
- **Yellow (60-79):** Plan correctivo de 30 días.
- **Red (<60):** Suspensión temporal + plan de recuperación de 60 días.

**Output:** Classification.

**Evidencia:** CRM.

### 5.8 — Si Green: reconocer formalmente

**Script:** "[nombre], tu Compliance Score del trimestre es [X]/100 — Green. Tu atención a la calidad es evidente. Seguí observando [detalle positivo]. ¡Sigue así!"

**Output:** Reconocimiento enviado.
**Evidencia:** CRM.

### 5.9 — Si Yellow: plan correctivo (30 días)

**Script:** "[nombre], tu Compliance Score es [X]/100 — en zona de atención. Específicamente: [área débil]. Mi propuesta: (1) [acción correctiva 1], (2) [acción correctiva 2]. Nos re-evaluamos en 30 días. ¿De acuerdo?"

**Output:** Plan correctivo definido y aceptado.
**Evidencia:** CRM — tarea de re-evaluación.

### 5.10 — Si Red: suspensión temporal + plan de 60 días

**Script:** "[nombre], necesito ser honesto contigo. Tu Compliance Score es [X]/100 — por debajo del estándar. Esto significa que temporalmente pausamos tu operación hasta resolver [issues]. No es una terminación — es una pausa para corregir. Aquí está el plan de 60 días: [detalle]."

**Output:** Suspensión comunicada + plan de 60 días.
**Evidencia:** CRM — status "Suspended".

---

## 6. Ejecutar — Parte 2: Escalamientos + Mystery Client

### 6.1 — Si NDA Breach: escalamiento legal inmediato

**Contexto:** Un breach de NDA no es un yellow flag — es una emergencia. La IP expuesta puede no ser recuperable.

**Acción:** Notificar a Legal en <24h. Suspender accesos a IP inmediatamente. Documentar la evidencia.
**Script al embajador:** "[nombre], detectamos que [descripción del breach]. Nuestro NDA es claro sobre esto. Hemos notificado a nuestro equipo legal y temporalmente suspendido tus accesos. Necesitamos hablar urgentemente."

**Output:** Escalamiento legal iniciado.
**Evidencia:** Legal — caso abierto.

### 6.2 — Si Inactive >90 días: suspender accesos a IP

**Script:** "[nombre], noté que no has tenido actividad como embajador en los últimos [N] días. Entiendo que puede haber razones. Sin embargo, por política de seguridad de IP, necesito suspender tu acceso temporal. Si quieres reactivarte, escríbeme y lo resolvemos en 48h."

**Output:** Accesos suspendidos (no la relación).
**Evidencia:** Drive — sharing revoked + CRM.

### 6.3 — Ejecutar Mystery Client (anual, rotativo)

**Contexto:** El Mystery Client es el test más fiable de calidad real. Un evaluador entrenado se presenta como cliente potencial y ejecuta el journey completo.

**Acción:** Asignar evaluador → briefing → el evaluador contacta al embajador como prospecto → ejecuta discovery/Try & Buy → evalúa con rubric.
**Output:** Mystery Client Report.

**Evidencia:** Reporte confidencial.

### 6.4 — Rubric del Mystery Client (6 criterios)

**Acción:** Evaluar:

1. Calidad del primer contacto
2. Profesionalismo en discovery
3. Adherencia a metodología durante sesión
4. Manejo de objeciones
5. Uso correcto de materiales y marca
6. Ética (¿prometió algo que no puede cumplir?)

Cada criterio: 1-5. Total: /30. ≥24 (80%) = Pass.
**Output:** MC_Score.

**Evidencia:** Reporte.

### 6.5 — Debrief post-Mystery Client

**Script:** "[nombre], un evaluador tuvo una experiencia contigo recientemente. No te preocupes — esto es parte de nuestro proceso de calidad y TODOS los embajadores lo atraviesan. Aquí tienes el feedback: [constructivo, específico, accionable]."

**Output:** Feedback entregado.
**Evidencia:** CRM — nota.

### 6.6-6.10 — [Actualizar Compliance Score con MC data, retroalimentar programa de certificación si hay patrones de fallo, calibrar estándares, análisis de red (distribución de scores, tendencias, common issues), generar governance report]

---

## 7. Ejecutar — Parte 3: Análisis de Red y Mejora Continua

### 7.1 — Generar dashboard de compliance de la red

**Prompt de IA:**

```markdown

PROMPT:
"Analiza el estado de compliance de la Red de Embajadores MetodologIA:
Embajadores activos: [N]
Distribución de Compliance Score: [datos]
NDA breaches: [N]
Mystery Client scores: [datos]
Produce:
1. Network health score (promedio ponderado)
2. Top 3 issues recurrentes
3. Top 3 best practices de embajadores Green
4. Recomendaciones de mejora para el programa
5. Tendencia vs trimestre anterior
Formato: reporte ejecutivo de 1 página."
```

**Output:** Network Compliance Report.

**Evidencia:** Drive.

### 7.2 — Identificar patrones de fallo

**Acción:** ¿Los yellows/reds fallan en las mismas dimensiones? Si sí: el programa necesita ajuste (mejor onboarding, mejor IP, mejor soporte).

**Output:** Pattern analysis.
**Evidencia:** Nota.

### 7.3-7.10 — [Proponer evolución de estándares si hay desactualización, actualizar banco de preguntas de certificación, calibrar mystery client rubric, presentar governance report al equipo, annual governance review, board summary, archivar reportes, programar siguiente ciclo de auditoría, comunicar resultados agregados a la red (sin names), cerrar ciclo]

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] Compliance Score calculado para 100% de embajadores activos
- [ ] Materials Compliance verificado para cada embajador
- [ ] NDA Compliance chequeado (contenido público)
- [ ] Client NPS recopilado (≥3 responses por embajador)
- [ ] Mystery Client ejecutado (≥1 embajador/trimestre)
- [ ] Acciones correctivas definidas para todos los Yellow/Red
- [ ] NDA breaches escalados a Legal en <24h
- [ ] Embajadores inactivos >90d con accesos suspendidos

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| 100% scores calculados | ☐ | CRM |
| 0 NDA breaches sin escalar | ☐ | Legal log |
| Actions defined for all Yellow/Red | ☐ | CRM |

---

## 9. Outputs y Evidencias

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Compliance Score por embajador | CRM field | CRM | Growth Lead |
| Audit report | Doc | Drive | Growth Lead |
| Mystery Client report | Doc confidencial | Drive/legal | Evaluador |
| Network Compliance Report | 1 página | Drive | AI Agent |
| Corrective action plans | Tareas | CRM | Growth Lead |

---

## 10. Cierre y Handoff

### Conexión con el ecosistema

- **Este ritual es terminal:** Cierra el ciclo y se repite trimestralmente.
- **Retroalimenta:** Ritual 11 (certificación), Ritual 15 (renovación), Programa de onboarding
- **Condición de cierre:** 100% de embajadores auditados + actions definidas

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Compliance Score promedio | — | ≥90/100 | 🟡 |
| % Green | — | ≥80% | 🟡 |
| NDA breaches | — | 0 | 🟡 |

### Cierre

- **NEXT:** `SEGMENTO COMPLETO — embajadores v4.1 terminado`
- **BLOCKERS:** `Mystery Client protocol needs formal evaluator training. Legal review for NDA breach escalation SOP.`

---

## Modal 10x: El "Compliance Auditor Engine" (Prompt Pro)

```markdown
PROMPT:
"Ejecuta una auditoría de compliance para un embajador MetodologIA.
Datos del embajador:

- Nombre: [X], Zona: [X], Módulos: [X]
- Clientes (trimestre): [N], Revenue: [$X], NPS de sus clientes: [X]
- Materials Compliance: [OK/Deviation/Violation]
- NDA Compliance: [OK/Warning/Breach]
- Activity (últimos 90 días): [Active/Warning/Inactive]

Calcula:
1. Compliance Score (0-100) con fórmula: Performance 30% + Materials 25% + NDA 25% + NPS 20%
2. Clasificación: Green (≥80) / Yellow (60-79) / Red (<60)
3. Si Yellow/Red: plan correctivo sugerido (3 acciones específicas)
4. Si Breach: alerta de escalamiento legal
Formato: reporte de auditoría de 1 página."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
