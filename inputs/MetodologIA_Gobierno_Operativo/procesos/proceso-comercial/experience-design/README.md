# Experience Design — Indice de Documentos

> **Carpeta**: `proceso-comercial/experience-design/`
> **Creada**: 2026-03-24
> **Proposito**: Centralizar todos los artefactos de diseno de experiencia del cliente

---

## Arquitectura Documental

```
experience-design/
│
├── README.md                              ← ESTE ARCHIVO (indice)
│
├── service-blueprint-general.md           ← Service Blueprint General v2.1
│   Arquitectura completa de entrega de servicio
│   6 capas x 6 fases, MOTs, fricciones, metricas
│
├── matriz-journeys-por-segmento.md        ← Matriz de Journeys v3.0 (indice de CJs)
│   Taxonomia de 7 sub-segmentos
│   Tabla cruzada segmentos x fases
│   Cross-references a nuevos documentos governance
│
├── customer-journey-general.md            ← CJ General (J0 — North Star) v3.0
│   Journey maestro aplicable a todos los segmentos
│   Curva emocional, ecosystem map, oportunidades
│
├── customer-journeys-b2c-personas.md      ← CJs B2C diferenciados v3.0
│   CJ-P1: Profesional en Transicion
│   CJ-P2: Estudiante Universitario
│   CJ-P3: Ejecutivo / C-Level
│   CJ-P4: Adulto Autodidacta
│   + Matriz Consolidada de Conversiones B2C
│   + Matriz de Cross-Sell B2C
│
├── customer-journeys-b2b-empresas.md      ← CJs B2B diferenciados v3.0
│   CJ-E1: Small Business (1-20 emp)
│   CJ-E2: Enterprise / Mid-Market (21-200 emp)
│   CJ-E3: Corporate (200+ emp)
│   + Matriz Consolidada Comparativa B2B
│   + Matriz de Escalación B2C→B2B
│
├── raci-matrix.md                         ← RACI Matrix v1.0 (Governance)
│   Responsabilidades por fase (F0-F5)
│   Roles: Coach, Sales, Content, Tech, Operations, Leadership, Client Success
│   Anti-patrones y escalación
│
├── decision-log.md                        ← Decision Log v1.0 (ADR Light)
│   Decisiones estratégicas, segmentación, entrega, tech, comercial, operacional
│   20+ decisiones registradas con contexto, alternativas, trade-offs
│
├── handoff-protocol.md                    ← Handoff Protocol v2.1
│   Procedimientos de transición F0→F1→F2→F3→F4→F5
│   Checklists por fase, quality gates, regresión protocols
│   Templates de comunicación cliente
│
├── assumptions-register.md                ← Assumptions Register v1.0
│   Supuestos operativos críticos validados/por validar
│   Matriz riesgos x urgencia
│
└── experience-design-dashboard.html       ← Dashboard v1.0 (Visualización)
    Visualización interactiva de Service Blueprint
    Timeline emocional, MOTs, segmentos, metrics
```

## Jerarquia de Documentos

```
Service Blueprint General v2.1 (SSOT)
       │
       ├── Matriz de Journeys v3.0 (indice navegable)
       │       │
       │       ├── CJ General J0 v3.0 (north star)
       │       │
       │       ├── CJs B2C v3.0 (P1, P2, P3, P4)
       │       │
       │       └── CJs B2B v3.0 (E1, E2, E3)
       │
       ├── RACI Matrix v1.0 ← Asignaciones responsabilidad
       │
       ├── Decision Log v1.0 ← Decisiones arquitectura
       │
       ├── Handoff Protocol v2.1 ← Transiciones entre fases
       │
       ├── Assumptions Register v1.0 ← Supuestos críticos
       │
       └── Experience Design Dashboard v1.0 ← Visualización
```

## Estado de Desarrollo

| Documento | Versión | Estado | Fecha | Owner |
|-----------|---------|--------|-------|-------|
| Service Blueprint General | v2.1 | Completo (10x expansion) | 2026-03-24 | Gobierno Operativo |
| Matriz de Journeys | v3.0 | Completo (especificación 2026) | 2026-03-24 | Content + Coach |
| CJ General (J0) | v3.0 | Completo (optimización) | 2026-03-24 | Diseño Experiencia |
| CJs B2C Personas | v3.0 | Completo (optimización) | 2026-03-24 | Content + Coach |
| CJs B2B Empresas | v3.0 | Completo (optimización) | 2026-03-24 | Sales + Coach |
| RACI Matrix | v1.0 | Completo (governance standard) | 2026-03-24 | Gobierno Operativo |
| Decision Log | v1.0 | Completo (20 decisiones ADR) | 2026-03-24 | Diseño Experiencia / Leadership |
| Handoff Protocol | v2.1 | Completo (alineado Blueprint) | 2026-03-24 | Operaciones |
| Assumptions Register | v1.0 | Completo (críticos validados) | 2026-03-24 | Diseño Experiencia |
| Experience Design Dashboard | v1.0 | Completo (visualización) | 2026-03-24 | Tech + Product |

## Cross-References Críticas

Los siguientes documentos hacen referencias entre sí y deben mantenerse sincronizados:

| Referencias | Archivos involucrados |
|-------------|----------------------|
| **Fases (F0-F5)** | Service Blueprint v2.1 ← SSOT. Referenciado en: matriz v3.0, CJs v3.0, RACI v1.0, handoff v2.1 |
| **Segmentación (P1-P4, E1-E3)** | Matriz v3.0 ← SSOT. Referenciado en: todas CJs v3.0, RACI v1.0, decision-log v1.0 |
| **MOTs (Momentos de Verdad)** | Service Blueprint v2.1 ← SSOT. Referenciado en: CJs v3.0, RACI v1.0, handoff v2.1 |
| **Decisiones arquitectura** | Decision Log v1.0. Impacta: todas versions de CJs, RACI, handoff |
| **Capacidad límites** | RACI v1.0 (max 10 clientes/coach, max 20/bootcamp). Referenciado en: handoff v2.1 |
| **Transiciones fases** | Handoff Protocol v2.1. Implementa: RACI v1.0, Service Blueprint v2.1 |

## Terminología Consistente

Validar uso consistente en TODOS los documentos:

**Fases**: F0 Awareness, F1 Diagnóstico, F2 Diseño, F3 Práctica, F4 Autonomía, F5 Advocacy
**Segmentos B2C**: P1 Profesional, P2 Estudiante, P3 Ejecutivo, P4 Autodidacta
**Segmentos B2B**: E1 Small Business, E2 Enterprise, E3 Corporate
**MOTs**: MOT-1 Relevancia, MOT-2 Claridad, MOT-3 Aha!, MOT-4 Soberanía, MOT-5 Sostenible, MOT-6 Escalable, MOT-7 Multiplicador, MOT-8 Embajador
**Modelo**: AARC (Activar-Aprender-Replicar-Comprometer)

## Capacidad y Límites

**Validar consistencia en todos documentos**:
- MAX 10 clientes/coach en F3 (1:1)
- MAX 20 personas/bootcamp (grupal)
- MAX 20 semanas F3 (B2B típico)

**Pricing ranges (revisar en CJs v3.0)**:
- P1: $200k-$800k COP
- P2: $0-$200k (becas)
- P3: $800k-$2.4M COP
- P4: $0-$800k COP
- E1: $200k-$800k COP
- E2: $2M-$8M COP (revisado)
- E3: $10M-$50M+ COP (revisado)

## Próximas Iteraciones

1. **Validación con datos reales** — Contrastar journeys vs. clientes activos (Q2 2026)
2. **Auto-diagnóstico digital** — Herramienta P2/P4 (Q3 2026)
3. **Renovación web** — Integrar dashboard y referencias v3.0 (Q2 2026)
4. **Entrenamiento equipo** — RACI matrix y handoff protocol (Q2 2026 ongoing)
5. **Auditoría cross-referencias** — Validar consistencia monthly

---

**Última actualización**: 2026-03-24 | **Owner**: Gobierno Operativo | **Próxima revisión**: 2026-06-24
