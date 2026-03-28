METODOLOGIA VISUAL CORE - STYLES LIBRARY (v2.0)
===============================================

1. PURPOSE
----------
This directory houses the foundational CSS architecture that powers the MetodologIA Brand Identity. It moves beyond simple styling to define the "physics" of the interface—how colors behave, how light interacts (gradients/glows), and how typography breathes.

2. CORE ASSETS
--------------
• colors.css: The Semantic Color System.
  - BRAND GOLD: #FFD700 (Primary Action / Success)
  - SURFACE: #020617 (Deep Space Background)
  - FUNCTIONAL: Semantic mappings for Info, Warning, Error.
  - VARIABLES: CSS Custom Properties (`--color-brand-gold`) for runtime flexibility.

• index.txt: Machine-readable metadata for design token retrieval.

3. INTEGRATION GUIDE
--------------------
1. Link `estilos/colors.css` in the `<head>` BEFORE Tailwind config.
2. Configure Tailwind `theme.extend.colors` to map to these CSS variables (or hex codes if static).
3. Use convenient utility classes (e.g., `text-brand-gold`, `bg-surface-darker`).

4. MAINTENANCE
--------------
• Color modifications here propagate globally.
• Ensure contrast ratios meet WCAG AA standards, especially for Gold text on Dark backgrounds.