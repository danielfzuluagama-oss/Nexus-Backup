---
name: iic-core-engine-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iic Core Engine skill routing."
---

# Iic Core Engine — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iic-core-engine`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iic-core-engine-lead`
3. If orchestrated → defer to orchestrating skill
