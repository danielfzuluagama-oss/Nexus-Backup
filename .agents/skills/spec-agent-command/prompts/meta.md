---
name: spec-agent-command-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Spec Agent Command skill routing."
---

# Spec Agent Command — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/spec-agent-command`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `spec-agent-command-lead`
3. If orchestrated → defer to orchestrating skill
