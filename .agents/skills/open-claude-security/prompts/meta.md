---
name: open-claude-security-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Open Claude Security skill routing."
---

# Open Claude Security — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/open-claude-security`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `open-claude-security-lead`
3. If orchestrated → defer to orchestrating skill
