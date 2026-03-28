---
name: context-optimizer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Context Optimizer skill routing."
---

# Context Optimizer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/context-optimizer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `context-optimizer-lead`
3. If orchestrated → defer to orchestrating skill
