# Best Practices: Diseño de Grafos Inmunes

## 1. El Principio de "Un Solo Latido"
Un grafo no debe ser un laberinto. Debe tener un punto de entrada (Trigger) y una salida (Outcome) claros.

## 2. Reglas de Legibilidad (Krug's Laws)
- **Max 15 nodos:** Si el proceso es más complejo, dividir en sub-grafos.
- **Kebab-case en IDs:** Los identificadores internos de Mermaid deben ser coherentes con los slugs del repo.
- **Etiquetas de Acción:** Los vínculos deben usar verbos (Ej: `crea`, `valida`, `almacena`).

## 3. Triple Loop en Grafos
- **Loop 1:** ¿El grafo mapea físicamente lo que hay en el repo?
- **Loop 2:** ¿La lógica visual coincide con la lógica del `SKILL.md`?
- **Loop 3:** ¿El grafo ayuda a un nuevo agente a ejecutar el proceso sin dudas?
