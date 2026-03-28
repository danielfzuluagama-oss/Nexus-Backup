# App Check

App attestation service that protects your backend resources from abuse. Verifies that requests come from your authentic app.

## Capabilities

### App Check Service

```typescript { .api }
/**
 * Initializes App Check with provider configuration
 * @param app - Firebase app instance
 * @param options - App Check configuration options
 * @returns App Check service instance
 */
function initializeAppCheck(app: FirebaseApp, options: AppCheckOptions): AppCheck;

interface AppCheck {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Whether automatic token refresh is enabled */
  readonly isTokenAutoRefreshEnabled: boolean;
}

interface AppCheckOptions {
  /** App Check provider instance */
  provider: AppCheckProvider;
  /** Whether to automatically refresh tokens */
  isTokenAutoRefreshEnabled?: boolean;
}
```

### Token Management

```typescript { .api }
/**
 * Gets an App Check token
 * @param appCheckInstance - App Check service instance
 * @param forceRefresh - Whether to force token refresh
 * @returns Promise resolving to token result
 */
function getToken(appCheckInstance: AppCheck, forceRefresh?: boolean): Promise<AppCheckTokenResult>;

/**
 * Gets a limited-use App Check token
 * @param appCheckInstance - App Check service instance
 * @returns Promise resolving to token result
 */
function getLimitedUseToken(appCheckInstance: AppCheck): Promise<AppCheckTokenResult>;

/**
 * Adds a listener for token changes
 * @param appCheckInstance - App Check service instance
 * @param observer - Token change observer
 * @param onError - Optional error callback
 * @param onCompletion - Optional completion callback
 * @returns Function to unsubscribe the listener
 */
function onTokenChanged(
  appCheckInstance: AppCheck,
  observer: PartialObserver<AppCheckTokenResult>,
  onError?: (error: Error) => void,
  onCompletion?: () => void
): Unsubscribe;

interface AppCheckTokenResult {
  /** App Check token */
  readonly token: string;
  /** Token expiration time in milliseconds */
  readonly expireTimeMillis: number;
}

type Unsubscribe = () => void;
```

### Provider Classes

```typescript { .api }
/**
 * reCAPTCHA v3 App Check provider
 */
class ReCaptchaV3Provider implements AppCheckProvider {
  /**
   * Creates a reCAPTCHA v3 provider
   * @param siteKey - reCAPTCHA v3 site key
   */
  constructor(siteKey: string);
}

/**
 * reCAPTCHA Enterprise App Check provider
 */
class ReCaptchaEnterpriseProvider implements AppCheckProvider {
  /**
   * Creates a reCAPTCHA Enterprise provider
   * @param siteKey - reCAPTCHA Enterprise site key
   */
  constructor(siteKey: string);
}

/**
 * Custom App Check provider for advanced use cases
 */
abstract class CustomProvider implements AppCheckProvider {
  /**
   * Gets a token from the custom provider
   * @returns Promise resolving to custom token
   */
  abstract getToken(): Promise<CustomProviderToken>;
}

interface AppCheckProvider {
  /** Provider identifier */
  readonly providerId: string;
}

interface CustomProviderToken {
  /** Custom token string */
  token: string;
  /** Token expiration time */
  expireTimeMillis: number;
}
```

**Usage Examples:**

```typescript
import { initializeApp } from 'firebase/app';
import { 
  initializeAppCheck, 
  ReCaptchaV3Provider, 
  getToken, 
  onTokenChanged 
} from 'firebase/app-check';

const app = initializeApp(firebaseConfig);

// Initialize App Check with reCAPTCHA v3
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcX...-your-site-key'),
  isTokenAutoRefreshEnabled: true
});

// Get App Check token
try {
  const tokenResult = await getToken(appCheck);
  console.log('App Check token:', tokenResult.token);
  console.log('Expires at:', new Date(tokenResult.expireTimeMillis));
} catch (error) {
  console.error('Failed to get App Check token:', error);
}

// Listen for token changes
const unsubscribe = onTokenChanged(appCheck, (tokenResult) => {
  console.log('New App Check token:', tokenResult.token);
});

// Clean up listener
unsubscribe();
```

### reCAPTCHA Enterprise Integration

```typescript
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from 'firebase/app-check';

// Initialize with reCAPTCHA Enterprise
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider('6LcX...-your-enterprise-site-key'),
  isTokenAutoRefreshEnabled: true
});

// Enterprise provider offers additional security features
// and better analytics in Google Cloud Console
```

### Custom Provider Implementation

```typescript
import { initializeAppCheck, CustomProvider } from 'firebase/app-check';

class MyCustomAppCheckProvider extends CustomProvider {
  constructor(private apiKey: string) {
    super();
  }
  
  async getToken(): Promise<CustomProviderToken> {
    try {
      // Implement your custom token generation logic
      const response = await fetch('/api/app-check-token', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          // Add other attestation data
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to get custom token');
      }
      
      const data = await response.json();
      
      return {
        token: data.token,
        expireTimeMillis: data.expireTime
      };
    } catch (error) {
      console.error('Custom provider token generation failed:', error);
      throw error;
    }
  }
}

// Use custom provider
const customProvider = new MyCustomAppCheckProvider('your-api-key');
const appCheck = initializeAppCheck(app, {
  provider: customProvider,
  isTokenAutoRefreshEnabled: true
});
```

### Token Lifecycle Management

```typescript
class AppCheckTokenManager {
  private appCheck: AppCheck;
  private tokenCache: AppCheckTokenResult | null = null;
  private refreshTimer: NodeJS.Timeout | null = null;
  
  constructor(appCheck: AppCheck) {
    this.appCheck = appCheck;
    this.setupTokenRefresh();
  }
  
  private setupTokenRefresh(): void {
    // Listen for token changes
    onTokenChanged(this.appCheck, (tokenResult) => {
      this.tokenCache = tokenResult;
      this.scheduleTokenRefresh(tokenResult);
    });
  }
  
  private scheduleTokenRefresh(tokenResult: AppCheckTokenResult): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    
    // Refresh token 5 minutes before expiration
    const refreshTime = tokenResult.expireTimeMillis - Date.now() - (5 * 60 * 1000);
    
    if (refreshTime > 0) {
      this.refreshTimer = setTimeout(async () => {
        try {
          await this.refreshToken();
        } catch (error) {
          console.error('Failed to refresh App Check token:', error);
        }
      }, refreshTime);
    }
  }
  
  async getValidToken(): Promise<string> {
    if (!this.tokenCache || this.isTokenExpiringSoon(this.tokenCache)) {
      await this.refreshToken();
    }
    
    return this.tokenCache!.token;
  }
  
  private isTokenExpiringSoon(tokenResult: AppCheckTokenResult): boolean {
    // Consider token expiring if less than 5 minutes remaining
    const timeUntilExpiry = tokenResult.expireTimeMillis - Date.now();
    return timeUntilExpiry < (5 * 60 * 1000);
  }
  
  private async refreshToken(): Promise<void> {
    const tokenResult = await getToken(this.appCheck, true);
    this.tokenCache = tokenResult;
  }
  
  cleanup(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
  }
}

// Usage
const tokenManager = new AppCheckTokenManager(appCheck);

// Get valid token for API calls
const token = await tokenManager.getValidToken();

// Use token in API requests
const response = await fetch('/api/protected-endpoint', {
  headers: {
    'X-Firebase-AppCheck': token
  }
});

// Clean up when done
tokenManager.cleanup();
```

### Integration with Firebase Services

App Check automatically integrates with other Firebase services:

```typescript
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getStorage, ref, uploadBytes } from 'firebase/storage';

// App Check tokens are automatically included in requests
// to Firebase services when App Check is initialized

const db = getFirestore(app);
const functions = getFunctions(app);
const storage = getStorage(app);

// These operations will include App Check tokens automatically
const querySnapshot = await getDocs(collection(db, 'protected-collection'));

const protectedFunction = httpsCallable(functions, 'protectedFunction');
const result = await protectedFunction({ data: 'sensitive' });

const fileRef = ref(storage, 'protected/file.txt');
await uploadBytes(fileRef, fileData);
```

### Custom API Integration

```typescript
// Integrate App Check with your custom APIs
class SecureApiClient {
  private appCheck: AppCheck;
  private baseUrl: string;
  
  constructor(appCheck: AppCheck, baseUrl: string) {
    this.appCheck = appCheck;
    this.baseUrl = baseUrl;
  }
  
  private async getHeaders(): Promise<Record<string, string>> {
    const tokenResult = await getToken(this.appCheck);
    
    return {
      'Content-Type': 'application/json',
      'X-Firebase-AppCheck': tokenResult.token,
      'Authorization': `Bearer ${await this.getUserToken()}`
    };
  }
  
  private async getUserToken(): Promise<string> {
    // Get user authentication token if needed
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? await user.getIdToken() : '';
  }
  
  async secureRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = await this.getHeaders();
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('App Check verification failed');
      }
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  // Specific API methods
  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.secureRequest(`/api/users/${userId}`);
  }
  
  async updateUserData(userId: string, data: Partial<UserProfile>): Promise<void> {
    await this.secureRequest(`/api/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  }
}

// Usage
const apiClient = new SecureApiClient(appCheck, 'https://api.myapp.com');

try {
  const profile = await apiClient.getUserProfile('user123');
  console.log('User profile:', profile);
} catch (error) {
  if (error.message.includes('App Check')) {
    console.error('App verification failed - possible abuse detected');
  } else {
    console.error('API error:', error);
  }
}
```

### Development and Testing

```typescript
// Debug mode for development
if (process.env.NODE_ENV === 'development') {
  // Use debug provider for local development
  // Note: This requires setting up debug tokens in Firebase Console
  (window as any).FIREBASE_APPCHECK_DEBUG_TOKEN = 'debug-token-from-console';
}

// Initialize App Check after setting debug token
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('your-site-key'),
  isTokenAutoRefreshEnabled: true
});

// Test App Check integration
async function testAppCheck(): Promise<void> {
  try {
    console.log('Testing App Check...');
    
    const tokenResult = await getToken(appCheck);
    console.log('✓ App Check token obtained');
    
    // Test with Firebase service
    const db = getFirestore(app);
    const testQuery = await getDocs(collection(db, 'test'));
    console.log('✓ Firestore query with App Check succeeded');
    
    // Test with custom API
    const response = await fetch('/api/app-check-test', {
      headers: {
        'X-Firebase-AppCheck': tokenResult.token
      }
    });
    
    if (response.ok) {
      console.log('✓ Custom API with App Check succeeded');
    } else {
      console.error('✗ Custom API with App Check failed');
    }
  } catch (error) {
    console.error('✗ App Check test failed:', error);
  }
}

// Run test in development
if (process.env.NODE_ENV === 'development') {
  testAppCheck();
}
```

## Security Best Practices

### Server-Side Verification

```javascript
// Server-side App Check verification (Node.js example)
const admin = require('firebase-admin');

// Middleware to verify App Check tokens
function verifyAppCheck(req, res, next) {
  const appCheckToken = req.headers['x-firebase-appcheck'];
  
  if (!appCheckToken) {
    return res.status(401).json({ error: 'App Check token required' });
  }
  
  admin.appCheck().verifyToken(appCheckToken)
    .then((appCheckClaims) => {
      // Token is valid
      req.appCheckClaims = appCheckClaims;
      next();
    })
    .catch((error) => {
      console.error('App Check verification failed:', error);
      res.status(401).json({ error: 'Invalid App Check token' });
    });
}

// Use middleware on protected routes
app.get('/api/protected-data', verifyAppCheck, (req, res) => {
  // This endpoint is protected by App Check
  res.json({ data: 'sensitive information' });
});
```

### Rate Limiting and Monitoring

```typescript
// Monitor App Check failures
class AppCheckMonitor {
  private failureCount = 0;
  private lastFailureTime = 0;
  
  async monitoredGetToken(appCheck: AppCheck): Promise<AppCheckTokenResult> {
    try {
      const tokenResult = await getToken(appCheck);
      this.resetFailureCount();
      return tokenResult;
    } catch (error) {
      this.recordFailure();
      
      if (this.shouldTriggerAlert()) {
        this.sendAlert(error);
      }
      
      throw error;
    }
  }
  
  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();
  }
  
  private resetFailureCount(): void {
    this.failureCount = 0;
  }
  
  private shouldTriggerAlert(): boolean {
    // Trigger alert if 5 failures in 10 minutes
    const tenMinutesAgo = Date.now() - (10 * 60 * 1000);
    return this.failureCount >= 5 && this.lastFailureTime > tenMinutesAgo;
  }
  
  private sendAlert(error: Error): void {
    console.error('App Check failure threshold exceeded:', error);
    
    // Send to monitoring service
    fetch('/api/alerts', {
      method: 'POST',
      body: JSON.stringify({
        type: 'app_check_failure',
        count: this.failureCount,
        error: error.message,
        timestamp: Date.now()
      })
    });
  }
}
```