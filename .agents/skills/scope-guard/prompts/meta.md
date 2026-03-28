---
name: scope-guard-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Scope Guard skill routing."
---

# Scope Guard — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/scope-guard`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `scope-guard-lead`
3. If orchestrated → defer to orchestrating skill
