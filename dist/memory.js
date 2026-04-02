import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { logger } from "./logger.js";
import fs from 'fs';
import path from 'path';
import { buildGeneralThreadSummary, buildProposalThreadSummary, buildThreadMemoryContext, previewMemoryText, } from "./thread-memory.js";
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
function isManagedGoogleRuntime() {
    return Boolean(process.env.FIREBASE_CONFIG ||
        process.env.FUNCTION_TARGET ||
        process.env.K_SERVICE ||
        process.env.GCLOUD_PROJECT ||
        process.env.GOOGLE_CLOUD_PROJECT);
}
function formatDateTitle() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function buildInitialThreadRecord(userId, agent, title, threadId, now) {
    return {
        threadId,
        userId,
        title,
        status: "active",
        agent,
        conversationKind: "general",
        summary: "",
        summaryVersion: 0,
        messageCount: 0,
        createdAt: now,
        updatedAt: now,
    };
}
function mergeProposalState(existing, patch) {
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
function compactSemanticWhitespace(value) {
    return value
        .replace(/\r/g, "")
        .replace(/\u202f/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function stripSemanticNoise(value) {
    return compactSemanticWhitespace(value
        .replace(/<\/?SYSTEM_OVERRIDE>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\[[^\]]+\]/g, " ")
        .replace(/\bURI:\s*\S+/gi, " ")
        .replace(/\bhttps?:\/\/\S+/gi, " ")
        .replace(/\bwww\.\S+/gi, " "));
}
function normalizeSemanticText(value) {
    return compactSemanticWhitespace(stripSemanticNoise(value)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s/-]+/g, " ")
        .replace(/\s+/g, " ")).trim();
}
function tokenizeSemanticText(value) {
    const normalized = normalizeSemanticText(value);
    if (!normalized) {
        return [];
    }
    return normalized
        .split(" ")
        .map((token) => token.trim())
        .filter((token) => token.length >= 2 && !SEMANTIC_STOPWORDS.has(token));
}
function countSharedTokens(leftTokens, rightTokens) {
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
function safeDate(value) {
    if (value instanceof Date) {
        return value;
    }
    if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
        return value.toDate();
    }
    return null;
}
function timestampValue(value) {
    return safeDate(value)?.getTime() ?? 0;
}
function normalizeConfidence(value) {
    if (typeof value !== "number" || Number.isNaN(value) || !Number.isFinite(value)) {
        return 0.5;
    }
    return Math.min(1, Math.max(0, value));
}
function validateConfidence(value) {
    const confidence = typeof value === "number" ? value : 0.5;
    if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
        throw new RangeError(`Knowledge confidence must be between 0.0 and 1.0; received ${String(value)}`);
    }
    return confidence;
}
function semanticAgeBonus(value) {
    if (!value) {
        return 0;
    }
    const ageDays = Math.max(0, (Date.now() - value.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, 7 - ageDays) / 7;
}
function formatKnowledgeSource(source) {
    const type = source?.type ?? "manual";
    const ref = previewMemoryText(source?.ref, 60);
    return ref ? `${type}:${ref}` : type;
}
function scoreKnowledgeRecord(record, queryTokens, queryText = "") {
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
function compareKnowledgeRecords(left, right) {
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
function sortKnowledgeRecords(records) {
    return [...records].sort(compareKnowledgeRecords);
}
function rankKnowledgeRecords(records, queryText = "") {
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
function scoreRagChunk(chunk, queryTokens, queryText = "") {
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
function compareRagChunks(left, right) {
    const createdDelta = timestampValue(right.createdAt) - timestampValue(left.createdAt);
    if (createdDelta !== 0) {
        return createdDelta;
    }
    return normalizeSemanticText(right.content).localeCompare(normalizeSemanticText(left.content));
}
function rankRagChunks(records, queryText = "") {
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
function buildSemanticMemoryContext(profile, knowledgeRecords, ragChunks, query = "") {
    const lines = [
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
//  DEFAULTS
// ─────────────────────────────────────────────
const DEFAULT_PREFERENCES = {
    language: "es", timezone: "America/Bogota", responseStyle: "minto_dense",
    formatRules: ["no_bold", "no_emoji", "dash_hierarchy"], topicsOfInterest: [],
};
const DEFAULT_EXPERIENCE = {
    totalMessages: 0, totalVoiceNotes: 0, totalMeetings: 0,
    firstInteraction: new Date(), topCategories: [],
};
// ─────────────────────────────────────────────
//  MEMORY CLASS
// ─────────────────────────────────────────────
export class Memory {
    db = null;
    useFirestore = false;
    // In-memory fallback stores
    localMessages = new Map();
    localKnowledge = [];
    localUsers = new Map();
    localThreads = new Map();
    localTasks = new Map();
    localVoiceNotes = [];
    localMeetings = [];
    localInteractionLog = [];
    localRagChunks = [];
    constructor() {
        try {
            if (!getApps().length) {
                const rawCredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
                if (rawCredPath) {
                    const absoluteCredPath = path.resolve(process.cwd(), rawCredPath);
                    if (fs.existsSync(absoluteCredPath)) {
                        initializeApp({ credential: cert(absoluteCredPath) });
                        this.useFirestore = true;
                    }
                    else {
                        logger.warn("GOOGLE_APPLICATION_CREDENTIALS path not found. Using in-memory fallback.", {
                            raw: rawCredPath,
                            absolute: absoluteCredPath
                        });
                    }
                }
                else if (isManagedGoogleRuntime()) {
                    initializeApp();
                    this.useFirestore = true;
                    logger.info("Using managed Google runtime credentials for Firestore");
                }
                else {
                    logger.warn("No GOOGLE_APPLICATION_CREDENTIALS in env. Using in-memory fallback (volatile).");
                }
            }
            else {
                this.useFirestore = true;
            }
            if (this.useFirestore) {
                this.db = getFirestore();
                logger.info("Cognitive Memory initialized (Firestore)");
            }
            else {
                logger.info("Cognitive Memory initialized (in-memory, no persistence)");
            }
        }
        catch (e) {
            logger.error("Firestore init failed, falling back to in-memory", { error: e });
            this.db = null;
        }
    }
    // ─────────────────────────────────────────────
    //  THREADS
    // ─────────────────────────────────────────────
    async getOrCreateActiveThread(userId, agent) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const userRef = this.db.collection("users").doc(uid);
                const newThreadId = await this.db.runTransaction(async (t) => {
                    const userDoc = await t.get(userRef);
                    if (userDoc.exists && userDoc.data()?.activeThreadId) {
                        return userDoc.data().activeThreadId;
                    }
                    const threadRef = this.db.collection("threads").doc();
                    const now = new Date();
                    t.set(threadRef, buildInitialThreadRecord(uid, agent, `Conversación ${formatDateTitle()}`, threadRef.id, now));
                    t.set(userRef, {
                        userId: uid, displayName: uid, role: "member", agent, identity: "",
                        preferences: DEFAULT_PREFERENCES, experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
                        createdAt: now, lastActiveAt: now, activeThreadId: threadRef.id,
                    }, { merge: true });
                    return threadRef.id;
                });
                logger.info("Active thread resolved", { userId: uid, threadId: newThreadId });
                return newThreadId;
            }
            catch (e) {
                logger.error("Failed to get/create thread transactionally", { error: e });
                throw e; // V13: Do not mask error with fallback_uid. Let it bubble up.
            }
        }
        else {
            const existing = this.localUsers.get(uid);
            if (existing?.activeThreadId)
                return existing.activeThreadId;
            const threadId = `thread_${uid}_${Date.now()}`;
            const now = new Date();
            this.localThreads.set(threadId, buildInitialThreadRecord(uid, agent, `Conversación ${formatDateTitle()}`, threadId, now));
            this.localUsers.set(uid, {
                userId: uid, displayName: uid, role: "member", agent, identity: "",
                preferences: { ...DEFAULT_PREFERENCES }, experience: { ...DEFAULT_EXPERIENCE, firstInteraction: now },
                createdAt: now, lastActiveAt: now, activeThreadId: threadId,
            });
            return threadId;
        }
    }
    async startNewThread(userId, agent, title) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const userRef = this.db.collection("users").doc(uid);
                const newThreadId = await this.db.runTransaction(async (t) => {
                    const userDoc = await t.get(userRef);
                    const currentThreadId = userDoc.data()?.activeThreadId;
                    if (currentThreadId) {
                        // V12: Safe upsert instead of strict update
                        t.set(this.db.collection("threads").doc(currentThreadId), { status: "archived" }, { merge: true });
                    }
                    const threadRef = this.db.collection("threads").doc();
                    const now = new Date();
                    t.set(threadRef, buildInitialThreadRecord(uid, agent, title || `Conversación ${formatDateTitle()}`, threadRef.id, now));
                    t.set(userRef, { activeThreadId: threadRef.id, lastActiveAt: now }, { merge: true });
                    return threadRef.id;
                });
                return newThreadId;
            }
            catch (e) {
                logger.error("Failed to start new thread transactionally", { error: e });
                throw e;
            }
        }
        else {
            const threadId = `thread_${uid}_${Date.now()}`;
            const now = new Date();
            const existing = this.localUsers.get(uid);
            if (existing?.activeThreadId) {
                const t = this.localThreads.get(existing.activeThreadId);
                if (t)
                    t.status = "archived";
            }
            this.localThreads.set(threadId, buildInitialThreadRecord(uid, agent, title || `Conversación ${formatDateTitle()}`, threadId, now));
            if (existing) {
                existing.activeThreadId = threadId;
                existing.lastActiveAt = now;
            }
            return threadId;
        }
    }
    async getThreadSnapshot(userId, threadId, agent = "pristino") {
        const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
        if (this.useFirestore && this.db) {
            try {
                const doc = await this.db.collection("threads").doc(tid).get();
                return doc.exists ? { threadId: tid, ...doc.data() } : null;
            }
            catch (e) {
                logger.error("Failed to fetch thread snapshot", { error: e, threadId: tid });
                return null;
            }
        }
        return this.localThreads.get(tid) ?? null;
    }
    async updateThreadMemory(userId, threadId, patch, agent = "pristino") {
        const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
        const summary = typeof patch.summary === "string" && patch.summary.trim()
            ? previewMemoryText(patch.summary, 320)
            : patch.proposalState
                ? buildProposalThreadSummary(patch.proposalState)
                : buildGeneralThreadSummary(patch.title, {
                    userMessage: patch.lastUserMessagePreview ?? patch.lastMessagePreview ?? null,
                    assistantMessage: patch.lastAssistantMessagePreview ?? null,
                });
        const updates = {
            updatedAt: new Date(),
        };
        for (const [key, value] of Object.entries(patch)) {
            if (value === undefined) {
                continue;
            }
            updates[key] = key === "proposalState" && value && typeof value === "object"
                ? { ...value }
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
            }
            catch (e) {
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
            const currentRecord = current;
            currentRecord[key] = value;
        }
        current.updatedAt = new Date();
        this.localThreads.set(tid, current);
    }
    async describeThreadMemory(userId, threadId, agent = "pristino") {
        const snapshot = await this.getThreadSnapshot(userId, threadId, agent);
        return buildThreadMemoryContext(snapshot);
    }
    async loadKnowledgeRecords(category, userId) {
        if (this.useFirestore && this.db) {
            try {
                let query = this.db.collection("knowledge");
                if (category !== undefined) {
                    query = query.where("category", "==", category);
                }
                if (userId !== undefined) {
                    query = query.where("scopeUserId", "==", userId);
                }
                const snapshot = await query.get();
                return snapshot.docs
                    .map((doc) => {
                    const data = doc.data();
                    if (typeof data.fact !== "string" || !data.fact.trim()) {
                        return null;
                    }
                    return {
                        knowledgeId: doc.id,
                        ...data,
                    };
                })
                    .filter((record) => record !== null);
            }
            catch (e) {
                logger.error(`Failed to load knowledge records${category ? `: ${category}` : ""}`, { error: e, userId });
                return [];
            }
        }
        return this.localKnowledge
            .filter((record) => ((category === undefined || record.category === category)
            && (userId === undefined || record.scopeUserId === userId)))
            .map((record) => ({
            ...record,
            source: { ...record.source },
        }));
    }
    async reinforceKnowledgeRecord(record) {
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
                const data = doc.data();
                const currentCount = typeof data?.reinforcementCount === "number" ? data.reinforcementCount : 0;
                await docRef.update({
                    reinforcementCount: currentCount + 1,
                    lastReinforcedAt: new Date(),
                    updatedAt: new Date(),
                });
            }
            catch (e) {
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
    async describeSemanticMemory(userId, query, threadId, agent = "pristino") {
        void threadId;
        void agent;
        const profile = await this.getUserProfile(userId);
        const userRecords = await this.loadKnowledgeRecords(undefined, userId);
        const sharedRecords = [
            ...(await this.loadKnowledgeRecords("team_preference")),
            ...(await this.loadKnowledgeRecords("synergy_fact")),
        ];
        const deduped = [];
        const seenKeys = new Set();
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
    async addMessage(userId, role, content, threadId, agent = "pristino", sourceType = "text", sourceRef) {
        if (!VALID_ROLES.has(role)) {
            logger.error("Invalid message role", { role });
            return;
        }
        if (!content || !content.trim()) {
            logger.warn("Empty content rejected", { userId });
            return;
        }
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
                batch.set(this.db.collection("threads").doc(tid), {
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
                }, { merge: true });
                // V1 fix: dot-notation prevents sibling field destruction
                batch.set(this.db.collection("users").doc(String(userId)), { "experience.totalMessages": FieldValue.increment(1), lastActiveAt: new Date() }, { merge: true });
                await batch.commit();
            }
            catch (e) {
                logger.error("Failed to insert message batch", { error: e, threadId: tid });
                throw e;
            }
        }
        else {
            const existing = this.localMessages.get(tid) ?? [];
            existing.push({ role, content: safe, timestamp: Date.now(), threadId: tid, sourceType, sourceRef });
            if (existing.length > MAX_LOCAL_MESSAGES)
                existing.splice(0, existing.length - MAX_LOCAL_MESSAGES);
            this.localMessages.set(tid, existing);
            const thread = this.localThreads.get(tid);
            if (thread) {
                thread.lastMessageRole = role;
                thread.lastMessagePreview = preview;
                thread.lastMessageAt = new Date();
                thread.messageCount = (thread.messageCount ?? 0) + 1;
                if (role === "user") {
                    thread.lastUserMessagePreview = preview;
                }
                else if (role === "assistant") {
                    thread.lastAssistantMessagePreview = preview;
                }
                thread.updatedAt = new Date();
                this.localThreads.set(tid, thread);
            }
        }
    }
    async getRecentMessages(userId, limit = 20, threadId, agent = "pristino") {
        const tid = threadId || await this.getOrCreateActiveThread(userId, agent);
        if (this.useFirestore && this.db) {
            try {
                const snapshot = await this.db.collection("threads").doc(tid).collection("messages")
                    .orderBy("timestamp", "desc").limit(limit).get();
                return snapshot.docs.map(doc => {
                    const d = doc.data();
                    return { role: d.role, content: d.content, timestamp: d.timestamp, threadId: tid, sourceType: d.sourceType, sourceRef: d.sourceRef };
                }).reverse();
            }
            catch (e) {
                logger.error("Failed to fetch messages", { error: e });
                return [];
            }
        }
        else {
            return (this.localMessages.get(tid) ?? []).slice(-limit);
        }
    }
    // ─────────────────────────────────────────────
    //  VOICE NOTES (Episodic Layer)
    // ─────────────────────────────────────────────
    async addVoiceNote(note) {
        if (!note.transcript?.trim()) {
            logger.warn("Empty voice note rejected");
            return "";
        }
        const safe = note.transcript.length > MAX_CONTENT_LENGTH ? note.transcript.slice(0, MAX_CONTENT_LENGTH) : note.transcript;
        if (this.useFirestore && this.db) {
            try {
                const ref = this.db.collection("voice_notes").doc();
                await ref.set({ ...note, transcript: safe, createdAt: new Date(), ragChunked: false });
                // V1 fix: dot-notation prevents sibling field destruction
                await this.db.collection("users").doc(note.userId).set({ "experience.totalVoiceNotes": FieldValue.increment(1), lastActiveAt: new Date() }, { merge: true });
                logger.info("Voice note stored", { noteId: ref.id, userId: note.userId });
                return ref.id;
            }
            catch (e) {
                logger.error("Failed to store voice note", { error: e });
                return "";
            }
        }
        else {
            const noteId = `vn_${Date.now()}`;
            this.localVoiceNotes.push({ ...note, noteId, transcript: safe, createdAt: new Date(), ragChunked: false });
            if (this.localVoiceNotes.length > MAX_LOCAL_VOICE_NOTES)
                this.localVoiceNotes.shift();
            return noteId;
        }
    }
    async getVoiceNotes(userId, limit = 10) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const snapshot = await this.db.collection("voice_notes")
                    .where("userId", "==", uid).orderBy("createdAt", "desc").limit(limit).get();
                return snapshot.docs.map(doc => ({ noteId: doc.id, ...doc.data() }));
            }
            catch (e) {
                logger.error("Failed to get voice notes", { error: e });
                return [];
            }
        }
        else {
            return this.localVoiceNotes.filter(vn => vn.userId === uid).slice(-limit);
        }
    }
    // ─────────────────────────────────────────────
    //  MEETINGS (Episodic Layer)
    // ─────────────────────────────────────────────
    async addMeeting(meeting) {
        if (!meeting.transcript?.trim()) {
            logger.warn("Empty meeting transcript rejected");
            return "";
        }
        const safe = meeting.transcript.length > MAX_CONTENT_LENGTH ? meeting.transcript.slice(0, MAX_CONTENT_LENGTH) : meeting.transcript;
        if (this.useFirestore && this.db) {
            try {
                const ref = this.db.collection("meetings").doc();
                await ref.set({ ...meeting, transcript: safe, createdAt: new Date(), ragChunked: false });
                // V1 fix: dot-notation prevents sibling field destruction
                await this.db.collection("users").doc(meeting.userId).set({ "experience.totalMeetings": FieldValue.increment(1), lastActiveAt: new Date() }, { merge: true });
                logger.info("Meeting stored", { meetingId: ref.id, title: meeting.title });
                return ref.id;
            }
            catch (e) {
                logger.error("Failed to store meeting", { error: e });
                return "";
            }
        }
        else {
            const meetingId = `mt_${Date.now()}`;
            this.localMeetings.push({ ...meeting, meetingId, transcript: safe, createdAt: new Date(), ragChunked: false });
            return meetingId;
        }
    }
    async getMeetings(userId, limit = 10) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const snapshot = await this.db.collection("meetings")
                    .where("userId", "==", uid).orderBy("createdAt", "desc").limit(limit).get();
                return snapshot.docs.map(doc => ({ meetingId: doc.id, ...doc.data() }));
            }
            catch (e) {
                logger.error("Failed to get meetings", { error: e });
                return [];
            }
        }
        else {
            return this.localMeetings.filter(m => m.userId === uid).slice(-limit);
        }
    }
    // ─────────────────────────────────────────────
    //  INTERACTION LOG (Episodic Layer)
    // ─────────────────────────────────────────────
    async logInteraction(entry) {
        if (!entry.content?.trim())
            return;
        if (this.useFirestore && this.db) {
            try {
                await this.db.collection("interaction_log").add({ ...entry, createdAt: new Date() });
            }
            catch (e) {
                logger.error("Failed to log interaction", { error: e });
            }
        }
        else {
            this.localInteractionLog.push({ ...entry, createdAt: new Date() });
        }
    }
    async getInteractionLogs(userId, type, limit = 20) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                let query = this.db.collection("interaction_log").where("userId", "==", uid);
                if (type)
                    query = query.where("type", "==", type);
                const snapshot = await query.orderBy("createdAt", "desc").limit(limit).get();
                return snapshot.docs.map(doc => doc.data());
            }
            catch (e) {
                logger.error("Failed to get interaction logs", { error: e });
                return [];
            }
        }
        else {
            return this.localInteractionLog
                .filter(l => l.userId === uid && (!type || l.type === type))
                .slice(-limit);
        }
    }
    // ─────────────────────────────────────────────
    //  KNOWLEDGE (Semantic Layer — enriched)
    // ─────────────────────────────────────────────
    async addKnowledge(category, userId, fact, options = {}) {
        if (!fact?.trim())
            return;
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
            }
            catch (e) {
                logger.error(`Failed to add knowledge: ${category}`, { error: e });
            }
        }
        else {
            const knowledgeId = `knowledge_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
            this.localKnowledge.push({
                knowledgeId,
                category, scope: "user", scopeUserId: userId, fact: safe,
                confidence,
                source: { type: (options.sourceType ?? "manual"), ref: options.sourceRef, extractedAt: now },
                reinforcementCount: 1, lastReinforcedAt: now,
                createdAt: now, updatedAt: now, permanent: options.permanent ?? true,
            });
            if (this.localKnowledge.length > MAX_LOCAL_KNOWLEDGE)
                this.localKnowledge.shift();
        }
    }
    async getKnowledge(category, userId, limit = 20) {
        const records = await this.loadKnowledgeRecords(category, userId);
        const selected = sortKnowledgeRecords(records).slice(0, Math.max(0, limit));
        for (const record of selected) {
            await this.reinforceKnowledgeRecord(record);
        }
        return selected.map((record) => record.fact);
    }
    async reinforceKnowledge(knowledgeId) {
        if (!knowledgeId)
            return;
        await this.reinforceKnowledgeRecord({ knowledgeId });
    }
    // Backward-compatible wrappers
    async addTeamPreference(userId, preference) { return this.addKnowledge("team_preference", userId, preference); }
    async getTeamPreferences() { return this.getKnowledge("team_preference"); }
    async addSynergyFact(userId, fact) { return this.addKnowledge("synergy_fact", userId, fact); }
    async getSynergyFacts() { return this.getKnowledge("synergy_fact"); }
    // ─────────────────────────────────────────────
    //  TASKS (enhanced with source provenance)
    // ─────────────────────────────────────────────
    async addTask(userId, title, description, priority = "medium", threadId, source) {
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
            }
            catch (e) {
                logger.error("Failed to create task", { error: e });
                return "";
            }
        }
        else {
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
    async getUserTasks(userId, status) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                let query = this.db.collection("tasks").where("userId", "==", uid);
                if (status)
                    query = query.where("status", "==", status);
                const snapshot = await query.orderBy("createdAt", "desc").limit(50).get();
                return snapshot.docs.map(doc => ({ taskId: doc.id, ...doc.data() }));
            }
            catch (e) {
                logger.error("Failed to get tasks", { error: e });
                return [];
            }
        }
        else {
            return [...this.localTasks.values()]
                .filter(t => t.userId === uid && (!status || t.status === status))
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        }
    }
    async updateTaskStatus(taskId, status) {
        if (!taskId) {
            logger.error("updateTaskStatus called with empty taskId");
            return;
        }
        if (this.useFirestore && this.db) {
            try {
                const update = { status };
                if (status === "done")
                    update.completedAt = new Date();
                await this.db.collection("tasks").doc(taskId).update(update);
            }
            catch (e) {
                logger.error("Failed to update task", { error: e });
            }
        }
        else {
            const task = this.localTasks.get(taskId);
            if (task) {
                task.status = status;
                if (status === "done")
                    task.completedAt = new Date();
            }
        }
    }
    // ─────────────────────────────────────────────
    //  USER PROFILES (enriched)
    // ─────────────────────────────────────────────
    async getUserProfile(userId) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const doc = await this.db.collection("users").doc(uid).get();
                return doc.exists ? doc.data() : null;
            }
            catch (e) {
                logger.error("Failed to get user profile", { error: e });
                return null;
            }
        }
        else {
            return this.localUsers.get(uid) || null;
        }
    }
    async updateUserPreferences(userId, preferences) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const updates = { lastActiveAt: new Date() };
                for (const [key, value] of Object.entries(preferences)) {
                    updates[`preferences.${key}`] = value;
                }
                await this.db.collection("users").doc(uid).set(updates, { merge: true });
            }
            catch (e) {
                logger.error("Failed to update preferences", { error: e });
            }
        }
        else {
            const user = this.localUsers.get(uid);
            if (user) {
                user.preferences = { ...user.preferences, ...preferences };
                user.lastActiveAt = new Date();
            }
        }
    }
    async setUserIdentity(userId, identity) {
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                await this.db.collection("users").doc(uid).set({ identity }, { merge: true });
            }
            catch (e) {
                logger.error("Failed to set user identity", { error: e });
            }
        }
        else {
            const user = this.localUsers.get(uid);
            if (user)
                user.identity = identity;
        }
    }
    // ─────────────────────────────────────────────
    //  RAG CHUNKS (Semantic Layer)
    // ─────────────────────────────────────────────
    async addRagChunk(chunk) {
        if (!chunk.content?.trim())
            return "";
        if (this.useFirestore && this.db) {
            try {
                const ref = this.db.collection("rag_chunks").doc();
                await ref.set({ ...chunk, createdAt: new Date() });
                return ref.id;
            }
            catch (e) {
                logger.error("Failed to add RAG chunk", { error: e });
                return "";
            }
        }
        else {
            const id = `rag_${Date.now()}_${chunk.chunkIndex}`;
            this.localRagChunks.push({ ...chunk, createdAt: new Date() });
            return id;
        }
    }
    async searchRagChunks(userId, query, limit = 5) {
        // Note: Full vector search requires embeddings + findNearest(). This is a text-match fallback
        // for local dev. In Firestore mode, use the Vertex AI extension or direct findNearest() calls.
        const uid = String(userId);
        if (this.useFirestore && this.db) {
            try {
                const snapshot = await this.db.collection("rag_chunks")
                    .where("userId", "==", uid)
                    .get();
                const records = snapshot.docs
                    .map((doc) => doc.data())
                    .filter((chunk) => typeof chunk.content === "string" && chunk.content.trim());
                const ranked = rankRagChunks(records, query);
                if (query.trim()) {
                    const queryTokens = tokenizeSemanticText(query);
                    const filtered = ranked.filter((chunk) => scoreRagChunk(chunk, queryTokens, query) > 0);
                    return (filtered.length > 0 ? filtered : ranked).slice(0, Math.max(0, limit));
                }
                return ranked.slice(0, Math.max(0, limit));
            }
            catch (e) {
                logger.error("Failed to search RAG chunks", { error: e });
                return [];
            }
        }
        else {
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
    classifyLifecycle(layer) {
        if (layer === "working")
            return "ephemeral";
        return "permanent";
    }
    /**
     * Purges expired working memory messages across all threads (scheduled sweep).
     * In Firestore mode, deletes messages whose expiresAt is in the past.
     * In in-memory mode, removes messages older than TTL_MS from all threads.
     */
    async purgeExpiredWorking() {
        const now = Date.now();
        if (this.useFirestore && this.db) {
            try {
                const snapshot = await this.db.collectionGroup("messages")
                    .where("expiresAt", "<", new Date(now))
                    .get();
                const batch = this.db.batch();
                snapshot.docs.forEach(doc => batch.delete(doc.ref));
                if (snapshot.docs.length > 0)
                    await batch.commit();
                logger.info("Purged expired working memory", { count: snapshot.docs.length });
                return snapshot.docs.length;
            }
            catch (e) {
                logger.error("Failed to purge expired working memory", { error: e });
                return 0;
            }
        }
        else {
            let purged = 0;
            const expiryThreshold = now - TTL_MS;
            for (const [threadId, messages] of this.localMessages.entries()) {
                const surviving = messages.filter(m => m.timestamp > expiryThreshold);
                purged += messages.length - surviving.length;
                if (surviving.length === 0) {
                    this.localMessages.delete(threadId);
                }
                else {
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
    async purgeUser(userId) {
        const uid = String(userId);
        const start = Date.now();
        logger.info("Purging all user data", { userId: uid });
        if (this.useFirestore && this.db) {
            try {
                const deleteRefs = async (refs) => {
                    const chunkSize = 400;
                    for (let i = 0; i < refs.length; i += chunkSize) {
                        const batch = this.db.batch();
                        for (const doc of refs.slice(i, i + chunkSize)) {
                            batch.delete(doc.ref);
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
            }
            catch (e) {
                logger.error("Failed to purge user data", { error: e, userId: uid });
                throw e;
            }
        }
        else {
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
                if (task.userId === uid)
                    this.localTasks.delete(taskId);
            }
            this.localRagChunks = this.localRagChunks.filter(c => c.userId !== uid);
            const elapsed = Date.now() - start;
            logger.info("User data purged (in-memory)", { userId: uid, elapsedMs: elapsed });
        }
    }
    close() {
        logger.info("Cognitive Memory closed", { mode: this.useFirestore ? "firestore" : "in-memory" });
    }
}
