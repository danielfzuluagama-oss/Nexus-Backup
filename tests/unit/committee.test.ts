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

import { runTerna } from "../../src/ecosystem/committee.js";
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
