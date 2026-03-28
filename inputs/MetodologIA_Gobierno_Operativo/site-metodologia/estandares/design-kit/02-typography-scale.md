# MetodologIA Typography Scale (v5.2)

## 🔤 Font Ecosystem

| Role | Font Family | Character | Uso |
|------|-------------|-----------|-----|
| **Primary** | Poppins | Bold, Impactful | Headings, UI Navigation |
| **Secondary**| Montserrat | Technical, Clean | Body Text, Metadata |
| **Tertiary** | Jost | Geometric, Modern | Modals, Card Details (Premium) |

## 📏 Heading Architecture (Fluid)

| Level | Size (Mobile) | Size (Desktop) | Weight | Line Height |
|-------|---------------|----------------|--------|-------------|
| **H1** | 2.5rem | 4.5rem | 900 | 1.1 |
| **H2** | 2rem | 3rem | 800 | 1.2 |
| **H3** | 1.75rem | 2.25rem | 700 | 1.25 |
| **H4** | 1.25rem | 1.5rem | 600 | 1.3 |

## ✍️ Body & Precision

| Type | Size | Weight | Line Height | Uso |
|------|------|--------|-------------|-----|
| **Large** | 1.125rem | 400 | 1.75 | Intro Paragraphs (A11y) |
| **Base** | 1rem | 400 | 1.625 | General readability |
| **Small** | 0.875rem | 400 | 1.5 | Footers, Secondary Data |
| **Label** | 0.75rem | 700 | 1.0 | Badges (Uppercase Only) |

## ✨ Special High-End Styles

### The Sagacious Gradient
```css
/* Gold Evolution v5.2 */
.text-gradient-gold {
    background: var(--gradient-gold);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 10px var(--brand-gold-glow));
}
```

## 📐 Tracking (Semantic Spacing)

| Style | Value | Class | Uso |
|-------|-------|-------|-----|
| **Tight** | -0.02em | `tracking-tight` | H1/H2 Headlines |
| **Normal**| 0 | `tracking-normal` | Paragraphs |
| **Wide** | 0.05em | `tracking-wide` | Interactive Links |
| **Widest**| 0.2em | `tracking-widest` | Badges & Overlines |

---
> **A11y Check:** Siempre verifique que el `line-height` sea al menos 1.5 en bloques de texto extendidos para cumplir con WCAG 2.2.
