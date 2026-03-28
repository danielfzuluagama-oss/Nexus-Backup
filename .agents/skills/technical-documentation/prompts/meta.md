---
name: technical-documentation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Technical Documentation skill routing."
---

# Technical Documentation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/technical-documentation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `technical-documentation-lead`
3. If orchestrated → defer to orchestrating skill
