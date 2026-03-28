---
name: bilingual-doc-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Bilingual Doc skill routing."
---

# Bilingual Doc — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/bilingual-doc`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `bilingual-doc-lead`
3. If orchestrated → defer to orchestrating skill
