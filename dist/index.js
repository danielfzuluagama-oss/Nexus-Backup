import { logger } from "./logger.js";
import { runCli } from "./service.js";
runCli().catch((error) => {
    logger.error("Failed to start", { error });
    process.exit(1);
});
