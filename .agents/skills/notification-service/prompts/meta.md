---
name: notification-service-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Notification Service skill routing."
---

# Notification Service — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/notification-service`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `notification-service-lead`
3. If orchestrated → defer to orchestrating skill
