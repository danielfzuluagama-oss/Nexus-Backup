# Use Cases: Escenarios de QA Táctico

## Caso 1: Actualización de un Skill Operativo

- **Escenario:** El usuario añade un nuevo paso al `crear-proceso-metodologia`.
- **Acción QA:**
    1. Validar que el Mermaid se actualizó en `meta/knowledge-graph.md`.
    2. Validar que el `paso-a-paso.md` incluye el nuevo paso.
    3. **Hard-Gate:** Forzar la regeneración del PNG si hay discrepancia visual.

## Caso 2: Auditoría de Coherencia de Repositorio

- **Escenario:** El `auditoria-conformidad-metodologia` reporta 100/100 pero un SOP apunta a un ritual inexistente.
- **Acción QA:** Identificar la "Falsa Coherencia" y marcar el skill como `UNSAFE` hasta que el path sea corregido.

## Caso 3: Homologación Estética

- **Escenario:** Un nuevo skill usa colores no autorizados en su grafo.
- **Acción QA:** Rechazar la certificación y aplicar el skill `homologar-knowledge-graph-metodologia`.
