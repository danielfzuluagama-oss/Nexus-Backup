---
name: brand-xlsx-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Brand Xlsx skill routing."
---

# Brand Xlsx — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/brand-xlsx`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `brand-xlsx-lead`
3. If orchestrated → defer to orchestrating skill
