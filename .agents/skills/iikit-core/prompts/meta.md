---
name: iikit-core-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit Core skill routing."
---

# Iikit Core — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-core`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-core-lead`
3. If orchestrated → defer to orchestrating skill
