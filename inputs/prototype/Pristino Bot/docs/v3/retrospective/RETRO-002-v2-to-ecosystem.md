# RETRO-002: v2 to Ecosystem Transition

## What Changed

| Aspect | v2 (Before) | v3 Ecosystem (After) |
|--------|-------------|---------------------|
| Sub-agents | 1 hardcoded (Timekeeper) | 6 dynamic from agent.md |
| System prompt | Hardcoded BASE_SYSTEM_PROMPT | Composed from agent.md constitutional docs |
| Delegation | Flat (depth=1 only) | Smart routing: single/terna/committee |
| Skills | 0 formal | 24 skills with 96 workflows |
| Prompts | 0 formal | 66 prompt files (9 types per agent) |
| Templates | 0 | 6 base templates (HTML/DOCX spec/XLSX spec) |
| Configuration | Single-agent | Multi-agent with per-agent credentials |
| Meta-skills | 0 | 9 Claude Code skills (factory of consistency) |
| LOC | 839 TypeScript | 839 preserved + ~800 new TS + ~14K content |

## What Was Preserved (Capa 0)

- 3 security checkpoints (sanitizeInput, buildSecurePrompt, validateOutput)
- Token budget management (estimateTokens, calculateBudget, trimHistory)
- Deferred executor registration pattern
- Config-driven defaults (9 tunable parameters)
- Groq primary + OpenRouter fallback
- SQLite + WAL + prepared statements
- Newline-aware message splitting
- Grammy Telegram bot integration

## What Was Added (Capa 1)

New TypeScript modules in `src/ecosystem/`:
- `types.ts` — All interfaces (AgentDefinition, SkillDefinition, etc.)
- `loader.ts` — Parse agent.md YAML frontmatter and markdown sections
- `prompt-composer.ts` — Compose system prompts from definitions
- `router.ts` — Smart routing with route_request tool
- `committee.ts` — Terna and committee parallel execution
- `skill-engine.ts` — Workflow step-by-step execution

Multi-agent support:
- `src/config/llm-providers.ts` — Per-agent LLM provider routing
- Updated `config.ts` with `AgentCredentials` and `getAgentCredentials()`

## What Was Generated (Capa 2-3)

Created using meta-skills for consistency:
- 6 agent.md constitutional documents (21 fields each)
- 66 prompt files (11 per agent, 9 types)
- 24 skill.yaml files (4 per agent, 18 top-level fields each)
- 96 workflows (4 per skill, 17 fields each)
- ~350 steps (3-5 per workflow, 12 fields each)
- 6 template specifications (2 HTML, 2 DOCX YAML, 2 XLSX YAML)

## Key Decisions

1. **No YAML dependency**: Used regex for frontmatter parsing instead of adding `yaml` package
2. **SubAgentRunner callback**: Breaks circular dependency between ecosystem modules and agent.ts
3. **composeSystemPrompt applies CP2**: Prevents double-application in agent.ts
4. **Backward compatible**: Ecosystem is optional; legacy mode works without agents/ directory
5. **Content as data**: agent.md and skill.yaml are data files, not code — enables scaling without code changes
6. **Meta-skills factory**: One skill per document type ensures consistency at scale

## Risks and Mitigations

| Risk | Mitigation |
|------|-----------|
| YAML parsing without lib | Regex handles frontmatter; skill.yaml uses simple structures |
| Ecosystem adds startup time | Agents loaded once at startup; cached in EcosystemState Map |
| Committee mode is slow | Reserved for critical decisions; single mode is default |
| Prompt leaks in committee | CP3 validates all outputs; depth guard prevents recursive delegation |
| Multi-agent key confusion | Per-agent credentials with clear naming: `*_PRISTINO`, `*_DEONTO` |

## Verification Checklist

- [x] `npx tsc --noEmit` — zero errors
- [x] 6 agent.md files with 21 fields each
- [x] 66 prompt files with YAML frontmatter
- [x] 24 skill.yaml files with 4 workflows each
- [x] 6 template specifications
- [x] Multi-agent config backward compatible
- [x] Security checkpoints preserved (CP1, CP2, CP3)
- [ ] End-to-end Telegram flow (requires runtime testing)
- [ ] Terna parallel execution (requires runtime testing)
- [ ] Committee deliberation (requires runtime testing)

---

## v3.1 Hardening Changes

| ID | Finding | Change | Impact |
|----|---------|--------|--------|
| F1 | llm.ts duplicates llm-providers.ts | Deleted llm.ts (-117 LOC), consolidated types | Single source of truth for LLM types |
| F2 | Global toolExecutors/toolDefinitions | ToolRegistry class with per-instance state | Mirror sync: isolated tool state |
| F3 | Global subAgents Map | SubAgentRegistry class with per-instance state | Mirror sync: isolated delegation |
| F4 | Single bot per process | AgentRuntime class + multi-runtime loop in index.ts | Pristino + Deonto simultaneous |
| F5 | Shared SQLite database | Per-instance dbPath: data/<name>.db | No cross-instance data leak |
| F6 | No ecosystem validation | validateAgentDefinition() checks 20 fields at load | Detects missing/misspelled sections |
| F7 | MAX_DEPTH not enforced | depth > 3 returns error in agent.ts | Prevents infinite recursion |
| F8 | No circuit breaker | CircuitBreaker class: 3 failures → open → 60s reset | Groq outages skip to OpenRouter |
| F9 | Unsafe prompt interpolation | escapeTemplateChars() on context values | Prevents nested template injection |
| F10 | Logger lacks instance prefix | createLogger(name) → [PRISTINO]/[DEONTO] | Distinguishable log streams |
| F11 | agent.md missing sections | +5 optional sections: Assumptions, Acceptance Criteria, Explicit Limits, Trade-off Rationale, Edge Cases | 10× more complete definitions |
| F12 | No domain overlap tiebreakers | 7 deterministic rules in orchestrator + meta-reasoning.md | Eliminates routing ambiguity |
| F13 | No mirror sync policy | 8-point policy in orchestrator agent.md | Explicit isolation contract |
| F14 | Boilerplate in skill.yaml | agents/_shared/defaults.yaml with inherited security/RACI | DRY: single source for defaults |
| F15 | No tool call cap per turn | MAX_TOOL_CALLS_PER_TURN = 5 in agent.ts | Prevents runaway execution |
| D2 | No design rationale on workflows | designRationale field on 7 key workflows | Traceability for design decisions |
| D3 | No workflow timeouts | timeoutMs field + Promise.race in skill-engine.ts | Bounded execution time |

### v3.1 Net Impact
- TypeScript: ~1200 → ~1350 LOC (+150 net)
- Content: ~14K → ~16K words (+~2K net, within 2× constraint)
- New files: runtime.ts, circuit-breaker.ts, defaults.yaml, ARCH-003
- Deleted files: llm.ts
