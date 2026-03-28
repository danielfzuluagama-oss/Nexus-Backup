import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { logger } from "../logger.js";
const DEFAULT_ROOT = path.resolve(process.cwd(), "inputs/MetodologIA_Gobierno_Operativo");
const DEFAULT_CACHE_DIR = path.resolve(process.cwd(), "workspace/knowledge");
const CACHE_BUNDLE_FILE = "nexus-operational-kb.json";
const CACHE_REPORT_FILE = "nexus-operational-migration-report.json";
const CACHE_MODULES_FILE = "nexus-process-modules.json";
const SUPPORTED_EXTENSIONS = new Set([".md", ".txt", ".json", ".html"]);
const SKIP_DIR_NAMES = new Set([
    ".git",
    ".playwright-mcp",
    ".venv_notebooklm",
    "node_modules",
    "dist",
    "archivado",
    "_archive_legacy",
    "__pycache__",
]);
const SKIP_FILE_NAMES = new Set([
    ".DS_Store",
    "test_write.tmp",
    "html_files.txt",
]);
const MAX_CHUNK_CHARS = 1400;
const MAX_SEARCH_RESULTS = 8;
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
function compactLines(value) {
    return value
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/[ ]{2,}/g, " ")
        .trim();
}
function stripHtml(value) {
    return compactLines(value
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">"));
}
function flattenJson(value, prefix = "") {
    if (value === null || value === undefined)
        return [];
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        return [prefix ? `${prefix}: ${String(value)}` : String(value)];
    }
    if (Array.isArray(value)) {
        return value.flatMap((entry, index) => flattenJson(entry, prefix ? `${prefix}[${index}]` : `[${index}]`));
    }
    if (typeof value === "object") {
        return Object.entries(value).flatMap(([key, entry]) => flattenJson(entry, prefix ? `${prefix}.${key}` : key));
    }
    return [];
}
function normalizeDocumentContent(raw, extension) {
    if (extension === ".json") {
        try {
            return compactLines(flattenJson(JSON.parse(raw)).join("\n"));
        }
        catch {
            return compactLines(raw);
        }
    }
    if (extension === ".html") {
        return stripHtml(raw);
    }
    return compactLines(raw);
}
function buildId(value) {
    return crypto.createHash("sha1").update(value).digest("hex").slice(0, 16);
}
function prettifySlug(value) {
    return value
        .replace(/^proceso-/, "")
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (match) => match.toUpperCase());
}
function computeKeywords(text, extra = [], limit = 18) {
    const frequencies = new Map();
    for (const token of [...tokenize(text), ...extra.flatMap(tokenize)]) {
        frequencies.set(token, (frequencies.get(token) ?? 0) + 1);
    }
    return [...frequencies.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, limit)
        .map(([token]) => token);
}
function extractTitle(text, relPath) {
    const markdownHeading = text.match(/^#\s+(.+)$/m);
    if (markdownHeading)
        return markdownHeading[1].trim();
    const labeledTitle = text.match(/\*\*Title:\*\*\s*(.+)$/im);
    if (labeledTitle)
        return labeledTitle[1].trim();
    return path.basename(relPath, path.extname(relPath));
}
function extractHeadings(text) {
    return dedupe([...text.matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => match[1].trim()));
}
function extractReferences(text) {
    return dedupe([...text.matchAll(/`([^`]+)`/g)]
        .map((match) => match[1].trim())
        .filter(Boolean));
}
function extractSummary(text) {
    const blocks = text
        .split(/\n\s*\n/)
        .map((block) => block.trim())
        .filter(Boolean)
        .filter((block) => !block.startsWith("#") && !block.startsWith("|"));
    return blocks.slice(0, 2).join(" ").slice(0, 600).trim();
}
function extractMarkdownSection(text, headingPattern) {
    const match = headingPattern.exec(text);
    if (!match || match.index === undefined)
        return "";
    const start = match.index + match[0].length;
    const rest = text.slice(start);
    const nextHeadingIndex = rest.search(/^##\s+/m);
    const section = nextHeadingIndex >= 0 ? rest.slice(0, nextHeadingIndex) : rest;
    return section.trim();
}
function extractTableFirstColumn(section) {
    return dedupe(section
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.startsWith("|"))
        .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))
        .filter((cells) => cells.length > 0)
        .map((cells) => cells[0] ?? "")
        .filter((value) => value && !/^(gate|asset|sop|metrica|artefacto)$/i.test(value)));
}
function splitIntoChunks(text) {
    const lines = text.split("\n");
    const sections = [];
    let currentTitle;
    let buffer = "";
    const flush = () => {
        const cleaned = compactLines(buffer);
        if (cleaned) {
            sections.push({ sectionTitle: currentTitle, content: cleaned });
        }
        buffer = "";
    };
    for (const line of lines) {
        const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
        if (headingMatch) {
            flush();
            currentTitle = headingMatch[1].trim();
            continue;
        }
        buffer += `${line}\n`;
    }
    flush();
    if (sections.length === 0) {
        sections.push({ content: compactLines(text) });
    }
    const chunks = [];
    for (const section of sections) {
        const paragraphs = section.content
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.trim())
            .filter(Boolean);
        if (paragraphs.length === 0)
            continue;
        let current = "";
        for (const paragraph of paragraphs) {
            const candidate = current ? `${current}\n\n${paragraph}` : paragraph;
            if (candidate.length > MAX_CHUNK_CHARS && current) {
                chunks.push({ sectionTitle: section.sectionTitle, content: current });
                current = paragraph;
            }
            else {
                current = candidate;
            }
        }
        if (current) {
            chunks.push({ sectionTitle: section.sectionTitle, content: current });
        }
    }
    return chunks.filter((chunk) => chunk.content.trim().length > 0);
}
function inferKind(relPath) {
    const parts = relPath.split(path.sep);
    const [first = "", second = ""] = parts;
    const tags = [first || "root"];
    if (first === "procesos" && second.startsWith("proceso-")) {
        return {
            kind: "process",
            sourceArea: "procesos",
            processId: second,
            processName: prettifySlug(second),
            tags: dedupe([...tags, "proceso", second, ...tokenize(second)]),
        };
    }
    if (first === "rituales") {
        return {
            kind: "ritual",
            sourceArea: "rituales",
            tags: dedupe([...tags, "ritual", second, ...tokenize(second)]),
        };
    }
    if (first === "Consolidacion" && second === "rag") {
        return {
            kind: "consolidated_rag",
            sourceArea: "Consolidacion/rag",
            tags: dedupe([...tags, "rag", "consolidacion", ...tokenize(second)]),
        };
    }
    if (first === "Consolidacion") {
        return {
            kind: "consolidation",
            sourceArea: "Consolidacion",
            tags: dedupe([...tags, "consolidacion", ...tokenize(second)]),
        };
    }
    if (/^L\d+$/.test(first)) {
        return {
            kind: "template",
            sourceArea: first,
            tags: dedupe([...tags, "plantilla", "template", ...tokenize(first)]),
        };
    }
    if (first === "docs" || first === "meta" || first === "sop") {
        return {
            kind: "reference",
            sourceArea: first,
            tags: dedupe([...tags, "referencia", ...tokenize(first), ...tokenize(second)]),
        };
    }
    if (first === "site-metodologia") {
        return {
            kind: "site",
            sourceArea: "site-metodologia",
            tags: dedupe([...tags, "site", ...tokenize(second)]),
        };
    }
    if (first === "workspace") {
        return {
            kind: "workspace",
            sourceArea: "workspace",
            tags: dedupe([...tags, "workspace", ...tokenize(second)]),
        };
    }
    return {
        kind: "unknown",
        sourceArea: first || "unknown",
        tags: dedupe([...tags, ...tokenize(second)]),
    };
}
async function listKnowledgeFiles(rootPath) {
    const filePaths = [];
    const skipped = [];
    const visit = async (currentPath) => {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name.startsWith(".") && entry.name !== ".well-known") {
                skipped.push(path.relative(rootPath, path.join(currentPath, entry.name)));
                continue;
            }
            if (SKIP_DIR_NAMES.has(entry.name)) {
                skipped.push(path.relative(rootPath, path.join(currentPath, entry.name)));
                continue;
            }
            const fullPath = path.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                await visit(fullPath);
                continue;
            }
            if (SKIP_FILE_NAMES.has(entry.name)) {
                skipped.push(path.relative(rootPath, fullPath));
                continue;
            }
            const extension = path.extname(entry.name).toLowerCase();
            if (!SUPPORTED_EXTENSIONS.has(extension)) {
                skipped.push(path.relative(rootPath, fullPath));
                continue;
            }
            filePaths.push(fullPath);
        }
    };
    await visit(rootPath);
    return { filePaths: filePaths.sort(), skipped };
}
async function buildWorkingDocuments(rootPath) {
    const { filePaths, skipped } = await listKnowledgeFiles(rootPath);
    const documents = [];
    for (const filePath of filePaths) {
        try {
            const raw = await fs.readFile(filePath, "utf-8");
            const stat = await fs.stat(filePath);
            const relPath = path.relative(rootPath, filePath);
            const extension = path.extname(filePath).toLowerCase();
            const normalizedText = normalizeDocumentContent(raw, extension);
            if (!normalizedText.trim()) {
                skipped.push(relPath);
                continue;
            }
            const inferred = inferKind(relPath);
            const title = extractTitle(normalizedText, relPath);
            const headings = extractHeadings(normalizedText);
            const references = extractReferences(normalizedText);
            const summary = extractSummary(normalizedText) || title;
            const keywords = computeKeywords(normalizedText, [title, relPath, ...references]);
            const id = buildId(relPath);
            documents.push({
                id,
                title,
                path: filePath,
                relPath,
                extension,
                kind: inferred.kind,
                sourceArea: inferred.sourceArea,
                processId: inferred.processId,
                processName: inferred.processName,
                summary,
                headings,
                references,
                tags: dedupe([...inferred.tags, ...headings.flatMap(tokenize)]),
                keywords,
                size: stat.size,
                modifiedAt: stat.mtime.toISOString(),
                text: normalizedText,
            });
        }
        catch (error) {
            skipped.push(path.relative(rootPath, filePath));
            logger.warn("Skipping unreadable knowledge file", {
                filePath,
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
    return { documents, skipped: dedupe(skipped).sort() };
}
async function discoverDeclaredProcesses(rootPath) {
    const processesRoot = path.join(rootPath, "procesos");
    try {
        const entries = await fs.readdir(processesRoot, { withFileTypes: true });
        const processDirs = entries
            .filter((entry) => entry.isDirectory() && entry.name.startsWith("proceso-"))
            .sort((a, b) => a.name.localeCompare(b.name));
        const declared = [];
        for (const entry of processDirs) {
            const processPath = path.join(processesRoot, entry.name);
            const relPath = path.relative(rootPath, processPath);
            const directories = [];
            const visit = async (currentPath) => {
                const nestedEntries = await fs.readdir(currentPath, { withFileTypes: true });
                for (const nestedEntry of nestedEntries) {
                    if (!nestedEntry.isDirectory())
                        continue;
                    if (nestedEntry.name.startsWith(".") || SKIP_DIR_NAMES.has(nestedEntry.name))
                        continue;
                    const fullPath = path.join(currentPath, nestedEntry.name);
                    directories.push(path.relative(rootPath, fullPath));
                    await visit(fullPath);
                }
            };
            await visit(processPath);
            const normalizedDirectories = dedupe(directories).sort();
            declared.push({
                processId: entry.name,
                processName: prettifySlug(entry.name),
                relPath,
                directories: normalizedDirectories,
                assetHints: dedupe(normalizedDirectories
                    .filter((directory) => directory.includes(`${path.sep}assets`))
                    .map((directory) => directory === `${relPath}${path.sep}assets`
                    ? "assets/"
                    : path.relative(relPath, directory))
                    .filter(Boolean)),
                sopHints: dedupe(normalizedDirectories
                    .filter((directory) => {
                    const sopRoot = `${relPath}${path.sep}references${path.sep}sop`;
                    if (!directory.startsWith(`${sopRoot}${path.sep}`))
                        return false;
                    const relativeToSopRoot = path.relative(sopRoot, directory);
                    return Boolean(relativeToSopRoot) && !relativeToSopRoot.includes(path.sep);
                })
                    .map((directory) => prettifySlug(path.basename(directory)))
                    .filter(Boolean)),
            });
        }
        return declared;
    }
    catch (error) {
        logger.warn("Unable to discover declared process directories", {
            processesRoot,
            error: error instanceof Error ? error.message : String(error),
        });
        return [];
    }
}
function buildChunks(documents) {
    const chunks = [];
    for (const document of documents) {
        const sections = splitIntoChunks(document.text);
        sections.forEach((section, chunkIndex) => {
            const id = buildId(`${document.id}:${chunkIndex}:${section.sectionTitle ?? "root"}`);
            const content = section.sectionTitle
                ? `${section.sectionTitle}\n${section.content}`
                : section.content;
            chunks.push({
                id,
                documentId: document.id,
                title: document.title,
                path: document.path,
                relPath: document.relPath,
                kind: document.kind,
                sourceArea: document.sourceArea,
                processId: document.processId,
                processName: document.processName,
                sectionTitle: section.sectionTitle,
                chunkIndex,
                content,
                summary: document.summary,
                tags: document.tags,
                keywords: computeKeywords(content, [document.title, document.relPath, ...document.tags]),
            });
        });
    }
    return chunks;
}
function buildProcessModules(documents, chunks, declaredProcesses) {
    const declaredById = new Map(declaredProcesses.map((declaredProcess) => [declaredProcess.processId, declaredProcess]));
    const processIds = dedupe([
        ...declaredProcesses.map((declaredProcess) => declaredProcess.processId),
        ...documents
            .filter((document) => document.processId)
            .map((document) => document.processId),
    ]).sort();
    return processIds.map((processId) => {
        const declaredProcess = declaredById.get(processId);
        const processDocuments = documents.filter((document) => document.processId === processId);
        const processChunks = chunks.filter((chunk) => chunk.processId === processId);
        const canonicalDocument = processDocuments.find((document) => /gestionar-.*-proceso\.md$/i.test(document.relPath)) ??
            processDocuments.find((document) => /MANIFIESTO\.md$/i.test(document.relPath)) ??
            processDocuments[0];
        const status = processDocuments.length > 0 && processChunks.length > 0 ? "ready" : "needs_attention";
        const combinedText = processDocuments.map((document) => document.text).join("\n\n");
        const owners = dedupe([...combinedText.matchAll(/\*\*Owner:\*\*\s*(.+)$/gim)].map((match) => match[1].trim()));
        const phases = dedupe([
            ...combinedText.matchAll(/^###\s+(F\d+\s+[—-]\s+.+)$/gm),
            ...combinedText.matchAll(/^###\s+(Fase\s+\d+:\s+.+)$/gim),
        ].map((match) => match[1].trim()));
        const variants = dedupe([...combinedText.matchAll(/^###\s+(Ruta.+|Fast Lane.+|Sector publico.+)$/gim)].map((match) => match[1].trim()));
        const gateSection = extractMarkdownSection(combinedText, /^##\s+\d+\.?\s+Gates.*$/gim);
        const gates = extractTableFirstColumn(gateSection);
        const metricsSection = extractMarkdownSection(combinedText, /^##\s+\d+\.?\s+Metri(?:cas|cs).*$|^##\s+\d+\.?\s+Metricas.*$/gim);
        const metrics = extractTableFirstColumn(metricsSection);
        const assetsSection = extractMarkdownSection(combinedText, /^##\s+\d+\.?\s+(Assets|Artefactos gobernados|Assets del Proceso).*$|^##\s+\d+\.?\s+Assets.*$/gim);
        const extractedAssets = extractTableFirstColumn(assetsSection);
        const extractedSops = dedupe(extractReferences(combinedText).filter((reference) => reference.toLowerCase().includes("sop")));
        const assets = extractedAssets.length > 0 ? extractedAssets : declaredProcess?.assetHints ?? [];
        const sops = extractedSops.length > 0 ? extractedSops : declaredProcess?.sopHints ?? [];
        const relatedProcesses = dedupe(extractReferences(combinedText).filter((reference) => reference.toLowerCase().includes("-proceso.md")));
        const processName = canonicalDocument?.processName ?? declaredProcess?.processName ?? prettifySlug(processId);
        const summary = canonicalDocument?.summary ??
            (status === "ready"
                ? processName
                : `${processName} está declarado en inputs, pero aún no tiene documentos indexables para una ejecución autónoma confiable.`);
        const sources = processDocuments.length > 0
            ? processDocuments.map((document) => document.relPath)
            : dedupe([declaredProcess?.relPath ?? `procesos/${processId}`, ...(declaredProcess?.directories ?? [])]);
        const capabilities = status === "ready"
            ? {
                onboarding: dedupe([
                    `Entender el propósito del proceso ${processName}.`,
                    ...phases.slice(0, 5).map((phase) => `Explicar y recorrer ${phase}.`),
                    ...gates.slice(0, 3).map((gate) => `Validar el gate ${gate} durante el onboarding.`),
                ].filter(Boolean)),
                assistance: dedupe([
                    `Responder preguntas operativas sobre ${processName} con evidencia trazable.`,
                    ...assets.slice(0, 4).map((asset) => `Ubicar y explicar el asset ${asset}.`),
                    ...metrics.slice(0, 3).map((metric) => `Aclarar cómo se mide ${metric}.`),
                ].filter(Boolean)),
                execution: dedupe([
                    `Construir un plan de trabajo usando las fases del proceso ${processName}.`,
                    ...sops.slice(0, 4).map((sop) => `Apoyar la ejecución directa mediante ${sop}.`),
                    ...relatedProcesses
                        .slice(0, 3)
                        .map((reference) => `Coordinar dependencias con ${reference}.`),
                ].filter(Boolean)),
            }
            : {
                onboarding: [
                    `Alinear owner, objetivo y límites del proceso ${processName}.`,
                    "Levantar o completar la documentación mínima antes de entrenar a nuevos integrantes.",
                ],
                assistance: [
                    `Responder solo con la metadata disponible para ${processName}.`,
                    "Escalar cualquier duda operativa crítica porque la evidencia documental es insuficiente.",
                ],
                execution: [
                    `No ejecutar ${processName} de forma autónoma hasta completar SOPs, gates y assets base.`,
                    "Priorizar la curaduría documental y la validación con el owner del proceso.",
                ],
            };
        return {
            processId,
            processName,
            status,
            summary,
            owners,
            docCount: processDocuments.length,
            chunkCount: processChunks.length,
            sources,
            phases,
            gates,
            assets,
            sops,
            metrics,
            relatedProcesses,
            variants,
            capabilities,
        };
    });
}
function buildReport(rootPath, documents, chunks, modules, skipped) {
    const countsByKind = documents.reduce((acc, document) => {
        acc[document.kind] = (acc[document.kind] ?? 0) + 1;
        return acc;
    }, {});
    const readyProcessCount = modules.filter((module) => module.status === "ready").length;
    const needsAttentionProcessCount = modules.filter((module) => module.status === "needs_attention").length;
    return {
        generatedAt: new Date().toISOString(),
        rootPath,
        documentCount: documents.length,
        chunkCount: chunks.length,
        declaredProcessCount: modules.length,
        processCount: modules.length,
        readyProcessCount,
        needsAttentionProcessCount,
        countsByKind,
        processes: modules.map((module) => ({
            processId: module.processId,
            processName: module.processName,
            docCount: module.docCount,
            chunkCount: module.chunkCount,
            status: module.status,
        })),
        skipped: skipped.slice(0, 200),
    };
}
function toBundle(documents, chunks, modules, report) {
    return {
        documents: documents.map(({ text: _text, ...document }) => document),
        chunks,
        modules,
        report,
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
            score += 3;
        if (sectionTitle.includes(token))
            score += 2.5;
        if (keywords.has(token))
            score += 2;
        if (tags.has(token))
            score += 1.5;
        if (content.includes(token))
            score += 1;
        if (chunk.processId?.includes(token))
            score += 2;
    }
    return score;
}
async function fileExists(targetPath) {
    try {
        await fs.access(targetPath);
        return true;
    }
    catch {
        return false;
    }
}
export class OperationalKnowledgeBase {
    rootPath;
    cacheDir;
    bundle = null;
    bundlePromise = null;
    constructor(rootPath = DEFAULT_ROOT, cacheDir = DEFAULT_CACHE_DIR) {
        this.rootPath = rootPath;
        this.cacheDir = cacheDir;
    }
    bundlePath() {
        return path.join(this.cacheDir, CACHE_BUNDLE_FILE);
    }
    reportPath() {
        return path.join(this.cacheDir, CACHE_REPORT_FILE);
    }
    modulesPath() {
        return path.join(this.cacheDir, CACHE_MODULES_FILE);
    }
    async buildAndPersist(forceRefresh = false) {
        if (this.bundle && !forceRefresh) {
            return this.bundle;
        }
        if (this.bundlePromise && !forceRefresh) {
            return this.bundlePromise;
        }
        this.bundlePromise = (async () => {
            if (!forceRefresh && await fileExists(this.bundlePath())) {
                try {
                    const cached = JSON.parse(await fs.readFile(this.bundlePath(), "utf-8"));
                    this.bundle = cached;
                    return cached;
                }
                catch (error) {
                    logger.warn("Failed to read cached operational knowledge bundle", {
                        error: error instanceof Error ? error.message : String(error),
                    });
                }
            }
            const declaredProcesses = await discoverDeclaredProcesses(this.rootPath);
            const { documents, skipped } = await buildWorkingDocuments(this.rootPath);
            const chunks = buildChunks(documents);
            const modules = buildProcessModules(documents, chunks, declaredProcesses);
            const report = buildReport(this.rootPath, documents, chunks, modules, skipped);
            const bundle = toBundle(documents, chunks, modules, report);
            await fs.mkdir(this.cacheDir, { recursive: true });
            await fs.writeFile(this.bundlePath(), JSON.stringify(bundle, null, 2));
            await fs.writeFile(this.reportPath(), JSON.stringify(report, null, 2));
            await fs.writeFile(this.modulesPath(), JSON.stringify(modules, null, 2));
            this.bundle = bundle;
            return bundle;
        })();
        try {
            return await this.bundlePromise;
        }
        finally {
            this.bundlePromise = null;
        }
    }
    async getBundle() {
        return this.buildAndPersist(false);
    }
    async listProcesses() {
        const bundle = await this.getBundle();
        return bundle.modules;
    }
    async getReport() {
        const bundle = await this.getBundle();
        return bundle.report;
    }
    async resolveProcess(processIdOrName) {
        const query = normalizeForSearch(processIdOrName);
        if (!query)
            return null;
        const bundle = await this.getBundle();
        const direct = bundle.modules.find((module) => module.processId === query) ??
            bundle.modules.find((module) => normalizeForSearch(module.processId) === query) ??
            bundle.modules.find((module) => normalizeForSearch(module.processName) === query);
        if (direct)
            return direct;
        const queryTokens = tokenize(query);
        return (bundle.modules.find((module) => {
            const haystack = normalizeForSearch(`${module.processId} ${module.processName}`);
            return queryTokens.every((token) => haystack.includes(token));
        }) ?? null);
    }
    async search(query, options = {}) {
        const normalizedQuery = normalizeForSearch(query);
        if (!normalizedQuery)
            return [];
        const bundle = await this.getBundle();
        const queryTokens = tokenize(normalizedQuery);
        const processFilter = options.processId
            ? (await this.resolveProcess(options.processId))?.processId ?? options.processId
            : undefined;
        const limit = options.limit ?? MAX_SEARCH_RESULTS;
        return bundle.chunks
            .filter((chunk) => !processFilter || chunk.processId === processFilter)
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
    async createExecutionPack(processIdOrName, deliverable, objective = "") {
        const module = await this.resolveProcess(processIdOrName);
        if (!module)
            return null;
        const evidence = await this.search(`${module.processName} ${deliverable} ${objective}`.trim(), { processId: module.processId, limit: 8 });
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
        const risks = [
            "Ejecutar sin validar el gate anterior rompe la trazabilidad del proceso.",
            "Usar assets desactualizados puede producir entregables inconsistentes.",
            "Si faltan inputs del proceso upstream, la ejecución debe escalarse antes de avanzar.",
        ];
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
            risks,
            evidence,
        };
    }
}
let singleton = null;
export function getOperationalKnowledgeBase() {
    if (!singleton) {
        singleton = new OperationalKnowledgeBase();
    }
    return singleton;
}
export async function buildOperationalKnowledgeArtifacts(forceRefresh = false) {
    return getOperationalKnowledgeBase().buildAndPersist(forceRefresh);
}
