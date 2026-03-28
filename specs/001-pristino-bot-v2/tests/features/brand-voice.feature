# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-003
Feature: Brand Voice Compliance
  Every response follows MetodologIA's brand voice: Minto structure,
  no forbidden terms, no emojis, no bold/italic, dense professional prose.

  @TS-021 @FR-020 @FR-021 @FR-022 @SC-005 @P1 @acceptance
  Scenario: Output checkpoint enforces brand voice structure
    Given any agent produces a response
    When the output checkpoint processes it
    Then the response begins with the conclusion statement
    And the conclusion is followed by supporting points
    And the response ends with a call to action
    And no forbidden terms remain in the output
    And no formatting artifacts remain in the output

  @TS-022 @FR-023 @P1 @acceptance
  Scenario: Critical deliverable scored at 9/10 minimum
    Given a deliverable marked as critical is generated
    When the Validator agent performs post-hoc audit
    Then it returns a score for each of the 16 excellence dimensions
    And all dimension scores are 9 or above

  @TS-069 @FR-023 @P1 @acceptance
  Scenario: Standard deliverable scored at 8/10 minimum
    Given a deliverable marked as standard is generated
    When the Validator agent performs post-hoc audit
    Then it returns a score for each of the 16 excellence dimensions
    And all dimension scores are 8 or above

  @TS-023 @FR-022 @P1 @validation
  Scenario Outline: Formatting artifacts are stripped
    Given a response containing <artifact_type>
    When the output checkpoint processes it
    Then the <artifact_type> is removed from the final output

    Examples:
      | artifact_type          |
      | bold markers (**)      |
      | italic markers (*)     |
      | emojis                 |
      | markdown numbered lists|

  @TS-024 @FR-021 @SC-005 @P1 @validation
  Scenario: Forbidden terms detected and replaced
    Given a response containing the forbidden term "sinergia"
    When the output checkpoint processes it
    Then "sinergia" is replaced with the approved alternative from the term mapping
    And zero forbidden terms remain in the delivered output

  @TS-070 @FR-020 @P1 @acceptance
  Scenario: Non-compliant output triggers enforcement loop
    Given an agent produces a response that lacks Minto structure
    When the output checkpoint detects non-compliance
    Then the excellence loop attempts to restructure the output
    And the loop runs a maximum of 2 iterations
    And the final output follows Minto structure or is delivered with a quality warning logged
