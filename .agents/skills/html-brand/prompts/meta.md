---
name: html-brand-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Html Brand skill routing."
---

# Html Brand — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/html-brand`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `html-brand-lead`
3. If orchestrated → defer to orchestrating skill
