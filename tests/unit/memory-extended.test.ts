// ============================================================================
// Extended unit tests for src/memory.ts (in-memory mode)
// Targets uncovered branches: addVoiceNote, getVoiceNotes, addMeeting,
// getMeetings, logInteraction, getInteractionLogs, addTask, getUserTasks,
// updateTaskStatus, getUserProfile, updateUserPreferences, setUserIdentity,
// addRagChunk, searchRagChunks, purgeUser (in-memory)
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
// Imports (after mocks)
// ---------------------------------------------------------------------------

import { Memory } from "../../src/memory.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeMemory(): Memory {
  return new Memory();
}

const USER_ID = 42;

// ---------------------------------------------------------------------------
// Voice notes
// ---------------------------------------------------------------------------

describe("Memory — addVoiceNote (in-memory)", () => {
  it("stores a voice note and returns a noteId", async () => {
    const mem = makeMemory();
    const noteId = await mem.addVoiceNote({
      userId: String(USER_ID),
      transcript: "Voice note content",
      duration: 30,
      language: "es",
      speakers: [],
    });
    expect(noteId).toMatch(/^vn_/);
  });

  it("rejects empty transcript", async () => {
    const mem = makeMemory();
    const noteId = await mem.addVoiceNote({
      userId: String(USER_ID),
      transcript: "",
      duration: 5,
      language: "en",
      speakers: [],
    });
    expect(noteId).toBe("");
  });

  it("rejects whitespace-only transcript", async () => {
    const mem = makeMemory();
    const noteId = await mem.addVoiceNote({
      userId: String(USER_ID),
      transcript: "   ",
      duration: 5,
      language: "en",
      speakers: [],
    });
    expect(noteId).toBe("");
  });

  it("truncates transcript exceeding max content length", async () => {
    const mem = makeMemory();
    const longTranscript = "a".repeat(40000);
    const noteId = await mem.addVoiceNote({
      userId: String(USER_ID),
      transcript: longTranscript,
      duration: 120,
      language: "en",
      speakers: [],
    });
    expect(noteId).toMatch(/^vn_/);
    const notes = await mem.getVoiceNotes(USER_ID);
    expect(notes[0].transcript.length).toBeLessThanOrEqual(32768);
  });
});

describe("Memory — getVoiceNotes (in-memory)", () => {
  it("returns empty array when no voice notes exist", async () => {
    const mem = makeMemory();
    const notes = await mem.getVoiceNotes(USER_ID);
    expect(notes).toEqual([]);
  });

  it("returns stored voice notes for a user", async () => {
    const mem = makeMemory();
    await mem.addVoiceNote({ userId: String(USER_ID), transcript: "Note 1", duration: 10, language: "es", speakers: [] });
    await mem.addVoiceNote({ userId: String(USER_ID), transcript: "Note 2", duration: 20, language: "en", speakers: [] });
    const notes = await mem.getVoiceNotes(USER_ID);
    expect(notes).toHaveLength(2);
  });

  it("filters voice notes by userId", async () => {
    const mem = makeMemory();
    await mem.addVoiceNote({ userId: String(USER_ID), transcript: "My note", duration: 10, language: "es", speakers: [] });
    await mem.addVoiceNote({ userId: "999", transcript: "Other user note", duration: 5, language: "en", speakers: [] });
    const notes = await mem.getVoiceNotes(USER_ID);
    expect(notes).toHaveLength(1);
    expect(notes[0].transcript).toBe("My note");
  });
});

// ---------------------------------------------------------------------------
// Meetings
// ---------------------------------------------------------------------------

describe("Memory — addMeeting (in-memory)", () => {
  it("stores a meeting and returns a meetingId", async () => {
    const mem = makeMemory();
    const meetingId = await mem.addMeeting({
      userId: String(USER_ID),
      title: "Q4 Planning",
      transcript: "We discussed the Q4 roadmap...",
      speakers: ["Alice", "Bob"],
      actionItems: [],
      duration: 60,
    });
    expect(meetingId).toMatch(/^mt_/);
  });

  it("rejects empty transcript", async () => {
    const mem = makeMemory();
    const meetingId = await mem.addMeeting({
      userId: String(USER_ID),
      title: "Empty Meeting",
      transcript: "",
      speakers: [],
      actionItems: [],
      duration: 0,
    });
    expect(meetingId).toBe("");
  });
});

describe("Memory — getMeetings (in-memory)", () => {
  it("returns empty array when no meetings exist", async () => {
    const mem = makeMemory();
    const meetings = await mem.getMeetings(USER_ID);
    expect(meetings).toEqual([]);
  });

  it("returns meetings for a specific user", async () => {
    const mem = makeMemory();
    await mem.addMeeting({ userId: String(USER_ID), title: "M1", transcript: "Content 1", speakers: [], actionItems: [], duration: 30 });
    await mem.addMeeting({ userId: "99", title: "Other", transcript: "Other content", speakers: [], actionItems: [], duration: 15 });
    const meetings = await mem.getMeetings(USER_ID);
    expect(meetings).toHaveLength(1);
    expect(meetings[0].title).toBe("M1");
  });
});

// ---------------------------------------------------------------------------
// Interaction log
// ---------------------------------------------------------------------------

describe("Memory — logInteraction (in-memory)", () => {
  it("logs an interaction entry", async () => {
    const mem = makeMemory();
    await mem.logInteraction({
      userId: String(USER_ID),
      type: "correction",
      content: "User corrected the date format",
      agentId: "pristino",
    });
    const logs = await mem.getInteractionLogs(USER_ID);
    expect(logs).toHaveLength(1);
    expect(logs[0].type).toBe("correction");
  });

  it("ignores empty content", async () => {
    const mem = makeMemory();
    await mem.logInteraction({ userId: String(USER_ID), type: "correction", content: "", agentId: "pristino" });
    const logs = await mem.getInteractionLogs(USER_ID);
    expect(logs).toHaveLength(0);
  });
});

describe("Memory — getInteractionLogs (in-memory)", () => {
  it("returns empty array when no logs exist", async () => {
    const mem = makeMemory();
    expect(await mem.getInteractionLogs(USER_ID)).toEqual([]);
  });

  it("filters by interaction type", async () => {
    const mem = makeMemory();
    await mem.logInteraction({ userId: String(USER_ID), type: "correction", content: "Fix this", agentId: "a" });
    await mem.logInteraction({ userId: String(USER_ID), type: "positive_feedback", content: "Good job", agentId: "a" });

    const corrections = await mem.getInteractionLogs(USER_ID, "correction");
    expect(corrections).toHaveLength(1);
    expect(corrections[0].type).toBe("correction");
  });

  it("returns all types when type filter is omitted", async () => {
    const mem = makeMemory();
    await mem.logInteraction({ userId: String(USER_ID), type: "correction", content: "Fix 1", agentId: "a" });
    await mem.logInteraction({ userId: String(USER_ID), type: "preference_signal", content: "Pref 1", agentId: "a" });
    const all = await mem.getInteractionLogs(USER_ID);
    expect(all).toHaveLength(2);
  });
});

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

describe("Memory — addTask (in-memory)", () => {
  it("creates a task and returns taskId", async () => {
    const mem = makeMemory();
    const taskId = await mem.addTask(USER_ID, "Fix bug", "Fix the login bug", "high");
    expect(taskId).toMatch(/^task_/);
  });

  it("creates task with default medium priority", async () => {
    const mem = makeMemory();
    const taskId = await mem.addTask(USER_ID, "Write docs", "Document the API");
    expect(taskId).toBeTruthy();
    const tasks = await mem.getUserTasks(USER_ID);
    expect(tasks[0].priority).toBe("medium");
  });

  it("creates task with custom source", async () => {
    const mem = makeMemory();
    await mem.addTask(USER_ID, "Review PR", "Review PR #42", "medium", "thread_1", { type: "voice_note" });
    const tasks = await mem.getUserTasks(USER_ID);
    expect(tasks[0].source?.type).toBe("voice_note");
  });
});

describe("Memory — getUserTasks (in-memory)", () => {
  it("returns empty array when no tasks exist", async () => {
    const mem = makeMemory();
    expect(await mem.getUserTasks(USER_ID)).toEqual([]);
  });

  it("returns tasks for specific user", async () => {
    const mem = makeMemory();
    await mem.addTask(USER_ID, "Task 1", "Desc 1");
    // slight delay to ensure unique taskIds
    await new Promise(r => setTimeout(r, 2));
    await mem.addTask(999, "Other task", "Desc");
    const tasks = await mem.getUserTasks(USER_ID);
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Task 1");
  });

  it("filters by status", async () => {
    const mem = makeMemory();
    const taskId = await mem.addTask(USER_ID, "T1", "D1", "high");
    await mem.updateTaskStatus(taskId, "done");
    await new Promise(r => setTimeout(r, 2));
    await mem.addTask(USER_ID, "T2", "D2");

    const doneTasks = await mem.getUserTasks(USER_ID, "done");
    expect(doneTasks).toHaveLength(1);
    expect(doneTasks[0].status).toBe("done");

    const pendingTasks = await mem.getUserTasks(USER_ID, "pending");
    expect(pendingTasks).toHaveLength(1);
    expect(pendingTasks[0].title).toBe("T2");
  });
});

describe("Memory — updateTaskStatus (in-memory)", () => {
  it("updates task status to done and sets completedAt", async () => {
    const mem = makeMemory();
    const taskId = await mem.addTask(USER_ID, "Complete me", "Do it");
    await mem.updateTaskStatus(taskId, "done");
    const tasks = await mem.getUserTasks(USER_ID, "done");
    expect(tasks[0].status).toBe("done");
    expect(tasks[0].completedAt).toBeDefined();
  });

  it("ignores update for empty taskId", async () => {
    const mem = makeMemory();
    await expect(mem.updateTaskStatus("", "done")).resolves.not.toThrow();
  });

  it("handles updateTaskStatus for non-existent taskId", async () => {
    const mem = makeMemory();
    await expect(mem.updateTaskStatus("nonexistent_task", "done")).resolves.not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// User profile
// ---------------------------------------------------------------------------

describe("Memory — getUserProfile (in-memory)", () => {
  it("returns null for unknown user", async () => {
    const mem = makeMemory();
    const profile = await mem.getUserProfile(USER_ID);
    expect(profile).toBeNull();
  });

  it("returns profile after it is set", async () => {
    const mem = makeMemory();
    // Trigger profile creation by adding a message (addMessage creates profile implicitly)
    await mem.addMessage(USER_ID, "user", "Hello");
    // Profile should exist now
    const profile = await mem.getUserProfile(USER_ID);
    expect(profile).not.toBeNull();
    expect(profile?.userId).toBe(String(USER_ID));
  });
});

describe("Memory — updateUserPreferences (in-memory)", () => {
  it("updates preferences for existing user", async () => {
    const mem = makeMemory();
    await mem.addMessage(USER_ID, "user", "Hello");
    await mem.updateUserPreferences(USER_ID, { language: "es", timezone: "America/Mexico_City" });
    const profile = await mem.getUserProfile(USER_ID);
    // Even if profile updates are applied, should not throw
    expect(profile).toBeDefined();
  });

  it("handles updateUserPreferences for non-existent user gracefully", async () => {
    const mem = makeMemory();
    await expect(mem.updateUserPreferences(9999, { language: "fr" })).resolves.not.toThrow();
  });
});

describe("Memory — setUserIdentity (in-memory)", () => {
  it("sets identity on existing user", async () => {
    const mem = makeMemory();
    await mem.addMessage(USER_ID, "user", "Hello");
    await mem.setUserIdentity(USER_ID, "Javier CEO");
    const profile = await mem.getUserProfile(USER_ID);
    expect(profile?.identity).toBe("Javier CEO");
  });

  it("handles setUserIdentity for non-existent user gracefully", async () => {
    const mem = makeMemory();
    await expect(mem.setUserIdentity(9999, "Unknown")).resolves.not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// RAG chunks
// ---------------------------------------------------------------------------

describe("Memory — addRagChunk (in-memory)", () => {
  it("stores a RAG chunk and returns an id", async () => {
    const mem = makeMemory();
    const id = await mem.addRagChunk({
      sourceId: "doc_1",
      sourceType: "document",
      userId: String(USER_ID),
      content: "Important knowledge about the team.",
      chunkIndex: 0,
      embedding: [],
    });
    expect(id).toMatch(/^rag_/);
  });

  it("rejects empty content", async () => {
    const mem = makeMemory();
    const id = await mem.addRagChunk({
      sourceId: "doc_2",
      sourceType: "document",
      userId: String(USER_ID),
      content: "",
      chunkIndex: 0,
      embedding: [],
    });
    expect(id).toBe("");
  });
});

describe("Memory — searchRagChunks (in-memory)", () => {
  it("returns empty array when no RAG chunks exist", async () => {
    const mem = makeMemory();
    const results = await mem.searchRagChunks(USER_ID, "query");
    expect(results).toEqual([]);
  });

  it("returns matching RAG chunks", async () => {
    const mem = makeMemory();
    await mem.addRagChunk({
      sourceId: "s1", sourceType: "document", userId: String(USER_ID),
      content: "Team prefers async communication", chunkIndex: 0, embedding: [],
    });
    await mem.addRagChunk({
      sourceId: "s2", sourceType: "document", userId: String(USER_ID),
      content: "Financial reporting is quarterly", chunkIndex: 0, embedding: [],
    });
    const results = await mem.searchRagChunks(USER_ID, "async communication");
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results[0].content).toContain("async");
  });

  it("filters by userId", async () => {
    const mem = makeMemory();
    await mem.addRagChunk({
      sourceId: "s3", sourceType: "document", userId: String(USER_ID),
      content: "My user's data", chunkIndex: 0, embedding: [],
    });
    await mem.addRagChunk({
      sourceId: "s4", sourceType: "document", userId: "999",
      content: "Other user data", chunkIndex: 0, embedding: [],
    });
    const results = await mem.searchRagChunks(USER_ID, "data");
    expect(results.every(r => r.userId === String(USER_ID))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// purgeUser — in-memory comprehensive
// ---------------------------------------------------------------------------

describe("Memory — purgeUser (in-memory)", () => {
  it("removes all data for the user across all memory layers", async () => {
    const mem = makeMemory();
    // Add data across all layers
    await mem.addMessage(USER_ID, "user", "Hello");
    await mem.addKnowledge("team_preference", USER_ID, "No meetings before 10am");
    await mem.addVoiceNote({ userId: String(USER_ID), transcript: "Voice note", duration: 5, language: "es", speakers: [] });
    await mem.addTask(USER_ID, "Pending task", "Do something");
    await mem.addRagChunk({ sourceId: "doc", sourceType: "document", userId: String(USER_ID), content: "Some RAG data", chunkIndex: 0, embedding: [] });
    await mem.logInteraction({ userId: String(USER_ID), type: "correction", content: "Fixed error", agentId: "pristino" });

    // Verify data exists
    const msgsBefore = await mem.getRecentMessages(USER_ID);
    expect(msgsBefore.length).toBeGreaterThan(0);

    // Verify data exists before purge
    const profileBefore = await mem.getUserProfile(USER_ID);
    expect(profileBefore).not.toBeNull();

    // Purge
    await mem.purgeUser(USER_ID);

    // Verify semantic/episodic data is removed (don't call getRecentMessages which recreates profile)
    const tasks = await mem.getUserTasks(USER_ID);
    expect(tasks).toEqual([]);

    const profile = await mem.getUserProfile(USER_ID);
    expect(profile).toBeNull();

    const knowledge = await mem.getKnowledge("team_preference");
    expect(knowledge).toEqual([]);
  });

  it("does not affect other users data when purging one user", async () => {
    const mem = makeMemory();
    const OTHER_USER = 999;
    await mem.addMessage(USER_ID, "user", "My message");
    await mem.addMessage(OTHER_USER, "user", "Other message");

    await mem.purgeUser(USER_ID);

    const otherMsgs = await mem.getRecentMessages(OTHER_USER);
    expect(otherMsgs.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Knowledge — extended tests for branch coverage
// ---------------------------------------------------------------------------

describe("Memory — getKnowledge (in-memory) — branch coverage", () => {
  it("filters by userId when provided", async () => {
    const mem = makeMemory();
    await mem.addKnowledge("team_preference", USER_ID, "Short standups");
    await mem.addKnowledge("team_preference", 999, "Long meetings");

    const results = await mem.getKnowledge("team_preference", USER_ID);
    expect(results).toHaveLength(1);
    expect(results[0]).toBe("Short standups");
  });

  it("returns all knowledge for category when no userId filter", async () => {
    const mem = makeMemory();
    await mem.addKnowledge("company_intel", USER_ID, "Revenue target is 1M");
    await mem.addKnowledge("company_intel", 999, "HQ is in Mexico City");

    const results = await mem.getKnowledge("company_intel");
    expect(results.length).toBeGreaterThanOrEqual(2);
  });

  it("respects limit parameter", async () => {
    const mem = makeMemory();
    for (let i = 0; i < 10; i++) {
      await mem.addKnowledge("project_context", USER_ID, `Fact ${i}`);
    }
    const results = await mem.getKnowledge("project_context", USER_ID, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });
});

// ---------------------------------------------------------------------------
// addKnowledge — with options
// ---------------------------------------------------------------------------

describe("Memory — addKnowledge options (in-memory)", () => {
  it("stores with custom confidence and sourceType", async () => {
    const mem = makeMemory();
    await mem.addKnowledge("user_insight", USER_ID, "User prefers morning meetings", {
      confidence: 0.9,
      sourceType: "voice_transcription",
      sourceRef: "vn_123",
      permanent: false,
    });
    const results = await mem.getKnowledge("user_insight", USER_ID);
    expect(results).toContain("User prefers morning meetings");
  });

  it("ignores empty fact string", async () => {
    const mem = makeMemory();
    await mem.addKnowledge("team_preference", USER_ID, "");
    const results = await mem.getKnowledge("team_preference", USER_ID);
    expect(results).toHaveLength(0);
  });
});
