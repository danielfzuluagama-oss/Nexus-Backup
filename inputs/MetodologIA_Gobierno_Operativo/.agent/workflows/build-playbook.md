---
description: Build a self-contained Playbook HTML from a Ritual JSON source
---

# /build-playbook

> **Context**: Transforms a `ritual.json` data file into a fully self-contained `ritual.html` using the canonical template.
> **Prerequisites**: Node.js, `scripts/build-playbook.js`, `templates/playbook-ritual-template.html`

## 1. Validation (Pre-Flight)

1. **Verify JSON Integrity**:
   - Check against `templates/playbook-ritual-schema.json`.
   - Ensure "Atomic Law" compliance (8-10 steps).
   - Ensure "Moat Standard" metadata (version, standard, lastUpdated).

2. **Verify Template**:
   - Ensure `templates/playbook-ritual-template.html` exists and contains `/*PLAYBOOK_DATA*/` marker.

## 2. Execution (The Build)

Run the build script for the target JSON file.

```bash
node scripts/build-playbook.js <path/to/ritual.json>
```

**Or trigger the full suite build:**

```bash
node scripts/build-playbook.js --all
```

## 3. Verification (Quality Gate)

1. **Output Check**:
   - Confirm `.html` file was created next to the `.json`.
   - File size should be > 50KB (indicates template + data merged).

2. **Browser Check**:
   - Open the generated HTML in Chrome.
   - Verify:
     - Header renders (Nav).
     - Onboarding zone renders (Breadcrumb, Badge, Title, TL;DR).
     - Interactive elements work (Expandable 'What is this', Step Modals).
     - Console has no script errors.

## 4. Troubleshooting

- **"Template marker not found"**: The template file might have been corrupted. Revert to canonical version.
- **"Invalid JSON"**: The source JSON is missing required fields. Check schema.
