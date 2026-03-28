// ============================================================================
// T022 — Integration test for ecosystem loading
// Covers TS-028: 6+ valid agent definitions loaded with independent skill catalogs
// ============================================================================

import { describe, it, expect, vi, beforeAll } from "vitest";
import { join } from "node:path";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

import { loadAllAgents } from "../../src/ecosystem/loader.js";
import { AgentDefinitionSchema } from "../../src/ecosystem/types.js";
import type { EcosystemState } from "../../src/ecosystem/types.js";

const AGENTS_PATH = join(process.cwd(), "agents");

// ---------------------------------------------------------------------------
// TS-028: 6+ valid agent definitions all loaded and registered
// ---------------------------------------------------------------------------

describe("TS-028: Full ecosystem loading — 6+ agents registered with independent skill catalogs", () => {
  let state: EcosystemState;

  // The known agents in the agents/ directory
  const EXPECTED_AGENT_IDS = [
    "analyst",
    "researcher",
    "synthesizer",
    "timekeeper",
    "validator",
    "pristino-orchestrator",
  ];

  beforeAll(() => {
    state = loadAllAgents(AGENTS_PATH);
  });

  it("ecosystem state is initialized (initialized flag is true)", () => {
    expect(state.initialized).toBe(true);
  });

  it("loads at least 6 agents", () => {
    expect(state.agents.size).toBeGreaterThanOrEqual(6);
  });

  it("all 6 expected agents are present in the agents map", () => {
    for (const id of EXPECTED_AGENT_IDS) {
      expect(state.agents.has(id)).toBe(true);
    }
  });

  it("each agent has a non-empty id matching the directory name", () => {
    for (const id of EXPECTED_AGENT_IDS) {
      const agent = state.agents.get(id);
      expect(agent).toBeDefined();
      expect(agent!.id).toBe(id);
    }
  });

  it("each agent has a non-empty name", () => {
    for (const [, agent] of state.agents) {
      expect(agent.name.length).toBeGreaterThan(0);
    }
  });

  it("each agent has a non-empty role", () => {
    for (const [, agent] of state.agents) {
      expect(agent.role.length).toBeGreaterThan(0);
    }
  });

  it("each agent has a non-empty mission", () => {
    for (const [, agent] of state.agents) {
      expect(agent.mission.length).toBeGreaterThan(0);
    }
  });

  it("each agent has a mandate array with at least one item", () => {
    for (const [, agent] of state.agents) {
      expect(Array.isArray(agent.mandate)).toBe(true);
      expect(agent.mandate.length).toBeGreaterThan(0);
    }
  });

  it("each agent has an allowedTools array", () => {
    for (const [, agent] of state.agents) {
      expect(Array.isArray(agent.allowedTools)).toBe(true);
    }
  });

  it("each agent passes AgentDefinitionSchema Zod validation", () => {
    for (const [id, agent] of state.agents) {
      const result = AgentDefinitionSchema.safeParse(agent);
      expect(result.success, `Agent '${id}' failed Zod validation`).toBe(true);
    }
  });

  it("skills map is initialized (even if empty — no skill.yaml files required)", () => {
    expect(state.skills).toBeInstanceOf(Map);
  });

  it("each loaded agent id is unique in the map", () => {
    const ids = Array.from(state.agents.keys());
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("_shared directory is NOT loaded as an agent", () => {
    expect(state.agents.has("_shared")).toBe(false);
  });

  // Independent skill catalogs — skills map is keyed by agentId
  // Currently agents may not have skill.yaml files; we verify the map is isolated
  it("skills map does not mix agents — each key is an agent id if skills are present", () => {
    for (const [agentId] of state.skills) {
      expect(state.agents.has(agentId)).toBe(true);
    }
  });

  it("analyst agent has correct role", () => {
    const analyst = state.agents.get("analyst");
    expect(analyst!.role).toContain("Analisis");
  });

  it("researcher agent has correct role", () => {
    const researcher = state.agents.get("researcher");
    expect(researcher!.role).toBeDefined();
    expect(researcher!.role.length).toBeGreaterThan(0);
  });

  it("pristino-orchestrator has a version", () => {
    const orchestrator = state.agents.get("pristino-orchestrator");
    expect(orchestrator!.version).toBeDefined();
    expect(orchestrator!.version.length).toBeGreaterThan(0);
  });

  it("all agents have a memoryPolicy string", () => {
    for (const [, agent] of state.agents) {
      expect(typeof agent.memoryPolicy).toBe("string");
    }
  });

  it("all agents have a securityPolicy string", () => {
    for (const [, agent] of state.agents) {
      expect(typeof agent.securityPolicy).toBe("string");
    }
  });

  it("all agents have a failureHandling string", () => {
    for (const [, agent] of state.agents) {
      expect(typeof agent.failureHandling).toBe("string");
    }
  });

  it("all agents have a completionCriteria string", () => {
    for (const [, agent] of state.agents) {
      expect(typeof agent.completionCriteria).toBe("string");
    }
  });
});
