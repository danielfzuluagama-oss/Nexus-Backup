METODOLOGIA DESIGN SYSTEM - GOLDEN STANDARDS (v2.0)
=====================================================

1. PURPOSE
----------
This directory contains the immutable "Golden Rules" for the MetodologIA User Interface. It serves as the single source of truth for all visual and interactive patterns, ensuring a coherent "Premium" experience across the ecosystem.

2. COMPONENT LIBRARY
--------------------
[NAVIGATION]
• header.html / header.md: The "Neural Command Center". Fixed, responsive, blur-backdrop navigation.
• footer.html / footer.md: The "Unified Footer". Site-wide persistence, SEO links, and social proof.
• breadcrumbs.md: "UX Pathfinder". Contextual hierarchy indicators for deeply nested pages.

[INTERACTION]
• cta.html / cta.md: "Action Triggers". Primary and secondary button styles with glow effects and hover states.
• micro-interactions.md: "System Feedback". Hover lifts, shimmers, and transition timings (standard: 300ms ease-out).

[LAYOUT]
• layout-patterns.md: "Structural Foundation". Grid systems, container widths (`max-w-7xl` vs `container-max`), and Hero section composition.

3. GOVERNANCE
-------------
• Integrity: DO NOT inline styles that contradict these standards.
• Inheritance: New pages must inherit structure from these reference files.
• Evolution: Updates here require a system-wide broadcast (migration).

4. USAGE
--------
Copy the HTML structure directly. Ensure `colors.css` and Tailwind are active.
