---
id: graph-001-agent-architecture
type: knowledge-graph
version: "2.0.0"
date: "2026-03-06"
format: "markdown-adjacency"
entities: 18
relationships: 24
tags: [knowledge-graph, architecture, agent, dependencies]
---

# Knowledge Graph: Pristino/Deonto Agent Architecture

## Entidades

### Capa: Entry Point
```
[E01] index.ts          | type: entrypoint  | role: lifecycle-manager
```

### Capa: Configuracion
```
[E02] config.ts         | type: config      | role: env-loader-validator
[E03] logger.ts         | type: infra       | role: structured-logging
[E04] .env              | type: secret       | role: environment-variables
```

### Capa: Interfaz
```
[E05] bot.ts            | type: interface   | role: telegram-adapter
```

### Capa: Orquestacion
```
[E06] agent.ts          | type: orchestrator | role: agent-loop-controller
[E07] security.ts       | type: guard       | role: defense-in-depth
[E08] tokens.ts         | type: optimizer   | role: context-budget-manager
```

### Capa: Proveedores
```
[E09] llm.ts            | type: provider    | role: llm-abstraction
[E10] memory.ts         | type: store       | role: sqlite-conversation-store
```

### Capa: Tools
```
[E11] tools/registry.ts | type: registry    | role: tool-dispatch-async
[E12] tools/delegate.ts | type: tool        | role: sub-agent-routing
[E13] tools/get-current-time.ts | type: tool | role: timezone-aware-clock
```

### Capa: Conceptos
```
[C01] AgentDeps         | type: interface   | role: dependency-injection-contract
[C02] LLMProvider       | type: interface   | role: llm-abstraction-contract
[C03] RunOptions        | type: interface   | role: sub-agent-config
[C04] SubAgent          | type: interface   | role: sub-agent-definition
[C05] TokenBudget       | type: interface   | role: context-window-allocation
```

## Relaciones (Grafo de Adyacencia)

```
# Formato: [SOURCE] --relacion--> [TARGET] : descripcion

# === Flujo de Inicializacion ===
[E01] --creates-->      [E02] : loadConfig()
[E01] --creates-->      [E10] : new Memory(config.dbPath)
[E01] --creates-->      [E09] : createLLMProvider(config)
[E01] --creates-->      [E05] : createBot(config, agentDeps)
[E01] --calls-->        [E06] : initDelegation(agentDeps)
[E01] --uses-->         [E03] : logger.info("starting...")

# === Flujo de Mensaje (runtime) ===
[E05] --guards-->       [E02] : whitelist check via allowedUserIds
[E05] --delegates-->    [E06] : runAgent(agentDeps, userId, text)
[E05] --timeout-->      [E06] : Promise.race 60s deadline
[E05] --splits-->       [E05] : splitMessage() at newline boundaries

# === Flujo del Agente ===
[E06] --checkpoint1-->  [E07] : sanitizeInput(userMessage)
[E06] --checkpoint2-->  [E07] : buildSecurePrompt(rawPrompt)
[E06] --optimizes-->    [E08] : calculateBudget() + trimHistory()
[E06] --queries-->      [E10] : memory.getRecentMessages()
[E06] --calls-->        [E09] : llm.chat(messages, tools)
[E06] --dispatches-->   [E11] : executeTool(name, args)
[E06] --checkpoint3-->  [E07] : validateOutput(text)
[E06] --persists-->     [E10] : memory.addMessage()

# === Flujo de Delegacion ===
[E06] --spawns-->       [E06] : runAgent(deps, 0, task, {depth:1})
[E12] --defines-->      [C04] : SubAgent registry (timekeeper)
[E11] --registers-->    [E12] : registerDelegateTool(executor)
[E06] --provides-->     [E11] : initDelegation() executor callback

# === Flujo LLM ===
[E09] --primary-->      [ext:Groq] : callGroq(messages, tools)
[E09] --fallback-->     [ext:OpenRouter] : callOpenRouter() with AbortController
[E09] --normalizes-->   [E09] : parseResponse() deduplication

# === Dependencias de Configuracion ===
[E04] --feeds-->        [E02] : dotenv/config → process.env
[E02] --configures-->   [E06] : maxIterations, maxHistory
[E02] --configures-->   [E09] : groqModel, maxTokens, openRouterModel
[E02] --configures-->   [E08] : modelContextWindow
```

## Arbol de Dependencias (imports)

```
index.ts
├── config.ts
│   └── logger.ts
├── memory.ts
│   └── logger.ts
├── llm.ts
│   ├── config.ts (type)
│   ├── tools/registry.ts (type)
│   └── logger.ts
├── bot.ts
│   ├── config.ts (type)
│   ├── agent.ts
│   └── logger.ts
├── agent.ts
│   ├── llm.ts (type)
│   ├── memory.ts (type)
│   ├── config.ts (type)
│   ├── tools/registry.ts
│   ├── tools/delegate.ts
│   ├── security.ts
│   ├── tokens.ts
│   └── logger.ts
└── logger.ts

tools/registry.ts
├── tools/get-current-time.ts
│   └── tools/registry.ts (type only)
├── tools/delegate.ts
│   └── tools/registry.ts (type only)
└── logger.ts

# Circular dependency prevention:
# delegate.ts --(type only)--> registry.ts
# registry.ts --(static import)--> delegate.ts (getDelegateDefinition only)
# agent.ts --(runtime callback)--> registry.ts (registerDelegateTool)
```

## Mapa de Seguridad

```
                    ┌─────────────────────────────┐
                    │     TELEGRAM (grammy)        │
                    │   Whitelist: allowedUserIds  │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  CHECKPOINT 1: sanitizeInput │
                    │  - Strip control chars       │
                    │  - Max 4096 chars            │
                    │  - Detect injection patterns │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  CHECKPOINT 2: buildSecure   │
                    │  - Wrap user content         │
                    │  - Append SECURITY_SUFFIX    │
                    │  - Anti-jailbreak rules      │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  TOKEN OPTIMIZATION          │
                    │  - Budget calculation        │
                    │  - History trimming           │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  AGENT LOOP (max N iters)    │
                    │  - LLM call                  │
                    │  - Tool dispatch (async)     │
                    │  - Sub-agent spawn (depth=1) │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  CHECKPOINT 3: validateOutput│
                    │  - Detect leaked prompts     │
                    │  - Detect role confusion     │
                    │  - Log flagged content       │
                    └──────────┬──────────────────┘
                               │
                    ┌──────────▼──────────────────┐
                    │  MEMORY PERSISTENCE          │
                    │  - SQLite WAL mode           │
                    │  - Prepared statements       │
                    │  - 32KB content guard        │
                    │  - Role enum validation      │
                    └─────────────────────────────┘
```

## Mapa de Token Budget

```
Model Context Window: 131,072 tokens
┌──────────────────────────────────────────────────────┐
│ ████████████████████████████████████████████████ 100% │
│                                                      │
│ ┌──────────┐ System Prompt (~500 tokens, ~0.4%)      │
│ │ ████     │                                         │
│ └──────────┘                                         │
│ ┌──────────┐ Response Reserve (4,096 tokens, ~3.1%)  │
│ │ ████████ │                                         │
│ └──────────┘                                         │
│ ┌──────────┐ Safety Margin (13,107 tokens, ~10%)     │
│ │ ████████ │                                         │
│ └──────────┘                                         │
│ ┌──────────────────────────────────────────────┐     │
│ │ ██████████████████████████████████████████   │     │
│ │ Available for History (~113,369 tokens, ~86%)│     │
│ └──────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────┘
```
