import { describe, it, expect } from "vitest";
import {
  classifyTelegramIntent,
  inferControlledTemplate,
  isExplicitProposalRequest,
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

  it("does not force the proposal template for commercial diagnostics", () => {
    const intent = classifyTelegramIntent(
      "Necesito un diagnostico del proceso comercial con riesgos y owners.",
    );

    expect(intent.kind).toBe("operational_lookup");
    expect(intent.templateName).toBe("assessment");
  });

  it("does not infer proposal from standalone commercial wording", () => {
    expect(inferControlledTemplate("necesito contexto comercial para el equipo")).toBeNull();
  });

  it("requires explicit proposal intent before opening the commercial proposal flow", () => {
    expect(isExplicitProposalRequest(normalizeForMatching("Necesito una propuesta comercial para Acme"))).toBe(true);
    expect(isExplicitProposalRequest(normalizeForMatching("Contexto comercial para el equipo"))).toBe(false);
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

  it("still infers proposal for explicit quotation requests", () => {
    expect(inferControlledTemplate("necesito una cotizacion comercial para el cliente")).toBe(
      "proposal",
    );
  });

  it("keeps factual questions out of the proposal flow", () => {
    const intent = classifyTelegramIntent("¿Qué hora es en Tokio?");

    expect(intent.kind).toBe("agent");
    expect(intent.responseMode).toBe("default");
    expect(intent.templateName).toBeNull();
  });
});
