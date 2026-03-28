# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-007
Feature: Voice Message Processing
  A Chief Officer sends a voice message and receives a text response
  that demonstrates understanding of the spoken content.

  @TS-047 @FR-034 @P2 @acceptance
  Scenario: Voice message transcribed and routed through agent pipeline
    Given a user sends a voice message
    When the system transcribes the audio
    Then it produces a text transcription
    And routes it through the standard agent pipeline

  @TS-048 @FR-034 @P2 @acceptance
  Scenario: Transcription failure suggests text input
    Given the transcription service is unavailable
    When the system detects the failure
    Then it notifies the user that voice is temporarily unavailable
    And suggests text input as alternative

  @TS-049 @FR-035 @P2 @acceptance
  Scenario: Image and document metadata included in routing context
    Given a user sends an image or document
    When the system processes the attachment
    Then it extracts metadata and includes it in the routing context

  @TS-050 @FR-036 @P2 @acceptance
  Scenario: Unsupported message type handled gracefully
    Given a user sends an unsupported message type
    When the system receives it
    Then it responds with a text hint about supported formats
