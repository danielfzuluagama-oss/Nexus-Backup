---
name: plan-architecture-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Plan Architecture skill routing."
---

# Plan Architecture — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/plan-architecture`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `plan-architecture-lead`
3. If orchestrated → defer to orchestrating skill
