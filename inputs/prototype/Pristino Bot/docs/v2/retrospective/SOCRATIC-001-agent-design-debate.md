---
id: socratic-001-agent-design-debate
type: socratic-debate
version: "2.0.0"
date: "2026-03-06"
thesis: "Pristino/Deonto v2 architecture is production-ready"
methodology: dialectic
rounds: 5
verdict: "conditionally-valid"
tags: [socratic-debate, architecture, agent-design, critical-analysis]
---

# SOCRATIC-001: Debate Dialectico sobre Arquitectura de Agentes

## Tesis
"La arquitectura v2 de Pristino/Deonto (12 archivos, 3 checkpoints de seguridad, gestion de tokens, orquestacion multi-agente) es suficiente para produccion."

---

## Ronda 1: Seguridad

**Abogado (A):** La defensa en profundidad con 3 checkpoints cubre input, prompt y output. Las inyecciones de prompt se detectan via regex y se loguean.

**Critico (C):** Los regex son fragiles. Un atacante puede evadir `ignore previous instructions` con variaciones Unicode, homoglifos, o codificacion base64. El patron `log-but-dont-block` significa que inyecciones exitosas pasan silenciosamente.

**A:** Correcto, pero bloquear contenido crea falsos positivos que degradan la experiencia. Un usuario preguntando "como funciona el prompt injection?" seria bloqueado injustamente. El logging permite deteccion post-hoc y ajuste iterativo.

**C:** Concedido. Pero falta un cuarto checkpoint: **validacion de argumentos de tools**. Si el LLM es manipulado para pasar argumentos maliciosos a un tool futuro (e.g., un tool de filesystem), no hay sanitizacion de argumentos.

**Resolucion:** La seguridad es adecuada para el threat model actual (bot personal de Telegram con whitelist). Para despliegue publico, se necesita: (1) tool argument validation, (2) sandboxing de ejecucion, (3) rate limiting.

---

## Ronda 2: Escalabilidad del Sistema Multi-Agente

**A:** El sistema de delegacion con depth=1 es simple y predecible. Un sub-agente (timekeeper) demuestra el patron.

**C:** Un solo sub-agente es un smoke test, no una validacion. Que pasa con 10 sub-agentes? El schema del tool `delegate_to_agent` crece linealmente con cada sub-agente (nombres y descripciones en el enum). A 10+ sub-agentes, el LLM recibe demasiada informacion para elegir correctamente.

**A:** Los sub-agentes se registran en un Map. El schema es generado dinamicamente. La seleccion del LLM depende de buenas descripciones, no de la cantidad.

**C:** Pero el contexto consumido por el tool definition crece. Con 10 sub-agentes, cada uno con 50 palabras de descripcion, son ~500 tokens solo para el schema. Y el LLM tiene que razonar sobre 10 opciones en cada turno.

**Resolucion:** Para 1-5 sub-agentes, el patron es optimo. Para 6+, considerar: (1) routing pre-LLM (clasificador ligero que pre-selecciona sub-agentes relevantes), (2) agrupacion jerarquica (sub-agente "coordinador" que conoce las categorias).

---

## Ronda 3: Gestion de Tokens

**A:** `estimateTokens(char/4)` es zero-dependency y suficientemente preciso para Llama tokenizers.

**C:** "Suficientemente preciso" no es medible. Cual es el error real? Para ingles, char/4 subestima ~10%. Para espanol con acentos, puede subestimar ~20%. Para CJK, subestima ~60%. Un usuario hispanohablante (como este) esta recibiendo presupuestos de contexto inflados.

**A:** El safety margin del 10% compensa parcialmente. Y `trimHistory` es conservador: elimina mensajes enteros oldest-first.

**C:** El margin compensa ingles, no otros idiomas. Propuesta: usar `char/3.5` como heuristica base, o `char/3` para idiomas no-ingles. Mejor aun: detectar el idioma predominante y ajustar.

**Resolucion:** La heuristica es aceptable (YAGNI) si se documenta la limitacion. Para produccion multilingue, usar `char/3.5` o incorporar un tokenizer ligero (js-tiktoken tiene ~200KB, no es nativo).

---

## Ronda 4: Acoplamiento y Testabilidad

**A:** La arquitectura usa DI (AgentDeps), interfaces (LLMProvider), y separacion de concerns. Es testable.

**C:** Es testable en teoria. En practica, no hay ni un solo test. runAgent() tiene 180+ lineas con 5 responsabilidades: sanitizacion, prompt building, history trimming, tool execution, output validation. Eso viola SRP.

**A:** Esas 5 responsabilidades son secuenciales y cohesivas: forman un pipeline. Extraerlas en funciones separadas fragmentaria la legibilidad del flujo.

**C:** Pueden ser funciones privadas dentro del mismo modulo sin fragmentar la legibilidad:
```typescript
const cleaned = sanitizeAndValidate(userMessage);
const prompt = buildPrompt(options, config);
const history = loadAndTrimHistory(memory, userId, config, prompt);
const result = executeAgentLoop(llm, messages, tools, config);
return validateAndPersist(result, memory, userId, isSubAgent);
```

**Resolucion:** El agente funciona como pipeline cohesivo, pero extraer sub-funciones mejoraria testabilidad unitaria. Prioridad para v3.

---

## Ronda 5: Mantenibilidad a Largo Plazo

**A:** Dos proyectos identicos (digital twin) garantizan replicabilidad. Cambiar algo en uno se replica en el otro.

**C:** Exactamente ahi esta el problema. Son 24 archivos (12 + 12) que deben mantenerse sincronizados manualmente. Sin tests automatizados que verifiquen paridad, la divergencia es inevitable.

**A:** La divergencia es intencional en v3: Deonto sera el GOAT con features avanzadas; Pristino sera la version estable/simple.

**C:** Entonces el "digital twin" ya no aplica. Necesitan un shared-core (libreria comun) y configuracion per-project. Duplicar 839 LOC identicas es deuda tecnica.

**A:** Crear un monorepo con shared-core agrega complejidad de build (workspaces, path resolution, publicacion). Para 2 proyectos de 800 LOC, la duplicacion es el menor costo.

**Resolucion:** A <1500 LOC por proyecto, la duplicacion es aceptable. Si v3 diverge significativamente, extraer un `@pristino/core` package. El umbral de extraccion es cuando >50% del codigo es identico entre proyectos.

---

## Veredicto Final

| Dimension | Estado | Condicion |
|-----------|--------|-----------|
| Seguridad | Suficiente | Para bot personal con whitelist |
| Multi-agente | Funcional | Para 1-5 sub-agentes |
| Tokens | Aceptable | Para idiomas basados en latin |
| Testabilidad | Teorica | Sin tests reales; extraer sub-funciones en v3 |
| Mantenibilidad | Viable | Mientras LOC < 1500 por proyecto |

**Conclusion:** La arquitectura es **condicionalmente valida** para su caso de uso actual (bot personal de Telegram). Las condiciones de invalidacion estan documentadas y son medibles.
