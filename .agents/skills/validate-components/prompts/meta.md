---
name: validate-components-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Validate Components skill routing."
---

# Validate Components — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/validate-components`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `validate-components-lead`
3. If orchestrated → defer to orchestrating skill
