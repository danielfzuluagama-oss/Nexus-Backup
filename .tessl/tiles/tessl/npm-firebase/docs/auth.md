# Firebase Authentication

Comprehensive user authentication and identity management system supporting multiple authentication providers, user management, and security features.

## Capabilities

### Authentication Service

Initialize and configure Firebase Authentication.

```typescript { .api }
/**
 * Gets the Auth service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Auth service instance
 */
function getAuth(app?: FirebaseApp): Auth;

/**
 * Initialize Auth with custom dependencies and settings
 * @param app - Firebase app instance
 * @param deps - Optional dependencies for custom initialization
 * @returns Auth service instance
 */
function initializeAuth(app: FirebaseApp, deps?: Dependencies): Auth;

/**
 * Connects to the Auth emulator for development and testing
 * @param auth - Auth service instance
 * @param url - Emulator URL (e.g., 'http://localhost:9099')
 * @param options - Optional emulator configuration
 */
function connectAuthEmulator(auth: Auth, url: string, options?: object): void;

interface Auth {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Currently signed-in user, null if no user */
  readonly currentUser: User | null;
  /** Language code for localization */
  languageCode: string | null;
  /** Tenant ID for multi-tenancy support */
  tenantId: string | null;
  /** Configuration settings */
  readonly config: Config;
  /** Custom claims resolver */
  readonly settings: AuthSettings;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Connect to emulator in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}
```

### Email/Password Authentication

Standard email and password authentication methods.

```typescript { .api }
/**
 * Signs in a user with email and password
 * @param auth - Auth service instance
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to user credential
 */
function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;

/**
 * Creates a new user account with email and password
 * @param auth - Auth service instance
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to user credential
 */
function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;

/**
 * Sends a password reset email to the user
 * @param auth - Auth service instance
 * @param email - User's email address
 * @param actionCodeSettings - Optional email action settings
 * @returns Promise that resolves when email is sent
 */
function sendPasswordResetEmail(auth: Auth, email: string, actionCodeSettings?: ActionCodeSettings): Promise<void>;

/**
 * Sends an email verification to the current user
 * @param user - User instance
 * @param actionCodeSettings - Optional email action settings
 * @returns Promise that resolves when email is sent
 */
function sendEmailVerification(user: User, actionCodeSettings?: ActionCodeSettings): Promise<void>;

interface ActionCodeSettings {
  /** URL to redirect to after email action */
  url: string;
  /** Whether to handle the action in the app */
  handleCodeInApp?: boolean;
  /** iOS app configuration */
  iOS?: {
    bundleId: string;
  };
  /** Android app configuration */
  android?: {
    packageName: string;
    installApp?: boolean;
    minimumVersion?: string;
  };
  /** Dynamic link domain */
  dynamicLinkDomain?: string;
}
```

**Usage Examples:**

```typescript
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

// Create new user
try {
  const userCredential = await createUserWithEmailAndPassword(auth, 'user@example.com', 'securePassword123');
  console.log('User created:', userCredential.user.uid);
} catch (error) {
  console.error('Error creating user:', error.message);
}

// Sign in existing user
try {
  const userCredential = await signInWithEmailAndPassword(auth, 'user@example.com', 'securePassword123');
  console.log('User signed in:', userCredential.user.email);
} catch (error) {
  console.error('Error signing in:', error.message);
}

// Send password reset email
await sendPasswordResetEmail(auth, 'user@example.com', {
  url: 'https://myapp.com/reset-password',
  handleCodeInApp: true
});
```

### OAuth Authentication

Social login with popular OAuth providers.

```typescript { .api }
/**
 * Signs in with a popup window using the specified provider
 * @param auth - Auth service instance
 * @param provider - OAuth provider instance
 * @returns Promise resolving to user credential
 */
function signInWithPopup(auth: Auth, provider: AuthProvider): Promise<UserCredential>;

/**
 * Signs in with redirect using the specified provider
 * @param auth - Auth service instance
 * @param provider - OAuth provider instance
 * @returns Promise that never resolves (page redirects)
 */
function signInWithRedirect(auth: Auth, provider: AuthProvider): Promise<never>;

/**
 * Gets the result of a redirect-based sign-in
 * @param auth - Auth service instance
 * @returns Promise resolving to user credential or null
 */
function getRedirectResult(auth: Auth): Promise<UserCredential | null>;

/**
 * Signs in with a credential obtained from an OAuth provider
 * @param auth - Auth service instance
 * @param credential - OAuth credential
 * @returns Promise resolving to user credential
 */
function signInWithCredential(auth: Auth, credential: AuthCredential): Promise<UserCredential>;

class GoogleAuthProvider implements AuthProvider {
  static readonly GOOGLE_SIGN_IN_METHOD: string;
  static readonly PROVIDER_ID: string;
  
  /** Create credential from Google access token */
  static credential(idToken?: string | null, accessToken?: string | null): OAuthCredential;
  /** Create credential from sign-in result */
  static credentialFromResult(userCredential: UserCredential): OAuthCredential | null;
  /** Create credential from error */
  static credentialFromError(error: FirebaseError): OAuthCredential | null;
  
  /** Add OAuth scope */
  addScope(scope: string): AuthProvider;
  /** Set custom OAuth parameters */
  setCustomParameters(customOAuthParameters: CustomParameters): AuthProvider;
}

class FacebookAuthProvider implements AuthProvider {
  static readonly FACEBOOK_SIGN_IN_METHOD: string;
  static readonly PROVIDER_ID: string;
  
  static credential(accessToken: string): OAuthCredential;
  static credentialFromResult(userCredential: UserCredential): OAuthCredential | null;
  static credentialFromError(error: FirebaseError): OAuthCredential | null;
  
  addScope(scope: string): AuthProvider;
  setCustomParameters(customOAuthParameters: CustomParameters): AuthProvider;
}

class TwitterAuthProvider implements AuthProvider {
  static readonly TWITTER_SIGN_IN_METHOD: string;
  static readonly PROVIDER_ID: string;
  
  static credential(token: string, secret: string): OAuthCredential;
  static credentialFromResult(userCredential: UserCredential): OAuthCredential | null;
  static credentialFromError(error: FirebaseError): OAuthCredential | null;
  
  setCustomParameters(customOAuthParameters: CustomParameters): AuthProvider;
}

interface CustomParameters {
  [key: string]: string;
}
```

**Usage Examples:**

```typescript
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const auth = getAuth();

// Google sign-in with popup
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

try {
  const result = await signInWithPopup(auth, googleProvider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const user = result.user;
  console.log('Google sign-in successful:', user.displayName);
} catch (error) {
  console.error('Google sign-in error:', error.message);
}

// Facebook sign-in
const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope('email');

const facebookResult = await signInWithPopup(auth, facebookProvider);
```

### User Management

Manage user profiles, credentials, and account operations.

```typescript { .api }
/**
 * Updates the user's profile information
 * @param user - User instance
 * @param profile - Profile data to update
 * @returns Promise that resolves when update is complete
 */
function updateProfile(user: User, profile: { displayName?: string | null; photoURL?: string | null }): Promise<void>;

/**
 * Updates the user's email address
 * @param user - User instance
 * @param newEmail - New email address
 * @returns Promise that resolves when update is complete
 */
function updateEmail(user: User, newEmail: string): Promise<void>;

/**
 * Updates the user's password
 * @param user - User instance
 * @param newPassword - New password
 * @returns Promise that resolves when update is complete
 */
function updatePassword(user: User, newPassword: string): Promise<void>;

/**
 * Deletes the user's account
 * @param user - User instance
 * @returns Promise that resolves when deletion is complete
 */
function deleteUser(user: User): Promise<void>;

/**
 * Reloads the user's profile data from the server
 * @param user - User instance
 * @returns Promise that resolves when reload is complete
 */
function reload(user: User): Promise<void>;

interface User {
  /** Unique user identifier */
  readonly uid: string;
  /** User's email address */
  readonly email: string | null;
  /** User's display name */
  readonly displayName: string | null;
  /** User's profile photo URL */
  readonly photoURL: string | null;
  /** Phone number */
  readonly phoneNumber: string | null;
  /** Whether email is verified */
  readonly emailVerified: boolean;
  /** Whether user is anonymous */
  readonly isAnonymous: boolean;
  /** Provider-specific data */
  readonly providerData: UserInfo[];
  /** User creation timestamp */
  readonly metadata: UserMetadata;
  /** Tenant ID for multi-tenancy */
  readonly tenantId: string | null;
  /** Refresh token */
  readonly refreshToken: string;
  
  /** Delete this user account */
  delete(): Promise<void>;
  /** Get ID token for this user */
  getIdToken(forceRefresh?: boolean): Promise<string>;
  /** Get ID token result with claims */
  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;
  /** Reload user data from server */
  reload(): Promise<void>;
  /** Convert to JSON */
  toJSON(): object;
}

interface UserMetadata {
  /** Account creation time */
  readonly creationTime?: string;
  /** Last sign-in time */
  readonly lastSignInTime?: string;
}
```

**Usage Examples:**

```typescript
import { getAuth, updateProfile, updateEmail, updatePassword } from 'firebase/auth';

const auth = getAuth();
const user = auth.currentUser;

if (user) {
  // Update profile
  await updateProfile(user, {
    displayName: 'John Doe',
    photoURL: 'https://example.com/profile.jpg'
  });

  // Update email
  await updateEmail(user, 'newemail@example.com');

  // Update password
  await updatePassword(user, 'newSecurePassword123');

  // Get user token
  const token = await user.getIdToken();
  console.log('User token:', token);
}
```

### Authentication State Management

Monitor and react to authentication state changes.

```typescript { .api }
/**
 * Adds an observer for authentication state changes
 * @param auth - Auth service instance
 * @param nextOrObserver - Callback function or observer object
 * @param error - Optional error callback
 * @param completed - Optional completion callback
 * @returns Function to unsubscribe the observer
 */
function onAuthStateChanged(
  auth: Auth,
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
): Unsubscribe;

/**
 * Adds an observer for ID token changes
 * @param auth - Auth service instance
 * @param nextOrObserver - Callback function or observer object
 * @param error - Optional error callback
 * @param completed - Optional completion callback
 * @returns Function to unsubscribe the observer
 */
function onIdTokenChanged(
  auth: Auth,
  nextOrObserver: NextOrObserver<User>,
  error?: ErrorFn,
  completed?: CompleteFn
): Unsubscribe;

/**
 * Signs out the current user
 * @param auth - Auth service instance
 * @returns Promise that resolves when sign-out is complete
 */
function signOut(auth: Auth): Promise<void>;

type NextOrObserver<T> = ((value: T) => void) | Observer<T>;
type ErrorFn = (error: Error) => void;
type CompleteFn = () => void;
type Unsubscribe = () => void;

interface Observer<T> {
  next?: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}
```

**Usage Examples:**

```typescript
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth();

// Listen for auth state changes
const unsubscribe = onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user.email);
    // User is signed in
  } else {
    console.log('User is signed out');
    // User is signed out
  }
});

// Sign out user
await signOut(auth);

// Clean up listener when component unmounts
unsubscribe();
```

### Anonymous Authentication

Temporary authentication for users who don't want to create accounts.

```typescript { .api }
/**
 * Signs in anonymously and creates an anonymous user
 * @param auth - Auth service instance
 * @returns Promise resolving to user credential
 */
function signInAnonymously(auth: Auth): Promise<UserCredential>;

/**
 * Links an anonymous account with email/password credentials
 * @param user - Anonymous user instance
 * @param credential - Email/password credential
 * @returns Promise resolving to user credential
 */
function linkWithCredential(user: User, credential: AuthCredential): Promise<UserCredential>;

/**
 * Links an anonymous account using popup OAuth flow
 * @param user - Anonymous user instance
 * @param provider - OAuth provider
 * @returns Promise resolving to user credential
 */
function linkWithPopup(user: User, provider: AuthProvider): Promise<UserCredential>;
```

**Usage Examples:**

```typescript
import { getAuth, signInAnonymously, linkWithCredential, EmailAuthProvider } from 'firebase/auth';

const auth = getAuth();

// Sign in anonymously
const anonymousResult = await signInAnonymously(auth);
console.log('Anonymous user:', anonymousResult.user.uid);

// Later, convert anonymous account to permanent account
const credential = EmailAuthProvider.credential('user@example.com', 'password123');
const linkedResult = await linkWithCredential(anonymousResult.user, credential);
console.log('Account linked:', linkedResult.user.email);
```

### Multi-Factor Authentication

Enhanced security with multiple authentication factors.

```typescript { .api }
/**
 * Gets the multi-factor object for a user
 * @param user - User instance
 * @returns MultiFactorUser instance
 */
function multiFactor(user: User): MultiFactorUser;

interface MultiFactorUser {
  /** List of enrolled factors */
  readonly enrolledFactors: MultiFactorInfo[];
  
  /** Enroll a new factor */
  enroll(assertion: MultiFactorAssertion, session?: MultiFactorSession): Promise<void>;
  /** Unenroll an existing factor */
  unenroll(option: MultiFactorInfo | string): Promise<void>;
  /** Get enrollment session */
  getSession(): Promise<MultiFactorSession>;
}

class PhoneAuthProvider {
  static readonly PHONE_SIGN_IN_METHOD: string;
  static readonly PROVIDER_ID: string;
  
  /** Create credential from verification */
  static credential(verificationId: string, verificationCode: string): PhoneAuthCredential;
  /** Create credential from multi-factor info */
  static credentialFromResult(userCredential: UserCredential): PhoneAuthCredential | null;
}
```

### User Credential Types

```typescript { .api }
interface UserCredential {
  /** The user account */
  readonly user: User;
  /** The credential used for authentication */
  readonly credential: AuthCredential | null;
  /** Type of operation performed */
  readonly operationType?: string;
  /** ID of the provider used */
  readonly providerId?: string;
}

interface AuthCredential {
  /** Provider ID */
  readonly providerId: string;
  /** Sign-in method */
  readonly signInMethod: string;
  
  /** Convert to JSON */
  toJSON(): object;
}

interface OAuthCredential extends AuthCredential {
  /** OAuth access token */
  readonly accessToken?: string;
  /** OAuth ID token */
  readonly idToken?: string;
  /** OAuth secret (Twitter only) */
  readonly secret?: string;
  /** Refresh token */
  readonly refreshToken?: string;
}
```

## Platform-Specific Features

### Cordova/PhoneGap Support

```typescript
// Import Cordova-specific auth module
import { getAuth } from 'firebase/auth/cordova';
```

### Web Extension Support

```typescript
// Import web extension-specific auth module
import { getAuth } from 'firebase/auth/web-extension';
```

## Error Handling

Firebase Auth provides specific error codes for different scenarios:

```typescript
import { AuthErrorCodes } from 'firebase/auth';

try {
  await signInWithEmailAndPassword(auth, email, password);
} catch (error) {
  switch (error.code) {
    case 'auth/user-not-found':
      console.log('No user found with this email');
      break;
    case 'auth/wrong-password':
      console.log('Incorrect password');
      break;
    case 'auth/invalid-email':
      console.log('Invalid email address');
      break;
    default:
      console.log('Authentication error:', error.message);
  }
}
```