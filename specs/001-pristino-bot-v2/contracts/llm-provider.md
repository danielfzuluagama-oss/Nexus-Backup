# Contract: LLM Provider Module

**Module**: `src/config/llm-providers.ts`

## LLMProvider Interface

```typescript
interface LLMProvider {
  chat(messages: LLMMessage[], tools: ToolDefinition[]): Promise<LLMResponse>;
  onQuotaExhausted?: (owner: string, provider: string) => void;
}

interface LLMMessage {
  role: "system" | "user" | "assistant" | "tool";
  content?: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
  name?: string;
}

interface LLMResponse {
  content: string | null;
  toolCalls: ToolCall[];
}
```

## Cascade Behavior

### getProvider(config, agentName): LLMProvider

**Invariants**:
- Vertical cascade: iterates model tiers (Tier1 → Tier2 → Tier3)
- Horizontal cascade: iterates API keys within each tier
- Circuit breaker per `(provider:agent:model:keyN)` combination
- Rate limit errors (429, 413) trigger immediate cascade to next key
- After all Groq tiers exhausted, cascades to OpenRouter
- Throws only when ALL providers exhausted (including OpenRouter)
- `onQuotaExhausted` callback fired for each rate-limited key

### Circuit Breaker

- Opens after 3 consecutive failures (configurable)
- Cooldown: 60 seconds (configurable)
- Half-open: probes with single request
- State: closed → open → half-open → closed/open
- Independent per (provider, agent, model, key) tuple
