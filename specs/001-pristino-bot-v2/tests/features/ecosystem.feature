# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-005
Feature: Ecosystem Agent Loading
  Agents are defined via declarative definition files and loaded,
  validated, and registered at startup without code changes.

  @TS-025 @FR-006 @FR-009 @SC-007 @P1 @acceptance
  Scenario: Valid agent definition loaded and registered
    Given a valid agent definition file exists in the agents directory
    When the ecosystem loader runs at startup
    Then the agent is parsed, validated, and registered in the routing subsystem
    And the agent appears in the list of routable agents

  @TS-026 @FR-007 @P1 @acceptance
  Scenario: Invalid agent definition skipped with warning
    Given an agent definition is missing the required field "role"
    When the loader validates it
    Then a warning is logged identifying the missing field and agent file
    And the invalid agent is not registered
    And the system continues startup without crashing

  @TS-027 @FR-008 @P1 @acceptance
  Scenario: Shared defaults merged into agent definition
    Given shared defaults include "maxTokens: 4096"
    And an agent definition omits the "maxTokens" field
    When the loader processes the agent definition
    Then the loaded agent has "maxTokens" equal to 4096

  @TS-028 @FR-010 @P1 @acceptance
  Scenario: At least 6 concurrent agents with independent skills
    Given 6 or more valid agent definition files exist
    When the ecosystem loader processes all of them
    Then all agents are registered
    And each agent has a non-empty skills list
    And no two agents share a skill with the same identifier

  @TS-029 @FR-006 @P1 @validation
  Scenario: AgentDefinition Zod schema rejects missing required fields
    Given an agent definition object missing the "role" field
    When the Zod schema validates it
    Then the Zod error includes an issue with path "role"

  @TS-030 @FR-006 @P1 @validation
  Scenario: AgentDefinition Zod schema accepts complete definition
    Given an agent definition object with all required fields populated
    When the Zod schema validates it
    Then validation passes with no errors
