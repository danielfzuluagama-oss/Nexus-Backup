---
name: governance-framework-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Governance Framework skill routing."
---

# Governance Framework — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/governance-framework`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `governance-framework-lead`
3. If orchestrated → defer to orchestrating skill
