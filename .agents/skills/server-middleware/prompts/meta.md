---
name: server-middleware-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Server Middleware skill routing."
---

# Server Middleware — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/server-middleware`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `server-middleware-lead`
3. If orchestrated → defer to orchestrating skill
