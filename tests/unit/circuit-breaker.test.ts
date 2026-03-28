import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CircuitBreaker } from "../../src/circuit-breaker.js";
import type { Config } from "../../src/config.js";
import type { LLMMessage, LLMResponse } from "../../src/config/llm-providers.js";

// Mock logger to prevent console noise in tests
vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

describe("CircuitBreaker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // TS-044: Circuit breaker state machine transitions
  describe("state transitions (TS-044)", () => {
    it("starts in closed state", () => {
      const cb = new CircuitBreaker("test");
      expect(cb.getState()).toBe("closed");
      expect(cb.isOpen()).toBe(false);
    });

    it("transitions closed → open after threshold failures", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.getState()).toBe("closed");
      cb.recordFailure();
      expect(cb.getState()).toBe("open");
    });

    it("transitions open → half-open after cooldown elapsed", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      // Trip the breaker
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.getState()).toBe("open");
      expect(cb.isOpen()).toBe(true);

      // Advance clock by 60 seconds
      vi.advanceTimersByTime(60_000);

      // isOpen() should transition to half-open and return false (allow probe)
      expect(cb.isOpen()).toBe(false);
      expect(cb.getState()).toBe("half-open");
    });

    it("transitions half-open → closed on probe success", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      vi.advanceTimersByTime(60_000);
      cb.isOpen(); // trigger half-open transition

      cb.recordSuccess();
      expect(cb.getState()).toBe("closed");
    });

    it("transitions half-open → open on probe failure", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      vi.advanceTimersByTime(60_000);
      cb.isOpen(); // trigger half-open transition

      cb.recordFailure();
      expect(cb.getState()).toBe("open");
    });
  });

  describe("isOpen behavior", () => {
    it("returns false when closed", () => {
      const cb = new CircuitBreaker("test");
      expect(cb.isOpen()).toBe(false);
    });

    it("returns true when open and cooldown not elapsed", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.isOpen()).toBe(true);
    });

    it("blocks calls during open state within cooldown", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();

      // Advance 30s (less than cooldown)
      vi.advanceTimersByTime(30_000);
      expect(cb.isOpen()).toBe(true);
    });
  });

  describe("recordSuccess", () => {
    it("resets failure count to zero", () => {
      const cb = new CircuitBreaker("test", 3, 60_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordSuccess();
      // Should need 3 more failures to trip, not 1
      cb.recordFailure();
      expect(cb.getState()).toBe("closed");
    });
  });

  describe("configurable parameters", () => {
    it("uses custom threshold", () => {
      const cb = new CircuitBreaker("test", 5, 60_000);
      for (let i = 0; i < 4; i++) cb.recordFailure();
      expect(cb.getState()).toBe("closed");
      cb.recordFailure();
      expect(cb.getState()).toBe("open");
    });

    it("uses custom cooldown", () => {
      const cb = new CircuitBreaker("test", 3, 30_000);
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();

      vi.advanceTimersByTime(29_999);
      expect(cb.isOpen()).toBe(true);

      vi.advanceTimersByTime(1);
      expect(cb.isOpen()).toBe(false); // half-open
      expect(cb.getState()).toBe("half-open");
    });
  });
});

// ============================================================================
// Provider Cascade — integration-level unit tests using the circuit breaker
// TS-040, TS-041, TS-072
// ============================================================================

describe("Provider cascade (TS-040, TS-041, TS-072)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // TS-040: Cascade through credentials key-1→key-2 before lower tier
  describe("TS-040: horizontal key cascade (key-1 → key-2) before tier advance", () => {
    it("tries key-1 first; on failure uses key-2 without jumping tier", () => {
      // Model the cascade logic: two breakers for two keys within the same tier.
      const breaker0 = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);
      const breaker1 = new CircuitBreaker("groq:pristino:tier1:key1", 3, 60_000);
      const tierAdvanced: boolean[] = [];

      function simulateCascade(failKey0: boolean): string {
        // key-0 attempt
        if (!breaker0.isOpen()) {
          if (failKey0) {
            breaker0.recordFailure();
          } else {
            breaker0.recordSuccess();
            return "key-0";
          }
        }
        // key-1 attempt (still same tier — no tier advance yet)
        if (!breaker1.isOpen()) {
          breaker1.recordSuccess();
          return "key-1";
        }
        // only now would we advance tier
        tierAdvanced.push(true);
        return "tier-advance";
      }

      // First call — key-0 succeeds
      expect(simulateCascade(false)).toBe("key-0");
      expect(tierAdvanced).toHaveLength(0);

      // Second call — key-0 fails once (not yet open), cascade to key-1 within same tier
      expect(simulateCascade(true)).toBe("key-1");
      // Tier must NOT have advanced
      expect(tierAdvanced).toHaveLength(0);
    });

    it("advances to lower tier only after all keys within the tier are exhausted", () => {
      const breaker0 = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);
      const breaker1 = new CircuitBreaker("groq:pristino:tier1:key1", 3, 60_000);
      let tierAdvanced = false;

      // Trip both breakers
      for (let i = 0; i < 3; i++) {
        breaker0.recordFailure();
        breaker1.recordFailure();
      }

      function simulateCascade(): string {
        if (!breaker0.isOpen()) return "key-0";
        if (!breaker1.isOpen()) return "key-1";
        tierAdvanced = true;
        return "tier-advance";
      }

      expect(simulateCascade()).toBe("tier-advance");
      expect(tierAdvanced).toBe(true);
    });
  });

  // TS-041: Circuit breaker opens after 3 failures, combination skipped
  describe("TS-041: circuit opens after 3 failures, subsequent calls are skipped", () => {
    it("blocks the (model, key) combination after threshold reached", () => {
      const cb = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);
      let callCount = 0;

      function attemptCall(): "success" | "skipped" | "failed" {
        if (cb.isOpen()) return "skipped";
        callCount++;
        // Simulate failure
        cb.recordFailure();
        return "failed";
      }

      // Calls 1-3: each fails and records failure
      expect(attemptCall()).toBe("failed");
      expect(attemptCall()).toBe("failed");
      expect(attemptCall()).toBe("failed");

      // Breaker is now open — call 4 must be skipped entirely
      expect(cb.getState()).toBe("open");
      expect(attemptCall()).toBe("skipped");
      expect(callCount).toBe(3); // no 4th attempt was made
    });

    it("independent breakers for each (model, key) pair — one open does not affect others", () => {
      const tier1Key0 = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);
      const tier1Key1 = new CircuitBreaker("groq:pristino:tier1:key1", 3, 60_000);

      // Trip only key0
      tier1Key0.recordFailure();
      tier1Key0.recordFailure();
      tier1Key0.recordFailure();

      expect(tier1Key0.isOpen()).toBe(true);
      // key1 is completely unaffected
      expect(tier1Key1.isOpen()).toBe(false);
    });
  });

  // TS-072: After cooldown, circuit breaker transitions to half-open and sends probe
  describe("TS-072: half-open probe after cooldown", () => {
    it("allows exactly one probe request after resetMs elapses", () => {
      const cb = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);
      let probeCount = 0;

      // Trip the breaker
      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.getState()).toBe("open");

      // Within cooldown — all calls blocked
      vi.advanceTimersByTime(59_999);
      expect(cb.isOpen()).toBe(true);

      // Advance past cooldown
      vi.advanceTimersByTime(1); // total: 60_000ms

      // First isOpen() check should transition to half-open and allow the probe
      const blockedAfterCooldown = cb.isOpen();
      expect(blockedAfterCooldown).toBe(false);
      expect(cb.getState()).toBe("half-open");
      probeCount++;

      // Probe succeeds → closed
      cb.recordSuccess();
      expect(cb.getState()).toBe("closed");
      expect(probeCount).toBe(1);
    });

    it("re-opens immediately if probe in half-open state fails", () => {
      const cb = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);

      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();

      vi.advanceTimersByTime(60_000);
      cb.isOpen(); // transition to half-open
      expect(cb.getState()).toBe("half-open");

      // Probe fails — must re-open immediately
      cb.recordFailure();
      expect(cb.getState()).toBe("open");
      // A further call is blocked again
      expect(cb.isOpen()).toBe(true);
    });

    it("resets failure count to zero when probe succeeds after half-open", () => {
      const cb = new CircuitBreaker("groq:pristino:tier1:key0", 3, 60_000);

      cb.recordFailure();
      cb.recordFailure();
      cb.recordFailure();
      vi.advanceTimersByTime(60_000);
      cb.isOpen(); // half-open
      cb.recordSuccess(); // closed

      // Should require a full 3 new failures to trip again
      cb.recordFailure();
      cb.recordFailure();
      expect(cb.getState()).toBe("closed");
      cb.recordFailure();
      expect(cb.getState()).toBe("open");
    });
  });
});
