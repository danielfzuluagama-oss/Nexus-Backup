---
name: angular-module-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Angular Module Builder skill routing."
---

# Angular Module Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/angular-module-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `angular-module-builder-lead`
3. If orchestrated → defer to orchestrating skill
