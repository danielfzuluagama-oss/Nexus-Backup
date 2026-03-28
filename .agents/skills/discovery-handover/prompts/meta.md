---
name: discovery-handover-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Discovery Handover skill routing."
---

# Discovery Handover — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/discovery-handover`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `discovery-handover-lead`
3. If orchestrated → defer to orchestrating skill
