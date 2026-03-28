---
name: error-handling-patterns-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Error Handling Patterns skill routing."
---

# Error Handling Patterns — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/error-handling-patterns`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `error-handling-patterns-lead`
3. If orchestrated → defer to orchestrating skill
