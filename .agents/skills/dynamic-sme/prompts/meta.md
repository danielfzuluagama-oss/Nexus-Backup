---
name: dynamic-sme-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Dynamic Sme skill routing."
---

# Dynamic Sme — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/dynamic-sme`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `dynamic-sme-lead`
3. If orchestrated → defer to orchestrating skill
