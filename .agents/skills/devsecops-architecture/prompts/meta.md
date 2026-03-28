---
name: devsecops-architecture-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Devsecops Architecture skill routing."
---

# Devsecops Architecture — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/devsecops-architecture`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `devsecops-architecture-lead`
3. If orchestrated → defer to orchestrating skill
