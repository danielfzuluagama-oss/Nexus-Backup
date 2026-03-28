---
name: assembly-skill-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Assembly Skill skill routing."
---

# Assembly Skill — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/assembly-skill`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `assembly-skill-lead`
3. If orchestrated → defer to orchestrating skill
