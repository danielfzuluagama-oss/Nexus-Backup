/**
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @author Germán Eliécer Sepúlveda
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
 */

class SiteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const basePath = this.getAttribute('base-path') || '.';
        this.render();
        
        // Inyectar CTAHandler de forma global
        this.loadCTAHandler(basePath);

        // Hidratar iconos del componente
        this.hydrateIcons();
    }

    hydrateIcons() {
        const initIcons = () => {
            if (typeof window.icons !== 'undefined' && typeof window.icons.createIcons === 'function') {
                window.icons.createIcons();
            } else {
                // Reintento breve si el script de iconos aún no carga
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

    loadCTAHandler(basePath) {
        if (!window.ctaHandlerLoaded) {
            const script = document.createElement('script');
            script.src = `${basePath}/js/CTAHandler.js`;
            script.defer = true;
            document.head.appendChild(script);
            window.ctaHandlerLoaded = true;
            console.log('🔗 SiteHeader: Cargando gestor de CTAs...');
        }
    }

    render() {
        const basePath = this.getAttribute('base-path') || '.';
        const currentPath = window.location.pathname;
        // isDark is not used in the HTML, so it's not needed here.

        this.innerHTML = `
        <nav class="premium-nav" aria-label="Navegación Principal">
            <div class="nav-container">
                <!-- Left: Logo + Tagline -->
                <div class="nav-brand">
                    <a href="${basePath}/index.html" class="nav-logo-link" aria-label="Ir al inicio de MetodologIA">
                        <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg" role="img" aria-labelledby="logoTitle">
                            <title id="logoTitle">Logo MetodologIA</title>
                            <defs>
                                <linearGradient id="logoGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="var(--bg-primary)" stop-opacity="1" />
                                    <stop offset="100%" stop-color="var(--bg-surface)" stop-opacity="1" />
                                </linearGradient>
                                <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <rect width="36" height="36" rx="10" fill="url(#logoGradientPremium)" filter="url(#logoGlow)"/>
                            <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                            <circle cx="18" cy="8" r="2" fill="var(--brand-gold)"/>
                        </svg>
                        <h1><span class="highlight-metodologia">Metodolog</span><span class="highlight-ia-premium">IA</span></h1>
                    </a>
                    <div class="nav-tagline-modern">
                        <span class="tagline-text">
                            <span class="highlight-ia-yellow">Aceleremos</span> su Estrateg<span class="highlight-ia-premium">IA</span>
                        </span>
                    </div>
                </div>

                <!-- Center: Navigation Links -->
                <div class="hidden lg:flex items-center gap-5" role="menubar">
                    <a href="${basePath}/ruta/index.html" class="nav-link ${this.isActive(currentPath, 'ruta')}" role="menuitem">Ruta de (R)Evolución</a>
                    <a href="${basePath}/recursos/index.html" class="nav-link ${this.isActive(currentPath, 'recursos')}" role="menuitem">Recursos</a>
                    <a href="${basePath}/servicios/index.html" class="nav-link ${this.isActive(currentPath, 'servicios')}" role="menuitem">Servicios</a>
                    <a href="${basePath}/contacto/index.html" class="nav-link ${this.isActive(currentPath, 'contacto')}" role="menuitem">Contacto</a>
                </div>

                <!-- Right Actions -->
                <div class="hidden md:flex items-center gap-4">
                     <a href="https://campus.metodologia.info" target="_blank" rel="noopener noreferrer" class="text-sm text-slate-100 hover:text-brand-gold transition-colors flex items-center gap-1" aria-label="Acceder al Campus (abre en nueva pestaña)">
                        Campus
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50" aria-hidden="true"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                    </a>
                    <a href="${basePath}/contacto/index.html" class="nav-cta-glow">
                        Primera Conversación
                    </a>
                </div>

                <!-- Mobile Menu Button -->
                <button class="mobile-menu-btn md:hidden" aria-label="Abrir menú de navegación" id="header-menu-toggle" aria-expanded="false" aria-controls="mobile-nav-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
            </div>
            <!-- Animated Gold Underline -->
            <div class="nav-glow-line"></div>
            
            <!-- Mobile Menu Overlay (Hidden by default) -->
            <div id="mobile-nav-overlay" class="mobile-menu hidden absolute top-full left-0 w-full bg-[var(--bg-primary)]/95 backdrop-blur-xl border-b border-white/10 p-6 flex-col gap-4 lg:hidden" role="menu">
                 <a href="${basePath}/ruta/index.html" class="text-white font-medium py-2" role="menuitem">Ruta de (R)Evolución</a>
                 <a href="${basePath}/recursos/index.html" class="text-white font-medium py-2" role="menuitem">Recursos</a>
                 <a href="${basePath}/servicios/index.html" class="text-white font-medium py-2" role="menuitem">Servicios</a>
                 <a href="${basePath}/contacto/index.html" class="text-white font-medium py-2" role="menuitem">Contacto</a>
            </div>
        </nav>
        `;

        // Ensure interactivity is set up immediately if possible, 
        // or defer to idle if browser supports it
        const initInteractivity = () => this.setupInteractivity();
        
        if (document.readyState === 'complete') {
            this.handleHydration(initInteractivity);
        } else {
            window.addEventListener('load', () => this.handleHydration(initInteractivity));
        }
    }

    handleHydration(callback) {
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(callback);
        } else {
            setTimeout(callback, 16);
        }
    }

    setupInteractivity() {
        const menuBtn = this.querySelector('#header-menu-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');
        
        if (menuBtn && mobileMenu) {
            // Remove old listeners if re-rendering
            menuBtn.replaceWith(menuBtn.cloneNode(true));
            const newBtn = this.querySelector('#header-menu-toggle');
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                mobileMenu.classList.toggle('hidden');
                mobileMenu.classList.toggle('flex');
            });
        }
    }

    isActive(current, path) {
        // Strict matching: Only highlight if we are exactly on the main index page of the section
        const targetPath = `/${path}/index.html`;
        const targetPathSlash = `/${path}/`;
        
        // Check if current path ends with the target (handles both with and without index.html if server serves folders)
        if (current.endsWith(targetPath) || current.endsWith(targetPathSlash)) {
            return 'text-brand-gold font-semibold';
        }
        return 'text-sm text-slate-100 hover:text-white transition-colors';
    }
}

customElements.define('site-header', SiteHeader);
