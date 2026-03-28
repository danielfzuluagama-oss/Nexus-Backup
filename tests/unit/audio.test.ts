// ============================================================================
// T050 — Unit tests for audio transcription
// Covers: TS-047, TS-048, TS-073
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — must be hoisted before imports
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

const mockTranscriptionsCreate = vi.fn();

vi.mock("groq-sdk", () => {
  function MockGroq(_opts: unknown) {
    return {
      audio: {
        transcriptions: {
          create: mockTranscriptionsCreate,
        },
      },
    };
  }
  return { default: MockGroq };
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a mock fetch response with the given status, body, and headers.
 */
function makeFetchResponse(
  ok: boolean,
  status: number,
  blobContent: string,
  contentLength?: number,
  statusText = "OK"
): Response {
  const blobData = new Blob([blobContent], { type: "audio/ogg" });
  const headers = new Headers();
  if (contentLength !== undefined) {
    headers.set("content-length", String(contentLength));
  }
  return {
    ok,
    status,
    statusText,
    headers,
    blob: vi.fn().mockResolvedValue(blobData),
  } as unknown as Response;
}

// ---------------------------------------------------------------------------
// Import SUT after mocks
// ---------------------------------------------------------------------------

import { transcribeAudio } from "../../src/audio.js";
import { logger } from "../../src/logger.js";

// ---------------------------------------------------------------------------
// TS-047: Voice message transcribed, text returned, routing info logged
// ---------------------------------------------------------------------------

describe("TS-047: successful transcription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("returns trimmed transcription text from Groq Whisper", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 1024)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "  Hola mundo  " });

    const result = await transcribeAudio("https://example.com/audio.ogg", "test-key");

    expect(result).toBe("Hola mundo");
  });

  it("calls Groq with whisper-large-v3-turbo model", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "Texto transcrito" });

    await transcribeAudio("https://example.com/audio.ogg", "my-api-key");

    expect(mockTranscriptionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ model: "whisper-large-v3-turbo" })
    );
  });

  it("calls Groq with language 'es'", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "Texto transcrito" });

    await transcribeAudio("https://example.com/audio.ogg", "my-api-key");

    expect(mockTranscriptionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ language: "es" })
    );
  });

  it("logs success with elapsed time and char count", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "Respuesta de voz" });

    await transcribeAudio("https://example.com/audio.ogg", "key");

    expect(logger.info).toHaveBeenCalledWith(
      "[AUDIO] Transcription Success",
      expect.objectContaining({ elapsedMs: expect.any(Number), chars: 16 })
    );
  });

  it("passes the audio URL to fetch for download", async () => {
    const audioUrl = "https://api.telegram.org/file/botTOKEN/voice/audio.ogg";
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "Hola" });

    await transcribeAudio(audioUrl, "key");

    expect(fetch).toHaveBeenCalledWith(audioUrl);
  });

  it("returns empty string for silence (empty transcription)", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "   " });

    const result = await transcribeAudio("https://example.com/audio.ogg", "key");

    expect(result).toBe("");
    expect(logger.warn).toHaveBeenCalledWith(
      expect.stringContaining("[AUDIO]")
    );
  });
});

// ---------------------------------------------------------------------------
// TS-048: Transcription service unavailable — error thrown
// ---------------------------------------------------------------------------

describe("TS-048: transcription service unavailable", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("throws when Groq returns a 429 (quota exhausted)", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    const rateLimitError = new Error("Rate limit exceeded");
    mockTranscriptionsCreate.mockRejectedValue(rateLimitError);

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow(
      "Rate limit exceeded"
    );
  });

  it("logs the Groq error before re-throwing", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockRejectedValue(new Error("Service unavailable"));

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      "[AUDIO] Groq Whisper transcription failed",
      expect.objectContaining({ error: "Service unavailable" })
    );
  });

  it("throws when Telegram download fails (HTTP 403)", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(false, 403, "", 0, "Forbidden")
    );

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow(
      "Failed to download audio: Forbidden"
    );
  });

  it("logs HTTP download failure before throwing", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(false, 500, "", 0, "Internal Server Error")
    );

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow();

    expect(logger.error).toHaveBeenCalledWith(
      "[AUDIO] Telegram download failed: HTTP 500"
    );
  });

  it("throws when audio payload is zero bytes", async () => {
    const emptyBlob = new Blob([], { type: "audio/ogg" });
    const response = {
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers({ "content-length": "0" }),
      blob: vi.fn().mockResolvedValue(emptyBlob),
    } as unknown as Response;
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(response);

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow(
      "Zero-byte audio payload received"
    );
  });

  it("throws when file exceeds 20MB limit", async () => {
    const oversizeBytes = 21 * 1024 * 1024;
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "data", oversizeBytes)
    );

    await expect(transcribeAudio("https://example.com/audio.ogg", "key")).rejects.toThrow(
      /20MB limit/
    );
  });

  it("throws when Groq API key is invalid (401)", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio-data", 512)
    );
    mockTranscriptionsCreate.mockRejectedValue(new Error("Invalid API key"));

    await expect(transcribeAudio("https://example.com/audio.ogg", "bad-key")).rejects.toThrow(
      "Invalid API key"
    );
  });
});

// ---------------------------------------------------------------------------
// TS-073: Non-Spanish voice — language forced to 'es' per implementation
// The production trade-off documented in audio.ts: language is forced to 'es'
// to prevent Whisper hallucinations. Non-Spanish audio gets degraded accuracy
// but transcription proceeds with whatever Whisper returns.
// ---------------------------------------------------------------------------

describe("TS-073: non-Spanish audio transcription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  it("always uses language='es' regardless of input audio language", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "english-audio", 1024)
    );
    // Whisper transcribes English content even though language='es' is forced
    mockTranscriptionsCreate.mockResolvedValue({
      text: "Hello, this is English audio content",
    });

    const result = await transcribeAudio("https://example.com/english.ogg", "key");

    // Language param is always 'es' (hardcoded in implementation)
    expect(mockTranscriptionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({ language: "es" })
    );
    // Transcription returns whatever Whisper produced
    expect(result).toBe("Hello, this is English audio content");
  });

  it("transcription result is returned as-is (no language validation)", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({
      text: "Bonjour, comment ça va?",
    });

    const result = await transcribeAudio("https://example.com/french.ogg", "key");

    expect(result).toBe("Bonjour, comment ça va?");
  });

  it("uncertainty markers appear in result when Whisper includes them", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({
      text: "El cliente dijo [?palabra dudosa?] sobre el contrato",
    });

    const result = await transcribeAudio("https://example.com/audio.ogg", "key");

    expect(result).toContain("[?palabra dudosa?]");
  });

  it("prompt instructs Whisper to mark ambiguous words", async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      makeFetchResponse(true, 200, "audio", 512)
    );
    mockTranscriptionsCreate.mockResolvedValue({ text: "Texto claro" });

    await transcribeAudio("https://example.com/audio.ogg", "key");

    expect(mockTranscriptionsCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        prompt: expect.stringContaining("ambiguas"),
      })
    );
  });
});
