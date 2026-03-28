---
name: visual-regression-testing-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Visual Regression Testing skill routing."
---

# Visual Regression Testing — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/visual-regression-testing`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `visual-regression-testing-lead`
3. If orchestrated → defer to orchestrating skill
