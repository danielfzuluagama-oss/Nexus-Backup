import { describe, expect, it } from "vitest";
import type { KnowledgeChunk, ProcessModule } from "../../src/knowledge/operational-kb.js";
import { buildProposalProcessCatalog } from "../../src/proposals/operational-catalog.js";

function makeModule(overrides: Partial<ProcessModule>): ProcessModule {
  return {
    processId: "proceso-base",
    processName: "Proceso Base",
    status: "ready",
    summary: "Modulo base",
    owners: ["Owner"],
    docCount: 3,
    chunkCount: 12,
    sources: ["procesos/proceso-base/MANIFIESTO.md"],
    phases: ["Discovery"],
    gates: ["Gate base"],
    assets: ["Brief"],
    sops: ["SOP Base"],
    metrics: ["Metric base"],
    relatedProcesses: [],
    variants: ["base"],
    capabilities: {
      onboarding: ["Entender el alcance"],
      assistance: ["Responder preguntas"],
      execution: ["Construir entregables"],
    },
    ...overrides,
  };
}

describe("proposal operational catalog", () => {
  it("ranks the primary process first and keeps nearby internal processes in the catalog", () => {
    const modules = [
      makeModule({
        processId: "proceso-presales",
        processName: "Proceso Presales",
        summary: "Califica oportunidades y prepara handoff comercial.",
        variants: ["presales"],
        relatedProcesses: ["proceso-comercial"],
        assets: ["Brief comercial"],
        sops: ["SOP Discovery"],
        capabilities: {
          onboarding: ["Calificar oportunidades"],
          assistance: ["Preparar propuesta"],
          execution: ["Activar handoff comercial"],
        },
      }),
      makeModule({
        processId: "proceso-delivery-servicios",
        processName: "Proceso Delivery Servicios",
        summary: "Orquesta la entrega de servicios y el seguimiento operativo.",
        variants: ["delivery", "servicios"],
        relatedProcesses: ["proceso-presales"],
        assets: ["Plan de entrega"],
        sops: ["SOP Delivery"],
        capabilities: {
          onboarding: ["Entender la entrega"],
          assistance: ["Responder dudas de implementación"],
          execution: ["Coordinar la entrega del servicio"],
        },
      }),
      makeModule({
        processId: "proceso-administracion",
        processName: "Proceso Administracion",
        summary: "Gestiona tareas administrativas internas.",
        variants: ["administracion"],
        relatedProcesses: [],
        assets: ["Formato interno"],
        sops: ["SOP Admin"],
        capabilities: {
          onboarding: ["Entender la administración"],
          assistance: ["Gestionar tareas"],
          execution: ["Cerrar actividades administrativas"],
        },
      }),
    ];

    const evidence: KnowledgeChunk[] = [
      {
        id: "chunk-1",
        documentId: "doc-1",
        title: "Servicio presales",
        path: "/tmp/doc.md",
        relPath: "procesos/proceso-presales/servicio.md",
        kind: "process",
        sourceArea: "procesos",
        processId: "proceso-presales",
        processName: "Proceso Presales",
        chunkIndex: 0,
        content: "Detalle del proceso presales.",
        summary: "Califica oportunidades y prepara handoff comercial.",
        tags: [],
        keywords: [],
      },
      {
        id: "chunk-2",
        documentId: "doc-2",
        title: "Delivery de servicios",
        path: "/tmp/doc-2.md",
        relPath: "procesos/proceso-delivery-servicios/servicio.md",
        kind: "process",
        sourceArea: "procesos",
        processId: "proceso-delivery-servicios",
        processName: "Proceso Delivery Servicios",
        chunkIndex: 0,
        content: "Detalle del delivery.",
        summary: "Entrega de servicios y seguimiento operativo.",
        tags: [],
        keywords: [],
      },
    ];

    const catalog = buildProposalProcessCatalog(
      "Necesito propuesta comercial para presales y delivery",
      modules,
      evidence,
      "proceso-presales",
      3,
    );

    expect(catalog).toHaveLength(2);
    expect(catalog[0].processId).toBe("proceso-presales");
    expect(catalog[0].isPrimary).toBe(true);
    expect(catalog[1].processId).toBe("proceso-delivery-servicios");
    expect(catalog[1].matchReason).toContain("evidencia indexada");
    expect(catalog.some((item) => item.processId === "proceso-administracion")).toBe(false);
  });
});
