---
name: ai-architecture-implementation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ai Architecture Implementation skill routing."
---

# Ai Architecture Implementation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ai-architecture-implementation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ai-architecture-implementation-lead`
3. If orchestrated → defer to orchestrating skill
