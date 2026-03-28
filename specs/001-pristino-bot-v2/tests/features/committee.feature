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
    Given a query routed to committee mode
    When all five agents respond
    Then the system produces a deliberation with consensus status
    And the status is one of strong, majority, split, or disagreement

  @TS-012 @FR-003 @P2 @acceptance
  Scenario: Tiebreaker resolves split with documented reasoning
    Given agents reach a split with no majority
    When the orchestrator acts as tiebreaker
    Then it applies the tiebreaker hierarchy
    And documents the reasoning for the resolution

  @TS-013 @FR-031 @P2 @acceptance
  Scenario: Committee degrades to terna on timeout
    Given committee deliberation exceeds 60 seconds
    When the timeout triggers
    Then the system degrades to terna with the top 3 responding agents
    And delivers a response from the available agents
