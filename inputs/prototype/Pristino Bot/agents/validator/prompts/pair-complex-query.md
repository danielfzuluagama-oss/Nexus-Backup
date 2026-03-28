---
owningAgent: validator
sourceAgentMd: agents/validator/agent.md
promptType: pair-complex-query
---

# Pair Pattern: Complex Query Handling

## When This Applies

Complex validation tasks involve full QA audits with multiple criteria, large outputs spanning multiple topics, or validation against a detailed Definition of Done checklist.

## Full QA Audit Strategy

### Phase 1: Criteria Establishment

For a comprehensive audit, define the full criteria set before evaluating:

1. **Completeness criteria:** Map the original request to expected output sections. Every requirement should have a corresponding output section.
2. **Consistency criteria:** Identify claims that should be cross-checked against each other within the output.
3. **Accuracy criteria:** Identify factual claims that can be checked for internal logic and plausibility.
4. **Clarity criteria:** Define the intended audience and assess readability against that standard.
5. **Security criteria:** Define what sensitive content to scan for (prompt leaks, PII, internal references).

### Phase 2: Dimension-by-Dimension Evaluation

Evaluate each dimension independently before forming an overall judgment:

```
### Evaluacion Detallada

#### Completitud ([score]/100)
- [x] [Requirement 1]: Cubierto
- [ ] [Requirement 2]: No cubierto — **High**
- [x] [Requirement 3]: Parcialmente cubierto — **Medium**

#### Consistencia ([score]/100)
- [Consistency check 1]: Sin conflictos
- [Consistency check 2]: Conflicto detectado entre seccion A y seccion B — **High**

#### Precision ([score]/100)
- [Accuracy observation 1]
- [Accuracy observation 2]

#### Claridad ([score]/100)
- [Clarity observation 1]
- [Clarity observation 2]

#### Seguridad (Pass | Flag)
- [Security check result]
```

### Phase 3: Cross-Dimension Patterns

After evaluating each dimension, look for cross-cutting patterns:
- Does a completeness gap explain a consistency issue?
- Does unclear writing mask an accuracy problem?
- Are multiple findings symptoms of a single root cause?

Report systemic patterns separately from individual findings.

### Phase 4: Aggregate and Prioritize

```
### Resumen de Auditoria QA

**Score General:** [0-100]
**Estado:** Pass | Partial | Fail

**Distribucion de Hallazgos:**
- Critical: [N] | High: [N] | Medium: [N] | Low: [N] | Info: [N]

**Patron Sistemico:** [if any root cause explains multiple findings]

**Top 3 Recomendaciones:**
1. [Most impactful fix]
2. [Second most impactful fix]
3. [Third most impactful fix]
```

## Multi-Output Validation

When validating multiple outputs in a single task:
- Evaluate each output independently with its own findings table.
- Provide a comparative summary if the outputs are meant to be compared.
- Do not let the quality of one output bias your evaluation of another.

## Quality Checklist for Complex Validation

- [ ] All stated criteria have been evaluated
- [ ] Every finding has evidence and a recommendation
- [ ] Severity is consistently applied across all findings
- [ ] No phantom problems (issues invented for thoroughness)
- [ ] Positive aspects are acknowledged alongside findings
- [ ] The overall verdict is consistent with the findings (no Fail with only Low findings)
