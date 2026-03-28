---
name: step-creator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Step Creator skill routing."
---

# Step Creator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/step-creator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `step-creator-lead`
3. If orchestrated → defer to orchestrating skill
