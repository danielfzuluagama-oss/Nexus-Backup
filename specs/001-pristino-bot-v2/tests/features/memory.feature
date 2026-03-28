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
    Given a user has an active conversation thread
    When the user sends a new message
    Then the system loads the thread's history within the token budget

  @TS-032 @FR-026 @P2 @acceptance
  Scenario: Knowledge reinforcement count incremented on reference
    Given a knowledge fact is stored with confidence and source provenance
    When the fact is referenced later
    Then its reinforcement count is incremented

  @TS-033 @FR-024 @P2 @acceptance
  Scenario: Expired working memory purged automatically
    Given working memory TTL has expired for a thread
    When the system accesses the thread
    Then the expired data is purged automatically

  @TS-034 @FR-027 @SC-008 @P2 @acceptance
  Scenario: Per-user data purge across all three layers
    Given a user requests deletion of their data
    When the per-user purge is executed
    Then all three memory layers are cleared for that user
    And the purge completes within 30 seconds

  @TS-035 @FR-028 @P2 @validation
  Scenario Outline: All stored data has lifecycle classification
    Given a data record in the <layer> memory layer
    When the record is persisted
    Then it has a classification of <classification>

    Examples:
      | layer    | classification |
      | working  | ephemeral      |
      | episodic | permanent      |
      | semantic | permanent      |

  @TS-036 @FR-024 @P2 @contract
  Scenario: addMessage and getRecentMessages round-trip
    Given a userId and message content
    When addMessage is called followed by getRecentMessages
    Then the stored message appears in the returned list

  @TS-037 @FR-026 @P2 @contract
  Scenario: addKnowledge stores provenance metadata
    Given a fact, confidence score, and source
    When addKnowledge is called
    Then the stored knowledge includes confidence, source, and reinforcement count of 1

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
