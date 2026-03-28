# Middleware and Filters

Middleware system for composing bot logic with powerful filtering, routing, and conditional execution capabilities.

## Capabilities

### Composer Class

Base class for composing middleware with filtering and routing capabilities.

```typescript { .api }
/**
 * Composer class for building middleware pipelines with filtering
 * and routing. Bot extends Composer, so all Composer methods are
 * available on Bot instances.
 */
class Composer<C extends Context = Context> {
  /**
   * Create a new Composer with optional initial middleware
   * @param middleware - Initial middleware to register
   */
  constructor(...middleware: Array<Middleware<C>>);

  /**
   * Get flattened middleware function
   * @returns Single middleware function representing all registered middleware
   */
  middleware(): MiddlewareFn<C>;

  /**
   * Register middleware
   * @param middleware - Middleware function(s) or object(s) to register
   * @returns This composer for chaining
   */
  use(...middleware: Array<Middleware<C>>): Composer<C>;

  /**
   * Filter updates by filter query (e.g., "message:text", "callback_query:data")
   * @param filter - Filter query string or array of queries
   * @param middleware - Middleware to run when filter matches
   * @returns New composer with narrowed context type
   */
  on<Q extends FilterQuery>(
    filter: Q | Q[],
    ...middleware: Array<Middleware<Filter<C, Q>>>
  ): Composer<Filter<C, Q>>;

  /**
   * Filter updates by text or regex match
   * @param trigger - String(s) or RegExp(s) to match against message text
   * @param middleware - Middleware to run when text matches
   * @returns New composer with HearsContext
   */
  hears(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<HearsMiddleware<C>>
  ): Composer<HearsContext<C>>;

  /**
   * Filter updates by command (e.g., "/start", "/help")
   * @param command - Command name(s) without leading slash
   * @param middleware - Middleware to run when command matches
   * @returns New composer with CommandContext
   */
  command(
    command: MaybeArray<StringWithCommandSuggestions>,
    ...middleware: Array<CommandMiddleware<C>>
  ): Composer<CommandContext<C>>;

  /**
   * Filter updates by message reaction
   * @param reaction - Emoji or array of emojis to match
   * @param middleware - Middleware to run when reaction matches
   * @returns New composer with ReactionContext
   */
  reaction(
    reaction: MaybeArray<ReactionTypeEmoji["emoji"]>,
    ...middleware: Array<ReactionMiddleware<C>>
  ): Composer<ReactionContext<C>>;

  /**
   * Filter updates by chat type
   * @param chatType - Chat type(s) to match ("private", "group", "supergroup", "channel")
   * @param middleware - Middleware to run when chat type matches
   * @returns New composer with ChatTypeContext
   */
  chatType<T extends Chat["type"]>(
    chatType: MaybeArray<T>,
    ...middleware: Array<ChatTypeMiddleware<C, T>>
  ): Composer<ChatTypeContext<C, T>>;

  /**
   * Filter callback queries by data pattern
   * @param trigger - String(s) or RegExp(s) to match callback data
   * @param middleware - Middleware to run when callback data matches
   * @returns New composer with CallbackQueryContext
   */
  callbackQuery(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<CallbackQueryMiddleware<C>>
  ): Composer<CallbackQueryContext<C>>;

  /**
   * Filter game queries by game short name pattern
   * @param trigger - String(s) or RegExp(s) to match game short name
   * @param middleware - Middleware to run when game query matches
   * @returns New composer with GameQueryContext
   */
  gameQuery(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<GameQueryMiddleware<C>>
  ): Composer<GameQueryContext<C>>;

  /**
   * Filter inline queries by query text pattern
   * @param trigger - String(s) or RegExp(s) to match query text
   * @param middleware - Middleware to run when inline query matches
   * @returns New composer with InlineQueryContext
   */
  inlineQuery(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<InlineQueryMiddleware<C>>
  ): Composer<InlineQueryContext<C>>;

  /**
   * Filter chosen inline results by result ID pattern
   * @param resultId - String(s) or RegExp(s) to match result ID
   * @param middleware - Middleware to run when result matches
   * @returns New composer with ChosenInlineResultContext
   */
  chosenInlineResult(
    resultId: MaybeArray<string | RegExp>,
    ...middleware: Array<Middleware<ChosenInlineResultContext<C>>>
  ): Composer<ChosenInlineResultContext<C>>;

  /**
   * Filter pre-checkout queries by invoice payload pattern
   * @param trigger - String(s) or RegExp(s) to match payload
   * @param middleware - Middleware to run when pre-checkout query matches
   * @returns New composer with PreCheckoutQueryContext
   */
  preCheckoutQuery(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<PreCheckoutQueryMiddleware<C>>
  ): Composer<PreCheckoutQueryContext<C>>;

  /**
   * Filter shipping queries by invoice payload pattern
   * @param trigger - String(s) or RegExp(s) to match payload
   * @param middleware - Middleware to run when shipping query matches
   * @returns New composer with ShippingQueryContext
   */
  shippingQuery(
    trigger: MaybeArray<string | RegExp>,
    ...middleware: Array<ShippingQueryMiddleware<C>>
  ): Composer<ShippingQueryContext<C>>;

  /**
   * Apply custom filter predicate with type narrowing
   * @param predicate - Type guard function
   * @param middleware - Middleware to run when predicate returns true
   * @returns New composer with narrowed context type
   */
  filter<D extends C>(
    predicate: (ctx: C) => ctx is D,
    ...middleware: Array<Middleware<D>>
  ): Composer<D>;

  /**
   * Apply inverted filter (run middleware when predicate is false)
   * @param predicate - Boolean predicate function
   * @param middleware - Middleware to run when predicate returns false
   * @returns This composer for chaining
   */
  drop(
    predicate: (ctx: C) => MaybePromise<boolean>,
    ...middleware: Array<Middleware<C>>
  ): Composer<C>;

  /**
   * Execute middleware concurrently (non-blocking)
   * @param middleware - Middleware to run in parallel with main chain
   * @returns This composer for chaining
   */
  fork(...middleware: Array<Middleware<C>>): Composer<C>;

  /**
   * Create middleware dynamically based on context
   * @param middlewareFactory - Function that returns middleware
   * @returns This composer for chaining
   */
  lazy(
    middlewareFactory: (ctx: C) => MaybePromise<Middleware<C>>
  ): Composer<C>;

  /**
   * Route updates based on computed key
   * @param router - Function that returns route key
   * @param routeHandlers - Map of route keys to middleware
   * @param fallback - Optional fallback middleware when no route matches
   * @returns This composer for chaining
   */
  route<R extends Record<string, Middleware<C>>>(
    router: (ctx: C) => MaybePromise<keyof R>,
    routeHandlers: R,
    fallback?: Middleware<C>
  ): Composer<C>;

  /**
   * Conditional branching
   * @param predicate - Condition function
   * @param trueMiddleware - Middleware when predicate is true
   * @param falseMiddleware - Middleware when predicate is false
   * @returns This composer for chaining
   */
  branch(
    predicate: (ctx: C) => MaybePromise<boolean>,
    trueMiddleware: Middleware<C>,
    falseMiddleware: Middleware<C>
  ): Composer<C>;

  /**
   * Wrap middleware in error boundary
   * @param errorHandler - Function to handle errors
   * @param middleware - Middleware to protect
   * @returns This composer for chaining
   */
  errorBoundary(
    errorHandler: (error: BotError<C>, next: NextFunction) => MaybePromise<void>,
    ...middleware: Array<Middleware<C>>
  ): Composer<C>;
}
```

**Usage Examples:**

```typescript
import { Bot, Composer } from "grammy";

const bot = new Bot("TOKEN");

// Basic middleware
bot.use((ctx, next) => {
  console.log("Update received:", ctx.update.update_id);
  return next();
});

// Filter by update type
bot.on("message", (ctx) => {
  console.log("Message from:", ctx.from?.first_name);
});

bot.on("callback_query", async (ctx) => {
  await ctx.answerCallbackQuery();
});

// Multiple filters (OR logic)
bot.on(["message", "edited_message"], (ctx) => {
  // Handles both new and edited messages
});

// Nested filters (AND logic)
bot.on("message").on(":text", (ctx) => {
  // Only text messages
  console.log(ctx.message.text);
});

// Text matching
bot.hears("hello", (ctx) => ctx.reply("Hi there!"));
bot.hears(/bye/i, (ctx) => ctx.reply("Goodbye!"));

// Commands
bot.command("start", (ctx) => ctx.reply("Welcome!"));
bot.command(["help", "about"], (ctx) => ctx.reply("Help info"));

// Callback queries
bot.callbackQuery("button_1", (ctx) => {
  ctx.answerCallbackQuery("You clicked button 1!");
});

bot.callbackQuery(/^page_\d+$/, (ctx) => {
  const pageNum = ctx.callbackQuery.data.split("_")[1];
  ctx.editMessageText(`Page ${pageNum}`);
});

// Chat type filtering
bot.chatType("private", (ctx) => {
  // Only in private chats
});

bot.chatType(["group", "supergroup"], (ctx) => {
  // Only in groups
});

// Custom filters
bot.filter(
  (ctx): ctx is Context & { from: User } => ctx.from !== undefined,
  (ctx) => {
    // TypeScript knows ctx.from exists here
    console.log("User ID:", ctx.from.id);
  }
);

// Concurrent execution
bot.fork((ctx) => {
  // Runs in background, doesn't block main chain
  console.log("Background task for:", ctx.update.update_id);
});

// Dynamic middleware
bot.lazy((ctx) => {
  if (ctx.from?.id === 123456) {
    return adminMiddleware;
  }
  return regularMiddleware;
});

// Routing
bot.route(
  (ctx) => ctx.message?.text?.startsWith("/") ? "command" : "text",
  {
    command: (ctx) => console.log("Command:", ctx.message?.text),
    text: (ctx) => console.log("Text:", ctx.message?.text)
  },
  (ctx) => console.log("Other update type")
);

// Branching
bot.branch(
  (ctx) => ctx.from?.is_bot === true,
  (ctx) => console.log("Bot message"),
  (ctx) => console.log("User message")
);

// Error boundaries
bot.errorBoundary(
  (err, next) => {
    console.error("Caught error:", err);
    return next(); // Continue to other middleware
  },
  riskyMiddleware
);

// Creating separate composers
const privateHandler = new Composer();
privateHandler.command("secret", (ctx) => ctx.reply("Private command"));

const groupHandler = new Composer();
groupHandler.on("message:new_chat_members", (ctx) =>
  ctx.reply("Welcome!")
);

bot.chatType("private", privateHandler);
bot.chatType(["group", "supergroup"], groupHandler);
```

### Middleware Types

```typescript { .api }
/**
 * Middleware can be a function or an object with middleware() method
 */
type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;

/**
 * Middleware function signature
 * @param ctx - Context object
 * @param next - Function to call next middleware in chain
 */
type MiddlewareFn<C extends Context> = (
  ctx: C,
  next: NextFunction
) => MaybePromise<unknown>;

/**
 * Middleware object (like Composer instances)
 */
interface MiddlewareObj<C extends Context> {
  middleware(): MiddlewareFn<C>;
}

/**
 * Function to continue middleware chain
 */
type NextFunction = () => Promise<void>;
```

### Context Type Variants

Filtered context types with narrowed update information:

```typescript { .api }
/**
 * Context with callback query (from on("callback_query") or callbackQuery())
 */
type CallbackQueryContext<C extends Context> = Filter<C, "callback_query">;

/**
 * Context with specific chat type
 */
type ChatTypeContext<C extends Context, T extends Chat["type"]> = C & {
  chat: Chat & { type: T };
};

/**
 * Context with chosen inline result
 */
type ChosenInlineResultContext<C extends Context> = Filter<C, "chosen_inline_result">;

/**
 * Context with bot command (from command() method)
 */
type CommandContext<C extends Context> = Filter<C, "message"> & {
  match: string;
  message: Message & { text: string; entities: MessageEntity[] };
};

/**
 * Context with game query
 */
type GameQueryContext<C extends Context> = Filter<C, "callback_query:game_short_name">;

/**
 * Context with text match (from hears() method)
 */
type HearsContext<C extends Context> = Filter<C, "message:text" | "channel_post:text"> & {
  match: string | RegExpMatchArray;
};

/**
 * Context with inline query
 */
type InlineQueryContext<C extends Context> = Filter<C, "inline_query">;

/**
 * Context with message reaction
 */
type ReactionContext<C extends Context> = Filter<C, "message_reaction">;
```

### Middleware Type Variants

```typescript { .api }
type CallbackQueryMiddleware<C extends Context> = Middleware<CallbackQueryContext<C>>;
type ChatTypeMiddleware<C extends Context, T extends Chat["type"]> = Middleware<ChatTypeContext<C, T>>;
type CommandMiddleware<C extends Context> = Middleware<CommandContext<C>>;
type GameQueryMiddleware<C extends Context> = Middleware<GameQueryContext<C>>;
type HearsMiddleware<C extends Context> = Middleware<HearsContext<C>>;
type InlineQueryMiddleware<C extends Context> = Middleware<InlineQueryContext<C>>;
type ReactionMiddleware<C extends Context> = Middleware<ReactionContext<C>>;
```

### Filter System

Type-safe filtering with 300+ predefined filter queries.

```typescript { .api }
/**
 * Apply filter query to narrow context type
 */
type Filter<C extends Context, Q extends FilterQuery> = C & FilteredUpdate<Q>;

/**
 * Union of all valid filter query strings. Examples:
 * - "message" - Any message update
 * - "message:text" - Text messages only
 * - "message:photo" - Photo messages only
 * - "callback_query" - Any callback query
 * - "callback_query:data" - Callback queries with data
 * - "inline_query" - Inline queries
 * - "edited_message" - Edited messages
 * - "channel_post:text" - Text channel posts
 * - And 290+ more combinations...
 */
type FilterQuery = string; // Detailed type with 300+ literals in actual implementation

/**
 * Create type-safe predicate function for filter queries
 * @param filter - Filter query or array of queries
 * @returns Predicate function for filtering updates
 */
function matchFilter<C extends Context, Q extends FilterQuery>(
  filter: Q | Q[]
): (ctx: C) => ctx is Filter<C, Q>;
```

**Common Filter Queries:**

Message filters:
- `"message"` - Any message
- `"message:text"` - Text messages
- `"message:photo"` - Photo messages
- `"message:video"` - Video messages
- `"message:document"` - Document messages
- `"message:sticker"` - Sticker messages
- `"message:voice"` - Voice messages
- `"message:video_note"` - Video note messages
- `"message:audio"` - Audio messages
- `"message:animation"` - Animation messages
- `"message:location"` - Location messages
- `"message:venue"` - Venue messages
- `"message:contact"` - Contact messages
- `"message:poll"` - Poll messages
- `"message:dice"` - Dice messages
- `"message:game"` - Game messages

Message entity filters:
- `"message:entities:mention"` - Messages with mentions
- `"message:entities:hashtag"` - Messages with hashtags
- `"message:entities:cashtag"` - Messages with cashtags
- `"message:entities:bot_command"` - Messages with bot commands
- `"message:entities:url"` - Messages with URLs
- `"message:entities:email"` - Messages with emails
- `"message:entities:phone_number"` - Messages with phone numbers
- `"message:entities:bold"` - Messages with bold text
- `"message:entities:italic"` - Messages with italic text
- `"message:entities:code"` - Messages with code
- `"message:entities:pre"` - Messages with pre-formatted code

Update type filters:
- `"callback_query"` - Callback queries
- `"callback_query:data"` - Callback queries with data
- `"callback_query:game_short_name"` - Game callback queries
- `"inline_query"` - Inline queries
- `"chosen_inline_result"` - Chosen inline results
- `"shipping_query"` - Shipping queries
- `"pre_checkout_query"` - Pre-checkout queries
- `"poll"` - Poll updates
- `"poll_answer"` - Poll answer updates
- `"my_chat_member"` - Bot's chat member status changes
- `"chat_member"` - Chat member changes
- `"chat_join_request"` - Chat join requests
- `"message_reaction"` - Message reaction updates
- `"message_reaction_count"` - Message reaction count updates

Channel post filters:
- `"channel_post"` - Channel posts
- `"channel_post:text"` - Text channel posts
- `"channel_post:photo"` - Photo channel posts
- (All message filters also work with `channel_post:`)

Edited message filters:
- `"edited_message"` - Edited messages
- `"edited_message:text"` - Edited text messages
- `"edited_channel_post"` - Edited channel posts

**Usage Examples:**

```typescript
// Single filter
bot.on("message:text", (ctx) => {
  // ctx.message.text is guaranteed to exist
  console.log(ctx.message.text);
});

// Multiple filters (OR)
bot.on(["message:photo", "message:video"], (ctx) => {
  // ctx.message has either photo or video
});

// Chained filters (AND)
bot.on("message:text").on("message:entities:url", (ctx) => {
  // Text messages that contain URLs
});

// Using matchFilter
const isPhotoMessage = matchFilter<Context, "message:photo">("message:photo");

bot.use((ctx, next) => {
  if (isPhotoMessage(ctx)) {
    // TypeScript knows ctx.message.photo exists
    console.log(ctx.message.photo);
  }
  return next();
});
```

### Utility Function

```typescript { .api }
/**
 * Execute middleware function with context
 * @param middleware - Middleware function to run
 * @param ctx - Context to pass
 */
function run<C extends Context>(
  middleware: MiddlewareFn<C>,
  ctx: C
): Promise<void>;
```

## Types

```typescript { .api }
type MaybeArray<T> = T | T[];
type MaybePromise<T> = T | Promise<T>;
type StringWithCommandSuggestions = string;
```
