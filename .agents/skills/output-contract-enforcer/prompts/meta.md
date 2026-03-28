---
name: output-contract-enforcer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Output Contract Enforcer skill routing."
---

# Output Contract Enforcer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/output-contract-enforcer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `output-contract-enforcer-lead`
3. If orchestrated → defer to orchestrating skill
