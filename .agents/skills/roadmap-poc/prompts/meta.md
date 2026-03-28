---
name: roadmap-poc-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Roadmap Poc skill routing."
---

# Roadmap Poc — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/roadmap-poc`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `roadmap-poc-lead`
3. If orchestrated → defer to orchestrating skill
