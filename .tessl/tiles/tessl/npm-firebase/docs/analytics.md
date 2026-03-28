# Google Analytics

Google Analytics integration with automatic event tracking and custom event logging. Provides detailed insights into user behavior and app performance.

## Capabilities

### Analytics Service

```typescript { .api }
/**
 * Gets the Analytics service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Analytics service instance
 */
function getAnalytics(app?: FirebaseApp): Analytics;

/**
 * Initializes Analytics with custom settings
 * @param app - Firebase app instance
 * @param options - Analytics configuration options
 * @returns Analytics service instance
 */
function initializeAnalytics(app: FirebaseApp, options?: AnalyticsSettings): Analytics;

/**
 * Checks if Analytics is supported in the current environment
 * @returns Promise resolving to boolean indicating support
 */
function isSupported(): Promise<boolean>;

interface Analytics {
  /** Firebase app instance */
  readonly app: FirebaseApp;
}

interface AnalyticsSettings {
  /** Custom configuration parameters */
  config?: GtagConfigParams;
}
```

### Event Logging

Log standard and custom events for user behavior tracking.

```typescript { .api }
/**
 * Logs a custom event with optional parameters
 * @param analyticsInstance - Analytics service instance
 * @param eventName - Name of the event
 * @param eventParams - Optional event parameters
 * @param options - Optional analytics call options
 */
function logEvent(
  analyticsInstance: Analytics,
  eventName: string,
  eventParams?: EventParams,
  options?: AnalyticsCallOptions
): void;

// Standard event logging functions with typed parameters
function logEvent(analyticsInstance: Analytics, eventName: 'add_payment_info', eventParams?: AddPaymentInfoParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'add_shipping_info', eventParams?: AddShippingInfoParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'add_to_cart', eventParams?: AddToCartParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'add_to_wishlist', eventParams?: AddToWishlistParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'begin_checkout', eventParams?: BeginCheckoutParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'generate_lead', eventParams?: GenerateLeadParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'login', eventParams?: LoginParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'page_view', eventParams?: PageViewParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'purchase', eventParams?: PurchaseParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'search', eventParams?: SearchParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'select_content', eventParams?: SelectContentParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'share', eventParams?: ShareParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'sign_up', eventParams?: SignUpParameters, options?: AnalyticsCallOptions): void;
function logEvent(analyticsInstance: Analytics, eventName: 'view_item', eventParams?: ViewItemParameters, options?: AnalyticsCallOptions): void;

interface EventParams {
  [key: string]: any;
}

interface AnalyticsCallOptions {
  /** Send to global Google Analytics */
  global?: boolean;
}
```

**Usage Examples:**

```typescript
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';

// Check if Analytics is supported
const analyticsSupported = await isSupported();
if (!analyticsSupported) {
  console.log('Analytics not supported in this environment');
  return;
}

const analytics = getAnalytics();

// Log custom event
logEvent(analytics, 'custom_event', {
  custom_parameter: 'value',
  numeric_parameter: 123
});

// Log standard events
logEvent(analytics, 'login', {
  method: 'email'
});

logEvent(analytics, 'purchase', {
  transaction_id: 'T12345',
  value: 25.42,
  currency: 'USD',
  items: [{
    item_id: 'SKU123',
    item_name: 'Product Name',
    category: 'Category',
    quantity: 1,
    price: 25.42
  }]
});

logEvent(analytics, 'page_view', {
  page_title: 'Home Page',
  page_location: window.location.href
});
```

### User Properties

Set user properties for audience segmentation.

```typescript { .api }
/**
 * Sets the user ID for analytics tracking
 * @param analyticsInstance - Analytics service instance
 * @param id - User ID or null to unset
 * @param options - Optional analytics call options
 */
function setUserId(
  analyticsInstance: Analytics,
  id: string | null,
  options?: AnalyticsCallOptions
): void;

/**
 * Sets user properties for audience segmentation
 * @param analyticsInstance - Analytics service instance
 * @param properties - User properties to set
 * @param options - Optional analytics call options
 */
function setUserProperties(
  analyticsInstance: Analytics,
  properties: CustomParams,
  options?: AnalyticsCallOptions
): void;

interface CustomParams {
  [key: string]: any;
}
```

**Usage Examples:**

```typescript
import { getAnalytics, setUserId, setUserProperties } from 'firebase/analytics';

const analytics = getAnalytics();

// Set user ID
setUserId(analytics, 'user123');

// Set user properties
setUserProperties(analytics, {
  user_type: 'premium',
  preferred_language: 'en',
  signup_method: 'google',
  custom_dimension_1: 'value1'
});

// Clear user ID
setUserId(analytics, null);
```

### Configuration

Configure analytics collection and default parameters.

```typescript { .api }
/**
 * Enables or disables analytics collection
 * @param analyticsInstance - Analytics service instance
 * @param enabled - Whether to enable collection
 */
function setAnalyticsCollectionEnabled(
  analyticsInstance: Analytics,
  enabled: boolean
): void;

/**
 * Sets default parameters for all events
 * @param customParams - Default parameters
 */
function setDefaultEventParameters(customParams: CustomParams): void;

/**
 * Sets user consent settings
 * @param consentSettings - Consent configuration
 */
function setConsent(consentSettings: ConsentSettings): void;

interface ConsentSettings {
  /** Consent for ad storage */
  ad_storage?: 'granted' | 'denied';
  /** Consent for analytics storage */
  analytics_storage?: 'granted' | 'denied';
  /** Consent for ad user data */
  ad_user_data?: 'granted' | 'denied';
  /** Consent for ad personalization */
  ad_personalization?: 'granted' | 'denied';
}
```

**Usage Examples:**

```typescript
import { 
  getAnalytics, 
  setAnalyticsCollectionEnabled, 
  setDefaultEventParameters,
  setConsent 
} from 'firebase/analytics';

const analytics = getAnalytics();

// Disable analytics collection (e.g., for privacy compliance)
setAnalyticsCollectionEnabled(analytics, false);

// Set default parameters for all events
setDefaultEventParameters({
  app_version: '1.2.3',
  debug_mode: false
});

// Set user consent
setConsent({
  ad_storage: 'denied',
  analytics_storage: 'granted',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

// Re-enable analytics after user consent
setAnalyticsCollectionEnabled(analytics, true);
```

### Screen Tracking

Track screen views in single-page applications.

```typescript { .api }
/**
 * Sets the current screen name (deprecated - use page_view event instead)
 * @param analyticsInstance - Analytics service instance
 * @param screenName - Screen name
 * @param options - Optional analytics call options
 * @deprecated Use logEvent with 'page_view' instead
 */
function setCurrentScreen(
  analyticsInstance: Analytics,
  screenName: string | null,
  options?: AnalyticsCallOptions
): void;
```

**Usage Examples:**

```typescript
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

// Modern approach - use page_view event
function trackScreenView(screenName: string, screenClass?: string) {
  logEvent(analytics, 'page_view', {
    page_title: screenName,
    page_location: window.location.href,
    page_path: window.location.pathname,
    screen_class: screenClass
  });
}

// Track screen changes in SPA
trackScreenView('Home Screen', 'HomeComponent');
trackScreenView('Product Details', 'ProductComponent');
trackScreenView('Checkout', 'CheckoutComponent');
```

### Advanced Analytics

Advanced analytics features and Google Analytics integration.

```typescript { .api }
/**
 * Gets the Google Analytics client ID
 * @param analyticsInstance - Analytics service instance
 * @returns Promise resolving to client ID
 */
function getGoogleAnalyticsClientId(analyticsInstance: Analytics): Promise<string>;

interface GtagConfigParams {
  /** Custom configuration parameters */
  [key: string]: any;
  /** Page title */
  page_title?: string;
  /** Page location */
  page_location?: string;
  /** Send page view */
  send_page_view?: boolean;
  /** Custom dimensions */
  custom_map?: { [key: string]: string };
}
```

**Usage Examples:**

```typescript
import { getAnalytics, getGoogleAnalyticsClientId, initializeAnalytics } from 'firebase/analytics';

// Initialize with custom config
const analytics = initializeAnalytics(app, {
  config: {
    send_page_view: false, // Disable automatic page views
    custom_map: {
      custom_dimension_1: 'user_type',
      custom_dimension_2: 'subscription_level'
    }
  }
});

// Get client ID for server-side tracking
const clientId = await getGoogleAnalyticsClientId(analytics);
console.log('GA Client ID:', clientId);

// Send to server for server-side analytics
fetch('/api/track', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientId: clientId,
    event: 'server_side_event',
    parameters: { value: 100 }
  })
});
```

### E-commerce Tracking

Track e-commerce events with detailed item information.

```typescript
// E-commerce event example interfaces
interface Item {
  item_id?: string;
  item_name?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_category4?: string;
  item_category5?: string;
  item_variant?: string;
  item_brand?: string;
  price?: number;
  quantity?: number;
  coupon?: string;
  discount?: number;
  affiliation?: string;
  promotion_id?: string;
  promotion_name?: string;
  creative_name?: string;
  creative_slot?: string;
  location_id?: string;
}

interface PurchaseParameters {
  transaction_id: string;
  value: number;
  currency: string;
  items: Item[];
  coupon?: string;
  shipping?: number;
  tax?: number;
  affiliation?: string;
}
```

**Usage Examples:**

```typescript
import { getAnalytics, logEvent } from 'firebase/analytics';

const analytics = getAnalytics();

// Track product view
logEvent(analytics, 'view_item', {
  currency: 'USD',
  value: 15.25,
  items: [{
    item_id: 'SKU_12345',
    item_name: 'Wireless Headphones',
    item_category: 'Electronics',
    item_brand: 'BrandName',
    price: 15.25,
    quantity: 1
  }]
});

// Track add to cart
logEvent(analytics, 'add_to_cart', {
  currency: 'USD',
  value: 15.25,
  items: [{
    item_id: 'SKU_12345',
    item_name: 'Wireless Headphones',
    price: 15.25,
    quantity: 1
  }]
});

// Track purchase
logEvent(analytics, 'purchase', {
  transaction_id: 'T_12345',
  value: 25.42,
  currency: 'USD',
  tax: 2.17,
  shipping: 8.00,
  items: [{
    item_id: 'SKU_12345',
    item_name: 'Wireless Headphones',
    item_category: 'Electronics',
    price: 15.25,
    quantity: 1
  }]
});
```

## Privacy and Compliance

### GDPR Compliance

```typescript
import { getAnalytics, setConsent, setAnalyticsCollectionEnabled } from 'firebase/analytics';

// Initial consent state (deny all)
setConsent({
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

// After user gives consent
function updateConsent(hasAnalyticsConsent: boolean, hasAdConsent: boolean) {
  setConsent({
    analytics_storage: hasAnalyticsConsent ? 'granted' : 'denied',
    ad_storage: hasAdConsent ? 'granted' : 'denied',
    ad_user_data: hasAdConsent ? 'granted' : 'denied',
    ad_personalization: hasAdConsent ? 'granted' : 'denied'
  });
  
  const analytics = getAnalytics();
  setAnalyticsCollectionEnabled(analytics, hasAnalyticsConsent);
}
```

### Debug Mode

```typescript
// Enable debug mode for development
setDefaultEventParameters({
  debug_mode: true
});

// Or set globally via gtag
window.gtag('config', 'GA_MEASUREMENT_ID', {
  debug_mode: true
});
```