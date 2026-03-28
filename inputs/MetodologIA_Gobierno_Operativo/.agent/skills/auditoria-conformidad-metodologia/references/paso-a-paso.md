# Paso a Paso: Auditoría de Conformidad Moat

## 1. Context Loading
- Cargar la estructura del skill/carpeta objetivo.
- Cargar Gold Checklist (Sección 2.3 de SKILL.md).

## 2. Secuencia Atómica
1. **SCAN STRUCTURE:** Verificar existencia de `references/`, `meta/` y `assets/`.
2. **LINT AUDIT:** Ejecutar comandos de escaneo de lints en Markdown.
3. **TRIPLE LOOP TEST:**
    - ¿Están los pilares? (Loop 1).
    - ¿Hay lógica Triple Loop? (Loop 2).
    - ¿Hay evidencia física? (Loop 3).
4. **SCORE:** Generar reporte de puntuación (0.0 a 10.0).

## 3. Acción Correctiva
1. **FIX LINTS:** Corregir espacios y estilos de lista automáticamente.
2. **REPORT:** Indicar gaps de densidad o paradojas operativas.
