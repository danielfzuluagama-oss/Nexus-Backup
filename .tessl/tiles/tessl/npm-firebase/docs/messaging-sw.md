# Firebase Cloud Messaging - Service Worker

Firebase Cloud Messaging service worker implementation for handling push notifications in the background and when the app is not active.

## Capabilities

### Service Worker Messaging

```typescript { .api }
/**
 * Gets the Messaging service instance for service worker environment
 * @param app - Firebase app instance, uses default if not provided
 * @returns Messaging service instance configured for service worker
 */
function getMessaging(app?: FirebaseApp): Messaging;

/**
 * Handles background messages when app is not in foreground
 * @param messaging - Messaging service instance
 * @param nextOrObserver - Message handler function or observer
 * @returns Unsubscribe function
 */
function onBackgroundMessage(
  messaging: Messaging,
  nextOrObserver: NextOrObserver<MessagePayload>
): Unsubscribe;

interface Messaging {
  /** Firebase app instance */
  readonly app: FirebaseApp;
}
```

### Background Message Handling

```typescript { .api }
/**
 * Called when a background message is received
 * @param messaging - Messaging service instance
 * @param callback - Function to handle background messages
 * @returns Unsubscribe function
 */
function onBackgroundMessage(
  messaging: Messaging,
  callback: (payload: MessagePayload) => void
): Unsubscribe;

interface MessagePayload {
  /** Custom data payload */
  readonly data?: { [key: string]: string };
  /** Notification payload */
  readonly notification?: NotificationPayload;
  /** Collapse key for message grouping */
  readonly collapseKey?: string;
  /** Message ID */
  readonly messageId?: string;
  /** Message type */
  readonly messageType?: string;
}

interface NotificationPayload {
  /** Notification title */
  readonly title?: string;
  /** Notification body text */
  readonly body?: string;
  /** Notification icon URL */
  readonly icon?: string;
  /** Large notification image URL */
  readonly image?: string;
}
```

**Usage Examples:**

Service Worker (`firebase-messaging-sw.js`):

```typescript
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
  
  const notificationTitle = payload.notification?.title || 'New message';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new message',
    icon: payload.notification?.icon || '/firebase-logo.png',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

### Notification Actions

```typescript { .api }
/**
 * Handle notification click events
 * @param event - Notification click event
 */
function handleNotificationClick(event: NotificationEvent): void;

interface NotificationEvent extends ExtendableEvent {
  /** The notification that was clicked */
  readonly notification: Notification;
  /** Action identifier if action button was clicked */
  readonly action?: string;
}
```

**Usage Examples:**

```typescript
// In service worker
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'view') {
    // Handle action button click
    clients.openWindow('/messages');
  } else {
    // Handle general notification click
    clients.openWindow('/');
  }
});
```