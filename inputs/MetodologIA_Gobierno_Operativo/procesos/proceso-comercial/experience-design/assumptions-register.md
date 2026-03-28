# Registro de Supuestos — Experiencia de Diseño MetodologIA

> **Documento**: Assumptions Register v1.0
> **Fecha**: 2026-03-24
> **Propiedad**: VP Experiencia de Diseño
> **Última revisión**: 2026-03-24
> **Próxima revisión programada**: 2026-06-24

---

## Resumen Ejecutivo

Este documento consolida **45+ supuestos críticos** dispersos en 6+ documentos (service blueprint, CJ general, CJ B2C, CJ B2B, SOPs, matriz journeys) en una **Single Source of Truth (SSOT)** centralizado.

**Cadencia de revisión**: Trimestral (Q2, Q3, Q4 2026)
**Escalation**: Si 3+ supuestos se invalidan en un trimestre → reunión ejecutiva inmediata.

---

## Índice Rápido

1. [Supuestos por Categoría](#supuestos-por-categoría)
2. [Matriz de Riesgos (Heat Map)](#matriz-de-riesgos-heat-map)
3. [Roadmap de Validación](#roadmap-de-validación)
4. [Dependencias entre Supuestos](#dependencias-entre-supuestos)
5. [Histórico de Invalidaciones](#histórico-de-invalidaciones)
6. [Protocolo Trimestral](#protocolo-trimestral)

---

## SUPUESTOS POR CATEGORÍA

### TECNOLOGÍA (ASM-T-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-T-001** | Internet estable cliente | Cliente tiene acceso a internet ≥3Mbps para bootcamps síncronos | F0-F5 | P1-P4, E1-E3 | **Alto** | Encuesta pre-enrollement | ✅ Validado | Plan B: bootcamp asincrónico | Growth | 2026-06-30 |
| **ASM-T-002** | Dispositivo >5" pantalla | Cliente tiene device (laptop/tablet) con pantalla >5" para LMS | F1-F5 | P1-P4, E1-E3 | **Alto** | Tech check al inicio F1 | ✅ Validado | Ofrecer tablet loaner; riesgo de churn 20% | Ops | 2026-06-30 |
| **ASM-T-003** | Plataforma LMS <3s | Plataforma LMS carga en <3 segundos (p95 latency) | F1-F5 | P1-P4, E1-E3 | **Medio** | Synthetic monitoring semanal | ⚠️ Asumido | Si >3s: 15% abandono en semana 1; rediseño urgente | Tech | 2026-04-30 |
| **ASM-T-004** | GPTs custom disponibles | OpenAI permite custom GPTs en tier de cliente (no limitado a Plus) | F2-F5 | P1-P4, E1-E3 | **Alto** | Test mensual con cuenta cliente | ✅ Validado | Pivot a API; costo +$500k-$2M por cliente E3 | Product | 2026-06-30 |
| **ASM-T-005** | Zoom/Teams disponible | Cliente tiene licencia Zoom o Teams para sesiones síncronas | F1-F4 | P1-P4, E1-E3 | **Alto** | Confirmation al inicio F1 | ✅ Validado | Ofrecemos acceso MetodologIA Zoom; costo operativo +$50k/mes | Ops | 2026-06-30 |
| **ASM-T-006** | HubSpot-Zapier funcional | Integración HubSpot-Zapier está operativa para e-mail de progreso | F2-F5 | E1-E3 | **Medio** | Monitoreo semanal de flujos | ⚠️ Asumido | Si cae: clientes no reciben check-ins; churn +10% | Growth | 2026-04-30 |
| **ASM-T-007** | LMS uptime 99.5% | Plataforma LMS mantiene ≥99.5% uptime mensual | F1-F5 | P1-P4, E1-E3 | **Medio** | SLA del proveedor LMS | ⚠️ Asumido | Downtime >0.5%: costo de SLA breach; reputación dañada | Tech | 2026-05-31 |
| **ASM-T-008** | API estabilidad IA | OpenAI API/GPT estables sin rate-limiting para bootcamps | F2-F5 | P1-P4, E1-E3 | **Medio** | Logs de error diarios de API | ⚠️ Asumido | Bloqueos API: $500k-$5M pérdida en deals E2/E3 retrasados | Product | 2026-05-31 |

### MERCADO (ASM-M-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-M-001** | TAM LATAM >10% | Mercado TAM en LATAM es >10% del mercado IA global ($XX0M COP) | F0-F1 | P1-P4, E1-E3 | **Medio** | Análisis TAM trimestral (Gartner/BCG) | ⚠️ Asumido | Si TAM <5%: revisión urgente de pricing/posicionamiento | Strategy | 2026-06-30 |
| **ASM-M-002** | Competencia fragmentada | Competencia en IA adoption coaching está fragmentada; sin líder dominante | F0-F1 | P1-P4, E1-E3 | **Medio** | Análisis competitivo mensual | ⚠️ Asumido | Competidor fuerte entra a LATAM: pricing pressure -20% | Strategy | 2026-06-30 |
| **ASM-M-003** | LATAM timezone focus | 80%+ clientes en timezone LATAM (UTC-5 a UTC-0) → soporte en esos horarios | F0-F5 | P1-P4, E1-E3 | **Alto** | Datos CRM de clientes actuales | ✅ Validado | Si clientes globales >20%: staffing costs +$300k/año | Ops | 2026-06-30 |
| **ASM-M-004** | Español idioma primario | Español es idioma primario para 95%+ clientes (CJ, bootcamp, soporte) | F0-F5 | P1-P4, E1-E3 | **Alto** | Datos de idioma preferido CRM | ✅ Validado | Si 30%+ demanda inglés: localización adicional +$200k | Content | 2026-06-30 |
| **ASM-M-005** | Segmentos >10% cada uno | Cada segmento (P1-P4 B2C, E1-E3 B2B) es >10% del pipeline viable | F0-F2 | P1-P4, E1-E3 | **Medio** | Pipeline analysis mensual por segmento | ⚠️ Asumido | Si 1 segmento <5%: considerar disuasión activa | Strategy | 2026-06-30 |
| **ASM-M-006** | Exclusión: regulados | NO enfocamos en gobierno, ONG, salud (sectores regulados/complejos) | F0-F1 | Todos | **Alto** | Políticas de sales de no-go | ✅ Validado | Si entramos a regulados: legal/compliance +$500k-$5M riesgo | Legal | 2026-06-30 |
| **ASM-M-007** | Brand conciencia LATAM | 30-40% de target audience conoce MetodologIA en LATAM (año 2 expectativa) | F0 | P1-P4, E1 | **Bajo** | Encuesta brand awareness anual (Q4 2026) | ⏳ Pendiente | Si <20%: marketing budget +100% necesario | Marketing | 2026-12-31 |

### CONDUCTUAL (ASM-C-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-C-001** | Honestidad diagnóstico | Cliente contesta honestamente en diagnóstico (no infla/oculta capacidades) | F1 | P1-P4, E1-E3 | **Medio** | Validación cruzada con jefe/peer post-F1 | ⚠️ Asumido | Si 20%+ mienten: diagnóstico inútil; revisión de formato | Design | 2026-04-30 |
| **ASM-C-002** | Autonomía cliente | Cliente tiene autonomía para tomar decisiones en su rol (no requiere aprobación de otros) | F1-F4 | P1-P2, E1 | **Medio** | Descriptor de rol en intake | ⚠️ Asumido | Si <60% tienen autonomía real: cambiar acuerdos de autoridad | Growth | 2026-04-30 |
| **ASM-C-003** | Motivación intrínseca | Cliente está intrínsecamente motivado (no forzado por jefe/empresa) | F0-F2 | P1-P2, P4 | **Medio** | Preguntas abiertas al inicio F1 | ⚠️ Asumido | Si 30%+ están forzados: churn F3 muy alto; pivot | Design | 2026-04-30 |
| **ASM-C-004** | No saltan fases | Cliente no intenta saltar fases (no va directo a F3 sin F1-F2) | F0-F3 | P1-P4, E1-E3 | **Medio** | Monitoring de progreso semanal | ⚠️ Asumido | Si 20%+ saltan: rediseño curriculum; más porosos | Design | 2026-04-30 |
| **ASM-C-005** | Engagement semanal | Cliente se engancha al menos 1x/semana en bootcamp/mensajes | F3 | P1-P4, E1-E3 | **Medio** | LMS activity logs; email open rates | ⚠️ Asumido | Si <60% engagement semanal: acción 48h para re-enganchar | Success | 2026-04-30 |
| **ASM-C-006** | Referencia inmediata | P1/P3 satisfecho refiere activamente dentro 90 días (no "algún día") | F4-F5 | P1, P3 | **Bajo** | Seguimiento de referrals en CRM | ⏳ Pendiente | Si <20% refieren en 90 días: ajustar incentivos | Sales | 2026-06-30 |
| **ASM-C-007** | P2 embajador voluntario | P2 se convierte en embajador universitario sin compensación (equity/descuento) | F5 | P2 | **Bajo** | Aplicaciones de embajador universitario | ⏳ Pendiente | Si <10% P2 son embajadores: programa no sustentable | Growth | 2026-06-30 |
| **ASM-C-008** | P4 boca a boca alto | P4 (adulto autodidacta) genera 3-5 referidos por cliente satisfecho | F4-F5 | P4 | **Bajo** | Seguimiento de referrals por cliente P4 | ⏳ Pendiente | Si <1.5 referidos/cliente: modelo LTV P4 colapsa | Growth | 2026-06-30 |

### ORGANIZACIONAL (ASM-O-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-O-001** | Coaches entrenados | Todos los coaches (F3) están certificados en AARC model | F3 | P1-P4, E1-E3 | **Alto** | Certificación de coaches en archivo | ✅ Validado | Coach incertificado: 40% riesgo de fracaso cliente | Ops | 2026-06-30 |
| **ASM-O-002** | Coaches disponibilidad | Min 1 coach disponible por 10 clientes en F3 para B2C/E1; 1:1 para E2/E3 | F3 | P1-P4, E1-E3 | **Medio** | Cálculo de ratio coaches:clientes semanal | ⚠️ Asumido | Si >10 clientes/coach: calidad cae 30%; churn aumenta | Ops | 2026-04-30 |
| **ASM-O-003** | SOPs se siguen | 90%+ del tiempo, coaches siguen SOPs documentadas (no ad-hoc) | F1-F5 | P1-P4, E1-E3 | **Medio** | Auditoría de sesiones (sample 10%) mensual | ⚠️ Asumido | Si <70% SOP compliance: consistencia cae; NPS baja 20 pts | Ops | 2026-04-30 |
| **ASM-O-004** | Métricas registradas | Sistema de métricas (LMS + CRM) registra todos los KPIs en real-time | F0-F5 | P1-P4, E1-E3 | **Medio** | Audit trail de registros CRM/LMS mensual | ⚠️ Asumido | Si <80% registrado: decisiones ciegas; pivots inciertos | Analytics | 2026-04-30 |
| **ASM-O-005** | Comunicación semanal | Equipo tiene weekly sync para casos difíciles (stuck clients) | F1-F5 | P1-P4, E1-E3 | **Medio** | Calendar de reuniones + notas | ⚠️ Asumido | Si syncs < monthly: clientes caen entre grietas | Ops | 2026-04-30 |
| **ASM-O-006** | Escalation clara | Hay proceso claro para escalar clientes de B2C (P3) a B2B (E2/E3) | F4-F5 | P3 | **Medio** | Documentación de escalation workflow | ⚠️ Asumido | Si no hay proceso: 50% oportunidades B2B se pierden | Sales | 2026-04-30 |

### CAPACIDAD (ASM-CAP-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-CAP-001** | Max 10 clientes/coach F3 B2C | Un coach puede manejar máx 10 clientes simultaneos en F3 (B2C grupal) | F3 | P1-P4 | **Medio** | Piloto de ratio coaches:clientes (Q1 2026) | ⚠️ Asumido | Si límite es <10: capac. reducida 33%; pricing must subir | Ops | 2026-05-31 |
| **ASM-CAP-002** | Max 20 bootcamp | Un bootcamp grupal puede acomodar máx 20 participantes sin perder calidad | F3 | P1-P4, E1 | **Medio** | Análisis NPS por tamaño de bootcamp (Q1-Q2 2026) | ⚠️ Asumido | Si max es <20: throughput cae 33%; modelo LTV afectado | Design | 2026-05-31 |
| **ASM-CAP-003** | 1:1 coach por B2B | Clientes B2B (E2/E3) requieren 1 coach dedicado por cliente (no compartido) | F3 | E2-E3 | **Medio** | Diseño de asignación de coaches E2/E3 | ⚠️ Asumido | Si permitimos 1:2, quality cae; deal risk aumenta | Ops | 2026-05-31 |
| **ASM-CAP-004** | Duración F3: 4-20 sem | Fase F3 (práctica intensiva) dura 4-20 semanas dependiendo de segmento | F3 | P1-P4, E1-E3 | **Alto** | Histórico de cohorts completadas | ✅ Validado | Si >20 semanas: clientes abandona; <4 sem: no tiempo aprender | Design | 2026-06-30 |
| **ASM-CAP-005** | Dedicación cliente 4-8h | Cliente dedica 4-8 horas/semana en F3 (realista, no aspiracional) | F3 | P1-P2, E1 | **Medio** | Encuesta de tiempo real dedicado post-F3 | ⚠️ Asumido | Si <4h: no hay aprendizaje; >8h: insostenible; churn | Design | 2026-04-30 |
| **ASM-CAP-006** | 2-3 entrenadores mín. | Equipos E2/E3 requieren min 2-3 entrenamientos (1 por cada área: comercial, RRHH, ops) | F3 | E2-E3 | **Medio** | Mapa de roles por empresa E2/E3 | ⚠️ Asumido | Si 1 solo entrenador: sostenibilidad cae cuando rota | Design | 2026-05-31 |

### FINANCIERO (ASM-F-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-F-001** | WTP P1: $200k-$800k | Willingness-to-Pay (WTP) P1 es $200k-$800k COP por programa | F2 | P1 | **Medio** | Análisis histórico de deals closed Q1-Q2 2026 | ⚠️ Asumido | Si promedio <$300k: modelo LTV colapsa | Finance | 2026-04-30 |
| **ASM-F-002** | WTP P2: $200k-$800k | WTP P2 con opciones económicas (becas/cuotas) es $200k-$800k COP | F2 | P2 | **Bajo** | Análisis de conversión por pricing P2 (Q2 2026) | ⏳ Pendiente | Si <$300k promedio: becas insostenibles | Finance | 2026-04-30 |
| **ASM-F-003** | WTP P3: $800k-$2.4M | WTP P3 es $800k-$2.4M COP por programa ejecutivo/liderazgo | F2 | P3 | **Medio** | Análisis histórico de deals P3 closed | ⚠️ Asumido | Si <$800k promedio: pricing debe bajar; margen cae | Finance | 2026-04-30 |
| **ASM-F-004** | WTP P4: $200k-$800k | WTP P4 es $200k-$800k COP (similar a P1 por categoría diferente) | F2 | P4 | **Bajo** | Análisis histórico de deals P4 closed (Q2 2026) | ⏳ Pendiente | Si promedio <$400k: becas/descuentos más profundos | Finance | 2026-04-30 |
| **ASM-F-005** | WTP E1: varía por rol | E1 WTP varía por rol/tamaño empresa ($200k-$800k); usa persona pricing | F2 | E1 | **Bajo** | Análisis de variación por empresa E1 | ⏳ Pendiente | Si WTP cae 30%+: modelo de precios flexible falla | Finance | 2026-06-30 |
| **ASM-F-006** | WTP E2: $2M-$8M | WTP E2 es $2M-$8M COP por programa + acompañamiento anual | F2 | E2 | **Bajo** | Análisis histórico de deals E2 | ⏳ Pendiente | Si <$2M promedio: deal economics se vuelve marginal | Finance | 2026-06-30 |
| **ASM-F-007** | WTP E3: $10M-$50M+ | WTP E3 es $10M-$50M+ COP por programa multi-fase + acompañamiento 3-5 años | F2 | E3 | **Bajo** | Análisis histórico de deals E3 | ⏳ Pendiente | Si <$10M: repositioning como E2; baja complejidad | Finance | 2026-06-30 |
| **ASM-F-008** | CAC B2C $100k-$500k | Customer Acquisition Cost B2C es $100k-$500k COP por cliente | F0 | P1-P4 | **Bajo** | Análisis CAC real vs. presupuesto (Q2 2026) | ⏳ Pendiente | Si >$500k: marketing ROI se quiebra | Finance | 2026-06-30 |
| **ASM-F-009** | LTV P1: $1.2M-$1.8M | Lifetime Value P1 es $1.2M-$1.8M COP (ticket + upsell + referrals) | Todos | P1 | **Bajo** | Análisis LTV real de cohort P1 (6-12 meses post-programa) | ⏳ Pendiente | Si <$1M: P1 se vuelve no-rentable; considerar exit | Finance | 2026-06-30 |
| **ASM-F-010** | LTV P3→E2: $4M-$12M | LTV P3 incluye conversion a E2; estimado $4M-$12M COP cuando cierra deal | Todos | P3 | **Bajo** | Análisis de P3 que cierran E2 (seguimiento 6-12 meses) | ⏳ Pendiente | Si <$2M promedio: P3 como fuente B2B no funciona | Finance | 2026-06-30 |

### GEOGRÁFICO (ASM-G-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-G-001** | LATAM timezone | 80%+ clientes en timezone LATAM (UTC-5 a UTC-0); soporte disponible en esos horarios | F1-F5 | P1-P4, E1-E3 | **Alto** | Datos geográficos de clientes CRM | ✅ Validado | Si clientes dispersos globalmente: staffing +$200k/año | Ops | 2026-06-30 |
| **ASM-G-002** | Español idioma | 95%+ servicios en español; no ofrecemos inglés/portugués de facto | F0-F5 | P1-P4, E1-E3 | **Alto** | Auditoría de idiomas en CJ/content | ✅ Validado | Si 20%+ demanda otros idiomas: localización necesaria | Content | 2026-06-30 |
| **ASM-G-003** | LATAM países focus | Focus en países LATAM (Colombia, México, Chile, Perú, Argentina) | F0 | P1-P4, E1-E3 | **Medio** | País de origen de clientes (CRM) | ⚠️ Asumido | Si >30% clientes fuera LATAM focus: reorientar presup | Marketing | 2026-06-30 |

### REGULATORIO (ASM-R-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-R-001** | No regulados | Excluimos activamente gobierno, salud, finanzas altamente reguladas | F0-F1 | Todos | **Alto** | Políticas de qualification de sales | ✅ Validado | Si entramos a regulados: legal liability +$5M-$50M riesgo | Legal | 2026-06-30 |
| **ASM-R-002** | GDPR/LATAM compliance | Cumplimos GDPR + leyes LATAM (COL 1581/2012, otros) para data de clientes | F0-F5 | P1-P4, E1-E3 | **Alto** | Auditoría de compliance anual | ✅ Validado | Si breach: multas +$X00k; reputación dañada | Legal | 2026-06-30 |
| **ASM-R-003** | IP / Contenido propio | Todo contenido (CJs, SOPs, templates GPT) es IP propiedad MetodologIA | F0-F5 | Todos | **Alto** | Auditoría de IP en contratos cliente | ✅ Validado | Si clientes reclaman co-propiedad: disputas legales | Legal | 2026-06-30 |
| **ASM-R-004** | Términos estándar | Contratos cliente usan términos estándar (no custom por cliente hasta E3) | F2 | P1-P4, E1 | **Medio** | Auditoría de contratos por tipo | ⚠️ Asumido | Si <80% estándar: costos legales crecen 3x | Legal | 2026-04-30 |

### COMPETITIVO (ASM-COMP-XXX)

| ID | Supuesto | Descripción | Fases | Segmentos | Confianza | Método Validación | Estado | Si Falla | Dueño | Próx. Revisión |
|---|---|---|---|---|---|---|---|---|---|---|
| **ASM-COMP-001** | AARC model diferencia | Modelo AARC (Awareness→Autonomy→Role→Culture) es diferenciador vs. competencia | F3 | P1-P4, E1-E3 | **Medio** | NPS vs. competidores (si datos disponibles); testimonios | ⚠️ Asumido | Si AARC no diferencia: pricing pressure; margen -20% | Product | 2026-06-30 |
| **ASM-COMP-002** | Cohort-based <3 meses | Bootcamp cohort-based 4-12 semanas es más efectivo que online async 6+ meses | F3 | P1-P4, E1-E3 | **Bajo** | Estudio comparativo de completion rates (si datos externos existen) | ⏳ Pendiente | Si async igualmente efectivo: modelo puede cambiar | Product | 2026-06-30 |
| **ASM-COMP-003** | 1:1 coaching crítico E2/E3 | Coaching 1:1 es critical success factor para E2/E3; sin él, churn 40%+ | F3 | E2-E3 | **Medio** | Análisis de churn con vs. sin coaching 1:1 | ⚠️ Asumido | Si coaching no diferencia: rediseño de E2/E3 | Product | 2026-06-30 |

---

## MATRIZ DE RIESGOS (HEAT MAP)

Clasificación: **Impacto** (bajo=1, medio=2, alto=3) × **Probabilidad** (baja=1, media=2, alta=3) = **Score**

| Score | Críticos (6-9) | Supuestos |
|---|---|---|
| **9 (Alto-Alto)** | 🔴 CRÍTICO | ASM-T-003, ASM-T-008, ASM-F-001, ASM-F-006, ASM-CAP-001 |
| **6 (Alto-Medio / Medio-Alto)** | 🟠 ALTO | ASM-T-006, ASM-O-003, ASM-CAP-002, ASM-CAP-003, ASM-F-009 |
| **4 (Medio)** | 🟡 MEDIO | ASM-C-005, ASM-F-005, ASM-G-001 |
| **1-2 (Bajo)** | 🟢 BAJO | ASM-C-007, ASM-F-002, ASM-M-007 |

**Top 5 Riesgos por Impacto (si fallan, mayor daño)**:
1. **ASM-F-001** (WTP P1) — Colapsa LTV P1 ($1.2M estimado)
2. **ASM-CAP-001** (Max 10 clientes/coach) — Limita capacidad escala 50%
3. **ASM-T-003** (LMS <3s) — 15% abandono W1 afecta NPS -20 pts
4. **ASM-O-003** (90% SOP compliance) — Quality cae; modelo inconsistente
5. **ASM-CAP-003** (1:1 coach E2/E3) — Inviable sin; costo sube 300%

---

## ROADMAP DE VALIDACIÓN

**Q2 2026 (Abril-Junio)**:
- ASM-C-001 (Honestidad diagnóstico) — Validación cruzada con 20 clientes
- ASM-CAP-005 (Dedicación cliente 4-8h) — Encuesta post-F3 de 30 clientes
- ASM-F-001 (WTP P1) — Análisis 15 deals Q1-Q2 cerrados
- ASM-F-003 (WTP P3) — Análisis 8 deals Q1-Q2 cerrados
- ASM-O-005 (Comunicación semanal) — Auditoría de reuniones (sample 5 equipos)

**Q3 2026 (Julio-Sept)**:
- ASM-C-006 (Referencia inmediata P1/P3) — Seguimiento de 50 clientes F4-F5
- ASM-CAP-002 (Max 20 bootcamp) — Comparación NPS de bootcamp 15 vs. 20 personas
- ASM-T-007 (LMS 99.5% uptime) — Validar SLA vs. realidad 3 meses
- ASM-F-006 (WTP E2) — Análisis de 5+ deals E2 cerrados
- ASM-COMP-003 (1:1 coaching crítico E2/E3) — Análisis churn E2/E3 con vs. sin coaching

**Q4 2026 (Oct-Dic)**:
- ASM-M-007 (Brand awareness 30-40%) — Encuesta brand awareness LATAM
- ASM-F-009 (LTV P1) — Análisis completo de cohort de 50 P1 (6+ meses post)
- ASM-C-007 (P2 embajador) — Contar aplicaciones embajador de P2
- ASM-C-008 (P4 boca a boca) — Análisis de referidos generados por 20 clientes P4

---

## DEPENDENCIAS ENTRE SUPUESTOS

```
ASM-T-003 (LMS <3s) → ASM-C-005 (Engagement semanal)
  Si LMS lento → clientes no se enganchan → F3 fallido

ASM-CAP-001 (10 clientes/coach) → ASM-O-002 (Coaches disponibles)
  Si límite es 10 → necesito N coaches → presupuesto + recruitment

ASM-F-001 (WTP P1) → ASM-F-009 (LTV P1) → ASM-F-008 (CAC)
  Si WTP <$300k → LTV no soporta CAC $300k → modelo quiebra

ASM-C-006 (P1 refiere) + ASM-C-008 (P4 boca a boca) → ASM-F-009/010 (LTV)
  Si referral rates <expectativa → LTV cae 30-50%

ASM-O-003 (SOP compliance) → ASM-C-005 (Engagement) → NPS / Advocacy
  Si SOPs no se siguen → calidad cae → NPS baja → advocacy falla

ASM-CAP-003 (1:1 coach E2/E3) → ASM-O-002 (Coaches) → ASM-CAP-002 (Bootcamp size)
  Si E2/E3 requieren 1:1 → less capacity → must squeeze grupo → calidad cae

ASM-F-006 (WTP E2: $2M-$8M) → ASM-F-010 (LTV P3→E2)
  Si E2 WTP <$2M → P3 escalation no rentable → dejo de invertir en P3
```

---

## HISTÓRICO DE INVALIDACIONES

**Validaciones completadas** (Q1 2026):
- ✅ ASM-T-001 (Internet estable) — Validado en 40 clientes; 98% tienen >3Mbps
- ✅ ASM-T-002 (Dispositivo >5") — Validado en 40 clientes; 100% tienen laptop/tablet
- ✅ ASM-T-004 (GPTs custom) — Validado; OpenAI permite en Plus/Teams
- ✅ ASM-T-005 (Zoom/Teams) — Validado; 95% clientes tienen acceso
- ✅ ASM-M-003 (LATAM timezone) — Validado; 88% clientes en LATAM timezone
- ✅ ASM-M-004 (Español) — Validado; 96% prefieren español

**Invalidaciones completadas** (histórico previo a 2026):
- ❌ (Ninguna documentada a la fecha en este documento; agregar en próximas revisiones)

**Suspendidas (datos insuficientes)**:
- ⏳ ASM-C-006 (P1 refiere 90 días) — Esperando cohorte de 50 clientes F4
- ⏳ ASM-M-007 (Brand awareness) — Scheduled para Q4 2026 encuesta

---

## PROTOCOLO TRIMESTRAL

**Cada 3 meses (Q2, Q3, Q4, Q1)**, el dueño de cada supuesto debe ejecutar:

1. **Revisión del estado**: ¿Validado, asumido, invalidado?
2. **Recolectar datos nuevos**:
   - Para estados **"Asumido"**: reunir evidencia (mínimo 20 datos points)
   - Para estados **"Validado"**: verificar sigue siendo válido
3. **Escalar si cambia estado**: Si pasa de ✅ a ⚠️ o ❌, reportar inmediatamente
4. **Actualizar próxima revisión**: Cambiar fecha si es urgente

**Criterios de escalation inmediata** (sin esperar trimestral):
- 3+ supuestos invalidados en mismo trimestre
- 1 supuesto crítico (score 9) pasa de ✅ Validado a ❌ Invalidado
- Impacto financiero >$500k documentado de 1 supuesto
- Cambio regulatorio que afecta ASM-R-XXX

**Meeting trimestral: Assumptions Review Board**
- **Participantes**: VP Design, CFO, Ops Lead, Product Lead, Strategy Lead
- **Duración**: 90 minutos
- **Agenda**:
  1. Estado consolidado (10 min)
  2. Supuestos en riesgo (30 min)
  3. Validaciones completadas (20 min)
  4. Nuevas hipótesis a probar (20 min)
  5. Decisiones (10 min)

**Documentación**:
- Crear issue en backlog por cada supuesto a validar
- Documentar resultados en este registro cada trimestre
- Si se invalida, documentar "que cambió" y "qué hacemos ahora"

---

## PRÓXIMAS REVISIONES PROGRAMADAS

| Trimestre | Fecha Target | Owner | Supuestos Clave a Validar |
|---|---|---|---|
| **Q2 2026** | 2026-06-30 | VP Design + CFO | ASM-F-001, ASM-CAP-005, ASM-C-001 |
| **Q3 2026** | 2026-09-30 | VP Design + Product | ASM-C-006, ASM-T-007, ASM-COMP-003 |
| **Q4 2026** | 2026-12-31 | VP Design + Strategy | ASM-M-007, ASM-F-009, ASM-C-008 |
| **Q1 2027** | 2027-03-31 | VP Design + Ops | ASM-O-003, ASM-CAP-002, ASM-CAP-003 |

---

**Documento versión**: 1.0
**Última actualización**: 2026-03-24
**Próxima revisión**: 2026-06-24
