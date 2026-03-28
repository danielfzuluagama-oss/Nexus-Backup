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
    Given the primary provider returns a rate limit error
    When the cascade handler processes the error
    Then it tries the next credential for the same model tier
    And falls to a lower tier only after all credentials are exhausted

  @TS-041 @FR-030 @SC-009 @P2 @acceptance
  Scenario: Circuit breaker opens after 3 consecutive failures
    Given a provider has 3 consecutive failures
    When the circuit breaker opens
    Then that provider/model/credential combination is skipped for 60 seconds
    And probes with a single request before reopening

  @TS-042 @FR-029 @SC-006 @P2 @acceptance
  Scenario: Fallback tier delivers response with no visible degradation
    Given all primary tier providers are exhausted
    When the cascade reaches the fallback tier
    Then the user receives a response with no visible degradation

  @TS-043 @FR-032 @P2 @acceptance
  Scenario: In-memory fallback when persistence unavailable
    Given the Firestore persistence layer is unavailable
    When the system attempts to store data
    Then it falls back to in-memory storage
    And logs the fallback explicitly

  @TS-044 @FR-030 @P2 @contract
  Scenario: Circuit breaker state transitions
    Given a circuit breaker in closed state
    When 3 consecutive failures occur
    Then the state transitions to open
    And after 60 seconds cooldown it transitions to half-open
    And a successful probe transitions it back to closed

  @TS-045 @FR-030 @P2 @validation
  Scenario Outline: Circuit breaker state machine transitions
    Given a circuit breaker in <initial_state> state
    When <event> occurs
    Then the state transitions to <final_state>

    Examples:
      | initial_state | event                       | final_state |
      | closed        | failure count reaches 3     | open        |
      | open          | cooldown elapsed            | half-open   |
      | half-open     | probe success               | closed      |
      | half-open     | probe failure               | open        |

  @TS-046 @FR-029 @P2 @contract
  Scenario: LLM provider getProvider returns cascading provider
    Given a config with multiple API keys and model tiers
    When getProvider is called for an agent
    Then the returned provider implements the chat interface
    And handles quota exhaustion via onQuotaExhausted callback
