---
name: validate-structure-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Validate Structure skill routing."
---

# Validate Structure — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/validate-structure`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `validate-structure-lead`
3. If orchestrated → defer to orchestrating skill
