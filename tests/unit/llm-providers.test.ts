// ============================================================================
// Unit tests for src/config/llm-providers.ts
// Covers:
//   - parseResponse: null message, missing tool_calls, valid response
//   - getProvider: no groq keys throws, successful chat call, tier cascade,
//     openrouter fallback, all exhausted throws
//   - getGroqClient: basic chat, no keys throws
//   - getOpenRouterClient: basic chat, no keys throws
//   - getVisionProvider: vision success, vision exhausted falls back to standard
//   - isRateLimitError detection via cascade behavior
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("dotenv", () => ({ config: vi.fn() }));

// Mock Groq SDK — must use constructor pattern
const mockGroqCreate = vi.fn();
vi.mock("groq-sdk", () => {
  function GroqMock(this: unknown) {
    (this as Record<string, unknown>).chat = {
      completions: { create: mockGroqCreate },
    };
  }
  return { default: GroqMock };
});

// Mock circuit breaker so it never trips in tests
vi.mock("../../src/circuit-breaker.js", () => {
  function CircuitBreakerMock(this: unknown) {
    (this as Record<string, unknown>).isOpen = vi.fn().mockReturnValue(false);
    (this as Record<string, unknown>).recordSuccess = vi.fn();
    (this as Record<string, unknown>).recordFailure = vi.fn();
  }
  return { CircuitBreaker: CircuitBreakerMock };
});

// ---------------------------------------------------------------------------
// Imports (after mocks)
// ---------------------------------------------------------------------------

import {
  getProvider,
  getCommercialProposalProvider,
  getGroqClient,
  getOpenRouterClient,
  getVisionProvider,
  resetProviderTelemetryForTests,
  sanitizeMessagesForGemini,
  selectGeminiRoute,
} from "../../src/config/llm-providers.js";
import type { LLMMessage } from "../../src/config/llm-providers.js";
import type { Config } from "../../src/config.js";
import type { ToolDefinition } from "../../src/tools/registry.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConfig(overrides: Partial<Config> = {}): Config {
  return {
    telegramBotToken: "test-token",
    allowedUserIds: [1],
    groqApiKey: "test-groq-key",
    groqModel: "llama-3.1-8b-instant",
    groqModelTiers: ["tier1-model", "tier2-model"],
    groqModelVision: "vision-model",
    openRouterApiKey: "test-or-key",
    openRouterModel: "or-model",
    geminiApiKey: "test-gemini-key",
    geminiModel: "gemini-2.5-flash",
    geminiSimpleModel: "gemini-2.5-flash",
    geminiComplexModel: "gemini-3-flash-preview",
    geminiFallbackEnabled: true,
    llmProviderOverride: "auto",
    dbPath: "./test.db",
    maxIterations: 5,
    maxHistory: 20,
    maxTokens: 4096,
    modelContextWindow: 131072,
    agentsPath: "./agents",
    agentCredentials: new Map([
      [
        "pristino",
        {
          telegramBotToken: "test-token",
          groqApiKeys: [
            { key: "groq-key-1", owner: "OWNER1" },
            { key: "groq-key-2", owner: "OWNER2" },
          ],
          openRouterApiKeys: [{ key: "or-key-1", owner: "OR_OWNER" }],
          geminiApiKeys: [{ key: "gemini-key-1", owner: "GEM_OWNER" }],
        },
      ],
    ]),
    googleOAuthToken: "",
    ...overrides,
  };
}

function makeMessages(): LLMMessage[] {
  return [{ role: "user", content: "Hello" }];
}

function makeTools(): ToolDefinition[] {
  return [];
}

function makeGroqResponse(content: string, toolCalls: unknown[] = []) {
  return {
    choices: [
      {
        message: { content, tool_calls: toolCalls },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  resetProviderTelemetryForTests();
  mockGroqCreate.mockReset();
  mockGroqCreate.mockResolvedValue(makeGroqResponse("Hello from LLM"));
  vi.clearAllMocks();
  mockGroqCreate.mockResolvedValue(makeGroqResponse("Hello from LLM"));
  global.fetch = vi.fn();
});

// ---------------------------------------------------------------------------
// getProvider — basic chat
// ---------------------------------------------------------------------------

describe("getProvider", () => {
  it("throws when no Groq API keys are configured", () => {
    const config = makeConfig({
      agentCredentials: new Map([
        ["pristino", { telegramBotToken: "t", groqApiKeys: [], openRouterApiKeys: [], geminiApiKeys: [] }],
      ]),
    });
    expect(() => getProvider(config, "pristino")).toThrow(/No LLM API keys configured/);
  });

  it("returns a provider with a chat function", () => {
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    expect(typeof provider.chat).toBe("function");
  });

  it("chat() returns the LLM response on success", async () => {
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse("Test response"));
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Test response");
    expect(result.toolCalls).toEqual([]);
  });

  it("chat() returns tool calls when present in response", async () => {
    const toolCalls = [{ id: "c1", type: "function", function: { name: "get_time", arguments: "{}" } }];
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse(null as unknown as string, toolCalls));
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBeNull();
    expect(result.toolCalls).toHaveLength(1);
    expect(result.toolCalls[0].function.name).toBe("get_time");
  });

  it("chat() handles empty choices response gracefully", async () => {
    mockGroqCreate.mockResolvedValueOnce({ choices: [] });
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBeNull();
    expect(result.toolCalls).toEqual([]);
  });

  it("chat() cascades to second key on rate limit error", async () => {
    const rateLimitError = new Error("429 rate_limit exceeded");
    mockGroqCreate
      .mockRejectedValueOnce(rateLimitError) // key 1 fails
      .mockResolvedValueOnce(makeGroqResponse("Response from key 2")); // key 2 succeeds

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Response from key 2");
  });

  it("chat() cascades to next tier when all keys of tier 1 fail", async () => {
    const rateLimitError = new Error("Rate limit reached");
    // Both keys of tier1 fail, tier2 key1 succeeds
    mockGroqCreate
      .mockRejectedValueOnce(rateLimitError) // tier1, key1
      .mockRejectedValueOnce(rateLimitError) // tier1, key2
      .mockResolvedValueOnce(makeGroqResponse("Tier 2 response")); // tier2, key1

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Tier 2 response");
  });

  it("chat() falls back to OpenRouter when all Groq tiers exhausted", async () => {
    const rateLimitError = new Error("429 too many requests");
    // All groq calls fail (2 tiers × 2 keys = 4 failures)
    mockGroqCreate
      .mockRejectedValue(rateLimitError);

    // Mock OpenRouter fetch
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "OpenRouter response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const config = makeConfig({ geminiFallbackEnabled: false });
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("OpenRouter response");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("openrouter"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("chat() falls back to Gemini before OpenRouter when Groq tiers are exhausted", async () => {
    mockGroqCreate.mockRejectedValue(new Error("429 rate_limit exceeded"));

    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini fallback response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());

    expect(result.content).toBe("Gemini fallback response");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("generativelanguage.googleapis.com"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("uses the simple Gemini model for short requests", async () => {
    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini simple response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig({
      llmProviderOverride: "gemini",
      geminiFallbackEnabled: false,
      geminiSimpleModel: "gemini-2.5-flash",
      geminiComplexModel: "gemini-3-flash-preview",
    });
    const provider = getProvider(config, "pristino");
    await provider.chat(makeMessages(), makeTools());

    const [, requestInit] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(String((requestInit as RequestInit).body));
    expect(body.model).toBe("gemini-2.5-flash");
  });

  it("uses the complex Gemini model for long analytical requests", async () => {
    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini complex response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig({
      llmProviderOverride: "gemini",
      geminiFallbackEnabled: false,
      geminiSimpleModel: "gemini-2.5-flash",
      geminiComplexModel: "gemini-3-flash-preview",
    });
    const provider = getProvider(config, "pristino");
    await provider.chat(
      [{
        role: "user",
        content: "Analiza este flujo, compara riesgos, disena mitigaciones y entrega un plan por etapas con criterios de salida y dependencias para todo el proceso.",
      }],
      makeTools(),
    );

    const [, requestInit] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(String((requestInit as RequestInit).body));
    expect(body.model).toBe("gemini-3-flash-preview");
  });

  it("sanitizes tool-call history before sending Gemini requests", async () => {
    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini resumed after tools", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig({
      llmProviderOverride: "gemini",
      geminiFallbackEnabled: false,
    });
    const provider = getProvider(config, "pristino");

    await provider.chat(
      [
        { role: "user", content: "Busca informacion operativa y continua" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: {
                name: "search_operational_knowledge",
                arguments: "{\"query\":\"flujo comercial\"}",
              },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          name: "search_operational_knowledge",
          content: "{\"matches\":1}",
        },
      ],
      makeTools(),
    );

    const [, requestInit] = vi.mocked(global.fetch).mock.calls[0];
    const body = JSON.parse(String((requestInit as RequestInit).body));
    expect(body.messages).toEqual([
      { role: "user", content: "Busca informacion operativa y continua" },
      {
        role: "assistant",
        content:
          "Tool call summary:\n- search_operational_knowledge({\"query\":\"flujo comercial\"})",
      },
      {
        role: "assistant",
        content: "Tool result from search_operational_knowledge (call_1):\n{\"matches\":1}",
      },
    ]);
  });

  it("treats Groq TPM 413 errors as quota exhaustion and cascades to Gemini", async () => {
    mockGroqCreate.mockRejectedValue(
      new Error("413 Request too large for model `openai/gpt-oss-120b` on tokens per minute (TPM): Limit 8000, Requested 8463.")
    );

    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini after TPM exhaustion", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());

    expect(result.content).toBe("Gemini after TPM exhaustion");
  });

  it("chat() throws when all providers exhausted", async () => {
    const genericError = new Error("Connection failed");
    mockGroqCreate.mockRejectedValue(genericError);

    const config = makeConfig({
      agentCredentials: new Map([
        ["pristino", {
          telegramBotToken: "t",
          groqApiKeys: [{ key: "key1", owner: "O1" }],
          openRouterApiKeys: [], // no openrouter fallback
          geminiApiKeys: [],
        }],
      ]),
    });

    const provider = getProvider(config, "pristino");
    await expect(provider.chat(makeMessages(), makeTools())).rejects.toThrow(/All LLM providers exhausted/);
  });

  it("onQuotaExhausted callback is called when rate limit hit", async () => {
    const quotaCallback = vi.fn();
    const rateLimitError = new Error("429 rate_limit");
    mockGroqCreate
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce(makeGroqResponse("ok"));

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    provider.onQuotaExhausted = quotaCallback;

    await provider.chat(makeMessages(), makeTools());

    expect(quotaCallback).toHaveBeenCalledWith("OWNER1", "groq");
  });

  it("tracks provider telemetry across quota exhaustion and recovery", async () => {
    mockGroqCreate
      .mockRejectedValueOnce(new Error("429 rate_limit"))
      .mockResolvedValueOnce(makeGroqResponse("Recovered on second key"));

    const config = makeConfig();
    const provider = getProvider(config, "pristino");

    await provider.chat(makeMessages(), makeTools());

    const snapshot = provider.getTelemetrySnapshot?.();
    expect(snapshot).toBeDefined();
    expect(snapshot?.remainingQuotaKnown).toBe(false);
    expect(snapshot?.totals.attempts).toBe(2);
    expect(snapshot?.totals.successes).toBe(1);
    expect(snapshot?.totals.quotaErrors).toBe(1);

    const quotaEntry = snapshot?.entries.find(
      (entry) => entry.provider === "groq" && entry.routeKind === "standard" && entry.keyIndex === 0,
    );
    const successEntry = snapshot?.entries.find(
      (entry) => entry.provider === "groq" && entry.routeKind === "standard" && entry.keyIndex === 1,
    );

    expect(quotaEntry?.quotaErrors).toBe(1);
    expect(successEntry?.successes).toBe(1);
  });

  it("does not emit quota callback or cascade keys on payload-too-large errors", async () => {
    const quotaCallback = vi.fn();
    mockGroqCreate.mockRejectedValueOnce(new Error("413 Request too large"));

    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    provider.onQuotaExhausted = quotaCallback;

    await expect(provider.chat(makeMessages(), makeTools())).rejects.toThrow(/413|Request too large/);

    expect(quotaCallback).not.toHaveBeenCalled();
    expect(mockGroqCreate).toHaveBeenCalledTimes(1);
  });

  it("falls back to legacy credentials when agent not in agentCredentials", () => {
    const config = makeConfig({
      agentCredentials: new Map(), // empty
      groqApiKey: "legacy-key",
    });
    // deonto not in agentCredentials; falls back to legacy groqApiKey
    const provider = getProvider(config, "deonto");
    expect(typeof provider.chat).toBe("function");
  });

  it("includes MCP connectors when googleOAuthToken is set", async () => {
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse("response with mcp"));
    const config = makeConfig({ googleOAuthToken: "oauth-token-123" });
    const provider = getProvider(config, "pristino");
    await provider.chat(makeMessages(), makeTools());
    // Should have called create with mcp_servers in request body
    const callArgs = mockGroqCreate.mock.calls[0][0] as Record<string, unknown>;
    expect(callArgs.mcp_servers).toBeDefined();
    expect(Array.isArray(callArgs.mcp_servers)).toBe(true);
  });

  it("forwards a per-request maxTokens override to the provider client", async () => {
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse("response with capped output"));
    const config = makeConfig();
    const provider = getProvider(config, "pristino");

    await provider.chat(makeMessages(), makeTools(), { maxTokens: 512 });

    const callArgs = mockGroqCreate.mock.calls[0][0] as Record<string, unknown>;
    expect(callArgs.max_tokens).toBe(512);
  });
});

describe("getCommercialProposalProvider", () => {
  it("prefers Gemini complex before Groq tiers for commercial proposals", async () => {
    mockGroqCreate.mockImplementation(() => {
      throw new Error("Groq should not be called before Gemini for commercial proposals");
    });

    const mockGeminiResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "Gemini proposal response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockGeminiResponse);

    const config = makeConfig({ geminiFallbackEnabled: false });
    const provider = getCommercialProposalProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());

    expect(result.content).toBe("Gemini proposal response");
    expect(mockGroqCreate).not.toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("generativelanguage.googleapis.com"),
      expect.objectContaining({ method: "POST" })
    );
  });
});

describe("selectGeminiRoute", () => {
  it("routes a short single-turn request to the simple Gemini model", () => {
    const config = makeConfig();
    const route = selectGeminiRoute(makeMessages(), makeTools(), config);

    expect(route.complexity).toBe("simple");
    expect(route.model).toBe("gemini-2.5-flash");
  });

  it("routes a complex analytical request to the complex Gemini model", () => {
    const config = makeConfig();
    const route = selectGeminiRoute(
      [{
        role: "user",
        content: "Analiza el contrato, compara escenarios, evalua riesgos, define matriz de mitigacion y entrega el plan completo con responsables y criterios de aprobacion.",
      }],
      makeTools(),
      config,
      { maxTokens: 1200 },
    );

    expect(route.complexity).toBe("complex");
    expect(route.model).toBe("gemini-3-flash-preview");
    expect(route.reason).toContain("complex_keywords");
  });
});

describe("sanitizeMessagesForGemini", () => {
  it("keeps regular messages and rewrites tool exchanges into plain assistant text", () => {
    const sanitized = sanitizeMessagesForGemini([
      { role: "system", content: "Sistema" },
      { role: "user", content: "Consulta" },
      {
        role: "assistant",
        content: "Voy a consultar el KB.",
        tool_calls: [
          {
            id: "call_2",
            type: "function",
            function: {
              name: "search_operational_knowledge",
              arguments: "{\"query\":\"KB\"}",
            },
          },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_2",
        name: "search_operational_knowledge",
        content: "{\"matches\":2}",
      },
    ]);

    expect(sanitized).toEqual([
      { role: "system", content: "Sistema" },
      { role: "user", content: "Consulta" },
      {
        role: "assistant",
        content:
          "Voy a consultar el KB.\n\nTool call summary:\n- search_operational_knowledge({\"query\":\"KB\"})",
      },
      {
        role: "assistant",
        content: "Tool result from search_operational_knowledge (call_2):\n{\"matches\":2}",
      },
    ]);
  });
});

// ---------------------------------------------------------------------------
// getGroqClient
// ---------------------------------------------------------------------------

describe("getGroqClient", () => {
  it("throws when no Groq keys configured", () => {
    const config = makeConfig({
      agentCredentials: new Map([["pristino", { telegramBotToken: "t", groqApiKeys: [], openRouterApiKeys: [], geminiApiKeys: [] }]]),
    });
    expect(() => getGroqClient(config, "pristino")).toThrow(/No Groq API keys/);
  });

  it("returns a provider with chat function", () => {
    const config = makeConfig();
    const client = getGroqClient(config, "pristino");
    expect(typeof client.chat).toBe("function");
  });

  it("chat() calls groq and returns response", async () => {
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse("Groq client response"));
    const config = makeConfig();
    const client = getGroqClient(config, "pristino");
    const result = await client.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Groq client response");
  });
});

// ---------------------------------------------------------------------------
// getOpenRouterClient
// ---------------------------------------------------------------------------

describe("getOpenRouterClient", () => {
  it("throws when no OpenRouter keys configured", () => {
    const config = makeConfig({
      agentCredentials: new Map([["pristino", { telegramBotToken: "t", groqApiKeys: [{ key: "k", owner: "O" }], openRouterApiKeys: [], geminiApiKeys: [] }]]),
    });
    expect(() => getOpenRouterClient(config, "pristino")).toThrow(/No OpenRouter API keys/);
  });

  it("returns a provider with chat function", () => {
    const config = makeConfig();
    const client = getOpenRouterClient(config, "pristino");
    expect(typeof client.chat).toBe("function");
  });

  it("chat() uses fetch to call openrouter API", async () => {
    const mockRes = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{ message: { content: "OR response", tool_calls: [] } }],
      }),
    };
    global.fetch = vi.fn().mockResolvedValue(mockRes);

    const config = makeConfig();
    const client = getOpenRouterClient(config, "pristino");
    const result = await client.chat(makeMessages(), makeTools());
    expect(result.content).toBe("OR response");
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("openrouter"),
      expect.objectContaining({ method: "POST" })
    );
  });

  it("chat() throws when fetch response is not ok", async () => {
    const mockRes = {
      ok: false,
      status: 500,
      text: vi.fn().mockResolvedValue("Internal Server Error"),
    };
    global.fetch = vi.fn().mockResolvedValue(mockRes);

    const config = makeConfig();
    const client = getOpenRouterClient(config, "pristino");
    await expect(client.chat(makeMessages(), makeTools())).rejects.toThrow(/OpenRouter HTTP 500/);
  });

  it("chat() throws when no api key provided (empty string bypass)", async () => {
    const config = makeConfig({
      agentCredentials: new Map([
        ["pristino", {
          telegramBotToken: "t",
          groqApiKeys: [{ key: "k", owner: "O" }],
          openRouterApiKeys: [{ key: "", owner: "EMPTY" }],
          geminiApiKeys: [],
        }],
      ]),
    });
    const client = getOpenRouterClient(config, "pristino");
    await expect(client.chat(makeMessages(), makeTools())).rejects.toThrow(/disabled/);
  });
});

// ---------------------------------------------------------------------------
// getVisionProvider
// ---------------------------------------------------------------------------

describe("getVisionProvider", () => {
  it("throws when no Groq keys configured", () => {
    const config = makeConfig({
      agentCredentials: new Map([["pristino", { telegramBotToken: "t", groqApiKeys: [], openRouterApiKeys: [], geminiApiKeys: [] }]]),
    });
    expect(() => getVisionProvider(config, "pristino")).toThrow(/No Groq API keys/);
  });

  it("returns a provider with chat function", () => {
    const config = makeConfig();
    const provider = getVisionProvider(config, "pristino");
    expect(typeof provider.chat).toBe("function");
  });

  it("chat() calls vision model first", async () => {
    mockGroqCreate.mockResolvedValueOnce(makeGroqResponse("Vision response"));
    const config = makeConfig();
    const provider = getVisionProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Vision response");
  });

  it("chat() falls back to standard provider when vision model exhausted", async () => {
    const rateLimitError = new Error("Rate limit");
    // First call (vision model) fails for all keys, then standard model succeeds
    mockGroqCreate
      .mockRejectedValueOnce(rateLimitError) // vision key1 fails
      .mockRejectedValueOnce(rateLimitError) // vision key2 fails
      .mockResolvedValueOnce(makeGroqResponse("Standard fallback response")); // standard tier1 key1

    const config = makeConfig();
    const provider = getVisionProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("Standard fallback response");
  });
});

// ---------------------------------------------------------------------------
// parseResponse edge cases (tested via getProvider.chat calls)
// ---------------------------------------------------------------------------

describe("parseResponse — edge cases via getProvider", () => {
  it("handles response with message having no tool_calls field", async () => {
    mockGroqCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "No tools" } }], // no tool_calls
    });
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBe("No tools");
    expect(result.toolCalls).toEqual([]);
  });

  it("handles null/undefined content in response", async () => {
    mockGroqCreate.mockResolvedValueOnce({
      choices: [{ message: { content: null, tool_calls: [] } }],
    });
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.content).toBeNull();
  });

  it("handles non-array tool_calls gracefully", async () => {
    mockGroqCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "ok", tool_calls: null } }],
    });
    const config = makeConfig();
    const provider = getProvider(config, "pristino");
    const result = await provider.chat(makeMessages(), makeTools());
    expect(result.toolCalls).toEqual([]);
  });
});
