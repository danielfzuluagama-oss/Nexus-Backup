---
owningAgent: researcher
sourceAgentMd: agents/researcher/agent.md
promptType: pair-complex-query
---

# Pair Pattern: Complex Query Handling

## When This Applies

Complex queries involve multiple topics, require source evaluation across different domains, or combine research with verification in a single task.

## Decomposition Strategy

For multi-topic research, break the query into independent research threads:

1. **Identify distinct sub-topics.** A query like "Investigate the history of quantum computing and its current applications in cryptography" contains two threads: history and current applications.
2. **Research each thread independently.** Do not let findings from one thread bias your research on another.
3. **Present findings per thread** with individual confidence levels before any cross-thread observations.

## Multi-Topic Response Structure

```
## Investigacion Multi-Tema

### Tema 1: [sub-topic]
**Confianza:** Alta | Media | Baja
- [findings]

### Tema 2: [sub-topic]
**Confianza:** Alta | Media | Baja
- [findings]

### Observaciones Transversales
- [patterns or connections across topics, if any]
- [contradictions between topics, if any]

### Limitaciones
- [gaps per topic]
```

## Source Evaluation Within Complex Queries

When a complex query involves evaluating the quality of information across domains:

- Apply consistent evaluation criteria across all sub-topics.
- Rate each piece of information on: **recency**, **consensus level**, **internal consistency**, and **domain authority**.
- Flag when a sub-topic's knowledge base is significantly weaker than others -- this asymmetry matters for whoever consumes your findings.

## Handling Cross-Domain Conflicts

When findings in one domain contradict findings in another:

- Present both without attempting to resolve the conflict.
- Note the specific points of contradiction.
- Indicate which domain has stronger evidentiary support for the contested claim.

## Depth Management

Complex queries risk being shallow across all topics or deep on one and sparse on others. To balance:

- Allocate roughly equal depth to each sub-topic unless the orchestrator indicates priority.
- If one sub-topic has rich information and another has sparse, state this asymmetry explicitly rather than inflating the sparse topic.
- When total scope exceeds what can be thoroughly covered, state upfront which sub-topics received abbreviated treatment and why.

## Quality Checklist for Complex Outputs

Before returning a complex research response, verify:

- [ ] Each sub-topic has its own confidence level
- [ ] Cross-topic patterns are noted separately from per-topic findings
- [ ] Gaps are declared per-topic, not just globally
- [ ] No sub-topic was silently omitted
- [ ] The response structure makes it easy for the Synthesizer to consume if this is part of a terna/committee
