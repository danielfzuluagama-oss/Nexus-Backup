# SOP: Definición y Mantenimiento de Oferta de Servicios (Documentos Canónicos)

## ENCABEZADO DE AUTORIDAD

**Uso previsto:** Governance de creación, mantenimiento y retiro de documentos canónicos de servicios.

**Regla de autoridad:** Este documento es la fuente única de verdad (SSOT) para cómo MetodologIA produce y evoluciona la definición comercial y operativa de cada servicio.

- **Owner:** Katherine (Chief Enablement Officer) — propietaria del proceso, templates, training, QA
- **Accountable:** Javier (Chief Empowerment Officer) — aprueba nuevos servicios y precios
- **Validador (embajadores):** Germán (Director de Operaciones) — asegura usabilidad en piso de ventas
- **Vigencia:** 2026 en adelante | Última revisión: 2026-03-24

---

## 1. DEFINICIÓN SIN CONFUSIONES

### ¿Qué es el Documento Canónico?

Un archivo .md que es la **SSOT (Single Source of Truth)** de un servicio. Vive en:
```
proceso-delivery-servicios/documentos-canonicos/[nombre-servicio].md
```

Es **THE** documento que alimenta:
- Propuestas comerciales
- Contratos y SOWs (Scope of Work)
- Briefs operativos a entregables
- Descripciones en Hub Unificado
- Capacitación de embajadores

**Principio rector:** "Lo contractual vive en este documento."

### ¿Qué NO es?

❌ Borrador de ventas pendiente feedback
❌ Documento "privado" del owner
❌ Página web (eso se genera DESDE el canónico)
❌ Flexible o negociable por embajador sin escalada

---

## 2. ESTRUCTURA DEL DOCUMENTO CANÓNICO (17 SECCIONES)

### Sección 0: Encabezado de Autoridad
- Uso previsto
- Regla de autoridad (quién aprueba cambios)
- Vigencia

### Sección 1: Ficha Rápida
Decisión en 60 segundos:
- Nombre comercial
- Tipo de servicio (Workshop | Bootcamp | Consultoría | Programa | Tech)
- Duración (horas / semanas)
- Modalidad (presencial | virtual | híbrido)
- Número máximo de participantes
- Deliverables (lista cerrada)
- Precio base (USD/COP)
- Certificación (sí/no, tipo)

### Sección 2: Definición Sin Confusiones
- **Qué es:** Definición en 200 palabras máximo
- **Qué NO es:** 3-4 anti-definiciones
- **Ubicación en ruta:** Dónde vive en la propuesta de valor MetodologIA

### Sección 3: Fit / Anti-Fit
- **Cliente ideal:** 3-4 perfiles con características
- **Anti-fit:** Quiénes NO deben entrar (y por qué)
- **Preguntas de calificación:** 5-7 preguntas para determinar fit

### Sección 4: Problema que Resuelve + Límites Éticos
- **Problema:** Deficiencia / dolor específico que resuelve
- **Límites:** Qué está FUERA de alcance (compliance, privacidad, responsabilidad)

### Sección 5: Diseño Pedagógico / Consultivo
- Enfoque de enseñanza / facilitación
- Principios de diseño
- Rol del facilitador

### Sección 6: Estructura del Programa / Agenda
- Desglose por módulo/día
- Duración de cada bloque
- Facilitador asignado (si aplica)

### Sección 7: Entregables y Accesos
- **Lista CERRADA** de entregables
- Acceso a templates, recordings, materiales
- Vigencia de acceso (ej: 12 meses post-cierre)

### Sección 8: Prerequisitos + Verificación 48h
- Conocimientos / herramientas requeridas
- Checklist de verificación 48h antes del inicio
- Responsable de verificación

### Sección 9: Contextualización
- Entrada esperada (conocimientos, experiencia)
- Salida esperada (competencias)
- Aplicabilidad (industrias, contextos)

### Sección 10: Operación y Escalamiento
- Equipo operativo (facilitador, asistente, soporte)
- Protocolo de escalamiento (si algo falla)
- Continuidad (qué pasa post-programa)

### Sección 11: Soporte y SLA
- Canales de soporte (email, Slack, soporte@)
- Tiempos de respuesta (SLA)
- Horarios de atención
- Escaladas (qué se escala a quién)

### Sección 12: Condiciones Comerciales
- **Precio base** (vigencia, moneda)
- **Descuentos** (volumen, early-bird, etc.)
- **Cuotas** (si es programa multi-pago)
- **Mora** (después de X días)
- **Reprogramación** (fecha límite, costo, políticas)
- **Garantía** (30 días dinero de vuelta si no es fit)
- **Crédito** (términos)

### Sección 13: Métricas de Éxito
- KPIs que miden éxito (adopción, satisfacción, ROI, etc.)
- Frecuencia de reporte
- Responsable de tracking

### Sección 14: Criterios de Aceptación (DoD)
- Definición de Hecho operativo (checklist de inicio)
- Definición de Hecho pedagógico (métricas post-programa)

### Sección 15: Casos Borde
- Escenarios no-happy-path
- Cómo resolver (sin perder principios)

### Sección 16: Anexos
- **Checklist 48h previo** (operación)
- **Brief estándar** (para embajadores)
- **Prompts estrella** (si aplica: IA, facilitación)
- **Contrato estándar** (si es diferente al modelo)

### Sección 17: Control de Versión
```
| Versión | Fecha      | Cambio                    | Aprobado por |
|---------|------------|---------------------------|--------------|
| 1.0     | 2026-03-24 | Creación inicial          | Javier       |
| ...     | ...        | ...                       | ...          |
```

---

## 3. SUPUESTOS EXPLÍCITOS

1. **Todo servicio que se vende DEBE tener documento canónico** antes de enviar primera propuesta.
2. **El canónico es base del contrato/SOW** — no existen documentos comerciales separados.
3. **Template es mandatorio en estructura** — content es adaptable a tipo de servicio.
4. **Katherine es dueña del proceso** — ella mantiene template, estándares, QA.
5. **Javier aprueba nuevos servicios Y precios** — el canónico no es oficial hasta su firma.
6. **Germán valida secciones "embajador-facing"** — brief, ficha rápida, fit/anti-fit.
7. **Versión control vive en la sección 17** — no existe "version history" separada.
8. **Revisión cadencia: trimestral + post-cambio significativo** — precios, estructura, alcance.
9. **HTML auto-generado para Hub Unificado** — md2html_v3.py convierte canónicos a web.

---

## 4. LÍMITES (START / STOP)

**START:** Nuevo servicio aprobado por C-Level (concepto validado, fit de mercado confirmado)

**STOP:** Documento canónico pasa quality gate y se publica en `documentos-canonicos/`

---

## 5. PROCEDIMIENTO (5 FASES)

### FASE 1: DISEÑO (0-2 semanas)
- Owner del servicio presenta concepto a Javier
- Validación inicial: "¿Hay mercado? ¿Fit con propuesta de valor?"
- C-Level approval → Javier da visto bueno

### FASE 2: REDACCIÓN (2-4 semanas)
- Owner completa template con contenido real
- Peer review: Katherine + 1 facilitador senior
- Rondas de feedback (máx 2)

### FASE 3: VALIDACIÓN (1 semana)
- Katherine valida against 10 criterios de aceptación (ver sección siguiente)
- Javier valida pricing + términos comerciales
- Germán valida usabilidad embajador

### FASE 4: PUBLICACIÓN (2 días)
- Copiar a `proceso-delivery-servicios/documentos-canonicos/[nombre-servicio].md`
- Ejecutar `md2html_v3.py [nombre-servicio].md` → genera HTML
- Actualizar Hub Unificado (agregar link + metadata)
- Comunicar a equipo de ventas

### FASE 5: MANTENIMIENTO (Ongoing)
- Revisión trimestral (ajustes menores)
- Post-cambio significativo: new version en sección 17
- Regenerar HTML si cambios sustanciales
- Katherine coordina updates; Javier aprueba cambios de precio/alcance

---

## 6. CRITERIOS DE ACEPTACIÓN (10 BINARIOS)

| # | Criterio | Verificación |
|---|----------|--------------|
| 1 | Todas 17 secciones presentes | ✅ Checklist en doc |
| 2 | Ficha rápida: completa + accionable | ✅ 60 segundos = decisión |
| 3 | Fit/anti-fit: claro + con preguntas calificación | ✅ Sales puede usarla |
| 4 | Pricing aprobado por Javier | ✅ Firma Javier en sección 0 |
| 5 | Sección 4 (ética): review completado | ✅ Signed by Chief Compliance (si existe) |
| 6 | Entregables (sec 7): lista cerrada, no "etc" | ✅ Sin ambigüedades |
| 7 | Anexos (sec 16): checklist 48h + brief + prompts | ✅ Prontos para piso |
| 8 | SLA (sec 11): definido + viables | ✅ Operación puede cumplir |
| 9 | Control versión (sec 17): inicializado | ✅ v1.0 con fecha + approver |
| 10 | Grammar/formato: sin errores ortográficos | ✅ Legible + profesional |

---

## 7. CASOS BORDE (Y RESOLUCIÓN)

### Caso 1: Servicio existe pero NO tiene canónico
**Resolución:** owner tiene 30 días para producir. Interim: usar "últimas 3 propuestas" como draft. Katherine supervisa redacción.

### Caso 2: Cambio de precio mid-quarter
**Resolución:** Nueva versión en sección 17 + aprobación Javier. Vigencia: nuevas propuestas post-approval. Propuestas en-flight: honor precio anterior + 48h grace.

### Caso 3: Dos servicios se fusionan
**Resolución:** Crear nuevo canónico para fusión. Archive los originales (marcar como deprecated en sección 0). Javier aprueba.

### Caso 4: Servicio es deprecated
**Resolución:** Sección 0 agrega: "DEPRECATED as of [date]. Replace with [nuevo servicio]." Mover a `documentos-canonicos/deprecated/`.

### Caso 5: Embajador pide modificar términos para cliente X
**Resolución:** NO. Escalara Javier. Si es patrón repetido → actualizar canónico → version bump. Nunca aceptar "variantes verbales."

### Caso 6: Canónico contradice propuesta enviada al cliente
**Resolución:** Immediate escalation a Javier. Revisar contract antes de firma. Enmienda si es necesario.

### Caso 7: Servicio "tech" (no tiene estructura pedagógica fija)
**Resolución:** Adaptar template: omitir "diseño pedagógico," reemplazar con "arquitectura técnica." Katherine pre-aprueba adaptación.

---

## 8. ANTI-PATTERNS (PROHIBIDO)

❌ **Crear propuesta sin canónico.** Always use as base.

❌ **Tener pricing "unofficial."** SOLO lo que está en sec 12 del canónico.

❌ **Embajador modifica términos verbalmente.** Escala a Javier siempre.

❌ **Template drift.** No reordenar secciones ni cambiar nombres sin Katherine approval.

❌ **Docs stale >6 meses.** Revisión trimestral es obligatoria.

---

## 9. HERRAMIENTAS

| Herramienta | Ubicación | Propósito |
|-------------|-----------|----------|
| **Template** | `sop-definicion-oferta/00-template-canonico-servicio.md` | Base para nuevos canónicos |
| **Repository** | `proceso-delivery-servicios/documentos-canonicos/` | Almacén centralizado |
| **Converter** | `/tools/md2html_v3.py` | Genera HTML para Hub |
| **Hub Unificado** | `Consolidacion/hub-unificado-v3/` | Punto de acceso público |
| **Brief template** | `Anexos/brief-estandar-embajadores.md` | Para piso de ventas |

---

## 10. GAP MATRIX (ESTADO ACTUAL)

| Servicio | Vertical | Estado | Owner | ETA |
|----------|----------|--------|-------|-----|
| ✅ De Ocupado a Productivo | Workshop | Publicado v1.0 | Katherine | — |
| ✅ Consultive Workshop EstrategIA | Workshop | Publicado v1.0 | Katherine | — |
| ✅ Bootcamp Trabajar Amplificado | Bootcamp | Publicado v1.1 | Javier | — |
| 🔨 Programa Empoderamiento | Programa Elite | En redacción | Germán | 2026-03-31 |
| 🔨 Programa Digital Champions | Programa Elite | En redacción | Germán | 2026-03-31 |
| ❌ Workshop 1-12 (WS-01 a WS-12) | Workshop | Backlog | TBD | Q2 2026 |
| ❌ Bootcamp 1-5 (BC-01 a BC-05) | Bootcamp | Backlog | TBD | Q2 2026 |
| ❌ Consultoría Tier 1 (Diagnóstico) | Consultoría | Backlog | TBD | Q2 2026 |
| ❌ Consultoría Tier 2 (Implementación) | Consultoría | Backlog | TBD | Q2 2026 |
| ❌ Consultoría Tier 3 (Transformación) | Consultoría | Backlog | TBD | Q2 2026 |
| ❌ Tech Service A (API Build) | Tecnología | Backlog | TBD | Q3 2026 |
| ❌ Tech Service B (Data Pipeline) | Tecnología | Backlog | TBD | Q3 2026 |
| ❌ Tech Service C (IA Coaching) | Tecnología | Backlog | TBD | Q3 2026 |
| ❌ Tech Service D (Security Audit) | Tecnología | Backlog | TBD | Q3 2026 |

**Cobertura actual:** 3/25 = **12%** | Meta 2026: **100%**

---

## 11. MÉTRICAS DE ÉXITO

### Métrica 1: Cobertura de Servicios (Coverage)
- **Definición:** % de servicios vendibles que tienen canónico v1.0+
- **Target:** 100% by 2026-Q4
- **Current:** 12% (3/25)
- **Frecuencia:** Mensual

### Métrica 2: Freshness de Documentos
- **Definición:** % de canónicos revisados en últimos 90 días
- **Target:** 100% (trimestral review cycle)
- **Frecuencia:** Trimestral

### Métrica 3: Adopción en Propuestas
- **Definición:** % de propuestas nuevas que referencia canónico como base
- **Target:** 100% (auditoría de muestra)
- **Frecuencia:** Mensual

### Métrica 4: Tempo de Redacción
- **Definición:** Días promedio de Fase 2 (Redacción) a Fase 4 (Publicación)
- **Target:** <30 días
- **Frecuencia:** Por nuevo servicio

### Métrica 5: Quality Gate Pass Rate
- **Definición:** % de canónicos que pasan validación en primera ronda
- **Target:** >80%
- **Frecuencia:** Por nuevo servicio

---

## 12. RESPONSABILIDADES CLARAS

| Rol | Responsabilidad |
|-----|-----------------|
| **Katherine (Owner)** | Mantener template; QA de canónicos; training de proceso; auditoría trimestral |
| **Javier (Accountable)** | Aprobar nuevos servicios; validar pricing; escaladas |
| **Germán (Validator)** | Usabilidad para embajadores; brief; fit/anti-fit |
| **Service Owner** | Redactar canónico completo; responder feedback; mantenimiento post-launch |
| **Facilitador Senior** | Peer review de contenido pedagógico / consultivo |

---

## 13. TIMELINE DE IMPLEMENTACIÓN

- **Week 1 (2026-03-24 a 2026-03-28):** SOP publicado; Katherine + Javier + Germán alignment
- **Week 2-3:** Redacción de 2 servicios en progreso (Programa Empoderamiento, Digital Champions)
- **Week 4:** Primera batch de canónicos publicados (meta: 5 servicios = 20% coverage)
- **Q2 2026:** Reducción de backlog; workshops + bootcamps
- **Q3 2026:** Servicios tech + consultoría
- **Q4 2026:** 100% coverage + maintenance rhythm establecido

---

## 14. CONTROL DE VERSIÓN

| Versión | Fecha      | Cambio                                              | Aprobado por |
|---------|------------|-----------------------------------------------------|--------------|
| 1.0     | 2026-03-24 | Creación inicial de SOP; 10x Elevation Protocol     | Javier       |

---

## 15. ESCALADAS

**Nivel 1:** Katherine ↔ Service Owner (contenido, template compliance)

**Nivel 2:** Javier (pricing, términos comerciales, nuevos servicios)

**Nivel 3:** C-Level (strategic pivot, depreciación de servicio)

---

## NOTAS CRÍTICAS

- **Este SOP es el "back office del front office."** Sin canónicos, el piso de ventas improvisa → incoherencia → mala experiencia.
- **"Lo contractual vive en este documento."** Es la regla de oro.
- **Cambios menores NO requieren nueva versión.** Typos, clarificación de una frase = update inline. Cambios sustanciales (precio, estructura) = version bump.
- **Embajadores deben poder vender SIN llamar a Katherine.** El canónico debe ser lo suficientemente claro.

---

**FIN DEL DOCUMENTO**
