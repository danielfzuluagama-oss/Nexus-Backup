---
name: secrets-sanitization-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Secrets Sanitization skill routing."
---

# Secrets Sanitization — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/secrets-sanitization`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `secrets-sanitization-lead`
3. If orchestrated → defer to orchestrating skill
