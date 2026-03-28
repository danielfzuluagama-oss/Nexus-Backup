---
name: web-performance-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Web Performance skill routing."
---

# Web Performance — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/web-performance`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `web-performance-lead`
3. If orchestrated → defer to orchestrating skill
