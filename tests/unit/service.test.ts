import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockBotInit, mockBotHandleUpdate, mockBotFactory } = vi.hoisted(() => {
  const mockBotInit = vi.fn().mockResolvedValue(undefined);
  const mockBotHandleUpdate = vi.fn().mockResolvedValue(undefined);
  const mockBotFactory = vi.fn(() => ({
    init: mockBotInit,
    handleUpdate: mockBotHandleUpdate,
    api: {
      setWebhook: vi.fn().mockResolvedValue(true),
    },
    use: vi.fn(),
    on: vi.fn(),
    catch: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  }));

  return {
    mockBotInit,
    mockBotHandleUpdate,
    mockBotFactory,
  };
});

vi.mock("../../src/logger.js", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  },
}));

vi.mock("../../src/config.js", () => ({
  loadConfig: vi.fn(() => ({
    telegramBotToken: "legacy-token",
    allowedUserIds: [18219468],
    groqApiKey: "legacy-groq",
    groqModel: "openai/gpt-oss-120b",
    groqModelTiers: ["openai/gpt-oss-120b"],
    groqModelVision: "vision-model",
    openRouterApiKey: "",
    openRouterModel: "openrouter-model",
    dbPath: "./pristino.db",
    maxIterations: 5,
    maxHistory: 20,
    maxTokens: 4096,
    modelContextWindow: 131072,
    agentsPath: "./agents",
    googleOAuthToken: "",
    agentCredentials: new Map([
      [
        "pristino",
        {
          telegramBotToken: "bot-token",
          groqApiKeys: [{ key: "groq-key", owner: "SYSTEM" }],
          openRouterApiKeys: [],
        },
      ],
    ]),
  })),
}));

vi.mock("../../src/runtime.js", () => ({
  AgentRuntime: class MockAgentRuntime {
    instanceName: string;
    config: unknown;
    credentials: unknown;
    llm = {};
    memory = {};
    ecosystem = null;
    logger = {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    };
    subAgentRegistry = {
      registerEcosystemAgents: vi.fn(),
    };
    shutdown = vi.fn();

    constructor(name: string, config: unknown, credentials: unknown) {
      this.instanceName = name;
      this.config = config;
      this.credentials = credentials;
    }
  },
}));

vi.mock("../../src/bot.js", () => ({
  createBot: mockBotFactory,
}));

vi.mock("../../src/agent.js", () => ({
  initDelegation: vi.fn(),
  runAgent: vi.fn(),
}));

vi.mock("../../src/tools/registry.js", () => ({
  registerTool: vi.fn(),
}));

vi.mock("../../src/tools/delegate.js", () => ({
  registerEcosystemAgents: vi.fn(),
}));

vi.mock("../../src/ecosystem/loader.js", () => ({
  loadAllAgents: vi.fn(() => ({
    initialized: false,
    agents: new Map(),
  })),
}));

vi.mock("../../src/ecosystem/router.js", () => ({
  createRouteExecutor: vi.fn(),
  getRouteRequestDefinition: vi.fn(),
}));

vi.mock("../../src/tools/symlink.js", () => ({
  initializeOpenClawSymlinks: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@google-cloud/pubsub", () => ({
  PubSub: class MockPubSub {
    topic() {
      return {
        publishMessage: vi.fn().mockResolvedValue("mock-message-id"),
      };
    }
  },
}));

describe("service bot initialization", () => {
  beforeEach(() => {
    vi.resetModules();
    mockBotInit.mockClear();
    mockBotHandleUpdate.mockClear();
    mockBotFactory.mockClear();
  });

  it("initializes each bot while building the service context", async () => {
    const { getServiceContext } = await import("../../src/service.js");

    await getServiceContext();

    expect(mockBotFactory).toHaveBeenCalledTimes(1);
    expect(mockBotInit).toHaveBeenCalledTimes(1);
  });

  it("handles queued updates after initialization", async () => {
    const { processTaskPayload } = await import("../../src/service.js");
    const update = { update_id: 1774733137154 } as never;

    await processTaskPayload({
      botName: "pristino",
      update,
    });

    expect(mockBotInit).toHaveBeenCalledTimes(1);
    expect(mockBotHandleUpdate).toHaveBeenCalledWith(update);
  });

  it("accepts the public bot name when consuming queued updates", async () => {
    const { processTaskPayload } = await import("../../src/service.js");
    const update = { update_id: 1774733137155 } as never;

    await processTaskPayload({
      botName: "nexus",
      update,
    });

    expect(mockBotInit).toHaveBeenCalledTimes(1);
    expect(mockBotHandleUpdate).toHaveBeenCalledWith(update);
  });

  it("derives a public cloud functions webhook base URL from forwarded host metadata", async () => {
    const { resolveWebhookBaseUrl } = await import("../../src/service.js");

    expect(
      resolveWebhookBaseUrl({
        forwardedHost: "us-central1-nexus-5b9bb.cloudfunctions.net",
        protocol: "https",
        functionTarget: "api",
        appendFunctionTarget: true,
      }),
    ).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api");
  });

  it("falls back to the canonical cloud functions URL when only project metadata is available", async () => {
    const { resolveWebhookBaseUrl } = await import("../../src/service.js");

    expect(
      resolveWebhookBaseUrl({
        projectId: "nexus-5b9bb",
        region: "us-central1",
        functionTarget: "api",
        appendFunctionTarget: true,
      }),
    ).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api");
  });

  it("resolves both request and official endpoint URLs from a cloud functions host", async () => {
    const { resolveServiceEndpointUrls } = await import("../../src/service.js");
    const originalProjectId = process.env.GCLOUD_PROJECT;

    process.env.GCLOUD_PROJECT = "nexus-5b9bb";

    try {
      const endpoints = resolveServiceEndpointUrls({
        get(name: string) {
          if (name === "x-forwarded-host") return "us-central1-nexus-5b9bb.cloudfunctions.net";
          if (name === "x-forwarded-proto") return "https";
          if (name === "host") return undefined;
          return undefined;
        },
        protocol: "https",
      });

      expect(endpoints.requestBaseUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api");
      expect(endpoints.officialBaseUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api");
      expect(endpoints.officialHealthUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api/healthz");
      expect(endpoints.officialStatusUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api/status");
    } finally {
      if (originalProjectId === undefined) {
        delete process.env.GCLOUD_PROJECT;
      } else {
        process.env.GCLOUD_PROJECT = originalProjectId;
      }
    }
  });

  it("keeps the request URL for run.app but advertises cloudfunctions.net as the official base", async () => {
    const { resolveServiceEndpointUrls } = await import("../../src/service.js");
    const originalProjectId = process.env.GCLOUD_PROJECT;

    process.env.GCLOUD_PROJECT = "nexus-5b9bb";

    try {
      const endpoints = resolveServiceEndpointUrls({
        get(name: string) {
          if (name === "x-forwarded-host") return "api-7bngy2juba-uc.a.run.app";
          if (name === "x-forwarded-proto") return "https";
          if (name === "host") return undefined;
          return undefined;
        },
        protocol: "https",
      });

      expect(endpoints.requestBaseUrl).toBe("https://api-7bngy2juba-uc.a.run.app");
      expect(endpoints.requestHealthUrl).toBe("https://api-7bngy2juba-uc.a.run.app/healthz");
      expect(endpoints.officialBaseUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api");
      expect(endpoints.officialHealthUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api/healthz");
      expect(endpoints.officialStatusUrl).toBe("https://us-central1-nexus-5b9bb.cloudfunctions.net/api/status");
    } finally {
      if (originalProjectId === undefined) {
        delete process.env.GCLOUD_PROJECT;
      } else {
        process.env.GCLOUD_PROJECT = originalProjectId;
      }
    }
  });
});
