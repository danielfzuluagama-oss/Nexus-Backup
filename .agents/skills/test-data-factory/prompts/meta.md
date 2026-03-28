---
name: test-data-factory-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Test Data Factory skill routing."
---

# Test Data Factory — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/test-data-factory`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `test-data-factory-lead`
3. If orchestrated → defer to orchestrating skill
