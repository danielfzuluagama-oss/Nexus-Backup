---
name: data-governance-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Data Governance skill routing."
---

# Data Governance — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/data-governance`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `data-governance-lead`
3. If orchestrated → defer to orchestrating skill
