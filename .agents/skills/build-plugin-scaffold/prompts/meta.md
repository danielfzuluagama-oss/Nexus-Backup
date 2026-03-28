---
name: build-plugin-scaffold-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Build Plugin Scaffold skill routing."
---

# Build Plugin Scaffold — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/build-plugin-scaffold`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `build-plugin-scaffold-lead`
3. If orchestrated → defer to orchestrating skill
