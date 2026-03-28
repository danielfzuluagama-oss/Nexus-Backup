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
  Scenario: Output checkpoint enforces brand voice
    Given any agent produces a response
    When the output checkpoint processes it
    Then forbidden terms are replaced
    And formatting is stripped to dense prose
    And Minto structure is enforced

  @TS-022 @FR-023 @P1 @acceptance
  Scenario: Critical deliverable scored against excellence framework
    Given a critical deliverable is generated
    When the Validator agent performs post-hoc audit
    Then it scores the output against the 16-dimension excellence framework
    And flags items below 8/10

  @TS-023 @FR-022 @P1 @validation
  Scenario Outline: Formatting artifacts are stripped
    Given a response containing <artifact_type>
    When the output checkpoint processes it
    Then the <artifact_type> is removed from the final output

    Examples:
      | artifact_type   |
      | bold markers    |
      | italic markers  |
      | emojis          |
      | numbered lists  |

  @TS-024 @FR-021 @SC-005 @P1 @validation
  Scenario: Forbidden terms detected and replaced
    Given a response containing a forbidden term
    When the output checkpoint processes it
    Then the forbidden term is replaced with the approved alternative
    And zero forbidden terms remain in the delivered output
