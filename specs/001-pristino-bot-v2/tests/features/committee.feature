# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-006
Feature: Committee Deliberation
  A Chief Officer asks the bot to deliberate on a critical decision
  with five agents independently analyzing and cross-validating.

  @TS-011 @FR-002 @P2 @acceptance
  Scenario: Five agents produce deliberation with consensus status
    Given a query routed to committee mode with 5 agents
    When all five agents respond
    Then the result includes a "consensusStatus" field
    And the value is one of "strong", "majority", "split", or "disagreement"

  @TS-012 @FR-003 @P2 @acceptance
  Scenario: Tiebreaker resolves split with documented reasoning
    Given 2 agents recommend "A" and 3 agents recommend "B" but the 2 are factually stronger
    When the orchestrator acts as tiebreaker
    Then the winning recommendation is "A"
    And the routing log records tiebreaker criterion "factual accuracy"

  @TS-013 @FR-031 @P2 @acceptance
  Scenario: Committee degrades to terna on timeout
    Given committee deliberation is in progress
    When processing exceeds 60 seconds
    Then the system uses the first 3 agents that responded before the timeout
    And the routing log records degradation reason "committee timeout"
