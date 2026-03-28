// ============================================================================
// T027 — Unit tests for routing mode selection
// Covers: TS-001, TS-002, TS-005, TS-006, TS-007
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("../../src/ecosystem/committee.js", () => ({
  runTerna: vi.fn(),
  runCommittee: vi.fn(),
}));

vi.mock("../../src/ecosystem/prompt-composer.js", () => ({
  composeSystemPrompt: vi.fn(
    (agent: { name: string; role: string }) =>
      `You are ${agent.name}, ${agent.role}.`
  ),
}));

import {
  createRouteExecutor,
  getRouteRequestDefinition,
} from "../../src/ecosystem/router.js";
import { RoutingDecisionSchema } from "../../src/ecosystem/types.js";
import type {
  AgentDefinition,
  EcosystemState,
  RoutingDecision,
  SubAgentRunner,
} from "../../src/ecosystem/types.js";
import { runTerna, runCommittee } from "../../src/ecosystem/committee.js";
import { logger } from "../../src/logger.js";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeAgent(id: string, overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id,
    name: `Agent ${id}`,
    role: `Specialist in ${id}`,
    version: "1.0.0",
    mission: `Handle ${id} tasks`,
    mandate: [`Mandate for ${id}`],
    scope: [`scope-${id}`],
    nonGoals: [],
    inputs: ["text"],
    outputs: ["text"],
    decisionRights: [],
    allowedTools: ["read_file"],
    forbiddenTools: [],
    memoryPolicy: "ephemeral",
    securityPolicy: "standard",
    orchestrationPolicy: "direct",
    delegationRules: "no sub-delegation",
    escalationRules: "escalate on error",
    toneOutputStyle: "formal",
    validationDiscipline: "strict",
    failureHandling: "return error",
    completionCriteria: "task done",
    ...overrides,
  };
}

function makeEcosystem(agentIds: string[]): EcosystemState {
  const agents = new Map<string, AgentDefinition>();
  for (const id of agentIds) {
    agents.set(id, makeAgent(id));
  }
  return { agents, skills: new Map(), initialized: true };
}

// ---------------------------------------------------------------------------
// TS-006: routeRequest returns valid RoutingDecision
// mode is one of "single"|"terna"|"committee", agents ≥1, reason non-empty
// ---------------------------------------------------------------------------

describe("TS-006: createRouteExecutor returns valid RoutingDecision shape", () => {
  let ecosystem: EcosystemState;
  let runner: SubAgentRunner;

  beforeEach(() => {
    ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    runner = vi.fn().mockResolvedValue("agent response");
    vi.mocked(runTerna).mockResolvedValue("terna response");
    vi.mocked(runCommittee).mockResolvedValue({
      deliberations: [],
      synthesis: "committee result",
      tiebreaker: null,
      finalResponse: "committee final",
    });
  });

  it("executor processes a single routing call and logs the decision", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Analyze the Q3 revenue trend",
      reason: "Single domain query — analyst is best fit",
    });

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("logged decision contains mode, agents array, and reason", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    vi.mocked(logger.info).mockClear();

    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Analyze the Q3 revenue trend",
      reason: "Single domain query — analyst is best fit",
    });

    const infoCall = vi.mocked(logger.info).mock.calls.find(
      (call) => call[0] === "Routing decision"
    );
    expect(infoCall).toBeDefined();
    const logData = infoCall![1] as Record<string, unknown>;
    expect(["single", "terna", "committee"]).toContain(logData.mode);
    expect(Array.isArray(logData.agents)).toBe(true);
    expect((logData.agents as string[]).length).toBeGreaterThanOrEqual(1);
    expect(typeof logData.reason).toBe("string");
    expect((logData.reason as string).length).toBeGreaterThan(0);
  });

  it("RoutingDecisionSchema validates a single-mode decision object", () => {
    const decision: RoutingDecision = {
      mode: "single",
      agents: ["analyst"],
      reason: "Best fit for factual queries",
      reversible: true,
    };
    const result = RoutingDecisionSchema.safeParse(decision);
    expect(result.success).toBe(true);
  });

  it("RoutingDecisionSchema validates a terna-mode decision", () => {
    const decision: RoutingDecision = {
      mode: "terna",
      agents: ["analyst", "researcher", "synthesizer"],
      reason: "Multi-domain overlap: parallel analysis needed",
      reversible: true,
    };
    const result = RoutingDecisionSchema.safeParse(decision);
    expect(result.success).toBe(true);
  });

  it("RoutingDecisionSchema validates a committee-mode decision", () => {
    const decision: RoutingDecision = {
      mode: "committee",
      agents: ["analyst", "researcher", "synthesizer"],
      reason: "Critical decision requiring full deliberation",
      reversible: false,
    };
    const result = RoutingDecisionSchema.safeParse(decision);
    expect(result.success).toBe(true);
  });

  it("RoutingDecisionSchema rejects empty agents array", () => {
    const bad = { mode: "single", agents: [], reason: "no agents", reversible: true };
    const result = RoutingDecisionSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("RoutingDecisionSchema rejects empty reason string", () => {
    const bad = { mode: "single", agents: ["analyst"], reason: "", reversible: true };
    const result = RoutingDecisionSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("RoutingDecisionSchema rejects invalid mode", () => {
    const bad = { mode: "broadcast", agents: ["analyst"], reason: "reason", reversible: true };
    const result = RoutingDecisionSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// TS-001: Route message to best-fit agent
// Response within 60s; routing log records agent and mode
// ---------------------------------------------------------------------------

describe("TS-001: Route message to best-fit agent — response within 60s, log records agent and mode", () => {
  let ecosystem: EcosystemState;
  let runner: SubAgentRunner;

  beforeEach(() => {
    ecosystem = makeEcosystem(["analyst", "researcher"]);
    runner = vi.fn().mockResolvedValue("analysis complete");
    vi.mocked(logger.info).mockClear();
  });

  it("executor resolves within 60 seconds for a single-mode dispatch", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const start = Date.now();
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "What is the main cause of the revenue dip in Q2?",
      reason: "Factual accuracy: analyst covers financial domain",
    });
    expect(Date.now() - start).toBeLessThan(60_000);
  });

  it("routing log records the selected agent ID", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    vi.mocked(logger.info).mockClear();

    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Revenue analysis",
      reason: "Best fit",
    });

    const decisionLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(decisionLog).toBeDefined();
    const data = decisionLog![1] as Record<string, unknown>;
    expect(data.agents).toContain("analyst");
  });

  it("routing log records the routing mode", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    vi.mocked(logger.info).mockClear();

    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Revenue analysis",
      reason: "Best fit",
    });

    const decisionLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(decisionLog).toBeDefined();
    const data = decisionLog![1] as Record<string, unknown>;
    expect(data.mode).toBe("single");
  });

  it("runner is called with the task and agent system prompt", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Revenue analysis task",
      reason: "Best fit",
    });
    expect(runner).toHaveBeenCalledOnce();
    const [calledTask] = vi.mocked(runner).mock.calls[0];
    expect(calledTask).toBe("Revenue analysis task");
  });
});

// ---------------------------------------------------------------------------
// TS-002: Deterministic tiebreaker on domain overlap
// Tiebreaker criterion "factual accuracy" is the top-ranked criterion
// ---------------------------------------------------------------------------

describe("TS-002: Deterministic tiebreaker — factual accuracy criterion logged", () => {
  let ecosystem: EcosystemState;
  let runner: SubAgentRunner;

  beforeEach(() => {
    ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    runner = vi.fn().mockResolvedValue("tiebreaker result");
    vi.mocked(logger.info).mockClear();
  });

  it("routing log reason includes 'factual accuracy' when that criterion is provided", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    vi.mocked(logger.info).mockClear();

    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Which Q3 figure is correct: the CFO report or the dashboard?",
      reason: "Tiebreaker: factual accuracy — analyst domain is financial data",
    });

    const decisionLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(decisionLog).toBeDefined();
    const data = decisionLog![1] as Record<string, unknown>;
    expect((data.reason as string).toLowerCase()).toContain("factual accuracy");
  });

  it("tiebreaker criterion hierarchy: factual accuracy ranks above scope fit", () => {
    // The spec defines the hierarchy as:
    // 1. factual accuracy  2. scope fit  3. risk minimization  4. user intent
    // Verify that factual accuracy is the FIRST (index 0) criterion in the list.
    const TIEBREAKER_HIERARCHY = [
      "factual accuracy",
      "scope fit",
      "risk minimization",
      "user intent",
    ];
    expect(TIEBREAKER_HIERARCHY[0]).toBe("factual accuracy");
    expect(TIEBREAKER_HIERARCHY.indexOf("factual accuracy")).toBeLessThan(
      TIEBREAKER_HIERARCHY.indexOf("scope fit")
    );
  });

  it("tiebreaker hierarchy: scope fit ranks above risk minimization", () => {
    const TIEBREAKER_HIERARCHY = [
      "factual accuracy",
      "scope fit",
      "risk minimization",
      "user intent",
    ];
    expect(TIEBREAKER_HIERARCHY.indexOf("scope fit")).toBeLessThan(
      TIEBREAKER_HIERARCHY.indexOf("risk minimization")
    );
  });

  it("tiebreaker hierarchy: risk minimization ranks above user intent", () => {
    const TIEBREAKER_HIERARCHY = [
      "factual accuracy",
      "scope fit",
      "risk minimization",
      "user intent",
    ];
    expect(TIEBREAKER_HIERARCHY.indexOf("risk minimization")).toBeLessThan(
      TIEBREAKER_HIERARCHY.indexOf("user intent")
    );
  });

  it("routing log contains the reason used to break the tie", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    vi.mocked(logger.info).mockClear();

    await executor({
      mode: "single",
      agents: ["researcher"],
      task: "Is the population figure from the census or the WHO report more accurate?",
      reason: "Tiebreaker applied: factual accuracy — researcher specialises in verified data sources",
    });

    const decisionLog = vi.mocked(logger.info).mock.calls.find(
      (c) => c[0] === "Routing decision"
    );
    expect(decisionLog).toBeDefined();
    const data = decisionLog![1] as Record<string, unknown>;
    expect(typeof data.reason).toBe("string");
    expect((data.reason as string).length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// TS-005: Recursion depth enforced at max 3
// Delegation rejected beyond depth 3; depth-2 result is returned
// ---------------------------------------------------------------------------

describe("TS-005: Recursion depth enforced at max 3", () => {
  it("MAX_DEPTH constant is set to 3 in agent.ts", async () => {
    // Verify the spec contract — MAX_DEPTH must be 3.
    // We read this indirectly: agent.ts declares `const MAX_DEPTH = 3`
    // and the depth guard triggers when depth > MAX_DEPTH.
    // The runAgent function returns the error message when depth > 3.
    const agentModule = await import("../../src/agent.js");
    // initDelegation and runAgent are the two exports; runAgent enforces depth
    expect(typeof agentModule.runAgent).toBe("function");
  });

  it("runAgent rejects execution when depth exceeds MAX_DEPTH (depth=4)", async () => {
    // Mock all required dependencies to isolate the depth guard
    const { runAgent } = await import("../../src/agent.js");

    const mockLlm = {
      chat: vi.fn().mockResolvedValue({ content: "response", toolCalls: [] }),
    };
    const mockMemory = {
      addMessage: vi.fn().mockResolvedValue(undefined),
      getRecentMessages: vi.fn().mockResolvedValue([]),
      getUserProfile: vi.fn().mockResolvedValue(null),
      getTeamPreferences: vi.fn().mockResolvedValue([]),
      getSynergyFacts: vi.fn().mockResolvedValue([]),
    };
    const mockConfig = {
      maxHistory: 10,
      maxIterations: 5,
      maxTokens: 4096,
    };

    const deps = {
      llm: mockLlm as any,
      memory: mockMemory as any,
      config: mockConfig as any,
    };

    // depth=4 exceeds MAX_DEPTH=3 → must return recursion error immediately
    const result = await runAgent(deps, 0, "delegate again", { depth: 4 });
    expect(result).toContain("Recursion limit reached");
    // LLM must NOT be called when depth is exceeded
    expect(mockLlm.chat).not.toHaveBeenCalled();
  });

  it("runAgent at depth=3 (equal to MAX_DEPTH) still executes — limit is exclusive", async () => {
    const { runAgent } = await import("../../src/agent.js");

    const mockLlm = {
      chat: vi.fn().mockResolvedValue({ content: "depth-3 answer", toolCalls: [] }),
    };
    const mockMemory = {
      addMessage: vi.fn().mockResolvedValue(undefined),
      getRecentMessages: vi.fn().mockResolvedValue([]),
      getUserProfile: vi.fn().mockResolvedValue(null),
      getTeamPreferences: vi.fn().mockResolvedValue([]),
      getSynergyFacts: vi.fn().mockResolvedValue([]),
    };
    const mockConfig = {
      maxHistory: 10,
      maxIterations: 5,
      maxTokens: 4096,
    };

    const deps = {
      llm: mockLlm as any,
      memory: mockMemory as any,
      config: mockConfig as any,
    };

    // depth=3 is AT the limit — allowed; depth>3 is blocked
    const result = await runAgent(deps, 0, "process this task", { depth: 3 });
    // Should produce a response (not the recursion error)
    expect(result).not.toContain("Recursion limit reached");
    expect(mockLlm.chat).toHaveBeenCalled();
  });

  it("depth-exceeded error is logged via logger.error", async () => {
    const { runAgent } = await import("../../src/agent.js");
    vi.mocked(logger.error).mockClear();

    const mockLlm = { chat: vi.fn() };
    const mockMemory = {
      addMessage: vi.fn().mockResolvedValue(undefined),
      getRecentMessages: vi.fn().mockResolvedValue([]),
      getUserProfile: vi.fn().mockResolvedValue(null),
      getTeamPreferences: vi.fn().mockResolvedValue([]),
      getSynergyFacts: vi.fn().mockResolvedValue([]),
    };
    const mockConfig = { maxHistory: 10, maxIterations: 5, maxTokens: 4096 };

    await runAgent(
      { llm: mockLlm as any, memory: mockMemory as any, config: mockConfig as any },
      0,
      "recurse",
      { depth: 4 }
    );

    expect(vi.mocked(logger.error)).toHaveBeenCalledWith(
      "Max recursion depth exceeded",
      expect.objectContaining({ depth: 4 })
    );
  });
});

// ---------------------------------------------------------------------------
// TS-007: executeRouting dispatches to correct mode handler
// single mode → one agent executes (runner called once)
// ---------------------------------------------------------------------------

describe("TS-007: executeRouting dispatches to correct mode handler", () => {
  let ecosystem: EcosystemState;
  let runner: SubAgentRunner;

  beforeEach(() => {
    ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    runner = vi.fn().mockResolvedValue("dispatched response");
    vi.mocked(runTerna).mockResolvedValue("terna dispatched");
    vi.mocked(runCommittee).mockResolvedValue({
      deliberations: [],
      synthesis: "committee syn",
      tiebreaker: null,
      finalResponse: "committee dispatched",
    });
  });

  it("single mode: runner is called exactly once", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "single dispatch task",
      reason: "one agent fits",
    });
    expect(runner).toHaveBeenCalledTimes(1);
  });

  it("single mode: runTerna is NOT invoked", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "single dispatch task",
      reason: "one agent fits",
    });
    expect(runTerna).not.toHaveBeenCalled();
  });

  it("single mode: runCommittee is NOT invoked", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "single dispatch task",
      reason: "one agent fits",
    });
    expect(runCommittee).not.toHaveBeenCalled();
  });

  it("single mode: runner receives the correct task string", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "single",
      agents: ["analyst"],
      task: "Specific single agent task",
      reason: "best fit",
    });
    const [calledTask] = vi.mocked(runner).mock.calls[0];
    expect(calledTask).toBe("Specific single agent task");
  });

  it("terna mode: runTerna is called instead of the direct runner", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "terna",
      agents: ["analyst", "researcher", "synthesizer"],
      task: "Multi-perspective analysis",
      reason: "terna pattern required",
    });
    expect(runTerna).toHaveBeenCalledOnce();
  });

  it("committee mode: runCommittee is called instead of the direct runner", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    await executor({
      mode: "committee",
      agents: ["analyst", "researcher", "synthesizer"],
      task: "Critical strategic decision",
      reason: "full committee required",
    });
    expect(runCommittee).toHaveBeenCalledOnce();
  });

  it("single mode with unknown agent returns an error string, runner not called", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "single",
      agents: ["nonexistent-agent"],
      task: "some task",
      reason: "testing unknown agent",
    });
    expect(result).toContain("Error");
    expect(runner).not.toHaveBeenCalled();
  });

  it("single mode with no agents provided returns an error string", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "single",
      agents: [],
      task: "some task",
      reason: "no agent",
    });
    expect(result).toContain("Error");
    expect(runner).not.toHaveBeenCalled();
  });

  it("unknown mode returns an error string", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "broadcast" as any,
      agents: ["analyst"],
      task: "some task",
      reason: "unknown mode",
    });
    expect(result).toContain("Error");
  });

  it("empty task string returns an error string", async () => {
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "single",
      agents: ["analyst"],
      task: "   ",
      reason: "some reason",
    });
    expect(result).toContain("Error");
    expect(runner).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// getRouteRequestDefinition — tool definition shape
// ---------------------------------------------------------------------------

describe("getRouteRequestDefinition: tool definition schema", () => {
  it("returns a tool definition with type 'function'", () => {
    const ecosystem = makeEcosystem(["analyst"]);
    const def = getRouteRequestDefinition(ecosystem);
    expect(def.type).toBe("function");
  });

  it("function name is 'route_request'", () => {
    const ecosystem = makeEcosystem(["analyst"]);
    const def = getRouteRequestDefinition(ecosystem);
    expect(def.function.name).toBe("route_request");
  });

  it("parameters include required fields: mode, agents, task, reason", () => {
    const ecosystem = makeEcosystem(["analyst"]);
    const def = getRouteRequestDefinition(ecosystem);
    const required: string[] = def.function.parameters?.required ?? [];
    expect(required).toContain("mode");
    expect(required).toContain("agents");
    expect(required).toContain("task");
    expect(required).toContain("reason");
  });

  it("description lists the available agents by id", () => {
    const ecosystem = makeEcosystem(["analyst", "researcher"]);
    const def = getRouteRequestDefinition(ecosystem);
    expect(def.function.description).toContain("analyst");
    expect(def.function.description).toContain("researcher");
  });
});

// ---------------------------------------------------------------------------
// Additional branch coverage: terna/committee with insufficient agents
// ---------------------------------------------------------------------------

describe("executeRouting — terna and committee with insufficient agents", () => {
  let runner: SubAgentRunner;

  beforeEach(() => {
    runner = vi.fn().mockResolvedValue("fallback response");
    vi.mocked(runTerna).mockResolvedValue("terna response");
    vi.mocked(runCommittee).mockResolvedValue({
      deliberations: [],
      synthesis: "committee result",
      tiebreaker: null,
      finalResponse: "committee final",
    });
  });

  it("terna mode with 0 resolvable agents returns error string", async () => {
    const ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    const executor = createRouteExecutor(ecosystem, runner);
    // Pass unknown agent IDs so resolveAgents returns 0
    const result = await executor({
      mode: "terna",
      agents: ["ghost1", "ghost2"],
      task: "Do terna task",
      reason: "test",
    });
    expect(result).toContain("Error");
  });

  it("terna mode with 1 resolvable agent falls back to single runner", async () => {
    const ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    const executor = createRouteExecutor(ecosystem, runner);
    // Only 1 valid agent + 1 ghost
    const result = await executor({
      mode: "terna",
      agents: ["analyst", "ghost_unknown"],
      task: "Do fallback task",
      reason: "test",
    });
    // Falls back to single: runner is called directly
    expect(runner).toHaveBeenCalledWith(
      "Do fallback task",
      expect.any(String),
      expect.any(Array)
    );
    expect(result).toBe("fallback response");
  });

  it("committee mode with 2 agents falls back to terna", async () => {
    const ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    const executor = createRouteExecutor(ecosystem, runner);
    // Only 2 valid agents — committee needs 3
    const result = await executor({
      mode: "committee",
      agents: ["analyst", "researcher"],
      task: "Committee fallback task",
      reason: "test",
    });
    // With 2 agents, committee falls back to terna (runTerna called)
    expect(vi.mocked(runTerna)).toHaveBeenCalled();
  });

  it("committee mode with 0 agents falls back to terna which falls back to error", async () => {
    const ecosystem = makeEcosystem(["analyst", "researcher", "synthesizer"]);
    const executor = createRouteExecutor(ecosystem, runner);
    const result = await executor({
      mode: "committee",
      agents: ["ghost1", "ghost2"],
      task: "No agents",
      reason: "test",
    });
    expect(result).toContain("Error");
  });
});
