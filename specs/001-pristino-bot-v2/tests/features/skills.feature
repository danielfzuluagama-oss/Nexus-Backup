# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-010
Feature: Skill Workflow Execution
  Specialized skills execute multi-step workflows with
  validation at each step and recovery on failure.

  @TS-051 @FR-011 @P2 @acceptance
  Scenario: Skill workflow executes steps with per-step validation
    Given a user request matches a skill's trigger
    When the skill engine activates the workflow
    Then it executes steps sequentially with timeouts
    And validates each step before proceeding to the next

  @TS-052 @FR-012 @P2 @acceptance
  Scenario: Failed step triggers recovery action before escalation
    Given a workflow step fails validation
    When the skill engine detects the failure
    Then it attempts the recovery action
    And escalates only if recovery also fails

  @TS-053 @FR-013 @P2 @acceptance
  Scenario: Mid-workflow handoff to another agent
    Given a workflow requires handoff to another agent
    When the handoff trigger fires
    Then the engine delegates with accumulated context to the target agent

  @TS-054 @FR-014 @P2 @acceptance
  Scenario: System supports at least 24 skills with 96 workflows
    Given the agent catalog is fully loaded
    When the system counts available skills and workflows
    Then at least 24 skills are registered
    And at least 96 workflows are available across the catalog
