# Pristino Bot Premise

## What

Pristino Bot is a multi-agent orchestration system deployed as
a Telegram bot for MetodologIA's strategic team. It routes user
requests through a hierarchy of specialized agents (Analyst,
Researcher, Synthesizer, Timekeeper, Validator) using three
delegation modes: single-agent, terna (3-parallel), and
committee (5+tiebreaker). The system enforces MetodologIA's
brand voice, applies three security checkpoints on every
message flow, and persists knowledge across a 3-layer Firestore
memory architecture (working, episodic, semantic).

## Who

The primary users are MetodologIA's four Chief Officers:
Daniel Zuluaga (Efficiency), German Sepulveda (Ecosystem),
Javier Montano (Empowerment), and Katherine Oquendo
(Enablement). They use Pristino for strategic content creation,
research synthesis, methodology application, quality assurance,
and operational decision support. A mirror instance (Deonto)
serves as an experimental variant for advanced features.

## Why

MetodologIA's consulting methodology requires consistent,
evidence-based, brand-aligned outputs across content creation,
strategic coaching, technical architecture, and client
deliverables. Without Pristino, each team member independently
applies the methodology with varying quality and consistency.
Pristino centralizes institutional knowledge, enforces the
MetodologIA brand voice (Minto Pyramid, MECE, anti-hype), and
provides multi-perspective analysis through agent delegation,
reducing friction and ensuring every output meets the 16-
dimension excellence framework.

## Domain

AI-assisted consulting and strategic methodology application.
Key terms: MetodologIA (the company and its methodology),
Brand Voice (Minto-based communication framework v3.0),
P.I.V.O.T.E (Personas, Interactions, Value, Organization,
Technology, Evolution), Success as a Service (partner model
vs vendor model), Strategic Sovereignty (systems work for you,
scale without chaos, antifragile culture), Excellence Loop
(max 2-iteration quality refinement cycle), CP1/CP2/CP3
(three security checkpoints: input, prompt, output).

## Scope

In scope: Telegram bot interface, multi-agent orchestration
(6 agents, 24 skills, 96 workflows), LLM provider cascade
(Groq primary, OpenRouter fallback), Firestore persistence
(3-layer memory), brand voice enforcement, security checkpoints,
circuit breaker resilience, Cloud Run deployment with Pub/Sub
async processing, mirror sync (Pristino/Deonto instances),
template-based deliverable generation (DOCX, HTML, XLSX).

Out of scope: public-facing web UI, mobile app, multi-tenant
SaaS, real-time collaboration, vector search / RAG embeddings
(schema exists but not implemented), inter-instance
communication between Pristino and Deonto, external calendar
modification (read-only MCP connectors only).
