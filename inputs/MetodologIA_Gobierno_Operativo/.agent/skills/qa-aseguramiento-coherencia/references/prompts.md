# Prompts: Biblioteca de QA Táctico

## Prompt: Auditor de Simetría Visual

> [!TIP]
> Use este prompt con un modelo multimodal cuando necesite validar un PNG contra su código Mermaid.

```markdown
Actúa como el Auditor de Simetría Visual de MetodologIA.
Compara la imagen [knowledge-graph.png] con el siguiente código Mermaid:
[PEGAR MARMAID AQUÍ]

Identifica:
1. Nodos presentes en el código pero ausentes en la imagen.
2. Contradicciones en la dirección de las flechas (Jerarquía).
3. Desviaciones de color (Oxford Blue para estrategia, Cyber Yellow para operación).

Si hay discrepancias, genera una alerta de 'COHERENCIA_ROTURA'.
```

## Prompt: Validador de Caminos Jerárquicos

```markdown
Analiza el archivo [SKILL.md] y sus referencias.
Busca menciones a otros procesos, SOPs o Rituales.
Verifica que cada mención tenga un archivo correspondiente en la estructura del repositorio.

Formato de Hallazgo:
- Elemento: [Nombre]
- Referencia: [Línea]
- Status: [LINK_VALIDO | BROKEN_PATH]
```
