// ============================================================================
// T058 — Integration tests for Firestore memory (mocked)
// Covers: TS-034 — Per-user purge across all 3 layers within 30 seconds
// ============================================================================

import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mocks — Firebase Admin SDK simulating Firestore
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

// ─── Firestore mock infrastructure ─────────────────────────────────────────

/**
 * Minimal in-process Firestore simulation:
 * - Tracks docs in a Map keyed by full collection path
 * - Supports: set, get, add, delete, where queries, batch, collectionGroup
 */

type DocData = Record<string, unknown>;

class MockDocRef {
  public id: string;
  private store: MockStore;
  private path: string;

  constructor(store: MockStore, path: string, id: string) {
    this.store = store;
    this.path = path;
    this.id = id;
  }

  async get(): Promise<{ exists: boolean; data: () => DocData | undefined; id: string }> {
    const key = `${this.path}/${this.id}`;
    const data = this.store.docs.get(key);
    return { exists: !!data, data: () => data, id: this.id };
  }

  async set(data: DocData, opts?: { merge?: boolean }): Promise<void> {
    const key = `${this.path}/${this.id}`;
    if (opts?.merge) {
      const existing = this.store.docs.get(key) || {};
      this.store.docs.set(key, { ...existing, ...data });
    } else {
      this.store.docs.set(key, { ...data });
    }
  }

  async update(data: DocData): Promise<void> {
    const key = `${this.path}/${this.id}`;
    const existing = this.store.docs.get(key) || {};
    this.store.docs.set(key, { ...existing, ...data });
  }

  async delete(): Promise<void> {
    const key = `${this.path}/${this.id}`;
    this.store.docs.delete(key);
  }

  collection(subcollection: string): MockCollRef {
    return new MockCollRef(this.store, `${this.path}/${this.id}/${subcollection}`);
  }
}

class MockQuery {
  protected store: MockStore;
  protected collPath: string;
  protected filters: Array<{ field: string; op: string; value: unknown }> = [];

  constructor(store: MockStore, collPath: string) {
    this.store = store;
    this.collPath = collPath;
  }

  where(field: string, op: string, value: unknown): MockQuery {
    const q = new MockQuery(this.store, this.collPath);
    q.filters = [...this.filters, { field, op, value }];
    return q;
  }

  orderBy(_field: string, _dir?: string): MockQuery {
    return this;
  }

  limit(_n: number): MockQuery {
    return this;
  }

  async get(): Promise<{ docs: Array<{ id: string; ref: MockDocRef; data: () => DocData }> }> {
    const prefix = this.collPath + "/";
    const docs: Array<{ id: string; ref: MockDocRef; data: () => DocData }> = [];

    for (const [key, data] of this.store.docs.entries()) {
      if (!key.startsWith(prefix)) continue;
      // Only match direct children (no sub-subcollection docs)
      const rest = key.slice(prefix.length);
      if (rest.includes("/")) continue;

      const passesFilters = this.filters.every(f => {
        const val = (data as Record<string, unknown>)[f.field];
        if (f.op === "==") return val === f.value;
        if (f.op === "<") {
          if (val instanceof Date && f.value instanceof Date) return val < f.value;
          if (typeof val === "number" && typeof f.value === "number") return val < f.value;
          return false;
        }
        return true;
      });

      if (passesFilters) {
        const docId = rest;
        const ref = new MockDocRef(this.store, this.collPath, docId);
        docs.push({ id: docId, ref, data: () => ({ ...data }) });
      }
    }

    return { docs };
  }
}

class MockCollRef extends MockQuery {
  constructor(store: MockStore, collPath: string) {
    super(store, collPath);
  }

  doc(id?: string): MockDocRef {
    const docId = id || `auto_${Math.random().toString(36).slice(2, 10)}`;
    return new MockDocRef(this.store, this.collPath, docId);
  }

  async add(data: DocData): Promise<MockDocRef> {
    const id = `auto_${Math.random().toString(36).slice(2, 10)}`;
    const ref = new MockDocRef(this.store, this.collPath, id);
    await ref.set(data);
    return ref;
  }
}

class MockBatch {
  private ops: Array<() => Promise<void>> = [];

  set(ref: MockDocRef, data: DocData, opts?: { merge?: boolean }): void {
    this.ops.push(() => ref.set(data, opts));
  }

  delete(ref: MockDocRef): void {
    this.ops.push(() => ref.delete());
  }

  async commit(): Promise<void> {
    await Promise.all(this.ops.map(op => op()));
  }
}

class MockTransaction {
  private ops: Array<() => Promise<void>> = [];

  async get(ref: MockDocRef): ReturnType<MockDocRef["get"]> {
    return ref.get();
  }

  set(ref: MockDocRef, data: DocData, opts?: { merge?: boolean }): void {
    this.ops.push(() => ref.set(data, opts));
  }

  async commit(): Promise<void> {
    await Promise.all(this.ops.map(op => op()));
  }
}

class MockStore {
  docs: Map<string, DocData> = new Map();

  collection(path: string): MockCollRef {
    return new MockCollRef(this, path);
  }

  collectionGroup(collectionId: string): MockQuery {
    // Find all docs whose path ends with /<collectionId>/<docId>
    const q = new MockQuery(this, `__collectionGroup__/${collectionId}`);
    // Override get for collectionGroup to search all matching paths
    const store = this;
    q.get = async () => {
      const docs: Array<{ id: string; ref: MockDocRef; data: () => DocData }> = [];
      for (const [key, data] of store.docs.entries()) {
        const parts = key.split("/");
        // collectionId is second-to-last segment, last is docId
        if (parts.length >= 2 && parts[parts.length - 2] === collectionId) {
          const docId = parts[parts.length - 1];
          const collPath = parts.slice(0, parts.length - 1).join("/");
          const ref = new MockDocRef(store, collPath, docId);
          // Apply filters
          const passesFilters = (q as unknown as { filters: Array<{ field: string; op: string; value: unknown }> }).filters.every(f => {
            const val = (data as Record<string, unknown>)[f.field];
            if (f.op === "==") return val === f.value;
            if (f.op === "<") {
              if (val instanceof Date && f.value instanceof Date) return val < f.value;
              return false;
            }
            return true;
          });
          if (passesFilters) {
            docs.push({ id: docId, ref, data: () => ({ ...data }) });
          }
        }
      }
      return { docs };
    };
    return q;
  }

  batch(): MockBatch {
    return new MockBatch();
  }

  async runTransaction<T>(fn: (t: MockTransaction) => Promise<T>): Promise<T> {
    const t = new MockTransaction();
    const result = await fn(t);
    await t.commit();
    return result;
  }
}

// Shared store instance, reset per test
let mockStore: MockStore;

vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([{}]),  // pretend app is already initialized
  cert: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn(() => mockStore),
  FieldValue: {
    serverTimestamp: vi.fn(() => new Date()),
    increment: vi.fn((n: number) => n),
    arrayUnion: vi.fn(),
  },
  Firestore: class {},
}));

// Ensure no fs check blocks Firestore init
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

// ---------------------------------------------------------------------------
// TS-034: Per-user purge across all 3 layers within 30 seconds
// ---------------------------------------------------------------------------

describe("TS-034: per-user purge across all 3 layers (Firestore mode)", () => {
  let memory: Memory;

  beforeEach(() => {
    vi.clearAllMocks();
    mockStore = new MockStore();
    memory = new Memory();
    // Verify we are in Firestore mode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((memory as any).useFirestore).toBe(true);
  });

  it("purgeUser completes in under 30 seconds", async () => {
    const userId = 1001;

    // Seed working layer
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Hello Firestore", threadId);
    await memory.addMessage(userId, "assistant", "Hello back", threadId);

    // Seed episodic layer
    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "tg1", duration: 20, mimeType: "audio/ogg", fileSize: 1024 },
      transcript: "Integration test voice note",
      transcription: { model: "whisper-large-v3-turbo", language: "es", confidence: 0.95, wordCount: 4 },
      tags: ["test"],
    });

    await memory.addMeeting({
      userId: String(userId),
      title: "Integration test meeting",
      participants: ["Alice", "Bob"],
      transcript: "We discussed the integration test coverage and agreed on next steps",
      summary: "Test summary",
      actionItems: [{ description: "Write more tests" }],
      decisions: ["Use Vitest"],
      tags: ["test"],
    });

    // Seed semantic layer
    await memory.addKnowledge("team_preference", userId, "Prefer Vitest over Jest", {
      confidence: 0.9,
      sourceType: "conversation",
    });
    await memory.addTask(userId, "Integration task", "Should be purged", "high");

    // Time the purge operation
    const start = Date.now();
    await memory.purgeUser(userId);
    const elapsed = Date.now() - start;

    // Must complete within 30 seconds
    expect(elapsed).toBeLessThan(30_000);
  });

  it("purgeUser removes working layer data from Firestore", async () => {
    const userId = 1002;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");
    await memory.addMessage(userId, "user", "Message to delete", threadId);

    // Verify data exists
    const msgsBefore = await memory.getRecentMessages(userId, 10, threadId);
    expect(msgsBefore.length).toBeGreaterThan(0);

    await memory.purgeUser(userId);

    // User document should be gone
    const userDoc = await mockStore.collection("users").doc(String(userId)).get();
    expect(userDoc.exists).toBe(false);
  });

  it("purgeUser removes episodic voice notes from Firestore", async () => {
    const userId = 1003;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "tg2", duration: 5, mimeType: "audio/ogg", fileSize: 256 },
      transcript: "Short note to delete",
      transcription: { model: "whisper", language: "es", confidence: 0.7, wordCount: 3 },
      tags: [],
    });

    const notesBefore = await memory.getVoiceNotes(userId);
    expect(notesBefore.length).toBe(1);

    await memory.purgeUser(userId);

    // All voice_notes for this user should be gone
    const snapshot = await mockStore.collection("voice_notes")
      .where("userId", "==", String(userId)).get();
    expect(snapshot.docs.length).toBe(0);
  });

  it("purgeUser removes semantic knowledge from Firestore", async () => {
    const userId = 1004;
    await memory.addKnowledge("project_context", userId, "Firestore knowledge to delete", {
      confidence: 0.8,
    });

    const factsBefore = await memory.getKnowledge("project_context", userId);
    expect(factsBefore).toContain("Firestore knowledge to delete");

    await memory.purgeUser(userId);

    const snapshot = await mockStore.collection("knowledge")
      .where("scopeUserId", "==", userId).get();
    expect(snapshot.docs.length).toBe(0);
  });

  it("purgeUser removes semantic tasks from Firestore", async () => {
    const userId = 1005;
    await memory.addTask(userId, "Task to purge", "Description", "medium");

    const tasksBefore = await memory.getUserTasks(userId);
    expect(tasksBefore.length).toBe(1);

    await memory.purgeUser(userId);

    const snapshot = await mockStore.collection("tasks")
      .where("userId", "==", String(userId)).get();
    expect(snapshot.docs.length).toBe(0);
  });

  it("purgeUser covers all 3 layers in a single call (working + episodic + semantic)", async () => {
    const userId = 1006;
    const threadId = await memory.getOrCreateActiveThread(userId, "pristino");

    // All 3 layers populated
    await memory.addMessage(userId, "user", "Working msg", threadId);

    await memory.addVoiceNote({
      userId: String(userId),
      threadId,
      audio: { telegramFileId: "tg3", duration: 10, mimeType: "audio/ogg", fileSize: 512 },
      transcript: "Episodic note",
      transcription: { model: "whisper", language: "es", confidence: 0.85, wordCount: 2 },
      tags: [],
    });

    await memory.addKnowledge("user_insight", userId, "Semantic fact");

    // Confirm population
    const notesSnap = await mockStore.collection("voice_notes").where("userId", "==", String(userId)).get();
    const knSnap = await mockStore.collection("knowledge").where("scopeUserId", "==", userId).get();
    expect(notesSnap.docs.length).toBe(1);
    expect(knSnap.docs.length).toBe(1);

    await memory.purgeUser(userId);

    // All gone
    const notesAfter = await mockStore.collection("voice_notes").where("userId", "==", String(userId)).get();
    const knAfter = await mockStore.collection("knowledge").where("scopeUserId", "==", userId).get();
    const userAfter = await mockStore.collection("users").doc(String(userId)).get();

    expect(notesAfter.docs.length).toBe(0);
    expect(knAfter.docs.length).toBe(0);
    expect(userAfter.exists).toBe(false);
  });
});
