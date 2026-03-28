# Plan de Mejora Consolidado - MetodologIA Site

> **Fecha**: 2026-01-27  
> **Auditor**: Gemini + Performance Engineering  
> **Archivos auditados**: 6 principales + 12 reportes existentes revisados

---

## Resumen Ejecutivo

Auditoría sistemática identificó patrones recurrentes que afectan Performance, UX y Mantenibilidad. La mayoría de issues son corregibles con cambios sistémicos en lugar de archivo por archivo.

---

## Patrones Sistémicos Detectados

### 🔴 P0: Críticos (Corregir inmediatamente)

| ID | Issue | Archivos Afectados | Impacto |
|----|-------|-------------------|---------|
| P0-1 | **Tailwind CDN en producción** | TODOS (~20 HTML) | LCP +500-800ms |
| P0-2 | **icons.js sin defer** | TODOS | FID +100ms |
| P0-3 | **CSS syntax error** | `empresas/index.html` L59 | CSS roto |
| P0-4 | **Link roto cotizador** | `empresas/index.html` L228 | 404 error |

### 🟠 P1: Altos (Corregir esta semana)

| ID | Issue | Archivos Afectados | Impacto |
|----|-------|-------------------|---------|
| P1-1 | **Jerga B2B/B2C visible** | index, empresas/, personas/ | UX confusa |
| P1-2 | **Mezcla inglés/español** | TODOS | Brand Voice v2.0 |
| P1-3 | **ARIA faltante en modals** | vision, sitemap | A11y WCAG |
| P1-4 | **Search input sin label** | sitemap | A11y WCAG |

### 🟡 P2: Medios (Sprint siguiente)

| ID | Issue | Archivos Afectados | Impacto |
|----|-------|-------------------|---------|
| P2-1 | Precios solo COP | empresas/, ruta/ | UX internacional |
| P2-2 | Falta og:image | 50% archivos | SEO social |
| P2-3 | Inline styles | varios | Mantenibilidad |
| P2-4 | Preconnect fonts faltante | algunos | LCP menor |

---

## Plan de Acción por Prioridad

### Quick Wins (< 30 min cada uno)

```bash
# 1. Agregar defer a icons.js en TODOS los HTML
sed -i '' 's|src="js/icons.js"|src="js/icons.js" defer|g' *.html */index.html

# 2. Corregir empresas/index.html - agregar <style> faltante
# Línea 58: Agregar <style> antes de .container-max

# 3. Corregir link cotizador
# Línea 228: ../ruta/cotizador.html → ../ruta/cotizador-empresas.html

# 4. Duplicado ebooks en sitemap.html
# Líneas 284-290: Eliminar bloque duplicado
```

### Mejoras Medias (1-2 horas)

1. **Build Tailwind Production**
   - Instalar Tailwind CLI
   - Generar CSS compilado
   - Reemplazar CDN script por link a CSS minificado
   - Impacto: -700ms LCP

2. **Traducción B2B/B2C**
   - Buscar: "B2B", "B2C", "Organizations"
   - Reemplazar por: "Empresas", "Personas", "Organizaciones"
   - Archivos: ~15 HTML

3. **ARIA para Modals**
   - Agregar: `role="dialog" aria-modal="true"`
   - Archivos: vision.html, sitemap.html

### Refactors Estratégicos (Multi-sesión)

1. **Extraer inline JS a archivos**
   - ruta/index.html tiene ~200 líneas de script
   - Mover a `js/cotizador.js`

2. **Consolidar CSS variables**
   - Auditar `variables.css`
   - Mover todos los hardcoded colors

3. **Component Library**
   - Extraer patrones repetidos (card-glass, badges)
   - Documentar en design system

---

## Métricas Target (Core Web Vitals)

| Métrica | Actual Estimado | Target | Gap |
|---------|-----------------|--------|-----|
| LCP | ~2.8s | <2.5s | -0.3s |
| FID | ~130ms | <100ms | -30ms |
| CLS | <0.1 | <0.1 | ✓ |

---

## Checklist de Implementación

### Fase 1: Quick Wins (Hoy) ✅ COMPLETADO
- [x] Corregir `<style>` en empresas/index.html
- [x] Corregir link cotizador
- [x] Agregar defer a icons.js (10 archivos)
- [x] Eliminar duplicado ebooks en sitemap
- [x] Traducir jerga B2B → Empresas

### Fase 2: Performance (Esta semana)
- [ ] Build Tailwind CSS local
- [ ] Reemplazar CDN en todos los archivos
- [ ] Agregar preconnect fonts donde falte

### Fase 3: UX/A11y (Sprint siguiente)
- [ ] Traducción B2B/B2C completa
- [ ] ARIA en modals
- [ ] Toggle moneda COP/USD

### Fase 4: Optimización (Continuo)
- [ ] Extraer JS inline
- [ ] Consolidar CSS
- [ ] Documentar Design System

---

## Archivos Auditados con Reportes Actualizados

| Archivo | Reporte | Status |
|---------|---------|--------|
| index.html | reporte_index.txt | ✅ Actualizado |
| vision.html | reporte_vision.txt | ✅ Actualizado |
| sitemap.html | reporte_sitemap.txt | ✅ Nuevo |
| empresas/index.html | reporte_empresas_index.txt | ✅ Actualizado |
| empresas/bootcamp.html | reporte_bootcamp.txt | Revisado |
| ruta/index.html | reporte_ruta.txt | Revisado |

---

## Próximos Pasos Recomendados

1. **Aprobar este plan**
2. **Ejecutar Quick Wins** (30 min)
3. **Build Tailwind** (1 hora)
4. **Verificar PageSpeed** post-cambios
