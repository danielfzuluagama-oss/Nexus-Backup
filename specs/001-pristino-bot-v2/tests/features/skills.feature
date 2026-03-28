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
    Then steps execute in the order defined by the workflow
    And each step has a default timeout of 30 seconds
    And each step is validated before proceeding to the next

  @TS-052 @FR-012 @P2 @acceptance
  Scenario: Failed step triggers recovery action before escalation
    Given a workflow step fails validation
    When the skill engine detects the failure
    Then it attempts the recovery action defined for that step
    And if recovery fails, returns an error result to the orchestrator with reason "step-recovery-failed"

  @TS-053 @FR-013 @P2 @acceptance
  Scenario: Mid-workflow handoff to another agent with context
    Given a workflow requires handoff to another agent
    When the handoff trigger fires
    Then the delegate call includes a context object containing all prior step outputs
    And the target agent receives the workflow's step history

  @TS-054 @FR-014 @P2 @acceptance @catalog
  Scenario: System supports at least 24 skills with 96 workflows
    Given the full agent catalog is loaded from agent definition files
    When the system counts available skills and workflows
    Then at least 24 skills are registered
    And at least 96 workflows are available across the catalog
