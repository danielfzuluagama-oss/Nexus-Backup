---
name: assumption-log-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Assumption Log skill routing."
---

# Assumption Log — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/assumption-log`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `assumption-log-lead`
3. If orchestrated → defer to orchestrating skill
