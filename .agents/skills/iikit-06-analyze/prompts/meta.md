---
name: iikit-06-analyze-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 06 Analyze skill routing."
---

# Iikit 06 Analyze — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-06-analyze`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-06-analyze-lead`
3. If orchestrated → defer to orchestrating skill
