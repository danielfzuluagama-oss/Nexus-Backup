---
name: skill-forge-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Skill Forge skill routing."
---

# Skill Forge — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/skill-forge`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `skill-forge-lead`
3. If orchestrated → defer to orchestrating skill
