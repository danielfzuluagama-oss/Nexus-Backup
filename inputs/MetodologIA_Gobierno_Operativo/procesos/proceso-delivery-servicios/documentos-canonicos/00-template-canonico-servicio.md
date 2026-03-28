# Template canónico

## Base de operación

Este documento es el SSOT del formato de documentación de workflows. Su función es asegurar que todos los workflows tengan la misma estructura, el mismo vocabulario operativo y la misma capacidad de auditoría. La regla es simple. La estructura no se negocia. El contenido sí.

## Debate socrático de diseño

Si permitimos que cada equipo cambie la estructura “para su caso”, ¿qué pasa cuando alguien nuevo intenta ejecutar o auditar? Pierde tiempo traduciendo formatos y se multiplican los errores silenciosos. La estructura fija reduce carga cognitiva y permite comparar workflows.

Si exigimos demasiada profundidad estratégica en todo workflow, ¿qué se rompe? La adopción. Por eso el template incluye contexto y consecuencia de segundo orden, pero permite que el “vector de valor” sea opcional.

Si pedimos evidencia para todo, ¿qué se rompe? La velocidad y la legibilidad. Por eso la regla es que solo las afirmaciones críticas requieren EVIDENCIA, SUPUESTO o POR CONFIRMAR.

Si el documento está perfecto pero nadie lo usa, ¿qué faltó? Un kit de adopción y una disciplina mínima de operación. Por eso el template incluye checklist de una pantalla, scripts de cambio y registro rápido de ejecución.

## Instrucciones de uso

Para documentar un workflow, copia este template en un archivo nuevo y reemplaza los placeholders. No cambies los nombres de secciones, el orden ni los IDs. Si necesitas variar un flujo, crea una variante o un sub workflow; no rompas la estructura.

Para cada afirmación crítica, usa la convención del sistema. EVIDENCIA cuando tengas fuente y localizador. SUPUESTO cuando propongas algo no verificado, con riesgo y plan de validación. POR CONFIRMAR cuando falte información y deba convertirse en pregunta.

## Mapa mínimo de compatibilidad con el estado de trabajo

Este template es la vista humana del workflow. El estado de documentación vive en el WTO. Un mapeo mínimo recomendado entre ambos.

```text
workflow_id -> wto.meta.workflow_id
status -> wto.meta.status
criticality -> wto.meta.criticality
execution_frequency -> wto.meta.execution_frequency
owner/backup -> wto.meta.owner
trigger -> wto.meta.trigger
outcome -> wto.meta.outcome
SLA -> wto.meta.sla
GT-### -> wto.gates[]
RK-### -> wto.risks[]
P-### -> wto.steps[]
```

## Plantilla

# **Workflow: {{Nombre claro y accionable. Ej: 'Cualificación de Leads B2B y Setup de Entorno'}}**

workflow_id: "WF-{{slug_en_minusculas_sin_espacios_ni_caracteres_especiales_usado_como_ID_unico}}"

name: "{{Nombre corto y de accionamiento rápido para referenciar el workflow en comunicaciones diarias, tickets y reuniones de sincronización. Ej: 'Setup de Entorno Técnico'}}"

status: "{{Estado actual de madurez operativa. Opciones: Draft (borrador sin uso) | Piloto (en pruebas controladas con 1 equipo) | Validado (aprobado y con data estable) | Estándar (oficial, auditado y de uso general) | Deprecado (en desuso, buscar reemplazo)}}"

criticality: "{{Nivel de impacto en el negocio si el proceso falla. Opciones: baja (impacto operativo interno menor) | media (impacta métricas de eficiencia y tiempos) | alta (impacta ingresos directos, compliance legal o seguridad del cliente)}}"

execution_frequency: "{{Frecuencia esperada para dimensionar la carga cognitiva y de servidores. Opciones: diaria | semanal | mensual | por_evento}}"

tags: ["{{Ej: ventas}}", "{{ej: onboarding}}", "{{ej: compliance}}"]

dependencies_upstream: ["{{WF-id}}", "{{WF-id}}"]

dependencies_downstream: ["{{WF-id}}", "{{WF-id}}"]

owner: "{{DRI, el dueño final del workflow}}"

backup_owner: "{{Backup owner para contingencias}}"

last_review: "{{YYYY-MM-DD}}"

next_review: "{{YYYY-MM-DD}}"

---

## **00) Resumen Ejecutivo (Abstract)**

**Una frase:** > {{Describe el workflow en una sola frase operativa. Debe ser entendible por alguien nuevo.}}

**1) Trigger (evento exacto):** {{Qué evento lo inicia, con detalle observable.}}

**2) Outcome (resultado verificable):** {{Qué debe quedar listo al final, con evidencia.}}

**3) DRI (dueño) y Backup:** {{DRI}} (Backup: {{backup}})

**4) Tiempo esperado (SLA):** {{Ej: 4 horas}}

**5) Gate crítico principal:** {{GT-001}}

**6) Riesgo fatal principal:** {{RK-001}}

---

## **0) Estrategia y Contexto (El "Por Qué")**

**Deep Dive Estratégico y Consecuencias de Segundo Orden:** > {{Explica con profundidad por qué la empresa invierte tiempo, nómina y capital en este proceso.

La Filosofía: Un operador debe leer esto y entender perfectamente cómo su trabajo impacta el balance general de la compañía. Si el operador no entiende el "Por qué", automatizará el error. Debes detallar qué sucede no solo hoy, sino a largo plazo si este proceso se degrada (efecto dominó).

Ejemplo: "Un setup deficiente en las primeras 48 horas aumenta la probabilidad de cancelación en un 40% durante el primer año. A nivel de primer orden, fallar aquí significa que el cliente se queja. A nivel de segundo orden, significa que el equipo de soporte se inunda de tickets, la moral de los ingenieros decae al apagar incendios en lugar de crear features, y Legal se expone a multas por incumplimiento de SLAs comerciales. Este workflow es nuestro cortafuegos principal contra el caos."}}

- **Trigger (Cuándo iniciar):** {{trigger}}
- **Outcome (Qué logramos):** {{outcome}}
- **Owner (A quién preguntar en caso de duda):** {{DRI}} (Backup: {{backup}})
- **SLA (Tiempo máximo esperado de punta a punta):** {{Ej: '4 horas'}}
- **Value Vector (KPIs impactados, opcional):** {{kpis_vector}}

---

## **1) Inventario de Recursos (Inputs, Outputs y Tools)**

### **📥 Insumos Obligatorios (Inputs)**

| Input       | Descripción | Fuente / Dónde se obtiene | Validación (cómo sé que está bien) | Owner del input |
| ----------- | ----------- | ------------------------- | ---------------------------------- | --------------- |
| {{Input 1}} | {{Qué es}}  | {{Sistema o persona}}     | {{Chequeo}}                        | {{Rol}}         |
| {{Input 2}} | {{Qué es}}  | {{Sistema o persona}}     | {{Chequeo}}                        | {{Rol}}         |

### **📤 Entregables Finales (Outputs)**

| Output       | Descripción | Dónde se entrega / guarda | Evidencia de entrega | Owner   |
| ------------ | ----------- | ------------------------- | -------------------- | ------- |
| {{Output 1}} | {{Qué es}}  | {{Drive/Jira/Email}}      | {{Link/ID}}          | {{Rol}} |
| {{Output 2}} | {{Qué es}}  | {{Drive/Jira/Email}}      | {{Link/ID}}          | {{Rol}} |

### **🛠 Herramientas y Permisos (Tools)**

| Tool       | Para qué se usa | Permiso requerido | Cómo verificar acceso | Plan B si no hay acceso |
| ---------- | --------------- | ----------------- | --------------------- | ----------------------- |
| {{Tool 1}} | {{Uso}}         | {{Permiso}}       | {{Chequeo}}           | {{Alternativa}}         |
| {{Tool 2}} | {{Uso}}         | {{Permiso}}       | {{Chequeo}}           | {{Alternativa}}         |

---

## **2) DoR y DoD (Contratos de Operación)**

### **🛑 Hard Stop: DoR (Definition of Ready)**

{{Lista de condiciones necesarias para iniciar. Si falla una, no se empieza.}}

### **🏁 Meta: DoD (Definition of Done)**

{{Lista de condiciones verificables para cerrar. Debe ser binaria y auditable.}}

---

## **3) Alcance y Excepciones (Guardrails)**

### **Cuándo USAR este workflow (In-Scope)**

{{Reglas claras de uso.}}

### **Cuándo NO usar y a dónde ir (Out-of-Scope / Anti-Scope)**

{{Reglas claras de no uso y workflow alternativo.}}

### **Casos Borde Frecuentes (Edge Cases)**

{{Lista de edge cases y cómo se manejan.}}

### **Proceso de Excepción (Waiver)**

{{Quién puede autorizar excepción, con qué criterio, y cómo se registra.}}

---

## **4) Secuencia Ejecutable (Táctica)**

### **E-001 — {{Nombre de la Etapa}}**

**Objetivo de la etapa:** {{Qué produce esta etapa.}}

**Pasos:**

**P-001 — {{Acción concreta}}**  
Detalle técnico: {{Cómo se ejecuta}}  
Outputs: {{Qué sale}}  
DoD del paso: {{Qué evidencia cierra}}  
Acelerador IA (opcional): {{AI-### o “no aplica”}}

**P-002 — {{Acción concreta}}**  
Detalle técnico: {{Cómo se ejecuta}}  
Outputs: {{Qué sale}}  
DoD del paso: {{Qué evidencia cierra}}  
Acelerador IA (opcional): {{AI-### o “no aplica”}}

### **E-002 — {{Nombre de la Etapa}}**

{{Repetir estructura.}}

---

## **5) Gates (Puntos de Control Verificables y Auditoría)**

### **GT-001 — {{Nombre del Gate}}**

Owner del gate: {{Rol o nombre}}

Criterios auditables:

1. Nombre del criterio: {{}}  
   Evidencia mínima: {{}}  
   Cómo verificar: {{}}  
   Umbral de éxito: {{}}  
   Consecuencia inmediata si falla: {{}}

### **GT-002 — {{Nombre del Gate}}**

{{Repetir estructura.}}

---

## **6) Medición, Salud y Aprendizaje (Operativa)**

### **📈 Señales (Leading Metrics)**

{{Métricas de fricción.}}

### **🎯 Resultados (Lagging Metrics)**

{{Métricas de impacto.}}

### **⚖️ Métricas de Contrapeso (Counter-Metrics)**

{{Métricas para evitar “optimizar y romper algo”.}}

### **⏱ Registro 2-min (Disciplina Operativa)**

Fecha: {{}}  
Workflow id: {{}}  
Owner ejecución: {{}}  
Entidad: {{}}  
Resultado: GO / NO-GO  
Fricciones severas: {{}}  
Próximo paso: {{}}

---

## **7) Gestión de Riesgos Sistémicos (Anti-Fragilidad)**

### **RK-001 — {{Nombre del Riesgo Fatal Central}}**

Riesgo operativo: {{}}  
Señales tempranas: {{}}  
Mitigación preventiva: {{}}  
Rescate (playbook mecánico): {{1) 2) 3)}}

### **RK-002 — {{Nombre del Riesgo de Dependencia Externa}}**

{{Repetir estructura.}}

---

## **8) Inteligencia Artificial Integrada y Plan B**

### **AI-001 — {{Nombre del Acelerador Principal}}**

Qué acelera: {{}}  
Input: {{}}  
Output: {{}}  
Guardrails: {{}}  
Human-in-the-loop: {{}}  
Plan B determinista: {{}}

---

## **9) Mejores Prácticas (Best Practices)**

{{Prácticas que reducen fricción.}}

---

## **10) Estándares Operativos (Standards)**

{{Estándares, políticas, nomenclatura.}}

---

## **11) Adopción, Cultura y Fricción Cero**

### **✅ Checklist 1-pantalla (Para el trabajo diario)**

{{Checklist ejecutable en una pantalla.}}

### **💬 Scripts de Comunicación y Gestión del Cambio (Copy & Paste)**

{{Scripts listos para usar.}}

---

## **12) AAR (After Action Review) y Mejora Continua**

Cadencia: {{}}  
Owner sesión: {{}}

Preguntas base:

1. ¿Qué esperábamos que pasara?
2. ¿Qué pasó realmente?
3. ¿Qué lo explica?
4. ¿Qué cambiaremos y por qué?
5. ¿Qué mediremos desde ahora?

### **Registro de Cambios (Changelog)**

{{Registro externo recomendado, sin versiones dentro del workflow.}}

---

## **13) Fundamentos Teóricos (Authors & Books)**

{{Opcional.}}
