# ÍNDICE MAESTRO - Consolidación del Ecosistema Comercial MetodologIA

**Versión:** 1.0
**Generado:** 2026-03-24
**Propósito:** Mapa de navegación completo del repositorio consolidado
**Audience:** Directores Comerciales, Product Owners, Líderes de Proceso, Auditores
**Última revisión:** 2026-03-24

---

## SÍNTESIS EJECUTIVA

Este índice maestro es la brújula de navegación para toda la operación comercial MetodologIA. Consolida tres vertientes de negocio (B2B, B2C, GTM) en un ecosistema coherente con 39 rituales, 13 procesos estándar, 34 assets y 32 knowledge graphs interconectados.

**Objetivo clave:** Permitir que cualquier ejecutivo, especialista o auditor encuentre en <30 segundos la documentación exacta que necesita para ejecutar, auditar o mejorar cualquier aspecto de la operación comercial.

---

## ESTRUCTURA DEL REPOSITORIO ORIGINAL

```
MetodologIA_Gobierno_Operativo/
├── procesos/
│   ├── proceso-comercial/
│   │   ├── MANIFIESTO.md                          (Principios rectores)
│   │   ├── AUDITORIA_COMPLIANCE.md                (Estándar de control)
│   │   ├── repositorio-canonico.json              (Fuente única de verdad)
│   │   ├── meta/
│   │   │   ├── checklist-gold-12.md               (12 criterios de excelencia)
│   │   │   └── auditoria-final-compliance.md      (Marco de auditoría)
│   │   ├── empresas/                              (B2B: 4 SOPs, 19 Rituales, 13 Assets)
│   │   │   ├── SOP-01-Scouting.md
│   │   │   ├── SOP-02-Discovery.md
│   │   │   ├── SOP-03-Propuesta.md
│   │   │   ├── SOP-04-Cierre.md
│   │   │   ├── rituales/
│   │   │   ├── assets/
│   │   │   └── knowledge-graphs/
│   │   ├── personas/                              (B2C: 5 SOPs, 11 Rituales, 7 Assets)
│   │   │   ├── SOP-01-Detección.md
│   │   │   ├── SOP-02-Activación.md
│   │   │   ├── SOP-03-Nurture.md
│   │   │   ├── SOP-04-Cierre.md
│   │   │   ├── SOP-05-Retención.md
│   │   │   ├── rituales/
│   │   │   ├── assets/
│   │   │   └── knowledge-graphs/
│   │   └── aliados/                               (GTM: 4 SOPs, 9 Rituales, 14 Assets)
│   │       ├── SOP-01-Evaluación.md
│   │       ├── SOP-02-Certificación.md
│   │       ├── SOP-03-Activación.md
│   │       ├── SOP-04-Escalada.md
│   │       ├── rituales/
│   │       ├── assets/
│   │       └── knowledge-graphs/
│   └── proceso-delivery-servicios/                (Soporte post-venta)
│       ├── MANIFIESTO.md
│       ├── aliados/
│       ├── empresas/
│       └── personas/
├── Dossier_Executive_1.html                       (Visión B2B)
├── Dossier_Executive_2.html                       (Visión B2C)
├── Dossier_Executive_3.html                       (Visión GTM)
├── Dossier_Executive_4.html                       (Visión consolidada)
└── Consolidacion/                                 (ESTE REPOSITORIO)
```

---

## ESTRUCTURA DE CONSOLIDACIÓN (PRESENTE)

```
Consolidacion/
│
├── 00-INDICE-MAESTRO.md                    ← ESTÁS AQUÍ
│   └── Mapa de navegación + Inventario
│
├── 01-RUNBOOK-COMERCIAL.md                 ← Playbook operativo unificado
│   └── Guía paso a paso para ejecución diaria
│
├── 01-RUNBOOK-COMERCIAL.html               ← Versión interactiva/ejecutiva
│   └── Dashboard operativo
│
├── rag/                                     ← Repository of All Guidelines
│   ├── rag-empresas-b2b.md                 ← Todo B2B (19 rituales, ~1800 líneas)
│   │   ├── Fase Scouting (5 rituales)
│   │   ├── Fase Discovery (4 rituales)
│   │   ├── Fase Propuesta (5 rituales)
│   │   ├── Fase Cierre (3 rituales)
│   │   ├── Fase Retención (2 rituales)
│   │   └── Assets B2B consolidados
│   │
│   ├── rag-personas-b2c.md                 ← Todo B2C (11 rituales, ~2500 líneas)
│   │   ├── Ritual Detección de Vida
│   │   ├── Ritual Calificación Emocional
│   │   ├── Ritual Mapeo de Fricción
│   │   ├── Ritual Secuencia de Nurture
│   │   ├── Ritual Aha Moment
│   │   ├── Ritual Cierre
│   │   ├── Ritual Onboarding Rápido
│   │   ├── Ritual Expansión
│   │   ├── Ritual NPS & Diagnóstico
│   │   ├── Ritual Referral Loop
│   │   ├── Ritual Win-Back
│   │   └── Assets B2C consolidados
│   │
│   ├── rag-aliados-gtm.md                  ← Todo GTM (9 rituales, ~2800 líneas)
│   │   ├── Ritual Evaluación de Fit
│   │   ├── Ritual Pitch & Alineación
│   │   ├── Ritual Certificación Técnica
│   │   ├── Ritual Onboarding
│   │   ├── Ritual SLA & Gobernanza
│   │   ├── Ritual Health Check Trimestral
│   │   ├── Ritual Co-Selling
│   │   ├── Ritual Escalada & Remedios
│   │   ├── Ritual Renewal & Upgrade
│   │   └── Assets GTM consolidados
│   │
│   ├── rag-delivery.md                     ← Proceso de Delivery post-venta
│   │   ├── Onboarding acelerado (72h)
│   │   ├── Quick Wins
│   │   ├── Health Scoring
│   │   ├── Rescue Playbooks
│   │   └── Expansion Opportunities
│   │
│   ├── rag-assets-legales.md               ← Templates, contratos, propuestas
│   │   ├── Master Service Agreement
│   │   ├── Proposal Template
│   │   ├── NDA Template
│   │   ├── Statement of Work
│   │   ├── Product Roadmap Template
│   │   ├── Partner Agreement
│   │   └── SLA Templates
│   │
│   ├── rag-kpis-metricas.md                ← Métricas consolidadas por vertical
│   │   ├── KPIs B2B (ACV, Win Rate, Cycle Time, etc.)
│   │   ├── KPIs B2C (CAC, LTV, NPS, Viral Loop, etc.)
│   │   ├── KPIs GTM (Activation Rate, SLA Compliance, etc.)
│   │   ├── Scoring Models (ICP Score, Lead Score, Health Score)
│   │   └── Dashboards recomendados
│   │
│   ├── rag-roles-spocs.md                  ← Roles y personas de responsabilidad
│   │   ├── Account Executives (B2B)
│   │   ├── Customer Success (B2B)
│   │   ├── Growth Specialists (B2C)
│   │   ├── Partner Managers (GTM)
│   │   ├── Operaciones Comerciales
│   │   ├── RACI Matrix completa
│   │   └── Escaladas por rol
│   │
│   └── rag-glosario-unificado.md           ← 130+ términos estándar
│       ├── Acrónimos comerciales
│       ├── Términos por vertical
│       ├── Definiciones de gates/rituales
│       └── Mapeo a documentación
│
└── mapas/                                   ← Visualizaciones y mapas
    ├── mapa-flujo-completo.md              ← Journey end-to-end (todas vertientes)
    │   ├── Flujo B2B: Señal → QBR
    │   ├── Flujo B2C: Evento de vida → Referral
    │   ├── Flujo GTM: Scout → Co-venta
    │   ├── Puntos de intersección (cross-selling)
    │   └── ASCII art de journeys completos
    │
    └── mapa-decision-gates.md              ← Criterios de avance (8+6+4 gates)
        ├── 8 Gates B2B con criterios
        ├── 6 Gates B2C con criterios
        ├── 4 Gates GTM con criterios
        ├── Data requirements por gate
        ├── Quién decide por gate
        └── Escalation paths
```

---

## INVENTARIO CUANTITATIVO

### Resumen General

| Elemento | B2B | B2C | GTM | Transversal | **TOTAL** |
|----------|-----|-----|-----|-------------|---------|
| **Procesos** | 1 | 1 | 1 | 1 | **4** |
| **SOPs** | 4 | 5 | 4 | - | **13** |
| **Rituales** | 19 | 11 | 9 | - | **39** |
| **Assets** | 13 | 7 | 14 | 7 | **41** |
| **Knowledge Graphs** | ~15 | ~9 | ~8 | - | **~32** |
| **Paso-a-pasos visuales** | 2 | 1 | 4 | - | **~7** |
| **Scoring Models** | 1 | 2 | 1 | - | **4** |
| **Gates de decisión** | 8 | 6 | 4 | - | **18** |

### Desglose por Vertical

#### B2B: Enterprise Sales (Empresas)

**Estructura de Fases:**
- **Scouting** (5 rituales): Prospecting, Account Planning, Research, Cold Outreach, First Meeting
- **Discovery** (4 rituales): Qualification, Pain Mapping, Solution Design, Stakeholder Alignment
- **Propuesta** (5 rituales): Business Case, Proposal Review, Executive Alignment, Internal Green Light, Market Readiness
- **Cierre** (3 rituales): Negotiation, Signature, Activation
- **Retención** (2 rituales): QBR, Renewal

**Assets Clave (13):**
- Plantilla ICP (Ideal Customer Profile)
- Account Plan Template
- Research Checklist
- Cold Email Script (3 versiones)
- Discovery Guide
- Pain Map Canvas
- Proposal Template
- Business Case Builder
- Executive Summary Template
- Contract Template
- Onboarding Plan
- QBR Agenda
- Renewal Playbook

**Decision Gates (8):**
G1: ICP Qualification → G2: Green Light → G3: Profitability → G4: Market Ready → G5: Deal Health → G6: Activation → G7: Health Score → G8: Renewal

---

#### B2C: Direct-to-Consumer (Personas)

**Estructura de Rituales:**
1. Detección de vida + Lead Source
2. Calificación Emocional
3. Mapeo de Fricción
4. Secuencia de Nurture
5. Aha Moment Identificado
6. Cierre (Compra)
7. Onboarding Rápido (72h)
8. Expansión & Upsell
9. NPS & Diagnóstico
10. Referral Loop Activado
11. Win-Back para Churn

**Assets Clave (7):**
- Life Event Detection Checklist
- Emotional Anchor Canvas
- Friction Audit Template
- Email Sequence (Nurture)
- Sales Page Copy
- Onboarding Guide
- Referral Program Guide

**Decision Gates (6):**
G1: Life Event Detected → G2: Lead Score → G3: Emotional Anchor → G4: Friction Audit → G5: Aha Moment → G6: NPS Threshold

---

#### GTM: Go-To-Market con Aliados (Aliados)

**Estructura de Rituales:**
1. Evaluación de Fit Inicial
2. Pitch & Alineación de Visión
3. Certificación Técnica
4. Onboarding & Enablement
5. SLA & Gobernanza Establecida
6. Health Check Trimestral
7. Co-Selling & Opportunity Pipeline
8. Escalada & Remedios
9. Renewal & Upgrade

**Assets Clave (14):**
- Partner Evaluation Framework
- Partner Agreement Template
- Pitch Deck
- Certification Program
- Training Materials
- SLA Template
- Co-Marketing Agreement
- Lead Sharing Protocol
- Opportunity Tracking Template
- Escalation Matrix
- Partner Portal Access Guide
- Health Check Dashboard
- Contract Template
- Renewal Playbook

**Decision Gates (4):**
G1: Fit Assessment → G2: Certification → G3: Pipeline Health → G4: SLA Compliance

---

## NAVEGACIÓN RÁPIDA POR CASO DE USO

### "¿Necesito prospectar una cuenta B2B nueva hoy?"
**Respuesta:**
1. Lee: `rag-empresas-b2b.md` → Sección "Fase Scouting"
2. Usa: `rag-empresas-b2b.md` → Assets: "Cold Email Script" + "ICP Qualification"
3. Ejecuta: `01-RUNBOOK-COMERCIAL.md` → B2B Daily Ritual
4. Reporta: En dashboard con métrica "Prospecting Activity"

**Tiempo esperado:** 45 min para prospectar + 15 min para documentar

---

### "¿Cuáles son los templates exactos para una propuesta B2B?"
**Respuesta:**
1. Descarga: `rag-assets-legales.md` → "Proposal Template"
2. Customiza usando: `rag-empresas-b2b.md` → Ritual "Business Case"
3. Valida con: `rag-empresas-b2b.md` → Gate G2 (Green Light) + G3 (Profitability)
4. Aprueba: Según RACI en `rag-roles-spocs.md`

**Tiempo esperado:** 3-5 horas para propuesta de calidad

---

### "¿Cómo calificamos un aliado GTM potencial?"
**Respuesta:**
1. Lee: `rag-aliados-gtm.md` → Ritual "Evaluación de Fit Inicial"
2. Usa: `rag-aliados-gtm.md` → Asset "Partner Evaluation Framework"
3. Pasa Gate: `mapa-decision-gates.md` → G1: Fit Assessment
4. Si pasa → Avanza a Certificación

**Criterios clave:** Complementaridad, capacidad técnica, referencias

---

### "¿Qué significa el scoring de ICP y cómo lo calculo?"
**Respuesta:**
1. Lee: `rag-kpis-metricas.md` → "ICP Scoring Model"
2. Obtén: Todos los campos en `rag-empresas-b2b.md` → Asset "ICP Template"
3. Puntúa: >70 = Discovery | 50-70 = Enrich | <50 = Nurture
4. Revisa: Gate G1 en `mapa-decision-gates.md`

---

### "¿Cómo onboardo un cliente nuevo en 72 horas?"
**Respuesta:**
1. Lee: `rag-delivery.md` → "Onboarding Acelerado (72h)"
2. Ejecuta: Lista de verificación + Quick Wins
3. Mide: Health Score en día 7
4. Escala: Si rojo → ver "Rescue Playbooks"

---

### "¿Cuál es el scoring de Lead para B2C?"
**Respuesta:**
1. Lee: `rag-kpis-metricas.md` → "B2C Lead Scoring Model"
2. Elementos: Life event relevancia (40%), Engagement (30%), Fricción identificada (30%)
3. Threshold: >60 = Invite to webinar | 40-60 = Continue nurture | <40 = Monitor

---

### "¿Qué significa EB, TS, UC, SLA, QBR, etc.?"
**Respuesta:**
1. Busca en: `rag-glosario-unificado.md`
2. Localiza: Definición + contexto de uso + vinculación a documentación

---

### "¿Cuál es la RACI completa para una venta B2B?"
**Respuesta:**
1. Consulta: `rag-roles-spocs.md` → "RACI Matrix - B2B Sales Cycle"
2. Por fase: Scouting → Discovery → Propuesta → Cierre → Retención
3. Escala: Si bloqueo → ver "Escalation Paths"

---

### "¿Cómo hago diagnosis de un cliente en riesgo?"
**Respuesta:**
1. Calcula: Health Score en `rag-kpis-metricas.md` → "Health Score Model"
2. Si Rojo: Activa `rag-delivery.md` → "Rescue Playbook"
3. Escalada: A Customer Success + Account Executive
4. Ritual: Diagnostic QBR (30 min)

---

### "¿Cuál es el flujo completo de un deal desde inicio a fin?"
**Respuesta:**
1. Visualiza: `mapa-flujo-completo.md` → "B2B Journey End-to-End"
2. Incluye: Todos los gates, rituales, decisiones y puntos de intersección
3. Usa para: Onboarding de nuevos AEs, auditoría de procesos

---

### "¿Cómo integro un aliado GTM en nuestro flujo de ventas?"
**Respuesta:**
1. Lee: `mapa-flujo-completo.md` → Sección "Intersecciones: Aliados → B2B"
2. Establece: Co-selling rituals en `rag-aliados-gtm.md` → Ritual 7
3. Mide: Lead quality y win rate de leads partner
4. Escalada: Si issues → `rag-roles-spocs.md` → Partner Escalation

---

## STRUCTURE DEL GLOSARIO (Preview)

Términos cubiertos en `rag-glosario-unificado.md`:

### Acrónimos Comerciales
- **ACV:** Annual Contract Value (valor anual)
- **CAC:** Customer Acquisition Cost
- **CLV/LTV:** Customer Lifetime Value
- **MRR/ARR:** Monthly/Annual Recurring Revenue
- **Win Rate:** % deals ganados / total oportunidades
- **Cycle Time:** Días desde primer contacto a firma
- **NPS:** Net Promoter Score
- **SLA:** Service Level Agreement
- **QBR:** Quarterly Business Review
- **EB:** Enterprise Buy (comprador enterprise)
- **TS:** Technical Sponsor (champion técnico)
- **UC:** Use Case (caso de uso específico)
- **SAL:** Sales Accepted Lead
- **SQL:** Sales Qualified Lead
- **CAL:** Company Accepted Lead

### Términos por Vertical
- **Prospecting, ICP, Cold Outreach, Discovery, Pain Map, Proposal, Green Light, Deal Health, Activation, Health Score** (B2B)
- **Life Event, Lead Score, Emotional Anchor, Friction, Aha Moment, NPS, Referral Loop** (B2C)
- **Partner Fit, Certification, Enablement, Co-Selling, SLA, Health Check** (GTM)

### Definiciones de Gates y Rituales
Cada término incluye:
- Definición clara
- Contexto de uso
- Responsable
- Métrica asociada
- Enlace a documentación detallada

---

## AUDIT & COMPLIANCE

### Cómo auditar este repositorio

1. **Completitud:** Verificar que todas las 39 rituales estén documentadas en rag/*.md
2. **Consistencia:** Revisar que glosario unifique terminología
3. **Trazabilidad:** Validar que cada gate tenga criterios y responsables claros
4. **Actualización:** Confirmar versión y fecha en cada documento
5. **Cobertura:** Asegurar que todos los 18 gates estén en `mapa-decision-gates.md`

### Marcos de referencia
- Original MANIFIESTO.md: Principios rectores
- AUDITORIA_COMPLIANCE.md: Estándar de control
- checklist-gold-12.md: 12 criterios de excelencia operativa

---

## PRÓXIMOS PASOS RECOMENDADOS

### Para Líderes Comerciales
1. Descarga `01-RUNBOOK-COMERCIAL.html` para dashboard diario
2. Comparte `rag-empresas-b2b.md` con tu equipo B2B
3. Revisa `rag-kpis-metricas.md` para alineación de objetivos

### Para Especialistas Operacionales
1. Usa `mapa-flujo-completo.md` para entrenar nuevos AEs
2. Implementa gates según `mapa-decision-gates.md`
3. Mantén actualizado `rag-glosario-unificado.md` con tu equipo

### Para Auditores Internos
1. Valida cobertura de procesos vs. 13 SOPs documentadas
2. Verifica SLAs en `rag-kpis-metricas.md`
3. Confirma RACI en `rag-roles-spocs.md`

---

## VERSIONING & CONTROL DE CAMBIOS

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-24 | Consolidación inicial de 3 verticales | MetodologIA Team |
| - | - | - | - |

---

## CONTACTO & SOPORTE

- **Duda sobre B2B:** Consulta rag-empresas-b2b.md + rag-roles-spocs.md
- **Duda sobre B2C:** Consulta rag-personas-b2c.md + rag-delivery.md
- **Duda sobre GTM:** Consulta rag-aliados-gtm.md + rag-kpis-metricas.md
- **Duda sobre procesos:** Consulta mapa-flujo-completo.md + mapa-decision-gates.md
- **Duda sobre términos:** Consulta rag-glosario-unificado.md

---

**FIN DEL ÍNDICE MAESTRO**

*Última actualización: 2026-03-24*
*Siguiente revisión programada: 2026-06-24 (quarterly)*
