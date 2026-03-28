---
name: integration-testing-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Integration Testing skill routing."
---

# Integration Testing — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/integration-testing`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `integration-testing-lead`
3. If orchestrated → defer to orchestrating skill
