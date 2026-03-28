---
name: meta-skill-deployer-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Meta Skill Deployer skill routing."
---

# Meta Skill Deployer — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/meta-skill-deployer`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `meta-skill-deployer-lead`
3. If orchestrated → defer to orchestrating skill
