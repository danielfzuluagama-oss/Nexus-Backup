# Webhooks

Integrate grammY with web frameworks for webhook-based update delivery instead of long polling.

## Capabilities

### Webhook Callback

Create webhook request handlers for web frameworks.

```typescript { .api }
/**
 * Create webhook callback handler for web frameworks
 * @param bot - Bot instance
 * @param adapter - Framework adapter function
 * @param onTimeout - Timeout handling strategy or custom handler
 * @param timeoutMilliseconds - Request timeout in milliseconds
 * @param secretToken - Secret token for webhook validation
 * @returns Framework-specific request handler
 * @deprecated Use framework-specific integrations instead
 */
function webhookCallback<C extends Context>(
  bot: Bot<C>,
  adapter: FrameworkAdapter,
  onTimeout?: "throw" | "return" | ((...args: any[]) => unknown),
  timeoutMilliseconds?: number,
  secretToken?: string
): Function;
```

### Webhook Options

Configuration interface for webhook setup.

```typescript { .api }
interface WebhookOptions {
  /**
   * How to handle request timeouts
   * - "throw": Throw error (default)
   * - "return": Return without error
   * - Custom function: Call function with request/response args
   */
  onTimeout?: "throw" | "return" | ((...args: any[]) => unknown);

  /**
   * Request timeout in milliseconds
   * @default 10000
   */
  timeoutMilliseconds?: number;

  /**
   * Secret token for validating webhook requests.
   * Should match X-Telegram-Bot-Api-Secret-Token header.
   */
  secretToken?: string;
}
```

**Usage Examples:**

```typescript
import { Bot, webhookCallback } from "grammy";
import express from "express";

const bot = new Bot("TOKEN");

// Register bot handlers
bot.command("start", (ctx) => ctx.reply("Hello!"));

// Express integration
const app = express();
app.use(express.json());

app.post("/webhook", webhookCallback(bot, "express", {
  onTimeout: "return",
  timeoutMilliseconds: 30000,
  secretToken: "my-secret-token"
}));

// Set webhook
await bot.api.setWebhook("https://example.com/webhook", {
  secret_token: "my-secret-token"
});

app.listen(3000);
```

### Direct Webhook Handling

Handle webhook updates directly without adapters.

```typescript
import { Bot } from "grammy";
import express from "express";

const bot = new Bot("TOKEN");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    // Validate secret token
    const token = req.header("X-Telegram-Bot-Api-Secret-Token");
    if (token !== "my-secret-token") {
      return res.status(401).send("Unauthorized");
    }

    // Handle update
    await bot.handleUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    res.sendStatus(500);
  }
});

app.listen(3000);
```

### Webhook Setup and Management

```typescript
// Set webhook with options
await bot.api.setWebhook("https://example.com/webhook", {
  allowed_updates: ["message", "callback_query"],
  secret_token: "my-secret-token",
  drop_pending_updates: true,
  max_connections: 100
});

// Get webhook info
const info = await bot.api.getWebhookInfo();
console.log("Webhook URL:", info.url);
console.log("Pending updates:", info.pending_update_count);

// Delete webhook (switch to polling)
await bot.api.deleteWebhook({
  drop_pending_updates: false
});
```

### Framework-Specific Examples

**Koa:**

```typescript
import Koa from "koa";
import { Bot } from "grammy";

const bot = new Bot("TOKEN");
const app = new Koa();

app.use(async (ctx) => {
  if (ctx.method === "POST" && ctx.path === "/webhook") {
    const update = ctx.request.body;
    await bot.handleUpdate(update);
    ctx.status = 200;
  }
});

app.listen(3000);
```

**Fastify:**

```typescript
import Fastify from "fastify";
import { Bot } from "grammy";

const bot = new Bot("TOKEN");
const fastify = Fastify();

fastify.post("/webhook", async (request, reply) => {
  await bot.handleUpdate(request.body);
  reply.code(200).send();
});

fastify.listen({ port: 3000 });
```

**Deno (std/http):**

```typescript
import { serve } from "https://deno.land/std/http/server.ts";
import { Bot } from "https://deno.land/x/grammy/mod.ts";

const bot = new Bot("TOKEN");

await serve(async (req) => {
  if (req.method === "POST") {
    const update = await req.json();
    await bot.handleUpdate(update);
    return new Response(null, { status: 200 });
  }
  return new Response("Not Found", { status: 404 });
}, { port: 3000 });
```

### Webhook Reply Optimization

grammY can send API responses directly in webhook replies for faster response times:

```typescript
// API methods called in webhook handlers can be sent as webhook replies
bot.on("message", (ctx) => {
  // This reply might be sent as webhook reply instead of separate API call
  return ctx.reply("Fast response!");
});

// Disable webhook replies for specific API client
const bot = new Bot("TOKEN", {
  client: {
    canUseWebhookReply: () => false
  }
});
```

## Types

```typescript { .api }
/**
 * Framework adapter function that creates request-response handlers
 */
type FrameworkAdapter = (...args: any[]) => ReqResHandler<any>;

/**
 * Request-response handler abstraction
 */
interface ReqResHandler<T = void> {
  /**
   * The update object from request body
   */
  update: MaybePromise<Update>;

  /**
   * X-Telegram-Bot-Api-Secret-Token header value
   */
  header?: string;

  /**
   * End request without body
   */
  end?: () => void;

  /**
   * Send JSON response (for webhook replies)
   */
  respond: (json: string) => unknown | Promise<unknown>;

  /**
   * Send unauthorized response
   */
  unauthorized: () => unknown | Promise<unknown>;

  /**
   * Return value for frameworks expecting handler return
   */
  handlerReturn?: Promise<T>;
}

/**
 * Webhook reply envelope for sending API response in webhook reply
 */
interface WebhookReplyEnvelope {
  /**
   * API method name
   */
  method: string;

  /**
   * Method payload
   */
  payload: Record<string, unknown>;
}

type MaybePromise<T> = T | Promise<T>;
```
