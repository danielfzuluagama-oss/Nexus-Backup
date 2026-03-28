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
      Given a model with total context 8192 tokens
      And reserved tokens of 500, system prompt of 300 tokens, and safety margin of 10%
      When the token budget is calculated
      Then the available budget is 6653 tokens

    @TS-061 @FR-041 @P2 @acceptance
    Scenario: History trimmed to fit available budget
      Given conversation history totaling 5000 tokens
      And the available token budget is 3000 tokens
      When the system trims the history
      Then oldest messages are removed first
      And the trimmed history fits within the 3000 token budget

  Rule: Async message processing

    @TS-062 @FR-042 @P2 @acceptance
    Scenario: Webhook ingress returns before processing completes
      Given a message arrives via webhook POST
      When the server receives it
      Then the webhook returns HTTP 200 within 2 seconds
      And message processing continues in the background via Pub/Sub

    @TS-063 @FR-043 @P2 @acceptance
    Scenario: Incoming message acknowledged before platform timeout
      Given a message is received from Telegram
      When the system begins processing
      Then it sends an HTTP 200 acknowledgment before the platform timeout
      And processes the message asynchronously

  Rule: Edge cases

    @TS-064 @FR-029 @P2 @acceptance
    Scenario: All LLM providers simultaneously unavailable
      Given all LLM providers return errors and all circuit breakers are open
      When the cascade exhausts all options
      Then the user receives a fallback message acknowledging the outage
      And the message suggests retrying later

    @TS-065 @FR-042 @P2 @acceptance
    Scenario: Message received during startup before agents loaded
      Given the system is starting up and the ecosystem loader has not completed
      When a user sends a message via webhook
      Then the message is published to the Pub/Sub topic
      And is processed once the ecosystem loader completes registration

    @TS-066 @FR-011 @P2 @acceptance
    Scenario: Skill workflow exceeds 60-second boundary
      Given a skill workflow is executing with multiple steps
      When total processing time exceeds 60 seconds
      Then the system sends the output from steps completed before the timeout
      And appends a note indicating that processing will continue asynchronously
