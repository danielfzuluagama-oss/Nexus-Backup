# Documento Canónico: Gobierno Operativo MetodologIA

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Fecha:** 2026-02-14
- **Regla de Autoridad:** Este documento es la fuente de verdad contractual para la gobernanza del sistema. Los artefactos L0–L2 son gobernados por este documento

---

## 1. Propósito

Operacionalizar la gobernanza del sistema MetodologIA: definir quién decide qué, con qué cadencia, bajo qué reglas y con qué métricas. Cierra la brecha entre "artefactos creados" y "sistema gobernado" — transforma una colección de documentos en un sistema vivo con ownership, cadencias, change management y evolución controlada.

## 2. Alcance

- **Incluye:** Gobernanza de rituales, SOPs, skills, plantillas, glosario y el propio documento de gobierno. Cubre ownership, cadencias de revisión, change management, escalamiento, y deprecación
- **Excluye:** Gobernanza de herramientas/infraestructura IT; política de datos para IA (dependencia externa); operaciones de negocio fuera del sistema MetodologIA
- **Dependencias:** L0 Glosario v1.1.0, L0 Convenciones, todos los artefactos L1–L2

## 3. RACI

### 3.1 Por tipo de artefacto

| Actividad | Responsible | Accountable | Consulted | Informed |
| --------- | ----------- | ----------- | --------- | -------- |
| Crear nuevo ritual | Autor | Owner del ritual | Revisor/IA | Usuarios |
| Publicar ritual | Autor (SOP Publicar) | Dueño (HITL) | Orchestrator | Usuarios |
| Crear/mantener skill | Autor del skill | Owner del skill | Steward | Usuarios del skill |
| Sincronizar espejo | Owner de sync | Steward | Owner del skill | — |
| Actualizar glosario (L0) | Steward | Steward | Autores activos | Todos |
| Deprecar artefacto | Owner del artefacto | Steward | Revisor/IA | Usuarios afectados |
| Cambio mayor (breaking) | Owner + Steward | Steward | Todos los owners | Todos |
| Auditoría trimestral | Steward | Steward | Owners de artefactos | Todos |

**Regla:** Máximo 1 Accountable por actividad. Si no hay persona asignada: SUPUESTO + owner de validación.

### 3.2 Modelo HITL (4 roles de gobernanza)

| Rol HITL | Función | Cuándo actúa |
| -------- | ------- | ------------ |
| **Autor** | Redacción del artefacto | Durante creación/actualización |
| **Orchestrator** | Cumplimiento del flujo de publicación | En cada publicación |
| **Revisor/IA** | Excellence Loop + ENTRUSTED | Antes de aprobación |
| **Dueño** | Aprobación final + asunción de riesgo | Decisión APPROVED/REJECTED |

## 4. Flujo del proceso

```text
[Necesidad] → [Fase 1: Declaración] → [Gate 1: DoR] → [Fase 2: Producción] → [Gate 2: Calidad] → [Fase 3: Publicación] → [Gate 3: Aprobación] → [Artefacto publicado]
```

### Fase 1: Declaración

- **Objetivo:** Identificar la necesidad, definir alcance, asignar ownership
- **Input:** Necesidad operativa (nuevo ritual, SOP, skill, o actualización)
- **Output:** Propuesta con nombre, slug, criticidad, owner, tipo
- **SOPs asociados:** N/A (decisión del Steward o Owner)
- **Criticidad determina rigor:**
  - **Baja** (personal): Flujo simplificado, sin Adversarial+
  - **Media** (equipo): Flujo estándar, Excellence Loop simple
  - **Alta** (contractual/cliente): Flujo completo, Adversarial+ obligatorio, ENTRUSTED ≥9.0

### Fase 2: Producción

- **Objetivo:** Crear el artefacto según la plantilla L1 correspondiente
- **Input:** Propuesta aprobada + plantilla L1
- **Output:** Artefacto en estado Draft
- **SOPs asociados:** Depende del tipo — Meta-Ritual (L2) para rituales, Skill Blueprint (L2) para skills
- **Skills asociados:** Skill "declarar-un-ritual" (si aplica)

### Fase 3: Publicación

- **Objetivo:** Validar, aprobar y publicar el artefacto
- **Input:** Artefacto Draft + evidencia de gate
- **Output:** Artefacto publicado en repositorio central
- **SOPs asociados:** `L2_SOP_PUBLICAR_RITUAL.md`, `L2_SOP_SINCRONIZAR_ESPEJO.md`

## 5. Gates

| Gate | Criterios | Evidencia mínima | Aprobador |
| ---- | --------- | ---------------- | --------- |
| Gate 1: DoR | Nombre + slug + criticidad + owner + tipo definidos | Propuesta documentada | Steward |
| Gate 2: Calidad | Gold Checklist 12 ítems + Paquete Mínimo Publicable (5 componentes) | Checklist completada + Score ENTRUSTED | Revisor/IA |
| Gate 3: Aprobación | ENTRUSTED ≥ umbral según criticidad + Adversarial+ (si alta) | Decisión APPROVED con fecha y razón | Dueño |

### Umbrales ENTRUSTED por criticidad

| Criticidad | Umbral para Piloto→Validado | Umbral para Validado→Estándar | Bloqueo |
| ---------- | --------------------------- | ----------------------------- | ------- |
| Baja | > 8.0 | > 9.0 | < 7.0 |
| Media | > 8.5 | > 9.5 | < 8.0 |
| Alta | > 9.0 | 10/10 + Adversarial+ | < 8.0 |

## 6. Métricas

> Ver detalle completo en `L3_DASHBOARD_METRICAS.md`

| Métrica | Tipo | Frecuencia | Owner | Fuente |
| ------- | ---- | ---------- | ----- | ------ |
| KPI-01 Velocidad (ciclo ≤300s) | Leading | Por ejecución | Autor | Bitácora |
| KPI-02 Calidad (conformidad plantilla 100%) | Lagging | Mensual | Revisor/IA | Auditoría |
| KPI-03 Trazabilidad (RAG-First 100%) | Lagging | Trimestral | Steward | Auditoría de espejo |
| KPI-04 Adopción (Uso Real documentado) | Lagging | Mensual | Steward | Bitácora |
| Divergencias espejo (= 0) | Leading | Por sync | Owner de sync | Log de sync |
| Score ENTRUSTED promedio | Leading | Mensual | Revisor/IA | Registros de evaluación |

## 7. Riesgos

| Riesgo | Señal temprana | Mitigación | Owner |
| ------ | -------------- | ---------- | ----- |
| **Coleccionista Reactivo** (FOMO: acumular sin usar) | >3 artefactos en Draft sin avanzar a Piloto en 30 días | Sustracción Estratégica: eliminar antes de agregar | Steward |
| **Náufrago Digital** (herramientas obsoletas) | Skills no ejecutados en 90 días | Revisión Semestral: auditar y deprecar | Steward |
| **Ambigüedad Contractual** (anexos contradicen master) | Divergencias reportadas entre docs y anexos | Regla de Autoridad Documental | Dueño |
| **Alucinación Operativa** (procesos irreales) | Tasa de ejecución exitosa < 50% | Zero-Hallucination: rediseñar el proceso | Owner del artefacto |
| Espejo roto (skills desincronizados) | Divergencias > 0 post-publicación | SOP Sincronizar Espejo obligatorio | Owner de sync |
| Gobierno sin dientes (cadencias no se cumplen) | 2+ cadencias consecutivas sin ejecutar | Escalar a nivel superior + simplificar | Steward |

## 8. Gobierno y evolución

### Cadencias

| Cadencia | Actividad | Participantes | Duración máx | Output |
| -------- | --------- | ------------- | ------------ | ------ |
| **Semanal** | Revisión de artefactos en progreso | Autor + Orchestrator | 15 min | Status actualizado |
| **Mensual** | Revisión de métricas + feedback | Steward + Owners | 30 min | Dashboard actualizado + acciones |
| **Trimestral** | Auditoría de integridad + deprecación | Steward + todos los Owners | 60 min | Reporte de auditoría + deprecaciones |

### Change management

| Tipo de cambio | Quién aprueba | Proceso |
| -------------- | ------------- | ------- |
| **Patch** (fix/typo) | Owner del artefacto | Directo, changelog obligatorio |
| **Minor** (mejora compatible) | Owner + Revisor/IA | Excellence Loop + aprobación |
| **Major** (breaking change) | Steward + Dueño | Propuesta formal + impacto + período de gracia 30 días |
| **Deprecación** | Owner + Steward | Procedimiento de deprecación (Skill Blueprint v1 §5) |

### Escalamiento

```text
Nivel 1: Owner del artefacto resuelve
    ↓ (si no puede en 48h)
Nivel 2: Steward interviene
    ↓ (si hay conflicto entre Owners)
Nivel 3: Decisión del Dueño (HITL) con registro formal
```

### Hoja de ruta de madurez organizacional (Gatear-Caminar-Correr)

| Etapa | Descripción | Criterio de salida |
| ----- | ----------- | ------------------ |
| **Gatear** | Sistema montado, 1 piloto ejecutado | M6 completado (piloto E2E) |
| **Caminar** | Cadencias funcionando, 5+ rituales declarados | 3 meses de cadencias cumplidas |
| **Correr** | Autonomía operativa, Zero-Hallucination | 90 días sin fallos + auditoría limpia |

## 9. Artefactos gobernados

| Artefacto | Tipo | Versión | Estado | Ubicación |
| --------- | ---- | ------- | ------ | --------- |
| L0 Glosario | Fundamento | v1.1.0 | Estándar | `L0/L0_GLOSARIO.md` |
| L0 Convenciones | Fundamento | v1.0.0 | Estándar | `L0/L0_CONVENCIONES.md` |
| L1 Plantilla Ritual | Plantilla | v1.0.0 | Estándar | `L1/L1_PLANTILLA_RITUAL.md` |
| L1 Plantilla SOP | Plantilla | v1.0.0 | Estándar | `L1/L1_PLANTILLA_SOP.md` |
| L1 Plantilla Canónico | Plantilla | v1.0.0 | Estándar | `L1/L1_PLANTILLA_CANONICO.md` |
| L1 Skill Blueprint v0 | Plantilla | v0.1.0 | Hipótesis | `L1/L1_SKILL_BLUEPRINT_v0.md` |
| L2 Meta-Ritual v1.1 | Ritual (Meta) | v1.1.0 | Piloto | `L2/L2_META_RITUAL_DECLARAR_UN_RITUAL_v1.0.md` |
| L2 A-01 Paso a Paso | Anexo | v1.0.0 | Piloto | `L2/L2_A01_PASO_A_PASO.md` |
| L2 A-02 SIPOC | Anexo | v1.0.0 | Piloto | `L2/L2_A02_SIPOC.md` |
| L2 A-03 Gold Checklist | Anexo | v1.0.0 | Piloto | `L2/L2_A03_GOLD_CHECKLIST.md` |
| L2 SOP Publicar Ritual | SOP | v1.0.0 | Piloto | `L2/L2_SOP_PUBLICAR_RITUAL.md` |
| L2 SOP Sincronizar Espejo | SOP | v1.0.0 | Piloto | `L2/L2_SOP_SINCRONIZAR_ESPEJO.md` |
| L2 Skill Blueprint v1 | Blueprint | v1.0.0 | Piloto | `L2/L2_SKILL_BLUEPRINT_v1.md` |
| Decisiones Arquitectónicas | Meta | v1.0.0 | Estándar | `meta/DECISIONES_ARQUITECTONICAS.md` |
| Deprecación Log | Meta | v1.0.0 | Estándar | `meta/DEPRECACION_LOG.md` |

---

## Changelog

- v1.0.0 — Documento canónico de gobierno operativo. RACI por tipo de artefacto, modelo HITL de 4 roles, flujo de 3 fases con 3 gates, umbrales ENTRUSTED por criticidad, cadencias (semanal/mensual/trimestral), change management por tipo de cambio, escalamiento a 3 niveles, hoja de ruta Gatear-Caminar-Correr, índice de 15 artefactos gobernados
