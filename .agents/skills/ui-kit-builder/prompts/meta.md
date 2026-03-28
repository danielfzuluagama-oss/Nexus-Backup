---
name: ui-kit-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ui Kit Builder skill routing."
---

# Ui Kit Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ui-kit-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ui-kit-builder-lead`
3. If orchestrated → defer to orchestrating skill
