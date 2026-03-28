# Proceso: Gestionar Pre-Sales

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Owner:** Director Comercial
**Audiencia:** Sales Executives, Solution Architects, Deal Managers
**Tiempo de Ciclo:** 15-45 días (lead raw -> propuesta aprobada)
**Objetivo:** Convertir leads raw en oportunidades calificadas con propuestas aprobadas internamente, garantizando governance sobre pricing, descuentos y compromisos.

---

## 1. Propósito y Alcance

El proceso de Pre-Sales orquesta la **calificación, scoring, structuring y aprobación** de oportunidades comerciales antes de que entren al ciclo de venta formal. Es el filtro de calidad del pipeline.

**Incluye:**
- Recepción y registro de leads (de marketing, referidos, embajadores, aliados)
- Scoring cuantitativo de oportunidades
- Deal review semanal con governance
- Estructuración y aprobación de propuestas
- Negociación de términos contractuales
- Habilitación del equipo de ventas (enablement)

**NO incluye:**
- Generación de leads (upstream: marketing/community)
- Ejecución de delivery (downstream: proceso de delivery)
- Firma de contrato (downstream: `checklist-pre-firma.md`)
- Ventas por canal partner/reseller (proceso separado: GTM de aliados)
- Renovaciones automáticas (proceso de Customer Success)

### Interacción con Otros Procesos

| Dirección | Proceso | Interfaz |
|-----------|---------|----------|
| **Upstream** | Marketing / Community / Embajadores | Lead raw entra al QUALIFY |
| **Paralelo** | Onboarding F0-F1 (`proceso-onboarding-cliente`) | Se inicia en QUALIFY para recopilar datos del cliente |
| **Paralelo** | Legal / CLM | Revisión de cláusulas durante NEGOTIATE |
| **Downstream** | `checklist-pre-firma.md` | APPROVE alimenta el cierre formal |
| **Downstream** | Delivery / Staffing | Propuesta aprobada dispara asignación de equipo |

---

## 2. Supuestos Críticos

Si alguno de estos supuestos es falso, el proceso se rompe. Verificar ANTES de operar.

| # | Supuesto | Si es falso... | Validación |
|---|----------|----------------|-----------|
| S1 | Existe CRM para registrar leads y scores | No hay trazabilidad; scoring queda en hojas sueltas | Verificar con TI antes del Q1 |
| S2 | Director Comercial tiene 60 min/semana para Deal Review | Pipeline se estanca, deals avanzan sin governance | Bloquear agenda recurrente |
| S3 | Solution Architects disponibles para propuestas | Propuestas salen sin validación técnica | Confirmar asignación con Delivery |
| S4 | Catálogo de precios canónico está vigente y actualizado | Pricing inconsistente, descuentos calculados sobre bases erradas | Finanzas revisa trimestralmente |
| S5 | El equipo conoce los Red Lines de negociación | Reps ceden cláusulas no negociables | Capacitación en onboarding de ventas |

---

## 3. Fases del Proceso

```
QUALIFY -> SCORE -> REVIEW -> PROPOSE -> NEGOTIATE -> APPROVE
(3-5d)    (1d)    (semanal)  (5-10d)    (5-15d)     (2-3d)
```

### Decisión de Diseño: Por qué 6 fases separadas

> **Por qué SCORE no se fusiona con QUALIFY:** Separar permite re-scoring sin re-qualifying. Un lead puede entrar como WARM, recibir nueva información (ej: confirma budget) y re-scorse a HOT sin repetir el intake.
>
> **Por qué REVIEW existe como ceremonia separada:** Sin governance semanal, cada rep avanza deals sin visibilidad del Director Comercial. El Review es el mecanismo de portfolio management del pipeline.
>
> **Por qué APPROVE no se fusiona con PROPOSE:** La aprobación interna tiene SLA distintos según monto. Fusionarlos oculta el cuello de botella de aprobación en los KPIs.

### Fase 1: QUALIFY (3-5 días)
**SOP:** `calificar-oportunidad-presales-sop.md`

Recibe lead raw, valida datos mínimos, asigna a sales rep, inicia formulario F0/F1.

**Input:** Lead desde marketing, referido, embajador, aliado, o prospección directa.
**Output:** Lead registrado con datos básicos y asignación de owner.
**Gate:** Lead tiene nombre, empresa, y canal de contacto -> avanza a Score.

### Fase 2: SCORE (1 día)
**Asset:** `rubrica-scoring-leads.md`

Sales rep completa la rúbrica de scoring (5 dimensiones x 1-5 puntos). El score determina la ruta.

| Score | Clasificación | Acción |
|-------|-------------|--------|
| 18-25 | HOT | Avanza a Review inmediato |
| 12-17 | WARM | Avanza a Review en próximo ciclo semanal |
| < 12 | NURTURE | Devolver a marketing para nurturing |

**Output:** Lead con score cuantitativo y clasificación.

### Fase 3: REVIEW (Semanal)
**SOP:** `deal-review-sop.md`

Ceremonia semanal donde el Director Comercial revisa pipeline con el equipo. Decisiones: avanzar, holdear, o kill.

**Participantes:** Director Comercial, Sales Reps, Solution Architect (si aplica)
**Duración:** 60 minutos
**Output:** Pipeline limpio con decisiones documentadas.

### Fase 4: PROPOSE (5-10 días)
**SOP:** `aprobar-propuesta-sop.md`
**Template:** `plantilla-propuesta-comercial.md`

Estructurar propuesta comercial con pricing, alcance, timeline, y términos. Someterla a gate de aprobación interna.

**Gates de aprobación por monto:**

| Monto ODS | Aprobador | Plazo |
|-----------|----------|-------|
| < COP 20M | Director Comercial | 1 día |
| COP 20M - 50M | Director Comercial + COO | 2 días |
| > COP 50M | Director Comercial + COO + CEO | 3 días |

**Output:** Propuesta aprobada internamente, lista para enviar al cliente.

### Fase 5: NEGOTIATE (5-15 días)
**SOP:** `negociar-contrato-sop.md`

Cliente recibe propuesta, solicita cambios. Sales rep negocia conforme al playbook.

**Red Lines (no negociables):**
- Propiedad de metodologías y frameworks de MetodologIA
- Cláusula de confidencialidad
- Jurisdicción colombiana
- Limitación de responsabilidad

**Negociables (con aprobación):**
- Términos de pago (Finanzas)
- Descuentos (`matriz-autoridad-descuentos.md`)
- Alcance (Delivery)
- SLA específicos (Operaciones)

**Output:** Términos acordados mutuamente, listos para formalización.

### Fase 6: APPROVE (2-3 días)

Ejecutar `checklist-pre-firma.md` completo. Obtener firmas internas. Coordinar firma con cliente.

**Output:** Deal aprobado, contrato listo para firma.

---

## 4. Anti-Patrones

| Anti-Patrón | Consecuencia | Corrección |
|-------------|-------------|-----------|
| Saltar SCORE para acelerar el pipeline | Forecast inflado con deals de baja calidad; win rate cae | Todo lead debe scorsarse antes de entrar a Review |
| Director Comercial aprueba propuestas por WhatsApp | Sin audit trail; checklist-pre-firma falla en verificación | Aprobación solo por email o CRM con timestamp |
| Sales Rep negocia descuento sin solicitud formal | Margen se erosiona sin visibilidad de Finance | Rechazar deals sin formulario de descuento aprobado |
| Propuesta sin Solution Architect en deals >20M | Alcance mal definido; delivery hereda scope creep | SA obligatorio en propuestas >20M |
| Re-usar propuesta de otro cliente sin adaptar | Cliente detecta copy-paste; confianza destruida | Cada propuesta se construye desde la plantilla base |

---

## 5. Artefactos del Proceso

| Artefacto | Tipo | Ubicación |
|-----------|------|-----------|
| `rubrica-scoring-leads.md` | Asset (scoring matrix) | `assets/` |
| `matriz-autoridad-descuentos.md` | Asset (approval matrix) | `assets/` |
| `matriz-compensacion-ventas.md` | Asset (comp model) | `assets/` |
| `plantilla-propuesta-comercial.md` | Template | `assets/` |
| `battle-card-template.md` | Template | `assets/battle-cards/` |
| `calificar-oportunidad-presales-sop.md` | SOP | `references/sop/sop-calificacion-presales/` |
| `deal-review-sop.md` | SOP | `references/sop/sop-deal-review/` |
| `aprobar-propuesta-sop.md` | SOP | `references/sop/sop-propuesta-aprobacion/` |
| `negociar-contrato-sop.md` | SOP | `references/sop/sop-negociacion-contrato/` |
| `gestionar-enablement-sop.md` | SOP | `references/sop/sop-enablement/` |

---

## 6. KPIs

| KPI | Fórmula | Meta | Alerta |
|-----|---------|------|--------|
| Sales Cycle Time | Días desde MQL hasta firma | < 45d (B2B), < 15d (B2C) | >60d = revisar pipeline |
| Win Rate | Propuestas aceptadas / enviadas | > 30% | <20% = revisar scoring y calidad de propuestas |
| Pipeline Coverage | Pipeline total / cuota trimestral | > 3x | <2x = activar generación de leads |
| Average Deal Size | Revenue total / # deals | Crecimiento trimestral | Caída >15% = revisar pricing |
| Discount Frequency | % deals con descuento / total | < 20% | >30% = pricing canónico desalineado |
| Proposal Approval Time | Días solicitud -> aprobación interna | < 3 días | >5d = escalar con COO |
