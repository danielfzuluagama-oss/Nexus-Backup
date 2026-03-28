---
name: iikit-02-plan-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 02 Plan skill routing."
---

# Iikit 02 Plan — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-02-plan`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-02-plan-lead`
3. If orchestrated → defer to orchestrating skill
