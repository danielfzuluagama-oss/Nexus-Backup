---
name: iikit-03-checklist-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 03 Checklist skill routing."
---

# Iikit 03 Checklist — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-03-checklist`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-03-checklist-lead`
3. If orchestrated → defer to orchestrating skill
