---
name: aws-architecture-audit-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Aws Architecture Audit skill routing."
---

# Aws Architecture Audit — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/aws-architecture-audit`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `aws-architecture-audit-lead`
3. If orchestrated → defer to orchestrating skill
