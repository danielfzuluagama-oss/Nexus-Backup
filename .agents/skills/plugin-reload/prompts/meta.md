---
name: plugin-reload-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Plugin Reload skill routing."
---

# Plugin Reload — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/plugin-reload`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `plugin-reload-lead`
3. If orchestrated → defer to orchestrating skill
