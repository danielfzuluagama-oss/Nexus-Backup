---
name: react-component-library-meta
type: meta
version: 2.0.0
description: "Meta-prompt for React Component Library skill routing."
---

# React Component Library — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/react-component-library`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `react-component-library-lead`
3. If orchestrated → defer to orchestrating skill
