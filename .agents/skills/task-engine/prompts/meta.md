---
name: task-engine-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Task Engine skill routing."
---

# Task Engine — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/task-engine`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `task-engine-lead`
3. If orchestrated → defer to orchestrating skill
