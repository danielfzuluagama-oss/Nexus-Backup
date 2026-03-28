---
name: accessibility-audit-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Accessibility Audit skill routing."
---

# Accessibility Audit — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/accessibility-audit`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `accessibility-audit-lead`
3. If orchestrated → defer to orchestrating skill
