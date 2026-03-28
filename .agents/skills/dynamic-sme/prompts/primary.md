---
name: dynamic-sme-primary
type: execution
version: 2.0.0
description: "Execute the Dynamic Sme workflow."
triad:
  lead: "dynamic-sme-lead"
  support: "dynamic-sme-support"
  guardian: "dynamic-sme-guardian"
---

# Dynamic Sme — Execute

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
