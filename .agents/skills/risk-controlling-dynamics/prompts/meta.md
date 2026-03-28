---
name: risk-controlling-dynamics-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Risk Controlling Dynamics skill routing."
---

# Risk Controlling Dynamics — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/risk-controlling-dynamics`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `risk-controlling-dynamics-lead`
3. If orchestrated → defer to orchestrating skill
