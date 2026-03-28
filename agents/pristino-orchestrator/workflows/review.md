---
description: Universal REVIEW operation — systematic quality and security audit of any artifact
---

# REVIEW Workflow

## Trigger

User requests review, audit, or evaluation of any existing artifact.

## Steps

### 1. Understand Scope

- Identify artifact type (code, document, prompt, plan, etc.)
- Determine review depth: quick scan vs. deep audit
- Set evaluation criteria based on artifact type

### 2. Security Review

- Check for injection vulnerabilities (code)
- Validate input sanitization patterns
- Verify no sensitive data exposure
- Check forbidden words compliance

### 3. Quality Assessment

- Score against 16 quality dimensions (quality-excellence skill)
- Identify strengths (what works well)
- Identify gaps (what's missing or weak)
- Check brand voice compliance if user-facing

### 4. Architecture Review (if applicable)

- Verify structural coherence
- Check dependency patterns
- Validate scalability considerations
- Assess edge case handling

### 5. Generate Report

- Overall score (X/10 across dimensions)
- Top 3 strengths
- Top 3 improvement areas (prioritized by impact)
- Specific, actionable recommendations
- If critical: include Adversarial+ test results

## Output Format

```
## Review: [Artifact Name]
**Score**: X/10
**Strengths**: [top 3]
**Improvements**: [top 3 with action items]
**Recommendations**: [prioritized list]
```

## Failure Handling

- If artifact too large for single review: segment and review in parts
- If artifact type unknown: apply generic quality dimensions
