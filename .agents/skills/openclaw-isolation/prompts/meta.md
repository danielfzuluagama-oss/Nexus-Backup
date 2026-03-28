---
name: openclaw-isolation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Openclaw Isolation skill routing."
---

# Openclaw Isolation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/openclaw-isolation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `openclaw-isolation-lead`
3. If orchestrated → defer to orchestrating skill
