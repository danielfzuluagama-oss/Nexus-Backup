# Best Practices: Forjado de SOPs de Alto Impacto

## 1. El Método del "Sombrero Tonto"
Escribe el SOP asumiendo que el ejecutor no sabe nada del contexto. Si el SOP no funciona así, le falta densidad explicativa.

## 2. Verificación Binaria
Evita instrucciones como "Asegúrate de que esté bien". Usa "Verifica que el archivo contenga la cabecera YAML y devuelva status 200".

## 3. Inyección de Aceleradores
Cada paso del SOP debe indicar si existe un prompt pre-definido en la librería para automatizar esa tarea.

> [!CAUTION]
> **Obsolescencia:** Un SOP que no ha sido ejecutado en 90 días debe marcarse como "Candidato a Deprecación" en el DEPRECACION_LOG.md.

---
### Documento Fundacional v1.0
