---
name: project-program-management-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Project Program Management skill routing."
---

# Project Program Management — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/project-program-management`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `project-program-management-lead`
3. If orchestrated → defer to orchestrating skill
