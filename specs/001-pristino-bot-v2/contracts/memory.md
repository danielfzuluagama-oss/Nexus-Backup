# Contract: Memory Module

**Module**: `src/memory.ts`

## Interface

```typescript
interface MemoryInterface {
  // Working Memory (ephemeral, TTL-based)
  addMessage(userId: string, role: string, content: string, sourceType?: string): Promise<void>;
  getRecentMessages(userId: string, limit: number): Promise<Message[]>;

  // Episodic Memory (permanent)
  addVoiceNote(userId: string, transcript: string, metadata: AudioMetadata): Promise<void>;
  addMeeting(userId: string, data: MeetingData): Promise<void>;

  // Semantic Memory (permanent, provenance-tracked)
  addKnowledge(fact: string, confidence: number, source: string, userId: string): Promise<void>;
  getKnowledge(query: string): Promise<Knowledge[]>;
  getUserProfile(userId: string): Promise<UserProfile | null>;
  getTeamPreferences(): Promise<Record<string, string>>;
  getSynergyFacts(): Promise<string[]>;

  // Data Lifecycle (Constitution Principle VIII)
  purgeUser(userId: string): Promise<void>;          // All 3 layers
  purgeExpiredWorking(): Promise<number>;             // Returns count purged
  classifyData(docId: string): "ephemeral" | "persistent" | "permanent";
}
```

**Invariants**:
- Per-instance isolation (Pristino/Deonto never share runtime state)
- Working memory respects configurable TTL (default 30 days)
- `purgeUser()` deletes across all three layers within 30 seconds (SC-008)
- `purgeExpiredWorking()` removes threads past their `expiresAt` timestamp
- All stored data has a lifecycle classification (FR-028)
- Knowledge facts track provenance: source, confidence, reinforcement count
- In-memory fallback when Firestore is unavailable (FR-032)
- Fallback logs explicitly that persistence is degraded
