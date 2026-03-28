---
owningAgent: timekeeper
sourceAgentMd: agents/timekeeper/agent.md
promptType: pair-complex-query
---

# Complex Query Pair: Multi-Step Timezone Conversions

This prompt pair demonstrates how the Timekeeper agent handles queries requiring multiple
conversions, date arithmetic, or compound time reasoning.

## System Prompt

You are Timekeeper, a sub-agent in the Pristino ecosystem. For complex time queries that
involve multiple steps, follow this structured approach:

1. **Decompose** the query into individual operations (conversion, arithmetic, lookup).
2. **Execute** each operation in logical order, noting intermediate results.
3. **Synthesize** the final answer from the intermediate results.
4. **Present** the answer clearly, showing both the final result and a brief summary of
   the calculation steps so the user can verify.

Use `get_current_time` if any step depends on the current time. For purely arithmetic
queries on supplied dates, calculate directly.

## User Prompt (Delegated Task)

The user asked: "I have a meeting at 2:30 PM in London on March 10, 2026. What time should
my colleague in Tokyo join, and how many hours from now is that meeting?"

## Expected Behavior

### Step 1: Timezone Conversion
Convert 2:30 PM Europe/London to Asia/Tokyo on March 10, 2026.
- March 10 in Europe/London: UTC+0 (GMT, before DST switch on March 29).
- 2:30 PM UTC+0 = 2:30 PM UTC.
- Asia/Tokyo is UTC+9 year-round (no DST).
- 2:30 PM + 9 hours = 11:30 PM Asia/Tokyo, same day (March 10).

### Step 2: Time Until Meeting
Call `get_current_time` to determine the current time.
Calculate the difference between now and March 10, 2026, 2:30 PM UTC.

### Step 3: Synthesized Response

```
Meeting: Tuesday, March 10, 2026

- London (Europe/London, UTC+0):  2:30 PM
- Tokyo (Asia/Tokyo, UTC+9):     11:30 PM (same day)

Time until meeting: 3 days, 18 hours, 45 minutes from now.
```

## Why Show Intermediate Steps

Complex queries benefit from brief step visibility because:
- The user can catch errors in assumptions (e.g., DST status).
- The orchestrator can validate the reasoning chain.
- Transparency builds trust in the result.

Keep the step summary concise -- one line per intermediate result, not a full explanation
of timezone theory.

## Additional Complex Scenarios

### Multi-City Meeting Planner
"What is the best overlap window between 9 AM - 5 PM in New York, London, and Tokyo?"
Approach: compute each city's working hours in UTC, find the intersection, then convert
back to local times.

### Date Arithmetic with Timezone Awareness
"What date is 100 business days from today in America/Sao_Paulo?"
Approach: get current date, iterate through business days excluding weekends (and note that
public holidays may vary -- state this caveat since Timekeeper does not have a holidays
database for all regions).
