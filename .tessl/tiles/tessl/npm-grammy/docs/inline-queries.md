# Inline Queries

Build inline query results with type-safe builders for articles, media, locations, and more.

## Capabilities

### Inline Query Result Builder

Static methods for creating all inline query result types.

```typescript { .api }
/**
 * Builder object with static methods for creating inline query results
 */
const InlineQueryResultBuilder: {
  // Article results
  article(id: string, title: string, options?: Omit<InlineQueryResultArticle, "type" | "id" | "title" | "input_message_content">): InlineQueryResultWithMessageContent;

  // Media results
  photo(id: string, photo_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultPhoto, "type" | "id" | "photo_url" | "thumbnail_url">): InlineQueryResultWithMessageContent;
  video(id: string, title: string, video_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultVideo, "type" | "id" | "title" | "video_url" | "thumbnail_url">): InlineQueryResultWithMessageContent;
  videoHtml(id: string, title: string, video_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultVideo, "type" | "id" | "title" | "video_url" | "thumbnail_url" | "mime_type">): InlineQueryResultWithMessageContent;
  videoMp4(id: string, title: string, video_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultVideo, "type" | "id" | "title" | "video_url" | "thumbnail_url" | "mime_type">): InlineQueryResultWithMessageContent;
  audio(id: string, title: string, audio_url: string, options?: Omit<InlineQueryResultAudio, "type" | "id" | "title" | "audio_url">): InlineQueryResultWithMessageContent;
  gif(id: string, gif_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultGif, "type" | "id" | "gif_url" | "thumbnail_url">): InlineQueryResultWithMessageContent;
  mpeg4gif(id: string, mpeg4_url: string, thumbnail_url: string, options?: Omit<InlineQueryResultMpeg4Gif, "type" | "id" | "mpeg4_url" | "thumbnail_url">): InlineQueryResultWithMessageContent;

  // Cached media results
  photoCached(id: string, photo_file_id: string, options?: Omit<InlineQueryResultCachedPhoto, "type" | "id" | "photo_file_id">): InlineQueryResultWithMessageContent;
  videoCached(id: string, title: string, video_file_id: string, options?: Omit<InlineQueryResultCachedVideo, "type" | "id" | "title" | "video_file_id">): InlineQueryResultWithMessageContent;
  audioCached(id: string, audio_file_id: string, options?: Omit<InlineQueryResultCachedAudio, "type" | "id" | "audio_file_id">): InlineQueryResultWithMessageContent;
  gifCached(id: string, gif_file_id: string, options?: Omit<InlineQueryResultCachedGif, "type" | "id" | "gif_file_id">): InlineQueryResultWithMessageContent;
  mpeg4gifCached(id: string, mpeg4_file_id: string, options?: Omit<InlineQueryResultCachedMpeg4Gif, "type" | "id" | "mpeg4_file_id">): InlineQueryResultWithMessageContent;
  voiceCached(id: string, title: string, voice_file_id: string, options?: Omit<InlineQueryResultCachedVoice, "type" | "id" | "title" | "voice_file_id">): InlineQueryResultWithMessageContent;
  documentCached(id: string, title: string, document_file_id: string, options?: Omit<InlineQueryResultCachedDocument, "type" | "id" | "title" | "document_file_id">): InlineQueryResultWithMessageContent;
  stickerCached(id: string, sticker_file_id: string, options?: Omit<InlineQueryResultCachedSticker, "type" | "id" | "sticker_file_id">): InlineQueryResultWithReplyMarkup;

  // Document results
  documentPdf(id: string, title: string, document_url: string, options?: Omit<InlineQueryResultDocument, "type" | "id" | "title" | "document_url" | "mime_type">): InlineQueryResultWithMessageContent;
  documentZip(id: string, title: string, document_url: string, options?: Omit<InlineQueryResultDocument, "type" | "id" | "title" | "document_url" | "mime_type">): InlineQueryResultWithMessageContent;
  voice(id: string, title: string, voice_url: string, options?: Omit<InlineQueryResultVoice, "type" | "id" | "title" | "voice_url">): InlineQueryResultWithMessageContent;

  // Location and venue results
  location(id: string, title: string, latitude: number, longitude: number, options?: Omit<InlineQueryResultLocation, "type" | "id" | "title" | "latitude" | "longitude">): InlineQueryResultWithMessageContent;
  venue(id: string, title: string, latitude: number, longitude: number, address: string, options?: Omit<InlineQueryResultVenue, "type" | "id" | "title" | "latitude" | "longitude" | "address">): InlineQueryResultWithMessageContent;

  // Contact and game results
  contact(id: string, phone_number: string, first_name: string, options?: Omit<InlineQueryResultContact, "type" | "id" | "phone_number" | "first_name">): InlineQueryResultWithMessageContent;
  game(id: string, game_short_name: string, options?: Omit<InlineQueryResultGame, "type" | "id" | "game_short_name">): InlineQueryResultWithReplyMarkup;
};
```

Each result builder method returns an object with optional chainable methods for adding message content:

```typescript { .api }
/**
 * Chainable methods for results supporting message content
 */
interface InlineQueryResultWithMessageContent {
  /**
   * Add text message content
   * @param message_text - Text content
   * @param options - Additional text message options
   */
  text(message_text: string, options?: Omit<InputTextMessageContent, "message_text">): InlineQueryResult;

  /**
   * Add location message content
   * @param latitude - Latitude
   * @param longitude - Longitude
   * @param options - Additional location options
   */
  location(latitude: number, longitude: number, options?: Omit<InputLocationMessageContent, "latitude" | "longitude">): InlineQueryResult;

  /**
   * Add venue message content
   * @param title - Venue name
   * @param latitude - Latitude
   * @param longitude - Longitude
   * @param address - Venue address
   * @param options - Additional venue options
   */
  venue(title: string, latitude: number, longitude: number, address: string, options?: Omit<InputVenueMessageContent, "title" | "latitude" | "longitude" | "address">): InlineQueryResult;

  /**
   * Add contact message content
   * @param first_name - Contact first name
   * @param phone_number - Contact phone number
   * @param options - Additional contact options
   */
  contact(first_name: string, phone_number: string, options?: Omit<InputContactMessageContent, "first_name" | "phone_number">): InlineQueryResult;

  /**
   * Add invoice message content
   * @param title - Product name
   * @param description - Product description
   * @param payload - Bot-defined invoice payload
   * @param provider_token - Payment provider token
   * @param currency - Three-letter ISO 4217 currency code
   * @param prices - Price breakdown
   * @param options - Additional invoice options
   */
  invoice(title: string, description: string, payload: string, provider_token: string, currency: string, prices: LabeledPrice[], options?: Omit<InputInvoiceMessageContent, "title" | "description" | "payload" | "provider_token" | "currency" | "prices">): InlineQueryResult;
}

/**
 * Results that only support reply markup
 */
interface InlineQueryResultWithReplyMarkup {
  // No additional methods, returns InlineQueryResult directly
}
```

**Usage Examples:**

```typescript
import { Bot, InlineQueryResultBuilder } from "grammy";

const bot = new Bot("TOKEN");

// Handle inline queries
bot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query;

  // Article results
  const results = [
    InlineQueryResultBuilder
      .article("1", "First Result")
      .text(`You searched for: ${query}`, { parse_mode: "Markdown" }),

    InlineQueryResultBuilder
      .article("2", "Second Result")
      .text("*Bold text*", { parse_mode: "Markdown" })
  ];

  await ctx.answerInlineQuery(results);
});

// Photo results
bot.on("inline_query", async (ctx) => {
  const results = [
    InlineQueryResultBuilder.photo(
      "photo1",
      "https://example.com/photo.jpg",
      "https://example.com/thumb.jpg",
      { caption: "A nice photo" }
    )
  ];

  await ctx.answerInlineQuery(results);
});

// Video results
bot.on("inline_query", async (ctx) => {
  const results = [
    InlineQueryResultBuilder.videoMp4(
      "video1",
      "Video Title",
      "https://example.com/video.mp4",
      "https://example.com/thumb.jpg"
    ).text("Video description", { parse_mode: "HTML" })
  ];

  await ctx.answerInlineQuery(results);
});

// Location results
bot.on("inline_query", async (ctx) => {
  const results = [
    InlineQueryResultBuilder.location(
      "loc1",
      "Central Park",
      40.785091,
      -73.968285,
      { live_period: 3600 }
    )
  ];

  await ctx.answerInlineQuery(results);
});

// Cached file results
bot.on("inline_query", async (ctx) => {
  const results = [
    InlineQueryResultBuilder.photoCached(
      "cached1",
      "AgACAgIAAxkBAAI...", // file_id
      { caption: "Cached photo" }
    ),

    InlineQueryResultBuilder.stickerCached(
      "sticker1",
      "CAACAgIAAxkBAAI..." // file_id
    )
  ];

  await ctx.answerInlineQuery(results);
});

// Contact results
bot.on("inline_query", async (ctx) => {
  const results = [
    InlineQueryResultBuilder.contact(
      "contact1",
      "+1234567890",
      "John Doe",
      { last_name: "Smith" }
    )
  ];

  await ctx.answerInlineQuery(results);
});

// Mixed results with inline keyboards
import { InlineKeyboard } from "grammy";

bot.on("inline_query", async (ctx) => {
  const keyboard = new InlineKeyboard()
    .url("Visit", "https://example.com");

  const results = [
    InlineQueryResultBuilder
      .article("1", "Article with Button")
      .text("Click the button!", {
        reply_markup: keyboard
      })
  ];

  await ctx.answerInlineQuery(results, {
    cache_time: 300,
    is_personal: true
  });
});

// Search-based results
bot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query.toLowerCase();
  const allResults = getSearchResults(query);

  const results = allResults.slice(0, 50).map((item, i) =>
    InlineQueryResultBuilder
      .article(item.id, item.title)
      .text(item.content, { parse_mode: "Markdown" })
  );

  await ctx.answerInlineQuery(results);
});
```

## Types

```typescript { .api }
type InlineQueryResult =
  | InlineQueryResultArticle
  | InlineQueryResultPhoto
  | InlineQueryResultGif
  | InlineQueryResultMpeg4Gif
  | InlineQueryResultVideo
  | InlineQueryResultAudio
  | InlineQueryResultVoice
  | InlineQueryResultDocument
  | InlineQueryResultLocation
  | InlineQueryResultVenue
  | InlineQueryResultContact
  | InlineQueryResultGame
  | InlineQueryResultCachedPhoto
  | InlineQueryResultCachedGif
  | InlineQueryResultCachedMpeg4Gif
  | InlineQueryResultCachedSticker
  | InlineQueryResultCachedDocument
  | InlineQueryResultCachedVideo
  | InlineQueryResultCachedVoice
  | InlineQueryResultCachedAudio;

interface InputTextMessageContent {
  message_text: string;
  parse_mode?: "Markdown" | "MarkdownV2" | "HTML";
  entities?: MessageEntity[];
  link_preview_options?: LinkPreviewOptions;
}

interface InputLocationMessageContent {
  latitude: number;
  longitude: number;
  horizontal_accuracy?: number;
  live_period?: number;
  heading?: number;
  proximity_alert_radius?: number;
}

interface InputVenueMessageContent {
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type?: string;
  google_place_id?: string;
  google_place_type?: string;
}

interface InputContactMessageContent {
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard?: string;
}

interface InputInvoiceMessageContent {
  title: string;
  description: string;
  payload: string;
  provider_token: string;
  currency: string;
  prices: LabeledPrice[];
  // ... and many more payment options
}

interface LabeledPrice {
  label: string;
  amount: number;
}
```
