// ============================================================================
// Unit tests for src/bot.ts — Grammy bot middleware
// Covers:
//   - Unauthorized user filtering (whitelist)
//   - Service message skipping
//   - Text message routing through agent
//   - Voice/audio message handling
//   - Photo message handling
//   - Document message handling
//   - Animation handling
//   - Agent timeout fallback
//   - HTML parse error fallback (strip HTML)
//   - Error handler
//   - onQuotaExhausted notification
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Hoisted shared state — safe to reference inside vi.mock factories
// ---------------------------------------------------------------------------

const {
  capturedMiddleware,
  capturedMessageHandlerRef,
  capturedErrorHandlerRef,
  mockSendMessage,
  mockGetFile,
  mockEditMessageText,
  mockDeleteMessage
} = vi.hoisted(() => {
  const capturedMiddleware: Array<(ctx: unknown, next?: () => Promise<void>) => Promise<void>> = [];
  const capturedMessageHandlerRef = { fn: null as ((ctx: unknown) => Promise<void>) | null };
  const capturedErrorHandlerRef = { fn: null as ((err: unknown) => void) | null };
  const mockSendMessage = vi.fn().mockResolvedValue({ message_id: 99 });
  const mockGetFile = vi.fn().mockResolvedValue({ file_id: "abc", file_path: "path/to/file.ogg" });
  const mockEditMessageText = vi.fn().mockResolvedValue({});
  const mockDeleteMessage = vi.fn().mockResolvedValue({});
  return {
    capturedMiddleware,
    capturedMessageHandlerRef,
    capturedErrorHandlerRef,
    mockSendMessage,
    mockGetFile,
    mockEditMessageText,
    mockDeleteMessage,
  };
});

// ---------------------------------------------------------------------------
// Module mocks — declared before any imports
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
  createLogger: vi.fn(() => ({
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  })),
}));

vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([{}]),
  cert: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn().mockReturnValue({}),
  FieldValue: { serverTimestamp: vi.fn(), arrayUnion: vi.fn(), increment: vi.fn() },
  Firestore: class {},
}));

vi.mock("../../src/security.js", () => ({
  sanitizeInput: vi.fn((s: string) => ({ safe: true, cleaned: s, reason: "" })),
  buildSecurePrompt: vi.fn((s: string) => s),
  validateOutput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
}));

vi.mock("../../src/audio.js", () => ({
  transcribeAudio: vi.fn().mockResolvedValue("transcribed text"),
}));

vi.mock("../../src/format.js", () => ({
  formatForTelegram: vi.fn((s: string) => s),
  splitMessageHtml: vi.fn((s: string) => [s]),
  stripHtml: vi.fn((s: string) => s.replace(/<[^>]*>/g, "")),
}));

vi.mock("../../src/agent.js", () => ({
  runAgent: vi.fn().mockResolvedValue("agent response"),
}));

// Grammy mock — uses hoisted state so it's available at hoist time
vi.mock("grammy", () => {
  const BotMock = function(this: unknown) {
    (this as Record<string, unknown>).api = {
      sendMessage: mockSendMessage,
      getFile: mockGetFile,
      editMessageText: mockEditMessageText,
      deleteMessage: mockDeleteMessage,
    };
    (this as Record<string, unknown>).use = (fn: (ctx: unknown, next?: () => Promise<void>) => Promise<void>) => {
      capturedMiddleware.push(fn);
    };
    (this as Record<string, unknown>).on = (_event: string, fn: (ctx: unknown) => Promise<void>) => {
      capturedMessageHandlerRef.fn = fn;
    };
    (this as Record<string, unknown>).catch = (fn: (err: unknown) => void) => {
      capturedErrorHandlerRef.fn = fn;
    };
  };
  return { Bot: BotMock };
});

// ---------------------------------------------------------------------------
// Imports (after mocks)
// ---------------------------------------------------------------------------

import { createBot } from "../../src/bot.js";
import type { AgentRuntime } from "../../src/runtime.js";
import { runAgent } from "../../src/agent.js";
import { transcribeAudio } from "../../src/audio.js";
import { stripHtml } from "../../src/format.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeRuntime(allowedUserIds: number[] = [18219468]): AgentRuntime {
  const log = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  };
  return {
    credentials: {
      telegramBotToken: "test-bot-token",
      groqApiKeys: [{ key: "groq-key", owner: "OWNER" }],
      openRouterApiKeys: [],
    },
    config: {
      allowedUserIds,
      maxIterations: 5,
      maxHistory: 20,
    },
    llm: {},
    memory: {},
    logger: log,
    ecosystem: null,
    instanceName: "pristino",
    onQuotaExhausted: undefined,
  } as unknown as AgentRuntime;
}

/** Build a minimal Grammy context object */
function makeCtx(overrides: Record<string, unknown> = {}) {
  return {
    from: { id: 18219468, username: "test_user" },
    chat: { id: 18219468 },
    update: { update_id: 1 },
    message: {
      text: "Hello bot",
      message_id: 42,
      ...((overrides.message as Record<string, unknown>) ?? {}),
    },
    reply: vi.fn().mockResolvedValue({ message_id: 100 }),
    getFile: vi.fn().mockResolvedValue({ file_path: "path/to/file.ogg" }),
    api: {
      sendMessage: mockSendMessage,
      getFile: mockGetFile,
      editMessageText: mockEditMessageText,
      deleteMessage: mockDeleteMessage,
    },
    ...overrides,
  };
}

/** Run the authorization middleware against a ctx. Returns true if next() was called. */
async function runAuthMiddleware(
  ctx: ReturnType<typeof makeCtx>
): Promise<boolean> {
  const authMiddleware = capturedMiddleware[capturedMiddleware.length - 1]; // most recently registered
  let nextCalled = false;
  await authMiddleware(ctx, async () => {
    nextCalled = true;
  });
  return nextCalled;
}

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  capturedMiddleware.length = 0;
  capturedMessageHandlerRef.fn = null;
  capturedErrorHandlerRef.fn = null;
  // Reset mock call history (do NOT use clearAllMocks — it clears fn implementations)
  vi.mocked(runAgent).mockReset();
  vi.mocked(runAgent).mockResolvedValue("agent response");
  mockSendMessage.mockReset();
  mockSendMessage.mockResolvedValue({ message_id: 99 });
  mockGetFile.mockReset();
  mockGetFile.mockResolvedValue({ file_id: "abc", file_path: "path/to/file.ogg" });
  mockEditMessageText.mockReset();
  mockEditMessageText.mockResolvedValue({});
  mockDeleteMessage.mockReset();
  mockDeleteMessage.mockResolvedValue({});
  vi.mocked(transcribeAudio).mockReset();
  vi.mocked(transcribeAudio).mockResolvedValue("transcribed text");
  vi.mocked(stripHtml).mockReset();
  vi.mocked(stripHtml).mockImplementation((s: string) => s.replace(/<[^>]*>/g, ""));
});

// ---------------------------------------------------------------------------
// createBot factory
// ---------------------------------------------------------------------------

describe("createBot", () => {
  it("returns a bot instance", () => {
    const runtime = makeRuntime();
    const bot = createBot(runtime);
    expect(bot).toBeDefined();
  });

  it("registers a use() middleware (auth layer)", () => {
    const runtime = makeRuntime();
    createBot(runtime);
    expect(capturedMiddleware.length).toBeGreaterThan(0);
  });

  it("registers a message handler via bot.on", () => {
    const runtime = makeRuntime();
    createBot(runtime);
    expect(capturedMessageHandlerRef.fn).not.toBeNull();
  });

  it("registers an error handler via bot.catch", () => {
    const runtime = makeRuntime();
    createBot(runtime);
    expect(capturedErrorHandlerRef.fn).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Authorization middleware
// ---------------------------------------------------------------------------

describe("Authorization middleware", () => {
  it("allows authorized users through to next()", async () => {
    const runtime = makeRuntime([18219468]);
    createBot(runtime);

    const ctx = makeCtx();
    const allowed = await runAuthMiddleware(ctx);
    expect(allowed).toBe(true);
  });

  it("blocks unauthorized users (silent drop)", async () => {
    const runtime = makeRuntime([999999]);
    createBot(runtime);

    const ctx = makeCtx({ from: { id: 88888, username: "unknown" } });
    const allowed = await runAuthMiddleware(ctx);
    expect(allowed).toBe(false);
  });

  it("blocks messages with no userId", async () => {
    const runtime = makeRuntime([18219468]);
    createBot(runtime);

    const ctx = makeCtx({ from: undefined });
    const allowed = await runAuthMiddleware(ctx);
    expect(allowed).toBe(false);
  });

  it("logs warning when user is unauthorized", async () => {
    const runtime = makeRuntime([999]);
    createBot(runtime);

    const ctx = makeCtx({ from: { id: 123, username: "hacker" } });
    await runAuthMiddleware(ctx);
    expect(runtime.logger.warn).toHaveBeenCalled();
  });

  it("logs info when user is authorized", async () => {
    const runtime = makeRuntime([18219468]);
    createBot(runtime);

    const ctx = makeCtx();
    await runAuthMiddleware(ctx);
    expect(runtime.logger.info).toHaveBeenCalledWith(
      expect.stringMatching(/authorized/i),
      expect.any(Object)
    );
  });
});

// ---------------------------------------------------------------------------
// Message handler — text messages
// ---------------------------------------------------------------------------

describe("Message handler — text messages", () => {
  it("processes a plain text message through the agent", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({ message: { text: "What is the weather?", message_id: 1 } });
    await capturedMessageHandlerRef.fn!(ctx);

    expect(vi.mocked(runAgent)).toHaveBeenCalledWith(
      expect.objectContaining({ llm: runtime.llm }),
      18219468,
      "What is the weather?"
    );
  });

  it("sends agent response back via ctx.reply", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    vi.mocked(runAgent).mockResolvedValueOnce("Final answer from agent");
    const ctx = makeCtx({ message: { text: "Hello", message_id: 1 } });
    await capturedMessageHandlerRef.fn!(ctx);

    expect(ctx.reply).toHaveBeenCalledWith("Final answer from agent", { parse_mode: "HTML" });
  });

  it("sends message with no text (empty string) to agent", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({ message: { message_id: 3 } }); // no text, no media
    await capturedMessageHandlerRef.fn!(ctx);

    // Should still proceed and call the agent (no service message triggers)
    expect(vi.mocked(runAgent)).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Message handler — service messages (skip)
// ---------------------------------------------------------------------------

describe("Message handler — service messages", () => {
  const serviceMessageTypes = [
    "forum_topic_created",
    "forum_topic_edited",
    "forum_topic_closed",
    "forum_topic_reopened",
    "new_chat_members",
    "left_chat_member",
    "new_chat_title",
    "group_chat_created",
    "pinned_message",
    "migrate_to_chat_id",
    "migrate_from_chat_id",
    "general_forum_topic_hidden",
    "general_forum_topic_unhidden",
  ];

  for (const serviceType of serviceMessageTypes) {
    it(`skips service message: ${serviceType}`, async () => {
      const runtime = makeRuntime();
      createBot(runtime);

      const ctx = makeCtx({
        message: { [serviceType]: {}, message_id: 5 },
      });
      await capturedMessageHandlerRef.fn!(ctx);

      expect(vi.mocked(runAgent)).not.toHaveBeenCalled();
      expect(ctx.reply).not.toHaveBeenCalled();
    });
  }
});

// ---------------------------------------------------------------------------
// Message handler — voice/audio
// ---------------------------------------------------------------------------

describe("Message handler — voice/audio messages", () => {
  it("handles voice message: sends transcription pending reply, calls transcribeAudio", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { voice: { file_id: "voice123", duration: 5 }, message_id: 10 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 77 });

    await capturedMessageHandlerRef.fn!(ctx);

    expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining("transcrib"));
    expect(vi.mocked(transcribeAudio)).toHaveBeenCalled();
    expect(vi.mocked(runAgent)).toHaveBeenCalled();
  });

  it("handles audio message the same as voice", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { audio: { file_id: "audio456", duration: 10 }, message_id: 11 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 78 });

    await capturedMessageHandlerRef.fn!(ctx);

    expect(vi.mocked(transcribeAudio)).toHaveBeenCalled();
  });

  it("handles audio extraction failure gracefully", async () => {
    vi.mocked(transcribeAudio).mockRejectedValueOnce(new Error("Groq API error"));

    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { voice: { file_id: "bad_voice" }, message_id: 12 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 79 });

    await capturedMessageHandlerRef.fn!(ctx);

    // Should still call agent with error text
    expect(vi.mocked(runAgent)).toHaveBeenCalled();
    const call = vi.mocked(runAgent).mock.calls[0];
    expect(call[2]).toContain("Fallo");
  });

  it("handles case where file_path is missing after getFile()", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { voice: { file_id: "missing_path" }, message_id: 13 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 80 });
    ctx.getFile = vi.fn().mockResolvedValue({ file_path: null });

    await capturedMessageHandlerRef.fn!(ctx);

    const call = vi.mocked(runAgent).mock.calls[0];
    expect(call[2]).toContain("retuvo el archivo");
  });

  it("wraps transcript in SYSTEM_OVERRIDE template", async () => {
    vi.mocked(transcribeAudio).mockResolvedValueOnce("Buy me a ticket");

    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { voice: { file_id: "v1" }, message_id: 14 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 81 });
    ctx.getFile = vi.fn().mockResolvedValue({ file_path: "files/v1.ogg" });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("SYSTEM_OVERRIDE");
    expect(agentText).toContain("Buy me a ticket");
  });

  it("edits pending message after audio transcription", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { voice: { file_id: "v2" }, message_id: 15 },
    });
    ctx.reply = vi.fn().mockResolvedValue({ message_id: 88 });
    ctx.getFile = vi.fn().mockResolvedValue({ file_path: "files/v2.ogg" });

    await capturedMessageHandlerRef.fn!(ctx);

    expect(mockEditMessageText).toHaveBeenCalled();
    expect(mockDeleteMessage).toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Message handler — photo
// ---------------------------------------------------------------------------

describe("Message handler — photo messages", () => {
  it("handles photo and passes image URL to agent", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        photo: [
          { file_id: "small", width: 100, height: 100 },
          { file_id: "large", width: 800, height: 600 },
        ],
        caption: "Check this out",
        message_id: 20,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_id: "large", file_path: "photos/large.jpg" });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("IMAGEN");
    expect(agentText).toContain("photos/large.jpg");
    expect(agentText).toContain("Check this out");
  });

  it("handles photo when file_path is null", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        photo: [{ file_id: "large", width: 800, height: 600 }],
        message_id: 21,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_path: null });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("retuvo");
  });

  it("handles photo API error gracefully", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        photo: [{ file_id: "bad", width: 800, height: 600 }],
        message_id: 22,
      },
    });
    mockGetFile.mockRejectedValueOnce(new Error("API Error"));

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("Fallo");
  });

  it("photo without caption produces text without caption string", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        photo: [{ file_id: "p1", width: 400, height: 300 }],
        message_id: 23,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_path: "photos/p1.jpg" });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("IMAGEN");
    expect(agentText).not.toContain("Caption:");
  });
});

// ---------------------------------------------------------------------------
// Message handler — document
// ---------------------------------------------------------------------------

describe("Message handler — document messages", () => {
  it("handles document and passes document URL to agent", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        document: { file_id: "doc1", file_name: "report.pdf", mime_type: "application/pdf" },
        caption: "Q4 report",
        message_id: 30,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_path: "docs/report.pdf" });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("DOCUMENTO");
    expect(agentText).toContain("report.pdf");
    expect(agentText).toContain("application/pdf");
    expect(agentText).toContain("Q4 report");
  });

  it("handles document when file_path is null", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        document: { file_id: "doc2", file_name: "big.pdf", mime_type: "application/pdf" },
        message_id: 31,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_path: null });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("excede el limite");
  });

  it("handles document API error gracefully", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        document: { file_id: "doc3", file_name: "broken.pdf" },
        message_id: 32,
      },
    });
    mockGetFile.mockRejectedValueOnce(new Error("Telegram error"));

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("Fallo");
  });

  it("handles document without caption", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: {
        document: { file_id: "doc4", file_name: "data.csv", mime_type: "text/csv" },
        message_id: 33,
      },
    });
    mockGetFile.mockResolvedValueOnce({ file_path: "docs/data.csv" });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("data.csv");
  });
});

// ---------------------------------------------------------------------------
// Message handler — animation
// ---------------------------------------------------------------------------

describe("Message handler — animation messages", () => {
  it("handles animation with a placeholder text", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const ctx = makeCtx({
      message: { animation: { file_id: "gif1" }, message_id: 40 },
    });

    await capturedMessageHandlerRef.fn!(ctx);

    const agentText = vi.mocked(runAgent).mock.calls[0][2] as string;
    expect(agentText).toContain("GIF");
  });
});

// ---------------------------------------------------------------------------
// Message handler — agent timeout
// ---------------------------------------------------------------------------

describe("Message handler — agent timeout", () => {
  it("returns timeout message when agent exceeds 60s", async () => {
    vi.useFakeTimers();
    const runtime = makeRuntime();
    createBot(runtime);

    // Make runAgent never resolve
    vi.mocked(runAgent).mockImplementation(
      () => new Promise(() => {}) // never resolves
    );

    const ctx = makeCtx({ message: { text: "slow query", message_id: 50 } });
    const messagePromise = capturedMessageHandlerRef.fn!(ctx);

    // Advance past the 60s timeout
    vi.advanceTimersByTime(61_000);
    await messagePromise;

    const sentText = (ctx.reply as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(sentText).toContain("Timeout");

    vi.useRealTimers();
  });
});

// ---------------------------------------------------------------------------
// Message handler — HTML fallback
// ---------------------------------------------------------------------------

describe("Message handler — HTML parse error fallback", () => {
  it("retries with plain text when Telegram rejects HTML", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    vi.mocked(runAgent).mockResolvedValueOnce("<b>Bold response</b>");

    const htmlError = Object.assign(new Error("can't parse entities"), {
      description: "Bad Request: can't parse entities",
    });

    const ctx = makeCtx({ message: { text: "hi", message_id: 60 } });
    ctx.reply = vi.fn()
      .mockRejectedValueOnce(htmlError) // first call with HTML fails
      .mockResolvedValue({}); // retry with plain text succeeds

    await capturedMessageHandlerRef.fn!(ctx);

    expect(vi.mocked(stripHtml)).toHaveBeenCalled();
    // reply called twice: first with HTML, then with plain text
    expect((ctx.reply as ReturnType<typeof vi.fn>).mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it("does not retry when error is not HTML parse error", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    vi.mocked(runAgent).mockResolvedValueOnce("Simple response");

    const networkError = Object.assign(new Error("network error"), {
      description: "Network Error",
    });

    const ctx = makeCtx({ message: { text: "hi2", message_id: 61 } });
    ctx.reply = vi.fn().mockRejectedValueOnce(networkError);

    // Should not throw, should handle gracefully
    await expect(capturedMessageHandlerRef.fn!(ctx)).resolves.not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// Error handler
// ---------------------------------------------------------------------------

describe("Error handler", () => {
  it("logs errors from bot.catch", () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const errorCtx = { reply: vi.fn().mockResolvedValue({}) };
    const fakeErr = { error: new Error("boom"), ctx: errorCtx };

    capturedErrorHandlerRef.fn!(fakeErr);

    expect(runtime.logger.error).toHaveBeenCalledWith("Bot error", expect.any(Object));
  });

  it("sends error reply from bot.catch", async () => {
    const runtime = makeRuntime();
    createBot(runtime);

    const errorCtx = { reply: vi.fn().mockResolvedValue({}) };
    const fakeErr = { error: new Error("crash"), ctx: errorCtx };

    capturedErrorHandlerRef.fn!(fakeErr);
    // Allow the async reply to settle
    await new Promise((r) => setTimeout(r, 0));

    expect(errorCtx.reply).toHaveBeenCalledWith("An error occurred. Please try again.");
  });
});

// ---------------------------------------------------------------------------
// onQuotaExhausted notification
// ---------------------------------------------------------------------------

describe("onQuotaExhausted notification", () => {
  it("broadcasts quota warning to all allowed users", () => {
    const runtime = makeRuntime([111, 222, 333]);
    createBot(runtime);

    runtime.onQuotaExhausted!("OWNER1", "groq");

    expect(mockSendMessage).toHaveBeenCalledTimes(3);
    expect(mockSendMessage).toHaveBeenCalledWith(
      111,
      expect.stringContaining("CUOTA"),
      expect.any(Object)
    );
    expect(mockSendMessage).toHaveBeenCalledWith(222, expect.any(String), expect.any(Object));
    expect(mockSendMessage).toHaveBeenCalledWith(333, expect.any(String), expect.any(Object));
  });

  it("includes owner and provider in quota notification", () => {
    const runtime = makeRuntime([42]);
    createBot(runtime);

    runtime.onQuotaExhausted!("BusinessOwner", "openrouter");

    const sentText = mockSendMessage.mock.calls[0][1] as string;
    expect(sentText).toContain("BusinessOwner");
    expect(sentText).toContain("openrouter");
  });

  it("logs error when sendMessage fails for a user", async () => {
    const runtime = makeRuntime([42]);
    createBot(runtime);

    mockSendMessage.mockRejectedValueOnce(new Error("Telegram error"));

    runtime.onQuotaExhausted!("OWNER", "groq");
    await new Promise((r) => setTimeout(r, 10));

    expect(runtime.logger.error).toHaveBeenCalledWith(
      "Failed to send quota notification",
      expect.any(Object)
    );
  });
});
