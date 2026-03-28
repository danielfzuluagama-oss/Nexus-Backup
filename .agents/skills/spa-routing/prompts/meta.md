---
name: spa-routing-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Spa Routing skill routing."
---

# Spa Routing — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/spa-routing`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `spa-routing-lead`
3. If orchestrated → defer to orchestrating skill
