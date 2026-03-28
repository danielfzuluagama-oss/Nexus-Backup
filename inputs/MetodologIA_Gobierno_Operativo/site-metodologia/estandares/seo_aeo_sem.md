# Estándares de Optimización y Auditoría (SEO/AEO/SEM)

> **Versión:** 2.0.0  
> **Fecha:** 2026-01-16  
> **Estado:** Documento Vivo  
> **Última Auditoría:** index.html (81 Performance, 100 Accesibilidad, 92 SEO)

---

## 0. Core Web Vitals 2026 (NUEVO)

Google utiliza Core Web Vitals como factor de ranking. Las métricas clave para 2026 son:

### Métricas Obligatorias

| Métrica | Nombre Completo | Umbral Bueno | Umbral Pobre |
|---------|-----------------|--------------|--------------|
| **LCP** | Largest Contentful Paint | < 2.5s | > 4.0s |
| **INP** | Interaction to Next Paint | < 200ms | > 500ms |
| **CLS** | Cumulative Layout Shift | < 0.1 | > 0.25 |

### Métricas Diagnósticas (Importantes)

| Métrica | Nombre Completo | Umbral Objetivo |
|---------|-----------------|-----------------|
| **FCP** | First Contentful Paint | < 1.8s |
| **TBT** | Total Blocking Time | < 200ms |
| **SI** | Speed Index | < 3.4s |

### Optimizaciones Críticas

#### Para LCP/FCP:

1. **Eliminar recursos que bloquean renderizado**
   - CSS crítico inline
   - Scripts con `defer` o `async`
   - Preload de recursos críticos
2. **Optimizar imágenes**
   - Formato WebP/AVIF
   - Lazy loading
   - Dimensiones explícitas
3. **Reducir Server Response Time**
   - CDN
   - Compresión Brotli/GZIP

#### Para INP (reemplaza FID en 2024):

1. **Minimizar JavaScript del main thread**
2. **Dividir tareas largas** (>50ms) en chunks
3. **Evitar scripts de terceros pesados**

#### Para CLS:

1. **Dimensiones explícitas** en todas las imágenes y videos
2. **Reservar espacio** para contenido dinámico
3. **Evitar insertar contenido** sobre contenido existente

---

## 1. Breadcrumbs (Migas de Pan)

Facilitan la navegación y estructura para usuarios y bots.

### Estándar Visual

Debe situarse en el tope del `main` o debajo de la navegación.
Formato: `Inicio > [Sección] > [Página Actual]`

```html
<nav aria-label="Breadcrumb" class="container mx-auto px-4 py-4">
    <ol class="flex items-center space-x-2 text-sm text-slate-400">
        <li><a href="/" class="hover:text-brand-gold transition-colors">Inicio</a></li>
        <li class="text-slate-600">/</li>
        <li><a href="/seccion/" class="hover:text-brand-gold transition-colors">Sección</a></li>
        <li class="text-slate-600">/</li>
        <li class="text-white font-medium" aria-current="page">Página Actual</li>
    </ol>
</nav>
```

### Estándar Schema (JSON-LD)

Obligatorio en todas las páginas internas.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Inicio",
    "item": "https://metodologia.info/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "Sección",
    "item": "https://metodologia.info/seccion/"
  }]
}
```

---

## 2. AEO (Answer Engine Optimization) - ACTUALIZADO 2026

Optimización para LLMs y Motores de Respuesta (Perplexity, Google AI Overview, SearchGPT, Gemini).

> [!IMPORTANT]
> En 2026, AEO es tan crítico como SEO. Los motores de respuesta de IA extraen contenido directamente sin requerir clicks. Debemos optimizar para ser "la respuesta".

### 2.1 Principios AEO 2026

1. **Respuestas Directas y Concisas**

   - Bloques de respuesta de 40-120 palabras
   - Estructura pregunta → respuesta explícita
   - Formato fácil de extraer (bullets, tablas)

2. **Preguntas Conversacionales**
   - Optimizar para queries naturales tipo "¿Cómo...?", "¿Qué es...?"
   - Anticipar "People Also Ask"
   - Long-tail keywords conversacionales

3. **Señales de Autoridad**
   - E-E-A-T demostrable
   - Citas y fuentes cuando sea relevante
   - Autor visible con credenciales

### 2.2 Estándares JSON-LD para AEO

Cada página debe tener un script ld+json definiendo la entidad.

* `Organization`: En home (`index.html`).
* `Product`/`Course`: En landings de venta (`bootcamp-*.html`).
* `FAQPage`: En secciones con preguntas frecuentes (CRÍTICO para AI Overviews).
* `HowTo`: Para guías paso a paso.

**Ejemplo FAQ (Crítico para AEO):**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "¿Qué es la Soberanía Operativa?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Es la capacidad de una organización de ejecutar su estrategia de forma autónoma, minimizando dependencias externas mediante sistemas propios e IA."
    }
  }]
}
```

### 2.3 llms.txt (Archivo Especial para LLMs)

Mantener `llms.txt` actualizado en la raíz del sitio con:
- Descripción de la organización
- Servicios ofrecidos con precios
- Diferenciadores clave
- Formatos disponibles

---

## 3. SEO & SEM

### 3.1 SEO Técnico (Checklist Actualizado)

| Elemento | Especificación | Estado Requerido |
|----------|----------------|------------------|
| **Title Tag** | `[Keyword Principal] - [Beneficio] | MetodologIA` | Max 60 chars |
| **Meta Description** | Propuesta de valor + keyword + CTA implícito | 150-160 chars |
| **Canonical** | URL canónica específica por página | Obligatorio |
| **Open Graph** | `og:title`, `og:description`, `og:image` (1200x630 PNG) | Obligatorio |
| **Twitter Cards** | `twitter:card`, `twitter:image` | Obligatorio |
| **Hreflang** | Si hay versiones en otros idiomas | Condicional |

### 3.2 Canonical URLs - Reglas

```
/index.html        → canonical: https://metodologia.info/
/empresas/         → canonical: https://metodologia.info/empresas/
/personas/         → canonical: https://metodologia.info/personas/
/recursos/[item]   → canonical: https://metodologia.info/recursos/[item]
```

> [!WARNING]
> Cada página DEBE tener su propio canonical, NO apuntar a la raíz.

### 3.3 SEM (Landing Pages)

1. **Above the fold**: H1 claro + CTA contrastado.
2. **Trust Signals**: Logos de clientes, testimonios, o credenciales.
3. **Conversion**: Botones con IDs únicos para tracking (ej. `id="cta-hero-buy"`).

---

## 4. Performance y Recursos (NUEVO)

### 4.1 Carga de Scripts

```html
<!-- ❌ INCORRECTO: Bloquea render -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- ✅ CORRECTO: No bloquea render -->
<script src="https://unpkg.com/lucide@latest" defer></script>
```

### 4.2 Carga de Fuentes

```html
<!-- ❌ INCORRECTO: Render-blocking + demasiados pesos -->
<link href="...Poppins:wght@100;200;300;400;500;600;700;800;900..." rel="stylesheet">

<!-- ✅ CORRECTO: Preload + solo pesos usados -->
<link rel="preload" as="style" href="...Poppins:wght@400;600;700;900&display=swap" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="..."></noscript>
```

### 4.3 CSS Framework

| Entorno | Método | Impacto |
|---------|--------|---------|
| **Desarrollo** | Tailwind CDN | OK |
| **Producción** | CSS compilado y purgeado | REQUERIDO para performance |

```html
<!-- ❌ PRODUCCIÓN INCORRECTA -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- ✅ PRODUCCIÓN CORRECTA -->
<link rel="stylesheet" href="/estilos/tailwind.min.css">
```

### 4.4 Preconnects Requeridos

```html
<!-- Siempre incluir para recursos externos -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com">
<link rel="dns-prefetch" href="https://campus.metodologia.info">
```

---

## 5. Auditoría de Sitios (Estado Actual: 2026-01-16)

### 📊 index.html (Home/Gateway)

| Métrica | Valor | Estado |
|---------|-------|--------|
| Performance | 81 | 🟠 Mejorable |
| Accessibility | 100 | 🟢 Excelente |
| Best Practices | 100 | 🟢 Excelente |
| SEO | 92 | 🟢 Bueno |
| FCP | 3.7s | 🔴 Pobre |
| LCP | 3.7s | 🟠 Mejorable |
| TBT | 0ms | 🟢 Excelente |
| CLS | 0.008 | 🟢 Excelente |

**Problemas Identificados:**

- Tailwind CDN bloquea renderizado (~2.9s)
- Google Fonts con demasiados pesos
- Lucide Icons sin defer

**Plan de Mejora:** Ver `estandares/audits/2026-01-16_index-home/`

### ✅ Vision (`vision.html`)
*   **SEO**: Title y Description correctos.
*   **AEO**: Schema `Organization` presente.
*   **Breadcrumbs**: ✅ Implementados (Golden Standard).

### ✅ Empresas (`empresas/index.html`)
*   **SEO**: Title optimizado ("Soluciones Corporativas").
*   **AEO**: Schema `Organization` presente.
*   **Breadcrumbs**: ✅ Implementados.

### ✅ Personas (`personas/index.html`)
*   **SEO**: Title optimizado ("Crecimiento Profesional").
*   **AEO**: Schema `EducationalOrganization` + `Course` presentes.
*   **Breadcrumbs**: ✅ Implementados.

---

## 6. Proceso de Auditoría (NUEVO)

### 6.1 Estructura de Carpeta de Auditoría

```
estandares/audits/
└── YYYY-MM-DD_nombre-pagina/
    ├── psi_01_resumen.png       # Captura de puntuaciones
    ├── psi_02_metricas.png      # Core Web Vitals
    ├── psi_03_estadisticas.png  # Oportunidades
    ├── psi_04_seo.png           # Análisis SEO
    ├── AUDIT_REPORT.md          # Extracción de datos
    ├── ADVERSARIAL_ANALYSIS.md  # Análisis crítico
    ├── IMPLEMENTATION_PLAN.md   # Plan de mejora
    └── VALIDATION.md            # Resultados post-fix
```

### 6.2 Flujo de Auditoría

1. **Captura:** Ejecutar PageSpeed Insights, guardar capturas
2. **Extracción:** Documentar métricas en AUDIT_REPORT.md
3. **Análisis:** Identificar oportunidades en ADVERSARIAL_ANALYSIS.md
4. **Planificación:** Crear IMPLEMENTATION_PLAN.md
5. **Ejecución:** Implementar cambios iterativamente
6. **Validación:** Re-ejecutar PSI, documentar mejoras

---

## 7. Acciones Completadas

### 2026-01-16

- ✅ Creada estructura de auditoría para `index.html`
- ✅ Documentado análisis adversarial
- ✅ Actualizado estándar con sección de Performance
- ✅ Agregada sección de Core Web Vitals 2026

### 2026-01-14

- ✅ Implementados **Breadcrumbs Visuales y Schema** en todo el sitio
- ✅ Enriquecido **JSON-LD** en landings B2C con tipos `Course`
- ✅ Actualizado **llms.txt** a v4.0 con formatos y precios
