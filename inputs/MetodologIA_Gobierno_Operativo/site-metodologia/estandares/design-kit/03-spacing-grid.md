# MetodologIA Spacing & Grid (v5.1)

## 📐 The 4px Atomic Grid

Todos los espaciados en MetodologIA se basan en potencias o múltiplos de **4px**. La consistencia es la base del prestigio.

| Token | Pixels | Tailwind | Contexto |
| :--- | :--- | :--- | :--- |
| `0.5` | 2px | `p-0.5` | Precision Borders |
| `1` | 4px | `p-1` | Micro-offsets |
| `2` | 8px | `p-2` | Small Component Gaps |
| `4` | 16px | `p-4` | Standard Card Padding |
| `8` | 32px | `p-8` | Dashboard Sections |
| `20` | 80px | `py-20` | Section Breathing Room |

## 🌬️ The Golden Breath (Principio de Fluidez)

En el diseño v5.1, el espacio en blanco no es "espacio vacío", es **respiro estratégico**.

- **Secciones:** Mínimo `py-20` (80px) para separar conceptos de alto nivel.
- **Jerarquía:** A mayor importancia del mensaje, mayor debe ser el espacio que lo rodea.

## 📦 Container Ecosystem

```css
.container-max {
    max-width: 80rem; /* 1280px Elite Standard */
    margin: 0 auto;
    padding: 0 1.5rem; /* Mobile Safety */
}
```

## 📱 Fluid Breakpoints

| Name | Threshold | Uso |
| :--- | :--- | :--- |
| **Mobile** | < 640px | Single Column / Stacked |
| **Tablet** | 768px | Compact Grids (2 Col) |
| **Desktop** | 1024px | Full Dashboard Layout |
| **Elite** | 1280px | container-max Activation |

---
> **Audit Hint:** Si un elemento no se alinea con la escala de 4px, se considera una "Fractura Operativa" del diseño.
