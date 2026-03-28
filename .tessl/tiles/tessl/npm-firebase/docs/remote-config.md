# Remote Config

Dynamic configuration service that allows you to change app behavior without deploying updates. Perfect for A/B testing and feature flags.

## Capabilities

### Remote Config Service

```typescript { .api }
/**
 * Gets the Remote Config service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Remote Config service instance
 */
function getRemoteConfig(app?: FirebaseApp): RemoteConfig;

interface RemoteConfig {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Configuration settings */
  settings: RemoteConfigSettings;
  /** Default configuration values */
  defaultConfig: { [key: string]: string | number | boolean };
  /** Last fetch time in milliseconds */
  fetchTimeMillis: number;
  /** Status of last fetch */
  lastFetchStatus: FetchStatus;
}

type FetchStatus = 'no-fetch-yet' | 'success' | 'failure' | 'throttle';

interface RemoteConfigSettings {
  /** Minimum interval between fetches in milliseconds */
  minimumFetchIntervalMillis: number;
  /** Fetch timeout in milliseconds */
  fetchTimeoutMillis: number;
}
```

### Configuration Management

```typescript { .api }
/**
 * Activates the most recently fetched configuration
 * @param remoteConfig - Remote Config service instance
 * @returns Promise resolving to boolean indicating if new config was activated
 */
function activate(remoteConfig: RemoteConfig): Promise<boolean>;

/**
 * Ensures Remote Config is initialized
 * @param remoteConfig - Remote Config service instance
 * @returns Promise that resolves when initialization is complete
 */
function ensureInitialized(remoteConfig: RemoteConfig): Promise<void>;

/**
 * Fetches and activates configuration in one operation
 * @param remoteConfig - Remote Config service instance
 * @returns Promise resolving to boolean indicating if new config was activated
 */
function fetchAndActivate(remoteConfig: RemoteConfig): Promise<boolean>;

/**
 * Fetches configuration from the server
 * @param remoteConfig - Remote Config service instance
 * @returns Promise that resolves when fetch is complete
 */
function fetchConfig(remoteConfig: RemoteConfig): Promise<void>;
```

**Usage Examples:**

```typescript
import { getRemoteConfig, fetchAndActivate, ensureInitialized } from 'firebase/remote-config';

const remoteConfig = getRemoteConfig();

// Set default values
remoteConfig.defaultConfig = {
  welcome_message: 'Welcome to our app!',
  feature_enabled: false,
  max_items: 10,
  theme_color: '#007bff'
};

// Configure settings
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000, // 1 hour
  fetchTimeoutMillis: 60000 // 1 minute
};

// Initialize and fetch config
try {
  await ensureInitialized(remoteConfig);
  const activated = await fetchAndActivate(remoteConfig);
  
  if (activated) {
    console.log('New configuration activated');
  } else {
    console.log('No new configuration available');
  }
} catch (error) {
  console.error('Error fetching remote config:', error);
}
```

### Value Retrieval

```typescript { .api }
/**
 * Gets all configuration values
 * @param remoteConfig - Remote Config service instance
 * @returns Object containing all key-value pairs
 */
function getAll(remoteConfig: RemoteConfig): Record<string, Value>;

/**
 * Gets a boolean value from configuration
 * @param remoteConfig - Remote Config service instance
 * @param key - Configuration key
 * @returns Boolean value
 */
function getBoolean(remoteConfig: RemoteConfig, key: string): boolean;

/**
 * Gets a number value from configuration
 * @param remoteConfig - Remote Config service instance
 * @param key - Configuration key
 * @returns Number value
 */
function getNumber(remoteConfig: RemoteConfig, key: string): number;

/**
 * Gets a string value from configuration
 * @param remoteConfig - Remote Config service instance
 * @param key - Configuration key
 * @returns String value
 */
function getString(remoteConfig: RemoteConfig, key: string): string;

/**
 * Gets a value object from configuration
 * @param remoteConfig - Remote Config service instance
 * @param key - Configuration key
 * @returns Value object with source information
 */
function getValue(remoteConfig: RemoteConfig, key: string): Value;

interface Value {
  /** Convert to boolean */
  asBoolean(): boolean;
  /** Convert to number */
  asNumber(): number;
  /** Convert to string */
  asString(): string;
  /** Get value source */
  getSource(): ValueSource;
}

type ValueSource = 'static' | 'default' | 'remote';
```

**Usage Examples:**

```typescript
import { getRemoteConfig, getString, getBoolean, getNumber, getValue } from 'firebase/remote-config';

const remoteConfig = getRemoteConfig();

// Get values with type conversion
const welcomeMessage = getString(remoteConfig, 'welcome_message');
const featureEnabled = getBoolean(remoteConfig, 'feature_enabled');
const maxItems = getNumber(remoteConfig, 'max_items');
const themeColor = getString(remoteConfig, 'theme_color');

// Use values in your app
document.getElementById('welcome').textContent = welcomeMessage;

if (featureEnabled) {
  enableAdvancedFeatures();
}

setItemLimit(maxItems);
setThemeColor(themeColor);

// Get value with source information
const experimentValue = getValue(remoteConfig, 'experiment_variant');
console.log('Experiment variant:', experimentValue.asString());
console.log('Source:', experimentValue.getSource()); // 'remote', 'default', or 'static'

// Get all values
const allValues = getAll(remoteConfig);
Object.entries(allValues).forEach(([key, value]) => {
  console.log(`${key}: ${value.asString()} (source: ${value.getSource()})`);
});
```

### Feature Flags

Implement feature flags using Remote Config.

```typescript
class FeatureFlags {
  private remoteConfig: RemoteConfig;
  
  constructor() {
    this.remoteConfig = getRemoteConfig();
    this.setupDefaults();
  }
  
  private setupDefaults() {
    this.remoteConfig.defaultConfig = {
      // Feature flags
      new_ui_enabled: false,
      beta_features_enabled: false,
      dark_mode_available: true,
      social_login_enabled: true,
      
      // A/B test variants
      checkout_flow_variant: 'original',
      button_color_variant: 'blue',
      
      // Configuration values
      api_timeout_ms: 5000,
      max_retry_attempts: 3,
      cache_duration_minutes: 60
    };
  }
  
  async initialize(): Promise<void> {
    try {
      await ensureInitialized(this.remoteConfig);
      await fetchAndActivate(this.remoteConfig);
      console.log('Feature flags initialized');
    } catch (error) {
      console.error('Failed to initialize feature flags:', error);
    }
  }
  
  // Feature flag methods
  isNewUIEnabled(): boolean {
    return getBoolean(this.remoteConfig, 'new_ui_enabled');
  }
  
  areBetaFeaturesEnabled(): boolean {
    return getBoolean(this.remoteConfig, 'beta_features_enabled');
  }
  
  isDarkModeAvailable(): boolean {
    return getBoolean(this.remoteConfig, 'dark_mode_available');
  }
  
  isSocialLoginEnabled(): boolean {
    return getBoolean(this.remoteConfig, 'social_login_enabled');
  }
  
  // A/B test methods
  getCheckoutFlowVariant(): string {
    return getString(this.remoteConfig, 'checkout_flow_variant');
  }
  
  getButtonColorVariant(): string {
    return getString(this.remoteConfig, 'button_color_variant');
  }
  
  // Configuration methods
  getApiTimeout(): number {
    return getNumber(this.remoteConfig, 'api_timeout_ms');
  }
  
  getMaxRetryAttempts(): number {
    return getNumber(this.remoteConfig, 'max_retry_attempts');
  }
  
  getCacheDuration(): number {
    return getNumber(this.remoteConfig, 'cache_duration_minutes');
  }
}

// Usage
const featureFlags = new FeatureFlags();
await featureFlags.initialize();

// Use feature flags
if (featureFlags.isNewUIEnabled()) {
  renderNewUI();
} else {
  renderLegacyUI();
}

// Use A/B test variants
const checkoutVariant = featureFlags.getCheckoutFlowVariant();
switch (checkoutVariant) {
  case 'simplified':
    renderSimplifiedCheckout();
    break;
  case 'detailed':
    renderDetailedCheckout();
    break;
  default:
    renderOriginalCheckout();
}
```

### A/B Testing Integration

Integrate with analytics for A/B testing.

```typescript
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getRemoteConfig, getString, getValue } from 'firebase/remote-config';

class ABTestManager {
  private remoteConfig: RemoteConfig;
  private analytics: Analytics;
  
  constructor() {
    this.remoteConfig = getRemoteConfig();
    this.analytics = getAnalytics();
  }
  
  async initialize(): Promise<void> {
    await fetchAndActivate(this.remoteConfig);
    this.trackExperimentAssignments();
  }
  
  private trackExperimentAssignments(): void {
    // Track all experiment assignments
    const experiments = [
      'checkout_flow_experiment',
      'button_color_experiment',
      'pricing_page_experiment'
    ];
    
    experiments.forEach(experiment => {
      const variant = getString(this.remoteConfig, experiment);
      const value = getValue(this.remoteConfig, experiment);
      
      // Only track if value comes from remote config (not default)
      if (value.getSource() === 'remote') {
        logEvent(this.analytics, 'experiment_assignment', {
          experiment_name: experiment,
          variant_name: variant
        });
      }
    });
  }
  
  getExperimentVariant(experimentName: string): string {
    return getString(this.remoteConfig, experimentName);
  }
  
  trackExperimentGoal(experimentName: string, goalName: string, value?: number): void {
    const variant = this.getExperimentVariant(experimentName);
    
    logEvent(this.analytics, 'experiment_goal', {
      experiment_name: experimentName,
      variant_name: variant,
      goal_name: goalName,
      goal_value: value || 1
    });
  }
}

// Usage
const abTestManager = new ABTestManager();
await abTestManager.initialize();

// Get experiment variant
const checkoutVariant = abTestManager.getExperimentVariant('checkout_flow_experiment');

// Track experiment goals
if (userCompletedPurchase) {
  abTestManager.trackExperimentGoal('checkout_flow_experiment', 'purchase_completed', orderValue);
}

if (userClickedButton) {
  abTestManager.trackExperimentGoal('button_color_experiment', 'button_clicked');
}
```

### Conditional Configuration

Configure app behavior based on user attributes.

```typescript
import { getAuth } from 'firebase/auth';
import { getRemoteConfig, fetchAndActivate, getString, getBoolean } from 'firebase/remote-config';

class ConditionalConfig {
  private remoteConfig: RemoteConfig;
  private auth: Auth;
  
  constructor() {
    this.remoteConfig = getRemoteConfig();
    this.auth = getAuth();
    this.setupUserProperties();
  }
  
  private setupUserProperties(): void {
    // Remote Config conditions are set in Firebase Console
    // But we can track user properties for analytics correlation
    const user = this.auth.currentUser;
    
    if (user) {
      // Set user properties that can influence Remote Config conditions
      // These are set in Firebase Console as conditions
      console.log('User ID:', user.uid);
      console.log('User email domain:', user.email?.split('@')[1]);
      console.log('User creation time:', user.metadata.creationTime);
    }
  }
  
  async initializeForUser(): Promise<void> {
    // Fetch config after user authentication for personalized values
    await fetchAndActivate(this.remoteConfig);
  }
  
  // Get user-specific configurations
  getMaxUploadSize(): number {
    // This might return different values based on user tier
    return getNumber(this.remoteConfig, 'max_upload_size_mb');
  }
  
  isPremiumFeatureEnabled(): boolean {
    // This might be true only for premium users
    return getBoolean(this.remoteConfig, 'premium_features_enabled');
  }
  
  getApiEndpoint(): string {
    // This might return different endpoints for different user groups
    return getString(this.remoteConfig, 'api_endpoint');
  }
  
  getSupportEmail(): string {
    // This might return different support contacts for different regions
    return getString(this.remoteConfig, 'support_email');
  }
}

// Usage with authentication
const auth = getAuth();
const conditionalConfig = new ConditionalConfig();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Initialize config after user signs in
    await conditionalConfig.initializeForUser();
    
    // Configure app based on user-specific values
    const maxUploadSize = conditionalConfig.getMaxUploadSize();
    const premiumEnabled = conditionalConfig.isPremiumFeatureEnabled();
    
    configureUploadLimits(maxUploadSize);
    
    if (premiumEnabled) {
      enablePremiumFeatures();
    }
  }
});
```

### Error Handling and Fallbacks

```typescript
class RobustRemoteConfig {
  private remoteConfig: RemoteConfig;
  private fallbackValues: Record<string, any>;
  
  constructor(fallbackValues: Record<string, any> = {}) {
    this.remoteConfig = getRemoteConfig();
    this.fallbackValues = fallbackValues;
    
    // Set generous defaults
    this.remoteConfig.defaultConfig = {
      ...fallbackValues,
      ...this.remoteConfig.defaultConfig
    };
    
    // Configure for development
    if (process.env.NODE_ENV === 'development') {
      this.remoteConfig.settings.minimumFetchIntervalMillis = 0;
    }
  }
  
  async safeInitialize(): Promise<boolean> {
    try {
      await ensureInitialized(this.remoteConfig);
      
      // Try to fetch with timeout
      const fetchPromise = fetchAndActivate(this.remoteConfig);
      const timeoutPromise = new Promise<boolean>((_, reject) => 
        setTimeout(() => reject(new Error('Fetch timeout')), 10000)
      );
      
      const activated = await Promise.race([fetchPromise, timeoutPromise]);
      console.log('Remote config initialized successfully');
      return activated;
    } catch (error) {
      console.warn('Remote config initialization failed, using defaults:', error);
      return false;
    }
  }
  
  safeGetString(key: string, fallback?: string): string {
    try {
      return getString(this.remoteConfig, key);
    } catch (error) {
      console.warn(`Failed to get string value for ${key}, using fallback:`, error);
      return fallback || this.fallbackValues[key] || '';
    }
  }
  
  safeGetBoolean(key: string, fallback?: boolean): boolean {
    try {
      return getBoolean(this.remoteConfig, key);
    } catch (error) {
      console.warn(`Failed to get boolean value for ${key}, using fallback:`, error);
      return fallback !== undefined ? fallback : (this.fallbackValues[key] || false);
    }
  }
  
  safeGetNumber(key: string, fallback?: number): number {
    try {
      return getNumber(this.remoteConfig, key);
    } catch (error) {
      console.warn(`Failed to get number value for ${key}, using fallback:`, error);
      return fallback !== undefined ? fallback : (this.fallbackValues[key] || 0);
    }
  }
}

// Usage
const robustConfig = new RobustRemoteConfig({
  feature_enabled: false,
  api_timeout: 5000,
  welcome_message: 'Welcome!'
});

// Initialize with error handling
const initialized = await robustConfig.safeInitialize();
if (!initialized) {
  console.log('Using default configuration');
}

// Safe value retrieval
const featureEnabled = robustConfig.safeGetBoolean('feature_enabled', false);
const apiTimeout = robustConfig.safeGetNumber('api_timeout', 5000);
const welcomeMessage = robustConfig.safeGetString('welcome_message', 'Welcome!');
```