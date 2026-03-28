---
name: excellence-loop-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Excellence Loop skill routing."
---

# Excellence Loop — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/excellence-loop`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `excellence-loop-lead`
3. If orchestrated → defer to orchestrating skill
