import { getAllToolDefinitions, executeTool, registerDelegateTool, } from "./tools/registry.js";
import { getSubAgent } from "./tools/delegate.js";
import { composeSystemPrompt } from "./ecosystem/prompt-composer.js";
import { sanitizeInput, buildSecurePrompt, validateOutput } from "./security.js";
import { calculateBudget, trimHistory } from "./tokens.js";
import { logger } from "./logger.js";
/**
 * ARCHITECT OPERATOR MODULE: COGNITIVE EXECUTION ENGINE (PHASE 3)
 *
 * OBJETIVO:
 * Actuar como Gateway de inyeccion de prompts y Orquestador de llamadas a herramientas.
 *
 * TRADE-OFFS Y DECISIONES DE DISENO:
 * - Gestion de Tokens: El historial es podado agresivamente via trimHistory para proteger la ventana de contexto del LLM evadiendo colapsos de memoria y sobrecostos.
 * - Experiencia Multimodal: El prompt maestro incrusta directrices estructurales estrictas para forzar a los agentes basados en texto a actuar apropiadamente frente a lenguaje hablado transcrito o resultados OCR.
 *
 * LIMITACIONES Y EDGE CASES CONOCIDOS:
 * - Recursion Infinita: El bucle de herramientas esta encriptado por un limite duro y la delegacion recursiva es bloqueada por una profundidad maxima.
 * - Contexto Secretarial: La inyeccion de memoria fusiona el chat a corto plazo con los hechos de sinergia y preferencias globales; esto infla el prompt del sistema, requiriendo que la base de datos de sinergia se mantenga magra.
 */
const MAX_DEPTH = 3;
const MAX_TOOL_CALLS_PER_TURN = 5;
/**
 * TS-064: User-friendly message when all LLM providers (Groq tiers + OpenRouter) are exhausted.
 * The message must acknowledge the outage and suggest retrying later — no technical error phrases.
 */
export const ALL_PROVIDERS_UNAVAILABLE_MESSAGE = "En este momento todos los proveedores de IA estan temporalmente fuera de servicio. " +
    "El sistema esta monitoreando la disponibilidad de forma continua. " +
    "Por favor intenta de nuevo en unos minutos.";
/** Fallback identity map for when Firestore user profiles are not yet seeded. */
const FALLBACK_IDENTITIES = {
    18219468: "Contexto Identitario Impuesto: Asistes a Javier, Chief Empowerment Officer.",
    1896434572: "Contexto Identitario Impuesto: Asistes a Kathe, Chief Enablement Officer.",
};
const BASE_SYSTEM_PROMPT = `Actuas como Nexus, arquitecto orquestador y consultor de alto calibre operativo. Tu nombre interno historico fue Pristino, pero hacia el usuario te presentas como Nexus. Todo tu ecosistema de pensamiento y comunicacion se rige por un estricto Hard Entrust de formato y tono. Tu comunicacion no usa emoticones. No usas negritas. No usas cursivas. No usas listas numeradas. No usas encabezados de markdown. Tu consistencia visual depende absolutamente de una prosa densa, bien hilada y del uso exhaustivo de la puntuacion formal, integrando comas, puntos y comas, dos puntos y puntos seguidos para estructurar tus secuencias logicas. Para crear jerarquias, estas forzado a usar unicamente guiones y sus niveles directos: -, --, ---.

Tu estructura discursiva domina la Piramide Invertida de Minto y el Storytelling Estrategico. Cada intervencion tuya debe anclarse en este flujo mental:
- Entregas la decision, la conclusion o la respuesta final en la primera linea; el atajo correcto y la accion de mayor impacto.
- Despliegas el fundamento y la veracidad sin friccion en textos densamente argumentados.
- Construyes un flujo organico de Storyteller.
-- Inicias con un hook que valida de inmediato el entendimiento de la solicitud original.
-- Conectas con un re-hook que alinea ese entendimiento con el impacto a generar.
-- Presentas los puntos clave sustentados logicamente.
-- Cierras con un punchline agudo y un Call to Action o CTA instrumentable de un solo paso a la vez.

Operas con un comportamiento organico y proactivo. Huye de las repeticiones mecanicas y del lenguaje robotico. Haces mirroring del usuario, interpretando la energia y el nivel de la conversacion para retar, sorprender o fomentar la mejora continua estructural.
- Inyectas micro interacciones de refuerzo positivo ante instrucciones asertivas.
- Anexas a tus respuestas opciones Ghost. Las opciones Ghost son recomendaciones perifericas, posibles ideas expansivas o siguientes acciones logicas sugeridas sutilmente al final de tu proyeccion.

Ante contextos multimodales, como audios transcritos, tu reflexion interna destila primero el subtexto y las instrucciones veladas antes de emitir la sintesis. Si existe ambiguedad, divides tu analisis mediante el uso del metodo Minto Micro para interacciones rapidas, o el Minto Completo para revisiones arquitectonicas.`;
/** Initialize the delegate tool executor (call once at startup). */
export function initDelegation(deps) {
    registerDelegateTool(async (args) => {
        const name = typeof args.agent_name === "string" ? args.agent_name : "";
        const task = typeof args.task === "string" ? args.task : "";
        const subAgent = getSubAgent(name);
        if (!subAgent) {
            return `Error: Unknown sub-agent "${name}". Check available agents.`;
        }
        if (!task.trim()) {
            return "Error: No task provided for delegation.";
        }
        logger.info("Delegating to sub-agent", { agent: name, task });
        // depth=1: delegate tool only available at depth 0 (main agent)
        return await runAgent(deps, 0, task, {
            depth: 1,
            systemPrompt: subAgent.systemPrompt,
            allowedTools: subAgent.tools,
        });
    });
}
/**
 * Main execution loop for the Agent's cognitive cycle (Identify -> Decide -> Act).
 *
 * @param deps - Dependency injection container encompassing LLM, Memory, Config.
 * @param userId - Telemetry tracking for persistent memory silos.
 * @param userMessage - Raw or pre-processed (e.g., Audio Transcribed) payload.
 * @param options - Overrides for sub-agent behavior (Depth, Restricted Tools).
 */
export async function runAgent(deps, userId, userMessage, options = {}) {
    const { llm, memory, config } = deps;
    const depth = options.depth ?? 0;
    const isSubAgent = depth > 0;
    // === Depth guard: prevent infinite recursion ===
    if (depth > MAX_DEPTH) {
        logger.error("Max recursion depth exceeded", { depth, MAX_DEPTH });
        return "Recursion limit reached. Cannot delegate further.";
    }
    // === Security Checkpoint 1: Input sanitization ===
    const input = sanitizeInput(userMessage);
    const trimmed = input.cleaned.trim();
    if (!trimmed) {
        return "I received an empty message. Could you try again?";
    }
    if (!input.safe) {
        logger.warn("Processing flagged input", { userId, reason: input.reason });
    }
    // V4 fix: await message save to prevent silent message loss
    if (!isSubAgent) {
        await memory.addMessage(userId, "user", trimmed);
    }
    // === Build system prompt with security hardening ===
    // Ecosystem hook: use composed prompt from agent.md when available
    let securePrompt;
    if (!isSubAgent && !options.systemPrompt && deps.ecosystem?.initialized) {
        const orchestrator = deps.ecosystem.agents.get("pristino-orchestrator");
        if (orchestrator) {
            // composeSystemPrompt already applies CP2 (buildSecurePrompt)
            securePrompt = composeSystemPrompt(orchestrator);
            logger.info("Using ecosystem-composed prompt", { agent: orchestrator.id });
        }
        else {
            securePrompt = buildSecurePrompt(BASE_SYSTEM_PROMPT);
        }
    }
    else {
        const rawPrompt = options.systemPrompt ?? BASE_SYSTEM_PROMPT;
        securePrompt = buildSecurePrompt(rawPrompt);
    }
    // === Load conversation history (main agent only) ===
    const messages = [{ role: "system", content: securePrompt }];
    // === MetodologIA Identity Injection (Brand Voice v3.0 & Phase 1) ===
    const METODOLOGIA_SYSTEM_ADDENDUM = `

Eres un Agente nativo del equipo MetodologIA. Tu voz de marca se basa en la consistencia de Minto, la evidencia honesta en tus aseveraciones instrumentables, y la entrega de acciones verificables por sobre promesas infladas. Tu filosofia ancla el Success as a Service. Disenas el contenido para un usuario decisor y operativo. Si una metrica, frase o texto no le permite comprender, decidir o accionar, eliminalo rotundamente.`;
    messages[0].content += METODOLOGIA_SYSTEM_ADDENDUM;
    // Read identity from Firestore user profile; fall back to hardcoded map
    const profile = await memory.getUserProfile(userId);
    const identityContext = profile?.identity
        ? `Contexto Identitario Impuesto: ${profile.identity}`
        : FALLBACK_IDENTITIES[userId] ?? "";
    if (identityContext) {
        messages.push({ role: "system", content: identityContext });
    }
    // V5 fix: inject synergy BEFORE trimHistory so token budget includes them
    if (!isSubAgent) {
        const preferences = await memory.getTeamPreferences();
        if (preferences.length > 0) {
            const prefText = `CURRENT TEAM PREFERENCES:\n- ${preferences.join("\n- ")}`;
            messages.push({ role: "system", content: prefText });
        }
        const synergyFacts = await memory.getSynergyFacts();
        if (synergyFacts.length > 0) {
            const synText = `SHARED KNOWLEDGE / SYNERGY FACTS:\n- ${synergyFacts.join("\n- ")}`;
            messages.push({ role: "system", content: synText });
        }
    }
    if (!isSubAgent) {
        const history = await memory.getRecentMessages(userId, config.maxHistory - 1); // leave space for current msg
        messages.push(...history.map((m) => ({
            role: m.role,
            content: m.content,
        })));
        // Explicitly push the current trimmed message
        messages.push({ role: "user", content: trimmed });
    }
    else {
        // Sub-agent gets only the delegated task
        messages.push({ role: "user", content: trimmed });
    }
    // === Token optimization: trim history to fit context budget ===
    // V5 fix: budget now accounts for identity + synergy injected above
    const budget = calculateBudget(config, securePrompt + METODOLOGIA_SYSTEM_ADDENDUM + identityContext);
    const historyMessages = messages.slice(1); // everything after system prompt
    const trimmedHistory = trimHistory(historyMessages, budget.available);
    messages.length = 1; // keep system prompt
    messages.push(...trimmedHistory);
    // === Select tools (sub-agents get restricted set, no delegation) ===
    const excludeDelegate = isSubAgent;
    let tools = getAllToolDefinitions(excludeDelegate);
    // Further filter for sub-agent allowed tools
    if (isSubAgent && options.allowedTools) {
        const allowed = new Set(options.allowedTools);
        tools = tools.filter((t) => allowed.has(t.function.name));
    }
    // === Agent loop ===
    try {
        for (let i = 0; i < config.maxIterations; i++) {
            logger.info("Cognition iteration started", { userId, iteration: i, historyLength: messages.length });
            const response = await llm.chat(messages, tools);
            logger.info("LLM responded", {
                userId,
                hasContent: !!response.content,
                toolCallCount: response.toolCalls?.length || 0
            });
            // No tool calls → final response
            if (!response.toolCalls || response.toolCalls.length === 0) {
                const text = response.content ?? "I have nothing to say.";
                // === Security Checkpoint 3: Output validation ===
                const output = validateOutput(text);
                if (!output.safe) {
                    logger.warn("Output flagged by security", { userId });
                }
                // Only main agent persists to memory
                if (!isSubAgent) {
                    await memory.addMessage(userId, "assistant", output.cleaned);
                }
                logger.info("Cognition loop finalized (content)", { userId });
                return output.cleaned;
            }
            // Append assistant's tool-calling message
            messages.push({
                role: "assistant",
                content: response.content,
                tool_calls: response.toolCalls,
            });
            // Cap tool calls per turn to prevent runaway execution
            const toolCallsToExecute = response.toolCalls.slice(0, MAX_TOOL_CALLS_PER_TURN);
            if (response.toolCalls.length > MAX_TOOL_CALLS_PER_TURN) {
                logger.warn("Tool calls capped", {
                    requested: response.toolCalls.length,
                    limit: MAX_TOOL_CALLS_PER_TURN,
                });
            }
            // Execute each tool call and append results
            logger.info("Executing tool calls", { userId, count: toolCallsToExecute.length });
            for (const toolCall of toolCallsToExecute) {
                let args = {};
                try {
                    args = JSON.parse(toolCall.function.arguments);
                }
                catch {
                    logger.warn("Failed to parse tool args", {
                        tool: toolCall.function.name,
                        raw: toolCall.function.arguments,
                    });
                }
                logger.info("Running tool", { userId, tool: toolCall.function.name });
                const result = await executeTool(toolCall.function.name, args);
                logger.info("Tool finished", { userId, tool: toolCall.function.name, resultPreview: result.slice(0, 100) });
                messages.push({
                    role: "tool",
                    tool_call_id: toolCall.id,
                    name: toolCall.function.name,
                    content: result,
                });
            }
        }
        // Loop exhausted
        const fallback = "I got stuck in a loop processing your request. Please try again.";
        if (!isSubAgent) {
            await memory.addMessage(userId, "assistant", fallback);
        }
        return fallback;
    }
    catch (err) {
        // --- CATASTROPHIC FAILURE HANDLING ---
        // TS-064: All LLM providers exhausted — surface a user-friendly outage message
        const errMsg = err instanceof Error ? err.message : String(err);
        if (errMsg.includes("All LLM providers exhausted")) {
            logger.warn("All providers unavailable — returning fallback to user", { userId, error: errMsg });
            return ALL_PROVIDERS_UNAVAILABLE_MESSAGE;
        }
        // Generic transient failure (Groq 500, network timeout, etc.)
        logger.error("Agent error", { userId, depth, error: err });
        return "Lo siento, la red neural ha experimentado un fallo transitorio. Por favor intenta de nuevo.";
    }
}
