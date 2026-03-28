/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const basePath = this.getAttribute('base-path') || '.';
        this.render();
        this.hydrateIcons();
    }

    hydrateIcons() {
        const initIcons = () => {
            if (typeof window.icons !== 'undefined' && typeof window.icons.createIcons === 'function') {
                window.icons.createIcons();
            } else {
                setTimeout(() => {
                    if (typeof window.icons !== 'undefined') window.icons.createIcons();
                }, 500);
            }
        };

        if (document.readyState === 'complete') {
            initIcons();
        } else {
            window.addEventListener('load', initIcons);
        }
    }

    render() {
        const basePath = this.getAttribute('base-path') || '.';
        this.innerHTML = `
        <footer class="bg-[var(--bg-primary)] border-t border-white/5 pt-16 pb-8 relative overflow-hidden" aria-label="Pie de página">
            <!-- Glow Effect -->
            <div class="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true"></div>

            <div class="container mx-auto px-6 max-w-7xl relative z-10">
                <!-- Links Grid (5 columns) -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
                    
                    <!-- Brand Column (spans 2) -->
                    <div class="lg:col-span-2 space-y-6">
                        <div class="flex items-center gap-4">
                            <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                                <defs><linearGradient id="footerGradNew" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="var(--bg-primary)"/><stop offset="100%" stop-color="var(--bg-surface)"/></linearGradient></defs>
                                <rect width="36" height="36" rx="10" fill="url(#footerGradNew)"/>
                                <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                                <circle cx="18" cy="8" r="2" fill="var(--brand-gold)"/>
                            </svg>
                            <div>
                                <h3 class="text-xl font-bold font-heading"><span class="text-white">Metodolog</span><span class="text-brand-gold font-black">IA</span></h3>
                                <p class="text-slate-200 text-[10px] tracking-[0.2em] uppercase font-bold">Aceleremos su Estrateg<span class="text-brand-gold">IA</span></p>
                            </div>
                        </div>
                        <p class="text-slate-200 text-sm leading-relaxed max-w-sm italic">
                            "La excelencia no se compra, se diseña. Se cocrea y se comparte."
                        </p>
                    </div>

                    <!-- Servicios -->
                    <nav class="space-y-4" aria-label="Enlaces de Servicios">
                        <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block">Servicios</h4>
                        <ul class="space-y-3">
                            <li><a href="${basePath}/empresas/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Empresas</a></li>
                            <li><a href="${basePath}/personas/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Personas</a></li>
                            <li><a href="${basePath}/recursos/automatizaciones/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Aceleradores a Medida</a></li>
                            <li><a href="${basePath}/recursos/a-medida/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Servicios a Medida</a></li>
                        </ul>
                    </nav>

                    <!-- Recursos -->
                    <nav class="space-y-4" aria-label="Enlaces de Recursos">
                        <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block">Recursos</h4>
                        <ul class="space-y-3">
                            <li><a href="${basePath}/recursos/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Catálogo</a></li>
                            <li><a href="${basePath}/recursos/playbooks/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Playbooks</a></li>
                            <li><a href="${basePath}/sitemap.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Sitemap</a></li>
                            <li><a href="${basePath}/contacto/index.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Contacto</a></li>
                        </ul>
                    </nav>

                    <!-- Legal -->
                    <nav class="space-y-4" aria-label="Enlaces Legales">
                        <h4 class="text-white font-bold text-xs uppercase tracking-widest border-b border-brand-gold/20 pb-2 inline-block">Legal</h4>
                        <ul class="space-y-3">
                            <li><a href="${basePath}/legal/terminos.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Términos</a></li>
                            <li><a href="${basePath}/legal/privacidad.html" class="text-slate-100 hover:text-brand-gold text-sm transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Privacidad</a></li>
                        </ul>
                    </nav>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p class="text-xs text-slate-300">© 2026 MetodologIA. Copyleft.</p>
                    <div class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
                        <p class="text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                            Success as a Service <span class="text-slate-600 mx-2">|</span> Powered by Pristino Agent
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('site-footer', SiteFooter);
