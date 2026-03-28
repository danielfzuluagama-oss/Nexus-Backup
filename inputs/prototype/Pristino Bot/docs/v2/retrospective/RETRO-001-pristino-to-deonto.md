---
id: retro-001-pristino-to-deonto
type: retrospective
version: "2.0.0"
date: "2026-03-06"
scope: "Pristino v1 → v2 + Deonto v2 refactor"
participants: ["claude-opus-4.6", "deonto-user"]
duration: "~3 hours"
artifacts_produced: 24
loc_v1: 394
loc_v2_pristino: 839
loc_v2_deonto: 867
growth_factor: 2.13
tags: [retrospective, agent-architecture, refactor, typescript, telegram]
---

# RETRO-001: Pristino v1 → Deonto v2 Refactor

## Metricas Clave

| Metrica | v1 | v2 (Pristino) | v2 (Deonto) | Delta |
|---------|-----|----------------|-------------|-------|
| Archivos fuente | 8 | 12 | 12 | +4 |
| LOC total | 394 | 839 | 867 | ~2.1x |
| Modulos de seguridad | 0 | 3 checkpoints | 3 checkpoints | +3 |
| Gestion de tokens | ninguna | budget-based | budget-based | +1 |
| Sub-agentes | 0 | 1 (timekeeper) | 1 (timekeeper) | +1 |
| `as any` casts | 2 | 0 | 0 | -2 |
| Shutdown graceful | parcial | completo | completo | fixed |
| Memory.close() | ausente | presente | presente | fixed |
| Config tunable | 3 | 9 | 9 | +6 |

## Lo que funciono bien

### 1. Arquitectura modular desde v1
La separacion en `config → memory → llm → agent → bot → index` demostro ser correcta.
Los 4 nuevos modulos (`logger`, `security`, `tokens`, `delegate`) se insertaron sin reestructurar los existentes.

### 2. Resolucion de dependencia circular
El patron `delegate.ts` (define) → `registry.ts` (registra slot) → `agent.ts` (provee executor via `initDelegation()`) rompio la circularidad sin hacks.
Este patron es reutilizable para cualquier sistema donde tools necesiten invocar al agente.

### 3. Tipos del SDK de Groq
Reemplazar `as any` por `ChatCompletionMessageParam[]` y `ChatCompletionTool[]` importados de `groq-sdk/resources/chat/completions` elimino deuda tecnica sin cambiar logica.

### 4. Defensa en profundidad (3 checkpoints)
- Checkpoint 1 (input): sanitiza antes del loop
- Checkpoint 2 (prompt): endurece system prompt
- Checkpoint 3 (output): valida antes de responder
Patron log-but-dont-block: registra actividad sospechosa sin censurar contenido creativo.

### 5. Digital twin (Pristino ↔ Deonto)
Ambos proyectos comparten arquitectura identica. Solo difieren en: nombre del agente, ruta DB, mensajes de startup/shutdown, nivel de documentacion inline.

## Lo que no funciono

### 1. Subestimacion de LOC
Plan estimaba ~770 LOC. Resultado real: 839-867.
Causa: las funciones `splitMessage()`, `parseResponse()`, y el sistema de delegacion requirieron mas lineas de las estimadas.
Impacto: marginal (2.13x vs 2x target). Aceptable.

### 2. Cache de lectura del tool Write
El tool `Write` requiere `Read` previo. En sesiones largas, el cache expira.
Workaround: re-leer archivo inmediatamente antes de escribir.
Leccion: en flujos de escritura masiva, agrupar read+write como unidad atomica.

### 3. Falso positivo del Explore agent
El agente de exploracion reporto un "bug critico" (tool result push fuera del loop) que NO existia.
El Plan agent verifico manualmente que lineas 66-85 de agent.ts v1 confirman que `messages.push()` SI esta dentro del `for` loop.
Leccion: siempre verificar hallazgos de agentes automaticos contra el codigo fuente.

### 4. Estimacion de tokens por char/4
Funcional pero imprecisa. Para Llama 3.3, la relacion real varia entre 3.2-4.5 chars/token dependiendo del idioma.
Aceptable por YAGNI: agregar un tokenizer real (tiktoken) seria una dependencia nativa para precision marginal.

## Patrones descubiertos

### Patron: Executor Registration Diferido
```
delegate.ts  →  define SubAgent data + tool schema
registry.ts  →  accepts dynamic executor via registerDelegateTool()
agent.ts     →  provides executor at startup via initDelegation()
```
Util para cualquier tool que necesite acceso al runtime del agente.

### Patron: Config-Driven Defaults
Mover constantes hardcodeadas a `config.ts` con defaults sensatos:
```typescript
maxIterations: Number(process.env.MAX_ITERATIONS) || 5
```
Permite tuning via `.env` sin tocar codigo.

### Patron: Newline-Aware Message Splitting
```typescript
let splitAt = remaining.lastIndexOf("\n", TELEGRAM_MAX_LENGTH);
if (splitAt <= 0) splitAt = TELEGRAM_MAX_LENGTH;
```
Respeta limites de plataforma sin cortar mid-sentence.

## Anti-patrones evitados

| Anti-patron | Como se evito |
|-------------|--------------|
| God class | Agent loop es 1 funcion; security/tokens/tools son modulos separados |
| Hardcoded secrets | Todo en `.env`, validado en `config.ts` |
| Silent failures | Logger reemplaza todos los `console.*`; errores siempre se registran |
| Tight coupling | `LLMProvider` interface permite cambiar backends sin tocar agent |
| Over-engineering | Sin abstracciones innecesarias; YAGNI aplicado (char/4 vs tiktoken) |

## Decisiones arquitectonicas confirmadas

| ADR | Decision | Resultado |
|-----|----------|-----------|
| ADR-1 | Defensa en profundidad via 3 checkpoints | Funcional, extensible, no invasivo |
| ADR-2 | Token estimation char/4 | Suficiente, zero dependencies |
| ADR-3 | Delegacion plana (depth=1 max) | Simple, predecible, debuggable |
| ADR-4 | OpenRouter opcional | Reduce friccion de setup |
| ADR-5 | Config-driven defaults | 9 parametros tunables sin tocar codigo |

## Recomendaciones para v3

1. **Persistencia de sub-agentes**: Permitir que sub-agentes accedan a memoria compartida (read-only) para contexto enriquecido
2. **Tool registry dinamico**: Registrar tools en runtime desde archivos de configuracion, no solo hardcodeados
3. **Metricas de uso**: Contador de tokens consumidos, tiempo de respuesta, tool calls por sesion
4. **Streaming**: Enviar tokens parciales a Telegram via `editMessage` para UX responsivo
5. **Test suite**: Tests unitarios para security.ts, tokens.ts, y agent loop con LLM mockeado
