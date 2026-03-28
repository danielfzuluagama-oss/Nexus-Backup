# RAG Memory | KPIs y Métricas Consolidadas - Cross-Vertical

**Versión:** 1.0
**Última Actualización:** 2026-03-24
**Ámbito:** Consolidación de Métricas B2B, B2C y GTM

---

## INTRODUCCIÓN

Este documento consolida TODOS los KPIs y métricas operativas de las tres vertientes estratégicas de la organización:
- **B2B Empresas**: Ventas complejas, multiactor, ciclo largo
- **B2C Personas**: Adquisición y retención de usuarios finales
- **Aliados GTM**: Ecosistema de partners y co-selling

Cada métrica incluye definición clara, fórmula de cálculo, threshold de éxito y frecuencia de medición.

---

## MÉTRICAS B2B EMPRESAS

### FASE 1: SCOUTING (Prospección Cualificada)

#### ICP Fit Score (1-100)
- **Definición:** Puntuación que mide alineación entre empresa objetivo y perfil de cliente ideal (ICP)
- **Fórmula:** (Alineación Sector × 0.25) + (Tamaño/Ingresos × 0.25) + (Problemas Identificados × 0.25) + (Capacidad Presupuestaria × 0.25)
- **Escala:** 1-100 puntos
- **Threshold de Éxito:** >70 puntos (candidato a avanzar)
- **Threshold Crítico:** <50 puntos (descalificar)
- **Frecuencia:** Semanal por SDR
- **Propietario:** Sales Development Team

#### Stakeholder Density
- **Definición:** Cantidad de roles activos identificados en la organización objetivo
- **Fórmula:** Conteo de roles únicos identificados (Economic Buyer + Technical Steward + User Champion + Sponsor mínimo)
- **Métrica Mínima:** 3 roles activos confirmados
- **Métrica Óptima:** 5-7 roles identificados
- **Frecuencia:** Por oportunidad identificada
- **Propietario:** Account Executive

#### Engagement Velocity
- **Definición:** Velocidad de respuesta y participación de stakeholders en conversaciones iniciales
- **Fórmula:** (Respuestas en <24h / Total de contactos iniciales) × (Participantes únicos / Contactos realizados)
- **Escala:** Puntuación 1-10 (donde 10 es máxima velocidad)
- **Threshold:** >6 indica momentum positivo
- **Frecuencia:** Diaria
- **Propietario:** AE y SDR

#### Lead Source Attribution
- **Definición:** Origen del lead y su calidad inicial
- **Categorías:** Inbound Marketing, Referral, Cold Outreach, LinkedIn, Marketing Campaign, Event, Partnership
- **Métrica Clave:** Lead Source que genera >70 ICP Fit Score
- **Frecuencia:** Por cada nuevo lead
- **Propietario:** Marketing y Sales Development

#### Qualification Score (BANT Extension)
- **Definición:** Evaluación de Budget, Authority, Need, Timeline, Consequence, Competition
- **Fórmula:** (Budget Confirmed × 0.2) + (Authority Mapped × 0.2) + (Need Quantified × 0.2) + (Timeline Defined × 0.2) + (Consequence Clarity × 0.1) + (Competition Assessment × 0.1)
- **Escala:** 0-100%
- **Threshold Avance:** ≥75% para pasar a Discovery
- **Frecuencia:** Actualización semanal
- **Propietario:** AE

---

### FASE 2: DISCOVERY (Descubrimiento y Cuantificación)

#### Gap Quantification ($)
- **Definición:** Cuantificación monetaria de los gaps/problemas identificados en el cliente
- **Fórmula:** (Costo de Ineficiencia Actual × % Impacto Identificado) + (Oportunidad de Generación de Ingresos) - (Costos Operacionales)
- **Métrica de Éxito:** Gap identificado >$100K (B2B Mediano) o >$500K (Enterprise)
- **Validación:** Confirmado por Economic Buyer en Discovery Session
- **Frecuencia:** Por Discovery completado
- **Propietario:** AE y Presales

#### ROI Projection (%)
- **Definición:** Retorno sobre inversión proyectado por la implementación de la solución
- **Fórmula:** ((Beneficios Anuales - Costos Totales) / Costos Totales) × 100
- **Beneficios Incluyen:** Reducción de costos, incremento de ingresos, eficiencia operativa, reducción de riesgos
- **Threshold de Éxito:** ≥150% ROI anual
- **Validación:** Modelado en presencia de stakeholders financieros
- **Frecuencia:** Por cada Business Case
- **Propietario:** Sales Engineer / Presales

#### Consensus Level
- **Definición:** Grado de acuerdo entre stakeholders sobre la solución propuesta
- **Escala:**
  - Verde (Go): ≥80% de stakeholders confirmados en acuerdo
  - Amarillo (At Risk): 50-79% en consenso
  - Rojo (No Consensus): <50% en acuerdo
- **Validación:** Encuesta o confirmation call con cada stakeholder clave
- **Frecuencia:** Semanal durante Discovery
- **Propietario:** AE y Sales Manager

#### Business Case Payback Period
- **Definición:** Tiempo requerido para recuperar la inversión inicial mediante los beneficios generados
- **Fórmula:** Inversión Total / (Beneficios Mensuales Netos)
- **Métrica en Meses:** Tiempo hasta break-even
- **Threshold de Éxito:** ≤12 meses (preferentemente <6 meses)
- **Escenarios:** Base case, optimistic, pessimistic
- **Frecuencia:** Por Business Case
- **Propietario:** Sales Engineer

#### Net Present Value (NPV)
- **Definición:** Valor presente neto de los flujos de caja proyectados
- **Fórmula:** Σ [Flujo Neto en Año n / (1 + Tasa Descuento)^n] - Inversión Inicial
- **Tasa Descuento:** 15% (estándar corporativo)
- **Horizonte de Evaluación:** 3 años
- **Threshold:** NPV >$0 es viable; >$500K es muy atractivo
- **Frecuencia:** Por Business Case
- **Propietario:** Financial Analyst / Sales Engineer

#### Deal Progression Velocity
- **Definición:** Velocidad de avance del deal a través de Discovery
- **Métrica:** Días desde Discovery Start hasta Business Case Presentation
- **Target:** <30 días
- **Frecuencia:** Por oportunidad
- **Propietario:** AE

---

### FASE 3: STRUCTURING (Estructuración de Solución)

#### Proposal Completion Time
- **Definición:** Tiempo desde el cierre de Discovery hasta la presentación de propuesta formal
- **Métrica:** Días calendario
- **SLA Target:** ≤10 días hábiles desde confirmation de especificaciones
- **Partes Involucradas:** Sales, Presales, Legal, Finance
- **Frecuencia:** Por propuesta
- **Propietario:** AE

#### Design Review Cycles
- **Definición:** Número de iteraciones requeridas en revisiones de diseño/especificaciones
- **Métrica:** Conteo de ciclos hasta aprobación final
- **Target:** ≤2 ciclos (revisión inicial + aprobación)
- **Red Flag:** >3 ciclos indica desalineación con stakeholders
- **Frecuencia:** Por diseño de solución
- **Propietario:** Sales Engineer

#### Estimation Accuracy (vs Actual)
- **Definición:** Precisión de las estimaciones de recursos, timeline e inversión
- **Fórmula:** |Estimado - Actual| / Actual × 100 (% de desviación)
- **Target:** <10% desviación en presupuesto
- **Target:** <15% desviación en timeline
- **Seguimiento:** Comparativa post-implementación
- **Frecuencia:** Análisis mensual de deals cerrados
- **Propietario:** PMO / Delivery Manager

#### Profitability Margin
- **Definición:** Margen de ganancia esperado del deal
- **Fórmula:** ((Precio Venta - Costo Solución - Costo Implementación) / Precio Venta) × 100
- **Target Mínimo:** 40% margen bruto
- **Target Óptimo:** 55-65% margen bruto
- **Incluye:** Costos directos, overhead asignado, costos de adquisición
- **Frecuencia:** Por propuesta
- **Propietario:** Finance / Deal Manager

#### Proposal Win Rate by Design Type
- **Definición:** Tasa de cierre diferenciada por tipo de solución propuesta
- **Categorías:** Standard, Custom, Hybrid, Complex Integration
- **Métrica:** % de propuestas que resultan en firma
- **Target:** 40-50% win rate promedio
- **Seguimiento:** Por tipo de arquitectura
- **Frecuencia:** Mensual
- **Propietario:** Sales Manager

#### Deal Health Score (Green/Amber/Red)
- **Definición:** Evaluación del estado general de un deal específico
- **Componentes:**
  - Green: ICP Fit >80 + Consensus ≥80% + Presupuesto Confirmado + Timeline Definido
  - Amber: 2-3 componentes verdes; necesita atención
  - Red: <2 componentes verdes; riesgo de pérdida
- **Actualización:** Semanal
- **Acción Red:** Escalación a Sales Manager
- **Propietario:** AE con revisión de Sales Manager

#### Contract Negotiation Cycle
- **Definición:** Tiempo desde presentación de términos hasta firma
- **Métrica:** Días calendario
- **Target:** ≤14 días hábiles
- **Hitos:** Envío de contrato → Revisión Legal → Contrapropuesta → Firma
- **Frecuencia:** Por contrato
- **Propietario:** Legal / Deal Manager

---

### FASE 4: SUCCESS (Éxito y Expansión)

#### Time-to-Value (TTV)
- **Definición:** Tiempo desde Go-Live hasta que el cliente realiza su primer valor medible
- **Métrica:** Días desde implementación hasta first key metric achievement
- **Target:** <30 días para Quick Wins
- **Target:** <90 días para valor completo
- **Validación:** KPI principal del cliente alcanzado
- **Propietario:** CSM / Delivery Team

#### Adoption Rate (DAU/MAU)
- **Definición:** Proporción de usuarios activos diarios vs activos mensuales
- **Fórmula:** (Daily Active Users / Monthly Active Users) × 100
- **Target:** ≥70% DAU/MAU (indica uso consistente)
- **Rojo:** <40% DAU/MAU (señal de desadopción)
- **Frecuencia:** Diaria, reportada semanalmente
- **Propietario:** CSM

#### Feature Adoption Rate
- **Definición:** % de usuarios que han adoptado cada feature principal
- **Métrica:** Por feature crítica
- **Target:** ≥60% adoption en features tier-1
- **Red Flag:** <40% en features tier-1 dentro de 90 días
- **Seguimiento:** Por cohorte de usuarios
- **Frecuencia:** Mensual
- **Propietario:** Product / CSM

#### Health Score (Composite)
- **Definición:** Evaluación multidimensional de la salud de la relación cliente
- **Componentes:**
  - Product Usage (30%): DAU/MAU, feature adoption, login frequency
  - Support Quality (20%): Ticket resolution time, CSAT per ticket
  - Business Metrics (30%): KPI achievement vs targets, value attainment %, expansion signals
  - Engagement (20%): QBR attendance, response timeliness, strategic alignment
- **Escala:** 0-100 puntos
  - Verde: >75 puntos (Low Churn Risk)
  - Amarillo: 50-75 puntos (Monitor Closely)
  - Rojo: <50 puntos (Intervention Needed)
- **Actualización:** Semanal
- **Propietario:** CSM

#### Net Promoter Score (NPS)
- **Definición:** Medida de satisfacción y lealtad del cliente
- **Fórmula:** (% Promoters - % Detractors) × 100
- **Escala:** -100 a +100
- **Target:** ≥50 (considerado excelente)
- **Target Mínimo:** ≥30 (aceptable)
- **Rojo:** <0 (intervención urgente)
- **Frecuencia:** Trimestral mínimo, preferentemente semestral
- **Propietario:** CSM / Customer Success

#### Churn Rate
- **Definición:** Proporción de clientes que discontinúan el servicio
- **Fórmula:** (Clientes Perdidos en Período / Clientes Iniciales) × 100
- **Métrica Anual:** Target <5% para B2B Mediano
- **Métrica Anual:** Target <2% para Enterprise
- **Métrica MRR Churn:** Target <1% mensual
- **Análisis:** Involuntary (tecnológico) vs Voluntary (insatisfacción)
- **Propietario:** Chief Customer Officer / CSM Manager

#### Voluntary vs Involuntary Churn
- **Definición:** Diferenciación entre churn por insatisfacción vs razones externas
- **Voluntary:** Cliente elige discontinuar (problemas de uso, presupuesto, competencia)
- **Involuntary:** Cliente pierde capacidad de pago, cambio de dirección estratégica
- **Target Involuntary:** <1% anual
- **Target Voluntary:** <4% anual
- **Acción:** Involuntary requiere win-back; Voluntary requiere root cause analysis
- **Propietario:** CSM

#### Expansion Revenue
- **Definición:** Ingresos adicionales generados de clientes existentes
- **Componentes:**
  - Add-on Sales (nuevas módulos)
  - Upsell (upgrade de plan/capacidad)
  - Cross-sell (productos complementarios)
- **Métrica:** $ MRR/ARR expansion
- **Target:** 20-30% de ingresos de clientes existentes
- **Fórmula Gross Expansion Rate:** (Starting MRR + Expansion - Churn) / Starting MRR × 100
- **Propietario:** Account Manager / Strategic CSM

#### Upsell Closure Rate
- **Definición:** Proporción de oportunidades de upsell que se cierran exitosamente
- **Fórmula:** (Upsells Cerrados / Upsells Identificados) × 100
- **Target:** ≥25% closure rate
- **Métricas:** Por tipo de upsell, por industria vertical
- **Ciclo Típico:** 45-90 días
- **Propietario:** Account Executive / Strategic CSM

#### Value Attainment (%)
- **Definición:** Porcentaje de beneficios proyectados que se han realizado efectivamente
- **Fórmula:** (Beneficios Realizados / Beneficios Proyectados) × 100
- **Target:** ≥90% de beneficios proyectados en Business Case
- **Validación:** Medición con métricas del cliente, KPIs predefinidos
- **Frecuencia:** QBR (trimestral mínimo)
- **Propietario:** CSM

#### QBR (Quarterly Business Review) Attendance
- **Definición:** Participación de stakeholders clave en Business Reviews
- **Métrica:** % de QBRs conducidos vs planeados
- **Target:** 100% de QBRs scheduled completados
- **Asistentes Requeridos:** Mínimo EB o Sponsor + Technical Steward
- **Métrica de Éxito:** >2 stakeholders por QBR
- **Propietario:** CSM

#### NRR (Net Revenue Retention)
- **Definición:** Tasa neta de retención de ingresos incluyendo expansión
- **Fórmula:** ((Starting MRR + Expansion - Churn) / Starting MRR) × 100
- **Target:** ≥120% (fuerte crecimiento desde base existente)
- **Target Mínimo:** >100% (positivo)
- **Rojo:** <90% (significa más churn que expansion)
- **Propietario:** Finance / VP Sales

#### GRR (Gross Revenue Retention)
- **Definición:** Tasa bruta de retención sin expansion
- **Fórmula:** ((Starting MRR - Churn) / Starting MRR) × 100
- **Target:** >95%
- **Rojo:** <85% (indica problemas críticos)
- **Propietario:** Chief Customer Officer

#### Customer Lifetime Value (CLV)
- **Definición:** Valor total que se espera generar de un cliente durante la relación
- **Fórmula:** (Average Customer Revenue × Customer Lifespan in Years) - Customer Acquisition Cost
- **Métrica Alternativa:** ARPU × (1/(1-Retention Rate)) - CAC
- **Target:** CLV:CAC ratio ≥3:1
- **Seguimiento:** Por cohorte, industria, segmento
- **Propietario:** Finance / Chief Customer Officer

#### Customer Acquisition Cost (CAC)
- **Definición:** Costo promedio para adquirir un nuevo cliente
- **Fórmula:** Total Sales & Marketing Spend / New Customers Acquired
- **Métrica:** Comparado contra CLV
- **Target:** CAC Payback Period <12 meses
- **Seguimiento:** Por canal de adquisición
- **Propietario:** Finance / VP Marketing

#### Support Ticket Resolution Time
- **Definición:** Tiempo promedio para resolver tickets de soporte
- **Métrica:** Horas promedio desde creación hasta resolución
- **Target P1 (Critical):** <4 horas
- **Target P2 (High):** <24 horas
- **Target P3 (Medium):** <48 horas
- **Target P4 (Low):** <5 días
- **CSAT por Ticket:** Target ≥4.5/5.0
- **Propietario:** Customer Success / Support Team

#### Support CSAT (Customer Satisfaction Score)
- **Definición:** Satisfacción del cliente con soporte recibido
- **Escala:** 1-5 (1=Very Dissatisfied, 5=Very Satisfied)
- **Target:** ≥4.5/5.0 promedio
- **Métrica:** Por ticket, por agent, por categoría
- **Frecuencia:** Post-ticket automático
- **Propietario:** Support Manager

#### Logo Retention Rate
- **Definición:** Porcentaje de clientes (cuentas) que continúan cada año
- **Fórmula:** (Clientes Inicio Período - Clientes Perdidos) / Clientes Inicio Período × 100
- **Target:** ≥95% anual
- **Diferenciación:** Por segmento, edad de cuenta, tamaño de ARR
- **Propietario:** Chief Customer Officer

---

## MÉTRICAS B2C PERSONAS

#### Lead Conversion Rate
- **Definición:** Porcentaje de leads que se convierten en clientes pagos
- **Fórmula:** (Nuevos Clientes / Total Leads Calificados) × 100
- **Segmentación:** Por fuente, por cohorte, por persona tipo
- **Target:** 2-5% overall conversion
- **Target Premium:** 5-10% si nurturing efectivo
- **Frecuencia:** Diaria, agregada semanalmente
- **Propietario:** Marketing / Growth

#### Time to Aha Moment
- **Definición:** Tiempo desde first login hasta el evento que significa "comprendimiento de valor"
- **Definición Aha:** Primer uso de feature core, completar onboarding, alcanzar métrica clave
- **Métrica:** Días/horas promedio
- **Target:** <2 días en aplicación web
- **Target:** <5 días en producto enterprise
- **Rojo:** >7 días (señal de onboarding débil)
- **Propietario:** Product / Onboarding

#### Referral Rate per Client
- **Definición:** Porcentaje de clientes que generan al menos una referencia exitosa
- **Fórmula:** (Clientes que Refieren / Total Clientes) × 100
- **Métrica:** Referencias por cliente activo
- **Target:** ≥10% de clientes generan referencias
- **Métrica de Éxito:** >1 referencia por cliente referente
- **Propietario:** Growth / Marketing

#### Referral Conversion Rate
- **Definición:** % de referrals que se convierten en clientes pagos
- **Fórmula:** (Clientes Convertidos de Referral / Total Referrals) × 100
- **Métrica:** Comparado contra otras fuentes
- **Target:** 20-30% (típicamente mayor a otras fuentes)
- **Propietario:** Growth / Marketing

#### NPS Score (B2C)
- **Definición:** Net Promoter Score para usuarios individuales
- **Fórmula:** (% Promoters - % Detractors) × 100
- **Escala:** -100 a +100
- **Target:** ≥40 para B2C SaaS
- **Target:** ≥50 muy bueno
- **Frecuencia:** Mensual mínimo
- **Propietario:** Customer Success / Product

#### Retention Rate (B2C)
- **Definición:** Porcentaje de usuarios que permanecen activos período a período
- **Fórmula:** ((Usuarios Final Período - Nuevos Usuarios) / Usuarios Inicio Período) × 100
- **Métrica Mensual:** Target >90% MoM retention
- **Métrica Anual:** Target >70% YoY retention
- **Cohorte Retention:** Seguimiento por cohorte de signup
- **Propietario:** Product / Analytics

#### Revenue per Client
- **Definición:** Ingresos promedio generados por cliente
- **Métrica:** ARPU (Average Revenue Per User) o ARPPU (Average Revenue Per Paying User)
- **Fórmula:** Total Revenue / Total Users
- **Segmentación:** Por plan, por industria, por región
- **Target:** Crecimiento YoY >10%
- **Propietario:** Finance / Product

#### Nurturing Completion Rate
- **Definición:** % de leads que completan secuencia de nurturing
- **Fórmula:** (Leads que Completan Secuencia / Leads Iniciados) × 100
- **Métrica:** Por secuencia de correos, por fase
- **Target:** >40% completion
- **Rojo:** <20% completion (revisar contenido/timing)
- **Propietario:** Marketing / Growth

#### Email Engagement Metrics
- **Open Rate:** Target >25%
- **Click-Through Rate:** Target >5%
- **Unsubscribe Rate:** Target <0.5%
- **Frecuencia:** Por campaña
- **Propietario:** Marketing

#### Life Event Detection Rate
- **Definición:** Capacidad de identificar eventos de vida que disparan necesidad
- **Eventos:** Cambio de trabajo, promoción, cambio de rol, cambio de sector
- **Métrica:** % de leads identificados con life event
- **Target:** Correlacionar >30% de conversiones a life event detected
- **Propietario:** Marketing / Sales Development

#### Content Engagement Score
- **Definición:** Puntuación de engagement con contenido de marketing
- **Componentes:** Views, time on page, downloads, shares, comments
- **Métrica:** Por pieza de contenido, por autor, por tema
- **Frecuencia:** Mensual
- **Propietario:** Marketing

#### Landing Page Conversion Rate
- **Definición:** % de visitantes que completan acción deseada
- **Fórmula:** (Conversiones / Visitantes Únicos) × 100
- **Target:** >3% promedio (varía por tipo de página)
- **A/B Testing:** Mejora iterativa
- **Propietario:** Marketing / Growth

#### Viral Coefficient
- **Definición:** Factor de crecimiento viral (cada usuario trae N nuevos)
- **Fórmula:** Invitation Rate × Conversion Rate
- **Target:** >1.0 para crecimiento viral
- **Métrica:** >0.5 bueno, >0.7 muy bueno
- **Propietario:** Growth / Product

#### Cost Per Lead (CPL)
- **Definición:** Costo promedio para generar un lead
- **Fórmula:** Total Marketing Spend / Total Leads Generated
- **Segmentación:** Por canal, por campaña
- **Target:** Optimizar continuamente
- **Propietario:** Marketing

#### Customer Payback Period
- **Definición:** Tiempo para recuperar costo de adquisición
- **Fórmula:** CAC / (Margen de Contribución Mensual)
- **Target:** <12 meses
- **Target Óptimo:** <6 meses
- **Propietario:** Finance / Marketing

---

## MÉTRICAS ALIADOS GTM

#### Partner Pipeline Contribution
- **Definición:** Porcentaje de pipeline total originado por partners
- **Fórmula:** (Deals de Partners / Total Pipeline) × 100
- **Target:** 30-40% del pipeline total
- **Segmentación:** Por tipo de partner, por región
- **Frecuencia:** Mensual
- **Propietario:** Channel / Partner Management

#### Partner Deal Size (Promedio)
- **Definición:** ARR promedio de deals cerrados por partners
- **Métrica:** Comparado contra direct sales
- **Target:** Mínimo $50K ARR
- **Rango Óptimo:** $100K-$500K por deal
- **Propietario:** VP Channel

#### Co-sell Win Rate
- **Definición:** Tasa de cierre en oportunidades de co-selling
- **Fórmula:** (Deals Cerrados en Co-sell / Deals Iniciados en Co-sell) × 100
- **Target:** ≥35% win rate
- **Comparativa:** vs direct sales win rate
- **Propietario:** VP Sales / Channel

#### Time to Certification
- **Definición:** Tiempo requerido para que un partner complete certification
- **Métrica:** Días desde enrollment hasta pass certification exam
- **Target:** <60 días (8-10 semanas)
- **Hitos:** Material Review → Training → Hands-on Lab → Exam → Approval
- **Propietario:** Partner Enablement

#### Partner Enablement Completion Rate
- **Definición:** % de partners que completan programa de enablement
- **Fórmula:** (Partners Completados / Partners Enrollados) × 100
- **Target:** ≥85%
- **Rojo:** <70% indica problemas en programa
- **Seguimiento:** Por tipo de partner, por región
- **Propietario:** Partner Enablement

#### Revenue per Partner
- **Definición:** Ingresos generados por partner promedio
- **Métrica:** ARR / número de partners activos
- **Segmentación:** Por tipo (reseller, integrator, technology partner)
- **Target:** >$200K ARR per partner year 2+
- **Propietario:** Finance / Partner Management

#### Partner Concentration Risk
- **Definición:** Dependencia de top partners
- **Métrica:** % revenue from top 5 partners
- **Target:** <40% (diversificación)
- **Rojo:** >60% (riesgo alto)
- **Propietario:** VP Channel

#### Partner NPS
- **Definición:** Net Promoter Score específico para partners
- **Fórmula:** (% Promoters - % Detractors) × 100
- **Escala:** -100 a +100
- **Target:** ≥40 (aliados satisfechos)
- **Frecuencia:** Semestral
- **Propietario:** Channel Manager

#### Partner Satisfaction Score
- **Definición:** Evaluación multidimensional de satisfacción de aliados
- **Componentes:**
  - Support Quality (25%)
  - Training/Enablement (25%)
  - Profitability (25%)
  - Market Access/Support (25%)
- **Escala:** 1-10
- **Target:** ≥7.5/10
- **Frecuencia:** Anual
- **Propietario:** VP Partner Success

#### SLA Compliance Rate
- **Definición:** % de SLA metrics que se cumplen
- **SLAs Típicos:**
  - Lead response: <24 horas
  - Technical support: <4 horas P1, <24 horas P2
  - Deal approval: <5 días
  - Co-marketing engagement: <10 días
- **Target:** ≥95% compliance
- **Propietario:** Partner Operations

#### Partner Churn Rate
- **Definición:** Porcentaje de partners que discontinúan relación anualmente
- **Fórmula:** (Partners Perdidos / Partners Inicio Período) × 100
- **Target:** <10% anual
- **Análisis:** Involuntary vs voluntary
- **Propietario:** VP Partner Success

#### MDF (Marketing Development Fund) ROI
- **Definición:** Retorno sobre inversión en fondos de desarrollo de marketing
- **Fórmula:** (Deals Generados × Deal Size - MDF Spent) / MDF Spent
- **Target:** >3:1 ROI
- **Seguimiento:** Por actividad, por partner, por región
- **Propietario:** Channel Marketing

#### Co-marketing Campaign Performance
- **Definición:** Impacto de campañas de marketing conjunto
- **Métricas:** Leads generados, conversion rate, engaged accounts
- **Target:** >200 leads por campaña
- **Target:** >5% conversion rate
- **Propietario:** Channel Marketing

#### Partner-Influenced Revenue
- **Definición:** Ingresos influenciados pero no directamente originados por partners
- **Métrica:** Deals donde partner participó en cualquier fase
- **Target:** 40-50% del total revenue
- **Importancia:** Medir impacto completo del ecosistema
- **Propietario:** VP Sales / VP Channel

#### Certification Exam Pass Rate
- **Definición:** Porcentaje de candidatos que aprueban certification
- **Fórmula:** (Aprobados / Examinados) × 100
- **Target:** ≥80% pass rate (materiales de calidad)
- **Rojo:** <60% (revisar training)
- **Propietario:** Partner Enablement

#### Partner Referral Rate
- **Definición:** % de partners activos que refieren oportunidades
- **Fórmula:** (Partners que Refieren / Total Partners Activos) × 100
- **Target:** ≥50% referring partners
- **Métrica:** Promedio referrals por partner refierente
- **Propietario:** Partner Manager

#### Program Expansion by Partner
- **Definición:** % de partners que expanden a nuevos servicios/productos
- **Métrica:** Diversificación de oferta por partner
- **Target:** ≥40% de partners ofreciendo múltiples productos
- **Propietario:** VP Channel

---

## DASHBOARD TEMPLATE - CONSOLIDADO

| Métrica | Vertical | Fase | Definición Breve | Target | Actual | Status | Trend | Propietario |
|---------|----------|------|------------------|--------|--------|--------|-------|-------------|
| ICP Fit Score | B2B | Scouting | Alineación con perfil ideal (1-100) | >70 | 72 | Green | ↑ | SDR Manager |
| Stakeholder Density | B2B | Scouting | Roles activos identificados | ≥3 | 3.5 | Green | ↑ | AE |
| Engagement Velocity | B2B | Scouting | Velocidad de respuesta stakeholders | >6/10 | 6.8 | Green | → | AE |
| Qualification Score | B2B | Scouting | BANT extendido (%) | ≥75% | 78% | Green | ↑ | AE |
| Gap Quantification | B2B | Discovery | Problema cuantificado ($) | >$100K | $275K | Green | ↑ | Sales Engineer |
| ROI Projection | B2B | Discovery | Retorno proyectado (%) | ≥150% | 185% | Green | ↑ | Sales Engineer |
| Consensus Level | B2B | Discovery | Acuerdo stakeholders | >80% | 82% | Green | → | AE |
| Business Case Payback | B2B | Discovery | Recuperación inversión (meses) | <12 | 8 | Green | ↓ | Sales Engineer |
| NPV | B2B | Discovery | Valor presente neto ($) | >$500K | $1.2M | Green | ↑ | Financial Analyst |
| Proposal Completion Time | B2B | Structuring | Días a presentación | ≤10 | 9 | Green | ↓ | AE |
| Design Review Cycles | B2B | Structuring | Iteraciones de diseño | ≤2 | 2 | Green | → | Sales Engineer |
| Estimation Accuracy | B2B | Structuring | Desviación presupuesto (%) | <10% | 8% | Green | ↑ | PMO |
| Profitability Margin | B2B | Structuring | Margen bruto (%) | 40-65% | 52% | Green | → | Finance |
| Deal Health Score | B2B | Structuring | Estado deal (Color) | Verde | Verde | Green | → | Sales Manager |
| Contract Negotiation | B2B | Structuring | Días a firma | ≤14 | 12 | Green | ↑ | Legal |
| Time-to-Value | B2B | Success | Días a primer valor | <30 QW, <90 Full | 28 | Green | ↑ | CSM |
| Adoption Rate (DAU/MAU) | B2B | Success | % usuarios diarios | ≥70% | 74% | Green | ↑ | CSM |
| Feature Adoption | B2B | Success | % usuarios features tier-1 | ≥60% | 65% | Green | ↑ | Product |
| Health Score | B2B | Success | Salud relación (0-100) | >75 | 78 | Green | ↑ | CSM |
| NPS B2B | B2B | Success | Net Promoter Score | ≥50 | 52 | Green | ↑ | CSM |
| Churn Rate | B2B | Success | % clientes pérdida (anual) | <5% | 3.2% | Green | ↓ | CCO |
| Expansion Revenue | B2B | Success | Ingresos de clientes (%) | 20-30% | 24% | Green | ↑ | Account Manager |
| Upsell Closure Rate | B2B | Success | % oportunidades cerradas | ≥25% | 28% | Green | ↑ | Account Manager |
| Value Attainment | B2B | Success | % beneficios realizados | ≥90% | 92% | Green | ↑ | CSM |
| QBR Attendance | B2B | Success | % QBRs completados | 100% | 98% | Amber | ↑ | CSM |
| NRR | B2B | Success | Revenue retention neta (%) | ≥120% | 125% | Green | ↑ | VP Sales |
| Customer Lifetime Value | B2B | Success | CLV proyectado ($) | CLV:CAC ≥3:1 | 4.2:1 | Green | ↑ | Finance |
| Lead Conversion Rate | B2C | All | % leads a clientes | 2-5% | 3.8% | Green | → | Marketing |
| Time to Aha | B2C | Onboarding | Días a evento clave | <2-5 | 3.2 | Green | ↑ | Product |
| Referral Rate | B2C | Growth | % clientes que refieren | ≥10% | 12% | Green | ↑ | Growth |
| NPS B2C | B2C | Retention | Net Promoter Score | ≥40 | 45 | Green | ↑ | Customer Success |
| Retention Rate B2C | B2C | Retention | % usuarios activos | >90% MoM | 91% | Green | ↑ | Product |
| Revenue per User | B2C | Monetization | ARPU promedio ($) | +10% YoY | +12% | Green | ↑ | Finance |
| Nurturing Completion | B2C | Marketing | % secuencias completas | >40% | 42% | Green | ↑ | Marketing |
| Life Event Detection | B2C | Growth | % leads con evento | >30% conversión | 35% | Green | ↑ | Marketing |
| Partner Pipeline Contrib | GTM | Partnership | % pipeline de partners | 30-40% | 35% | Green | → | Partner Mgmt |
| Co-sell Win Rate | GTM | Partnership | % deals co-sell | ≥35% | 38% | Green | ↑ | VP Sales |
| Time to Certification | GTM | Enablement | Días a cert | <60 | 52 | Green | ↓ | Partner Enablement |
| Revenue per Partner | GTM | Partnership | ARR por partner ($) | >$200K Y2+ | $215K | Green | ↑ | Finance |
| Partner NPS | GTM | Partnership | Net Promoter Score | ≥40 | 43 | Green | ↑ | Partner Mgmt |
| SLA Compliance | GTM | Operations | % SLAs cumplidas | ≥95% | 96% | Green | ↑ | Partner Ops |
| Partner Churn | GTM | Partnership | % partners pérdida (anual) | <10% | 7% | Green | ↓ | VP Partner |
| MDF ROI | GTM | Marketing | Retorno MDF (ratio) | >3:1 | 3.5:1 | Green | ↑ | Channel Mktg |
| Co-marketing Performance | GTM | Marketing | Leads por campaña | >200 | 245 | Green | ↑ | Channel Mktg |

---

## CONVENCIONES Y NOTAS OPERATIVAS

### Colores de Status
- **Green:** KPI en o sobre target, tendencia positiva
- **Amber:** KPI en riesgo, requiere atención próxima
- **Red:** KPI bajo target, acción correctiva inmediata

### Tendencias
- **↑** Mejorando (positivo)
- **↓** Empeorando (negativo en contexto)
- **→** Estable

### Frecuencias de Medición
- **Diaria:** Metrics operacionales críticas (pipeline, engagement)
- **Semanal:** Health scores, adoption, velocity
- **Mensual:** Financial metrics, cohort analysis
- **Trimestral:** NPS, QBR, strategic alignment
- **Anual:** Strategic KPIs, budget planning

### Ownership y Escalación
- Cada métrica tiene propietario claro
- Thresholds rojo disparan escalación automática
- Weekly forecast review con propietarios
- Monthly deep dive en métricas under target

### Recomendaciones para Implementación

1. **Dashboard Centralizado:** Implementar dashboard real-time en Salesforce/Tableau
2. **Alertas Automáticas:** Configurar alertas para status Rojo
3. **Weekly Reviews:** Todos los propietarios revisan métricas semanalmente
4. **Root Cause Analysis:** Investigar desviaciones >15% vs target
5. **Continuous Optimization:** Quarterly review de targets vs industry benchmarks

