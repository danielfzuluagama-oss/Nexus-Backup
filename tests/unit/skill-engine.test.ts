import { describe, it, expect, vi, beforeEach } from "vitest";
import { executeWorkflow } from "../../src/ecosystem/skill-engine.js";
import type { WorkflowDefinition, StepDefinition, SubAgentRunner } from "../../src/ecosystem/types.js";

// Mock logger to prevent console noise in tests
vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// Mock security module used by prompt-composer
vi.mock("../../src/security.js", () => ({
  buildSecurePrompt: (p: string) => p,
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeStep(overrides: Partial<StepDefinition> = {}): StepDefinition {
  return {
    stepNumber: 1,
    title: "Test Step",
    desc: "A test step",
    whyThisMatters: "Testing",
    inputNeeded: "none",
    actionInstruction: "Do the thing",
    promptToUse: "You are a test agent.",
    expectedOutput: "The thing done",
    validationRule: "Non-empty",
    failureSignal: "step-failed",
    recoveryAction: "Retry the step",
    handoffIfNeeded: null,
    ...overrides,
  };
}

function makeWorkflow(
  steps: StepDefinition[],
  overrides: Partial<WorkflowDefinition> = {}
): WorkflowDefinition {
  return {
    id: "wf-test",
    title: "Test Workflow",
    objective: "Run tests",
    trigger: "manual",
    preconditions: [],
    inputs: [],
    steps,
    mainOutput: "Final output",
    secondaryOutputs: [],
    dod: [],
    qaChecklist: [],
    raci: { responsible: "agent", accountable: "system", consulted: null, informed: "user" },
    kpis: {},
    cadence: "on-demand",
    errorHandling: "log and continue",
    fallbackRoute: "none",
    escalationRoute: "none",
    ...overrides,
  };
}

// ============================================================================
// TS-051: Sequential execution with 30s default timeout, validated before proceeding
// ============================================================================

describe("TS-051: sequential step execution with default timeout", () => {
  it("executes steps in order, passing prior output as context", async () => {
    const executionOrder: number[] = [];

    const runner: SubAgentRunner = vi.fn(async (task) => {
      // Identify step from task string
      if (task.includes("Step 1")) {
        executionOrder.push(1);
        return "output-step-1";
      }
      if (task.includes("Step 2")) {
        executionOrder.push(2);
        return "output-step-2";
      }
      return "output-unknown";
    });

    const steps = [
      makeStep({ stepNumber: 1, title: "Step 1" }),
      makeStep({ stepNumber: 2, title: "Step 2" }),
    ];

    const result = await executeWorkflow(runner, makeWorkflow(steps), {});

    expect(executionOrder).toEqual([1, 2]);
    expect(result).toBe("output-step-2");
  });

  it("uses default 30s timeout when workflow.timeoutMs is unset", async () => {
    const runner: SubAgentRunner = vi.fn(async () => "ok");
    const workflow = makeWorkflow([makeStep()]);
    delete (workflow as Partial<WorkflowDefinition>).timeoutMs;

    // Should resolve normally within default 30s
    const result = await executeWorkflow(runner, workflow, {});
    expect(result).toBe("ok");
  });

  it("returns [timeout] error string when workflow exceeds timeoutMs", async () => {
    vi.useFakeTimers();

    const runner: SubAgentRunner = vi.fn(() =>
      new Promise<string>((resolve) => setTimeout(() => resolve("late"), 5_000))
    );

    const workflow = makeWorkflow([makeStep()], { timeoutMs: 1_000 });
    const promise = executeWorkflow(runner, workflow, {});

    // Advance past timeout
    await vi.advanceTimersByTimeAsync(1_500);

    const result = await promise;
    expect(result).toMatch(/\[timeout\]/);
    expect(result).toContain("wf-test");

    vi.useRealTimers();
  });

  it("passes previous step output into next step context as previousOutput", async () => {
    const capturedContexts: string[] = [];

    const runner: SubAgentRunner = vi.fn(async (_task, prompt) => {
      capturedContexts.push(prompt);
      return "step-output";
    });

    const steps = [
      makeStep({ stepNumber: 1, title: "Step 1", promptToUse: "Prompt A" }),
      makeStep({ stepNumber: 2, title: "Step 2", promptToUse: "Prev: {{previousOutput}}" }),
    ];

    await executeWorkflow(runner, makeWorkflow(steps), {});

    // Second step's prompt should contain the prior output
    expect(capturedContexts[1]).toContain("step-output");
  });
});

// ============================================================================
// TS-052: Failed step triggers recovery; escalates with failure message if recovery fails
// ============================================================================

describe("TS-052: step recovery and escalation on recovery failure", () => {
  it("invokes recovery when a step's runner throws", async () => {
    const runner: SubAgentRunner = vi.fn()
      .mockRejectedValueOnce(new Error("primary-step-error"))
      .mockResolvedValueOnce("recovery-output");

    const step = makeStep({
      recoveryAction: "Fallback approach",
      failureSignal: "step-recovery-failed",
    });

    const result = await executeWorkflow(runner, makeWorkflow([step]), {});

    // Runner called twice: once for the primary step, once for recovery
    expect(runner).toHaveBeenCalledTimes(2);
    expect(result).toBe("recovery-output");
  });

  it("returns failure string when recovery also fails", async () => {
    const runner: SubAgentRunner = vi.fn()
      .mockRejectedValueOnce(new Error("primary-step-error"))
      .mockRejectedValueOnce(new Error("recovery-also-failed"));

    const step = makeStep({
      stepNumber: 1,
      title: "Failing Step",
      recoveryAction: "Try again",
      failureSignal: "step-recovery-failed",
    });

    const result = await executeWorkflow(runner, makeWorkflow([step]), {});

    // Must communicate that the workflow failed at the relevant step
    expect(result).toMatch(/failed at step 1/i);
    expect(result).toContain("Failing Step");
  });

  it("does not attempt recovery when recoveryAction is empty", async () => {
    const runner: SubAgentRunner = vi.fn()
      .mockRejectedValueOnce(new Error("step-error"));

    const step = makeStep({
      stepNumber: 1,
      title: "No Recovery Step",
      recoveryAction: "",
    });

    const result = await executeWorkflow(runner, makeWorkflow([step]), {});

    // Runner only called once; no recovery attempt
    expect(runner).toHaveBeenCalledTimes(1);
    expect(result).toMatch(/failed at step 1/i);
  });

  it("continues workflow normally after successful recovery", async () => {
    const runner: SubAgentRunner = vi.fn()
      .mockRejectedValueOnce(new Error("transient-error"))  // step 1 primary fails
      .mockResolvedValueOnce("recovered-output")            // step 1 recovery succeeds
      .mockResolvedValueOnce("step-2-output");              // step 2 succeeds

    const steps = [
      makeStep({ stepNumber: 1, title: "Step 1", recoveryAction: "Recover" }),
      makeStep({ stepNumber: 2, title: "Step 2" }),
    ];

    const result = await executeWorkflow(runner, makeWorkflow(steps), {});

    expect(runner).toHaveBeenCalledTimes(3);
    expect(result).toBe("step-2-output");
  });
});

// ============================================================================
// TS-053: Mid-workflow handoff includes context with all prior step outputs
// ============================================================================

describe("TS-053: handoff includes all prior step outputs in context", () => {
  it("stops workflow at the handoff step and returns that step's output", async () => {
    const runner: SubAgentRunner = vi.fn()
      .mockResolvedValueOnce("step-1-out")
      .mockResolvedValueOnce("step-2-handoff-out");

    const steps = [
      makeStep({ stepNumber: 1, title: "Step 1", handoffIfNeeded: null }),
      makeStep({ stepNumber: 2, title: "Step 2", handoffIfNeeded: "escalate-to-human" }),
      makeStep({ stepNumber: 3, title: "Step 3 (never reached)", handoffIfNeeded: null }),
    ];

    const result = await executeWorkflow(runner, makeWorkflow(steps), {});

    // Step 3 must not execute
    expect(runner).toHaveBeenCalledTimes(2);
    expect(result).toBe("step-2-handoff-out");
  });

  it("passes accumulated prior outputs as context to the handoff step", async () => {
    const capturedPrompts: string[] = [];

    const runner: SubAgentRunner = vi.fn(async (_task, prompt) => {
      capturedPrompts.push(prompt);
      return `output-for-${capturedPrompts.length}`;
    });

    const steps = [
      makeStep({
        stepNumber: 1,
        title: "Gather",
        promptToUse: "Gather information",
        handoffIfNeeded: null,
      }),
      makeStep({
        stepNumber: 2,
        title: "Handoff",
        // previousOutput placeholder should carry step-1 result
        promptToUse: "Hand off with: {{previousOutput}}",
        handoffIfNeeded: "delegate-to-deonto",
      }),
    ];

    await executeWorkflow(runner, makeWorkflow(steps), {});

    // The handoff step's prompt should contain the first step's output
    expect(capturedPrompts[1]).toContain("output-for-1");
  });

  it("includes initial context keys in handoff step context", async () => {
    const capturedPrompts: string[] = [];

    const runner: SubAgentRunner = vi.fn(async (_task, prompt) => {
      capturedPrompts.push(prompt);
      return "step-output";
    });

    const initialContext = { userId: "user-42", channel: "telegram" };

    const steps = [
      makeStep({
        stepNumber: 1,
        title: "Handoff Step",
        promptToUse: "User {{userId}} on {{channel}}",
        handoffIfNeeded: "next-agent",
      }),
    ];

    await executeWorkflow(runner, makeWorkflow(steps), initialContext);

    expect(capturedPrompts[0]).toContain("user-42");
    expect(capturedPrompts[0]).toContain("telegram");
  });
});
