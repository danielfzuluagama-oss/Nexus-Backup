---
name: email-template-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Email Template Builder skill routing."
---

# Email Template Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/email-template-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `email-template-builder-lead`
3. If orchestrated → defer to orchestrating skill
