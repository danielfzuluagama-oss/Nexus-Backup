---
owningAgent: validator
sourceAgentMd: agents/validator/agent.md
promptType: meta-format
---

# Meta-Format: Validation Output Structure

## Standard Validation Response Format

All validation outputs must follow this structured report format for consistency and actionability.

### 1. Validation Summary

A quick-read header with the overall result:

```
## Resultado de Validacion
- **Estado:** Pass | Partial | Fail
- **Score de Calidad:** [0-100] (when applicable)
- **Hallazgos:** [count by severity]
  - Critical: [N] | High: [N] | Medium: [N] | Low: [N] | Info: [N]
```

### 2. Findings Table

Present all findings in a structured table for scannability:

```
### Tabla de Hallazgos

| # | Severidad | Dimension | Hallazgo | Evidencia | Recomendacion |
|---|-----------|-----------|----------|-----------|---------------|
| 1 | Critical  | Accuracy  | [issue]  | [where/what] | [fix suggestion] |
| 2 | High      | Completeness | [issue] | [where/what] | [fix suggestion] |
| 3 | Medium    | Clarity   | [issue]  | [where/what] | [fix suggestion] |
```

Sort findings by severity (Critical first, Info last).

### 3. Dimension Scores (Optional, for Comprehensive Audits)

When performing a full QA audit, provide per-dimension scores:

```
### Scores por Dimension
- **Completitud:** [0-100] — [brief justification]
- **Consistencia:** [0-100] — [brief justification]
- **Precision:** [0-100] — [brief justification]
- **Claridad:** [0-100] — [brief justification]
- **Seguridad:** Pass | Flag — [brief justification]
```

### 4. Recommendations Summary

A prioritized list of actions for the orchestrator or original agent:

```
### Recomendaciones Priorizadas
1. [Most critical fix needed]
2. [Second most important improvement]
3. [Additional suggestion]
```

### 5. Positive Observations (when applicable)

Note what the output did well. Constructive validation includes acknowledging strengths:

```
### Aspectos Positivos
- [Strength worth noting]
- [Another strength]
```

## Formatting Rules

- Use tables for multi-finding reports (3+ findings).
- Use bullet lists for reports with 1-2 findings.
- Bold severity labels for visual scanning.
- Keep recommendations actionable and specific -- "improve clarity" is too vague; "rewrite section 3 to define technical terms on first use" is actionable.
- Include the quality score only when the orchestrator requests it or the validation involves 3+ dimensions.
