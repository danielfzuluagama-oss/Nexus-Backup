// ============================================================================
// Unit tests for src/ecosystem/prompt-composer.ts
// Covers:
//   - composeSystemPrompt: all sections (mission, mandate, scope, nonGoals,
//     delegationRules, toneOutputStyle, validationDiscipline, failureHandling)
//   - interpolate: placeholder replacement, unknown placeholder passthrough,
//     template injection prevention
//   - composeStepPrompt: interpolation + security layer
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("../../src/security.js", () => ({
  buildSecurePrompt: vi.fn((s: string) => `[SECURED] ${s}`),
  sanitizeInput: vi.fn((s: string) => ({ safe: true, cleaned: s, reason: "" })),
  validateOutput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
}));

// ---------------------------------------------------------------------------
// Imports (after mocks)
// ---------------------------------------------------------------------------

import {
  composeSystemPrompt,
  interpolate,
  composeStepPrompt,
} from "../../src/ecosystem/prompt-composer.js";
import type { AgentDefinition } from "../../src/ecosystem/types.js";
import { buildSecurePrompt } from "../../src/security.js";

// ---------------------------------------------------------------------------
// Test fixtures
// ---------------------------------------------------------------------------

function makeAgent(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: "test-agent",
    name: "TestAgent",
    role: "a test specialist",
    version: "1.0",
    mission: "Execute tests reliably",
    mandate: ["Always test thoroughly", "Report failures clearly"],
    scope: ["Unit testing", "Integration testing"],
    nonGoals: ["Production deployments", "Database migrations"],
    inputs: ["test spec"],
    outputs: ["test results"],
    decisionRights: ["choose test framework"],
    allowedTools: ["run_tests"],
    forbiddenTools: [],
    memoryPolicy: "ephemeral",
    securityPolicy: "standard",
    orchestrationPolicy: "sequential",
    delegationRules: "Delegate load testing to LoadTester",
    escalationRules: "Escalate failures to Orchestrator",
    toneOutputStyle: "Precise and concise technical language",
    validationDiscipline: "Verify all assertions before reporting",
    failureHandling: "Retry up to 3 times, then escalate",
    completionCriteria: "All tests pass",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// composeSystemPrompt
// ---------------------------------------------------------------------------

describe("composeSystemPrompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("includes agent name and role as the opening line", () => {
    const agent = makeAgent();
    const result = composeSystemPrompt(agent);
    expect(result).toContain("TestAgent");
    expect(result).toContain("a test specialist");
  });

  it("includes the mission section", () => {
    const agent = makeAgent({ mission: "World domination via tests" });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Mission");
    expect(result).toContain("World domination via tests");
  });

  it("includes mandate as a bullet list", () => {
    const agent = makeAgent({ mandate: ["Mandate item A", "Mandate item B"] });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Mandate");
    expect(result).toContain("- Mandate item A");
    expect(result).toContain("- Mandate item B");
  });

  it("includes scope as a bullet list", () => {
    const agent = makeAgent({ scope: ["Scope A", "Scope B"] });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Scope");
    expect(result).toContain("- Scope A");
    expect(result).toContain("- Scope B");
  });

  it("includes nonGoals as a bullet list", () => {
    const agent = makeAgent({ nonGoals: ["Not this", "Nor that"] });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Non-Goals");
    expect(result).toContain("- Not this");
    expect(result).toContain("- Nor that");
  });

  it("includes delegationRules section", () => {
    const agent = makeAgent({ delegationRules: "Always check sub-agent availability" });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Delegation Rules");
    expect(result).toContain("Always check sub-agent availability");
  });

  it("includes toneOutputStyle section", () => {
    const agent = makeAgent({ toneOutputStyle: "Formal and structured" });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Tone");
    expect(result).toContain("Formal and structured");
  });

  it("includes validationDiscipline section", () => {
    const agent = makeAgent({ validationDiscipline: "Double-check every output" });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Validation");
    expect(result).toContain("Double-check every output");
  });

  it("includes failureHandling section", () => {
    const agent = makeAgent({ failureHandling: "Log and escalate immediately" });
    const result = composeSystemPrompt(agent);
    expect(result).toContain("Failure Handling");
    expect(result).toContain("Log and escalate immediately");
  });

  it("omits mission section when mission is empty", () => {
    const agent = makeAgent({ mission: "" });
    const result = composeSystemPrompt(agent);
    expect(result).not.toContain("# Mission");
  });

  it("omits mandate section when mandate array is empty", () => {
    const agent = makeAgent({ mandate: [] });
    const result = composeSystemPrompt(agent);
    expect(result).not.toContain("# Mandate");
  });

  it("omits scope section when scope array is empty", () => {
    const agent = makeAgent({ scope: [] });
    const result = composeSystemPrompt(agent);
    expect(result).not.toContain("# Scope");
  });

  it("omits nonGoals section when nonGoals array is empty", () => {
    const agent = makeAgent({ nonGoals: [] });
    const result = composeSystemPrompt(agent);
    expect(result).not.toContain("# Non-Goals");
  });

  it("omits optional string sections when they are empty strings", () => {
    const agent = makeAgent({
      delegationRules: "",
      toneOutputStyle: "",
      validationDiscipline: "",
      failureHandling: "",
    });
    const result = composeSystemPrompt(agent);
    expect(result).not.toContain("# Delegation Rules");
    expect(result).not.toContain("# Tone");
    expect(result).not.toContain("# Validation");
    expect(result).not.toContain("# Failure Handling");
  });

  it("passes the composed prompt through buildSecurePrompt (CP2)", () => {
    const agent = makeAgent();
    const result = composeSystemPrompt(agent);
    expect(vi.mocked(buildSecurePrompt)).toHaveBeenCalledOnce();
    // Our mock prepends [SECURED]
    expect(result).toContain("[SECURED]");
  });

  it("returns a string", () => {
    const agent = makeAgent();
    const result = composeSystemPrompt(agent);
    expect(typeof result).toBe("string");
  });
});

// ---------------------------------------------------------------------------
// interpolate
// ---------------------------------------------------------------------------

describe("interpolate", () => {
  it("replaces a single placeholder", () => {
    const result = interpolate("Hello, {{name}}!", { name: "Alice" });
    expect(result).toBe("Hello, Alice!");
  });

  it("replaces multiple placeholders", () => {
    const result = interpolate("{{greeting}}, {{name}}! Today is {{day}}.", {
      greeting: "Hi",
      name: "Bob",
      day: "Monday",
    });
    expect(result).toBe("Hi, Bob! Today is Monday.");
  });

  it("leaves unknown placeholders unchanged", () => {
    const result = interpolate("Hello, {{unknown}}!", { name: "Alice" });
    expect(result).toBe("Hello, {{unknown}}!");
  });

  it("handles empty context", () => {
    const result = interpolate("No {{placeholders}} here if none given", {});
    expect(result).toBe("No {{placeholders}} here if none given");
  });

  it("handles template with no placeholders", () => {
    const result = interpolate("Static template text", { key: "value" });
    expect(result).toBe("Static template text");
  });

  it("escapes {{ and }} in context values to prevent nested injection", () => {
    const result = interpolate("Output: {{value}}", {
      value: "{{injected}}",
    });
    // Escaped in context: {{injected}} → { {injected} } (won't be re-processed)
    expect(result).not.toContain("{{injected}}");
    expect(result).toContain("{ {injected} }");
  });

  it("replaces the same placeholder multiple times in template", () => {
    const result = interpolate("{{x}} plus {{x}} equals two {{x}}", { x: "one" });
    expect(result).toBe("one plus one equals two one");
  });

  it("handles special regex characters in placeholder values safely", () => {
    const result = interpolate("Value: {{v}}", { v: "$100.00 (discount)" });
    expect(result).toBe("Value: $100.00 (discount)");
  });
});

// ---------------------------------------------------------------------------
// composeStepPrompt
// ---------------------------------------------------------------------------

describe("composeStepPrompt", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("interpolates placeholders in the template", () => {
    const result = composeStepPrompt("Hello {{name}}", { name: "World" });
    expect(result).toContain("Hello World");
  });

  it("passes the interpolated text through buildSecurePrompt", () => {
    composeStepPrompt("Task: {{task}}", { task: "analyze data" });
    expect(vi.mocked(buildSecurePrompt)).toHaveBeenCalledOnce();
    expect(vi.mocked(buildSecurePrompt)).toHaveBeenCalledWith("Task: analyze data");
  });

  it("returns the secured output from buildSecurePrompt", () => {
    const result = composeStepPrompt("Instruction: {{cmd}}", { cmd: "run tests" });
    expect(result).toContain("[SECURED]");
    expect(result).toContain("Instruction: run tests");
  });

  it("handles empty context", () => {
    const result = composeStepPrompt("Static step prompt", {});
    expect(result).toContain("Static step prompt");
  });

  it("escapes injection attempts in context values", () => {
    const result = composeStepPrompt("{{userInput}}", {
      userInput: "{{ignore_all_previous}}",
    });
    expect(result).not.toContain("{{ignore_all_previous}}");
  });
});
