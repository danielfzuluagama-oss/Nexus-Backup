---
name: iic-checklist-generator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Iic Checklist Generator skill routing."
---

# Iic Checklist Generator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/iic-checklist-generator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `iic-checklist-generator-lead`
3. If orchestrated → defer to orchestrating skill
