---
name: discovery-retrospective-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Discovery Retrospective skill routing."
---

# Discovery Retrospective — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/discovery-retrospective`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `discovery-retrospective-lead`
3. If orchestrated → defer to orchestrating skill
