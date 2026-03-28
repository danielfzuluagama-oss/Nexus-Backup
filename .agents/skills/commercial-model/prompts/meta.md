---
name: commercial-model-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Commercial Model skill routing."
---

# Commercial Model — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/commercial-model`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `commercial-model-lead`
3. If orchestrated → defer to orchestrating skill
