---
name: poc-lab-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Poc Lab skill routing."
---

# Poc Lab — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/poc-lab`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `poc-lab-lead`
3. If orchestrated → defer to orchestrating skill
