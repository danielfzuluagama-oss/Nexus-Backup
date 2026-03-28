---
name: maturity-assessment-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Maturity Assessment skill routing."
---

# Maturity Assessment — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/maturity-assessment`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `maturity-assessment-lead`
3. If orchestrated → defer to orchestrating skill
