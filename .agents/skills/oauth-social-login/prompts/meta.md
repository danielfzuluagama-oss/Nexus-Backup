---
name: oauth-social-login-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Oauth Social Login skill routing."
---

# Oauth Social Login — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/oauth-social-login`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `oauth-social-login-lead`
3. If orchestrated → defer to orchestrating skill
