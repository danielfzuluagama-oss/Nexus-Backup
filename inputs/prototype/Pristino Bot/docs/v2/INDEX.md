---
id: index-v2
type: deliverable-index
version: "2.0.0"
date: "2026-03-06"
project: "Pristino/Deonto"
total_deliverables: 8
total_source_files: 24
total_loc: 1706
tags: [index, navigation, deliverables, v2]
---

# Pristino/Deonto v2 — Indice de Entregables

## Mapa de Navegacion

```
docs/v2/
├── INDEX.md                          ← ESTAS AQUI
│
├── retrospective/
│   ├── RETRO-001-pristino-to-deonto.md    [~5 min lectura]
│   │   Metricas, patrones, anti-patrones, ADRs, recomendaciones v3
│   │
│   └── SOCRATIC-001-agent-design-debate.md [~4 min lectura]
│       5 rondas dialecticas: seguridad, escalabilidad, tokens,
│       testabilidad, mantenibilidad. Veredicto: condicionalmente valido
│
├── knowledge-graph/
│   └── GRAPH-001-agent-architecture.md    [~3 min lectura]
│       18 entidades, 24 relaciones, arbol de dependencias,
│       mapa de seguridad, mapa de token budget
│
└── scaffolding/
    └── SCAFFOLD-001-agent-project-template.md [~3 min lectura]
        Estructura de directorio, naming conventions, slugging,
        templates para tools/sub-agents/documentos, checklists

.claude/skills/
└── open-claw-like-agents-builder/
    └── SKILL.md                           [~8 min lectura]
        Skill completo: 6-layer stack, security protocol,
        token optimization, multi-agent orchestration,
        scaffolding commands, quality rubric, references
```

## Codigo Fuente

### Pristino v2 (839 LOC)
```
src/
├── index.ts           42 LOC  Entry point, lifecycle, shutdown
├── config.ts          63 LOC  Env loading, 9 tunable params
├── logger.ts          17 LOC  Structured [timestamp][LEVEL] logging
├── security.ts        67 LOC  3 checkpoints, 8 injection patterns
├── tokens.ts          49 LOC  Budget calc, char/4 estimation, trimming
├── bot.ts             78 LOC  grammy, whitelist, splitting, 60s timeout
├── agent.ts          184 LOC  Orchestrator, security, tokens, delegation
├── llm.ts            116 LOC  Groq primary, OpenRouter fallback, types
├── memory.ts          68 LOC  SQLite WAL, close(), 32KB guard
└── tools/
    ├── registry.ts    61 LOC  Async dispatch, dynamic registration
    ├── delegate.ts    61 LOC  Sub-agent routing, timekeeper
    └── get-current-time.ts  33 LOC  IANA timezone support
```

### Deonto v2 (867 LOC)
```
Misma estructura. Diferencias: nombre del agente, ruta DB,
documentacion inline mas detallada (+28 LOC).
```

## Trazabilidad: Plan → Entrega

| Plan Item | Status | Archivo(s) |
|-----------|--------|------------|
| ADR-1: Defensa en profundidad | Implementado | security.ts |
| ADR-2: Token optimization | Implementado | tokens.ts |
| ADR-3: Multi-agent delegacion | Implementado | delegate.ts, registry.ts, agent.ts |
| ADR-4: OpenRouter opcional | Implementado | config.ts, llm.ts |
| ADR-5: Config-driven defaults | Implementado | config.ts, .env.example |
| Issue #1: OpenRouter required | Corregido | config.ts:27 |
| Issue #2: Invalid IDs silent | Corregido | config.ts:34-36 |
| Issue #3: No Memory.close() | Corregido | memory.ts:64-67 |
| Issue #4: No content guard | Corregido | memory.ts:47-54 |
| Issue #5: `as any` casts | Corregido | llm.ts:57-58 |
| Issue #6: Model hardcoded | Corregido | config.ts:54, llm.ts:56 |
| Issue #7: max_tokens hardcoded | Corregido | config.ts:60, llm.ts:60 |
| Issue #8: No fetch timeout | Corregido | llm.ts:74,90 |
| Issue #9: Constants hardcoded | Corregido | config.ts:58-61 |
| Issue #10: toolCalls null guard | Corregido | agent.ts:128 |
| Issue #11: No splitting/timeout | Corregido | bot.ts:10-31,52-56 |
| Issue #12: reply not awaited | Corregido | bot.ts:65-67,74 |
| Issue #13: No init try/catch | Corregido | index.ts:10-42 |
| Issue #14: Memory never closed | Corregido | index.ts:25 |
| Issue #15: No unhandledRejection | Corregido | index.ts:31-33 |
| Issue #16: Sync-only executors | Corregido | registry.ts:8 |
| Issue #17: console.* scattered | Corregido | logger.ts, todos los archivos |

## Querying Rapido

### Por tipo de entregable
```bash
# Retrospectivas
find docs/ -name "RETRO-*.md"

# Debates socraticos
find docs/ -name "SOCRATIC-*.md"

# Grafos de conocimiento
find docs/ -name "GRAPH-*.md"

# Scaffolding
find docs/ -name "SCAFFOLD-*.md"

# Skills
find .claude/skills/ -name "SKILL.md"
```

### Por tema (grep en docs/)
```bash
# Seguridad
grep -rl "security\|checkpoint\|injection" docs/

# Tokens
grep -rl "token\|budget\|trimHistory" docs/

# Multi-agente
grep -rl "delegate\|sub-agent\|depth" docs/

# Arquitectura
grep -rl "architecture\|layer\|pattern" docs/
```
