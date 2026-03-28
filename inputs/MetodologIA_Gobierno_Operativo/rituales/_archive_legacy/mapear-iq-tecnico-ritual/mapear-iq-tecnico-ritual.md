# Ritual: Mapear IQ Técnico (B2B v3.0)

> [!IMPORTANT]
> **Estado:** Sovereign Gold Master v3.0
> **Objetivo:** Traducir los dolores de negocio en una arquitectura técnica sólida, minimizando la deuda técnica y garantizando la viabilidad de la implementación.
> **KPI:** Accuracy de Estimación Técnica (Target: >85%).

## 1. Meta-Data del Ritual

- **DRI:** Technical Sales Architect / Solutions Engineer.
- **Frecuencia:** Previa a la estructuración de la oferta comercial.
- **Herramientas:** LucidChart/Excalidraw, Documentación de APIs, Stack Navigator.
- **Sinergia:**
  - **Input:** Recibe el 'Discovery Digest' de [ejecutar-discovery-b2b-ritual.md](../../sop-discovery/references/rituales/ejecutar-discovery-b2b-ritual/ejecutar-discovery-b2b-ritual.md).
  - **Output:** Alimenta la inversión en [presentar-oferta-tecnica-ritual.md](../presentar-oferta-tecnica-ritual/presentar-oferta-tecnica-ritual.md).

## 2. Protocolo de Sinergia (Loop de Retroalimentación)

- **Pre-Ritual:** ¿Se han identificado las dependencias técnicas críticas? Si hay "Black Boxes", solicitar una sesión de profundización técnica antes de diseñar.
- **Post-Ritual:** Si la complejidad técnica supera el Nivel 4, elevar a "Comité de Riesgos" interno antes de proponer al cliente.

## 3. Algoritmo de Ejecución Profunda (2x Densidad)

### Paso 1: Auditoría de Requisitos (Must-Haves)

**Contexto:** No diseñamos lo que el cliente quiere, sino lo que necesita para que el ROI sea real.

**Acción:** Filtrar la lista de requisitos del Discovery en: Innegociables, Deseables y Futuros.
**Output:** Lista de Requisitos de Alto IQ.

### Paso 2: Mapeo de Integraciones Críticas (API First)

**Contexto:** El problema suele estar en los puentes, no en las islas.

**Acción:** Identificar cada punto de conexión entre el stack del cliente y MetodologIA.
**Output:** Mapa de Flujos de Datos.

### Paso 3: Prompt: El Analista de Deuda Técnica (10x)

**Contexto:** Buscamos los riesgos ocultos en el código o procesos actuales del cliente.

**Acción:** Usar IA para detectar "Deuda Técnica" basada en el inventario de software del cliente.
**Prompt de IA:** "Analiza este Stack: [Lista]. Identifica los 3 cuellos de botella más probables que impedirán la escalabilidad de nuestra solución y sugiere una mitigación arquitectónica."

**Output:** Reporte de Riesgos de Deuda.

### Paso 4: Selección del Stack de Implementación

**Contexto:** Elegimos las armas base de acuerdo a la cultura técnica del cliente.

**Acción:** Definir lenguajes, frameworks y bases de datos que se utilizarán.
**Output:** Stack Tecnológico Definido.

### Paso 5: Blueprint de Arquitectura (C4 Level 1)

**Contexto:** Una imagen vale más que mil líneas de código para el DM.

**Acción:** Dibujar el diagrama de alto nivel que muestra la interacción de sistemas.
**Output:** Diagrama de Arquitectura (Blueprint).

### Paso 6: Validación de Cumplimiento (Security/Compliance)

**Contexto:** Evitamos que Legal/TI bloquee la venta al final del proceso.

**Acción:** Cotejar el diseño contra estándares (GDPR, SOC2, o regulaciones locales).
**Output:** Check de Compliance Técnico.

### Paso 7: Definición de 'Día 2' (Soporte y Escala)

**Contexto:** Diseñamos para la vida del producto, no solo para el despliegue.

**Acción:** Definir cómo se mantendrá la solución y qué infraestructura de soporte requiere.
**Output:** Plan de Mantenimiento 'Day 2'.

### Paso 8: Estimación Preliminar de Esfuerzo

**Contexto:** Traducimos técnica en tiempo y personas.

**Acción:** Calcular horas hombre estimadas para los módulos core de la arquitectura.
**Output:** Estimación de Esfuerzo Base.

### Paso 9: Prompt: QA de la Solución (Peer Review 10x)

**Contexto:** Autocrítica radical antes de la presentación.

**Acción:** Solicitar a la IA que juegue a ser el "CTO del Cliente" y critique el diseño.
**Prompt de IA:** "Actúa como el CTO de una empresa que desconfía de los consultores externos. Encuentra 2 fallas lógicas en esta arquitectura [Descripción] y propone una solución más robusta."

**Output:** Refuerzo Arquitectónico Progresivo.

### Paso 10: Engineering Sign-off y Sincronización

**Contexto:** El equipo técnico avala la promesa comercial.

**Acción:** Firmar el diseño y cargarlo al CRM/MAP para la fase de propuesta.
**Output:** Blueprint Validado y Sincronizado.

## 4. Modal 10x: The "Architecture Guard" (Prompt Maestro)

```markdown
PROMPT: 
"Tengo este diseño técnico: [Detalle].
1. Identifica posibles 'Single Points of Failure'.
2. Sugiere una estrategia de redundancia que no duplique el costo.
3. Redacta el párrafo para la propuesta que explique la robustez de este diseño al CFO."
```

---
**Standard**: MetodologIA v3.0.0
