# Header Standard: MetodologIA Premium Navigation

## Reference
**Golden Source**: [ruta/index.html](file:///Users/deonto/Documents/Antigravity/site-metodologia/ruta/index.html)

---

## CSS (Required in `<style>`)

```css
/* Premium Nav Styles (Homologated) */
.premium-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.nav-container { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; height: 5rem; display: flex; align-items: center; justify-content: space-between; }
.nav-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; }
.nav-logo-link { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; }
.nav-logo-link h1 { font-family: 'Poppins', sans-serif; font-size: 1.25rem; font-weight: 700; letter-spacing: -0.02em; color: white; display: flex; align-items: center; }
.highlight-metodologia { background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.highlight-ia-premium { background: linear-gradient(135deg, #FFD700 0%, #F59E0B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; margin-left: 1px; }
.nav-tagline-modern { display: flex; align-items: center; gap: 0.5rem; opacity: 0.8; margin-left: 0.25rem; }
.tagline-separator { width: 1.5rem; height: 1px; background: rgba(255, 255, 255, 0.2); }
.tagline-text { font-family: 'Montserrat', sans-serif; font-size: 0.65rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.15em; color: rgba(255, 255, 255, 0.6); }
.highlight-ia-yellow { color: #FFD700; font-weight: 700; }
.logo-svg { filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.2)); transition: transform 0.3s ease; }
.nav-logo-link:hover .logo-svg { transform: scale(1.05) rotate(5deg); }
.cta-nav { position: relative; padding: 0.75rem 1.5rem; background: #FFD700; color: #020617; font-size: 0.8rem; font-weight: 700; text-decoration: none; border-radius: 0.5rem; border: 2px solid #FFD700; box-shadow: 0 0 20px rgba(255, 215, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); white-space: nowrap; text-transform: uppercase; letter-spacing: 0.05em; }
.cta-nav:hover { background: #020617; color: #FFD700; border-color: #FFD700; box-shadow: 0 0 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.2); transform: translateY(-2px); }
.nav-glow-line { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.1) 20%, rgba(255, 215, 0, 0.6) 50%, rgba(255, 215, 0, 0.1) 80%, transparent 100%); bottom: 0; position: absolute; width: 100%; opacity: 0.7; }
```

---

## HTML (Subdirectory Version)

```html
<nav class="premium-nav">
    <div class="nav-container">
        <div class="nav-brand">
            <a href="../index.html" class="nav-logo-link">
                <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
                    <defs>
                        <linearGradient id="logoGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#0A122A" stop-opacity="1" />
                            <stop offset="100%" stop-color="#1e293b" stop-opacity="1" />
                        </linearGradient>
                    </defs>
                    <rect width="36" height="36" rx="10" fill="url(#logoGradientPremium)"/>
                    <path d="M10 12h3v12h-3V12zm6 0h3v8h-3v-8zm0 10h3v2h-3v-2zm6-10h3v6h-3v-6zm0 8h3v4h-3v-4z" fill="white"/>
                    <circle cx="18" cy="8" r="2" fill="#FFD700"/>
                </svg>
                <h1><span class="highlight-metodologia">Metodolog</span><span class="highlight-ia-premium">IA</span></h1>
            </a>
            <div class="nav-tagline-modern">
                <span class="tagline-separator"></span>
                <span class="tagline-text"><span class="highlight-ia-yellow">Acelere</span> su Estrateg<span class="highlight-ia-yellow">IA</span></span>
            </div>
        </div>
        <div class="hidden md:flex items-center gap-5">
            <a href="../ruta/index.html">Ruta de (R)Evolución</a>
            <a href="../recursos/index.html">Recursos</a>
            <a href="../contacto/index.html">Contacto</a>
            <a href="https://campus.metodologia.info" target="_blank" rel="noopener noreferrer">Campus ↗</a>
        </div>
        <div class="hidden md:flex items-center gap-4">
            <a href="../contacto/index.html" class="cta-nav">Primera Conversación</a>
        </div>
        <button class="mobile-menu-btn md:hidden" aria-label="Menu">☰</button>
    </div>
    <div class="nav-glow-line"></div>
</nav>
```

---

## Path Adjustment

| Location | Logo `href` | Links Prefix |
| :--- | :--- | :--- |
| Root | `index.html` | (none) |
| Subdirectory | `../index.html` | `../` |
