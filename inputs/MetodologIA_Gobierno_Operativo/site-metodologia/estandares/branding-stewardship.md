# Protocolo de Gobernanza: Branding Stewardship v5.0

Este documento define las leyes inmutables del diseño y la accesibilidad para el ecosistema MetodologIA. Como "Stewards", nuestra responsabilidad es proteger la esencia de la marca mientras garantizamos la inclusión total.

## 1. El ADN del "Éxito como Servicio"

MetodologIA no es solo un sitio web; es un Command Center de alta fidelidad. El diseño debe respirar:
- **Sabiduría (Sagacity)**: Tonos profundos que evocan conocimiento.
- **Eficiencia**: Interfaces limpias, sin fricción, que guían al usuario al resultado.
- **Prestigio**: Uso de dorados y efectos de profundidad (Glassmorphism).

## 2. El Sistema de Color Evolucionado (HSL)

A partir de la v5.0, todos los colores de fondo deben utilizar el sistema HSL para facilitar la legibilidad y el ajuste dinámico.

| Token | Propósito | Valor Standard (v5.0) | Justificación A11y |
|-------|-----------|------------------------|--------------------|
| `--bg-primary` | Fondo Global / Secciones | `hsl(225, 30%, 15%)` | +15% ligero vs original |
| `--bg-body` | Fondo del Elemento Body | `hsl(225, 30%, 25%)` | +10% adicional (Legibilidad) |
| `--bg-surface` | Tarjetas y Superficies | `hsl(225, 25%, 20%)` | Contraste con el fondo |
| `--brand-gold` | CTAs y Acentos | `#FFF033` | Ratio 7:1 sobre fondo |

## 3. Mandatorios de Accesibilidad (PSOP-05)

1. **Contraste Crítico**: El texto principal (`#FFFFFF`) debe ser intocable sobre fondos oscuros. El texto secundario debe mantener un ratio >= 4.5:1.
2. **Interactividad**: Cada botón debe tener un `aria-label` descriptivo si es iconográfico.
3. **Navegabilidad**: Prohibido el uso de `tabindex="-1"` en elementos interactivos a menos que estén ocultos.
4. **Respeto al Usuario**: Respetar las preferencias de `prefers-reduced-motion`.

## 4. El "WOW" Effect Protocol

Cada página de MetodologIA debe contener al menos un elemento de "alta gama":
- Una micro-interacción suave (Framer Motion o CSS puro).
- Un efecto de gradiente dorado con "glow" en el CTA principal.
- Una tipografía de catálogo perfectamente jerarquizada.

---
**Firmado por el Steward del Branding**
*Protegiendo la marca, empoderando al usuario.*
