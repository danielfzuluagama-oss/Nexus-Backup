---
name: user-story-writer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for User Story Writer skill routing."
---

# User Story Writer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/user-story-writer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `user-story-writer-lead`
3. If orchestrated → defer to orchestrating skill
