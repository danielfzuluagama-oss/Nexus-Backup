---
id: "10"

segmento: "representantes-comerciales"
journey: "delivery"
proceso: "entregar-valor"
sop: "sop-10-delivery"
ritual-slug: "10-transferir-sales-toolkit"
version: "v2.0.0"
estado: "Gold"
owners:

- dri: "Sales Director"
- backup: "Content Lead"
frecuencia: "por-evento (onboarding completado)"
herramientas:

- "Google Drive"
- "CRM"
- "Loom"

entry-criteria:

- "Onboarding completado (Ritual 09)"
- "Rep confirmado como activo en CRM"
exit-criteria:

- "Sales Toolkit entregado con 7 componentes"
- "Rep confirma recepción y funcionalidad"
- "Primer uso documentado (email enviado con template)"

kpi: "Toolkit Usage Rate (Target: ≥80% de reps usan ≥5 componentes en primer mes)"
leading-indicators:

- "% de componentes accesibles (target: 7/7)"
- "Tiempo desde onboarding hasta primer uso de template"
- "# de componentes usados en primeras 2 semanas"

riesgos-controles:

- riesgo: "Rep modifica materiales sin autorización"

  control: "Materiales en view-only. Copia de personalización en su folder."

- riesgo: "Toolkit desactualizado"

  control: "Versioning central + alerta cuando se actualiza"

- riesgo: "Confundir Sales Toolkit con IP metodológica"

  control: "El Sales Toolkit NO contiene metodología — solo materiales de VENTA"

- riesgo: "Rep no usa el toolkit (abandono)"

  control: "Seguimiento a 7 días con usage check"
evidencias:

- "Toolkit entregado y accesos verificados"
- "Loom walkthrough grabado"
- "Primer email enviado con template"
- "Usage tracker actualizado"
---

# Ritual: Transferir Sales Toolkit — Representantes Comerciales (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Representantes Comerciales
> **El Sales Toolkit ≠ IP del embajador.** El toolkit contiene SOLO herramientas de venta, no la metodología.
> **7 componentes del Sales Toolkit:**
>
> 1. Pitch deck por programa
> 2. One-pagers (1 por producto)
> 3. Pricing sheet
> 4. Objection handling guide
> 5. Email templates (prospecting, follow-up, propuesta)
> 6. Case studies para compartir
> 7. CRM quick guide

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Inmediatamente tras la confirmación de Ritual 09 (Onboarding de Ventas completado).
- **Pre-ritual:** ¿El rep tiene CRM activo? ¿Su carpeta Drive personal ya existe? ¿Todos los materiales core están actualizados a la última versión? Si algún material está desactualizado, primero ejecutar actualización.
- **Contexto:** El Sales Toolkit es la caja de herramientas con la que el representante va al campo. Sin toolkit, el rep improvisa — y la improvisación destruye la marca. Los 7 componentes están diseñados para cubrir cada momento de la venta: desde el primer contacto hasta la propuesta final. El toolkit se ENTREGA activamente (no se "comparte un link"), se DEMUESTRA en vivo, y se VERIFICA que funciona.

---

## 2. Objetivo y Definición de Éxito

- **Objetivo:** Entregar el Sales Toolkit completo al representante, verificar que tiene acceso y comprende cómo y cuándo usar cada componente.
- **Definición de Éxito (DoD):**
  - [ ] 7 componentes entregados con accesos verificados
  - [ ] Walkthrough completado (Loom o en vivo)
  - [ ] Rep envió primer email usando template (test de uso real)
  - [ ] Usage tracker configurado para este rep
  - [ ] Rep sabe la diferencia entre materiales core (view-only) y folder personal (editable)
- **Definición de Éxito del Rep:** "Tengo todo lo que necesito para salir a vender hoy. Sé dónde está cada herramienta y cuándo usarla."

---

## 3. Roles y Responsables

| Rol | Persona | Responsabilidad |
| :--- | :--- | :--- |

| **Accountable** | Sales Director | Garantiza que el toolkit está completo y actualizado |
| **Responsible** | Content Lead | Prepara y entrega los 7 componentes |

| **Consulted** | Rep Comercial | Confirma recepción y reporta issues |
| **Informed** | Growth Lead | Sabe que el rep ya está equipado |

---

## 4. Preparación e Insumos

### Definition of Ready (DoR)

- [ ] Onboarding (Ritual 09) marcado como completado en CRM
- [ ] Carpeta Drive del rep creada: `representantes/[nombre]/`
- [ ] 7 componentes core actualizados a última versión
- [ ] Loom o herramienta de grabación disponible
- [ ] CRM con campos: Toolkit_Status, Components_Delivered, First_Use_Date

### Materiales requeridos

| Material | Fuente | Responsable |
| :--- | :--- | :--- |

| Pitch deck por programa | Drive — Materiales Core | Content Lead |
| One-pagers por producto | Drive — Materiales Core | Content Lead |
| Pricing sheet | Drive — Comercial | Sales Director |
| Objection handling guide | Drive — Ventas | Sales Director |
| Email templates (3 tipos) | Drive — Templates | Content Lead |
| Case studies | Drive — Success Stories | Content Lead |
| CRM quick guide | Drive — Operaciones | Ops |

---

## 5. Ejecutar — Parte 1: Setup y Entrega

> **Núcleo ejecutable:** 10 micro-pasos atómicos (5.1–5.10)
> Cada micro-paso = 1 acción principal → 1 output verificable

### 5.1 — Configurar folder personal del rep en Drive

**Contexto:** Cada rep tiene una carpeta personal donde puede personalizar materiales. Los materiales core son view-only para proteger la integridad de la marca.

**Acción:** Crear `representantes/[nombre]/sales-toolkit/`. Dentro: subcarpeta `core/` (view-only, shortcuts a materiales centrales) y subcarpeta `personal/` (editable, para adaptaciones del rep).
**Output:** Folder configurado con permisos correctos.

**Evidencia:** Drive — URL de la carpeta.

### 5.2 — Verificar que los 7 componentes están actualizados

**Contexto:** Un toolkit con materiales desactualizados (pricing viejo, case studies obsoletos) es peor que no tener toolkit — genera desconfianza del rep.

**Acción:** Revisar fecha de última actualización de cada componente. Si alguno tiene > 30 días, verificar con Content Lead si hay versión nueva pendiente.
**Output:** Checklist de versiones: 7/7 actualizados.

**Evidencia:** Log de verificación.

### 5.3 — Entregar los 7 componentes con script de entrega

**Contexto:** La entrega no es "te mando un link". Es un momento de empoderamiento. El rep debe sentir que recibe armas para ganar.

**Script:** "Tu Sales Toolkit está listo. Tiene 7 herramientas diseñadas para cada momento de tu ciclo de venta: [lista]. Los materiales core son view-only para que siempre tengas la última versión. Tu folder personal es para tus adaptaciones — ahí puedes personalizar todo."
**Output:** 7 componentes compartidos.

**Evidencia:** CRM — nota "Toolkit entregado" con timestamp.

### 5.4 — Confirmar acceso del rep a cada componente

**Contexto:** "Compartir" ≠ "acceso verificado". Es frecuente que permisos de Drive bloqueen documentos sin que nadie lo note.

**Acción:** Pedir al rep que abra CADA uno de los 7 componentes mientras están en la llamada/sesión. Verificar que puede ver el contenido.
**Output:** 7/7 componentes accesibles confirmados por el rep.

**Evidencia:** CRM — nota "Access verified 7/7".

### 5.5 — Grabar Loom walkthrough: cuándo usar cada componente

**Contexto:** El rep necesita saber no solo QUÉ tiene, sino CUÁNDO usarlo. Un Loom de 5 min personalizado vale más que un manual de 20 páginas.

**Acción:** Grabar Loom de máximo 5 min con estructura:

- **Primer contacto →** Email templates + one-pager
- **Discovery →** Pitch deck
- **Propuesta →** Pricing sheet + case studies
- **Objeciones →** Objection handling guide
- **Reporte →** CRM quick guide

**Output:** Loom grabado y compartido.
**Evidencia:** Loom analytics — link de visualización.

### 5.6 — Test de uso real: rep envía primer email usando template

**Contexto:** La diferencia entre "entendí" y "lo sé hacer" es la acción. El test de primer uso convierte el conocimiento en skill inmediatamente.

**Acción:** Durante la sesión, el rep selecciona un prospecto real de su pipeline, abre el email template de prospecting, lo personaliza, y lo envía. Supervisar en tiempo real.
**Output:** Primer email enviado con template.

**Evidencia:** CRM — nota "First use: prospecting email sent" + destinatario.

### 5.7 — Explicar permisos: view-only vs personal folder

**Contexto:** La confusión más común es intentar editar materiales core y frustrarse. Peor aún: copiar un material core, editarlo, y luego usar una versión desactualizada.

**Acción:** Explicar la regla: "Core = siempre actualizado, no tocar. Personal = tu zona de personalización. Si necesitas adaptar algo, cópialo a tu folder personal."
**Script:** "Una regla simple: si el archivo está en `/core/`, no lo toques — siempre tendrá la última versión. Si quieres personalizar algo, copia a tu `/personal/` y ahí edita."

**Output:** Rep entiende la regla core vs personal.
**Evidencia:** Confirmación verbal.

### 5.8 — Configurar alerta de versioning para el rep

**Contexto:** Cuando se actualiza un componente core, el rep debe saberlo inmediatamente. Sin alerta, usará materiales obsoletos sin darse cuenta.

**Acción:** Suscribir al rep a la notificación de cambios en la carpeta core de materiales. Probar con un cambio dummy para verificar que la alerta llega.
**Output:** Alerta de versioning activa.

**Evidencia:** Captura de notificación recibida.

### 5.9 — Configurar usage tracker para este rep

**Contexto:** Lo que no se mide no existe. El usage tracker permite detectar reps que no usan el toolkit antes de que pierdan una venta por falta de herramientas.

**Acción:** En CRM, crear campos: Toolkit_Status = "Delivered", Components_Used = 0/7, First_Use_Date = [hoy], Last_Use_Date = [hoy].
**Output:** Usage tracker configurado.

**Evidencia:** CRM — campos poblados.

### 5.10 — Registrar entrega en CRM y crear tarea de seguimiento a 7 días

**Contexto:** La entrega no termina hoy — se verifica en 7 días. ¿El rep realmente está usando las herramientas?

**Acción:** Marcar Toolkit_Status = "Delivered" en CRM. Crear tarea: "Toolkit Usage Check — [nombre]" para dentro de 7 días.
**Output:** CRM actualizado + tarea de seguimiento programada.

**Evidencia:** CRM — registro + tarea.

---

## 6. Ejecutar — Parte 2: Alineación y Verificación

> **Núcleo ejecutable:** 10 micro-pasos atómicos (6.1–6.10)

### 6.1 — Seguimiento día 7: verificar uso del toolkit

**Contexto:** El día 7 es el momento de verdad. Si el rep no ha usado al menos 3 componentes, hay un problema de adopción que debe resolverse ahora — no en 30 días.

**Acción:** Revisar en CRM: ¿cuántos componentes ha usado el rep? ¿Ha enviado emails? ¿Ha usado el pitch deck?
**Output:** Usage report: X/7 componentes usados.

**Evidencia:** CRM — Components_Used actualizado.

### 6.2 — Llamada de seguimiento si uso < 3 componentes

**Contexto:** Uso bajo no significa falta de voluntad — puede ser confusión, falta de pipeline, o barrera técnica. Diagnosticar antes de juzgar.

**Acción:** Si < 3 componentes usados: llamar al rep. Preguntar: "¿Cuál fue el primer componente que usaste? ¿Hubo alguno que no supiste cuándo usar?"
**Script:** "Solo quiero verificar que todo te funciona bien. ¿Has tenido oportunidad de usar el toolkit? ¿Algún componente que no te quede claro cuándo aplicar?"

**Output:** Diagnóstico de barrera.
**Evidencia:** CRM — nota de seguimiento.

### 6.3 — Resolver barreras técnicas identificadas

**Acción:** Si la barrera es técnica (no puede abrir, formato incompatible, pricing incorrecto): resolver en el momento. Si es de conocimiento: re-enviar el Loom y ofrecer walkthrough en vivo.

**Output:** Barrera resuelta.
**Evidencia:** CRM — nota "Barrera resuelta: [tipo]".

### 6.4 — Solicitar feedback del rep sobre cada componente

**Contexto:** El rep en campo es la fuente de verdad. Su feedback mejora los materiales para todos los reps futuros.

**Acción:** Preguntar por cada componente: ¿útil, parcialmente útil, o no útil? ¿Qué le falta?
**Output:** Feedback por componente (7 ítems).

**Evidencia:** CRM — campo Toolkit_Feedback.

### 6.5 — Consolidar feedback para Content Lead

**Acción:** Agrupar el feedback del rep con feedback de otros reps recientes. Enviar al Content Lead como input para el próximo ciclo de actualización.

**Output:** Feedback consolidado enviado.
**Evidencia:** Email/Slack al Content Lead.

### 6.6 — Verificar que pricing sheet está alineado con propuestas activas

**Contexto:** El pricing es el componente más sensible. Si el rep cita un precio diferente al que cotiza propuesta formal, se destruye la confianza.

**Acción:** Cruzar pricing sheet del toolkit con las últimas propuestas enviadas. ¿Coinciden?
**Output:** Pricing alignment: OK / Desalineado.

**Evidencia:** Nota de verificación.

### 6.7 — Verificar que case studies son relevantes para el territorio del rep

**Contexto:** Un case study de una multinacional no sirve para un rep que vende a PYMEs. Los case studies deben resonar con el perfil de clientes del territorio.

**Acción:** Revisar si los case studies incluidos son relevantes para el segmento y territorio del rep. Si no: identificar cuáles agregar.
**Output:** Relevance check: match / mismatch + acción.

**Evidencia:** Nota.

### 6.8 — Actualizar usage tracker con datos de día 7

**Acción:** Actualizar en CRM: Components_Used, Last_Use_Date, Toolkit_Feedback_Status.

**Output:** Tracker actualizado.
**Evidencia:** CRM.

### 6.9 — Definir meta de uso para semana 2-4

**Contexto:** El objetivo es que en el primer mes, el rep haya usado ≥5 de los 7 componentes en situaciones reales de venta.

**Acción:** Acordar con el rep: "Para el cierre de tu primer mes, el objetivo es que hayas usado al menos 5 de las 7 herramientas. ¿Cuáles crees que usarás primero?"
**Output:** Meta de uso acordada.

**Evidencia:** CRM — nota.

### 6.10 — Crear tarea de revisión día 30

**Acción:** Crear tarea en CRM: "Toolkit Usage Review 30d — [nombre]" para día 30 post-entrega.

**Output:** Tarea programada.
**Evidencia:** CRM — tarea.

---

## 7. Ejecutar — Parte 3: Consolidación y Producción

> **Núcleo ejecutable:** 10 micro-pasos atómicos (7.1–7.10)

### 7.1 — Revisión día 30: auditar uso real del toolkit

**Contexto:** Día 30 = la foto real de adopción. Si el rep usa ≥5 componentes, el toolkit funciona. Si usa < 3, hay un problema sistémico.

**Acción:** Revisar métricas de uso: emails enviados con templates, propuestas con pricing sheet, decks presentados.
**Output:** Usage report 30d: X/7 componentes usados en situación real.

**Evidencia:** CRM — Components_Used_30d.

### 7.2 — Clasificar rep por adopción: Power User / Standard / At-Risk

**Acción:** Power User (≥5 en uso activo), Standard (3-4 componentes), At-Risk (< 3).

**Output:** Adoption classification.
**Evidencia:** CRM — campo Adoption_Level.

### 7.3 — Intervención para reps At-Risk

**Contexto:** Un rep at-risk no es un fracaso del rep — es un fracaso del proceso de entrega. Diagnosticar sistémicamente.

**Acción:** Si At-Risk: sesión 1:1 de 30 min para hacer walkthrough componente por componente con un caso real del pipeline del rep.
**Output:** Sesión completada.

**Evidencia:** CRM — nota de intervención.

### 7.4 — Generar reporte de Toolkit Usage Rate por cohorte

**Contexto:** La métrica KPI se mide por cohorte (todos los reps que recibieron toolkit en el mismo mes).

**Acción:** Compilar: # de reps en cohorte, % usando ≥5 componentes, componente más usado, componente menos usado.
**Output:** Reporte de cohorte 1 página.

**Evidencia:** Drive — reporte archivado.

### 7.5 — Identificar componente menos usado y diagnosticar

**Contexto:** Si un componente es consistentemente subutilizado, el problema es el componente — no los reps.

**Acción:** De los 7, ¿cuál tiene menor adopción? ¿Es un problema de formato, relevancia, o desconocimiento?
**Output:** Diagnóstico del componente débil.

**Evidencia:** Nota para Content Lead.

### 7.6 — Proponer mejora al componente débil

**Acción:** Basado en el diagnóstico: ¿necesita rediseño, más contexto, mejor naming, o simplemente un re-launch?

**Output:** Propuesta de mejora.
**Evidencia:** Ticket/tarea asignada.

### 7.7 — Archivar datos de adopción para análisis longitudinal

**Acción:** Guardar métricas de 7d y 30d en registro histórico para analizar tendencias entre cohortes.

**Output:** Datos archivados.
**Evidencia:** Drive — dataset.

### 7.8 — Compartir best practices de Power Users

**Contexto:** Los Power Users descubren usos creativos del toolkit. Capturar y distribuir.

**Acción:** Si hay Power Users en la cohorte: preguntar "¿qué componente te funcionó mejor y cómo lo usaste?" Documentar y compartir con otros reps.
**Output:** Best practice documentada.

**Evidencia:** Slack/email a equipo de reps.

### 7.9 — Verificar que el toolkit del rep tiene la última versión

**Acción:** Confirmar que las alertas de versioning funcionaron y que el rep tiene acceso a la versión más reciente de cada componente.

**Output:** Version check: 7/7 actualizados.
**Evidencia:** Drive.

### 7.10 — Cerrar ciclo de entrega y marcar en CRM

**Acción:** Marcar Toolkit_Status = "Verified" (si ≥5) o "Needs Attention" (si < 5). Cerrar la tarea de seguimiento.

**Output:** Ciclo de entrega cerrado formalmente.
**Evidencia:** CRM — status final.

---

## 8. Validación y Calidad (QA)

### Checklist de Calidad

- [ ] 7 componentes entregados con accesos verificados (7/7)
- [ ] Loom walkthrough grabado y compartido
- [ ] Test de primer uso completado (email enviado)
- [ ] Usage tracker configurado en CRM
- [ ] Seguimiento día 7 ejecutado
- [ ] Seguimiento día 30 ejecutado
- [ ] Adoption classification registrada
- [ ] Feedback del rep capturado
- [ ] No se usó "gratis/gratuito" en ninguna comunicación
- [ ] Vocabulario consistente con Glosario L0

### Gate de Aprobación

| Criterio | ¿Cumple? | Evidencia |
| :--- | :--- | :--- |

| 7/7 componentes accesibles | ☐ | Drive |
| Test de primer uso completado | ☐ | CRM — email enviado |
| Toolkit Usage Rate ≥80% (cohorte) | ☐ | Reporte 30d |

---

## 9. Outputs y Evidencias

### Artefactos producidos

| Output | Formato | Ubicación | Responsable |
| :--- | :--- | :--- | :--- |

| Carpeta Sales Toolkit del rep | Drive folder | `representantes/[nombre]/sales-toolkit/` | Content Lead |
| Loom walkthrough | Video 5 min | Loom | Content Lead |
| Usage tracker | CRM fields | CRM | Ops |
| Toolkit Usage Report (cohorte) | 1 página | Drive | Sales Director |

### Registro en CRM

- **Campos actualizados:** Toolkit_Status, Components_Delivered, Components_Used, First_Use_Date, Last_Use_Date, Adoption_Level, Toolkit_Feedback
- **Valor registrado:** 7/7 entregados + adoption classification + feedback
- **Timestamp:** Automático al guardar

---

## 10. Cierre y Handoff

### Conexión con siguiente ritual

- **Siguiente ritual:** [11-certificar-competencia-comercial](../../../success/gestionar-exito/sop-11-success/11-certificar-competencia-comercial-ritual.md)
- **Datos que hereda:** Adoption_Level, Components_Used, First_Use_Date, best practices del rep
- **Condición de handoff:** Toolkit_Status = "Verified" + ≥5 componentes en uso activo

### KPI y Leading Indicators

| Indicador | Valor actual | Target | Estado |
| :--- | :--- | :--- | :--- |

| Toolkit Usage Rate (mes 1) | — | ≥80% usando ≥5 componentes | 🟡 |
| Acceso verificado (día 0) | — | 7/7 | 🟡 |
| Primer uso (día 0) | — | 1 email enviado | 🟡 |

### Cierre

- **NEXT:** `representantes-comerciales → 11 → certificar-competencia-comercial`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "Sales Toolkit Builder" (Prompt Pro)

**Use case:** Para generar o actualizar los 7 componentes del toolkit en lote.

```markdown
PROMPT:
"Genera un Sales Toolkit para un representante comercial:
Productos: [lista con nombre, problema que resuelve, público objetivo, precio].
Genera:
1. Pitch deck outline (10 slides por producto): problema → solución → resultados → pricing → CTA
2. One-pager por producto (1 página: problema → solución → 3 resultados → pricing → contacto)
3. Top 5 objeciones con respuesta basada en evidencia
4. 3 email templates:
   - Prospecting: generar curiosidad sin vender
   - Follow-up: agregar valor sin presionar
   - Propuesta: resumen ejecutivo con next steps
5. Case study template: empresa + problema + solución + resultado medible + quote
Formato: listo para personalizar. Tono: profesional, directo, zero-hype."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Representantes Comerciales
> **Powered by:** MetodologIA Governance Protocol
