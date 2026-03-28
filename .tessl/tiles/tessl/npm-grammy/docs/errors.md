# Error Handling

Specialized error classes for API errors, network failures, and middleware execution errors.

## Capabilities

### BotError

Wraps errors that occur during middleware execution, providing context about where the error happened.

```typescript { .api }
/**
 * Error wrapper for middleware errors, includes the context where error occurred
 */
class BotError<C extends Context> extends Error {
  /**
   * Create BotError
   * @param error - The original error
   * @param ctx - Context where error occurred
   */
  constructor(error: unknown, ctx: C);

  /**
   * The wrapped error (original error that was thrown)
   */
  error: unknown;

  /**
   * Context object where error occurred
   */
  ctx: C;
}
```

**Usage Examples:**

```typescript
import { Bot, BotError } from "grammy";

const bot = new Bot("TOKEN");

// Set error handler
bot.catch((err: BotError) => {
  console.error("Error in middleware:", err.error);
  console.error("Update:", err.ctx.update);
  console.error("Chat:", err.ctx.chat?.id);

  // Access original error
  if (err.error instanceof Error) {
    console.error("Stack trace:", err.error.stack);
  }

  // Notify user
  if (err.ctx.chat) {
    err.ctx.reply("Sorry, an error occurred!").catch(console.error);
  }
});

// Middleware that might throw
bot.on("message", (ctx) => {
  // This error will be wrapped in BotError
  throw new Error("Something went wrong!");
});
```

### GrammyError

Represents errors returned by the Telegram Bot API, including error codes and descriptions from Telegram.

```typescript { .api }
/**
 * Error class for Telegram Bot API errors
 */
class GrammyError extends Error {
  /**
   * Create GrammyError
   * @param message - Error message
   * @param err - API error object from Telegram
   * @param method - API method that failed
   * @param payload - Request payload that caused error
   */
  constructor(
    message: string,
    err: ApiError,
    method: string,
    payload: Record<string, unknown>
  );

  /**
   * Always false (indicates API error)
   */
  ok: false;

  /**
   * Telegram error code
   */
  error_code: number;

  /**
   * Error description from Telegram
   */
  description: string;

  /**
   * Additional error parameters (e.g., retry_after for rate limits)
   */
  parameters: ResponseParameters;

  /**
   * API method that failed
   */
  method: string;

  /**
   * Request payload that caused the error
   */
  payload: Record<string, unknown>;
}
```

**Common Error Codes:**

- `400` - Bad Request (invalid parameters)
- `401` - Unauthorized (invalid bot token)
- `403` - Forbidden (bot blocked by user, no permissions)
- `404` - Not Found (chat/message not found)
- `409` - Conflict (webhook and polling active simultaneously)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error (Telegram server issue)

**Usage Examples:**

```typescript
import { GrammyError } from "grammy";

bot.catch((err: BotError) => {
  const error = err.error;

  if (error instanceof GrammyError) {
    console.error("API Error:", error.description);
    console.error("Error code:", error.error_code);
    console.error("Method:", error.method);
    console.error("Payload:", error.payload);

    // Handle specific error codes
    switch (error.error_code) {
      case 403:
        console.log("Bot was blocked by user or lacks permissions");
        break;
      case 429:
        console.log("Rate limited. Retry after:", error.parameters.retry_after);
        break;
      case 400:
        if (error.description.includes("message is not modified")) {
          console.log("Tried to edit message with same content");
        }
        break;
    }
  }
});

// Catching specific API errors
try {
  await bot.api.sendMessage(invalidChatId, "Hello!");
} catch (error) {
  if (error instanceof GrammyError) {
    if (error.error_code === 400) {
      console.log("Invalid chat ID");
    }
  }
}
```

### HttpError

Represents network-level errors such as connection failures, timeouts, or DNS resolution errors.

```typescript { .api }
/**
 * Error class for network/HTTP errors
 */
class HttpError extends Error {
  /**
   * Create HttpError
   * @param message - Error message
   * @param error - Underlying error object
   */
  constructor(message: string, error: unknown);

  /**
   * The underlying error (e.g., fetch error, network error)
   */
  error: unknown;
}
```

**Usage Examples:**

```typescript
import { HttpError } from "grammy";

bot.catch((err: BotError) => {
  const error = err.error;

  if (error instanceof HttpError) {
    console.error("Network error:", error.message);
    console.error("Underlying error:", error.error);

    // Could be timeout, DNS failure, connection refused, etc.
    // Might want to retry or alert monitoring system
  }
});

// Handling network errors in direct API calls
try {
  await bot.api.sendMessage(chatId, "Hello!");
} catch (error) {
  if (error instanceof HttpError) {
    console.log("Network problem, will retry later");
    // Implement retry logic
  }
}
```

### Error Handling Patterns

**Global Error Handler:**

```typescript
bot.catch((err) => {
  const error = err.error;

  if (error instanceof GrammyError) {
    console.error("API Error:", error.description);
  } else if (error instanceof HttpError) {
    console.error("Network Error:", error.message);
  } else {
    console.error("Unknown Error:", error);
  }
});
```

**Error Boundaries:**

```typescript
// Isolate risky middleware
bot.errorBoundary(
  (err, next) => {
    console.error("Error in risky operation:", err.error);
    // Continue to next middleware
    return next();
  },
  riskyMiddleware
);
```

**Try-Catch in Middleware:**

```typescript
bot.on("message", async (ctx) => {
  try {
    await doSomethingRisky(ctx);
  } catch (error) {
    console.error("Caught error:", error);
    return ctx.reply("Sorry, something went wrong");
  }
});
```

**Retry Logic:**

```typescript
async function sendWithRetry(
  chatId: number,
  text: string,
  maxRetries = 3
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await bot.api.sendMessage(chatId, text);
    } catch (error) {
      if (error instanceof GrammyError && error.error_code === 429) {
        // Rate limited - wait and retry
        const retryAfter = error.parameters.retry_after || 1;
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        continue;
      }
      if (error instanceof HttpError && i < maxRetries - 1) {
        // Network error - retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}
```

**Graceful Degradation:**

```typescript
bot.on("message:photo", async (ctx) => {
  try {
    // Try to process photo
    await processPhoto(ctx.message.photo);
    await ctx.reply("Photo processed!");
  } catch (error) {
    // Fallback gracefully
    console.error("Photo processing failed:", error);
    await ctx.reply("Received your photo, but couldn't process it");
  }
});
```

**Error Logging and Monitoring:**

```typescript
import { BotError, GrammyError, HttpError } from "grammy";

bot.catch((err) => {
  // Log to monitoring service
  logger.error("Bot error", {
    update_id: err.ctx.update.update_id,
    chat_id: err.ctx.chat?.id,
    user_id: err.ctx.from?.id,
    error_type: err.error?.constructor?.name,
    error_message: err.error instanceof Error ? err.error.message : String(err.error)
  });

  // Send to error tracking service (e.g., Sentry)
  if (err.error instanceof Error) {
    Sentry.captureException(err.error, {
      contexts: {
        telegram: {
          update: err.ctx.update,
          chat: err.ctx.chat,
          user: err.ctx.from
        }
      }
    });
  }

  // Alert for critical errors
  if (err.error instanceof GrammyError && err.error.error_code === 401) {
    alertAdmins("Bot token is invalid!");
  }
});
```

## Types

```typescript { .api }
/**
 * API error response from Telegram
 */
interface ApiError {
  ok: false;
  error_code: number;
  description: string;
  parameters?: ResponseParameters;
}

/**
 * Additional error parameters
 */
interface ResponseParameters {
  /**
   * Optional. The group has been migrated to a supergroup with the specified identifier.
   */
  migrate_to_chat_id?: number;

  /**
   * Optional. In case of exceeding flood control, the number of seconds left
   * to wait before the request can be repeated
   */
  retry_after?: number;
}
```
