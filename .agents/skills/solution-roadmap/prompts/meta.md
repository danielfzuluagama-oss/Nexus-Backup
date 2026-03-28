---
name: solution-roadmap-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Solution Roadmap skill routing."
---

# Solution Roadmap — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/solution-roadmap`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `solution-roadmap-lead`
3. If orchestrated → defer to orchestrating skill
