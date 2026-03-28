---
name: penetration-testing-guide-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Penetration Testing Guide skill routing."
---

# Penetration Testing Guide — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/penetration-testing-guide`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `penetration-testing-guide-lead`
3. If orchestrated → defer to orchestrating skill
