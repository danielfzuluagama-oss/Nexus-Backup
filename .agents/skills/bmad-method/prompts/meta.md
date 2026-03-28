---
name: bmad-method-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Bmad Method skill routing."
---

# Bmad Method — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/bmad-method`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `bmad-method-lead`
3. If orchestrated → defer to orchestrating skill
