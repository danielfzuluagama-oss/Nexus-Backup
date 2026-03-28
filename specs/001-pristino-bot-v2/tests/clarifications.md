# Test Clarifications: Pristino Bot 2.0

## Session 2026-03-28

### Theme 1: Observable Outcomes vs Process Verbs

- Q: Should BDD steps use process verbs ("routes to", "enforces", "produces") or observable outcomes? -> A: Acceptance scenarios use outcome-level observables (response arrives, log contains, output includes). Contract scenarios use API-level observables (return type, field values). Process verbs replaced with their most direct observable effect. [TS-001, TS-006, TS-011, TS-021, TS-031, TS-058, TS-059, TS-042, TS-009, TS-010, TS-047, TS-049, TS-053]

### Theme 2: Abstract Preconditions vs Concrete Fixtures

- Q: Should Given steps use abstract descriptions ("a message matching multiple domains") or concrete fixtures? -> A: Each abstract Given gets one concrete representative example inline. Exhaustive data variety goes in Scenario Outlines. Fixtures are illustrative, not exhaustive. [TS-002, TS-004, TS-018, TS-024, TS-027, TS-040, TS-060, TS-008, TS-010, TS-012]

### Theme 3: Undefined Trigger Mechanisms

- Q: Should scenarios specify trigger mechanisms (scheduled sweep vs on-read) or just effects? -> A: Reference module contract function names from plan.md as the trigger mechanism. This aligns BDD with the contract layer. purgeExpiredWorking() is the scheduled sweep. getKnowledge() triggers reinforcement. Circuit breaker probes use the pending user request. [TS-032, TS-033, TS-065, TS-041, TS-072]

### Theme 4: Time-Dependent Tests

- Q: How should time-dependent steps be handled in unit tests? -> A: Add "Given the system clock is advanced by N seconds" steps where time matters. This is a behavioral precondition, not an implementation detail. Avoids real 60-second waits. [TS-044, TS-062, TS-072]

### Theme 5: Missing Scenarios

- Q: Should scenarios be added for CP2 credential blocking, Minto non-compliance, and non-Spanish voice? -> A: Yes — all three are spec-defined behaviors with no test coverage. Added TS-067 (CP1 control chars split from TS-014), TS-068 (CP2 credential redaction), TS-069 (standard 8/10 threshold), TS-070 (Minto enforcement failure), TS-073 (non-Spanish voice). [FR-015, FR-016, FR-020, FR-023, FR-034]

### Theme 6: Structural Issues

- Q: Should multi-behavior scenarios be split? Should heterogeneous Scenario Outlines become separate scenarios? -> A: Split when behaviors have independent failure modes. Keep combined when they share a single code path. Mirror instance outline (TS-057) replaced with 4 focused scenarios (TS-074 to TS-077) since each state type has a different mutation API. Security CP1 split into injection (TS-014) and control chars (TS-067). [TS-014, TS-057, TS-054]

### Theme 7: Semantic Precision

- Q: Are "numbered lists" forbidden if Minto requires enumerable supports? -> A: Markdown numbered lists (`1.\n2.\n`) are forbidden. Prose enumeration ("First... Second...") is permitted. Updated example to "markdown numbered lists". [TS-023]
- Q: Is safety margin "preserved" or "pre-subtracted"? -> A: Pre-subtracted per FR-040 formula. The trimmed history uses the already-reduced budget. [TS-061]
- Q: What does "top 3 responding agents" mean in committee degradation? -> A: First 3 to respond (temporal ordering). No quality ranking on degradation path. [TS-013]
- Q: Does "permanent" classification prevent deletion during explicit purge? -> A: No — "permanent" means survives TTL expiry, not survives explicit purge. Added TS-071 to clarify. [TS-035, TS-071]
