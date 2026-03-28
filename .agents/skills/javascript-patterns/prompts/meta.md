---
name: javascript-patterns-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Javascript Patterns skill routing."
---

# Javascript Patterns — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/javascript-patterns`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `javascript-patterns-lead`
3. If orchestrated → defer to orchestrating skill
