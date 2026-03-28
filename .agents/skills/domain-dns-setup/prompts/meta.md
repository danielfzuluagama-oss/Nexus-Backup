---
name: domain-dns-setup-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Domain Dns Setup skill routing."
---

# Domain Dns Setup — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/domain-dns-setup`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `domain-dns-setup-lead`
3. If orchestrated → defer to orchestrating skill
