# Paso a Paso: Ejecución de Rituales Operativos

## 1. Context Loading
- Cargar `L3_GOBIERNO_OPERATIVO.md` (Rituales).
- Identificar el "Owner" y el "Scribe" del ritual.

## 2. Secuencia Atómica

1. **INVOCATION:** Validar el quórum y el trigger del ritual (Cron/Event).
2. **GAME EXECUTION:** Ejecutar la secuencia atómica de los Juegos 0-10 definida en el SOP.
3. **SYNCHRONIZATION:** Revisar la BITACORA_L4 para detectar brechas.
4. **DOCUMENTATION:** El Scribe genera el acta o evidencia en formato MD.
5. **DECISION RECORD:** Documentar cualquier ADR (Architectural Decision Record) surgido.

## 3. Cierre
1. **ARTIFACT STORAGE:** Almacenar evidencia en `meta/` o la carpeta de activos correspondiente.
2. **NEXT STEPS:** Declarar el siguiente ritual o acción dependiente.
