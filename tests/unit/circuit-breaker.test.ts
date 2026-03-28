import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CircuitBreaker } from "../../src/circuit-breaker.js";

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
