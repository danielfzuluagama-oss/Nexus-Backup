---
name: html-semantic-builder-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Html Semantic Builder skill routing."
---

# Html Semantic Builder — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/html-semantic-builder`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `html-semantic-builder-lead`
3. If orchestrated → defer to orchestrating skill
