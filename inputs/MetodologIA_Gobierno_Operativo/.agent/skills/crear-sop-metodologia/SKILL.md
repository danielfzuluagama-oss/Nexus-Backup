---
name: crear-sop-metodologia
description: Versión auto-contenida para la creación de SOPs en MetodologIA. Sovereign v4.0 con naming canónico sop-XX-slug y jerarquía segmento→journey→proceso→sop→ritual.
metadata:
  version: v3.0.0
  status: Sovereign v4.0
  owner: Javier Montaño
  steward: Javier Montaño
  ritual_padre: publicar-ritual
---

# 067-crear-sop-metodologia v3.0.0 (Sovereign v4.0)

## 0. Scaffolding (Sovereign v4.0)

> **Standard**: This skill adheres to the **MetodologIA Sovereign v4.0 Standard**.
>
> * **Template**: `templates/TEMPLATE_RITUAL_RUNBOOK.md` (para rituales hijos)
> * **Governance**: `references/best-practices.md`

## 1. Goal

Crear SOPs que sirven como **puente estructural** entre Procesos (L1) y Rituales (L3) dentro de la jerarquía canónica `segmento → journey → proceso → sop → ritual`.

## 2. Naming Canónico (v4.0)

### Carpeta del SOP

```
rituales/<segmento>/<journey>/<proceso>/sop-XX-<sop-slug>/
```

### Archivo del SOP

```
sop-XX-<sop-slug>.md
```

### Rituales hijos

```
sop-XX-<sop-slug>/XX-<ritual-slug>.md
```

### Reglas

- `XX` = ID canónico 01–18 del primer ritual que contiene
- Todo en **kebab-case**
- Consistencia 1:1 entre nombre de carpeta `sop-XX-*` y rituales `XX-*.md` contenidos
- Un SOP agrupa rituales de IDs contiguos (ej. sop-01 contiene 01 y 02)

## 3. Protocolo de Ejecución

### 3.1 Fase de Extracción (Observe)

- **EXTRACT:** Mapear la Secuencia del proceso padre a Pasos del SOP.
- **RITUAL MAPPING:** Identificar qué IDs canónicos (01–18) pertenecen a este SOP.
- **DOR CHECK:** Verificar que los pre-requisitos existan en el repo.
- **HIERARCHY CHECK:** Confirmar la ruta `segmento/journey/proceso/sop-XX/` es válida.

### 3.2 Fase de Estructuración (Act)

- **SCAFFOLD:** Aplicar la estructura obligatoria (Sección 4).
- **RITUAL REFS:** Listar todos los rituales hijos con sus IDs y paths correctos.
- **ACCELERATE:** Identificar e inyectar prompts pre-definidos por cada fase.

### 3.3 Fase de Verificación (Verify)

- **AUDIT:** Verificar cumplimiento de naming, jerarquía y SLAs.
- **PATH CHECK:** Confirmar que cada ritual referenciado existe en la ruta declarada.

## 4. Plantilla Obligatoria

El output final debe contener EXACTAMENTE estas secciones:

- **Propósito:** 1–2 frases del problema que resuelve.
- **Alcance:** Qué situaciones/roles aplica y qué excluye.
- **Jerarquía:** Segmento, Journey y Proceso padre. Rituales hijos (IDs y paths).
- **Roles:** Tabla RACI (Ejecutor, Aprobador, Informado).
- **DoR (Definition of Ready):** Checklists de pre-requisitos.
- **Pasos:** Detalle de Acción, Herramienta, Output y Evidencia por paso.
- **DoD (Definition of Done):** Evidencia verificable y actualización de bitácora.
- **SLAs:** Tiempos y tasas de éxito esperadas.
- **Rituales Gobernados:** Tabla con ID, Slug, Path, Estado.

## 5. Guardrails Innegociables

- **No Ambiguity:** Cada paso DEBE tener una Herramienta y una Evidencia explícita.
- **Atomic Steps:** Pasos complejos deben delegarse a un Ritual (nivel L3).
- **Hierarchy Gate:** Un SOP es el puente entre Procesos y Rituales Atómicos.
- **Naming Gate:** `sop-XX-slug` y rituales `XX-slug.md` deben ser consistentes.
- **Void Pattern:** Si falta evidencia, marcar como "PENDIENTE", prohibido inventar.

## 6. Checklist de Calidad (10/10)

- [ ] Nombre y Slug en kebab-case con ID canónico.
- [ ] Jerarquía padre (segmento/journey/proceso) documentada.
- [ ] Roles definidos con Accountability única.
- [ ] DoR/DoD verificables.
- [ ] Pasos numerados con evidencia por paso.
- [ ] SLA de tiempo definido.
- [ ] Excepciones contempladas.
- [ ] Riesgos y mitigación explícitos.
- [ ] Tabla de rituales gobernados con IDs y paths.
- [ ] Changelog inicial v1.0.0.

## 7. Changelog

- v3.0.0 — **Sovereign v4.0 Upgrade**: Naming canónico `sop-XX-slug`, jerarquía `segmento→journey→proceso→sop→ritual`, tabla de rituales gobernados, path checks.
- v2.1.0 — Upgrade Moat Edition.
- v2.0.0 — Versión auto-contenida con plantilla L1_SOP y calidad 8/8 integrados.
- v1.0.0 — Versión inicial con dependencias externas.

---
Powered by MetodologIA Governance Protocol

<!--
  @license Copyleft
  @copyright MetodologIA
  @author Javier Montaño
  @steward Javier Montaño
  @technology Antigravity | GoogleAI Studio | Gemini 3 Pro | Gemini 3 Flash
  @poweredBy Pristino Agent
-->
