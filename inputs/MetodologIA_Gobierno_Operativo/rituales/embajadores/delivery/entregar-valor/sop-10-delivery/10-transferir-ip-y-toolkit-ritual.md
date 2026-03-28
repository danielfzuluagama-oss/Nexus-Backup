---
id: "10"

segmento: "embajadores"
journey: "delivery"
proceso: "entregar-valor"
sop: "sop-10-delivery"
ritual-slug: "10-transferir-ip-y-toolkit"
version: "v1.0.0"
estado: "Piloto"
owners:

- dri: "Content Lead"
- backup: "Sales Director"
frecuencia: "por-evento (post onboarding)"
herramientas:

- "CRM"
- "Google Drive"
- "NotebookLM"

entry-criteria:

- "Onboarding completado (Ritual 09)"
- "NDA confirmado en archivo (verificación cruzada)"
exit-criteria:

- "IP kit transferido y verificado en sesión de 60 min"
- "Embajador confirma recepción y comprensión"
- "IP Checklist firmado"
- "Documentos sensibles watermarked"
kpi: "IP Transfer Compliance Rate (Target: 100%)"
leading-indicators:

- "% de items del IP kit verificados en sesión"
- "Tiempo desde onboarding hasta IP transfer (<7 días)"
riesgos-controles:

- riesgo: "IP transferida sin registro"

control: "Checklist firmado obligatorio: qué se entregó, qué versión, qué condiciones"

- riesgo: "Embajador redistribuye IP a terceros"

control: "NDA + watermarking visible en documentos + auditoría trimestral (R18)"

- riesgo: "Embajador usa versión desactualizada"

control: "Versionado en nombre de archivo + notificación de updates"
evidencias:

- "IP Checklist firmado"
- "Drive access log"
- "Watermarked documents delivered"
---

# Ritual: Transferir IP y Toolkit — Embajadores (Sovereign v4.1)

> [!IMPORTANT]
> **Estado:** Sovereign v4.1 — Embajadores
> **REGLA:** Solo se transfiere la IP autorizada para el dominio/territorio del embajador. No se transfiere TODO — se transfiere lo RELEVANTE y AUTORIZADO.
> **IP Kit incluye:** Prompts operativos, templates de sesión, guías de facilitación, slides, materiales del participante, scripts de venta, brand guidelines.

---

## 1. Trigger y Contexto

- **Cuándo se dispara:** Onboarding completado (Ritual 09).
- **Pre-ritual:** ¿El IP kit está curado para el dominio del embajador? ¿Los documentos están watermarked? Si no: preparar primero.
- **Contexto:** La transferencia de IP es el acto de mayor confianza del pipeline. MetodologIA comparte su propiedad intelectual con el embajador. Cada pieza transferida debe ser rastreable, versionada, y condicionada al NDA firmado.

---

## 5. Ejecutar — Parte 1: Setup y Preparación

### 5.1 — Verificación cruzada de NDA antes de cualquier transferencia

**Contexto:** BLOQUEADOR ABSOLUTO. Verificar en Drive/legal/ que el NDA está firmado y vigente.

**Acción:** Verificar existencia y validez del NDA. Si no se encuentra: STOP. No transferir nada.
**Output:** NDA verification: Confirmed / NOT FOUND.

**Evidencia:** Nota de verificación.

### 5.2 — Curar IP kit según dominio autorizado

**Contexto:** El IP kit no es un dump de todo — es una selección curada basada en los módulos autorizados del embajador.

**Acción:** Seleccionar del repositorio maestro solo los materiales relevantes al dominio autorizado:

- Prompts operativos del módulo [X]
- Templates de sesión del módulo [X]
- Guía de facilitación del módulo [X]
- Slides del módulo [X]
- Materiales del participante del módulo [X]
- Scripts de venta del módulo [X]
- Brand guidelines (universal)

**Output:** IP kit curado.

**Evidencia:** Lista de items seleccionados.

### 5.3 — Watermark documentos sensibles

**Contexto:** El watermark visible identifica al embajador destinatario. Si un documento aparece fuera de su territorio, la fuente es rastreable.

**Acción:** Aplicar watermark a documentos sensibles: "Uso exclusivo: [nombre] — Embajador MetodologIA — [zona]".
**Output:** Documentos watermarked.

**Evidencia:** Samples para verificación.

### 5.4 — Preparar checklist de entrega (cada item con versión)

**Acción:** Crear checklist con: nombre del documento, versión, tipo (editable/read-only), condiciones de uso.

**Output:** IP Checklist listo.
**Evidencia:** Google Doc.

### 5.5 — Agendar sesión de entrega (60 min)

**Script:** "[nombre], esta sesión es clave: te voy a entregar las herramientas que necesitas para operar. Repasaremos cada elemento del toolkit y verificaremos que lo entiendas. Trae preguntas."

**Output:** Sesión agendada.
**Evidencia:** CRM.

### 5.6 — Ejecutar sesión de entrega: recorrer cada componente

**Contexto:** Cada pieza del IP kit se recorre en vivo, no solo se envía por email. El embajador debe entender CÓMO y CUÁNDO usar cada elemento.

**Acción:** Recorrer el IP kit componente por componente.
**Script:** "Este es tu toolkit. Lo recorremos juntos: (1) Estos prompts son para preparar tus sesiones — te muestro cómo los uso yo. (2) Este template es la estructura de cada sesión — las secciones en azul son fijas, las verdes son adaptables. (3) Estas slides las usas tal cual — solo personalizas [campos]. ¿Claro hasta aquí?"

**Output:** IP recorrida con comprensión verificada.
**Evidencia:** Notas de sesión.

### 5.7 — Verificar comprensión de uso permitido

**Script:** "Para confirmar: ¿qué puedes hacer con estos materiales? Y ¿qué NO puedes hacer?"

**Output:** Comprensión verificada (el embajador articula los límites correctamente).
**Evidencia:** Nota.

### 5.8 — Firmar IP Checklist

**Acción:** El embajador firma el checklist confirmando recepción de cada item con versión.

**Output:** Checklist firmado.
**Evidencia:** DocuSign o firma manual digitalizada.

### 5.9 — Configurar acceso a carpeta Drive (permisos correctos)

**Acción:** Read-only para templates core (no se modifican). Edit para sus adaptaciones locales (carpeta propia).

**Output:** Drive configurado con permisos correctos.
**Evidencia:** Drive sharing settings.

### 5.10 — Verificar que puede ejecutar un módulo con los materiales

**Script:** "Quick test: si mañana tuvieras un cliente, ¿podrías ejecutar el módulo [X] con lo que tienes? ¿Falta algo?"

**Output:** Readiness check.
**Evidencia:** Nota — Readiness = Yes/No + gaps.

---

## 6. Ejecutar — Parte 2: Registro y Trazabilidad

### 6.1 — Registrar en CRM: IP_Version_Delivered, IP_Checklist_Signed

**Acción:** Actualizar CRM con metadata de transferencia.

**Output:** CRM actualizado.
**Evidencia:** CRM — campos poblados.

### 6.2 — Programar auditoría trimestral (vinculada a Ritual 18)

**Acción:** Crear tarea recurrente: verificar que el embajador usa la versión correcta y no ha compartido IP.

**Output:** Auditoría programada.
**Evidencia:** CRM — tarea recurrente.

### 6.3 — Entregar brand guidelines + do's and don'ts

**Script:** "Estas son las reglas de uso de marca. Lo más importante: siempre usa 'Embajador MetodologIA' seguido de tu nombre. Nunca uses solo 'MetodologIA' como si fuera tu marca propia. Aquí tienes los logos aprobados y los que NO puedes usar."

**Output:** Brand guidelines entregadas.
**Evidencia:** Doc.

### 6.4-6.10 — [Notificar al equipo, archivar checklist en Drive/legal/, actualizar Mapa de Nodos con status "IP Transferred", preparar handoff a Ritual 11 (certificación), verificar que no hay IP kits sin checklist firmado, generar reporte de compliance, métricas de IP transfer rate]

---

## 7-10. [Producción, QA, Outputs, Cierre — estándar]

### Cierre

- **NEXT:** `embajadores → 11 → certificar-competencia`
- **BLOCKERS:** `NONE`

---

## Modal 10x: El "IP Kit Curator" (Prompt Pro)

```markdown
PROMPT:
"Diseña un IP kit curado para un embajador MetodologIA.
Dominio del embajador: [módulos autorizados].
Genera lista de componentes con:
1. Nombre del documento
2. Tipo (prompt, template, guía, slides, material participante, script, brand)
3. Permiso (read-only, editable)
4. Versión actual
5. Condiciones de uso (1 línea)
Formato: tabla. Incluir solo lo relevante al dominio, no el catálogo completo."
```

---

> **Standard:** MetodologIA Sovereign v4.1 — Embajadores
> **Powered by:** MetodologIA Governance Protocol
