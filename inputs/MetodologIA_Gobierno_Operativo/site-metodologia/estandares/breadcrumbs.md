# Breadcrumbs Standard: UX-Based Navigation

## Reference
Experience-based navigation showing user journey, not folder structure.

---

## Design Principles

1. **UX Path**: Show user journey flow, not file structure
2. **Semantic**: `Home → Section → Subsection`
3. **Subtle**: Doesn't compete with main content
4. **Accessible**: Proper ARIA labeling

---

## CSS (Required)

```css
/* Breadcrumbs */
.breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #94a3b8;
    margin-bottom: 1.5rem;
}

.breadcrumb-link {
    color: #64748b;
    text-decoration: none;
    transition: color 0.2s ease;
}

.breadcrumb-link:hover {
    color: #FFD700;
}

.breadcrumb-separator {
    color: #475569;
    font-size: 0.65rem;
}

.breadcrumb-current {
    color: #e2e8f0;
    font-weight: 500;
}
```

---

## HTML Structure

```html
<nav aria-label="Breadcrumb" class="breadcrumbs">
    <a href="../index.html" class="breadcrumb-link">Home</a>
    <span class="breadcrumb-separator">›</span>
    <a href="../ruta/index.html" class="breadcrumb-link">Ruta</a>
    <span class="breadcrumb-separator">›</span>
    <span class="breadcrumb-current">Recursos</span>
</nav>
```

---

## UX Path Mapping

| Page | Breadcrumb Path |
|:-----|:----------------|
| `index.html` | (none - home page) |
| `ruta/index.html` | Home › Ruta |
| `recursos/index.html` | Home › Recursos |
| `contacto/index.html` | Home › Contacto |
| `empresas/index.html` | Home › Servicios › Empresas |
| `personas/index.html` | Home › Servicios › Personas |
| `nosotros/index.html` | Home › Nosotros |
| `nosotros/mision.html` | Home › Nosotros › Misión |
| `legal/terminos.html` | Home › Legal › Términos |

---

## Placement
Below header, above main content (inside hero or first section).
