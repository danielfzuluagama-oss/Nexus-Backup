# grammY

grammY is a comprehensive Telegram Bot Framework for building bots in TypeScript and JavaScript. It provides an intuitive, middleware-based architecture with full type safety, supporting both Node.js (v12.20.0+) and Deno runtimes. The framework offers seamless integration with the complete Telegram Bot API, powerful filtering capabilities, and an extensive ecosystem of convenience helpers for keyboards, sessions, webhooks, and more.

## Package Information

- **Package Name**: grammy
- **Package Type**: npm
- **Language**: TypeScript
- **Installation**: `npm install grammy`
- **Deno**: `import { Bot } from "https://deno.land/x/grammy/mod.ts"`

## Core Imports

```typescript
import { Bot, Context, Composer, Api } from "grammy";
```

For CommonJS:

```javascript
const { Bot, Context, Composer, Api } = require("grammy");
```

## Basic Usage

```typescript
import { Bot } from "grammy";

// Create a bot instance
const bot = new Bot("YOUR_BOT_TOKEN");

// Register message handler
bot.on("message:text", (ctx) => {
  console.log("Received:", ctx.message.text);
  return ctx.reply("Echo: " + ctx.message.text);
});

// Start bot with long polling
bot.start();
```

## Architecture

grammY is built around several key components:

- **Bot Class**: Main bot orchestrator managing updates, middleware execution, and lifecycle
- **Context Object**: Wraps each update with convenient shortcuts to API methods and update data
- **Middleware System**: Flexible Composer-based middleware with powerful filtering and routing
- **Filter Queries**: Type-safe system with 300+ query patterns for filtering updates (e.g., `"message:text"`, `"callback_query:data"`)
- **API Client**: Full Telegram Bot API wrapper with transformer support and webhook reply optimization
- **Convenience Helpers**: Keyboard builders, session management, inline query results, webhook adapters
- **Error Handling**: Specialized error classes for API errors (GrammyError), network errors (HttpError), and middleware errors (BotError)

## Capabilities

### Bot Initialization and Configuration

Create and configure bot instances with flexible options including custom context constructors, API client settings, and pre-fetched bot information.

```typescript { .api }
class Bot<C extends Context = Context, A extends Api = Api> extends Composer<C> {
  constructor(token: string, config?: BotConfig<C>);

  init(signal?: AbortSignal): Promise<void>;
  isInited(): boolean;
  start(options?: PollingOptions): Promise<void>;
  stop(): Promise<void>;
  isRunning(): boolean;
  catch(errorHandler: ErrorHandler<C>): void;
  handleUpdate(update: Update, webhookReplyEnvelope?: WebhookReplyEnvelope): Promise<void>;

  readonly token: string;
  readonly api: A;
  botInfo: UserFromGetMe;
  errorHandler: ErrorHandler<C>;
}

interface BotConfig<C extends Context> {
  botInfo?: UserFromGetMe;
  ContextConstructor?: new (...args: ConstructorParameters<typeof Context>) => C;
  client?: ApiClientOptions;
}

interface PollingOptions {
  limit?: number;
  timeout?: number;
  allowed_updates?: readonly UpdateType[];
  drop_pending_updates?: boolean;
}

type ErrorHandler<C extends Context> = (error: BotError<C>) => void | Promise<void>;
```

[Bot and Context](./bot-context.md)

### Middleware System

Compose bot logic using middleware functions with powerful filtering, routing, and conditional execution. The Composer class provides methods for organizing handlers by update type, text patterns, commands, and custom predicates.

```typescript { .api }
class Composer<C extends Context = Context> {
  constructor(...middleware: Array<Middleware<C>>);

  middleware(): MiddlewareFn<C>;
  use(...middleware: Array<Middleware<C>>): Composer<C>;
  on<Q extends FilterQuery>(filter: Q | Q[], ...middleware: Array<Middleware<Filter<C, Q>>>): Composer<Filter<C, Q>>;
  hears(trigger: MaybeArray<string | RegExp>, ...middleware: Array<HearsMiddleware<C>>): Composer<HearsContext<C>>;
  command(command: MaybeArray<StringWithCommandSuggestions>, ...middleware: Array<CommandMiddleware<C>>): Composer<CommandContext<C>>;
  callbackQuery(trigger: MaybeArray<string | RegExp>, ...middleware: Array<CallbackQueryMiddleware<C>>): Composer<CallbackQueryContext<C>>;
  filter<D extends C>(predicate: (ctx: C) => ctx is D, ...middleware: Array<Middleware<D>>): Composer<D>;
  fork(...middleware: Array<Middleware<C>>): Composer<C>;
  lazy(middlewareFactory: (ctx: C) => MaybePromise<Middleware<C>>): Composer<C>;
  route<R extends Record<string, Middleware<C>>>(router: (ctx: C) => MaybePromise<keyof R>, routeHandlers: R, fallback?: Middleware<C>): Composer<C>;
  branch(predicate: (ctx: C) => MaybePromise<boolean>, trueMiddleware: Middleware<C>, falseMiddleware: Middleware<C>): Composer<C>;
  errorBoundary(errorHandler: (error: BotError<C>, next: NextFunction) => MaybePromise<void>, ...middleware: Array<Middleware<C>>): Composer<C>;
}

type Middleware<C extends Context> = MiddlewareFn<C> | MiddlewareObj<C>;
type MiddlewareFn<C extends Context> = (ctx: C, next: NextFunction) => MaybePromise<unknown>;
type NextFunction = () => Promise<void>;

interface MiddlewareObj<C extends Context> {
  middleware(): MiddlewareFn<C>;
}

// Context type aliases for specific update types
type PreCheckoutQueryContext<C extends Context> = Filter<C, "pre_checkout_query">;
type ShippingQueryContext<C extends Context> = Filter<C, "shipping_query">;
type ChosenInlineResultContext<C extends Context> = Filter<C, "chosen_inline_result">;

// Middleware type aliases
type ChosenInlineResultMiddleware<C extends Context> = Middleware<ChosenInlineResultContext<C>>;
type PreCheckoutQueryMiddleware<C extends Context> = Middleware<PreCheckoutQueryContext<C>>;
type ShippingQueryMiddleware<C extends Context> = Middleware<ShippingQueryContext<C>>;

// Filter matching utility
function matchFilter<C extends Context, Q extends FilterQuery>(filter: Q | Q[]): (ctx: C) => ctx is Filter<C, Q>;
```

[Middleware and Filters](./middleware.md)

### Keyboard Builders

Build custom reply keyboards and inline keyboards with a fluent, chainable API. Supports all Telegram keyboard button types including text, web apps, contact/location requests, and callback buttons.

```typescript { .api }
class Keyboard {
  constructor(keyboard?: KeyboardButton[][]);

  add(...buttons: KeyboardButton[]): this;
  row(...buttons: KeyboardButton[]): this;
  text(text: string): this;
  requestContact(text: string): this;
  requestLocation(text: string): this;
  requestUsers(text: string, requestId: number, options?: any): this;
  requestChat(text: string, requestId: number, options?: any): this;
  requestPoll(text: string, type?: string): this;
  webApp(text: string, url: string): this;
  build(): KeyboardButton[][];

  static text(text: string): KeyboardButton.CommonButton;
  static requestContact(text: string): KeyboardButton.RequestContactButton;
  static requestLocation(text: string): KeyboardButton.RequestLocationButton;
  static requestUsers(text: string, requestId: number, options?: any): KeyboardButton.RequestUsersButton;
  static requestChat(text: string, requestId: number, options?: any): KeyboardButton.RequestChatButton;
  static requestPoll(text: string, type?: string): KeyboardButton.RequestPollButton;
  static webApp(text: string, url: string): KeyboardButton.WebAppButton;
}

class InlineKeyboard {
  constructor(inline_keyboard?: InlineKeyboardButton[][]);

  add(...buttons: InlineKeyboardButton[]): this;
  row(...buttons: InlineKeyboardButton[]): this;
  url(text: string, url: string): this;
  text(text: string, data?: string): this;
  webApp(text: string, url: string | WebAppInfo): this;
  switchInline(text: string, query?: string): this;
  switchInlineChosen(text: string, query?: any): this;
  game(text: string): this;
  pay(text: string): this;

  static url(text: string, url: string): InlineKeyboardButton.UrlButton;
  static text(text: string, data?: string): InlineKeyboardButton.CallbackButton;
  static webApp(text: string, url: string | WebAppInfo): InlineKeyboardButton.WebAppButton;
  static switchInlineChosen(text: string, query?: any): InlineKeyboardButton.SwitchInlineChosenChatButton;
  static game(text: string): InlineKeyboardButton.GameButton;
  static pay(text: string): InlineKeyboardButton.PayButton;
}
```

[Keyboards](./keyboards.md)

### Session Management

Add stateful session data to your bot with flexible storage backends. Supports both eager and lazy loading strategies, multi-session scenarios, and custom storage adapters.

```typescript { .api }
function session<S, C extends Context = Context>(
  options?: SessionOptions<S, C>
): MiddlewareFn<C & SessionFlavor<S>>;

function lazySession<S, C extends Context = Context>(
  options?: SessionOptions<S, C>
): MiddlewareFn<C & LazySessionFlavor<S>>;

interface SessionOptions<S, C extends Context> {
  initial?: () => S;
  storage?: StorageAdapter<S>;
  getSessionKey?: (ctx: C) => MaybePromise<string | undefined>;
}

interface StorageAdapter<T> {
  read(key: string): MaybePromise<T | undefined>;
  write(key: string, value: T): MaybePromise<void>;
  delete(key: string): MaybePromise<void>;
}

class MemorySessionStorage<S> implements StorageAdapter<S> {
  constructor(timeToLive?: number);
  read(key: string): S | undefined;
  write(key: string, value: S): void;
  delete(key: string): void;
}

interface SessionFlavor<S> {
  session: S;
}

interface LazySessionFlavor<S> {
  session: S;
}

// Storage enhancement for versioning and migrations
function enhanceStorage<T>(options: MigrationOptions<T>): StorageAdapter<T>;

interface MigrationOptions<T> {
  storage: StorageAdapter<Enhance<T>>;
  migrations?: Migrations;
  millisecondsToLive?: number;
}

interface Migrations {
  [version: number]: (old: any) => any;
}

interface Enhance<T> {
  v?: number;
  __d: T;
  __e?: number;
}
```

[Sessions](./sessions.md)

### Inline Query Handling

Build inline query results with type-safe builders for all result types including articles, photos, videos, locations, and more. Each result type supports chainable methods for adding message content.

```typescript { .api }
const InlineQueryResultBuilder: {
  article(id: string, title: string, options?: Omit<InlineQueryResultArticle, "type" | "id" | "title" | "input_message_content">): InlineQueryResult;
  photo(id: string, photo_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultPhoto, "type" | "id" | "photo_url" | "thumbnail_url">): InlineQueryResult;
  video(id: string, title: string, video_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultVideo, "type" | "id" | "title" | "video_url" | "thumbnail_url">): InlineQueryResult;
  location(id: string, title: string, latitude: number, longitude: number, options?: Omit<InlineQueryResultLocation, "type" | "id" | "title" | "latitude" | "longitude">): InlineQueryResult;
  // ... and 20+ more result types
};
```

[Inline Queries](./inline-queries.md)

### Webhook Integration

Integrate grammY with web frameworks using webhook handlers. Supports secret token validation and customizable timeout handling.

```typescript { .api }
function webhookCallback<C extends Context>(
  bot: Bot<C>,
  adapter: FrameworkAdapter,
  onTimeout?: "throw" | "return" | ((...args: any[]) => unknown),
  timeoutMilliseconds?: number,
  secretToken?: string
): Function;

interface WebhookOptions {
  onTimeout?: "throw" | "return" | ((...args: any[]) => unknown);
  timeoutMilliseconds?: number;
  secretToken?: string;
}
```

[Webhooks](./webhooks.md)

### API Client

Direct access to all Telegram Bot API methods with optional transformers for customizing API behavior. Supports webhook reply optimization and custom API servers.

```typescript { .api }
class Api<R extends RawApi = RawApi> {
  constructor(token: string, options?: ApiClientOptions, webhookReplyEnvelope?: WebhookReplyEnvelope);

  readonly token: string;
  readonly raw: R;
  readonly config: {
    use(...transformers: Transformer<R>[]): void;
    installedTransformers(): Transformer<R>[];
  };

  // Message operations
  sendMessage(chat_id: number | string, text: string, other?: Other<"sendMessage", "chat_id" | "text">, signal?: AbortSignal): Promise<Message.TextMessage>;
  forwardMessage(chat_id: number | string, from_chat_id: number | string, message_id: number, other?: Other<"forwardMessage", "chat_id" | "from_chat_id" | "message_id">, signal?: AbortSignal): Promise<Message>;
  deleteMessage(chat_id: number | string, message_id: number, signal?: AbortSignal): Promise<true>;

  // Media operations
  sendPhoto(chat_id: number | string, photo: InputFile | string, other?: Other<"sendPhoto", "chat_id" | "photo">, signal?: AbortSignal): Promise<Message.PhotoMessage>;
  sendVideo(chat_id: number | string, video: InputFile | string, other?: Other<"sendVideo", "chat_id" | "video">, signal?: AbortSignal): Promise<Message.VideoMessage>;
  sendDocument(chat_id: number | string, document: InputFile | string, other?: Other<"sendDocument", "chat_id" | "document">, signal?: AbortSignal): Promise<Message.DocumentMessage>;

  // ... 100+ more API methods
}

interface ApiClientOptions {
  apiRoot?: string;
  buildUrl?: (root: string, token: string, method: string) => string;
  timeoutSeconds?: number;
  baseFetchConfig?: Omit<RequestInit, "method" | "headers">;
  canUseWebhookReply?: (method: string) => boolean;
}

class InputFile {
  constructor(file: FileData, filename?: string);
}
```

[API Client](./api-client.md)

### Error Handling

Handle errors with specialized error classes that distinguish between API errors, network failures, and middleware execution errors.

```typescript { .api }
class BotError<C extends Context> extends Error {
  constructor(error: unknown, ctx: C);
  error: unknown;
  ctx: C;
}

class GrammyError extends Error {
  constructor(message: string, err: ApiError, method: string, payload: Record<string, unknown>);
  ok: false;
  error_code: number;
  description: string;
  parameters: ResponseParameters;
  method: string;
  payload: Record<string, unknown>;
}

class HttpError extends Error {
  constructor(message: string, error: unknown);
  error: unknown;
}
```

[Error Handling](./errors.md)

### Constants and Utilities

Constants for update types and chat permissions, plus utility functions for input media building.

```typescript { .api }
const API_CONSTANTS: {
  readonly DEFAULT_UPDATE_TYPES: readonly UpdateType[];
  readonly ALL_UPDATE_TYPES: readonly UpdateType[];
  readonly ALL_CHAT_PERMISSIONS: Readonly<ChatPermissions>;
};

const InputMediaBuilder: {
  photo(media: string | InputFile, options?: Omit<InputMediaPhoto, "type" | "media">): InputMediaPhoto;
  video(media: string | InputFile, options?: Omit<InputMediaVideo, "type" | "media">): InputMediaVideo;
  animation(media: string | InputFile, options?: Omit<InputMediaAnimation, "type" | "media">): InputMediaAnimation;
  audio(media: string | InputFile, options?: Omit<InputMediaAudio, "type" | "media">): InputMediaAudio;
  document(media: string | InputFile, options?: Omit<InputMediaDocument, "type" | "media">): InputMediaDocument;
};
```

## Types

All Telegram Bot API types are re-exported from `@grammyjs/types`:

```typescript { .api }
// Update types
type Update = Update.MessageUpdate | Update.EditedMessageUpdate | Update.ChannelPostUpdate |
              Update.EditedChannelPostUpdate | Update.InlineQueryUpdate | Update.ChosenInlineResultUpdate |
              Update.CallbackQueryUpdate | Update.ShippingQueryUpdate | Update.PreCheckoutQueryUpdate |
              Update.PollUpdate | Update.PollAnswerUpdate | Update.MyChatMemberUpdate |
              Update.ChatMemberUpdate | Update.ChatJoinRequestUpdate | Update.MessageReactionUpdate |
              Update.MessageReactionCountUpdate | Update.ChatBoostUpdate | Update.RemovedChatBoostUpdate;

// Message types
interface Message {
  message_id: number;
  from?: User;
  sender_chat?: Chat;
  date: number;
  chat: Chat;
  // ... and many more fields
}

// User and Chat types
interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface Chat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

// Keyboard types
interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  is_persistent?: boolean;
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  input_field_placeholder?: string;
  selective?: boolean;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

// And 200+ more types covering the complete Bot API
```

## Common Utility Types

```typescript { .api }
type MaybePromise<T> = T | Promise<T>;
type MaybeArray<T> = T | T[];
type StringWithCommandSuggestions = string | "start" | "help" | "settings";

// Update type discriminator keys
type UpdateType = Exclude<keyof Update, "update_id">;

// Helper type for API method optional parameters
type Other<R extends RawApi, M extends Methods<R>, X extends string = never> = Omit<Payload<M, R>, X>;
```
