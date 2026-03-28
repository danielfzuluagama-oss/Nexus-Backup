# Sessions

Add stateful session data to bot contexts with flexible storage backends supporting eager and lazy loading strategies.

## Capabilities

### Session Middleware

Standard session middleware that loads session data for every update.

```typescript { .api }
/**
 * Session middleware that adds session property to context
 * @param options - Session configuration
 * @returns Middleware adding SessionFlavor to context
 */
function session<S, C extends Context = Context>(
  options?: SessionOptions<S, C>
): MiddlewareFn<C & SessionFlavor<S>>;

interface SessionOptions<S, C extends Context> {
  /**
   * Session type (for multi-session support)
   * @default "single"
   */
  type?: "single";

  /**
   * Factory function for initial session data
   */
  initial?: () => S;

  /**
   * Storage adapter for persisting sessions
   * @default MemorySessionStorage
   */
  storage?: StorageAdapter<S>;

  /**
   * Optional prefix to prepend to session keys
   */
  prefix?: string;

  /**
   * Function to compute session key from context
   * @default Uses chat ID for private chats, chat ID + user ID for groups
   */
  getSessionKey?: (ctx: C) => MaybePromise<string | undefined>;
}

interface SessionFlavor<S> {
  /**
   * Session data (loaded eagerly)
   */
  session: S;
}
```

**Usage Examples:**

```typescript
import { Bot, session } from "grammy";

// Simple session with default storage
interface SessionData {
  messageCount: number;
}

const bot = new Bot<Context & SessionFlavor<SessionData>>("TOKEN");

bot.use(session({
  initial: () => ({ messageCount: 0 })
}));

bot.on("message", (ctx) => {
  ctx.session.messageCount++;
  return ctx.reply(`You sent ${ctx.session.messageCount} messages`);
});

// With custom storage
import { StorageAdapter } from "grammy";

class DatabaseStorage implements StorageAdapter<SessionData> {
  async read(key: string) {
    return await db.getSess ion(key);
  }

  async write(key: string, value: SessionData) {
    await db.saveSession(key, value);
  }

  async delete(key: string) {
    await db.deleteSession(key);
  }
}

bot.use(session({
  initial: () => ({ messageCount: 0 }),
  storage: new DatabaseStorage()
}));

// Custom session key
bot.use(session({
  initial: () => ({ messageCount: 0 }),
  getSessionKey: (ctx) => {
    // Use business connection ID for business messages
    return ctx.businessConnectionId ?? ctx.chat?.id.toString();
  }
}));
```

### Lazy Session Middleware

Lazy session middleware that loads session data only when accessed.

```typescript { .api }
/**
 * Lazy session middleware that loads session on first access
 * @param options - Session configuration
 * @returns Middleware adding LazySessionFlavor to context
 */
function lazySession<S, C extends Context = Context>(
  options?: SessionOptions<S, C>
): MiddlewareFn<C & LazySessionFlavor<S>>;

interface LazySessionFlavor<S> {
  /**
   * Session data (loaded lazily on first access)
   */
  session: S;
}
```

**Usage Examples:**

```typescript
import { Bot, lazySession } from "grammy";

interface SessionData {
  messageCount: number;
  settings: UserSettings;
}

const bot = new Bot<Context & LazySessionFlavor<SessionData>>("TOKEN");

bot.use(lazySession({
  initial: () => ({ messageCount: 0, settings: {} }),
  storage: new DatabaseStorage()
}));

// Session only loaded if accessed
bot.command("start", (ctx) => {
  // No session access - no database query
  return ctx.reply("Welcome!");
});

bot.command("count", async (ctx) => {
  // Session loaded here on first access
  const count = ctx.session.messageCount++;
  return ctx.reply(`Count: ${count}`);
});
```

### Storage Adapters

Interface for implementing custom storage backends.

```typescript { .api }
/**
 * Storage adapter interface for session persistence
 */
interface StorageAdapter<T> {
  /**
   * Read session data by key
   * @param key - Session key
   * @returns Session data or undefined if not found
   */
  read(key: string): MaybePromise<T | undefined>;

  /**
   * Write session data
   * @param key - Session key
   * @param value - Session data to store
   */
  write(key: string, value: T): MaybePromise<void>;

  /**
   * Delete session data
   * @param key - Session key
   */
  delete(key: string): MaybePromise<void>;

  /**
   * Check if session exists (optional)
   * @param key - Session key
   * @returns True if session exists
   */
  has?(key: string): MaybePromise<boolean>;

  /**
   * Read all session keys (optional, for iteration)
   * @returns Iterable of session keys
   */
  readAllKeys?(): Iterable<string> | AsyncIterable<string>;

  /**
   * Read all session values (optional, for iteration)
   * @returns Iterable of session values
   */
  readAllValues?(): Iterable<T> | AsyncIterable<T>;

  /**
   * Read all session entries (optional, for iteration)
   * @returns Iterable of [key, value] pairs
   */
  readAllEntries?(): Iterable<[string, T]> | AsyncIterable<[string, T]>;
}
```

### Memory Storage

Built-in in-memory storage adapter with optional TTL.

```typescript { .api }
/**
 * In-memory session storage with optional time-to-live
 */
class MemorySessionStorage<S> implements StorageAdapter<S> {
  /**
   * Create memory storage
   * @param timeToLive - Optional TTL in milliseconds
   */
  constructor(timeToLive?: number);

  /**
   * Read session data
   * @param key - Session key
   * @returns Session data or undefined
   */
  read(key: string): S | undefined;

  /**
   * Write session data
   * @param key - Session key
   * @param value - Session data
   */
  write(key: string, value: S): void;

  /**
   * Delete session data
   * @param key - Session key
   */
  delete(key: string): void;

  /**
   * Check if session exists
   * @param key - Session key
   * @returns True if exists
   */
  has(key: string): boolean;

  /**
   * Read all session keys
   * @returns Array of keys
   */
  readAllKeys(): string[];

  /**
   * Read all session values
   * @returns Array of values
   */
  readAllValues(): S[];

  /**
   * Read all session entries
   * @returns Array of [key, value] pairs
   */
  readAllEntries(): [string, S][];
}
```

**Usage Examples:**

```typescript
import { MemorySessionStorage } from "grammy";

// With 1 hour TTL
const storage = new MemorySessionStorage<SessionData>(60 * 60 * 1000);

bot.use(session({
  initial: () => ({ messageCount: 0 }),
  storage
}));

// Iterate sessions
for (const [key, data] of storage.readAllEntries()) {
  console.log(`Session ${key}:`, data);
}
```

### Storage Enhancement

Enhance storage adapters with versioning and migrations.

```typescript { .api }
/**
 * Wrap storage adapter with versioning and migration support
 * @param options - Enhancement options
 * @returns Enhanced storage adapter
 */
function enhanceStorage<T>(options: MigrationOptions<T>): StorageAdapter<T>;

interface MigrationOptions<T> {
  /**
   * Base storage adapter that stores enhanced values
   */
  storage: StorageAdapter<Enhance<T>>;

  /**
   * Migration functions by version
   */
  migrations?: Migrations;

  /**
   * Time-to-live for sessions in milliseconds
   */
  millisecondsToLive?: number;
}

/**
 * Map of version numbers to migration functions
 */
interface Migrations {
  [fromVersion: number]: (old: any) => any;
}

/**
 * Enhanced storage value wrapper with version and expiry metadata
 */
interface Enhance<T> {
  /** Version number */
  v?: number;
  /** Actual data */
  __d: T;
  /** Expiry timestamp */
  __e?: number;
}
```

**Usage Examples:**

```typescript
import { enhanceStorage } from "grammy";

// Define migrations
const migrations: Migrations = {
  // Migrate from v0 to v1
  0: (old: { count: number }) => ({
    messageCount: old.count,
    version: 1
  }),
  // Migrate from v1 to v2
  1: (old: any) => ({
    ...old,
    settings: {},
    version: 2
  })
};

const enhanced = enhanceStorage<SessionData>({
  storage: new DatabaseStorage(),
  migrations,
  migrationStrategy: "drop" // Drop sessions that can't be migrated
});

bot.use(session({
  initial: () => ({ messageCount: 0, settings: {}, version: 2 }),
  storage: enhanced
}));
```

### Multi-Session Support

Support multiple independent sessions per user/chat.

```typescript { .api }
/**
 * Multi-session configuration where each property defines a separate session
 */
type MultiSessionOptions<S, C extends Context> = {
  type: "multi";
} & {
  [K in keyof S]: SessionOptions<S[K], C>;
};
```

**Usage Examples:**

```typescript
// Multiple sessions
interface Sessions {
  user: {
    language: string;
  };
  chat: {
    settings: ChatSettings;
  };
}

bot.use(session<Sessions>({
  type: "multi",
  user: {
    initial: () => ({ language: "en" }),
    getSessionKey: (ctx) => ctx.from?.id.toString()
  },
  chat: {
    initial: () => ({ settings: {} }),
    getSessionKey: (ctx) => ctx.chat?.id.toString()
  }
}));

bot.use((ctx) => {
  console.log("User language:", ctx.session.user.language);
  console.log("Chat settings:", ctx.session.chat.settings);
});
```

## Types

```typescript { .api }
type MaybePromise<T> = T | Promise<T>;

interface MigrationOptions<T> {
  storage: StorageAdapter<unknown>;
  migrations?: Migrations;
  migrationStrategy?: "drop" | "throw";
}

interface Enhance<T> {
  storage: StorageAdapter<T>;
  version: number;
}
```
