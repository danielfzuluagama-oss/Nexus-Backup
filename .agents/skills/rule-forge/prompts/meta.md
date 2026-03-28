---
name: rule-forge-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Rule Forge skill routing."
---

# Rule Forge — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/rule-forge`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `rule-forge-lead`
3. If orchestrated → defer to orchestrating skill
