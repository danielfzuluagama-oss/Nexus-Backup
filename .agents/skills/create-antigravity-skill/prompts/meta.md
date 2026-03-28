---
name: create-antigravity-skill-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Create Antigravity Skill skill routing."
---

# Create Antigravity Skill — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/create-antigravity-skill`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `create-antigravity-skill-lead`
3. If orchestrated → defer to orchestrating skill
