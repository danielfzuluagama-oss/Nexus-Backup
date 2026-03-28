---
name: animation-motion-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Animation Motion skill routing."
---

# Animation Motion — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/animation-motion`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `animation-motion-lead`
3. If orchestrated → defer to orchestrating skill
