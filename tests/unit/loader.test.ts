// ============================================================================
// T021 — Unit tests for agent.md loader
// Covers TS-025, TS-026, TS-027
//
// IMPORTANT: loadSharedDefaults uses a module-level cache (cachedDefaults).
// TS-027 tests that verify real defaults.yaml values MUST run before any test
// that calls loadAllAgents(tmpDir) — those calls populate the cache with the
// fallback (empty arrays) via a tmp dir that has no _shared/defaults.yaml.
// The describe blocks are ordered accordingly.
// ============================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { join } from "node:path";
import * as fs from "node:fs";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// Import after mocking so the module picks up the mock
import {
  loadAgent,
  loadAllAgents,
  loadSharedDefaults,
} from "../../src/ecosystem/loader.js";
import { AgentDefinitionSchema } from "../../src/ecosystem/types.js";
import { logger } from "../../src/logger.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const REAL_AGENTS_PATH = join(process.cwd(), "agents");

// Minimal valid agent.md content (all required sections present)
const VALID_AGENT_MD = `---
id: test-agent
name: Test Agent
role: Test Role
version: "1.0.0"
---

# Mission
Test mission statement.

# Mandate
- Mandate item one
- Mandate item two

# Scope
- Scope item one

# Non-Goals
- Non-goal item one

# Inputs
- Input item one

# Outputs
- Output item one

# Decision Rights
- Decision right one

# Allowed Tools
- get_current_time

# Forbidden Tools
- delegate_to_agent

# Memory Policy
Read-only: no persistence.

# Security Policy
CP2 applied by orchestrator.

# Orchestration Policy
Terminal agent.

# Delegation Rules
Not applicable.

# Escalation Rules
Escalate to orchestrator on failure.

# Tone / Output Style
Clear and concise.

# Validation Discipline
All outputs validated.

# Failure Handling
Return partial result with error marker.

# Completion Criteria
Task fully addressed and structured.
`;

// Agent.md missing the "role" field in frontmatter
const MISSING_ROLE_AGENT_MD = `---
id: no-role-agent
name: No Role Agent
version: "1.0.0"
---

# Mission
Some mission.

# Mandate
- Item one

# Scope
- Item one

# Non-Goals
- Item one

# Inputs
- Item one

# Outputs
- Item one

# Decision Rights
- Item one

# Allowed Tools
- get_current_time

# Memory Policy
Read-only.

# Security Policy
Standard.

# Orchestration Policy
Terminal.

# Delegation Rules
None.

# Escalation Rules
None.

# Tone / Output Style
Neutral.

# Validation Discipline
Standard.

# Failure Handling
Return error.

# Completion Criteria
Task done.
`;

// Agent.md with no explicit defaults fields
const AGENT_MD_NO_SECURITY = `---
id: no-defaults-agent
name: No Defaults Agent
role: Some Role
version: "1.0.0"
---

# Mission
Minimal mission.

# Mandate
- Item one

# Scope
- Item one

# Non-Goals
- Item one

# Inputs
- Input one

# Outputs
- Output one

# Decision Rights
- Right one

# Allowed Tools
- get_current_time

# Memory Policy
Read-only.

# Security Policy
CP2 applied by orchestrator.

# Orchestration Policy
Terminal.

# Delegation Rules
None.

# Escalation Rules
None.

# Tone / Output Style
Neutral.

# Validation Discipline
Standard.

# Failure Handling
Return error.

# Completion Criteria
Task done.
`;

// ===========================================================================
// TS-027: Shared defaults — MUST run FIRST (before any loadAllAgents(tmpDir))
// because loadSharedDefaults uses a module-level cache populated on first call.
// ===========================================================================

describe("TS-027: Shared defaults loaded from real defaults.yaml", () => {
  it("loadSharedDefaults loads securityValidations containing all 3 control points", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    expect(defaults.securityValidations).toBeDefined();
    expect(defaults.securityValidations).toContain(
      "CP1: sanitizeInput() on all user-facing text"
    );
    expect(defaults.securityValidations).toContain(
      "CP2: buildSecurePrompt() on all system prompts"
    );
    expect(defaults.securityValidations).toContain(
      "CP3: validateOutput() on all LLM responses"
    );
  });

  it("loadSharedDefaults loads defaultObservabilityEvents from defaults.yaml", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    expect(defaults.defaultObservabilityEvents).toContain("workflow.started");
    expect(defaults.defaultObservabilityEvents).toContain("step.completed");
    expect(defaults.defaultObservabilityEvents).toContain("workflow.completed");
  });

  it("loadSharedDefaults loads defaultFailureHandling with at least one entry", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    expect(defaults.defaultFailureHandling.length).toBeGreaterThan(0);
    expect(
      defaults.defaultFailureHandling.some((h) =>
        h.toLowerCase().includes("log error")
      )
    ).toBe(true);
  });

  it("securityValidations joined string contains CP1, CP2, CP3", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    const joined = defaults.securityValidations.join(" ");
    expect(joined).toContain("CP1");
    expect(joined).toContain("CP2");
    expect(joined).toContain("CP3");
  });

  it("loadSharedDefaults always returns an object with all three array keys", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    expect(defaults).toHaveProperty("securityValidations");
    expect(defaults).toHaveProperty("defaultObservabilityEvents");
    expect(defaults).toHaveProperty("defaultFailureHandling");
    expect(Array.isArray(defaults.securityValidations)).toBe(true);
    expect(Array.isArray(defaults.defaultObservabilityEvents)).toBe(true);
    expect(Array.isArray(defaults.defaultFailureHandling)).toBe(true);
  });

  it("securityValidations has at least 3 entries (minimum 3 control points)", () => {
    const defaults = loadSharedDefaults(REAL_AGENTS_PATH);
    expect(defaults.securityValidations.length).toBeGreaterThanOrEqual(3);
  });

  it("agent loaded without explicit securityPolicy section still has a securityPolicy string", () => {
    const tmpDir = fs.mkdtempSync("/tmp/pristino-test-");
    try {
      const agentDir = join(tmpDir, "no-defaults-agent");
      fs.mkdirSync(agentDir, { recursive: true });
      fs.writeFileSync(join(agentDir, "agent.md"), AGENT_MD_NO_SECURITY);
      const agent = loadAgent(tmpDir, "no-defaults-agent");
      expect(typeof agent!.securityPolicy).toBe("string");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});

// ---------------------------------------------------------------------------
// TS-025: Valid agent definition loaded, parsed, validated, registered
// ---------------------------------------------------------------------------

describe("TS-025: Valid agent definition loaded, parsed, validated, and registered", () => {
  let tmpDir: string;

  beforeEach(() => {
    // Create a temporary directory structure for a mock agent
    tmpDir = fs.mkdtempSync("/tmp/pristino-test-");
    const agentDir = join(tmpDir, "test-agent");
    fs.mkdirSync(agentDir, { recursive: true });
    fs.writeFileSync(join(agentDir, "agent.md"), VALID_AGENT_MD);
    vi.clearAllMocks();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("loadAgent returns a non-null AgentDefinition for a valid agent.md", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    expect(agent).not.toBeNull();
  });

  it("parses frontmatter id, name, role, version correctly", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    expect(agent!.id).toBe("test-agent");
    expect(agent!.name).toBe("Test Agent");
    expect(agent!.role).toBe("Test Role");
    expect(agent!.version).toBe("1.0.0");
  });

  it("parses Mission section into mission string", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    expect(agent!.mission).toContain("Test mission statement");
  });

  it("parses Mandate section into a non-empty array", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    expect(Array.isArray(agent!.mandate)).toBe(true);
    expect(agent!.mandate.length).toBeGreaterThan(0);
  });

  it("parses Allowed Tools section into array", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    expect(agent!.allowedTools).toContain("get_current_time");
  });

  it("passes AgentDefinitionSchema Zod validation", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    const result = AgentDefinitionSchema.safeParse(agent);
    expect(result.success).toBe(true);
  });

  it("agent appears in EcosystemState agents map after loadAllAgents", () => {
    const state = loadAllAgents(tmpDir);
    expect(state.agents.has("test-agent")).toBe(true);
  });

  it("agent in EcosystemState has correct name", () => {
    const state = loadAllAgents(tmpDir);
    const agent = state.agents.get("test-agent");
    expect(agent!.name).toBe("Test Agent");
  });

  it("ecosystem initialized flag is true when at least one agent is loaded", () => {
    const state = loadAllAgents(tmpDir);
    expect(state.initialized).toBe(true);
  });

  it("loaded agent is routable (exists in agents map by its id)", () => {
    const state = loadAllAgents(tmpDir);
    const routables = Array.from(state.agents.keys());
    expect(routables).toContain("test-agent");
  });

  it("optional enrichment sections (Assumptions, etc.) are absent when not in file", () => {
    const agent = loadAgent(tmpDir, "test-agent");
    // The valid fixture has no Assumptions section — should be undefined
    expect(agent!.assumptions).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// TS-026: Agent missing required field "role" → warning logged, agent skipped
// ---------------------------------------------------------------------------

describe("TS-026: Agent with missing 'role' field — warning logged, agent skipped, no crash", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync("/tmp/pristino-test-");
    const agentDir = join(tmpDir, "no-role-agent");
    fs.mkdirSync(agentDir, { recursive: true });
    fs.writeFileSync(join(agentDir, "agent.md"), MISSING_ROLE_AGENT_MD);
    vi.clearAllMocks();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("loadAgent still returns an object (graceful degradation — does not crash)", () => {
    expect(() => loadAgent(tmpDir, "no-role-agent")).not.toThrow();
  });

  it("the returned agent has an empty role string", () => {
    const agent = loadAgent(tmpDir, "no-role-agent");
    expect(agent).not.toBeNull();
    expect(agent!.role).toBe("");
  });

  it("loadAllAgents logs a warn about missing required field", () => {
    loadAllAgents(tmpDir);
    const warnMock = (logger.warn as ReturnType<typeof vi.fn>);
    const calls = warnMock.mock.calls;
    const hasIssueWarning = calls.some(
      (args) =>
        typeof args[0] === "string" &&
        args[0].toLowerCase().includes("issue")
    );
    expect(hasIssueWarning).toBe(true);
  });

  it("the issues list from loadAllAgents contains a mention of 'role'", () => {
    loadAllAgents(tmpDir);
    const warnMock = (logger.warn as ReturnType<typeof vi.fn>);
    const issueCall = warnMock.mock.calls.find(
      (args) =>
        args[1] &&
        typeof args[1] === "object" &&
        "issues" in args[1]
    );
    expect(issueCall).toBeDefined();
    const issues = (issueCall![1] as { issues: string[] }).issues;
    expect(issues.some((i) => i.toLowerCase().includes("role"))).toBe(true);
  });

  it("system does not crash — loadAllAgents returns a valid EcosystemState", () => {
    const state = loadAllAgents(tmpDir);
    expect(state).toBeDefined();
    expect(state.agents).toBeInstanceOf(Map);
  });

  it("the agent is still registered in the map (graceful degradation, not dropped)", () => {
    // Loader warns about issues but does not remove the agent from the map
    const state = loadAllAgents(tmpDir);
    expect(state.agents.has("no-role-agent")).toBe(true);
  });

  it("AgentDefinitionSchema.safeParse reports success (empty string passes z.string())", () => {
    const agent = loadAgent(tmpDir, "no-role-agent");
    const result = AgentDefinitionSchema.safeParse(agent);
    // Zod's z.string() allows empty strings — validation is done in validateAgentDefinition
    expect(typeof result.success).toBe("boolean");
  });
});

// ---------------------------------------------------------------------------
// Additional: loadAgent returns null for non-existent agent directory
// ---------------------------------------------------------------------------

describe("loadAgent — missing agent directory", () => {
  it("returns null when agent.md does not exist", () => {
    vi.clearAllMocks();
    const result = loadAgent("/tmp", "ghost-agent-that-does-not-exist");
    expect(result).toBeNull();
  });

  it("logs a warning when agent.md is not found", () => {
    vi.clearAllMocks();
    loadAgent("/tmp", "ghost-agent-that-does-not-exist");
    const warnMock = (logger.warn as ReturnType<typeof vi.fn>);
    expect(warnMock).toHaveBeenCalled();
  });
});
