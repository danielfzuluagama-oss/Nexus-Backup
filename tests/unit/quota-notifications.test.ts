import { beforeEach, describe, expect, it } from "vitest";
import {
  resetQuotaNotificationThrottleForTests,
  shouldSendQuotaNotification,
} from "../../src/quota-notifications.js";

describe("quota-notifications", () => {
  beforeEach(() => {
    resetQuotaNotificationThrottleForTests();
  });

  it("allows the first notification for an agent/provider pair", () => {
    expect(shouldSendQuotaNotification("pristino", "groq", {} as NodeJS.ProcessEnv, 1000)).toBe(true);
  });

  it("suppresses duplicate notifications during cooldown", () => {
    expect(shouldSendQuotaNotification("pristino", "groq", {} as NodeJS.ProcessEnv, 1000)).toBe(true);
    expect(shouldSendQuotaNotification("pristino", "groq", {} as NodeJS.ProcessEnv, 1001)).toBe(false);
  });

  it("allows a new notification after cooldown expires", () => {
    const env = { QUOTA_NOTIFICATION_COOLDOWN_MS: "100" } as NodeJS.ProcessEnv;
    expect(shouldSendQuotaNotification("pristino", "groq", env, 1000)).toBe(true);
    expect(shouldSendQuotaNotification("pristino", "groq", env, 1201)).toBe(true);
  });
});
