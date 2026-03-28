---
name: validate-cross-refs-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Validate Cross Refs skill routing."
---

# Validate Cross Refs — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/validate-cross-refs`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `validate-cross-refs-lead`
3. If orchestrated → defer to orchestrating skill
