import { logger } from "../logger.js";
import { getOperationalKnowledgeBase } from "./operational-kb.js";
import { getOperationalKnowledgeStore } from "./operational-store.js";

export interface OperationalKnowledgeAccessor {
  getReport(): Promise<import("./operational-kb.js").MigrationReport>;
  listProcesses(): Promise<import("./operational-kb.js").ProcessModule[]>;
  resolveProcess(processIdOrName: string): Promise<import("./operational-kb.js").ProcessModule | null>;
  search(
    query: string,
    options?: import("./operational-kb.js").SearchOptions,
  ): Promise<import("./operational-kb.js").KnowledgeChunk[]>;
  createOnboardingPack(
    processIdOrName: string,
    audienceRole?: string,
    objective?: string,
  ): Promise<import("./operational-kb.js").OnboardingPack | null>;
  createExecutionPack(
    processIdOrName: string,
    deliverable: string,
    objective?: string,
  ): Promise<import("./operational-kb.js").ExecutionPack | null>;
}

export async function getOperationalKnowledgeAccessor(): Promise<OperationalKnowledgeAccessor> {
  const store = getOperationalKnowledgeStore();
  if (store.isAvailable()) {
    try {
      if (await store.hasSyncedKnowledge()) {
        logger.info("Operational knowledge resolved from Firestore store");
        return store;
      }
    } catch (error) {
      logger.warn("Operational Firestore store probe failed, falling back to local bundle", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  logger.info("Operational knowledge resolved from local bundle");
  return getOperationalKnowledgeBase();
}
