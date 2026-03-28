---
name: user-story-writer-primary
type: execution
version: 2.0.0
description: "Execute the User Story Writer workflow."
triad:
  lead: "user-story-writer-lead"
  support: "user-story-writer-support"
  guardian: "user-story-writer-guardian"
---

# User Story Writer — Execute

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
