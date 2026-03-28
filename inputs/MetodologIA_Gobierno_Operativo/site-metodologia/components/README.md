# MetodologIA Component Registry (The Cheat Sheet)

**Single Source of Truth** for all reusable UI Atoms, Molecules, and Organisms.
*Use this list before building new components.*

## Web Components (`.js`)

*Encapsulated logic/state. Use via Custom Element tag.*

| Name          | File                       | Usage                                                      | Description       | Status    |
|---------------|----------------------------|------------------------------------------------------------|-------------------|-----------|
| `site-header` | `components/SiteHeader.js` | `<site-header base-path="." theme="dark"></site-header>` | Global Navigation | ✅ Active |
| `site-footer` | `components/SiteFooter.js` | `<site-footer base-path="."></site-footer>`              | Global Footer     | ✅ Active |

## HTML Patterns (`.html`)

*Reusable layout snippets. Copy-paste or Clone.*

| Name      | File | Usage | Description | Status |
|-----------|------|-------|-------------|--------|
| *(Empty)* |      |       |             |        |

---

**Lifecycle:**

- **Create:** `/create-component` (Auto-adds here).
- **Update:** `/update-component` (Updates status).
