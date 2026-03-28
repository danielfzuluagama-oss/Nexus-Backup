---
name: data-engineering-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Data Engineering skill routing."
---

# Data Engineering — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/data-engineering`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `data-engineering-lead`
3. If orchestrated → defer to orchestrating skill
