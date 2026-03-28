# TECNOLOGÍA T2 — Agentes IA
## Documento Canónico | Segmento: EMPRESAS

**Código:** TEC-02-EMPRESAS | **Versión:** 1.0 | **Fecha:** 2026-03-24
**Segmento:** Empresas (B2B — Corporativo)
**Precio canónico:** COP 1.5M - COP 10M (según nivel) | **Duración:** 2-8 semanas

---

## 1. Ficha Rápida
Desarrollo de agentes autónomos de IA que ejecutan workflows complejos sin intervención humana. Tres niveles: Simple (workflows lineales, 2w, 1.5M), Compuesto (decisiones multi-rama, 4w, 5M), Orquestador (coordinación de múltiples agentes, 8w, 10M).

**Objetivo:** Automatizar procesos end-to-end, ejecución autónoma de tareas, reducción radical de trabajo manual.

---

## 2. Definición y Alcance
Desarrollo de sistemas inteligentes autónomos que ejecutan procesos completos con mínima intervención humana. Basados en LLMs pero con capacidades de razonamiento, planeación y ejecución. Integraciones con APIs de sistemas empresariales para acciones reales.

**Niveles:**

**TEC-02-SIMPLE (COP 1.5M, 2 semanas)**
- Agente que ejecuta flujos lineales
- 2-3 integraciones con sistemas externos
- Monitoreo y reportes básicos
- Casos de uso: Clasificación de emails, entrada de datos, procesos de aprobación simple

**TEC-02-COMPUESTO (COP 5M, 4 semanas)**
- Agente que toma decisiones basadas en condiciones
- 3-5 integraciones multi-sistema
- Razonamiento y planning automático
- Manejo de excepciones y escalación
- Casos de uso: Procesamiento de facturas, gestión de inventario, resolución de tickets complejos

**TEC-02-ORQUESTADOR (COP 10M, 8 semanas)**
- Coordinación de múltiples agentes especializados
- Arquitectura de comunicación inter-agentes
- 5-10 integraciones complejas
- Machine learning para optimización continua
- Casos de uso: Operaciones de manufactura, cadena de suministro, gestión financiera integrada

---

## 3. Audiencia Corporativa
- **Decisor:** CIO, VP Operaciones, Director de Procesos
- **Usuario:** Equipos operacionales, especialistas que supervisan agentes
- **Rango empresarial:** Grandes PYMES a medianas (50+ empleados, procesos críticos)
- **Sectores:** Manufactura, logística, servicios financieros, retail, seguros

---

## 4. Propuesta de Valor
- **Automatización radical:** 60-80% reducción de trabajo manual en proceso
- **Velocidad:** Procesos 10-100x más rápidos
- **Costo:** Elimina FTE de tareas rutinarias
- **Disponibilidad:** 24/7 sin pausas, sin errores humanos
- **Escalabilidad:** Procesa miles de transacciones/día sin costo adicional
- **Inteligencia:** Aprende y mejora continuamente
- **Auditabilidad:** Trazabilidad completa de decisiones

---

## 5. Estructura y Fases

### Fase 1: Análisis y Diseño (Semanas 1-2)
- Workshop de procesos con stakeholders clave (4-6h)
- Análisis detallado de workflow actual
- Identificación de puntos de decisión y excepciones
- Mapeo de integraciones necesarias
- Definición de reglas de negocio y lógica

### Fase 2: Desarrollo del Agente (Semanas 2-6)
- Implementación de agente base
- Desarrollo de integraciones con sistemas
- Configuración de razonamiento y planning
- Manejo de excepciones y escalaciones
- Pruebas unitarias y de integración

### Fase 3: Entrenamiento y Validación (Semanas 6-7)
- Pruebas con datos reales (volumetría, casos edge)
- Ajuste de reglas y decisiones
- Simulación de procesos
- Validación de resultados vs. manual

### Fase 4: Deployment y Monitoring (Semana 8+)
- Rollout gradual (10% → 50% → 100% de volumen)
- Monitoreo intensivo (métricas, errores, performance)
- Optimizaciones post-launch
- Transición a operación estándar

---

## 6. Entregables

**Todos los niveles incluyen:**
1. Agente autónomo deployado y funcional
2. Documentación técnica (arquitectura, APIs, lógica)
3. Manual de operación (monitoreo, troubleshooting)
4. Capacitación a equipo de supervisión (4-8 horas)
5. 8 semanas de soporte incluidas

**Específicos por nivel:**

**SIMPLE:**
- Agente ejecutable vía API o UI simple
- Logs de ejecución y reportes diarios
- Acuerdos de servicio básicos
- 2-3 integraciones configuradas

**COMPUESTO:**
- Agente inteligente con razonamiento
- Dashboard de monitoreo (ejecuciones, tasas de éxito)
- Alertas para excepciones y escalaciones
- 3-5 integraciones complejas
- Manual de mantenimiento

**ORQUESTADOR:**
- Arquitectura de múltiples agentes
- Platform de orquestación customizada
- Analytics avanzados (bottlenecks, optimization)
- API empresarial para integraciones adicionales
- Centro de control centralizado
- SLA de 99.9% disponibilidad

---

## 7. Modelo Comercial
**Modelo:** Proyecto fijo + soporte incluido 8 semanas

| Nivel | Precio | Duración | Margin | ROI Cliente |
|-------|--------|----------|--------|-------------|
| Simple | COP 1.5M | 2 semanas | 55% | 1-2 meses |
| Compuesto | COP 5M | 4 semanas | 50% | 0.5-1 mes |
| Orquestador | COP 10M | 8 semanas | 45% | 1-2 meses |

**Ingresos recurrentes:** Mantenimiento/hosting (COP 500K-2M/mes) + optimización contínua (T&M)

---

## 8. Canal de Venta
- **Prospectación:** Empresas con procesos de alto volumen y bajo valor-add
- **Validación:** Análisis de ROI (# FTE × salario vs. costo del agente)
- **Propuesta:** Caso de uso + estimación de impacto + timeline
- **Cierre:** Contrato + SLA + equipo de operación identificado
- **Activación:** Kick-off análisis de procesos

---

## 9. Operación
**Equipo asignado:**
- 1 Senior Engineer (AI/Automation) (70% dedicación)
- 1 Systems Integration Engineer (80% dedicación)
- 1 QA/Testing Specialist (50% dedicación)
- 1 DevOps (30% dedicación para deployment)

**Herramientas:** LangChain, AutoGen, Python, FastAPI, Kubernetes, PostgreSQL, monitoring stack

**Stack típico:** LLM (GPT-4, Claude) + orchestration framework + integrations middleware + monitoring

---

## 10. Puente Educativo
- **Operación del agente:** Guía de inicio, casos normales vs. excepciones
- **Monitoreo:** Cómo leer logs, interpretar métricas, escalar issues
- **Mejora continua:** Cómo proponer nuevos procesos para automatizar
- **Webinar:** "Agentes IA en Operaciones" (1 hora)
- **Documentación:** Wiki interno del equipo cliente con playbooks

---

## 11. Soporte
- **8 semanas incluidas:** Disponibilidad M-V 8am-5pm, respuesta <2h para críticos
- **Post 8 semanas:** Opciones SLA (básico, estándar, premium)
- **Monitoreo:** Alertas automáticas si agente falla
- **Optimización:** Sesiones mensuales de mejora (primeros 3 meses)
- **Actualizaciones:** Updates y patches según necesidad

---

## 12. KPIs

**Funcionalidad:**
- Agente ejecuta flujos correctamente: 99%+ de ejecuciones exitosas
- Tiempo de procesamiento: <target time (variable por caso)
- Manejo de excepciones: 95%+ escaladas apropiadamente

**Impacto:**
- Reducción de trabajo manual: 60-80% en procesos cubiertos
- FTE liberados: Cálculo basado en volumen procesado
- Velocidad: 10-100x más rápido que manual
- Costo por transacción: <COP 500

**Operación:**
- Uptime: 99.5%+
- Tasa de escalación: <5% (excepciones que requieren humano)
- Satisfacción del equipo de supervisión: NPS 7+

---

## 13. Términos Comerciales
- **Pago:** 33% + 33% + 33% (inicio, semana 4, cierre)
- **Cronograma:** Máx. 8 semanas (según nivel)
- **Responsabilidades cliente:**
  - Acceso a APIs y sistemas integrados
  - Disponibilidad de 2-3 usuarios clave (4h/semana)
  - Datos de prueba y validación
  - Equipo de supervisión dedicado
  - Cambios en procesos comunicados
- **Responsabilidades MetodologIA:**
  - Agente funcional según especificación
  - Integraciones con sistemas identificados
  - Capacitación y documentación
  - Soporte 8 semanas
  - Optimizaciones post-launch
- **Cambios de alcance:** Integraciones/procesos nuevos = +COP 1M per item
- **Garantía:** Agente ejecuta procesos correctamente 90 días post-launch
- **IP:** Código del agente es propiedad del cliente
- **Escalación:** Volúmenes >10x estimado = renegociación
