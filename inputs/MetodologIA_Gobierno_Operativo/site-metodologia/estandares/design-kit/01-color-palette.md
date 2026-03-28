# MetodologIA Color Palette (v5.0 - Steward Standard)

## 🌌 Background Architecture (HSL Empathy)

A partir de la v5.0, los fondos se rigen por el **Protocolo de Empatía Visual**, incrementando la luminosidad base en un 15-25% para reducir la fatiga ocular y maximizar la accesibilidad.

| Token | Value (HSL) | CSS Hex (Approx) | Uso |
| :--- | :--- | :--- | :--- |
| `--bg-primary` | `hsl(220, 34%, 18%)` | `#405a8b` | Header & Secciones Luminosas |
| `--bg-surface` | `hsl(220, 30%, 23%)` | `#394b6b` | Tarjetas & Superficies |
| `--bg-body` | `hsl(222, 29%, 12%)` | `#2d3a5a` | Body Grounded (-25%) |
| `--bg-elevated` | `hsla(220, 34%, 18%, 0.8)` | - | Luminous Glass Base |

## ⚜️ Brand Colors (The Success DNA)

| Token | Value | Uso |
| :--- | :--- | :--- |
| `--brand-gold` | `#FFF033` | CTAs Primarios (High Contrast) |
| `--brand-gold-dark` | `#FFD700` | Hover, Acentos |
| `--brand-gold-glow` | `rgba(255, 240, 51, 0.2)` | Resplandor de éxito |

## 📖 Text Hierarchy

| Token | Value | Justificación A11y |
| :--- | :--- | :--- |
| `--text-primary` | `#FFFFFF` | Contraste >= 7:1 (AAA) |
| `--text-secondary` | `#e2e8f0` | Contraste >= 4.5:1 (AA) |
| `--text-muted` | `#cbd5e1` | Captions, Hints |

## 🎨 Accent Matrix

| Color | Hex | Glow | Contexto |
| :--- | :--- | :--- | :--- |
| **Cyan** | `#22d3ee` | `rgba(34,211,238,0.2)` | Personas / Aceleradores |
| **Orange** | `#f97316` | `rgba(249,115,22,0.2)` | Tracción / Acelerar |
| **Emerald** | `#34d399` | `rgba(52,211,153,0.2)` | Éxito / 100 Check |
| **Red** | `#ef4444` | `rgba(239,68,68,0.2)` | Problemas / Alertas |

## 🎭 Gradients (Depth & Soul)

```css
--gradient-gold: linear-gradient(135deg, #FFF033 0%, #FFD700 100%);
--gradient-premium: linear-gradient(135deg, #15325b 0%, #264a7c 100%);
--gradient-surface: linear-gradient(135deg, #26324d 0%, #1a233a 100%);
```

---
> **Sincronización:** Este documento es la fuente de verdad para `estilos/variables.css`. Cualquier cambio debe ser validado contra el skill `130-universal-branding-steward`.
