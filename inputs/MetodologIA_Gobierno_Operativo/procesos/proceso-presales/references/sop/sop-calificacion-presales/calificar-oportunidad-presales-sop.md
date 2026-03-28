# SOP: Calificar Oportunidad Pre-Sales

**Versión:** 1.0.0
**Fecha:** 2026-03-25
**Owner:** Director Comercial
**Cierra:** FM-06 (complemento de `rubrica-scoring-leads.md`)

---

## 1. Propósito

Transformar un lead raw en una oportunidad calificada y ruteada, usando la rúbrica de scoring y un proceso estandarizado que elimina la subjetividad.

---

## 2. Entradas (DoR)

- [ ] Lead registrado con al menos: nombre, email, empresa o fuente
- [ ] Canal de origen identificado (marketing, referido, embajador, aliado, prospección directa, evento)

---

## 3. Procedimiento

### Paso 1: Registro del Lead (0-4h desde recepción)

| Acción | Responsable | Evidencia |
|--------|------------|-----------|
| Registrar lead en CRM/spreadsheet con datos de F0 | Sales Rep / Marketing | Lead ID asignado |
| Asignar owner (Sales Rep responsable) | Director Comercial | Owner asignado en sistema |
| Verificar que no es duplicado (mismo contacto, misma empresa) | Sales Rep | Verificación realizada |

### Paso 2: Primer Contacto (24-48h desde registro)

| Acción | Responsable | Evidencia |
|--------|------------|-----------|
| Contactar al lead por el canal de origen (email, teléfono, LinkedIn) | Sales Rep | Registro de intento de contacto |
| Objetivo del primer contacto: validar interés y completar F1 | Sales Rep | `formulario-f1-diagnostico.md` iniciado |
| Si no hay respuesta en 48h, segundo intento por canal alternativo | Sales Rep | Segundo intento registrado |
| Si no hay respuesta en 5 días (3 intentos), marcar como "No contactado" | Sales Rep | Status actualizado |

### Paso 3: Discovery Inicial (En primer contacto o sesión dedicada)

| Acción | Responsable | Evidencia |
|--------|------------|-----------|
| Completar `formulario-f1-diagnostico.md` con información del contacto | Sales Rep | Formulario completado |
| Identificar: industria, tamaño, rol, madurez, dolor principal | Sales Rep | Datos en F1 |
| Validar interés: ¿es un problema real que quieren resolver? | Sales Rep | Nota cualitativa |

### Paso 4: Scoring (Inmediatamente post-discovery)

| Acción | Responsable | Evidencia |
|--------|------------|-----------|
| Completar las 5 dimensiones de `rubrica-scoring-leads.md` | Sales Rep | Score Card completado |
| Calcular score total (/25) | Sales Rep | Score registrado |
| Clasificar: HOT (≥18) / WARM (12-17) / NURTURE (7-11) / DISCARD (<7) | Sales Rep | Clasificación asignada |

### Paso 5: Ruteo según clasificación

| Clasificación | Acción | Plazo |
|--------------|--------|-------|
| 🔥 **HOT** (≥18) | Notificar al Director Comercial. Incluir en próximo Deal Review. Asignar Solution Architect si el deal lo requiere. | Mismo día |
| 🟡 **WARM** (12-17) | Incluir en Deal Review semanal. Programar follow-up en 7 días. | Próximo Deal Review |
| 🔵 **NURTURE** (7-11) | Transferir a marketing para nurturing automatizado. Programar re-score en 30 días. | 24h |
| ⚪ **DISCARD** (<7) | Registrar motivo de descarte. Archivar. Enviar email de agradecimiento. | 24h |

### Paso 6: Re-Score (Cuando hay nueva información)

| Trigger | Acción |
|---------|--------|
| Nueva interacción significativa con el lead | Re-evaluar las 5 dimensiones |
| 30 días desde último score (para NURTUREs) | Re-evaluar si las circunstancias cambiaron |
| Lead responde a campaña de nurturing | Re-evaluar con información nueva |
| Cambio de contacto o sponsor en la empresa | Re-evaluar dimensión D2 (Authority) |

---

## 4. Salidas (DoD)

- [ ] Lead registrado con ID único
- [ ] Owner asignado
- [ ] F1 completado (o marcado como "No contactado" si no hubo respuesta)
- [ ] Score Card completado con evidencia por dimensión
- [ ] Lead ruteado según clasificación
- [ ] Próximo paso definido y agendado

---

## 5. KPIs del Proceso

| KPI | Meta | Frecuencia |
|-----|------|-----------|
| Tiempo desde recepción hasta primer contacto | < 24h (leads HOT), < 48h (otros) | Semanal |
| % de leads con score completado | > 95% | Semanal |
| % de leads DISCARD con motivo documentado | 100% | Mensual |
| Tasa de conversión WARM → HOT (re-score) | > 20% en 30 días | Mensual |

---

## Changelog

- v1.0.0 — Creación inicial / Javier Montaño + Claude
