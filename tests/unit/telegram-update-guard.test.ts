import { beforeEach, describe, expect, it } from "vitest";
import {
  claimTelegramUpdate,
  isTelegramConversationUpdateStale,
  markTelegramUpdateCompleted,
  markTelegramUpdateFailed,
  recordTelegramConversationUpdate,
  resetTelegramUpdateGuardForTests,
} from "../../src/telegram-update-guard.js";

describe("telegram-update-guard", () => {
  beforeEach(() => {
    resetTelegramUpdateGuardForTests();
  });

  it("claims a new update and rejects duplicates while it is in progress", async () => {
    await expect(claimTelegramUpdate("pristino", 123)).resolves.toBe("claimed");
    await expect(claimTelegramUpdate("pristino", 123)).resolves.toBe("duplicate");
  });

  it("keeps completed updates idempotent", async () => {
    await claimTelegramUpdate("pristino", 456);
    await markTelegramUpdateCompleted("pristino", 456);

    await expect(claimTelegramUpdate("pristino", 456)).resolves.toBe("duplicate");
  });

  it("allows retry after a failed attempt", async () => {
    await claimTelegramUpdate("pristino", 789);
    await markTelegramUpdateFailed("pristino", 789, new Error("boom"));

    await expect(claimTelegramUpdate("pristino", 789)).resolves.toBe("claimed");
  });

  it("does not block updates without a valid positive update id", async () => {
    await expect(claimTelegramUpdate("pristino", 0)).resolves.toBe("claimed");
    await expect(claimTelegramUpdate("pristino", -1)).resolves.toBe("claimed");
  });

  it("tracks the latest update per conversation and marks older ones as stale", async () => {
    await recordTelegramConversationUpdate("pristino", "telegram_chat_1_thread_root", 101);
    await recordTelegramConversationUpdate("pristino", "telegram_chat_1_thread_root", 105);

    await expect(
      isTelegramConversationUpdateStale("pristino", "telegram_chat_1_thread_root", 101),
    ).resolves.toBe(true);
    await expect(
      isTelegramConversationUpdateStale("pristino", "telegram_chat_1_thread_root", 105),
    ).resolves.toBe(false);
  });

  it("keeps conversation freshness isolated across different conversation keys", async () => {
    await recordTelegramConversationUpdate("pristino", "telegram_chat_1_thread_root", 42);
    await recordTelegramConversationUpdate("pristino", "telegram_chat_1_thread_99", 77);

    await expect(
      isTelegramConversationUpdateStale("pristino", "telegram_chat_1_thread_root", 42),
    ).resolves.toBe(false);
    await expect(
      isTelegramConversationUpdateStale("pristino", "telegram_chat_1_thread_99", 42),
    ).resolves.toBe(true);
  });
});
