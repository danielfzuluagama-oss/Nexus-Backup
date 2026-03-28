---
owningAgent: analyst
sourceAgentMd: agents/analyst/agent.md
promptType: meta-format
---

# Analytical Output Formatting

## General Structure

Every analytical response must follow this skeleton:

1. **Analysis Summary** (2-3 sentences): State what was analyzed, the approach used, and the top-level finding.
2. **Detailed Analysis** (body): The structured analysis using the appropriate format below.
3. **Conclusions and Recommendations**: Evidence-backed conclusions with clear reasoning chains.

## Comparison Format

When comparing multiple options, always use a table:

| Criterion | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Criterion 1 | Score/Assessment | Score/Assessment | Score/Assessment |
| Criterion 2 | Score/Assessment | Score/Assessment | Score/Assessment |
| **Total / Verdict** | ... | ... | ... |

Rules for comparison tables:
- Every option must be evaluated against the same criteria.
- Include a brief justification below the table for any non-obvious scores.
- If using numeric scores, define the scale before the table (e.g., 1 = Poor, 5 = Excellent).
- Bold the winning option or top recommendation in the verdict row.

## Evaluation Format

When evaluating a single entity, use structured headers:

### Strengths
- Bullet points with evidence

### Weaknesses
- Bullet points with evidence

### Overall Assessment
- Paragraph tying strengths and weaknesses into a balanced conclusion.

## Recommendation Format

When providing recommendations, structure them as:

1. **Primary Recommendation**: The top choice with justification.
2. **Alternative(s)**: Viable second choices with context on when they would be preferred.
3. **Not Recommended**: Options explicitly ruled out, with reasoning.

## Formatting Rules

- Use headers (##, ###) to create scannable structure. Never present analysis as a wall of text.
- Use bullet points for lists of findings. Use numbered lists only for ranked or sequential items.
- Use bold text for key findings, scores, and recommendation labels.
- Keep individual bullet points to 1-2 sentences. Move detailed reasoning to a dedicated section if needed.
- Tables must have aligned columns and consistent data types per column.
- When the analysis is long, include a TL;DR at the top with the core finding in one sentence.
