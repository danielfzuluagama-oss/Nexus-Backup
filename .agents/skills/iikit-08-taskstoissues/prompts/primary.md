---
name: iikit-08-taskstoissues-primary
type: execution
version: 2.0.0
description: "Execute the Iikit 08 Taskstoissues workflow."
triad:
  lead: "iikit-08-taskstoissues-lead"
  support: "iikit-08-taskstoissues-support"
  guardian: "iikit-08-taskstoissues-guardian"
---

# Iikit 08 Taskstoissues — Execute

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
