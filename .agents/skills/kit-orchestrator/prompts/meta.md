---
name: kit-orchestrator-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Kit Orchestrator skill routing."
---

# Kit Orchestrator — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/kit-orchestrator`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `kit-orchestrator-lead`
3. If orchestrated → defer to orchestrating skill
