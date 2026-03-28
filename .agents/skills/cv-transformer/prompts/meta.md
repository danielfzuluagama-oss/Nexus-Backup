---
name: cv-transformer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Cv Transformer skill routing."
---

# Cv Transformer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/cv-transformer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `cv-transformer-lead`
3. If orchestrated → defer to orchestrating skill
