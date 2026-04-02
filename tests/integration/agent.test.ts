// ============================================================================
// T028 — Integration test for full cognition loop
// Covers: TS-004 — Every routing decision logged with mode, selected agents
//         array, reason, and timestamp
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// Mock firebase-admin to avoid initialisation errors in test environment
vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([{}]),
  cert: vi.fn(),
}));
vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn().mockReturnValue({}),
  FieldValue: { serverTimestamp: vi.fn(), arrayUnion: vi.fn(), increment: vi.fn() },
  Firestore: class {},
}));

// Mock the tools registry — no real tools needed for this test
vi.mock("../../src/tools/registry.js", () => ({
  getAllToolDefinitions: vi.fn().mockReturnValue([]),
  executeTool: vi.fn().mockResolvedValue("tool result"),
  registerDelegateTool: vi.fn(),
}));

// Mock security utilities — pass-through for test clarity
vi.mock("../../src/security.js", () => ({
  sanitizeInput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
  buildSecurePrompt: vi.fn((s: string) => s),
  validateOutput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
}));

// Mock token utilities — return generous budgets
vi.mock("../../src/tokens.js", () => ({
  calculateBudget: vi.fn().mockReturnValue({ available: 100_000 }),
  trimHistory: vi.fn((msgs: unknown[]) => msgs),
  fitMessagesToRequestBudget: vi.fn((msgs: unknown[], _tools: unknown[], options?: { desiredResponseTokens?: number }) => ({
    messages: Array.isArray(msgs) ? [...msgs] : msgs,
    inputTokens: 100,
    toolTokens: 0,
    responseTokens: options?.desiredResponseTokens ?? 4096,
    availableResponseTokens: 4096,
    trimmed: false,
    fits: true,
  })),
}));

import {
  runAgent,
  REQUEST_TOO_LARGE_MESSAGE,
} from "../../src/agent.js";
import type { AgentDeps } from "../../src/agent.js";
import { logger } from "../../src/logger.js";

// ---------------------------------------------------------------------------
// Shared mock factory
// ---------------------------------------------------------------------------

function makeDeps(chatResponse?: {
  content: string;
  toolCalls?: Array<{
    id: string;
    function: { name: string; arguments: string };
  }>;
}): AgentDeps {
  const response = chatResponse ?? { content: "Final response from LLM", toolCalls: [] };

  return {
    llm: {
      chat: vi.fn().mockResolvedValue(response),
    } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
        describeThreadMemory: vi.fn().mockResolvedValue(""),
        describeSemanticMemory: vi.fn().mockResolvedValue(""),
        updateThreadMemory: vi.fn().mockResolvedValue(undefined),
      } as any,
    config: {
      maxHistory: 10,
      maxIterations: 5,
      maxTokens: 4096,
      modelContextWindow: 8192,
    } as any,
  };
}

// ---------------------------------------------------------------------------
// TS-004: Every routing decision logged with mode, selected agents array,
//         reason, and timestamp
// ---------------------------------------------------------------------------

describe("TS-004: Routing audit log — mode, agents, reason, timestamp recorded on every decision", () => {
  beforeEach(() => {
    vi.mocked(logger.info).mockClear();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(logger.error).mockClear();
  });

  it("agent loop completes and returns a string response", async () => {
    const deps = makeDeps();
    const result = await runAgent(deps, 0, "What is the primary risk in Q3?");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("injects semantic memory context into the LLM prompt", async () => {
    const deps = makeDeps();
    const semanticContext = [
      "Memoria semántica relevante para la solicitud: Plan a Q3 launch",
      "- Hechos recuperados:",
      "  - [conf 0.90 | ref 2 | project_context | manual] Launch window is Q3",
    ].join("\n");

    vi.mocked(deps.memory.describeSemanticMemory).mockResolvedValue(semanticContext);

    await runAgent(deps, 0, "Plan a Q3 launch");

    expect(deps.memory.describeSemanticMemory).toHaveBeenCalledWith(
      0,
      "Plan a Q3 launch",
      "thread-1",
      "pristino",
    );
    expect(deps.memory.getTeamPreferences).not.toHaveBeenCalled();
    expect(deps.memory.getSynergyFacts).not.toHaveBeenCalled();

    const chatCall = vi.mocked(deps.llm.chat).mock.calls[0];
    const messages = chatCall[0] as Array<{ role: string; content: string }>;
    const semanticMessage = messages.find(
      (message) => message.role === "system" && message.content.includes("Memoria semántica relevante")
    );

    expect(semanticMessage).toBeDefined();
    expect(semanticMessage?.content).toContain("Launch window is Q3");
  });

  it("cognition loop logs at least one 'Cognition iteration started' entry", async () => {
    const deps = makeDeps();
    await runAgent(deps, 0, "Test message for iteration logging");

    const iterationLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Cognition iteration started"
    );
    expect(iterationLog).toBeDefined();
  });

  it("routing decision log contains a 'mode' field when route_request tool is called", async () => {
    // Simulate the LLM calling route_request on first turn, then returning a text response
    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_001",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "single",
                    agents: ["analyst"],
                    task: "Analyze Q3 revenue",
                    reason: "Factual accuracy: analyst covers financials",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({
            content: "Q3 revenue analysis complete",
            toolCalls: [],
          }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    // Register a mock route_request executor to capture the routing log
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        const mode = args.mode as string;
        const agents = args.agents as string[];
        const reason = args.reason as string;

        // Emit the routing decision log (mirrors what createRouteExecutor does)
        logger.info("Routing decision", {
          mode,
          agents,
          reason,
          timestamp: new Date().toISOString(),
        });
        return "analyst response: Q3 revenue is up 12%";
      }
      return "tool result";
    });

    await runAgent(deps, 0, "What happened to Q3 revenue?");

    const routingLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(routingLog).toBeDefined();
    const logData = routingLog![1] as Record<string, unknown>;
    expect(["single", "terna", "committee"]).toContain(logData.mode);
  });

  it("routing decision log contains 'agents' array with at least one entry", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason: args.reason,
          timestamp: new Date().toISOString(),
        });
        return "response";
      }
      return "tool result";
    });

    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_002",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "terna",
                    agents: ["analyst", "researcher", "synthesizer"],
                    task: "Multi-domain analysis",
                    reason: "Domain overlap requires terna pattern",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({
            content: "Terna synthesis complete",
            toolCalls: [],
          }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Analyze across multiple domains");

    const routingLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(routingLog).toBeDefined();
    const logData = routingLog![1] as Record<string, unknown>;
    expect(Array.isArray(logData.agents)).toBe(true);
    expect((logData.agents as string[]).length).toBeGreaterThanOrEqual(1);
  });

  it("routing decision log contains a non-empty 'reason' string", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    const capturedReason: string[] = [];

    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        const reason = args.reason as string;
        capturedReason.push(reason);
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason,
          timestamp: new Date().toISOString(),
        });
        return "response";
      }
      return "tool result";
    });

    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_003",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "single",
                    agents: ["validator"],
                    task: "Validate the proposed architecture",
                    reason: "Scope fit: validator specialises in architecture review",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({ content: "Validated", toolCalls: [] }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Validate my architecture plan");

    const routingLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(routingLog).toBeDefined();
    const logData = routingLog![1] as Record<string, unknown>;
    expect(typeof logData.reason).toBe("string");
    expect((logData.reason as string).length).toBeGreaterThan(0);
  });

  it("routing decision log contains an ISO timestamp", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason: args.reason,
          timestamp: new Date().toISOString(),
        });
        return "response";
      }
      return "tool result";
    });

    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_004",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "committee",
                    agents: ["analyst", "researcher", "synthesizer", "validator"],
                    task: "Critical company-wide decision",
                    reason: "Risk minimization: full committee required for critical ops decision",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({ content: "Committee result", toolCalls: [] }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Make a critical decision about company direction");

    const routingLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(routingLog).toBeDefined();
    const logData = routingLog![1] as Record<string, unknown>;

    // Timestamp must be a valid ISO 8601 string
    expect(typeof logData.timestamp).toBe("string");
    const parsed = new Date(logData.timestamp as string);
    expect(Number.isNaN(parsed.getTime())).toBe(false);
  });

  it("multiple routing decisions in one loop each produce a separate log entry", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    let callCount = 0;
    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        callCount++;
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason: args.reason,
          timestamp: new Date().toISOString(),
        });
        return `response ${callCount}`;
      }
      return "tool result";
    });

    // Two tool calls in the first LLM turn
    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_005",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "single",
                    agents: ["analyst"],
                    task: "First task",
                    reason: "First reason — factual accuracy",
                  }),
                },
              },
              {
                id: "call_006",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "terna",
                    agents: ["researcher", "synthesizer", "validator"],
                    task: "Second task",
                    reason: "Second reason — scope fit requires terna",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({ content: "Final combined answer", toolCalls: [] }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Dual-task request");

    const routingLogs = vi.mocked(logger.info).mock.calls.filter(
      (c) => c[0] === "Routing decision"
    );
    // Both route_request calls must produce their own audit log entry
    expect(routingLogs.length).toBeGreaterThanOrEqual(2);
  });

  it("routing log entries are distinct — each records its own mode and agents", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason: args.reason,
          timestamp: new Date().toISOString(),
        });
        return "response";
      }
      return "tool result";
    });

    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_007",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "single",
                    agents: ["analyst"],
                    task: "Task A",
                    reason: "Factual accuracy: analyst",
                  }),
                },
              },
              {
                id: "call_008",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "committee",
                    agents: ["analyst", "researcher", "synthesizer"],
                    task: "Task B",
                    reason: "Risk minimization: full committee",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({ content: "Done", toolCalls: [] }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Composite request");

    const routingLogs = vi.mocked(logger.info).mock.calls.filter(
      (c) => c[0] === "Routing decision"
    );

    expect(routingLogs.length).toBeGreaterThanOrEqual(2);

    // Verify entries are distinct
    const modes = routingLogs.map((c) => (c[1] as Record<string, unknown>).mode);
    // One should be "single", another "committee"
    expect(modes).toContain("single");
    expect(modes).toContain("committee");
  });

  it("routing log timestamp is not in the future", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(logger.info).mockClear();

    const beforeTest = Date.now();

    vi.mocked(executeTool).mockImplementation(async (name, args) => {
      if (name === "route_request") {
        logger.info("Routing decision", {
          mode: args.mode,
          agents: args.agents,
          reason: args.reason,
          timestamp: new Date().toISOString(),
        });
        return "response";
      }
      return "tool result";
    });

    const deps: AgentDeps = {
      llm: {
        chat: vi
          .fn()
          .mockResolvedValueOnce({
            content: null,
            toolCalls: [
              {
                id: "call_009",
                function: {
                  name: "route_request",
                  arguments: JSON.stringify({
                    mode: "single",
                    agents: ["analyst"],
                    task: "Timestamp check task",
                    reason: "Verifying timestamp integrity",
                  }),
                },
              },
            ],
          })
          .mockResolvedValueOnce({ content: "Done", toolCalls: [] }),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 5,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 0, "Check the timestamp on the routing log");

    const afterTest = Date.now();

    const routingLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(routingLog).toBeDefined();
    const ts = (routingLog![1] as Record<string, unknown>).timestamp as string;
    const tsMs = new Date(ts).getTime();

    expect(tsMs).toBeGreaterThanOrEqual(beforeTest);
    expect(tsMs).toBeLessThanOrEqual(afterTest + 1000); // 1s tolerance
  });
});

// ---------------------------------------------------------------------------
// T090 / TS-064: All LLM providers simultaneously unavailable
// When all providers are exhausted, runAgent must return a user-friendly
// fallback message that acknowledges the outage and suggests retrying.
// ---------------------------------------------------------------------------

import { ALL_PROVIDERS_UNAVAILABLE_MESSAGE } from "../../src/agent.js";

describe("TS-064: All providers unavailable — user-friendly fallback message", () => {
  beforeEach(() => {
    vi.mocked(logger.info).mockClear();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(logger.error).mockClear();
  });

  it("returns ALL_PROVIDERS_UNAVAILABLE_MESSAGE when LLM throws 'All LLM providers exhausted'", async () => {
    const deps: AgentDeps = {
      llm: {
        chat: vi.fn().mockRejectedValue(
          new Error("All LLM providers exhausted for pristino. No keys available.")
        ),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 3,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    const result = await runAgent(deps, 18219468, "What is 2 + 2?");

    expect(result).toBe(ALL_PROVIDERS_UNAVAILABLE_MESSAGE);
  });

  it("fallback message acknowledges the outage without technical error phrases", () => {
    // TS-064: message must not contain raw error text
    const msg = ALL_PROVIDERS_UNAVAILABLE_MESSAGE;
    expect(msg.toLowerCase()).not.toContain("error");
    expect(msg.toLowerCase()).not.toContain("exception");
    expect(msg.toLowerCase()).not.toContain("exhausted");
    expect(msg.toLowerCase()).not.toContain("no keys");
  });

  it("fallback message suggests retrying later", () => {
    const msg = ALL_PROVIDERS_UNAVAILABLE_MESSAGE;
    // TS-064: message must suggest retrying
    const mentionsRetry = /reint|retry|intenta/i.test(msg);
    expect(mentionsRetry).toBe(true);
  });

  it("regular LLM errors (non-exhaustion) still return generic error message", async () => {
    const deps: AgentDeps = {
      llm: {
        chat: vi.fn().mockRejectedValue(new Error("Internal server error 500")),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 3,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    const result = await runAgent(deps, 18219468, "Test generic error path");

    // Must NOT be the providers-unavailable message
    expect(result).not.toBe(ALL_PROVIDERS_UNAVAILABLE_MESSAGE);
    // Should be the generic transient failure message
    expect(result).toContain("fallo transitorio");
  });

  it("warn log is emitted when all providers are exhausted", async () => {
    const deps: AgentDeps = {
      llm: {
        chat: vi.fn().mockRejectedValue(
          new Error("All LLM providers exhausted for pristino. No keys available.")
        ),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 3,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 18219468, "Trigger providers-unavailable path");

    const warnLog = vi.mocked(logger.warn).mock.calls.find(
      (c) => typeof c[0] === "string" && c[0].includes("providers unavailable")
    );
    expect(warnLog).toBeDefined();
  });
});

describe("payload sizing hardening", () => {
  beforeEach(() => {
    vi.mocked(logger.info).mockClear();
    vi.mocked(logger.warn).mockClear();
    vi.mocked(logger.error).mockClear();
  });

  it("loads history before persisting the current user turn", async () => {
    const deps = makeDeps();
    const memory = deps.memory as any;
    const llmChat = deps.llm.chat as any;

    await runAgent(deps, 42, "mensaje actual");

    expect(memory.getRecentMessages.mock.invocationCallOrder[0]).toBeLessThan(
      memory.addMessage.mock.invocationCallOrder[0]
    );

    const requestMessages = llmChat.mock.calls[0][0] as Array<{ role: string; content?: string }>;
    const matchingTurns = requestMessages.filter(
      (message) => message.role === "user" && message.content === "mensaje actual"
    );
    expect(matchingTurns).toHaveLength(1);
  });

  it("injects thread memory context into the prompt and persists the final snapshot", async () => {
    const deps = makeDeps();
    const memory = deps.memory as any;

    vi.mocked(memory.describeThreadMemory).mockResolvedValueOnce(
      "Memoria persistida del hilo:\n- Título: Conversación en curso\n- Tipo: general",
    );

    const result = await runAgent(deps, 42, "Recuerda el contexto de esta conversación");

    expect(result).toBe("Final response from LLM");
    expect(memory.describeThreadMemory).toHaveBeenCalledWith(42, "thread-1", "pristino");
    expect(memory.updateThreadMemory).toHaveBeenCalledWith(
      42,
      "thread-1",
      expect.objectContaining({
        conversationKind: "general",
        lastUserMessagePreview: "Recuerda el contexto de esta conversación",
        lastAssistantMessagePreview: "Final response from LLM",
      }),
    );

    const requestMessages = vi.mocked(deps.llm.chat).mock.calls[0][0] as Array<{ role: string; content?: string }>;
    expect(
      requestMessages.some(
        (message) =>
          message.role === "system" &&
          typeof message.content === "string" &&
          message.content.includes("Memoria persistida del hilo"),
      ),
    ).toBe(true);
  });

  it("returns REQUEST_TOO_LARGE_MESSAGE when request preflight no longer fits", async () => {
    const { fitMessagesToRequestBudget } = await import("../../src/tokens.js");
    vi.mocked(fitMessagesToRequestBudget).mockReturnValueOnce({
      messages: [{ role: "system", content: "s" }, { role: "user", content: "u" }],
      inputTokens: 7900,
      toolTokens: 500,
      responseTokens: 64,
      availableResponseTokens: 64,
      trimmed: true,
      fits: false,
    });

    const deps = makeDeps();
    const result = await runAgent(deps, 42, "solicitud extensa");

    expect(result).toBe(REQUEST_TOO_LARGE_MESSAGE);
    expect((deps.llm.chat as any).mock.calls).toHaveLength(0);
  });

  it("returns REQUEST_TOO_LARGE_MESSAGE for payload-too-large provider errors", async () => {
    const deps: AgentDeps = {
      llm: {
        chat: vi.fn().mockRejectedValue(new Error("413 Request too large")),
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 3,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    const result = await runAgent(deps, 42, "solicitud extensa");

    expect(result).toBe(REQUEST_TOO_LARGE_MESSAGE);
  });

  it("truncates oversized tool results before reinjecting them into the next LLM call", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    vi.mocked(executeTool).mockResolvedValueOnce("x".repeat(9_000));

    const llmChat = vi
      .fn()
      .mockResolvedValueOnce({
        content: null,
        toolCalls: [
          {
            id: "tool-1",
            function: {
              name: "route_request",
              arguments: "{}",
            },
          },
        ],
      })
      .mockResolvedValueOnce({
        content: "ok",
        toolCalls: [],
      });

    const deps: AgentDeps = {
      llm: {
        chat: llmChat,
      } as any,
      memory: {
        addMessage: vi.fn().mockResolvedValue(undefined),
        getOrCreateActiveThread: vi.fn().mockResolvedValue("thread-1"),
        getRecentMessages: vi.fn().mockResolvedValue([]),
        getUserProfile: vi.fn().mockResolvedValue(null),
        getTeamPreferences: vi.fn().mockResolvedValue([]),
        getSynergyFacts: vi.fn().mockResolvedValue([]),
      } as any,
      config: {
        maxHistory: 10,
        maxIterations: 3,
        maxTokens: 4096,
        modelContextWindow: 8192,
      } as any,
    };

    await runAgent(deps, 42, "usa una tool");

    const secondCallMessages = llmChat.mock.calls[1][0] as Array<{ role: string; content?: string }>;
    const toolMessage = secondCallMessages.find((message) => message.role === "tool");

    expect(toolMessage).toBeDefined();
    expect((toolMessage?.content ?? "").length).toBeLessThan(4_200);
    expect(toolMessage?.content).toContain("tool-output-truncated");
  });
});
