---
name: data-flow-architecture-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Data Flow Architecture skill routing."
---

# Data Flow Architecture — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/data-flow-architecture`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `data-flow-architecture-lead`
3. If orchestrated → defer to orchestrating skill
