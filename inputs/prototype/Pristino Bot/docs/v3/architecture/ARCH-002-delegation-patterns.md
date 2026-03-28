# ARCH-002: Delegation Patterns

## Overview

Pristino supports three delegation modes, chosen by the LLM via the `route_request` tool:

```
User Message
    |
    v
PRISTINO (orchestrator)
    |
    +-- CP1: sanitizeInput()
    +-- CP2: buildSecurePrompt() (via composeSystemPrompt)
    +-- LLM evaluates -> routing_decision
    |       |
    |       +-- "single"    -> 1 agent responds
    |       +-- "terna"     -> 3 agents in parallel -> Synthesizer combines
    |       +-- "committee" -> 5 agents + deliberation + synthesis + tiebreaker
    |
    +-- CP3: validateOutput() on final result
```

## Mode 1: Single Agent

Simplest delegation. One specialist handles the entire request.

**When**: Clear single-domain task (time query, simple analysis).

```
User -> Pristino -> Agent -> CP3 -> User
```

## Mode 2: Terna (3 agents parallel)

Three agents work independently on the same task. A Synthesizer combines their outputs.

**When**: Multi-perspective analysis, tasks benefiting from diverse viewpoints.

```
User -> Pristino -> Agent A --+
                 -> Agent B --+--> Synthesizer -> CP3 -> User
                 -> Agent C --+
```

**Implementation** (`committee.ts`):
- `Promise.allSettled()` for parallel execution
- Failed agents excluded from synthesis
- If only one succeeds, returned as-is (no synthesis needed)
- Synthesizer receives all successful responses + original task

## Mode 3: Committee (5 agents + deliberation)

Full deliberation pattern for critical decisions.

**When**: High-stakes evaluations, complex decisions requiring rigor.

```
Phase 1: Deliberation
  All 5 agents respond independently to the task

Phase 2: Cross-validation (optional)
  Each agent evaluates the others' responses

Phase 3: Synthesis
  Synthesizer produces unified conclusion

Phase 4: Tiebreaker
  Pristino reviews synthesis; if conflicts remain,
  makes final decision (returns null if CONSENSUS_REACHED)
```

**Implementation** (`committee.ts`):
- `runCommittee(runner, agents, task)` orchestrates all phases
- Returns `CommitteeResult { deliberations, synthesis, tiebreaker, finalResponse }`
- Tiebreaker is optional — triggered only when synthesis contains unresolved conflicts

## Routing Decision Interface

```typescript
interface RoutingDecision {
  mode: "single" | "terna" | "committee";
  agents: string[];      // Agent IDs selected
  reason: string;        // Auditable explanation
  reversible: boolean;   // Always true
}
```

## Manual Overrides

Users can force a mode via commands (future implementation):
- `/single` — Force single-agent mode
- `/terna` — Force terna (3 agents)
- `/committee` — Force committee (5 agents)

## Design Principles

1. **Explicit**: LLM declares routing as a tool call, not implicitly
2. **Auditable**: Every decision logged with reason
3. **Reversible**: User can override any routing decision
4. **Efficient**: Defaults to single mode; scales up only when value > cost
5. **Secure**: All modes pass through CP1/CP2/CP3
