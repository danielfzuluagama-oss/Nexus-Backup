---
name: find-skills-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Find Skills skill routing."
---

# Find Skills — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/find-skills`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `find-skills-lead`
3. If orchestrated → defer to orchestrating skill
