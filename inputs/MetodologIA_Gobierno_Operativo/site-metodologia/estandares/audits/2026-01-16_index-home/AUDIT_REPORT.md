# 📊 Informe de Auditoría PageSpeed Insights
## Página: `index.html` (Home/Gateway)

> **Fecha de Captura:** 16 de enero de 2026, 8:27 a.m. GMT-5  
> **Herramienta:** Google PageSpeed Insights (Lighthouse 13.0.1)  
> **Dispositivo:** Moto G Power emulado  
> **Red:** 4G lenta  
> **Navegador:** HeadlessChromium 137.0.7151.119

---

## 1. Resumen de Puntuaciones

| Categoría | Puntuación | Estado |
|-----------|------------|--------|
| **Rendimiento** | 81 | 🟠 Necesita Mejora |
| **Accesibilidad** | 100 | 🟢 Excelente |
| **Recomendaciones** | 100 | 🟢 Excelente |
| **SEO** | 92 | 🟢 Bueno |

---

## 2. Core Web Vitals (Métricas)

### 2.1 Métricas de Carga

| Métrica | Valor | Umbral Bueno | Estado |
|---------|-------|--------------|--------|
| **First Contentful Paint (FCP)** | 3.7s | < 1.8s | 🔴 Pobre |
| **Largest Contentful Paint (LCP)** | 3.7s | < 2.5s | 🟠 Necesita Mejora |
| **Speed Index** | 3.7s | < 3.4s | 🟠 Necesita Mejora |

### 2.2 Métricas de Interactividad y Estabilidad

| Métrica | Valor | Umbral Bueno | Estado |
|---------|-------|--------------|--------|
| **Total Blocking Time (TBT)** | 0 ms | < 200ms | 🟢 Excelente |
| **Cumulative Layout Shift (CLS)** | 0.008 | < 0.1 | 🟢 Excelente |

---

## 3. Estadísticas del Diagnóstico

### 3.1 Problemas Críticos (Triángulo Rojo 🔺)

| Problema | Impacto Estimado |
|----------|------------------|
| **Solicitudes de bloqueo de renderización** | Ahorro de **2,930 ms** |
| **Árbol de dependencias de red** | Ver desglose |

### 3.2 Oportunidades de Mejora (Cuadrado Naranja 🟧)

| Oportunidad | Ahorro Estimado |
|-------------|-----------------|
| **Reduce el código JavaScript sin usar** | **38 KiB** |

### 3.3 Diagnósticos Adicionales

| Diagnóstico | Detalle |
|-------------|---------|
| **Evita tareas largas en el subproceso principal** | 3 tareas largas detectadas |
| Causantes del cambio de diseño | Sin problemas |
| Desglose de LCP | Ver análisis detallado |
| Terceros | Sin impacto significativo |

---

## 4. Problemas de SEO

### 4.1 Problemas Detectados

| Problema | Severidad |
|----------|-----------|
| **El documento no tiene un vínculo `rel=canonical` válido** | 🔺 Importante |

**Detalle:** El canonical apunta a la URL raíz del dominio (`https://metodologia.info/`) en lugar de a una página de contenido equivalente.

> **Nota:** Para el index.html, el canonical DEBE apuntar a `https://metodologia.info/` (sin index.html). Esto parece ser un falso positivo de Lighthouse, ya que el canonical ES correcto para la home.

### 4.2 No Aplicable (2 items)

Estos checks no aplican a esta página específica.

---

## 5. Capturas de Evidencia

Las siguientes capturas fueron almacenadas como backup:

- `psi_01_resumen.png` - Puntuaciones generales
- `psi_02_metricas.png` - Core Web Vitals detallados
- `psi_03_estadisticas.png` - Estadísticas y diagnósticos
- `psi_04_seo.png` - Análisis SEO

---

## 6. Datos Técnicos de Sesión

| Campo | Valor |
|-------|-------|
| Tipo de prueba | Carga inicial de la página |
| Sesión | Una sola página |
| Dispositivo emulado | Moto G Power |
| Limitación de red | 4G lenta |
| Motor de renderizado | HeadlessChromium 137.0.7151.119 with Ir |
| Versión Lighthouse | 13.0.1 |

---

> **Próximo paso:** Ver `ADVERSARIAL_ANALYSIS.md` para el análisis crítico de oportunidades de mejora.
