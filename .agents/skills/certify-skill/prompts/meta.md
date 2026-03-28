---
name: certify-skill-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Certify Skill skill routing."
---

# Certify Skill — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/certify-skill`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `certify-skill-lead`
3. If orchestrated → defer to orchestrating skill
