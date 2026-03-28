---
name: generate-qa-scorecard-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Generate Qa Scorecard skill routing."
---

# Generate Qa Scorecard — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/generate-qa-scorecard`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `generate-qa-scorecard-lead`
3. If orchestrated → defer to orchestrating skill
