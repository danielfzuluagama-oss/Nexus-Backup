# Footer Standard: MetodologIA 5-Column Grid

## Reference
**Golden Source**: [ruta/index.html](file:///Users/deonto/Documents/Antigravity/site-metodologia/ruta/index.html)

---

## Structure Overview

| Column | Grid Span | Content |
| :--- | :--- | :--- |
| 1-2 | `lg:col-span-2` | Brand (Logo, tagline, description, social) |
| 3 | 1 col | Servicios links |
| 4 | 1 col | Empresa links |
| 5 | 1 col | Legal links |

**Total**: 5 columns on `lg:` breakpoint

---

## CSS (Required)

```css
/* Footer Micro-Interactions */
.footer-link {
    position: relative;
    color: #94a3b8;
    transition: color 0.25s ease, transform 0.25s ease;
}
.footer-link:hover {
    color: #fbbf24;
    transform: translateX(4px);
}
.footer-link-active {
    color: #FFD700 !important;
    font-weight: 600;
}
.footer-link-active::before {
    content: '›';
    margin-right: 0.5rem;
    color: #FFD700;
    font-weight: 700;
}
.footer-glow-line {
    height: 1px;
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 215, 0, 0.1) 20%, 
        rgba(255, 215, 0, 0.4) 50%, 
        rgba(255, 215, 0, 0.1) 80%, 
        transparent 100%);
    position: absolute;
    top: 0;
    width: 100%;
    opacity: 0.5;
}
.footer-section-title {
    position: relative;
    display: inline-block;
}
.footer-section-title::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, #FFD700, transparent);
    opacity: 0.5;
}
```

---

## HTML Structure

```html
<footer class="bg-slate-950 border-t border-white/5 pt-16 pb-8">
    <div class="container mx-auto px-6 max-w-7xl">

        <!-- Links Grid (5 columns) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

            <!-- Brand Column (spans 2) -->
                <div class="flex items-center gap-4">
                    <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs><linearGradient id="footerGradNew" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A122A"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>
                        <rect width="36" height="36" rx="10" fill="url(#footerGradNew)"/>
                        <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                        <circle cx="18" cy="8" r="2" fill="#FFD700"/>
                    </svg>
                    <div>
                        <h3 class="text-xl font-bold"><span class="text-white">Metodolog</span><span class="text-yellow-400 font-black">IA</span></h3>
                        <p class="text-slate-400 text-xs tracking-wider">ACELERE SU ESTRATEG<span class="text-yellow-400 font-bold">IA</span></p>
                    </div>
                </div>
                <p class="text-slate-400 text-sm leading-relaxed max-w-sm">
                    Metodologías de alto rendimiento potenciadas con inteligencia artificial.
                </p>
            </div>

            <!-- Servicios -->
            <div class="space-y-4">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Servicios</h4>
                <ul class="space-y-3">
                    <li><a href="empresas/index.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Empresas</a></li>
                    <li><a href="personas/index.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Personas</a></li>
                </ul>
            </div>

            <!-- Empresa -->
            <div class="space-y-4">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Empresa</h4>
                <ul class="space-y-3">
                    <li><a href="nosotros/mision.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Misión</a></li>
                    <li><a href="contacto/index.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Contacto</a></li>
                </ul>
            </div>

            <!-- Legal -->
            <div class="space-y-4">
                <h4 class="text-white font-semibold text-sm uppercase tracking-wider">Legal</h4>
                <ul class="space-y-3">
                    <li><a href="legal/terminos.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Términos</a></li>
                    <li><a href="legal/privacidad.html" class="text-slate-400 hover:text-yellow-400 text-sm transition-colors">Privacidad</a></li>
                </ul>
            </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-xs text-slate-500">© 2026 MetodologIA. Copyleft — Licencia MIT.</p>
            <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p class="text-xs text-slate-400 font-medium">Success as a Service</p>
            </div>
        </div>
    </div>
</footer>
```

---

## Path Adjustment

| Location | Links Prefix |
| :--- | :--- |
| Root | (none, e.g., `legal/terminos.html`) |
| Subdirectory | `../` (e.g., `../legal/terminos.html`) |
