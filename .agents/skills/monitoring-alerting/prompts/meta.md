---
name: monitoring-alerting-meta
type: meta
version: 2.0.0
description: "Meta-prompt for Monitoring Alerting skill routing."
---

# Monitoring Alerting — Meta Prompt

Activate this skill when the user request matches:
- Trigger phrases from SKILL.md description
- Direct invocation: `/monitoring-alerting`

## Skill Routing
1. Load SKILL.md → read `## When to Activate` section
2. If match → activate lead agent: `monitoring-alerting-lead`
3. If orchestrated → defer to orchestrating skill
