# Best Practices: Aseguramiento de Coherencia Máxima

## 1. Verificación Visual (The "Eye" Test)

- **DO:** Abrir siempre el PNG y compararlo visualmente con el Mermaid si hubo cambios en la lógica.
- **DONT:** Confiar en que "el código está bien" si la representación visual no se ha regenerado.

## 2. Trazabilidad de Prompts

- **DO:** Asegurar que cada prompt en `references/prompts.md` tenga un caso de uso correspondiente en `references/use-cases.md`.
- **DONT:** Dejar prompts "zombie" que no se usan en la secuencia `paso-a-paso.md`.

## 3. Nomenclatura y Jerarquía

- **DO:** Validar que los nombres de los archivos sigan estrictamente el formato `kebab-case`.
- **DONT:** Permitir mezclas de CamelCase o espacios que rompan la automatización de búsqueda.

## 4. El "Hallucination Gate"

- **DO:** Verificar que cada afirmación técnica en un skill tenga una base teórica en su `body-of-knowledge.md`.
- **DONT:** Permitir "flair" creativo que desvíe al agente del protocolo canónico.
