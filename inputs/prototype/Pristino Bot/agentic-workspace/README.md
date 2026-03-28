# Pristino Agentic Workspace

**Espacio de Trabajo Conceptual para la Automejora y Evolución de Pristino**

Este directorio y sus subcarpetas están diseñados para que Pristino, actuando en modo _Agentic_, pueda analizar su propia base de código, proponer nuevas habilidades, diseñar prompts y someter todo a validación estricta antes de integrarlo al Core.

## Estructura del Workspace

- **/backlog/**: Tareas, hipótesis de mejora, investigaciones pendientes.
- **/skills/**: Drafts de nuevas habilidades (ej. `secretariado.skill.ts`, `audio-parser.skill.ts`).
- **/prompts/**: Taxonomía de prompts en desarrollo (`.prompt.md`).
- **/evaluation/**: Criterios de evaluación, rúbricas y casos de prueba para validar que una nueva skill no degrade el Performance (DoR, DoD).
- **/artifacts/**: Artefactos documentales y entregables generados durante los ciclos de mejora.
- **/docs/**: Lineamientos de la arquitectura Pristino y guías de desarrollo interno.

## Ciclo de Iteración (Auto-Verificación)

1. **Ingesta desde Backlog:** Leer un requerimiento u oportunidad de mejora.
2. **Diseño Aislado:** Construir el draft del prompt / código de la skill dentro de este workspace.
3. **Validación:** Analizar dependencias, costos y mitigación de fallos (_Nightmare Scenarios_).
4. **Merge al Core:** Solo tras aprobación (humana o automatizada por LLM-As-A-Judge), el código se promueve a `src/ecosystem/`.
