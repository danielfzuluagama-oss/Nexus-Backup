# Best Practices: Auditoría de Élite

## 1. El Ritual del Escaneo
Nunca audites archivos aislados. Escanea siempre el contexto transversal (`ls -R`, `grep`) para detectar inconsistencias de nombres.

## 2. Detección de "Zombie Content"
Identifica y propone la eliminación de archivos que no tienen referencias activas o que han sido superados por nuevas capacidades.

## 3. El Gatekeeper de 14 Puntos
Aplica siempre el QA-14 como una barrera infranqueable.

> [!IMPORTANT]
> **Prioridad de Corrección:** Los fallos en L0 (Convenciones) deben corregirse antes que cualquier otra mejora funcional.

---
### Documento Fundacional v1.0
