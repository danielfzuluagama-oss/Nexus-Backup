---
name: iikit-clarify-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iikit Clarify skill routing."
---

# Iikit Clarify — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iikit-clarify`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iikit-clarify-lead`
3. If orchestrated → defer to orchestrating skill
