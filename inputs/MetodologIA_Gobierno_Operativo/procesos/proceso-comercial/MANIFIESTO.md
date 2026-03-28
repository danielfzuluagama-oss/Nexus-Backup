# Manifiesto Canónico: Gobierno del Proceso Comercial

> **Versión:** 1.0 "Gold Master"
> **Fecha:** 2026-02-16
> **Estado:** PRODUCCIÓN

---

## 1. Principios de Diseño

1.  **Frictionless Sales:** Todos los documentos (`assets`) deben reducir la fricción operativa. Si un documento requiere demasiados pasos para ser llenado, está mal diseñado.
    *   *Implementación:* Uso de checkboxes para pagos, descuentos preconcebidos y firmas simplificadas.

2.  **Estructura Fractal y Homóloga:** B2B, B2C y GTM comparten la misma topología de carpetas para facilitar la navegación mental del equipo.

3.  **Separación de Intereses (Assets vs Meta):**
    *   **Meta:** Lo que "es" el proceso (definiciones, grafos, teoría).
    *   **Assets:** Lo que "hace" el proceso (contratos, órdenes, herramientas).
    *   **References:** De dónde viene el proceso (SOPs, caracterizaciones, inputs).

## 2. Mapa de Navegación

```text
proceso-comercial/
├── MANIFIESTO.md               <-- ESTE ARCHIVO (Mapa Maestro)
├── aliados/ [GTM]
│   ├── assets/                 <-- Contratos de Alianza, OdS Comisión
│   ├── meta/                   <-- Insights, Grafo, Readme
│   └── references/             <-- SOPs operativos
├── empresas/ [B2B]
│   ├── assets/                 <-- OdS Workshop/Consultoría/Diag
│   ├── meta/                   <-- Grafo, Readme
│   └── references/             <-- Caracterización B2B
└── personas/ [B2C]
    ├── assets/                 <-- Matrículas Bootcamp/Elite, Pagarés
    ├── meta/                   <-- Auditoría, Grafo, Readme
    └── references/             <-- SOPs Personas
```

## 3. Política de Actualización

1.  **Nuevos Servicios:** Se añaden primero al `portafolio-2026.md` (GTM Assets) y luego se crea su template específico en `assets/` del segmento correspondiente.
2.  **Cambios de Precios:** Se actualizan en la tabla "Liquidación" de los templates en `assets/`.
3.  **Nuevos Aliados:** Se gestionan mediante los contratos en `aliados/assets/`.

---

**Firmado Digitalmente:**
*Sistema de Gobierno MetodologIA*
