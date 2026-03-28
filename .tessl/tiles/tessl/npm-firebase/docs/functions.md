# Cloud Functions

Call server-side functions deployed to Firebase Cloud Functions. Provides seamless integration between client and server code with automatic scaling and HTTPS endpoints.

## Capabilities

### Functions Service

Initialize and configure Cloud Functions.

```typescript { .api }
/**
 * Gets the Functions service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @param regionOrCustomDomain - Optional region or custom domain
 * @returns Functions service instance
 */
function getFunctions(app?: FirebaseApp, regionOrCustomDomain?: string): Functions;

/**
 * Connects to the Functions emulator for development and testing
 * @param functionsInstance - Functions service instance
 * @param host - Emulator host
 * @param port - Emulator port
 */
function connectFunctionsEmulator(functionsInstance: Functions, host: string, port: number): void;

interface Functions {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Functions region */
  readonly region: string;
  /** Custom domain */
  readonly customDomain: string | null;
}
```

### Callable Functions

Create callable function references and invoke them.

```typescript { .api }
/**
 * Creates a callable function reference
 * @param functionsInstance - Functions service instance
 * @param name - Function name
 * @param options - Optional call options
 * @returns Callable function interface
 */
function httpsCallable<RequestData = any, ResponseData = any>(
  functionsInstance: Functions,
  name: string,
  options?: HttpsCallableOptions
): HttpsCallable<RequestData, ResponseData>;

/**
 * Creates a callable function from a URL
 * @param functionsInstance - Functions service instance
 * @param url - Function URL
 * @param options - Optional call options
 * @returns Callable function interface
 */
function httpsCallableFromURL<RequestData = any, ResponseData = any>(
  functionsInstance: Functions,
  url: string,
  options?: HttpsCallableOptions
): HttpsCallable<RequestData, ResponseData>;

interface HttpsCallable<RequestData = any, ResponseData = any> {
  /**
   * Calls the function with data
   * @param data - Data to pass to the function
   * @returns Promise resolving to function result
   */
  (data?: RequestData): Promise<HttpsCallableResult<ResponseData>>;
}

interface HttpsCallableResult<ResponseData = any> {
  /** Function return data */
  readonly data: ResponseData;
}

interface HttpsCallableOptions {
  /** Whether to use limited-use App Check tokens */
  limitedUseAppCheckTokens?: boolean;
  /** Request timeout in milliseconds */
  timeout?: number;
}
```

**Usage Examples:**

```typescript
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

const functions = getFunctions();

// Connect to emulator in development
if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

// Create callable function
const addMessage = httpsCallable(functions, 'addMessage');

// Call function
try {
  const result = await addMessage({ text: 'Hello from client!' });
  console.log('Function result:', result.data);
} catch (error) {
  console.error('Function call failed:', error);
}

// Typed function call
interface AddMessageRequest {
  text: string;
  userId?: string;
}

interface AddMessageResponse {
  messageId: string;
  timestamp: number;
}

const typedAddMessage = httpsCallable<AddMessageRequest, AddMessageResponse>(
  functions,
  'addMessage'
);

const response = await typedAddMessage({
  text: 'Hello World!',
  userId: 'user123'
});

console.log('Message ID:', response.data.messageId);
```

### Error Handling

Handle function call errors with specific error codes.

```typescript { .api }
interface FunctionsError extends FirebaseError {
  /** Function error code */
  readonly code: FunctionsErrorCode;
  /** Error message */
  readonly message: string;
  /** Additional error details */
  readonly details?: unknown;
}

type FunctionsErrorCode = 
  | 'ok'
  | 'cancelled'
  | 'unknown'
  | 'invalid-argument'
  | 'deadline-exceeded'
  | 'not-found'
  | 'already-exists'
  | 'permission-denied'
  | 'resource-exhausted'
  | 'failed-precondition'
  | 'aborted'
  | 'out-of-range'
  | 'unimplemented'
  | 'internal'
  | 'unavailable'
  | 'data-loss'
  | 'unauthenticated';
```

**Usage Examples:**

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();
const processPayment = httpsCallable(functions, 'processPayment');

try {
  const result = await processPayment({
    amount: 1000,
    currency: 'USD',
    paymentMethodId: 'pm_123'
  });
  
  console.log('Payment successful:', result.data);
} catch (error) {
  switch (error.code) {
    case 'functions/invalid-argument':
      console.error('Invalid payment data provided');
      break;
    case 'functions/permission-denied':
      console.error('User not authorized to make payments');
      break;
    case 'functions/unavailable':
      console.error('Payment service temporarily unavailable');
      break;
    default:
      console.error('Payment failed:', error.message);
  }
  
  // Access additional error details if available
  if (error.details) {
    console.log('Error details:', error.details);
  }
}
```

### Regional Functions

Work with functions deployed to specific regions.

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

// Use default region (us-central1)
const defaultFunctions = getFunctions();

// Use specific region
const europeFunctions = getFunctions(app, 'europe-west1');
const europeFunction = httpsCallable(europeFunctions, 'processEuropeData');

// Use custom domain
const customFunctions = getFunctions(app, 'https://api.mycompany.com');
const customFunction = httpsCallable(customFunctions, 'specialEndpoint');
```

### Function Call Options

Configure function calls with custom options.

```typescript
import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

// Function with timeout
const longRunningFunction = httpsCallable(functions, 'longProcess', {
  timeout: 120000 // 2 minutes
});

// Function with limited-use App Check tokens
const secureFunction = httpsCallable(functions, 'sensitiveOperation', {
  limitedUseAppCheckTokens: true
});

try {
  const result = await longRunningFunction({ taskId: 'task123' });
  console.log('Long process completed:', result.data);
} catch (error) {
  if (error.code === 'functions/deadline-exceeded') {
    console.error('Function timed out');
  }
}
```

## Server-Side Function Example

Example of the corresponding server-side function:

```javascript
// functions/index.js
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { getFirestore } = require('firebase-admin/firestore');

exports.addMessage = onCall(async (request) => {
  // Check authentication
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  // Validate input
  const { text, userId } = request.data;
  if (!text || typeof text !== 'string') {
    throw new HttpsError('invalid-argument', 'Message text is required');
  }
  
  // Process request
  const db = getFirestore();
  const messageDoc = await db.collection('messages').add({
    text: text,
    userId: userId || request.auth.uid,
    timestamp: Date.now(),
    createdAt: new Date()
  });
  
  // Return result
  return {
    messageId: messageDoc.id,
    timestamp: Date.now()
  };
});
```

## Integration with Other Firebase Services

Cloud Functions can interact with all Firebase services:

```typescript
// Client-side: Trigger image processing
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const functions = getFunctions();
const storage = getStorage();

const processImage = httpsCallable(functions, 'processImage');

// Upload image
const imageRef = ref(storage, 'images/original/photo.jpg');
const uploadResult = await uploadBytes(imageRef, imageFile);

// Trigger server-side processing
const processingResult = await processImage({
  imagePath: uploadResult.ref.fullPath,
  operations: ['resize', 'optimize']
});

console.log('Processing completed:', processingResult.data);
```

## Best Practices

### Input Validation

Always validate input data on both client and server:

```typescript
// Client-side validation
const createUser = httpsCallable<CreateUserRequest, CreateUserResponse>(
  functions,
  'createUser'
);

interface CreateUserRequest {
  email: string;
  displayName: string;
  age: number;
}

interface CreateUserResponse {
  userId: string;
  success: boolean;
}

// Validate before calling
function validateUserData(userData: CreateUserRequest): boolean {
  return (
    userData.email &&
    userData.email.includes('@') &&
    userData.displayName &&
    userData.displayName.length > 0 &&
    userData.age >= 0
  );
}

if (validateUserData(userData)) {
  const result = await createUser(userData);
  console.log('User created:', result.data.userId);
} else {
  console.error('Invalid user data');
}
```

### Error Recovery

Implement retry logic for transient errors:

```typescript
async function callFunctionWithRetry<T>(
  fn: HttpsCallable,
  data: any,
  maxRetries: number = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await fn(data);
      return result.data;
    } catch (error) {
      if (error.code === 'functions/unavailable' && i < maxRetries - 1) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      throw error;
    }
  }
}

// Usage
try {
  const result = await callFunctionWithRetry(unreliableFunction, { data: 'test' });
  console.log('Success:', result);
} catch (error) {
  console.error('Failed after retries:', error);
}
```