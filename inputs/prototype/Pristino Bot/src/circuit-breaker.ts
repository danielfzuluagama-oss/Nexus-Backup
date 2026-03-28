// ============================================================================
// Circuit Breaker — prevents cascading failures on LLM provider outages.
// States: closed (normal) → open (failing) → half-open (probing recovery).
// ============================================================================

import { logger } from "./logger.js";

type CircuitState = "closed" | "open" | "half-open";

export class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: CircuitState = "closed";

  constructor(
    private readonly name: string,
    private readonly threshold: number = 3,
    private readonly resetMs: number = 60_000
  ) {}

  /** Check whether calls should be blocked. Transitions open → half-open after resetMs. */
  isOpen(): boolean {
    if (this.state === "closed") return false;

    if (this.state === "open" && Date.now() - this.lastFailureTime >= this.resetMs) {
      this.state = "half-open";
      logger.info(`Circuit breaker ${this.name}: open → half-open (probing)`);
      return false; // allow one probe request
    }

    return this.state === "open";
  }

  /** Record a successful call. Resets the breaker to closed. */
  recordSuccess(): void {
    if (this.state !== "closed") {
      logger.info(`Circuit breaker ${this.name}: ${this.state} → closed`);
    }
    this.failures = 0;
    this.state = "closed";
  }

  /** Record a failed call. Opens the breaker after threshold consecutive failures. */
  recordFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();

    if (this.failures >= this.threshold) {
      this.state = "open";
      logger.warn(`Circuit breaker ${this.name}: opened after ${this.failures} failures`);
    }
  }

  getState(): CircuitState {
    return this.state;
  }
}
