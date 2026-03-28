import { buildOperationalKnowledgeArtifacts } from "../knowledge/operational-kb.js";
const forceRefresh = process.argv.includes("--force");
const bundle = await buildOperationalKnowledgeArtifacts(forceRefresh);
console.log(JSON.stringify({
    generatedAt: bundle.report.generatedAt,
    documentCount: bundle.report.documentCount,
    chunkCount: bundle.report.chunkCount,
    declaredProcessCount: bundle.report.declaredProcessCount,
    processCount: bundle.report.processCount,
    countsByKind: bundle.report.countsByKind,
    processesReady: bundle.report.readyProcessCount,
    processesNeedingAttention: bundle.report.needsAttentionProcessCount,
}, null, 2));
