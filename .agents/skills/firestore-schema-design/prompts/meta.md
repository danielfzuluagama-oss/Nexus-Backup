---
name: firestore-schema-design-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Firestore Schema Design skill routing."
---

# Firestore Schema Design — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/firestore-schema-design`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `firestore-schema-design-lead`
3. If orchestrated → defer to orchestrating skill
