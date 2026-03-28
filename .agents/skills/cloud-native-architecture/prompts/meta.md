---
name: cloud-native-architecture-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Cloud Native Architecture skill routing."
---

# Cloud Native Architecture — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/cloud-native-architecture`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `cloud-native-architecture-lead`
3. If orchestrated → defer to orchestrating skill
