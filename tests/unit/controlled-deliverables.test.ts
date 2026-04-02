import { describe, it, expect } from "vitest";
import {
  CONTROLLED_DELIVERABLE_TEMPLATES,
  renderControlledScaffold,
  summarizeControlledTemplate,
} from "../../src/controlled-deliverables.js";

describe("controlled-deliverables", () => {
  it("exports execution and proposal templates", () => {
    expect(CONTROLLED_DELIVERABLE_TEMPLATES.execution_plan).toBeDefined();
    expect(CONTROLLED_DELIVERABLE_TEMPLATES.proposal).toBeDefined();
  });

  it("summarizes templates with field length constraints", () => {
    const summary = summarizeControlledTemplate("proposal");
    expect(summary).toContain("Resumen<=");
    expect(summary).toContain("Solución Propuesta<=");
  });

  it("renders scaffold placeholders when no seed is provided", () => {
    const scaffold = renderControlledScaffold("execution_plan");
    expect(scaffold).toContain("Plantilla controlada: Execution Plan");
    expect(scaffold).toContain("[Pendiente]");
    expect(scaffold).toContain("Limite:");
  });

  it("renders seeded content into the scaffold", () => {
    const scaffold = renderControlledScaffold("brief", {
      objective: "Alinear la decisión ejecutiva.",
    });
    expect(scaffold).toContain("Alinear la decisión ejecutiva.");
  });
});
