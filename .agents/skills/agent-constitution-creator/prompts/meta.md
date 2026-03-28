---
name: agent-constitution-creator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Agent Constitution Creator skill routing."
---

# Agent Constitution Creator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/agent-constitution-creator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `agent-constitution-creator-lead`
3. If orchestrated → defer to orchestrating skill
