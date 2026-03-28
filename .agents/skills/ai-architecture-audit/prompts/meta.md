---
name: ai-architecture-audit-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ai Architecture Audit skill routing."
---

# Ai Architecture Audit — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ai-architecture-audit`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ai-architecture-audit-lead`
3. If orchestrated → defer to orchestrating skill
