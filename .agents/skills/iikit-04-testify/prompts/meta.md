---
name: iikit-04-testify-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit 04 Testify skill routing."
---

# Iikit 04 Testify — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-04-testify`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-04-testify-lead`
3. If orchestrated → defer to orchestrating skill
