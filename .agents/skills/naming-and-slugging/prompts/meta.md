---
name: naming-and-slugging-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Naming And Slugging skill routing."
---

# Naming And Slugging — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/naming-and-slugging`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `naming-and-slugging-lead`
3. If orchestrated → defer to orchestrating skill
