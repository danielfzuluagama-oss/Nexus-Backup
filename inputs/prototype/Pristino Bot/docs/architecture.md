# Pristino — Architecture Overview

> v4.0 | 24 source files | 3,997 LOC | Node.js 20 + TypeScript 5.x | Firebase + Groq + OpenRouter

## Design Rationale

Pristino is a **multi-agent conversational AI** built for a 2-person team (Javier, Kathe) operating MetodologIA. The architecture prioritizes: (1) fault isolation between agents so one failing key doesn't kill both bots, (2) async processing so Telegram never sees a timeout, and (3) a cognitive memory model where knowledge persists beyond conversation TTL.

**Why not a monolith?** Each agent (Pristino/Deonto) needs its own Telegram token, LLM key pool, and memory silo. A single-process monolith with a shared registry would create cascading failures; independent `AgentRuntime` instances isolate blast radius to a single agent.

**Why Express + PubSub instead of Grammy long-polling?** Long-polling holds a persistent connection per bot. On Cloud Run, this means paying for idle containers. The webhook+PubSub pattern decouples ingress (fast 200 OK) from processing (background worker), enabling scale-to-zero and retry semantics on failures.

## System Context (C4 Level 1)

```mermaid
C4Context
  title System Context — Pristino v4.0

  Person(javier, "Javier", "Chief Empowerment Officer")
  Person(kathe, "Kathe", "Chief Enablement Officer")

  System(pristino, "Pristino", "AI Conversational Architect")

  System_Ext(telegram, "Telegram", "Messaging Platform")
  System_Ext(groq, "Groq API", "LLM Inference (Whisper + LLaMA)")
  System_Ext(openrouter, "OpenRouter", "LLM Fallback Provider")
  System_Ext(firestore, "Cloud Firestore", "Persistent Memory Store")
  System_Ext(pubsub, "Cloud Pub/Sub", "Async Message Queue")

  Rel(javier, telegram, "Sends messages, voice notes")
  Rel(kathe, telegram, "Sends messages, voice notes")
  Rel(telegram, pristino, "Webhook POST /webhook/:botName")
  Rel(pristino, pubsub, "Publishes update payload")
  Rel(pubsub, pristino, "Push /pubsub-push")
  Rel(pristino, groq, "LLM inference + audio transcription")
  Rel(pristino, openrouter, "LLM fallback cascade")
  Rel(pristino, firestore, "Cognitive memory (10 collections)")
```

**Boundary decisions:**

- Telegram was chosen over WhatsApp because Grammy provides typed SDK + middleware; Twilio WhatsApp requires webhook parsing from scratch.
- Groq is primary LLM (free tier, fast inference); OpenRouter is fallback (paid, broader model access). The 2D cascade tries all Groq keys × all tiers before falling to OpenRouter.
- Firestore was chosen over PostgreSQL for zero-ops serverless persistence; trade-off is no JOINs (mitigated by denormalized document design).

## Container Diagram (C4 Level 2)

```mermaid
C4Container
  title Container Diagram — Pristino

  Container(express, "Express Server", "Node.js + Express", "Ingress: webhooks + PubSub push, 1MB body limit")
  Container(grammy, "Grammy Bots", "Grammy Framework", "Bot instances: Pristino + Deonto, 60s agent timeout")
  Container(agent, "Agent Loop", "TypeScript", "Cognitive cycle: max 5 tool calls/turn, max depth 3")
  Container(ecosystem, "Ecosystem Engine", "TypeScript", "Agents loaded from agent.md, routed by intent")
  Container(tools, "Tool Registry", "TypeScript", "4 built-in tools + ecosystem delegation")
  Container(memory, "Cognitive Memory", "TypeScript + Firestore", "10 collections, 3 layers, in-memory fallback")
  Container(llm, "LLM Provider", "TypeScript", "2D cascade: up to 3 keys × 4 tiers per agent")
  Container(security, "Security Layer", "TypeScript", "CP1: input sanitize, CP2: prompt harden, CP3: output validate")
  Container(format, "Hard Entrust", "TypeScript + Marked.js", "No bold, no italic, no emoji, dash hierarchy only")

  Rel(express, grammy, "Routes updates by botName")
  Rel(grammy, agent, "runAgent(userId, message)")
  Rel(agent, llm, "chat(messages, tools)")
  Rel(agent, tools, "executeTool(name, args)")
  Rel(agent, memory, "addMessage / getRecentMessages / addKnowledge")
  Rel(agent, security, "sanitizeInput / validateOutput")
  Rel(agent, ecosystem, "composeSystemPrompt / routeRequest")
  Rel(agent, format, "formatForTelegram")
```

**Key limits and acceptance criteria:**

- Express body limit: 1MB (down from 50MB after adversarial audit); prevents RAM saturation DoS.
- Agent timeout: 60s hard cap in bot.ts; Cloud Run's request deadline enforces this server-side.
- Tool calls: capped at 5 per LLM turn to prevent runaway execution loops.
- Recursion depth: max 3 levels of sub-agent delegation; deeper requests return error string.
- Content length: 32KB max per Firestore field; larger payloads require Cloud Storage URIs.
- Message history: context-budget-aware trimming via `tokens.ts`; oldest messages dropped first.

## Component Diagram (C4 Level 3)

```mermaid
C4Component
  title Component Diagram — Core Runtime

  Component(index, "index.ts", "Express + PubSub: PubSub publish BEFORE ACK to prevent message loss")
  Component(runtime, "AgentRuntime", "DI container: Memory, LLM, Logger, ToolRegistry, SubAgentRegistry")
  Component(bot, "bot.ts", "Grammy: text/voice/photo/document handlers with HTML fallback loop")
  Component(agent_loop, "agent.ts", "Cognitive loop: identity from Firestore, synergy memory injection")
  Component(config, "config.ts", "collectOrderedKeys() with regex scanner, PENDING filter")
  Component(llm_prov, "llm-providers.ts", "tryWithKeys(): 413/429/500 detection, exponential backoff")
  Component(circuit, "circuit-breaker.ts", "5 failures → open, 60s cooldown → half-open → reset")
  Component(mem, "memory.ts", "10 collections, FieldValue.increment for experience counters")
  Component(sec, "security.ts", "8 injection patterns, 3 output risk patterns, 4096 char input cap")
  Component(fmt, "format.ts", "enforceHardEntrust (regex) → marked.parse → splitMessageHtml (LIFO tag close)")
  Component(tokens, "tokens.ts", "Budget = modelContextWindow - systemPromptTokens - reserveBuffer")
  Component(audio, "audio.ts", "Groq Whisper: 20MB Telegram limit guard, Content-Length pre-check")
  Component(logger, "logger.ts", "JSON.stringify with agent prefix, writes to stdout")

  Rel(index, runtime, "Creates per-agent instances")
  Rel(index, bot, "Creates Grammy bots")
  Rel(bot, agent_loop, "Delegates to runAgent()")
  Rel(bot, audio, "Routes voice/audio messages")
  Rel(bot, fmt, "Formats + chunks responses")
  Rel(agent_loop, llm_prov, "LLM calls with tool definitions")
  Rel(agent_loop, mem, "Read/write all 10 collections")
  Rel(agent_loop, sec, "3-checkpoint I/O pipeline")
  Rel(agent_loop, tokens, "History trimming pre-LLM call")
  Rel(llm_prov, circuit, "Per-tier health checks")
  Rel(runtime, config, "Reads env + parses credentials")
  Rel(runtime, mem, "Instantiates shared Memory")
```

## Ecosystem Architecture (C4 Level 3)

```mermaid
C4Component
  title Ecosystem Engine — Agent Orchestration

  Component(types, "types.ts", "AgentDefinition (21+4 fields), SkillDefinition (17 fields), WorkflowDefinition (17+2 fields)")
  Component(loader, "loader.ts", "parseFrontmatter → extractSection → validateAgentDefinition, cached shared defaults")
  Component(router, "router.ts", "getRouteRequestDefinition: LLM tool for intent classification")
  Component(committee, "committee.ts", "Parallel exec → synthesis prompt → tiebreak if disagreement")
  Component(composer, "prompt-composer.ts", "Agent mandate + security suffix + tone style + failure handling")
  Component(skill_eng, "skill-engine.ts", "Skill YAML with 12-field steps, RACI assignments, KPI tracking")

  Rel(loader, types, "Produces Map<string, AgentDefinition>")
  Rel(loader, skill_eng, "Attaches SkillDefinition[] per agent")
  Rel(router, types, "Returns RoutingDecision: single|terna|committee")
  Rel(committee, types, "Returns CommitteeResult with synthesis + tiebreaker")
  Rel(composer, types, "Reads AgentDefinition to build system prompt")
```

**Design decision — why terna/committee?** For high-stakes queries (strategy, architecture), routing to 2-3 agents provides diverse perspectives. The committee module runs agents in parallel, then synthesizes responses. Trade-off: 2-3x LLM cost per query; mitigated by router only escalating when confidence is low.

## Request Flow

```mermaid
sequenceDiagram
  participant TG as Telegram
  participant EX as Express
  participant PS as Pub/Sub
  participant WK as Worker
  participant BT as Bot
  participant AG as Agent
  participant SC as Security
  participant LM as LLM
  participant TL as Tools
  participant MM as Memory
  participant FM as Format

  TG->>EX: POST /webhook/:botName
  Note over EX: Validates botName exists in Map
  EX->>PS: publish({botName, update})
  Note over EX: Publish BEFORE ACK (prevent message loss)
  EX-->>TG: 200 OK (after publish succeeds)
  PS->>WK: POST /pubsub-push (base64 payload)
  Note over WK: Validates typeof botName === "string"
  WK->>BT: handleUpdate(update)
  BT->>AG: runAgent(userId, message)
  AG->>SC: CP1: sanitizeInput (strip control chars, cap 4096, check 8 injection patterns)
  AG->>MM: addMessage(user, sourceType="text")
  AG->>MM: getUserProfile → identity context
  AG->>MM: getTeamPreferences + getSynergyFacts
  AG->>LM: chat(systemPrompt + identityContext + preferences + history + userMsg, tools)
  LM-->>AG: response + toolCalls[]
  Note over AG: Cap at 5 tool calls per turn
  AG->>TL: executeTool(name, args) [error → string fallback]
  TL-->>AG: result
  AG->>LM: chat(messages + toolResults)
  LM-->>AG: finalResponse
  AG->>SC: CP3: validateOutput (check 3 risk patterns)
  AG->>MM: addMessage(assistant)
  AG-->>BT: response text
  BT->>FM: enforceHardEntrust → marked.parse → splitMessageHtml
  Note over BT: If Telegram rejects HTML → retry with stripHtml fallback
  BT-->>TG: sendMessage(HTML chunks)
```

**Edge cases handled in this flow:**

- PubSub publish fails → HTTP 500 returned to Telegram → Telegram retries (instead of silent message loss)
- LLM returns empty response → "I have nothing to say." fallback
- Tool execution throws → error message returned as tool result string (agent loop continues)
- Agent loop exhausts maxIterations → "I got stuck in a loop" response persisted to memory
- Telegram HTML parse fails → bot retries with plain text fallback (`stripHtml`)
- Voice message received → audio.ts transcription → message stored with `sourceType: "voice_transcription"`

## Known Architectural Limitations

| Area            | Limitation                                      | Impact                                                                | Mitigation Path                                    |
| --------------- | ----------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------- |
| Concurrency     | No per-user message queue                       | 5 rapid messages = 5 parallel `runAgent` calls consuming 5x API quota | Implement userId-keyed queue in bot.ts             |
| Webhook auth    | No `X-Telegram-Bot-Api-Secret-Token` validation | Attacker with webhook URL can send fake updates                       | Add secret token validation in Express middleware  |
| Circuit breaker | State in-memory, lost on restart/scale          | New instances start with all breakers closed                          | Accept: cold start retry cost is low               |
| RAG             | No embedding pipeline yet                       | `searchRagChunks` does naive text containment                         | Implement Vertex AI embeddings + `findNearest`     |
| Thread creation | No Firestore transaction                        | Two simultaneous messages from same user = two threads                | Wrap in `runTransaction`                           |
| Security        | Regex-only injection detection                  | Bypassable with Unicode homoglyphs                                    | Accept: model RLHF is the real defense             |
| Memory          | In-memory fallback loses all state on restart   | Dev-only; production always uses Firestore                            | Document clearly; never deploy without credentials |

## File Index

| File                           | LOC | Hardening Status                   | Key Constants                                                  |
| ------------------------------ | --- | ---------------------------------- | -------------------------------------------------------------- |
| `index.ts`                     | 218 | Adversarial-hardened (Fase 8)      | Body limit 1MB, PubSub topic configurable                      |
| `runtime.ts`                   | 61  | Clean                              | DI container, no external state                                |
| `bot.ts`                       | 193 | Excellence Loop (Fase 6)           | AGENT_TIMEOUT_MS=60000                                         |
| `agent.ts`                     | 293 | Adversarial + Cognitive (Fase 8-9) | MAX_DEPTH=3, MAX_TOOL_CALLS_PER_TURN=5                         |
| `config.ts`                    | 194 | Excellence Loop (Fase 6)           | Pre-compiled regex, Math.max guards                            |
| `config/llm-providers.ts`      | 304 | Excellence Loop (Fase 6)           | 413 detection, abort timeout                                   |
| `memory.ts`                    | 540 | Cognitive Model (Fase 9)           | MAX_CONTENT_LENGTH=32768, TTL_DAYS=30                          |
| `format.ts`                    | 235 | Adversarial-hardened (Fase 8)      | TELEGRAM_MAX_LENGTH=4096, LIFO tag close                       |
| `security.ts`                  | 79  | Excellence Loop (Fase 6)           | 8 injection patterns, 3 output patterns, MAX_INPUT_LENGTH=4096 |
| `tokens.ts`                    | 50  | Clean                              | Budget = context - system - reserve                            |
| `circuit-breaker.ts`           | 58  | Clean                              | 5 failures → open, 60s cooldown                                |
| `audio.ts`                     | 78  | Excellence Loop (Fase 6)           | 20MB Telegram limit guard                                      |
| `logger.ts`                    | 38  | Clean                              | JSON to stdout                                                 |
| `ecosystem/types.ts`           | 156 | Stable                             | 7 interfaces, 1 type alias                                     |
| `ecosystem/loader.ts`          | 269 | Stable                             | 21 mandatory + 4 optional agent fields                         |
| `ecosystem/router.ts`          | 158 | Stable                             | 3 routing modes                                                |
| `ecosystem/committee.ts`       | 176 | Stable                             | Parallel execution + synthesis                                 |
| `ecosystem/prompt-composer.ts` | 72  | Stable                             | Mandate+security compose                                       |
| `ecosystem/skill-engine.ts`    | 148 | Stable                             | 12-field step definitions                                      |
| `tools/registry.ts`            | 124 | Stable                             | Error isolation per tool                                       |
| `tools/delegate.ts`            | 138 | Stable                             | Depth-guarded delegation                                       |
| `tools/knowledge.ts`           | 76  | Stable                             | team_core_docs/ reader                                         |
| `tools/get-current-time.ts`    | 42  | Stable                             | Timezone-aware                                                 |
| `tools/symlink.ts`             | 84  | Stable                             | OpenClaw registry symlinks                                     |
