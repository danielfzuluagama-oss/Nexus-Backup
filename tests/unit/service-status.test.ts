import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockGetToolNames,
  mockGetSubAgents,
  mockGetOperationalKnowledgeAccessor,
  mockOperationalStore,
  mockGetGitHubProposalsConfig,
} = vi.hoisted(() => ({
  mockGetToolNames: vi.fn(),
  mockGetSubAgents: vi.fn(),
  mockGetOperationalKnowledgeAccessor: vi.fn(),
  mockOperationalStore: {
    isAvailable: vi.fn(),
    hasSyncedKnowledge: vi.fn(),
  },
  mockGetGitHubProposalsConfig: vi.fn(),
}));

vi.mock("../../src/tools/registry.js", () => ({
  getToolNames: mockGetToolNames,
}));

vi.mock("../../src/tools/delegate.js", () => ({
  getSubAgents: mockGetSubAgents,
}));

vi.mock("../../src/knowledge/accessor.js", () => ({
  getOperationalKnowledgeAccessor: mockGetOperationalKnowledgeAccessor,
}));

vi.mock("../../src/knowledge/operational-store.js", () => ({
  getOperationalKnowledgeStore: () => mockOperationalStore,
}));

vi.mock("../../src/proposals/github-publisher.js", () => ({
  getGitHubProposalsConfig: mockGetGitHubProposalsConfig,
}));

import { buildServiceStatus } from "../../src/service-status.js";

function makeTelemetrySnapshot() {
  return {
    agentName: "pristino",
    generatedAt: "2026-04-01T00:00:00.000Z",
    remainingQuotaKnown: false as const,
    note: "local ledger",
    totals: {
      attempts: 3,
      successes: 2,
      quotaErrors: 1,
      payloadTooLargeErrors: 0,
      otherErrors: 0,
      breakerOpenSkips: 0,
    },
    entries: [
      {
        agentName: "pristino",
        routeKind: "standard",
        provider: "groq",
        model: "openai/gpt-oss-120b",
        owner: "OWNER1",
        keyIndex: 0,
        attempts: 2,
        successes: 1,
        quotaErrors: 1,
        payloadTooLargeErrors: 0,
        otherErrors: 0,
        breakerOpenSkips: 0,
        lastAttemptAt: "2026-04-01T00:00:00.000Z",
        lastSuccessAt: "2026-04-01T00:00:01.000Z",
        lastErrorAt: "2026-04-01T00:00:00.500Z",
        lastErrorKind: "quota",
        lastErrorMessage: "429 rate_limit",
        circuitOpen: false,
      },
    ],
  };
}

function makeContext(overrides: Record<string, unknown> = {}) {
  return {
    bots: new Map([["pristino", {}]]),
    runtimes: [
      {
        instanceName: "pristino",
        credentials: {
          groqApiKeys: [{ key: "groq-key", owner: "OWNER1" }],
          geminiApiKeys: [{ key: "gemini-key", owner: "OWNER2" }],
          openRouterApiKeys: [{ key: "or-key", owner: "OWNER3" }],
        },
        llm: {
          getTelemetrySnapshot: () => makeTelemetrySnapshot(),
        },
      },
    ],
    pollingStarted: false,
    server: null,
    webhooksConfigured: true,
    config: {
      llmProviderOverride: "auto",
      geminiFallbackEnabled: true,
      googleOAuthToken: "",
      webSearch: {
        enabled: true,
        provider: "auto",
        braveApiKey: "brave-key",
        tavilyApiKey: "",
        geminiApiKey: "",
        geminiModel: "gemini-2.5-flash",
      },
    },
    ecosystem: {
      initialized: true,
      agents: new Map([
        [
          "pristino-orchestrator",
          {
            id: "pristino-orchestrator",
            name: "Pristino Orchestrator",
            allowedTools: ["route_to_agent", "search_memory"],
          },
        ],
        [
          "researcher",
          {
            id: "researcher",
            name: "Researcher",
            allowedTools: ["get_current_time", "search_internet"],
          },
        ],
      ]),
      skills: new Map([
        [
          "pristino-orchestrator",
          [
            { id: "sales-architect" },
            { id: "proposal-writer" },
          ],
        ],
      ]),
    },
    ...overrides,
  };
}

describe("buildServiceStatus", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetToolNames.mockReturnValue(["search_memory", "route_to_agent", "search_internet"]);
    mockGetSubAgents.mockReturnValue(new Map([["researcher", {}], ["validator", {}]]));
    mockOperationalStore.isAvailable.mockReturnValue(true);
    mockOperationalStore.hasSyncedKnowledge.mockResolvedValue(true);
    mockGetOperationalKnowledgeAccessor.mockResolvedValue({
      getReport: vi.fn().mockResolvedValue({
        totalDocuments: 2459,
        totalChunks: 39606,
        processCount: 15,
      }),
    });
    mockGetGitHubProposalsConfig.mockReturnValue({
      token: "token",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    });
  });

  it("builds a ready operational status report", async () => {
    const status = await buildServiceStatus(makeContext() as never);

    expect(status.ok).toBe(true);
    expect(status.bots).toEqual(["pristino"]);
    expect(status.mode).toBe("local");
    expect(status.ecosystem.totalWorkflowCount).toBe(0);
    expect(status.providers.runtimes[0]?.configuredKeys).toEqual({
      groq: 1,
      gemini: 1,
      openRouter: 1,
    });
    expect(status.providers.runtimes[0]?.telemetry?.totals.quotaErrors).toBe(1);
    expect(status.knowledgeBase.source).toBe("firestore");
    expect(status.githubPublishing.configured).toBe(true);
    expect(status.proposalFlow.overallStatus).toBe("ready");
    expect(status.proposalFlow.draftingReady).toBe(true);
    expect(status.proposalFlow.githubPublishingConfigured).toBe(true);
    expect(status.proposalFlow.smokeScriptAvailable).toBe(true);
    expect(status.proposalFlow.templateAssetAvailable).toBe(true);
    expect(status.proposalFlow.renderSafeguardsReady).toBe(true);
    expect(status.webSearch.overallStatus).toBe("ready");
    expect(status.webSearch.activeProvider).toBe("brave");
    expect(status.webSearch.toolRegistered).toBe(true);
    expect(status.webSearch.researcherReady).toBe(true);
  });

  it("marks the proposal flow as degraded when GitHub publishing is unavailable", async () => {
    mockGetGitHubProposalsConfig.mockReturnValue(null);

    const status = await buildServiceStatus(makeContext() as never);

    expect(status.githubPublishing.configured).toBe(false);
    expect(status.proposalFlow.overallStatus).toBe("degraded");
    expect(status.proposalFlow.draftingReady).toBe(true);
    expect(status.proposalFlow.templateAssetAvailable).toBe(true);
    expect(status.proposalFlow.renderSafeguardsReady).toBe(true);
    expect(status.proposalFlow.issues).toContain(
      "GitHub proposal publishing is not configured in the current runtime",
    );
  });

  it("marks the proposal flow as blocked when the orchestrator skill is missing", async () => {
    mockOperationalStore.hasSyncedKnowledge.mockResolvedValue(false);
    mockGetGitHubProposalsConfig.mockReturnValue(null);

    const status = await buildServiceStatus(
      makeContext({
        ecosystem: {
          initialized: false,
          agents: new Map(),
          skills: new Map(),
        },
      }) as never,
    );

    expect(status.knowledgeBase.source).toBe("local");
    expect(status.githubPublishing.configured).toBe(false);
    expect(status.proposalFlow.overallStatus).toBe("blocked");
    expect(status.proposalFlow.issues).toContain("Ecosystem is not initialized");
    expect(status.proposalFlow.issues).toContain(
      "sales-architect skill missing from pristino-orchestrator",
    );
    expect(status.proposalFlow.issues).toContain(
      "GitHub proposal publishing is not configured in the current runtime",
    );
  });

  it("marks web search as degraded when enabled without provider keys", async () => {
    const status = await buildServiceStatus(
      makeContext({
        config: {
          llmProviderOverride: "auto",
          geminiFallbackEnabled: true,
          googleOAuthToken: "",
          webSearch: {
            enabled: true,
            provider: "auto",
            braveApiKey: "",
            tavilyApiKey: "",
            geminiApiKey: "",
            geminiModel: "gemini-2.5-flash",
          },
        },
      }) as never,
    );

    expect(status.webSearch.overallStatus).toBe("degraded");
    expect(status.webSearch.issues).toContain("No web search provider credential is configured");
  });

  it("marks web search as ready when Gemini is the active provider", async () => {
    const status = await buildServiceStatus(
      makeContext({
        config: {
          llmProviderOverride: "auto",
          geminiFallbackEnabled: true,
          googleOAuthToken: "",
          webSearch: {
            enabled: true,
            provider: "gemini",
            braveApiKey: "",
            tavilyApiKey: "",
            geminiApiKey: "gemini-key",
            geminiModel: "gemini-2.5-flash",
          },
        },
      }) as never,
    );

    expect(status.webSearch.overallStatus).toBe("ready");
    expect(status.webSearch.activeProvider).toBe("gemini");
  });

  it("reports server mode when running behind function runtime env vars", async () => {
    const originalPort = process.env.PORT;
    process.env.PORT = "8080";

    try {
      const status = await buildServiceStatus(makeContext() as never);
      expect(status.mode).toBe("server");
    } finally {
      if (originalPort === undefined) {
        delete process.env.PORT;
      } else {
        process.env.PORT = originalPort;
      }
    }
  });
});
