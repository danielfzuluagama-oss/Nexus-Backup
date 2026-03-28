# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-008
Feature: Three-Layer Memory Persistence
  The bot maintains working (ephemeral), episodic (permanent), and
  semantic (permanent with provenance) memory layers.

  @TS-031 @FR-024 @P2 @acceptance
  Scenario: Working memory loads thread history within token budget
    Given a user has an active conversation thread with 50 messages
    And the available token budget is 4000 tokens
    When getRecentMessages is called for the user's thread
    Then the total token count of returned messages does not exceed 4000

  @TS-032 @FR-026 @P2 @acceptance
  Scenario: Knowledge reinforcement count incremented on retrieval
    Given a knowledge fact "MetodologIA uses 4 Chief Officer roles" is stored with reinforcementCount 1
    When getKnowledge is called and returns the fact
    Then the fact's reinforcementCount is incremented to 2

  @TS-033 @FR-024 @P2 @acceptance
  Scenario: Expired working memory purged by scheduled sweep
    Given a thread with expiresAt timestamp in the past
    When purgeExpiredWorking is called
    Then the expired thread and its messages are deleted
    And the purge count includes the deleted thread

  @TS-034 @FR-027 @SC-008 @P2 @acceptance
  Scenario: Per-user data purge across all three layers
    Given a user has data in working, episodic, and semantic memory
    When purgeUser is called with that userId
    Then all three memory layers are cleared for that user
    And the purge completes within 30 seconds

  @TS-035 @FR-025 @FR-028 @P2 @validation
  Scenario Outline: All stored data has lifecycle classification
    Given a data record in the <layer> memory layer
    When the record is persisted
    Then it has a classification of <classification>

    Examples:
      | layer    | classification |
      | working  | ephemeral      |
      | episodic | permanent      |
      | semantic | permanent      |

  @TS-071 @FR-027 @FR-028 @P2 @acceptance
  Scenario: Permanent classification does not prevent explicit purge
    Given an episodic record with classification "permanent"
    When purgeUser is called for that user
    Then the record is deleted despite its permanent classification

  @TS-036 @FR-024 @P2 @contract
  Scenario: addMessage and getRecentMessages round-trip
    Given a userId and message content "hello from the test"
    When addMessage is called followed by getRecentMessages
    Then the stored message appears in the returned list with matching content

  @TS-037 @FR-026 @P2 @contract
  Scenario: addKnowledge stores provenance metadata
    Given a fact "Pristino uses 6 specialist agents", confidence 0.9, and source "internal"
    When addKnowledge is called
    Then the stored knowledge includes confidence 0.9, source "internal", and reinforcementCount 1

  @TS-038 @FR-027 @P2 @contract
  Scenario: purgeUser removes data from all layers
    Given a user with data in working, episodic, and semantic memory
    When purgeUser is called with that userId
    Then no data for that user remains in any layer

  @TS-039 @FR-026 @P2 @validation
  Scenario: Knowledge confidence must be between 0.0 and 1.0
    Given a knowledge fact with confidence value 1.5
    When the system attempts to store it
    Then a validation error is returned for out-of-range confidence
