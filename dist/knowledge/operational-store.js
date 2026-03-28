import fs from "node:fs";
import path from "node:path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue, } from "firebase-admin/firestore";
import { logger } from "../logger.js";
const KB_SYSTEM_USER_ID = "__nexus_operational__";
const KB_STATUS_DOC_ID = "nexus_operational_kb";
const KB_MODULES_COLLECTION = "operational_process_modules";
const KB_ID = "nexus_operational";
const MAX_SEARCH_RESULTS = 8;
const MAX_BATCH_SIZE = 400;
function isManagedGoogleRuntime() {
    return Boolean(process.env.FIREBASE_CONFIG ||
        process.env.FUNCTION_TARGET ||
        process.env.K_SERVICE ||
        process.env.GCLOUD_PROJECT ||
        process.env.GOOGLE_CLOUD_PROJECT);
}
function normalizeForSearch(value) {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9\s/-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}
function tokenize(value) {
    const normalized = normalizeForSearch(value);
    if (!normalized)
        return [];
    return normalized
        .split(" ")
        .map((token) => token.trim())
        .filter((token) => token.length >= 2);
}
function dedupe(values) {
    return [...new Set(values)];
}
function compactStorageText(value, maxLength = 220) {
    return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}
function limitList(values, limit) {
    return dedupe(values.map((value) => compactStorageText(value))).slice(0, limit);
}
function compactModuleForStorage(module) {
    return {
        ...module,
        owners: limitList(module.owners, 12),
        sources: limitList(module.sources, 40),
        phases: limitList(module.phases, 20),
        gates: limitList(module.gates, 40),
        assets: limitList(module.assets, 80),
        sops: limitList(module.sops, 80),
        metrics: limitList(module.metrics, 40),
        relatedProcesses: limitList(module.relatedProcesses, 40),
        variants: limitList(module.variants, 20),
        capabilities: {
            onboarding: limitList(module.capabilities.onboarding, 25),
            assistance: limitList(module.capabilities.assistance, 25),
            execution: limitList(module.capabilities.execution, 25),
        },
    };
}
function scoreChunk(chunk, query, queryTokens, options) {
    const title = normalizeForSearch(chunk.title);
    const sectionTitle = normalizeForSearch(chunk.sectionTitle ?? "");
    const content = normalizeForSearch(chunk.content);
    const tags = new Set(chunk.tags.map(normalizeForSearch));
    const keywords = new Set(chunk.keywords.map(normalizeForSearch));
    let score = 0;
    if (options.processId && chunk.processId === options.processId)
        score += 6;
    if (options.kind && chunk.kind === options.kind)
        score += 3;
    if (title.includes(query))
        score += 6;
    if (sectionTitle.includes(query))
        score += 5;
    if (content.includes(query))
        score += 4;
    if (chunk.kind === "consolidated_rag")
        score += 1.5;
    if (chunk.kind === "process")
        score += 1;
    for (const token of queryTokens) {
        if (title.includes(token))
            score += 2.5;
        if (sectionTitle.includes(token))
            score += 2;
        if (content.includes(token))
            score += 1.5;
        if (tags.has(token))
            score += 2;
        if (keywords.has(token))
            score += 1.5;
    }
    return score;
}
function buildOnboardingPack(module, evidence, audienceRole) {
    const walkthrough = module.phases.length > 0
        ? module.phases.map((phase, index) => `Paso ${index + 1}: ${phase}`)
        : module.status === "needs_attention"
            ? [
                `Confirmar alcance, owner y documentación vigente de ${module.processName}.`,
                "Completar SOPs, gates y assets mínimos antes de formalizar el onboarding.",
            ]
            : [
                `Revisar la documentación fuente del proceso ${module.processName}.`,
                "Identificar owners, gates y assets antes de ejecutar.",
            ];
    const checklist = dedupe([
        `Entender el propósito del proceso: ${module.summary}`,
        ...(module.status === "needs_attention"
            ? ["Resolver faltantes documentales antes de operar este proceso con autonomía."]
            : []),
        ...module.gates.map((gate) => `Validar gate: ${gate}`),
        ...module.assets.slice(0, 5).map((asset) => `Ubicar asset: ${asset}`),
        ...module.sops.slice(0, 5).map((sop) => `Revisar SOP: ${sop}`),
    ]).slice(0, 12);
    return {
        processId: module.processId,
        processName: module.processName,
        audienceRole,
        summary: module.summary,
        checklist,
        walkthrough,
        essentialAssets: module.assets.slice(0, 6),
        essentialSops: module.sops.slice(0, 6),
        firstQuestions: [
            "¿Cuál es el trigger exacto que inicia este proceso?",
            "¿Qué gate bloquea la siguiente fase?",
            "¿Qué evidencia mínima debe quedar al cerrar cada hito?",
            "¿Qué proceso upstream o downstream depende de este flujo?",
        ],
        evidence,
    };
}
function buildExecutionPack(module, evidence, deliverable, objective = "") {
    const recommendedSteps = module.phases.length > 0
        ? module.phases.map((phase, index) => `${index + 1}. ${phase}`)
        : module.status === "needs_attention"
            ? [
                "1. Confirmar con el owner que el proceso sigue vigente y cuál es el entregable esperado.",
                "2. Completar o migrar la documentación operativa mínima antes de ejecutar.",
                "3. Solo después de cerrar esos vacíos, definir el plan agente-humano de ejecución.",
            ]
            : [
                "1. Recuperar el manifiesto y documento canónico del proceso.",
                "2. Determinar inputs, outputs y gates aplicables.",
                "3. Ejecutar el entregable y registrar evidencia trazable.",
            ];
    const evidenceRequired = dedupe([
        ...module.gates.map((gate) => `Gate cumplido: ${gate}`),
        ...module.metrics.map((metric) => `Métrica controlada: ${metric}`),
        ...module.assets.slice(0, 4).map((asset) => `Asset generado o consumido: ${asset}`),
    ]).slice(0, 10);
    return {
        processId: module.processId,
        processName: module.processName,
        deliverable,
        objective: objective || `Ejecutar ${deliverable} dentro de ${module.processName}`,
        summary: module.summary,
        recommendedSteps,
        gates: module.gates,
        evidenceRequired,
        assets: module.assets.slice(0, 8),
        sops: module.sops.slice(0, 8),
        risks: [
            "Ejecutar sin validar el gate anterior rompe la trazabilidad del proceso.",
            "Usar assets desactualizados puede producir entregables inconsistentes.",
            "Si faltan inputs del proceso upstream, la ejecución debe escalarse antes de avanzar.",
        ],
        evidence,
    };
}
export class OperationalKnowledgeStore {
    db = null;
    available = false;
    constructor() {
        try {
            if (!getApps().length) {
                const rawCredPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
                if (rawCredPath) {
                    const absoluteCredPath = path.resolve(process.cwd(), rawCredPath);
                    if (fs.existsSync(absoluteCredPath)) {
                        initializeApp({ credential: cert(absoluteCredPath) });
                        this.available = true;
                    }
                    else {
                        logger.warn("Operational KB store credentials path not found", {
                            raw: rawCredPath,
                            absolute: absoluteCredPath,
                        });
                    }
                }
                else if (isManagedGoogleRuntime()) {
                    initializeApp();
                    this.available = true;
                }
            }
            else {
                this.available = true;
            }
            if (this.available) {
                this.db = getFirestore();
            }
        }
        catch (error) {
            logger.warn("Operational KB store unavailable; Firestore not initialized", {
                error: error instanceof Error ? error.message : String(error),
            });
            this.available = false;
            this.db = null;
        }
    }
    isAvailable() {
        return this.available && this.db !== null;
    }
    requireDb() {
        if (!this.db || !this.available) {
            throw new Error("Firestore no está disponible para el KB operativo.");
        }
        return this.db;
    }
    async deleteQueryInBatches(collectionName, buildQuery) {
        const db = this.requireDb();
        let deleted = 0;
        while (true) {
            const snapshot = await buildQuery(db).limit(MAX_BATCH_SIZE).get();
            if (snapshot.empty)
                break;
            const batch = db.batch();
            snapshot.docs.forEach((doc) => batch.delete(doc.ref));
            await batch.commit();
            deleted += snapshot.docs.length;
            if (snapshot.docs.length < MAX_BATCH_SIZE)
                break;
        }
        logger.info("Operational KB prune step completed", { collectionName, deleted });
        return deleted;
    }
    async hasSyncedKnowledge() {
        if (!this.isAvailable())
            return false;
        try {
            const doc = await this.requireDb().collection("system_config").doc(KB_STATUS_DOC_ID).get();
            return doc.exists;
        }
        catch (error) {
            logger.warn("Failed to probe operational KB status doc", {
                error: error instanceof Error ? error.message : String(error),
            });
            return false;
        }
    }
    async getReport() {
        const db = this.requireDb();
        const doc = await db.collection("system_config").doc(KB_STATUS_DOC_ID).get();
        if (!doc.exists) {
            throw new Error("El KB operativo sincronizado no existe todavía en Firestore.");
        }
        return doc.data()?.report;
    }
    async listProcesses() {
        const db = this.requireDb();
        const snapshot = await db.collection(KB_MODULES_COLLECTION).get();
        return snapshot.docs
            .map((doc) => doc.data().module)
            .sort((a, b) => a.processId.localeCompare(b.processId));
    }
    async resolveProcess(processIdOrName) {
        const query = normalizeForSearch(processIdOrName);
        if (!query)
            return null;
        const db = this.requireDb();
        const exact = await db.collection(KB_MODULES_COLLECTION).doc(query).get();
        if (exact.exists) {
            return exact.data()?.module;
        }
        const modules = await this.listProcesses();
        const direct = modules.find((module) => module.processId === query) ??
            modules.find((module) => normalizeForSearch(module.processId) === query) ??
            modules.find((module) => normalizeForSearch(module.processName) === query);
        if (direct)
            return direct;
        const queryTokens = tokenize(query);
        return (modules.find((module) => {
            const haystack = normalizeForSearch(`${module.processId} ${module.processName}`);
            return queryTokens.every((token) => haystack.includes(token));
        }) ?? null);
    }
    async search(query, options = {}) {
        const db = this.requireDb();
        const normalizedQuery = normalizeForSearch(query);
        if (!normalizedQuery)
            return [];
        const queryTokens = dedupe(tokenize(normalizedQuery));
        const processFilter = options.processId
            ? (await this.resolveProcess(options.processId))?.processId ?? options.processId
            : undefined;
        const limit = options.limit ?? MAX_SEARCH_RESULTS;
        const candidates = new Map();
        const collectSnapshot = async (snapshot) => {
            for (const doc of snapshot.docs) {
                const data = doc.data();
                const chunk = {
                    id: data.sourceId ?? doc.id,
                    documentId: data.documentId ?? data.sourceId ?? doc.id,
                    title: data.title ?? data.relPath ?? doc.id,
                    path: data.path ?? data.relPath ?? "",
                    relPath: data.relPath ?? "",
                    kind: data.kind ?? "unknown",
                    sourceArea: data.sourceArea ?? "firestore",
                    processId: data.processId,
                    processName: data.processName,
                    sectionTitle: data.sectionTitle ?? undefined,
                    chunkIndex: data.chunkIndex ?? 0,
                    content: data.content ?? "",
                    summary: data.summary ?? "",
                    tags: Array.isArray(data.tags) ? data.tags : [],
                    keywords: Array.isArray(data.keywords) ? data.keywords : [],
                };
                candidates.set(doc.id, chunk);
            }
        };
        try {
            if (queryTokens.length > 0) {
                let indexedQuery = db
                    .collection("rag_chunks")
                    .where("userId", "==", KB_SYSTEM_USER_ID);
                if (processFilter) {
                    indexedQuery = indexedQuery.where("processId", "==", processFilter);
                }
                const indexedSnapshot = await indexedQuery
                    .where("keywords", "array-contains-any", queryTokens.slice(0, 10))
                    .limit(Math.max(limit * 8, 40))
                    .get();
                await collectSnapshot(indexedSnapshot);
            }
        }
        catch (error) {
            logger.warn("Operational KB indexed search fallback triggered", {
                error: error instanceof Error ? error.message : String(error),
                processFilter,
            });
        }
        if (candidates.size < limit) {
            let fallbackQuery = db
                .collection("rag_chunks")
                .where("userId", "==", KB_SYSTEM_USER_ID);
            if (processFilter) {
                fallbackQuery = fallbackQuery.where("processId", "==", processFilter);
            }
            const fallbackSnapshot = await fallbackQuery.limit(processFilter ? 250 : 500).get();
            await collectSnapshot(fallbackSnapshot);
        }
        return [...candidates.values()]
            .filter((chunk) => !options.kind || chunk.kind === options.kind)
            .map((chunk) => ({
            ...chunk,
            score: scoreChunk(chunk, normalizedQuery, queryTokens, {
                ...options,
                processId: processFilter,
            }),
        }))
            .filter((chunk) => (chunk.score ?? 0) > 0)
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .slice(0, limit);
    }
    async createOnboardingPack(processIdOrName, audienceRole = "nuevo integrante", objective = "") {
        const module = await this.resolveProcess(processIdOrName);
        if (!module)
            return null;
        const evidence = await this.search(`${module.processName} onboarding ${audienceRole} ${objective}`.trim(), { processId: module.processId, limit: 6 });
        return buildOnboardingPack(module, evidence, audienceRole);
    }
    async createExecutionPack(processIdOrName, deliverable, objective = "") {
        const module = await this.resolveProcess(processIdOrName);
        if (!module)
            return null;
        const evidence = await this.search(`${module.processName} ${deliverable} ${objective}`.trim(), { processId: module.processId, limit: 8 });
        return buildExecutionPack(module, evidence, deliverable, objective);
    }
    async syncBundle(bundle, options = {}) {
        const db = this.requireDb();
        const pruneExisting = options.pruneExisting ?? true;
        let prunedChunks = 0;
        let prunedModules = 0;
        if (pruneExisting) {
            prunedChunks = await this.deleteQueryInBatches("rag_chunks", (firestore) => firestore.collection("rag_chunks").where("userId", "==", KB_SYSTEM_USER_ID));
            prunedModules = await this.deleteQueryInBatches(KB_MODULES_COLLECTION, (firestore) => firestore.collection(KB_MODULES_COLLECTION));
        }
        const syncVersion = bundle.report.generatedAt;
        const syncedAt = new Date();
        await db.collection("system_config").doc(KB_STATUS_DOC_ID).set({
            knowledgeBase: KB_ID,
            syncVersion,
            syncedAt,
            report: bundle.report,
            moduleCount: bundle.modules.length,
            chunkCount: bundle.chunks.length,
            prunedChunks,
            prunedModules,
            updatedAt: FieldValue.serverTimestamp(),
        });
        for (let index = 0; index < bundle.modules.length; index += MAX_BATCH_SIZE) {
            const slice = bundle.modules.slice(index, index + MAX_BATCH_SIZE);
            const batch = db.batch();
            for (const module of slice) {
                const compactModule = compactModuleForStorage(module);
                batch.set(db.collection(KB_MODULES_COLLECTION).doc(module.processId), {
                    knowledgeBase: KB_ID,
                    syncVersion,
                    updatedAt: FieldValue.serverTimestamp(),
                    module: compactModule,
                });
            }
            await batch.commit();
        }
        for (let index = 0; index < bundle.chunks.length; index += MAX_BATCH_SIZE) {
            const slice = bundle.chunks.slice(index, index + MAX_BATCH_SIZE);
            const batch = db.batch();
            for (const chunk of slice) {
                batch.set(db.collection("rag_chunks").doc(`operational_${chunk.id}`), {
                    knowledgeBase: KB_ID,
                    syncVersion,
                    userId: KB_SYSTEM_USER_ID,
                    sourceType: "document",
                    sourceId: chunk.id,
                    documentId: chunk.documentId,
                    title: chunk.title,
                    path: chunk.path,
                    relPath: chunk.relPath,
                    kind: chunk.kind,
                    sourceArea: chunk.sourceArea,
                    processId: chunk.processId ?? null,
                    processName: chunk.processName ?? null,
                    sectionTitle: chunk.sectionTitle ?? null,
                    chunkIndex: chunk.chunkIndex,
                    content: chunk.content,
                    summary: chunk.summary,
                    category: chunk.kind,
                    tags: chunk.tags,
                    keywords: chunk.keywords,
                    createdAt: syncedAt,
                    updatedAt: syncedAt,
                });
            }
            await batch.commit();
        }
        logger.info("Operational KB synced to Firestore", {
            syncVersion,
            moduleCount: bundle.modules.length,
            chunkCount: bundle.chunks.length,
            prunedChunks,
            prunedModules,
        });
        return {
            syncVersion,
            moduleCount: bundle.modules.length,
            chunkCount: bundle.chunks.length,
            prunedChunks,
            prunedModules,
        };
    }
}
let singleton = null;
export function getOperationalKnowledgeStore() {
    if (!singleton) {
        singleton = new OperationalKnowledgeStore();
    }
    return singleton;
}
export function getOperationalKnowledgeSystemUserId() {
    return KB_SYSTEM_USER_ID;
}
export function getOperationalKnowledgeBaseId() {
    return KB_ID;
}
