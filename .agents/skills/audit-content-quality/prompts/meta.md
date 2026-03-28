---
name: audit-content-quality-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Audit Content Quality skill routing."
---

# Audit Content Quality — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/audit-content-quality`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `audit-content-quality-lead`
3. If orchestrated → defer to orchestrating skill
