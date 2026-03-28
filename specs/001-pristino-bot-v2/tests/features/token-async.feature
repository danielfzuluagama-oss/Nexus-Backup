# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

Feature: Token Management and Async Processing
  Token budget calculation, history trimming, webhook ingress,
  and message acknowledgment before processing.

  Rule: Token budget management

    @TS-060 @FR-040 @P2 @acceptance
    Scenario: Token budget calculated per request
      Given a request with system prompt, reserved tokens, and safety margin
      When the token budget is calculated
      Then the available budget equals total context minus reserved, system, and safety margin

    @TS-061 @FR-041 @P2 @acceptance
    Scenario: History trimmed to fit available budget
      Given conversation history exceeds the available token budget
      When the system trims the history
      Then oldest messages are removed first
      And a 10% safety margin is preserved

  Rule: Async message processing

    @TS-062 @FR-042 @P2 @acceptance
    Scenario: Webhook ingress with async background processing
      Given a message arrives via webhook
      When the server receives it
      Then it dispatches to async background processing
      And the webhook handler returns immediately

    @TS-063 @FR-043 @P2 @acceptance
    Scenario: Incoming message acknowledged before processing
      Given a message is received from the messaging platform
      When the system begins processing
      Then it acknowledges receipt before the platform timeout
      And processes the message asynchronously

  Rule: Edge cases

    @TS-064 @FR-029 @P2 @acceptance
    Scenario: All LLM providers simultaneously unavailable
      Given all LLM providers are simultaneously unavailable
      When the cascade exhausts all options
      Then the system delivers a fallback message acknowledging the outage
      And suggests retrying later

    @TS-065 @FR-042 @P2 @acceptance
    Scenario: Message received during startup before agents loaded
      Given the system is starting up and agents are not yet loaded
      When a user sends a message
      Then the message is queued via async processing
      And handled once startup completes

    @TS-066 @FR-011 @P2 @acceptance
    Scenario: Skill workflow exceeds 60-second boundary
      Given a skill workflow is executing
      When processing exceeds 60 seconds
      Then the system delivers a partial result
      And notes that processing continues
