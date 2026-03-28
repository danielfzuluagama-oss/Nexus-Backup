---
name: ideate-component-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ideate Component skill routing."
---

# Ideate Component — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ideate-component`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ideate-component-lead`
3. If orchestrated → defer to orchestrating skill
