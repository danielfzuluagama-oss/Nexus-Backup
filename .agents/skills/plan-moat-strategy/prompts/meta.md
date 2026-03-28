---
name: plan-moat-strategy-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Plan Moat Strategy skill routing."
---

# Plan Moat Strategy — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/plan-moat-strategy`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `plan-moat-strategy-lead`
3. If orchestrated → defer to orchestrating skill
