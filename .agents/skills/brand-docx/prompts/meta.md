---
name: brand-docx-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Brand Docx skill routing."
---

# Brand Docx — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/brand-docx`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `brand-docx-lead`
3. If orchestrated → defer to orchestrating skill
