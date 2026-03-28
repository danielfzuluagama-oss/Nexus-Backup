import { buildOperationalKnowledgeArtifacts } from "../knowledge/operational-kb.js";
import { getOperationalKnowledgeStore } from "../knowledge/operational-store.js";

const forceRefresh = process.argv.includes("--force");
const noPrune = process.argv.includes("--no-prune");

const store = getOperationalKnowledgeStore();

if (!store.isAvailable()) {
  console.error(
    JSON.stringify(
      {
        error:
          "Firestore no está disponible. Configura GOOGLE_APPLICATION_CREDENTIALS o ejecuta en un runtime administrado antes de sincronizar el KB operativo.",
      },
      null,
      2,
    ),
  );
  process.exit(1);
}

const bundle = await buildOperationalKnowledgeArtifacts(forceRefresh);
const result = await store.syncBundle(bundle, { pruneExisting: !noPrune });

console.log(
  JSON.stringify(
    {
      generatedAt: bundle.report.generatedAt,
      declaredProcessCount: bundle.report.declaredProcessCount,
      processesReady: bundle.report.readyProcessCount,
      processesNeedingAttention: bundle.report.needsAttentionProcessCount,
      syncedModules: result.moduleCount,
      syncedChunks: result.chunkCount,
      prunedModules: result.prunedModules,
      prunedChunks: result.prunedChunks,
      syncVersion: result.syncVersion,
    },
    null,
    2,
  ),
);
