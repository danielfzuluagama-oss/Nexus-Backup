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
    Given a query requiring multi-perspective analysis
    When the orchestrator selects terna mode
    Then three agents execute in parallel
    And the Synthesizer produces a unified response within 30 seconds

  @TS-009 @FR-031 @P1 @acceptance
  Scenario: Degrade to two agents on single timeout
    Given one of three terna agents times out
    When the system detects the timeout
    Then it degrades to the two available responses
    And the Synthesizer notes the gap in the output

  @TS-010 @FR-002 @P1 @acceptance
  Scenario: Preserve contradictory perspectives with attribution
    Given two of three terna agents produce contradictory conclusions
    When the Synthesizer processes the outputs
    Then it preserves both perspectives with attribution
    And does not silently drop either conclusion
