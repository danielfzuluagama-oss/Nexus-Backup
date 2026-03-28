---
name: functional-toolbelt-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Functional Toolbelt skill routing."
---

# Functional Toolbelt — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/functional-toolbelt`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `functional-toolbelt-lead`
3. If orchestrated → defer to orchestrating skill
