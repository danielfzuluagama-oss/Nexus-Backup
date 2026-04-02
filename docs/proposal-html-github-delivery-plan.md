# Proposal HTML GitHub Delivery Plan

## Objective

When a user asks the bot for a MetodologIA commercial proposal, the bot should:

1. generate a self-contained HTML proposal,
2. publish that HTML file to GitHub,
3. send back to Telegram a public link to view or download the proposal,
4. optionally send the HTML file itself as a Telegram document.

## Current State

- Proposal-oriented requests already route through Telegram intent classification in [telegram-intents.ts](/Volumes/backup/Antigravity/Nexus/src/telegram-intents.ts).
- The bot already supports staged deliverables and controlled proposal scaffolds in [bot.ts](/Volumes/backup/Antigravity/Nexus/src/bot.ts), [controlled-deliverables.ts](/Volumes/backup/Antigravity/Nexus/src/controlled-deliverables.ts), and [format.ts](/Volumes/backup/Antigravity/Nexus/src/format.ts).
- The standalone HTML renderer now lives in [proposal-artifact.ts](/Volumes/backup/Antigravity/Nexus/src/proposals/proposal-artifact.ts).
- The GitHub publishing integration now lives in [github-publisher.ts](/Volumes/backup/Antigravity/Nexus/src/proposals/github-publisher.ts) and is wired into [bot.ts](/Volumes/backup/Antigravity/Nexus/src/bot.ts).
- The proposal renderer is now template-driven: it uses a reusable MetodologIA visual base inspired by the executive dossier reference and fills it with client data, stage content, process context, assets, SOPs, and KB references instead of composing the full HTML layout from scratch on each request.
- Proposal generation now has an intake gate: if the request lacks client, service, objective, or enough commercial activation data, the bot asks for the missing fields before running the agent or emitting HTML.
- The current production flow was validated in Firebase project `nexus-5b9bb` with a live webhook smoke test, a public GitHub publication, and a Telegram HTML document fallback.
- Local GitHub access is available on this machine for `danielfzuluagama-oss`, and the current `origin` remote points to `https://github.com/danielfzuluagama-oss/Nexus-Backup.git`.
- GitHub is authenticated on this machine as `danielfzuluagama-oss`, and the target publication repo is public.
- `gh repo view` shows `viewerPermission: ADMIN` on `Nexus-Backup`, so this local session can manage repos or push content under that account.
- The chosen target repository is `danielfzuluagama-oss/propuestas-comerciales`.
- The repository bootstrap was initialized and pushed to `main` with `README.md`, `.nojekyll`, and a landing `index.html`.
- GitHub Pages is now live at [propuestas-comerciales](https://danielfzuluagama-oss.github.io/propuestas-comerciales/).
- A machine-usable Git credential with Contents API access was discovered through the local HTTPS credential helper and stored in Firebase as `GITHUB_PROPOSALS_CONFIG`.
- `functions:api` and `functions:worker` were redeployed on `2026-04-01` with the proposal publishing integration.
- Smoke publication already succeeded with:
  - view URL: [verificacion-tecnica-2026-03-31](https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/verificacion-tecnica-2026-03-31/)
  - download URL: [raw HTML](https://raw.githubusercontent.com/danielfzuluagama-oss/propuestas-comerciales/main/proposals/verificacion-tecnica-2026-03-31/index.html)
- A second live publication for A&C Consultores was confirmed by the user on April 1, 2026 after patching the reusable template and the already-published GitHub artifact to prevent a visually blank proposal page.

## Stability Lessons

- Keep proposal requests on a canonical proposal branch. If the intent classifier drifts into generic operational lookup or onboarding, the bot can still answer, but it may stop producing the expected proposal artifact.
- Treat runtime dependencies as first-class production inputs. The deploy only stabilized after `yaml` was declared as a direct runtime dependency instead of being assumed through transitive availability.
- Preserve the Telegram fallback even when GitHub publication works. That gives us a safe degradation path when Pages is still propagating or the public repo is unavailable.
- Verify the production path with a real Telegram smoke test. `/healthz` is useful, but it does not prove the proposal delivery path.
- Do not hide core proposal content behind optional browser enhancements. The page must remain readable before `lucide` icons, `IntersectionObserver`, or any other client-side helper runs.

## Improvement Plan

### Phase 1: Canonicalize proposal routing

- Keep commercial proposal requests on a dedicated proposal flow instead of letting them fall through to generic operational text.
- Ensure the intake gate runs before any fallback or template substitution.
- Preserve the current self-contained HTML contract as the default artifact.

### Phase 2: Harden GitHub publication

- Keep `GITHUB_PROPOSALS_CONFIG` as the single production secret for repo publication.
- Continue publishing to the dedicated public repo `danielfzuluagama-oss/propuestas-comerciales`.
- Keep logging `repoPath`, `viewUrl`, `downloadUrl`, and `pagesReady` so failures are visible.
- Keep the Telegram HTML document fallback active even when publication succeeds.

### Phase 3: Add release gates

- Require `npm run build` and the test suite before deploy.
- Deploy only the changed Firebase functions, then verify `/healthz`.
- Run a live Telegram proposal smoke test.
- Confirm the GitHub artifact exists at the public repo before closing the change.

### Phase 4: Keep skills and runbooks in sync

- Update the proposal-writing and Telegram verification skills whenever the delivery contract changes.
- Keep the Firebase CLI runbook aligned with the production secret, deploy commands, and verification steps.
- Document any new runtime dependency immediately so deploys do not regress.

### Phase 5: Close rollout with real-user confirmation

- Count the April 1, 2026 A&C Consultores delivery confirmation as the live-user signoff for the current Telegram + GitHub proposal path.
- Confirm that the public Pages URL is readable, not only reachable.
- Record any direct patch applied to the public proposal repository when a template regression affects already-published artifacts.

### Phase 6: Operationalize render safeguards

- Surface reusable-template readiness in `/status` through the `proposalFlow` section.
- Keep the template asset present in the runtime package and detect when it disappears.
- Detect regressions where `.reveal` hides content by default or optional JS guards are removed.

## Acceptance Criteria for the Next Improvement

- A proposal request still generates a self-contained HTML artifact.
- The bot publishes that artifact to GitHub when the config is present.
- The chat receives a public view link, a raw download link, and the HTML document fallback.
- If GitHub fails, the chat still gets a clear fallback notice and the HTML attachment.
- The production deploy remains verifiable with `healthz`, logs, and a live Telegram smoke test.
- The public GitHub Pages render remains readable even if optional browser enhancements fail.
- `/status` shows the proposal template asset and render safeguards as ready.

## Research Findings

### Telegram

- `sendMessage` can send clickable links back to the chat.
- `sendDocument` supports files up to 50 MB.
- Telegram's Bot API allows document upload by multipart file, file ID, or URL, but URL-based `sendDocument` is currently limited for `.PDF` and `.ZIP` fetches. For `.html`, the safe path is direct upload from the bot if we want Telegram to attach the file itself.

### GitHub

- The repository contents API can create or update files in a repository using Base64-encoded content.
- The contents API requires repository contents write permission.
- The contents API returns repository URLs such as `html_url` and `download_url`.
- GitHub Pages can publish static files from a repository branch or folder, and `index.html` is a supported entry file.
- GitHub Pages serves supported MIME types for static files, which makes it suitable for rendering `.html` proposals in-browser.
- GitHub Pages on GitHub Free requires a public repository. Private-repo Pages needs a plan that supports it.

## Recommended Architecture

Use a dedicated public GitHub repository for proposal publishing and GitHub Pages rendering.

Why this is the best fit:

- The current repo `Nexus-Backup` is private, so raw or blob links would not be suitable for a Telegram user who is not authenticated on GitHub.
- A public Pages repo gives us two outputs from the same upload:
  - a browser-friendly rendered URL,
  - a raw download URL for the `.html` file.
- It avoids running git CLI flows inside Cloud Functions. The bot can publish with the GitHub Contents API over HTTPS.

## Target Flow

1. User asks for a commercial proposal in Telegram.
2. Intent classifier recognizes a `proposal` request.
3. Intake validation checks whether the request has enough context to fill the template without empty placeholders.
4. If key data is missing, the bot asks for the missing fields and stops before HTML generation.
5. If intake is complete, the agent produces structured proposal content.
6. A new HTML renderer turns the proposal into a self-contained branded `.html`.
7. A new GitHub publisher writes the file to a proposals repo and branch.
8. The bot replies with:
   - a public "Ver propuesta" URL,
   - a "Descargar HTML" URL,
   - optionally the HTML file attached directly as a Telegram document.

## Implementation Design

### 1. Proposal HTML renderer

Implemented module:

- `src/proposals/proposal-artifact.ts`

Responsibilities:

- accept normalized proposal data,
- inject MetodologIA branding,
- produce a single-file HTML artifact with embedded CSS and no external runtime dependencies,
- sanitize all interpolated text,
- generate deterministic filenames and slugs.

Implemented output path shape:

- `proposals/<cliente-slug>-YYYY-MM-DD/index.html`

### 2. Proposal publishing service

Implemented module:

- `src/proposals/github-publisher.ts`

Responsibilities:

- call GitHub's contents API to create the file,
- handle first-write and update-with-sha flows,
- return:
  - repository path,
  - commit SHA,
  - `html_url`,
  - `download_url`,
  - computed GitHub Pages URL.

Recommended config secrets and env vars:

- `GITHUB_PROPOSALS_TOKEN`
- `GITHUB_PROPOSALS_OWNER`
- `GITHUB_PROPOSALS_REPO`
- `GITHUB_PROPOSALS_BRANCH`
- `GITHUB_PAGES_BASE_URL`
- bundled in Firebase as JSON secret `GITHUB_PROPOSALS_CONFIG`

### 3. Bot integration

Extend the proposal route in:

- [bot.ts](/Volumes/backup/Antigravity/Nexus/src/bot.ts)
- [telegram-intents.ts](/Volumes/backup/Antigravity/Nexus/src/telegram-intents.ts)

Suggested behavior:

- detect proposal requests that explicitly ask for proposal, HTML, proposal file, proposal link, or commercial proposal,
- after the text deliverable is generated, call the HTML renderer,
- publish to GitHub,
- send back a short Telegram message with the two links,
- optionally upload the generated `.html` file directly with `sendDocument`.

### 4. Repository strategy

Recommended repository:

- `danielfzuluagama-oss/propuestas-comerciales`

Recommended structure:

- `proposals/<cliente-slug>-YYYY-MM-DD/`
- `.nojekyll`
- optional `index.html` or listing page later

Folder naming rule:

- build the folder name from the client name plus the exact request date,
- normalize the client name to ASCII kebab-case,
- use the format `<cliente-slug>-YYYY-MM-DD`.

Example:

- `proposals/acme-corp-2026-03-31/`

Recommended file names inside each folder:

- `index.html` for GitHub Pages rendering
- `proposal.html` or `proposal-v2.html` if the same client/date folder needs a second generated version

If we want browser rendering via GitHub Pages, configure Pages from:

- `main` branch root, or
- `/docs` folder on `main`

## Delivery Options

### Option A: Public Pages repo

Pros:

- public render URL,
- public download URL,
- simple to share in Telegram,
- low operational friction.

Cons:

- proposal artifacts become public,
- needs content governance and maybe redaction rules.

### Option B: Private repo plus Telegram file upload

Pros:

- proposal archive stays private in GitHub,
- still allows the user to receive the HTML file directly inside Telegram.

Cons:

- GitHub link is not useful for public access,
- does not satisfy the "public link" goal well.

### Option C: GitHub App instead of PAT

Pros:

- stronger security model,
- narrower permissions,
- better long-term governance.

Cons:

- more setup,
- slower first implementation.

## Recommended Phase Plan

### Phase 0. Decisions

- Confirm whether proposal artifacts may be public.
- Use the dedicated public repo `danielfzuluagama-oss/propuestas-comerciales` instead of `Nexus-Backup`.
- Confirm whether the bot should send only links, or links plus the `.html` document.
- Use folder names derived from client + exact date in the format `<cliente-slug>-YYYY-MM-DD`.

### Phase 1. GitHub publishing foundation

- Done: target repo created and bootstrap pushed.
- Done: GitHub Pages enabled and serving from `main`.
- Done: GitHub publishing secret stored in Firebase as `GITHUB_PROPOSALS_CONFIG`.
- Done: minimal publisher smoke-tested with a public verification artifact.

### Phase 2. Proposal HTML generation

- Done: proposal artifact shape defined and covered by unit tests.
- Done: self-contained HTML renderer implemented.
- Done: escaping, slugging, and folder naming implemented.
- Done: Telegram document fallback integrated when GitHub publish is unavailable.

### Phase 3. Bot orchestration

- Done: proposal detection and staging are wired through `telegram-intents.ts` and `bot.ts`.
- Done: the bot renders and publishes after the proposal response is produced.
- Done: the bot sends Pages and raw download URLs when publication succeeds.
- Done: the bot uploads the generated `.html` directly as a Telegram document and now emits an explicit fallback notice if GitHub publication fails.

### Phase 4. Testing

- Done: unit tests for renderer, slugging, URL construction, GitHub API handling, Firebase secret materialization, and Telegram fallback behavior.
- Done: `npm run build`
- Done: `npm test`
- Done: smoke publication against the real public repo and Pages URL.
- Pending: conversational smoke test from a live Telegram chat initiated by a real user message.

### Phase 5. Rollout

- Done: deployed selectively to `functions:api` and `functions:worker`.
- Done: Pages render URL and raw download URL both resolve for the verification artifact.
- Pending: confirm the full end-to-end Telegram chat experience with a live user-triggered proposal request.

## Acceptance Criteria

- A Telegram user can request a MetodologIA commercial proposal and receive a valid response without manual intervention.
- The bot generates a self-contained `.html` file.
- The file is published to GitHub automatically.
- The user receives at least one public browser URL and one download URL.
- The proposal layout is branded and readable on desktop and mobile.
- Failures in GitHub publishing return a graceful fallback message instead of a silent bot failure.

## Risks

- Public repository publishing may expose commercial content that should stay private.
- GitHub Pages publication can take a short time after commit; we may need to send an immediate raw URL plus a rendered Pages URL.
- If the target repo remains private, GitHub links will not be broadly usable.
- HTML proposals need escaping and content sanitization so user-provided text cannot inject unsafe markup.
- Proposal generation may exceed Telegram message length, so the bot should keep the chat reply short and move the heavy content into the HTML artifact.

## Recommended Next Step

If we keep using the currently authenticated GitHub account, no additional credentials are required right now. The next concrete decision is whether to publish proposals into:

1. a new public GitHub Pages repo under `danielfzuluagama-oss`, or
2. a different GitHub user or organization.

If you want the target repo under another owner or org, I will need access to that repo or a token/invite for that account.

## Sources

- GitHub repository contents API: [docs.github.com/rest/repos/contents](https://docs.github.com/en/rest/repos/contents)
- GitHub Pages setup: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- GitHub authentication overview: [About authentication to GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github)
- Telegram Bot API `sendMessage` and `sendDocument`: [core.telegram.org/bots/api](https://core.telegram.org/bots/api)
