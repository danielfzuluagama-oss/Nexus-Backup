---
name: responsive-design-system-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Responsive Design System skill routing."
---

# Responsive Design System — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/responsive-design-system`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `responsive-design-system-lead`
3. If orchestrated → defer to orchestrating skill
