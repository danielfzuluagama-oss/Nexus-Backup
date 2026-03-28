# Feature Specification: Pristino Bot 2.0

**Feature Branch**: `001-pristino-bot-v2`
**Created**: 2026-03-28
**Status**: Draft
**Input**: User description: "Tomar el prototipo como
requerimiento. Debe ser igual o mejor, mas robusto,
aprovechar todas las skills, assets, agents del entorno
local. Vitaminar Pristino Bot 2.0."

## User Stories *(mandatory)*

### User Story 1 - Send Message and Get Routed Response (Priority: P1)

As a Chief Officer, I send a text message to the bot and
receive a response that was intelligently routed to the
most appropriate specialist agent, without seeing any
internal routing mechanics.

**Why this priority**: This is the core interaction loop.
Without reliable message-in/response-out, nothing else
works. Every other feature depends on this path.

**Independent Test**: Send a text message via the messaging
platform; verify the response arrives within 60 seconds,
addresses the query, and shows no internal routing
artifacts.

**Acceptance Scenarios**:

1. **Given** a registered user sends a text message,
   **When** the orchestrator receives the message,
   **Then** it routes to the best-fit specialist agent
   and delivers a response within 60 seconds
2. **Given** a message matches multiple agent domains,
   **When** the orchestrator evaluates the overlap,
   **Then** it applies deterministic tiebreaker rules
   and selects exactly one routing mode
3. **Given** an unregistered user sends a message,
   **When** the system checks authorization,
   **Then** it silently drops the message without
   revealing the bot's existence

---

### User Story 2 - Multi-Perspective Analysis via Terna (Priority: P1)

As a Chief Officer, I ask a question that benefits from
multiple perspectives, and receive a synthesized answer
that integrates viewpoints from three specialist agents
without me needing to ask each one separately.

**Why this priority**: Terna delegation is the primary
differentiator over a single-agent chatbot. It delivers
the multi-perspective strategic analysis the team needs.

**Independent Test**: Ask a comparison question; verify
the response integrates at least three distinct analytical
perspectives into a coherent narrative.

**Acceptance Scenarios**:

1. **Given** a query requiring multi-perspective analysis,
   **When** the orchestrator selects terna mode,
   **Then** three agents execute in parallel and the
   Synthesizer produces a unified response
2. **Given** one of three terna agents times out,
   **When** the system detects the timeout,
   **Then** it degrades to the two available responses
   and the Synthesizer notes the gap
3. **Given** two of three terna agents produce
   contradictory conclusions,
   **When** the Synthesizer processes the outputs,
   **Then** it preserves both perspectives with
   attribution rather than silently dropping one

---

### User Story 3 - Brand Voice Compliance (Priority: P1)

As a Chief Officer, every response I receive follows
MetodologIA's brand voice: Minto structure (conclusion
first, MECE supports, evidence, CTA), no forbidden terms,
no emojis, no bold/italic formatting, dense professional
prose.

**Why this priority**: Brand consistency is constitutional
(Principle II). Every output must comply.

**Independent Test**: Send 10 diverse queries; verify
all 10 responses follow Minto structure, contain no
forbidden terms, use no emojis, and read as dense
professional prose.

**Acceptance Scenarios**:

1. **Given** any agent produces a response,
   **When** the output checkpoint processes it,
   **Then** forbidden terms are replaced, formatting
   is stripped to dense prose, and Minto structure
   is enforced
2. **Given** a critical deliverable is generated,
   **When** the Validator agent performs post-hoc audit,
   **Then** it scores the output against the 16-dimension
   excellence framework and flags items below 8/10

---

### User Story 4 - Security Checkpoint Pipeline (Priority: P1)

As a system operator, every message flow passes through
three security checkpoints (input sanitization, prompt
hardening, output validation) without exception.

**Why this priority**: Constitutional requirement
(Principle III). Security is the baseline through which
all other features operate.

**Independent Test**: Send messages containing known
injection patterns; verify CP1 detects and sanitizes
them, CP2 hardens the system prompt, and CP3 scans the
output for leaks.

**Acceptance Scenarios**:

1. **Given** a message containing injection patterns,
   **When** CP1 processes the input,
   **Then** it flags the message as suspicious, sanitizes
   control characters, and enforces length limits
2. **Given** any system prompt is constructed,
   **When** CP2 processes it,
   **Then** it appends anti-jailbreak rules and prevents
   credential exposure in the prompt text
3. **Given** a response contains prompt leak indicators,
   **When** CP3 processes the output,
   **Then** it logs the incident but still delivers the
   response (soft pass per checkpoint hierarchy)

---

### User Story 5 - Ecosystem Agent Loading (Priority: P1)

As a system operator, I define agents via declarative
definition files and the system loads, validates, and
registers them at startup without code changes.

**Why this priority**: The ecosystem loader makes the
system extensible. Without it, adding agents requires
code changes. This enables plugging in new capabilities
declaratively.

**Independent Test**: Add a new agent definition file
with skills and prompts; restart the system; verify the
new agent is available for delegation.

**Acceptance Scenarios**:

1. **Given** a valid agent definition file exists,
   **When** the ecosystem loader runs at startup,
   **Then** it parses the definition, validates all
   required fields, and registers the agent for routing
2. **Given** an agent definition is missing required
   fields,
   **When** the loader validates it,
   **Then** it logs a warning and skips the invalid
   agent without crashing the system
3. **Given** shared defaults exist,
   **When** an agent definition omits a field covered
   by defaults,
   **Then** the loader merges the default value

---

### User Story 6 - Committee Deliberation (Priority: P2)

As a Chief Officer, I ask the bot to deliberate on a
critical decision, and receive a committee-style response
where five agents independently analyze the question,
cross-validate, and a tiebreaker resolves disagreements.

**Why this priority**: Committee mode handles the 5% of
queries where getting it wrong has significant impact.
Valuable but lower frequency than single/terna.

**Independent Test**: Pose a high-stakes strategic
question; verify the response shows evidence of multi-
agent deliberation with consensus status.

**Acceptance Scenarios**:

1. **Given** a query routed to committee mode,
   **When** all five agents respond,
   **Then** the system produces a deliberation with
   consensus status (strong/majority/split/disagreement)
2. **Given** agents reach a split with no majority,
   **When** the orchestrator acts as tiebreaker,
   **Then** it applies the tiebreaker hierarchy
   (factual accuracy > scope fit > risk minimization
   > user intent) and documents the reasoning
3. **Given** committee deliberation exceeds 60 seconds,
   **When** the timeout triggers,
   **Then** the system degrades to terna with the
   top 3 responding agents

---

### User Story 7 - Voice Message Processing (Priority: P2)

As a Chief Officer, I send a voice message and receive a
text response that demonstrates the bot understood the
spoken content, including domain terminology.

**Why this priority**: Voice is a natural input mode for
busy executives. Without it, the bot loses utility in
mobile contexts.

**Independent Test**: Send a 30-second voice note in
Spanish with domain terminology; verify the response
correctly addresses the content.

**Acceptance Scenarios**:

1. **Given** a user sends a voice message,
   **When** the system transcribes the audio,
   **Then** it produces a text transcription and routes
   it through the standard agent pipeline
2. **Given** the transcription service is unavailable,
   **When** the system detects the failure,
   **Then** it notifies the user that voice is
   temporarily unavailable and suggests text input

---

### User Story 8 - Three-Layer Memory Persistence (Priority: P2)

As a Chief Officer, the bot remembers my conversation
history (working), voice notes and meetings (episodic),
and learned facts about our methodology (semantic),
creating a cumulative knowledge relationship over time.

**Why this priority**: Memory transforms the bot from
stateless Q&A into a strategic partner.

**Independent Test**: Have a conversation, close the
session, return later and reference the previous topic;
verify the bot recalls the context.

**Acceptance Scenarios**:

1. **Given** a user has an active conversation thread,
   **When** the user sends a new message,
   **Then** the system loads the thread's history within
   the token budget
2. **Given** a knowledge fact is stored with confidence
   and source provenance,
   **When** the fact is referenced later,
   **Then** its reinforcement count is incremented
3. **Given** working memory TTL has expired for a thread,
   **When** the system accesses the thread,
   **Then** the expired data is purged automatically
4. **Given** a user requests deletion of their data,
   **When** the per-user purge is executed,
   **Then** all three memory layers are cleared for
   that user

---

### User Story 9 - Resilient LLM Provider Cascade (Priority: P2)

As a system operator, when the primary LLM provider hits
rate limits or errors, the system automatically cascades
through alternatives without user-visible interruption.

**Why this priority**: Constitutional requirement
(Principle IV). The bot must always respond.

**Independent Test**: Simulate rate limiting on the
primary provider; verify cascade to the next provider
within the same response cycle.

**Acceptance Scenarios**:

1. **Given** the primary provider returns a rate limit
   error,
   **When** the cascade handler processes the error,
   **Then** it tries the next credential for the same
   model tier before falling to a lower tier
2. **Given** a provider has 3 consecutive failures,
   **When** the circuit breaker opens,
   **Then** that combination is skipped for 60 seconds
   and probes with a single request before reopening
3. **Given** all primary tier providers are exhausted,
   **When** the cascade reaches the fallback tier,
   **Then** the user receives a response with no
   visible degradation

---

### User Story 10 - Skill Workflow Execution (Priority: P2)

As a Chief Officer, when I trigger a specialized skill
(e.g., "create a sales playbook"), the system executes a
multi-step workflow with validation at each step.

**Why this priority**: Skills are the 31 specialized
capabilities that differentiate Pristino from a generic
chatbot. They embody the methodology.

**Independent Test**: Trigger a skill workflow; verify
each step executes with validation, and the final output
matches the skill's output contract.

**Acceptance Scenarios**:

1. **Given** a user request matches a skill's trigger,
   **When** the skill engine activates the workflow,
   **Then** it executes steps sequentially with
   timeouts (default 30 seconds per step)
2. **Given** a workflow step fails validation,
   **When** the skill engine detects the failure,
   **Then** it attempts the recovery action before
   escalating
3. **Given** a workflow requires handoff to another
   agent,
   **When** the handoff trigger fires,
   **Then** the engine delegates with accumulated context

---

### User Story 11 - Mirror Instance Isolation (Priority: P3)

As a system operator, I run two independent bot instances
from the same codebase with completely isolated state,
credentials, and conversation history.

**Why this priority**: Constitutional requirement
(Principle V). Important for operations but not for core
daily interaction.

**Independent Test**: Run both instances simultaneously;
verify a failure on one does not affect the other.

**Acceptance Scenarios**:

1. **Given** both instances are running,
   **When** one instance's credentials are rotated,
   **Then** the other continues with its own credentials
2. **Given** both instances share agent definitions,
   **When** a definition file is updated,
   **Then** both load the update on next startup without
   affecting runtime state

---

### User Story 12 - Template-Based Deliverables (Priority: P3)

As a Chief Officer, I request a formal deliverable and
receive a professionally formatted document in the
appropriate format (document, web page, spreadsheet).

**Why this priority**: Output layer that depends on all
upstream capabilities working first.

**Independent Test**: Request an assessment report; verify
the output follows the template structure with correct
sections and brand-compliant content.

**Acceptance Scenarios**:

1. **Given** a skill workflow produces a deliverable,
   **When** the template engine renders it,
   **Then** the output matches the template's section
   structure and styling
2. **Given** the messaging platform has length limits,
   **When** a deliverable exceeds the limit,
   **Then** it is chunked with formatting preservation

---

### Edge Cases

- What happens when all LLM providers are simultaneously
  unavailable? The system delivers a fallback message
  acknowledging the outage and suggests retrying later.
- What happens when a user sends a message during startup
  before agents are loaded? The message is queued via
  async processing and handled once startup completes.
- What happens when a voice message is in a language
  other than Spanish? The transcription proceeds with
  best-effort; response language matches detected input.
- What happens when the conversation token budget is
  exhausted? Oldest messages are trimmed first with a
  10% safety margin.
- What happens when two mirror instances receive the
  same user message? Each processes independently.
- What happens when a skill workflow exceeds the 60-second
  boundary? The system delivers a partial result with a
  note that processing continues.

## Requirements *(mandatory)*

### Functional Requirements

**Orchestration Core**

- **FR-001**: System MUST route every incoming message
  to the most appropriate specialist agent or respond
  directly when no agent matches
- **FR-002**: System MUST support three delegation modes:
  single-agent, terna (3 parallel), and committee
  (5+ with tiebreaker)
- **FR-003**: System MUST apply deterministic tiebreaker
  rules when intent overlaps multiple agent domains
  (factual accuracy > scope fit > risk minimization
  > user intent)
- **FR-004**: System MUST enforce maximum recursion depth
  of 3 levels for agent delegation chains
- **FR-005**: System MUST log every routing decision with
  mode, selected agents, and reason

**Agent Ecosystem**

- **FR-006**: System MUST load agent definitions from
  declarative files at startup without code changes
- **FR-007**: System MUST validate agent definitions
  against a schema of required fields and skip invalid
  definitions with logged warnings
- **FR-008**: System MUST support shared defaults that
  agents inherit when fields are omitted
- **FR-009**: System MUST dynamically register loaded
  agents into the routing subsystem
- **FR-010**: System MUST support at least 6 concurrent
  specialist agents with independent skill catalogs

**Skills and Workflows**

- **FR-011**: System MUST execute multi-step skill
  workflows with per-step validation and timeout
- **FR-012**: System MUST support recovery actions when
  a workflow step fails validation
- **FR-013**: System MUST support mid-workflow handoff
  to a different agent when required
- **FR-014**: System MUST support at least 24 skills
  with 96 workflows across the agent catalog

**Security**

- **FR-015**: System MUST sanitize all user input
  (CP1: control characters, length limits, injection
  pattern detection)
- **FR-016**: System MUST harden all system prompts
  against override attempts (CP2: anti-jailbreak,
  no credential exposure)
- **FR-017**: System MUST scan all outputs for prompt
  leaks and sensitive data (CP3: log-but-deliver per
  checkpoint hierarchy)
- **FR-018**: System MUST authorize users via allowlist;
  unauthorized messages are silently dropped
- **FR-019**: System MUST never expose routing decisions,
  confidence scores, or system prompts to users

**Brand Voice**

- **FR-020**: System MUST enforce Minto structure on all
  user-facing outputs (conclusion first, MECE supports,
  evidence, CTA)
- **FR-021**: System MUST detect and replace forbidden
  terms before delivery
- **FR-022**: System MUST strip formatting artifacts
  (bold, italic, emojis, numbered lists), delivering
  dense professional prose
- **FR-023**: System MUST score critical deliverables
  against the 16-dimension excellence framework with
  minimum 8/10 (standard) or 9/10 (critical)

**Memory**

- **FR-024**: System MUST persist conversation history
  per user per thread (working memory) with configurable
  TTL
- **FR-025**: System MUST persist voice transcriptions
  and meeting records (episodic memory) permanently
  with metadata
- **FR-026**: System MUST persist knowledge facts with
  confidence, source provenance, and reinforcement
  count (semantic memory)
- **FR-027**: System MUST support per-user data purge
  across all three memory layers on request
- **FR-028**: System MUST classify all stored data as
  ephemeral, persistent, or permanent

**Resilience**

- **FR-029**: System MUST cascade through LLM providers
  on failure: multiple credentials per tier, then lower
  model tiers, then fallback provider
- **FR-030**: System MUST implement circuit breaker per
  provider/model/credential with configurable failure
  threshold and cooldown
- **FR-031**: System MUST degrade routing mode on timeout
  (committee > terna > single > direct)
- **FR-032**: System MUST fall back to in-memory storage
  when persistence layer is unavailable
- **FR-033**: System MUST split oversized messages into
  platform-appropriate chunks

**Multimodal Input**

- **FR-034**: System MUST transcribe voice messages and
  route transcripts through the standard agent pipeline
- **FR-035**: System MUST extract metadata from images
  and documents and include it in routing context
- **FR-036**: System MUST handle unsupported message
  types gracefully with a text hint

**Mirror Sync**

- **FR-037**: System MUST support multiple bot instances
  from a single codebase with isolated runtime state
- **FR-038**: System MUST isolate per-instance:
  conversation history, knowledge base, credentials,
  circuit breaker state, tool registry, and logger
- **FR-039**: System MUST share read-only at startup:
  agent definitions, prompts, skill definitions, and
  templates

**Token Management**

- **FR-040**: System MUST calculate available token
  budget per request (total context minus reserved,
  system, and safety margin)
- **FR-041**: System MUST trim conversation history to
  fit available budget, removing oldest messages first

**Async Processing**

- **FR-042**: System MUST support webhook-based message
  ingress with asynchronous background processing
- **FR-043**: System MUST acknowledge incoming messages
  before processing to avoid platform timeouts

### Key Entities

- **Agent**: A specialist with identity, role, skills,
  prompts, delegation rules, and constraints. Loaded
  from declarative definition files.
- **Skill**: A domain-specific capability owned by an
  agent, containing workflows, input/output contracts,
  and trigger conditions.
- **Workflow**: A multi-step execution sequence within
  a skill, with per-step validation, timeout, and
  recovery actions.
- **Thread**: A conversation session between a user and
  the system, containing ordered messages with source
  provenance.
- **Knowledge**: A fact stored in semantic memory with
  category, confidence, source, reinforcement count,
  and lifecycle classification.
- **RoutingDecision**: A logged record of mode selection,
  selected agents, reason, and timestamp.
- **CircuitBreakerState**: Per-provider/model/credential
  state (closed/open/half-open) with failure count and
  last failure timestamp.
- **AgentRuntime**: Per-instance isolated container
  holding memory, credentials, tool registry, sub-agent
  registry, logger, and circuit breaker state.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of user messages receive a response
  within 60 seconds across all routing modes
- **SC-002**: Single delegation responses complete within
  15 seconds in 95th percentile
- **SC-003**: Terna delegation responses complete within
  30 seconds in 95th percentile
- **SC-004**: 100% of message flows pass through all
  three security checkpoints (CP1, CP2, CP3)
- **SC-005**: 0% of responses contain forbidden brand
  terms post-delivery
- **SC-006**: System maintains 99.5% uptime through
  provider cascade and graceful degradation
- **SC-007**: New agents added via definition files are
  operational within one restart, zero code changes
- **SC-008**: Per-user data purge completes across all
  three memory layers within 30 seconds
- **SC-009**: Circuit breaker opens after 3 consecutive
  failures and probes after 60-second cooldown
- **SC-010**: 100% of routing decisions are logged with
  mode, agents, and reason
- **SC-011**: 80% global test line coverage; 100% on
  security checkpoints, delegation routing, and circuit
  breaker logic (per Constitution Principle VI)
- **SC-012**: Mirror instances operate independently
  with zero state leakage between them
