---
owningAgent: analyst
sourceAgentMd: agents/analyst/agent.md
promptType: pair-complex-query
---

# Multi-Criteria Comparison with Scoring

## When This Pattern Applies

Use this protocol when the task involves comparing 3 or more options across 3 or more evaluation dimensions. This is the analyst's most structured and rigorous output mode.

## Step-by-Step Execution

### Step 1: Define the Evaluation Criteria

Extract criteria from the task delegation. If criteria are not specified, infer them from the domain and state your reasoning.

For each criterion, establish:
- **Name**: A clear, specific label (e.g., "Cost Efficiency" not just "Cost").
- **Description**: One sentence defining what this criterion measures.
- **Weight**: Relative importance as a percentage. All weights must sum to 100%.
- **Scale**: Define what each score level means (e.g., 1 = Does not meet requirement, 3 = Meets requirement, 5 = Exceeds requirement).

### Step 2: Build the Scoring Matrix

Construct the comparison table with all options as columns and all criteria as rows.

| Criterion (Weight) | Option A | Option B | Option C |
|---------------------|----------|----------|----------|
| Criterion 1 (30%) | 4 | 3 | 5 |
| Criterion 2 (25%) | 3 | 5 | 2 |
| Criterion 3 (25%) | 5 | 4 | 3 |
| Criterion 4 (20%) | 2 | 3 | 4 |
| **Weighted Total** | **3.55** | **3.75** | **3.55** |

### Step 3: Provide Scoring Justifications

Below the matrix, provide a brief justification for each score. Group by option for readability:

**Option A**
- Criterion 1 (4/5): [Specific reason based on provided data]
- Criterion 2 (3/5): [Specific reason based on provided data]

Repeat for each option. Every score must have a justification. Unjustified scores undermine the entire analysis.

### Step 4: Sensitivity Analysis

Identify which scores or weights, if changed, would alter the final ranking. This protects against false precision.

- "If Criterion 2 weight increases from 25% to 35%, Option B's lead widens significantly."
- "Option A and Option C are tied. The outcome depends on whether [Criterion X] or [Criterion Y] is prioritized."

### Step 5: Render the Recommendation

Structure the final recommendation as:

1. **Top Pick**: The option with the highest weighted score, with a one-sentence summary of why.
2. **Runner-Up**: The second option, with context on when it would be preferred (e.g., "if budget is the primary constraint").
3. **Not Recommended**: Any option that scores lowest, with the key weaknesses that drove the ranking.
4. **Caveats**: Explicit statement of assumptions, data gaps, and conditions under which the recommendation should be revisited.

## Handling Edge Cases

- **Tie scores**: Do not arbitrarily break ties. Present both options as co-equal and explain what additional information would differentiate them.
- **Dominant option**: If one option leads on every criterion, state this clearly but still complete the full matrix for transparency.
- **Incomparable options**: If options serve fundamentally different use cases, say so. A scored comparison may not be meaningful and a segmented analysis ("Option A is best for [use case X], Option B for [use case Y]") may be more honest.
