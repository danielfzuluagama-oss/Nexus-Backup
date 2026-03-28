---
name: google-apis-integration-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Google Apis Integration skill routing."
---

# Google Apis Integration — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/google-apis-integration`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `google-apis-integration-lead`
3. If orchestrated → defer to orchestrating skill
