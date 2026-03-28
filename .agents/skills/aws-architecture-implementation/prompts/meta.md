---
name: aws-architecture-implementation-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Aws Architecture Implementation skill routing."
---

# Aws Architecture Implementation — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/aws-architecture-implementation`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `aws-architecture-implementation-lead`
3. If orchestrated → defer to orchestrating skill
