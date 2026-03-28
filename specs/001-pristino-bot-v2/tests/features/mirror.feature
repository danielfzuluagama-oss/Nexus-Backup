# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-011
Feature: Mirror Instance Isolation
  Two independent bot instances run from the same codebase
  with completely isolated state, credentials, and history.

  @TS-055 @FR-037 @FR-038 @SC-012 @P3 @acceptance
  Scenario: Credential rotation on one instance does not affect the other
    Given both instances are running
    When one instance's credentials are rotated
    Then the other continues with its own credentials unaffected

  @TS-056 @FR-039 @P3 @acceptance
  Scenario: Shared definitions updated on next startup
    Given both instances share agent definitions
    When a definition file is updated
    Then both load the update on next startup
    And runtime state remains isolated

  @TS-057 @FR-038 @SC-012 @P3 @validation
  Scenario Outline: Per-instance state is isolated
    Given two mirror instances are running
    When instance A modifies its <state_type>
    Then instance B's <state_type> remains unchanged

    Examples:
      | state_type          |
      | conversation history|
      | knowledge base      |
      | circuit breaker     |
      | tool registry       |
