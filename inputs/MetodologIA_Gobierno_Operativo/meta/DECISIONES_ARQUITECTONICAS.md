# Decisiones Arquitectónicas — MetodologIA Gobierno Operativo

- **Versión:** v1.0.0
- **Estado:** Aprobado
- **Fecha:** 2026-02-14
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)

---

## DA-01: Versión canónica del meta-ritual

- **Decisión:** Fusionar **v0.9.0** (contenido exhaustivo: 967 líneas, Juegos 0–10, 18 estándares, Adversarial+, debate socrático, handoff YAML) con **v1.4.1** (mejor arquitectura modular: doc principal compacto + 3 anexos separados + handoff.yaml externo).
- **Justificación:** v0.9 tiene el contenido más completo y maduro; v1.4 tiene la estructura más operable (modular = más fácil de mantener y de navegar). La fusión produce un v1.0 "best of both".
- **Resultado:** → `L2_META_RITUAL_DECLARAR_UN_RITUAL_v1.0.md` + anexos limpios.

## DA-02: Arquitectura del ritual — modular

- **Decisión:** **Modular** (documento principal + anexos separados + handoff.yaml externo).
- **Justificación:** Reduces la carga cognitiva, facilita actualizaciones parciales, y permite reutilizar anexos. La versión monolítica (v0.8, 967 líneas) es difícil de navegar.
- **Resultado:** Doc principal (≤5 páginas) + A-01 (paso a paso) + A-02 (SIPOC) + A-03 (Gold Checklist) + handoff.yaml.

## DA-03: Taxonomía de estados

- **Decisión:** **Hipótesis → Piloto → Validado → Estándar → Deprecado**
- **Justificación:** Es la taxonomía de v0.9 (la más granular y con criterios de transición explícitos). v1.4 usaba Draft/Piloto/Vigente/Estándar, que mezcla "Draft" con "Hipótesis" y "Vigente" con "Validado".
- **Regla:** Todo artefacto del sistema usa esta misma taxonomía.

## DA-04: Tipo documental de los "CREATE"

- **Decisión:** Reclasificar los documentos CREATE (v0.6, v0.7, v0.8.1) como **"Prompt Maestro / Generador"** — artefactos auxiliares, NO el ritual canónico.
- **Justificación:** Son spec-prompts para IA, no procedimientos operativos. Mezclarlos genera confusión de tipos.
- **Resultado:** Se archivan como referencia histórica; no se mantienen como fuente de verdad.

## DA-05: Gate de calidad canónico

- **Decisión:** Consolidar los 3 checklists existentes (8/8 de v0.8, 12-ítems de A-03, 16-ítems de v0.9 §5.B) en **UN Gold Checklist canónico de 12 ítems** (base: A-03, enriquecido con ítems clave de v0.9).
- **Justificación:** Un solo gate evita ambigüedad sobre cuál aplicar. 12 ítems es el balance entre rigor y practicidad.

## DA-06: Estructura de carpetas

```text
MetodologIA_Gobierno_Operativo/
├── meta/                          # Decisiones, deprecación, índice
│   ├── DECISIONES_ARQUITECTONICAS.md
│   ├── DEPRECACION_LOG.md
│   ├── INDICE_MAESTRO.md
│   └── README.md
├── L0/                            # Fundamentos
│   ├── L0_GLOSARIO.md
│   └── L0_CONVENCIONES.md
├── L1/                            # Plantillas base
│   ├── L1_PLANTILLA_RITUAL.md
│   ├── L1_PLANTILLA_SOP.md
│   ├── L1_PLANTILLA_CANONICO.md
│   └── L1_SKULL_v0.md
├── L2/                            # Artefactos fundacionales
│   ├── L2_META_RITUAL_DECLARAR_UN_RITUAL_v1.0.md
│   ├── L2_A01_PASO_A_PASO.md
│   ├── L2_A02_SIPOC.md
│   ├── L2_A03_GOLD_CHECKLIST.md
│   ├── L2_SOP_PUBLICAR_RITUAL.md
│   ├── L2_SOP_SINCRONIZAR_ESPEJO.md
│   ├── L2_SKULL_v1.md
│   └── handoff.yaml
├── L3/                            # Gobierno operativo
│   ├── L3_GOBIERNO_OPERATIVO.md
│   └── L3_DASHBOARD_METRICAS.md
├── L4/                            # Consolidación
│   └── L4_CONSOLIDACION.md
└── piloto/                        # Ejecución piloto
    ├── PILOTO_BITACORA.md
    └── PILOTO_AAR.md
```

## DA-07: Versionado

- **Decisión:** Semantic Versioning (SemVer) — `MAJOR.MINOR.PATCH`
- **MAJOR:** Cambios que rompen compatibilidad o reestructuran secciones fundamentales
- **MINOR:** Nuevo contenido, secciones o reglas que no rompen lo existente
- **PATCH:** Correcciones, clarificaciones, typos
- **Regla:** Todo cambio requiere entrada en changelog del artefacto afectado

---

## Changelog

- v1.0.0 — Decisiones arquitectónicas iniciales (DA-01 a DA-07)
