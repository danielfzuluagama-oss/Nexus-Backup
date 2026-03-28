---
name: firebase-auth-setup-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Firebase Auth Setup skill routing."
---

# Firebase Auth Setup — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/firebase-auth-setup`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `firebase-auth-setup-lead`
3. If orchestrated → defer to orchestrating skill
