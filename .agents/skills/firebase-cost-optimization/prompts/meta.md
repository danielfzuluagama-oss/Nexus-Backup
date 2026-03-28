---
name: firebase-cost-optimization-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Firebase Cost Optimization skill routing."
---

# Firebase Cost Optimization — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/firebase-cost-optimization`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `firebase-cost-optimization-lead`
3. If orchestrated → defer to orchestrating skill
