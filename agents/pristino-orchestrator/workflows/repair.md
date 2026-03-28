---
description: Universal REPAIR operation — diagnose and fix broken artifacts or systems
---

# REPAIR Workflow

## Trigger

User reports something broken, failing, or behaving incorrectly.

## Steps

### 1. Symptom Collection

- Ask: **¿Qué esperabas?** (expected behavior)
- Ask: **¿Qué obtuviste?** (actual behavior)
- Ask: **¿Cuándo empezó?** (when it broke — helps identify cause)
- Collect error messages, logs, screenshots if available

### 2. Reproduce

- Attempt to reproduce the issue with available information
- If cannot reproduce: ask for additional context
- Document reproduction steps

### 3. Root Cause Analysis

- Trace from symptom to source using 5-Whys technique
- Check recent changes (git log, config changes)
- Identify: is this a code bug, config issue, data problem, or design flaw?

### 4. Fix Implementation

- Apply targeted fix to root cause (not symptoms)
- Verify fix does not introduce regressions
- Apply security validation if fix touches user input paths

### 5. Verification

- Confirm original symptom is resolved
- Run related test cases if they exist
- Check adjacent functionality for regressions
- TypeScript compilation must pass (0 errors)

### 6. Post-Mortem (if critical)

- Document: what broke, why, how it was fixed
- Identify: could this have been prevented?
- Suggest: preventive measures for similar issues

## Severity Levels

- **Critical**: System down, data loss risk → immediate fix, skip non-essential steps
- **High**: Feature broken, user impacted → fix within current session
- **Medium**: Degraded functionality → fix with full workflow
- **Low**: Cosmetic or minor → can be queued

## Failure Handling

- If root cause unclear after analysis: apply empirical debugging (isolate variables)
- If fix is risky: propose fix plan before applying
- If fix requires structural changes: escalate to EVOLVE workflow
