---
name: cross-platform-convert-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Cross Platform Convert skill routing."
---

# Cross Platform Convert — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/cross-platform-convert`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `cross-platform-convert-lead`
3. If orchestrated → defer to orchestrating skill
