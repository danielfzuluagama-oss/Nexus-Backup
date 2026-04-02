# Copilot Instructions

For proposal work, use the canonical outline fixture at `tests/fixtures/proposals/canonical-proposal-outline.html` as the structural reference.

Keep proposal HTML aligned with the current canonical contract:
- Preserve the nav order, section order, and brand tokens enforced by `src/proposals/proposal-validation.ts`.
- Never publish or attach proposal HTML that fails canonical validation.
- Keep prompt/process residue out of generated HTML.
- Update tests whenever proposal rendering or delivery behavior changes.

Prefer focused edits in the proposal pipeline files unless the task explicitly asks for a broader change.
