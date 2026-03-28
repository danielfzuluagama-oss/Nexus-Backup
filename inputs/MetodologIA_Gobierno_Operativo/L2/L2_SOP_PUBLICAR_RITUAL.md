# SOP: Publicar un Ritual

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Slug:** `publicar-ritual`
- **Ritual padre:** Meta-Ritual "Declarar un Ritual" v1.1.0
- **Fecha:** 2026-02-14

---

## Propósito

Estandarizar la publicación de un ritual declarado: desde el archivo `.md` canónico hasta la versión `.html` alineada, pasando por los quality gates y el registro en bitácora. Cierra la brecha entre "ritual terminado" y "ritual publicado y accesible".

## Alcance

- **Aplica a:** Todo ritual que haya pasado el Gate de calidad (Juego 4) y cuyo Paquete Mínimo Publicable esté completo
- **NO aplica a:** Publicación de SOPs o skills de forma aislada (tienen sus propios flujos); publicación de versiones divulgables (Juego 7 del meta-ritual)

## Roles

| Rol | Persona/Equipo | Responsabilidad |
| --- | -------------- | --------------- |

| Autor | Quien declaró el ritual | Ejecuta los pasos de publicación |
| Revisor/IA | Revisor de calidad | Valida gate y Paquete Mínimo Publicable |
| Dueño | Owner del ritual | Aprueba publicación (APPROVED/REJECTED) |
| Informado | Usuarios del ritual | Reciben notificación de nueva versión |

## DoR (Definition of Ready)

Antes de iniciar, verifica:

- [ ] Ritual `.md` versionado y con changelog actualizado
- [ ] Gate de calidad (Juego 4) aprobado con evidencia
- [ ] Paquete Mínimo Publicable completo (5 componentes)
  - [ ] Encabezado de Autoridad (metadata completa)
  - [ ] Ficha Rápida 60s
  - [ ] Definición sin Confusiones
  - [ ] Criterios de Éxito / DoD
  - [ ] Casos Borde documentados
- [ ] Al menos 1 acelerador GenAI integrado al workflow
- [ ] Skill asociado creado con references espejo

**Regla:** Si falta algún ítem, NO publiques. Escala al Owner.

## Pasos

### Paso 1: Validar Paquete Mínimo Publicable

- **Acción:** Recorrer los 5 componentes del Paquete Mínimo Publicable contra el `.md` canónico. Verificar que el Encabezado de Autoridad tiene todos los campos (nombre, versión, estado, owner, criticidad, fecha)
- **Herramienta:** Checklist manual o script de validación
- **Output:** Checklist de Paquete Mínimo completada (5/5)
- **Evidencia:** Checklist firmada en bitácora

### Paso 2: Generar versión HTML

- **Acción:** Convertir el `.md` canónico a `.html` manteniendo estructura, semántica y estilos del sistema de diseño. Validar que secciones, tablas y checklists se rendericen correctamente
- **Herramienta:** Conversor Markdown→HTML (pandoc, script custom, o equivalente)
- **Output:** Archivo `.html` alineado al `.md`
- **Evidencia:** Path del archivo `.html` generado

### Paso 3: Verificar alineación .md ↔ .html

- **Acción:** Comparar secciones del `.md` con el `.html` generado. Verificar: (1) misma cantidad de secciones, (2) contenido idéntico, (3) tablas y checklists intactos, (4) links funcionales
- **Herramienta:** Diff visual o script automatizado
- **Output:** Reporte de alineación (divergencias = 0)
- **Evidencia:** Log del diff (limpio o con correcciones aplicadas)

### Paso 4: Ejecutar Excellence Loop (ENTRUSTED)

- **Acción:** Evaluar el ritual contra las dimensiones ENTRUSTED. Si Score < 8.0 → bloquear y escalar a Dueño. Si Score 9.0–9.9 → refinamiento automático. Si Score > 9.0 → apto para transición
- **Herramienta:** Rúbrica ENTRUSTED (15 dimensiones)
- **Output:** Score ENTRUSTED documentado
- **Evidencia:** Puntuación por dimensión en bitácora

### Paso 5: Solicitar aprobación del Dueño

- **Acción:** Presentar al Dueño: (1) `.md` canónico, (2) `.html` alineado, (3) Score ENTRUSTED, (4) evidencia de gate aprobado. El Dueño decide: APPROVED o REJECTED con razón
- **Herramienta:** Canal de comunicación acordado (PR, email, reunión)
- **Output:** Decisión: APPROVED / REJECTED
- **Evidencia:** Registro de aprobación con fecha y razón

### Paso 6: Publicar en repositorio central

- **Acción:** Mover los archivos finales (.md + .html) a la ubicación canónica del repositorio. Actualizar el índice maestro (si existe). Notificar a los usuarios
- **Herramienta:** Git (commit + push) o sistema de archivos versionado
- **Output:** Archivos publicados en ruta canónica
- **Evidencia:** Hash del commit o timestamp de publicación

### Paso 7: Registrar en bitácora

- **Acción:** Registrar en la bitácora: fecha, versión publicada, quién aprobó, Score ENTRUSTED, cualquier excepción o nota
- **Herramienta:** Bitácora del ritual
- **Output:** Entrada de bitácora completa
- **Evidencia:** Entrada visible en bitácora

## DoD (Definition of Done)

El SOP se considera terminado cuando:

- [ ] `.md` canónico publicado en ruta final
- [ ] `.html` alineado y publicado junto al `.md`
- [ ] Divergencias `.md` ↔ `.html` = 0
- [ ] Score ENTRUSTED registrado (≥ 8.0 para continuar)
- [ ] Aprobación del Dueño documentada (APPROVED)
- [ ] Bitácora actualizada con fecha, versión y aprobador
- [ ] Usuarios notificados de la nueva versión

## SLAs

| Métrica | Objetivo | Medición |
| ------- | -------- | -------- |

| Tiempo de publicación (gate aprobado → publicado) | ≤30 min | Por ejecución |
| Divergencias .md ↔ .html | 0 | Por publicación |
| Tasa de aprobación 1ª pasada | ≥90% | Mensual |

## Excepciones

| Situación | Acción | Escala a |
| --------- | ------ | -------- |

| Herramienta de conversión no disponible | Exportar .html manualmente desde editor Markdown | Owner |
| Dueño no disponible para aprobar | Esperar máx 48h; si no hay respuesta, escalar al Steward | Steward |
| Score ENTRUSTED < 8.0 | Bloquear publicación, iterar con Revisor/IA, re-evaluar | Revisor/IA |
| Conflicto entre .md y .html | Priorizar .md como fuente de verdad (Regla de Autoridad) | Autor |

**Regla:** Toda excepción se registra en bitácora con razón y resolución.

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
| ------ | ------------ | ------- | ---------- |

| HTML desalineado del .md tras edición posterior | Media | Alto | Regenerar .html en cada cambio; verificar con diff |
| Publicación sin aprobación del Dueño | Baja | Alto | Gate de aprobación como paso obligatorio |
| Bitácora no actualizada | Media | Medio | Paso 7 como obligatorio en DoD |
| Ritual publicado sin skill asociado | Baja | Alto | DoR verifica skill antes de iniciar |

---

## Changelog

- v1.0.0 — SOP inicial de publicación de rituales. Integra flujo de publicación (Draft→Excellence Loop→Review→Publish), Paquete Mínimo Publicable, y ENTRUSTED scoring
