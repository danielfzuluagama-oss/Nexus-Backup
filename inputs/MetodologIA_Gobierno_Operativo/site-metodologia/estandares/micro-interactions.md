# Micro-Interactions Standard

Reusable CSS classes for hover effects, transitions, and feedback patterns.

---

## Core Principle: Section Highlights

> **Every section must have ONE attention-grabbing element** that pulses, glows, shimmers, or moves.

Examples: "Caos²" with `animate-pulse`, "Alto Impacto" with ping animation.

---

## 5. Section Highlight Effects

### `.highlight-pulse` — Subtle Breathing Effect
For key text or containers that need constant attention.

```css
.highlight-pulse {
    animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes pulse-glow {
    0%, 100% { 
        opacity: 1; 
        box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.3);
    }
    50% { 
        opacity: 0.9; 
        box-shadow: 0 0 20px 4px rgba(255, 215, 0, 0.2);
    }
}
```

### `.highlight-ping` — Pulsing Dot Indicator
For status indicators or "live" badges.

```css
.highlight-ping {
    position: relative;
}

.highlight-ping::after {
    content: '';
    position: absolute;
    top: 0;
    right: -8px;
    width: 8px;
    height: 8px;
    background: #FFD700;
    border-radius: 50%;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
}
```

### `.highlight-shimmer` — Moving Shine Effect
For premium elements or CTAs.

```css
.highlight-shimmer {
    background: linear-gradient(90deg, 
        rgba(255,255,255,0) 0%, 
        rgba(255,255,255,0.1) 50%, 
        rgba(255,255,255,0) 100%);
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
```

### `.highlight-glow` — Static Glow Aura
For emphasis without motion (accessibility-friendly).

```css
.highlight-glow {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3),
                0 0 60px rgba(255, 215, 0, 0.1);
}
```

---

## Section Highlight Inventory

| Section | Highlight Element | Effect |
|:--------|:------------------|:-------|
| s0-hero | Sun visual | Radial glow |
| s1-brecha | "La Brecha" box | Border pulse |
| s2-trap | "Caos²" | animate-pulse |
| s3-posibilidades | Badge icon | Shimmer |
| s4-pivote | Active phase | Gold glow |
| s5-solution | "Alto Impacto" | Ping dot |
| s6-exito | Star rating | Pulse |
| s7-servicios | CTA buttons | Hover glow |

---

## 1. Hover Effects

### `.hover-lift` — Card Elevation
Subtle lift with shadow on hover. Use for cards and interactive containers.

```css
.hover-lift {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 
                box-shadow 0.3s ease,
                border-color 0.3s ease;
}

.hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15), 
                0 4px 8px rgba(0, 0, 0, 0.1);
}
```

**HTML Usage:**
```html
<div class="card hover-lift">Content</div>
```

---

### `.hover-glow` — Border Glow Effect
Gold border glow on hover. Use for feature cards.

```css
.hover-glow {
    transition: border-color 0.3s ease, 
                box-shadow 0.3s ease,
                background-color 0.3s ease;
}

.hover-glow:hover {
    border-color: rgba(255, 215, 0, 0.5);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.15);
    background-color: rgba(255, 215, 0, 0.03);
}
```

---

### `.hover-scale` — Subtle Scale
Micro-scale for icons and small elements.

```css
.hover-scale {
    transition: transform 0.25s ease;
}

.hover-scale:hover {
    transform: scale(1.05);
}
```

---

## 2. Text Hover Effects

### `.hover-gold`
Text turns gold on hover.

```css
.hover-gold {
    transition: color 0.25s ease;
}

.hover-gold:hover {
    color: #FFD700;
}
```

### `.hover-slide`
Text slides right on hover (for CTAs with arrows).

```css
.hover-slide {
    transition: transform 0.25s ease;
}

.hover-slide:hover {
    transform: translateX(4px);
}
```

---

## 3. Group Hover Patterns

Use Tailwind's `group` class for parent-child hover coordination:

```html
<div class="group hover-lift">
    <h4 class="group-hover:translate-x-1">Title</h4>
    <i class="group-hover:text-gold-400">Icon</i>
</div>
```

---

## 4. Accessibility

Always include reduced motion support:

```css
@media (prefers-reduced-motion: reduce) {
    .hover-lift,
    .hover-glow,
    .hover-scale,
    .hover-gold,
    .hover-slide {
        transition: none;
    }
    
    .hover-lift:hover {
        transform: none;
    }
}
```

---

## Quick Reference

| Class | Effect | Use Case |
|:------|:-------|:---------|
| `.hover-lift` | Elevation + shadow | Cards |
| `.hover-glow` | Gold border glow | Feature cards |
| `.hover-scale` | Subtle scale | Icons, badges |
| `.hover-gold` | Text → gold | Links, labels |
| `.hover-slide` | Slide right | CTA arrows |
