# Firebase Firestore Lite

Firestore Lite is a lightweight, read-only version of Cloud Firestore optimized for server-side applications and scenarios where you don't need real-time updates. It provides a smaller bundle size and reduced memory footprint while maintaining the same document-based NoSQL database capabilities.

## Capabilities

### Firestore Lite Service

Initialize Firestore Lite with reduced feature set optimized for performance.

```typescript { .api }
/**
 * Gets a Firestore Lite instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Firestore Lite instance
 */
function getFirestore(app?: FirebaseApp): FirebaseFirestore;

/**
 * Initialize Firestore Lite with custom settings
 * @param app - Firebase app instance
 * @param settings - Firestore settings
 * @returns Firestore Lite instance
 */
function initializeFirestore(app: FirebaseApp, settings: FirestoreSettings): FirebaseFirestore;

/**
 * Connect to Firestore emulator for development and testing
 * @param firestore - Firestore instance
 * @param host - Emulator host
 * @param port - Emulator port
 * @param options - Optional emulator settings
 */
function connectFirestoreEmulator(
  firestore: FirebaseFirestore,
  host: string,
  port: number,
  options?: { mockUserToken?: object }
): void;

interface FirebaseFirestore {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Firestore settings */
  readonly settings: FirestoreSettings;
}

interface FirestoreSettings {
  /** Custom host for Firestore endpoint */
  host?: string;
  /** Enable SSL (default: true) */
  ssl?: boolean;
  /** Ignore undefined properties (default: false) */
  ignoreUndefinedProperties?: boolean;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore/lite';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to emulator in development
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

### Document References

Create and manage references to Firestore documents.

```typescript { .api }
/**
 * Creates a reference to a document
 * @param firestore - Firestore instance
 * @param path - Document path
 * @returns DocumentReference
 */
function doc(firestore: FirebaseFirestore, path: string): DocumentReference<DocumentData>;

/**
 * Creates a typed reference to a document
 * @param firestore - Firestore instance
 * @param path - Document path
 * @returns Typed DocumentReference
 */
function doc<T = DocumentData>(firestore: FirebaseFirestore, path: string): DocumentReference<T>;

/**
 * Creates a reference using a collection reference and document ID
 * @param reference - Collection reference
 * @param id - Document ID
 * @returns DocumentReference
 */
function doc<T = DocumentData>(reference: CollectionReference<T>, id: string): DocumentReference<T>;

interface DocumentReference<T = DocumentData> {
  /** Document ID */
  readonly id: string;
  /** Document path */
  readonly path: string;
  /** Parent collection reference */
  readonly parent: CollectionReference<T>;
  /** Firestore instance */
  readonly firestore: FirebaseFirestore;
  /** Custom converter */
  readonly converter: FirestoreDataConverter<T> | null;
}
```

### Collection References

Create and manage references to Firestore collections.

```typescript { .api }
/**
 * Creates a reference to a collection
 * @param firestore - Firestore instance
 * @param path - Collection path
 * @returns CollectionReference
 */
function collection(firestore: FirebaseFirestore, path: string): CollectionReference<DocumentData>;

/**
 * Creates a typed reference to a collection
 * @param firestore - Firestore instance
 * @param path - Collection path
 * @returns Typed CollectionReference
 */
function collection<T = DocumentData>(firestore: FirebaseFirestore, path: string): CollectionReference<T>;

/**
 * Creates a collection reference from a document reference
 * @param reference - Document reference
 * @param path - Collection path
 * @returns CollectionReference
 */
function collection<T = DocumentData>(reference: DocumentReference, path: string): CollectionReference<T>;

interface CollectionReference<T = DocumentData> extends Query<T> {
  /** Collection ID */
  readonly id: string;
  /** Collection path */
  readonly path: string;
  /** Parent document reference */
  readonly parent: DocumentReference<DocumentData> | null;
  /** Firestore instance */
  readonly firestore: FirebaseFirestore;
}
```

### Document Operations

Read document data from Firestore. Note: Firestore Lite is read-only and doesn't support writes.

```typescript { .api }
/**
 * Reads a document from Firestore
 * @param reference - Document reference to read
 * @returns Promise resolving to document snapshot
 */
function getDoc<T = DocumentData>(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;

interface DocumentSnapshot<T = DocumentData> {
  /** Document reference */
  readonly ref: DocumentReference<T>;
  /** Document ID */
  readonly id: string;
  /** Whether document exists */
  exists(): boolean;
  /** Get document data */
  data(): T | undefined;
  /** Get specific field value */
  get(fieldPath: string): any;
}
```

**Usage Examples:**

```typescript
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

const db = getFirestore();

// Read a single document
const userRef = doc(db, 'users/user123');
const userSnap = await getDoc(userRef);

if (userSnap.exists()) {
  console.log('User data:', userSnap.data());
} else {
  console.log('User not found');
}
```

### Query Operations

Execute queries to retrieve multiple documents from collections.

```typescript { .api }
/**
 * Executes a query and returns the results
 * @param query - Query to execute
 * @returns Promise resolving to query snapshot
 */
function getDocs<T = DocumentData>(query: Query<T>): Promise<QuerySnapshot<T>>;

/**
 * Creates a query with a where clause
 * @param query - Base query
 * @param fieldPath - Field to filter on
 * @param opStr - Comparison operator
 * @param value - Value to compare against
 * @returns New query with filter applied
 */
function where(
  query: Query,
  fieldPath: string,
  opStr: WhereFilterOp,
  value: any
): Query;

/**
 * Creates a query with ordering
 * @param query - Base query
 * @param fieldPath - Field to order by
 * @param directionStr - Sort direction (optional, default: 'asc')
 * @returns New query with ordering applied
 */
function orderBy(
  query: Query,
  fieldPath: string,
  directionStr?: OrderByDirection
): Query;

/**
 * Creates a query with result limit
 * @param query - Base query
 * @param limit - Maximum number of results
 * @returns New query with limit applied
 */
function limit(query: Query, limit: number): Query;

interface Query<T = DocumentData> {
  /** Firestore instance */
  readonly firestore: FirebaseFirestore;
  /** Data converter */
  readonly converter: FirestoreDataConverter<T> | null;
}

interface QuerySnapshot<T = DocumentData> {
  /** Array of document snapshots */
  readonly docs: QueryDocumentSnapshot<T>[];
  /** Number of documents */
  readonly size: number;
  /** Whether query is empty */
  readonly empty: boolean;
  /** Iterate over documents */
  forEach(callback: (result: QueryDocumentSnapshot<T>) => void): void;
}

interface QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<T> {
  /** Get document data (guaranteed to exist) */
  data(): T;
}

type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
type OrderByDirection = 'desc' | 'asc';
```

**Usage Examples:**

```typescript
import { 
  getFirestore, 
  collection, 
  getDocs, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore/lite';

const db = getFirestore();
const usersRef = collection(db, 'users');

// Simple query
const snapshot = await getDocs(usersRef);
snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});

// Complex query with filters and ordering
const activeUsersQuery = query(
  usersRef,
  where('active', '==', true),
  where('age', '>=', 18),
  orderBy('name'),
  limit(10)
);

const activeUsers = await getDocs(activeUsersQuery);
console.log(`Found ${activeUsers.size} active users`);
```

### Aggregation Queries

Perform count and other aggregation operations without retrieving document data.

```typescript { .api }
/**
 * Creates a count aggregation query
 * @param query - Query to count
 * @returns AggregateQuery for counting
 */
function count(): AggregateField<number>;

/**
 * Executes an aggregation query
 * @param query - Aggregation query to execute
 * @returns Promise resolving to aggregation snapshot
 */
function getAggregateFromServer<T>(
  query: Query<T>,
  aggregateSpec: { count: AggregateField<number> }
): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>>;

interface AggregateQuerySnapshot<T> {
  /** Get aggregation result */
  data(): AggregateSpecData<T>;
}

interface AggregateSpecData<T> {
  count: number;
}

interface AggregateField<T> {
  /** Aggregate field type */
  readonly type: string;
}
```

**Usage Examples:**

```typescript
import { 
  getFirestore, 
  collection, 
  where, 
  count, 
  getAggregateFromServer 
} from 'firebase/firestore/lite';

const db = getFirestore();
const usersRef = collection(db, 'users');

// Count all users
const allUsersCount = await getAggregateFromServer(usersRef, { count: count() });
console.log('Total users:', allUsersCount.data().count);

// Count active users
const activeUsersQuery = where(usersRef, 'active', '==', true);
const activeUsersCount = await getAggregateFromServer(activeUsersQuery, { count: count() });
console.log('Active users:', activeUsersCount.data().count);
```

## Data Conversion

### Type Conversion

Convert between Firestore data and TypeScript types using custom converters.

```typescript { .api }
/**
 * Applies a custom converter to a reference
 * @param reference - Document or collection reference
 * @param converter - Data converter
 * @returns Reference with converter applied
 */
function withConverter<T>(
  reference: DocumentReference<DocumentData>,
  converter: FirestoreDataConverter<T>
): DocumentReference<T>;

function withConverter<T>(
  reference: CollectionReference<DocumentData>,
  converter: FirestoreDataConverter<T>
): CollectionReference<T>;

function withConverter<T>(
  reference: Query<DocumentData>,
  converter: FirestoreDataConverter<T>
): Query<T>;

interface FirestoreDataConverter<T> {
  /** Convert TypeScript object to Firestore data */
  toFirestore(modelObject: T): DocumentData;
  /** Convert Firestore data to TypeScript object */
  fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T;
}
```

**Usage Examples:**

```typescript
import { getFirestore, doc, collection, withConverter, getDoc } from 'firebase/firestore/lite';

interface User {
  name: string;
  email: string;
  age: number;
}

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: (user: User) => ({
    name: user.name,
    email: user.email,
    age: user.age
  }),
  fromFirestore: (snapshot) => {
    const data = snapshot.data();
    return {
      name: data.name,
      email: data.email,
      age: data.age
    };
  }
};

const db = getFirestore();

// Use converter with document reference
const userRef = withConverter(doc(db, 'users/user123'), userConverter);
const userSnap = await getDoc(userRef);
const user: User | undefined = userSnap.data(); // Properly typed
```

## Firestore Lite vs Full Firestore

### What's Included in Lite

- ✅ Document and collection reading
- ✅ Queries with filtering, ordering, and limiting
- ✅ Aggregation queries (count)
- ✅ Type converters
- ✅ Emulator support

### What's Not Included in Lite

- ❌ Real-time listeners (onSnapshot)
- ❌ Document writes (add, set, update, delete)
- ❌ Transactions
- ❌ Batch writes
- ❌ Offline persistence
- ❌ Local cache

### When to Use Firestore Lite

- **Server-side applications**: Node.js backends and cloud functions
- **One-time data fetching**: Apps that don't need real-time updates
- **Bundle size optimization**: When you need minimal footprint
- **Read-only scenarios**: Analytics, reporting, static content

### Migration from Full Firestore

```typescript
// Replace full Firestore import
// import { getFirestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore/lite';

// Most query APIs are the same
import { collection, doc, getDocs, getDoc, where, orderBy } from 'firebase/firestore/lite';

// Remove real-time listeners
// onSnapshot is not available in Lite
// Use getDocs for one-time reads instead
```

## Error Handling

Handle Firestore Lite specific errors:

```typescript
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

try {
  const db = getFirestore();
  const docRef = doc(db, 'users/user123');
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  }
} catch (error) {
  console.error('Firestore Lite error:', error);
  
  // Handle specific error codes
  if (error.code === 'permission-denied') {
    console.log('Access denied to document');
  } else if (error.code === 'unavailable') {
    console.log('Firestore service unavailable');
  }
}
```