# Research: Pristino Bot 2.0

**Feature**: `001-pristino-bot-v2`
**Date**: 2026-03-28

## Decision Log

### D-001: Runtime & Language

**Decision**: TypeScript 5.x on Node.js (ESM)

**Rationale**: The prototype is already TypeScript/Node.js. The team has existing expertise and all dependencies (Grammy, Groq SDK, Firebase Admin) are Node.js native. Rewriting in another language would add risk with no proportional benefit.

**Alternatives considered**:
- Python (FastAPI): Richer ML ecosystem but would require rewriting all agent definitions, losing Grammy integration, and adding Python runtime to deployment.
- Deno: Better security model but Grammy and firebase-admin have less mature Deno support.

**Tessl Tile**: `tessl/npm-typescript@5.9.1` installed.

### D-002: Testing Framework

**Decision**: Vitest 4.x

**Rationale**: Constitution Principle VI mandates TDD with 80% global coverage and 100% on critical paths. The prototype has zero tests. Vitest is the fastest TypeScript-native test runner, supports ESM natively (matching the project's module system), and has built-in coverage via v8/istanbul.

**Alternatives considered**:
- Jest: Requires ESM transform configuration; slower for pure TypeScript ESM projects.
- Node.js native test runner: Lacks coverage tooling maturity and assertion library richness.

**Tessl Tile**: `tessl/npm-vitest@4.0.0` installed.

### D-003: Messaging Platform

**Decision**: Telegram via Grammy 1.x

**Rationale**: The prototype uses Grammy for Telegram. The Chief Officers are already using Telegram. Grammy provides middleware architecture, TypeScript types, webhook and polling modes, and file download helpers.

**Alternatives considered**:
- WhatsApp Business API: Higher user base but requires Meta approval, paid tier, and more complex webhook setup.
- Multi-platform abstraction: Premature; Telegram is the validated channel.

**Tessl Tile**: `tessl/npm-grammy@1.38.0` installed.

### D-004: Storage Layer

**Decision**: Firestore (firebase-admin SDK) with in-memory fallback

**Rationale**: The prototype's 3-layer memory architecture (working, episodic, semantic) is built on Firestore. The schema is well-defined with custom indexes. Firestore provides real-time listeners, automatic scaling, and the project already has Firebase configuration, Dockerfile for Cloud Run, and Pub/Sub integration.

**Alternatives considered**:
- PostgreSQL + pgvector: Better for vector search (RAG), but requires infrastructure migration and loses Firestore's real-time capabilities. Can be added later for semantic search specifically.
- SQLite (local): Insufficient for multi-instance isolation and cloud deployment.

**Tessl Tile**: `tessl/npm-firebase@12.2.0` installed.

### D-005: LLM Provider Strategy

**Decision**: Groq (primary, multi-tier cascade) + OpenRouter (fallback), with 2D cascading architecture

**Rationale**: The prototype's 2D cascade (vertical model tiers + horizontal API key rotation) is well-designed for cost and availability. Groq provides fast inference for real-time conversation. Circuit breaker per (model, key) pair prevents cascade failures. The design satisfies Constitution Principle IV (Graceful Degradation).

**Alternatives considered**:
- Anthropic Claude API: Higher quality but higher latency; better suited as a premium tier addition than primary.
- OpenAI: Higher cost, not necessary for the Spanish-language domain. Can be added as an OpenRouter model.
- Vercel AI SDK abstraction: Adds indirection without proportional benefit for this single-provider-family setup.

**No Tessl Tile**: No `groq-sdk` npm tile available in registry.

### D-006: Schema Validation

**Decision**: Zod for runtime validation of agent definitions, skill contracts, and API inputs

**Rationale**: The prototype uses manual validation (if/else checks in the loader). Zod provides TypeScript-first schema validation with automatic type inference, reducing the gap between runtime validation and compile-time types. It's zero-dependency and handles the agent.md frontmatter parsing validation cleanly.

**Alternatives considered**:
- io-ts: Functional style doesn't match the codebase's imperative patterns.
- AJV (JSON Schema): More verbose for TypeScript projects; no type inference.
- Manual validation: Current approach; error-prone and untestable in isolation.

**No Tessl Tile**: No Zod tile available in registry.

### D-007: HTTP Server

**Decision**: Express 5.x for webhook ingress and health checks

**Rationale**: Already used in the prototype for Cloud Run webhook handling. Express 5 is stable, familiar, and Grammy provides Express middleware adapters.

**Tessl Tile**: `tessl/npm-express@5.1.0` installed.

### D-008: Audio Transcription

**Decision**: Groq Whisper API (via groq-sdk)

**Rationale**: Already integrated in the prototype. Groq's Whisper endpoint provides fast transcription. Shares the same API key cascade as the LLM provider, simplifying credential management.

**Alternatives considered**:
- OpenAI Whisper API: Higher cost, separate credential management.
- Local Whisper: Requires GPU, incompatible with Cloud Run.

### D-009: Deployment Target

**Decision**: Google Cloud Run with Pub/Sub for async message processing

**Rationale**: Already configured in the prototype with Dockerfile and Pub/Sub integration. Cloud Run provides automatic scaling, pay-per-use, and integrates with Firebase/Firestore natively. Pub/Sub decouples webhook acknowledgment from message processing (FR-042, FR-043).

### D-010: Agent Definition Format

**Decision**: Markdown with YAML frontmatter (agent.md) + YAML skill definitions (skill.yaml)

**Rationale**: The prototype's declarative agent format is well-designed with 21 mandatory fields and 4 optional enrichments. Loading at startup from filesystem satisfies FR-006/FR-007. V2 adds Zod validation for the parsed definitions.

## Tessl Tiles Summary

| Tile | Version | Purpose |
|------|---------|---------|
| `tessl/npm-grammy` | 1.38.0 | Telegram bot framework |
| `tessl/npm-vitest` | 4.0.0 | Test framework (TDD) |
| `tessl/npm-typescript` | 5.9.1 | Language compiler |
| `tessl/npm-firebase` | 12.2.0 | Firestore & Firebase |
| `tessl/npm-express` | 5.1.0 | HTTP webhook server |

**Technologies without tiles**: groq-sdk, zod, @google-cloud/pubsub, marked, dotenv
