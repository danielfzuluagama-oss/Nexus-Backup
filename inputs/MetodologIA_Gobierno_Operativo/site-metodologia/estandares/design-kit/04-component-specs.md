# MetodologIA Component Specs

## Buttons

### Primary CTA

```html
<a class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--brand-gold)] text-black 
   font-bold hover:bg-[var(--brand-gold-dark)] transition-all shadow-lg shadow-[var(--brand-gold-glow)]">
    <i data-lucide="icon"></i>
    Texto CTA
</a>
```

### Secondary Button

```html
<a class="px-6 py-3 rounded-lg border border-white/20 text-white 
   hover:bg-white/5 transition-all">
    Texto
</a>
```

## Cards

### Card Glass (Standard)

```html
<div class="card-glass p-6 rounded-2xl border border-white/10">
    <!-- contenido -->
</div>
```

### Card Premium (Hover Effects)

```html
<div class="category-card" data-category="color-name">
    <div class="category-icon"><!-- SVG --></div>
    <div class="category-content">
        <h3 class="category-title">Título</h3>
        <p class="category-description">Descripción</p>
    </div>
</div>
```

## Badges

### Status Badge

```html
<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
   bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold">
    <span class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
    Label
</span>
```

### Journey Chip

```html
<a href="#section" class="journey-chip gold">Label</a>
```

Variantes: `red`, `orange`, `cyan`, `gold`

## Modals

### Modal Overlay

```html
<div id="modal-id" class="modal-overlay">
    <div class="modal-content max-w-4xl">
        <div class="card-glass p-8 rounded-3xl">
            <!-- header + body + footer -->
        </div>
    </div>
</div>
```

## Icons

Usamos **Lucide Icons** vía `js/icons.js`:

```html
<i data-lucide="icon-name" class="w-5 h-5"></i>
```

---

> **Referencia:** `estilos/components.css`, `components/`
