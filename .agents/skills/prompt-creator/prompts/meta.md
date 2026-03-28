---
name: prompt-creator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Prompt Creator skill routing."
---

# Prompt Creator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/prompt-creator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `prompt-creator-lead`
3. If orchestrated → defer to orchestrating skill
