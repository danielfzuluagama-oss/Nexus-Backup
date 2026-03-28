# DO NOT MODIFY SCENARIOS
# These .feature files define expected behavior derived from requirements.
# During implementation:
#   - Write step definitions to match these scenarios
#   - Fix code to pass tests, don't modify .feature files
#   - If requirements change, re-run /iikit-04-testify

@US-012
Feature: Template-Based Deliverables
  Formal deliverables are rendered via templates with
  brand-compliant content and platform-appropriate chunking.

  @TS-058 @FR-033 @P3 @acceptance
  Scenario: Deliverable rendered with all required template sections
    Given a skill workflow produces a deliverable using the "assessment" template
    When the template engine renders it
    Then the output contains all section headings defined in the template schema
    And the section hierarchy matches the template's structure

  @TS-059 @FR-033 @P3 @acceptance
  Scenario: Oversized deliverable chunked with formatting preservation
    Given the messaging platform has a 4096 character limit
    When a deliverable exceeds the limit
    Then it is split into chunks of at most 4096 characters each
    And no chunk ends mid-sentence
    And no chunk splits a section heading from its body
