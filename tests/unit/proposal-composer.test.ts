import { describe, expect, it, vi, beforeEach } from "vitest";

vi.mock("../../src/agent.js", () => ({
  runAgent: vi.fn(),
}));

vi.mock("../../src/config/llm-providers.js", () => ({
  getCommercialProposalProvider: vi.fn(() => ({})),
}));

import { runAgent } from "../../src/agent.js";
import { composeCommercialProposalDraft } from "../../src/proposals/proposal-composer.js";
import type { ProposalKnowledgeContext } from "../../src/proposals/proposal-artifact.js";

beforeEach(() => {
  vi.mocked(runAgent).mockReset();
});

describe("proposal composer", () => {
  it("serializes semantic memory into the commercial proposal prompt", async () => {
    vi.mocked(runAgent).mockResolvedValueOnce(JSON.stringify({
      clientName: "Acme Corp",
      serviceName: "Desarrollo de Agentes",
      processName: "Proceso Comercial",
      summary: "Resumen ejecutivo.",
      challenge: "Reto principal.",
      approach: "Ruta propuesta.",
      nextStep: "Validar alcance.",
      steps: ["Discovery"],
      deliverables: ["Documento comercial"],
      assets: ["Brief"],
      sops: ["SOP Discovery"],
      gates: ["Gate discovery"],
      risks: ["Riesgo de alcance"],
      sections: [
        { title: "Resumen Ejecutivo", body: "Resumen ejecutivo." },
      ],
      sourceMap: [],
    }));

    const knowledgeContext: ProposalKnowledgeContext = {
      serviceName: "Desarrollo de Agentes",
      threadMemoryContext: "Memoria persistida del hilo:\n- Tipo: proposal",
      semanticMemoryContext: [
        "Memoria semántica relevante para la solicitud: Acme Corp necesita una propuesta comercial.",
        "- Hechos recuperados:",
        "  - [conf 0.93 | ref 4 | project_context | user] Acme Corp aprobó ventana Q3.",
      ].join("\n"),
      intake: {
        clientName: "Acme Corp",
        serviceName: "Desarrollo de Agentes",
        objective: "Acelerar la preventa",
        geography: "Colombia",
        scope: "Workshop",
        timeline: "6 semanas",
        investment: "Por confirmar",
        nextStep: "Preparar version final",
      },
    };

    const deps = {
      llm: {},
      memory: {},
      config: {
        maxTokens: 2048,
      },
      ecosystem: {
        initialized: true,
        agents: new Map(),
        skills: new Map([
          [
            "pristino-orchestrator",
            [
              {
                id: "sales-architect",
                systemPrompt: "Sales architect system prompt",
              },
            ],
          ],
        ]),
      },
    };

    await composeCommercialProposalDraft(deps as never, {
      userId: 18219468,
      requestText: "Necesito una propuesta comercial para Acme Corp en html.",
      knowledgeContext,
      agentName: "pristino" as never,
    });

    expect(vi.mocked(runAgent)).toHaveBeenCalledTimes(1);
    const prompt = vi.mocked(runAgent).mock.calls[0]?.[2] as string;
    expect(prompt).toContain("semanticMemoryContext");
    expect(prompt).toContain("Acme Corp aprobó ventana Q3.");
    expect(prompt).toContain("Treat semanticMemoryContext as background memory");
  });

  it("enriches sparse structured drafts with the requested service and operational context", async () => {
    vi.mocked(runAgent).mockResolvedValueOnce(JSON.stringify({
      clientName: "Acme Corp",
      serviceName: "Propuesta comercial",
      processName: "Proceso Comercial",
      summary: "Resumen ejecutivo.",
      challenge: "Reto principal.",
      approach: "Ruta propuesta.",
      nextStep: "Validar alcance.",
      steps: [],
      deliverables: [],
      assets: [],
      sops: [],
      gates: [],
      risks: [],
      sections: [],
      sourceMap: [],
    }));

    const knowledgeContext: ProposalKnowledgeContext = {
      serviceName: "Ofimática con IA en Google Workspace",
      intake: {
        clientName: "Acme Corp",
        serviceName: "Ofimática con IA en Google Workspace",
        objective: "Reducir trabajo operativo del equipo administrativo",
        geography: "Colombia",
        scope: "Automatización de tareas y adopción de IA en Google Workspace",
        timeline: "8 semanas",
        investment: "Por confirmar",
        nextStep: "Revisar alcance con la gerencia",
      },
      executionPack: {
        processId: "proc-001",
        processName: "Implementación de Ofimática con IA",
        deliverable: "Ofimática con IA en Google Workspace",
        objective: "Reducir trabajo operativo del equipo administrativo",
        summary: "Ruta operativa para automatizar tareas, estandarizar entregables y acelerar adopción de IA en Workspace.",
        recommendedSteps: [
          "Levantamiento de procesos críticos",
          "Diseño del flujo objetivo en Workspace",
          "Piloto con usuarios clave",
        ],
        evidenceRequired: [
          "Mapa del proceso actual",
        ],
        assets: [
          "Documento comercial",
          "Roadmap de activación",
        ],
        sops: [
          "SOP de levantamiento",
        ],
        gates: [
          "Validación de alcance",
        ],
        risks: [
          "Cambios de alcance sin aprobación",
        ],
        evidence: [],
      },
    };

    const deps = {
      llm: {},
      memory: {},
      config: {
        maxTokens: 2048,
      },
      ecosystem: {
        initialized: true,
        agents: new Map(),
        skills: new Map(),
      },
    };

    const draft = await composeCommercialProposalDraft(deps as never, {
      userId: 18219468,
      requestText: "Necesito una propuesta comercial de ofimática con IA para Acme Corp.",
      knowledgeContext,
      agentName: "pristino" as never,
    });

    expect(draft.serviceName).toBe("Ofimática con IA en Google Workspace");
    expect(draft.processName).toBe("Implementación de Ofimática con IA");
    expect(draft.summary).toContain("Ofimática con IA en Google Workspace");
    expect(draft.deliverables).toContain("Documento comercial");
    expect(draft.steps).toContain("Levantamiento de procesos críticos");
    expect(draft.sections.length).toBeGreaterThanOrEqual(4);
  });

  it("falls back to a contextual draft when the commercial provider cannot be resolved", async () => {
    const knowledgeContext: ProposalKnowledgeContext = {
      serviceName: "Ofimática con IA en Google Workspace",
      intake: {
        clientName: "Acme Corp",
        serviceName: "Ofimática con IA en Google Workspace",
        objective: "Reducir trabajo operativo del equipo administrativo",
        geography: "Colombia",
        scope: "Automatización de tareas y adopción de IA en Google Workspace",
        timeline: "8 semanas",
        investment: "Por confirmar",
        nextStep: "Revisar alcance con la gerencia",
      },
    };

    const deps = {
      llm: {},
      memory: {},
      config: {},
      ecosystem: {
        initialized: true,
        agents: new Map(),
        skills: new Map(),
      },
    };

    vi.mocked(runAgent).mockImplementationOnce(() => {
      throw new Error("No commercial provider available");
    });

    const draft = await composeCommercialProposalDraft(deps as never, {
      userId: 18219468,
      requestText: "Necesito una propuesta comercial de ofimática con IA para Acme Corp.",
      knowledgeContext,
      agentName: "pristino" as never,
    });

    expect(draft.clientName).toBe("Acme Corp");
    expect(draft.serviceName).toBe("Ofimática con IA en Google Workspace");
    expect(draft.summary).toContain("Acme Corp");
    expect(draft.sections.length).toBeGreaterThanOrEqual(4);
  });
});
