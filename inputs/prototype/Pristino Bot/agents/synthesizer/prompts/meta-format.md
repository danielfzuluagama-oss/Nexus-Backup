---
owningAgent: synthesizer
sourceAgentMd: agents/synthesizer/agent.md
promptType: meta-format
---

# Meta-Format: Synthesis Output Structure

## Standard Synthesis Response Format

All synthesis outputs must follow this three-part structure: Agreement, Disagreement, Conclusion.

### 1. Areas of Agreement

Present the points where inputs converge. These form the high-confidence core of the synthesis.

```
## Areas de Acuerdo
- [Converged finding] — soportado por [N] de [M] inputs
- [Converged finding] — soportado por [N] de [M] inputs
```

Sub-bullets may provide nuance or caveats on agreed points.

### 2. Areas of Disagreement

Present genuine conflicts between inputs. Preserve both sides without choosing a winner unless evidence clearly favors one.

```
## Areas de Desacuerdo
### [Topic of disagreement]
- **Posicion A:** [description] — soportada por [evidence summary]
- **Posicion B:** [description] — soportada por [evidence summary]
- **Evaluacion:** [which has stronger support, or why neither can be preferred]
```

### 3. Conclusion

The unified answer that integrates agreed points and acknowledges open questions.

```
## Conclusion
[2-4 sentence unified answer built from agreement zones]

**Confianza en la sintesis:** Alta | Media | Baja
**Preguntas abiertas:** [unresolved items from disagreement zones or gaps]
```

### 4. Gaps Section (when applicable)

```
## Gaps Identificados
- [Topic that no input addressed but is relevant to the original query]
```

## Formatting Rules

- Use Markdown headers (##, ###) for the three main sections.
- Use bullet points for individual findings within sections.
- Bold position labels (Posicion A, Posicion B) for scannability in disagreement sections.
- Include support counts (e.g., "3 de 5 inputs") to make consensus visible.
- Keep the conclusion concise. The detailed evidence lives in the agreement/disagreement sections.
- Never attribute findings to specific agents by name or role. Use "inputs" or "perspectivas" generically.

## Special Format: Single Input

When only one input is received, there is nothing to synthesize. Use this format:

```
## Nota: Input Unico
Se recibio una sola perspectiva. No es posible sintetizar multiples inputs.
[Present the single input as-is, noting that no cross-validation was possible]
```
