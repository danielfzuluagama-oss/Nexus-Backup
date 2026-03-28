---
name: landing-page-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Landing Page Builder skill routing."
---

# Landing Page Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/landing-page-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `landing-page-builder-lead`
3. If orchestrated → defer to orchestrating skill
