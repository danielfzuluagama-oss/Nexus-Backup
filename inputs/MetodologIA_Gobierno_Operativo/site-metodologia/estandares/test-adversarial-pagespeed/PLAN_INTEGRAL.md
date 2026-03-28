# 🎯 Plan Integral de Mejora: site-metodologia.info

> **Fecha:** 2026-01-16  
> **Objetivo:** Performance Score 81 → 95+  
> **Metodología:** Iterativa, calidad sobre velocidad

---

## 📊 Estado Actual del Sitio

| Métrica | Valor Actual | Objetivo | Gap |
|---------|--------------|----------|-----|
| Performance | 81 | 95+ | +14 |
| FCP | 3.7s | <1.8s | -1.9s |
| LCP | 3.7s | <2.5s | -1.2s |
| Accesibilidad | 100 | 100 | ✅ |
| Buenas Prácticas | 100 | 100 | ✅ |
| SEO | 92 | 100 | +8 |

---

## 🏗️ Arquitectura de Mejoras

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PLAN DE MEJORA INTEGRAL                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  FASE 1: Quick Wins (30 min)                                        │
│  ├── Lucide: agregar defer                                          │
│  ├── Fonts: reducir pesos + preload                                 │
│  └── Preconnects: agregar faltantes                                 │
│                                                                      │
│  FASE 2: Mejoras de Contenido (1-2 hrs)                             │
│  ├── og:image en formato PNG                                        │
│  ├── Header: homologar en todas las páginas                         │
│  └── FAQPage schema para AEO                                        │
│                                                                      │
│  FASE 3: Migración Tailwind (4-8 hrs)                               │
│  ├── Setup: npm + tailwind CLI                                      │
│  ├── Build: compilar CSS estático                                   │
│  ├── Test: validar todas las páginas                                │
│  └── Deploy: reemplazar CDN por CSS                                 │
│                                                                      │
│  FASE 4: Propagación (2-4 hrs por página)                           │
│  ├── vision.html                                                    │
│  ├── empresas/index.html                                            │
│  ├── personas/index.html                                            │
│  └── Resto del sitio                                                │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Fase 1: Quick Wins (Implementación Inmediata)

### 1.1 Agregar `defer` a Lucide Icons

**Archivo:** `index.html` (Línea 91)

```diff
- <script src="https://unpkg.com/lucide@latest"></script>
+ <script src="https://unpkg.com/lucide@latest" defer></script>
```

**Impacto:** Elimina bloqueo de parsing HTML  
**Riesgo:** ⚪ Ninguno  
**Tiempo:** 1 minuto

---

### 1.2 Optimizar Google Fonts

**Archivo:** `index.html` (Línea 86)

**Antes (18 pesos, render-blocking):**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Después (7 pesos, preload):**
```html
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Montserrat:wght@400;500;600&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Montserrat:wght@400;500;600&display=swap"></noscript>
```

**Impacto:** ~500ms menos en FCP, ~40% menos datos  
**Riesgo:** ⚪ Ninguno  
**Tiempo:** 5 minutos

---

### 1.3 Agregar Preconnects Faltantes

**Archivo:** `index.html` (Después de línea 85)

```html
<link rel="preconnect" href="https://unpkg.com">
<link rel="dns-prefetch" href="https://campus.metodologia.info">
```

**Impacto:** ~100-200ms menos en conexiones externas  
**Riesgo:** ⚪ Ninguno  
**Tiempo:** 1 minuto

---

## 📋 Fase 2: Mejoras de Contenido

### 2.1 Crear og:image en PNG

**Acción:** Generar imagen de 1200x630px con diseño del hero  
**Archivo a crear:** `/recursos/og-image.png`

**Actualizar en `index.html`:**
```diff
- <meta property="og:image" content="https://metodologia.info/favicon.svg">
+ <meta property="og:image" content="https://metodologia.info/recursos/og-image.png">
```

---

### 2.2 Homologar Headers

**Páginas a corregir:**
- `nosotros/index.html` - Tiene menú diferente, falta Segment Switcher

**Golden Reference:** [vision.html](file:///Users/deonto/Documents/Antigravity/site-metodologia/vision.html)

---

### 2.3 Agregar FAQPage Schema (Opcional pero recomendado para AEO)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "¿Qué es MetodologIA?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "MetodologIA es una consultora especializada en metodologías de alto rendimiento potenciadas con Inteligencia Artificial."
    }
  }]
}
</script>
```

---

## 📋 Fase 3: Migración de Tailwind (Requiere Aprobación)

### 3.1 Setup del Proyecto

```bash
# Crear package.json
npm init -y

# Instalar Tailwind
npm install -D tailwindcss

# Crear configuración
npx tailwindcss init
```

### 3.2 Configurar tailwind.config.js

```javascript
module.exports = {
  content: ['./**/*.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          gold: '#FFD700',
          blue: '#0B2545',
        }
      },
      // ... resto de config actual
    }
  }
}
```

### 3.3 Compilar CSS

```bash
npx tailwindcss -i ./estilos/input.css -o ./estilos/tailwind.min.css --minify
```

### 3.4 Reemplazar en HTML

```diff
- <script src="https://cdn.tailwindcss.com"></script>
- <script>tailwind.config = {...}</script>
+ <link rel="stylesheet" href="estilos/tailwind.min.css">
```

---

## 📋 Fase 4: Propagación

### Orden de Implementación

1. **index.html** (actual) - Página principal
2. **vision.html** - Golden reference (revisar para aprender patrones)
3. **empresas/index.html** - B2B
4. **personas/index.html** - B2C
5. **nosotros/index.html** - Requiere corrección de header
6. **contacto/index.html** - Formularios
7. **recursos/index.html** - Biblioteca

### Checklist por Página

- [ ] Aplicar optimizaciones de Fase 1
- [ ] Verificar header sigue Golden Standard
- [ ] Verificar footer sigue Golden Standard
- [ ] Canonical URL correcta
- [ ] JSON-LD schema apropiado
- [ ] Re-ejecutar PageSpeed Insights
- [ ] Documentar resultados

---

## 📈 Proyección de Resultados

| Fase | Performance Esperado | FCP Esperado |
|------|---------------------|--------------|
| Actual | 81 | 3.7s |
| Post-Fase 1 | 85-87 | 3.0-3.2s |
| Post-Fase 2 | 87-90 | 2.8-3.0s |
| Post-Fase 3 | 95+ | 1.2-1.5s |

---

## ✅ Aprobación Requerida

### Para proceder con Fase 1 (Quick Wins):

Modificaciones en `index.html`:
1. Línea 91: Agregar `defer` a Lucide
2. Línea 86: Optimizar Google Fonts (preload + reducir pesos)
3. Agregar 2 líneas de preconnect

**¿Aprobar implementación de Fase 1?**

---

## 📁 Estructura de Documentación Creada

```
estandares/
├── test-adversarial-pagespeed/
│   ├── README.md
│   ├── PLAN_INTEGRAL.md (este archivo)
│   └── index-home/
│       ├── capturas/
│       │   ├── psi_01_resumen.png
│       │   ├── psi_02_metricas.png
│       │   ├── psi_03_estadisticas.png
│       │   └── psi_04_seo.png
│       ├── DIAGNOSTICO.md
│       └── ANALISIS_CODIGO.md
├── audits/
│   └── 2026-01-16_index-home/
│       ├── AUDIT_REPORT.md
│       ├── ADVERSARIAL_ANALYSIS.md
│       └── IMPLEMENTATION_PLAN.md
├── seo_aeo_sem.md (actualizado v2.0)
├── seo-aeo-metadata.md (actualizado v2.0)
└── header-footer-golden-standard.md (nuevo)
```
