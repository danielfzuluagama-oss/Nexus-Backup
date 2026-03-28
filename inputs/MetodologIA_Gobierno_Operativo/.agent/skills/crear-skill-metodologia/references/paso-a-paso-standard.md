# Estándar Operativo: Paso a Paso (Tactical Guide)

## 1. El Concepto "Paso a Paso"
Un archivo `paso-a-paso.md` reside en el sub-repo de `references/` y sirve como el manual táctico para el operador (Humano o IA). Mientras que el `SKILL.md` define la gobernanza y el protocolo macro, el `paso-a-paso.md` descompone la ejecución en micro-acciones atómicas de baja fricción.

## 2. Estructura Obligatoria
1.  **Checklist de Pre-ejecución:** ¿Qué contexto debo tener cargado?
2.  **Secuencia Atómica:** Pasos numerados con:
    - **Acción:** Qué hacer.
    - **Herramienta:** Qué herramienta/comando usar.
    - **Validación:** Cómo saber que el paso fue exitoso.
3.  **Manejo de Excepciones:** Qué hacer si el paso falla.
4.  **Cierre y Evidencia:** Qué archivos se generan y dónde se notifican.

## 3. Reglas de Densidad
- **Sin Narrativa:** Uso de viñetas y listas numeradas exclusivamente.
- **Accionabilidad:** Cada línea debe iniciar con un verbo imperativo (Ej: `Analiza`, `Crea`, `Ejecuta`).
- **Path Awareness:** Los paths a los archivos siempre deben ser absolutos o relativos al root de forma explícita.
