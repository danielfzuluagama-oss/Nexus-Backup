# Mapa de Procesos de MetodologIA — Vista Ejecutiva

**Versión:** 2.0.0
**Fecha:** 2026-03-25
**Sesión:** 59 archivos elevados a v2.0.0 + 4 módulos nuevos + 4 backcastings (64 FMs cerrados)
**Owner:** CEO / COO

---

## Arquitectura de Procesos

```
┌─────────────────── PROCESOS ESTRATÉGICOS ───────────────────┐
│                                                               │
│  Vigilancia Tecnológica    Planeación Estratégica*            │
│  y Metodológica            (*implícito, no documentado aún)   │
│                                                               │
└───────────────────────────────────────────────────────────────┘

┌─────────────────── PROCESOS MISIONALES ─────────────────────┐
│                                                               │
│  COMERCIAL          DELIVERY           ECOSISTEMA             │
│  ├ Pre-Sales        ├ Workshop         ├ Embajadores          │
│  ├ Vender B2B       ├ Bootcamp         ├ Comunidad/Contenido  │
│  ├ Vender B2C       ├ Programa Élite   └ Alumni/Advocacy      │
│  └ Aliados GTM      └ Consultoría                             │
│                                                               │
│  I+D / PRODUCTO     POST-DELIVERY                             │
│  ├ Diseño Metod.    └ Customer Success                        │
│  └ Certif/Calidad     (Health, Upsell, Advocacy)              │
│                                                               │
└───────────────────────────────────────────────────────────────┘

┌─────────────────── PROCESOS DE SOPORTE ─────────────────────┐
│                                                               │
│  Financiero/Tributario  │  Tecnológico/Seguridad  │  RRHH    │
│  Operaciones Comercial  │  Legal/Compliance       │  Onboard │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## Inventario por Directorio

| # | Proceso | Directorio | Tipo | Archivos | Versión |
|---|---------|-----------|------|----------|---------|
| 1 | Vender a Empresas B2B | `proceso-comercial/empresas/` | Misional | Pre-existente | v5.0 |
| 2 | Vender a Personas B2C | `proceso-comercial/personas/` | Misional | Pre-existente | v5.0 |
| 3 | Gestionar Aliados GTM | `proceso-comercial/aliados/` | Misional | Pre-existente | v5.0 |
| 4 | Entregar Workshop | `proceso-delivery-servicios/workshop/` | Misional | Pre-existente | v1.0 |
| 5 | Entregar Bootcamp | `proceso-delivery-servicios/bootcamp/` | Misional | Pre-existente | v1.0 |
| 6 | Entregar Programa Élite | `proceso-delivery-servicios/programa-elite/` | Misional | Pre-existente | v1.0 |
| 7 | Entregar Consultoría | `proceso-delivery-servicios/consultoria/` | Misional | Pre-existente | v1.0 |
| 8 | Gestionar Embajadores | `proceso-embajadores/` | Misional | Pre-existente | v1.0 |
| 9 | **Pre-Sales** | `proceso-presales/` | Misional | 11 | **v2.0** |
| 10 | **Operaciones Comerciales** | `proceso-operaciones-comerciales/` | Soporte | 8 | **v2.0** |
| 11 | **Onboarding Progresivo** | `proceso-onboarding-cliente/` | Misional | 13 | **v2.0** |
| 12 | **Gobierno Financiero** | `proceso-gobierno-financiero/` | Soporte | 17 | **v2.0** |
| 13 | **Gobierno Tecnológico** | `proceso-gobierno-tecnologico/` | Soporte | 10 | **v2.0** |
| 14 | **Gobierno Talento Humano** | `proceso-gobierno-talento-humano/` | Soporte | 7 | **v2.0** |
| 15 | **Diseño Metodológico / I+D** | `proceso-diseno-metodologico/` | Misional | 1 | **v2.0** |
| 16 | **Customer Success** | `proceso-customer-success/` | Misional | 1 | **v2.0** |
| 17 | **Comunidad y Contenido** | `proceso-comunidad-contenido/` | Misional | 1 | **v2.0** |
| 18 | **Certificación y Calidad** | `proceso-certificacion-calidad/` | Misional | 1 | **v2.0** |
| 19 | **Vigilancia Tecnológica** | `proceso-vigilancia-tecnologica/` | Estratégico | 1 | **v2.0** |
| 20 | **Legal & Compliance** (meta/) | `proceso-comercial/meta/` | Soporte | 15 | **v2.0** |

---

## Backcasting Completados

| Perspectiva | FMs | Cerrados | Directorio del backcasting |
|-------------|-----|----------|--------------------------|
| COO (comercial/legal/onboarding) | 20 FM | 20/20 | `proceso-comercial/meta/backcasting-coo-failure-modes.md` |
| CFO/Contador/Revisor Fiscal | 22 FMF | 22/22 | `proceso-gobierno-financiero/backcasting-cfo-contador-revisorfiscal.md` |
| CTO/CISO | 12 FMT | 12/12 | `proceso-gobierno-tecnologico/backcasting-cto-ciso.md` |
| RRHH | 10 FMRH | 10/10 | `proceso-gobierno-talento-humano/backcasting-rrhh.md` |
| **TOTAL** | **64** | **64 (100%)** | |

---

## Análisis AI-Native

Clasificación completa de todos los procesos en: `proceso-gobierno-tecnologico/meta/analisis-workflows-ai-native-ai-supported.md`

---

## Siguiente Nivel (Backlog)

| Módulo pendiente | Prioridad | Por qué aún no se creó |
|-----------------|-----------|----------------------|
| SOPs detallados de proceso-diseno-metodologico | Alta | Proceso maestro existe; SOPs internos dependen de primer piloto |
| SOPs detallados de proceso-customer-success | Alta | Requiere definir CSM role + herramienta de tracking |
| SOPs detallados de proceso-comunidad-contenido | Media | Requiere definir stack de contenido + community platform |
| SOPs detallados de proceso-certificacion-calidad | Media | Requiere primer ciclo de certificación de facilitadores |
| Proceso de Planeación Estratégica | Baja | Implícito en reuniones de socios; formalizar cuando la empresa crezca |

---

v1.0.0 — Mapa ejecutivo consolidando 19 procesos, 64 FMs, 4 backcasting / Javier Montaño + Claude
