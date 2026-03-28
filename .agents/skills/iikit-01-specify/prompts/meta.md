---
name: iikit-01-specify-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 01 Specify skill routing."
---

# Iikit 01 Specify — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-01-specify`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-01-specify-lead`
3. If orchestrated → defer to orchestrating skill
