---
name: node-api-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Node Api Builder skill routing."
---

# Node Api Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/node-api-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `node-api-builder-lead`
3. If orchestrated → defer to orchestrating skill
