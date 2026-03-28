# ARCH-001: Ecosystem Overview

## 4-Layer Architecture

```
Capa 3: TEMPLATES        — HTML/DOCX/XLSX static assets
Capa 2: DEFINITIONS      — agent.md, skill.yaml, prompts/*.md
Capa 1: ECOSYSTEM FRAMEWORK — TypeScript loader, router, committee, skill-engine
Capa 0: CORE ENGINE       — 12 original files (839 LOC) — PRESERVED
```

## Separation: Code vs Content

| Aspect | TypeScript (runtime) | YAML/Markdown (data) |
|--------|---------------------|----------------------|
| Agent identity | `loader.ts` parses | `agents/*/agent.md` |
| Skills | `skill-engine.ts` executes | `agents/*/skills/*/skill.yaml` |
| Workflows | `skill-engine.ts` iterates | Inside `skill.yaml` |
| Prompts | `prompt-composer.ts` composes | `agents/*/prompts/*.md` |
| Delegation | `router.ts` decides mode | Rules in each `agent.md` |
| Committee | `committee.ts` orchestrates | Deliberation/synthesis prompts |
| Templates | Generated on demand | `templates/` specs |

## New TypeScript Modules (Capa 1)

| File | LOC est. | Purpose |
|------|----------|---------|
| `src/ecosystem/types.ts` | ~120 | All interfaces and types |
| `src/ecosystem/loader.ts` | ~150 | Parse agent.md, load prompts, load all agents |
| `src/ecosystem/prompt-composer.ts` | ~80 | Compose system prompts from agent definitions |
| `src/ecosystem/router.ts` | ~160 | Route requests: single/terna/committee |
| `src/ecosystem/committee.ts` | ~170 | Terna parallel execution, committee deliberation |
| `src/ecosystem/skill-engine.ts` | ~140 | Execute workflows step-by-step |
| `src/config/llm-providers.ts` | ~130 | Multi-agent LLM provider routing |

## Modified Files (Capa 0, backward compatible)

| File | Change |
|------|--------|
| `src/config.ts` | Added `agentsPath`, `agentCredentials`, multi-agent support |
| `src/tools/registry.ts` | Added generic `registerTool()` function |
| `src/tools/delegate.ts` | Added `registerEcosystemAgents()` |
| `src/agent.ts` | Added ecosystem hook for prompt composition |
| `src/index.ts` | Ecosystem initialization at startup |

## Agent Catalog (6)

| Agent | Role | Skills |
|-------|------|--------|
| pristino-orchestrator | Orchestrator, routing, synthesis | delegation, conversation, memory-mgmt, self-diagnosis |
| timekeeper | Time, dates, timezones | time-query, date-calc, tz-conversion, calendar-awareness |
| analyst | Analysis, evaluation, comparison | text-analysis, comparison, evaluation, recommendation |
| researcher | Research, verification, summaries | info-gathering, fact-checking, source-eval, summarization |
| synthesizer | Synthesis, aggregation, consensus | aggregation, conclusion-drawing, report-gen, consensus |
| validator | QA, consistency, completeness | quality-check, consistency-check, completeness-check, security-audit |

## Security (preserved from v2)

- **CP1**: `sanitizeInput()` — Sanitize all user input before processing
- **CP2**: `buildSecurePrompt()` — Harden all system prompts (applied inside `composeSystemPrompt`)
- **CP3**: `validateOutput()` — Validate all agent outputs before delivery
- **Whitelist**: Telegram user ID check (`TELEGRAM_ALLOWED_USER_IDS`)
- **Depth guard**: Sub-agents cannot delegate (depth limit = 1)
