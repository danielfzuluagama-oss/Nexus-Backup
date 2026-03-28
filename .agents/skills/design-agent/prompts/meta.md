---
name: design-agent-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Design Agent skill routing."
---

# Design Agent — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/design-agent`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `design-agent-lead`
3. If orchestrated → defer to orchestrating skill
