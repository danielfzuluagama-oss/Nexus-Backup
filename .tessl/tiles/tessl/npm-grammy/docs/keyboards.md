# Keyboards

Build custom reply keyboards and inline keyboards with fluent, chainable APIs supporting all Telegram keyboard button types.

## Capabilities

### Reply Keyboards

Custom keyboards that replace the user's keyboard with bot-defined buttons.

```typescript { .api }
/**
 * Builder for custom reply keyboards that appear in place of
 * the user's system keyboard
 */
class Keyboard {
  /**
   * Create keyboard builder
   * @param keyboard - Optional initial keyboard layout
   */
  constructor(keyboard?: KeyboardButton[][]);

  /**
   * 2D array of keyboard buttons
   */
  keyboard: KeyboardButton[][];

  /**
   * Keep keyboard visible after button press
   */
  is_persistent?: boolean;

  /**
   * Show keyboard only to specific users
   */
  selective?: boolean;

  /**
   * Hide keyboard after single use
   */
  one_time_keyboard?: boolean;

  /**
   * Automatically resize keyboard
   */
  resize_keyboard?: boolean;

  /**
   * Placeholder text in input field
   */
  input_field_placeholder?: string;

  /**
   * Add buttons to current row
   * @param buttons - Buttons to add
   * @returns This keyboard for chaining
   */
  add(...buttons: KeyboardButton[]): this;

  /**
   * Start new row with buttons
   * @param buttons - Buttons for new row
   * @returns This keyboard for chaining
   */
  row(...buttons: KeyboardButton[]): this;

  /**
   * Add text button to current row
   * @param text - Button text
   * @returns This keyboard for chaining
   */
  text(text: string): this;

  /**
   * Add request users button
   * @param text - Button text
   * @param requestId - Request identifier
   * @param options - Additional options
   * @returns This keyboard for chaining
   */
  requestUsers(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButton.RequestUsersButton, "text" | "request_users">
  ): this;

  /**
   * Add request chat button
   * @param text - Button text
   * @param requestId - Request identifier
   * @param options - Additional options
   * @returns This keyboard for chaining
   */
  requestChat(
    text: string,
    requestId: number,
    options?: Omit<KeyboardButton.RequestChatButton, "text" | "request_chat">
  ): this;

  /**
   * Add request contact button
   * @param text - Button text
   * @returns This keyboard for chaining
   */
  requestContact(text: string): this;

  /**
   * Add request location button
   * @param text - Button text
   * @returns This keyboard for chaining
   */
  requestLocation(text: string): this;

  /**
   * Add request poll button
   * @param text - Button text
   * @param type - Poll type (optional)
   * @returns This keyboard for chaining
   */
  requestPoll(text: string, type?: PollType): this;

  /**
   * Add web app button
   * @param text - Button text
   * @param url - Web app URL
   * @returns This keyboard for chaining
   */
  webApp(text: string, url: string): this;

  /**
   * Set persistent flag
   * @param isEnabled - Enable persistence (default: true)
   * @returns This keyboard for chaining
   */
  persistent(isEnabled?: boolean): this;

  /**
   * Set selective flag
   * @param isEnabled - Enable selective (default: true)
   * @returns This keyboard for chaining
   */
  selected(isEnabled?: boolean): this;

  /**
   * Set one-time flag
   * @param isEnabled - Enable one-time (default: true)
   * @returns This keyboard for chaining
   */
  oneTime(isEnabled?: boolean): this;

  /**
   * Set resize flag
   * @param isEnabled - Enable resize (default: true)
   * @returns This keyboard for chaining
   */
  resized(isEnabled?: boolean): this;

  /**
   * Set input field placeholder
   * @param value - Placeholder text
   * @returns This keyboard for chaining
   */
  placeholder(value: string): this;

  /**
   * Transpose keyboard (swap rows and columns)
   * @returns New transposed keyboard
   */
  toTransposed(): Keyboard;

  /**
   * Flow buttons into columns
   * @param columns - Number of columns
   * @param options - Flow options
   * @returns New flowed keyboard
   */
  toFlowed(
    columns: number,
    options?: { wrap?: (row: number, index: number) => boolean }
  ): Keyboard;

  /**
   * Clone keyboard
   * @param keyboard - Optional new keyboard layout
   * @returns Cloned keyboard
   */
  clone(keyboard?: KeyboardButton[][]): Keyboard;

  /**
   * Append other keyboards
   * @param sources - Keyboards to append
   * @returns This keyboard for chaining
   */
  append(...sources: KeyboardSource[]): this;

  /**
   * Build final keyboard array
   * @returns Keyboard button array
   */
  build(): KeyboardButton[][];

  // Static button factories
  static text(text: string): KeyboardButton.CommonButton;
  static requestUsers(text: string, requestId: number, options?: Omit<KeyboardButton.RequestUsersButton, "text" | "request_users">): KeyboardButton.RequestUsersButton;
  static requestChat(text: string, requestId: number, options?: Omit<KeyboardButton.RequestChatButton, "text" | "request_chat">): KeyboardButton.RequestChatButton;
  static requestContact(text: string): KeyboardButton.RequestContactButton;
  static requestLocation(text: string): KeyboardButton.RequestLocationButton;
  static requestPoll(text: string, type?: PollType): KeyboardButton.RequestPollButton;
  static webApp(text: string, url: string): KeyboardButton.WebAppButton;

  /**
   * Create keyboard from source
   * @param source - Keyboard source
   * @returns New keyboard
   */
  static from(source: KeyboardSource): Keyboard;
}
```

**Usage Examples:**

```typescript
import { Bot, Keyboard } from "grammy";

const bot = new Bot("TOKEN");

// Simple text buttons
const keyboard = new Keyboard()
  .text("Button 1").text("Button 2").row()
  .text("Button 3");

bot.command("start", (ctx) => {
  return ctx.reply("Choose an option:", {
    reply_markup: keyboard
  });
});

// Request contact and location
const contactKeyboard = new Keyboard()
  .requestContact("Share Contact")
  .requestLocation("Share Location")
  .oneTime();

bot.command("contact", (ctx) => {
  return ctx.reply("Please share your info:", {
    reply_markup: contactKeyboard
  });
});

// Web app buttons
const webAppKeyboard = new Keyboard()
  .webApp("Open App", "https://example.com/app");

// One-time keyboard with placeholder
const onceKeyboard = new Keyboard()
  .text("Yes").text("No")
  .oneTime()
  .resized()
  .placeholder("Choose yes or no");

// Using static methods
const buttons = [
  [Keyboard.text("A"), Keyboard.text("B")],
  [Keyboard.requestContact("Contact")]
];

// Flow into columns
const menuKeyboard = new Keyboard()
  .text("1").text("2").text("3")
  .text("4").text("5").text("6")
  .toFlowed(2); // 3 rows of 2 columns

// Remove keyboard
bot.command("remove", (ctx) => {
  return ctx.reply("Keyboard removed", {
    reply_markup: { remove_keyboard: true }
  });
});
```

### Inline Keyboards

Keyboards with buttons attached to messages that send callback queries or URLs.

```typescript { .api }
/**
 * Builder for inline keyboards attached to messages
 */
class InlineKeyboard {
  /**
   * Create inline keyboard builder
   * @param inline_keyboard - Optional initial button layout
   */
  constructor(inline_keyboard?: InlineKeyboardButton[][]);

  /**
   * 2D array of inline keyboard buttons
   */
  inline_keyboard: InlineKeyboardButton[][];

  /**
   * Add buttons to current row
   * @param buttons - Buttons to add
   * @returns This keyboard for chaining
   */
  add(...buttons: InlineKeyboardButton[]): this;

  /**
   * Start new row with buttons
   * @param buttons - Buttons for new row
   * @returns This keyboard for chaining
   */
  row(...buttons: InlineKeyboardButton[]): this;

  /**
   * Add URL button to current row
   * @param text - Button text
   * @param url - URL to open
   * @returns This keyboard for chaining
   */
  url(text: string, url: string): this;

  /**
   * Add callback button to current row
   * @param text - Button text
   * @param data - Callback data (default: text)
   * @returns This keyboard for chaining
   */
  text(text: string, data?: string): this;

  /**
   * Add web app button to current row
   * @param text - Button text
   * @param url - Web app URL or WebAppInfo
   * @returns This keyboard for chaining
   */
  webApp(text: string, url: string | WebAppInfo): this;

  /**
   * Add login button to current row
   * @param text - Button text
   * @param loginUrl - Login URL or LoginUrl config
   * @returns This keyboard for chaining
   */
  login(text: string, loginUrl: string | LoginUrl): this;

  /**
   * Add switch inline button (opens inline mode in any chat)
   * @param text - Button text
   * @param query - Inline query text (optional)
   * @returns This keyboard for chaining
   */
  switchInline(text: string, query?: string): this;

  /**
   * Add switch inline current button (opens inline mode in current chat)
   * @param text - Button text
   * @param query - Inline query text (optional)
   * @returns This keyboard for chaining
   */
  switchInlineCurrent(text: string, query?: string): this;

  /**
   * Add switch inline chosen button (opens inline mode with chat chooser)
   * @param text - Button text
   * @param query - SwitchInlineQueryChosenChat config (optional)
   * @returns This keyboard for chaining
   */
  switchInlineChosen(text: string, query?: SwitchInlineQueryChosenChat): this;

  /**
   * Add copy text button
   * @param text - Button text
   * @param copyText - Text to copy or CopyTextButton config
   * @returns This keyboard for chaining
   */
  copyText(text: string, copyText: string | CopyTextButton): this;

  /**
   * Add game button to current row
   * @param text - Button text
   * @returns This keyboard for chaining
   */
  game(text: string): this;

  /**
   * Add pay button to current row
   * @param text - Button text
   * @returns This keyboard for chaining
   */
  pay(text: string): this;

  /**
   * Transpose keyboard (swap rows and columns)
   * @returns New transposed keyboard
   */
  toTransposed(): InlineKeyboard;

  /**
   * Flow buttons into columns
   * @param columns - Number of columns
   * @param options - Flow options
   * @returns New flowed keyboard
   */
  toFlowed(
    columns: number,
    options?: { wrap?: (row: number, index: number) => boolean }
  ): InlineKeyboard;

  /**
   * Clone keyboard
   * @returns Cloned keyboard
   */
  clone(): InlineKeyboard;

  /**
   * Append other keyboards
   * @param sources - Keyboards to append
   * @returns This keyboard for chaining
   */
  append(...sources: InlineKeyboardSource[]): this;

  // Static button factories
  static url(text: string, url: string): InlineKeyboardButton.UrlButton;
  static text(text: string, data?: string): InlineKeyboardButton.CallbackButton;
  static webApp(text: string, url: string | WebAppInfo): InlineKeyboardButton.WebAppButton;
  static login(text: string, loginUrl: string | LoginUrl): InlineKeyboardButton.LoginButton;
  static switchInline(text: string, query?: string): InlineKeyboardButton.SwitchInlineButton;
  static switchInlineCurrent(text: string, query?: string): InlineKeyboardButton.SwitchInlineCurrentChatButton;
  static switchInlineChosen(text: string, query?: SwitchInlineQueryChosenChat): InlineKeyboardButton.SwitchInlineChosenChatButton;
  static copyText(text: string, copyText: string | CopyTextButton): InlineKeyboardButton.CopyTextButtonButton;
  static game(text: string): InlineKeyboardButton.GameButton;
  static pay(text: string): InlineKeyboardButton.PayButton;

  /**
   * Create keyboard from source
   * @param source - Keyboard source
   * @returns New inline keyboard
   */
  static from(source: InlineKeyboardSource): InlineKeyboard;
}
```

**Usage Examples:**

```typescript
import { Bot, InlineKeyboard } from "grammy";

const bot = new Bot("TOKEN");

// Callback buttons
const menu = new InlineKeyboard()
  .text("Button 1", "callback_1")
  .text("Button 2", "callback_2").row()
  .text("Button 3", "callback_3");

bot.command("menu", (ctx) => {
  return ctx.reply("Choose an option:", {
    reply_markup: menu
  });
});

// Handle callbacks
bot.callbackQuery("callback_1", (ctx) => {
  return ctx.answerCallbackQuery("You clicked button 1!");
});

// URL buttons
const links = new InlineKeyboard()
  .url("Visit Website", "https://example.com")
  .url("GitHub", "https://github.com");

// Mixed button types
const keyboard = new InlineKeyboard()
  .url("Website", "https://example.com").row()
  .text("Action 1", "action_1").text("Action 2", "action_2").row()
  .switchInline("Share", "Check this out!");

// Pagination
function getPaginationKeyboard(page: number, totalPages: number) {
  const keyboard = new InlineKeyboard();

  if (page > 1) {
    keyboard.text("◀️ Prev", `page_${page - 1}`);
  }

  keyboard.text(`${page}/${totalPages}`, "current");

  if (page < totalPages) {
    keyboard.text("Next ▶️", `page_${page + 1}`);
  }

  return keyboard;
}

bot.callbackQuery(/^page_(\d+)$/, (ctx) => {
  const page = parseInt(ctx.match[1]);
  return ctx.editMessageReplyMarkup({
    reply_markup: getPaginationKeyboard(page, 10)
  });
});

// Dynamic keyboard
bot.command("options", (ctx) => {
  const options = ["Option A", "Option B", "Option C"];
  const keyboard = new InlineKeyboard();

  options.forEach((option, i) => {
    keyboard.text(option, `option_${i}`);
    if (i < options.length - 1) keyboard.row();
  });

  return ctx.reply("Select an option:", {
    reply_markup: keyboard
  });
});

// Flow into columns
const numberKeyboard = new InlineKeyboard()
  .text("1", "1").text("2", "2").text("3", "3")
  .text("4", "4").text("5", "5").text("6", "6")
  .text("7", "7").text("8", "8").text("9", "9")
  .toFlowed(3); // 3x3 grid

// Payment button
const paymentKeyboard = new InlineKeyboard()
  .pay("Pay $9.99");

// Game button
const gameKeyboard = new InlineKeyboard()
  .game("Play Game");

// Using static methods
const staticKeyboard = new InlineKeyboard()
  .add(
    InlineKeyboard.url("Link", "https://example.com"),
    InlineKeyboard.text("Button", "data")
  );
```

## Types

```typescript { .api }
interface KeyboardButton {
  text: string;
  request_users?: KeyboardButtonRequestUsers;
  request_chat?: KeyboardButtonRequestChat;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
  web_app?: WebAppInfo;
}

namespace KeyboardButton {
  interface CommonButton {
    text: string;
  }

  interface RequestUsersButton {
    text: string;
    request_users: KeyboardButtonRequestUsers;
  }

  interface RequestChatButton {
    text: string;
    request_chat: KeyboardButtonRequestChat;
  }

  interface RequestContactButton {
    text: string;
    request_contact: true;
  }

  interface RequestLocationButton {
    text: string;
    request_location: true;
  }

  interface RequestPollButton {
    text: string;
    request_poll: KeyboardButtonPollType;
  }

  interface WebAppButton {
    text: string;
    web_app: WebAppInfo;
  }
}

interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  web_app?: WebAppInfo;
  login_url?: LoginUrl;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
  copy_text?: CopyTextButton;
  callback_game?: CallbackGame;
  pay?: boolean;
}

namespace InlineKeyboardButton {
  interface UrlButton {
    text: string;
    url: string;
  }

  interface CallbackButton {
    text: string;
    callback_data: string;
  }

  interface WebAppButton {
    text: string;
    web_app: WebAppInfo;
  }

  interface LoginButton {
    text: string;
    login_url: LoginUrl;
  }

  interface SwitchInlineButton {
    text: string;
    switch_inline_query: string;
  }

  interface SwitchInlineCurrentChatButton {
    text: string;
    switch_inline_query_current_chat: string;
  }

  interface SwitchInlineChosenChatButton {
    text: string;
    switch_inline_query_chosen_chat: SwitchInlineQueryChosenChat;
  }

  interface CopyTextButtonButton {
    text: string;
    copy_text: CopyTextButton;
  }

  interface GameButton {
    text: string;
    callback_game: CallbackGame;
  }

  interface PayButton {
    text: string;
    pay: true;
  }
}

type KeyboardSource = Keyboard | KeyboardButton[][];
type InlineKeyboardSource = InlineKeyboard | InlineKeyboardButton[][];

interface WebAppInfo {
  url: string;
}

interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}

interface SwitchInlineQueryChosenChat {
  query?: string;
  allow_user_chats?: boolean;
  allow_bot_chats?: boolean;
  allow_group_chats?: boolean;
  allow_channel_chats?: boolean;
}

interface CopyTextButton {
  text: string;
}

interface PollType {
  type?: "quiz" | "regular";
}
```
