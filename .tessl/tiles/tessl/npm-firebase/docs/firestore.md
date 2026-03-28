# Cloud Firestore

NoSQL document database with real-time synchronization, offline support, and powerful querying capabilities. Supports both full and lite versions for different use cases.

## Capabilities

### Firestore Service

Initialize and configure Cloud Firestore.

```typescript { .api }
/**
 * Gets the Firestore service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Firestore service instance
 */
function getFirestore(app?: FirebaseApp): Firestore;

/**
 * Initialize Firestore with custom settings
 * @param app - Firebase app instance
 * @param settings - Firestore configuration settings
 * @returns Firestore service instance
 */
function initializeFirestore(app: FirebaseApp, settings: FirestoreSettings): Firestore;

/**
 * Connects to the Firestore emulator for development and testing
 * @param firestore - Firestore service instance
 * @param host - Emulator host
 * @param port - Emulator port
 * @param options - Optional emulator configuration
 */
function connectFirestoreEmulator(firestore: Firestore, host: string, port: number, options?: object): void;

interface Firestore {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Internal identifier */
  readonly _delegate: any;
  
  /** Convert to JSON */
  toJSON(): object;
}

interface FirestoreSettings {
  /** Host to connect to */
  host?: string;
  /** Whether to use SSL */
  ssl?: boolean;
  /** Whether to ignore undefined properties */
  ignoreUndefinedProperties?: boolean;
  /** Cache size in bytes */
  cacheSizeBytes?: number;
  /** Merge configuration */
  merge?: boolean;
}
```

### Document Operations

Create, read, update, and delete individual documents.

```typescript { .api }
/**
 * Gets a document reference for the specified path
 * @param firestore - Firestore service instance
 * @param path - Document path
 * @param pathSegments - Additional path segments
 * @returns Document reference
 */
function doc<T = DocumentData>(firestore: Firestore, path: string, ...pathSegments: string[]): DocumentReference<T>;

/**
 * Gets the data for a single document
 * @param reference - Document reference
 * @returns Promise resolving to document snapshot
 */
function getDoc<T>(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;

/**
 * Sets the data for a document
 * @param reference - Document reference
 * @param data - Document data
 * @param options - Optional write options
 * @returns Promise that resolves when write is complete
 */
function setDoc<T>(reference: DocumentReference<T>, data: WithFieldValue<T>, options?: SetOptions): Promise<void>;

/**
 * Updates specific fields in a document
 * @param reference - Document reference
 * @param data - Fields to update
 * @returns Promise that resolves when update is complete
 */
function updateDoc<T>(reference: DocumentReference<T>, data: UpdateData<T>): Promise<void>;

/**
 * Deletes a document
 * @param reference - Document reference
 * @returns Promise that resolves when deletion is complete
 */
function deleteDoc(reference: DocumentReference<any>): Promise<void>;

interface DocumentReference<T = DocumentData> {
  /** Firestore service instance */
  readonly firestore: Firestore;
  /** Document ID */
  readonly id: string;
  /** Full document path */
  readonly path: string;
  /** Parent collection reference */
  readonly parent: CollectionReference<T>;
  /** Document type converter */
  readonly converter: FirestoreDataConverter<T> | null;
}

interface DocumentSnapshot<T = DocumentData> {
  /** Whether the document exists */
  exists(): boolean;
  /** Get document data */
  data(options?: SnapshotOptions): T | undefined;
  /** Get specific field value */
  get(fieldPath: string | FieldPath, options?: SnapshotOptions): any;
  /** Document ID */
  readonly id: string;
  /** Document reference */
  readonly ref: DocumentReference<T>;
  /** Server metadata */
  readonly metadata: SnapshotMetadata;
}

interface SetOptions {
  /** Only set specified fields */
  merge?: boolean;
  /** Merge only these fields */
  mergeFields?: (string | FieldPath)[];
}

type DocumentData = { [field: string]: any };
type UpdateData<T> = T extends Primitive ? T : T extends {} ? { [K in keyof T]?: UpdateData<T[K]> | FieldValue } & NestedUpdateFields<T> : Partial<T>;
type WithFieldValue<T> = T | (T extends Primitive ? T : T extends {} ? { [K in keyof T]: WithFieldValue<T[K]> | FieldValue } : never);
```

**Usage Examples:**

```typescript
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore();

// Get document reference
const docRef = doc(db, 'users', 'user123');

// Read document
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  console.log('Document data:', docSnap.data());
} else {
  console.log('No such document!');
}

// Create/update document
await setDoc(docRef, {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Update specific fields
await updateDoc(docRef, {
  age: 31,
  'profile.lastLogin': new Date()
});

// Delete document
await deleteDoc(docRef);
```

### Collection Operations

Work with collections of documents.

```typescript { .api }
/**
 * Gets a collection reference for the specified path
 * @param firestore - Firestore service instance
 * @param path - Collection path
 * @param pathSegments - Additional path segments
 * @returns Collection reference
 */
function collection<T = DocumentData>(firestore: Firestore, path: string, ...pathSegments: string[]): CollectionReference<T>;

/**
 * Adds a new document to a collection with auto-generated ID
 * @param reference - Collection reference
 * @param data - Document data
 * @returns Promise resolving to the new document reference
 */
function addDoc<T>(reference: CollectionReference<T>, data: WithFieldValue<T>): Promise<DocumentReference<T>>;

/**
 * Gets all documents in a collection or query
 * @param query - Collection reference or query
 * @returns Promise resolving to query snapshot
 */
function getDocs<T>(query: Query<T>): Promise<QuerySnapshot<T>>;

interface CollectionReference<T = DocumentData> extends Query<T> {
  /** Collection ID */
  readonly id: string;
  /** Full collection path */
  readonly path: string;
  /** Parent document reference */
  readonly parent: DocumentReference<DocumentData> | null;
}

interface QuerySnapshot<T = DocumentData> {
  /** Array of document snapshots */
  readonly docs: QueryDocumentSnapshot<T>[];
  /** Number of documents */
  readonly size: number;
  /** Whether the result set is empty */
  readonly empty: boolean;
  /** Query metadata */
  readonly metadata: SnapshotMetadata;
  
  /** Iterate over documents */
  forEach(callback: (result: QueryDocumentSnapshot<T>) => void, thisArg?: any): void;
  /** Get document changes since last snapshot */
  docChanges(options?: SnapshotListenOptions): DocumentChange<T>[];
}

interface QueryDocumentSnapshot<T = DocumentData> extends DocumentSnapshot<T> {
  /** Get document data (guaranteed to exist) */
  data(options?: SnapshotOptions): T;
}
```

**Usage Examples:**

```typescript
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const db = getFirestore();
const usersCollection = collection(db, 'users');

// Add new document with auto-generated ID
const docRef = await addDoc(usersCollection, {
  name: 'Jane Smith',
  email: 'jane@example.com',
  createdAt: new Date()
});
console.log('Document written with ID: ', docRef.id);

// Get all documents in collection
const querySnapshot = await getDocs(usersCollection);
querySnapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
```

### Querying

Build complex queries to filter and sort documents.

```typescript { .api }
/**
 * Creates a new query with additional constraints
 * @param query - Base query
 * @param queryConstraints - Query constraints to apply
 * @returns New query with constraints
 */
function query<T>(query: Query<T>, ...queryConstraints: QueryConstraint[]): Query<T>;

/**
 * Creates a where filter constraint
 * @param fieldPath - Field to filter on
 * @param opStr - Comparison operator
 * @param value - Value to compare against
 * @returns Where constraint
 */
function where(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown): QueryConstraint;

/**
 * Creates an order by constraint
 * @param fieldPath - Field to order by
 * @param directionStr - Sort direction
 * @returns Order by constraint
 */
function orderBy(fieldPath: string | FieldPath, directionStr?: OrderByDirection): QueryConstraint;

/**
 * Creates a limit constraint
 * @param limit - Maximum number of documents to return
 * @returns Limit constraint
 */
function limit(limit: number): QueryConstraint;

/**
 * Creates a limit to last constraint
 * @param limit - Maximum number of documents to return from the end
 * @returns Limit to last constraint
 */
function limitToLast(limit: number): QueryConstraint;

/**
 * Creates a start at constraint
 * @param snapshot - Document snapshot to start at
 * @returns Start at constraint
 */
function startAt(snapshot: DocumentSnapshot<any>): QueryConstraint;
function startAt(...fieldValues: unknown[]): QueryConstraint;

/**
 * Creates a start after constraint
 * @param snapshot - Document snapshot to start after
 * @returns Start after constraint
 */
function startAfter(snapshot: DocumentSnapshot<any>): QueryConstraint;
function startAfter(...fieldValues: unknown[]): QueryConstraint;

/**
 * Creates an end at constraint
 * @param snapshot - Document snapshot to end at
 * @returns End at constraint
 */
function endAt(snapshot: DocumentSnapshot<any>): QueryConstraint;
function endAt(...fieldValues: unknown[]): QueryConstraint;

/**
 * Creates an end before constraint
 * @param snapshot - Document snapshot to end before
 * @returns End before constraint
 */
function endBefore(snapshot: DocumentSnapshot<any>): QueryConstraint;
function endBefore(...fieldValues: unknown[]): QueryConstraint;

type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';
type OrderByDirection = 'desc' | 'asc';

interface Query<T = DocumentData> {
  /** Firestore service instance */
  readonly firestore: Firestore;
  /** Query type converter */
  readonly converter: FirestoreDataConverter<T> | null;
}

interface QueryConstraint {
  /** Constraint type */
  readonly type: string;
}
```

**Usage Examples:**

```typescript
import { getFirestore, collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const db = getFirestore();

// Simple where query
const q1 = query(
  collection(db, 'users'),
  where('age', '>=', 18),
  where('active', '==', true)
);

// Complex query with ordering and limit
const q2 = query(
  collection(db, 'posts'),
  where('published', '==', true),
  orderBy('createdAt', 'desc'),
  limit(10)
);

// Execute query
const querySnapshot = await getDocs(q2);
querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});

// Pagination with cursor
const firstBatch = await getDocs(query(collection(db, 'items'), limit(5)));
const lastVisible = firstBatch.docs[firstBatch.docs.length - 1];

const nextBatch = await getDocs(query(
  collection(db, 'items'),
  startAfter(lastVisible),
  limit(5)
));
```

### Real-time Listeners

Listen for real-time updates to documents and queries.

```typescript { .api }
/**
 * Attaches a listener for document snapshot events
 * @param reference - Document reference
 * @param observer - Observer function or object
 * @returns Function to unsubscribe the listener
 */
function onSnapshot<T>(
  reference: DocumentReference<T>,
  observer: (snapshot: DocumentSnapshot<T>) => void
): Unsubscribe;

function onSnapshot<T>(
  reference: DocumentReference<T>,
  options: SnapshotListenOptions,
  observer: (snapshot: DocumentSnapshot<T>) => void
): Unsubscribe;

/**
 * Attaches a listener for query snapshot events
 * @param query - Query to listen to
 * @param observer - Observer function or object
 * @returns Function to unsubscribe the listener
 */
function onSnapshot<T>(
  query: Query<T>,
  observer: (snapshot: QuerySnapshot<T>) => void
): Unsubscribe;

function onSnapshot<T>(
  query: Query<T>,
  options: SnapshotListenOptions,
  observer: (snapshot: QuerySnapshot<T>) => void
): Unsubscribe;

interface SnapshotListenOptions {
  /** Include metadata changes */
  includeMetadataChanges?: boolean;
  /** Data source preference */
  source?: 'default' | 'server' | 'cache';
}

interface SnapshotMetadata {
  /** Whether data comes from server */
  readonly fromCache: boolean;
  /** Whether there are pending writes */
  readonly hasPendingWrites: boolean;
  /** Whether equal to previous snapshot */
  isEqual(other: SnapshotMetadata): boolean;
}

type Unsubscribe = () => void;
```

**Usage Examples:**

```typescript
import { getFirestore, doc, collection, onSnapshot } from 'firebase/firestore';

const db = getFirestore();

// Listen to document changes
const docRef = doc(db, 'users', 'user123');
const unsubscribeDoc = onSnapshot(docRef, (doc) => {
  if (doc.exists()) {
    console.log('Current data: ', doc.data());
  } else {
    console.log('Document does not exist');
  }
});

// Listen to query changes
const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(20));
const unsubscribeQuery = onSnapshot(q, (querySnapshot) => {
  const messages = [];
  querySnapshot.forEach((doc) => {
    messages.push({ id: doc.id, ...doc.data() });
  });
  console.log('Current messages: ', messages);
});

// Clean up listeners
unsubscribeDoc();
unsubscribeQuery();
```

### Transactions and Batches

Perform atomic operations across multiple documents.

```typescript { .api }
/**
 * Executes the given function within a transaction
 * @param firestore - Firestore service instance
 * @param updateFunction - Function to execute in transaction
 * @returns Promise resolving to the function's return value
 */
function runTransaction<T>(
  firestore: Firestore,
  updateFunction: (transaction: Transaction) => Promise<T>
): Promise<T>;

/**
 * Creates a write batch for atomic operations
 * @param firestore - Firestore service instance
 * @returns WriteBatch instance
 */
function writeBatch(firestore: Firestore): WriteBatch;

interface Transaction {
  /** Get document within transaction */
  get<T>(documentRef: DocumentReference<T>): Promise<DocumentSnapshot<T>>;
  /** Set document within transaction */
  set<T>(documentRef: DocumentReference<T>, data: WithFieldValue<T>, options?: SetOptions): Transaction;
  /** Update document within transaction */
  update<T>(documentRef: DocumentReference<T>, data: UpdateData<T>): Transaction;
  /** Delete document within transaction */
  delete(documentRef: DocumentReference<any>): Transaction;
}

interface WriteBatch {
  /** Set document in batch */
  set<T>(documentRef: DocumentReference<T>, data: WithFieldValue<T>, options?: SetOptions): WriteBatch;
  /** Update document in batch */
  update<T>(documentRef: DocumentReference<T>, data: UpdateData<T>): WriteBatch;
  /** Delete document in batch */
  delete(documentRef: DocumentReference<any>): WriteBatch;
  /** Commit all operations in batch */
  commit(): Promise<void>;
}
```

**Usage Examples:**

```typescript
import { getFirestore, doc, runTransaction, writeBatch } from 'firebase/firestore';

const db = getFirestore();

// Transaction example
await runTransaction(db, async (transaction) => {
  const accountARef = doc(db, 'accounts', 'accountA');
  const accountBRef = doc(db, 'accounts', 'accountB');
  
  const accountADoc = await transaction.get(accountARef);
  const accountBDoc = await transaction.get(accountBRef);
  
  const newBalanceA = accountADoc.data().balance - 100;
  const newBalanceB = accountBDoc.data().balance + 100;
  
  transaction.update(accountARef, { balance: newBalanceA });
  transaction.update(accountBRef, { balance: newBalanceB });
});

// Batch write example
const batch = writeBatch(db);

batch.set(doc(db, 'users', 'user1'), { name: 'Alice' });
batch.update(doc(db, 'users', 'user2'), { lastLogin: new Date() });
batch.delete(doc(db, 'users', 'user3'));

await batch.commit();
```

### Data Types and Field Values

Special data types and field value operations.

```typescript { .api }
class Timestamp {
  /** Create from current time */
  static now(): Timestamp;
  /** Create from Date object */
  static fromDate(date: Date): Timestamp;
  /** Create from milliseconds */
  static fromMillis(milliseconds: number): Timestamp;
  
  /** Convert to Date */
  toDate(): Date;
  /** Convert to milliseconds */
  toMillis(): number;
  
  readonly seconds: number;
  readonly nanoseconds: number;
}

class GeoPoint {
  constructor(latitude: number, longitude: number);
  
  readonly latitude: number;
  readonly longitude: number;
  
  /** Check equality */
  isEqual(other: GeoPoint): boolean;
}

class Bytes {
  /** Create from base64 string */
  static fromBase64String(base64: string): Bytes;
  /** Create from Uint8Array */
  static fromUint8Array(array: Uint8Array): Bytes;
  
  /** Convert to base64 string */
  toBase64(): string;
  /** Convert to Uint8Array */
  toUint8Array(): Uint8Array;
}

class FieldValue {
  /** Server timestamp placeholder */
  static serverTimestamp(): FieldValue;
  /** Delete field */
  static delete(): FieldValue;
  /** Increment numeric value */
  static increment(n: number): FieldValue;
  /** Add elements to array */
  static arrayUnion(...elements: any[]): FieldValue;
  /** Remove elements from array */
  static arrayRemove(...elements: any[]): FieldValue;
}

class FieldPath {
  constructor(...fieldNames: string[]);
  
  /** Document ID field path */
  static documentId(): FieldPath;
  
  /** Check equality */
  isEqual(other: FieldPath): boolean;
}
```

**Usage Examples:**

```typescript
import { 
  getFirestore, doc, setDoc, updateDoc,
  Timestamp, GeoPoint, FieldValue, FieldPath
} from 'firebase/firestore';

const db = getFirestore();

// Using special data types
await setDoc(doc(db, 'events', 'event1'), {
  name: 'Conference',
  location: new GeoPoint(37.7749, -122.4194), // San Francisco
  startTime: Timestamp.fromDate(new Date('2024-01-15')),
  tags: ['tech', 'ai'],
  metadata: {
    createdAt: FieldValue.serverTimestamp()
  }
});

// Using field value operations
await updateDoc(doc(db, 'posts', 'post1'), {
  views: FieldValue.increment(1),
  tags: FieldValue.arrayUnion('featured'),
  oldField: FieldValue.delete()
});

// Using field paths for nested fields
await updateDoc(doc(db, 'users', 'user1'), {
  [new FieldPath('profile', 'settings', 'theme')]: 'dark'
});
```

## Firestore Lite

Lightweight version of Firestore without real-time listeners:

```typescript
// Import from firestore/lite
import { getFirestore, collection, doc, getDocs, getDoc } from 'firebase/firestore/lite';

// Same API as full Firestore but without onSnapshot functions
const db = getFirestore();
const users = await getDocs(collection(db, 'users'));
```

## Type Conversion

Create typed document references with custom converters:

```typescript { .api }
interface FirestoreDataConverter<T> {
  toFirestore(modelObject: WithFieldValue<T>): DocumentData;
  toFirestore(modelObject: PartialWithFieldValue<T>, options: SetOptions): DocumentData;
  fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): T;
}

// Usage with converter
const postConverter: FirestoreDataConverter<Post> = {
  toFirestore: (post: WithFieldValue<Post>) => ({
    title: post.title,
    content: post.content,
    author: post.author
  }),
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return new Post(data.title, data.content, data.author);
  }
};

const postRef = doc(db, 'posts', 'post1').withConverter(postConverter);
```