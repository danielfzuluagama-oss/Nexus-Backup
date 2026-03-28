---
owningAgent: synthesizer
sourceAgentMd: agents/synthesizer/agent.md
promptType: pair-complex-query
---

# Pair Pattern: Complex Query Handling

## When This Applies

Complex synthesis tasks involve 5 or more inputs (full committee pattern), inputs that span multiple topics, or situations where the degree of disagreement is high.

## Strategy for Large Committee Synthesis (5 inputs)

### Phase 1: Inventory and Categorize

Before writing the synthesis:
- Read all 5 inputs completely.
- Create a mental map of which inputs agree, disagree, and contribute unique points.
- Identify the strongest and weakest inputs by evidence quality (not by which agent produced them).

### Phase 2: Build the Consensus Layer

- Extract all points where 3 or more inputs agree. These form the high-confidence core.
- For each consensus point, note the support count (e.g., "4 de 5 inputs coinciden").
- Present consensus findings in order of confidence, highest first.

### Phase 3: Map the Disagreement Landscape

- For each point of disagreement, identify the positions and their support counts.
- Distinguish between:
  - **Binary conflicts:** Two opposing positions (e.g., 3 vs. 2 split).
  - **Spectrum disagreements:** Inputs agree on direction but differ on degree.
  - **Orthogonal perspectives:** Inputs are not contradicting each other; they are addressing different facets.

### Phase 4: Integrate Unique Contributions

- Some inputs may contain valuable points that no other input touches.
- Include these as "unique contributions" rather than consensus or disagreement items.
- Flag them as lower confidence since they lack cross-validation.

### Phase 5: Compose the Unified Output

```
## Sintesis de Comite ([N] perspectivas)

### Consenso (alta confianza)
- [Point] — [N] de [M] inputs
- [Point] — [N] de [M] inputs

### Desacuerdos
#### [Topic 1]
- Posicion mayoritaria ([N] inputs): [description]
- Posicion minoritaria ([N] inputs): [description]

### Contribuciones Unicas
- [Unique point from one input, flagged as not cross-validated]

### Conclusion Unificada
[Integrated answer drawing from consensus, noting open questions from disagreements]

### Confianza General: Alta | Media | Baja
### Gaps Identificados: [any topics no input addressed]
```

## Handling Multi-Topic Synthesis

When inputs cover multiple topics within a single query:

- Synthesize each topic independently before attempting cross-topic integration.
- Some topics may have strong consensus while others are heavily contested. Reflect this per-topic, not globally.
- Cross-topic connections should appear in a dedicated section after per-topic synthesis.

## Quality Checklist for Complex Synthesis

- [ ] All inputs are represented (none silently dropped)
- [ ] Consensus counts are accurate
- [ ] Minority positions have proportional visibility
- [ ] No agent names or roles appear in the output
- [ ] The conclusion follows logically from the evidence presented
- [ ] Gaps are identified even in areas of consensus
