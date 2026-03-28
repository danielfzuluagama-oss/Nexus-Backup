# Contract: Ecosystem Module

**Modules**: `src/ecosystem/loader.ts`, `src/ecosystem/router.ts`, `src/ecosystem/committee.ts`

## Loader

```typescript
function loadEcosystem(agentsDir: string): EcosystemState
```

**Invariants**:
- Reads all `agents/*/agent.md` files
- Parses YAML frontmatter + markdown sections
- Validates against Zod schema (21 mandatory + 4 optional fields)
- Invalid definitions are logged as warnings and skipped (never crash)
- Merges shared defaults from `agents/_shared/` when fields omitted
- Loads skills from `agents/*/skills/*/skill.yaml`
- Returns `EcosystemState` with `initialized: true` on success

## Router

```typescript
function routeRequest(query: string, agents: AgentDefinition[]): RoutingDecision

interface RoutingDecision {
  mode: "single" | "terna" | "committee";
  agents: string[];
  reason: string;
  reversible: boolean;
}
```

**Invariants**:
- Always selects at least one agent (falls back to orchestrator direct response)
- Deterministic tiebreaker hierarchy: factual accuracy > scope fit > risk minimization > user intent
- Routing decision is logged (FR-005, SC-010)
- Mode selection based on query complexity and domain overlap
- Never exposes routing internals to user (FR-019)

## Committee

```typescript
function executeTerna(agents: string[], task: string, runner: SubAgentRunner): Promise<string>
function executeCommittee(agents: string[], task: string, runner: SubAgentRunner): Promise<CommitteeResult>
```

**Invariants**:
- Terna: 3 agents execute in parallel; Synthesizer unifies
- Committee: 5+ agents deliberate; consensus status reported (strong/majority/split/disagreement)
- Timeout degradation: committee→terna→single→direct
- Contradictory conclusions preserved with attribution (never silently dropped)
- Partial results delivered if timeout reached
