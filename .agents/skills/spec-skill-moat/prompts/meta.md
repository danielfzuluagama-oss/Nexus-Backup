---
name: spec-skill-moat-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Spec Skill Moat skill routing."
---

# Spec Skill Moat — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/spec-skill-moat`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `spec-skill-moat-lead`
3. If orchestrated → defer to orchestrating skill
