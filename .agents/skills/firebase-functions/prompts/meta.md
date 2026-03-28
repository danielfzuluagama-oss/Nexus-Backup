---
name: firebase-functions-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Firebase Functions skill routing."
---

# Firebase Functions — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/firebase-functions`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `firebase-functions-lead`
3. If orchestrated → defer to orchestrating skill
