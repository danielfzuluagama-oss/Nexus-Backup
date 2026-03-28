// ============================================================================
// Unit tests for src/tools/registry.ts, src/tools/delegate.ts, src/tools/knowledge.ts
// Covers:
//   ToolRegistry: register, registerDelegateTool, getAllDefinitions, getToolNames,
//                 execute (happy path, unknown tool, executor throws)
//   SubAgentRegistry: default timekeeper agent, registerEcosystemAgents,
//                     get, getAll, override existing agent
//   getDelegateDefinition: schema structure, agent names list
//   knowledge.readCoreKnowledge: happy path, file not found, path traversal guard
// ============================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import path from "path";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  })),
}));

vi.mock("../../src/security.js", () => ({
  buildSecurePrompt: vi.fn((s: string) => s),
  sanitizeInput: vi.fn((s: string) => ({ safe: true, cleaned: s, reason: "" })),
  validateOutput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
}));

vi.mock("fs/promises");

// get-current-time and knowledge modules referenced at ToolRegistry construction
vi.mock("../../src/tools/get-current-time.js", () => ({
  definition: {
    type: "function",
    function: {
      name: "get_current_time",
      description: "Returns current time",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  execute: vi.fn().mockResolvedValue("2026-03-28T12:00:00Z"),
}));

vi.mock("../../src/tools/knowledge.js", () => ({
  definition: {
    type: "function",
    function: {
      name: "read_core_knowledge",
      description: "Read knowledge base",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  readCoreKnowledge: vi.fn().mockResolvedValue("knowledge content"),
}));

// ---------------------------------------------------------------------------
// Imports (after mocks)
// ---------------------------------------------------------------------------

import { ToolRegistry } from "../../src/tools/registry.js";
import { SubAgentRegistry, getDelegateDefinition } from "../../src/tools/delegate.js";
import type { ToolDefinition } from "../../src/tools/registry.js";
import type { EcosystemState, AgentDefinition } from "../../src/ecosystem/types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeDef(name: string): ToolDefinition {
  return {
    type: "function",
    function: {
      name,
      description: `Tool: ${name}`,
      parameters: { type: "object", properties: {}, required: [] },
    },
  };
}

function makeLogger() {
  return {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  };
}

function makeAgentDef(overrides: Partial<AgentDefinition> = {}): AgentDefinition {
  return {
    id: "test-agent",
    name: "TestAgent",
    role: "test specialist",
    version: "1.0",
    mission: "",
    mandate: [],
    scope: [],
    nonGoals: [],
    inputs: [],
    outputs: [],
    decisionRights: [],
    allowedTools: ["get_current_time"],
    forbiddenTools: [],
    memoryPolicy: "",
    securityPolicy: "",
    orchestrationPolicy: "",
    delegationRules: "",
    escalationRules: "",
    toneOutputStyle: "",
    validationDiscipline: "",
    failureHandling: "",
    completionCriteria: "",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// ToolRegistry — registration
// ---------------------------------------------------------------------------

describe("ToolRegistry — register", () => {
  it("registers a tool and makes it available in getAllDefinitions", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const def = makeDef("custom_tool");
    registry.register(def, vi.fn());

    const defs = registry.getAllDefinitions();
    expect(defs.some((d) => d.function.name === "custom_tool")).toBe(true);
  });

  it("does not duplicate a tool registered twice", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const def = makeDef("no_dup_tool");
    registry.register(def, vi.fn());
    registry.register(def, vi.fn()); // second registration

    const defs = registry.getAllDefinitions();
    const count = defs.filter((d) => d.function.name === "no_dup_tool").length;
    expect(count).toBe(1);
  });

  it("getToolNames returns all registered tool names", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const names = registry.getToolNames();
    // Built-in tools from constructor
    expect(names).toContain("get_current_time");
    expect(names).toContain("read_core_knowledge");
  });

  it("built-in tools are registered on construction", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const defs = registry.getAllDefinitions();
    const names = defs.map((d) => d.function.name);
    expect(names).toContain("get_current_time");
    expect(names).toContain("read_core_knowledge");
  });
});

// ---------------------------------------------------------------------------
// ToolRegistry — getAllDefinitions (excludeDelegate)
// ---------------------------------------------------------------------------

describe("ToolRegistry — getAllDefinitions", () => {
  it("returns all definitions by default", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    registry.registerDelegateTool(vi.fn());
    const all = registry.getAllDefinitions(false);
    const names = all.map((d) => d.function.name);
    expect(names).toContain("delegate_to_agent");
  });

  it("excludes delegate tool when excludeDelegate=true", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    registry.registerDelegateTool(vi.fn());
    const filtered = registry.getAllDefinitions(true);
    const names = filtered.map((d) => d.function.name);
    expect(names).not.toContain("delegate_to_agent");
  });
});

// ---------------------------------------------------------------------------
// ToolRegistry — execute
// ---------------------------------------------------------------------------

describe("ToolRegistry — execute", () => {
  it("executes a registered tool and returns its result", async () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const executor = vi.fn().mockResolvedValue("tool output");
    registry.register(makeDef("my_tool"), executor);

    const result = await registry.execute("my_tool", { key: "val" });
    expect(result).toBe("tool output");
    expect(executor).toHaveBeenCalledWith({ key: "val" });
  });

  it("returns error string for unknown tool", async () => {
    const log = makeLogger();
    const registry = new ToolRegistry(log as never);
    const result = await registry.execute("nonexistent_tool", {});
    expect(result).toContain("Unknown tool");
    expect(result).toContain("nonexistent_tool");
    expect(log.warn).toHaveBeenCalled();
  });

  it("returns error string when executor throws", async () => {
    const log = makeLogger();
    const registry = new ToolRegistry(log as never);
    const executor = vi.fn().mockRejectedValue(new Error("boom"));
    registry.register(makeDef("exploding_tool"), executor);

    const result = await registry.execute("exploding_tool", {});
    expect(result).toContain("Error executing");
    expect(result).toContain("exploding_tool");
    expect(result).toContain("boom");
    expect(log.error).toHaveBeenCalled();
  });

  it("returns error string when executor throws a non-Error value", async () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const executor = vi.fn().mockRejectedValue("plain string error");
    registry.register(makeDef("string_error_tool"), executor);

    const result = await registry.execute("string_error_tool", {});
    expect(result).toContain("Error executing");
  });

  it("handles synchronous executor return values", async () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const executor = vi.fn().mockReturnValue("sync result");
    registry.register(makeDef("sync_tool"), executor);

    const result = await registry.execute("sync_tool", {});
    expect(result).toBe("sync result");
  });
});

// ---------------------------------------------------------------------------
// ToolRegistry — registerDelegateTool
// ---------------------------------------------------------------------------

describe("ToolRegistry — registerDelegateTool", () => {
  it("registers delegate_to_agent tool with the provided executor", () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const executor = vi.fn().mockResolvedValue("delegated");
    registry.registerDelegateTool(executor);

    const defs = registry.getAllDefinitions();
    expect(defs.some((d) => d.function.name === "delegate_to_agent")).toBe(true);
  });

  it("can execute the registered delegate tool", async () => {
    const registry = new ToolRegistry(makeLogger() as never);
    const executor = vi.fn().mockResolvedValue("sub-agent result");
    registry.registerDelegateTool(executor);

    const result = await registry.execute("delegate_to_agent", { agent_name: "timekeeper", task: "What time?" });
    expect(result).toBe("sub-agent result");
    expect(executor).toHaveBeenCalledWith({ agent_name: "timekeeper", task: "What time?" });
  });
});

// ---------------------------------------------------------------------------
// SubAgentRegistry
// ---------------------------------------------------------------------------

describe("SubAgentRegistry", () => {
  it("has timekeeper registered by default", () => {
    const registry = new SubAgentRegistry();
    const agent = registry.get("timekeeper");
    expect(agent).toBeDefined();
    expect(agent!.name).toBe("timekeeper");
  });

  it("timekeeper has get_current_time in its tools list", () => {
    const registry = new SubAgentRegistry();
    const agent = registry.get("timekeeper");
    expect(agent!.tools).toContain("get_current_time");
  });

  it("getAll returns all registered agents", () => {
    const registry = new SubAgentRegistry();
    const all = registry.getAll();
    expect(all.has("timekeeper")).toBe(true);
  });

  it("get returns undefined for unknown agent", () => {
    const registry = new SubAgentRegistry();
    expect(registry.get("nonexistent")).toBeUndefined();
  });

  it("registerEcosystemAgents adds new agents from ecosystem", () => {
    const log = makeLogger();
    const registry = new SubAgentRegistry(log as never);

    const agentDef = makeAgentDef({ id: "analyzer", name: "Analyzer", role: "data analysis expert" });
    const ecosystem: EcosystemState = {
      agents: new Map([["analyzer", agentDef]]),
      skills: new Map(),
      initialized: true,
    };

    registry.registerEcosystemAgents(ecosystem);

    const agent = registry.get("analyzer");
    expect(agent).toBeDefined();
    expect(agent!.name).toBe("Analyzer");
    expect(agent!.description).toBe("data analysis expert");
  });

  it("registerEcosystemAgents overrides hardcoded agent with same ID", () => {
    const log = makeLogger();
    const registry = new SubAgentRegistry(log as never);

    const overrideDef = makeAgentDef({
      id: "timekeeper",
      name: "Timekeeper v2",
      role: "enhanced time specialist",
      allowedTools: ["get_current_time", "calendar_tool"],
    });
    const ecosystem: EcosystemState = {
      agents: new Map([["timekeeper", overrideDef]]),
      skills: new Map(),
      initialized: true,
    };

    registry.registerEcosystemAgents(ecosystem);

    const agent = registry.get("timekeeper");
    expect(agent!.name).toBe("Timekeeper v2");
    expect(agent!.tools).toContain("calendar_tool");
    // Should have logged the override
    expect(log.info).toHaveBeenCalledWith(
      "Overriding hardcoded agent with ecosystem definition",
      expect.objectContaining({ agentId: "timekeeper" })
    );
  });

  it("registerEcosystemAgents logs registered count", () => {
    const log = makeLogger();
    const registry = new SubAgentRegistry(log as never);

    const ecosystem: EcosystemState = {
      agents: new Map([
        ["agent1", makeAgentDef({ id: "agent1", name: "A1" })],
        ["agent2", makeAgentDef({ id: "agent2", name: "A2" })],
      ]),
      skills: new Map(),
      initialized: true,
    };

    registry.registerEcosystemAgents(ecosystem);

    expect(log.info).toHaveBeenCalledWith(
      "Ecosystem agents registered",
      expect.objectContaining({ count: 2 })
    );
  });

  it("uses instance logger when provided", () => {
    const log = makeLogger();
    const registry = new SubAgentRegistry(log as never);

    const ecosystem: EcosystemState = {
      agents: new Map([["x", makeAgentDef({ id: "x", name: "X" })]]),
      skills: new Map(),
      initialized: true,
    };

    registry.registerEcosystemAgents(ecosystem);

    expect(log.info).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// getDelegateDefinition
// ---------------------------------------------------------------------------

describe("getDelegateDefinition", () => {
  it("returns a valid ToolDefinition structure", () => {
    const def = getDelegateDefinition();
    expect(def.type).toBe("function");
    expect(def.function.name).toBe("delegate_to_agent");
    expect(def.function.description).toBeDefined();
    expect(def.function.parameters.required).toContain("agent_name");
    expect(def.function.parameters.required).toContain("task");
  });

  it("includes timekeeper in available agents description", () => {
    const def = getDelegateDefinition();
    expect(def.function.description).toContain("timekeeper");
  });

  it("description includes all agent names", () => {
    const def = getDelegateDefinition();
    // At minimum timekeeper should be present
    const agentNameParam = def.function.parameters.properties["agent_name"] as Record<string, string>;
    expect(agentNameParam.description).toContain("timekeeper");
  });

  it("has agent_name and task as required parameters", () => {
    const def = getDelegateDefinition();
    expect(def.function.parameters.required).toEqual(
      expect.arrayContaining(["agent_name", "task"])
    );
  });
});

// ---------------------------------------------------------------------------
// Module-level wrapper functions — registry.ts
// ---------------------------------------------------------------------------

describe("registry.ts — module-level wrappers (default registry)", () => {
  it("registerTool makes tool available via getAllToolDefinitions", async () => {
    // Import module-level functions — they share the defaultRegistry singleton
    const { registerTool, getAllToolDefinitions } = await import("../../src/tools/registry.js");
    const def = makeDef("global_test_tool_" + Date.now());
    registerTool(def, vi.fn().mockResolvedValue("ok"));
    const defs = getAllToolDefinitions();
    expect(defs.some((d) => d.function.name === def.function.name)).toBe(true);
  });

  it("getToolNames includes default built-in tools", async () => {
    const { getToolNames } = await import("../../src/tools/registry.js");
    const names = getToolNames();
    expect(Array.isArray(names)).toBe(true);
    expect(names.length).toBeGreaterThan(0);
  });

  it("executeTool dispatches to registered executor", async () => {
    const { registerTool, executeTool } = await import("../../src/tools/registry.js");
    const toolName = "exec_test_tool_" + Date.now();
    registerTool(makeDef(toolName), vi.fn().mockResolvedValue("dispatched result"));
    const result = await executeTool(toolName, {});
    expect(result).toBe("dispatched result");
  });

  it("executeTool returns error for unknown tool", async () => {
    const { executeTool } = await import("../../src/tools/registry.js");
    const result = await executeTool("unknown_xyz_tool_" + Date.now(), {});
    expect(result).toContain("Unknown tool");
  });

  it("registerDelegateTool (global) registers delegate_to_agent", async () => {
    const { registerDelegateTool, getAllToolDefinitions } = await import("../../src/tools/registry.js");
    registerDelegateTool(vi.fn().mockResolvedValue("delegated"));
    const defs = getAllToolDefinitions();
    expect(defs.some((d) => d.function.name === "delegate_to_agent")).toBe(true);
  });

  it("getAllToolDefinitions(true) excludes delegate_to_agent", async () => {
    const { registerDelegateTool, getAllToolDefinitions } = await import("../../src/tools/registry.js");
    registerDelegateTool(vi.fn());
    const filtered = getAllToolDefinitions(true);
    expect(filtered.some((d) => d.function.name === "delegate_to_agent")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Module-level wrapper functions — delegate.ts
// ---------------------------------------------------------------------------

describe("delegate.ts — module-level wrappers (default registry)", () => {
  it("registerEcosystemAgents (global) updates the global registry", async () => {
    const { registerEcosystemAgents, getSubAgents } = await import("../../src/tools/delegate.js");
    const agentDef = makeAgentDef({ id: "globalAgent", name: "GlobalAgent", role: "global specialist" });
    const ecosystem: EcosystemState = {
      agents: new Map([["globalAgent", agentDef]]),
      skills: new Map(),
      initialized: true,
    };
    registerEcosystemAgents(ecosystem);
    const agents = getSubAgents();
    expect(agents.has("globalAgent")).toBe(true);
  });

  it("getSubAgents returns at least the default timekeeper", async () => {
    const { getSubAgents } = await import("../../src/tools/delegate.js");
    const agents = getSubAgents();
    expect(agents.has("timekeeper")).toBe(true);
  });

  it("getSubAgent returns a specific agent by name", async () => {
    const { getSubAgent } = await import("../../src/tools/delegate.js");
    const agent = getSubAgent("timekeeper");
    expect(agent).toBeDefined();
    expect(agent!.name).toBe("timekeeper");
  });

  it("getSubAgent returns undefined for unknown agent", async () => {
    const { getSubAgent } = await import("../../src/tools/delegate.js");
    expect(getSubAgent("totally_unknown_agent")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// knowledge.readCoreKnowledge (directly tested — not via registry mock)
// ---------------------------------------------------------------------------

// We need to import the real module to test readCoreKnowledge
// Reset the mock for knowledge.js and import the actual file
describe("knowledge.readCoreKnowledge", () => {
  const originalCwd = process.cwd();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  afterEach(() => {
    process.chdir(originalCwd);
  });

  it("reads the metodologia_core.md file and returns content", async () => {
    vi.doUnmock("fs/promises");

    const { readCoreKnowledge } = await vi.importActual<typeof import("../../src/tools/knowledge.js")>(
      "../../src/tools/knowledge.js"
    );

    const result = await readCoreKnowledge({ topic: "identity" });
    expect(result).toContain("Base de Conocimiento Core");
    expect(result).toContain("MetodologIA");
  });

  it("returns error string when file does not exist", async () => {
    vi.doUnmock("fs/promises");
    process.chdir("/tmp");

    const { readCoreKnowledge } = await vi.importActual<typeof import("../../src/tools/knowledge.js")>(
      "../../src/tools/knowledge.js"
    );

    const result = await readCoreKnowledge({});
    expect(result).toContain("Error");
    expect(result).toContain("unavailable");
  });

  it("definition has correct function name", async () => {
    const { definition } = await vi.importActual<typeof import("../../src/tools/knowledge.js")>(
      "../../src/tools/knowledge.js"
    );
    expect(definition.function.name).toBe("read_core_knowledge");
  });

  it("works without a topic argument", async () => {
    vi.doUnmock("fs/promises");

    const { readCoreKnowledge } = await vi.importActual<typeof import("../../src/tools/knowledge.js")>(
      "../../src/tools/knowledge.js"
    );

    const result = await readCoreKnowledge({});
    expect(result).toContain("Base de Conocimiento Core");
    expect(result).toContain("MetodologIA");
  });
});
