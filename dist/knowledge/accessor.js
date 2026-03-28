import { logger } from "../logger.js";
import { getOperationalKnowledgeBase } from "./operational-kb.js";
import { getOperationalKnowledgeStore } from "./operational-store.js";
export async function getOperationalKnowledgeAccessor() {
    const store = getOperationalKnowledgeStore();
    if (store.isAvailable()) {
        try {
            if (await store.hasSyncedKnowledge()) {
                logger.info("Operational knowledge resolved from Firestore store");
                return store;
            }
        }
        catch (error) {
            logger.warn("Operational Firestore store probe failed, falling back to local bundle", {
                error: error instanceof Error ? error.message : String(error),
            });
        }
    }
    logger.info("Operational knowledge resolved from local bundle");
    return getOperationalKnowledgeBase();
}
