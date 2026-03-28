---
name: ai-design-patterns-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ai Design Patterns skill routing."
---

# Ai Design Patterns — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ai-design-patterns`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ai-design-patterns-lead`
3. If orchestrated → defer to orchestrating skill
