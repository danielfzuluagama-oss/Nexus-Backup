---
name: webhook-handler-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Webhook Handler skill routing."
---

# Webhook Handler — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/webhook-handler`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `webhook-handler-lead`
3. If orchestrated → defer to orchestrating skill
