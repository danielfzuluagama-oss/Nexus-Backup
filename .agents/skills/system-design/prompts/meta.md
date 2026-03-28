---
name: system-design-meta
type: meta
version: 2.0.0
description: "Meta-prompt for System Design skill routing."
---

# System Design — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/system-design`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `system-design-lead`
3. If orchestrated → defer to orchestrating skill
