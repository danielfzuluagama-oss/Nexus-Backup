---
name: client-browser-audit-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Client Browser Audit skill routing."
---

# Client Browser Audit — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/client-browser-audit`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `client-browser-audit-lead`
3. If orchestrated → defer to orchestrating skill
