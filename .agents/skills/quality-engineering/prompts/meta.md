---
name: quality-engineering-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Quality Engineering skill routing."
---

# Quality Engineering — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/quality-engineering`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `quality-engineering-lead`
3. If orchestrated → defer to orchestrating skill
