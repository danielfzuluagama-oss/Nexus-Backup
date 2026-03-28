# Performance Monitoring

Application performance monitoring with automatic metrics collection and custom trace creation. Helps identify bottlenecks and optimize user experience.

## Capabilities

### Performance Service

```typescript { .api }
/**
 * Gets the Performance Monitoring service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Performance service instance
 */
function getPerformance(app?: FirebaseApp): FirebasePerformance;

/**
 * Checks if Performance Monitoring is supported in the current environment
 * @returns Promise resolving to boolean indicating support
 */
function isSupported(): Promise<boolean>;

interface FirebasePerformance {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Whether data collection is enabled */
  dataCollectionEnabled: boolean;
  /** Whether instrumentation is enabled */
  instrumentationEnabled: boolean;
}
```

### Custom Traces

Create custom performance traces to measure specific operations.

```typescript { .api }
/**
 * Creates a custom performance trace
 * @param performance - Performance service instance
 * @param traceName - Name of the trace
 * @returns Trace instance
 */
function trace(performance: FirebasePerformance, traceName: string): Trace;

interface Trace {
  /** Start the trace */
  start(): void;
  /** Stop the trace */
  stop(): void;
  /** Record a metric value */
  record(metricName: string, value: number): void;
  /** Increment a metric */
  incrementMetric(metricName: string, incrementBy?: number): void;
  /** Set a custom attribute */
  putAttribute(attributeName: string, attributeValue: string): void;
  /** Get a custom attribute */
  getAttribute(attributeName: string): string | undefined;
  /** Remove a custom attribute */
  removeAttribute(attributeName: string): void;
  /** Get all custom attributes */
  getAttributes(): { [key: string]: string };
  /** Set a metric value */
  putMetric(metricName: string, num: number): void;
  /** Get a metric value */
  getMetric(metricName: string): number;
}
```

**Usage Examples:**

```typescript
import { getPerformance, trace, isSupported } from 'firebase/performance';

// Check if Performance Monitoring is supported
const perfSupported = await isSupported();
if (!perfSupported) {
  console.log('Performance Monitoring not supported');
  return;
}

const perf = getPerformance();

// Create and use a custom trace
const customTrace = trace(perf, 'custom_operation');

// Start the trace
customTrace.start();

// Add custom attributes
customTrace.putAttribute('user_type', 'premium');
customTrace.putAttribute('operation_type', 'data_processing');

try {
  // Perform the operation you want to measure
  await performCustomOperation();
  
  // Record success metric
  customTrace.putMetric('success_count', 1);
  customTrace.putAttribute('result', 'success');
} catch (error) {
  // Record error metric
  customTrace.putMetric('error_count', 1);
  customTrace.putAttribute('result', 'error');
  customTrace.putAttribute('error_code', error.code || 'unknown');
} finally {
  // Always stop the trace
  customTrace.stop();
}

async function performCustomOperation() {
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

### Network Request Monitoring

Monitor HTTP requests automatically (works with XMLHttpRequest and fetch).

```typescript
// Network requests are automatically monitored
// No additional code needed for basic monitoring

// Custom network request tracking
async function monitoredFetch(url: string, options?: RequestInit) {
  const networkTrace = trace(perf, `network_${url}`);
  networkTrace.start();
  networkTrace.putAttribute('url', url);
  networkTrace.putAttribute('method', options?.method || 'GET');
  
  try {
    const response = await fetch(url, options);
    
    // Record response metrics
    networkTrace.putMetric('response_code', response.status);
    networkTrace.putAttribute('status', response.status.toString());
    networkTrace.putAttribute('content_type', response.headers.get('content-type') || 'unknown');
    
    if (response.ok) {
      networkTrace.putMetric('success_count', 1);
    } else {
      networkTrace.putMetric('error_count', 1);
    }
    
    return response;
  } catch (error) {
    networkTrace.putMetric('error_count', 1);
    networkTrace.putAttribute('error', error.message);
    throw error;
  } finally {
    networkTrace.stop();
  }
}

// Usage
const response = await monitoredFetch('/api/data', {
  method: 'POST',
  body: JSON.stringify({ key: 'value' })
});
```

### Page Load Monitoring

Track page load performance metrics.

```typescript
// Automatic page load monitoring is enabled by default
// Custom page load tracking for SPAs

function trackPageView(pageName: string) {
  const pageTrace = trace(perf, `page_${pageName}`);
  pageTrace.start();
  pageTrace.putAttribute('page_name', pageName);
  pageTrace.putAttribute('url', window.location.href);
  
  // Measure time to interactive or other custom metrics
  const startTime = performance.now();
  
  // When page is ready
  requestAnimationFrame(() => {
    const loadTime = performance.now() - startTime;
    pageTrace.putMetric('page_load_time', loadTime);
    pageTrace.stop();
  });
}

// Track SPA navigation
function handleRouteChange(routeName: string) {
  trackPageView(routeName);
}

// Usage in React Router or similar
// useEffect(() => {
//   trackPageView('HomePage');
// }, []);
```

### Component Performance Tracking

Track React component or other framework performance.

```typescript
// React component performance tracking
function usePerformanceTrace(traceName: string, dependencies: any[] = []) {
  const perf = getPerformance();
  const traceRef = useRef<Trace | null>(null);
  
  useEffect(() => {
    traceRef.current = trace(perf, traceName);
    traceRef.current.start();
    
    return () => {
      if (traceRef.current) {
        traceRef.current.stop();
      }
    };
  }, dependencies);
  
  const recordMetric = useCallback((metricName: string, value: number) => {
    if (traceRef.current) {
      traceRef.current.putMetric(metricName, value);
    }
  }, []);
  
  const setAttribute = useCallback((attributeName: string, value: string) => {
    if (traceRef.current) {
      traceRef.current.putAttribute(attributeName, value);
    }
  }, []);
  
  return { recordMetric, setAttribute };
}

// Usage in React component
function MyComponent({ userId }: { userId: string }) {
  const { recordMetric, setAttribute } = usePerformanceTrace('MyComponent_render', [userId]);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    setAttribute('user_id', userId);
    
    const fetchData = async () => {
      const startTime = performance.now();
      try {
        const result = await fetchUserData(userId);
        setData(result);
        
        const fetchTime = performance.now() - startTime;
        recordMetric('data_fetch_time', fetchTime);
        recordMetric('success_count', 1);
      } catch (error) {
        recordMetric('error_count', 1);
        setAttribute('error', error.message);
      }
    };
    
    fetchData();
  }, [userId, recordMetric, setAttribute]);
  
  return <div>{data ? 'Data loaded' : 'Loading...'}</div>;
}
```

### Database Operation Monitoring

Track Firebase database operations performance.

```typescript
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getPerformance, trace } from 'firebase/performance';

const db = getFirestore();
const perf = getPerformance();

async function monitoredFirestoreQuery(collectionName: string, queryConstraints: any[] = []) {
  const queryTrace = trace(perf, `firestore_query_${collectionName}`);
  queryTrace.start();
  queryTrace.putAttribute('collection', collectionName);
  queryTrace.putAttribute('constraints_count', queryConstraints.length.toString());
  
  try {
    const startTime = performance.now();
    const querySnapshot = await getDocs(collection(db, collectionName));
    const queryTime = performance.now() - startTime;
    
    // Record metrics
    queryTrace.putMetric('query_time', queryTime);
    queryTrace.putMetric('document_count', querySnapshot.size);
    queryTrace.putMetric('success_count', 1);
    queryTrace.putAttribute('from_cache', querySnapshot.metadata.fromCache.toString());
    
    return querySnapshot;
  } catch (error) {
    queryTrace.putMetric('error_count', 1);
    queryTrace.putAttribute('error', error.message);
    throw error;
  } finally {
    queryTrace.stop();
  }
}

// Usage
const users = await monitoredFirestoreQuery('users');
console.log(`Loaded ${users.size} users`);
```

### Configuration and Settings

Configure performance monitoring behavior.

```typescript
import { getPerformance } from 'firebase/performance';

const perf = getPerformance();

// Enable/disable data collection
perf.dataCollectionEnabled = true;

// Enable/disable automatic instrumentation
perf.instrumentationEnabled = true;

// Disable for development
if (process.env.NODE_ENV === 'development') {
  perf.dataCollectionEnabled = false;
}

// Conditional monitoring based on user type
function configurePerformanceMonitoring(user: any) {
  if (user?.isPremium) {
    perf.dataCollectionEnabled = true;
  } else if (Math.random() < 0.1) {
    // Sample 10% of free users
    perf.dataCollectionEnabled = true;
  } else {
    perf.dataCollectionEnabled = false;
  }
}
```

### Error and Exception Tracking

Track errors alongside performance data.

```typescript
// Global error tracking with performance context
window.addEventListener('error', (event) => {
  const errorTrace = trace(perf, 'javascript_error');
  errorTrace.start();
  errorTrace.putAttribute('error_message', event.message);
  errorTrace.putAttribute('filename', event.filename);
  errorTrace.putAttribute('line_number', event.lineno.toString());
  errorTrace.putAttribute('column_number', event.colno.toString());
  errorTrace.putAttribute('user_agent', navigator.userAgent);
  errorTrace.putMetric('error_count', 1);
  errorTrace.stop();
});

// Promise rejection tracking
window.addEventListener('unhandledrejection', (event) => {
  const rejectionTrace = trace(perf, 'unhandled_promise_rejection');
  rejectionTrace.start();
  rejectionTrace.putAttribute('reason', event.reason?.toString() || 'unknown');
  rejectionTrace.putMetric('rejection_count', 1);
  rejectionTrace.stop();
});

// Custom error tracking function
function trackError(error: Error, context: Record<string, string> = {}) {
  const errorTrace = trace(perf, 'custom_error');
  errorTrace.start();
  errorTrace.putAttribute('error_name', error.name);
  errorTrace.putAttribute('error_message', error.message);
  errorTrace.putAttribute('stack_trace', error.stack || 'not available');
  
  // Add context attributes
  Object.entries(context).forEach(([key, value]) => {
    errorTrace.putAttribute(key, value);
  });
  
  errorTrace.putMetric('error_count', 1);
  errorTrace.stop();
}

// Usage
try {
  await riskyOperation();
} catch (error) {
  trackError(error, {
    operation: 'riskyOperation',
    user_id: currentUser?.uid || 'anonymous',
    page: window.location.pathname
  });
  throw error;
}
```

## Best Practices

### Trace Naming Conventions

```typescript
// Use descriptive, hierarchical names
const userActionTrace = trace(perf, 'user_action_login');
const apiCallTrace = trace(perf, 'api_call_user_profile');
const componentTrace = trace(perf, 'component_render_dashboard');
const dbTrace = trace(perf, 'database_query_users');

// Avoid dynamic names that create too many unique traces
// Bad: trace(perf, `user_${userId}_action`) - creates many unique traces
// Good: trace with user_id as attribute
const actionTrace = trace(perf, 'user_action');
actionTrace.putAttribute('user_id', userId);
```

### Attribute and Metric Guidelines

```typescript
const operationTrace = trace(perf, 'data_processing');

// Use consistent attribute names
operationTrace.putAttribute('operation_type', 'batch_processing');
operationTrace.putAttribute('user_type', 'premium');
operationTrace.putAttribute('environment', 'production');

// Use meaningful metrics
operationTrace.putMetric('items_processed', 150);
operationTrace.putMetric('processing_time_ms', 2500);
operationTrace.putMetric('memory_used_mb', 64);

// Avoid too many attributes (limit: 5) or metrics (limit: 32)
```

### Sampling for Performance

```typescript
// Implement sampling to reduce data volume
function shouldSampleTrace(traceName: string): boolean {
  // Sample 10% of traces
  if (Math.random() < 0.1) return true;
  
  // Always sample error traces
  if (traceName.includes('error')) return true;
  
  // Sample based on user type
  const user = getCurrentUser();
  if (user?.isPremium) return true;
  
  return false;
}

function createSampledTrace(traceName: string): Trace | null {
  if (!shouldSampleTrace(traceName)) {
    return null;
  }
  return trace(perf, traceName);
}

// Usage
const myTrace = createSampledTrace('expensive_operation');
if (myTrace) {
  myTrace.start();
  // ... perform operation
  myTrace.stop();
}
```