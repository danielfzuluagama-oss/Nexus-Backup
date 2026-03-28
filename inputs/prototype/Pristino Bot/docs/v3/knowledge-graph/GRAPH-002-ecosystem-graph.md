# GRAPH-002: Ecosystem Entity Graph (v3.1)

## Core Entities and Relationships

```
                         ECOSYSTEM
                            |
            +---------------+---------------+
            |               |               |
         AGENTS          SKILLS        TEMPLATES
         (6)            (24)            (6)
            |               |
     +------+------+    4 per agent
     |      |      |       |
   agent.md prompts skills  _shared/
   (21+5   (11     (4     defaults.yaml
   fields)  each)  each)  (inherited)
                     |
                  workflows
               (4 per skill = 96)
                     |
                  steps
               (3-5 per workflow)
               (12 fields each)
```

## Entity: Agent

```
Agent
  |-- id: string (kebab-case)
  |-- name: string
  |-- role: string
  |-- version: "3.0.0"
  |-- has: agent.md (21 mandatory + 5 optional fields)
  |-- has: prompts/ (11 markdown files)
  |   |-- meta-reasoning.md
  |   |-- meta-format.md
  |   |-- meta-restrictions.md
  |   |-- meta-style.md
  |   |-- pair-greeting.md
  |   |-- pair-delegation.md
  |   |-- pair-error-recovery.md
  |   |-- pair-complex-query.md
  |   |-- handoff.md
  |   |-- deliberation.md
  |   |-- fallback.md
  |-- has: skills/ (4 directories, each with skill.yaml)
  |-- allowedTools: string[]
  |-- memoryPolicy: read-only | read-write
  |-- delegationCapable: boolean (only orchestrator = true)
```

## Entity: Skill

```
Skill
  |-- id: string (kebab-case)
  |-- name: string
  |-- owningAgent: AgentId
  |-- purpose: string
  |-- businessValue: string
  |-- has: workflows (4)
  |-- has: inputs/outputs contracts
  |-- has: securityValidations (CP1, CP2, CP3)
  |-- has: wowCriteria + safeCriteria
  |-- has: failureHandling rules
```

## Entity: Workflow

```
Workflow
  |-- id: string (kebab-case)
  |-- title: string
  |-- objective: string
  |-- trigger: string (condition expression)
  |-- has: steps (3-5)
  |-- has: DoD (Definition of Done)
  |-- has: RACI matrix
  |-- has: KPIs
  |-- has: qaChecklist
  |-- has: errorHandling + fallbackRoute + escalationRoute
  |-- designRationale?: string (v3.1)
  |-- timeoutMs?: number (v3.1)
```

## Entity: Step

```
Step (12 mandatory fields)
  |-- stepNumber: number
  |-- title: string
  |-- desc: string
  |-- whyThisMatters: string
  |-- inputNeeded: string
  |-- actionInstruction: string
  |-- promptToUse: string | null
  |-- expectedOutput: string
  |-- validationRule: string
  |-- failureSignal: string
  |-- recoveryAction: string
  |-- handoffIfNeeded: string | null
```

## Relationships

```
pristino-orchestrator
  |-- DELEGATES_TO --> timekeeper (single)
  |-- DELEGATES_TO --> analyst (single/terna/committee)
  |-- DELEGATES_TO --> researcher (single/terna/committee)
  |-- DELEGATES_TO --> synthesizer (terna synthesis / committee synthesis)
  |-- DELEGATES_TO --> validator (post-output QA)

synthesizer
  |-- SYNTHESIZES --> analyst outputs
  |-- SYNTHESIZES --> researcher outputs
  |-- SYNTHESIZES --> timekeeper outputs

validator
  |-- VALIDATES --> any agent output
  |-- VALIDATES --> synthesizer output
```

## Security Graph

```
User Input
  |-- CP1: sanitizeInput()
  |       |-- Strips injection patterns
  |       |-- Enforces max length
  |
  v
System Prompt
  |-- CP2: buildSecurePrompt()
  |       |-- Adds safety instructions
  |       |-- Applied via composeSystemPrompt()
  |
  v
Agent Output
  |-- CP3: validateOutput()
          |-- Checks for prompt leaks
          |-- Checks for sensitive data
          |-- Log-but-don't-block mode
```

## Runtime Isolation (v3.1)

```
AgentRuntime × N (one per configured bot instance)
  |-- instanceName: "pristino" | "deonto"
  |-- config: Config (shared reference)
  |-- credentials: AgentCredentials (per-instance)
  |-- memory: Memory (data/<name>.db — isolated)
  |-- llm: LLMProvider (own API keys + CircuitBreaker)
  |-- logger: Logger ([PRISTINO] or [DEONTO] prefix)
  |-- toolRegistry: ToolRegistry (per-instance)
  |-- subAgentRegistry: SubAgentRegistry (per-instance)
  |-- ecosystem: EcosystemState (shared read-only reference)

Process Model:
  Single process → N AgentRuntime instances → N Grammy bots
  Shared: ecosystem definitions, config constants
  Isolated: memory, LLM clients, circuit breakers, registries, logs
```

## Multi-Agent Configuration

```
Config
  |-- agentCredentials: Map<AgentName, AgentCredentials>
  |     |-- "pristino": { telegramBotToken, groqApiKey, openRouterApiKey }
  |     |-- "deonto":   { telegramBotToken, groqApiKey, openRouterApiKey }
  |
  |-- LLM Provider per agent:
  |     |-- Primary: Groq (agent-specific API key)
  |     |-- Fallback: OpenRouter (agent-specific API key)
  |     |-- CircuitBreaker: 3 failures → open → 60s reset → half-open
  |
  |-- Per-instance DB path: data/<agentName>.db
```
