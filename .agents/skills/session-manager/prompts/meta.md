---
name: session-manager-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Session Manager skill routing."
---

# Session Manager — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/session-manager`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `session-manager-lead`
3. If orchestrated → defer to orchestrating skill
