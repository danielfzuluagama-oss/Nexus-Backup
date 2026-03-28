# Firebase App Management

Core Firebase app initialization and management functionality. Every Firebase service requires an initialized app instance.

## Capabilities

### App Initialization

Initialize a Firebase app with configuration options.

```typescript { .api }
/**
 * Creates and initializes a Firebase app instance
 * @param options - Firebase configuration object
 * @param name - Optional app name for multiple apps
 * @returns Initialized Firebase app instance
 */
function initializeApp(options: FirebaseOptions, name?: string | FirebaseAppSettings): FirebaseApp;

/**
 * Initialize a Firebase app for server-side use
 * @param options - Firebase configuration or existing app
 * @param config - Server-specific configuration
 * @returns Server Firebase app instance
 */
function initializeServerApp(options: FirebaseOptions | FirebaseApp, config?: FirebaseServerAppSettings): FirebaseServerApp;

interface FirebaseOptions {
  /** Firebase API key */
  apiKey?: string;
  /** Authentication domain */
  authDomain?: string;
  /** Realtime Database URL */
  databaseURL?: string;
  /** Cloud Firestore project ID */
  projectId?: string;
  /** Storage bucket URL */
  storageBucket?: string;
  /** Cloud Messaging sender ID */
  messagingSenderId?: string;
  /** Firebase app ID */
  appId?: string;
  /** Analytics measurement ID */
  measurementId?: string;
}

interface FirebaseAppSettings {
  name?: string;
  automaticDataCollectionEnabled?: boolean;
}

interface FirebaseServerAppSettings {
  authIdToken?: string;
  appCheckToken?: string;
  releaseOnDeref?: boolean;
}

interface FirebaseApp {
  /** App name identifier */
  readonly name: string;
  /** App configuration options */
  readonly options: FirebaseOptions;
  /** Whether automatic data collection is enabled */
  automaticDataCollectionEnabled: boolean;
}

interface FirebaseServerApp extends FirebaseApp {
  /** Server-specific properties */
  readonly settings: FirebaseServerAppSettings;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';

// Basic initialization
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "my-project.firebaseapp.com",
  projectId: "my-project",
  storageBucket: "my-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);

// Named app for multiple projects
const secondaryApp = initializeApp(firebaseConfig, "secondary");

// Server-side initialization
import { initializeServerApp } from 'firebase/app';

const serverApp = initializeServerApp(firebaseConfig, {
  authIdToken: 'user-auth-token',
  releaseOnDeref: true
});
```

### App Management

Retrieve and manage existing Firebase app instances.

```typescript { .api }
/**
 * Retrieves an existing Firebase app instance
 * @param name - Optional app name, defaults to '[DEFAULT]'
 * @returns Firebase app instance
 * @throws FirebaseError if app doesn't exist
 */
function getApp(name?: string): FirebaseApp;

/**
 * Returns array of all initialized Firebase apps
 * @returns Array of all Firebase app instances
 */
function getApps(): FirebaseApp[];

/**
 * Deletes a Firebase app and frees associated resources
 * @param app - Firebase app instance to delete
 * @returns Promise that resolves when deletion is complete
 */
function deleteApp(app: FirebaseApp): Promise<void>;
```

**Usage Examples:**

```typescript
import { getApp, getApps, deleteApp } from 'firebase/app';

// Get default app
const app = getApp();

// Get named app
const secondaryApp = getApp('secondary');

// List all apps
const allApps = getApps();
console.log(`${allApps.length} Firebase apps initialized`);

// Clean up app when done
await deleteApp(secondaryApp);
```

### Logging and Version Management

Configure logging and register library versions.

```typescript { .api }
/**
 * Registers a library version for telemetry and debugging
 * @param libraryKeyOrName - Library identifier
 * @param version - Library version string
 * @param variant - Optional variant identifier
 */
function registerVersion(libraryKeyOrName: string, version: string, variant?: string): void;

/**
 * Sets a custom log handler for Firebase SDK logs
 * @param logCallback - Function to handle log messages, null to reset
 * @param options - Optional logging configuration
 */
function onLog(logCallback: LogCallback | null, options?: LogOptions): void;

/**
 * Sets the log level for all Firebase SDKs
 * @param logLevel - Minimum log level to output
 */
function setLogLevel(logLevel: LogLevelString): void;

type LogCallback = (callbackParams: LogCallbackParams) => void;
type LogLevelString = 'debug' | 'verbose' | 'info' | 'warn' | 'error' | 'silent';

interface LogCallbackParams {
  level: LogLevelString;
  message: string;
  args: any[];
  type: string;
}

interface LogOptions {
  level?: LogLevelString;
}
```

**Usage Examples:**

```typescript
import { registerVersion, onLog, setLogLevel } from 'firebase/app';

// Register custom library version
registerVersion('my-firebase-wrapper', '2.1.0', 'react');

// Set up custom logging
onLog((params) => {
  console.log(`[${params.level}] ${params.message}`, ...params.args);
}, { level: 'debug' });

// Set global log level
setLogLevel('warn'); // Only show warnings and errors
```

### Constants

```typescript { .api }
/** Current Firebase SDK version */
const SDK_VERSION: string;
```

### Error Types

```typescript { .api }
class FirebaseError extends Error {
  /** Error code identifying the specific error */
  readonly code: string;
  /** Human-readable error message */
  readonly message: string;
  /** Error name, typically 'FirebaseError' */
  readonly name: string;
  /** Optional additional error details */
  readonly customData?: Record<string, unknown>;
}
```

## Multi-App Usage Pattern

Firebase supports multiple app instances for complex applications:

```typescript
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Primary app
const primaryApp = initializeApp(primaryConfig);
const primaryAuth = getAuth(primaryApp);
const primaryDb = getFirestore(primaryApp);

// Secondary app for different project
const secondaryApp = initializeApp(secondaryConfig, 'secondary');
const secondaryAuth = getAuth(secondaryApp);
const secondaryDb = getFirestore(secondaryApp);

// Access apps later
const primary = getApp(); // Default app
const secondary = getApp('secondary'); // Named app
```

## Environment Detection

Firebase automatically detects the runtime environment and configures itself appropriately for:

- Web browsers
- Node.js servers
- React Native applications
- Web extensions
- Cordova/PhoneGap applications

No additional configuration is typically required for environment-specific behavior.