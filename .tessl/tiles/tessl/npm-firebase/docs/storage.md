# Cloud Storage

File upload and download service with automatic scaling and CDN distribution. Supports resumable uploads, metadata management, and security rules.

## Capabilities

### Storage Service

Initialize and configure Cloud Storage.

```typescript { .api }
/**
 * Gets the Storage service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @param bucketUrl - Optional storage bucket URL
 * @returns Storage service instance
 */
function getStorage(app?: FirebaseApp, bucketUrl?: string): FirebaseStorage;

/**
 * Connects to the Storage emulator for development and testing
 * @param storage - Storage service instance
 * @param host - Emulator host
 * @param port - Emulator port
 * @param options - Optional emulator configuration
 */
function connectStorageEmulator(storage: FirebaseStorage, host: string, port: number, options?: object): void;

interface FirebaseStorage {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Storage bucket name */
  readonly bucket: string;
  /** Maximum upload retry time in milliseconds */
  maxUploadRetryTime: number;
  /** Maximum operation retry time in milliseconds */
  maxOperationRetryTime: number;
}
```

### Storage References

Create and manage references to storage locations.

```typescript { .api }
/**
 * Creates a storage reference for the given path
 * @param storage - Storage service instance
 * @param url - Optional path or gs:// URL
 * @returns Storage reference
 */
function ref(storage: FirebaseStorage, url?: string): StorageReference;

/**
 * Creates a storage reference from a gs:// or https:// URL
 * @param storage - Storage service instance
 * @param url - Full URL to the file
 * @returns Storage reference
 */
function refFromURL(storage: FirebaseStorage, url: string): StorageReference;

interface StorageReference {
  /** Storage bucket name */
  readonly bucket: string;
  /** Full path to the file */
  readonly fullPath: string;
  /** File name */
  readonly name: string;
  /** Parent reference */
  readonly parent: StorageReference | null;
  /** Root reference */
  readonly root: StorageReference;
  /** Storage service instance */
  readonly storage: FirebaseStorage;
  
  /** Get child reference */
  child(path: string): StorageReference;
  /** Convert to string */
  toString(): string;
}
```

### Upload Operations

Upload files and data to Cloud Storage.

```typescript { .api }
/**
 * Uploads data to the storage reference
 * @param ref - Storage reference
 * @param data - Data to upload
 * @param metadata - Optional upload metadata
 * @returns Promise resolving to upload result
 */
function uploadBytes(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): Promise<UploadResult>;

/**
 * Uploads data with resumable upload support
 * @param ref - Storage reference
 * @param data - Data to upload
 * @param metadata - Optional upload metadata
 * @returns Upload task for monitoring progress
 */
function uploadBytesResumable(ref: StorageReference, data: Blob | Uint8Array | ArrayBuffer, metadata?: UploadMetadata): UploadTask;

/**
 * Uploads a string with specified format
 * @param ref - Storage reference
 * @param value - String value to upload
 * @param format - String format
 * @param metadata - Optional upload metadata
 * @returns Promise resolving to upload result
 */
function uploadString(ref: StorageReference, value: string, format?: StringFormat, metadata?: UploadMetadata): Promise<UploadResult>;

type StringFormat = 'raw' | 'base64' | 'base64url' | 'data_url';

interface UploadTask {
  /** Current upload snapshot */
  readonly snapshot: UploadTaskSnapshot;
  
  /** Cancel the upload */
  cancel(): boolean;
  /** Pause the upload */
  pause(): boolean;
  /** Resume the upload */
  resume(): boolean;
  /** Attach state change observer */
  on(event: TaskEvent, nextOrObserver?: StorageObserver<UploadTaskSnapshot> | null, error?: ErrorFn | null, complete?: CompleteFn | null): Unsubscribe;
  /** Promise-like then */
  then<T, R>(onFulfilled?: (snapshot: UploadTaskSnapshot) => T, onRejected?: (error: FirebaseStorageError) => R): Promise<T | R>;
  /** Promise-like catch */
  catch<T>(onRejected: (error: FirebaseStorageError) => T): Promise<T | UploadTaskSnapshot>;
}

interface UploadTaskSnapshot {
  /** Bytes transferred */
  readonly bytesTransferred: number;
  /** Total bytes */
  readonly totalBytes: number;
  /** Upload state */
  readonly state: TaskState;
  /** Storage reference */
  readonly ref: StorageReference;
  /** Upload metadata */
  readonly metadata: FullMetadata;
  /** Upload task */
  readonly task: UploadTask;
}

interface UploadResult {
  /** Storage reference */
  readonly ref: StorageReference;
  /** Upload metadata */
  readonly metadata: FullMetadata;
}

type TaskEvent = 'state_changed';
type TaskState = 'running' | 'paused' | 'success' | 'canceled' | 'error';
type StorageObserver<T> = NextOrObserver<T> | ((snapshot: T) => unknown);
```

**Usage Examples:**

```typescript
import { getStorage, ref, uploadBytes, uploadBytesResumable, uploadString } from 'firebase/storage';

const storage = getStorage();

// Upload file from input element
const fileInput = document.getElementById('fileInput') as HTMLInputElement;
const file = fileInput.files[0];
const storageRef = ref(storage, 'images/' + file.name);

try {
  const snapshot = await uploadBytes(storageRef, file);
  console.log('Upload successful:', snapshot.metadata.fullPath);
} catch (error) {
  console.error('Upload failed:', error);
}

// Resumable upload with progress monitoring
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  },
  (error) => {
    console.error('Upload error:', error);
  },
  () => {
    console.log('Upload completed successfully');
  }
);

// Upload string data
const message = 'Hello, World!';
const textRef = ref(storage, 'messages/message.txt');
await uploadString(textRef, message);

// Upload base64 image
const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD...';
const imageRef = ref(storage, 'images/photo.jpg');
await uploadString(imageRef, base64Image, 'data_url');
```

### Download Operations

Download files and get download URLs.

```typescript { .api }
/**
 * Gets the download URL for the file
 * @param ref - Storage reference
 * @returns Promise resolving to download URL
 */
function getDownloadURL(ref: StorageReference): Promise<string>;

/**
 * Downloads the file as bytes
 * @param ref - Storage reference
 * @param maxDownloadSizeBytes - Maximum download size
 * @returns Promise resolving to ArrayBuffer
 */
function getBytes(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<ArrayBuffer>;

/**
 * Downloads the file as a Blob
 * @param ref - Storage reference
 * @param maxDownloadSizeBytes - Maximum download size
 * @returns Promise resolving to Blob
 */
function getBlob(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<Blob>;

/**
 * Downloads the file as a stream (Node.js only)
 * @param ref - Storage reference
 * @param maxDownloadSizeBytes - Maximum download size
 * @returns Promise resolving to readable stream
 */
function getStream(ref: StorageReference, maxDownloadSizeBytes?: number): Promise<NodeJS.ReadableStream>;
```

**Usage Examples:**

```typescript
import { getStorage, ref, getDownloadURL, getBytes, getBlob } from 'firebase/storage';

const storage = getStorage();
const imageRef = ref(storage, 'images/photo.jpg');

// Get download URL
const url = await getDownloadURL(imageRef);
console.log('Download URL:', url);

// Use URL in HTML
const img = document.createElement('img');
img.src = url;
document.body.appendChild(img);

// Download file as bytes
const arrayBuffer = await getBytes(imageRef);
const uint8Array = new Uint8Array(arrayBuffer);

// Download file as blob
const blob = await getBlob(imageRef);
const objectURL = URL.createObjectURL(blob);

// Create download link
const downloadLink = document.createElement('a');
downloadLink.href = objectURL;
downloadLink.download = 'photo.jpg';
downloadLink.click();
```

### Metadata Operations

Manage file metadata and properties.

```typescript { .api }
/**
 * Gets the metadata for the file
 * @param ref - Storage reference
 * @returns Promise resolving to full metadata
 */
function getMetadata(ref: StorageReference): Promise<FullMetadata>;

/**
 * Updates the metadata for the file
 * @param ref - Storage reference
 * @param metadata - Metadata to update
 * @returns Promise resolving to updated metadata
 */
function updateMetadata(ref: StorageReference, metadata: SettableMetadata): Promise<FullMetadata>;

interface FullMetadata extends UploadMetadata {
  /** Storage bucket */
  readonly bucket: string;
  /** Full path to file */
  readonly fullPath: string;
  /** File generation number */
  readonly generation: string;
  /** Metageneration number */
  readonly metageneration: string;
  /** File name */
  readonly name: string;
  /** File size in bytes */
  readonly size: number;
  /** Creation timestamp */
  readonly timeCreated: string;
  /** Last update timestamp */
  readonly updated: string;
  /** Download tokens */
  readonly downloadTokens?: string[];
  /** MD5 hash */
  readonly md5Hash?: string;
  /** Reference to the file */
  readonly ref?: StorageReference;
}

interface UploadMetadata extends SettableMetadata {
  /** MD5 hash of the file */
  md5Hash?: string;
}

interface SettableMetadata {
  /** Cache control header */
  cacheControl?: string;
  /** Content disposition header */
  contentDisposition?: string;
  /** Content encoding header */
  contentEncoding?: string;
  /** Content language header */
  contentLanguage?: string;
  /** Content type header */
  contentType?: string;
  /** Custom metadata key-value pairs */
  customMetadata?: { [key: string]: string };
}
```

**Usage Examples:**

```typescript
import { getStorage, ref, getMetadata, updateMetadata } from 'firebase/storage';

const storage = getStorage();
const fileRef = ref(storage, 'documents/report.pdf');

// Get file metadata
const metadata = await getMetadata(fileRef);
console.log('File size:', metadata.size);
console.log('Content type:', metadata.contentType);
console.log('Created:', metadata.timeCreated);

// Update metadata
await updateMetadata(fileRef, {
  contentType: 'application/pdf',
  cacheControl: 'public, max-age=3600',
  customMetadata: {
    'uploaded-by': 'user123',
    'project': 'quarterly-report'
  }
});

// Upload with metadata
const file = new File(['Hello World'], 'hello.txt', { type: 'text/plain' });
const uploadRef = ref(storage, 'texts/hello.txt');

await uploadBytes(uploadRef, file, {
  contentType: 'text/plain',
  contentLanguage: 'en',
  customMetadata: {
    'author': 'John Doe',
    'version': '1.0'
  }
});
```

### File Management

Delete files and list directory contents.

```typescript { .api }
/**
 * Deletes the file at the reference
 * @param ref - Storage reference
 * @returns Promise that resolves when deletion is complete
 */
function deleteObject(ref: StorageReference): Promise<void>;

/**
 * Lists all items (files and prefixes) under the reference
 * @param ref - Storage reference
 * @returns Promise resolving to list result
 */
function listAll(ref: StorageReference): Promise<ListResult>;

/**
 * Lists items with pagination support
 * @param ref - Storage reference
 * @param options - List options
 * @returns Promise resolving to list result
 */
function list(ref: StorageReference, options?: ListOptions): Promise<ListResult>;

interface ListResult {
  /** File references */
  readonly items: StorageReference[];
  /** Directory prefixes */
  readonly prefixes: StorageReference[];
  /** Next page token */
  readonly nextPageToken?: string;
}

interface ListOptions {
  /** Maximum number of items to return */
  maxResults?: number;
  /** Page token from previous list call */
  pageToken?: string;
}
```

**Usage Examples:**

```typescript
import { getStorage, ref, deleteObject, listAll, list } from 'firebase/storage';

const storage = getStorage();

// Delete a file
const fileRef = ref(storage, 'images/old-photo.jpg');
await deleteObject(fileRef);
console.log('File deleted successfully');

// List all files in a directory
const folderRef = ref(storage, 'images/');
const result = await listAll(folderRef);

console.log('Files:');
result.items.forEach((itemRef) => {
  console.log('- ' + itemRef.name);
});

console.log('Subdirectories:');
result.prefixes.forEach((folderRef) => {
  console.log('- ' + folderRef.name + '/');
});

// List with pagination
const firstPage = await list(folderRef, { maxResults: 10 });
if (firstPage.nextPageToken) {
  const secondPage = await list(folderRef, {
    maxResults: 10,
    pageToken: firstPage.nextPageToken
  });
}
```

## Error Handling

Cloud Storage provides specific error codes for different scenarios:

```typescript { .api }
interface FirebaseStorageError extends FirebaseError {
  readonly serverResponse: string | null;
}
```

```typescript
import { StorageErrorCode } from 'firebase/storage';

try {
  await uploadBytes(storageRef, file);
} catch (error) {
  switch (error.code) {
    case 'storage/unauthorized':
      console.log('User lacks permission to access the object');
      break;
    case 'storage/canceled':
      console.log('User canceled the upload');
      break;
    case 'storage/unknown':
      console.log('Unknown error occurred');
      break;
    default:
      console.log('Upload error:', error.message);
  }
}
```

## Security Rules Integration

Cloud Storage integrates with Firebase Security Rules:

```javascript
// Example security rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload to their own folder
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow public read access to images
    match /public/images/{allPaths=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

## File Processing

Integrate with other Firebase services for file processing:

```typescript
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFunctions, httpsCallable } from 'firebase/functions';

const storage = getStorage();
const functions = getFunctions();

// Upload image
const imageRef = ref(storage, 'images/original/' + fileName);
await uploadBytes(imageRef, imageFile);

// Trigger server-side processing
const processImage = httpsCallable(functions, 'processImage');
await processImage({ imagePath: imageRef.fullPath });

// Get processed image URL
const processedRef = ref(storage, 'images/processed/' + fileName);
const processedURL = await getDownloadURL(processedRef);
```