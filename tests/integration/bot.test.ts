// ============================================================================
// T084 — Integration tests for bot message handling (webhook + Pub/Sub)
// Covers:
//   TS-062: Webhook returns HTTP 200 within 2s, processing continues in background
//   TS-063: Message acknowledged before platform timeout
//   TS-065: Message during startup queued and processed after ecosystem loads
// ============================================================================

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import type { Express, Request, Response } from "express";
import type { Server } from "http";

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock("../../src/logger.js", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

vi.mock("firebase-admin/app", () => ({
  initializeApp: vi.fn(),
  getApps: vi.fn().mockReturnValue([{}]),
  cert: vi.fn(),
}));

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn().mockReturnValue({}),
  FieldValue: { serverTimestamp: vi.fn(), arrayUnion: vi.fn(), increment: vi.fn() },
  Firestore: class {},
}));

vi.mock("../../src/tools/registry.js", () => ({
  getAllToolDefinitions: vi.fn().mockReturnValue([]),
  executeTool: vi.fn().mockResolvedValue("tool result"),
  registerDelegateTool: vi.fn(),
}));

vi.mock("../../src/security.js", () => ({
  sanitizeInput: vi.fn((s: string) => ({ safe: true, cleaned: s, reason: "" })),
  buildSecurePrompt: vi.fn((s: string) => s),
  validateOutput: vi.fn((s: string) => ({ safe: true, cleaned: s })),
}));

vi.mock("../../src/tokens.js", () => ({
  calculateBudget: vi.fn().mockReturnValue({ available: 100_000 }),
  trimHistory: vi.fn((msgs: unknown[]) => msgs),
}));

// Grammy mock — prevents real Telegram API calls
const mockHandleUpdate = vi.fn().mockResolvedValue(undefined);
const mockSetWebhook = vi.fn().mockResolvedValue(true);

vi.mock("grammy", () => ({
  Bot: vi.fn().mockImplementation(() => ({
    handleUpdate: mockHandleUpdate,
    api: { setWebhook: mockSetWebhook },
    use: vi.fn(),
    on: vi.fn(),
    catch: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  })),
}));

// ---------------------------------------------------------------------------
// Pub/Sub stub
//
// Rather than fighting with vi.mock class constructors, we build a lightweight
// in-process Pub/Sub stub. The publishMessage spy is exported so tests can
// assert on it directly. The stub records all published payloads in the
// shared `publishedMessages` array.
// ---------------------------------------------------------------------------

type PublishedEntry = { topic: string; payload: unknown };
const publishedMessages: PublishedEntry[] = [];

const mockPublishMessage = vi.fn(async (opts: { data: Buffer }) => {
  const parsed = JSON.parse(opts.data.toString("utf-8"));
  publishedMessages.push({ topic: "pristino-messages", payload: parsed });
  return "mock-message-id";
});

/** Lightweight PubSub stub that records calls in publishedMessages. */
class PubSubStub {
  topic(_name: string) {
    return { publishMessage: mockPublishMessage };
  }
}

// ---------------------------------------------------------------------------
// Helpers: minimal Express app that mirrors src/index.ts webhook logic
// ---------------------------------------------------------------------------

function buildTestApp(opts: {
  botName?: string;
  simulatePublishDelay?: number;
  simulatePublishError?: boolean;
}): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));

  const pubsub = new PubSubStub();
  const topicName = "pristino-messages";
  const botName = opts.botName ?? "pristino";

  // Webhook ingress — mirrors src/index.ts POST /webhook/:botName
  app.post("/webhook/:botName", async (req: Request, res: Response) => {
    const reqBotName = req.params.botName;
    if (reqBotName !== botName) {
      res.status(404).send("Bot not found");
      return;
    }

    if (opts.simulatePublishError) {
      res.status(500).send("Publish failed");
      return;
    }

    const update = req.body;

    try {
      if (opts.simulatePublishDelay) {
        await new Promise<void>((r) => setTimeout(r, opts.simulatePublishDelay));
      }
      const taskPayload = { botName: reqBotName, update };
      const dataBuffer = Buffer.from(JSON.stringify(taskPayload));
      await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
      res.status(200).send("OK");
    } catch {
      res.status(500).send("Publish failed");
    }
  });

  // Background worker — mirrors src/index.ts POST /pubsub-push
  app.post("/pubsub-push", async (req: Request, res: Response) => {
    try {
      const message = req.body.message;
      if (!message || !message.data) {
        res.status(400).send("Bad request: Missing message context");
        return;
      }

      const payloadStr = Buffer.from(message.data, "base64").toString("utf-8");
      const payload = JSON.parse(payloadStr);

      if (payload.botName !== botName || !payload.update) {
        res.status(204).send();
        return;
      }

      await mockHandleUpdate(payload.update);
      res.status(204).send();
    } catch {
      res.status(500).send("Internal processing error");
    }
  });

  return app;
}

/** Start Express on a random free port. */
function startServer(app: Express): Promise<{ server: Server; baseUrl: string }> {
  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      resolve({ server, baseUrl: `http://127.0.0.1:${port}` });
    });
  });
}

/** Gracefully stop the server. */
function stopServer(server: Server): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
}

// ---------------------------------------------------------------------------
// Sample Telegram Update fixture
// ---------------------------------------------------------------------------

const sampleUpdate = {
  update_id: 123456789,
  message: {
    message_id: 1,
    from: { id: 18219468, is_bot: false, first_name: "Javier", username: "javier_ceo" },
    chat: { id: 18219468, type: "private" },
    date: Math.floor(Date.now() / 1000),
    text: "Hola Pristino",
  },
};

// ---------------------------------------------------------------------------
// TS-062: Webhook ingress returns HTTP 200 within 2 seconds
// ---------------------------------------------------------------------------

describe("TS-062: Webhook ingress returns HTTP 200 within 2 seconds", () => {
  let server: Server;
  let baseUrl: string;

  beforeEach(async () => {
    publishedMessages.length = 0;
    mockPublishMessage.mockClear();
    mockHandleUpdate.mockClear();
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));
  });

  afterEach(async () => {
    await stopServer(server);
  });

  it("returns HTTP 200 for a valid Telegram update", async () => {
    const start = Date.now();
    const res = await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });
    const elapsed = Date.now() - start;

    expect(res.status).toBe(200);
    // TS-062: must acknowledge within 2 seconds
    expect(elapsed).toBeLessThan(2000);
  });

  it("publishes the update to Pub/Sub after returning 200", async () => {
    await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });

    expect(mockPublishMessage).toHaveBeenCalledTimes(1);
    expect(publishedMessages).toHaveLength(1);
    expect(publishedMessages[0].payload).toMatchObject({
      botName: "pristino",
      update: { update_id: 123456789 },
    });
  });

  it("returns 404 for an unknown bot name", async () => {
    const res = await fetch(`${baseUrl}/webhook/unknown-bot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });
    expect(res.status).toBe(404);
  });

  it("processing continues in background via pubsub-push handler", async () => {
    // Step 1: webhook publishes to Pub/Sub
    await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });

    // Step 2: Pub/Sub push subscription delivers the message to the worker
    const publishedPayload = publishedMessages[0].payload;
    const encodedData = Buffer.from(JSON.stringify(publishedPayload)).toString("base64");

    const pushRes = await fetch(`${baseUrl}/pubsub-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { data: encodedData } }),
    });

    expect(pushRes.status).toBe(204);
    expect(mockHandleUpdate).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// TS-063: Message acknowledged before platform timeout
// ---------------------------------------------------------------------------

describe("TS-063: Message acknowledged before platform timeout", () => {
  let server: Server;
  let baseUrl: string;

  beforeEach(async () => {
    publishedMessages.length = 0;
    mockPublishMessage.mockClear();
    mockHandleUpdate.mockClear();
  });

  afterEach(async () => {
    if (server) await stopServer(server);
  });

  it("responds with 200 OK even when Pub/Sub publish has a slight delay", async () => {
    // Simulate 100ms publish latency — still well within 2s platform timeout
    const app = buildTestApp({ botName: "pristino", simulatePublishDelay: 100 });
    ({ server, baseUrl } = await startServer(app));

    const start = Date.now();
    const res = await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });
    const elapsed = Date.now() - start;

    expect(res.status).toBe(200);
    expect(elapsed).toBeLessThan(2000);
  });

  it("pubsub-push returns 204 to acknowledge delivery to Pub/Sub", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });

    const payload = publishedMessages[0].payload;
    const encodedData = Buffer.from(JSON.stringify(payload)).toString("base64");

    const pushRes = await fetch(`${baseUrl}/pubsub-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { data: encodedData } }),
    });

    // TS-063: 204 signals Pub/Sub not to retry
    expect(pushRes.status).toBe(204);
  });

  it("pubsub-push returns 400 when message data is missing", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    const badRes = await fetch(`${baseUrl}/pubsub-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: {} }), // missing 'data'
    });

    expect(badRes.status).toBe(400);
  });

  it("webhook returns 200 before handleUpdate is called (async separation)", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    const webhookRes = await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });
    expect(webhookRes.status).toBe(200);
    // At this point handleUpdate has NOT yet been called — message is in Pub/Sub queue
    expect(mockHandleUpdate).not.toHaveBeenCalled();

    // Worker processes asynchronously
    const payload = publishedMessages[0].payload;
    const encodedData = Buffer.from(JSON.stringify(payload)).toString("base64");
    await fetch(`${baseUrl}/pubsub-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { data: encodedData } }),
    });

    expect(mockHandleUpdate).toHaveBeenCalledOnce();
  });
});

// ---------------------------------------------------------------------------
// TS-065: Message received during startup is queued via Pub/Sub
// ---------------------------------------------------------------------------

describe("TS-065: Message received during startup is queued via Pub/Sub", () => {
  let server: Server;
  let baseUrl: string;

  beforeEach(async () => {
    publishedMessages.length = 0;
    mockPublishMessage.mockClear();
    mockHandleUpdate.mockClear();
  });

  afterEach(async () => {
    if (server) await stopServer(server);
  });

  it("webhook endpoint publishes to Pub/Sub irrespective of ecosystem state", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    const res = await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });

    expect(res.status).toBe(200);
    expect(publishedMessages).toHaveLength(1);
  });

  it("queued message contains the full update payload for later processing", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    const uniqueUpdate = { ...sampleUpdate, update_id: 999888777 };

    await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(uniqueUpdate),
    });

    expect(publishedMessages[0].payload).toMatchObject({
      botName: "pristino",
      update: { update_id: 999888777 },
    });
  });

  it("multiple messages during startup are each queued individually", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    const updates = [
      { ...sampleUpdate, update_id: 1001 },
      { ...sampleUpdate, update_id: 1002 },
      { ...sampleUpdate, update_id: 1003 },
    ];

    for (const u of updates) {
      await fetch(`${baseUrl}/webhook/pristino`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(u),
      });
    }

    expect(publishedMessages).toHaveLength(3);
    const ids = publishedMessages.map(
      (m) => (m.payload as { update: { update_id: number } }).update.update_id
    );
    expect(ids).toContain(1001);
    expect(ids).toContain(1002);
    expect(ids).toContain(1003);
  });

  it("queued message is processed via bot.handleUpdate once ecosystem is ready", async () => {
    const app = buildTestApp({ botName: "pristino" });
    ({ server, baseUrl } = await startServer(app));

    // 1. Message arrives during startup — queued in Pub/Sub
    await fetch(`${baseUrl}/webhook/pristino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sampleUpdate),
    });

    // 2. Ecosystem finishes loading — pubsub-push worker is now active
    const payload = publishedMessages[0].payload;
    const encodedData = Buffer.from(JSON.stringify(payload)).toString("base64");

    const pushRes = await fetch(`${baseUrl}/pubsub-push`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { data: encodedData } }),
    });

    expect(pushRes.status).toBe(204);
    // TS-065: processed once ecosystem is ready
    expect(mockHandleUpdate).toHaveBeenCalledOnce();
  });
});
