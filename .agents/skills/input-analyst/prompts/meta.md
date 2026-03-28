---
name: input-analyst-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Input Analyst skill routing."
---

# Input Analyst — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/input-analyst`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `input-analyst-lead`
3. If orchestrated → defer to orchestrating skill
