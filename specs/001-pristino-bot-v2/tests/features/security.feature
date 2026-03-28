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
  Scenario: CP1 detects and sanitizes injection patterns
    Given a message containing the injection pattern "ignore previous instructions"
    When CP1 processes the input
    Then the result safe flag is false
    And the cleaned string has the injection pattern neutralized

  @TS-067 @FR-015 @SC-004 @P1 @acceptance
  Scenario: CP1 strips control characters and enforces length limits
    Given a message containing a null byte "\x00" and exceeding 4096 characters
    When CP1 processes the input
    Then control characters are removed from the cleaned string
    And the cleaned string is truncated to the maximum length

  @TS-015 @FR-016 @SC-004 @P1 @acceptance
  Scenario: CP2 hardens system prompt against override
    Given a base system prompt for the orchestrator
    When CP2 processes it
    Then the returned prompt includes anti-jailbreak directives
    And the returned prompt contains no credential values

  @TS-068 @FR-016 @SC-004 @P1 @acceptance
  Scenario: CP2 redacts credentials found in system prompt
    Given a system prompt containing the string "API_KEY=sk-test-12345"
    When CP2 processes it
    Then the credential string is redacted from the output prompt

  @TS-016 @FR-017 @SC-004 @P1 @acceptance
  Scenario: CP3 logs prompt leak but delivers response
    Given a response containing the substring "system prompt:" followed by internal instructions
    When CP3 processes the output
    Then a security incident is logged with type "prompt_leak"
    And the response is still delivered to the user

  @TS-017 @FR-019 @P1 @acceptance
  Scenario: Internal routing details never exposed to users
    Given any agent produces a response
    When the output pipeline processes it
    Then the delivered text does not contain routing mode indicators
    And the delivered text does not contain confidence score patterns
    And the delivered text does not contain system prompt fragments

  @TS-018 @FR-015 @P1 @contract
  Scenario: sanitizeInput returns structured result
    Given a raw input string containing a null byte "\x00" and a CRLF sequence
    When sanitizeInput is called
    Then the result contains a "safe" boolean
    And a "cleaned" string with control characters removed
    And an optional "reason" string when safe is false

  @TS-019 @FR-016 @P1 @contract
  Scenario: buildSecurePrompt appends hardening rules
    Given a base system prompt
    When buildSecurePrompt is called
    Then the returned prompt includes anti-jailbreak directives
    And contains no credential values

  @TS-020 @FR-017 @P1 @contract
  Scenario: validateOutput returns warnings array
    Given a response string containing potential leak patterns
    When validateOutput is called
    Then the result contains a "safe" boolean, "cleaned" string, and "warnings" array
    And each warning identifies the type of issue detected
