---
name: quality-gatekeeper-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Quality Gatekeeper skill routing."
---

# Quality Gatekeeper — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/quality-gatekeeper`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `quality-gatekeeper-lead`
3. If orchestrated → defer to orchestrating skill
