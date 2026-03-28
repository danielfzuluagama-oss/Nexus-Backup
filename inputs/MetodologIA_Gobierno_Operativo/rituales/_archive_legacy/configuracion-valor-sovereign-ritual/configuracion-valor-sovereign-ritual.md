# Ritual: Configuración Valor Sovereign (B2B v3.0)

> [!IMPORTANT]
> **Estado:** Sovereign Gold Master v3.0
> **Objetivo:** Calcular con precisión quirúrgica el costo y margen de la solución para garantizar rentabilidad sin sacrificar la calidad técnica.
> **KPI:** Margen Bruto de Proyecto (Target: >35%).

## 1. Meta-Data del Ritual

- **DRI:** Operations Lead / COO.
- **Frecuencia:** Previa a la aprobación de cualquier propuesta comercial.
- **Herramientas:** Simulador de Costos, WBS Template, Allocation Matrix.
- **Sinergia:**
  - **Input:** Recibe el blueprint de [mapear-iq-tecnico-ritual.md](../mapear-iq-tecnico-ritual/mapear-iq-tecnico-ritual.md).
  - **Output:** Alimenta la tabla de inversión en [presentar-oferta-tecnica-ritual.md](../presentar-oferta-tecnica-ritual/presentar-oferta-tecnica-ritual.md).

## 2. Protocolo de Sinergia (Loop de Retroalimentación)

- **Pre-Ritual:** ¿El blueprint técnico ha sido validado por Ingeniería? Si no, retroceder al ritual de IQ Técnico.
- **Post-Ritual:** Si el margen proyectado es inferior al 30%, disparar fase de "Rediseño de Alcance" para eliminar 'features' de bajo valor y alto costo.

## 3. Algoritmo de Ejecución Profunda (2x Densidad)

### Paso 1: Desglose Atómico de Tareas (WBS)

**Contexto:** No estimamos "proyectos", estimamos "tareas atómicas" de máximo 8 horas.

**Acción:** Descomponer el blueprint en hitos y entregables granulados.
**Output:** WBS (Work Breakdown Structure) Completo.

### Paso 2: Asignación de Recursos y Perfiles

**Contexto:** El éxito depende de quién ejecuta. Definimos el mix Senior/Junior óptimo.

**Acción:** Asignar responsables por cada bloque del WBS.
**Output:** Resource Allocation Map.

### Paso 3: Cálculo de Gestión y Overhead Operativo

**Contexto:** Lo que no se mide, se pierde. Incluimos coordinación y comunicación.

**Acción:** Aplicar un peso del 15% al 20% sobre el esfuerzo base para Management.
**Output:** Total Effort (Managed).

### Paso 4: Prompt: El Auditor de Márgenes (10x)

**Contexto:** Buscamos fugas de valor en la estimación inicial.

**Acción:** Usar IA para detectar inconsistencias en el desglose de horas.
**Prompt de IA:** "Analiza este WBS: [Detalle]. Compara contra benchmarks de proyectos similares de MetodologIA e identifica 2 tareas que suelen estar subestimadas por el equipo de ventas."

**Output:** Corrección de Desvíos Probables.

### Paso 5: Definición de Contingencia y Risk Buffer

**Contexto:** El mundo real no es ideal. Protegemos el margen contra imprevistos técnicos.

**Acción:** Asignar un buffer de riesgo basado en la complejidad del IQ Técnico (Nivel 1-5).
**Output:** Risk-Adjusted Budget.

### Paso 6: Estructuración de Licencias e Infraestructura

**Contexto:** Los costos externos drenan el margen.

**Acción:** Listar costos de software de terceros y recursos en la nube necesarios.
**Output:** CAPEX/OPEX Tecnológico.

### Paso 7: Benchmarking de Proyectos Similares

**Contexto:** Aprendemos de la historia corporativa.

**Acción:** Comparar la estimación actual con proyectos cerrados exitosamente del CRM.
**Output:** Validación Histórica de Costos.

### Paso 8: Análisis de Ruta Crítica y Bloqueadores

**Contexto:** El tiempo es dinero. Identificamos qué retraso mataría el proyecto.

**Acción:** Mapear la secuencia de tareas que determina la duración mínima.
**Output:** Mapa de Ruta Crítica.

### Paso 9: Prompt: Simulación de Sobrecosto (Stress Test 10x)

**Contexto:** ¿Qué pasa si el proyecto se atrasa 2 meses?

**Acción:** Ejecutar un escenario de crisis con apoyo de IA para ver el impacto en el P&L.
**Prompt de IA:** "Simula un retraso de 4 semanas en el hito de [Nombre Hito]. Calcula el impacto en el margen y sugiere 3 acciones de contingencia inmediata para recuperar rentabilidad."

**Output:** Plan de Contingencia Financiera.

### Paso 10: Profitability Sign-off y Sincronización

**Contexto:** Operaciones da luz verde a Ventas para proponer.

**Acción:** Firmar la hoja de costos y sincronizar los datos finales al simulador de propuestas.
**Output:** Sign-off de Rentabilidad Validado.

## 4. Modal 10x: The "Margin Protector" (Prompt Maestro)

```markdown
PROMPT: 
"Tengo esta estructura de costos: [Datos].
1. Identifica el 'Punto de Equilibrio' del proyecto.
2. Sugiere un modelo de precios (Fixed vs Value-Based) que maximice el beneficio según el riesgo detectado.
3. Genera la justificación para el cliente sobre por qué la calidad técnica justifica esta inversión."
```

---
**Standard**: MetodologIA v3.0.0
