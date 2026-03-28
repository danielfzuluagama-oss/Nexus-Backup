# Firebase JavaScript SDK

Firebase provides a comprehensive suite of backend services for modern web and mobile applications. The Firebase JavaScript SDK offers a modular architecture with tree-shaking support, enabling developers to include only the services they need while maintaining optimal bundle size.

## Package Information

- **Package Name**: firebase
- **Package Type**: npm
- **Language**: JavaScript/TypeScript
- **Installation**: `npm install firebase`

## Core Imports

Firebase uses a modular import system where each service is imported from its own subpath:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
```

For CommonJS:

```javascript
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, collection, getDocs } = require('firebase/firestore');
```

## Basic Usage

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);

// Use services
const auth = getAuth(app);
const db = getFirestore(app);

// Authenticate user
const userCredential = await signInWithEmailAndPassword(auth, 'user@example.com', 'password');

// Query database
const querySnapshot = await getDocs(collection(db, 'users'));
querySnapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

## Architecture

Firebase JavaScript SDK is built around several key architectural principles:

- **Modular Design**: Each service is a separate module with its own import path
- **Tree-Shaking**: Only imported functionality is included in the final bundle
- **Service Instances**: Services are initialized with app instances for multi-project support
- **Real-time Capabilities**: Built-in support for real-time data synchronization across clients
- **Cross-Platform**: Works in web browsers, Node.js, React Native, and other JavaScript environments

## Capabilities

### App Initialization

Core Firebase app management and initialization functionality. Required for all other Firebase services.

```typescript { .api }
function initializeApp(options: FirebaseOptions, name?: string): FirebaseApp;
function getApp(name?: string): FirebaseApp;
function getApps(): FirebaseApp[];
function deleteApp(app: FirebaseApp): Promise<void>;

interface FirebaseApp {
  readonly name: string;
  readonly options: FirebaseOptions;
  automaticDataCollectionEnabled: boolean;
}

interface FirebaseOptions {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}
```

[App Management](./app.md)

### Authentication

User authentication and identity management with support for multiple providers including email/password, OAuth (Google, Facebook, Twitter), phone numbers, and anonymous authentication.

```typescript { .api }
function getAuth(app?: FirebaseApp): Auth;
function signInWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
function createUserWithEmailAndPassword(auth: Auth, email: string, password: string): Promise<UserCredential>;
function signOut(auth: Auth): Promise<void>;
function onAuthStateChanged(auth: Auth, nextOrObserver: NextOrObserver<User>): Unsubscribe;

interface Auth {
  readonly app: FirebaseApp;
  readonly currentUser: User | null;
  languageCode: string | null;
}

interface User {
  readonly uid: string;
  readonly email: string | null;
  readonly displayName: string | null;
  readonly photoURL: string | null;
  readonly emailVerified: boolean;
}
```

[Authentication](./auth.md)

#### Platform-Specific Authentication

Firebase Authentication provides specialized variants for different platforms:

- **Cordova/PhoneGap**: `firebase/auth/cordova` - Native mobile integration with OAuth providers
- **Web Extensions**: `firebase/auth/web-extension` - Browser extension-optimized authentication flows

[Cordova Authentication](./auth-cordova.md) | [Web Extension Authentication](./auth-web-extension.md)

### Cloud Firestore

NoSQL document database with real-time synchronization, offline support, and powerful querying capabilities. Includes both full and lite versions for different use cases.

```typescript { .api }
function getFirestore(app?: FirebaseApp): Firestore;
function collection(firestore: Firestore, path: string): CollectionReference<DocumentData>;
function doc(firestore: Firestore, path: string): DocumentReference<DocumentData>;
function addDoc(reference: CollectionReference<T>, data: T): Promise<DocumentReference<T>>;
function getDoc(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;
function onSnapshot(reference: DocumentReference<T>, observer: (snapshot: DocumentSnapshot<T>) => void): Unsubscribe;

interface Firestore {
  readonly app: FirebaseApp;
}

interface DocumentReference<T = DocumentData> {
  readonly firestore: Firestore;
  readonly id: string;
  readonly path: string;
}

interface CollectionReference<T = DocumentData> extends Query<T> {
  readonly firestore: Firestore;
  readonly id: string;
  readonly path: string;
}
```

[Cloud Firestore](./firestore.md)

### Realtime Database

Real-time JSON database with automatic data synchronization across all connected clients. Perfect for applications requiring live updates and collaboration features.

```typescript { .api }
function getDatabase(app?: FirebaseApp, url?: string): Database;
function ref(database: Database, path?: string): DatabaseReference;
function set(ref: DatabaseReference, value: unknown): Promise<void>;
function get(query: Query): Promise<DataSnapshot>;
function on(query: Query, eventType: EventType, callback: (snapshot: DataSnapshot) => unknown): Unsubscribe;

interface Database {
  readonly app: FirebaseApp;
}

interface DatabaseReference extends Query {
  readonly key: string | null;
  readonly parent: DatabaseReference | null;
  readonly root: DatabaseReference;
}

interface DataSnapshot {
  exists(): boolean;
  val(): any;
  key: string | null;
  ref: DatabaseReference;
}
```

[Realtime Database](./database.md)

### Cloud Storage

File upload and download service with automatic scaling and CDN distribution. Supports resumable uploads, metadata management, and security rules.

```typescript { .api }
function getStorage(app?: FirebaseApp, bucketUrl?: string): FirebaseStorage;
function ref(storage: FirebaseStorage, url?: string): StorageReference;
function uploadBytes(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer): Promise<UploadResult>;
function getDownloadURL(ref: StorageReference): Promise<string>;
function deleteObject(ref: StorageReference): Promise<void>;

interface FirebaseStorage {
  readonly app: FirebaseApp;
  readonly bucket: string;
  maxUploadRetryTime: number;
  maxOperationRetryTime: number;
}

interface StorageReference {
  readonly bucket: string;
  readonly fullPath: string;
  readonly name: string;
  readonly storage: FirebaseStorage;
}
```

[Cloud Storage](./storage.md)

### Cloud Functions

Call server-side functions deployed to Firebase Cloud Functions. Provides seamless integration between client and server code with automatic scaling and HTTPS endpoints.

```typescript { .api }
function getFunctions(app?: FirebaseApp, regionOrCustomDomain?: string): Functions;
function httpsCallable<RequestData = any, ResponseData = any>(
  functionsInstance: Functions,
  name: string
): HttpsCallable<RequestData, ResponseData>;

interface Functions {
  readonly app: FirebaseApp;
}

interface HttpsCallable<RequestData = any, ResponseData = any> {
  (data?: RequestData): Promise<HttpsCallableResult<ResponseData>>;
}

interface HttpsCallableResult<ResponseData = any> {
  readonly data: ResponseData;
}
```

[Cloud Functions](./functions.md)

### Analytics

Google Analytics integration with automatic event tracking and custom event logging. Provides detailed insights into user behavior and app performance.

```typescript { .api }
function getAnalytics(app?: FirebaseApp): Analytics;
function logEvent(analyticsInstance: Analytics, eventName: string, eventParams?: EventParams): void;
function setUserId(analyticsInstance: Analytics, id: string | null): void;
function setUserProperties(analyticsInstance: Analytics, properties: CustomParams): void;

interface Analytics {
  readonly app: FirebaseApp;
}

interface EventParams {
  [key: string]: any;
}

interface CustomParams {
  [key: string]: any;
}
```

[Analytics](./analytics.md)

### Cloud Messaging

Push notification service for web and mobile applications. Supports targeted messaging, topic subscriptions, and rich notifications.

```typescript { .api }
function getMessaging(app?: FirebaseApp): Messaging;
function getToken(messaging: Messaging, options?: GetTokenOptions): Promise<string>;
function onMessage(messaging: Messaging, nextOrObserver: NextOrObserver<MessagePayload>): Unsubscribe;

interface Messaging {
  readonly app: FirebaseApp;
}

interface MessagePayload {
  readonly data?: { [key: string]: string };
  readonly notification?: NotificationPayload;
}

interface GetTokenOptions {
  vapidKey?: string;
  serviceWorkerRegistration?: ServiceWorkerRegistration;
}
```

[Cloud Messaging](./messaging.md)

#### Service Worker Messaging

For background message handling in web applications:

- **Service Worker**: `firebase/messaging/sw` - Handle push notifications when app is not active

[Service Worker Messaging](./messaging-sw.md)

### Performance Monitoring

Application performance monitoring with automatic metrics collection and custom trace creation. Helps identify bottlenecks and optimize user experience.

```typescript { .api }
function getPerformance(app?: FirebaseApp): FirebasePerformance;
function trace(performance: FirebasePerformance, traceName: string): Trace;

interface FirebasePerformance {
  readonly app: FirebaseApp;
}

interface Trace {
  start(): void;
  stop(): void;
  putAttribute(attributeName: string, attributeValue: string): void;
  putMetric(metricName: string, num: number): void;
}
```

[Performance Monitoring](./performance.md)

### Remote Config

Dynamic configuration service that allows you to change app behavior without deploying updates. Perfect for A/B testing and feature flags.

```typescript { .api }
function getRemoteConfig(app?: FirebaseApp): RemoteConfig;
function activate(remoteConfig: RemoteConfig): Promise<boolean>;
function fetchAndActivate(remoteConfig: RemoteConfig): Promise<boolean>;
function getString(remoteConfig: RemoteConfig, key: string): string;
function getBoolean(remoteConfig: RemoteConfig, key: string): boolean;
function getNumber(remoteConfig: RemoteConfig, key: string): number;

interface RemoteConfig {
  readonly app: FirebaseApp;
  settings: RemoteConfigSettings;
  defaultConfig: { [key: string]: string | number | boolean };
}

interface Value {
  asBoolean(): boolean;
  asNumber(): number;
  asString(): string;
}
```

[Remote Config](./remote-config.md)

### App Check

App attestation service that protects your backend resources from abuse. Verifies that requests come from your authentic app.

```typescript { .api }
function initializeAppCheck(app: FirebaseApp, options: AppCheckOptions): AppCheck;
function getToken(appCheckInstance: AppCheck, forceRefresh?: boolean): Promise<AppCheckTokenResult>;

interface AppCheck {
  readonly app: FirebaseApp;
}

interface AppCheckTokenResult {
  readonly token: string;
}

interface AppCheckOptions {
  provider: AppCheckProvider;
  isTokenAutoRefreshEnabled?: boolean;
}
```

[App Check](./app-check.md)

### Vertex AI

Generative AI capabilities powered by Google's Vertex AI platform. Enables natural language processing, content generation, and chat functionality.

```typescript { .api }
function getVertexAI(app?: FirebaseApp, options?: VertexAIOptions): VertexAI;
function getGenerativeModel(vertexAI: VertexAI, modelParams: ModelParams): GenerativeModel;
function generateContent(model: GenerativeModel, request: GenerateContentRequest): Promise<GenerateContentResult>;

interface VertexAI {
  readonly app: FirebaseApp;
}

interface GenerativeModel {
  generateContent(request: GenerateContentRequest): Promise<GenerateContentResult>;
  startChat(startChatParams?: StartChatParams): ChatSession;
}

interface GenerateContentRequest {
  contents: Content[];
}
```

[Vertex AI](./ai.md)

### Data Connect

Relational database integration with PostgreSQL, generated client SDKs, and real-time subscriptions. Perfect for applications requiring structured data with relationships.

```typescript { .api }
function getDataConnect(app: FirebaseApp, options: ConnectorConfig): DataConnect;
function queryRef<Data, Variables>(
  dataConnectInstance: DataConnect,
  queryName: string,
  variables?: Variables
): QueryRef<Data, Variables>;
function mutationRef<Data, Variables>(
  dataConnectInstance: DataConnect,
  mutationName: string,
  variables?: Variables
): MutationRef<Data, Variables>;
function subscribe<Data, Variables>(
  queryRef: QueryRef<Data, Variables>,
  observer: SubscriptionOptions<Data, Variables>
): QueryUnsubscribe;

interface ConnectorConfig {
  location: string;
  connector: string;
  service: string;
}
```

[Data Connect](./data-connect.md)

### Installations

Firebase Installation ID management for analytics, messaging, and service authentication. Provides unique identifiers for each app installation.

```typescript { .api }
function getInstallations(app?: FirebaseApp): Installations;
function getId(installations: Installations): Promise<string>;
function getToken(installations: Installations, forceRefresh?: boolean): Promise<string>;
function onIdChange(installations: Installations, callback: IdChangeCallbackFn): IdChangeUnsubscribeFn;
function deleteInstallations(installations: Installations): Promise<void>;

interface Installations {
  readonly app: FirebaseApp;
}
```

[Installations](./installations.md)

### Firestore Lite

Lightweight, read-only Cloud Firestore client optimized for server-side applications and scenarios without real-time updates.

```typescript { .api }
function getFirestore(app?: FirebaseApp): FirebaseFirestore;
function doc(firestore: FirebaseFirestore, path: string): DocumentReference<DocumentData>;
function collection(firestore: FirebaseFirestore, path: string): CollectionReference<DocumentData>;
function getDoc<T>(reference: DocumentReference<T>): Promise<DocumentSnapshot<T>>;
function getDocs<T>(query: Query<T>): Promise<QuerySnapshot<T>>;
function getAggregateFromServer<T>(
  query: Query<T>,
  aggregateSpec: { count: AggregateField<number> }
): Promise<AggregateQuerySnapshot<{ count: AggregateField<number> }>>;
```

[Firestore Lite](./firestore-lite.md)

## Common Types and Utilities

### Error Handling

```typescript { .api }
class FirebaseError extends Error {
  readonly code: string;
  readonly message: string;
  readonly name: string;
}
```

### Event Management

```typescript { .api }
type Unsubscribe = () => void;
type NextOrObserver<T> = ((value: T) => void) | Observer<T>;

interface Observer<T> {
  next?: (value: T) => void;
  error?: (error: Error) => void;
  complete?: () => void;
}
```

### Configuration

```typescript { .api }
interface FirebaseOptions {
  apiKey?: string;
  authDomain?: string;
  databaseURL?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}
```

## Legacy Compatibility

Firebase v9+ provides compatibility packages under the `firebase/compat/*` namespace for easier migration from v8:

```javascript
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// v8-style API
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
```

The compat layer provides the same API as v8 while benefiting from the tree-shaking optimizations of v9+.