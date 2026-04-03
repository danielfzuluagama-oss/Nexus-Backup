// ============================================================================
// Unit tests for src/config.ts
// Covers: env var parsing, collectOrderedKeys, loadAgentCredentials,
// loadConfig, getAgentCredentials, getInstanceDbPath
// ============================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock logger before importing config
vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("dotenv", () => ({ config: vi.fn() }));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Snapshot and restore process.env around each test */
let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  // Clear all env vars that config.ts reads
  for (const key of Object.keys(process.env)) {
    if (
      key.startsWith("TELEGRAM_") ||
      key.startsWith("GROQ_") ||
      key.startsWith("OPENROUTER_") ||
      key.startsWith("GEMINI_") ||
      key.startsWith("DB_PATH") ||
      key.startsWith("MAX_") ||
      key.startsWith("MODEL_") ||
      key.startsWith("AGENTS_PATH") ||
      key.startsWith("GOOGLE_OAUTH")
    ) {
      delete process.env[key];
    }
  }
});

afterEach(() => {
  // Restore original env
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
  vi.resetModules();
});

// ---------------------------------------------------------------------------
// Minimal valid env setup helper
// ---------------------------------------------------------------------------

function setMinimalEnv() {
  process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "test-token-pristino";
  process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "groq-key-1";
  process.env.TELEGRAM_ALLOWED_USER_IDS = "12345";
}

// ---------------------------------------------------------------------------
// loadConfig — basic happy path
// ---------------------------------------------------------------------------

describe("loadConfig — happy path", () => {
  it("loads config with valid minimal env vars", async () => {
    setMinimalEnv();
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();

    expect(config.allowedUserIds).toEqual([12345]);
    expect(config.groqModelTiers).toBeDefined();
    expect(Array.isArray(config.groqModelTiers)).toBe(true);
  });

  it("sets defaults for optional numeric env vars", async () => {
    setMinimalEnv();
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();

    expect(config.maxIterations).toBe(5);
    expect(config.maxHistory).toBe(20);
    expect(config.maxTokens).toBe(4096);
    expect(config.modelContextWindow).toBe(131072);
  });

  it("respects custom numeric env vars", async () => {
    setMinimalEnv();
    process.env.MAX_ITERATIONS = "10";
    process.env.MAX_HISTORY = "50";
    process.env.MAX_TOKENS = "8192";
    process.env.MODEL_CONTEXT_WINDOW = "65536";

    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();

    expect(config.maxIterations).toBe(10);
    expect(config.maxHistory).toBe(50);
    expect(config.maxTokens).toBe(8192);
    expect(config.modelContextWindow).toBe(65536);
  });

  it("uses default DB path and agents path", async () => {
    setMinimalEnv();
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();

    expect(config.dbPath).toBe("./pristino.db");
    expect(config.agentsPath).toBe("./agents");
  });

  it("respects custom DB_PATH", async () => {
    setMinimalEnv();
    process.env.DB_PATH = "/custom/path.db";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.dbPath).toBe("/custom/path.db");
  });

  it("sets groqModel from GROQ_MODEL env var", async () => {
    setMinimalEnv();
    process.env.GROQ_MODEL = "llama-custom-model";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.groqModel).toBe("llama-custom-model");
  });

  it("sets openRouterModel from OPENROUTER_MODEL env var", async () => {
    setMinimalEnv();
    process.env.OPENROUTER_MODEL = "custom/router-model";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.openRouterModel).toBe("custom/router-model");
  });

  it("loads Gemini model and enables fallback when a Gemini key is present", async () => {
    setMinimalEnv();
    process.env.GEMINI_API_KEY_PRISTINO_1_DANI = "gemini-key-1";
    process.env.GEMINI_API_KEY_PRISTINO_2_JAVIER = "gemini-key-2";
    process.env.GEMINI_API_KEY_PRISTINO_3_KATHE = "gemini-key-3";
    process.env.GEMINI_MODEL = "gemini-3-flash-preview";
    process.env.GEMINI_SIMPLE_MODEL = "gemini-2.5-flash";
    process.env.GEMINI_COMPLEX_MODEL = "gemini-3-flash-preview";
    const { loadConfig, getAgentCredentials } = await import("../../src/config.js");
    const config = loadConfig();
    const geminiKeys = getAgentCredentials(config, "pristino").geminiApiKeys;

    expect(config.geminiModel).toBe("gemini-3-flash-preview");
    expect(config.geminiSimpleModel).toBe("gemini-2.5-flash");
    expect(config.geminiComplexModel).toBe("gemini-3-flash-preview");
    expect(config.geminiFallbackEnabled).toBe(true);
    expect(geminiKeys).toHaveLength(3);
    expect(geminiKeys[0].key).toBe("gemini-key-1");
    expect(geminiKeys[1].key).toBe("gemini-key-2");
    expect(geminiKeys[2].key).toBe("gemini-key-3");
  });

  it("defaults Gemini simple and complex routes to gemini-3-flash-preview", async () => {
    setMinimalEnv();
    process.env.GEMINI_API_KEY_PRISTINO_1_DANI = "gemini-key-1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();

    expect(config.geminiModel).toBe("gemini-3-flash-preview");
    expect(config.geminiSimpleModel).toBe("gemini-3-flash-preview");
    expect(config.geminiComplexModel).toBe("gemini-3-flash-preview");
  });

  it("parses the provider override flag", async () => {
    setMinimalEnv();
    process.env.LLM_PROVIDER_OVERRIDE = "gemini";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.llmProviderOverride).toBe("gemini");
  });

  it("sets googleOAuthToken from env var", async () => {
    setMinimalEnv();
    process.env.GOOGLE_OAUTH_ACCESS_TOKEN = "oauth-token-xyz";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.googleOAuthToken).toBe("oauth-token-xyz");
  });
});

// ---------------------------------------------------------------------------
// loadConfig — TELEGRAM_ALLOWED_USER_IDS parsing
// ---------------------------------------------------------------------------

describe("loadConfig — TELEGRAM_ALLOWED_USER_IDS parsing", () => {
  it("parses multiple user IDs separated by commas", async () => {
    setMinimalEnv();
    process.env.TELEGRAM_ALLOWED_USER_IDS = "111,222,333";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.allowedUserIds).toEqual([111, 222, 333]);
  });

  it("trims whitespace around IDs", async () => {
    setMinimalEnv();
    process.env.TELEGRAM_ALLOWED_USER_IDS = " 111 , 222 , 333 ";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.allowedUserIds).toEqual([111, 222, 333]);
  });

  it("throws when TELEGRAM_ALLOWED_USER_IDS is missing", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "test-token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "groq-key";
    // No TELEGRAM_ALLOWED_USER_IDS
    const { loadConfig } = await import("../../src/config.js");
    expect(() => loadConfig()).toThrow(/TELEGRAM_ALLOWED_USER_IDS/);
  });

  it("throws when all provided IDs are invalid", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "test-token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "groq-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "abc,def";
    const { loadConfig } = await import("../../src/config.js");
    expect(() => loadConfig()).toThrow(/TELEGRAM_ALLOWED_USER_IDS/);
  });

  it("ignores non-integer and negative IDs but keeps valid ones", async () => {
    setMinimalEnv();
    process.env.TELEGRAM_ALLOWED_USER_IDS = "999,abc,-5,0,888";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.allowedUserIds).toEqual([999, 888]);
  });
});

// ---------------------------------------------------------------------------
// loadConfig — missing critical vars
// ---------------------------------------------------------------------------

describe("loadConfig — missing critical env vars", () => {
  it("throws when TELEGRAM_BOT_TOKEN and agentCredentials are both missing", async () => {
    process.env.TELEGRAM_ALLOWED_USER_IDS = "12345";
    // No token at all, no agent credentials
    const { loadConfig } = await import("../../src/config.js");
    expect(() => loadConfig()).toThrow(/TELEGRAM_BOT_TOKEN/);
  });

  it("throws when GROQ_API_KEY and agentCredentials are both missing", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "some-token";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "12345";
    // No groq key, no agent credentials
    const { loadConfig } = await import("../../src/config.js");
    expect(() => loadConfig()).toThrow(/GROQ_API_KEY/);
  });

  it("does not throw when agentCredentials present (skips legacy checks)", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "agent-token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "agent-groq-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "12345";
    const { loadConfig } = await import("../../src/config.js");
    expect(() => loadConfig()).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// loadConfig — legacy single-agent fallback
// ---------------------------------------------------------------------------

describe("loadConfig — legacy single-agent fallback", () => {
  it("reads TELEGRAM_BOT_TOKEN (non-agent-suffixed) as legacy token", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "legacy-token";
    process.env.GROQ_API_KEY = "legacy-groq-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "777";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.telegramBotToken).toBe("legacy-token");
    expect(config.groqApiKey).toBe("legacy-groq-key");
  });

  it("TELEGRAM_BOT_TOKEN takes precedence over TELEGRAM_BOT_TOKEN_PRISTINO for legacy field", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "legacy-token";
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "pristino-token";
    process.env.GROQ_API_KEY_PRISTINO_1 = "groq-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "42";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    // TELEGRAM_BOT_TOKEN ?? TELEGRAM_BOT_TOKEN_PRISTINO — TELEGRAM_BOT_TOKEN wins
    expect(config.telegramBotToken).toBe("legacy-token");
  });
});

// ---------------------------------------------------------------------------
// loadConfig — groqModelTiers
// ---------------------------------------------------------------------------

describe("loadConfig — groqModelTiers", () => {
  it("builds groqModelTiers from tier env vars", async () => {
    setMinimalEnv();
    process.env.GROQ_MODEL_TIER1 = "model-tier1";
    process.env.GROQ_MODEL_TIER2 = "model-tier2";
    process.env.GROQ_MODEL_TIER3 = "model-tier3";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.groqModelTiers).toEqual(["model-tier1", "model-tier2", "model-tier3"]);
  });

  it("uses defaults for missing tier env vars", async () => {
    setMinimalEnv();
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.groqModelTiers.length).toBe(3);
    expect(config.groqModelTiers[0]).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// loadAgentCredentials — multi-key collectOrderedKeys
// ---------------------------------------------------------------------------

describe("loadAgentCredentials — multi-key collection", () => {
  it("collects ordered keys by numeric suffix", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "key1";
    process.env.GROQ_API_KEY_PRISTINO_2_OWNER2 = "key2";
    process.env.GROQ_API_KEY_PRISTINO_3_OWNER3 = "key3";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = config.agentCredentials.get("pristino");
    expect(creds).toBeDefined();
    expect(creds!.groqApiKeys).toHaveLength(3);
    expect(creds!.groqApiKeys[0].key).toBe("key1");
    expect(creds!.groqApiKeys[1].key).toBe("key2");
    expect(creds!.groqApiKeys[2].key).toBe("key3");
  });

  it("deduplicates identical key values", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "same-key";
    process.env.GROQ_API_KEY_PRISTINO_2_OWNER2 = "same-key"; // duplicate
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = config.agentCredentials.get("pristino");
    expect(creds!.groqApiKeys).toHaveLength(1);
    expect(creds!.groqApiKeys[0].key).toBe("same-key");
  });

  it("filters out PENDING placeholder values", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "<PENDING>";
    process.env.GROQ_API_KEY_PRISTINO_2_OWNER2 = "real-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = config.agentCredentials.get("pristino");
    expect(creds!.groqApiKeys).toHaveLength(1);
    expect(creds!.groqApiKeys[0].key).toBe("real-key");
  });

  it("filters out empty/whitespace-only key values", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "   ";
    process.env.GROQ_API_KEY_PRISTINO_2_OWNER2 = "real-key";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = config.agentCredentials.get("pristino");
    expect(creds!.groqApiKeys).toHaveLength(1);
  });

  it("loads deonto agent credentials when env vars are set", async () => {
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token-p";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "key-p";
    process.env.TELEGRAM_BOT_TOKEN_DEONTO = "token-d";
    process.env.GROQ_API_KEY_DEONTO_1_OWNER1 = "key-d";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.agentCredentials.has("pristino")).toBe(true);
    expect(config.agentCredentials.has("deonto")).toBe(true);
  });

  it("does not register agent if telegram token is missing (partial creds)", async () => {
    // Only groq key provided, no telegram token
    process.env.GROQ_API_KEY_DEONTO_1_OWNER1 = "key-d";
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token-p";
    process.env.GROQ_API_KEY_PRISTINO_1_OWNER1 = "key-p";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    // deonto has groq but no telegram — should NOT be registered
    expect(config.agentCredentials.has("deonto")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// getAgentCredentials
// ---------------------------------------------------------------------------

describe("getAgentCredentials", () => {
  it("returns agent-specific credentials when available", async () => {
    setMinimalEnv();
    const { loadConfig, getAgentCredentials } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = getAgentCredentials(config, "pristino");
    expect(creds.telegramBotToken).toBe("test-token-pristino");
    expect(creds.groqApiKeys.length).toBeGreaterThan(0);
  });

  it("falls back to legacy config when no agent-specific credentials", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "legacy-token";
    process.env.GROQ_API_KEY = "legacy-groq";
    process.env.OPENROUTER_API_KEY = "legacy-or";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    const { loadConfig, getAgentCredentials } = await import("../../src/config.js");
    const config = loadConfig();
    const creds = getAgentCredentials(config, "deonto");
    expect(creds.telegramBotToken).toBe("legacy-token");
    expect(creds.groqApiKeys).toEqual([{ key: "legacy-groq", owner: "LEGACY" }]);
    expect(creds.openRouterApiKeys).toEqual([{ key: "legacy-or", owner: "LEGACY" }]);
    expect(creds.geminiApiKeys).toEqual([]);
  });

  it("returns empty arrays for legacy keys when they are not set", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "only-token";
    process.env.TELEGRAM_ALLOWED_USER_IDS = "1";
    // No GROQ_API_KEY, no OPENROUTER_API_KEY, no agent credentials
    const { loadConfig, getAgentCredentials } = await import("../../src/config.js");
    // This will throw because GROQ_API_KEY is missing and agentCredentials is empty
    // So let's add a pristino key to bypass that, but test deonto fallback
    process.env.TELEGRAM_BOT_TOKEN_PRISTINO = "token-p";
    process.env.GROQ_API_KEY_PRISTINO_1 = "key-p";
    const config = loadConfig();
    const creds = getAgentCredentials(config, "deonto");
    // Falls back to legacy: groqApiKey is empty string => empty array
    expect(creds.groqApiKeys).toEqual([]);
    expect(creds.openRouterApiKeys).toEqual([]);
    expect(creds.geminiApiKeys).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getInstanceDbPath
// ---------------------------------------------------------------------------

describe("getInstanceDbPath", () => {
  it("returns config.dbPath when DB_PATH env var is set", async () => {
    setMinimalEnv();
    process.env.DB_PATH = "/explicit/path.db";
    const { loadConfig, getInstanceDbPath } = await import("../../src/config.js");
    const config = loadConfig();
    expect(getInstanceDbPath(config, "pristino")).toBe("/explicit/path.db");
  });

  it("returns agent-specific path when DB_PATH is NOT set", async () => {
    setMinimalEnv();
    // DB_PATH is NOT set (cleared in beforeEach)
    const { loadConfig, getInstanceDbPath } = await import("../../src/config.js");
    const config = loadConfig();
    expect(getInstanceDbPath(config, "pristino")).toBe("./data/pristino.db");
    expect(getInstanceDbPath(config, "deonto")).toBe("./data/deonto.db");
  });
});

// ---------------------------------------------------------------------------
// MAX_ITERATIONS / MAX_HISTORY / MAX_TOKENS floor clamping
// ---------------------------------------------------------------------------

describe("loadConfig — numeric floor clamping", () => {
  it("clamps maxIterations to minimum of 1 when value is -1", async () => {
    setMinimalEnv();
    process.env.MAX_ITERATIONS = "-1";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.maxIterations).toBe(1);
  });

  it("clamps maxTokens to minimum of 128", async () => {
    setMinimalEnv();
    process.env.MAX_TOKENS = "10";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.maxTokens).toBe(128);
  });

  it("clamps modelContextWindow to minimum of 1024", async () => {
    setMinimalEnv();
    process.env.MODEL_CONTEXT_WINDOW = "100";
    const { loadConfig } = await import("../../src/config.js");
    const config = loadConfig();
    expect(config.modelContextWindow).toBe(1024);
  });
});
