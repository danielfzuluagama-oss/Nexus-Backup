---
name: ai-conops-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Ai Conops skill routing."
---

# Ai Conops — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/ai-conops`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `ai-conops-lead`
3. If orchestrated → defer to orchestrating skill
