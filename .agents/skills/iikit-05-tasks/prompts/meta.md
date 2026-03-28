---
name: iikit-05-tasks-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 05 Tasks skill routing."
---

# Iikit 05 Tasks — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-05-tasks`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-05-tasks-lead`
3. If orchestrated → defer to orchestrating skill
