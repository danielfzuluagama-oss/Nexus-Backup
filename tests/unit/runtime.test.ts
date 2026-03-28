// ============================================================================
// T077 — Unit tests for AgentRuntime instance isolation
// Covers: TS-055, TS-074, TS-075, TS-076, TS-077
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — must be hoisted before imports
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
  createLogger: vi.fn().mockImplementation((name: string) => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    _prefix: name,
  })),
}));

vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([]),
  cert: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn().mockReturnValue(null),
  FieldValue: {
    serverTimestamp: vi.fn(),
    increment: vi.fn((n: number) => n),
    arrayUnion: vi.fn(),
  },
  Firestore: class {},
}));

vi.mock("fs", async () => {
  const actual = await vi.importActual<typeof import("fs")>("fs");
  return {
    ...actual,
    existsSync: vi.fn().mockReturnValue(false),
  };
});

// Mock Groq SDK to avoid real HTTP calls
vi.mock("groq-sdk", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: vi.fn().mockResolvedValue({
            choices: [{ message: { content: "mocked response", tool_calls: [] } }],
          }),
        },
      },
    })),
  };
});

// Mock built-in tools to avoid filesystem reads
vi.mock("../../src/tools/knowledge.js", () => ({
  definition: {
    type: "function",
    function: {
      name: "read_core_knowledge",
      description: "Read core knowledge base",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  readCoreKnowledge: vi.fn().mockResolvedValue("mocked knowledge"),
}));

vi.mock("../../src/tools/get-current-time.js", () => ({
  definition: {
    type: "function",
    function: {
      name: "get_current_time",
      description: "Get current time",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  execute: vi.fn().mockReturnValue("2026-03-28T00:00:00Z"),
}));

vi.mock("../../src/tools/delegate.js", () => ({
  getDelegateDefinition: vi.fn().mockReturnValue({
    type: "function",
    function: {
      name: "delegate_to_agent",
      description: "Delegate to sub-agent",
      parameters: { type: "object", properties: {}, required: [] },
    },
  }),
  SubAgentRegistry: class SubAgentRegistry {
    agents = new Map();
    register = vi.fn();
    getAll = vi.fn().mockReturnValue([]);
    get = vi.fn().mockReturnValue(null);
    constructor(_logger?: unknown) {}
  },
}));

vi.mock("../../src/ecosystem/prompt-composer.js", () => ({
  composeSystemPrompt: vi.fn().mockReturnValue("mocked system prompt"),
}));

// ---------------------------------------------------------------------------
// Import SUT after mocks
// ---------------------------------------------------------------------------

import { AgentRuntime } from "../../src/runtime.js";
import type { Config, AgentCredentials } from "../../src/config.js";

// ---------------------------------------------------------------------------
// Shared test fixtures
// ---------------------------------------------------------------------------

function makeConfig(): Config {
  return {
    telegramBotToken: "token-shared",
    allowedUserIds: [1, 2],
    groqApiKey: "gsk_test_shared",
    groqModel: "llama3-8b-8192",
    groqModelTiers: ["llama3-8b-8192"],
    groqModelVision: "llama-3.2-11b-vision-preview",
    openRouterApiKey: "or_test_shared",
    openRouterModel: "meta-llama/llama-3-8b-instruct",
    dbPath: ":memory:",
    maxIterations: 10,
    maxHistory: 50,
    maxTokens: 2048,
    modelContextWindow: 8192,
    agentsPath: "./agents",
    agentCredentials: new Map(),
    googleOAuthToken: "",
  };
}

function makeCredentials(suffix: string): AgentCredentials {
  return {
    telegramBotToken: `token-${suffix}`,
    groqApiKeys: [{ key: `gsk_${suffix}_key1`, owner: `owner-${suffix}-1` }],
    openRouterApiKeys: [{ key: `or_${suffix}_key1`, owner: `owner-${suffix}-1` }],
  };
}

// ---------------------------------------------------------------------------
// TS-055: Two AgentRuntime instances with separate credentials — rotating one
//         doesn't affect the other
// ---------------------------------------------------------------------------

describe("TS-055: Credential isolation between runtime instances", () => {
  let config: Config;
  let credsA: AgentCredentials;
  let credsB: AgentCredentials;
  let runtimeA: AgentRuntime;
  let runtimeB: AgentRuntime;

  beforeEach(() => {
    vi.clearAllMocks();
    config = makeConfig();
    credsA = makeCredentials("pristino");
    credsB = makeCredentials("deonto");
    runtimeA = new AgentRuntime("pristino", config, credsA);
    runtimeB = new AgentRuntime("deonto", config, credsB);
  });

  it("each runtime holds its own credentials reference", () => {
    expect(runtimeA.credentials).toBe(credsA);
    expect(runtimeB.credentials).toBe(credsB);
  });

  it("credentials are not shared — A's token differs from B's token", () => {
    expect(runtimeA.credentials.telegramBotToken).toBe("token-pristino");
    expect(runtimeB.credentials.telegramBotToken).toBe("token-deonto");
    expect(runtimeA.credentials.telegramBotToken).not.toBe(runtimeB.credentials.telegramBotToken);
  });

  it("each runtime stores a different first Groq API key", () => {
    expect(runtimeA.credentials.groqApiKeys[0].key).toBe("gsk_pristino_key1");
    expect(runtimeB.credentials.groqApiKeys[0].key).toBe("gsk_deonto_key1");
  });

  it("runtimes share the same Config reference but hold separate Credentials objects", () => {
    expect(runtimeA.config).toBe(runtimeB.config);
    expect(runtimeA.credentials).not.toBe(runtimeB.credentials);
  });

  it("creating a rotated runtime for A with new creds does not affect B's credentials", () => {
    const newCredsA: AgentCredentials = {
      telegramBotToken: "token-pristino-rotated",
      groqApiKeys: [{ key: "gsk_pristino_key2", owner: "owner-pristino-2" }],
      openRouterApiKeys: [],
    };
    const runtimeARotated = new AgentRuntime("pristino", config, newCredsA);
    expect(runtimeARotated.credentials.groqApiKeys[0].key).toBe("gsk_pristino_key2");
    // B is unaffected
    expect(runtimeB.credentials.groqApiKeys[0].key).toBe("gsk_deonto_key1");
    expect(runtimeB.credentials.telegramBotToken).toBe("token-deonto");
  });

  it("instanceName distinguishes each runtime", () => {
    expect(runtimeA.instanceName).toBe("pristino");
    expect(runtimeB.instanceName).toBe("deonto");
  });
});

// ---------------------------------------------------------------------------
// TS-074: Conversation history isolation
// ---------------------------------------------------------------------------

describe("TS-074: Conversation history isolation between runtime instances", () => {
  let runtimeA: AgentRuntime;
  let runtimeB: AgentRuntime;

  beforeEach(() => {
    vi.clearAllMocks();
    const config = makeConfig();
    runtimeA = new AgentRuntime("pristino", config, makeCredentials("pristino"));
    runtimeB = new AgentRuntime("deonto", config, makeCredentials("deonto"));
  });

  it("each runtime creates its own Memory instance", () => {
    expect(runtimeA.memory).toBeDefined();
    expect(runtimeB.memory).toBeDefined();
    expect(runtimeA.memory).not.toBe(runtimeB.memory);
  });

  it("memory instances are independent objects (different references)", () => {
    expect(Object.is(runtimeA.memory, runtimeB.memory)).toBe(false);
  });

  it("messages added to A's memory are visible in A but not in B", async () => {
    const userId = 42;
    await runtimeA.memory.addMessage(userId, "user", "Message for pristino only");

    const historyA = await runtimeA.memory.getRecentMessages(userId, 10);
    const historyB = await runtimeB.memory.getRecentMessages(userId, 10);

    // A has the message; B's store is empty
    expect(historyA.length).toBeGreaterThan(0);
    expect(historyB.length).toBe(0);
  });

  it("messages added to B's memory are visible in B but not in A", async () => {
    const userId = 99;
    await runtimeB.memory.addMessage(userId, "user", "Message for deonto only");

    const historyA = await runtimeA.memory.getRecentMessages(userId, 10);
    const historyB = await runtimeB.memory.getRecentMessages(userId, 10);

    expect(historyB.length).toBeGreaterThan(0);
    expect(historyA.length).toBe(0);
  });

  it("message content stored in A matches what was inserted", async () => {
    const userId = 7;
    const content = "Isolation test message";
    await runtimeA.memory.addMessage(userId, "user", content);
    const history = await runtimeA.memory.getRecentMessages(userId, 1);
    expect(history[0]?.content).toBe(content);
  });
});

// ---------------------------------------------------------------------------
// TS-075: Circuit breaker isolation
// ---------------------------------------------------------------------------

describe("TS-075: Circuit breaker isolation between runtime instances", () => {
  let runtimeA: AgentRuntime;
  let runtimeB: AgentRuntime;

  beforeEach(() => {
    vi.clearAllMocks();
    const config = makeConfig();
    runtimeA = new AgentRuntime("pristino", config, makeCredentials("pristino"));
    runtimeB = new AgentRuntime("deonto", config, makeCredentials("deonto"));
  });

  it("each runtime owns a separate LLM provider instance", () => {
    expect(runtimeA.llm).toBeDefined();
    expect(runtimeB.llm).toBeDefined();
    expect(runtimeA.llm).not.toBe(runtimeB.llm);
  });

  it("onQuotaExhausted callback is independently configurable per runtime", () => {
    const callbackA = vi.fn();
    const callbackB = vi.fn();

    runtimeA.onQuotaExhausted = callbackA;
    runtimeB.onQuotaExhausted = callbackB;

    expect(runtimeA.onQuotaExhausted).toBe(callbackA);
    expect(runtimeB.onQuotaExhausted).toBe(callbackB);
  });

  it("setting onQuotaExhausted on A does not propagate to B", () => {
    const callbackA = vi.fn();
    runtimeA.onQuotaExhausted = callbackA;

    expect(runtimeA.onQuotaExhausted).toBe(callbackA);
    expect(runtimeB.onQuotaExhausted).toBeUndefined();
  });

  it("quota exhaustion fired via A's LLM invokes A's callback but not B's callback", () => {
    const callbackA = vi.fn();
    const callbackB = vi.fn();

    runtimeA.onQuotaExhausted = callbackA;
    runtimeB.onQuotaExhausted = callbackB;

    // Trigger the wired quota handler on A's LLM provider
    if (runtimeA.llm.onQuotaExhausted) {
      runtimeA.llm.onQuotaExhausted("owner-A", "groq");
    }

    expect(callbackA).toHaveBeenCalledWith("owner-A", "groq");
    expect(callbackB).not.toHaveBeenCalled();
  });

  it("quota exhaustion fired via B's LLM invokes B's callback but not A's callback", () => {
    const callbackA = vi.fn();
    const callbackB = vi.fn();

    runtimeA.onQuotaExhausted = callbackA;
    runtimeB.onQuotaExhausted = callbackB;

    if (runtimeB.llm.onQuotaExhausted) {
      runtimeB.llm.onQuotaExhausted("owner-B", "openrouter");
    }

    expect(callbackB).toHaveBeenCalledWith("owner-B", "openrouter");
    expect(callbackA).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// TS-076: Knowledge base isolation
// ---------------------------------------------------------------------------

describe("TS-076: Knowledge base isolation between runtime instances", () => {
  let runtimeA: AgentRuntime;
  let runtimeB: AgentRuntime;

  beforeEach(() => {
    vi.clearAllMocks();
    const config = makeConfig();
    runtimeA = new AgentRuntime("pristino", config, makeCredentials("pristino"));
    runtimeB = new AgentRuntime("deonto", config, makeCredentials("deonto"));
  });

  it("each runtime has its own Memory instance (serves as knowledge store)", () => {
    expect(runtimeA.memory).not.toBe(runtimeB.memory);
  });

  it("knowledge added to A's memory under a category does not appear in B's memory", async () => {
    const userId = 10;
    await runtimeA.memory.addKnowledge("process", userId, "Pristino-specific principle: always respond in Spanish");

    const kbB = await runtimeB.memory.getKnowledge("process", userId);
    expect(kbB.length).toBe(0);
  });

  it("knowledge added to B's memory does not appear in A's memory", async () => {
    const userId = 11;
    await runtimeB.memory.addKnowledge("process", userId, "Deonto-specific principle: always apply ethical framework");

    const kbA = await runtimeA.memory.getKnowledge("process", userId);
    expect(kbA.length).toBe(0);
  });

  it("knowledge retrieved from A matches what was stored in A", async () => {
    const userId = 12;
    const fact = "Test knowledge for pristino";
    await runtimeA.memory.addKnowledge("process", userId, fact);
    const kbA = await runtimeA.memory.getKnowledge("process", userId);
    expect(kbA).toContain(fact);
  });

  it("ecosystem state is independently assignable per runtime", () => {
    const mockEcosystem = { agents: [], version: "1.0" } as unknown as import("../../src/ecosystem/types.js").EcosystemState;

    runtimeA.ecosystem = mockEcosystem;

    expect(runtimeA.ecosystem).toBe(mockEcosystem);
    expect(runtimeB.ecosystem).toBeNull();
  });

  it("assigning ecosystem state to B does not affect A", () => {
    const ecoA = { agents: ["agentA"], version: "1.0" } as unknown as import("../../src/ecosystem/types.js").EcosystemState;
    const ecoB = { agents: ["agentB"], version: "2.0" } as unknown as import("../../src/ecosystem/types.js").EcosystemState;

    runtimeA.ecosystem = ecoA;
    runtimeB.ecosystem = ecoB;

    expect(runtimeA.ecosystem).toBe(ecoA);
    expect(runtimeB.ecosystem).toBe(ecoB);
  });
});

// ---------------------------------------------------------------------------
// TS-077: Tool registry isolation
// ---------------------------------------------------------------------------

describe("TS-077: Tool registry isolation between runtime instances", () => {
  let runtimeA: AgentRuntime;
  let runtimeB: AgentRuntime;

  beforeEach(() => {
    vi.clearAllMocks();
    const config = makeConfig();
    runtimeA = new AgentRuntime("pristino", config, makeCredentials("pristino"));
    runtimeB = new AgentRuntime("deonto", config, makeCredentials("deonto"));
  });

  it("each runtime has its own ToolRegistry instance", () => {
    expect(runtimeA.toolRegistry).toBeDefined();
    expect(runtimeB.toolRegistry).toBeDefined();
    expect(runtimeA.toolRegistry).not.toBe(runtimeB.toolRegistry);
  });

  it("each runtime has its own SubAgentRegistry instance", () => {
    expect(runtimeA.subAgentRegistry).toBeDefined();
    expect(runtimeB.subAgentRegistry).toBeDefined();
    expect(runtimeA.subAgentRegistry).not.toBe(runtimeB.subAgentRegistry);
  });

  it("a tool registered only in A is present in A's registry", () => {
    const customTool = {
      type: "function" as const,
      function: {
        name: "pristino_exclusive_tool",
        description: "Only available to pristino",
        parameters: { type: "object" as const, properties: {}, required: [] },
      },
    };

    runtimeA.toolRegistry.register(customTool, vi.fn().mockResolvedValue("ok"));

    expect(runtimeA.toolRegistry.getToolNames()).toContain("pristino_exclusive_tool");
  });

  it("a tool registered only in A is absent from B's registry", () => {
    const customTool = {
      type: "function" as const,
      function: {
        name: "pristino_exclusive_tool",
        description: "Only available to pristino",
        parameters: { type: "object" as const, properties: {}, required: [] },
      },
    };

    runtimeA.toolRegistry.register(customTool, vi.fn().mockResolvedValue("ok"));

    expect(runtimeB.toolRegistry.getToolNames()).not.toContain("pristino_exclusive_tool");
  });

  it("both registries start with the same default built-in tools", () => {
    const namesA = runtimeA.toolRegistry.getToolNames();
    const namesB = runtimeB.toolRegistry.getToolNames();
    expect(namesA).toEqual(namesB);
  });

  it("adding a tool to A leaves B's tool list unchanged", () => {
    const initialNamesB = [...runtimeB.toolRegistry.getToolNames()];

    runtimeA.toolRegistry.register(
      {
        type: "function" as const,
        function: {
          name: "extra_tool_a_only",
          description: "Extra tool for A only",
          parameters: { type: "object" as const, properties: {}, required: [] },
        },
      },
      vi.fn().mockReturnValue("result"),
    );

    expect(runtimeB.toolRegistry.getToolNames()).toEqual(initialNamesB);
  });

  it("each runtime logger is a distinct instance", () => {
    expect(runtimeA.logger).toBeDefined();
    expect(runtimeB.logger).toBeDefined();
    expect(runtimeA.logger).not.toBe(runtimeB.logger);
  });
});
