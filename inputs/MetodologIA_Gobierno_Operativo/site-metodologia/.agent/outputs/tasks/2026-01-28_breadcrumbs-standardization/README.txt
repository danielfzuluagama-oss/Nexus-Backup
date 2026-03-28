# Tarea: Estandarización de Breadcrumbs (Golden Reference)
Fecha: 2026-01-28

## Objetivo
Unificar el diseño y estructura de las "Breadcrumbs" (migas de pan) en todas las páginas internas del sitio MetodologIA, siguiendo el estándar visual premium definido en `vision.html`.

## Cambios Realizados
Se actualizó el bloque `<nav aria-label="Breadcrumb">` en los siguientes archivos:

1.  `vision.html` (Definición del Golden Standard)
2.  `contacto/index.html`
3.  `empresas/index.html`
4.  `personas/index.html`
5.  `recursos/index.html`
6.  `ruta/index.html`
7.  `servicios/index.html`
8.  `nosotros/index.html`
9.  `legal/privacidad.html`
10. `legal/terminos.html`

## Estándar Aplicado (Golden Reference)
- **Contenedor:** `container-max mb-8 animate-fade-in-down`
- **Tipografía:** `font-mono tracking-wide text-xs md:text-sm`
- **Colores:**
    - Inactivo/Separador: `text-slate-500` / `text-slate-700`
    - Activo (Página actual): `text-slate-300 font-medium`
    - Hover: `hover:text-brand-gold`
- **Icono Home:** SVG inline 12x12 (feather-home optimizado).

## Resultado
Todas las páginas internas ahora comparten una navegación secundaria consistente, legible y alineada con la identidad visual de MetodologIA v2.0.
