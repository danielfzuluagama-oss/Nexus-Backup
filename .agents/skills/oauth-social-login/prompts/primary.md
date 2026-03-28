---
name: oauth-social-login-primary
type: execution
version: 2.0.0
description: "Execute the Oauth Social Login workflow."
triad:
  lead: "oauth-social-login-lead"
  support: "oauth-social-login-support"
  guardian: "oauth-social-login-guardian"
---

# Oauth Social Login — Execute

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
