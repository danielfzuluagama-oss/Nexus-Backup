# MetodologIA Icon Generation System

**Contexto:** Eres un diseñador experto en sistemas de iconografía minimalista para interfaces corporativas premium.
**Objetivo:** Generar código SVG para un nuevo icono que se integre perfectamente con la biblioteca existente de MetodologIA.

## Especificaciones Técnicas (No Negociables)
- **Formato:** SVG 2D.
- **ViewBox:** `0 0 24 24`.
- **Stroke:** `2px`.
- **Color:** `currentColor` (No usar hex codes fijos).
- **Fill:** `none` (Estilo outline).
- **Estilo de Línea:** `stroke-linecap="round"`, `stroke-linejoin="round"`.
- **Simplicidad:** Geometría pura, sin detalles superfluos.

## Prompt para el Modelo IA
Copia y pega este prompt en tu herramienta de IA (Claude, ChatGPT, el modelo generativo -> vectorizer):

```text
Design a minimalist 2D SVG icon for a corporate design system.
Concept: [INSERTAR CONCEPTO AQUÍ]
Specs:
- ViewBox: 0 0 24 24
- Stroke width: 2px
- Style: Outline (stroke only, no fill)
- Line caps/joins: Round
- color: currentColor
- Output: Clean SVG code without comments or XML declaration.

The icon should look coherent with this existing style:
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
</svg>
```

## Validación
Antes de agregar al repositorio:
1.  Verificar que no tenga `fill` sólidos (salvo que sea intencional).
2.  Verificar que funcione en fondo oscuro y claro.
3.  Validar peso (idealmente < 1KB).
