# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-009
Feature: Resilient LLM Provider Cascade
  When the primary LLM provider fails, the system automatically
  cascades through alternatives without user-visible interruption.

  @TS-040 @FR-029 @SC-006 @P2 @acceptance
  Scenario: Cascade through credentials before falling to lower tier
    Given the primary tier has credentials ["key-1", "key-2"]
    When key-1 returns a rate limit error
    Then the provider is called with key-2 before attempting a lower tier

  @TS-041 @FR-030 @SC-009 @P2 @acceptance
  Scenario: Circuit breaker opens after 3 consecutive failures
    Given a provider/model/credential combination with 0 failures
    When 3 consecutive failures occur
    Then the circuit breaker state transitions to "open"
    And that combination is skipped for subsequent requests

  @TS-072 @FR-030 @SC-009 @P2 @acceptance
  Scenario: Circuit breaker probes after cooldown
    Given a circuit breaker in "open" state
    And the system clock is advanced by 60 seconds
    When a new request arrives for that provider
    Then the circuit breaker transitions to "half-open"
    And sends the pending user request as a single probe

  @TS-042 @FR-029 @SC-006 @P2 @acceptance
  Scenario: Fallback tier delivers response without error messages
    Given all primary tier providers are exhausted
    When the cascade reaches the fallback tier
    Then the user receives a non-empty text response
    And the response does not contain error phrases such as "service unavailable"

  @TS-043 @FR-032 @P2 @acceptance
  Scenario: In-memory fallback when persistence unavailable
    Given the Firestore persistence layer is unavailable
    When the system attempts to store data
    Then it falls back to in-memory storage
    And a warning is logged with reason "persistence_unavailable"

  @TS-044 @FR-030 @P2 @contract
  Scenario Outline: Circuit breaker state machine transitions
    Given a circuit breaker in <initial_state> state
    When <event> occurs
    Then the state transitions to <final_state>

    Examples:
      | initial_state | event                              | final_state |
      | closed        | failure count reaches threshold 3  | open        |
      | open          | system clock advanced by 60 seconds | half-open   |
      | half-open     | probe request succeeds             | closed      |
      | half-open     | probe request fails                | open        |

  @TS-046 @FR-029 @P2 @contract
  Scenario: LLM provider getProvider returns cascading provider
    Given a config with multiple API keys and model tiers
    When getProvider is called for an agent
    Then the returned provider implements the chat interface
    And handles quota exhaustion via onQuotaExhausted callback
