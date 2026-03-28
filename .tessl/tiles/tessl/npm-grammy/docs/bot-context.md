# Bot and Context

Core classes for bot initialization, lifecycle management, and update handling with context-aware API shortcuts.

## Capabilities

### Bot Class

The main bot orchestrator managing updates, middleware execution, and bot lifecycle.

```typescript { .api }
/**
 * Main bot class that extends Composer to provide bot lifecycle management,
 * update handling, and convenient access to the Telegram Bot API
 */
class Bot<C extends Context = Context, A extends Api = Api> extends Composer<C> {
  /**
   * Create a new bot instance
   * @param token - Bot token from @BotFather
   * @param config - Optional configuration
   */
  constructor(token: string, config?: BotConfig<C>);

  /**
   * Initialize the bot by fetching bot information from Telegram.
   * Called automatically by start() if not already initialized.
   * @param signal - Optional AbortSignal for cancellation
   */
  init(signal?: AbortSignal): Promise<void>;

  /**
   * Check if bot has been initialized
   */
  isInited(): boolean;

  /**
   * Start long polling for updates. Initializes bot if needed.
   * @param options - Polling configuration
   */
  start(options?: PollingOptions): Promise<void>;

  /**
   * Stop long polling
   */
  stop(): Promise<void>;

  /**
   * Check if bot is currently running
   */
  isRunning(): boolean;

  /**
   * Set error handler for middleware errors
   * @param errorHandler - Function to handle BotError instances
   */
  catch(errorHandler: ErrorHandler<C>): void;

  /**
   * Handle a single update (used for webhooks)
   * @param update - Telegram update object
   * @param webhookReplyEnvelope - Optional envelope for webhook replies
   */
  handleUpdate(
    update: Update,
    webhookReplyEnvelope?: WebhookReplyEnvelope
  ): Promise<void>;

  /**
   * Bot token (read-only)
   */
  readonly token: string;

  /**
   * API instance for making calls (read-only)
   */
  readonly api: A;

  /**
   * Bot user information (available after init)
   */
  botInfo: UserFromGetMe;

  /**
   * Current error handler
   */
  errorHandler: ErrorHandler<C>;
}
```

**Usage Examples:**

```typescript
import { Bot } from "grammy";

// Basic bot creation
const bot = new Bot("YOUR_BOT_TOKEN");

// With configuration
const bot = new Bot("YOUR_BOT_TOKEN", {
  botInfo: cachedBotInfo, // Skip init() call
  client: {
    apiRoot: "https://custom-api-server.com",
    timeoutSeconds: 60
  }
});

// Initialize and start
await bot.init(); // Optional - start() calls this automatically
bot.start({
  limit: 100,
  timeout: 30,
  allowed_updates: ["message", "callback_query"]
});

// Error handling
bot.catch((err) => {
  console.error("Bot error:", err.error);
  console.error("Context:", err.ctx.update);
});

// Stop bot gracefully
await bot.stop();
```

### Bot Configuration

Configuration options for Bot constructor.

```typescript { .api }
interface BotConfig<C extends Context> {
  /**
   * Pre-fetched bot information. If provided, bot.init() will not
   * make an API call to getMe(). Useful for faster startup when
   * bot info is cached.
   */
  botInfo?: UserFromGetMe;

  /**
   * Custom context constructor. Use this to extend Context with
   * custom properties or methods.
   */
  ContextConstructor?: new (
    ...args: ConstructorParameters<typeof Context>
  ) => C;

  /**
   * API client configuration options
   */
  client?: ApiClientOptions;
}
```

### Polling Options

Options for long polling configuration.

```typescript { .api }
interface PollingOptions {
  /**
   * Maximum number of updates to fetch per request (1-100)
   * @default 100
   */
  limit?: number;

  /**
   * Long polling timeout in seconds (0-50)
   * @default 30
   */
  timeout?: number;

  /**
   * List of update types to receive. Omit to receive all updates
   * except chat_member, message_reaction, and message_reaction_count.
   */
  allowed_updates?: readonly UpdateType[];

  /**
   * Drop all pending updates before starting
   * @default false
   */
  drop_pending_updates?: boolean;
}
```

### Error Handler

Function type for handling middleware errors.

```typescript { .api }
/**
 * Error handler function that receives BotError instances
 * wrapping errors that occurred during middleware execution
 */
type ErrorHandler<C extends Context> = (
  error: BotError<C>
) => void | Promise<void>;
```

### Context Class

Context object wrapping each update with convenient shortcuts and helpers.

```typescript { .api }
/**
 * Context object that wraps a Telegram update and provides convenient
 * shortcuts to access update data and make API calls
 */
class Context<C extends Context = Context> {
  /**
   * Create a context instance
   * @param update - Telegram update object
   * @param api - API instance
   * @param me - Bot user information
   */
  constructor(update: Update, api: Api, me: UserFromGetMe);

  /**
   * The Telegram update object
   */
  update: Update;

  /**
   * API instance for making calls
   */
  api: Api;

  /**
   * Bot user information
   */
  me: UserFromGetMe;

  /**
   * Match result from text/regex filters. Set by hears(), command(),
   * callbackQuery(), and other text-matching methods.
   */
  match: string | RegExpMatchArray | undefined;

  // Update shortcuts (getters)
  get message(): Update.MessageUpdate["message"] | undefined;
  get editedMessage(): Update.EditedMessageUpdate["edited_message"] | undefined;
  get channelPost(): Update.ChannelPostUpdate["channel_post"] | undefined;
  get editedChannelPost(): Update.EditedChannelPostUpdate["edited_channel_post"] | undefined;
  get businessConnection(): Update.BusinessConnectionUpdate["business_connection"] | undefined;
  get businessMessage(): Update.BusinessMessageUpdate["business_message"] | undefined;
  get editedBusinessMessage(): Update.EditedBusinessMessageUpdate["edited_business_message"] | undefined;
  get deletedBusinessMessages(): Update.DeletedBusinessMessagesUpdate["deleted_business_messages"] | undefined;
  get messageReaction(): Update.MessageReactionUpdate["message_reaction"] | undefined;
  get messageReactionCount(): Update.MessageReactionCountUpdate["message_reaction_count"] | undefined;
  get inlineQuery(): Update.InlineQueryUpdate["inline_query"] | undefined;
  get chosenInlineResult(): Update.ChosenInlineResultUpdate["chosen_inline_result"] | undefined;
  get callbackQuery(): Update.CallbackQueryUpdate["callback_query"] | undefined;
  get shippingQuery(): Update.ShippingQueryUpdate["shipping_query"] | undefined;
  get preCheckoutQuery(): Update.PreCheckoutQueryUpdate["pre_checkout_query"] | undefined;
  get poll(): Update.PollUpdate["poll"] | undefined;
  get pollAnswer(): Update.PollAnswerUpdate["poll_answer"] | undefined;
  get myChatMember(): Update.MyChatMemberUpdate["my_chat_member"] | undefined;
  get chatMember(): Update.ChatMemberUpdate["chat_member"] | undefined;
  get chatJoinRequest(): Update.ChatJoinRequestUpdate["chat_join_request"] | undefined;
  get chatBoost(): Update.ChatBoostUpdate["chat_boost"] | undefined;
  get removedChatBoost(): Update.RemovedChatBoostUpdate["removed_chat_boost"] | undefined;
  get purchasedPaidMedia(): Update.PurchasedPaidMediaUpdate["purchased_paid_media"] | undefined;

  // Aggregation shortcuts (getters)
  get msg(): Message | undefined;
  get chat(): Chat | undefined;
  get senderChat(): Chat | undefined;
  get from(): User | undefined;
  get msgId(): number | undefined;
  get chatId(): number | undefined;
  get inlineMessageId(): string | undefined;
  get businessConnectionId(): string | undefined;

  /**
   * Extract message entities of specific types
   * @param types - Entity types to extract (e.g., "mention", "url", "bot_command")
   * @returns Array of matching entities
   */
  entities(types?: MaybeArray<MessageEntity["type"]>): MessageEntity[];

  /**
   * Analyze message reaction changes
   * @returns Reaction information including emoji, old and new reactions
   */
  reactions(): ReactionInfo;

  /**
   * Type-safe filter query check
   * @param filter - Filter query or array of queries
   * @returns True if context matches filter
   */
  has<Q extends FilterQuery>(filter: Q | Q[]): this is Filter<C, Q>;

  /**
   * Check if message text matches string or regex
   * @param trigger - String or regex to match
   */
  hasText(trigger: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if message contains command
   * @param command - Command name(s) without leading slash
   */
  hasCommand(command: MaybeArray<StringWithCommandSuggestions>): boolean;

  /**
   * Check if reaction matches emoji
   * @param reaction - Emoji or array of emojis
   */
  hasReaction(reaction: MaybeArray<ReactionTypeEmoji["emoji"]>): boolean;

  /**
   * Check if chat type matches
   * @param chatType - Chat type(s) to check
   */
  hasChatType<T extends Chat["type"]>(chatType: MaybeArray<T>): boolean;

  /**
   * Check if callback query data matches
   * @param trigger - String or regex to match callback data
   */
  hasCallbackQuery(trigger: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if game query data matches
   * @param trigger - String or regex to match game short name
   */
  hasGameQuery(trigger: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if inline query matches
   * @param trigger - String or regex to match query text
   */
  hasInlineQuery(trigger: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if chosen inline result matches
   * @param resultId - Result ID or regex to match
   */
  hasChosenInlineResult(resultId: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if pre-checkout query payload matches
   * @param trigger - String or regex to match payload
   */
  hasPreCheckoutQuery(trigger: MaybeArray<string | RegExp>): boolean;

  /**
   * Check if shipping query payload matches
   * @param trigger - String or regex to match payload
   */
  hasShippingQuery(trigger: MaybeArray<string | RegExp>): boolean;
}
```

**Usage Examples:**

```typescript
// Update shortcuts
bot.on("message", (ctx) => {
  console.log("Message:", ctx.message);
  console.log("Chat ID:", ctx.chatId);
  console.log("User:", ctx.from);
});

// Entity extraction
bot.on("message:text", (ctx) => {
  const mentions = ctx.entities("mention");
  const urls = ctx.entities(["url", "text_link"]);
});

// Filter checking
bot.use((ctx) => {
  if (ctx.has("message:text")) {
    // TypeScript knows ctx.message.text exists
    console.log(ctx.message.text);
  }

  if (ctx.hasCommand("start")) {
    return ctx.reply("Welcome!");
  }
});

// Reaction handling
bot.on("message_reaction", (ctx) => {
  const { emoji, emojiAdded, emojiRemoved } = ctx.reactions();
  console.log("Added:", emojiAdded);
  console.log("Removed:", emojiRemoved);
});
```

### Context-Aware API Methods

Context provides shortcuts to API methods with chat_id and other parameters pre-filled from the update. Here are the most commonly used methods:

```typescript { .api }
/**
 * Send text message to current chat
 */
reply(
  text: string,
  other?: Other<"sendMessage", "chat_id" | "text">,
  signal?: AbortSignal
): Promise<Message.TextMessage>;

/**
 * Forward current message to another chat
 */
forwardMessage(
  chat_id: number | string,
  other?: Other<"forwardMessage", "chat_id" | "from_chat_id" | "message_id">,
  signal?: AbortSignal
): Promise<Message>;

/**
 * Copy current message to another chat
 */
copyMessage(
  chat_id: number | string,
  other?: Other<"copyMessage", "chat_id" | "from_chat_id" | "message_id">,
  signal?: AbortSignal
): Promise<MessageId>;

/**
 * Send photo to current chat
 */
replyWithPhoto(
  photo: InputFile | string,
  other?: Other<"sendPhoto", "chat_id" | "photo">,
  signal?: AbortSignal
): Promise<Message.PhotoMessage>;

/**
 * Send document to current chat
 */
replyWithDocument(
  document: InputFile | string,
  other?: Other<"sendDocument", "chat_id" | "document">,
  signal?: AbortSignal
): Promise<Message.DocumentMessage>;

/**
 * Edit current message text
 */
editMessageText(
  text: string,
  other?: Other<"editMessageText", "chat_id" | "message_id" | "inline_message_id" | "text">,
  signal?: AbortSignal
): Promise<Message.TextMessage | true>;

/**
 * Delete current message
 */
deleteMessage(signal?: AbortSignal): Promise<true>;

/**
 * Answer callback query (removes loading state)
 */
answerCallbackQuery(
  options?: Omit<Other<"answerCallbackQuery", "callback_query_id">, "callback_query_id">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Answer inline query with results
 */
answerInlineQuery(
  results: readonly InlineQueryResult[],
  other?: Other<"answerInlineQuery", "inline_query_id" | "results">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Ban user in current chat
 */
banChatMember(
  user_id: number,
  other?: Other<"banChatMember", "chat_id" | "user_id">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Restrict user in current chat
 */
restrictChatMember(
  user_id: number,
  permissions: ChatPermissions,
  other?: Other<"restrictChatMember", "chat_id" | "user_id" | "permissions">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Set reaction on current message
 */
setMessageReaction(
  reaction: readonly ReactionType[],
  other?: Other<"setMessageReaction", "chat_id" | "message_id" | "reaction">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Restrict author of current message
 */
restrictAuthor(
  permissions: ChatPermissions,
  other?: Other<"restrictChatMember", "chat_id" | "user_id" | "permissions">,
  signal?: AbortSignal
): Promise<true>;

/**
 * Ban author of current message
 */
banAuthor(
  other?: Other<"banChatMember", "chat_id" | "user_id">,
  signal?: AbortSignal
): Promise<true>;
```

**Usage Examples:**

```typescript
// Reply to messages
bot.on("message:text", (ctx) => {
  return ctx.reply("Got your message!");
});

// Send media
bot.command("photo", (ctx) => {
  return ctx.replyWithPhoto(new InputFile("/path/to/photo.jpg"), {
    caption: "Check this out!"
  });
});

// Handle callback queries
bot.on("callback_query:data", async (ctx) => {
  await ctx.answerCallbackQuery("Processing...");
  await ctx.editMessageText("Done!");
});

// Inline query results
bot.on("inline_query", (ctx) => {
  const results = [
    InlineQueryResultBuilder.article("1", "Result 1")
      .text("Hello from inline mode!")
  ];
  return ctx.answerInlineQuery(results);
});

// Moderation
bot.command("ban", async (ctx) => {
  const userId = ctx.message?.reply_to_message?.from?.id;
  if (userId) {
    await ctx.banChatMember(userId);
    await ctx.reply("User banned");
  }
});
```

### Static Context Helpers

```typescript { .api }
/**
 * Static object with filter predicate generators for use
 * outside of middleware (e.g., in filter() calls)
 */
Context.has: {
  filterQuery<Q extends FilterQuery>(query: Q | Q[]): (ctx: Context) => boolean;
  text(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  command(command: MaybeArray<StringWithCommandSuggestions>): (ctx: Context) => boolean;
  reaction(reaction: MaybeArray<ReactionTypeEmoji["emoji"]>): (ctx: Context) => boolean;
  chatType<T extends Chat["type"]>(chatType: MaybeArray<T>): (ctx: Context) => boolean;
  callbackQuery(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  gameQuery(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  inlineQuery(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  chosenInlineResult(resultId: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  preCheckoutQuery(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
  shippingQuery(trigger: MaybeArray<string | RegExp>): (ctx: Context) => boolean;
};
```

## Types

```typescript { .api }
interface UserFromGetMe {
  id: number;
  is_bot: true;
  first_name: string;
  username: string;
  can_join_groups: boolean;
  can_read_all_group_messages: boolean;
  supports_inline_queries: boolean;
}

interface ReactionInfo {
  emoji: ReactionTypeEmoji["emoji"][];
  emojiAdded: ReactionTypeEmoji["emoji"][];
  emojiRemoved: ReactionTypeEmoji["emoji"][];
}

type MaybeArray<T> = T | T[];
type MaybePromise<T> = T | Promise<T>;
```
