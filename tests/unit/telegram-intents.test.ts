import { describe, it, expect } from "vitest";
import {
  classifyTelegramIntent,
  inferControlledTemplate,
  normalizeForMatching,
} from "../../src/telegram-intents.js";

describe("telegram-intents", () => {
  it("normalizes accents and casing for matching", () => {
    expect(normalizeForMatching("Implementación Ágil")).toBe("implementacion agil");
  });

  it("detects operational onboarding requests", () => {
    const intent = classifyTelegramIntent(
      "Necesito onboarding del proceso presales para un nuevo integrante.",
    );

    expect(intent.kind).toBe("operational_onboarding");
    expect(intent.responseMode).toBe("default");
  });

  it("detects operational execution requests and maps proposal scaffold", () => {
    const intent = classifyTelegramIntent(
      "Quiero ejecutar una propuesta comercial del proceso presales en html.",
    );

    expect(intent.kind).toBe("operational_execution");
    expect(intent.responseMode).toBe("staged_deliverable");
    expect(intent.templateName).toBe("proposal");
  });

  it("defaults media requests to staged planning", () => {
    const intent = classifyTelegramIntent("audio transcrito con idea general", {
      hasMedia: true,
    });

    expect(intent.kind).toBe("agent");
    expect(intent.responseMode).toBe("staged_plan");
  });

  it("infers execution plan template when scaffold language is present", () => {
    expect(inferControlledTemplate("necesito scaffold y plantilla html")).toBe(
      "execution_plan",
    );
  });
});
