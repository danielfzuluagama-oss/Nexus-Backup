<!--
Sync Impact Report
- Version: 1.1.0 (clarification via Socratic debate)
- Modified principles: III (checkpoint hierarchy), VI (coverage
  thresholds), added VIII (Data Lifecycle)
- Added sections: Clarifications
- Removed sections: none
- Follow-up TODOs:
  - Run /iikit-01-specify to formalize features
-->

# Pristino Bot Constitution

## Core Principles

### I. Orchestrator Sovereignty

The orchestrator routes and synthesizes but never executes
domain work. Specialist agents own their domain; the
orchestrator owns delegation decisions and final delivery.

- The orchestrator must not perform analysis, research,
  synthesis, validation, or time calculations directly
- Every delegation decision must be auditable (mode, agents
  selected, reason logged)
- Routing mode selection (single, terna, committee) must
  follow deterministic tiebreaker rules when domain overlap
  exists
- Rationale: separation of concerns prevents the orchestrator
  from becoming a god object; auditability enables diagnosis
  when outputs fail quality gates

### II. Brand Voice Integrity

Every user-facing output must conform to the MetodologIA
brand voice framework. Brand enforcement is structural, not
aspirational.

- Outputs must follow the Minto structure (conclusion first,
  MECE supporting points, evidence, CTA)
- Forbidden terms must be detected and replaced before
  delivery
- Evidence must be typed (real data, suggested indicator,
  signal to measure, data required)
- Brand compliance is validated at the output checkpoint,
  not self-assessed by the producing agent
- Real-time verification is best-effort (self-assessed
  within the 60-second budget); post-hoc auditing via the
  Validator agent is mandatory for critical deliverables
- Rationale: brand consistency across four Chief Officers
  and all deliverable types requires machine-enforced rules,
  not guidelines; real-time self-assessment trades accuracy
  for latency, compensated by asynchronous audit

### III. Defense in Depth

Every message flow must pass through three security
checkpoints. No checkpoint may be skipped, even for
trusted users.

- Input checkpoint: sanitize control characters, enforce
  length limits, detect injection patterns
- Prompt checkpoint: harden system prompts against override
  attempts, prevent credential exposure
- Output checkpoint: scan for prompt leaks, role confusion,
  sensitive data exposure
- Checkpoint hierarchy: CP1 and CP2 are preventive hard
  blocks (reject before execution); CP3 is observational
  soft pass (log always, deliver anyway)
- This hierarchy resolves the tension with Principle IV:
  prevention before execution, observation after execution
- Rationale: the system processes strategic business content;
  a single compromised checkpoint must not expose the full
  attack surface; availability is preserved by soft CP3

### IV. Graceful Degradation

The system must deliver a response under all failure
conditions. Silent failures are forbidden.

- Provider failure must trigger automatic cascade to the
  next available provider
- Agent timeout must degrade routing mode (committee to
  terna, terna to single, single to direct)
- Persistence failure must fall back to in-memory storage
  with explicit logging
- Circuit breaker state must be tracked per provider, per
  model, per credential independently
- The user must never see an error message; degraded
  responses must be transparent about limitations
- Rationale: the system operates as a real-time
  conversational interface where dropped messages destroy
  trust

### V. Memory Sovereignty

Each agent instance must own its state independently.
Shared definitions are read-only; runtime state is isolated.

- Conversation history, knowledge base, and circuit breaker
  state must be per-instance
- Mirror instances (Pristino/Deonto) must never read or
  write each other's runtime state
- Agent definitions, prompts, and skill definitions are
  shared read-only assets loaded at startup
- Sub-agents must not persist to memory; only the root
  agent (depth 0) persists
- Rationale: instance isolation prevents cascading failures
  and enables independent evolution of mirror instances

### VI. Test-Driven Development (NON-NEGOTIABLE)

All features MUST follow TDD with red-green-refactor
discipline. Tests define intent; code satisfies intent.

- Red-green-refactor cycle: write failing test, implement
  minimum code to pass, refactor without changing behavior
- Production code MUST NOT be written without a failing
  test that defines the expected behavior
- Test assertions must never be modified to match broken
  code; fix the production code instead
- Integration tests must validate agent delegation,
  security checkpoints, and memory persistence
- Assertion integrity hashes anchor test stability; hash
  mismatches must be resolved through re-specification,
  not manual override
- Minimum 80% line coverage globally; 100% coverage
  required for security checkpoints (CP1/CP2/CP3),
  delegation routing, and circuit breaker logic
- Rationale: the prototype has zero tests; formalization
  via TDD prevents regression as the codebase evolves from
  prototype to production; critical paths demand total
  coverage because failures there cascade system-wide

### VII. Specification Before Implementation

Every feature must have a complete specification before
implementation begins. Specifications define what; plans
define how; code realizes the plan.

- No production code without spec.md, plan.md, and
  tasks.md in place
- Specifications must contain user stories with acceptance
  criteria, functional requirements, and success metrics
- Implementation must trace back to specification items;
  orphan code (code without a spec reference) is technical
  debt by definition
- Rationale: the prototype was built exploration-first;
  formalization requires the inverse discipline to ensure
  every capability is intentional and testable

### VIII. Data Lifecycle Integrity

The three-layer memory system (working, episodic, semantic)
must have explicit retention policies and purge capabilities.
Data classification drives retention, not storage defaults.

- Working memory must have a defined TTL; expired data must
  be purged automatically, not left to accumulate
- Episodic memory (voice notes, meetings) is permanent but
  must support per-user purge on request
- Semantic memory (knowledge, RAG chunks) must track
  provenance (source, confidence, reinforcement count) and
  support selective invalidation
- No memory layer may store data without classification
  (ephemeral, persistent, or permanent)
- Rationale: the 3-layer memory is a core differentiator;
  its integrity requires explicit lifecycle rules, not
  implicit database defaults; per-user purge enables trust
  even without regulatory mandate

## Quality Standards

### Excellence Framework

- Every user-facing output must be scored against the
  16-dimension excellence framework before delivery
- The excellence loop runs a maximum of 2 iterations to
  reach the quality threshold
- Standard outputs require a score of 8/10 or higher;
  critical outputs require 9/10 with adversarial testing
- Quality dimensions span four categories: structural
  (completeness, coherence, clarity, conciseness),
  functional (accuracy, applicability, traceability,
  robustness), stylistic (brand voice, tone, formatting,
  readability), and strategic (value added, innovation,
  alignment, impact)

### Response Boundaries

- Total response time must not exceed 60 seconds for any
  routing mode
- Single delegation timeout: 15 seconds
- Terna timeout: 30 seconds
- Committee timeout: 60 seconds
- Message length must respect the messaging platform's
  limits with automatic chunking
- Recursion depth must not exceed 3 levels (orchestrator
  to specialist to sub-specialist)

### Credential Hygiene

- No credentials, API keys, or service account files may
  exist in the repository
- All secrets must be injected via environment variables
- Credential rotation must not require code changes or
  redeployment

## Development Workflow

### Artifact Lifecycle

- Every artifact passes through four workflow stages:
  create, review, evolve, repair
- Create: clarify requirements, design before execute,
  build iteratively, pass quality gate, deliver
- Review: scope, security audit, quality assessment,
  architecture review, generate report
- Evolve: baseline assessment, define evolution target,
  prioritize high-impact changes, re-certify, deliver
  delta
- Repair: collect symptoms, reproduce, root cause analysis
  (5-Whys), targeted fix, verify, post-mortem if critical

### Code Review Requirements

- All changes must be reviewed before merge
- Reviews must verify compliance with this constitution
- Security-sensitive changes (checkpoints, authentication,
  credential handling) require explicit security review

### Breaking Changes

- Changes that alter agent delegation behavior, security
  checkpoint logic, or memory schema require migration
  documentation
- Breaking changes to skill contracts (inputs/outputs)
  must update all dependent workflows

## Governance

This constitution is the supreme governing document for
the Pristino Bot project. It supersedes all other practices,
conventions, and ad-hoc decisions.

- Amendments require explicit user approval and version
  increment
- MAJOR version: principle removal or fundamental
  redefinition
- MINOR version: new principle added
- PATCH version: clarification or rewording without
  behavioral change
- All pull requests and reviews must verify constitutional
  compliance
- Conflicts between this constitution and implementation
  convenience must be resolved in favor of the constitution
- If a task conflicts with a constitutional principle, work
  must stop and the conflict must be flagged for resolution

**Version**: 1.1.0 | **Ratified**: 2026-03-28 | **Last Amended**: 2026-03-28

## Clarifications

### Session 2026-03-28

- Q: What is the minimum test coverage threshold? -> A: 80%
  global line coverage; 100% for security checkpoints,
  delegation routing, and circuit breaker logic
  [Principle VI]
- Q: How is the tension between Principle III (Defense in
  Depth) and Principle IV (Graceful Degradation) resolved?
  -> A: CP1/CP2 are preventive hard blocks; CP3 is
  observational soft pass. Prevention before execution,
  observation after execution. [Principle III, Principle IV]
- Q: Should there be a data retention/privacy principle?
  -> A: Yes — Principle VIII (Data Lifecycle Integrity)
  added. Driven by memory system integrity, not compliance.
  [Principle VIII]
- Q: How is brand voice verified if self-assessment is
  circular? -> A: Best-effort in real-time (self-assessed),
  mandatory post-hoc audit via Validator for critical
  deliverables. [Principle II, Quality Standards]
