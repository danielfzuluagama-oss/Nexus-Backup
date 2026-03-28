---
name: iikit-08-taskstoissues-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 08 Taskstoissues skill routing."
---

# Iikit 08 Taskstoissues — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-08-taskstoissues`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-08-taskstoissues-lead`
3. If orchestrated → defer to orchestrating skill
