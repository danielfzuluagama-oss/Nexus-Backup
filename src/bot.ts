import { Bot } from "grammy";
import type { AgentRuntime } from "./runtime.js";
import { runAgent, type AgentDeps } from "./agent.js";
import { formatForTelegram, splitMessageHtml, stripHtml } from "./format.js";
import { transcribeAudio } from "./audio.js";
import { sanitizeInput } from "./security.js";
import { getOperationalKnowledgeAccessor } from "./knowledge/accessor.js";
import type { OnboardingPack, ProcessModule } from "./knowledge/operational-kb.js";

/**
 * TELEGRAM GATEWAY — Multimodal ingress/egress and agent orchestration.
 *
 * Responsibilities: whitelist auth, media routing (audio/photo/document/animation),
 * agent timeout protection (env-configurable hard limit), and HTML fallback on Telegram parse errors.
 *
 * Trade-offs:
 * - Telegram's HTML parser rejects unbalanced tags; fallback to stripHtml() recovers delivery
 *   at the cost of formatting. This is preferable to message loss.
 * - agentDeps.ecosystem is resolved lazily via runtime.ecosystem getter so that ecosystem
 *   initialized after bot creation (in index.ts) is still available at message time.
 * - The timeout defaults to 120s and can be tuned via AGENT_TIMEOUT_MS. Long tasks should still
 *   be decomposed into faster operational or sub-agent steps whenever possible.
 */
const DEFAULT_AGENT_TIMEOUT_MS = 120_000;
const MIN_AGENT_TIMEOUT_MS = 15_000;
const OPERATIONAL_FAST_PATH_KEYWORDS = [
  "proceso",
  "process",
  "onboarding",
  "onboard",
  "workflow",
  "playbook",
  "fase",
  "fases",
  "gate",
  "gates",
  "asset",
  "assets",
  "sop",
  "sops",
  "riesgo",
  "riesgos",
  "risk",
  "risks",
  "rol",
  "roles",
  "owner",
  "owners",
  "responsable",
  "responsables",
  "entrada",
  "entradas",
  "salida",
  "salidas",
  "entregable",
  "deliverable",
  "presales",
];
const OPERATIONAL_ONBOARDING_KEYWORDS = [
  "onboarding",
  "onboard",
  "induccion",
  "induction",
  "nuevo integrante",
  "resumen",
  "summary",
];

function getAgentTimeoutMs(): number {
  const raw = Number(process.env.AGENT_TIMEOUT_MS);
  if (Number.isFinite(raw) && raw >= MIN_AGENT_TIMEOUT_MS) {
    return Math.floor(raw);
  }
  return DEFAULT_AGENT_TIMEOUT_MS;
}

function normalizeForMatching(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAnyKeyword(haystack: string, keywords: string[]): boolean {
  return keywords.some((keyword) => haystack.includes(keyword));
}

function detectProcessMention(
  normalizedMessage: string,
  modules: ProcessModule[],
): ProcessModule | null {
  let bestModule: ProcessModule | null = null;
  let bestScore = 0;

  for (const module of modules) {
    const candidates = [
      module.processId,
      module.processName,
      ...module.variants,
      ...module.relatedProcesses,
    ];

    for (const candidate of candidates) {
      const normalizedCandidate = normalizeForMatching(candidate);
      if (!normalizedCandidate) continue;

      let score = 0;
      if (normalizedMessage.includes(normalizedCandidate)) {
        score = 100 + normalizedCandidate.length;
      } else {
        const tokens = normalizedCandidate
          .split(" ")
          .map((token) => token.trim())
          .filter((token) => token.length >= 3);

        if (tokens.length > 0 && tokens.every((token) => normalizedMessage.includes(token))) {
          score = tokens.length * 10 + normalizedCandidate.length;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestModule = module;
      }
    }
  }

  return bestModule;
}

function inferAudienceRole(normalizedMessage: string): string {
  if (normalizedMessage.includes("cliente")) return "cliente";
  if (normalizedMessage.includes("implementador")) return "implementador";
  if (normalizedMessage.includes("pm")) return "pm";
  if (normalizedMessage.includes("ae")) return "ae";
  if (normalizedMessage.includes("lider")) return "lider";
  return "nuevo integrante";
}

function buildOperationalRisks(module: ProcessModule): string[] {
  const risks: string[] = [];

  if (module.status === "needs_attention") {
    risks.push("La documentacion del proceso sigue incompleta y requiere atencion antes de operar con autonomia.");
  }
  if (module.gates.length > 0) {
    risks.push("Saltar gates rompe la trazabilidad del proceso y puede invalidar el siguiente handoff.");
  }
  if (module.assets.length > 0) {
    risks.push("Usar assets desactualizados o incompletos puede deteriorar la calidad del entregable.");
  }
  if (module.sops.length > 0) {
    risks.push("Ejecutar sin SOP vigente aumenta el riesgo de desviaciones y retrabajo.");
  }

  if (risks.length === 0) {
    risks.push("Validar owner, evidencia y criterio de cierre antes de avanzar al siguiente hito.");
  }

  return risks.slice(0, 3);
}

function formatOnboardingFastPathReply(
  module: ProcessModule,
  pack: OnboardingPack,
): string {
  const riskText = buildOperationalRisks(module).join(" | ");
  const assetText =
    pack.essentialAssets.length > 0
      ? pack.essentialAssets.join(" | ")
      : module.assets.length > 0
        ? module.assets.slice(0, 6).join(" | ")
        : "No detecte assets esenciales explicitados en el modulo.";
  const sopText =
    pack.essentialSops.length > 0
      ? pack.essentialSops.join(" | ")
      : module.sops.length > 0
        ? module.sops.slice(0, 6).join(" | ")
        : "No detecte SOPs esenciales explicitados en el modulo.";
  const ownerText =
    module.owners.length > 0 ? module.owners.join(" | ") : "Owners no definidos en la fuente operativa.";

  return [
    `Respuesta directa del KB operativo para ${module.processName}.`,
    `Objetivo: ${pack.summary}`,
    module.phases.length > 0
      ? `Fases clave: ${module.phases.join(" | ")}`
      : `Walkthrough recomendado: ${pack.walkthrough.join(" | ")}`,
    `Roles u owners: ${ownerText}`,
    `Entradas y salidas operativas mas visibles: ${assetText}`,
    `Gates y SOPs clave: ${[...module.gates.slice(0, 4), ...pack.essentialSops.slice(0, 4)].join(" | ") || sopText}`,
    `Riesgos clave: ${riskText}`,
    `Preguntas de arranque: ${pack.firstQuestions.slice(0, 3).join(" | ")}`,
  ].join("\n");
}

function formatModuleFastPathReply(module: ProcessModule): string {
  return [
    `Respuesta directa del KB operativo para ${module.processName}.`,
    `Resumen: ${module.summary}`,
    module.phases.length > 0 ? `Fases: ${module.phases.join(" | ")}` : "Fases: no detectadas en el modulo.",
    module.owners.length > 0 ? `Owners: ${module.owners.join(" | ")}` : "Owners: no definidos en fuente.",
    module.gates.length > 0 ? `Gates: ${module.gates.join(" | ")}` : "Gates: no detectados.",
    module.assets.length > 0 ? `Assets clave: ${module.assets.slice(0, 6).join(" | ")}` : "Assets clave: no detectados.",
    module.sops.length > 0 ? `SOPs clave: ${module.sops.slice(0, 6).join(" | ")}` : "SOPs clave: no detectados.",
    `Riesgos clave: ${buildOperationalRisks(module).join(" | ")}`,
  ].join("\n");
}

async function tryOperationalFastPath(
  text: string,
  log: AgentRuntime["logger"],
): Promise<string | null> {
  const normalizedMessage = normalizeForMatching(text);
  if (!normalizedMessage) return null;
  if (!includesAnyKeyword(normalizedMessage, OPERATIONAL_FAST_PATH_KEYWORDS)) {
    return null;
  }

  try {
    const kb = await getOperationalKnowledgeAccessor();
    const modules = await kb.listProcesses();
    const module = detectProcessMention(normalizedMessage, modules);

    if (!module) {
      return null;
    }

    if (includesAnyKeyword(normalizedMessage, OPERATIONAL_ONBOARDING_KEYWORDS)) {
      const audienceRole = inferAudienceRole(normalizedMessage);
      const pack = await kb.createOnboardingPack(module.processId, audienceRole, text);
      if (pack) {
        log.info("Operational fast path resolved", {
          processId: module.processId,
          mode: "onboarding",
        });
        return formatOnboardingFastPathReply(module, pack);
      }
    }

    log.info("Operational fast path resolved", {
      processId: module.processId,
      mode: "module",
    });
    return formatModuleFastPathReply(module);
  } catch (error) {
    log.warn("Operational fast path skipped after lookup failure", {
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * Instantiates a Grammy Bot mapped to a specific AgentRuntime. 
 * This isolates bot state in multi-agent environments.
 */
export function createBot(runtime: AgentRuntime): Bot {
  const bot = new Bot(runtime.credentials.telegramBotToken);
  const log = runtime.logger;

  // Build dependency container; ecosystem resolved lazily so post-construction init is captured
  const getAgentDeps = (): AgentDeps => ({
    llm: runtime.llm,
    memory: runtime.memory,
    config: runtime.config,
    ecosystem: runtime.ecosystem ?? undefined,
  });

  /**
   * [QUOTA MONITORING LAYER]
   * Listen for quota exhaustion events from the LLM provider and notify all authorized users.
   */
  runtime.onQuotaExhausted = (owner, provider) => {
    const message = `⚠️ <b>AVISO DE CUOTA</b>\n\nLa cuota de API de <b>${owner}</b> (${provider}) se ha agotado para el agente <i>${runtime.instanceName}</i>. El sistema está conmutando automáticamente a la siguiente clave disponible en el pool.`;
    
    for (const userId of runtime.config.allowedUserIds) {
      bot.api.sendMessage(userId, message, { parse_mode: "HTML" }).catch(err => {
        log.error("Failed to send quota notification", { userId, error: err });
      });
    }
  };

  /**
   * [SECURITY LAYER: WHITELIST AUTHORIZATION]
   * Silently drops messages from unregistered User IDs to prevent unauthorized LLM usage.
   * Silent drops are cheaper and safer than explicit rejections (prevents enumeration).
   */
  bot.use(async (ctx, next) => {
    const userId = ctx.from?.id;
    log.info("Incoming update", { 
      updateId: ctx.update.update_id,
      userId, 
      username: ctx.from?.username,
      chatId: ctx.chat?.id,
      text: ctx.message?.text?.slice(0, 50)
    });

    if (!userId || !runtime.config.allowedUserIds.includes(userId)) {
      log.warn("Rejected unauthorized user or missing ID", { 
        userId, 
        allowedIds: runtime.config.allowedUserIds 
      });
      // Optionally notify the user in console but not in Telegram to avoid bot spamming
      return;
    }
    log.info("User authorized", { userId });
    await next();
  });

  // Handle all incoming messages (text, photos, gifs, etc.)
  bot.on("message", async (ctx) => {
    const userId = ctx.from.id;
    let text = ctx.message.text || ctx.message.caption || "";
    let pendingMsgId: number | null = null;

    // --- SKIP SERVICE MESSAGES ---
    // Telegram forum topics generate service messages (forum_topic_created, etc.)
    // that have no text and no media. These must be silently skipped.
    const msg = ctx.message as unknown as Record<string, unknown>;
    if (msg.forum_topic_created || msg.forum_topic_edited || msg.forum_topic_closed
        || msg.forum_topic_reopened || msg.general_forum_topic_hidden
        || msg.general_forum_topic_unhidden
        || msg.new_chat_members || msg.left_chat_member
        || msg.new_chat_title || msg.new_chat_photo || msg.delete_chat_photo
        || msg.group_chat_created || msg.pinned_message
        || msg.migrate_to_chat_id || msg.migrate_from_chat_id) {
      log.info("Skipping service message", { userId, type: Object.keys(msg).filter(k => typeof msg[k] !== 'undefined' && !['message_id','from','chat','date'].includes(k)).slice(0,3) });
      return;
    }

    // --- MULTIMODAL MIDDLEWARE (ROUTING & EXTRACTION) ---
    // Enter multimodal block if ANY media is present (voice/audio always override text).
    // After service message filter above, a no-text-no-media message is a sticker/contact/etc — safe to skip.
    const hasMedia = !!(ctx.message.voice || ctx.message.audio || ctx.message.photo || ctx.message.document || ctx.message.animation);
    if (hasMedia) {
      if (ctx.message.voice || ctx.message.audio) {
         try {
           const pendingReply = await ctx.reply("Extrayendo y transcribiendo audio...");
           pendingMsgId = pendingReply.message_id;

           const file = await ctx.getFile();
           if (file.file_path) {
             const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
             const transcript = await transcribeAudio(url, runtime.credentials.groqApiKeys[0].key);
                          // FORCED STRUCTURAL INJECTION to bypass LLM RLHF refusals and enforce the Secretariat UX:
              // V6 fix: sanitize transcript to prevent injection via audio content
              const sanitized = sanitizeInput(transcript || "Mudo o ininteligible");
              if (!sanitized.safe) {
                log.warn("Audio transcript flagged by security", { userId, reason: sanitized.reason });
              }
              text = `<SYSTEM_OVERRIDE>
CRÍTICO: ESTE ES UN AUDIO TRANSCRITO. ESTÁS OBLIGADO A PROCESARLO Y SEGUIR EL PROTOCOLO DE REFLEXIÓN MULTI-AGENTE.
NUNCA digas que no puedes leer multimedia.

[AUDIO TRANSCRITO]
"${sanitized.cleaned}"
</SYSTEM_OVERRIDE>`;

           } else {
             text = "[El sistema intentó descargar el audio, pero Telegram retuvo el archivo remoto]";
           }
         } catch (e) {
             log.error("Audio extraction or transcription failed", { userId, error: e });
             text = "[Fallo crítico en el motor de extracción de audio Groq Whisper]";
         }
      }
      else if (ctx.message.photo) {
         const photo = ctx.message.photo[ctx.message.photo.length - 1];
         const caption = ctx.message.caption || "";
         try {
            const file = await ctx.api.getFile(photo.file_id);
            if (!file.file_path) {
              text = "[Telegram retuvo la imagen; el archivo excede el limite de descarga del bot o no esta disponible]";
            } else {
              const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
              text = `<SYSTEM_OVERRIDE>
El usuario envio una IMAGEN.${caption ? ` Caption: "${caption}".` : ""}
URI: ${url}
Responde confirmando recepcion. Indica que la URI esta lista para inspeccion profunda via Vision si el usuario lo requiere. Sugiere una accion concreta.
</SYSTEM_OVERRIDE>`;
            }
         } catch(e) {
            text = "[Fallo en la extraccion de la URI de la imagen desde Telegram]";
         }
      } 
      else if (ctx.message.document) {
         const mime = ctx.message.document.mime_type || "desconocido";
         const name = ctx.message.document.file_name || "Documento";
         const caption = ctx.message.caption || "";
         try {
            const file = await ctx.api.getFile(ctx.message.document.file_id);
            if (!file.file_path) {
              text = `[El documento "${name}" excede el limite de descarga del bot de Telegram (20MB)]`;
            } else {
              const url = `https://api.telegram.org/file/bot${runtime.credentials.telegramBotToken}/${file.file_path}`;
              text = `<SYSTEM_OVERRIDE>
El usuario envio un DOCUMENTO: "${name}" (${mime}).${caption ? ` Nota: "${caption}".` : ""}
URI: ${url}
Confirma recepcion. Ofrece delegar a Document Intelligence para analisis profundo o extraccion de datos.
</SYSTEM_OVERRIDE>`;
            }
         } catch(e) {
            text = "[Fallo en la extraccion del documento desde los servidores de Telegram]";
         }
      }
      else if (ctx.message.animation) text = "[El usuario ha enviado un GIF animado, asúmelo como un gesto lúdico]";
      else text = "[Multimedia genérica no identificada]";
    }

    // --- AGENT COGNITION EXECUTION ---
    if (pendingMsgId) {
      // Changed UI to reflect the new 10x Qualitative Multi-Agent Loop
      await ctx.api.editMessageText(ctx.chat.id, pendingMsgId, "Audio transcrito. Iniciando Reflexión Agéntica Profunda y Síntesis...").catch(() => {});
    }

    // --- TIMEOUT PROTECTION CIRCUIT BREAKER ---
    // Forces the promise to resolve internally if the LLM/Agent gets stuck processing tools
    log.info("Running agent cognition...", { userId, textLength: text.length });
    const cognitionTask = (async () => {
      const directResponse = !hasMedia ? await tryOperationalFastPath(text, log) : null;
      if (directResponse) {
        return directResponse;
      }

      return runAgent(getAgentDeps(), userId, text);
    })();

    const timeoutMs = getAgentTimeoutMs();
    const result = await Promise.race([
      cognitionTask,
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error("Agent timeout")), timeoutMs)
      ),
    ]).catch((err) => {
      log.error("Message handling failed or timed out", { userId, error: err.message || err });
      return `Lo siento, la solicitud tardó demasiado en procesarse (Timeout ${Math.floor(timeoutMs / 1000)}s). Por favor intenta de nuevo.`;
    });

    log.info("Agent cognition complete", { userId, resultLength: result.length });

    // --- EGRESS FALLBACK & FORMATTING LOOP ---
    // Ensures robust message delivery even if Telegram's strict HTML parser fails
    const sendWithFallback = async (replyChunks: string[], useHtml = true) => {
      log.info("Sending response to Telegram...", { userId, chunkCount: replyChunks.length, useHtml });
      for (let i = 0; i < replyChunks.length; i++) {
        const chunk = replyChunks[i];
        try {
          if (useHtml) {
             await ctx.reply(chunk, { parse_mode: "HTML" });
          } else {
             await ctx.reply(chunk);
          }
          log.info("Sent chunk successfully", { userId, chunkIndex: i });
        } catch (err: unknown) {
             const errObj = err as { description?: string };
             log.error("Failed to send reply chunk", { userId, chunkIndex: i, error: err, chunkPreview: chunk.slice(0, 100) });
             
             if (useHtml && errObj?.description?.includes("can't parse entities")) {
                log.warn("Telegram HTML parse error, retrying as plain text", { userId });
                const plainChunk = stripHtml(chunk);
                await sendWithFallback([plainChunk], false);
             }
        }
      }
    };

    // Parse Markdown to Telegram-HTML
    const htmlFormatted = formatForTelegram(result);
    const chunks = splitMessageHtml(htmlFormatted);

    // Remove the tracking message to give a clean final output
    if (pendingMsgId) {
      await ctx.api.deleteMessage(ctx.chat.id, pendingMsgId).catch(() => {});
    }

    await sendWithFallback(chunks, true);
  });


  // Error handler
  bot.catch((err) => {
    log.error("Bot error", { error: err.error });
    err.ctx.reply("An error occurred. Please try again.").catch(() => {});
  });

  return bot;
}
