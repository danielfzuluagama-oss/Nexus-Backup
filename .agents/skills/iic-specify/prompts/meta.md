---
name: iic-specify-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iic Specify skill routing."
---

# Iic Specify — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iic-specify`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iic-specify-lead`
3. If orchestrated → defer to orchestrating skill
