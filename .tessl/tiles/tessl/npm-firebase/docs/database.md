# Realtime Database

Real-time JSON database with automatic data synchronization across all connected clients. Perfect for applications requiring live updates and collaboration features.

## Capabilities

### Database Service

Initialize and configure Realtime Database.

```typescript { .api }
/**
 * Gets the Database service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @param url - Optional database URL
 * @returns Database service instance
 */
function getDatabase(app?: FirebaseApp, url?: string): Database;

/**
 * Connects to the Database emulator for development and testing
 * @param db - Database service instance
 * @param host - Emulator host
 * @param port - Emulator port
 */
function connectDatabaseEmulator(db: Database, host: string, port: number): void;

interface Database {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  
  /** Create reference to root or path */
  ref(path?: string): DatabaseReference;
  /** Create reference from URL */
  refFromURL(url: string): DatabaseReference;
  /** Go offline */
  goOffline(): void;
  /** Go online */
  goOnline(): void;
}
```

### Database References

Create and manage references to database locations.

```typescript { .api }
/**
 * Creates a database reference for the specified path
 * @param database - Database service instance
 * @param path - Path to database location
 * @returns Database reference
 */
function ref(database: Database, path?: string): DatabaseReference;

/**
 * Gets a child reference
 * @param ref - Parent reference
 * @param path - Child path
 * @returns Child reference
 */
function child(ref: DatabaseReference, path: string): DatabaseReference;

/**
 * Gets the parent reference
 * @param ref - Child reference
 * @returns Parent reference or null if at root
 */
function parent(ref: DatabaseReference): DatabaseReference | null;

/**
 * Gets the root reference
 * @param ref - Any reference
 * @returns Root reference
 */
function root(ref: DatabaseReference): DatabaseReference;

interface DatabaseReference extends Query {
  /** Reference key */
  readonly key: string | null;
  /** Parent reference */
  readonly parent: DatabaseReference | null;
  /** Root reference */
  readonly root: DatabaseReference;
  /** Full path */
  readonly path: string;
  /** Database instance */
  readonly database: Database;
  
  /** Get child reference */
  child(path: string): DatabaseReference;
  /** Push new child with auto-generated key */
  push(value?: any): ThenableReference;
  /** Set data at this reference */
  set(value: any): Promise<void>;
  /** Update data at this reference */
  update(values: { [path: string]: any }): Promise<void>;
  /** Remove data at this reference */
  remove(): Promise<void>;
}

interface ThenableReference extends DatabaseReference {
  /** Promise-like then method */
  then<T, R>(onResolve?: (a: DatabaseReference) => T, onReject?: (a: Error) => R): Promise<T | R>;
  /** Promise-like catch method */
  catch<T>(onReject: (a: Error) => T): Promise<T | DatabaseReference>;
}
```

### Data Operations

Write, update, and delete data in the database.

```typescript { .api }
/**
 * Sets data at the specified reference
 * @param ref - Database reference
 * @param value - Data to set
 * @returns Promise that resolves when write is complete
 */
function set(ref: DatabaseReference, value: unknown): Promise<void>;

/**
 * Updates specific children at the reference
 * @param ref - Database reference
 * @param values - Object with children to update
 * @returns Promise that resolves when update is complete
 */
function update(ref: DatabaseReference, values: { [path: string]: any }): Promise<void>;

/**
 * Removes data at the reference
 * @param ref - Database reference
 * @returns Promise that resolves when removal is complete
 */
function remove(ref: DatabaseReference): Promise<void>;

/**
 * Pushes a new child to the reference with auto-generated key
 * @param ref - Database reference
 * @param value - Data to push
 * @returns ThenableReference to the new child
 */
function push(ref: DatabaseReference, value?: unknown): ThenableReference;

/**
 * Sets priority for the data at reference
 * @param ref - Database reference
 * @param priority - Priority value
 * @returns Promise that resolves when priority is set
 */
function setPriority(ref: DatabaseReference, priority: string | number | null): Promise<void>;

/**
 * Sets data with priority atomically
 * @param ref - Database reference
 * @param value - Data to set
 * @param priority - Priority value
 * @returns Promise that resolves when write is complete
 */
function setWithPriority(ref: DatabaseReference, value: unknown, priority: string | number | null): Promise<void>;
```

**Usage Examples:**

```typescript
import { getDatabase, ref, set, update, push, remove } from 'firebase/database';

const db = getDatabase();

// Set data
const userRef = ref(db, 'users/user123');
await set(userRef, {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Update specific fields
await update(userRef, {
  age: 31,
  'profile/lastLogin': Date.now()
});

// Push new data with auto-generated key
const messagesRef = ref(db, 'messages');
const newMessageRef = push(messagesRef, {
  text: 'Hello World!',
  timestamp: Date.now(),
  user: 'user123'
});
console.log('New message key:', newMessageRef.key);

// Remove data
await remove(ref(db, 'temp/session123'));
```

### Reading Data

Retrieve data once or listen for changes.

```typescript { .api }
/**
 * Gets data from the reference once
 * @param query - Query to execute
 * @returns Promise resolving to data snapshot
 */
function get(query: Query): Promise<DataSnapshot>;

/**
 * Attaches a listener for data changes
 * @param query - Query to listen to
 * @param eventType - Type of event to listen for
 * @param callback - Function called when event occurs
 * @param cancelCallbackOrContext - Error callback or context
 * @param context - Context object
 * @returns Function to detach listener
 */
function on(
  query: Query,
  eventType: EventType,
  callback: (snapshot: DataSnapshot, previousChildName?: string | null) => unknown,
  cancelCallbackOrContext?: ((error: Error) => unknown) | object | null,
  context?: object | null
): Unsubscribe;

/**
 * Detaches listener(s) from the query
 * @param query - Query to detach from
 * @param eventType - Optional event type
 * @param callback - Optional specific callback
 * @param context - Optional context
 */
function off(
  query: Query,
  eventType?: EventType,
  callback?: Function,
  context?: object | null
): void;

/**
 * Listens for exactly one event and then detaches
 * @param query - Query to listen to
 * @param eventType - Type of event
 * @param callback - Success callback
 * @param cancelCallback - Error callback
 * @param context - Context object
 * @returns Promise resolving to data snapshot
 */
function once(
  query: Query,
  eventType: EventType,
  callback?: (snapshot: DataSnapshot) => unknown,
  cancelCallback?: (error: Error) => unknown,
  context?: object | null
): Promise<DataSnapshot>;

type EventType = 'value' | 'child_added' | 'child_changed' | 'child_removed' | 'child_moved';
type Unsubscribe = () => void;

interface DataSnapshot {
  /** Check if data exists */
  exists(): boolean;
  /** Get the data value */
  val(): any;
  /** Get child snapshot */
  child(path: string): DataSnapshot;
  /** Iterate over children */
  forEach(action: (child: DataSnapshot) => boolean | void): boolean;
  /** Check if has child */
  hasChild(path: string): boolean;
  /** Check if has any children */
  hasChildren(): boolean;
  /** Snapshot key */
  readonly key: string | null;
  /** Number of children */
  numChildren(): number;
  /** Database reference */
  readonly ref: DatabaseReference;
  /** Priority value */
  readonly priority: string | number | null;
  /** Size in bytes */
  readonly size: number;
  
  /** Export to JSON */
  exportVal(): any;
  /** Convert to JSON */
  toJSON(): object | null;
}
```

**Usage Examples:**

```typescript
import { getDatabase, ref, get, on, off } from 'firebase/database';

const db = getDatabase();

// Read data once
const snapshot = await get(ref(db, 'users/user123'));
if (snapshot.exists()) {
  console.log('User data:', snapshot.val());
} else {
  console.log('User not found');
}

// Listen for value changes
const userRef = ref(db, 'users/user123');
const unsubscribe = on(userRef, 'value', (snapshot) => {
  const data = snapshot.val();
  console.log('User updated:', data);
});

// Listen for child events
const messagesRef = ref(db, 'messages');
on(messagesRef, 'child_added', (snapshot) => {
  console.log('New message:', snapshot.val());
});

on(messagesRef, 'child_removed', (snapshot) => {
  console.log('Message deleted:', snapshot.key);
});

// Clean up listener
unsubscribe();
```

### Query Operations

Filter, order, and limit data queries.

```typescript { .api }
/**
 * Orders by child key
 * @param path - Child key to order by
 * @returns Query constraint
 */
function orderByChild(path: string): QueryConstraint;

/**
 * Orders by keys
 * @returns Query constraint
 */
function orderByKey(): QueryConstraint;

/**
 * Orders by values
 * @returns Query constraint
 */
function orderByValue(): QueryConstraint;

/**
 * Orders by priority
 * @returns Query constraint
 */
function orderByPriority(): QueryConstraint;

/**
 * Limits to first N children
 * @param limit - Number of children to include
 * @returns Query constraint
 */
function limitToFirst(limit: number): QueryConstraint;

/**
 * Limits to last N children
 * @param limit - Number of children to include
 * @returns Query constraint
 */
function limitToLast(limit: number): QueryConstraint;

/**
 * Sets starting point for results
 * @param value - Starting value
 * @param key - Optional key for tie-breaking
 * @returns Query constraint
 */
function startAt(value: number | string | boolean | null, key?: string): QueryConstraint;

/**
 * Sets starting point (exclusive)
 * @param value - Starting value
 * @param key - Optional key for tie-breaking
 * @returns Query constraint
 */
function startAfter(value: number | string | boolean | null, key?: string): QueryConstraint;

/**
 * Sets ending point for results
 * @param value - Ending value
 * @param key - Optional key for tie-breaking
 * @returns Query constraint
 */
function endAt(value: number | string | boolean | null, key?: string): QueryConstraint;

/**
 * Sets ending point (exclusive)
 * @param value - Ending value
 * @param key - Optional key for tie-breaking
 * @returns Query constraint
 */
function endBefore(value: number | string | boolean | null, key?: string): QueryConstraint;

/**
 * Filters to exact value
 * @param value - Value to match
 * @param key - Optional key for tie-breaking
 * @returns Query constraint
 */
function equalTo(value: number | string | boolean | null, key?: string): QueryConstraint;

interface Query {
  /** Database reference */
  readonly ref: DatabaseReference;
  
  /** Check query equality */
  isEqual(other: Query | null): boolean;
  /** Limit to first N */
  limitToFirst(limit: number): Query;
  /** Limit to last N */
  limitToLast(limit: number): Query;
  /** Order by child */
  orderByChild(path: string): Query;
  /** Order by key */
  orderByKey(): Query;
  /** Order by value */
  orderByValue(): Query;
  /** Start at value */
  startAt(value: number | string | boolean | null, key?: string): Query;
  /** End at value */
  endAt(value: number | string | boolean | null, key?: string): Query;
  /** Filter to equal value */
  equalTo(value: number | string | boolean | null, key?: string): Query;
  /** Convert to JSON */
  toJSON(): object;
  /** Convert to string */
  toString(): string;
}
```

**Usage Examples:**

```typescript
import { getDatabase, ref, query, orderByChild, limitToFirst, equalTo, get } from 'firebase/database';

const db = getDatabase();

// Query with ordering and limit
const topScoresQuery = query(
  ref(db, 'scores'),
  orderByChild('score'),
  limitToLast(10)
);

const snapshot = await get(topScoresQuery);
snapshot.forEach((childSnapshot) => {
  console.log(childSnapshot.key, childSnapshot.val());
});

// Query with filter
const activeUsersQuery = query(
  ref(db, 'users'),
  orderByChild('active'),
  equalTo(true)
);

// Listen to filtered data
on(activeUsersQuery, 'value', (snapshot) => {
  console.log('Active users count:', snapshot.numChildren());
});
```

### Server Values

Use server-generated values in your data.

```typescript { .api }
class ServerValue {
  /** Server timestamp placeholder */
  static readonly TIMESTAMP: object;
  
  /** Increment operation */
  static increment(delta: number): object;
}
```

**Usage Examples:**

```typescript
import { getDatabase, ref, set, ServerValue } from 'firebase/database';

const db = getDatabase();

// Use server timestamp
await set(ref(db, 'posts/post123'), {
  title: 'Hello World',
  content: 'This is my first post',
  timestamp: ServerValue.TIMESTAMP
});

// Increment counter
await update(ref(db, 'stats'), {
  pageViews: ServerValue.increment(1)
});
```

## Connection Management

Manage database connection state:

```typescript
import { getDatabase } from 'firebase/database';

const db = getDatabase();

// Monitor connection state
on(ref(db, '.info/connected'), 'value', (snapshot) => {
  if (snapshot.val() === true) {
    console.log('Connected to Firebase');
  } else {
    console.log('Disconnected from Firebase');
  }
});

// Handle presence
const userStatusRef = ref(db, '/status/' + userId);
const isOfflineForDatabase = {
  state: 'offline',
  last_changed: ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: ServerValue.TIMESTAMP,
};

// Set offline status on disconnect
onDisconnect(userStatusRef).set(isOfflineForDatabase);

// Set online status
set(userStatusRef, isOnlineForDatabase);
```