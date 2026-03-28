# Implementation Plan: Pristino Bot 2.0

**Branch**: `001-pristino-bot-v2` | **Date**: 2026-03-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-pristino-bot-v2/spec.md`

## Summary

Formalize the Pristino Bot prototype into a production-grade multi-agent orchestration system for Telegram. The system routes user messages to specialist agents via three delegation modes (single, terna, committee), enforces brand voice compliance, implements defense-in-depth security (3 checkpoints), and persists state across a 3-layer memory architecture (working, episodic, semantic). V2 adds TDD discipline, schema validation, structured error handling, and production hardening while preserving the prototype's architecture.

## Technical Context

**Language/Version**: TypeScript 5.x (ES2022 target, ESM modules)
**Primary Dependencies**: Grammy 1.x (Telegram), Groq SDK 0.15.x (LLM), firebase-admin 13.x (Firestore), Zod (validation), Express 5.x (webhooks), marked (Markdown rendering)
**Storage**: Firestore (3-layer memory: working/episodic/semantic) with in-memory fallback
**Testing**: Vitest 4.x with v8 coverage (80% global, 100% critical paths)
**Target Platform**: Google Cloud Run (containerized) + Telegram Bot API
**Project Type**: Single service (monolithic, single-process)
**Performance Goals**: <60s total response (single <15s p95, terna <30s p95, committee <60s)
**Constraints**: <4096 char Telegram message limit, 3-level max recursion depth, 60s hard timeout, Groq rate limits (multi-key cascade)
**Scale/Scope**: 2 mirror instances (Pristino/Deonto), 6+ agents, 24+ skills, 96+ workflows, <10 concurrent users (Chief Officers team)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Plan Compliance |
|-----------|--------|-----------------|
| I. Orchestrator Sovereignty | ALIGNED | Orchestrator routes only; specialists execute domain work. Architecture diagram shows clear separation. |
| II. Brand Voice Integrity | ALIGNED | Output checkpoint enforces Minto structure, forbidden term replacement, formatting strip. Validator agent performs post-hoc audit. |
| III. Defense in Depth | ALIGNED | CP1 (input sanitization), CP2 (prompt hardening), CP3 (output scan). CP1/CP2 are hard blocks; CP3 is soft pass. 100% test coverage on all checkpoints. |
| IV. Graceful Degradation | ALIGNED | 2D LLM cascade (model tiers x API keys), mode degradation (committee>terna>single>direct), in-memory storage fallback, chunked message delivery. |
| V. Memory Sovereignty | ALIGNED | AgentRuntime per-instance isolation. Mirror instances share read-only definitions; runtime state is isolated. Sub-agents do not persist. |
| VI. TDD (NON-NEGOTIABLE) | ALIGNED | Vitest 4.x with 80% global coverage gate. 100% coverage on CP1/CP2/CP3, routing, circuit breaker. Red-green-refactor discipline enforced via `/iikit-04-testify`. |
| VII. Spec Before Implementation | ALIGNED | This plan follows spec.md. Tasks will reference spec requirements. |
| VIII. Data Lifecycle Integrity | ALIGNED | Working memory TTL (configurable, default 30 days). Episodic permanent with per-user purge. Semantic with provenance tracking. All data classified. |

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TELEGRAM USERS                              │
│                    (Chief Officers, Allowlisted)                     │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                    Webhook / Polling
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                     EXPRESS SERVER (Cloud Run)                       │
│  POST /webhook/:botName → Pub/Sub → Async Worker                   │
│  GET /health                                                        │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                      BOT GATEWAY (Grammy)                           │
│  Multimodal ingress: text, voice→transcribe, photo, document       │
│  User allowlist check (silent drop if unauthorized)                 │
│  Platform message formatting (Markdown→Telegram HTML)               │
│  Auto-chunking (4096 char limit)                                    │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                   SECURITY PIPELINE                                 │
│  ┌──────┐  ┌──────┐  ┌──────┐                                     │
│  │ CP1  │→│ CP2  │→│ CP3  │                                       │
│  │Input │  │Prompt│  │Output│                                       │
│  │BLOCK │  │BLOCK │  │ LOG  │                                       │
│  └──────┘  └──────┘  └──────┘                                      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                   AGENT COGNITION LOOP                               │
│  1. Load identity + team context + conversation history              │
│  2. Token budget (trim history if needed)                            │
│  3. Tool-use loop (max 3 iterations):                                │
│     LLM call → tool execution → append results → repeat             │
│  4. Sub-agent delegation (max depth 3)                               │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                   ECOSYSTEM ROUTER                                   │
│  ┌────────────┐  ┌────────────┐  ┌─────────────┐                   │
│  │  SINGLE    │  │   TERNA    │  │  COMMITTEE   │                   │
│  │ 1 agent    │  │ 3 parallel │  │ 5+ deliber.  │                   │
│  │ direct     │  │ + synth.   │  │ + tiebreaker │                   │
│  └────────────┘  └────────────┘  └─────────────┘                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│               SPECIALIST AGENTS (6+)                                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐              │
│  │ Analyst  │ │Researcher│ │Synthesiz.│ │Timekeeper│              │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘              │
│  ┌──────────┐ ┌──────────┐                                         │
│  │Validator │ │ Future.. │  Loaded from agents/*/agent.md           │
│  └──────────┘ └──────────┘                                         │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────────────┐
│                  TOOL REGISTRY                                       │
│  route_request, delegate_to_agent, get_current_time, knowledge,     │
│  skill_engine (workflow execution)                                   │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
┌────────▼───────┐ ┌───────▼──────┐ ┌────────▼───────┐
│ LLM PROVIDERS  │ │   FIRESTORE  │ │  GROQ WHISPER  │
│ Groq (3 tiers) │ │  3-Layer Mem │ │  Transcription │
│ + OpenRouter   │ │  + Indexes   │ │                │
│ Circuit Breaker│ │  + Fallback  │ │                │
└────────────────┘ └──────────────┘ └────────────────┘
```

## Project Structure

### Documentation (this feature)

```text
specs/001-pristino-bot-v2/
  spec.md              # Feature specification
  plan.md              # This file
  research.md          # Technology decisions
  data-model.md        # Entity schemas
  quickstart.md        # Test scenarios
  contracts/           # Internal module contracts
  tasks.md             # Task breakdown (created by /iikit-tasks)
```

### Source Code (repository root)

```text
src/
  index.ts                    # Entry point, multi-bot orchestration
  bot.ts                      # Telegram gateway, multimodal ingress
  agent.ts                    # Agent cognition loop (identify-decide-act)
  runtime.ts                  # Per-instance state container (AgentRuntime)
  config.ts                   # Configuration & credential loading
  memory.ts                   # 3-layer Firestore memory
  security.ts                 # CP1/CP2/CP3 checkpoints
  format.ts                   # Brand voice enforcement, Telegram HTML
  circuit-breaker.ts          # Per-(model,key) failure isolation
  tokens.ts                   # Token budget & history trimming
  audio.ts                    # Groq Whisper transcription
  config/
    llm-providers.ts          # 2D cascading LLM provider router
  ecosystem/
    types.ts                  # Agent, Skill, Workflow, Routing types
    loader.ts                 # Agent.md parser with Zod validation
    router.ts                 # Route request tool & mode selection
    committee.ts              # Terna & committee execution
    prompt-composer.ts        # System prompt composition
    skill-engine.ts           # Skill metadata & workflow execution
  tools/
    registry.ts               # Tool definition & execution dispatcher
    delegate.ts               # Sub-agent delegation registry
    knowledge.ts              # Knowledge persistence interface
    get-current-time.ts       # Timekeeper tool
    symlink.ts                # OpenClaw registry symlink manager

tests/
  unit/
    security.test.ts          # CP1, CP2, CP3 (100% coverage required)
    circuit-breaker.test.ts   # Circuit breaker state machine (100%)
    tokens.test.ts            # Token budget calculations
    format.test.ts            # Brand voice enforcement
    memory.test.ts            # Memory layer operations
    loader.test.ts            # Agent definition validation
    router.test.ts            # Routing mode selection (100%)
    committee.test.ts         # Terna & committee execution
    prompt-composer.test.ts   # Prompt composition
    skill-engine.test.ts      # Workflow execution
    audio.test.ts             # Transcription handling
  integration/
    agent.test.ts             # Full cognition loop with mocked LLM
    bot.test.ts               # Message handling with mocked Telegram
    ecosystem.test.ts         # Agent loading + routing end-to-end
    memory.test.ts            # Firestore emulator integration
    delegation.test.ts        # Multi-agent delegation chains
  contract/
    llm-provider.test.ts      # Provider cascade behavior
    tool-registry.test.ts     # Tool registration & execution

agents/                        # Agent definitions (unchanged from prototype)
  pristino-orchestrator/
    agent.md
    prompts/
    skills/
  analyst/
  researcher/
  synthesizer/
  timekeeper/
  validator/
  _shared/
```

**Structure Decision**: Single-service monolith matching the prototype. The system runs as a single Node.js process per bot instance. This aligns with the <10 concurrent user scale and simplifies deployment to Cloud Run. The `tests/` directory is new for v2, organized by test type (unit/integration/contract) per Constitution Principle VI.

## Module Contracts

### Security Module (`src/security.ts`)

```typescript
// CP1: Input sanitization — HARD BLOCK
sanitizeInput(raw: string): { safe: boolean; cleaned: string; reason?: string }

// CP2: Prompt hardening — HARD BLOCK
buildSecurePrompt(systemPrompt: string): string

// CP3: Output validation — SOFT PASS (log, deliver anyway)
validateOutput(response: string): { safe: boolean; cleaned: string; warnings: string[] }
```

### Ecosystem Router (`src/ecosystem/router.ts`)

```typescript
// Determine routing mode and select agents
routeRequest(query: string, agents: AgentDefinition[]): RoutingDecision

// Execute routing decision
executeRouting(decision: RoutingDecision, task: string, runner: SubAgentRunner): Promise<string>
```

### Memory Module (`src/memory.ts`)

```typescript
// Working memory (ephemeral, TTL-based)
addMessage(userId: string, role: string, content: string): Promise<void>
getRecentMessages(userId: string, limit: number): Promise<Message[]>

// Semantic memory (permanent, provenance-tracked)
addKnowledge(fact: string, confidence: number, source: string): Promise<void>
getKnowledge(query: string): Promise<Knowledge[]>

// Data lifecycle
purgeUser(userId: string): Promise<void>  // All 3 layers
purgeExpiredWorking(): Promise<number>     // TTL enforcement
```

### LLM Provider (`src/config/llm-providers.ts`)

```typescript
// 2D cascading provider
getProvider(config: Config, agentName: AgentName): LLMProvider

interface LLMProvider {
  chat(messages: LLMMessage[], tools: ToolDefinition[]): Promise<LLMResponse>
  onQuotaExhausted?: (owner: string, provider: string) => void
}
```

## Key Design Decisions

### KD-001: Preserve Prototype Architecture

The prototype's architecture is sound. V2 formalizes it with tests, validation, and error handling rather than redesigning. The agent cognition loop, 2D LLM cascade, 3-layer memory, and ecosystem loader remain structurally identical.

### KD-002: Zod Validation at Boundaries

Add Zod schemas for: agent.md frontmatter parsing, skill.yaml parsing, LLM response parsing, configuration loading. This catches malformed data at system boundaries while preserving the prototype's internal data flow.

### KD-003: Test Strategy Per Constitution

Per Constitution Principle VI:
- **Unit tests**: Each module in isolation. Mock external dependencies (LLM, Firestore, Telegram).
- **Integration tests**: Agent cognition loop, ecosystem loading, memory persistence (Firestore emulator).
- **Contract tests**: LLM provider cascade behavior, tool registry contracts.
- **Coverage gates**: 80% global, 100% on CP1/CP2/CP3, router, circuit breaker.

### KD-004: No Premature Abstractions

The prototype already has good separation. V2 does not introduce: dependency injection framework, ORM layer, event bus, microservice split, or API versioning. These are unnecessary at the current scale (<10 users, single-process).

### KD-005: Agent Definitions Stay Declarative

Agent definitions remain markdown files loaded at startup. No hot-reload in v2 (would add complexity for minimal benefit given restart takes <5s on Cloud Run).

## Dependencies

| Package | Version | Purpose | New/Existing |
|---------|---------|---------|--------------|
| grammy | ^1.35.0 | Telegram bot framework | Existing |
| groq-sdk | ^0.15.0 | LLM provider (Groq) | Existing |
| firebase-admin | ^13.7.0 | Firestore, Firebase | Existing |
| @google-cloud/pubsub | ^5.3.0 | Async message processing | Existing |
| express | ^5.2.1 | HTTP webhook server | Existing |
| marked | ^17.0.4 | Markdown parsing | Existing |
| dotenv | ^16.4.0 | Environment variables | Existing |
| zod | ^3.24.0 | Schema validation | **New** |
| vitest | ^4.0.0 | Test framework | **New** |
| @vitest/coverage-v8 | ^4.0.0 | Coverage reporting | **New** |

## Complexity Tracking

> No constitution violations detected. No complexity justifications needed.

| Check | Result |
|-------|--------|
| Technology in constitution? | No — all tech choices are in this plan |
| Implementation in spec? | No — spec contains user stories and requirements only |
| Governance in plan? | No — plan references constitution principles, does not redefine them |
