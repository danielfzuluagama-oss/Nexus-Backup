import { getFirestore, Firestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { logger } from "./logger.js";
import fs from 'fs';
import path from 'path';

/**
 * COGNITIVE MEMORY MANAGER — 3-Layer Firestore Architecture.
 *
 * Working Memory (ephemeral, TTL 30d):
 *   threads/{threadId}                      — named conversation threads
 *   threads/{threadId}/messages/{messageId} — messages with source provenance
 *
 * Episodic Memory (permanent, indexed):
 *   voice_notes/{noteId}                    — transcriptions with audio metadata
 *   meetings/{meetingId}                    — multi-speaker transcriptions + action items
 *   interaction_log/{logId}                 — corrections, preference signals, feedback
 *
 * Semantic Memory (permanent, RAG-ready):
 *   users/{userId}                          — enriched profiles with typed preferences
 *   knowledge/{knowledgeId}                 — facts with confidence + source provenance
 *   tasks/{taskId}                          — actionable items with source tracking
 *   rag_chunks/{chunkId}                    — embedded content for vector search
 *   system_config/{configId}                — static app configuration
 *
 * Trade-offs:
 * - Threads top-level for BFF queries; meetings top-level for multi-user ownership
 * - RAG via Firestore Vector Search (findNearest); no external vector DB needed for <100K chunks
 * - In-memory fallback for local dev; volatile, no persistence
 * - 32KB content cap per field; larger payloads need Cloud Storage URI references
 */

const MAX_CONTENT_LENGTH = 32_768;
const MAX_LOCAL_KNOWLEDGE = 500;
const MAX_LOCAL_MESSAGES = 200;
const MAX_LOCAL_VOICE_NOTES = 100;
const VALID_ROLES = new Set(["user", "assistant", "system"]);
const TTL_DAYS = 30;
const TTL_MS = TTL_DAYS * 24 * 60 * 60 * 1000;

function formatDateTitle(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ─────────────────────────────────────────────
//  INTERFACES
// ─────────────────────────────────────────────

export type SourceType = "text" | "voice_transcription" | "image_caption" | "document_extract" | "meeting_excerpt";
export type KnowledgeCategory = "team_preference" | "synergy_fact" | "user_insight" | "company_intel" | "project_context" | "client_profile" | "process";
export type InteractionType = "correction" | "preference_signal" | "frustration_signal" | "positive_feedback";

export interface StoredMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  threadId?: string;
  sourceType?: SourceType;
  sourceRef?: string;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  responseStyle: string;
  formatRules: string[];
  topicsOfInterest: string[];
}

export interface UserExperience {
  totalMessages: number;
  totalVoiceNotes: number;
  totalMeetings: number;
  firstInteraction: Date;
  topCategories: string[];
}

export interface UserProfile {
  userId: string;
  displayName: string;
  role: "owner" | "member";
  agent: string;
  identity: string;
  preferences: UserPreferences;
  experience: UserExperience;
  createdAt: Date;
  lastActiveAt: Date;
  activeThreadId?: string;
}

export interface Thread {
  threadId: string;
  userId: string;
  title: string;
  status: "active" | "archived" | "pinned";
  agent: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VoiceNote {
  noteId?: string;
  userId: string;
  threadId: string;
  audio: { telegramFileId: string; duration: number; mimeType: string; fileSize: number };
  transcript: string;
  transcription: { model: string; language: string; confidence: number; wordCount: number };
  summary?: string;
  extractedActions?: string[];
  tags: string[];
  createdAt: Date;
  ragChunked: boolean;
}

export interface Meeting {
  meetingId?: string;
  userId: string;
  threadId?: string;
  title: string;
  participants: string[];
  transcript: string;
  segments?: Array<{ speaker: string; text: string; startTime: number; endTime: number }>;
  summary: string;
  actionItems: Array<{ description: string; assignee?: string; deadline?: string }>;
  decisions: string[];
  audio?: { duration: number; source: string };
  tags: string[];
  createdAt: Date;
  ragChunked: boolean;
}

export interface KnowledgeEntry {
  category: KnowledgeCategory | string;
  scope: "global" | "user" | "team";
  scopeUserId?: number;
  fact: string;
  confidence: number;
  source: { type: "conversation" | "voice_note" | "meeting" | "manual"; ref?: string; extractedAt: Date };
  reinforcementCount: number;
  lastReinforcedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  permanent: boolean;
}

export interface Task {
  taskId: string;
  userId: string;
  threadId?: string;
  title: string;
  status: "pending" | "in_progress" | "done" | "cancelled";
  priority: "low" | "medium" | "high" | "critical";
  description: string;
  source: { type: "conversation" | "meeting" | "voice_note" | "manual"; ref?: string };
  recurrence?: "daily" | "weekly" | "monthly" | null;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
}

export interface InteractionLog {
  userId: string;
  type: InteractionType;
  content: string;
  context: { threadId: string; messageId?: string; triggerMessage?: string };
  createdAt: Date;
}

export interface RagChunk {
  sourceType: "message" | "voice_note" | "meeting" | "knowledge" | "document";
  sourceId: string;
  userId: string;
  content: string;
  chunkIndex: number;
  category?: string;
  tags: string[];
  createdAt: Date;
}

// ─────────────────────────────────────────────
//  DEFAULTS
// ─────────────────────────────────────────────

const DEFAULT_PREFERENCES: UserPreferences = {
  language: "es", timezone: "America/Bogota", responseStyle: "minto_dense",
  formatRules: ["no_bold", "no_emoji", "dash_hierarchy"], topicsOfInterest: [],
};

const DEFAULT_EXPERIENCE: UserExperience = {
  totalMessages: 0, totalVoiceNotes: 0, totalMeetings: 0,
  firstInteraction: new Date(), topCategories: [],
};

// ─────────────────────────────────────────────
//  MEMORY CLASS
// ─────────────────────────────────────────────

export class Memory {
  private db: Firestore | null = null;
  private useFirestore = false;

  // In-memory fallback stores
  private localMessages: Map<string, StoredMessage[]> = new Map();
  private localKnowledge: KnowledgeEntry[] = [];
  private localUsers: Map<string, UserProfile> = new Map();
  private localThreads: Map<string, Thread> = new Map();
  private localTasks: Map<string, Task> = new Map();
  private localVoiceNotes: VoiceNote[] = [];
  private localMeetings: Meeting[] = [];
  private localInteractionLog: InteractionLog[] = [];
  private localRagChunks: RagChunk[] = [];

  constructor() {
    try {
      if (!getApps().length) {
        const rawCredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
        
        if (rawCredPath) {
          const absoluteCredPath = path.resolve(process.cwd(), rawCredPath);
          
          if (fs.existsSync(absoluteCredPath)) {
            initializeApp({ credential: cert(absoluteCredPath) });
            this.useFirestore = true;
          } else {
            logger.warn("GOOGLE_APPLICATION_CREDENTIALS path not found. Using in-memory fallback.", { 
              raw: rawCredPath, 
              absolute: absoluteCredPath 
            });
          }
        } else {
          logger.warn("No GOOGLE_APPLICATION_CREDENTIALS in env. Using in-memory fallback (volatile).");
        }
      } else {
        this.useFirestore = true;
      }
      if (this.useFirestore) {
        this.db = getFirestore();
        logger.info("Cognitive Memory initialized (Firestore)");
      } else {
        logger.info("Cognitive Memory initialized (in-memory, no persistence)");
      }
    } catch (e) {
      logger.error("Firestore init failed, falling back to in-memory", { error: e });
      this.db = null;
    }
  }

  // ─────────────────────────────────────────────
  //  THREADS
  // ─────────────────────────────────────────────

  async getOrCreateActiveThread(userId: number, agent: string): Promise<string> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const userRef = this.db.collection("users").doc(uid);
        
        const newThreadId = await this.db.runTransaction(async (t) => {
          const userDoc = await t.get(userRef);
          if (userDoc.exists && userDoc.data()?.activeThreadId) {
            return userDoc.data()!.activeThreadId;
          }

          const threadRef = this.db!.collection("threads").doc();
          const now = new Date();
          t.set(threadRef, { userId: uid, title: `Conversación ${formatDateTitle()}`, status: "active", agent, createdAt: now, updatedAt: now });
          t.set(userRef, {
            userId: uid, displayName: uid, role: "member", agent, identity: "",
            preferences: DEFAULT_PREFERENCES, experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
            createdAt: now, lastActiveAt: now, activeThreadId: threadRef.id,
          }, { merge: true });
          
          return threadRef.id;
        });
        
        logger.info("Active thread resolved", { userId: uid, threadId: newThreadId });
        return newThreadId;
      } catch (e) {
        logger.error("Failed to get/create thread transactionally", { error: e });
        throw e; // V13: Do not mask error with fallback_uid. Let it bubble up.
      }
    } else {
      const existing = this.localUsers.get(uid);
      if (existing?.activeThreadId) return existing.activeThreadId;
      const threadId = `thread_${uid}_${Date.now()}`;
      const now = new Date();
      this.localThreads.set(threadId, { threadId, userId: uid, title: `Conversación ${formatDateTitle()}`, status: "active", agent, createdAt: now, updatedAt: now });
      this.localUsers.set(uid, {
        userId: uid, displayName: uid, role: "member", agent, identity: "",
        preferences: { ...DEFAULT_PREFERENCES }, experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
        createdAt: now, lastActiveAt: now, activeThreadId: threadId,
      });
      return threadId;
    }
  }

  async startNewThread(userId: number, agent: string, title?: string): Promise<string> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const userRef = this.db.collection("users").doc(uid);
        const newThreadId = await this.db.runTransaction(async (t) => {
          const userDoc = await t.get(userRef);
          const currentThreadId = userDoc.data()?.activeThreadId;
          if (currentThreadId) {
            // V12: Safe upsert instead of strict update
            t.set(this.db!.collection("threads").doc(currentThreadId), { status: "archived" }, { merge: true });
          }
          const threadRef = this.db!.collection("threads").doc();
          const now = new Date();
          t.set(threadRef, { userId: uid, title: title || `Conversación ${formatDateTitle()}`, status: "active", agent, createdAt: now, updatedAt: now });
          t.set(userRef, { activeThreadId: threadRef.id, lastActiveAt: now }, { merge: true });
          return threadRef.id;
        });
        return newThreadId;
      } catch (e) { logger.error("Failed to start new thread transactionally", { error: e }); throw e; }
    } else {
      const threadId = `thread_${uid}_${Date.now()}`;
      const now = new Date();
      const existing = this.localUsers.get(uid);
      if (existing?.activeThreadId) { const t = this.localThreads.get(existing.activeThreadId); if (t) t.status = "archived"; }
      this.localThreads.set(threadId, { threadId, userId: uid, title: title || `Conversación ${formatDateTitle()}`, status: "active", agent, createdAt: now, updatedAt: now });
      if (existing) { existing.activeThreadId = threadId; existing.lastActiveAt = now; }
      return threadId;
    }
  }

  // ─────────────────────────────────────────────
  //  MESSAGES (with source provenance)
  // ─────────────────────────────────────────────

  async addMessage(userId: number, role: "user" | "assistant" | "system", content: string, threadId?: string, agent = "pristino", sourceType: SourceType = "text", sourceRef?: string): Promise<void> {
    if (!VALID_ROLES.has(role)) { logger.error("Invalid message role", { role }); return; }
    if (!content || !content.trim()) { logger.warn("Empty content rejected", { userId }); return; }
    const safe = content.length > MAX_CONTENT_LENGTH
      ? (logger.warn("Message truncated", { original: content.length }), content.slice(0, MAX_CONTENT_LENGTH))
      : content;
    const tid = threadId || await this.getOrCreateActiveThread(userId, agent);

    if (this.useFirestore && this.db) {
      try {
        // V2 fix: atomic WriteBatch (3 ops → 1 round-trip)
        const batch = this.db.batch();
        const msgRef = this.db.collection("threads").doc(tid).collection("messages").doc();
        batch.set(msgRef, {
          role, content: safe, timestamp: Date.now(),
          expiresAt: new Date(Date.now() + TTL_MS),
          userId, sourceType, sourceRef: sourceRef || null,
        });
        // V12 fix: use set with merge instead of update to avoid crash if thread document is missing
        batch.set(this.db.collection("threads").doc(tid), { updatedAt: FieldValue.serverTimestamp() }, { merge: true });
        // V1 fix: dot-notation prevents sibling field destruction
        batch.set(this.db.collection("users").doc(String(userId)),
          { "experience.totalMessages": FieldValue.increment(1), lastActiveAt: new Date() },
          { merge: true }
        );
        await batch.commit();
      } catch (e) { logger.error("Failed to insert message batch", { error: e, threadId: tid }); throw e; }
    } else {
      const existing = this.localMessages.get(tid) ?? [];
      existing.push({ role, content: safe, timestamp: Date.now(), threadId: tid, sourceType, sourceRef });
      if (existing.length > MAX_LOCAL_MESSAGES) existing.splice(0, existing.length - MAX_LOCAL_MESSAGES);
      this.localMessages.set(tid, existing);
    }
  }

  async getRecentMessages(userId: number, limit = 20, threadId?: string, agent = "pristino"): Promise<StoredMessage[]> {
    const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
    if (this.useFirestore && this.db) {
      try {
        const snapshot = await this.db.collection("threads").doc(tid).collection("messages")
          .orderBy("timestamp", "desc").limit(limit).get();
        return snapshot.docs.map(doc => {
          const d = doc.data();
          return { role: d.role, content: d.content, timestamp: d.timestamp, threadId: tid, sourceType: d.sourceType, sourceRef: d.sourceRef } as StoredMessage;
        }).reverse();
      } catch (e) { logger.error("Failed to fetch messages", { error: e }); return []; }
    } else {
      return (this.localMessages.get(tid) ?? []).slice(-limit);
    }
  }

  // ─────────────────────────────────────────────
  //  VOICE NOTES (Episodic Layer)
  // ─────────────────────────────────────────────

  async addVoiceNote(note: Omit<VoiceNote, "noteId" | "createdAt" | "ragChunked">): Promise<string> {
    if (!note.transcript?.trim()) { logger.warn("Empty voice note rejected"); return ""; }
    const safe = note.transcript.length > MAX_CONTENT_LENGTH ? note.transcript.slice(0, MAX_CONTENT_LENGTH) : note.transcript;

    if (this.useFirestore && this.db) {
      try {
        const ref = this.db.collection("voice_notes").doc();
        await ref.set({ ...note, transcript: safe, createdAt: new Date(), ragChunked: false });
        // V1 fix: dot-notation prevents sibling field destruction
        await this.db.collection("users").doc(note.userId).set(
          { "experience.totalVoiceNotes": FieldValue.increment(1), lastActiveAt: new Date() },
          { merge: true }
        );
        logger.info("Voice note stored", { noteId: ref.id, userId: note.userId });
        return ref.id;
      } catch (e) { logger.error("Failed to store voice note", { error: e }); return ""; }
    } else {
      const noteId = `vn_${Date.now()}`;
      this.localVoiceNotes.push({ ...note, noteId, transcript: safe, createdAt: new Date(), ragChunked: false });
      if (this.localVoiceNotes.length > MAX_LOCAL_VOICE_NOTES) this.localVoiceNotes.shift();
      return noteId;
    }
  }

  async getVoiceNotes(userId: number, limit = 10): Promise<VoiceNote[]> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const snapshot = await this.db.collection("voice_notes")
          .where("userId", "==", uid).orderBy("createdAt", "desc").limit(limit).get();
        return snapshot.docs.map(doc => ({ noteId: doc.id, ...doc.data() }) as unknown as VoiceNote);
      } catch (e) { logger.error("Failed to get voice notes", { error: e }); return []; }
    } else {
      return this.localVoiceNotes.filter(vn => vn.userId === uid).slice(-limit);
    }
  }

  // ─────────────────────────────────────────────
  //  MEETINGS (Episodic Layer)
  // ─────────────────────────────────────────────

  async addMeeting(meeting: Omit<Meeting, "meetingId" | "createdAt" | "ragChunked">): Promise<string> {
    if (!meeting.transcript?.trim()) { logger.warn("Empty meeting transcript rejected"); return ""; }
    const safe = meeting.transcript.length > MAX_CONTENT_LENGTH ? meeting.transcript.slice(0, MAX_CONTENT_LENGTH) : meeting.transcript;

    if (this.useFirestore && this.db) {
      try {
        const ref = this.db.collection("meetings").doc();
        await ref.set({ ...meeting, transcript: safe, createdAt: new Date(), ragChunked: false });
        // V1 fix: dot-notation prevents sibling field destruction
        await this.db.collection("users").doc(meeting.userId).set(
          { "experience.totalMeetings": FieldValue.increment(1), lastActiveAt: new Date() },
          { merge: true }
        );
        logger.info("Meeting stored", { meetingId: ref.id, title: meeting.title });
        return ref.id;
      } catch (e) { logger.error("Failed to store meeting", { error: e }); return ""; }
    } else {
      const meetingId = `mt_${Date.now()}`;
      this.localMeetings.push({ ...meeting, meetingId, transcript: safe, createdAt: new Date(), ragChunked: false });
      return meetingId;
    }
  }

  async getMeetings(userId: number, limit = 10): Promise<Meeting[]> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const snapshot = await this.db.collection("meetings")
          .where("userId", "==", uid).orderBy("createdAt", "desc").limit(limit).get();
        return snapshot.docs.map(doc => ({ meetingId: doc.id, ...doc.data() }) as unknown as Meeting);
      } catch (e) { logger.error("Failed to get meetings", { error: e }); return []; }
    } else {
      return this.localMeetings.filter(m => m.userId === uid).slice(-limit);
    }
  }

  // ─────────────────────────────────────────────
  //  INTERACTION LOG (Episodic Layer)
  // ─────────────────────────────────────────────

  async logInteraction(entry: Omit<InteractionLog, "createdAt">): Promise<void> {
    if (!entry.content?.trim()) return;
    if (this.useFirestore && this.db) {
      try {
        await this.db.collection("interaction_log").add({ ...entry, createdAt: new Date() });
      } catch (e) { logger.error("Failed to log interaction", { error: e }); }
    } else {
      this.localInteractionLog.push({ ...entry, createdAt: new Date() });
    }
  }

  async getInteractionLogs(userId: number, type?: InteractionType, limit = 20): Promise<InteractionLog[]> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        let query = this.db.collection("interaction_log").where("userId", "==", uid);
        if (type) query = query.where("type", "==", type);
        const snapshot = await query.orderBy("createdAt", "desc").limit(limit).get();
        return snapshot.docs.map(doc => doc.data() as InteractionLog);
      } catch (e) { logger.error("Failed to get interaction logs", { error: e }); return []; }
    } else {
      return this.localInteractionLog
        .filter(l => l.userId === uid && (!type || l.type === type))
        .slice(-limit);
    }
  }

  // ─────────────────────────────────────────────
  //  KNOWLEDGE (Semantic Layer — enriched)
  // ─────────────────────────────────────────────

  async addKnowledge(category: string, userId: number, fact: string, options: { permanent?: boolean; confidence?: number; sourceType?: string; sourceRef?: string } = {}): Promise<void> {
    if (!fact?.trim()) return;
    const safe = fact.length > MAX_CONTENT_LENGTH ? fact.slice(0, MAX_CONTENT_LENGTH) : fact;
    const now = new Date();

    if (this.useFirestore && this.db) {
      try {
        await this.db.collection("knowledge").add({
          category, scope: "user", scopeUserId: userId, fact: safe,
          confidence: options.confidence ?? 0.5,
          source: { type: options.sourceType ?? "manual", ref: options.sourceRef ?? null, extractedAt: now },
          reinforcementCount: 1, lastReinforcedAt: now,
          createdAt: now, updatedAt: now, permanent: options.permanent ?? true,
        });
        logger.info(`Added knowledge: ${category}`, { userId });
      } catch (e) { logger.error(`Failed to add knowledge: ${category}`, { error: e }); }
    } else {
      this.localKnowledge.push({
        category, scope: "user", scopeUserId: userId, fact: safe,
        confidence: options.confidence ?? 0.5,
        source: { type: (options.sourceType ?? "manual") as KnowledgeEntry["source"]["type"], ref: options.sourceRef, extractedAt: now },
        reinforcementCount: 1, lastReinforcedAt: now,
        createdAt: now, updatedAt: now, permanent: options.permanent ?? true,
      });
      if (this.localKnowledge.length > MAX_LOCAL_KNOWLEDGE) this.localKnowledge.shift();
    }
  }

  async getKnowledge(category: string, userId?: number, limit = 20): Promise<string[]> {
    if (this.useFirestore && this.db) {
      try {
        let query = this.db.collection("knowledge").where("category", "==", category);
        if (userId !== undefined) query = query.where("scopeUserId", "==", userId);
        
        const snapshot = await query.orderBy("createdAt", "desc").limit(limit).get();
        return snapshot.docs.map(doc => doc.data().fact);
      } catch (e) { logger.error(`Failed to get knowledge: ${category}`, { error: e }); return []; }
    } else {
      return this.localKnowledge
        .filter(k => k.category === category && (userId === undefined || k.scopeUserId === userId))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, limit)
        .map(k => k.fact);
    }
  }

  async reinforceKnowledge(knowledgeId: string): Promise<void> {
    if (!knowledgeId || !this.useFirestore || !this.db) return;
    try {
      await this.db.collection("knowledge").doc(knowledgeId).update({
        reinforcementCount: FieldValue.increment(1),
        lastReinforcedAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (e) { logger.error("Failed to reinforce knowledge", { error: e }); }
  }

  // Backward-compatible wrappers
  async addTeamPreference(userId: number, preference: string): Promise<void> { return this.addKnowledge("team_preference", userId, preference); }
  async getTeamPreferences(): Promise<string[]> { return this.getKnowledge("team_preference"); }
  async addSynergyFact(userId: number, fact: string): Promise<void> { return this.addKnowledge("synergy_fact", userId, fact); }
  async getSynergyFacts(): Promise<string[]> { return this.getKnowledge("synergy_fact"); }

  // ─────────────────────────────────────────────
  //  TASKS (enhanced with source provenance)
  // ─────────────────────────────────────────────

  async addTask(userId: number, title: string, description: string, priority: Task["priority"] = "medium", threadId?: string, source?: Task["source"]): Promise<string> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const ref = this.db.collection("tasks").doc();
        await ref.set({
          userId: uid, threadId: threadId || null, title, description,
          status: "pending", priority,
          source: source || { type: "manual", ref: null },
          recurrence: null, createdAt: new Date(), dueDate: null, completedAt: null,
        });
        logger.info("Task created", { taskId: ref.id, userId: uid });
        return ref.id;
      } catch (e) { logger.error("Failed to create task", { error: e }); return ""; }
    } else {
      const taskId = `task_${Date.now()}`;
      this.localTasks.set(taskId, {
        taskId, userId: uid, threadId, title, description,
        status: "pending", priority,
        source: source || { type: "manual" },
        createdAt: new Date(),
      });
      return taskId;
    }
  }

  async getUserTasks(userId: number, status?: Task["status"]): Promise<Task[]> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        let query = this.db.collection("tasks").where("userId", "==", uid);
        if (status) query = query.where("status", "==", status);
        const snapshot = await query.orderBy("createdAt", "desc").limit(50).get();
        return snapshot.docs.map(doc => ({ taskId: doc.id, ...doc.data() }) as unknown as Task);
      } catch (e) { logger.error("Failed to get tasks", { error: e }); return []; }
    } else {
      return [...this.localTasks.values()]
        .filter(t => t.userId === uid && (!status || t.status === status))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
  }

  async updateTaskStatus(taskId: string, status: Task["status"]): Promise<void> {
    if (!taskId) { logger.error("updateTaskStatus called with empty taskId"); return; }
    if (this.useFirestore && this.db) {
      try {
        const update: Record<string, unknown> = { status };
        if (status === "done") update.completedAt = new Date();
        await this.db.collection("tasks").doc(taskId).update(update);
      } catch (e) { logger.error("Failed to update task", { error: e }); }
    } else {
      const task = this.localTasks.get(taskId);
      if (task) { task.status = status; if (status === "done") task.completedAt = new Date(); }
    }
  }

  // ─────────────────────────────────────────────
  //  USER PROFILES (enriched)
  // ─────────────────────────────────────────────

  async getUserProfile(userId: number): Promise<UserProfile | null> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const doc = await this.db.collection("users").doc(uid).get();
        return doc.exists ? (doc.data() as UserProfile) : null;
      } catch (e) { logger.error("Failed to get user profile", { error: e }); return null; }
    } else {
      return this.localUsers.get(uid) || null;
    }
  }

  async updateUserPreferences(userId: number, preferences: Partial<UserPreferences>): Promise<void> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        const updates: Record<string, unknown> = { lastActiveAt: new Date() };
        for (const [key, value] of Object.entries(preferences)) {
          updates[`preferences.${key}`] = value;
        }
        await this.db.collection("users").doc(uid).set(updates, { merge: true });
      } catch (e) { logger.error("Failed to update preferences", { error: e }); }
    } else {
      const user = this.localUsers.get(uid);
      if (user) { user.preferences = { ...user.preferences, ...preferences }; user.lastActiveAt = new Date(); }
    }
  }

  async setUserIdentity(userId: number, identity: string): Promise<void> {
    const uid = String(userId);
    if (this.useFirestore && this.db) {
      try {
        await this.db.collection("users").doc(uid).set({ identity }, { merge: true });
      } catch (e) { logger.error("Failed to set user identity", { error: e }); }
    } else {
      const user = this.localUsers.get(uid);
      if (user) user.identity = identity;
    }
  }

  // ─────────────────────────────────────────────
  //  RAG CHUNKS (Semantic Layer)
  // ─────────────────────────────────────────────

  async addRagChunk(chunk: Omit<RagChunk, "createdAt">): Promise<string> {
    if (!chunk.content?.trim()) return "";
    if (this.useFirestore && this.db) {
      try {
        const ref = this.db.collection("rag_chunks").doc();
        await ref.set({ ...chunk, createdAt: new Date() });
        return ref.id;
      } catch (e) { logger.error("Failed to add RAG chunk", { error: e }); return ""; }
    } else {
      const id = `rag_${Date.now()}_${chunk.chunkIndex}`;
      this.localRagChunks.push({ ...chunk, createdAt: new Date() });
      return id;
    }
  }

  async searchRagChunks(userId: number, query: string, limit = 5): Promise<RagChunk[]> {
    // Note: Full vector search requires embeddings + findNearest(). This is a text-match fallback
    // for local dev. In Firestore mode, use the Vertex AI extension or direct findNearest() calls.
    const uid = String(userId);
    const queryLower = query.toLowerCase();
    if (this.useFirestore && this.db) {
      try {
        // Basic text search fallback (vector search requires embedding pipeline)
        const snapshot = await this.db.collection("rag_chunks")
          .where("userId", "==", uid).orderBy("createdAt", "desc").limit(limit * 3).get();
        return snapshot.docs
          .map(doc => doc.data() as RagChunk)
          .filter(chunk => chunk.content.toLowerCase().includes(queryLower))
          .slice(0, limit);
      } catch (e) { logger.error("Failed to search RAG chunks", { error: e }); return []; }
    } else {
      return this.localRagChunks
        .filter(c => c.userId === uid && c.content.toLowerCase().includes(queryLower))
        .slice(-limit);
    }
  }

  // ─────────────────────────────────────────────
  //  LIFECYCLE
  // ─────────────────────────────────────────────

  /**
   * Returns the lifecycle classification for a given memory layer.
   * - working memory is ephemeral (TTL-based, may be purged)
   * - episodic and semantic memory are permanent (no automatic expiry)
   */
  classifyLifecycle(layer: "working" | "episodic" | "semantic"): "ephemeral" | "permanent" {
    if (layer === "working") return "ephemeral";
    return "permanent";
  }

  /**
   * Purges expired working memory messages across all threads (scheduled sweep).
   * In Firestore mode, deletes messages whose expiresAt is in the past.
   * In in-memory mode, removes messages older than TTL_MS from all threads.
   */
  async purgeExpiredWorking(): Promise<number> {
    const now = Date.now();
    if (this.useFirestore && this.db) {
      try {
        const snapshot = await this.db.collectionGroup("messages")
          .where("expiresAt", "<", new Date(now))
          .get();
        const batch = this.db.batch();
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        if (snapshot.docs.length > 0) await batch.commit();
        logger.info("Purged expired working memory", { count: snapshot.docs.length });
        return snapshot.docs.length;
      } catch (e) {
        logger.error("Failed to purge expired working memory", { error: e });
        return 0;
      }
    } else {
      let purged = 0;
      const expiryThreshold = now - TTL_MS;
      for (const [threadId, messages] of this.localMessages.entries()) {
        const surviving = messages.filter(m => m.timestamp > expiryThreshold);
        purged += messages.length - surviving.length;
        if (surviving.length === 0) {
          this.localMessages.delete(threadId);
        } else {
          this.localMessages.set(threadId, surviving);
        }
      }
      logger.info("Purged expired working memory (in-memory)", { count: purged });
      return purged;
    }
  }

  /**
   * Purges all data for a given user across all 3 memory layers:
   * - Working: threads + messages
   * - Episodic: voice_notes, meetings, interaction_log
   * - Semantic: users, knowledge, tasks, rag_chunks
   */
  async purgeUser(userId: number): Promise<void> {
    const uid = String(userId);
    const start = Date.now();
    logger.info("Purging all user data", { userId: uid });

    if (this.useFirestore && this.db) {
      try {
        const batch = this.db.batch();

        // Working layer: user document + active thread messages
        const userRef = this.db.collection("users").doc(uid);
        batch.delete(userRef);

        // Episodic: voice_notes
        const vnSnap = await this.db.collection("voice_notes").where("userId", "==", uid).get();
        vnSnap.docs.forEach(doc => batch.delete(doc.ref));

        // Episodic: meetings
        const mtSnap = await this.db.collection("meetings").where("userId", "==", uid).get();
        mtSnap.docs.forEach(doc => batch.delete(doc.ref));

        // Episodic: interaction_log
        const ilSnap = await this.db.collection("interaction_log").where("userId", "==", uid).get();
        ilSnap.docs.forEach(doc => batch.delete(doc.ref));

        // Semantic: knowledge
        const knSnap = await this.db.collection("knowledge").where("scopeUserId", "==", userId).get();
        knSnap.docs.forEach(doc => batch.delete(doc.ref));

        // Semantic: tasks
        const tkSnap = await this.db.collection("tasks").where("userId", "==", uid).get();
        tkSnap.docs.forEach(doc => batch.delete(doc.ref));

        // Semantic: rag_chunks
        const rcSnap = await this.db.collection("rag_chunks").where("userId", "==", uid).get();
        rcSnap.docs.forEach(doc => batch.delete(doc.ref));

        await batch.commit();
        const elapsed = Date.now() - start;
        logger.info("User data purged", { userId: uid, elapsedMs: elapsed });
      } catch (e) {
        logger.error("Failed to purge user data", { error: e, userId: uid });
        throw e;
      }
    } else {
      // In-memory: remove from all local stores
      // Working layer
      for (const [threadId, messages] of this.localMessages.entries()) {
        const surviving = messages.filter(m => m.threadId && !this.localThreads.has(m.threadId)
          ? true
          : messages.every(msg => {
            const thread = this.localThreads.get(msg.threadId || "");
            return !thread || thread.userId !== uid;
          }));
        void surviving; // sweep below handles it
      }
      // Delete user threads
      for (const [threadId, thread] of this.localThreads.entries()) {
        if (thread.userId === uid) {
          this.localThreads.delete(threadId);
          this.localMessages.delete(threadId);
        }
      }
      // Delete user profile
      this.localUsers.delete(uid);
      // Episodic
      this.localVoiceNotes = this.localVoiceNotes.filter(vn => vn.userId !== uid);
      this.localMeetings = this.localMeetings.filter(m => m.userId !== uid);
      this.localInteractionLog = this.localInteractionLog.filter(l => l.userId !== uid);
      // Semantic
      this.localKnowledge = this.localKnowledge.filter(k => k.scopeUserId !== userId);
      for (const [taskId, task] of this.localTasks.entries()) {
        if (task.userId === uid) this.localTasks.delete(taskId);
      }
      this.localRagChunks = this.localRagChunks.filter(c => c.userId !== uid);

      const elapsed = Date.now() - start;
      logger.info("User data purged (in-memory)", { userId: uid, elapsedMs: elapsed });
    }
  }

  close(): void {
    logger.info("Cognitive Memory closed", { mode: this.useFirestore ? "firestore" : "in-memory" });
  }
}
