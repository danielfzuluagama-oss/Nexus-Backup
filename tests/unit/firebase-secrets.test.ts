import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { secretValues } = vi.hoisted(() => ({
  secretValues: new Map<string, unknown>(),
}));

vi.mock("firebase-functions/params", () => ({
  defineSecret: (name: string) => ({
    name,
    value: () => String(secretValues.get(name) ?? ""),
  }),
  defineJsonSecret: (name: string) => ({
    name,
    value: () => secretValues.get(name),
  }),
}));

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  secretValues.clear();

  for (const key of Object.keys(process.env)) {
    if (
      key.startsWith("TELEGRAM_")
      || key.startsWith("GROQ_")
      || key.startsWith("OPENROUTER_")
      || key.startsWith("GEMINI_")
      || key.startsWith("GITHUB_")
    ) {
      delete process.env[key];
    }
  }
});

afterEach(() => {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) {
      delete process.env[key];
    }
  }
  Object.assign(process.env, originalEnv);
  vi.resetModules();
});

describe("materializeFunctionSecrets", () => {
  it("binds GitHub proposal publishing through the JSON secret only", async () => {
    const { functionSecrets } = await import("../../src/firebase-secrets.js");

    const secretNames = functionSecrets.map((secret) => secret.name);

    expect(secretNames).toContain("GITHUB_PROPOSALS_CONFIG");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_TOKEN");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_SSH_KEY");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_SSH_KNOWN_HOSTS");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_OWNER");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_REPO");
    expect(secretNames).not.toContain("GITHUB_PROPOSALS_BRANCH");
    expect(secretNames).not.toContain("GITHUB_PAGES_BASE_URL");
  });

  it("materializes direct secrets and Gemini JSON bundles into env vars", async () => {
    secretValues.set("TELEGRAM_BOT_TOKEN_PRISTINO", "telegram-token");
    secretValues.set("GEMINI_CONFIG_PRISTINO", {
      keys: [
        { env: "GEMINI_API_KEY_PRISTINO_1_DANI", key: "gemini-key-1" },
        { env: "GEMINI_API_KEY_PRISTINO_2_JAVIER", key: "gemini-key-2" },
        { env: "GEMINI_API_KEY_PRISTINO_3_KATHE", key: "gemini-key-3" },
      ],
    });

    const { materializeFunctionSecrets } = await import("../../src/firebase-secrets.js");
    materializeFunctionSecrets();

    expect(process.env.TELEGRAM_BOT_TOKEN_PRISTINO).toBe("telegram-token");
    expect(process.env.GEMINI_API_KEY_PRISTINO_1_DANI).toBe("gemini-key-1");
    expect(process.env.GEMINI_API_KEY_PRISTINO_2_JAVIER).toBe("gemini-key-2");
    expect(process.env.GEMINI_API_KEY_PRISTINO_3_KATHE).toBe("gemini-key-3");
  });

  it("preserves concrete env vars but replaces pending placeholders", async () => {
    process.env.GEMINI_API_KEY_PRISTINO_1_DANI = "<PENDING>";
    process.env.GEMINI_API_KEY_PRISTINO_2_JAVIER = "manual-value";
    secretValues.set("GEMINI_CONFIG_PRISTINO", {
      keys: [
        { env: "GEMINI_API_KEY_PRISTINO_1_DANI", key: "resolved-value" },
        { env: "GEMINI_API_KEY_PRISTINO_2_JAVIER", key: "secret-value" },
      ],
    });

    const { materializeFunctionSecrets } = await import("../../src/firebase-secrets.js");
    materializeFunctionSecrets();

    expect(process.env.GEMINI_API_KEY_PRISTINO_1_DANI).toBe("resolved-value");
    expect(process.env.GEMINI_API_KEY_PRISTINO_2_JAVIER).toBe("manual-value");
  });

  it("materializes GitHub proposal publishing config from JSON secret", async () => {
    secretValues.set("GITHUB_PROPOSALS_CONFIG", {
      token: "github-token",
      sshKey: "ssh-private-key",
      sshKnownHosts: "github-hosts",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    });

    const { materializeFunctionSecrets } = await import("../../src/firebase-secrets.js");
    materializeFunctionSecrets();

    expect(process.env.GITHUB_PROPOSALS_TOKEN).toBe("github-token");
    expect(process.env.GITHUB_PROPOSALS_SSH_KEY).toBe("ssh-private-key");
    expect(process.env.GITHUB_PROPOSALS_SSH_KNOWN_HOSTS).toBe("github-hosts");
    expect(process.env.GITHUB_PROPOSALS_OWNER).toBe("danielfzuluagama-oss");
    expect(process.env.GITHUB_PROPOSALS_REPO).toBe("propuestas-comerciales");
    expect(process.env.GITHUB_PROPOSALS_BRANCH).toBe("main");
    expect(process.env.GITHUB_PAGES_BASE_URL).toBe("https://danielfzuluagama-oss.github.io/propuestas-comerciales");
  });

  it("preserves concrete GitHub env vars while filling missing JSON-backed values", async () => {
    process.env.GITHUB_PROPOSALS_TOKEN = "manual-token";
    process.env.GITHUB_PROPOSALS_BRANCH = "<PENDING>";
    secretValues.set("GITHUB_PROPOSALS_CONFIG", {
      token: "json-token",
      owner: "danielfzuluagama-oss",
      repo: "propuestas-comerciales",
      branch: "main",
      pagesBaseUrl: "https://danielfzuluagama-oss.github.io/propuestas-comerciales",
    });

    const { materializeFunctionSecrets } = await import("../../src/firebase-secrets.js");
    materializeFunctionSecrets();

    expect(process.env.GITHUB_PROPOSALS_TOKEN).toBe("manual-token");
    expect(process.env.GITHUB_PROPOSALS_OWNER).toBe("danielfzuluagama-oss");
    expect(process.env.GITHUB_PROPOSALS_REPO).toBe("propuestas-comerciales");
    expect(process.env.GITHUB_PROPOSALS_BRANCH).toBe("main");
    expect(process.env.GITHUB_PAGES_BASE_URL).toBe("https://danielfzuluagama-oss.github.io/propuestas-comerciales");
  });
});
