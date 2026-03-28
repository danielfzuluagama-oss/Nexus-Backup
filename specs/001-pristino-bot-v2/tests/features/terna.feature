# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-002
Feature: Terna Delegation
  A Chief Officer asks a question that benefits from multiple perspectives
  and receives a synthesized answer from three specialist agents.

  @TS-008 @FR-002 @SC-003 @P1 @acceptance
  Scenario: Three agents execute in parallel and synthesize
    Given the routing decision for query "evaluate three scenarios for market entry" is "terna"
    When three agents execute in parallel
    Then the Synthesizer is invoked with 3 agent responses
    And produces a unified response within 30 seconds

  @TS-009 @FR-031 @P1 @acceptance
  Scenario: Degrade to two agents on single timeout
    Given a terna delegation is in progress with agents "analyst", "researcher", "synthesizer"
    When agent "researcher" times out after 30 seconds
    Then the Synthesizer is invoked with 2 agent responses
    And the synthesized output contains an explicit note that one agent response was unavailable

  @TS-010 @FR-002 @P1 @acceptance
  Scenario: Preserve contradictory perspectives with attribution
    Given agent "analyst" responds with "expand now" and agent "researcher" responds with "wait six months"
    When the Synthesizer processes the outputs
    Then the synthesized output contains both perspectives
    And each perspective is prefixed with the contributing agent's name
