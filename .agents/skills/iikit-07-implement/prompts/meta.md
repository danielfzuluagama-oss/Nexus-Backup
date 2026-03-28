---
name: iikit-07-implement-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 07 Implement skill routing."
---

# Iikit 07 Implement — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-07-implement`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-07-implement-lead`
3. If orchestrated → defer to orchestrating skill
