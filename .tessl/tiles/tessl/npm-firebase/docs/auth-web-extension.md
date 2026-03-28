# Firebase Authentication - Web Extension

Firebase Authentication for browser web extensions with specialized handling for extension environments and content security policies.

## Capabilities

### Web Extension Authentication Service

```typescript { .api }
/**
 * Gets the Auth service instance optimized for web extensions
 * @param app - Firebase app instance, uses default if not provided
 * @returns Auth service instance configured for extension environment
 */
function getAuth(app?: FirebaseApp): Auth;

/**
 * Initialize Auth with web extension-specific dependencies
 * @param app - Firebase app instance
 * @param deps - Extension-specific dependencies
 * @returns Auth service instance
 */
function initializeAuth(app: FirebaseApp, deps: WebExtensionDependencies): Auth;

interface WebExtensionDependencies {
  /** Custom persistence for extension storage */
  persistence?: Persistence[];
  /** Extension-specific popup redirect resolver */
  popupRedirectResolver?: PopupRedirectResolver;
}
```

### Extension-Safe Authentication

```typescript { .api }
/**
 * Signs in using popup flow optimized for web extensions
 * @param auth - Auth service instance
 * @param provider - OAuth provider
 * @returns Promise resolving to user credential
 */
function signInWithPopup(auth: Auth, provider: AuthProvider): Promise<UserCredential>;

/**
 * Links additional provider to existing user account via popup
 * @param user - Current user
 * @param provider - Additional provider to link
 * @returns Promise resolving to user credential
 */
function linkWithPopup(user: User, provider: AuthProvider): Promise<UserCredential>;
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth/web-extension';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign in with popup (CSP-compliant for extensions)
const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
console.log('Extension user:', result.user);
```