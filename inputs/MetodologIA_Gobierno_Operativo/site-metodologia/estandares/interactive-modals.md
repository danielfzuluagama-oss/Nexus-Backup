# Interactive Modal Standard: Level/Service Information

## Purpose
Provide deep-dive information about services without navigation. Used in roadmaps, pricing pages, and service listings.

---

## Design Principles

1. **Contextual Information** — Show details in-place without leaving the page.
2. **Data-Driven Content** — Modal content populated from JavaScript object.
3. **Clear Type Badge** — Visual indicator of service type (GRATIS, BOOTCAMP, PROGRAMA ÉLITE).
4. **Two-Column Benefits** — Keypoints + Benefits side-by-side.
5. **Contextual CTA** — Button adapts to the specific service.

---

## Structure

```
┌─────────────────────────────────────────┐
│  [X] Close Button                       │
│                                         │
│  [TYPE BADGE]          (color matches)  │
│  TÍTULO DEL NIVEL                       │
│  Descripción breve...                   │
│                                         │
│  ┌──────────────┬──────────────────┐   │
│  │ ¿Qué Incluye? │ Beneficios       │   │
│  │ • Item 1      │ ⚡ Benefit 1     │   │
│  │ • Item 2      │ ⚡ Benefit 2     │   │
│  │ • Item 3      │ ⚡ Benefit 3     │   │
│  └──────────────┴──────────────────┘   │
│                                         │
│  [████████ CTA BUTTON ████████]        │
└─────────────────────────────────────────┘
```

---

## CSS (Required)

```css
/* Modal Overlay */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.9);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
}

.modal-overlay:not(.opacity-0):not(.pointer-events-none) {
    opacity: 1;
    pointer-events: auto;
}

/* Modal Content Container */
.modal-content {
    max-width: 32rem;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    transform: scale(0.95);
    transition: transform 0.3s ease;
}

.modal-content.scale-100 {
    transform: scale(1);
}
```

---

## HTML Template

```html
<!-- Modal Container -->
<div id="level-modal" class="modal-overlay opacity-0 pointer-events-none">
    <div class="card-glass modal-content rounded-2xl border border-white/10 p-8 scale-95 relative">
        <button onclick="closeLevelModal()" class="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white">
            <i data-lucide="x" class="w-6 h-6"></i>
        </button>
        <div id="level-modal-content"></div>
    </div>
</div>
```

---

## JavaScript Pattern

```javascript
// Data Structure
const levelsData = {
    n0: {
        title: "N0: Diagnóstico",
        type: "🎁 GRATIS",
        typeColor: "text-emerald-400 bg-emerald-500/10",
        description: "Descripción del nivel...",
        keypoints: ["Item 1", "Item 2", "Item 3"],
        benefits: ["Beneficio 1", "Beneficio 2", "Beneficio 3"],
        cta: { text: "Agendar", href: "https://..." }
    },
    // ... more levels
};

// Open Modal
function openLevelModal(level) {
    const data = levelsData[level];
    if (!data) return;
    
    // Render content dynamically
    document.getElementById('level-modal-content').innerHTML = `
        <span class="inline-block px-3 py-1 rounded-full text-xs font-bold ${data.typeColor}">${data.type}</span>
        <h3 class="text-2xl font-bold text-white mb-3">${data.title}</h3>
        <p class="text-slate-400">${data.description}</p>
        <!-- ... rest of template -->
    `;
    
    const modal = document.getElementById('level-modal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content').classList.add('scale-100');
}

// Close Modal
function closeLevelModal() {
    const modal = document.getElementById('level-modal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-content').classList.remove('scale-100');
}

// Close on backdrop click
document.getElementById('level-modal').addEventListener('click', (e) => {
    if (e.target.id === 'level-modal') closeLevelModal();
});
```

---

## Type Badge Colors

| Type | Text Color | Background |
| :--- | :--- | :--- |
| GRATIS | `text-emerald-400` | `bg-emerald-500/10` |
| BOOTCAMP | `text-cyan-400` | `bg-cyan-500/10` |
| COACHING | `text-blue-400` | `bg-blue-500/10` |
| PROGRAMA ÉLITE | `text-pink-400` | `bg-pink-500/10` |

---

## Trigger Element

Make the clickable element a `<button>` for accessibility:

```html
<button onclick="openLevelModal('n0')" class="gantt-bar hover:scale-105 transition-all cursor-pointer">
    <i data-lucide="icon" class="w-4 h-4 mr-2"></i>
    <span class="font-semibold">Label</span>
</button>
```

---

## Checklist

- [ ] Modal has close button at top-right
- [ ] Backdrop click closes modal
- [ ] Type badge uses correct color scheme
- [ ] Two-column layout for keypoints/benefits
- [ ] CTA button leads to appropriate destination
- [ ] Content rendered from JavaScript data object
- [ ] Trigger uses `<button>` element (accessibility)
