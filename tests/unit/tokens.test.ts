import { describe, it, expect } from "vitest";
import {
  estimateTokens,
  calculateBudget,
  trimHistory,
} from "../../src/tokens.js";
import type { Config } from "../../src/config.js";
import type { LLMMessage } from "../../src/config/llm-providers.js";

// ---------------------------------------------------------------------------
// Minimal Config stub — only fields consumed by tokens.ts
// ---------------------------------------------------------------------------
function makeConfig(
  modelContextWindow: number,
  maxTokens: number
): Pick<Config, "modelContextWindow" | "maxTokens"> & Config {
  return {
    modelContextWindow,
    maxTokens,
    // remaining fields are unused by tokens.ts; provide stubs to satisfy type
    telegramBotToken: "",
    allowedUserIds: [],
    groqApiKey: "",
    groqModel: "",
    groqModelTiers: [],
    groqModelVision: "",
    openRouterApiKey: "",
    openRouterModel: "",
    dbPath: "",
    maxIterations: 1,
    maxHistory: 20,
    agentsPath: "",
    agentCredentials: new Map(),
    googleOAuthToken: "",
  } as Config;
}

// ---------------------------------------------------------------------------
// estimateTokens
// ---------------------------------------------------------------------------
describe("estimateTokens", () => {
  it("returns 0 for an empty string", () => {
    expect(estimateTokens("")).toBe(0);
  });

  it("rounds up to the nearest whole token (ceil of chars/4)", () => {
    // 1 char → ceil(1/4) = 1
    expect(estimateTokens("a")).toBe(1);
    // 4 chars → ceil(4/4) = 1
    expect(estimateTokens("abcd")).toBe(1);
    // 5 chars → ceil(5/4) = 2
    expect(estimateTokens("abcde")).toBe(2);
    // 8 chars → ceil(8/4) = 2
    expect(estimateTokens("abcdefgh")).toBe(2);
  });

  it("handles a 1200-char string as exactly 300 tokens", () => {
    const text = "a".repeat(1200);
    expect(estimateTokens(text)).toBe(300);
  });
});

// ---------------------------------------------------------------------------
// calculateBudget — TS-060
// ---------------------------------------------------------------------------
describe("calculateBudget [TS-060]", () => {
  it("calculates available tokens: total=8192, reserved=500, system≈300 tokens, safety=10%", () => {
    // Build a system prompt that estimates to exactly 300 tokens (1200 chars).
    const systemPrompt = "a".repeat(1200); // estimateTokens → 300

    const config = makeConfig(8192, 500);
    const budget = calculateBudget(config, systemPrompt);

    // Verify each component independently
    expect(budget.total).toBe(8192);
    expect(budget.reserved).toBe(500);
    expect(budget.system).toBe(300);
    expect(budget.safety).toBe(Math.ceil(8192 * 0.1)); // 820

    // available = 8192 - 500 - 300 - 820 = 6572
    const expectedAvailable = 8192 - 500 - 300 - Math.ceil(8192 * 0.1);
    expect(budget.available).toBe(expectedAvailable);
  });

  it("never returns a negative available value when costs exceed total", () => {
    const config = makeConfig(100, 200); // reserved > total
    const systemPrompt = "a".repeat(400); // 100 tokens
    const budget = calculateBudget(config, systemPrompt);
    expect(budget.available).toBe(0);
  });

  it("correctly reflects the safety buffer as 10% of total (ceiling)", () => {
    const config = makeConfig(1000, 0);
    const systemPrompt = "";
    const budget = calculateBudget(config, systemPrompt);
    expect(budget.safety).toBe(Math.ceil(1000 * 0.1)); // 100
  });

  it("returns a TokenBudget with all five fields", () => {
    const config = makeConfig(4096, 256);
    const systemPrompt = "hello world"; // 3 tokens (ceil(11/4)=3)
    const budget = calculateBudget(config, systemPrompt);
    expect(budget).toHaveProperty("total");
    expect(budget).toHaveProperty("reserved");
    expect(budget).toHaveProperty("system");
    expect(budget).toHaveProperty("safety");
    expect(budget).toHaveProperty("available");
  });
});

// ---------------------------------------------------------------------------
// trimHistory — TS-061
// ---------------------------------------------------------------------------
describe("trimHistory [TS-061]", () => {
  it("returns the original array unchanged when it already fits within budget", () => {
    const messages: LLMMessage[] = [
      { role: "user", content: "Hello" },        // 2 tokens (ceil(5/4)=2)
      { role: "assistant", content: "Hi there" }, // 2 tokens (ceil(8/4)=2)
    ];
    const result = trimHistory(messages, 100);
    expect(result).toStrictEqual(messages);
  });

  it("returns an empty array unchanged", () => {
    const result = trimHistory([], 10);
    expect(result).toStrictEqual([]);
  });

  it("removes oldest messages first when history exceeds budget [TS-061]", () => {
    // Each message: "message N" (9 chars) → ceil(9/4) = 3 tokens
    const messages: LLMMessage[] = [
      { role: "user",      content: "message 1" }, // oldest — 3 tokens
      { role: "assistant", content: "message 2" }, // 3 tokens
      { role: "user",      content: "message 3" }, // newest — 3 tokens
    ];
    // Total = 9 tokens; budget = 6 → must drop at least one oldest message
    const result = trimHistory(messages, 6);
    // Oldest (message 1) should be removed; remaining fit within 6 tokens
    expect(result).not.toContainEqual({ role: "user", content: "message 1" });
    expect(result.at(-1)).toEqual({ role: "user", content: "message 3" });
  });

  it("keeps at least one message even when it exceeds the budget", () => {
    const messages: LLMMessage[] = [
      { role: "user",      content: "a".repeat(400) }, // 100 tokens
      { role: "assistant", content: "b".repeat(400) }, // 100 tokens
    ];
    // budget of 1 is smaller than any single message
    const result = trimHistory(messages, 1);
    expect(result.length).toBe(1);
    // The surviving message must be the newest (last) one
    expect(result[0].content).toBe("b".repeat(400));
  });

  it("trims exactly enough messages to fit within the budget", () => {
    // 5 messages × 3 tokens each = 15 tokens total
    // budget = 9 → need to keep at most 3 newest messages
    const messages: LLMMessage[] = Array.from({ length: 5 }, (_, i) => ({
      role: i % 2 === 0 ? ("user" as const) : ("assistant" as const),
      content: "msg-" + i, // 5 chars → ceil(5/4) = 2 tokens
    }));
    const result = trimHistory(messages, 4); // keep at most 2 messages (4 tokens)
    const totalTokens = result.reduce(
      (sum, m) => sum + estimateTokens(m.content ?? ""),
      0
    );
    expect(totalTokens).toBeLessThanOrEqual(4);
    // The most recent message must always be preserved
    expect(result.at(-1)).toEqual(messages.at(-1));
  });

  it("handles messages with null or undefined content gracefully", () => {
    const messages: LLMMessage[] = [
      { role: "user",      content: null },
      { role: "assistant", content: undefined },
      { role: "user",      content: "final" },
    ];
    // null/undefined treated as 0 tokens each; should not throw
    expect(() => trimHistory(messages, 5)).not.toThrow();
  });
});
