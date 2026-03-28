# Data Model: Pristino Bot 2.0

**Feature**: `001-pristino-bot-v2`
**Date**: 2026-03-28

## Entities

### AgentDefinition

Loaded from `agents/*/agent.md` at startup. Read-only at runtime.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique agent identifier (directory name) |
| name | string | yes | Display name |
| role | string | yes | Role description |
| version | string | yes | Semantic version |
| mission | string | yes | Agent's mission statement |
| mandate | string[] | yes | What the agent must do |
| scope | string[] | yes | What's in scope |
| nonGoals | string[] | yes | Explicit exclusions |
| inputs | string[] | yes | Expected input types |
| outputs | string[] | yes | Produced output types |
| decisionRights | string[] | yes | Autonomous decisions allowed |
| allowedTools | string[] | yes | Tools this agent may invoke |
| forbiddenTools | string[] | yes | Tools explicitly denied |
| memoryPolicy | string | yes | How the agent uses memory |
| securityPolicy | string | yes | Security constraints |
| orchestrationPolicy | string | yes | Delegation behavior |
| delegationRules | string | yes | When/how to delegate |
| escalationRules | string | yes | When to escalate |
| toneOutputStyle | string | yes | Output style constraints |
| validationDiscipline | string | yes | Quality checking approach |
| failureHandling | string | yes | Error recovery behavior |
| completionCriteria | string | yes | When the task is done |
| assumptions | string[] | no | Working assumptions |
| acceptanceCriteria | string[] | no | Measurable acceptance |
| explicitLimits | string[] | no | Hard boundaries |
| tradeoffRationale | string[] | no | Design trade-off documentation |
| edgeCases | string[] | no | Known edge cases |

**Validation**: Zod schema at load time. Invalid definitions logged and skipped (FR-007).

### SkillDefinition

Loaded from `agents/*/skills/*/skill.yaml` at startup.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique skill identifier |
| name | string | yes | Display name |
| purpose | string | yes | What the skill does |
| businessValue | string | yes | Why it matters |
| triggerTypes | string[] | yes | What activates this skill |
| owningAgent | string | yes | Agent that owns this skill |
| inputs | string[] | yes | Required inputs |
| outputs | string[] | yes | Produced outputs |
| dependencies | string[] | yes | Other skills/agents needed |
| toolUsage | string[] | yes | Tools used during execution |
| memoryReadsWrites | object | yes | Memory access pattern |
| securityValidations | string[] | yes | Security checks applied |
| observabilityEvents | string[] | yes | Events emitted |
| failureHandling | string[] | yes | Error recovery steps |
| interoperabilityContract | object | yes | Consumes/produces contracts |
| wowCriteria | string[] | yes | Excellence criteria |
| safeCriteria | string[] | yes | Safety criteria |
| workflows | WorkflowDefinition[] | yes | Execution workflows |

### WorkflowDefinition

Nested within SkillDefinition.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | string | yes | Unique workflow identifier |
| title | string | yes | Display title |
| objective | string | yes | What the workflow achieves |
| trigger | string | yes | Activation condition |
| preconditions | string[] | yes | Must be true before execution |
| inputs | string[] | yes | Required inputs |
| steps | StepDefinition[] | yes | Ordered execution steps |
| mainOutput | string | yes | Primary output |
| secondaryOutputs | string[] | yes | Additional outputs |
| dod | string[] | yes | Definition of Done |
| qaChecklist | string[] | yes | Quality checks |
| raci | RaciAssignment | yes | Responsibility matrix |
| kpis | Record<string, string> | yes | Success metrics |
| cadence | string | yes | How often it runs |
| errorHandling | string | yes | Error recovery |
| fallbackRoute | string | yes | Where to go on failure |
| escalationRoute | string | yes | Where to escalate |
| designRationale | string | no | Why this design |
| timeoutMs | number | no | Step timeout (default 30000) |

### StepDefinition

Nested within WorkflowDefinition.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| stepNumber | number | yes | Execution order |
| title | string | yes | Step name |
| desc | string | yes | What happens |
| whyThisMatters | string | yes | Business justification |
| inputNeeded | string | yes | Required input |
| actionInstruction | string | yes | How to execute |
| promptToUse | string \| null | yes | Prompt template reference |
| expectedOutput | string | yes | What success looks like |
| validationRule | string | yes | How to verify |
| failureSignal | string | yes | How to detect failure |
| recoveryAction | string | yes | What to do on failure |
| handoffIfNeeded | string \| null | yes | Delegation target |

## Firestore Collections

### Working Memory (Ephemeral)

**Collection**: `threads/{threadId}`

| Field | Type | Description |
|-------|------|-------------|
| title | string | Thread title |
| status | "active" \| "archived" | Thread state |
| agent | string | Primary agent for this thread |
| userId | string | Owner user ID |
| createdAt | Timestamp | Creation time |
| updatedAt | Timestamp | Last activity |
| expiresAt | Timestamp | TTL expiration (configurable, default 30 days) |

**Subcollection**: `threads/{threadId}/messages/{messageId}`

| Field | Type | Description |
|-------|------|-------------|
| role | "user" \| "assistant" \| "system" | Message source |
| content | string | Message text |
| timestamp | Timestamp | When sent |
| sourceType | "text" \| "voice" \| "image" \| "document" | Input modality |
| metadata | object \| null | Additional context (transcription confidence, etc.) |

**Lifecycle**: Ephemeral. TTL-based purge via `purgeExpiredWorking()`. Classification: `ephemeral`.

### Episodic Memory (Permanent)

**Collection**: `voice_notes/{noteId}`

| Field | Type | Description |
|-------|------|-------------|
| userId | string | Owner |
| transcript | string | Transcribed text |
| audioMetadata | object | Duration, format, file ID |
| extractedActions | string[] | Action items detected |
| createdAt | Timestamp | When recorded |

**Collection**: `meetings/{meetingId}`

| Field | Type | Description |
|-------|------|-------------|
| userId | string | Owner |
| transcript | string | Full transcript |
| participants | string[] | Meeting participants |
| actionItems | string[] | Action items |
| decisions | string[] | Decisions made |
| createdAt | Timestamp | Meeting date |

**Collection**: `interaction_log/{logId}`

| Field | Type | Description |
|-------|------|-------------|
| userId | string | User who interacted |
| type | "correction" \| "preference" \| "feedback" | Interaction type |
| content | string | What happened |
| createdAt | Timestamp | When |

**Lifecycle**: Permanent. Supports per-user purge (FR-027). Classification: `permanent`.

### Semantic Memory (Permanent, RAG-ready)

**Collection**: `users/{userId}`

| Field | Type | Description |
|-------|------|-------------|
| displayName | string | User display name |
| role | string | Chief Officer role |
| identity | string | MetodologIA identity |
| preferences | object | User preferences |
| experience | object | Domain experience |

**Collection**: `knowledge/{knowledgeId}`

| Field | Type | Description |
|-------|------|-------------|
| fact | string | Knowledge statement |
| category | string | Domain category |
| confidence | number | 0.0-1.0 confidence score |
| source | string | Where this came from |
| reinforcementCount | number | Times confirmed |
| userId | string | Owner (for per-user purge) |
| classification | "persistent" \| "permanent" | Data lifecycle class |
| createdAt | Timestamp | First stored |
| updatedAt | Timestamp | Last reinforced |

**Lifecycle**: Permanent with provenance. Supports selective invalidation and per-user purge. Classification: `permanent`.

### Runtime State (In-Memory Only)

**AgentRuntime** (per bot instance, not persisted):

| Field | Type | Description |
|-------|------|-------------|
| instanceId | string | "pristino" \| "deonto" |
| memory | MemoryInterface | Firestore or in-memory fallback |
| credentials | AgentCredentials | API keys for this instance |
| toolRegistry | Map<string, Tool> | Registered tools |
| subAgentRegistry | Map<string, SubAgent> | Delegatable agents |
| logger | Logger | Instance-scoped logger |
| circuitBreakers | Map<string, CircuitBreaker> | Per-(model,key) state |
| ecosystem | EcosystemState | Loaded agents and skills |

**CircuitBreakerState** (per provider/model/key, in-memory):

| Field | Type | Description |
|-------|------|-------------|
| key | string | `provider:agent:model:keyN` |
| state | "closed" \| "open" \| "half-open" | Current state |
| failureCount | number | Consecutive failures |
| lastFailureAt | number | Timestamp of last failure |
| cooldownMs | number | Cooldown period (default 60000) |
| threshold | number | Failures to open (default 3) |

**RoutingDecision** (logged per request):

| Field | Type | Description |
|-------|------|-------------|
| mode | "single" \| "terna" \| "committee" | Selected mode |
| agents | string[] | Selected agent IDs |
| reason | string | Why this routing |
| timestamp | Timestamp | When decided |
| reversible | boolean | Can be overridden |

## State Transitions

### Circuit Breaker

```
CLOSED ──[failure count >= threshold]──> OPEN
OPEN ──[cooldown elapsed]──> HALF-OPEN
HALF-OPEN ──[probe success]──> CLOSED
HALF-OPEN ──[probe failure]──> OPEN
```

### Routing Mode Degradation (on timeout)

```
COMMITTEE ──[timeout 60s]──> TERNA (top 3 responding)
TERNA ──[timeout 30s]──> SINGLE (best responding)
SINGLE ──[timeout 15s]──> DIRECT (orchestrator responds)
```

### Thread Lifecycle

```
ACTIVE ──[TTL expired]──> PURGED
ACTIVE ──[user purge request]──> PURGED
ACTIVE ──[no messages for TTL period]──> ARCHIVED ──[TTL expired]──> PURGED
```

## Relationships

```
AgentRuntime 1──* CircuitBreakerState
AgentRuntime 1──1 EcosystemState
EcosystemState 1──* AgentDefinition
AgentDefinition 1──* SkillDefinition
SkillDefinition 1──* WorkflowDefinition
WorkflowDefinition 1──* StepDefinition
Thread 1──* Message
User 1──* Thread
User 1──* Knowledge
User 1──* VoiceNote
User 1──* Meeting
User 1──* InteractionLog
```
