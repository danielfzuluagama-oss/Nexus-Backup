// ============================================================================
// T042 — Unit tests for terna execution
// Covers: TS-008, TS-009, TS-010
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("../../src/ecosystem/prompt-composer.js", () => ({
  composeSystemPrompt: vi.fn(
    (agent: { name: string; role: string }) =>
      `You are ${agent.name}, ${agent.role}.`
  ),
}));

import { runTerna, executeCommittee } from "../../src/ecosystem/committee.js";
import type { AgentDefinition, SubAgentRunner } from "../../src/ecosystem/types.js";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeAgent(id: string): AgentDefinition {
  return {
    id,
    name: `Agent-${id}`,
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
  };
}

const ANALYST = makeAgent("analyst");
const RESEARCHER = makeAgent("researcher");
const SYNTHESIZER_AGENT = makeAgent("synthesizer");

const THREE_AGENTS = [ANALYST, RESEARCHER, SYNTHESIZER_AGENT];

// ---------------------------------------------------------------------------
// TS-008: Three agents execute in parallel, Synthesizer invoked with 3
//         responses, unified response within 30 seconds
// ---------------------------------------------------------------------------

describe("TS-008: Three agents execute in parallel and synthesize", () => {
  let agentCallCount: number;
  let runner: SubAgentRunner;

  beforeEach(() => {
    agentCallCount = 0;

    // First 3 calls = agent responses; subsequent call = synthesis
    runner = vi.fn().mockImplementation(
      (task: string, systemPrompt: string): Promise<string> => {
        agentCallCount++;
        if (agentCallCount <= 3) {
          // Agent response
          return Promise.resolve(`Response from agent call ${agentCallCount}`);
        }
        // Synthesis call — receives all 3 responses in the task text
        return Promise.resolve("Unified synthesized response");
      }
    );
  });

  it("returns a non-empty string response", async () => {
    const result = await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("completes within 30 seconds", async () => {
    const start = Date.now();
    await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    expect(Date.now() - start).toBeLessThan(30_000);
  });

  it("runner is called for each of the 3 agents plus once for synthesis (4 total)", async () => {
    await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    // 3 agent calls + 1 synthesis call
    expect(vi.mocked(runner).mock.calls.length).toBe(4);
  });

  it("synthesis call receives all 3 agent responses in the task string", async () => {
    await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    // The synthesis call is the 4th call — its task text contains agent sections
    const calls = vi.mocked(runner).mock.calls;
    const synthesisTask = calls[3][0] as string;
    // synthesisTask should embed all 3 agent response sections
    expect(synthesisTask).toContain("Expert 1");
    expect(synthesisTask).toContain("Expert 2");
    expect(synthesisTask).toContain("Expert 3");
  });

  it("synthesis call is made with the synthesis system prompt", async () => {
    await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    const calls = vi.mocked(runner).mock.calls;
    const synthesisPrompt = calls[3][1] as string;
    expect(synthesisPrompt.toLowerCase()).toContain("synthesi");
  });

  it("returns the synthesized output (last runner result)", async () => {
    const result = await runTerna(runner, THREE_AGENTS, "evaluate three scenarios for market entry");
    expect(result).toBe("Unified synthesized response");
  });
});

// ---------------------------------------------------------------------------
// TS-009: One agent times out → Synthesizer invoked with 2 responses,
//         output contains note about unavailable agent
// ---------------------------------------------------------------------------

describe("TS-009: Degrade to two agents on single timeout", () => {
  let runner: SubAgentRunner;

  beforeEach(() => {
    // researcher (second agent) times out (rejects); analyst and synthesizer succeed
    let agentCallIndex = 0;

    runner = vi.fn().mockImplementation(
      (task: string, systemPrompt: string): Promise<string> => {
        agentCallIndex++;

        // The three agents are dispatched in order: analyst, researcher, synthesizer
        if (agentCallIndex === 1) {
          // analyst — succeeds
          return Promise.resolve("expand now — analyst perspective");
        }
        if (agentCallIndex === 2) {
          // researcher — times out (simulated by rejection)
          return Promise.reject(new Error("Agent timed out after 30 seconds"));
        }
        if (agentCallIndex === 3) {
          // synthesizer agent — succeeds
          return Promise.resolve("synthesizer agent perspective");
        }

        // 4th call — synthesis invocation
        return Promise.resolve(
          "Synthesized response. Note: one agent response was unavailable."
        );
      }
    );
  });

  it("returns a string response despite one agent timing out", async () => {
    const result = await runTerna(runner, THREE_AGENTS, "market entry strategy");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("synthesis is called with only 2 responses (timeout agent excluded)", async () => {
    await runTerna(runner, THREE_AGENTS, "market entry strategy");
    const calls = vi.mocked(runner).mock.calls;
    // 3 agent attempts + 1 synthesis = 4 total calls
    // (The timed-out agent still counts as an attempt via Promise.allSettled)
    const synthesisCall = calls.find((call, idx) => {
      // The synthesis task includes "Original question:" preamble
      return (call[0] as string).includes("Original question:");
    });
    expect(synthesisCall).toBeDefined();
    const synthesisTask = synthesisCall![0] as string;
    // Should have Expert 1 and Expert 2 but NOT Expert 3 (only 2 responded)
    expect(synthesisTask).toContain("Expert 1");
    expect(synthesisTask).toContain("Expert 2");
    expect(synthesisTask).not.toContain("Expert 3");
  });

  it("synthesis task contains an explicit instruction to note the unavailable agent", async () => {
    await runTerna(runner, THREE_AGENTS, "market entry strategy");
    const calls = vi.mocked(runner).mock.calls;
    const synthesisCall = calls.find((call) =>
      (call[0] as string).includes("Original question:")
    );
    expect(synthesisCall).toBeDefined();
    const synthesisTask = synthesisCall![0] as string;
    // Production code must inject a gap annotation so the LLM knows to note the missing agent
    expect(synthesisTask.toLowerCase()).toContain("unavailable");
  });

  it("synthesized output contains an explicit note that one agent response was unavailable", async () => {
    const result = await runTerna(runner, THREE_AGENTS, "market entry strategy");
    // Mock returns a string with "unavailable" — verifies the contract end-to-end
    const lowerResult = result.toLowerCase();
    expect(
      lowerResult.includes("unavailable") ||
      lowerResult.includes("timed out") ||
      lowerResult.includes("not available") ||
      lowerResult.includes("did not respond")
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// TS-010: Two agents produce contradictory conclusions → both preserved
//         with agent name attribution
// ---------------------------------------------------------------------------

describe("TS-010: Preserve contradictory perspectives with attribution", () => {
  it("synthesis task contains both contradictory perspectives labeled with agent IDs", async () => {
    // Analyst says "expand now", researcher says "wait six months"
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex === 1) return Promise.resolve("expand now");
        if (callIndex === 2) return Promise.resolve("wait six months");
        if (callIndex === 3) return Promise.resolve("third perspective");
        // Synthesis call — return something that includes both perspectives
        return Promise.resolve(
          "Agent-analyst: expand now\nAgent-researcher: wait six months\nSynthesis: both views considered."
        );
      }
    );

    const result = await runTerna(runner, THREE_AGENTS, "should we expand?");

    // Verify synthesis call was made with both agent labels in the task
    const calls = vi.mocked(runner).mock.calls;
    const synthesisCall = calls.find((call) =>
      (call[0] as string).includes("Original question:")
    );
    expect(synthesisCall).toBeDefined();
    const synthesisTask = synthesisCall![0] as string;

    // Both agent IDs must appear in the synthesis task for attribution
    expect(synthesisTask).toContain("analyst");
    expect(synthesisTask).toContain("researcher");
  });

  it("synthesis task preserves both contradictory response texts", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex === 1) return Promise.resolve("expand now");
        if (callIndex === 2) return Promise.resolve("wait six months");
        if (callIndex === 3) return Promise.resolve("neutral assessment");
        return Promise.resolve("synthesis result");
      }
    );

    await runTerna(runner, THREE_AGENTS, "should we expand?");

    const calls = vi.mocked(runner).mock.calls;
    const synthesisCall = calls.find((call) =>
      (call[0] as string).includes("Original question:")
    );
    const synthesisTask = synthesisCall![0] as string;

    // Both verbatim responses must be embedded in the synthesis task
    expect(synthesisTask).toContain("expand now");
    expect(synthesisTask).toContain("wait six months");
  });

  it("final output contains both contradictory conclusions with agent name prefix", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (): Promise<string> => {
        callIndex++;
        if (callIndex === 1) return Promise.resolve("expand now");
        if (callIndex === 2) return Promise.resolve("wait six months");
        if (callIndex === 3) return Promise.resolve("neutral assessment");
        // Synthesis output must attribute each perspective to its agent
        return Promise.resolve(
          "**Agent-analyst**: expand now\n**Agent-researcher**: wait six months\nOverall synthesis follows."
        );
      }
    );

    const result = await runTerna(runner, [ANALYST, RESEARCHER, SYNTHESIZER_AGENT], "should we expand?");

    // The result must contain both agent names as attribution prefixes
    expect(result).toContain("analyst");
    expect(result).toContain("researcher");
    // And both contradictory texts
    expect(result).toContain("expand now");
    expect(result).toContain("wait six months");
  });
});

// ============================================================================
// T046 — Unit tests for committee execution (executeCommittee)
// Covers: TS-011, TS-012, TS-013
// ============================================================================

// Five committee agents fixture
function makeCommitteeAgents(): AgentDefinition[] {
  return ["alpha", "beta", "gamma", "delta", "epsilon"].map((id) => ({
    id,
    name: `Agent-${id}`,
    role: `Committee member ${id}`,
    version: "1.0.0",
    mission: `Deliberate on behalf of ${id}`,
    mandate: [`Mandate for ${id}`],
    scope: [`scope-${id}`],
    nonGoals: [],
    inputs: ["text"],
    outputs: ["text"],
    decisionRights: [],
    allowedTools: [],
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
  }));
}

// ---------------------------------------------------------------------------
// TS-011: 5 agents respond → result includes consensusStatus field
// ---------------------------------------------------------------------------

describe("TS-011: Five agents produce deliberation with consensusStatus", () => {
  const VALID_STATUSES = ["strong", "majority", "split", "disagreement"] as const;

  it("result includes a consensusStatus field", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex <= 5) {
        // All 5 agents agree: recommend B
        return Promise.resolve("I recommend B for this task.");
      }
      // Synthesis call
      return Promise.resolve("All agents agree: recommend B.");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "critical decision");

    expect(result).toHaveProperty("consensusStatus");
  });

  it("consensusStatus is one of: strong, majority, split, disagreement", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex <= 5) {
        return Promise.resolve("I recommend B for this task.");
      }
      return Promise.resolve("Synthesis: recommend B.");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "critical decision");

    expect(VALID_STATUSES).toContain(result.consensusStatus);
  });

  it("returns strong consensus when all 5 agents agree", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex <= 5) {
        // All agents recommend B — same label, should produce "strong"
        return Promise.resolve("I recommend B for this task.");
      }
      // Tiebreaker or synthesis call
      return Promise.resolve("CONSENSUS_REACHED");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "should we expand?");

    expect(result.consensusStatus).toBe("strong");
  });

  it("returns majority consensus when 4 of 5 agents agree", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex === 1) return Promise.resolve("I recommend A.");
      if (callIndex <= 5) return Promise.resolve("I recommend B for this task.");
      return Promise.resolve("CONSENSUS_REACHED");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "should we expand?");

    // 4/5 = 80% → strong or majority depending on threshold
    expect(["strong", "majority"]).toContain(result.consensusStatus);
  });

  it("result includes all 5 deliberations when all agents respond", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex <= 5) return Promise.resolve(`Agent ${callIndex} says recommend B.`);
      return Promise.resolve("CONSENSUS_REACHED");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "critical decision");

    expect(result.deliberations).toHaveLength(5);
  });

  it("finalResponse is a non-empty string", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation((): Promise<string> => {
      callIndex++;
      if (callIndex <= 5) return Promise.resolve("I recommend B.");
      return Promise.resolve("Final answer: B.");
    });

    const result = await executeCommittee(runner, makeCommitteeAgents(), "critical decision");

    expect(typeof result.finalResponse).toBe("string");
    expect(result.finalResponse.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// TS-012: 2 agents recommend A (factually stronger), 3 recommend B →
//         tiebreaker picks A via "factual accuracy" criterion
// ---------------------------------------------------------------------------

describe("TS-012: Tiebreaker resolves split with documented factual accuracy criterion", () => {
  it("tiebreaker runner receives a prompt referencing factual accuracy", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string, systemPrompt: string): Promise<string> => {
        callIndex++;
        if (callIndex === 1 || callIndex === 2) {
          // Alpha and beta recommend A with strong factual backing
          return Promise.resolve("I recommend A — it is factually supported by the data.");
        }
        if (callIndex <= 5) {
          // Gamma, delta, epsilon recommend B (majority)
          return Promise.resolve("I recommend B for this task.");
        }
        // Synthesis call
        if (task.includes("Synthesize")) return Promise.resolve("Synthesis: majority recommend B.");
        // Tiebreaker call — should reference factual accuracy
        return Promise.resolve("A — factual accuracy supports the minority recommendation.");
      }
    );

    await executeCommittee(runner, makeCommitteeAgents(), "choose A or B");

    // Find the tiebreaker call: it's the one whose systemPrompt mentions "factual accuracy"
    const calls = vi.mocked(runner).mock.calls;
    const tiebreakerCall = calls.find(
      ([, sysPrompt]) =>
        typeof sysPrompt === "string" &&
        sysPrompt.toLowerCase().includes("factual accuracy")
    );

    expect(tiebreakerCall).toBeDefined();
  });

  it("tiebreaker task includes the criterion label 'factual accuracy'", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex <= 2) return Promise.resolve("I recommend A — factual evidence supports A.");
        if (callIndex <= 5) return Promise.resolve("I recommend B for this task.");
        if (task.includes("Synthesize")) return Promise.resolve("Synthesis: B is preferred.");
        return Promise.resolve("A — factual accuracy supports A.");
      }
    );

    await executeCommittee(runner, makeCommitteeAgents(), "choose A or B");

    const calls = vi.mocked(runner).mock.calls;
    const tiebreakerCall = calls.find(([task]) =>
      typeof task === "string" && task.toLowerCase().includes("factual accuracy")
    );

    expect(tiebreakerCall).toBeDefined();
    const tiebreakerTask = tiebreakerCall![0] as string;
    expect(tiebreakerTask.toLowerCase()).toContain("factual accuracy");
  });

  it("tiebreakerCriterion in result is 'factual accuracy'", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex <= 2) return Promise.resolve("I recommend A.");
        if (callIndex <= 5) return Promise.resolve("I recommend B for this task.");
        if (task.includes("Synthesize")) return Promise.resolve("Synthesis: majority B.");
        // Tiebreaker returns A (overrides majority)
        return Promise.resolve("Recommendation A — stronger factual grounding.");
      }
    );

    const result = await executeCommittee(runner, makeCommitteeAgents(), "choose A or B");

    expect(result.tiebreakerCriterion).toBe("factual accuracy");
  });

  it("winning finalResponse is A when tiebreaker returns A", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex <= 2) return Promise.resolve("I recommend A.");
        if (callIndex <= 5) return Promise.resolve("I recommend B for this task.");
        // Synthesis call: task ends with "Synthesize these perspectives..."
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Synthesis: majority prefer B.");
        }
        // Tiebreaker decides A (references factual accuracy criterion)
        return Promise.resolve("Final recommendation: A");
      }
    );

    const result = await executeCommittee(runner, makeCommitteeAgents(), "choose A or B");

    expect(result.finalResponse).toContain("A");
    expect(result.tiebreaker).not.toBeNull();
  });

  it("logger records 'factual accuracy' during tiebreaker execution", async () => {
    const { logger } = await import("../../src/logger.js");
    vi.mocked(logger.info).mockClear();

    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (callIndex <= 2) return Promise.resolve("I recommend A.");
        if (callIndex <= 5) return Promise.resolve("I recommend B for this task.");
        if (task.includes("Synthesize")) return Promise.resolve("Synthesis.");
        return Promise.resolve("Recommendation: A");
      }
    );

    await executeCommittee(runner, makeCommitteeAgents(), "choose A or B");

    // Check that logger.info was called with 'factual accuracy' somewhere
    const logCalls = vi.mocked(logger.info).mock.calls;
    const tiebreakerLog = logCalls.find(([msg, meta]) => {
      if (typeof msg === "string" && msg.toLowerCase().includes("tiebreaker")) return true;
      if (meta && typeof meta === "object" && JSON.stringify(meta).includes("factual accuracy")) return true;
      return false;
    });

    expect(tiebreakerLog).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// TS-013: Committee exceeds 60s → degrades to terna with first 3 responders,
//         log records "committee timeout"
// ---------------------------------------------------------------------------

describe("TS-013: Committee degrades to terna on timeout", () => {
  it("returns degradationReason 'committee timeout' in result", async () => {
    // 3 fast agents resolve immediately; 2 slow agents never resolve within test timeout
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        // Synthesis call (post-degradation) — must resolve
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Degraded synthesis.");
        }
        if (callIndex <= 3) {
          // Fast agents — resolve as microtasks
          return Promise.resolve(`Fast agent ${callIndex} response`);
        }
        // Slow agents — never resolve (hang forever)
        return new Promise<string>(() => {/* intentionally never resolves */});
      }
    );

    // Use very small timeoutMs so the timeout fires after fast agents resolve
    // but while slow agents are still pending
    const result = await executeCommittee(
      runner,
      makeCommitteeAgents(),
      "critical decision",
      50 // 50ms timeout
    );

    expect(result.degradationReason).toBe("committee timeout");
  }, 10_000);

  it("uses at most 3 agents when committee times out", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Degraded synthesis.");
        }
        if (callIndex <= 3) {
          return Promise.resolve(`Fast agent ${callIndex} response`);
        }
        return new Promise<string>(() => {/* never resolves */});
      }
    );

    const result = await executeCommittee(
      runner,
      makeCommitteeAgents(),
      "critical decision",
      50
    );

    expect(result.deliberations.length).toBeLessThanOrEqual(3);
    expect(result.deliberations.length).toBeGreaterThan(0);
  }, 10_000);

  it("logger records degradation reason 'committee timeout'", async () => {
    const { logger } = await import("../../src/logger.js");
    vi.mocked(logger.info).mockClear();
    vi.mocked(logger.warn).mockClear();

    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Degraded synthesis.");
        }
        if (callIndex <= 3) return Promise.resolve(`Fast agent ${callIndex}`);
        return new Promise<string>(() => {/* never resolves */});
      }
    );

    await executeCommittee(runner, makeCommitteeAgents(), "critical decision", 50);

    // warn log should mention timed out
    const warnCalls = vi.mocked(logger.warn).mock.calls;
    const timeoutWarn = warnCalls.find(([msg]) =>
      typeof msg === "string" && msg.toLowerCase().includes("timed out")
    );
    expect(timeoutWarn).toBeDefined();

    // info log should record "committee timeout" as degradation reason
    const infoCalls = vi.mocked(logger.info).mock.calls;
    const degradationLog = infoCalls.find(([msg, meta]) => {
      if (typeof msg === "string" && msg.toLowerCase().includes("degraded")) return true;
      if (meta && typeof meta === "object" && JSON.stringify(meta).includes("committee timeout")) return true;
      return false;
    });
    expect(degradationLog).toBeDefined();
  }, 10_000);

  it("finalResponse is synthesized from the first 3 responders", async () => {
    let callIndex = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callIndex++;
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Synthesis of first 3 responders.");
        }
        if (callIndex <= 3) return Promise.resolve(`Fast agent ${callIndex} response`);
        return new Promise<string>(() => {/* never resolves */});
      }
    );

    const result = await executeCommittee(
      runner,
      makeCommitteeAgents(),
      "critical decision",
      50
    );

    expect(typeof result.finalResponse).toBe("string");
    expect(result.finalResponse.length).toBeGreaterThan(0);
  }, 10_000);

  it("first 3 responders are the agents that resolved earliest", async () => {
    // Only alpha, beta, gamma resolve in time; delta and epsilon hang
    const agents = makeCommitteeAgents(); // alpha, beta, gamma, delta, epsilon
    const fastIds = new Set(["alpha", "beta", "gamma"]);

    let callNum = 0;
    const runner: SubAgentRunner = vi.fn().mockImplementation(
      (task: string): Promise<string> => {
        callNum++;
        if (task.includes("Synthesize these perspectives")) {
          return Promise.resolve("Degraded synthesis result.");
        }
        // agents dispatched in order: alpha=1, beta=2, gamma=3, delta=4, epsilon=5
        if (callNum <= 3) return Promise.resolve(`Agent ${callNum} fast response`);
        return new Promise<string>(() => {/* slow - never resolves */});
      }
    );

    const result = await executeCommittee(runner, agents, "critical decision", 50);

    // Deliberations should be the first 3 agents in order
    expect(result.deliberations.length).toBeLessThanOrEqual(3);
    for (const d of result.deliberations) {
      expect(fastIds).toContain(d.agentId);
    }
  }, 10_000);
});
