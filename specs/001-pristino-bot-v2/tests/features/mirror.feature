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
    Given two AgentRuntime instances initialized with separate credential configs
    When instance A's credential config is updated to a new API key
    Then instance B's credential config still returns the original API key

  @TS-056 @FR-039 @P3 @acceptance
  Scenario: Shared definitions updated on next startup
    Given both instances share agent definitions from the agents directory
    When a definition file is updated
    Then both instances load the update on next startup
    And each instance's runtime state remains isolated

  @TS-074 @FR-038 @SC-012 @P3 @acceptance
  Scenario: Conversation history isolation between instances
    Given two AgentRuntime instances are running
    When instance A adds a message to its conversation history
    Then instance B's conversation history does not contain that message

  @TS-075 @FR-038 @SC-012 @P3 @acceptance
  Scenario: Circuit breaker isolation between instances
    Given two AgentRuntime instances are running
    When instance A's circuit breaker opens for a provider
    Then instance B's circuit breaker for the same provider remains closed

  @TS-076 @FR-038 @SC-012 @P3 @acceptance
  Scenario: Knowledge base isolation between instances
    Given two AgentRuntime instances are running
    When instance A stores a knowledge fact
    Then instance B's knowledge base does not contain that fact

  @TS-077 @FR-038 @SC-012 @P3 @acceptance
  Scenario: Tool registry isolation between instances
    Given two AgentRuntime instances are running
    When instance A registers a custom tool
    Then instance B's tool registry does not contain that tool
