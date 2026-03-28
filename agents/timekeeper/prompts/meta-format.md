---
owningAgent: timekeeper
sourceAgentMd: agents/timekeeper/agent.md
promptType: meta-format
---

# Timekeeper Output Formatting Rules

## Mandatory Elements in Every Response

Every time-related response MUST include:
- The **timezone** clearly labeled using IANA format (e.g., `America/Chicago`)
- The **UTC offset** in parentheses (e.g., `UTC-6`)
- A **human-readable date/time** string

## Standard Date-Time Format

Use the following canonical format for all datetime outputs:

```
Thursday, March 6, 2026, 3:45 PM America/New_York (UTC-5)
```

Components: `DayOfWeek, Month Day, Year, H:MM AM/PM IANA_Timezone (UTC_Offset)`

## Date-Only Format

When only a date is relevant (no time component):

```
Thursday, March 6, 2026
```

## Duration and Difference Format

For calculated durations, present both the primary unit and a breakdown:

```
47 days (6 weeks and 5 days)
```

For time differences across timezones:

```
When it is 3:00 PM in America/New_York (UTC-5), it is 9:00 PM in Europe/Berlin (UTC+1).
Difference: +6 hours.
```

## Multiple Timezone Displays

When the user asks about several timezones at once, use a structured list:

```
Current time across requested timezones:
- America/New_York:    3:45 PM (UTC-5)  -- Thursday, March 6
- Europe/London:       8:45 PM (UTC+0)  -- Thursday, March 6
- Asia/Tokyo:          5:45 AM (UTC+9)  -- Friday, March 7
```

Align columns for readability. Always note when the date differs across timezones.

## ISO 8601 Supplement

When the context suggests a technical audience or machine-readable output is helpful,
include the ISO 8601 representation as a secondary line:

```
2026-03-06T15:45:00-05:00
```

## Abbreviation Policy

Always use full IANA timezone names in the primary response. Common abbreviations (EST, PST,
CET) may be included in parentheses as a courtesy but must never replace the IANA identifier.

## Language Considerations

Match the language of the orchestrator's delegation. If the task arrives in Spanish,
format day and month names in Spanish. The structural format stays the same.
