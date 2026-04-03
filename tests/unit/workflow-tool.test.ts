import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("../../src/security.js", () => ({
  sanitizeInput: vi.fn((value: string) => ({
    safe: true,
    cleaned: value.trim(),
    reason: "",
  })),
  buildSecurePrompt: vi.fn((value: string) => value),
  validateOutput: vi.fn((value: string) => ({
    safe: true,
    cleaned: value.trim(),
    warnings: [],
  })),
}));

const { mockExecuteTool, mockGetToolNames } = vi.hoisted(() => ({
  mockExecuteTool: vi.fn(async (name: string, args: Record<string, unknown>) => {
    if (name === "get_current_time") {
      const timezone = typeof args.timezone === "string" ? args.timezone : "UTC";
      return `Thursday, March 6, 2026, 3:45 PM ${timezone}`;
    }
    return "tool-output";
  }),
  mockGetToolNames: vi.fn(() => ["get_current_time", "route_request", "delegate_to_agent"]),
}));

vi.mock("../../src/tools/registry.js", () => ({
  executeTool: mockExecuteTool,
  getToolNames: mockGetToolNames,
}));

import {
  createWorkflowExecutor,
  getWorkflowExecutionDefinition,
} from "../../src/ecosystem/workflow-tool.js";
import type {
  AgentDefinition,
  EcosystemState,
  SkillDefinition,
  WorkflowDefinition,
  StepDefinition,
  SubAgentRunner,
} from "../../src/ecosystem/types.js";

function makeAgent(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: "timekeeper",
    name: "Timekeeper",
    role: "Time specialist",
    version: "1.0.0",
    mission: "Handle time queries",
    mandate: ["Answer time questions"],
    scope: ["time"],
    nonGoals: [],
    inputs: ["user message"],
    outputs: ["time answer"],
    decisionRights: ["format time answers"],
    allowedTools: ["get_current_time"],
    forbiddenTools: [],
    memoryPolicy: "read-only",
    securityPolicy: "standard",
    orchestrationPolicy: "terminal",
    delegationRules: "none",
    escalationRules: "fallback to UTC",
    toneOutputStyle: "concise",
    validationDiscipline: "strict",
    failureHandling: "return clear error",
    completionCriteria: "user receives correct time",
    ...overrides,
  };
}

function makeStep(overrides: Partial<StepDefinition> = {}): StepDefinition {
  return {
    stepNumber: 1,
    title: "Sanitize",
    desc: "Sanitize input",
    whyThisMatters: "Safety",
    inputNeeded: "userMessage",
    actionInstruction: "Call sanitizeInput(userMessage).",
    promptToUse: null,
    expectedOutput: "Cleaned message",
    validationRule: "non-empty",
    failureSignal: "empty",
    recoveryAction: "Ask for rephrase",
    handoffIfNeeded: null,
    ...overrides,
  };
}

function makeWorkflow(overrides: Partial<WorkflowDefinition> = {}): WorkflowDefinition {
  return {
    id: "timezone-specific-query",
    title: "Timezone Specific Query",
    objective: "Return the current time in a user-specified timezone",
    trigger: "User asks for time in a specific timezone",
    preconditions: [],
    inputs: ["userMessage"],
    steps: [
      makeStep(),
      makeStep({
        stepNumber: 2,
        title: "Resolve timezone",
        desc: "Resolve timezone",
        actionInstruction: "Call get_current_time({ timezone: resolvedTimezone }). Parse the returned timestamp.",
        promptToUse: "Use {{userMessage}} and {{requestedTimezone}} to confirm the timezone and time context.",
        expectedOutput: "Timezone confirmation",
      }),
      makeStep({
        stepNumber: 3,
        title: "Validate output",
        desc: "Validate formatted output",
        actionInstruction: "Call validateOutput(formattedResponse). If passed, return to orchestrator.",
        promptToUse: null,
        expectedOutput: "Validated response",
      }),
    ],
    mainOutput: "Formatted time answer",
    secondaryOutputs: [],
    dod: ["Response delivered"],
    qaChecklist: ["Timezone included"],
    raci: {
      responsible: "timekeeper",
      accountable: "pristino-orchestrator",
      consulted: null,
      informed: "logger",
    },
    kpis: { response_time_p95: "<3s" },
    cadence: "per-request",
    errorHandling: "fallback to UTC",
    fallbackRoute: "Return error",
    escalationRoute: "orchestrator",
    ...overrides,
  };
}

function makeSkill(workflow: WorkflowDefinition): SkillDefinition {
  return {
    id: "time-query",
    name: "Time Query",
    purpose: "Answer current time questions",
    businessValue: "Provide accurate time answers",
    triggerTypes: ["user_message"],
    owningAgent: "timekeeper",
    inputs: ["userMessage"],
    outputs: ["formattedTime"],
    dependencies: [],
    toolUsage: ["get_current_time"],
    memoryReadsWrites: { reads: [], writes: [] },
    securityValidations: [],
    observabilityEvents: [],
    failureHandling: [],
    interoperabilityContract: { consumes: [], produces: [] },
    wowCriteria: [],
    safeCriteria: [],
    workflows: [workflow],
    systemPrompt: "You are a time-query skill.",
  };
}

function makeEcosystem(workflow: WorkflowDefinition): EcosystemState {
  return {
    agents: new Map([["timekeeper", makeAgent()]]),
    skills: new Map([["timekeeper", [makeSkill(workflow)]]]),
    initialized: true,
  };
}

describe("workflow-tool", () => {
  beforeEach(() => {
    mockExecuteTool.mockClear();
    mockGetToolNames.mockClear();
  });

  it("exposes the execute_workflow tool definition", () => {
    const definition = getWorkflowExecutionDefinition(makeEcosystem(makeWorkflow()));
    expect(definition.function.name).toBe("execute_workflow");
  });

  it("resolves a workflow from a natural-language task and executes it end-to-end", async () => {
    const workflow = makeWorkflow();
    const ecosystem = makeEcosystem(workflow);

    const runner: SubAgentRunner = vi.fn(async (_task, _prompt) =>
      JSON.stringify({
        primary_output: "The current time in Tokyo is Thursday, March 6, 2026, 3:45 PM Asia/Tokyo",
        context_patch: {
          formattedResponse: "The current time in Tokyo is Thursday, March 6, 2026, 3:45 PM Asia/Tokyo",
          resolvedTimezone: "Asia/Tokyo",
        },
        handoff: null,
      })
    );

    const executor = createWorkflowExecutor(ecosystem, runner);
    const result = await executor({
      task: "What time is it in Tokyo right now?",
      context: {
        requestedTimezone: "Asia/Tokyo",
      },
    });

    expect(result).toContain("The current time in Tokyo");
    expect(runner).toHaveBeenCalledTimes(1);
    expect(mockExecuteTool).not.toHaveBeenCalledWith("route_request", expect.anything());
  });

  it("returns suggestions when no workflow can be resolved", async () => {
    const ecosystem = makeEcosystem(makeWorkflow());
    const runner: SubAgentRunner = vi.fn();
    const executor = createWorkflowExecutor(ecosystem, runner);

    const result = await executor({
      task: "oranges galaxies hyperdrive",
    });

    expect(result).toContain("Could not resolve a workflow");
    expect(result).toContain("timekeeper/time-query/timezone-specific-query");
  });
});
