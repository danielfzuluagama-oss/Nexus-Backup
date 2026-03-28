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
    Given a user sends a 30-second voice message in Spanish
    When the system transcribes the audio
    Then the transcribed text is passed to the agent pipeline as the user message
    And the routing log records input type "voice"

  @TS-048 @FR-034 @P2 @acceptance
  Scenario: Transcription failure suggests text input
    Given the transcription service is unavailable
    When the system detects the failure
    Then the user receives a message indicating voice is temporarily unavailable
    And the message suggests text input as alternative

  @TS-049 @FR-035 @P2 @acceptance
  Scenario: Image and document metadata included in routing context
    Given a user sends a document attachment
    When the system processes the attachment
    Then the routing context includes "mimeType", "fileSize", and "fileName"
    And the agent receives the metadata alongside the user message

  @TS-050 @FR-036 @P2 @acceptance
  Scenario: Unsupported message type handled gracefully
    Given a user sends a message of unsupported type "sticker"
    When the system receives it
    Then the user receives a text response listing supported input formats

  @TS-073 @FR-034 @P2 @acceptance
  Scenario: Non-Spanish voice message transcribed with best-effort
    Given a user sends a voice message in English
    When the system transcribes the audio
    Then the transcription is returned in the detected language
    And the response language matches the detected input language
