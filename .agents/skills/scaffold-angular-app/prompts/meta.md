---
name: scaffold-angular-app-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Scaffold Angular App skill routing."
---

# Scaffold Angular App — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/scaffold-angular-app`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `scaffold-angular-app-lead`
3. If orchestrated → defer to orchestrating skill
