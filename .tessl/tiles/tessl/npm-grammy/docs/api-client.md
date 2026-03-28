# API Client

Direct access to all Telegram Bot API methods with transformer support for customizing behavior.

## Capabilities

### Api Class

Full Telegram Bot API client with 100+ methods covering all Bot API functionality.

```typescript { .api }
/**
 * Telegram Bot API client providing all API methods
 */
class Api<R extends RawApi = RawApi> {
  /**
   * Create API client
   * @param token - Bot token
   * @param options - Client configuration
   * @param webhookReplyEnvelope - Optional webhook reply envelope
   */
  constructor(
    token: string,
    options?: ApiClientOptions,
    webhookReplyEnvelope?: WebhookReplyEnvelope
  );

  /**
   * Bot token (read-only)
   */
  readonly token: string;

  /**
   * Client options (read-only)
   */
  readonly options?: ApiClientOptions;

  /**
   * Raw API without transformers (read-only)
   */
  readonly raw: R;

  /**
   * Configuration object for API transformers
   */
  readonly config: {
    /**
     * Install API transformers
     * @param transformers - Transformer functions to install
     */
    use(...transformers: Transformer<R>[]): void;

    /**
     * Get installed transformers
     * @returns Array of installed transformers
     */
    installedTransformers(): Transformer<R>[];
  };

  // Update methods
  getUpdates(other?: Other<"getUpdates">, signal?: AbortSignal): Promise<Update[]>;
  setWebhook(url: string, other?: Other<"setWebhook", "url">, signal?: AbortSignal): Promise<true>;
  deleteWebhook(other?: Other<"deleteWebhook">, signal?: AbortSignal): Promise<true>;
  getWebhookInfo(signal?: AbortSignal): Promise<WebhookInfo>;

  // Bot methods
  getMe(signal?: AbortSignal): Promise<UserFromGetMe>;
  logOut(signal?: AbortSignal): Promise<true>;
  close(signal?: AbortSignal): Promise<true>;

  // Message methods
  sendMessage(chat_id: number | string, text: string, other?: Other<"sendMessage", "chat_id" | "text">, signal?: AbortSignal): Promise<Message.TextMessage>;
  forwardMessage(chat_id: number | string, from_chat_id: number | string, message_id: number, other?: Other<"forwardMessage", "chat_id" | "from_chat_id" | "message_id">, signal?: AbortSignal): Promise<Message>;
  forwardMessages(chat_id: number | string, from_chat_id: number | string, message_ids: number[], other?: Other<"forwardMessages", "chat_id" | "from_chat_id" | "message_ids">, signal?: AbortSignal): Promise<MessageId[]>;
  copyMessage(chat_id: number | string, from_chat_id: number | string, message_id: number, other?: Other<"copyMessage", "chat_id" | "from_chat_id" | "message_id">, signal?: AbortSignal): Promise<MessageId>;
  copyMessages(chat_id: number | string, from_chat_id: number | string, message_ids: number[], other?: Other<"copyMessages", "chat_id" | "from_chat_id" | "message_ids">, signal?: AbortSignal): Promise<MessageId[]>;
  deleteMessage(chat_id: number | string, message_id: number, signal?: AbortSignal): Promise<true>;
  deleteMessages(chat_id: number | string, message_ids: number[], signal?: AbortSignal): Promise<true>;

  // Media methods
  sendPhoto(chat_id: number | string, photo: InputFile | string, other?: Other<"sendPhoto", "chat_id" | "photo">, signal?: AbortSignal): Promise<Message.PhotoMessage>;
  sendAudio(chat_id: number | string, audio: InputFile | string, other?: Other<"sendAudio", "chat_id" | "audio">, signal?: AbortSignal): Promise<Message.AudioMessage>;
  sendDocument(chat_id: number | string, document: InputFile | string, other?: Other<"sendDocument", "chat_id" | "document">, signal?: AbortSignal): Promise<Message.DocumentMessage>;
  sendVideo(chat_id: number | string, video: InputFile | string, other?: Other<"sendVideo", "chat_id" | "video">, signal?: AbortSignal): Promise<Message.VideoMessage>;
  sendAnimation(chat_id: number | string, animation: InputFile | string, other?: Other<"sendAnimation", "chat_id" | "animation">, signal?: AbortSignal): Promise<Message.AnimationMessage>;
  sendVoice(chat_id: number | string, voice: InputFile | string, other?: Other<"sendVoice", "chat_id" | "voice">, signal?: AbortSignal): Promise<Message.VoiceMessage>;
  sendVideoNote(chat_id: number | string, video_note: InputFile | string, other?: Other<"sendVideoNote", "chat_id" | "video_note">, signal?: AbortSignal): Promise<Message.VideoNoteMessage>;
  sendPaidMedia(chat_id: number | string, star_count: number, media: InputPaidMedia[], other?: Other<"sendPaidMedia", "chat_id" | "star_count" | "media">, signal?: AbortSignal): Promise<Message.PaidMediaMessage>;
  sendMediaGroup(chat_id: number | string, media: InputMedia[], other?: Other<"sendMediaGroup", "chat_id" | "media">, signal?: AbortSignal): Promise<(Message.PhotoMessage | Message.VideoMessage | Message.AudioMessage | Message.DocumentMessage)[]>;
  sendLocation(chat_id: number | string, latitude: number, longitude: number, other?: Other<"sendLocation", "chat_id" | "latitude" | "longitude">, signal?: AbortSignal): Promise<Message.LocationMessage>;
  sendVenue(chat_id: number | string, latitude: number, longitude: number, title: string, address: string, other?: Other<"sendVenue", "chat_id" | "latitude" | "longitude" | "title" | "address">, signal?: AbortSignal): Promise<Message.VenueMessage>;
  sendContact(chat_id: number | string, phone_number: string, first_name: string, other?: Other<"sendContact", "chat_id" | "phone_number" | "first_name">, signal?: AbortSignal): Promise<Message.ContactMessage>;
  sendPoll(chat_id: number | string, question: string, options: readonly InputPollOption[], other?: Other<"sendPoll", "chat_id" | "question" | "options">, signal?: AbortSignal): Promise<Message.PollMessage>;
  sendDice(chat_id: number | string, emoji?: string, other?: Other<"sendDice", "chat_id">, signal?: AbortSignal): Promise<Message.DiceMessage>;
  sendChatAction(chat_id: number | string, action: string, other?: Other<"sendChatAction", "chat_id" | "action">, signal?: AbortSignal): Promise<true>;
  sendSticker(chat_id: number | string, sticker: InputFile | string, other?: Other<"sendSticker", "chat_id" | "sticker">, signal?: AbortSignal): Promise<Message.StickerMessage>;

  // Message editing methods
  editMessageText(text: string, other?: Other<"editMessageText", "text">, signal?: AbortSignal): Promise<Message.TextMessage | true>;
  editMessageCaption(caption?: string, other?: Other<"editMessageCaption">, signal?: AbortSignal): Promise<Message.CaptionableMessage | true>;
  editMessageMedia(media: InputMedia, other?: Other<"editMessageMedia", "media">, signal?: AbortSignal): Promise<Message.CommonMessage | true>;
  editMessageReplyMarkup(reply_markup?: InlineKeyboardMarkup, other?: Other<"editMessageReplyMarkup">, signal?: AbortSignal): Promise<Message.CommonMessage | true>;
  editMessageLiveLocation(latitude: number, longitude: number, other?: Other<"editMessageLiveLocation", "latitude" | "longitude">, signal?: AbortSignal): Promise<Message.LocationMessage | true>;
  stopMessageLiveLocation(other?: Other<"stopMessageLiveLocation">, signal?: AbortSignal): Promise<Message.LocationMessage | true>;
  stopPoll(chat_id: number | string, message_id: number, other?: Other<"stopPoll", "chat_id" | "message_id">, signal?: AbortSignal): Promise<Poll>;

  // And 80+ more methods covering:
  // - File operations (getUserProfilePhotos, getFile)
  // - Chat management (ban, unban, restrict, promote members)
  // - Chat settings (title, photo, description, permissions)
  // - Invite links (create, edit, revoke, approve/decline requests)
  // - Stickers (create sets, add/delete stickers)
  // - Inline queries (answerInlineQuery, answerWebAppQuery)
  // - Payments (sendInvoice, answerShippingQuery, answerPreCheckoutQuery, refundStarPayment)
  // - Games (sendGame, setGameScore, getGameHighScores)
  // - Forum topics (create, edit, close, delete)
  // - Bot commands (setMyCommands, getMyCommands, deleteMyCommands)
  // - Bot settings (setMyName, setMyDescription, setChatMenuButton)
  // - And more...
}
```

### API Client Options

```typescript { .api }
interface ApiClientOptions {
  /**
   * Custom API server URL
   * @default "https://api.telegram.org"
   */
  apiRoot?: string;

  /**
   * Custom URL builder function
   * @param root - API root URL
   * @param token - Bot token
   * @param method - API method name
   * @returns Full API endpoint URL
   */
  buildUrl?: (root: string, token: string, method: string) => string;

  /**
   * Request timeout in seconds
   * @default 500
   */
  timeoutSeconds?: number;

  /**
   * Base fetch configuration (merged with each request)
   */
  baseFetchConfig?: Omit<RequestInit, "method" | "headers">;

  /**
   * Function to determine if webhook replies can be used
   * @param method - API method name
   * @returns True if webhook reply is allowed
   * @default All methods except getUpdates
   */
  canUseWebhookReply?: (method: string) => boolean;

  /**
   * Hide sensitive data in logs
   * @default true
   */
  sensitiveLogs?: boolean;
}
```

**Usage Examples:**

```typescript
import { Api } from "grammy";

// Basic usage
const api = new Api("BOT_TOKEN");
await api.sendMessage(123456, "Hello!");

// With custom configuration
const api = new Api("BOT_TOKEN", {
  apiRoot: "https://custom-api.example.com",
  timeoutSeconds: 60,
  baseFetchConfig: {
    agent: customHttpAgent
  }
});

// Using raw API (bypasses transformers)
const api = new Api("BOT_TOKEN");
const result = await api.raw.sendMessage({
  chat_id: 123456,
  text: "Hello via raw API"
});
```

### API Transformers

Transformers intercept and modify API calls for custom behavior.

```typescript { .api }
/**
 * Transformer function that wraps API calls
 */
type Transformer<R extends RawApi> = (
  prev: ApiCallFn<R>,
  method: keyof R,
  payload: Payload,
  signal?: AbortSignal
) => ReturnType<ApiCallFn<R>>;

/**
 * API call function signature
 */
type ApiCallFn<R extends RawApi> = <M extends keyof R>(
  method: M,
  payload: Payload,
  signal?: AbortSignal
) => ReturnType<R[M]>;

/**
 * Method payload object
 */
type Payload = Record<string, unknown>;

/**
 * Raw API type without transformers
 */
type RawApi = Record<string, (...args: any[]) => Promise<any>>;
```

**Usage Examples:**

```typescript
import { Api } from "grammy";

const api = new Api("TOKEN");

// Logging transformer
api.config.use((prev, method, payload, signal) => {
  console.log(`Calling ${method}:`, payload);
  const start = Date.now();
  const result = prev(method, payload, signal);
  result.then(() => {
    console.log(`${method} completed in ${Date.now() - start}ms`);
  });
  return result;
});

// Rate limiting transformer
const rateLimiter = createRateLimiter(30, 1000); // 30 calls per second
api.config.use(async (prev, method, payload, signal) => {
  await rateLimiter.wait();
  return prev(method, payload, signal);
});

// Retry transformer
api.config.use(async (prev, method, payload, signal) => {
  let attempts = 0;
  while (attempts < 3) {
    try {
      return await prev(method, payload, signal);
    } catch (error) {
      if (attempts === 2 || !isRetryableError(error)) throw error;
      attempts++;
      await sleep(1000 * attempts);
    }
  }
  throw new Error("Max retries reached");
});
```

### InputFile Class

Class for uploading files to Telegram.

```typescript { .api }
/**
 * Represents a file to be uploaded
 */
class InputFile {
  /**
   * Create InputFile from various sources
   * @param file - File data (URL, path, Buffer, ReadableStream, or Blob)
   * @param filename - Optional filename
   */
  constructor(file: FileData, filename?: string);
}

type FileData =
  | string // URL or file path
  | Buffer
  | ReadableStream
  | Blob
  | Uint8Array;
```

**Usage Examples:**

```typescript
import { InputFile } from "grammy";
import { readFile } from "fs/promises";

// From file path
const file1 = new InputFile("/path/to/photo.jpg");
await bot.api.sendPhoto(chatId, file1);

// From URL
const file2 = new InputFile("https://example.com/photo.jpg");
await bot.api.sendPhoto(chatId, file2);

// From Buffer
const buffer = await readFile("/path/to/photo.jpg");
const file3 = new InputFile(buffer, "photo.jpg");
await bot.api.sendPhoto(chatId, file3);

// From ReadableStream
const stream = createReadStream("/path/to/video.mp4");
const file4 = new InputFile(stream, "video.mp4");
await bot.api.sendVideo(chatId, file4);
```

## Types

```typescript { .api }
/**
 * Transformable API interface
 */
type TransformableApi = {
  [M in keyof RawApi]: RawApi[M];
};

/**
 * Webhook reply envelope
 */
interface WebhookReplyEnvelope {
  method: string;
  payload: Record<string, unknown>;
}

/**
 * Helper type for "other" parameters (remaining optional fields)
 */
type Other<M extends string, K extends string = never> = Omit<Parameters<RawApi[M]>[0], K>;
```
