# 🏗️ Estándar de Header y Footer: Golden Reference

> **Versión:** 1.1.0  
> **Fecha:** 2026-01-16  
> **Golden Reference:** `vision.html`  
> **Estado:** Obligatorio para todas las páginas internas

---

## Propósito

Este documento define el estándar obligatorio para la navegación (header) y pie de página (footer) en todo el sitio MetodologIA. El objetivo es garantizar coherencia visual, funcional y de marca en todas las páginas.

---

## 📌 Regla Principal

> **TODAS las páginas internas DEBEN usar el mismo patrón de header y footer definido en `vision.html`.**

### ⚠️ Excepción: Landing Page (`index.html`)

La página `index.html` (Gateway/Landing) tiene un header **diferente y específico**:
- Es el punto de entrada principal del sitio
- Tiene las 4 cards de navegación como contenido principal
- Su header es más minimalista para no competir con las opciones

| Página | Tipo de Header | Referencia |
|--------|---------------|------------|
| `index.html` | **Landing Header** (minimalista) | Único |
| `vision.html` | **Standard Header** (completo) | Golden Reference |
| Todas las demás | **Standard Header** (completo) | Seguir `vision.html` |

---

## 1. Header: Premium Navigation

### 1.1 Estructura Obligatoria

```
┌─────────────────────────────────────────────────────────────────────┐
│  [Logo + Tagline]     [Segment Switcher]     [Nosotros] [CTA]      │
│                       B2C | B2B                         Inicia Ahora│
└─────────────────────────────────────────────────────────────────────┘
                                │ nav-glow-line │
```

### 1.2 Componentes Obligatorios

| Componente | Clase CSS | Contenido | Obligatorio |
|------------|-----------|-----------|-------------|
| **Nav Container** | `.premium-nav` | Wrapper fixed + blur | ✅ Sí |
| **Logo + Marca** | `.nav-brand` | SVG + "MetodologIA" | ✅ Sí |
| **Tagline** | `.nav-tagline-modern` | "Acelere su EstrategIA" | ✅ Sí |
| **Segment Switcher** | `.segment-switcher` | Personas (B2C) / Empresas (B2B) | ✅ Sí |
| **Link Nosotros** | - | Enlace a /nosotros/ | ✅ Sí |
| **CTA Principal** | `.nav-cta-glow` | "Inicia Ahora" → /contacto/ | ✅ Sí |
| **Gold Underline** | `.nav-glow-line` | Línea dorada animada | ✅ Sí |
| **Mobile Menu** | `.mobile-menu-btn` | Hamburger para móvil | ✅ Sí |

### 1.3 Código de Referencia (Extracto de vision.html)

```html
<!-- PREMIUM NAVIGATION: Neural Command Center -->
<nav class="premium-nav">
    <div class="nav-container">
        <!-- Left: Logo + Tagline -->
        <div class="nav-brand">
            <a href="index.html" class="nav-logo-link">
                <!-- SVG Logo -->
                <h1><span class="highlight-metodologia">Metodolog</span><span class="highlight-ia-premium">IA</span></h1>
            </a>
            <div class="nav-tagline-modern">
                <span class="tagline-separator"></span>
                <span class="tagline-text">
                    <span class="highlight-ia-yellow">Acelere</span> su Estrateg<span class="highlight-ia-yellow">IA</span>
                </span>
            </div>
        </div>

        <!-- Center: Segment Switcher (B2C/B2B) -->
        <div class="hidden lg:flex segment-switcher">
            <a href="personas/index.html" class="segment-btn">
                <i data-lucide="user" class="segment-icon"></i>
                <span>Personas (B2C)</span>
            </a>
            <a href="empresas/index.html" class="segment-btn">
                <i data-lucide="building-2" class="segment-icon"></i>
                <span>Empresas (B2B)</span>
            </a>
        </div>

        <!-- Right Actions -->
        <div class="hidden md:flex items-center gap-6">
            <a href="nosotros/index.html" class="text-sm text-slate-400 hover:text-white transition-colors">Nosotros</a>
            <a href="contacto/index.html" class="nav-cta-glow">Inicia Ahora</a>
        </div>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn md:hidden" aria-label="Menu" title="Abrir Menú">
            <i data-lucide="menu" class="w-6 h-6"></i>
        </button>
    </div>
    <!-- Animated Gold Underline -->
    <div class="nav-glow-line"></div>
</nav>
```

### 1.4 ❌ Patrones Incorrectos (NO USAR)

**El header de `nosotros/index.html` tiene un patrón incorrecto:**

```html
<!-- ❌ INCORRECTO: Menú diferente sin Segment Switcher -->
<div class="hidden md:flex items-center gap-5">
    <a href="../ruta/index.html">Ruta de (R)Evolución</a>
    <a href="../recursos/index.html">Recursos</a>
    <a href="../contacto/index.html">Contacto</a>
    <a href="https://campus.metodologia.info">Campus</a>
</div>
```

**Debe cambiarse a:**

```html
<!-- ✅ CORRECTO: Segment Switcher estandarizado -->
<div class="hidden lg:flex segment-switcher">
    <a href="../personas/index.html" class="segment-btn">
        <i data-lucide="user" class="segment-icon"></i>
        <span>Personas (B2C)</span>
    </a>
    <a href="../empresas/index.html" class="segment-btn">
        <i data-lucide="building-2" class="segment-icon"></i>
        <span>Empresas (B2B)</span>
    </a>
</div>
```

---

## 2. Footer: Premium Footer

### 2.1 Estructura Obligatoria

```
┌─────────────────────────────────────────────────────────────────────┐
│                    footer-glow-line                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│           "Metodologías de alto rendimiento potenciadas..."          │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│ [Logo + Descripción]  │ Servicios │ Empresa │ Legal                 │
│ [Iconos Sociales]     │           │         │                       │
├─────────────────────────────────────────────────────────────────────┤
│ © 2026 MetodologIA    │                    Success as a Service     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componentes Obligatorios

| Componente | Descripción | Obligatorio |
|------------|-------------|-------------|
| **Glow Line** | Línea dorada en el tope | ✅ Sí |
| **Frase Inspiracional** | Blockquote central | ✅ Sí |
| **Logo + Descripción** | Columna de marca (2 cols) | ✅ Sí |
| **Servicios** | Empresas, Personas, Offering, Recursos | ✅ Sí |
| **Empresa** | Misión, Nosotros, Ecosistema, Contacto | ✅ Sí |
| **Legal** | Términos, Privacidad | ✅ Sí |
| **Bottom Bar** | Copyright + "Success as a Service" | ✅ Sí |

### 2.3 Rutas Relativas

Para páginas en subdirectorios, ajustar rutas con `../`:

| Página en | Ruta a empresas/index.html |
|-----------|---------------------------|
| `/index.html` | `empresas/index.html` |
| `/nosotros/index.html` | `../empresas/index.html` |
| `/recursos/premium/item.html` | `../../empresas/index.html` |

---

## 3. CSS Styles Obligatorios

Las siguientes clases CSS DEBEN estar presentes en el `<style>` de cada página o en un archivo CSS compartido:

```css
/* Premium Nav Styles */
.premium-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(2, 6, 23, 0.85); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.nav-container { max-width: 80rem; margin: 0 auto; padding: 0 1.5rem; height: 5rem; display: flex; align-items: center; justify-content: space-between; }
/* ... resto de estilos del header ... */

/* Segment Switcher */
.segment-switcher { display: none; gap: 0.25rem; padding: 0.25rem; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 9999px; }
@media (min-width: 1024px) { .segment-switcher { display: flex; } }
.segment-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1.25rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 500; color: rgba(255, 255, 255, 0.6); text-decoration: none; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.segment-btn:hover { background: rgba(255, 215, 0, 0.1); color: #FFD700; }

/* Footer Styles */
.footer-glow-line { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(255, 215, 0, 0.1) 20%, rgba(255, 215, 0, 0.4) 50%, rgba(255, 215, 0, 0.1) 80%, transparent 100%); position: absolute; top: 0; width: 100%; opacity: 0.5; }
.footer-link { position: relative; color: #94a3b8; transition: color 0.25s ease, transform 0.25s ease; }
.footer-link:hover { color: #fbbf24; transform: translateX(4px); }
```

---

## 4. Checklist de Validación

Antes de publicar cualquier página, verificar:

- [ ] Header usa `.premium-nav` con estructura completa
- [ ] Segment Switcher presente con B2C y B2B
- [ ] Logo enlaza a `/index.html` (o `../index.html` desde subdirectorios)
- [ ] CTA "Inicia Ahora" presente y enlaza a `/contacto/`
- [ ] Footer tiene las 4 columnas (Servicios, Empresa, Legal, Marca)
- [ ] Rutas relativas correctas según profundidad de carpeta
- [ ] `footer-link-active` aplicado a la página actual en el footer

---

## 5. Páginas que Requieren Corrección

| Página | Problema | Prioridad |
|--------|----------|-----------|
| `nosotros/index.html` | Header tiene menú diferente, falta Segment Switcher | 🔴 Alta |
| `/contacto/` | Verificar consistencia | 🟠 Media |
| `/recursos/` | Verificar consistencia | 🟠 Media |

---

## 6. Archivos de Referencia

- **Golden Reference (Header + Footer):** [vision.html](file:///Users/deonto/Documents/Antigravity/site-metodologia/vision.html)
- **Estándar de Header:** [estandares/header.md](file:///Users/deonto/Documents/Antigravity/site-metodologia/estandares/header.md)
- **Estándar de Footer:** [estandares/footer.md](file:///Users/deonto/Documents/Antigravity/site-metodologia/estandares/footer.md)
