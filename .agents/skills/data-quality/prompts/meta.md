---
name: data-quality-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Data Quality skill routing."
---

# Data Quality — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/data-quality`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `data-quality-lead`
3. If orchestrated → defer to orchestrating skill
