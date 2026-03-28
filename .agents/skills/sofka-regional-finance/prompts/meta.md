---
name: sofka-regional-finance-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Sofka Regional Finance skill routing."
---

# Sofka Regional Finance — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/sofka-regional-finance`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `sofka-regional-finance-lead`
3. If orchestrated → defer to orchestrating skill
