---
name: code-review-checklist-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Code Review Checklist skill routing."
---

# Code Review Checklist — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/code-review-checklist`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `code-review-checklist-lead`
3. If orchestrated → defer to orchestrating skill
