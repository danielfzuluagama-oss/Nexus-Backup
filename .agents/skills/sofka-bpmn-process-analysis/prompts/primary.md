---
name: sofka-bpmn-process-analysis-primary
type: execution
version: 2.0.0
description: "Execute the Sofka Bpmn Process Analysis workflow."
triad:
  lead: "sofka-bpmn-process-analysis-lead"
  support: "sofka-bpmn-process-analysis-support"
  guardian: "sofka-bpmn-process-analysis-guardian"
---

# Sofka Bpmn Process Analysis — Execute

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
