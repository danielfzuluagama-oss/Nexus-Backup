# Cloud Messaging

Push notification service for web and mobile applications. Supports targeted messaging, topic subscriptions, and rich notifications.

## Capabilities

### Messaging Service

```typescript { .api }
/**
 * Gets the Messaging service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @returns Messaging service instance
 */
function getMessaging(app?: FirebaseApp): Messaging;

/**
 * Checks if Messaging is supported in the current environment
 * @returns Promise resolving to boolean indicating support
 */
function isSupported(): Promise<boolean>;

interface Messaging {
  /** Firebase app instance */
  readonly app: FirebaseApp;
}
```

### Token Management

Manage FCM registration tokens for targeting devices.

```typescript { .api }
/**
 * Gets the FCM registration token for the current device
 * @param messaging - Messaging service instance
 * @param options - Optional token request options
 * @returns Promise resolving to FCM token
 */
function getToken(messaging: Messaging, options?: GetTokenOptions): Promise<string>;

/**
 * Deletes the FCM registration token
 * @param messaging - Messaging service instance
 * @returns Promise resolving to boolean indicating success
 */
function deleteToken(messaging: Messaging): Promise<boolean>;

interface GetTokenOptions {
  /** VAPID key for web push */
  vapidKey?: string;
  /** Service worker registration for notifications */
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}
```

**Usage Examples:**

```typescript
import { getMessaging, getToken, deleteToken, isSupported } from 'firebase/messaging';

// Check if messaging is supported
const messagingSupported = await isSupported();
if (!messagingSupported) {
  console.log('Messaging not supported in this environment');
  return;
}

const messaging = getMessaging();

// Get FCM token
try {
  const token = await getToken(messaging, {
    vapidKey: 'BKxYxBI...' // Your VAPID key from Firebase Console
  });
  
  if (token) {
    console.log('FCM token:', token);
    // Send token to server for targeting
    await sendTokenToServer(token);
  } else {
    console.log('No registration token available');
  }
} catch (error) {
  console.error('Error getting token:', error);
}

// Delete token when user signs out
await deleteToken(messaging);
console.log('Token deleted');
```

### Message Handling

Handle incoming messages in the foreground.

```typescript { .api }
/**
 * Adds a listener for foreground messages
 * @param messaging - Messaging service instance
 * @param nextOrObserver - Message handler function or observer
 * @returns Function to unsubscribe the listener
 */
function onMessage(
  messaging: Messaging,
  nextOrObserver: NextOrObserver<MessagePayload>
): Unsubscribe;

interface MessagePayload {
  /** Collapse key for message grouping */
  readonly collapseKey: string;
  /** Custom data payload */
  readonly data?: { [key: string]: string };
  /** Sender ID */
  readonly from: string;
  /** Message ID */
  readonly messageId: string;
  /** Notification payload */
  readonly notification?: NotificationPayload;
  /** Message priority */
  readonly priority: string;
  /** Time to live */
  readonly ttl: number;
  /** FCM options */
  readonly fcmOptions?: FcmOptions;
}

interface NotificationPayload {
  /** Notification title */
  readonly title?: string;
  /** Notification body */
  readonly body?: string;
  /** Notification icon URL */
  readonly icon?: string;
  /** Notification image URL */
  readonly image?: string;
  /** Click action URL */
  readonly click_action?: string;
  /** Notification badge */
  readonly badge?: string;
  /** Notification sound */
  readonly sound?: string;
  /** Notification tag */
  readonly tag?: string;
  /** Notification color */
  readonly color?: string;
}

interface FcmOptions {
  /** Analytics label */
  readonly analyticsLabel?: string;
  /** Link for notification click */
  readonly link?: string;
}

type NextOrObserver<T> = ((value: T) => void) | Observer<T>;
type Unsubscribe = () => void;

interface Observer<T> {
  next?: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}
```

**Usage Examples:**

```typescript
import { getMessaging, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

// Listen for foreground messages
const unsubscribe = onMessage(messaging, (payload) => {
  console.log('Message received in foreground:', payload);
  
  // Handle data payload
  if (payload.data) {
    console.log('Data payload:', payload.data);
  }
  
  // Handle notification payload
  if (payload.notification) {
    const { title, body, icon, image } = payload.notification;
    
    // Show custom notification
    showCustomNotification({
      title: title || 'New Message',
      body: body || 'You have a new message',
      icon: icon || '/default-icon.png',
      image: image,
      data: payload.data
    });
  }
});

// Custom notification display
function showCustomNotification(options: {
  title: string;
  body: string;
  icon?: string;
  image?: string;
  data?: { [key: string]: string };
}) {
  // Create and display custom notification UI
  const notificationElement = document.createElement('div');
  notificationElement.className = 'notification';
  notificationElement.innerHTML = `
    <div class="notification-content">
      <h4>${options.title}</h4>
      <p>${options.body}</p>
      ${options.image ? `<img src="${options.image}" alt="Notification">` : ''}
    </div>
  `;
  
  document.body.appendChild(notificationElement);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    notificationElement.remove();
  }, 5000);
}

// Clean up listener
unsubscribe();
```

### Service Worker Integration

Handle background messages using service worker.

```typescript { .api }
// Import from messaging/sw for service worker context
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

/**
 * Adds a listener for background messages (service worker only)
 * @param messaging - Messaging service instance
 * @param nextOrObserver - Message handler function or observer
 * @returns Function to unsubscribe the listener
 */
function onBackgroundMessage(
  messaging: Messaging,
  nextOrObserver: NextOrObserver<MessagePayload>
): Unsubscribe;
```

**Service Worker Example:**

```javascript
// firebase-messaging-sw.js
import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log('Background message received:', payload);
  
  const notificationTitle = payload.notification?.title || 'Background Message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || '/firebase-logo.png',
    image: payload.notification?.image,
    badge: payload.notification?.badge,
    tag: payload.notification?.tag || 'default',
    data: {
      click_action: payload.notification?.click_action || '/',
      ...payload.data
    },
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const clickAction = event.notification.data?.click_action || '/';
    
    event.waitUntil(
      clients.openWindow(clickAction)
    );
  }
});
```

### Permission Management

Request and check notification permissions.

```typescript
// Request notification permission
async function requestNotificationPermission(): Promise<boolean> {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
}

// Check current permission status
function getNotificationPermission(): NotificationPermission {
  if ('Notification' in window) {
    return Notification.permission;
  }
  return 'default';
}

// Usage
const hasPermission = await requestNotificationPermission();
if (hasPermission) {
  // Get FCM token
  const token = await getToken(messaging);
  console.log('FCM token:', token);
} else {
  console.log('Notification permission denied');
}
```

### Topic Subscriptions

Subscribe to topics for targeted messaging (server-side operation).

```typescript
// Client-side: Send token to server for topic subscription
async function subscribeToTopic(token: string, topic: string) {
  await fetch('/api/subscribe-to-topic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, topic })
  });
}

// Server-side example (Node.js)
// const admin = require('firebase-admin');
// 
// app.post('/api/subscribe-to-topic', async (req, res) => {
//   const { token, topic } = req.body;
//   
//   try {
//     await admin.messaging().subscribeToTopic([token], topic);
//     res.json({ success: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });
```

### Message Sending

Send messages from server to clients (server-side operation).

```javascript
// Server-side example (Node.js with Firebase Admin SDK)
const admin = require('firebase-admin');

// Send to specific device
async function sendToDevice(token, notification, data) {
  const message = {
    token: token,
    notification: {
      title: notification.title,
      body: notification.body,
      imageUrl: notification.image
    },
    data: data,
    webpush: {
      notification: {
        icon: '/firebase-logo.png',
        click_action: 'https://myapp.com'
      },
      fcm_options: {
        link: 'https://myapp.com'
      }
    }
  };
  
  try {
    const response = await admin.messaging().send(message);
    console.log('Message sent successfully:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

// Send to topic
async function sendToTopic(topic, notification, data) {
  const message = {
    topic: topic,
    notification: notification,
    data: data
  };
  
  const response = await admin.messaging().send(message);
  console.log('Topic message sent:', response);
}

// Send to multiple devices
async function sendToMultipleDevices(tokens, notification, data) {
  const message = {
    tokens: tokens,
    notification: notification,
    data: data
  };
  
  const response = await admin.messaging().sendMulticast(message);
  console.log('Multicast message sent:', response);
}
```

## Integration Patterns

### User Authentication Integration

```typescript
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getMessaging, getToken, deleteToken } from 'firebase/messaging';

const auth = getAuth();
const messaging = getMessaging();

// Manage FCM token based on auth state
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // User signed in - get FCM token
    try {
      const token = await getToken(messaging);
      if (token) {
        // Associate token with user account
        await associateTokenWithUser(user.uid, token);
      }
    } catch (error) {
      console.error('Error getting FCM token:', error);
    }
  } else {
    // User signed out - delete FCM token
    try {
      await deleteToken(messaging);
      console.log('FCM token deleted on sign out');
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }
});

async function associateTokenWithUser(userId: string, token: string) {
  await fetch('/api/associate-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, token })
  });
}
```

### Analytics Integration

```typescript
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getMessaging, onMessage } from 'firebase/messaging';

const analytics = getAnalytics();
const messaging = getMessaging();

// Track notification events
onMessage(messaging, (payload) => {
  // Log notification received event
  logEvent(analytics, 'notification_received', {
    notification_id: payload.messageId,
    notification_title: payload.notification?.title,
    has_data: payload.data ? 'yes' : 'no'
  });
  
  // Handle message
  handleForegroundMessage(payload);
});

// Track notification interactions
function trackNotificationClick(messageId: string, action: string) {
  logEvent(analytics, 'notification_click', {
    notification_id: messageId,
    action: action
  });
}
```