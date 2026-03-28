# Firebase Data Connect

Firebase Data Connect enables you to connect your app directly to PostgreSQL databases with generated client SDKs, real-time subscriptions, and strong typing. Build applications with relational data while maintaining Firebase's ease of use.

## Capabilities

### Data Connect Service

Initialize and configure Firebase Data Connect with connector settings.

```typescript { .api }
/**
 * Gets a Data Connect instance for the given connector configuration
 * @param options - Connector configuration with location, service, and connector name
 * @returns DataConnect service instance
 */
function getDataConnect(options: ConnectorConfig): DataConnect;

/**
 * Gets a Data Connect instance for the given app and connector configuration
 * @param app - Firebase app instance
 * @param options - Connector configuration
 * @returns DataConnect service instance
 */
function getDataConnect(app: FirebaseApp, options: ConnectorConfig): DataConnect;

/**
 * Connects to the Data Connect emulator for development and testing
 * @param dataConnectInstance - Data Connect service instance
 * @param host - Emulator host (e.g., 'localhost:9399')
 * @param sslEnabled - Whether SSL is enabled (default: false for emulator)
 */
function connectDataConnectEmulator(
  dataConnectInstance: DataConnect,
  host: string,
  sslEnabled?: boolean
): void;

interface DataConnect {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Connector configuration */
  readonly config: ConnectorConfig;
  /** Whether the instance is initialized */
  isInitialized(): boolean;
}

interface ConnectorConfig {
  /** Geographic location of the Data Connect service */
  location: string;
  /** Name of the connector */
  connector: string;
  /** Name of the service */
  service: string;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';

const app = initializeApp(firebaseConfig);

const dataConnect = getDataConnect(app, {
  location: 'us-central1',
  connector: 'my-connector',
  service: 'my-service'
});

// Connect to emulator in development
if (process.env.NODE_ENV === 'development') {
  connectDataConnectEmulator(dataConnect, 'localhost:9399');
}
```

### Query Operations

Execute GraphQL queries against your Data Connect service with strong typing and caching.

```typescript { .api }
/**
 * Creates a query reference that can be executed or subscribed to
 * @param dataConnectInstance - Data Connect service instance
 * @param queryName - Name of the GraphQL query
 * @returns QueryRef without variables (for queries that don't require variables)
 */
function queryRef<Data>(
  dataConnectInstance: DataConnect,
  queryName: string
): QueryRef<Data, undefined>;

/**
 * Creates a query reference with variables
 * @param dataConnectInstance - Data Connect service instance
 * @param queryName - Name of the GraphQL query
 * @param variables - Variables to pass to the query
 * @returns QueryRef with typed variables
 */
function queryRef<Data, Variables>(
  dataConnectInstance: DataConnect,
  queryName: string,
  variables: Variables
): QueryRef<Data, Variables>;

/**
 * Executes a query and returns the result
 * @param queryRef - Query reference to execute
 * @returns Promise resolving to query result
 */
function executeQuery<Data, Variables>(
  queryRef: QueryRef<Data, Variables>
): QueryPromise<Data, Variables>;

interface QueryRef<Data, Variables> extends OperationRef<Data, Variables> {
  refType: 'query';
}

interface QueryResult<Data, Variables> extends DataConnectResult<Data, Variables> {
  /** Reference to the original query */
  ref: QueryRef<Data, Variables>;
  /** Serialize the result for caching or transmission */
  toJSON(): SerializedRef<Data, Variables>;
}

interface QueryPromise<Data, Variables> extends Promise<QueryResult<Data, Variables>> {
  // Reserved for special actions like cancellation
}
```

**Usage Examples:**

```typescript
import { getDataConnect, queryRef, executeQuery } from 'firebase/data-connect';

const dataConnect = getDataConnect(/* config */);

// Query without variables
const allUsersQuery = queryRef<{ users: User[] }>(dataConnect, 'GetAllUsers');
const usersResult = await executeQuery(allUsersQuery);
console.log(usersResult.data.users);

// Query with variables
const userQuery = queryRef<{ user: User }, { id: string }>(
  dataConnect,
  'GetUser',
  { id: 'user123' }
);
const userResult = await executeQuery(userQuery);
console.log(userResult.data.user);
```

### Mutation Operations

Execute GraphQL mutations to create, update, or delete data with full type safety.

```typescript { .api }
/**
 * Creates a mutation reference that can be executed
 * @param dataConnectInstance - Data Connect service instance
 * @param mutationName - Name of the GraphQL mutation
 * @returns MutationRef without variables
 */
function mutationRef<Data>(
  dataConnectInstance: DataConnect,
  mutationName: string
): MutationRef<Data, undefined>;

/**
 * Creates a mutation reference with variables
 * @param dataConnectInstance - Data Connect service instance
 * @param mutationName - Name of the GraphQL mutation
 * @param variables - Variables to pass to the mutation
 * @returns MutationRef with typed variables
 */
function mutationRef<Data, Variables>(
  dataConnectInstance: DataConnect,
  mutationName: string,
  variables: Variables
): MutationRef<Data, Variables>;

/**
 * Executes a mutation and returns the result
 * @param mutationRef - Mutation reference to execute
 * @returns Promise resolving to mutation result
 */
function executeMutation<Data, Variables>(
  mutationRef: MutationRef<Data, Variables>
): MutationPromise<Data, Variables>;

interface MutationRef<Data, Variables> extends OperationRef<Data, Variables> {
  refType: 'mutation';
}

interface MutationResult<Data, Variables> extends DataConnectResult<Data, Variables> {
  /** Reference to the original mutation */
  ref: MutationRef<Data, Variables>;
}

interface MutationPromise<Data, Variables> extends Promise<MutationResult<Data, Variables>> {
  // Reserved for special actions like cancellation
}
```

**Usage Examples:**

```typescript
import { getDataConnect, mutationRef, executeMutation } from 'firebase/data-connect';

const dataConnect = getDataConnect(/* config */);

// Create a new user
const createUserMutation = mutationRef<
  { user: User },
  { name: string; email: string }
>(dataConnect, 'CreateUser', {
  name: 'John Doe',
  email: 'john@example.com'
});

const result = await executeMutation(createUserMutation);
console.log('Created user:', result.data.user);

// Update user
const updateUserMutation = mutationRef<
  { user: User },
  { id: string; name: string }
>(dataConnect, 'UpdateUser', {
  id: 'user123',
  name: 'Jane Doe'
});

await executeMutation(updateUserMutation);
```

### Real-time Subscriptions

Subscribe to query results for real-time updates when underlying data changes.

```typescript { .api }
/**
 * Subscribe to a query for real-time updates
 * @param queryRefOrSerializedResult - Query reference or serialized result to subscribe to
 * @param observer - Observer object with callback functions
 * @returns Unsubscribe function
 */
function subscribe<Data, Variables>(
  queryRefOrSerializedResult: QueryRef<Data, Variables> | SerializedRef<Data, Variables>,
  observer: SubscriptionOptions<Data, Variables>
): QueryUnsubscribe;

/**
 * Subscribe to a query with individual callback functions
 * @param queryRefOrSerializedResult - Query reference or serialized result
 * @param onNext - Callback for receiving new data
 * @param onError - Optional error callback
 * @param onComplete - Optional completion callback
 * @returns Unsubscribe function
 */
function subscribe<Data, Variables>(
  queryRefOrSerializedResult: QueryRef<Data, Variables> | SerializedRef<Data, Variables>,
  onNext: OnResultSubscription<Data, Variables>,
  onError?: OnErrorSubscription,
  onComplete?: OnCompleteSubscription
): QueryUnsubscribe;

interface SubscriptionOptions<Data, Variables> {
  /** Called when new data is received */
  onNext?: OnResultSubscription<Data, Variables>;
  /** Called when an error occurs */
  onErr?: OnErrorSubscription;
  /** Called when subscription completes */
  onComplete?: OnCompleteSubscription;
}

type OnResultSubscription<Data, Variables> = (result: QueryResult<Data, Variables>) => void;
type OnErrorSubscription = (error?: DataConnectError) => void;
type OnCompleteSubscription = () => void;
type QueryUnsubscribe = () => void;
```

**Usage Examples:**

```typescript
import { getDataConnect, queryRef, subscribe } from 'firebase/data-connect';

const dataConnect = getDataConnect(/* config */);

const messagesQuery = queryRef<{ messages: Message[] }>(dataConnect, 'GetMessages');

// Subscribe with observer object
const unsubscribe = subscribe(messagesQuery, {
  onNext: (result) => {
    console.log('New messages:', result.data.messages);
    updateUI(result.data.messages);
  },
  onErr: (error) => {
    console.error('Subscription error:', error);
  }
});

// Subscribe with individual callbacks
const unsubscribe2 = subscribe(
  messagesQuery,
  (result) => console.log('Messages updated:', result.data.messages),
  (error) => console.error('Error:', error)
);

// Unsubscribe when no longer needed
unsubscribe();
unsubscribe2();
```

## Common Types

```typescript { .api }
interface OperationRef<Data, Variables> {
  /** Data Connect service instance */
  dataConnect: DataConnect;
  /** Name of the operation */
  name: string;
  /** Variables passed to the operation */
  variables: Variables;
}

interface DataConnectResult<Data, Variables> {
  /** The result data */
  data: Data;
  /** Source of the data (server, cache, etc.) */
  source: DataSource;
  /** Timestamp when data was fetched */
  fetchTime: number;
}

interface SerializedRef<Data, Variables> {
  /** Operation reference information */
  refInfo: OperationRef<Data, Variables>;
  /** Cached data */
  data: Data;
  /** Data source */
  source: DataSource;
  /** Cache timestamp */
  fetchTime: number;
}

type DataSource = 'server' | 'cache';

class DataConnectError extends Error {
  readonly code: DataConnectErrorCode;
  readonly message: string;
  readonly details?: any;
}

enum DataConnectErrorCode {
  INVALID_ARGUMENT = 'invalid-argument',
  PERMISSION_DENIED = 'permission-denied',
  NOT_FOUND = 'not-found',
  ALREADY_EXISTS = 'already-exists',
  RESOURCE_EXHAUSTED = 'resource-exhausted',
  FAILED_PRECONDITION = 'failed-precondition',
  ABORTED = 'aborted',
  OUT_OF_RANGE = 'out-of-range',
  UNIMPLEMENTED = 'unimplemented',
  INTERNAL = 'internal',
  UNAVAILABLE = 'unavailable',
  DATA_LOSS = 'data-loss',
  UNAUTHENTICATED = 'unauthenticated'
}
```

## Advanced Features

### Emulator Support

Data Connect supports local development through the Firebase emulator:

```typescript
import { connectDataConnectEmulator } from 'firebase/data-connect';

// Connect to local emulator
connectDataConnectEmulator(dataConnect, 'localhost:9399', false);
```

### Generated Client SDKs

Data Connect generates typed client SDKs from your GraphQL schema, providing:

- **Full type safety** for queries, mutations, and subscriptions
- **Autocomplete support** in IDEs
- **Validation** at compile time
- **Optimized network requests** with batching and caching

### Error Handling

Handle Data Connect specific errors with detailed error codes:

```typescript
import { DataConnectError, DataConnectErrorCode } from 'firebase/data-connect';

try {
  const result = await executeQuery(queryRef);
} catch (error) {
  if (error instanceof DataConnectError) {
    switch (error.code) {
      case DataConnectErrorCode.PERMISSION_DENIED:
        console.log('Access denied');
        break;
      case DataConnectErrorCode.NOT_FOUND:
        console.log('Resource not found');
        break;
      default:
        console.log('Data Connect error:', error.message);
    }
  }
}
```