import Groq from "groq-sdk";
import { logger } from "./logger.js";

/**
 * AUDIO TRANSCRIPTION — Groq Whisper integration.
 *
 * Downloads audio from Telegram's file API, transcribes via whisper-large-v3-turbo.
 * All processing is in-memory (no disk I/O) for Cloud Run compatibility.
 *
 * Trade-offs:
 * - Language forced to 'es' to prevent Whisper hallucinations on silence/noise.
 *   Non-Spanish audio will get degraded accuracy.
 * - Telegram bot API limits file downloads to 20MB; larger files fail at getFile().
 * - Single API key used (no rotation); if Whisper quota hits 429, transcription fails.
 *   Mitigation: bot.ts catches and returns a user-facing error message.
 */

export async function transcribeAudio(
  audioUrl: string,
  groqApiKey: string
): Promise<string> {
  const startTime = Date.now();
  logger.info("[AUDIO] Decoding buffer from Telegram egress gateway...");

  const response = await fetch(audioUrl);
  if (!response.ok) {
    logger.error(`[AUDIO] Telegram download failed: HTTP ${response.status}`);
    throw new Error(`Failed to download audio: ${response.statusText}`);
  }

  const contentLength = Number(response.headers.get("content-length") || 0);
  if (contentLength > 20 * 1024 * 1024) {
    throw new Error(`Audio file too large (${(contentLength / 1024 / 1024).toFixed(1)}MB > 20MB limit)`);
  }
  
  const blob = await response.blob();
  if (blob.size === 0) {
    throw new Error("Zero-byte audio payload received");
  }

  // Cast Blob to File for Groq SDK compatibility (Node 20+ feature)
  const file = new File([blob], "voice_note.ogg", { type: "audio/ogg" });
  logger.info(`[AUDIO] Buffer mounted in-memory (${(blob.size / 1024).toFixed(2)} KB). Initiating Groq Whisper V3 Turbo...`);

  const groq = new Groq({ apiKey: groqApiKey });
  
  try {
    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3-turbo",
      // Prompt acts as pseudo-RLHF forcing hesitation markers on low confidence
      prompt: "Transcribe con máxima fidelidad. Si hay palabras ambiguas o ruido, márcalas como [?palabra dudosa?]. No inventes texto en los silencios.",
      language: "es", 
      response_format: "json", // Enforce fixed JSON return schema
    });
    
    const elapsed = Date.now() - startTime;
    const text = transcription.text.trim();
    
    if (!text) {
      logger.warn("[AUDIO] Groq returned empty transcription (likely silence or noise).");
      return "";
    }

    logger.info("[AUDIO] Transcription Success", { 
      elapsedMs: elapsed, 
      chars: text.length 
    });

    return text;

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    logger.error("[AUDIO] Groq Whisper transcription failed", { error: msg });
    throw error;
  }
}
