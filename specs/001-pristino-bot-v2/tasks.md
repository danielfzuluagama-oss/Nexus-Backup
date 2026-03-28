# Tasks: Pristino Bot 2.0

**Input**: Design documents from `/specs/001-pristino-bot-v2/`
**Prerequisites**: plan.md, spec.md, data-model.md, contracts/, research.md, tests/features/

**Tests**: Constitution Principle VI mandates TDD. Every user story begins with test tasks (red), followed by implementation (green). 100% coverage required on security checkpoints, routing, and circuit breaker.

**Organization**: Tasks grouped by user story with dependency-ordered phases. Foundational infrastructure precedes all stories. P1 stories before P2 before P3.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to

---

## Phase 1: Setup

**Purpose**: Project initialization, dependencies, and test infrastructure

- [x] T001 Create test directory structure: tests/unit/, tests/integration/, tests/contract/
- [x] T002 Install new dependencies: zod, vitest, @vitest/coverage-v8
- [x] T003 Configure vitest.config.ts with v8 coverage (80% global threshold, 100% for src/security.ts, src/ecosystem/router.ts, src/circuit-breaker.ts)
- [x] T004 [P] Create Zod schemas for all entity types in src/ecosystem/types.ts [TS-029, TS-030]

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story. These modules are shared across all message flows.

**CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Write unit tests for circuit breaker state machine in tests/unit/circuit-breaker.test.ts [TS-044]
- [x] T006 Implement circuit breaker in src/circuit-breaker.ts with per-(provider,model,key) isolation, 3-failure threshold, 60s cooldown [TS-044]
- [x] T007 [P] Write unit tests for token budget calculation in tests/unit/tokens.test.ts [TS-060, TS-061]
- [x] T008 Implement token budget calculator and history trimming in src/tokens.ts (depends on T007) [TS-060, TS-061]
- [x] T009 Write contract tests for LLM provider cascade in tests/contract/llm-provider.test.ts [TS-046]
- [x] T010 Implement 2D cascading LLM provider in src/config/llm-providers.ts with circuit breaker integration [TS-040, TS-046]
- [x] T011 [P] Implement AgentRuntime per-instance container in src/runtime.ts with isolated state fields
- [x] T012 [P] Implement tool registry dispatcher in src/tools/registry.ts
- [x] T092 [P] Implement sub-agent delegation registry in src/tools/delegate.ts with depth tracking state
- [x] T013 [P] Configure Express webhook server in src/index.ts with POST /webhook/:botName and GET /health [TS-062, TS-063]

**Checkpoint**: Foundation ready — user story implementation can now begin

---

## Phase 3: User Story 4 — Security Checkpoint Pipeline (Priority: P1) MVP

**Goal**: Every message flow passes through CP1 (input sanitization), CP2 (prompt hardening), CP3 (output validation) without exception.

**Independent Test**: Send messages with injection patterns; verify CP1 sanitizes, CP2 hardens, CP3 logs leaks.

### Tests (RED)

> Write these tests FIRST, ensure they FAIL before implementation

- [x] T014 [P] [US4] Write unit tests for CP1 sanitizeInput in tests/unit/security.test.ts [TS-014, TS-067, TS-018]
- [x] T015 [P] [US4] Write unit tests for CP2 buildSecurePrompt in tests/unit/security.test.ts [TS-015, TS-068, TS-019]
- [x] T016 [P] [US4] Write unit tests for CP3 validateOutput in tests/unit/security.test.ts [TS-016, TS-020]

### Implementation (GREEN)

- [ ] T017 [US4] Implement CP1 sanitizeInput in src/security.ts: injection detection, control char stripping, length enforcement (depends on T014)
- [ ] T018 [US4] Implement CP2 buildSecurePrompt in src/security.ts: anti-jailbreak suffix, credential redaction, idempotency (depends on T015)
- [ ] T019 [US4] Implement CP3 validateOutput in src/security.ts: prompt leak detection, forbidden term detection (warn only, no replacement — replacement handled by format.ts), soft-pass logging (depends on T016)
- [ ] T020 [US4] Implement user allowlist authorization with silent drop for unauthorized users in src/bot.ts [TS-003, TS-017]

**Checkpoint**: Security pipeline complete. All 3 checkpoints active with 100% test coverage.

---

## Phase 4: User Story 5 — Ecosystem Agent Loading (Priority: P1) MVP

**Goal**: Agents loaded from declarative files at startup, validated with Zod, registered for routing.

**Independent Test**: Add a new agent.md file; restart; verify agent available for delegation.

### Tests (RED)

- [ ] T021 [P] [US5] Write unit tests for agent.md loader in tests/unit/loader.test.ts [TS-025, TS-026, TS-027]
- [ ] T022 [P] [US5] Write integration test for ecosystem loading in tests/integration/ecosystem.test.ts [TS-028]

### Implementation (GREEN)

- [ ] T023 [US5] Implement agent.md parser with Zod validation in src/ecosystem/loader.ts (depends on T004, T021)
- [ ] T024 [US5] Implement shared defaults merger from agents/_shared/ in src/ecosystem/loader.ts [TS-027]
- [ ] T025 [US5] Implement skill.yaml loader and registration in src/ecosystem/skill-engine.ts
- [ ] T026 [US5] Implement dynamic agent registration into routing subsystem in src/ecosystem/router.ts [TS-025, TS-028]

**Checkpoint**: Ecosystem loads agents declaratively. Invalid definitions logged and skipped.

---

## Phase 5: User Story 1 — Send Message and Get Routed Response (Priority: P1) MVP

**Goal**: Core interaction loop — message in, routed to best-fit agent, response out within 60 seconds.

**Independent Test**: Send a text message via Telegram; verify response arrives within 60s, addresses query, shows no routing internals.

### Tests (RED)

- [ ] T027 [P] [US1] Write unit tests for routing mode selection in tests/unit/router.test.ts [TS-001, TS-002, TS-005, TS-006, TS-007]
- [ ] T028 [P] [US1] Write integration test for full cognition loop in tests/integration/agent.test.ts [TS-004]

### Implementation (GREEN)

- [ ] T029 [US1] Implement routeRequest with tiebreaker hierarchy in src/ecosystem/router.ts (depends on T026, T027) [TS-001, TS-002, TS-006]
- [ ] T030 [US1] Implement executeRouting with mode dispatch (single/terna/committee) in src/ecosystem/router.ts [TS-007]
- [ ] T031 [US1] Implement routing decision audit logging with mode, agents, reason, timestamp [TS-004]
- [ ] T032 [US1] Implement recursion depth enforcement (max 3) in src/tools/delegate.ts (depends on T092) [TS-005]
- [ ] T033 [US1] Implement agent cognition loop iteration control in src/agent.ts: LLM call → tool parse → execute → repeat (max 3 iterations), using prompt-composer and tool-registry
- [ ] T034 [US1] Implement prompt composition with security pipeline integration in src/ecosystem/prompt-composer.ts

**Checkpoint**: Core routing operational. Messages routed to agents, responses delivered within 60s.

---

## Phase 6: User Story 3 — Brand Voice Compliance (Priority: P1) MVP

**Goal**: All outputs follow Minto structure, no forbidden terms, no formatting artifacts.

**Independent Test**: Send 10 queries; verify all responses follow Minto structure, no forbidden terms, no emojis.

### Tests (RED)

- [ ] T035 [P] [US3] Write unit tests for brand voice enforcement in tests/unit/format.test.ts [TS-021, TS-023, TS-024, TS-070]
- [ ] T036 [P] [US3] Write unit tests for excellence scoring in tests/unit/format.test.ts [TS-022, TS-069]

### Implementation (GREEN)

- [ ] T037 [US3] Implement Minto structure enforcement in src/format.ts: conclusion-first, MECE supports, CTA (depends on T035) [TS-021]
- [ ] T038 [US3] Implement forbidden term detection and replacement in src/format.ts [TS-024]
- [ ] T039 [US3] Implement formatting artifact stripping (bold, italic, emojis, markdown lists) in src/format.ts [TS-023]
- [ ] T040 [US3] Implement 16-dimension excellence framework scoring in src/format.ts via LLM-based evaluation prompt (not programmatic scorers), with 8/10 standard and 9/10 critical thresholds [TS-022, TS-069]
- [ ] T041 [US3] Implement excellence enforcement loop (max 2 iterations) in src/format.ts [TS-070]

**Checkpoint**: Brand voice pipeline enforces Minto, strips artifacts, scores deliverables.

---

## Phase 7: User Story 2 — Multi-Perspective Analysis via Terna (Priority: P1) MVP

**Goal**: Terna mode executes 3 agents in parallel, Synthesizer unifies, handles timeouts and contradictions.

**Independent Test**: Ask a comparison question; verify response integrates 3 perspectives coherently.

### Tests (RED)

- [ ] T042 [P] [US2] Write unit tests for terna execution in tests/unit/committee.test.ts [TS-008, TS-009, TS-010]

### Implementation (GREEN)

- [ ] T043 [US2] Implement executeTerna with parallel agent execution in src/ecosystem/committee.ts (depends on T030, T042) [TS-008]
- [ ] T044 [US2] Implement terna timeout degradation (3→2 agents) with gap annotation in src/ecosystem/committee.ts [TS-009]
- [ ] T045 [US2] Implement contradiction preservation with agent attribution in src/ecosystem/committee.ts [TS-010]

**Checkpoint**: Terna delegation produces multi-perspective synthesized responses.

---

## Phase 8: User Story 6 — Committee Deliberation (Priority: P2)

**Goal**: 5+ agents deliberate with consensus status and tiebreaker resolution.

**Independent Test**: Pose a high-stakes question; verify multi-agent deliberation with consensus status.

### Tests (RED)

- [ ] T046 [P] [US6] Write unit tests for committee execution in tests/unit/committee.test.ts [TS-011, TS-012, TS-013]

### Implementation (GREEN)

- [ ] T047 [US6] Implement executeCommittee with 5-agent deliberation and consensus status in src/ecosystem/committee.ts (depends on T043, T046) [TS-011]
- [ ] T048 [US6] Implement committee tiebreaker with documented reasoning in src/ecosystem/committee.ts [TS-012]
- [ ] T049 [US6] Implement committee→terna timeout degradation (first 3 to respond) in src/ecosystem/committee.ts [TS-013]

**Checkpoint**: Committee mode delivers deliberation with consensus classification.

---

## Phase 9: User Story 7 — Voice Message Processing (Priority: P2)

**Goal**: Voice messages transcribed and routed through the standard pipeline.

**Independent Test**: Send a 30s voice note in Spanish; verify response addresses spoken content.

### Tests (RED)

- [ ] T050 [P] [US7] Write unit tests for audio transcription in tests/unit/audio.test.ts [TS-047, TS-048, TS-073]

### Implementation (GREEN)

- [ ] T051 [US7] Implement Groq Whisper transcription in src/audio.ts with error handling (depends on T050) [TS-047, TS-048]
- [ ] T052 [US7] Implement voice message handler in src/bot.ts: transcribe → route as text with sourceType "voice" [TS-047]
- [ ] T053 [US7] Implement image/document metadata extraction in src/bot.ts with mimeType, fileSize, fileName in routing context [TS-049]
- [ ] T054 [US7] Implement unsupported message type handler in src/bot.ts with supported format hints [TS-050]
- [ ] T055 [US7] Implement best-effort non-Spanish transcription with response language matching [TS-073]

**Checkpoint**: Voice messages transcribed and routed. Unsupported types handled gracefully.

---

## Phase 10: User Story 8 — Three-Layer Memory Persistence (Priority: P2)

**Goal**: Working (TTL), episodic (permanent), and semantic (provenance-tracked) memory with per-user purge.

**Independent Test**: Converse, close session, return later; verify bot recalls previous context.

### Tests (RED)

- [ ] T056 [P] [US8] Write unit tests for memory operations in tests/unit/memory.test.ts [TS-031, TS-032, TS-033, TS-035, TS-039, TS-071]
- [ ] T057 [P] [US8] Write contract tests for memory interface in tests/contract/memory.test.ts [TS-036, TS-037, TS-038]
- [ ] T058 [P] [US8] Write integration tests for Firestore memory in tests/integration/memory.test.ts [TS-034]

### Implementation (GREEN)

- [ ] T059 [US8] Implement working memory (addMessage, getRecentMessages) with TTL in src/memory.ts (depends on T056) [TS-031, TS-036]
- [ ] T060 [US8] Implement episodic memory (addVoiceNote, addMeeting) in src/memory.ts [TS-035]
- [ ] T061 [US8] Implement semantic memory (addKnowledge, getKnowledge) with provenance tracking and reinforcement counting in src/memory.ts [TS-032, TS-037, TS-039]
- [ ] T062 [US8] Implement purgeUser across all 3 layers in src/memory.ts [TS-034, TS-038, TS-071]
- [ ] T063 [US8] Implement purgeExpiredWorking scheduled sweep in src/memory.ts [TS-033]
- [ ] T064 [US8] Implement data lifecycle classification (ephemeral/persistent/permanent) in src/memory.ts [TS-035]
- [ ] T065 [US8] Implement in-memory fallback when Firestore unavailable in src/memory.ts [TS-043]

**Checkpoint**: 3-layer memory operational with TTL, provenance, purge, and fallback.

---

## Phase 11: User Story 9 — Resilient LLM Provider Cascade (Priority: P2)

**Goal**: Automatic provider cascade with circuit breaker, mode degradation, and storage fallback.

**Independent Test**: Simulate rate limiting on primary; verify cascade to next provider within same response.

### Tests (RED)

- [ ] T066 [P] [US9] Write unit tests for provider cascade in tests/unit/circuit-breaker.test.ts [TS-040, TS-041, TS-072]

### Implementation (GREEN)

- [ ] T067 [US9] Implement credential-level cascade (horizontal: key-1→key-2 before tier drop) in src/config/llm-providers.ts (depends on T010, T066) [TS-040]
- [ ] T068 [US9] Implement circuit breaker probe with pending user request in src/circuit-breaker.ts [TS-041, TS-072]
- [ ] T069 [US9] Implement routing mode degradation on timeout (committee→terna→single→direct) in src/ecosystem/router.ts [TS-013, TS-009]
- [ ] T070 [US9] Implement fallback response without error phrases when all providers exhausted [TS-042, TS-064]

**Checkpoint**: Provider cascade resilient. Circuit breaker isolates failures. Mode degrades gracefully.

---

## Phase 12: User Story 10 — Skill Workflow Execution (Priority: P2)

**Goal**: Multi-step skill workflows with per-step validation, recovery, and handoff.

**Independent Test**: Trigger a skill; verify each step executes with validation, final output matches contract.

### Tests (RED)

- [ ] T071 [P] [US10] Write unit tests for skill engine in tests/unit/skill-engine.test.ts [TS-051, TS-052, TS-053]

### Implementation (GREEN)

- [ ] T072 [US10] Implement skill workflow executor with sequential steps and 30s default timeout in src/ecosystem/skill-engine.ts (depends on T025, T071) [TS-051]
- [ ] T073 [US10] Implement per-step validation and recovery actions in src/ecosystem/skill-engine.ts [TS-052]
- [ ] T074 [US10] Implement mid-workflow handoff with accumulated context in src/ecosystem/skill-engine.ts [TS-053]
- [ ] T075 [US10] Verify catalog capacity (24+ skills, 96+ workflows) against loaded agent definitions [TS-054]
- [ ] T076 [US10] Implement skill workflow timeout (60s) with partial result delivery in src/ecosystem/skill-engine.ts [TS-066]

**Checkpoint**: Skill engine executes workflows with validation, recovery, handoff, and timeout handling.

---

## Phase 13: User Story 11 — Mirror Instance Isolation (Priority: P3)

**Goal**: Two bot instances from single codebase with completely isolated runtime state.

**Independent Test**: Run both instances; verify failure on one does not affect the other.

### Tests (RED)

- [ ] T077 [P] [US11] Write unit tests for instance isolation in tests/unit/runtime.test.ts [TS-055, TS-074, TS-075, TS-076, TS-077]

### Implementation (GREEN)

- [ ] T078 [US11] Implement per-instance credential isolation in src/runtime.ts (depends on T011, T077) [TS-055]
- [ ] T079 [US11] Implement shared read-only definition loading at startup in src/ecosystem/loader.ts [TS-056]
- [ ] T080 [US11] Verify conversation history, knowledge base, circuit breaker, and tool registry isolation between instances [TS-074, TS-075, TS-076, TS-077]

**Checkpoint**: Mirror instances (Pristino/Deonto) operate independently with zero state leakage.

---

## Phase 14: User Story 12 — Template-Based Deliverables (Priority: P3)

**Goal**: Professionally formatted deliverables with platform-appropriate chunking.

**Independent Test**: Request an assessment; verify template structure and brand-compliant content.

### Tests (RED)

- [ ] T081 [P] [US12] Write unit tests for template rendering and chunking in tests/unit/format.test.ts [TS-058, TS-059]

### Implementation (GREEN)

- [ ] T082 [US12] Implement template engine with section schema validation in src/format.ts (depends on T037, T081) [TS-058]
- [ ] T083 [US12] Implement message chunking with 4096-char limit, sentence-boundary splitting, and heading preservation in src/format.ts [TS-059]

**Checkpoint**: Deliverables render via templates. Oversized messages chunked cleanly.

---

## Phase 15: Async Processing & Integration

**Purpose**: Webhook-based async message processing and bot gateway integration.

- [ ] T084 Write integration tests for bot message handling in tests/integration/bot.test.ts [TS-062, TS-063, TS-065]
- [ ] T085 Implement Pub/Sub async message dispatch in src/index.ts with HTTP 200 acknowledgment within 2 seconds [TS-062, TS-063]
- [ ] T086 Implement message queuing during startup before ecosystem is loaded [TS-065]
- [ ] T087 Implement Telegram bot gateway in src/bot.ts with Grammy middleware pipeline integrating CP1→agent→CP3→format→deliver
- [ ] T088 Write integration test for full delegation chain in tests/integration/delegation.test.ts [TS-005]

**Checkpoint**: Full async pipeline operational. Messages acknowledged, processed asynchronously.

---

## Phase 16: Polish & Cross-Cutting Concerns

**Purpose**: Coverage enforcement, edge cases, and final hardening.

- [ ] T089 [P] Run vitest coverage report and fix gaps to reach 80% global, 100% on security/router/circuit-breaker [SC-011]
- [ ] T090 [P] Implement all-providers-unavailable fallback message in src/config/llm-providers.ts [TS-064]
- [ ] T091 [P] Add Markdown-to-Telegram-HTML conversion in src/format.ts
- [ ] T093 Run all .feature scenario tags against test suite to verify full TS-xxx traceability

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup) ← no dependencies
Phase 2 (Foundational) ← Phase 1
Phase 3 (US4 Security) ← Phase 2
Phase 4 (US5 Ecosystem) ← Phase 2, Phase 1 (T004)
Phase 5 (US1 Routing) ← Phase 3, Phase 4
Phase 6 (US3 Brand Voice) ← Phase 2
Phase 7 (US2 Terna) ← Phase 5
Phase 8 (US6 Committee) ← Phase 7
Phase 9 (US7 Voice) ← Phase 5
Phase 10 (US8 Memory) ← Phase 2
Phase 11 (US9 Resilience) ← Phase 2, Phase 8 (Committee, for mode degradation)
Phase 12 (US10 Skills) ← Phase 4
Phase 13 (US11 Mirror) ← Phase 2
Phase 14 (US12 Deliverables) ← Phase 6
Phase 15 (Async) ← Phase 3, Phase 4, Phase 5
Phase 16 (Polish) ← all prior phases
```

### Parallel Opportunities

After Phase 2 (Foundational) completes, these can run in parallel:
- **Batch A**: Phase 3 (Security) + Phase 10 (Memory) + Phase 11 (Resilience) + Phase 13 (Mirror)
- **Batch B** (after Security + Ecosystem): Phase 5 (Routing) + Phase 6 (Brand Voice) + Phase 12 (Skills)
- **Batch C** (after Routing): Phase 7 (Terna) + Phase 9 (Voice)
- **Batch D** (after Terna): Phase 8 (Committee)

### Critical Path

Setup → Foundational → Security → Ecosystem → Routing → Terna → Committee (7 sequential phases)

### MVP Scope (P1 stories only)

Phases 1-7 deliver the MVP: setup, foundational, security, ecosystem, routing, brand voice, terna. This gives the core interaction loop with multi-agent routing, security, and brand compliance.

---

## Notes

- [P] tasks = different files, no dependencies
- [USn] label maps task to specific user story for traceability
- TDD is NON-NEGOTIABLE (Constitution Principle VI): write failing tests before implementation
- 100% coverage required on: src/security.ts, src/ecosystem/router.ts, src/circuit-breaker.ts
- Each user story is independently completable and testable
- Total: 93 tasks across 16 phases
- TS-IDs reference scenarios in specs/001-pristino-bot-v2/tests/features/*.feature

## Clarifications

### Session 2026-03-28

- Q: Should T007 and T008 both be [P] given TDD requires test-first? -> A: No — removed [P] from T008, added explicit dependency on T007. Tests must fail before implementation begins. [T007, T008]
- Q: Who owns forbidden term replacement — CP3 (security.ts) or brand voice (format.ts)? -> A: format.ts owns replacement. CP3 detects and warns only (soft pass). Avoids double-replacement and aligns with CP3's observational nature. [T019, T038]
- Q: Should T092 (delegation registry) be in Polish or Foundational? -> A: Foundational — T032 (depth enforcement) depends on the registry existing. Moved T092 to Phase 2. [T092, T032]
- Q: Does Phase 11 (Resilience) depend only on Phase 2? -> A: No — T069 (mode degradation) requires terna and committee to exist. Added Phase 8 dependency. [T069, Phase 11]
- Q: Is T033 (cognition loop) too large for one task? -> A: Narrowed scope to iteration control flow only. Prompt composition is T034, tool dispatch is T012. [T033]
- Q: Is T040 (excellence scoring) 16 programmatic functions? -> A: No — LLM-based evaluation prompt, not programmatic scorers. Clarified in task description. [T040]
- Q: T005/T006 reference TS-045 which was merged into TS-044 during clarify — stale reference? -> A: Yes — removed TS-045 from T005/T006. TS-044 Scenario Outline covers the full circuit breaker state machine. [T005, T006]
- Q: contracts/security.md says CP3 "scrubs and replaces" forbidden terms but T019 says "warn only" — which is authoritative? -> A: T019 clarification is authoritative. Updated contracts/security.md to say "detects and logs warnings (does NOT replace)". [T019, contracts/security.md]
- Q: FR-025 (episodic memory) has no @FR-025 tag in feature files — coverage gap? -> A: Added @FR-025 to TS-035 (lifecycle classification Scenario Outline, episodic row). [TS-035, FR-025]
