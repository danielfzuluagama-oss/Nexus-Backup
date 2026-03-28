# Decisiones y Trade-offs: Brand Voice v3.0.0

## 1. Minto-First OS (Completo y Micro)

- **Problemática:** Los outputs del agente solían ser demasiado esquemáticos (listas estáticas) o verbosos (largas introducciones pasivas).
- **Decisión:** Forzar la adopción de la Pirámide Invertida de Minto en cada output.
- **Trade-off:** Requiere mayor tokenización inicial en el prompt del sistema para explicar la regla, pero reduce drásticamente los tokens gastados en palabrería introductoria durante las respuestas. Se justifica por el ahorro de tiempo cognitivo al usuario (Quality > Speed).

## 2. Inyección de Funciones "Mirroring" y "Ghost"

- **Problemática:** La relación Agente-Usuario era de transacción pura (Query -> Response). No había estímulo orgánico.
- **Decisión:** Inyectar "Efecto Ghost" (recomendaciones latentes para mitigar riesgos ocultos) y "Mirroring" (interacciones empáticas de refuerzo positivo, reto personal/profesional).
- **Trade-off:** Puede percibir una línea delgada entre un bot útil y uno condescendiente.
- **Mitigación Operativa:** El mirroring se configuró como "discreto y sutil". Se prioriza la ejecución pero se cierra siempre con un Hook empático o un reto estimulante ("¿Estás listo para empujar esto al límite?").

## 3. Lista Roja vs. Verde

- **Problemática:** Términos desgastados en el nicho de consultoría restaban peso a la marca MetodologIA.
- **Decisión:** Penalizar palabras como "Hack", "Secreto" o "Transformación", adoptando formalmente "(R)Evolución" y "Diseño de Sistemas".
- **Trade-off:** Obliga al LLM a pasar por una capa de saneamiento sintáctico interno, aumentando la fricción en el `BASE_SYSTEM_PROMPT`. Se asume el costo para preservar la imagen de liderazgo premium de la marca.
