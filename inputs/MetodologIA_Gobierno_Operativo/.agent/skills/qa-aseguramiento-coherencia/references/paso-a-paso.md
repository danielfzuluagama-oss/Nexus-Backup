# Paso a Paso: El Rito del Aseguramiento de Coherencia

## 1. Fase de Carga de Contexto (Grounding)

- Cargar el skill objetivo a auditar.
- Listar archivos en `references/`, `meta/` y `assets/`.

## 2. Ejecución del Protocolo de Verificación Cruzada (PVC)

1. **CROSS-LINT:** Ejecutar auditoría de linting para asegurar cumplimiento de MD0XX.
2. **ONTOLOGY CHECK:** Comparar el `knowledge-graph.md` con la descripción del skill en `SKILL.md`.
3. **VISUAL SYNC:** Validar que el PNG sea una representación fiel de la ontología.
4. **LINK AUDIT:** Verificar que todos los links internos y paths a referencias sean válidos.

## 3. Emisión de Certificado

- Si PVC = 100%, marcar el skill como `CERTIFIED vX.X.X`.
- Si PVC < 100%, generar reporte de brechas (Gap Report) y rechazar certificación.
