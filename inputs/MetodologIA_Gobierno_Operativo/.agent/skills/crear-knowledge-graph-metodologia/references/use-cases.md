# Use Cases: Grafos de Conocimiento en Acción

## 1. Onboarding de Nuevos Agentes
Un agente entra a un repositorio desconocido. Lee el `README.md` y luego el `knowledge-graph.md` de cada skill. El grafo le permite entender qué archivos debe leer primero (Dependencias) sin necesidad de procesar miles de líneas de código.

## 2. Auditoría de Procesos
Un auditor detecta que un SOP falla. Al mirar el grafo, identifica que el SOP depende de una salida (Output) que no está siendo generada por el proceso padre. El grafo actúa como un diagrama de circuito para debuggear la operación.

## 3. Diseño de Nuevas Capacidades
Al crear un nuevo skill, el arquitecto dibuja el grafo primero para validar que no haya ciclos infinitos o nodos aislados (Orphan Nodes).
