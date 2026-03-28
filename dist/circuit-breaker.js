// ============================================================================
// Circuit Breaker — prevents cascading failures on LLM provider outages.
// States: closed (normal) → open (failing) → half-open (probing recovery).
// ============================================================================
import { logger } from "./logger.js";
export class CircuitBreaker {
    name;
    threshold;
    resetMs;
    failures = 0;
    lastFailureTime = 0;
    state = "closed";
    constructor(name, threshold = 3, resetMs = 60_000) {
        this.name = name;
        this.threshold = threshold;
        this.resetMs = resetMs;
    }
    /** Check whether calls should be blocked. Transitions open → half-open after resetMs. */
    isOpen() {
        if (this.state === "closed")
            return false;
        if (this.state === "open" && Date.now() - this.lastFailureTime >= this.resetMs) {
            this.state = "half-open";
            logger.info(`Circuit breaker ${this.name}: open → half-open (probing)`);
            return false; // allow one probe request
        }
        return this.state === "open";
    }
    /** Record a successful call. Resets the breaker to closed. */
    recordSuccess() {
        if (this.state !== "closed") {
            logger.info(`Circuit breaker ${this.name}: ${this.state} → closed`);
        }
        this.failures = 0;
        this.state = "closed";
    }
    /** Record a failed call. Opens the breaker after threshold consecutive failures. */
    recordFailure() {
        this.failures++;
        this.lastFailureTime = Date.now();
        if (this.failures >= this.threshold) {
            this.state = "open";
            logger.warn(`Circuit breaker ${this.name}: opened after ${this.failures} failures`);
        }
    }
    getState() {
        return this.state;
    }
}
