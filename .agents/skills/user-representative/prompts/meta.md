---
name: user-representative-meta
type: meta
version: 2.0.0
description: "Meta-prompt for User Representative skill routing."
---

# User Representative — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/user-representative`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `user-representative-lead`
3. If orchestrated → defer to orchestrating skill
