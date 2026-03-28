---
name: role-based-access-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Role Based Access skill routing."
---

# Role Based Access — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/role-based-access`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `role-based-access-lead`
3. If orchestrated → defer to orchestrating skill
