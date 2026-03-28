# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-001
Feature: Message Routing
  A Chief Officer sends a text message and receives a response
  intelligently routed to the most appropriate specialist agent.

  @TS-001 @FR-001 @SC-001 @SC-002 @P1 @acceptance
  Scenario: Route message to best-fit agent within time limit
    Given a registered user sends a text message
    When the orchestrator receives the message
    Then it routes to the best-fit specialist agent
    And delivers a response within 60 seconds

  @TS-002 @FR-002 @FR-003 @P1 @acceptance
  Scenario: Deterministic tiebreaker on domain overlap
    Given a message matches multiple agent domains
    When the orchestrator evaluates the overlap
    Then it applies deterministic tiebreaker rules
    And selects exactly one routing mode

  @TS-003 @FR-018 @P1 @acceptance
  Scenario: Unauthorized user message silently dropped
    Given an unregistered user sends a message
    When the system checks authorization
    Then it silently drops the message without revealing the bot's existence

  @TS-004 @FR-005 @SC-010 @P1 @acceptance
  Scenario: Every routing decision is logged
    Given a user sends any message
    When the orchestrator makes a routing decision
    Then the decision is logged with mode, selected agents, and reason

  @TS-005 @FR-004 @P1 @acceptance
  Scenario: Recursion depth enforced at 3 levels
    Given an agent delegates to a sub-agent at depth 2
    When the sub-agent attempts further delegation
    Then the system blocks the delegation at depth 3
    And returns the current result without further nesting

  @TS-006 @FR-001 @FR-002 @P1 @contract
  Scenario: routeRequest returns valid RoutingDecision
    Given a query string and a list of loaded agent definitions
    When routeRequest is called
    Then the result contains a valid mode, agents array, reason, and timestamp

  @TS-007 @FR-002 @P1 @contract
  Scenario: executeRouting dispatches to correct mode handler
    Given a RoutingDecision with mode "single"
    When executeRouting is called with the decision
    Then exactly one agent executes the task
    And the response is returned directly
