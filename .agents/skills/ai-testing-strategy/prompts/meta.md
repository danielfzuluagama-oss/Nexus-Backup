---
name: ai-testing-strategy-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ai Testing Strategy skill routing."
---

# Ai Testing Strategy — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ai-testing-strategy`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ai-testing-strategy-lead`
3. If orchestrated → defer to orchestrating skill
