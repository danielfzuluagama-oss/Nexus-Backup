# Estándar de Metadatos SEO y AEO (10/10)

> **Versión:** 2.0.0  
> **Fecha:** 2026-01-16  
> **Estado:** Actualizado con Performance Guidelines

Este documento define el estándar de calidad para los metadatos en todo el sitio web de MetodologIA. El objetivo es maximizar el CTR (Click-Through Rate) en buscadores tradicionales (SEO), la relevancia en motores de respuesta de IA (AEO), y el rendimiento (Core Web Vitals).

---

## 1. Gateway & Technical Metadata

Every page must have a complete metadata block to ensure perfect rendering across browsers, search engines, and social platforms.

### 1.1 Essential Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="canonical" href="https://metodologia.info/[relative-path]">
<meta name="theme-color" content="#FFD700" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#020617" media="(prefers-color-scheme: dark)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

### 1.2 Preconnects (Crítico para Performance)

```html
<!-- OBLIGATORIO: Incluir ANTES de cualquier recurso externo -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://unpkg.com">
<link rel="dns-prefetch" href="https://campus.metodologia.info">
```

> [!TIP]
> Los preconnects reducen latencia de conexión en ~100-200ms por recurso externo.

### 1.3 Resource Loading (NUEVO)

#### Fuentes (Fonts)

```html
<!-- ❌ INCORRECTO: Render-blocking + demasiados pesos -->
<link href="...Poppins:wght@100;200;300;400;500;600;700;800;900..." rel="stylesheet">

<!-- ✅ CORRECTO: Preload con display=swap + solo pesos usados -->
<link rel="preload" as="style" 
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Montserrat:wght@400;500;600&display=swap" 
      onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Montserrat:wght@400;500;600&display=swap">
</noscript>
```

**Pesos de Fuente Aprobados:**

| Fuente | Pesos Permitidos | Uso |
|--------|------------------|-----|
| Poppins | 400, 600, 700, 900 | Headings, CTAs |
| Montserrat | 400, 500, 600 | Body text |

#### Scripts Externos

```html
<!-- ❌ INCORRECTO: Bloquea parsing -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- ✅ CORRECTO: No bloquea parsing -->
<script src="https://unpkg.com/lucide@latest" defer></script>
```

---

## 2. Title (`<title>`)

The title must be Front-Loaded and Branded.

### Especificaciones

| Aspecto | Requisito |
|---------|-----------|
| **Longitud** | 50-60 caracteres |
| **Estructura** | `[Primary Keyword] - [Benefit/Context] | MetodologIA` |
| **Keyword** | Al inicio (front-loaded) |
| **Marca** | Siempre al final |

### Ejemplos

| Calidad | Ejemplo |
|---------|---------|
| ❌ Malo | `Inicio | MetodologIA` |
| 🟡 Bueno | `Consultoría de Estrategia con IA | MetodologIA` |
| ✅ Excelente | `Estrategia Corporativa de IA: Consultoría y Formación | MetodologIA` |

---

## 3. Descripción (`<meta name="description">`)

La descripción vende el clic. No afecta el ranking directamente, pero sí el CTR.

### Especificaciones

| Aspecto | Requisito |
|---------|-----------|
| **Longitud** | 150-160 caracteres |
| **Inicio** | Verbo activo (Aprende, Descubre, Domina, Escale) |
| **Contenido** | Propuesta de valor única |
| **AEO** | Debe responder implícitamente "¿Qué es esto?" |

### Estructura Ideal

```
[Verbo de Acción] + [Propuesta de Valor Única]. [Características Clave] para [Público Objetivo].
```

### Ejemplos

| Calidad | Ejemplo |
|---------|---------|
| ❌ Malo | `Página de servicios para empresas.` |
| 🟡 Bueno | `Ofrecemos consultoría de IA para empresas que quieren crecer.` |
| ✅ Excelente | `Escale su empresa con IA. Consultoría estratégica y formación corporativa para directivos que buscan tracción y eficiencia operativa.` |

---

## 4. Datos Estructurados (JSON-LD)

El "Lenguaje de las Máquinas". Ayuda a los agentes de IA a entender el contenido inequívocamente.

### 4.1 Schemas Obligatorios

| Schema | Ubicación | Propósito |
|--------|-----------|-----------|
| **Organization** | `index.html`, Footer global | Identidad de marca |
| **WebSite** | `index.html` | Habilita SearchAction |
| **BreadcrumbList** | TODAS las páginas internas | Navegación estructurada |

### 4.2 AEO Specific Schemas

Para dominar AI answer engines (Perplexity, Google AI Overviews, SearchGPT):

| Schema | Cuándo Usar | Impacto AEO |
|--------|-------------|-------------|
| **FAQPage** | Secciones con preguntas frecuentes | 🔴 CRÍTICO |
| **HowTo** | Guías paso a paso | 🔴 CRÍTICO |
| **Service** | Páginas B2B (`empresas/`) | 🟠 ALTO |
| **Course** | Páginas B2C (`personas/`, bootcamps) | 🟠 ALTO |
| **Person** | Perfil del fundador | 🟡 MEDIO |

### 4.3 Organization Framework (Estándar)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MetodologIA",
  "alternateName": "Metodologia.info",
  "url": "https://metodologia.info",
  "logo": "https://metodologia.info/favicon.svg",
  "slogan": "Success as a Service",
  "description": "Consultora líder en la integración de metodologías de alto rendimiento e Inteligencia Artificial...",
  "founder": {
    "@type": "Person",
    "name": "Javier Montaño",
    "jobTitle": "Strategic Architect"
  },
  "sameAs": [
    "https://www.linkedin.com/company/metodologia-info",
    "https://www.instagram.com/metodologia.info"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contacto@metodologia.info",
    "availableLanguage": ["Es", "En"]
  }
}
</script>
```

### 4.4 FAQPage Framework (Crítico para AEO)

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
      "text": "MetodologIA es una consultora especializada en metodologías de alto rendimiento potenciadas con Inteligencia Artificial. Ofrecemos consultoría estratégica para empresas y formación profesional para individuos."
    }
  },{
    "@type": "Question",
    "name": "¿Qué servicios ofrece MetodologIA?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Ofrecemos tres líneas de servicio: (1) Consultoría estratégica B2B para empresas, (2) Formación y bootcamps B2C para profesionales, y (3) Recursos y herramientas de IA."
    }
  }]
}
</script>
```

---

## 5. Open Graph (Redes Sociales)

Para asegurar que los enlaces compartidos se vean profesionales.

### Especificaciones

| Tag | Valor | Notas |
|-----|-------|-------|
| `og:title` | Igual al `<title>` | - |
| `og:description` | Igual a `<meta name="description">` | - |
| `og:image` | URL absoluta PNG/JPG | 1200x630px, NO SVG |
| `og:type` | `website` o `article` | - |
| `og:url` | URL canónica de la página | - |

### Plantilla

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://metodologia.info/">
<meta property="og:title" content="MetodologIA | Success as a Service">
<meta property="og:description" content="Acelere su EstrategIA. Metodologías de alto rendimiento potenciadas con Inteligencia Artificial.">
<meta property="og:image" content="https://metodologia.info/recursos/og-image.png">

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://metodologia.info/">
<meta property="twitter:title" content="MetodologIA | Success as a Service">
<meta property="twitter:description" content="Acelere su EstrategIA. Metodologías de alto rendimiento potenciadas con Inteligencia Artificial.">
<meta property="twitter:image" content="https://metodologia.info/recursos/og-image.png">
```

> [!WARNING]
> `og:image` debe ser PNG o JPG, NO SVG. Dimensión recomendada: 1200x630px.

---

## 6. Canonical URLs

Cada página DEBE tener su canonical único.

### Reglas

| Página | Canonical Correcto |
|--------|-------------------|
| `/index.html` | `https://metodologia.info/` |
| `/empresas/index.html` | `https://metodologia.info/empresas/` |
| `/personas/index.html` | `https://metodologia.info/personas/` |
| `/recursos/item.html` | `https://metodologia.info/recursos/item.html` |

> [!CAUTION]
> **NUNCA** usar el mismo canonical para múltiples páginas. Esto confunde a los motores de búsqueda.

---

## 7. Checklist de Validación

Antes de publicar cualquier página, verificar:

### SEO Técnico
- [ ] Título presente y optimizado (50-60 chars)
- [ ] Descripción presente y optimizada (150-160 chars)
- [ ] Canonical URL específica de la página
- [ ] JSON-LD libre de errores de sintaxis
- [ ] Open Graph completo con imagen PNG

### Performance
- [ ] Preconnects para todos los recursos externos
- [ ] Fonts con `display=swap` y solo pesos necesarios
- [ ] Scripts externos con `defer` o `async`
- [ ] Sin console errors

### AEO
- [ ] Schema apropiado para tipo de contenido
- [ ] FAQPage si hay sección de preguntas
- [ ] Respuestas directas y concisas en el contenido

---

## 8. Herramientas de Validación

| Herramienta | URL | Uso |
|-------------|-----|-----|
| PageSpeed Insights | https://pagespeed.web.dev/ | Core Web Vitals |
| Rich Results Test | https://search.google.com/test/rich-results | JSON-LD |
| Meta Tags Preview | https://metatags.io/ | OG/Twitter |
| Schema Validator | https://validator.schema.org/ | JSON-LD sintaxis |
