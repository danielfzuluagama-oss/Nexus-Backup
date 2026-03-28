# Pristino Ecosystem v3.1.0 — Documentation Index

## Architecture
- [ARCH-001: Ecosystem Overview](architecture/ARCH-001-ecosystem-overview.md)
- [ARCH-002: Delegation Patterns](architecture/ARCH-002-delegation-patterns.md)
- [ARCH-003: Mirror Sync Architecture](architecture/ARCH-003-mirror-sync.md)

## Knowledge Graph
- [GRAPH-002: Ecosystem Entity Graph](knowledge-graph/GRAPH-002-ecosystem-graph.md)

## Retrospective
- [RETRO-002: v2 to Ecosystem Transition](retrospective/RETRO-002-v2-to-ecosystem.md)

## Quick Stats
| Metric | Count |
|--------|-------|
| Total files | ~130 |
| TypeScript source | 21 files (~1300 LOC) |
| Agent definitions | 72+ files (6 agents × 12+ avg) |
| Skill definitions | 24 files (4 per agent) |
| Workflows | 96 (4 per skill) |
| Templates | 6 (2 HTML, 2 DOCX spec, 2 XLSX spec) |
| Meta-skills | 9 Claude Code skills |
| Security checkpoints | 3 (CP1, CP2, CP3) |
| Shared defaults | 1 (agents/_shared/defaults.yaml) |

## v3.1 Hardening Changes
| Stream | Focus | Key Changes |
|--------|-------|-------------|
| A | Mirror Architecture | AgentRuntime class, per-instance DB/LLM/logger, dual-bot launcher |
| B | TypeScript Hardening | Circuit breaker, depth guard, tool call cap, ecosystem validation |
| C | agent.md Densification | +5 sections per agent, tiebreaker rules, edge case catalogs |
| D | Content Quality (DRY) | Shared defaults.yaml, designRationale, workflow timeouts |
| E | Documentation | ARCH-003 mirror sync, updated INDEX |
