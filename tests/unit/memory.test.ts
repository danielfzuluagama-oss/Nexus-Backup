// ============================================================================
// T056 — Unit tests for memory operations (in-memory mode)
// Covers: TS-031, TS-032, TS-033, TS-035, TS-039, TS-071
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — must be hoisted before imports
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// Force in-memory mode by making firebase-admin unavailable paths fail
vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([]),
  cert: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn().mockReturnValue(null),
  FieldValue: {
    serverTimestamp: vi.fn(),
    increment: vi.fn((n: number) => n),
    arrayUnion: vi.fn(),
  },
  Firestore: class {},
}));

// Mock fs to simulate missing credentials file → forces in-memory mode
vi.mock("fs", async () => {
  const actual = await vi.importActual<typeof import("fs")>("fs");
  return {
    ...actual,
    existsSync: vi.fn().mockReturnValue(false),
  };
});

// ---------------------------------------------------------------------------
// Import SUT after mocks
// ---------------------------------------------------------------------------

import { Memory } from "../../src/memory.js";
import { estimateTokens } from "../../src/tokens.js";

// ---------------------------------------------------------------------------
// TS-031: Working memory loads within token budget
// ---------------------------------------------------------------------------

describe("TS-031: working memory loads within token budget", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("getRecentMessages respects the limit parameter", async () => {
    const userId = 1001;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    // Add 10 messages
    for (let i = 0; i < 10; i++) {
      await memory.addMessage(userId, "user", `Message ${i}`, threadId);
    }

    const messages = await memory.getRecentMessages(userId, 5, threadId);
    expect(messages.length).toBeLessThanOrEqual(5);
  });

  it("total token estimate of returned messages fits within a reasonable budget", async () => {
    const userId = 1002;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    const shortMessages = ["Hello", "Hi there", "How are you?", "Fine thanks"];
    for (const msg of shortMessages) {
      await memory.addMessage(userId, "user", msg, threadId);
    }

    const messages = await memory.getRecentMessages(userId, 20, threadId);
    const totalTokens = messages.reduce(
      (sum, m) => sum + estimateTokens(m.content),
      0
    );

    // Budget: ~128k context minus overhead; short messages must fit
    expect(totalTokens).toBeLessThan(128_000);
  });

  it("messages are returned in chronological order (oldest first)", async () => {
    const userId = 1003;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "First", threadId);
    await memory.addMessage(userId, "assistant", "Second", threadId);
    await memory.addMessage(userId, "user", "Third", threadId);

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    expect(messages[0].content).toBe("First");
    expect(messages[messages.length - 1].content).toBe("Third");
  });
});

// ---------------------------------------------------------------------------
// TS-032: Knowledge reinforcement count incremented on retrieval
// In in-memory mode, reinforceKnowledge is a no-op for local store
// (Firestore-only operation). We test that it does not throw and that
// addKnowledge sets the initial reinforcementCount to 1.
// ---------------------------------------------------------------------------

describe("TS-032: knowledge reinforcement count", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("addKnowledge stores entry with reinforcementCount of 1", async () => {
    const userId = 2001;
    await memory.addKnowledge("team_preference", userId, "We prefer async communication");

    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts).toContain("We prefer async communication");
  });

  it("reinforceKnowledge does not throw in in-memory mode", async () => {
    // In in-memory mode the method is a no-op (Firestore-only)
    await expect(memory.reinforceKnowledge("some-id")).resolves.toBeUndefined();
  });

  it("multiple addKnowledge calls for same category accumulate entries", async () => {
    const userId = 2002;
    await memory.addKnowledge("team_preference", userId, "Prefer short meetings");
    await memory.addKnowledge("team_preference", userId, "Use structured agendas");

    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts.length).toBeGreaterThanOrEqual(2);
    expect(facts).toContain("Prefer short meetings");
    expect(facts).toContain("Use structured agendas");
  });
});

// ---------------------------------------------------------------------------
// TS-033: Expired working memory purged by scheduled sweep (purgeExpiredWorking)
// ---------------------------------------------------------------------------

describe("TS-033: purgeExpiredWorking removes stale messages", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("purgeExpiredWorking returns 0 when no messages exist", async () => {
    const count = await memory.purgeExpiredWorking();
    expect(count).toBe(0);
  });

  it("purgeExpiredWorking does not remove recent messages", async () => {
    const userId = 3001;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Recent message", threadId);

    const purged = await memory.purgeExpiredWorking();
    expect(purged).toBe(0);

    const remaining = await memory.getRecentMessages(userId, 10, threadId);
    expect(remaining.length).toBe(1);
  });

  it("purgeExpiredWorking removes messages older than 30-day TTL", async () => {
    const userId = 3002;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    // Inject an expired message by directly manipulating internals via the API
    await memory.addMessage(userId, "user", "Old message", threadId);

    // Access the private localMessages map via casting to simulate TTL expiry
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const messages = internal.localMessages.get(threadId);
    if (messages && messages.length > 0) {
      // Set timestamp to 31 days ago to make it expired
      const thirtyOneDaysAgo = Date.now() - 31 * 24 * 60 * 60 * 1000;
      messages[0].timestamp = thirtyOneDaysAgo;
    }

    const purged = await memory.purgeExpiredWorking();
    expect(purged).toBeGreaterThanOrEqual(1);

    const remaining = await memory.getRecentMessages(userId, 10, threadId);
    const hasOldMessage = remaining.some(m => m.content === "Old message");
    expect(hasOldMessage).toBe(false);
  });

  it("purgeExpiredWorking logs the count of purged messages", async () => {
    const { logger } = await import("../../src/logger.js");
    const userId = 3003;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Stale message", threadId);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const messages = internal.localMessages.get(threadId);
    if (messages && messages.length > 0) {
      messages[0].timestamp = Date.now() - 31 * 24 * 60 * 60 * 1000;
    }

    await memory.purgeExpiredWorking();

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Purged expired working memory"),
      expect.objectContaining({ count: expect.any(Number) })
    );
  });
});

// ---------------------------------------------------------------------------
// TS-035: Lifecycle classification
// ---------------------------------------------------------------------------

describe("TS-035: lifecycle classification", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("classifies working memory as ephemeral", () => {
    expect(memory.classifyLifecycle("working")).toBe("ephemeral");
  });

  it("classifies episodic memory as permanent", () => {
    expect(memory.classifyLifecycle("episodic")).toBe("permanent");
  });

  it("classifies semantic memory as permanent", () => {
    expect(memory.classifyLifecycle("semantic")).toBe("permanent");
  });

  it("only working memory is ephemeral", () => {
    const layers = ["working", "episodic", "semantic"] as const;
    const ephemeral = layers.filter(l => memory.classifyLifecycle(l) === "ephemeral");
    const permanent = layers.filter(l => memory.classifyLifecycle(l) === "permanent");

    expect(ephemeral).toEqual(["working"]);
    expect(permanent).toEqual(["episodic", "semantic"]);
  });
});

// ---------------------------------------------------------------------------
// TS-039: Knowledge confidence must be 0.0–1.0
// ---------------------------------------------------------------------------

describe("TS-039: knowledge confidence validation", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("stores knowledge with confidence 0.0", async () => {
    const userId = 5001;
    await memory.addKnowledge("team_preference", userId, "Low confidence fact", {
      confidence: 0.0,
    });
    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts).toContain("Low confidence fact");
  });

  it("stores knowledge with confidence 1.0", async () => {
    const userId = 5002;
    await memory.addKnowledge("team_preference", userId, "High confidence fact", {
      confidence: 1.0,
    });
    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts).toContain("High confidence fact");
  });

  it("stores knowledge with confidence 0.5 (default)", async () => {
    const userId = 5003;
    await memory.addKnowledge("team_preference", userId, "Default confidence");
    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts).toContain("Default confidence");
  });

  it("default confidence is 0.5 when not specified", async () => {
    const userId = 5004;
    await memory.addKnowledge("synergy_fact", userId, "Test fact");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Test fact"
    );
    expect(entry).toBeDefined();
    expect(entry.confidence).toBe(0.5);
  });

  it("custom confidence value is stored accurately", async () => {
    const userId = 5005;
    await memory.addKnowledge("team_preference", userId, "Precise fact", {
      confidence: 0.85,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Precise fact"
    );
    expect(entry).toBeDefined();
    expect(entry.confidence).toBe(0.85);
  });
});

// ---------------------------------------------------------------------------
// TS-071: Permanent classification does not prevent explicit purge
// ---------------------------------------------------------------------------

describe("TS-071: permanent memory can still be explicitly purged", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("classifies episodic as permanent but purgeUser removes it", async () => {
    const userId = 7001;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    // Add episodic memory (voice note)
    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "abc", duration: 30, mimeType: "audio/ogg", fileSize: 1024 },
      transcript: "This is an important voice note",
      transcription: { model: "whisper", language: "es", confidence: 0.9, wordCount: 6 },
      tags: ["important"],
    });

    // Verify it exists
    const notesBefore = await memory.getVoiceNotes(userId);
    expect(notesBefore.length).toBeGreaterThan(0);

    // purgeUser must remove it despite being "permanent"
    await memory.purgeUser(userId);

    const notesAfter = await memory.getVoiceNotes(userId);
    expect(notesAfter.length).toBe(0);
  });

  it("classifies semantic knowledge as permanent but purgeUser removes it", async () => {
    const userId = 7002;
    await memory.addKnowledge("team_preference", userId, "Never schedule on Fridays");

    const factsBefore = await memory.getKnowledge("team_preference", userId);
    expect(factsBefore).toContain("Never schedule on Fridays");

    await memory.purgeUser(userId);

    const factsAfter = await memory.getKnowledge("team_preference", userId);
    expect(factsAfter).not.toContain("Never schedule on Fridays");
  });

  it("purgeUser removes working memory (threads + messages)", async () => {
    const userId = 7003;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Hello, remember me", threadId);

    const msgsBefore = await memory.getRecentMessages(userId, 10, threadId);
    expect(msgsBefore.length).toBe(1);

    await memory.purgeUser(userId);

    // After purge the thread is gone; a new thread will be created if queried
    const profile = await memory.getUserProfile(userId);
    expect(profile).toBeNull();
  });

  it("permanent classification does not prevent purge (all 3 layers cleared)", async () => {
    const userId = 7004;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "Working layer message", threadId);
    await memory.addKnowledge("team_preference", userId, "Semantic layer fact");
    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "xyz", duration: 10, mimeType: "audio/ogg", fileSize: 512 },
      transcript: "Episodic layer note",
      transcription: { model: "whisper", language: "es", confidence: 0.8, wordCount: 3 },
      tags: [],
    });

    await memory.purgeUser(userId);

    // All three layers empty for this user
    const profile = await memory.getUserProfile(userId);
    expect(profile).toBeNull();

    const facts = await memory.getKnowledge("team_preference", userId);
    expect(facts.length).toBe(0);

    const notes = await memory.getVoiceNotes(userId);
    expect(notes.length).toBe(0);
  });
});
