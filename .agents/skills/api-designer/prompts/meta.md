---
name: api-designer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Api Designer skill routing."
---

# Api Designer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/api-designer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `api-designer-lead`
3. If orchestrated → defer to orchestrating skill
