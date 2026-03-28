# ARCH-003: Mirror Sync Architecture

## Overview

Pristino and Deonto are independent bot instances running from a single codebase. Each instance serves its own Telegram bot with isolated state — no shared memory, no inter-process communication.

## Isolation Model

```
┌─────────────────────────────────────────────┐
│              Shared (Read-Only)              │
│  agent.md × 6  │  skill.yaml × 24          │
│  prompts × 66  │  templates × 6            │
│  TypeScript source  │  defaults.yaml        │
└─────────────────────────────────────────────┘
        ↓ loaded at startup ↓
┌──────────────────┐    ┌──────────────────┐
│  AgentRuntime:   │    │  AgentRuntime:   │
│  PRISTINO        │    │  DEONTO          │
│                  │    │                  │
│  ┌─ Memory ────┐ │    │  ┌─ Memory ────┐ │
│  │ pristino.db │ │    │  │ deonto.db   │ │
│  └─────────────┘ │    │  └─────────────┘ │
│  ┌─ LLM ──────┐ │    │  ┌─ LLM ──────┐ │
│  │ Groq key P  │ │    │  │ Groq key D  │ │
│  │ OR key P    │ │    │  │ OR key D    │ │
│  │ CircuitBrkr │ │    │  │ CircuitBrkr │ │
│  └─────────────┘ │    │  └─────────────┘ │
│  ┌─ Bot ───────┐ │    │  ┌─ Bot ───────┐ │
│  │ TG token P  │ │    │  │ TG token D  │ │
│  └─────────────┘ │    │  └─────────────┘ │
│  ┌─ Tools ─────┐ │    │  ┌─ Tools ─────┐ │
│  │ ToolRegistry│ │    │  │ ToolRegistry│ │
│  │ SubAgentReg │ │    │  │ SubAgentReg │ │
│  └─────────────┘ │    │  └─────────────┘ │
│  Logger:         │    │  Logger:         │
│  [PRISTINO] ...  │    │  [DEONTO] ...    │
└──────────────────┘    └──────────────────┘
```

## What Is NOT Shared

| Resource | Isolation Level |
|----------|----------------|
| SQLite database | Separate file per instance (`data/<name>.db`) |
| Conversation history | Completely independent per instance |
| LLM API keys | Each instance has own Groq + OpenRouter keys |
| Circuit breaker state | Per-instance, per-provider |
| Telegram bot token | Each instance serves its own bot |
| Tool registry state | Separate `ToolRegistry` instance |
| Sub-agent registry | Separate `SubAgentRegistry` instance |
| Log output | Prefixed with `[PRISTINO]` or `[DEONTO]` |

## What IS Shared (Read-Only)

- Agent definitions (`agents/*/agent.md`)
- Skill definitions (`agents/*/skills/*/skill.yaml`)
- Prompt files (`agents/*/prompts/*.md`)
- Shared defaults (`agents/_shared/defaults.yaml`)
- Templates (`templates/`)
- TypeScript source code
- Configuration constants (models, timeouts, limits)

## Environment Variables

```bash
# Per-instance credentials (required for multi-agent mode)
TELEGRAM_BOT_TOKEN_PRISTINO=...
GROQ_API_KEY_PRISTINO=...
OPENROUTER_API_KEY_PRISTINO=...

TELEGRAM_BOT_TOKEN_DEONTO=...
GROQ_API_KEY_DEONTO=...
OPENROUTER_API_KEY_DEONTO=...

# Shared configuration
TELEGRAM_ALLOWED_USER_IDS=18219468
GROQ_MODEL=llama-3.3-70b-versatile
OPENROUTER_MODEL=meta-llama/llama-3.3-70b-instruct
```

## Startup Sequence

```
1. loadConfig() → reads env vars, builds agentCredentials Map
2. loadAllAgents() → loads ecosystem definitions (shared, read-only)
3. For each configured agent:
   a. new AgentRuntime(name, config, creds) → creates isolated instances
   b. Runtime initializes: Memory, LLM, Logger, ToolRegistry, SubAgentRegistry
   c. Ecosystem state attached to runtime (shared reference)
   d. createBot(runtime) → Grammy bot with runtime's Telegram token
   e. bot.start() → begins polling Telegram API
4. Graceful shutdown handler registered → stops all bots, closes all runtimes
```

## Failure Independence

- If Pristino's Groq key is rate-limited, its circuit breaker opens → falls back to OpenRouter. Deonto is unaffected.
- If Deonto's SQLite corrupts, Pristino continues operating with its own database.
- If one Telegram bot token is revoked, the other bot continues serving.
- Process crash affects both instances (single-process model). For full isolation, deploy separately.

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single process, multiple bots | Simplicity + low memory. Full isolation available via separate deployments. |
| Shared ecosystem definitions | Agent.md and skill.yaml are code-like assets, not runtime state. |
| Per-instance circuit breakers | Provider failures are key-specific, not system-wide. |
| No inter-instance messaging | Keeps architecture simple. Instances are independent; no coordination needed. |
