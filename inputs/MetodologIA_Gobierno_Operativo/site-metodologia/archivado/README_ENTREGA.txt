# PROYECTO DE OPTIMIZACIÓN INTEGRAL: SITE METODOLOGIA
Fecha: 2026-01-16
Estado: FINALIZADO

Este directorio contiene la versión optimizada del sitio web, con una nueva arquitectura de assets y rendimiento.

## 🚀 Cambios Principales

### 1. Infraestructura de Assets (`/assets_repo/`)
Se ha creado un repositorio centralizado para todos los recursos visuales y de diseño, eliminando dependencias externas.
- `assets_repo/tokens/design-tokens.json`: Única fuente de verdad para colores y fuentes.
- `assets_repo/icons/canonical/`: Biblioteca de 28 iconos SVG optimizados.
- `assets_repo/scripts/`: Herramientas de automatización (`sync_icons.py`) para mantener el sitio actualizado.

### 2. Estandarización de Código
- **Cero Dependencias Externas**: Eliminado `lucide.js` (CDN). Todo el código es propietario y local.
- **CSS Modular**: Estilos segregados en `base.css`, `components.css` y `variables.css`.
- **Precios Canónicos**: Regla de negocio implementada (1 USD = 3500 COP).

### 3. Nuevos Templates (`/templates/`)
Modelos HTML listos para copiar y pegar para futuras páginas.
- `landing-page.html`: Optimizado para ventas.
- `content-page.html`: Optimizado para documentos legales o artículos.

## 🛠 Cómo mantener el sitio

### Agregar un nuevo icono
1. Colocar el archivo `.svg` limpio en `assets_repo/icons/canonical/`.
2. Ejecutar: `python3 assets_repo/scripts/sync_icons.py`
3. Usar en HTML/JS: `window.icons.get('nombre-icono')`.

### Crear una nueva página
1. Duplicar `templates/landing-page.html` o `content-page.html`.
2. Habilitar CSS específico si es necesario.

---
**Entregado por: Gemini Agent**
