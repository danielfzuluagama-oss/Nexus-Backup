---
name: fix-common-issues-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Fix Common Issues skill routing."
---

# Fix Common Issues — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/fix-common-issues`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `fix-common-issues-lead`
3. If orchestrated → defer to orchestrating skill
