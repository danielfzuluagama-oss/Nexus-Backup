---
name: enterprise-architecture-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Enterprise Architecture skill routing."
---

# Enterprise Architecture — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/enterprise-architecture`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `enterprise-architecture-lead`
3. If orchestrated → defer to orchestrating skill
