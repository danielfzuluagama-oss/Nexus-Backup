# CSS Architecture Standard (v1.1.0)

This document defines the technical standards for CSS across the MetodologIA project to ensure performance, maintainability, and visual consistency.

## 1. Modular Architecture Strategy

We follow a strict **Separation of Concerns** model to decouple global branding from page-specific logic.

### Directory Structure: `estilos/`

| File | Role | Description |
| :--- | :--- | :--- |
| `variables.css` | **Tokens** | Defines the *Source of Truth* for colors, fonts, and gradients. No styles, only variables. |
| `base.css` | **Foundation** | Global resets, body styles, and typography defaults. |
| `components.css` | **Shared UI** | Reusable atoms/molecules used across *multiple* pages (Buttons, Cards, Nav, Footer). |
| `[repo].css` | **Specifics** | Page-specific styles. Named after the HTML entry point or section (e.g., `recursos.css`, `home.css`, `vision.css`). Styles here MUST NOT overload global components. |

### Rules of Engagement

1. **Never** define global styles in `[repo].css`.
2. **Never** define page-specific hacks in `components.css`.
3. **Use Semantic Classes** over long Tailwind strings for repeated components.

## 2. Universal Variable Schema (:root)

Defined in `variables.css`.

```css
:root {
    /* Brand Colors */
    --brand-gold: #FFD700;
    --brand-gold-dark: #FFA000;
    --brand-blue-dark: #0A122A;
    --brand-blue-slate: #1e293b;
    
    /* Surface Colors */
    --surface-darker: #020617;
    --surface-card: rgba(255, 255, 255, 0.03);
    
    /* Typography */
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Montserrat', sans-serif;
}
```

## 3. Tailwind Integration Standards

- **Utility First:** Use Tailwind utility classes for layout, spacing, and simple styling.
- **Config Sync:** Ensure `tailwind.config` extends `brand` colors matching `variables.css`.
- **Hybrid Approach:** Use Tailwind for structure, Custom CSS for complex visual effects (Glassmorphism, Glows).

## 4. Iconography System

- **Source:** Icons are managed via `js/icons.js`.
- **Usage:** Native SVG injection or `icons.get('name')`.
- **Dependencies:** Avoid external script dependencies like Lucide unless proxied through our local system.

## 5. UI Patterns & Micro-interactions

### Glassmorphism Premium 2.0

Used for cards and overlays.
```css
.card-glass {
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08); /* White opacity stroke */
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Performance

- **Webkit Prefixes:** Always include `-webkit-backdrop-filter` before `backdrop-filter`.
- **Reduced Motion:** Respect `prefers-reduced-motion`.
