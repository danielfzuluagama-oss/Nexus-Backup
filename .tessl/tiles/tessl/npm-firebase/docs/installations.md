# Firebase Installations

Firebase Installations manages unique installation identifiers (FIDs) for each installed instance of your Firebase app. These identifiers are used internally by Firebase services for analytics, messaging, and other features that need to track app installations.

## Capabilities

### Installations Service

Initialize and manage Firebase Installations service for your app.

```typescript { .api }
/**
 * Gets the Installations service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Installations service instance
 */
function getInstallations(app?: FirebaseApp): Installations;

interface Installations {
  /** Firebase app instance */
  readonly app: FirebaseApp;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getInstallations } from 'firebase/installations';

const app = initializeApp(firebaseConfig);
const installations = getInstallations(app);
```

### Installation ID Management

Retrieve and manage unique Firebase Installation IDs (FIDs) for the app instance.

```typescript { .api }
/**
 * Creates a Firebase Installation if there isn't one for the app and returns the Installation ID
 * @param installations - The Installations instance
 * @returns Promise resolving to the installation ID string
 */
function getId(installations: Installations): Promise<string>;

/**
 * Sets a callback that gets called when Installation ID changes
 * @param installations - The Installations instance
 * @param callback - Function called when FID changes
 * @returns Unsubscribe function to remove the callback
 */
function onIdChange(
  installations: Installations,
  callback: IdChangeCallbackFn
): IdChangeUnsubscribeFn;

/**
 * Deletes the Firebase Installation and all associated data
 * @param installations - The Installations instance
 * @returns Promise that resolves when deletion is complete
 */
function deleteInstallations(installations: Installations): Promise<void>;

type IdChangeCallbackFn = (installationId: string) => void;
type IdChangeUnsubscribeFn = () => void;
```

**Usage Examples:**

```typescript
import { getInstallations, getId, onIdChange, deleteInstallations } from 'firebase/installations';

const installations = getInstallations();

// Get the installation ID
const installationId = await getId(installations);
console.log('Installation ID:', installationId);

// Listen for ID changes (rare, but can happen during app updates)
const unsubscribe = onIdChange(installations, (newId) => {
  console.log('Installation ID changed to:', newId);
  // Update your app's tracking or analytics
});

// Remove the listener when no longer needed
unsubscribe();

// Delete installation (removes all local data)
await deleteInstallations(installations);
```

### Authentication Tokens

Retrieve Firebase Installation authentication tokens used by other Firebase services.

```typescript { .api }
/**
 * Returns a Firebase Installations auth token for the current installation
 * @param installations - The Installations instance
 * @param forceRefresh - Force refresh regardless of token expiration (default: false)
 * @returns Promise resolving to the authentication token string
 */
function getToken(
  installations: Installations,
  forceRefresh?: boolean
): Promise<string>;
```

**Usage Examples:**

```typescript
import { getInstallations, getToken } from 'firebase/installations';

const installations = getInstallations();

// Get current auth token
const token = await getToken(installations);
console.log('Auth token:', token);

// Force refresh the token
const freshToken = await getToken(installations, true);
console.log('Fresh token:', freshToken);
```

## Common Use Cases

### Analytics and Tracking

Firebase Installations provides persistent identifiers for analytics and user tracking:

```typescript
import { getInstallations, getId } from 'firebase/installations';

const installations = getInstallations();
const installationId = await getId(installations);

// Use installation ID for analytics
analytics.setUserId(installationId);
```

### Service Authentication

Other Firebase services use installation tokens for authentication:

```typescript
import { getInstallations, getToken } from 'firebase/installations';

const installations = getInstallations();

// This is typically handled automatically by other Firebase services
// but can be used for custom server communication
const authToken = await getToken(installations);

fetch('/api/firebase-endpoint', {
  headers: {
    'Firebase-Instance-ID-Token': authToken
  }
});
```

### Installation Lifecycle Management

Monitor and manage the installation lifecycle:

```typescript
import { 
  getInstallations, 
  getId, 
  onIdChange, 
  deleteInstallations 
} from 'firebase/installations';

const installations = getInstallations();

// Initial setup
const currentId = await getId(installations);
console.log('Current installation:', currentId);

// Monitor changes
const unsubscribe = onIdChange(installations, (newId) => {
  console.log('Installation updated:', newId);
  // Notify analytics services of the change
  updateAnalyticsUser(newId);
});

// Cleanup when user uninstalls or resets app
async function cleanupInstallation() {
  unsubscribe();
  await deleteInstallations(installations);
  console.log('Installation data cleared');
}
```

## Security and Privacy

### Installation ID Properties

- **Persistent**: Survives app updates and restarts
- **Anonymous**: Not tied to user identity
- **Resettable**: Can be deleted and regenerated
- **Unique**: Each app installation gets a unique ID

### Data Management

```typescript
// Clear installation data for privacy compliance
await deleteInstallations(installations);

// Installation will be recreated on next use
const newId = await getId(installations);
```

### Token Security

Installation tokens are:
- **Short-lived**: Automatically refreshed as needed
- **Service-specific**: Used only for Firebase service authentication
- **Secure**: Transmitted over HTTPS only

## Error Handling

Handle common installation errors:

```typescript
import { 
  getInstallations, 
  getId, 
  deleteInstallations 
} from 'firebase/installations';

try {
  const installations = getInstallations();
  const id = await getId(installations);
  console.log('Installation ID:', id);
} catch (error) {
  if (error.code === 'installations/app-offline') {
    console.log('App is offline, using cached installation');
  } else if (error.code === 'installations/delete-pending-registration') {
    console.log('Cannot delete during registration');
  } else {
    console.error('Installation error:', error);
  }
}
```

## Integration with Other Services

Firebase Installations works automatically with other Firebase services:

- **Analytics**: Uses installation ID for user tracking
- **Messaging**: Uses installation tokens for push notifications
- **Remote Config**: Uses installation ID for configuration targeting
- **Performance**: Uses installation ID for performance tracking

No manual integration is typically required - other Firebase services will automatically use the Installations service when needed.