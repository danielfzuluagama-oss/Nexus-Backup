# Contract: Security Module

**Module**: `src/security.ts`
**Coverage**: 100% (Constitution Principle VI)

## CP1: Input Sanitization (Hard Block)

```typescript
interface SanitizeResult {
  safe: boolean;
  cleaned: string;
  reason?: string;  // Present when safe=false
}

function sanitizeInput(raw: string): SanitizeResult
```

**Invariants**:
- Control characters (`\x00-\x1F`, `\x7F`) are always stripped
- Input truncated to 4096 characters
- Injection patterns detected: "ignore previous instructions", "you are now", "DAN mode", "jailbreak"
- Returns `safe: false` with reason when injection detected; cleaned string still usable
- Never throws; always returns a result

## CP2: Prompt Hardening (Hard Block)

```typescript
function buildSecurePrompt(systemPrompt: string): string
```

**Invariants**:
- Appends security suffix to every system prompt
- Security suffix includes: no prompt reveal, no embedded instruction override, tool whitelist enforcement, no persona impersonation
- Never modifies the original prompt content (append-only)
- Idempotent: calling twice does not double-append

## CP3: Output Validation (Soft Pass)

```typescript
interface ValidateResult {
  safe: boolean;
  cleaned: string;
  warnings: string[];  // All detected issues, logged regardless
}

function validateOutput(response: string): ValidateResult
```

**Invariants**:
- Detects jailbreak compliance patterns (logs warning, does NOT block)
- Scrubs forbidden brand voice terms and replaces them
- Always delivers a response (soft pass per checkpoint hierarchy)
- `warnings` array is always populated with any detected issues
- Never throws; always returns a result
