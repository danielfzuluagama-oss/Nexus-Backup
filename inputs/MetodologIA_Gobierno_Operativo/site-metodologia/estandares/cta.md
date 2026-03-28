# CTA Standard: Button Hierarchy

## Design Principles

1. **Text Only** — No icons or arrows for Primary. Clean, minimal.
2. **Verbo + Sustantivo** — Action-oriented text (e.g., "Explorar Sitio", "Iniciar Demo").
3. **Color-Swap Hover** — State change on hover for feedback.
4. **Three Tiers** — Nav (max), Primary (high), Secondary (low) visual weight.

---

## CTA Nav: Maximum Visibility (Header Only)

The most prominent CTA. Used **only** for the main site action in the header.

### Visual States

| State | Background | Text | Border | Shadow |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `#FFD700` (solid gold) | `#020617` (black) | `2px solid #FFD700` | Strong glow |
| **Hover** | `#020617` (black) | `#FFD700` (gold) | `2px solid #FFD700` | Enhanced glow |

### CSS

```css
/* CTA Nav: Maximum Contrast Header Button */
.cta-nav {
    position: relative;
    padding: 0.75rem 1.5rem;
    background: #FFD700;
    color: #020617;
    font-size: 0.8rem;
    font-weight: 700;
    text-decoration: none;
    border-radius: 0.5rem;
    border: 2px solid #FFD700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.cta-nav:hover {
    background: #020617;
    color: #FFD700;
    border-color: #FFD700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}
```

### HTML Usage

```html
<a href="contacto/index.html" class="cta-nav">Primera Conversación</a>
```

---

## CTA Primary: High Visibility (Hero, Main Actions)

| State | Background | Text | Border | Shadow |
| :--- | :--- | :--- | :--- | :--- |
| **Default** | `rgba(255,255,255,0.03)` | `white` | `1px solid rgba(255,215,0,0.4)` | none |
| **Hover** | `#FFD700` (gold) | `#020617` (black) | `1px solid #FFD700` | `0 0 30px rgba(255,215,0,0.3)` |

---

## CSS

```css
/* CTA Primary: Color-Swap Hover */
.cta-primary {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 215, 0, 0.4);
    border-radius: 99px;
    color: white;
    font-family: var(--font-primary);
    font-weight: 600;
    font-size: 0.875rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-primary:hover {
    background: #FFD700;
    color: #020617;
    border-color: #FFD700;
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.3);
    transform: scale(1.03);
}
```

---

## HTML Usage

```html
<!-- Button -->
<button class="cta-primary">Explorar Sitio</button>

<!-- Link styled as button -->
<a href="#section" class="cta-primary">Iniciar Demo</a>
```

---

## Text Examples

| Context | Text | ✅ Good | ❌ Avoid |
| :--- | :--- | :--- | :--- |
| Hero | "Explorar Sitio" | ✅ | "Click aquí" |
| Service | "Ver Servicios" | ✅ | "Más info" |
| Contact | "Agendar Llamada" | ✅ | "Contacto" (noun only) |
| Product | "Iniciar Prueba" | ✅ | "Empezar" (verb only) |

---

## Checklist

- [ ] Uses `.cta-primary` or `.cta-secondary` class
- [ ] Primary: No icon inside button
- [ ] Text follows "Verbo + Sustantivo" pattern
- [ ] CSS includes hover state with appropriate effect

---

## CTA Secondary: Subtle Text Link

For less prominent actions. Uses underline + arrow icon. Low visual weight.

### Visual States

| State | Text | Border | Icon |
| :--- | :--- | :--- | :--- |
| **Default** | `white` | `bottom: 1px solid rgba(255,215,0,0.3)` | `→` |
| **Hover** | `#FFD700` (gold) | `bottom: 1px solid #FFD700` | slides right |

### CSS

```css
/* CTA Secondary: Subtle Link */
.cta-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: white;
    text-decoration: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.3);
    padding-bottom: 0.25rem;
    transition: all 0.25s ease;
}

.cta-secondary:hover {
    color: #FFD700;
    border-color: #FFD700;
}

.cta-secondary i {
    transition: transform 0.25s ease;
}

.cta-secondary:hover i {
    transform: translateX(4px);
}
```

### HTML Usage

```html
<a href="#section" class="cta-secondary">
    Comenzar la exploración
    <i data-lucide="arrow-right" class="w-4 h-4"></i>
</a>
```

---

## When to Use Each

| CTA Type | Use Case | Visual Weight | Examples |
| :--- | :--- | :--- | :--- |
| **Primary** | Main action, hero section, conversion goal | **High** — attracts attention | "Explorar Sitio", "Agendar Llamada" |
| **Secondary** | Supporting action, footer, end of section | **Low** — subtle, doesn't compete | "Comenzar la exploración", "Ver más" |

### Decision Criteria

1. **One Primary per viewport** — Avoid multiple high-attention buttons.
2. **Secondary for flow** — Use at section ends to guide without pressure.
3. **Hierarchy** — If two CTAs are near each other, one must be Primary, one Secondary.
