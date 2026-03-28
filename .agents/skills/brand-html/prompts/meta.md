---
name: brand-html-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Brand Html skill routing."
---

# Brand Html — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/brand-html`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `brand-html-lead`
3. If orchestrated → defer to orchestrating skill
