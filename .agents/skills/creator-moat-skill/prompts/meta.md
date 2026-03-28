---
name: creator-moat-skill-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Creator Moat Skill skill routing."
---

# Creator Moat Skill — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/creator-moat-skill`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `creator-moat-skill-lead`
3. If orchestrated → defer to orchestrating skill
