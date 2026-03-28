# Proceso Misional: Certificación y Calidad Académica

**Versión:** 2.0.0 | **Fecha:** 2026-03-25 | **Owner:** Chief Enablement Officer
**Tipo:** MISIONAL — Garantiza la calidad del producto educativo

---

## 1. Propósito

Garantizar que todo servicio educativo (WS, BC, PE) mantiene calidad consistente, facilitadores certificados, contenido renovado, y certificados con valor.

**Pregunta:** ¿Cómo garantiza MetodologIA que lo que entrega hoy es tan bueno o mejor que ayer, independientemente de quién facilita?

---

## 2. Supuestos Críticos

1. **Chief Enablement tiene tiempo para QA** — Si no se dedican al menos 8h/semana a calidad, los estándares se erosionan silenciosamente.
2. **NPS se recolecta de verdad** — Si las encuestas post-sesión no se envían o no se analizan, el sistema de QA es ciego.
3. **Hay suficientes facilitadores para certificar** — Si solo hay 1-2 facilitadores, el sistema de certificación es un trámite, no un filtro.

---

## 3. Anti-patrones a Evitar

| Anti-patrón | Señal de alerta | Corrección |
|------------|----------------|------------|
| **"Facilitador intocable"** — Un facilitador estrella que nadie evalúa ni cuestiona | No tiene evaluaciones ni shadows hace >12 meses | Todos pasan por evaluación. Sin excepciones. |
| **"Contenido zombie"** — Material que lleva >18 meses sin actualización | Screenshots de herramientas obsoletas, referencias a versiones anteriores | Gate de frescura: actualización obligatoria cada 12 meses |
| **"Certificado de participación inflado"** — Emitir certificados sin verificar criterios | Se emiten certificados a personas que no asistieron o no aprobaron | Criterios de emisión son binarios y verificables. Sin excepciones. |

---

## 4. Decision Log

| Decisión | Alternativa | Razón |
|----------|------------|-------|
| Certificación interna de facilitadores (no externa) | Certificación por entidad externa | MetodologIA es la autoridad en su propio método. Certificación externa no agrega valor aún. Reconsiderar cuando haya >10 facilitadores. |
| NPS >= 8.5 como meta (no 8.0) | NPS >= 8.0 | MetodologIA compite en experiencia premium. 8.0 es bueno; 8.5 es la diferencia que genera advocacy. |
| QR verificable en certificados (no blockchain aún) | Blockchain verification | Blockchain agrega complejidad sin demanda actual. QR + base de datos verificable es suficiente. Reconsiderar en 2027. |

---

## 5. Path de Desarrollo de Facilitadores

| Nivel | Nombre | Requisitos | Beneficios | Duración típica |
|-------|--------|-----------|-----------|----------------|
| **L1** | **Apprentice** | Dominio del contenido (quiz >=80%). Ha observado >=2 sesiones del servicio. | Puede co-facilitar junto a L2+. No facilita solo. | 1-3 meses |
| **L2** | **Certified** | L1 + sesión de práctica evaluada (rúbrica >=8/10). | Puede facilitar solo. Certificación vigente 12 meses. | 3-6 meses en el rol |
| **L3** | **Senior** | L2 + >=10 sesiones facilitadas + NPS promedio >=8.5 + shadow positivo. | Puede mentorear Apprentices. Participa en diseño de nuevos servicios. Tarifa premium. | 6-12 meses en L2 |
| **L4** | **Master** | L3 + contribución a diseño de >=2 servicios + >=20 sesiones + invitado a co-diseñar con Chief Enablement. | Autoridad para certificar a otros. Puede representar a MetodologIA en eventos como speaker. | 12+ meses en L3 |

**Desertificación:** NPS promedio <7.0 en un trimestre → suspensión + plan de mejora 30 días. Si no mejora, regresa al nivel anterior.

**Re-certificación anual:** Todo facilitador debe recertificarse cada 12 meses (quiz actualizado + shadow).

---

## 6. Lifecycle de Contenido Educativo

```
DRAFT → REVIEW → APPROVED → LIVE → ARCHIVED → DEPRECATED
```

| Estado | Definición | Quién mueve al siguiente | Criterio para mover |
|--------|-----------|-------------------------|-------------------|
| **Draft** | Material en creación. No aprobado para uso. | Diseñador instruccional | Material completo (syllabus + facilitador guide + participante) |
| **Review** | En revisión por Chief Enablement y/o facilitador experto. | Chief Enablement | Feedback incorporado, sin errores factuales, alineado con estándares |
| **Approved** | Listo para usar. Puede asignarse a facilitadores. | Chief Enablement (aprueba) | Rúbrica de calidad pasada |
| **Live** | En uso activo con clientes. | Automático al primer delivery | Se usó con al menos 1 cohorte |
| **Archived** | Contenido retirado del catálogo activo pero preservado para referencia. | Chief Enablement | >6 meses sin uso, o reemplazado por versión nueva |
| **Deprecated** | Contenido obsoleto. No debe usarse. | Chief Enablement | Información incorrecta o herramienta ya no existe |

---

## 7. Validación Externa — Cuándo Buscar Acreditación

| Situación | Tipo de validación | Entidad | Cuándo considerar |
|-----------|-------------------|---------|-------------------|
| Programas de >120 horas que quieran emitir certificados con valor ante empleadores | Certificación de programa ante **MEN** (Ministerio de Educación Nacional) | MEN Colombia | Cuando al menos 1 programa élite tenga >3 cohortes exitosas y demanda constante |
| Programas técnicos para población específica (jóvenes, reinsertados) | Alianza con **SENA** para certificación de competencias laborales | SENA | Cuando MetodologIA quiera llegar a segmento B2G o formación para el trabajo |
| Credibilidad internacional | Partnership con **universidad** para co-certificación | Universidad acreditada (AACSB, EQUIS, o acreditada por CNA en Colombia) | Cuando programa élite quiera precio >$20M COP y competir con maestrías ejecutivas |
| Validación de calidad de proceso educativo | Certificación **ISO 21001** (gestión educativa) | Organismo certificador ISO | Cuando haya >50 cohortes/año y la calidad necesite estandarización formal |

---

## 8. Fases del Proceso

### Fase 1: Diseño Curricular
Todo servicio debe tener un Paquete Curricular: Syllabus + Material facilitador + Material participante + Evaluaciones + Ficha técnica.

**Taxonomía de Bloom:**
- WS: Recordar → Comprender → Aplicar (niveles 1-3)
- BC: Comprender → Aplicar → Analizar (niveles 2-4)
- PE: Analizar → Evaluar → Crear (niveles 4-6)

### Fase 2: Certificación de Facilitadores
Quiz (>=80%) → Sesión práctica (rúbrica >=8/10) → Feedback → Certificación (vigencia 12 meses).

### Fase 3: QA Continuo

| Mecanismo | Frecuencia | Si falla |
|-----------|-----------|---------|
| NPS post-sesión | Cada sesión | <7: feedback al facilitador en 48h |
| Evaluación pre/post test | Cada cohorte | Ganancia <30%: revisar material |
| Shadow observation | 1x/facilitador/semestre | Feedback + ajuste |
| Revisión de contenido | Cada 6 meses | Actualizar si hay cambios tecnológicos |

### Fase 4: Emisión de Certificados

| Tipo | Criterio | Formato |
|------|---------|---------|
| Asistencia (WS) | 100% asistencia | PDF + QR verificación |
| Aprobación (BC) | >=80% asistencia + >=70% evaluación final | PDF + QR + código único |
| Transformación (PE) | Programa completo + proyecto final aprobado | PDF + QR + carta de recomendación |

---

## 9. KPIs

| KPI | Meta | Frecuencia |
|-----|------|-----------|
| NPS promedio | >= 8.5 | Mensual |
| Ganancia de aprendizaje | >= 40% | Por cohorte |
| % facilitadores con certificación vigente | 100% | Mensual |
| % servicios con contenido <12 meses | 100% | Trimestral |
| Tasa aprobación bootcamps | >85% | Por cohorte |

---

## 10. Modelo de Madurez

| Nivel | Descripción | Estado |
|-------|-------------|--------|
| **1 — Inicial** | Calidad depende del facilitador individual. Sin rúbricas ni evaluaciones. | **<-- AQUI** |
| **2 — Definido** | Rúbricas activas. Certificación de facilitadores funcionando. NPS medido. | **META Q3 2026** |
| **3 — Gestionado** | Lifecycle de contenido implementado. Path de facilitadores activo. QA continuo. | META Q1 2027 |
| **4 — Optimizado** | Evaluaciones generativas con IA. Acreditación externa activa. Certificados con blockchain. | META 2027+ |
