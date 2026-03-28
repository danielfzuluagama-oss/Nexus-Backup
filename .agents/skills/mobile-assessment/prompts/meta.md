---
name: mobile-assessment-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Mobile Assessment skill routing."
---

# Mobile Assessment — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/mobile-assessment`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `mobile-assessment-lead`
3. If orchestrated → defer to orchestrating skill
