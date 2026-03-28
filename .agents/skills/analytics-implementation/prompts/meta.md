---
name: analytics-implementation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Analytics Implementation skill routing."
---

# Analytics Implementation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/analytics-implementation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `analytics-implementation-lead`
3. If orchestrated → defer to orchestrating skill
