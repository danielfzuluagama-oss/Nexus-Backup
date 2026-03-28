# Ritual: Revisar Artefacto para Publicación

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Revisor/IA)
- **Slug:** `revisar-artefacto`
- **Criticidad:** Media
- **Audiencia:** Revisor/IA (primary), Autor del artefacto (secondary)
- **Fecha:** 2026-02-14

---

## Juego 0 — Intención

**Problema que resuelve:** Antes de publicar cualquier artefacto (ritual, SOP, skill), necesita pasar una revisión estructurada que garantice calidad, completitud y alineación con el sistema. Sin este ritual, la revisión es ad-hoc y el quality gate pierde consistencia.

**Qué ES:** Un ritual para revisar artefactos antes de publicación. Produce una decisión documentada (APPROVED/REJECTED) con evidencia.

**Qué NO ES:** No es el SOP de publicación (eso viene DESPUÉS de la aprobación). No es la creación del artefacto (eso lo hace el Autor). No es auditoría trimestral (eso es L3).

## Juego 1 — Audiencia

| Aspecto | Detalle |
| ------- | ------- |
| Ejecutor primario | Revisor/IA |
| Ejecutor secundario | Owner del artefacto (para resolución de hallazgos) |
| Informado | Autor, Steward |
| Entorno | Repo MetodologIA, carpetas L0–L3 |

## Juego 2 — Condiciones

### DoR (Definition of Ready)

- [ ] Artefacto en estado Draft con changelog actualizado
- [ ] Gold Checklist disponible (L2_A03)
- [ ] Paquete Mínimo Publicable como referencia
- [ ] Acceso al Glosario (L0) y Convenciones (L0) para verificación terminológica

### DoD (Definition of Done)

- [ ] Gold Checklist ejecutada con resultado documentado (≥10/12)
- [ ] Score ENTRUSTED registrado con puntuación por dimensión
- [ ] Lista de hallazgos documentada (0 = limpio, N = con detalle)
- [ ] Decisión emitida: APPROVED / REJECTED / APPROVED CON CONDICIONES
- [ ] Evidencia adjunta (checklist completada + score)

## Juego 3 — Secuencia

### Paso 1: Verificar Paquete Mínimo Publicable

- **Acción:** Confirmar que los 5 componentes del PMP están presentes en el artefacto
- **Output:** Checklist PMP: 5/5, 4/5, etc.
- **Regla:** Si < 4/5 → REJECTED inmediato. Si 4/5 → APPROVED CON CONDICIONES

### Paso 2: Ejecutar Gold Checklist

- **Acción:** Recorrer los 12 ítems de L2_A03_GOLD_CHECKLIST contra el artefacto
- **Output:** Score X/12 con ítems fallidos detallados
- **Regla:** Si < 10/12 → REJECTED. Si 10–11/12 → aprobable con plan de mejora

### Paso 3: Scoring ENTRUSTED

- **Acción:** Evaluar el artefacto contra las dimensiones ENTRUSTED. Registrar score por dimensión
- **Output:** Score agregado + desglose
- **Umbrales:**
  - Criticidad baja: ≥ 8.0 para aprobar
  - Criticidad media: ≥ 8.5 para aprobar
  - Criticidad alta: ≥ 9.0 para aprobar

### Paso 4: Documentar hallazgos

- **Acción:** Listar todos los issues encontrados con: descripción, severidad (baja/media/alta), sugerencia de fix
- **Output:** Tabla de hallazgos
- **Regla:** 0 hallazgos severidad alta para APPROVED

### Paso 5: Emitir decisión

- **Acción:** Basado en PMP + Gold Checklist + ENTRUSTED + hallazgos, decidir:
  - **APPROVED** — publicar, proceder con SOP Publicar Ritual
  - **APPROVED CON CONDICIONES** — publicar tras resolver hallazgos específicos (máx 48h)
  - **REJECTED** — devolver al Autor con hallazgos y plan de mejora
- **Output:** Decisión documentada con fecha, revisor, razón
- **Evidencia:** Registro en bitácora

## Juego 4 — Gate de calidad

**Gold Checklist resultado del piloto:**

| # | Check | Pasa |
| --- | ----- | ---- |
| 1 | Nombre + slug definidos | ✅ |
| 2 | Problema claro (qué resuelve) | ✅ |
| 3 | Audiencia identificada | ✅ |
| 4 | DoR/DoD verificables | ✅ |
| 5 | Pasos numerados y accionables | ✅ |
| 6 | Cada paso tiene output + evidencia | ✅ |
| 7 | Excepciones documentadas | ✅ |
| 8 | Riesgos identificados | ✅ |
| 9 | Terminología alineada a L0 | ✅ |
| 10 | Changelog | ✅ |
| 11 | GenAI/IA: nivel de incertidumbre definido | ✅ |
| 12 | Ejemplo de output incluido | ❌ (pendiente) |

**Resultado:** 11/12 — Apto para Piloto

## Juego 8 — GenAI

- **Acelerador:** IA asiste en Gold Checklist y ENTRUSTED scoring
- **Nivel de incertidumbre:** 2 (badges: Hecho/Inferencia/Especulación en hallazgos)
- **Void Pattern:** Si falta información en el artefacto revisado → señalar explícitamente el hueco
- **Paradox UI:** Si hay contradicción interna en el artefacto → marcar con vista "Versus"

## Juego 9 — Sostenibilidad

| Riesgo | Probabilidad | Impacto | Mitigación |
| ------ | ------------ | ------- | ---------- |
| Rubber-stamping (revisión superficial) | Media | Alto | Gold Checklist forzada + ENTRUSTED con score mínimo |
| Revisor sin contexto suficiente | Baja | Medio | DoR incluye acceso a Glosario y Convenciones |
| Decisión disputada | Baja | Medio | Escalamiento a Steward (L3 §8) |

## Juego 10 — Excelencia

- **Score ENTRUSTED estimado:** 8.5
- **Estado:** Piloto (necesita 5 ejecuciones para Validado)
- **Mejoras identificadas:**
  1. Agregar ejemplo de output de revisión (template de hallazgos)
  2. Expandir excepciones con más casos borde
  3. Reducir tiempo de ejecución (objetivo: ≤10 min por artefacto)

---

## Excepciones

| Situación | Acción | Escala a |
| --------- | ------ | -------- |
| Artefacto carece de 2+ componentes PMP | REJECTED inmediato, sin Gold Checklist | Autor |
| Revisor tiene conflicto de interés (es también Autor) | Asignar segundo revisor o Steward | Steward |
| Artefacto es de criticidad alta pero Revisor/IA no tiene experiencia | Solicitar revisión adicional humana | Dueño |

---

## Changelog

- v1.0.0 — Ritual inicial declarado durante piloto E2E del sistema de gobierno operativo
