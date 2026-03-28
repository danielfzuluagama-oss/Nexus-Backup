# MetodologIA Shadows & Borders (v5.2)

## 🕳️ The Steward Deep Soul

En la v5.2, las sombras actúan como el ancla de profundidad sobre el fondo obsidiana (`var(--bg-body)`). La precisión en el contraste de sombras es lo que separa un diseño genérico de uno de prestigio.

| Level | Shadow Logic | Class | Uso |
| :--- | :--- | :--- | :--- |
| **Deep** | `0 20px 50px -12px rgba(0,0,0,0.9)` | `shadow-2xl` | Modales y Hero Cards |
| **Floating** | `0 10px 30px -10px rgba(0,0,0,0.7)` | `shadow-xl` | Hover states |
| **Glow** | `0 0 30px var(--brand-gold-glow)` | `nav-cta-glow` | Success Indicators |

## 🪟 Glassmorphism v5.2 (Deep Soul Glass)

Para mantener la elegancia sobre el fondo obsidiana, el efecto glass requiere **backdrops densos** y **difuminados estratégicos**.

```css
.card-glass {
    background: var(--bg-elevated); /* Lighter Base */
    backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4);
}
```

## 🏗️ Border Scale (Precision DNA)

| Token | Pixels | Class | Uso |
| :--- | :--- | :--- | :--- |
| **Hairline** | 1px | `border` | Regular dividers |
| **Double** | 2px | `border-2` | Active levels / Levels |
| **Emphasis** | 4px | `border-4` | Impact sections |

## 📐 Unified Radii

| Level | Value | Class | Uso |
| :--- | :--- | :--- | :--- |
| **Edge** | 0.5rem | `rounded-lg` | Input Fields |
| **Button** | 0.75rem | `rounded-xl` | Precision CTAs |
| **Card** | 1.5rem | `rounded-3xl` | Standard Surfaces |
| **Modal** | 2rem | `rounded-[2rem]` | Container Entry |

---

> **Design Note:** Use `border-white/5` solo para elementos decorativos. Los elementos funcionales deben usar al menos `white/10` para garantizar visibilidad en pantallas con poco brillo.
