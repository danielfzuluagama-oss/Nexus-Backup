// ============================================================================
// T057 — Contract tests for memory interface
// Covers: TS-036, TS-037, TS-038
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — must be hoisted before imports
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

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

vi.mock("fs", async () => {
  const actual = await vi.importActual<typeof import("fs")>("fs");
  return {
    ...actual,
    existsSync: vi.fn().mockReturnValue(false),
  };
});

// ---------------------------------------------------------------------------
// Import SUT
// ---------------------------------------------------------------------------

import { Memory } from "../../src/memory.js";
import type { StoredMessage } from "../../src/memory.js";

// ---------------------------------------------------------------------------
// TS-036: addMessage / getRecentMessages round-trip
// ---------------------------------------------------------------------------

describe("TS-036: addMessage / getRecentMessages round-trip", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("message added with addMessage is returned by getRecentMessages", async () => {
    const userId = 101;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "Hello from contract test", threadId);

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    expect(messages.length).toBe(1);
    expect(messages[0].content).toBe("Hello from contract test");
    expect(messages[0].role).toBe("user");
  });

  it("multiple messages preserve insertion order (ascending timestamp)", async () => {
    const userId = 102;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "First", threadId);
    await memory.addMessage(userId, "assistant", "Second", threadId);
    await memory.addMessage(userId, "user", "Third", threadId);

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    expect(messages.map(m => m.content)).toEqual(["First", "Second", "Third"]);
  });

  it("getRecentMessages returns at most `limit` messages", async () => {
    const userId = 103;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    for (let i = 0; i < 15; i++) {
      await memory.addMessage(userId, "user", `Msg ${i}`, threadId);
    }

    const messages = await memory.getRecentMessages(userId, 5, threadId);
    expect(messages.length).toBeLessThanOrEqual(5);
  });

  it("returned messages have required fields: role, content, timestamp", async () => {
    const userId = 104;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "assistant", "Response text", threadId);

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    const msg: StoredMessage = messages[0];

    expect(msg).toHaveProperty("role");
    expect(msg).toHaveProperty("content");
    expect(msg).toHaveProperty("timestamp");
    expect(typeof msg.role).toBe("string");
    expect(typeof msg.content).toBe("string");
    expect(typeof msg.timestamp).toBe("number");
  });

  it("messages from different threads do not bleed into each other", async () => {
    // Use two different users to guarantee thread isolation without thread archiving side effects
    const userId1 = 105;
    const userId2 = 1050;
    const thread1 = await memory.getOrCreateActiveThread(userId1, "pristino");
    const thread2 = await memory.getOrCreateActiveThread(userId2, "pristino");

    await memory.addMessage(userId1, "user", "Thread 1 message", thread1);
    await memory.addMessage(userId2, "user", "Thread 2 message", thread2);

    const t1Messages = await memory.getRecentMessages(userId1, 10, thread1);
    const t2Messages = await memory.getRecentMessages(userId2, 10, thread2);

    expect(t1Messages.every(m => m.content === "Thread 1 message")).toBe(true);
    expect(t2Messages.every(m => m.content === "Thread 2 message")).toBe(true);
    // No cross-contamination
    expect(t1Messages.some(m => m.content === "Thread 2 message")).toBe(false);
    expect(t2Messages.some(m => m.content === "Thread 1 message")).toBe(false);
  });

  it("sourceType is stored and returned correctly", async () => {
    const userId = 106;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "Voice transcribed", threadId, "pristino", "voice_transcription");

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    expect(messages[0].sourceType).toBe("voice_transcription");
  });

  it("empty content is silently rejected", async () => {
    const userId = 107;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMessage(userId, "user", "   ", threadId);

    const messages = await memory.getRecentMessages(userId, 10, threadId);
    expect(messages.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// TS-037: addKnowledge stores provenance metadata
// ---------------------------------------------------------------------------

describe("TS-037: addKnowledge stores provenance metadata", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("stored knowledge includes sourceType in metadata", async () => {
    const userId = 201;
    await memory.addKnowledge("team_preference", userId, "No meetings before 9am", {
      sourceType: "conversation",
      sourceRef: "thread_abc123",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "No meetings before 9am"
    );
    expect(entry).toBeDefined();
    expect(entry.source.type).toBe("conversation");
  });

  it("stored knowledge includes sourceRef when provided", async () => {
    const userId = 202;
    await memory.addKnowledge("project_context", userId, "Project alpha is critical", {
      sourceType: "voice_note",
      sourceRef: "vn_xyz789",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Project alpha is critical"
    );
    expect(entry.source.ref).toBe("vn_xyz789");
  });

  it("stored knowledge includes extractedAt date", async () => {
    const userId = 203;
    const before = new Date();
    await memory.addKnowledge("team_preference", userId, "Prefer written over verbal");
    const after = new Date();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Prefer written over verbal"
    );
    expect(entry.source.extractedAt).toBeInstanceOf(Date);
    expect(entry.source.extractedAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(entry.source.extractedAt.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  it("knowledge has createdAt and updatedAt timestamps", async () => {
    const userId = 204;
    await memory.addKnowledge("synergy_fact", userId, "The team excels at async work");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "The team excels at async work"
    );
    expect(entry.createdAt).toBeInstanceOf(Date);
    expect(entry.updatedAt).toBeInstanceOf(Date);
  });

  it("knowledge stores scopeUserId for per-user retrieval", async () => {
    const userId = 205;
    await memory.addKnowledge("user_insight", userId, "User prefers concise responses");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "User prefers concise responses"
    );
    expect(entry.scopeUserId).toBe(userId);
  });

  it("permanent defaults to true when not specified", async () => {
    const userId = 206;
    await memory.addKnowledge("team_preference", userId, "Default permanent flag");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Default permanent flag"
    );
    expect(entry.permanent).toBe(true);
  });

  it("permanent can be explicitly set to false", async () => {
    const userId = 207;
    await memory.addKnowledge("team_preference", userId, "Temporary fact", {
      permanent: false,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    const entry = internal.localKnowledge.find(
      (k: { fact: string }) => k.fact === "Temporary fact"
    );
    expect(entry.permanent).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// TS-038: purgeUser removes data from all layers
// ---------------------------------------------------------------------------

describe("TS-038: purgeUser removes data from all layers", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    memory = new Memory();
  });

  it("purgeUser removes the user profile", async () => {
    const userId = 301;
    await memory.getOrCreateActiveThread(userId, "pristino");

    const profileBefore = await memory.getUserProfile(userId);
    expect(profileBefore).not.toBeNull();

    await memory.purgeUser(userId);

    const profileAfter = await memory.getUserProfile(userId);
    expect(profileAfter).toBeNull();
  });

  it("purgeUser removes working layer messages", async () => {
    const userId = 302;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Working memory msg", threadId);

    await memory.purgeUser(userId);

    // After purge, old threadId is deleted — new query would create new thread
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const internal = memory as any;
    expect(internal.localMessages.has(threadId)).toBe(false);
  });

  it("purgeUser removes episodic voice notes", async () => {
    const userId = 303;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "f1", duration: 15, mimeType: "audio/ogg", fileSize: 800 },
      transcript: "Voice note for purge test",
      transcription: { model: "whisper", language: "es", confidence: 0.9, wordCount: 4 },
      tags: [],
    });

    const notesBefore = await memory.getVoiceNotes(userId);
    expect(notesBefore.length).toBe(1);

    await memory.purgeUser(userId);

    const notesAfter = await memory.getVoiceNotes(userId);
    expect(notesAfter.length).toBe(0);
  });

  it("purgeUser removes episodic meetings", async () => {
    const userId = 304;
    await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addMeeting({
      userId: String(userId),
      title: "Weekly sync",
      participants: ["user1", "user2"],
      transcript: "We discussed the quarterly roadmap and aligned on priorities",
      summary: "Alignment on Q4",
      actionItems: [],
      decisions: [],
      tags: [],
    });

    const meetingsBefore = await memory.getMeetings(userId);
    expect(meetingsBefore.length).toBe(1);

    await memory.purgeUser(userId);

    const meetingsAfter = await memory.getMeetings(userId);
    expect(meetingsAfter.length).toBe(0);
  });

  it("purgeUser removes semantic knowledge entries", async () => {
    const userId = 305;
    await memory.addKnowledge("team_preference", userId, "Knowledge for purge");

    const factsBefore = await memory.getKnowledge("team_preference", userId);
    expect(factsBefore).toContain("Knowledge for purge");

    await memory.purgeUser(userId);

    const factsAfter = await memory.getKnowledge("team_preference", userId);
    expect(factsAfter).not.toContain("Knowledge for purge");
  });

  it("purgeUser removes semantic tasks", async () => {
    const userId = 306;
    await memory.addTask(userId, "Task to purge", "Should be deleted", "medium");

    const tasksBefore = await memory.getUserTasks(userId);
    expect(tasksBefore.length).toBe(1);

    await memory.purgeUser(userId);

    const tasksAfter = await memory.getUserTasks(userId);
    expect(tasksAfter.length).toBe(0);
  });

  it("purgeUser only removes data for the specified user, not other users", async () => {
    const userId1 = 307;
    const userId2 = 308;

    await memory.getOrCreateActiveThread(userId1, "pristino");
    await memory.getOrCreateActiveThread(userId2, "pristino");
    await memory.addKnowledge("team_preference", userId1, "User 1 knowledge");
    await memory.addKnowledge("team_preference", userId2, "User 2 knowledge");

    await memory.purgeUser(userId1);

    const profile1 = await memory.getUserProfile(userId1);
    const profile2 = await memory.getUserProfile(userId2);
    expect(profile1).toBeNull();
    expect(profile2).not.toBeNull();

    const facts2 = await memory.getKnowledge("team_preference", userId2);
    expect(facts2).toContain("User 2 knowledge");
  });
});
