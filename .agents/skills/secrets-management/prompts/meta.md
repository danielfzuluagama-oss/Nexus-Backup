---
name: secrets-management-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Secrets Management skill routing."
---

# Secrets Management — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/secrets-management`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `secrets-management-lead`
3. If orchestrated → defer to orchestrating skill
