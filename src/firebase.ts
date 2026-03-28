import { onRequest } from "firebase-functions/v2/https";
import { onMessagePublished } from "firebase-functions/v2/pubsub";
import { functionSecrets, materializeFunctionSecrets } from "./firebase-secrets.js";
import { logger } from "./logger.js";
import {
  decodeTaskPayloadFromBase64,
  ensureWebhookRegistration,
  getServiceContext,
  processTaskPayload,
  resolveWebhookBaseUrl,
} from "./service.js";
import type { TaskPayload } from "./service.js";

const REGION = "us-central1";
const TOPIC = process.env.PUBSUB_TOPIC || "pristino-messages";

function resolveFunctionBaseUrl(request: { get(name: string): string | undefined; protocol?: string }): string | undefined {
  return resolveWebhookBaseUrl({
    explicitBaseUrl: process.env.WEBHOOK_URL,
    forwardedHost: request.get("x-forwarded-host"),
    host: request.get("host"),
    protocol: request.get("x-forwarded-proto") ?? request.protocol ?? "https",
    functionTarget: "api",
    projectId: process.env.GCLOUD_PROJECT,
    region: REGION,
    appendFunctionTarget: true,
  });
}

export const api = onRequest(
  {
    region: REGION,
    timeoutSeconds: 300,
    memory: "1GiB",
    maxInstances: 10,
    concurrency: 20,
    invoker: "public",
    secrets: functionSecrets,
  },
  async (request, response) => {
    try {
      materializeFunctionSecrets();
      const context = await getServiceContext();
      await ensureWebhookRegistration(resolveFunctionBaseUrl(request));
      return context.app(request, response);
    } catch (error) {
      logger.error("Failed to initialize HTTP function", { error });
      response.status(500).send("Service initialization failed");
    }
  },
);

export const worker = onMessagePublished<TaskPayload>(
  {
    topic: TOPIC,
    region: REGION,
    timeoutSeconds: 540,
    memory: "1GiB",
    maxInstances: 10,
    concurrency: 20,
    retry: true,
    secrets: functionSecrets,
  },
  async (event) => {
    materializeFunctionSecrets();
    const payload =
      event.data.message.json ??
      decodeTaskPayloadFromBase64(event.data.message.data);

    if (!payload) {
      logger.error("Dropping Pub/Sub message with invalid payload", {
        messageId: event.data.message.messageId,
      });
      return;
    }

    const processed = await processTaskPayload(payload);
    if (!processed) {
      logger.warn("Dropping Pub/Sub message for unknown bot", {
        botName: payload.botName,
      });
    }
  },
);
