---
name: sofka-bpmn-process-analysis-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Sofka Bpmn Process Analysis skill routing."
---

# Sofka Bpmn Process Analysis — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/sofka-bpmn-process-analysis`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `sofka-bpmn-process-analysis-lead`
3. If orchestrated → defer to orchestrating skill
