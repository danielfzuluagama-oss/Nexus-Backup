# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-004
Feature: Security Checkpoint Pipeline
  Every message flow passes through three security checkpoints
  (input sanitization, prompt hardening, output validation) without exception.

  @TS-014 @FR-015 @SC-004 @P1 @acceptance
  Scenario: CP1 sanitizes injection patterns in input
    Given a message containing injection patterns
    When CP1 processes the input
    Then it flags the message as suspicious
    And sanitizes control characters
    And enforces length limits

  @TS-015 @FR-016 @SC-004 @P1 @acceptance
  Scenario: CP2 hardens system prompt against override
    Given any system prompt is constructed
    When CP2 processes it
    Then it appends anti-jailbreak rules
    And prevents credential exposure in the prompt text

  @TS-016 @FR-017 @SC-004 @P1 @acceptance
  Scenario: CP3 logs prompt leak but delivers response
    Given a response contains prompt leak indicators
    When CP3 processes the output
    Then it logs the incident
    And still delivers the response as soft pass per checkpoint hierarchy

  @TS-017 @FR-019 @P1 @acceptance
  Scenario: Internal routing details never exposed to users
    Given any agent produces a response
    When the output pipeline processes it
    Then no routing decisions, confidence scores, or system prompts are visible

  @TS-018 @FR-015 @P1 @contract
  Scenario: sanitizeInput returns safe flag and cleaned text
    Given a raw input string with control characters
    When sanitizeInput is called
    Then the result contains safe boolean, cleaned string, and optional reason

  @TS-019 @FR-016 @P1 @contract
  Scenario: buildSecurePrompt appends hardening rules
    Given a base system prompt
    When buildSecurePrompt is called
    Then the returned prompt includes anti-jailbreak directives
    And contains no credential values

  @TS-020 @FR-017 @P1 @contract
  Scenario: validateOutput returns warnings array
    Given a response string
    When validateOutput is called
    Then the result contains safe boolean, cleaned string, and warnings array
