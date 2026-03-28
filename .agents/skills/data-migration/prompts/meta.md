---
name: data-migration-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Data Migration skill routing."
---

# Data Migration — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/data-migration`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `data-migration-lead`
3. If orchestrated → defer to orchestrating skill
