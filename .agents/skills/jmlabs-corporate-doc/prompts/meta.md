---
name: jmlabs-corporate-doc-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Jmlabs Corporate Doc skill routing."
---

# Jmlabs Corporate Doc — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/jmlabs-corporate-doc`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `jmlabs-corporate-doc-lead`
3. If orchestrated → defer to orchestrating skill
