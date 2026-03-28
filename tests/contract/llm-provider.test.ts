import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  LLMProvider,
  LLMMessage,
  LLMResponse,
  ToolCall,
} from "../../src/config/llm-providers.js";
import type { Config, AgentName } from "../../src/config.js";
import type { ToolDefinition } from "../../src/tools/registry.js";

// ============================================================================
// Mocks — prevent real SDK / env access
// ============================================================================

// Shared mock for groq.chat.completions.create — configure per test
const mockGroqCreate = vi.fn();

vi.mock("groq-sdk", () => {
  function MockGroq(_opts: unknown) {
    return {
      chat: {
        completions: {
          create: mockGroqCreate,
        },
      },
    };
  }
  return { default: MockGroq };
});

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("../../src/circuit-breaker.js", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CircuitBreaker: function MockCircuitBreaker(this: any, _name: string) {
    this.isOpen = vi.fn().mockReturnValue(false);
    this.recordSuccess = vi.fn();
    this.recordFailure = vi.fn();
    this.getState = vi.fn().mockReturnValue("closed");
  },
}));

// ============================================================================
// Helpers
// ============================================================================

function buildConfig(overrides: Partial<Config> = {}): Config {
  return {
    telegramBotToken: "test-telegram-token",
    allowedUserIds: [123],
    groqApiKey: "test-groq-key",
    groqModel: "test-model",
    groqModelTiers: ["tier1-model", "tier2-model"],
    groqModelVision: "vision-model",
    openRouterApiKey: "test-or-key",
    openRouterModel: "or-model",
    dbPath: "./test.db",
    maxIterations: 5,
    maxHistory: 20,
    maxTokens: 4096,
    modelContextWindow: 131072,
    agentsPath: "./agents",
    googleOAuthToken: "",
    agentCredentials: new Map([
      [
        "pristino" as AgentName,
        {
          telegramBotToken: "test-telegram-token",
          groqApiKeys: [{ key: "test-groq-key", owner: "TestOwner" }],
          openRouterApiKeys: [],
        },
      ],
    ]),
    ...overrides,
  };
}

const sampleMessages: LLMMessage[] = [
  { role: "user", content: "Hello" },
];

const sampleTools: ToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "get_time",
      description: "Returns current time",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
];

/** Shortcut to configure a successful Groq response */
function mockGroqSuccess(content: string | null, toolCalls: unknown[] = []): void {
  mockGroqCreate.mockResolvedValue({
    choices: [{ message: { content, tool_calls: toolCalls } }],
  });
}

// ============================================================================
// Contract Tests — TS-046: getProvider returns a provider implementing the
// chat interface with optional onQuotaExhausted callback.
// ============================================================================

describe("LLMProvider contract (TS-046)", () => {
  let getProvider: (config: Config, agentName: AgentName) => LLMProvider;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Re-import to pick up fresh module (ESM caches, but mocks are reset)
    const providerModule = await import("../../src/config/llm-providers.js");
    getProvider = providerModule.getProvider;
  });

  // ------------------------------------------------------------------
  // Interface shape
  // ------------------------------------------------------------------

  describe("provider interface shape", () => {
    it("getProvider returns an object with a chat method", () => {
      const provider = getProvider(buildConfig(), "pristino");

      expect(provider).toBeDefined();
      expect(typeof provider.chat).toBe("function");
    });

    it("provider.chat is an async function (returns a Promise)", () => {
      mockGroqSuccess("hi");

      const provider = getProvider(buildConfig(), "pristino");
      const result = provider.chat(sampleMessages, sampleTools);

      expect(result).toBeInstanceOf(Promise);
      return result; // prevent unhandled rejection
    });

    it("provider optionally exposes onQuotaExhausted callback property", () => {
      const provider = getProvider(buildConfig(), "pristino");

      // The property may be undefined (not set) but must be assignable
      expect(
        provider.onQuotaExhausted === undefined ||
          typeof provider.onQuotaExhausted === "function"
      ).toBe(true);
    });

    it("onQuotaExhausted can be set and called with owner and provider args", () => {
      const provider = getProvider(buildConfig(), "pristino");
      const callback = vi.fn();
      provider.onQuotaExhausted = callback;

      provider.onQuotaExhausted("TestOwner", "groq");
      expect(callback).toHaveBeenCalledWith("TestOwner", "groq");
    });
  });

  // ------------------------------------------------------------------
  // LLMResponse shape
  // ------------------------------------------------------------------

  describe("chat() returns LLMResponse with correct shape", () => {
    it("returns { content: string | null, toolCalls: ToolCall[] } on success", async () => {
      mockGroqSuccess("Hello back");

      const response: LLMResponse = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response).toHaveProperty("content");
      expect(response).toHaveProperty("toolCalls");
      expect(Array.isArray(response.toolCalls)).toBe(true);
    });

    it("content field is a string when the model replies with text", async () => {
      mockGroqSuccess("Sure thing");

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(typeof response.content).toBe("string");
      expect(response.content).toBe("Sure thing");
    });

    it("content field is null when the model returns a tool call without text", async () => {
      const mockToolCall: ToolCall = {
        id: "call_abc",
        type: "function",
        function: { name: "get_time", arguments: "{}" },
      };
      mockGroqSuccess(null, [mockToolCall]);

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.content).toBeNull();
      expect(response.toolCalls).toHaveLength(1);
    });

    it("toolCalls array contains ToolCall objects with id, type, function fields", async () => {
      const mockToolCall: ToolCall = {
        id: "call_xyz",
        type: "function",
        function: { name: "get_time", arguments: '{"tz":"UTC"}' },
      };
      mockGroqSuccess(null, [mockToolCall]);

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.toolCalls).toHaveLength(1);
      const tc = response.toolCalls[0];
      expect(tc).toHaveProperty("id");
      expect(tc).toHaveProperty("type", "function");
      expect(tc).toHaveProperty("function");
      expect(tc.function).toHaveProperty("name");
      expect(tc.function).toHaveProperty("arguments");
    });
  });

  // ------------------------------------------------------------------
  // parseResponse helper behaviour (via chat() surface)
  // ------------------------------------------------------------------

  describe("parseResponse behaviour — malformed / empty responses", () => {
    it("returns { content: null, toolCalls: [] } when choices array is empty", async () => {
      mockGroqCreate.mockResolvedValue({ choices: [] });

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.content).toBeNull();
      expect(response.toolCalls).toEqual([]);
    });

    it("returns { content: null, toolCalls: [] } when message is undefined", async () => {
      mockGroqCreate.mockResolvedValue({ choices: [{ message: undefined }] });

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.content).toBeNull();
      expect(response.toolCalls).toEqual([]);
    });

    it("returns { content: null, toolCalls: [] } when message has no content or tool_calls", async () => {
      mockGroqCreate.mockResolvedValue({ choices: [{ message: {} }] });

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.content).toBeNull();
      expect(response.toolCalls).toEqual([]);
    });

    it("returns toolCalls as [] when tool_calls is not an array", async () => {
      mockGroqCreate.mockResolvedValue({
        choices: [{ message: { content: "ok", tool_calls: null } }],
      });

      const response = await getProvider(buildConfig(), "pristino")
        .chat(sampleMessages, sampleTools);

      expect(response.toolCalls).toEqual([]);
    });
  });

  // ------------------------------------------------------------------
  // Error handling — all providers exhausted
  // ------------------------------------------------------------------

  describe("error handling", () => {
    it("throws when no Groq API keys are configured for the agent", () => {
      const config = buildConfig({
        agentCredentials: new Map([
          [
            "pristino" as AgentName,
            {
              telegramBotToken: "t",
              groqApiKeys: [],
              openRouterApiKeys: [],
            },
          ],
        ]),
      });

      expect(() => getProvider(config, "pristino")).toThrow(
        /No Groq API keys configured for agent/
      );
    });

    it("throws when all providers are exhausted", async () => {
      mockGroqCreate.mockRejectedValue(new Error("500 server error"));

      const provider = getProvider(buildConfig(), "pristino");

      await expect(provider.chat(sampleMessages, sampleTools)).rejects.toThrow(
        /All LLM providers exhausted/
      );
    });
  });

  // ------------------------------------------------------------------
  // LLMMessage interface types
  // ------------------------------------------------------------------

  describe("LLMMessage interface types", () => {
    it("accepts all valid message roles without TypeScript errors", async () => {
      mockGroqSuccess("ok");

      const messages: LLMMessage[] = [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there" },
        {
          role: "tool",
          content: "result",
          tool_call_id: "call_1",
          name: "get_time",
        },
      ];

      const response = await getProvider(buildConfig(), "pristino")
        .chat(messages, sampleTools);

      expect(mockGroqCreate).toHaveBeenCalledOnce();
      expect(response).toHaveProperty("content");
    });

    it("LLMMessage supports optional tool_calls array on assistant messages", () => {
      const toolCall: ToolCall = {
        id: "call_1",
        type: "function",
        function: { name: "test_fn", arguments: "{}" },
      };
      const msg: LLMMessage = {
        role: "assistant",
        content: null,
        tool_calls: [toolCall],
      };

      expect(msg.tool_calls).toBeDefined();
      expect(msg.tool_calls).toHaveLength(1);
      expect(msg.tool_calls![0].type).toBe("function");
    });
  });
});
