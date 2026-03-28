---
name: iic-bugfix-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iic Bugfix skill routing."
---

# Iic Bugfix — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iic-bugfix`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iic-bugfix-lead`
3. If orchestrated → defer to orchestrating skill
