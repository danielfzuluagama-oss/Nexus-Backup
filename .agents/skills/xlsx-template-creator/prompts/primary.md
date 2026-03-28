---
name: xlsx-template-creator-primary
type: execution
version: 2.0.0
description: "Execute the Xlsx Template Creator workflow."
triad:
  lead: "xlsx-template-creator-lead"
  support: "xlsx-template-creator-support"
  guardian: "xlsx-template-creator-guardian"
---

# Xlsx Template Creator — Execute

## Dynamic Parameters

| Parameter | Description | Required | Filled By |
|-----------|-------------|----------|-----------|
| `{{task}}` | What to accomplish | Yes | User input |
| `{{context}}` | Background and constraints | Yes | User or codebase |
| `{{constraints}}` | Additional rules | No | Guardrails JSON |

## Execution Steps
1. Read SKILL.md `## When to Activate` — confirm this skill applies
2. Read SKILL.md `## Validation Gate` — internalize quality criteria
3. Execute the skill workflow per SKILL.md sections
4. Validate output against Validation Gate before delivering
