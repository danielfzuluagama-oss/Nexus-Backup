# Paso a Paso: Ritual de Homologación Visual

## 1. Context Loading
- Cargar `homologar-knowledge-graph-metodologia/references/body-of-knowledge.md`.
- Localizar el archivo `knowledge-graph.md` a intervenir.

## 2. Secuencia Atómica
1. **LINT SCAN:** Validar que el Mermaid actual sea funcional.
2. **STYLE INJECTION:** Copiar el bloque de `classDef` corporativas al inicio del Mermaid.
3. **MAPPING:** Asignar `:::strategy`, `:::skill` o `:::evidence` a cada nodo según su rol semántico.
4. **ID CLEANUP:** Convertir cualquier ID camelCase o PascalCase a kebab-case.
5. **VALIDATE:** Renderizar internamente para confirmar integridad visual.

## 3. Cierre
1. **COMMIT:** Guardar cambios con el mensaje "Visual Homologation: [SKILL NAME]".
