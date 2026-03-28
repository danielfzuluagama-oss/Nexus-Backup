---
name: iic-tasks-to-issues-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iic Tasks To Issues skill routing."
---

# Iic Tasks To Issues — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iic-tasks-to-issues`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iic-tasks-to-issues-lead`
3. If orchestrated → defer to orchestrating skill
