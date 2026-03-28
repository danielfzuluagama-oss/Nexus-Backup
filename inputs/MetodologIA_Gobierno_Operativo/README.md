# MetodologIA — Gobierno Operativo

Sistema de gobernanza operativa para rituales, SOPs, skills y procesos AI-native.

---

## Qué es esto

Un framework de 5 capas (L0–L4) que convierte procesos informales en artefactos versionados, gobernados y activables por IA. Incluye plantillas, SOPs, métricas, y un piloto ejecutado end-to-end.

## Cómo empezar

1. **Lee el Glosario** → `L0/L0_GLOSARIO.md` (41 términos canónicos)
2. **Entiende las convenciones** → `L0/L0_CONVENCIONES.md` (naming, versionado, evidencia)
3. **Declara tu primer ritual** → usa `L1/L1_PLANTILLA_RITUAL.md` y sigue el meta-ritual en `L2/`
4. **Publica** → ejecuta `L2/L2_SOP_PUBLICAR_RITUAL.md`
5. **Crea el skill** → sigue `L2/L2_SKILL_BLUEPRINT_v1.md`

## Estructura del repo

```
MetodologIA_Gobierno_Operativo/
├── L0/          Fundamentos (glosario + convenciones)
├── L1/          Plantillas reutilizables
├── L2/          Operaciones (meta-ritual, SOPs, skills)
├── L3/          Gobierno (RACI, cadencias, métricas)
├── L4/          Consolidación post-piloto
├── meta/        Decisiones arquitectónicas + deprecaciones
├── piloto/      Ejecución E2E + AAR
├── README.md    ← Estás aquí
└── INDICE_MAESTRO.md  Tabla completa de artefactos
```

## Artefactos clave

| Capa | Qué contiene | Para qué sirve |
| ---- | ------------ | --------------- |
| **L0** | Glosario (41 términos) + Convenciones | Lenguaje común + reglas de naming |
| **L1** | 4 plantillas (Ritual, SOP, Canónico, Skill Blueprint v0) | Scaffolding para nuevos artefactos |
| **L2** | Meta-ritual v1.1 + 3 anexos + 2 SOPs + Skill Blueprint v1 | Ejecutar: declarar, publicar, sincronizar |
| **L3** | Gobierno operativo + Dashboard métricas | Quién decide qué, con qué métricas |
| **L4** | Consolidación post-piloto | Hallazgos, deprecaciones, siguiente ciclo |

## Conceptos fundamentales

- **Ritual** — Proceso formalizado verificable con DoR/DoD
- **SOP** — Procedimiento paso a paso con evidencia
- **Skill** — Carpeta con `SKILL.md` que hace un ritual activable por IA
- **HITL** — 4 roles: Autor, Orchestrator, Revisor/IA, Dueño
- **ENTRUSTED** — Rúbrica de 15 dimensiones para scoring de calidad
- **Espejo** — `references/` del skill = copia exacta del repo de rituales

## Estado actual

- **Fase:** CREATE completado → siguiente ciclo: EVOLVE
- **Madurez:** Gatear (sistema montado, 1 piloto ejecutado)
- **Artefactos:** 22 (7 Estándar, 12 Piloto, 1 Deprecado, 2 Registro)

---

*Índice completo → [INDICE_MAESTRO.md](INDICE_MAESTRO.md)*
