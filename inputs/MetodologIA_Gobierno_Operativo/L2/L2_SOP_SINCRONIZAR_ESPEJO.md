# SOP: Sincronizar Espejo (Rituales ⇄ Skills)

- **Versión:** v1.0.0
- **Estado:** Piloto
- **Owner:** SUPUESTO (Steward de Coherencia MetodologIA)
- **Slug:** `sincronizar-espejo`
- **Ritual padre:** Meta-Ritual "Declarar un Ritual" v1.1.0
- **Fecha:** 2026-02-14

---

## Propósito

Mantener la integridad bidireccional entre el repo de Rituales (fuente de verdad operativa) y el repo de Skills (capa de activación AI-native). El espejo garantiza que la IA trabaja con la misma verdad que los humanos. Implementa el principio RAG-First Architecture del L0 Glosario.

## Alcance

- **Aplica a:** Todo skill que tenga un `ritual_padre` declarado en su frontmatter y una carpeta `references/` con contenido espejado
- **NO aplica a:** Skills sin ritual padre (skills autónomos); rituales que aún no tienen skill asociado; documentación general

## Roles

| Rol | Persona/Equipo | Responsabilidad |
| --- | -------------- | --------------- |

| Owner de sync | Quien publica el cambio en el ritual | Ejecuta la sincronización |
| Owner del skill | Responsable del skill afectado | Verifica que el skill sigue funcionando tras sync |
| Steward | Steward de Coherencia MetodologIA | Audita divergencias en revisión periódica |

## DoR (Definition of Ready)

Antes de iniciar, verifica:

- [ ] El ritual fuente ha sido actualizado y publicado (SOP Publicar Ritual completado)
- [ ] El skill correspondiente existe y tiene `references/` definida
- [ ] Se conoce el mapeo de rutas: ruta en repo Rituales → ruta en `references/` del skill
- [ ] Acceso al repo del skill (permisos de escritura)

**Regla:** Si falta algún ítem, NO sincronices. Escala al Steward.

## Pasos

### Paso 1: Identificar cambios en el ritual fuente

- **Acción:** Comparar la versión publicada del ritual con la versión que existe en `references/` del skill. Identificar: archivos modificados, archivos nuevos, archivos eliminados
- **Herramienta:** `diff`, `git log`, o comparación manual
- **Output:** Lista de divergencias (archivos + tipo de cambio)
- **Evidencia:** Log del diff con paths específicos

### Paso 2: Actualizar `references/` del skill

- **Acción:** Copiar los archivos actualizados del repo de Rituales a `references/rituales/<ruta-espejo>/` del skill. Mantener la estructura de carpetas idéntica. Si hay archivos nuevos (ej: nuevo anexo), agregarlos. Si hay archivos eliminados, removerlos
- **Herramienta:** `cp`, `rsync`, `git submodule update`, o script de sincronización
- **Output:** `references/` actualizado con 0 divergencias
- **Evidencia:** Listado de archivos copiados/eliminados

### Paso 3: Verificar integridad post-sync

- **Acción:** Ejecutar verificación de integridad: (1) contar archivos en origen vs destino, (2) verificar hashes o timestamps, (3) confirmar que rutas internas en `SKILL.md` siguen apuntando correctamente
- **Herramienta:** Script de verificación o checklist manual
- **Output:** Reporte de integridad (divergencias = 0)
- **Evidencia:** Log de verificación

### Paso 4: Validar funcionamiento del skill

- **Acción:** Ejecutar el skill 1 vez con la nueva versión de references para confirmar que sigue funcionando correctamente. Si hay fallos: documentar, revertir a versión anterior, y escalar
- **Herramienta:** Ejecución del skill con IA (test funcional)
- **Output:** Resultado de ejecución: OK / FALLO
- **Evidencia:** Output del test o captura del resultado

### Paso 5: Actualizar frontmatter del skill

- **Acción:** Actualizar en el frontmatter de `SKILL.md`: campo `updated` con fecha actual. Si la versión del ritual padre cambió de major, actualizar `ritual_padre` y considerar bump de versión del skill
- **Herramienta:** Editor de texto
- **Output:** Frontmatter actualizado
- **Evidencia:** Diff del frontmatter

### Paso 6: Commit y registro

- **Acción:** Hacer commit con mensaje descriptivo: `sync: <skill-slug> ← <ritual-slug> v<X.Y.Z>`. Registrar en bitácora: fecha, skill, ritual fuente, versión, resultado del test
- **Herramienta:** Git + bitácora
- **Output:** Commit publicado + entrada de bitácora
- **Evidencia:** Hash del commit + entrada en bitácora

## DoD (Definition of Done)

El SOP se considera terminado cuando:

- [ ] `references/` del skill refleja exactamente el contenido publicado del ritual fuente
- [ ] Divergencias entre origen y destino = 0
- [ ] Skill ejecutado 1 vez con resultado OK
- [ ] Frontmatter del skill actualizado (campo `updated`)
- [ ] Commit realizado con mensaje descriptivo
- [ ] Bitácora actualizada

## SLAs

| Métrica | Objetivo | Medición |
| ------- | -------- | -------- |

| Tiempo entre publicación del ritual y sync del skill | ≤24 horas | Por evento |
| Divergencias post-sync | 0 archivos | Por sync |
| Tasa de sync exitoso (sin rollback) | ≥95% | Mensual |

## Excepciones

| Situación | Acción | Escala a |
| --------- | ------ | -------- |

| Ritual eliminó un archivo que el skill referencia directamente | Actualizar `SKILL.md` para remover la referencia; test funcional obligatorio | Owner del skill |
| Sync rompe el funcionamiento del skill | Rollback inmediato a versión anterior de references; abrir issue para compatibilidad | Owner del skill + Steward |

| No hay acceso al repo del skill | Solicitar permisos; mientras tanto, documentar la divergencia como pendiente | Steward |
| Cambio de major version del ritual | Re-evaluar si el skill necesita refactoring, no solo sync | Owner del skill |

**Regla:** Toda excepción se registra en bitácora con razón y resolución.

## Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
| ------ | ------------ | ------- | ---------- |

| Espejo roto (skill trabaja con versión vieja) | Alta | Alto | Cadencia de sync obligatoria + check en cada release |
| Sync parcial (algunos archivos, no todos) | Media | Alto | Verificación de integridad (Paso 3) como paso obligatorio |
| Skill deja de funcionar tras sync | Baja | Alto | Test funcional (Paso 4) + capacidad de rollback |

| Acumulación de deuda de sync | Media | Medio | Auditoría periódica del Steward (trimestral) |

---

## Changelog

- v1.0.0 — SOP inicial de sincronización espejo. Implementa RAG-First Architecture y principio de Skill Espejo del governance PDF
