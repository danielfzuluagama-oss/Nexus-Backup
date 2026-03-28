import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildOperationalKnowledgeArtifacts } from "../knowledge/operational-kb.js";
const forceRefresh = process.argv.includes("--force");
const skipModules = process.argv.includes("--skip-modules");
const skipSystemConfig = process.argv.includes("--skip-system-config");
function readArg(flag) {
    const exact = process.argv.find((arg) => arg.startsWith(`${flag}=`));
    if (exact)
        return exact.slice(flag.length + 1).trim();
    const index = process.argv.findIndex((arg) => arg === flag);
    if (index >= 0 && process.argv[index + 1]) {
        return process.argv[index + 1].trim();
    }
    return "";
}
const projectId = readArg("--project") ||
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GCLOUD_PROJECT ||
    process.env.GOOGLE_CLOUD_PROJECT;
if (!projectId) {
    console.error(JSON.stringify({ error: "Falta el projectId. Usa --project <projectId> o FIREBASE_PROJECT_ID." }, null, 2));
    process.exit(1);
}
function readPositiveNumber(flag, fallback) {
    const raw = readArg(flag);
    if (!raw)
        return fallback;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 0)
        return fallback;
    return Math.floor(parsed);
}
const FIREBASE_CLI_CLIENT_ID = process.env.FIREBASE_CLIENT_ID ??
    "563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com";
const FIREBASE_CLI_CLIENT_SECRET = process.env.FIREBASE_CLIENT_SECRET ?? "j9iVZfS8kkCEFUPaAeJV0sAi";
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
    const capabilities = module.capabilities ?? {};
    return {
        ...module,
        owners: limitList((module.owners ?? []), 12),
        sources: limitList((module.sources ?? []), 40),
        phases: limitList((module.phases ?? []), 20),
        gates: limitList((module.gates ?? []), 40),
        assets: limitList((module.assets ?? []), 80),
        sops: limitList((module.sops ?? []), 80),
        metrics: limitList((module.metrics ?? []), 40),
        relatedProcesses: limitList((module.relatedProcesses ?? []), 40),
        variants: limitList((module.variants ?? []), 20),
        capabilities: {
            onboarding: limitList((capabilities.onboarding ?? []), 25),
            assistance: limitList((capabilities.assistance ?? []), 25),
            execution: limitList((capabilities.execution ?? []), 25),
        },
    };
}
function readFirebaseCliConfig() {
    const configPath = path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");
    if (!fs.existsSync(configPath)) {
        throw new Error("No encontré firebase-tools.json; ejecuta firebase login primero.");
    }
    return JSON.parse(fs.readFileSync(configPath, "utf8"));
}
async function refreshFirebaseCliAccessToken() {
    const config = readFirebaseCliConfig();
    const refreshToken = config.tokens?.refresh_token?.trim();
    if (!refreshToken) {
        throw new Error("La sesión de Firebase CLI no tiene refresh_token disponible.");
    }
    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
        client_id: FIREBASE_CLI_CLIENT_ID,
        client_secret: FIREBASE_CLI_CLIENT_SECRET,
    });
    const response = await fetch("https://www.googleapis.com/oauth2/v3/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
    });
    const raw = await response.text();
    if (!response.ok) {
        throw new Error(`No pude refrescar el access_token del Firebase CLI: HTTP ${response.status} ${raw}`);
    }
    const payload = JSON.parse(raw);
    const accessToken = payload.access_token?.trim();
    if (!accessToken) {
        throw new Error("El refresh del Firebase CLI no devolvió access_token.");
    }
    return accessToken;
}
async function readFirebaseCliAccessToken() {
    const config = readFirebaseCliConfig();
    const accessToken = config.tokens?.access_token?.trim();
    const expiresAt = config.tokens?.expires_at ?? 0;
    if (!accessToken) {
        return refreshFirebaseCliAccessToken();
    }
    if (expiresAt && Date.now() > expiresAt - 60_000) {
        return refreshFirebaseCliAccessToken();
    }
    return accessToken;
}
function toFirestoreValue(value) {
    if (value === null || value === undefined)
        return { nullValue: null };
    if (value instanceof Date) {
        return { timestampValue: value.toISOString() };
    }
    if (Array.isArray(value)) {
        return {
            arrayValue: {
                values: value.map((entry) => toFirestoreValue(entry)),
            },
        };
    }
    switch (typeof value) {
        case "string":
            return { stringValue: value };
        case "boolean":
            return { booleanValue: value };
        case "number":
            if (Number.isInteger(value))
                return { integerValue: String(value) };
            return { doubleValue: value };
        case "object": {
            const fields = {};
            for (const [key, nestedValue] of Object.entries(value)) {
                fields[key] = toFirestoreValue(nestedValue);
            }
            return { mapValue: { fields } };
        }
        default:
            return { stringValue: String(value) };
    }
}
function toFirestoreFields(value) {
    const fields = {};
    for (const [key, nestedValue] of Object.entries(value)) {
        fields[key] = toFirestoreValue(nestedValue);
    }
    return fields;
}
function documentName(collection, docId) {
    return `projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;
}
async function commitWrites(authState, writes, label) {
    const endpoint = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:commit`;
    for (let attempt = 1; attempt <= 8; attempt += 1) {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authState.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ writes }),
        });
        if (response.ok)
            return;
        const body = await response.text();
        if (attempt < 8 && response.status === 401) {
            authState.accessToken = await refreshFirebaseCliAccessToken();
            continue;
        }
        if (attempt < 8 && (response.status === 429 || response.status >= 500)) {
            await new Promise((resolve) => setTimeout(resolve, attempt * 4000));
            continue;
        }
        throw new Error(`Falló commit ${label}: HTTP ${response.status} ${body}`);
    }
}
function chunkArray(items, size) {
    const chunks = [];
    for (let index = 0; index < items.length; index += size) {
        chunks.push(items.slice(index, index + size));
    }
    return chunks;
}
const authState = { accessToken: await readFirebaseCliAccessToken() };
const bundle = await buildOperationalKnowledgeArtifacts(forceRefresh);
const syncVersion = bundle.report.generatedAt;
const syncedAt = new Date().toISOString();
const moduleBatchSize = readPositiveNumber("--module-batch-size", 200);
const chunkBatchSize = readPositiveNumber("--chunk-batch-size", 100);
const startModuleIndex = readPositiveNumber("--start-module-index", 0);
const startChunkIndex = readPositiveNumber("--start-chunk-index", 0);
if (!skipSystemConfig) {
    await commitWrites(authState, [
        {
            update: {
                name: documentName("system_config", "nexus_operational_kb"),
                fields: toFirestoreFields({
                    knowledgeBase: "nexus_operational",
                    syncVersion,
                    syncedAt,
                    report: bundle.report,
                    moduleCount: bundle.modules.length,
                    chunkCount: bundle.chunks.length,
                    updatedAt: syncedAt,
                }),
            },
        },
    ], "system_config");
}
if (!skipModules) {
    const moduleSlice = bundle.modules.slice(startModuleIndex);
    const moduleBatches = chunkArray(moduleSlice, moduleBatchSize);
    for (let index = 0; index < moduleBatches.length; index += 1) {
        const writes = moduleBatches[index].map((module) => ({
            update: {
                name: documentName("operational_process_modules", module.processId),
                fields: toFirestoreFields({
                    knowledgeBase: "nexus_operational",
                    syncVersion,
                    updatedAt: syncedAt,
                    module: compactModuleForStorage(module),
                }),
            },
        }));
        await commitWrites(authState, writes, `modules batch ${index + 1}/${moduleBatches.length}`);
        console.log(`synced modules ${Math.min(startModuleIndex + (index + 1) * moduleBatchSize, bundle.modules.length)}/${bundle.modules.length}`);
    }
}
const chunkSlice = bundle.chunks.slice(startChunkIndex);
const chunkBatches = chunkArray(chunkSlice, chunkBatchSize);
for (let index = 0; index < chunkBatches.length; index += 1) {
    const writes = chunkBatches[index].map((chunk) => ({
        update: {
            name: documentName("rag_chunks", `operational_${chunk.id}`),
            fields: toFirestoreFields({
                knowledgeBase: "nexus_operational",
                syncVersion,
                userId: "__nexus_operational__",
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
            }),
        },
    }));
    await commitWrites(authState, writes, `chunks batch ${index + 1}/${chunkBatches.length}`);
    await new Promise((resolve) => setTimeout(resolve, 350));
    if ((index + 1) % 10 === 0 || index === chunkBatches.length - 1) {
        console.log(`synced chunks ${Math.min(startChunkIndex + (index + 1) * chunkBatchSize, bundle.chunks.length)}/${bundle.chunks.length}`);
    }
}
console.log(JSON.stringify({
    projectId,
    generatedAt: bundle.report.generatedAt,
    declaredProcessCount: bundle.report.declaredProcessCount,
    processesReady: bundle.report.readyProcessCount,
    processesNeedingAttention: bundle.report.needsAttentionProcessCount,
    syncedModules: bundle.modules.length,
    syncedChunks: bundle.chunks.length,
    syncVersion,
}, null, 2));
