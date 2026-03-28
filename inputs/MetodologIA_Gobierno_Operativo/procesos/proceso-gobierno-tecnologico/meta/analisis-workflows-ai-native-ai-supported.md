# Análisis: Clasificación de Procesos — AI-Native vs AI-Supported vs Manual

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** Chief Empowerment Officer
**Propósito:** Clasificar todos los procesos según nivel de integración con IA, identificar oportunidades, y definir la hoja de ruta AI-first.

---

## 1. Framework de Clasificación

| Nivel | Definición | Ejemplo |
|-------|-----------|---------|
| **AI-NATIVE** | No existiría sin IA. Diseñado alrededor de capacidades de IA. | Scoring de leads con LLM, contenido generado con IA |
| **AI-SUPPORTED** | Existe sin IA, pero IA lo amplifica 2-10x. Humano lidera. | Revisión de contratos asistida, facilitación con AI co-pilot |
| **AI-READY** | Manual hoy, pero estructurado para integrar IA con cambios menores. | Checklist de pre-firma, proceso CLM, cierre contable |
| **MANUAL** | Requiere juicio humano, interacción personal, o regulación que impide automatización. | Firma de contratos, negociación, comité de convivencia |

---

## 2. Clasificación de Todos los Procesos

### Procesos Misionales

| Proceso | Estado actual | Nivel posible | Oportunidades AI |
|---------|-------------|-------------|-----------------|
| Vender B2B | AI-READY | **AI-SUPPORTED** | Scoring con LLM, research de cuentas, propuestas draft, seguimiento automatizado |
| Vender B2C | AI-READY | **AI-NATIVE** | Funnel con chatbot, personalización masiva, nurturing generado |
| Gestionar Aliados GTM | MANUAL | **AI-SUPPORTED** | Matching aliados-clientes, monitoreo de performance |
| Entregar Workshop | MANUAL | **AI-SUPPORTED** | Co-facilitación IA, evaluaciones instantáneas, resúmenes post-sesión |
| Entregar Bootcamp | AI-READY | **AI-SUPPORTED** | Tutoring personalizado entre sesiones, evaluación automatizada |
| Entregar Programa Élite | MANUAL | **AI-SUPPORTED** | Diagnóstico con IA, tracking de progreso, insights |
| Entregar Consultoría | MANUAL | **AI-SUPPORTED** | Research con agentes, análisis de datos, entregables draft |
| Diseño Metodológico / I+D | MANUAL | **AI-NATIVE** | Ideación con brainstorming IA, diseño curricular asistido |
| Customer Success | MANUAL | **AI-NATIVE** | Health score automático, alertas predictivas, recomendaciones upsell |
| Comunidad y Contenido | MANUAL | **AI-NATIVE** | Calendario editorial IA, contenido draft, curaduría, analytics |
| Certificación y Calidad | AI-READY | **AI-SUPPORTED** | Evaluación de facilitadores con análisis de grabaciones, tests generativos |
| Vigilancia Tecnológica | MANUAL | **AI-NATIVE** | Agentes de monitoreo, resúmenes de papers, radar auto-generado |

### Procesos de Soporte

| Proceso | Estado actual | Nivel posible | Oportunidades AI |
|---------|-------------|-------------|-----------------|
| Pre-Sales | AI-READY | **AI-NATIVE** | Lead scoring, propuestas generadas, deal review predictivo |
| Operaciones Comerciales | AI-READY | **AI-SUPPORTED** | Forecast ML, anomalías facturación, conciliación automática |
| Onboarding Progresivo | AI-READY | **AI-SUPPORTED** | Formularios inteligentes, kickoff auto-generada |
| Gobierno Financiero | AI-READY | **AI-SUPPORTED** | Categorización gastos, alertas tributarias, borrador declaraciones |
| Gobierno Tecnológico | AI-READY | **AI-SUPPORTED** | Monitoreo seguridad, detección accesos anómalos, backup verification |
| Gobierno Talento Humano | MANUAL | **AI-READY** | Screening candidatos, análisis evaluaciones |

---

## 3. Quick Wins AI — Con Costo-Beneficio

| # | Workflow | Herramienta | Costo implementación | Tiempo ahorrado/mes | ROI estimado |
|---|---------|-------------|---------------------|---------------------|-------------|
| 1 | **Lead scoring automático** | Claude API + CRM data | 8-12h setup + 2h/mes mantenimiento | ~10h/mes (Sales deja de calificar manualmente) | Breakeven mes 2 |
| 2 | **Contenido orgánico draft** | Claude + templates de repurposing | 4-6h setup de templates + prompts | ~15h/mes (Marketing genera drafts 3x más rápido) | Breakeven mes 1 |
| 3 | **Radar semanal auto-generado** | Agente Claude + RSS feeds + summarization | 16-20h setup del agente + feeds | ~4h/semana del CEO = 16h/mes liberadas | Breakeven mes 2 |
| 4 | **Health score de clientes** | NPS data + engagement metrics → score | 12-16h de integración de datos | ~8h/mes (CSM prioriza mejor) + detección temprana de churn | Breakeven mes 2-3 |
| 5 | **Draft de propuestas** | Claude + plantilla-propuesta + datos del lead | 6-8h de prompt engineering | ~6h por propuesta, ~3 propuestas/mes = 18h/mes | Breakeven mes 1 |
| 6 | **Research pre-discovery** | NotebookLM + web research agents | 4-6h setup por tipo de industria | ~4h por proyecto de consultoría, ~4 proyectos/mes = 16h/mes | Breakeven mes 1 |
| 7 | **Tutoring entre sesiones** | Claude + material del bootcamp como contexto | 8-12h setup de contexto por bootcamp | Difícil cuantificar en horas; impacto en NPS y completion rate | Medir en NPS delta |
| 8 | **Evaluaciones generativas** | Claude + syllabus → tests adaptativos | 4-6h por servicio | ~3h por cohorte de creación manual de tests = ~6h/mes | Breakeven mes 2 |

**Inversión total estimada para Quick Wins 1-6:** 50-70 horas de setup = ~2 semanas de trabajo dedicado.
**Ahorro mensual estimado post-implementación:** 65-85 horas/mes = ~2 FTEs liberados para trabajo de mayor valor.

---

## 4. Evaluación de Riesgos por Integración AI

| Quick Win | Riesgo principal | Probabilidad | Impacto | Mitigación |
|-----------|-----------------|-------------|---------|------------|
| Lead scoring | **Sesgo en scoring** — IA replica sesgos del dataset de entrenamiento (ej: penalizar PYMES, favorecer sectores conocidos) | Media | Medio | Review humano semanal de scores. Auditar distribución por sector/tamaño cada mes. |
| Contenido draft | **Hallucination en claims** — IA inventa datos, cita fuentes falsas, o genera contenido genérico sin ángulo MetodologIA | Alta | Medio | Checklist de revisión obligatorio (sección 8 de política-uso-aceptable-ia.md). Nunca publicar sin edición humana. |
| Radar auto-generado | **False positives** — IA reporta señales irrelevantes como urgentes, o miss señales reales | Media | Bajo | Humano valida top 3 del radar antes de circular. Es un asistente, no un reemplazo. |
| Health score | **False confidence** — Equipo confía ciegamente en el score y deja de hablar con clientes | Media | Alto | Score es input para conversación, no sustituto. CSM debe validar con contacto real antes de actuar. |
| Draft de propuestas | **Leak de información de cliente A en propuesta de cliente B** — Contaminación de contexto | Baja | CRITICO | Cada propuesta se genera con contexto limpio (no reusar threads). Verificar que no hay nombres/datos de otro cliente. |
| Research pre-discovery | **Privacy leak** — Agente de research envía datos del cliente a APIs externas | Baja | ALTO | Usar solo información pública para research. Datos internos del cliente NUNCA van a la IA de research. |

---

## 5. Métricas Post-Implementación de IA

| Métrica | Qué mide | Cómo medir | Meta |
|---------|---------|-----------|------|
| **Tiempo ahorrado** | Horas liberadas por automatización | Before/after: medir tiempo del proceso manual vs. con IA | >50% reducción en procesos implementados |
| **Error rate** | Errores en outputs de IA que llegan a producción | # de errores detectados en review / total de outputs | <5% |
| **Human override rate** | Frecuencia con que el humano cambia la decisión de la IA | # overrides / total decisiones asistidas | 10-30% (muy bajo = no están revisando; muy alto = IA no sirve) |
| **Client satisfaction delta** | ¿El cliente nota la diferencia después de integrar IA? | NPS before/after por servicio | >= 0 (no debe bajar) |
| **Adoption rate** | % del equipo que realmente usa las herramientas IA | # usuarios activos / # usuarios con acceso | >80% a los 3 meses |

---

## 6. Guardrails Éticos — Donde IA NO Decide

| Dominio | Regla | Razón |
|---------|-------|-------|
| **Hiring / Firing** | IA puede informar (screening, análisis de evaluaciones) pero NUNCA toma la decisión de contratar o despedir | Sesgo algorítmico + dignidad humana + Ley 1010/2006 |
| **Legal** | IA genera borradores. NUNCA firma, NUNCA es la opinión final en temas legales | Responsabilidad profesional del abogado |
| **Financiero** | IA categoriza y sugiere. NUNCA autoriza pagos ni firma declaraciones | Responsabilidad del contador/representante legal |
| **Calificaciones finales** | IA puede generar evaluaciones pero la calificación final de un participante la da el facilitador humano | Credibilidad del certificado + juicio pedagógico |
| **Comunicación de crisis** | IA puede generar drafts de comunicación P1 pero el mensaje final lo aprueba CTO/COO | El tono y la empatía en crisis requieren juicio humano |
| **Pricing** | IA puede sugerir rangos basados en data pero el precio final lo decide el Dir. Comercial | Pricing es estrategia, no solo matemática |

---

## 7. Governance de IA en Procesos

| Nivel de riesgo | Ejemplos | Supervisión |
|----------------|----------|-------------|
| **BAJO** | Contenido orgánico, resúmenes internos, categorización de gastos | Review ligero (1 persona) |
| **MEDIO** | Propuestas comerciales, scoring de leads, evaluaciones educativas | Review por owner del proceso |
| **ALTO** | Contratos, declaraciones tributarias, certificados, comunicaciones al cliente | Review por experto (Legal/Contador/Chief) |
| **PROHIBIDO** | Firma de documentos, pagos, decisiones disciplinarias, datos personales a LLMs externos | IA NO participa |

---

## 8. Hoja de Ruta AI-First

| Trimestre | Iniciativa | Inversión (horas) | Impacto esperado |
|-----------|-----------|-------------------|-----------------|
| **Q2 2026** | Quick wins: Lead scoring + draft propuestas + radar semanal | 30-40h | Pipeline más limpio, CEO libera 16h/mes, propuestas 50% más rápidas |
| **Q3 2026** | Contenido: Calendario editorial AI + health score | 20-30h | Flywheel se activa, churn detection mejora |
| **Q4 2026** | Educación: Tutoring entre sesiones + evaluaciones generativas | 20-25h | NPS sube, completion rate bootcamps mejora |
| **Q1 2027** | Full AI-native: Agentes siempre activos + compliance assistant + cierre contable | 40-50h | Operación 2x más eficiente con mismo equipo |
