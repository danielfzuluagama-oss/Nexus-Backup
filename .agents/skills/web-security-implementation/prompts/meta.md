---
name: web-security-implementation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Web Security Implementation skill routing."
---

# Web Security Implementation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/web-security-implementation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `web-security-implementation-lead`
3. If orchestrated → defer to orchestrating skill
