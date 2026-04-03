import { getFirestore, Firestore, FieldValue, type Query } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { logger } from "./logger.js";
import fs from 'fs';
import path from 'path';
import {
  buildGeneralThreadSummary,
  buildProposalThreadSummary,
  buildThreadMemoryContext,
  type ThreadMemoryPatch,
  type ThreadMemorySnapshot,
  type ThreadProposalState,
  previewMemoryText,
} from "./thread-memory.js";

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

function isManagedGoogleRuntime(): boolean {
  return Boolean(
    process.env.FIREBASE_CONFIG ||
    process.env.FUNCTION_TARGET ||
    process.env.K_SERVICE ||
    process.env.GCLOUD_PROJECT ||
    process.env.GOOGLE_CLOUD_PROJECT,
  );
}

function formatDateTitle(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const DEFAULT_ACTIVE_THREAD_SLOT = "default";

export interface ActiveThreadContext {
  conversationKey?: string | null;
}

function normalizeActiveThreadSlot(conversationKey?: string | null): string {
  const normalized = typeof conversationKey === "string" ? conversationKey.trim() : "";
  return normalized || DEFAULT_ACTIVE_THREAD_SLOT;
}

function normalizeActiveThreadMap(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") {
    return {};
  }

  return Object.entries(value as Record<string, unknown>).reduce<Record<string, string>>(
    (accumulator, [key, rawValue]) => {
      if (typeof rawValue === "string" && rawValue.trim()) {
        accumulator[key] = rawValue;
      }
      return accumulator;
    },
    {},
  );
}

function buildLocalThreadId(userId: string): string {
  const entropy = Math.random().toString(36).slice(2, 8);
  return `thread_${userId}_${Date.now()}_${entropy}`;
}

function buildInitialThreadRecord(
  userId: string,
  agent: string,
  title: string,
  threadId: string,
  now: Date,
  context: ActiveThreadContext = {},
): Thread {
  return {
    threadId,
    userId,
    title,
    status: "active",
    agent,
    conversationKey: normalizeActiveThreadSlot(context.conversationKey),
    conversationKind: "general",
    summary: "",
    summaryVersion: 0,
    messageCount: 0,
    createdAt: now,
    updatedAt: now,
  };
}

function mergeProposalState(
  existing: ThreadProposalState | null | undefined,
  patch: ThreadProposalState | null | undefined,
): ThreadProposalState | null {
  if (patch == null) {
    return null;
  }
  const base = existing ?? { status: patch.status };
  return {
    ...base,
    ...patch,
    missingRequired: patch.missingRequired ?? base.missingRequired,
    missingRecommended: patch.missingRecommended ?? base.missingRecommended,
    openQuestions: patch.openQuestions ?? base.openQuestions,
  };
}

const MAX_SEMANTIC_CONTEXT_CHARS = 2_200;
const MAX_SEMANTIC_KNOWLEDGE_RESULTS = 5;
const MAX_SEMANTIC_RAG_RESULTS = 3;
const SEMANTIC_STOPWORDS = new Set([
  "a",
  "al",
  "alrededor",
  "ante",
  "aun",
  "aunque",
  "con",
  "como",
  "de",
  "del",
  "desde",
  "durante",
  "e",
  "el",
  "en",
  "entre",
  "es",
  "esa",
  "ese",
  "esto",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "mas",
  "más",
  "mi",
  "mis",
  "no",
  "o",
  "para",
  "pero",
  "por",
  "que",
  "se",
  "sin",
  "su",
  "sus",
  "un",
  "una",
  "y",
]);

function compactSemanticWhitespace(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/\u202f/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripSemanticNoise(value: string): string {
  return compactSemanticWhitespace(
    value
      .replace(/<\/?SYSTEM_OVERRIDE>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\[[^\]]+\]/g, " ")
      .replace(/\bURI:\s*\S+/gi, " ")
      .replace(/\bhttps?:\/\/\S+/gi, " ")
      .replace(/\bwww\.\S+/gi, " "),
  );
}

function normalizeSemanticText(value: string): string {
  return compactSemanticWhitespace(
    stripSemanticNoise(value)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s/-]+/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function tokenizeSemanticText(value: string): string[] {
  const normalized = normalizeSemanticText(value);
  if (!normalized) {
    return [];
  }

  return normalized
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 2 && !SEMANTIC_STOPWORDS.has(token));
}

function countSharedTokens(leftTokens: string[], rightTokens: string[]): number {
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return 0;
  }

  const right = new Set(rightTokens);
  let shared = 0;
  for (const token of leftTokens) {
    if (right.has(token)) {
      shared += 1;
    }
  }
  return shared;
}

function safeDate(value: unknown): Date | null {
  if (value instanceof Date) {
    return value;
  }
  if (value && typeof value === "object" && "toDate" in value && typeof (value as { toDate: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }
  return null;
}

function timestampValue(value: unknown): number {
  return safeDate(value)?.getTime() ?? 0;
}

function normalizeConfidence(value: number | undefined): number {
  if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
    return 0.5;
  }
  return Math.min(1, Math.max(0, value));
}

function validateConfidence(value: number | undefined): number {
  const confidence = typeof value === "number" ? value : 0.5;
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
    throw new RangeError(`Knowledge confidence must be between 0.0 and 1.0; received ${String(value)}`);
  }
  return confidence;
}

function semanticAgeBonus(value: Date | null): number {
  if (!value) {
    return 0;
  }

  const ageDays = Math.max(0, (Date.now() - value.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, 7 - ageDays) / 7;
}

function formatKnowledgeSource(source: KnowledgeEntry["source"] | null | undefined): string {
  const type = source?.type ?? "manual";
  const ref = previewMemoryText(source?.ref, 60);
  return ref ? `${type}:${ref}` : type;
}

function scoreKnowledgeRecord(record: KnowledgeRecord, queryTokens: string[], queryText = ""): number {
  const factTokens = tokenizeSemanticText(record.fact);
  const categoryTokens = tokenizeSemanticText(record.category.replace(/_/g, " "));
  const sourceType = record.source?.type ?? "manual";
  const sourceRef = record.source?.ref ?? "";
  const sourceTokens = tokenizeSemanticText(`${sourceType} ${sourceRef}`);
  const normalizedFact = normalizeSemanticText(record.fact);
  const normalizedQuery = normalizeSemanticText(queryText);
  const exactMatch = normalizedQuery && normalizedFact.includes(normalizedQuery) ? 1 : 0;
  const tokenOverlap = countSharedTokens(queryTokens, factTokens);
  const categoryOverlap = countSharedTokens(queryTokens, categoryTokens);
  const sourceOverlap = countSharedTokens(queryTokens, sourceTokens);
  const confidenceScore = normalizeConfidence(record.confidence) * 100;
  const reinforcementScore = Math.min(Math.max(record.reinforcementCount ?? 0, 0), 20) * 4;
  const freshnessScore = semanticAgeBonus(safeDate(record.updatedAt) ?? safeDate(record.lastReinforcedAt) ?? safeDate(record.createdAt)) * 10;

  return (tokenOverlap * 14)
    + (categoryOverlap * 8)
    + (sourceOverlap * 5)
    + (exactMatch * 24)
    + confidenceScore
    + reinforcementScore
    + freshnessScore;
}

function compareKnowledgeRecords(left: KnowledgeRecord, right: KnowledgeRecord): number {
  const confidenceDelta = normalizeConfidence(right.confidence) - normalizeConfidence(left.confidence);
  if (confidenceDelta !== 0) {
    return confidenceDelta;
  }

  const reinforcementDelta = (right.reinforcementCount ?? 0) - (left.reinforcementCount ?? 0);
  if (reinforcementDelta !== 0) {
    return reinforcementDelta;
  }

  const updatedDelta = timestampValue(right.updatedAt) - timestampValue(left.updatedAt);
  if (updatedDelta !== 0) {
    return updatedDelta;
  }

  const lastReinforcedDelta = timestampValue(right.lastReinforcedAt) - timestampValue(left.lastReinforcedAt);
  if (lastReinforcedDelta !== 0) {
    return lastReinforcedDelta;
  }

  const createdDelta = timestampValue(right.createdAt) - timestampValue(left.createdAt);
  if (createdDelta !== 0) {
    return createdDelta;
  }

  return normalizeSemanticText(right.fact).localeCompare(normalizeSemanticText(left.fact));
}

function sortKnowledgeRecords(records: KnowledgeRecord[]): KnowledgeRecord[] {
  return [...records].sort(compareKnowledgeRecords);
}

function rankKnowledgeRecords(records: KnowledgeRecord[], queryText = ""): KnowledgeRecord[] {
  const queryTokens = tokenizeSemanticText(queryText);
  if (queryTokens.length === 0) {
    return sortKnowledgeRecords(records);
  }

  return [...records].sort((left, right) => {
    const scoreDelta = scoreKnowledgeRecord(right, queryTokens, queryText) - scoreKnowledgeRecord(left, queryTokens, queryText);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }
    return compareKnowledgeRecords(left, right);
  });
}

function scoreRagChunk(chunk: RagChunk, queryTokens: string[], queryText = ""): number {
  const contentTokens = tokenizeSemanticText(chunk.content);
  const categoryTokens = tokenizeSemanticText(chunk.category ?? "");
  const tags = Array.isArray(chunk.tags) ? chunk.tags : [];
  const tagTokens = tokenizeSemanticText(tags.join(" "));
  const sourceTokens = tokenizeSemanticText(`${chunk.sourceType} ${chunk.sourceId}`);
  const normalizedContent = normalizeSemanticText(chunk.content);
  const normalizedQuery = normalizeSemanticText(queryText);
  const exactMatch = normalizedQuery && normalizedContent.includes(normalizedQuery) ? 1 : 0;
  const contentOverlap = countSharedTokens(queryTokens, contentTokens);
  const categoryOverlap = countSharedTokens(queryTokens, categoryTokens);
  const tagOverlap = countSharedTokens(queryTokens, tagTokens);
  const sourceOverlap = countSharedTokens(queryTokens, sourceTokens);
  const freshnessScore = semanticAgeBonus(safeDate(chunk.createdAt)) * 10;

  return (contentOverlap * 18)
    + (categoryOverlap * 8)
    + (tagOverlap * 7)
    + (sourceOverlap * 4)
    + (exactMatch * 24)
    + freshnessScore;
}

function compareRagChunks(left: RagChunk, right: RagChunk): number {
  const createdDelta = timestampValue(right.createdAt) - timestampValue(left.createdAt);
  if (createdDelta !== 0) {
    return createdDelta;
  }

  return normalizeSemanticText(right.content).localeCompare(normalizeSemanticText(left.content));
}

function rankRagChunks(records: RagChunk[], queryText = ""): RagChunk[] {
  const queryTokens = tokenizeSemanticText(queryText);
  if (queryTokens.length === 0) {
    return [...records].sort(compareRagChunks);
  }

  return [...records].sort((left, right) => {
    const scoreDelta = scoreRagChunk(right, queryTokens, queryText) - scoreRagChunk(left, queryTokens, queryText);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }
    return compareRagChunks(left, right);
  });
}

function buildSemanticMemoryContext(
  profile: UserProfile | null,
  knowledgeRecords: KnowledgeRecord[],
  ragChunks: RagChunk[],
  query = "",
): string {
  const lines: string[] = [
    query
      ? `Memoria semántica relevante para la solicitud: ${previewMemoryText(query, 120)}`
      : "Memoria semántica relevante:",
  ];

  if (profile?.preferences) {
    const preferenceBits = [
      profile.preferences.language ? `idioma ${profile.preferences.language}` : "",
      profile.preferences.timezone ? `zona ${profile.preferences.timezone}` : "",
      profile.preferences.responseStyle ? `estilo ${profile.preferences.responseStyle}` : "",
      (profile.preferences.formatRules?.length ?? 0) > 0
        ? `reglas ${profile.preferences.formatRules.join(", ")}`
        : "",
      (profile.preferences.topicsOfInterest?.length ?? 0) > 0
        ? `intereses ${profile.preferences.topicsOfInterest.map((topic) => previewMemoryText(topic, 36)).join(", ")}`
        : "",
    ].filter(Boolean);

    if (preferenceBits.length > 0) {
      lines.push(`- Perfil: ${preferenceBits.join(" · ")}`);
    }
  }

  if (knowledgeRecords.length > 0) {
    lines.push("- Hechos recuperados:");
    for (const record of knowledgeRecords.slice(0, MAX_SEMANTIC_KNOWLEDGE_RESULTS)) {
      const sourceBits = [
        `conf ${normalizeConfidence(record.confidence).toFixed(2)}`,
        `ref ${record.reinforcementCount ?? 0}`,
        record.category,
        formatKnowledgeSource(record.source),
      ].filter(Boolean);

      lines.push(`  - [${sourceBits.join(" | ")}] ${previewMemoryText(record.fact, 180)}`);
    }
  }

  if (ragChunks.length > 0) {
    lines.push("- Evidencia relacionada:");
    for (const chunk of ragChunks.slice(0, MAX_SEMANTIC_RAG_RESULTS)) {
      const tags = Array.isArray(chunk.tags) ? chunk.tags : [];
      const chunkSource = [
        chunk.category ? previewMemoryText(chunk.category, 36) : "",
        tags.length > 0 ? tags.map((tag) => previewMemoryText(tag, 24)).join(", ") : "",
      ].filter(Boolean).join(" · ");
      const sourceLabel = chunkSource || chunk.sourceType;
      lines.push(`  - [${sourceLabel}] ${previewMemoryText(chunk.content, 180)}`);
    }
  }

  if (lines.length === 1) {
    return "";
  }

  const context = lines.join("\n");
  if (context.length <= MAX_SEMANTIC_CONTEXT_CHARS) {
    return context;
  }

  return `${context.slice(0, MAX_SEMANTIC_CONTEXT_CHARS).trimEnd()}...`;
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
  activeThreadsByKey?: Record<string, string>;
}

export interface Thread extends ThreadMemorySnapshot {}

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

interface KnowledgeRecord extends KnowledgeEntry {
  knowledgeId?: string;
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
  private localKnowledge: KnowledgeRecord[] = [];
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
        } else if (isManagedGoogleRuntime()) {
          initializeApp();
          this.useFirestore = true;
          logger.info("Using managed Google runtime credentials for Firestore");
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

  async getOrCreateActiveThread(
    userId: number,
    agent: string,
    context: ActiveThreadContext = {},
  ): Promise<string> {
    const uid = String(userId);
    const threadSlot = normalizeActiveThreadSlot(context.conversationKey);
    if (this.useFirestore && this.db) {
      try {
        const userRef = this.db.collection("users").doc(uid);
        
        const newThreadId = await this.db.runTransaction(async (t) => {
          const userDoc = await t.get(userRef);
          const activeThreadsByKey = normalizeActiveThreadMap(userDoc.data()?.activeThreadsByKey);
          const existingThreadId = activeThreadsByKey[threadSlot]
            ?? (threadSlot === DEFAULT_ACTIVE_THREAD_SLOT ? userDoc.data()?.activeThreadId : null);
          if (userDoc.exists && existingThreadId) {
            return existingThreadId;
          }

          const threadRef = this.db!.collection("threads").doc();
          const now = new Date();
          const nextActiveThreadsByKey = {
            ...activeThreadsByKey,
            [threadSlot]: threadRef.id,
          };
          t.set(
            threadRef,
            buildInitialThreadRecord(
              uid,
              agent,
              `Conversación ${formatDateTitle()}`,
              threadRef.id,
              now,
              context,
            ),
          );
          t.set(
            userRef,
            {
              userId: uid,
              displayName: uid,
              role: "member",
              agent,
              identity: "",
              preferences: DEFAULT_PREFERENCES,
              experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
              createdAt: now,
              lastActiveAt: now,
              activeThreadId: threadSlot === DEFAULT_ACTIVE_THREAD_SLOT
                ? threadRef.id
                : userDoc.data()?.activeThreadId,
              activeThreadsByKey: nextActiveThreadsByKey,
            },
            { merge: true },
          );
          
          return threadRef.id;
        });
        
        logger.info("Active thread resolved", { userId: uid, threadId: newThreadId, threadSlot });
        return newThreadId;
      } catch (e) {
        logger.error("Failed to get/create thread transactionally", { error: e });
        throw e; // V13: Do not mask error with fallback_uid. Let it bubble up.
      }
    } else {
      const existing = this.localUsers.get(uid);
      const activeThreadsByKey = normalizeActiveThreadMap(existing?.activeThreadsByKey);
      const existingThreadId = activeThreadsByKey[threadSlot]
        ?? (threadSlot === DEFAULT_ACTIVE_THREAD_SLOT ? existing?.activeThreadId : null);
      if (existingThreadId) {
        return existingThreadId;
      }
      const threadId = buildLocalThreadId(uid);
      const now = new Date();
      this.localThreads.set(
        threadId,
        buildInitialThreadRecord(uid, agent, `Conversación ${formatDateTitle()}`, threadId, now, context),
      );
      this.localUsers.set(uid, {
        userId: uid,
        displayName: uid,
        role: "member",
        agent,
        identity: "",
        preferences: { ...DEFAULT_PREFERENCES },
        experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
        createdAt: now,
        lastActiveAt: now,
        activeThreadId: threadSlot === DEFAULT_ACTIVE_THREAD_SLOT
          ? threadId
          : existing?.activeThreadId,
        activeThreadsByKey: {
          ...activeThreadsByKey,
          [threadSlot]: threadId,
        },
      });
      return threadId;
    }
  }

  async startNewThread(
    userId: number,
    agent: string,
    title?: string,
    context: ActiveThreadContext = {},
  ): Promise<string> {
    const uid = String(userId);
    const threadSlot = normalizeActiveThreadSlot(context.conversationKey);
    if (this.useFirestore && this.db) {
      try {
        const userRef = this.db.collection("users").doc(uid);
        const newThreadId = await this.db.runTransaction(async (t) => {
          const userDoc = await t.get(userRef);
          const activeThreadsByKey = normalizeActiveThreadMap(userDoc.data()?.activeThreadsByKey);
          const currentThreadId = activeThreadsByKey[threadSlot]
            ?? (threadSlot === DEFAULT_ACTIVE_THREAD_SLOT ? userDoc.data()?.activeThreadId : null);
          if (currentThreadId) {
            // V12: Safe upsert instead of strict update
            t.set(this.db!.collection("threads").doc(currentThreadId), { status: "archived" }, { merge: true });
          }
          const threadRef = this.db!.collection("threads").doc();
          const now = new Date();
          t.set(
            threadRef,
            buildInitialThreadRecord(
              uid,
              agent,
              title || `Conversación ${formatDateTitle()}`,
              threadRef.id,
              now,
              context,
            ),
          );
          t.set(
            userRef,
            {
              activeThreadId: threadSlot === DEFAULT_ACTIVE_THREAD_SLOT
                ? threadRef.id
                : userDoc.data()?.activeThreadId,
              activeThreadsByKey: {
                ...activeThreadsByKey,
                [threadSlot]: threadRef.id,
              },
              lastActiveAt: now,
            },
            { merge: true },
          );
          return threadRef.id;
        });
        return newThreadId;
      } catch (e) { logger.error("Failed to start new thread transactionally", { error: e }); throw e; }
    } else {
      const threadId = buildLocalThreadId(uid);
      const now = new Date();
      const existing = this.localUsers.get(uid);
      const activeThreadsByKey = normalizeActiveThreadMap(existing?.activeThreadsByKey);
      const currentThreadId = activeThreadsByKey[threadSlot]
        ?? (threadSlot === DEFAULT_ACTIVE_THREAD_SLOT ? existing?.activeThreadId : null);
      if (currentThreadId) {
        const currentThread = this.localThreads.get(currentThreadId);
        if (currentThread) {
          currentThread.status = "archived";
        }
      }
      this.localThreads.set(
        threadId,
        buildInitialThreadRecord(uid, agent, title || `Conversación ${formatDateTitle()}`, threadId, now, context),
      );
      if (existing) {
        existing.activeThreadId = threadSlot === DEFAULT_ACTIVE_THREAD_SLOT
          ? threadId
          : existing.activeThreadId;
        existing.activeThreadsByKey = {
          ...activeThreadsByKey,
          [threadSlot]: threadId,
        };
        existing.lastActiveAt = now;
      } else {
        this.localUsers.set(uid, {
          userId: uid,
          displayName: uid,
          role: "member",
          agent,
          identity: "",
          preferences: { ...DEFAULT_PREFERENCES },
          experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
          createdAt: now,
          lastActiveAt: now,
          activeThreadId: threadSlot === DEFAULT_ACTIVE_THREAD_SLOT ? threadId : undefined,
          activeThreadsByKey: {
            [threadSlot]: threadId,
          },
        });
      }
      return threadId;
    }
  }

  async getThreadSnapshot(userId: number, threadId?: string, agent = "pristino"): Promise<Thread | null> {
    const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
    if (this.useFirestore && this.db) {
      try {
        const doc = await this.db.collection("threads").doc(tid).get();
        return doc.exists ? ({ threadId: tid, ...(doc.data() as Record<string, unknown>) } as Thread) : null;
      } catch (e) {
        logger.error("Failed to fetch thread snapshot", { error: e, threadId: tid });
        return null;
      }
    }

    return this.localThreads.get(tid) ?? null;
  }

  async updateThreadMemory(
    userId: number,
    threadId: string,
    patch: ThreadMemoryPatch,
    agent = "pristino",
  ): Promise<void> {
    const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
    const summary =
      typeof patch.summary === "string" && patch.summary.trim()
        ? previewMemoryText(patch.summary, 320)
        : patch.proposalState
          ? buildProposalThreadSummary(patch.proposalState)
          : buildGeneralThreadSummary(patch.title, {
            userMessage: patch.lastUserMessagePreview ?? patch.lastMessagePreview ?? null,
            assistantMessage: patch.lastAssistantMessagePreview ?? null,
          });
    const updates: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    for (const [key, value] of Object.entries(patch)) {
      if (value === undefined) {
        continue;
      }
      updates[key] = key === "proposalState" && value && typeof value === "object"
        ? { ...(value as ThreadProposalState) }
        : value;
    }
    if (summary) {
      updates.summary = summary;
      updates.summaryVersion = FieldValue.increment(1);
      updates.summaryUpdatedAt = new Date();
    }

    if (this.useFirestore && this.db) {
      try {
        await this.db.collection("threads").doc(tid).set(updates, { merge: true });
      } catch (e) {
        logger.error("Failed to update thread memory", { error: e, threadId: tid });
      }
      return;
    }

    const current = this.localThreads.get(tid);
    if (!current) {
      return;
    }

    if (patch.proposalState !== undefined) {
      current.proposalState = mergeProposalState(current.proposalState, patch.proposalState);
    }

    if (summary) {
      current.summary = summary;
      current.summaryVersion = (current.summaryVersion ?? 0) + 1;
      current.summaryUpdatedAt = new Date();
    }

    for (const [key, value] of Object.entries(patch)) {
      if (key === "proposalState" || value === undefined) {
        continue;
      }
      const currentRecord = current as unknown as Record<string, unknown>;
      currentRecord[key] = value as unknown;
    }

    current.updatedAt = new Date();
    this.localThreads.set(tid, current);
  }

  async describeThreadMemory(userId: number, threadId?: string, agent = "pristino"): Promise<string> {
    const snapshot = await this.getThreadSnapshot(userId, threadId, agent);
    return buildThreadMemoryContext(snapshot);
  }

  private async loadKnowledgeRecords(category?: string, userId?: number): Promise<KnowledgeRecord[]> {
    if (this.useFirestore && this.db) {
      try {
        let query: Query = this.db.collection("knowledge");
        if (category !== undefined) {
          query = query.where("category", "==", category);
        }
        if (userId !== undefined) {
          query = query.where("scopeUserId", "==", userId);
        }

        const snapshot = await query.get();
        return snapshot.docs
          .map((doc) => {
            const data = doc.data() as Record<string, unknown>;
            if (typeof data.fact !== "string" || !data.fact.trim()) {
              return null;
            }

            return {
              knowledgeId: doc.id,
              ...(data as Omit<KnowledgeRecord, "knowledgeId">),
            } as KnowledgeRecord;
          })
          .filter((record): record is KnowledgeRecord => record !== null);
      } catch (e) {
        logger.error(`Failed to load knowledge records${category ? `: ${category}` : ""}`, { error: e, userId });
        return [];
      }
    }

    return this.localKnowledge
      .filter((record) => (
        (category === undefined || record.category === category)
        && (userId === undefined || record.scopeUserId === userId)
      ))
      .map((record) => ({
        ...record,
        source: { ...record.source },
      }));
  }

  private async reinforceKnowledgeRecord(record: KnowledgeRecord): Promise<void> {
    if (!record.knowledgeId) {
      return;
    }

    if (this.useFirestore && this.db) {
      try {
        const docRef = this.db.collection("knowledge").doc(record.knowledgeId);
        const doc = await docRef.get();
        if (!doc.exists) {
          return;
        }
        const data = doc.data() as Record<string, unknown> | undefined;
        const currentCount = typeof data?.reinforcementCount === "number" ? data.reinforcementCount : 0;
        await docRef.update({
          reinforcementCount: currentCount + 1,
          lastReinforcedAt: new Date(),
          updatedAt: new Date(),
        });
      } catch (e) {
        logger.error("Failed to reinforce knowledge", { error: e, knowledgeId: record.knowledgeId });
      }
      return;
    }

    const localRecord = this.localKnowledge.find((entry) => entry.knowledgeId === record.knowledgeId);
    if (!localRecord) {
      return;
    }

    localRecord.reinforcementCount = (localRecord.reinforcementCount ?? 0) + 1;
    localRecord.lastReinforcedAt = new Date();
    localRecord.updatedAt = new Date();
  }

  async describeSemanticMemory(
    userId: number,
    query: string,
    threadId?: string,
    agent = "pristino",
  ): Promise<string> {
    void threadId;
    void agent;

    const profile = await this.getUserProfile(userId);
    const userRecords = await this.loadKnowledgeRecords(undefined, userId);
    const sharedRecords = [
      ...(await this.loadKnowledgeRecords("team_preference")),
      ...(await this.loadKnowledgeRecords("synergy_fact")),
    ];

    const deduped: KnowledgeRecord[] = [];
    const seenKeys = new Set<string>();
    for (const record of [...userRecords, ...sharedRecords]) {
      const key = record.knowledgeId
        ?? `${record.category}::${record.scope}::${record.scopeUserId ?? "shared"}::${normalizeSemanticText(record.fact)}`;
      if (seenKeys.has(key)) {
        continue;
      }
      seenKeys.add(key);
      deduped.push(record);
    }

    const rankedKnowledge = rankKnowledgeRecords(deduped, query);
    const queryTokens = tokenizeSemanticText(query);
    const queryBackedKnowledge = queryTokens.length > 0
      ? rankedKnowledge.filter((record) => scoreKnowledgeRecord(record, queryTokens, query) > 0)
      : rankedKnowledge;
    const selectedKnowledge = (queryBackedKnowledge.length > 0 ? queryBackedKnowledge : rankedKnowledge)
      .slice(0, MAX_SEMANTIC_KNOWLEDGE_RESULTS);

    for (const record of selectedKnowledge) {
      await this.reinforceKnowledgeRecord(record);
    }

    const ragChunks = await this.searchRagChunks(userId, query, MAX_SEMANTIC_RAG_RESULTS);
    const context = buildSemanticMemoryContext(profile, selectedKnowledge, ragChunks, query);
    return context;
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
    const preview = previewMemoryText(safe, 220);

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
        batch.set(
          this.db.collection("threads").doc(tid),
          {
            updatedAt: FieldValue.serverTimestamp(),
            lastMessageRole: role,
            lastMessagePreview: preview,
            lastMessageAt: new Date(),
            messageCount: FieldValue.increment(1),
            ...(role === "user"
              ? { lastUserMessagePreview: preview }
              : role === "assistant"
                ? { lastAssistantMessagePreview: preview }
                : {}),
          },
          { merge: true },
        );
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
      const thread = this.localThreads.get(tid);
      if (thread) {
        thread.lastMessageRole = role;
        thread.lastMessagePreview = preview;
        thread.lastMessageAt = new Date();
        thread.messageCount = (thread.messageCount ?? 0) + 1;
        if (role === "user") {
          thread.lastUserMessagePreview = preview;
        } else if (role === "assistant") {
          thread.lastAssistantMessagePreview = preview;
        }
        thread.updatedAt = new Date();
        this.localThreads.set(tid, thread);
      }
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
    const confidence = validateConfidence(options.confidence);

    if (this.useFirestore && this.db) {
      try {
        const ref = await this.db.collection("knowledge").add({
          category, scope: "user", scopeUserId: userId, fact: safe,
          confidence,
          source: { type: options.sourceType ?? "manual", ref: options.sourceRef ?? null, extractedAt: now },
          reinforcementCount: 1, lastReinforcedAt: now,
          createdAt: now, updatedAt: now, permanent: options.permanent ?? true,
        });
        logger.info(`Added knowledge: ${category}`, { userId, knowledgeId: ref.id });
      } catch (e) { logger.error(`Failed to add knowledge: ${category}`, { error: e }); }
    } else {
      const knowledgeId = `knowledge_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      this.localKnowledge.push({
        knowledgeId,
        category, scope: "user", scopeUserId: userId, fact: safe,
        confidence,
        source: { type: (options.sourceType ?? "manual") as KnowledgeEntry["source"]["type"], ref: options.sourceRef, extractedAt: now },
        reinforcementCount: 1, lastReinforcedAt: now,
        createdAt: now, updatedAt: now, permanent: options.permanent ?? true,
      });
      if (this.localKnowledge.length > MAX_LOCAL_KNOWLEDGE) this.localKnowledge.shift();
    }
  }

  async getKnowledge(category: string, userId?: number, limit = 20): Promise<string[]> {
    const records = await this.loadKnowledgeRecords(category, userId);
    const selected = sortKnowledgeRecords(records).slice(0, Math.max(0, limit));

    for (const record of selected) {
      await this.reinforceKnowledgeRecord(record);
    }

    return selected.map((record) => record.fact);
  }

  async reinforceKnowledge(knowledgeId: string): Promise<void> {
    if (!knowledgeId) return;
    await this.reinforceKnowledgeRecord({ knowledgeId } as KnowledgeRecord);
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
    if (this.useFirestore && this.db) {
      try {
        const snapshot = await this.db.collection("rag_chunks")
          .where("userId", "==", uid)
          .get();
        const records = snapshot.docs
          .map((doc) => doc.data() as RagChunk)
          .filter((chunk) => typeof chunk.content === "string" && chunk.content.trim());
        const ranked = rankRagChunks(records, query);
        if (query.trim()) {
          const queryTokens = tokenizeSemanticText(query);
          const filtered = ranked.filter((chunk) => scoreRagChunk(chunk, queryTokens, query) > 0);
          return (filtered.length > 0 ? filtered : ranked).slice(0, Math.max(0, limit));
        }
        return ranked.slice(0, Math.max(0, limit));
      } catch (e) { logger.error("Failed to search RAG chunks", { error: e }); return []; }
    } else {
      const records = this.localRagChunks.filter((chunk) => chunk.userId === uid);
      const ranked = rankRagChunks(records, query);
      if (query.trim()) {
        const queryTokens = tokenizeSemanticText(query);
        const filtered = ranked.filter((chunk) => scoreRagChunk(chunk, queryTokens, query) > 0);
        return (filtered.length > 0 ? filtered : ranked).slice(0, Math.max(0, limit));
      }
      return ranked.slice(0, Math.max(0, limit));
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
        const deleteRefs = async (refs: Array<{ ref: { delete: () => Promise<unknown> } }>) => {
          const chunkSize = 400;
          for (let i = 0; i < refs.length; i += chunkSize) {
            const batch = this.db!.batch();
            for (const doc of refs.slice(i, i + chunkSize)) {
              batch.delete(doc.ref as never);
            }
            await batch.commit();
          }
        };

        // Working layer: delete messages first, then thread docs, then user profile.
        const messageSnap = await this.db.collectionGroup("messages").where("userId", "==", userId).get();
        const threadSnap = await this.db.collection("threads").where("userId", "==", uid).get();
        await deleteRefs(messageSnap.docs);
        await deleteRefs(threadSnap.docs);
        await this.db.collection("users").doc(uid).delete();

        // Episodic: voice_notes
        const vnSnap = await this.db.collection("voice_notes").where("userId", "==", uid).get();
        await deleteRefs(vnSnap.docs);

        // Episodic: meetings
        const mtSnap = await this.db.collection("meetings").where("userId", "==", uid).get();
        await deleteRefs(mtSnap.docs);

        // Episodic: interaction_log
        const ilSnap = await this.db.collection("interaction_log").where("userId", "==", uid).get();
        await deleteRefs(ilSnap.docs);

        // Semantic: knowledge
        const knSnap = await this.db.collection("knowledge").where("scopeUserId", "==", userId).get();
        await deleteRefs(knSnap.docs);

        // Semantic: tasks
        const tkSnap = await this.db.collection("tasks").where("userId", "==", uid).get();
        await deleteRefs(tkSnap.docs);

        // Semantic: rag_chunks
        const rcSnap = await this.db.collection("rag_chunks").where("userId", "==", uid).get();
        await deleteRefs(rcSnap.docs);

        const elapsed = Date.now() - start;
        logger.info("User data purged", { userId: uid, elapsedMs: elapsed });
      } catch (e) {
        logger.error("Failed to purge user data", { error: e, userId: uid });
        throw e;
      }
    } else {
      // In-memory: remove from all local stores
      // Working layer
      for (const messages of this.localMessages.values()) {
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
