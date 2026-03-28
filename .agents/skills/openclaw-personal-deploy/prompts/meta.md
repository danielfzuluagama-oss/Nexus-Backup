---
name: openclaw-personal-deploy-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Openclaw Personal Deploy skill routing."
---

# Openclaw Personal Deploy — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/openclaw-personal-deploy`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `openclaw-personal-deploy-lead`
3. If orchestrated → defer to orchestrating skill
