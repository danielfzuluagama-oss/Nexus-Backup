# Proposal HTML GitHub Improvement Plan

## Goal

Preserve the current stable proposal delivery flow and harden it so a MetodologIA commercial proposal always follows the same contract:

1. generate a self-contained HTML proposal,
2. publish it to GitHub,
3. return a public view link and a raw download link in Telegram,
4. keep the HTML document fallback available when publication fails.

## Verified Baseline

- Firebase project: `nexus-5b9bb`
- Production functions: `api` and `worker`
- GitHub account on this machine: `danielfzuluagama-oss`
- Target repo: `danielfzuluagama-oss/propuestas-comerciales`
- Repo visibility: public
- Secret used by Functions: `GITHUB_PROPOSALS_CONFIG`
- Production artifact path shape: `proposals/<client-slug>-YYYY-MM-DD/index.html`
- Live validation already completed with a published artifact and a Telegram smoke test
- The reusable proposal template was revalidated on April 1, 2026 after fixing a blank-render regression that hid content when optional JS or icon bootstrapping failed

## What Needs to Stay Stable

- The proposal request must stay on the canonical proposal branch and not drift into generic operational lookup.
- The HTML artifact must remain self-contained and render without extra assets.
- GitHub publication must stay optional from a runtime perspective but mandatory when public links are expected.
- The Telegram document fallback must remain available even when GitHub Pages is still propagating.

## Known Fragilities

- Intent routing can be too broad if commercial proposal requests are blended into generic operational prompts.
- Runtime dependencies can break Cloud Run / Functions startup if they are only available transitively.
- A successful `/healthz` check does not prove that the proposal delivery path is healthy.
- GitHub publication and Telegram delivery are two separate failure surfaces and must both be observed.
- Optional browser enhancements can make the page look empty if the template hides content by default and only reveals it through JS.

## Implementation Plan

### Phase 1: Canonicalize proposal intent

- Keep proposal requests on the proposal template branch.
- Run the intake gate before generation.
- Reject empty or ambiguous commercial requests early with targeted questions.

### Phase 2: Strengthen artifact publication

- Keep `GITHUB_PROPOSALS_CONFIG` as the production source of truth.
- Publish to `danielfzuluagama-oss/propuestas-comerciales`.
- Log `repoPath`, `viewUrl`, `githubUrl`, `downloadUrl`, and `pagesReady` for every successful publish.
- Preserve the HTML document fallback when GitHub is unavailable.

### Phase 3: Add release gates

- Run unit and integration tests.
- Require a successful build before deploy.
- Deploy only the needed Firebase functions.
- Verify `/healthz`.
- Run a live Telegram smoke test.
- Confirm the GitHub artifact exists and is reachable.

### Phase 4: Keep operational docs aligned

- Update the proposal-writing and Telegram verification skills whenever the delivery contract changes.
- Keep the Firebase CLI runbook current with deploy and verification commands.
- Record any new runtime dependency as a direct dependency before it reaches production.

### Phase 5: Close rollout with live confirmation

- Treat the April 1, 2026 A&C Consultores delivery as the formal live-user confirmation for the current proposal contract.
- Confirm that both the GitHub raw URL and the GitHub Pages URL resolve after publication.
- Record hotfix publications that patch already-published proposals when the reusable template changes.

### Phase 6: Add operational render guardrails

- Keep the commercial proposal template readable even if optional JS, `lucide`, or `IntersectionObserver` are unavailable.
- Surface proposal-template readiness in `/status` so operations can detect missing assets or regressions in render safeguards.
- Treat missing template assets or missing render safeguards as operational issues, not only presentation bugs.

## Acceptance Criteria

- A commercial proposal request generates a self-contained HTML file.
- The bot publishes that file to GitHub when config is present.
- The chat receives a public view link, a raw download link, and the HTML attachment.
- If GitHub fails, the chat still receives a clear fallback notice and the HTML file.
- The deployed bot remains healthy in Firebase after a live Telegram smoke test.
- The rendered proposal remains readable even if optional client-side enhancements fail.
- `/status` exposes whether the proposal template asset exists and whether render safeguards are present.

## Verification Checklist

- `gh auth status` shows the expected GitHub account.
- `gh repo view danielfzuluagama-oss/propuestas-comerciales` resolves.
- `firebase deploy --only functions:api,functions:worker` completes.
- `api/healthz` returns `200`.
- A live Telegram request produces the proposal links and the HTML document.
- The public GitHub Pages URL renders visible proposal content, not only a reachable HTML file.
- `api/status` reports `proposalFlow.templateAssetAvailable=true` and `proposalFlow.renderSafeguardsReady=true`.
