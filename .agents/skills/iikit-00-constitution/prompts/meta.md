---
name: iikit-00-constitution-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 00 Constitution skill routing."
---

# Iikit 00 Constitution — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-00-constitution`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-00-constitution-lead`
3. If orchestrated → defer to orchestrating skill
