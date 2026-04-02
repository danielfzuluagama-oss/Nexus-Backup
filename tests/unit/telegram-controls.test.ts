import { describe, expect, it } from "vitest";
import { getStandbyMessage, isStandbyModeEnabled } from "../../src/telegram-controls.js";

describe("telegram-controls", () => {
  it("detects standby mode from supported env values", () => {
    expect(isStandbyModeEnabled({ TELEGRAM_BOT_MODE: "standby" } as NodeJS.ProcessEnv)).toBe(true);
    expect(isStandbyModeEnabled({ TELEGRAM_STANDBY_MODE: "true" } as NodeJS.ProcessEnv)).toBe(true);
    expect(isStandbyModeEnabled({ BOT_STANDBY_MODE: "1" } as NodeJS.ProcessEnv)).toBe(true);
    expect(isStandbyModeEnabled({ TELEGRAM_BOT_MODE: "active" } as NodeJS.ProcessEnv)).toBe(false);
  });

  it("returns a custom standby message when configured", () => {
    expect(
      getStandbyMessage({ TELEGRAM_STANDBY_MESSAGE: "Bot pausado temporalmente." } as NodeJS.ProcessEnv),
    ).toBe("Bot pausado temporalmente.");
  });

  it("falls back to a safe default standby message", () => {
    expect(getStandbyMessage({} as NodeJS.ProcessEnv)).toContain("pausa operativa");
  });
});
