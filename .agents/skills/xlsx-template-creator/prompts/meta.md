---
name: xlsx-template-creator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Xlsx Template Creator skill routing."
---

# Xlsx Template Creator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/xlsx-template-creator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `xlsx-template-creator-lead`
3. If orchestrated → defer to orchestrating skill
