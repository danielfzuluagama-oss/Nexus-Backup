import { beforeEach, describe, expect, it } from "vitest";
import {
  claimTelegramUpdate,
  markTelegramUpdateCompleted,
  markTelegramUpdateFailed,
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
});
