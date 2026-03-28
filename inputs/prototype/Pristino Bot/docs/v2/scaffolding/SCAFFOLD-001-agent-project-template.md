---
id: scaffold-001-agent-project-template
type: scaffolding-reference
version: "2.0.0"
date: "2026-03-06"
applies_to: ["pristino", "deonto", "future-agents"]
tags: [scaffolding, template, naming, conventions, structure]
---

# Scaffolding de Referencia para Agentes Telegram+LLM

## Estructura de Directorio

```
agent-project/
│
├── .claude/                        # Agent IDE config
│   ├── settings.local.json         # Per-machine settings
│   └── skills/                     # Claude Code skills
│       └── {skill-name}/
│           └── SKILL.md
│
├── docs/                           # Documentacion versionada
│   └── v{N}/                       # Por version mayor
│       ├── retrospective/          # Retrospectivas del proceso
│       │   └── RETRO-{NNN}-{slug}.md
│       ├── knowledge-graph/        # Grafos de conocimiento
│       │   └── GRAPH-{NNN}-{slug}.md
│       └── scaffolding/            # Templates y referencias
│           └── SCAFFOLD-{NNN}-{slug}.md
│
├── src/                            # Codigo fuente
│   ├── index.ts                    # Entry point + lifecycle
│   ├── config.ts                   # Environment + validation
│   ├── logger.ts                   # Structured logging
│   ├── security.ts                 # Defense-in-depth guards
│   ├── tokens.ts                   # Context budget management
│   ├── bot.ts                      # Telegram adapter (grammy)
│   ├── agent.ts                    # Orchestrator loop
│   ├── llm.ts                      # LLM provider abstraction
│   ├── memory.ts                   # SQLite conversation store
│   └── tools/                      # Tool implementations
│       ├── registry.ts             # Tool dispatch + async
│       ├── delegate.ts             # Sub-agent routing
│       └── {tool-name}.ts          # Individual tools
│
├── package.json
├── tsconfig.json
├── .env.example                    # Documented env template
├── .gitignore
└── CLAUDE.md                       # Agent self-knowledge
```

## Convenciones de Naming

### Archivos y directorios: kebab-case
```
src/tools/get-current-time.ts    ✓
src/tools/getCurrentTime.ts      ✗
src/tools/get_current_time.ts    ✗
```

### Tool names en schemas: snake_case
```json
{ "name": "get_current_time" }     ✓
{ "name": "getCurrentTime" }       ✗
{ "name": "get-current-time" }     ✗
```

### Interfaces TypeScript: PascalCase
```typescript
interface AgentDeps { }            ✓
interface agentDeps { }            ✗
```

### Variables de entorno: SCREAMING_SNAKE_CASE
```
TELEGRAM_BOT_TOKEN=               ✓
telegramBotToken=                 ✗
```

### Documentos: TIPO-NNN-slug-kebab.md
```
RETRO-001-pristino-to-deonto.md   ✓
retrospective_1.md                ✗
```

## Slugging Pattern

| Campo | Formato | Ejemplo | Max chars |
|-------|---------|---------|-----------|
| doc-id | `{tipo}-{nnn}-{slug}` | `retro-001-pristino-to-deonto` | 60 |
| tool-name | `snake_case` | `get_current_time` | 40 |
| sub-agent-name | `kebab-case` | `timekeeper` | 30 |
| config-key | `camelCase` (TS) / `SCREAMING_SNAKE` (env) | `maxTokens` / `MAX_TOKENS` | 40 |
| file-path | `kebab-case` | `get-current-time.ts` | 60 |

## Template: Nuevo Tool

```typescript
// src/tools/{tool-name}.ts
import type { ToolDefinition } from "./registry.js";

export const definition: ToolDefinition = {
  type: "function",
  function: {
    name: "{snake_case_name}",
    description: "{Que hace}. {Cuando usarlo}. {Cuando NO usarlo}.",
    parameters: {
      type: "object",
      properties: {
        // Cada propiedad con type + description
      },
      required: [],
    },
  },
};

export function execute(args: Record<string, unknown>): string | Promise<string> {
  // Validar args con typeof checks
  // Try/catch con fallback
  // Return string result
}
```

## Template: Nuevo Sub-Agente

```typescript
// En tools/delegate.ts, agregar al subAgents Map:
subAgents.set("{nombre}", {
  name: "{nombre}",
  description: "{1 linea: que hace este sub-agente}",
  systemPrompt: `You are {nombre}, a specialist in {dominio}.
    {instrucciones especificas}
    {constraints}`,
  tools: ["{tool_1}", "{tool_2}"],
});
```

## Template: YAML Frontmatter para Documentos

```yaml
---
id: {tipo}-{nnn}-{slug}      # Identificador unico
type: {retrospective|socratic-debate|knowledge-graph|scaffolding}
version: "{semver}"           # Version del documento
date: "{YYYY-MM-DD}"         # Fecha de creacion
scope: "{descripcion corta}" # Alcance del documento
tags: [{tag1}, {tag2}]       # Tags para busqueda
---
```

## Checklist: Nuevo Modulo

- [ ] Archivo en `src/` con nombre kebab-case
- [ ] Imports desde `./modulo.js` (extension .js para ESM)
- [ ] Tipos exportados con `export interface` o `export type`
- [ ] Logger importado: `import { logger } from "./logger.js"`
- [ ] Error handling con try/catch + logger.error
- [ ] Sin `as any` — usar tipos del SDK o custom interfaces
- [ ] Registrado en index.ts si requiere inicializacion
- [ ] Documentado en CLAUDE.md si cambia comportamiento del agente
