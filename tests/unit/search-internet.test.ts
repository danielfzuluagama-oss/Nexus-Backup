import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

import { execute } from "../../src/tools/search-internet.js";

let originalEnv: NodeJS.ProcessEnv;

beforeEach(() => {
  originalEnv = { ...process.env };
  delete process.env.WEB_SEARCH_ENABLED;
  delete process.env.WEB_SEARCH_PROVIDER;
  delete process.env.BRAVE_SEARCH_API_KEY;
  delete process.env.TAVILY_API_KEY;
  delete process.env.GEMINI_API_KEY;
  delete process.env.GEMINI_WEB_SEARCH_MODEL;
  for (const key of Object.keys(process.env)) {
    if (key.startsWith("GEMINI_API_KEY_")) {
      delete process.env[key];
    }
  }
  vi.restoreAllMocks();
});

afterEach(() => {
  process.env = originalEnv;
  vi.unstubAllGlobals();
});

describe("search_internet tool", () => {
  it("blocks non-web utility queries", async () => {
    const payload = JSON.parse(await execute({ query: "Que hora es en Tokio?" }));

    expect(payload.status).toBe("blocked");
    expect(payload.message).toContain("explicit web research");
  });

  it("reports missing provider configuration for explicit research queries", async () => {
    const payload = JSON.parse(await execute({ query: "Busca en internet noticias recientes de OpenAI" }));

    expect(payload.status).toBe("disabled");
    expect(payload.message).toContain("disabled");
  });

  it("executes Brave web search when configured", async () => {
    process.env.BRAVE_SEARCH_API_KEY = "brave-key";
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        web: {
          results: [
            {
              title: "OpenAI Updates",
              url: "https://openai.com/news",
              description: "Latest product updates from OpenAI.",
              page_age: "2026-04-02T12:00:00Z",
            },
          ],
        },
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const payload = JSON.parse(
      await execute({
        query: "Busca en internet las ultimas noticias de OpenAI",
        max_results: 3,
        freshness: "7d",
      }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("api.search.brave.com/res/v1/web/search");
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("freshness=pw");
    expect(payload.status).toBe("ok");
    expect(payload.provider).toBe("brave");
    expect(payload.results[0]?.url).toBe("https://openai.com/news");
  });

  it("executes Tavily web search when explicitly selected", async () => {
    process.env.WEB_SEARCH_ENABLED = "true";
    process.env.WEB_SEARCH_PROVIDER = "tavily";
    process.env.TAVILY_API_KEY = "tvly-key";

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            title: "OpenAI Blog",
            url: "https://openai.com/blog",
            content: "Recent releases and research updates.",
            score: 0.91234,
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const payload = JSON.parse(
      await execute({ query: "Busca en internet fuentes recientes sobre OpenAI", max_results: 2 }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://api.tavily.com/search");
    expect(payload.status).toBe("ok");
    expect(payload.provider).toBe("tavily");
    expect(payload.results[0]?.score).toBe(0.9123);
  });

  it("executes Gemini grounded web search when explicitly selected", async () => {
    process.env.WEB_SEARCH_ENABLED = "true";
    process.env.WEB_SEARCH_PROVIDER = "gemini";
    process.env.GEMINI_API_KEY_PRISTINO_1_DANI = "gemini-key";
    process.env.GEMINI_WEB_SEARCH_MODEL = "gemini-2.5-flash";

    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          candidates: [
            {
              content: {
                parts: [{ text: "OpenAI announced new updates with cited sources." }],
              },
              groundingMetadata: {
                groundingChunks: [
                  {
                    web: {
                      uri: "https://vertexaisearch.cloud.google.com/grounding-api-redirect/test-source",
                      title: "OpenAI Newsroom",
                    },
                  },
                ],
                groundingSupports: [
                  {
                    segment: {
                      text: "OpenAI announced a new release and published details in its newsroom.",
                    },
                    groundingChunkIndices: [0],
                  },
                ],
              },
            },
          ],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        url: "https://openai.com/news/",
        body: {
          cancel: vi.fn().mockResolvedValue(undefined),
        },
      });
    vi.stubGlobal("fetch", fetchMock);

    const payload = JSON.parse(
      await execute({ query: "Busca en internet las ultimas noticias de OpenAI", max_results: 2 }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain(
      "generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    );
    expect(payload.status).toBe("ok");
    expect(payload.provider).toBe("gemini");
    expect(payload.results[0]?.url).toBe("https://openai.com/news/");
    expect(payload.results[0]?.snippet).toContain("OpenAI announced a new release");
  });
});
