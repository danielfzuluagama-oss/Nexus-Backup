---
name: seo-technical-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Seo Technical skill routing."
---

# Seo Technical — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/seo-technical`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `seo-technical-lead`
3. If orchestrated → defer to orchestrating skill
