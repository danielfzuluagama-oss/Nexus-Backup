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
    Given a registered user sends the text message "what is our go-to-market strategy"
    When the orchestrator receives the message
    Then the routing log records the selected agent and routing mode
    And the user receives a non-empty text response within 60 seconds

  @TS-002 @FR-002 @FR-003 @P1 @acceptance
  Scenario: Deterministic tiebreaker on domain overlap
    Given a message "compare market sizing vs competitive risk" matches agents "analyst" and "researcher"
    When the orchestrator evaluates the overlap
    Then the routing log records tiebreaker criterion "factual accuracy"
    And exactly one routing mode is selected

  @TS-003 @FR-018 @P1 @acceptance
  Scenario: Unauthorized user message silently dropped
    Given an unregistered user sends a message
    When the system checks authorization
    Then no response is sent
    And no routing decision is logged for that message

  @TS-004 @FR-005 @SC-010 @P1 @acceptance
  Scenario: Every routing decision is logged with required fields
    Given a registered user sends the text message "analyze our Q3 pipeline"
    When the orchestrator makes a routing decision
    Then the routing log contains mode, selected agents array, reason, and timestamp

  @TS-005 @FR-004 @P1 @acceptance
  Scenario: Recursion depth enforced at 3 levels
    Given an agent delegates to a sub-agent at depth 2
    When the sub-agent attempts further delegation
    Then the delegation is rejected at depth 3
    And the depth-2 agent's result is returned to the user
    And a recursion-limit warning is logged with depth "3"

  @TS-006 @FR-001 @FR-002 @P1 @contract
  Scenario: routeRequest returns valid RoutingDecision
    Given a query string and a list of loaded agent definitions
    When routeRequest is called
    Then the result mode is one of "single", "terna", or "committee"
    And the agents array contains at least one agent name
    And the reason is a non-empty string

  @TS-007 @FR-002 @P1 @contract
  Scenario: executeRouting dispatches to correct mode handler
    Given a RoutingDecision with mode "single"
    When executeRouting is called with the decision
    Then exactly one agent executes the task
    And the response is returned directly
