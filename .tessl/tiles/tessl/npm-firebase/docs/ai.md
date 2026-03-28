# Vertex AI

Generative AI capabilities powered by Google's Vertex AI platform. Enables natural language processing, content generation, and chat functionality.

## Capabilities

### Vertex AI Service

```typescript { .api }
/**
 * Gets the Vertex AI service instance for the given app
 * @param app - Firebase app instance, uses default if not provided
 * @param options - Optional Vertex AI configuration
 * @returns Vertex AI service instance
 */
function getVertexAI(app?: FirebaseApp, options?: VertexAIOptions): VertexAI;

interface VertexAI {
  /** Firebase app instance */
  readonly app: FirebaseApp;
  /** Vertex AI location */
  readonly location: string;
}

interface VertexAIOptions {
  /** Vertex AI location/region */
  location?: string;
}
```

### Generative Models

Create and configure generative AI models.

```typescript { .api }
/**
 * Gets a generative model instance
 * @param vertexAI - Vertex AI service instance
 * @param modelParams - Model configuration parameters
 * @param requestOptions - Optional request configuration
 * @returns Generative model instance
 */
function getGenerativeModel(
  vertexAI: VertexAI,
  modelParams: ModelParams,
  requestOptions?: RequestOptions
): GenerativeModel;

interface ModelParams {
  /** Model name (e.g., 'gemini-pro', 'gemini-pro-vision') */
  model: string;
  /** Generation configuration */
  generationConfig?: GenerationConfig;
  /** Safety settings */
  safetySettings?: SafetySetting[];
  /** System instruction */
  systemInstruction?: string | Content;
  /** Tools available to the model */
  tools?: Tool[];
  /** Tool configuration */
  toolConfig?: ToolConfig;
}

interface GenerationConfig {
  /** Maximum number of tokens to generate */
  maxOutputTokens?: number;
  /** Temperature for randomness (0.0 to 1.0) */
  temperature?: number;
  /** Top-p sampling parameter */
  topP?: number;
  /** Top-k sampling parameter */
  topK?: number;
  /** Number of response candidates */
  candidateCount?: number;
  /** Stop sequences */
  stopSequences?: string[];
}

interface SafetySetting {
  /** Safety category */
  category: HarmCategory;
  /** Safety threshold */
  threshold: HarmBlockThreshold;
}

type HarmCategory = 'HARM_CATEGORY_HATE_SPEECH' | 'HARM_CATEGORY_DANGEROUS_CONTENT' | 'HARM_CATEGORY_HARASSMENT' | 'HARM_CATEGORY_SEXUALLY_EXPLICIT';
type HarmBlockThreshold = 'HARM_BLOCK_THRESHOLD_UNSPECIFIED' | 'BLOCK_LOW_AND_ABOVE' | 'BLOCK_MEDIUM_AND_ABOVE' | 'BLOCK_ONLY_HIGH' | 'BLOCK_NONE';

interface RequestOptions {
  /** Request timeout in milliseconds */
  timeout?: number;
  /** API version */
  apiVersion?: string;
}
```

**Usage Examples:**

```typescript
import { getVertexAI, getGenerativeModel } from 'firebase/ai';

const vertexAI = getVertexAI();

// Create a basic generative model
const model = getGenerativeModel(vertexAI, {
  model: 'gemini-pro'
});

// Create model with configuration
const configuredModel = getGenerativeModel(vertexAI, {
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 1024,
    stopSequences: ['END']
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
  systemInstruction: 'You are a helpful assistant that provides accurate information.'
});

// Vision model for image analysis
const visionModel = getGenerativeModel(vertexAI, {
  model: 'gemini-pro-vision'
});
```

### Content Generation

Generate content using AI models.

```typescript { .api }
/**
 * Generates content from the model
 * @param model - Generative model instance
 * @param request - Content generation request
 * @returns Promise resolving to generation result
 */
function generateContent(
  model: GenerativeModel,
  request: GenerateContentRequest
): Promise<GenerateContentResult>;

/**
 * Generates content with streaming response
 * @param model - Generative model instance
 * @param request - Content generation request
 * @returns Promise resolving to streaming result
 */
function generateContentStream(
  model: GenerativeModel,
  request: GenerateContentRequest
): Promise<GenerateContentStreamResult>;

interface GenerateContentRequest {
  /** Input contents */
  contents: Content[];
  /** Optional system instruction override */
  systemInstruction?: string | Content;
  /** Optional generation config override */
  generationConfig?: GenerationConfig;
  /** Optional safety settings override */
  safetySettings?: SafetySetting[];
  /** Optional tools override */
  tools?: Tool[];
}

interface Content {
  /** Content role */
  role?: string;
  /** Content parts */
  parts: Part[];
}

interface Part {
  /** Text content */
  text?: string;
  /** Inline data (images, etc.) */
  inlineData?: Blob;
  /** Function call */
  functionCall?: FunctionCall;
  /** Function response */
  functionResponse?: FunctionResponse;
}

interface GenerateContentResult {
  /** Generated response */
  response: GenerateContentResponse;
}

interface GenerateContentResponse {
  /** Response candidates */
  candidates?: GenerateContentCandidate[];
  /** Prompt feedback */
  promptFeedback?: PromptFeedback;
  /** Usage metadata */
  usageMetadata?: UsageMetadata;
}

interface GenerateContentCandidate {
  /** Generated content */
  content: Content;
  /** Finish reason */
  finishReason?: FinishReason;
  /** Safety ratings */
  safetyRatings?: SafetyRating[];
  /** Citation metadata */
  citationMetadata?: CitationMetadata;
  /** Token count */
  tokenCount?: number;
  /** Index */
  index?: number;
}

type FinishReason = 'FINISH_REASON_UNSPECIFIED' | 'STOP' | 'MAX_TOKENS' | 'SAFETY' | 'RECITATION' | 'OTHER';
```

**Usage Examples:**

```typescript
import { getVertexAI, getGenerativeModel, generateContent } from 'firebase/ai';

const vertexAI = getVertexAI();
const model = getGenerativeModel(vertexAI, { model: 'gemini-pro' });

// Simple text generation
const result = await generateContent(model, {
  contents: [{
    role: 'user',
    parts: [{ text: 'Write a short story about a robot learning to paint.' }]
  }]
});

const response = result.response;
const text = response.candidates?.[0]?.content.parts[0]?.text;
console.log('Generated story:', text);

// Multi-turn conversation
const conversationResult = await generateContent(model, {
  contents: [
    {
      role: 'user',
      parts: [{ text: 'What is the capital of France?' }]
    },
    {
      role: 'model',
      parts: [{ text: 'The capital of France is Paris.' }]
    },
    {
      role: 'user',
      parts: [{ text: 'What is its population?' }]
    }
  ]
});

console.log('Population answer:', conversationResult.response.candidates?.[0]?.content.parts[0]?.text);

// Image analysis with vision model
const visionModel = getGenerativeModel(vertexAI, { model: 'gemini-pro-vision' });

const imageFile = document.getElementById('imageInput') as HTMLInputElement;
const file = imageFile.files?.[0];

if (file) {
  const imageResult = await generateContent(visionModel, {
    contents: [{
      role: 'user',
      parts: [
        { text: 'Describe what you see in this image.' },
        { inlineData: { mimeType: file.type, data: await fileToBase64(file) } }
      ]
    }]
  });
  
  console.log('Image description:', imageResult.response.candidates?.[0]?.content.parts[0]?.text);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
```

### Chat Sessions

Create interactive chat sessions with persistent context.

```typescript { .api }
/**
 * Starts a chat session with the model
 * @param model - Generative model instance
 * @param startChatParams - Optional chat configuration
 * @returns Chat session instance
 */
function startChat(model: GenerativeModel, startChatParams?: StartChatParams): ChatSession;

interface StartChatParams {
  /** Chat history */
  history?: Content[];
  /** Generation config override */
  generationConfig?: GenerationConfig;
  /** Safety settings override */
  safetySettings?: SafetySetting[];
  /** Tools override */
  tools?: Tool[];
}

interface ChatSession {
  /** Send a message and get response */
  sendMessage(request: string | Array<string | Part>): Promise<GenerateContentResult>;
  /** Send message with streaming response */
  sendMessageStream(request: string | Array<string | Part>): Promise<GenerateContentStreamResult>;
  /** Get chat history */
  getHistory(): Promise<Content[]>;
  /** Get token count for conversation */
  countTokens(): Promise<CountTokensResponse>;
}
```

**Usage Examples:**

```typescript
import { getVertexAI, getGenerativeModel, startChat } from 'firebase/ai';

const vertexAI = getVertexAI();
const model = getGenerativeModel(vertexAI, {
  model: 'gemini-pro',
  generationConfig: {
    temperature: 0.9,
    maxOutputTokens: 2048
  }
});

// Start a new chat session
const chat = startChat(model);

// Send messages
const result1 = await chat.sendMessage('Hello! Can you help me plan a trip to Japan?');
console.log('Response 1:', result1.response.candidates?.[0]?.content.parts[0]?.text);

const result2 = await chat.sendMessage('I\'m interested in traditional culture and modern technology.');
console.log('Response 2:', result2.response.candidates?.[0]?.content.parts[0]?.text);

const result3 = await chat.sendMessage('What cities should I visit?');
console.log('Response 3:', result3.response.candidates?.[0]?.content.parts[0]?.text);

// Get chat history
const history = await chat.getHistory();
console.log('Chat history:', history);

// Start chat with initial history
const chatWithHistory = startChat(model, {
  history: [
    {
      role: 'user',
      parts: [{ text: 'My name is Alice and I love cooking.' }]
    },
    {
      role: 'model',
      parts: [{ text: 'Nice to meet you, Alice! I\'d love to help you with cooking questions.' }]
    }
  ]
});

const continueResult = await chatWithHistory.sendMessage('Can you suggest a recipe for beginners?');
console.log('Recipe suggestion:', continueResult.response.candidates?.[0]?.content.parts[0]?.text);
```

### Streaming Responses

Handle streaming responses for real-time content generation.

```typescript { .api }
interface GenerateContentStreamResult {
  /** Async iterable stream of responses */
  stream: AsyncIterable<GenerateContentResult>;
  /** Get final aggregated response */
  response: Promise<GenerateContentResult>;
}
```

**Usage Examples:**

```typescript
import { generateContentStream } from 'firebase/ai';

// Stream content generation
const streamResult = await generateContentStream(model, {
  contents: [{
    role: 'user',
    parts: [{ text: 'Write a detailed explanation of how photosynthesis works.' }]
  }]
});

// Process streaming chunks
let fullText = '';
for await (const chunk of streamResult.stream) {
  const chunkText = chunk.response.candidates?.[0]?.content.parts[0]?.text || '';
  fullText += chunkText;
  
  // Update UI with incremental text
  updateTextDisplay(fullText);
}

console.log('Final text:', fullText);

// Stream chat messages
const chat = startChat(model);
const chatStreamResult = await chat.sendMessageStream('Tell me about the history of artificial intelligence.');

let responseText = '';
for await (const chunk of chatStreamResult.stream) {
  const chunkText = chunk.response.candidates?.[0]?.content.parts[0]?.text || '';
  responseText += chunkText;
  
  // Real-time typing effect
  displayTypingText(responseText);
}

function updateTextDisplay(text: string): void {
  const displayElement = document.getElementById('generated-content');
  if (displayElement) {
    displayElement.textContent = text;
  }
}

function displayTypingText(text: string): void {
  const chatElement = document.getElementById('chat-response');
  if (chatElement) {
    chatElement.innerHTML = text.replace(/\n/g, '<br>');
    chatElement.scrollIntoView({ behavior: 'smooth' });
  }
}
```

### Token Counting

Count tokens for input content and manage costs.

```typescript { .api }
/**
 * Counts tokens in the provided content
 * @param model - Generative model instance
 * @param request - Token counting request
 * @returns Promise resolving to token count response
 */
function countTokens(
  model: GenerativeModel,
  request: CountTokensRequest
): Promise<CountTokensResponse>;

interface CountTokensRequest {
  /** Contents to count tokens for */
  contents: Content[];
}

interface CountTokensResponse {
  /** Total token count */
  totalTokens: number;
  /** Billable characters */
  totalBillableCharacters?: number;
}

interface UsageMetadata {
  /** Input tokens */
  promptTokenCount?: number;
  /** Output tokens */
  candidatesTokenCount?: number;
  /** Total tokens */
  totalTokenCount?: number;
}
```

**Usage Examples:**

```typescript
import { countTokens } from 'firebase/ai';

// Count tokens before generation
const tokenRequest = {
  contents: [{
    role: 'user',
    parts: [{ text: 'Write a comprehensive guide about machine learning for beginners, including examples and exercises.' }]
  }]
};

const tokenCount = await countTokens(model, tokenRequest);
console.log('Input tokens:', tokenCount.totalTokens);

// Check if within limits
const maxTokens = 8192;
if (tokenCount.totalTokens > maxTokens * 0.8) {
  console.warn('Input is approaching token limit');
}

// Generate content and check usage
const result = await generateContent(model, tokenRequest);
const usage = result.response.usageMetadata;
if (usage) {
  console.log('Prompt tokens:', usage.promptTokenCount);
  console.log('Response tokens:', usage.candidatesTokenCount);
  console.log('Total tokens:', usage.totalTokenCount);
}
```

### Function Calling

Integrate with custom functions and tools.

```typescript { .api }
interface Tool {
  /** Function declarations */
  functionDeclarations?: FunctionDeclaration[];
}

interface FunctionDeclaration {
  /** Function name */
  name: string;
  /** Function description */
  description: string;
  /** Function parameters schema */
  parameters?: FunctionParameters;
}

interface FunctionParameters {
  /** Schema type */
  type: 'object';
  /** Parameter properties */
  properties: { [key: string]: ParameterSchema };
  /** Required parameters */
  required?: string[];
}

interface ParameterSchema {
  /** Parameter type */
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  /** Parameter description */
  description?: string;
  /** Enum values */
  enum?: string[];
}

interface FunctionCall {
  /** Function name */
  name: string;
  /** Function arguments */
  args: { [key: string]: any };
}

interface FunctionResponse {
  /** Function name */
  name: string;
  /** Function response */
  response: { [key: string]: any };
}
```

**Usage Examples:**

```typescript
// Define available functions
const tools: Tool[] = [{
  functionDeclarations: [
    {
      name: 'getCurrentWeather',
      description: 'Get the current weather for a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'The city and state, e.g. San Francisco, CA'
          },
          unit: {
            type: 'string',
            enum: ['celsius', 'fahrenheit'],
            description: 'Temperature unit'
          }
        },
        required: ['location']
      }
    },
    {
      name: 'searchRestaurants',
      description: 'Search for restaurants in a location',
      parameters: {
        type: 'object',
        properties: {
          location: {
            type: 'string',
            description: 'City or area to search'
          },
          cuisine: {
            type: 'string',
            description: 'Type of cuisine'
          },
          priceRange: {
            type: 'string',
            enum: ['budget', 'moderate', 'expensive'],
            description: 'Price range preference'
          }
        },
        required: ['location']
      }
    }
  ]
}];

// Create model with tools
const modelWithTools = getGenerativeModel(vertexAI, {
  model: 'gemini-pro',
  tools: tools
});

// Function implementations
const functions = {
  getCurrentWeather: async (args: { location: string; unit?: string }) => {
    // Call weather API
    const response = await fetch(`/api/weather?location=${encodeURIComponent(args.location)}&unit=${args.unit || 'celsius'}`);
    const data = await response.json();
    return {
      temperature: data.temperature,
      condition: data.condition,
      humidity: data.humidity,
      location: args.location
    };
  },
  
  searchRestaurants: async (args: { location: string; cuisine?: string; priceRange?: string }) => {
    // Call restaurant API
    const response = await fetch('/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    });
    const restaurants = await response.json();
    return { restaurants: restaurants.slice(0, 5) }; // Top 5 results
  }
};

// Handle function calling conversation
async function handleFunctionCallingChat() {
  const chat = startChat(modelWithTools);
  
  let result = await chat.sendMessage('What\'s the weather like in Tokyo and can you recommend some good sushi restaurants there?');
  
  while (true) {
    const candidate = result.response.candidates?.[0];
    if (!candidate) break;
    
    const functionCalls = candidate.content.parts.filter(part => part.functionCall);
    
    if (functionCalls.length === 0) {
      // No function calls, we have the final response
      console.log('Final response:', candidate.content.parts[0]?.text);
      break;
    }
    
    // Execute function calls
    const functionResponses: Content[] = [];
    
    for (const part of functionCalls) {
      if (part.functionCall) {
        const functionName = part.functionCall.name;
        const functionArgs = part.functionCall.args;
        
        console.log(`Calling function: ${functionName}`, functionArgs);
        
        try {
          const functionResult = await functions[functionName as keyof typeof functions](functionArgs);
          
          functionResponses.push({
            role: 'function',
            parts: [{
              functionResponse: {
                name: functionName,
                response: functionResult
              }
            }]
          });
        } catch (error) {
          console.error(`Function ${functionName} failed:`, error);
          
          functionResponses.push({
            role: 'function',
            parts: [{
              functionResponse: {
                name: functionName,
                response: { error: 'Function execution failed' }
              }
            }]
          });
        }
      }
    }
    
    // Send function responses back to model
    if (functionResponses.length > 0) {
      result = await generateContent(modelWithTools, {
        contents: [
          ...(await chat.getHistory()),
          ...functionResponses
        ]
      });
    } else {
      break;
    }
  }
}

// Execute function calling example
handleFunctionCallingChat();
```

## Error Handling and Best Practices

### Robust Error Handling

```typescript
class AIErrorHandler {
  static async safeGenerateContent(
    model: GenerativeModel,
    request: GenerateContentRequest,
    maxRetries: number = 3
  ): Promise<GenerateContentResult | null> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const result = await generateContent(model, request);
        
        // Check if response was blocked by safety filters
        const candidate = result.response.candidates?.[0];
        if (candidate?.finishReason === 'SAFETY') {
          console.warn('Response blocked by safety filters');
          return null;
        }
        
        return result;
      } catch (error) {
        console.error(`Generation attempt ${attempt + 1} failed:`, error);
        
        if (attempt === maxRetries - 1) {
          throw error;
        }
        
        // Wait before retry (exponential backoff)
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    return null;
  }
  
  static handleGenerationError(error: any): string {
    if (error.message?.includes('quota')) {
      return 'API quota exceeded. Please try again later.';
    }
    
    if (error.message?.includes('safety')) {
      return 'Content was blocked by safety filters.';
    }
    
    if (error.message?.includes('rate limit')) {
      return 'Too many requests. Please slow down.';
    }
    
    return 'An error occurred while generating content. Please try again.';
  }
}

// Usage
try {
  const result = await AIErrorHandler.safeGenerateContent(model, {
    contents: [{ role: 'user', parts: [{ text: 'Tell me about space exploration' }] }]
  });
  
  if (result) {
    console.log('Generated content:', result.response.candidates?.[0]?.content.parts[0]?.text);
  } else {
    console.log('Content generation was blocked or failed');
  }
} catch (error) {
  const userFriendlyMessage = AIErrorHandler.handleGenerationError(error);
  console.error('User message:', userFriendlyMessage);
}
```

### Content Moderation and Safety

```typescript
class ContentModerator {
  static checkSafetyRatings(candidate: GenerateContentCandidate): boolean {
    if (!candidate.safetyRatings) return true;
    
    for (const rating of candidate.safetyRatings) {
      if (rating.probability === 'HIGH' || rating.probability === 'MEDIUM') {
        console.warn(`Content flagged for ${rating.category}: ${rating.probability}`);
        return false;
      }
    }
    
    return true;
  }
  
  static filterContent(result: GenerateContentResult): string | null {
    const candidate = result.response.candidates?.[0];
    if (!candidate) return null;
    
    if (candidate.finishReason === 'SAFETY') {
      console.warn('Content blocked by safety filters');
      return null;
    }
    
    if (!this.checkSafetyRatings(candidate)) {
      return null;
    }
    
    return candidate.content.parts[0]?.text || null;
  }
}

// Usage with safety checks
const result = await generateContent(model, {
  contents: [{ role: 'user', parts: [{ text: userInput }] }]
});

const safeContent = ContentModerator.filterContent(result);
if (safeContent) {
  displayToUser(safeContent);
} else {
  displayError('Content could not be generated due to safety restrictions.');
}
```