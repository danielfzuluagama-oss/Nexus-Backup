import { describe, expect, it } from "vitest";

import {
  buildInternetResearchResponseContract,
  resolveActiveWebSearchProvider,
  resolveWebSearchSettings,
  shouldPreferInternetResearch,
} from "../../src/web-search.js";

describe("web search settings", () => {
  it("disables web search by default when no provider keys exist", () => {
    const settings = resolveWebSearchSettings({});

    expect(settings.enabled).toBe(false);
    expect(settings.provider).toBe("auto");
    expect(resolveActiveWebSearchProvider(settings)).toBe(null);
  });

  it("resolves Brave as the active provider when configured in auto mode", () => {
    const settings = resolveWebSearchSettings({
      BRAVE_SEARCH_API_KEY: "brave-key",
    });

    expect(settings.enabled).toBe(true);
    expect(resolveActiveWebSearchProvider(settings)).toBe("brave");
  });

  it("honors an explicit Tavily provider selection", () => {
    const settings = resolveWebSearchSettings({
      WEB_SEARCH_ENABLED: "true",
      WEB_SEARCH_PROVIDER: "tavily",
      TAVILY_API_KEY: "tvly-key",
    });

    expect(resolveActiveWebSearchProvider(settings)).toBe("tavily");
  });

  it("resolves Gemini as the active provider from materialized runtime keys", () => {
    const settings = resolveWebSearchSettings({
      WEB_SEARCH_ENABLED: "true",
      WEB_SEARCH_PROVIDER: "gemini",
      GEMINI_API_KEY_PRISTINO_1_DANI: "gemini-key",
      GEMINI_SIMPLE_MODEL: "gemini-2.5-flash",
    });

    expect(settings.geminiApiKey).toBe("gemini-key");
    expect(settings.geminiModel).toBe("gemini-2.5-flash");
    expect(resolveActiveWebSearchProvider(settings)).toBe("gemini");
  });
});

describe("web search policy", () => {
  it("prefers internet research for explicit web queries", () => {
    expect(
      shouldPreferInternetResearch("Busca en internet las ultimas noticias de OpenAI y cita fuentes."),
    ).toBe(true);
  });

  it("does not prefer internet research for time utility queries", () => {
    expect(shouldPreferInternetResearch("Que hora es en Tokio?")).toBe(false);
  });

  it("builds a response contract only when web search is justified", () => {
    expect(
      buildInternetResearchResponseContract("Verifica con fuentes si el CEO actual de OpenAI cambio."),
    ).toContain("search_internet");
    expect(buildInternetResearchResponseContract("Que hora es en Tokio?")).toBeNull();
  });
});
