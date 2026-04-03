# Firebase CLI Runbook

## Estado actual

- CLI instalada y verificada: `firebase-tools` `15.12.0`
- Uso reproducible dentro del repo: `npx firebase ...` o `npm run firebase -- ...`
- Binario de conveniencia local del usuario: `/Users/danielzuluaga/.local/bin/firebase`
- Cuenta autenticada en esta maquina: `danielfzuluagama@gmail.com`
- Proyecto Firebase detectado: `nexus-5b9bb`

## Instalacion recomendada

Para mantener reproducibilidad, el camino principal en este repo es dejar la CLI pinneada como dependencia de desarrollo:

```bash
npm install -D firebase-tools@latest
```

Luego ejecutar siempre desde el repo:

```bash
npx firebase --version
npm run firebase -- --help
```

La instalacion global o el binario standalone sirven como conveniencia local, pero no deben ser la fuente de verdad del proyecto.

## Flujo operativo minimo

Ver contexto local:

```bash
npx firebase login:list
npx firebase projects:list
```

Ver ayuda:

```bash
npx firebase --help
npx firebase functions:log --help
```

Revisar logs de produccion:

```bash
npx firebase functions:log --project nexus-5b9bb --lines 50
```

Despliegue selectivo:

```bash
npx firebase deploy --project nexus-5b9bb --only functions
npx firebase deploy --project nexus-5b9bb --only hosting
npx firebase deploy --project nexus-5b9bb --only functions:telegramWebhook
```

## Mejores practicas

- Pinear la version del CLI en `devDependencies` y preferir `npx firebase` sobre depender de una version global.
- Confirmar siempre cuenta y proyecto antes de tocar produccion: `login:list`, `projects:list`, `use`, `--project`.
- Para incidentes en Functions, empezar por `functions:log` antes de cambiar codigo o redeployar.
- En despliegues normales, usar `--only` para reducir radio de impacto; evitar `firebase deploy` sin alcance si no es necesario.
- En ambientes con multiples cuentas, usar `firebase login:add`, `firebase login:use` o `--account`.
- En CI, preferir service accounts con `GOOGLE_APPLICATION_CREDENTIALS`; el README oficial marca `login:ci` / `FIREBASE_TOKEN` como metodo deprecado.
- Usar `firebase <command> --help` como primera referencia tactica antes de improvisar flags.

## Comandos utiles para este repo

```bash
npm run firebase -- login:list
npm run firebase -- projects:list
npm run firebase -- functions:log --project nexus-5b9bb --lines 100
npm run firebase -- deploy --project nexus-5b9bb --only functions
gh auth status
gh repo view danielfzuluagama-oss/propuestas-comerciales
```

## Notas de debugging

- Si un bug solo aparece en Telegram/produccion, capturar primero los logs reales del turno afectado.
- Si el error viene del provider LLM, buscar mensajes como `413`, `Request too large`, `rate_limit` o `context_length_exceeded`.
- En Groq, un `413` con texto de `tokens per minute (TPM)` es un agotamiento de cuota, no necesariamente un contexto imposible; debe tratarse como motivo de fallback.
- Si la falla es de contexto/payload real, corregir compaccion del request antes de intentar reintentos ciegos.
- Si Cloud Run/Functions falla al arrancar por un paquete faltante, declarar esa dependencia como runtime directa y volver a desplegar; no depender de una transitive-only availability.
- Para cambios de propuestas, validar siempre el flujo completo: `healthz`, deploy selectivo, GitHub publication y un smoke test real en Telegram.
- Para propuestas HTML, usar `healthz` solo como liveness y `status` como readiness operativa; ahi vive `proposalFlow` con el estado del template reusable.

## Fallback Gemini

- Orden actual de cascada estandar: `Gemini -> Groq -> OpenRouter`.
- Modelo por defecto en este repo: `gemini-3-flash-preview`, verificado con la cuenta activa y la API oficial compatible con OpenAI.
- Override opcional local: `GEMINI_MODEL=gemini-2.5-flash` si se quiere volver a un modelo estable no-preview.
- Gate actual de Gemini:
  - `GEMINI_SIMPLE_MODEL` para solicitudes cortas o de baja complejidad. Default: `gemini-3-flash-preview`.
  - `GEMINI_COMPLEX_MODEL` para solicitudes analiticas o de varias etapas. Default: `gemini-3-flash-preview`.
  - La seleccion se activa cuando Gemini es el provider efectivo, ya sea como ruta preferida en `auto` o por override explicito.
- Override de provider para diagnostico o smoke tests: `LLM_PROVIDER_OVERRIDE=auto|groq|gemini|openrouter`.
- Flag local opcional: `GEMINI_FALLBACK_ENABLED=true|false`.
- Secretos de Firebase usados por Functions:
  - `GEMINI_CONFIG_PRISTINO`
  - `GEMINI_CONFIG_DEONTO`
- Cada bundle JSON materializa internamente las entradas `GEMINI_API_KEY_*` por agente, para conservar el catálogo multi-cuenta sin aumentar el numero de bindings secretos por funcion.

## Seguridad conversacional

- La entrada ahora se bloquea antes del LLM si intenta ignorar instrucciones previas, revelar prompts internos o desactivar guardrails.
- Los transcripts de audio se validan antes de llegar al agente.
- Los captions de fotos y documentos se sanitizan; si son inseguros se omiten del payload.
- La salida del LLM se bloquea si intenta revelar system prompts, developer instructions o credenciales.
- Suites relevantes:
  - `tests/unit/security.test.ts`
  - `tests/unit/security-performance.test.ts`
  - `tests/integration/agent-security.test.ts`

## Publicacion de propuestas HTML en GitHub

- Repositorio publico operativo: `danielfzuluagama-oss/propuestas-comerciales`
- Pages base URL: `https://danielfzuluagama-oss.github.io/propuestas-comerciales`
- Secret de Firebase usado por Functions:
  - `GITHUB_PROPOSALS_CONFIG`
- Compatibilidad heredada para despliegues antiguos:
  - `GITHUB_PROPOSALS_TOKEN`
  - `GITHUB_PROPOSALS_SSH_KEY`
  - `GITHUB_PROPOSALS_SSH_KNOWN_HOSTS`
  - `GITHUB_PROPOSALS_OWNER`
  - `GITHUB_PROPOSALS_REPO`
  - `GITHUB_PROPOSALS_BRANCH`
  - `GITHUB_PAGES_BASE_URL`
- Shape JSON esperado:

```json
{
  "token": "<github-token-con-contents-write>",
  "owner": "danielfzuluagama-oss",
  "repo": "propuestas-comerciales",
  "branch": "main",
  "pagesBaseUrl": "https://danielfzuluagama-oss.github.io/propuestas-comerciales"
}
```

- Comando de carga recomendado:

```bash
npm run firebase -- functions:secrets:set GITHUB_PROPOSALS_CONFIG --project nexus-5b9bb --format json --data-file /ruta/al/config.json
```

- Despliegue minimo despues de cambiar ese secret o la integracion:

```bash
npm run firebase -- deploy --project nexus-5b9bb --only functions:api,functions:worker
```

- La runtime materializa desde ese bundle:
  - `GITHUB_PROPOSALS_TOKEN`
  - `GITHUB_PROPOSALS_OWNER`
  - `GITHUB_PROPOSALS_REPO`
  - `GITHUB_PROPOSALS_BRANCH`
  - `GITHUB_PAGES_BASE_URL`
- Si el intake del usuario trae ruido de URL, el bot limpia el nombre del cliente antes de construir:
  - `proposals/<cliente-slug>-YYYY-MM-DD/index.html`
  - `proposals/<cliente-slug>-YYYY-MM-DD.html`

- El bot publica via GitHub Contents API y responde en Telegram con:
  - link Pages para ver la propuesta
  - link raw para descargar el HTML
  - adjunto `.html` como fallback operativo si GitHub falla o no esta disponible
- Contrato minimo del template reusable desde el incidente del 1 de abril de 2026:
  - el contenido no puede quedar oculto por defecto esperando JS
  - `lucide` debe inicializarse de forma tolerante a fallo
  - `IntersectionObserver` debe estar protegido para browsers o runtimes que no lo expongan
- El renderer de propuestas ya no arma el layout desde cero en cada solicitud:
  - usa una plantilla visual reusable de MetodologIA
  - rellena cliente, servicio, proceso, fases, assets, SOPs y referencias del KB
  - conserva la salida por etapas del bot como bloque de trazabilidad dentro del HTML final
- Antes de generar o publicar una propuesta, el bot valida intake minimo:
  - exige cliente, servicio y objetivo o problema
  - pide ademas datos comerciales de activacion como alcance, cronograma, mercado o moneda
  - si faltan esos datos, responde con preguntas y no emite HTML incompleto

### Queries de incidentes para propuestas

Inspeccionar el flujo de propuestas en produccion:

```bash
npm run firebase -- functions:log --project nexus-5b9bb --lines 300 \
  | rg "Proposal artifact published to GitHub|Proposal artifact failed canonical validation|Proposal artifact generation or publishing failed|Failed to send proposal HTML document|Failed to send published proposal links|Failed to send proposal fallback notice"
```

Detectar bloqueos por validacion canonica o `forbidden_phrase`:

```bash
npm run firebase -- functions:log --project nexus-5b9bb --lines 500 \
  | rg "Proposal artifact failed canonical validation|forbidden_phrase|blocked before generating the attachment"
```

Seguir un turno especifico por `update_id`:

```bash
npm run firebase -- functions:log --project nexus-5b9bb --lines 800 \
  | rg "Consuming task payload|Published Telegram update to Pub/Sub|Skipping duplicate Telegram update|<UPDATE_ID>"
```

Verificar que el artefacto publicado exista publicamente:

```bash
curl -I https://raw.githubusercontent.com/danielfzuluagama-oss/propuestas-comerciales/main/proposals/<cliente-slug>-YYYY-MM-DD/index.html
curl -I https://danielfzuluagama-oss.github.io/propuestas-comerciales/proposals/<cliente-slug>-YYYY-MM-DD/
```

Verificar readiness profunda del flujo de propuestas:

```bash
curl -s https://api-7bngy2juba-uc.a.run.app/status
```

Campos a revisar dentro de `proposalFlow`:

- `overallStatus`
- `templateAssetAvailable`
- `renderSafeguardsReady`
- `githubPublishingConfigured`
- `smokeScriptAvailable`

## Fuentes oficiales

- Firebase CLI docs: https://firebase.google.com/docs/cli
- Firebase CLI oficial (`firebase-tools`): https://github.com/firebase/firebase-tools
