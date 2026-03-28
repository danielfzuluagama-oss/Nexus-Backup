# Firebase Authentication - Cordova

Firebase Authentication for Apache Cordova/PhoneGap applications with platform-specific integrations and native provider support.

## Capabilities

### Cordova Authentication Service

```typescript { .api }
/**
 * Gets the Auth service instance optimized for Cordova
 * @param app - Firebase app instance, uses default if not provided
 * @returns Auth service instance with Cordova-specific features
 */
function getAuth(app?: FirebaseApp): Auth;

/**
 * Initialize Auth with Cordova-specific dependencies
 * @param app - Firebase app instance
 * @param deps - Cordova-specific dependencies
 * @returns Auth service instance
 */
function initializeAuth(app: FirebaseApp, deps: CordovaDependencies): Auth;

interface CordovaDependencies {
  /** Custom persistence implementation */
  persistence?: Persistence[];
  /** Cordova-specific popup redirect resolver */
  popupRedirectResolver?: PopupRedirectResolver;
}
```

### OAuth Provider Integration

```typescript { .api }
/**
 * Signs in using Google OAuth with native Cordova integration
 * @param auth - Auth service instance
 * @param provider - Google auth provider
 * @returns Promise resolving to user credential
 */
function signInWithRedirect(auth: Auth, provider: GoogleAuthProvider): Promise<void>;

/**
 * Gets redirect result after OAuth flow completion
 * @param auth - Auth service instance
 * @returns Promise resolving to user credential or null
 */
function getRedirectResult(auth: Auth): Promise<UserCredential | null>;
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth/cordova';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google sign-in with native Cordova integration
const provider = new GoogleAuthProvider();
await signInWithRedirect(auth, provider);

// Handle redirect result
const result = await getRedirectResult(auth);
if (result) {
  console.log('Signed in user:', result.user);
}
```