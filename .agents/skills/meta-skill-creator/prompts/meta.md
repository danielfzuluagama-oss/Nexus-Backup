---
name: meta-skill-creator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Meta Skill Creator skill routing."
---

# Meta Skill Creator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/meta-skill-creator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `meta-skill-creator-lead`
3. If orchestrated → defer to orchestrating skill
