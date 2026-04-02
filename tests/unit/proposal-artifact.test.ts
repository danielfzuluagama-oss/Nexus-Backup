import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  buildProposalArtifact,
  buildProposalFolderName,
  extractClientNameFromRequest,
  extractRequestedServiceName,
  formatProposalDate,
  parseProposalStageSections,
  slugifyClientName,
} from "../../src/proposals/proposal-artifact.js";
import { validateProposalArtifactHtml } from "../../src/proposals/proposal-validation.js";

const acConsultoresRequest = readFileSync(
  new URL("../fixtures/proposals/ac-consultores-request.txt", import.meta.url),
  "utf8",
);

describe("proposal artifact helpers", () => {
  it("extracts the client name from a proposal request", () => {
    expect(
      extractClientNameFromRequest("Necesito una propuesta comercial para Acme Corp en HTML"),
    ).toBe("Acme Corp");
  });

  it("extracts the requested service when it is explicit in the request", () => {
    expect(
      extractRequestedServiceName("Necesito una propuesta comercial de desarrollo de agentes para Acme Corp"),
    ).toBe("desarrollo de agentes");
  });

  it("extracts client and service from ficha-style answers", () => {
    expect(extractClientNameFromRequest("Cliente: Acme Corp")).toBe("Acme Corp");
    expect(extractRequestedServiceName("Servicio: desarrollo de agentes")).toBe(
      "desarrollo de agentes",
    );
  });

  it("prioritizes labeled service over scope wording like workshop", () => {
    expect(
      extractRequestedServiceName([
        "Cliente: Acme Corp",
        "Servicio: desarrollo de agentes",
        "Modalidad y alcance: workshop virtual para equipo comercial de 12 personas",
      ].join(". ")),
    ).toBe("desarrollo de agentes");
  });

  it("slugifies the client name and builds the folder name with the date", () => {
    expect(slugifyClientName("Clínica San José")).toBe("clinica-san-jose");
    expect(slugifyClientName("Mansuela de Ecuador https")).toBe("mansuela-de-ecuador");
    expect(buildProposalFolderName("Clínica San José", "2026-03-31")).toBe(
      "clinica-san-jose-2026-03-31",
    );
    expect(buildProposalFolderName("Mansuela de Ecuador https", "2026-03-31")).toBe(
      "mansuela-de-ecuador-2026-03-31",
    );
  });

  it("formats dates in Bogota timezone", () => {
    const date = new Date("2026-04-01T03:15:00.000Z");
    expect(formatProposalDate(date)).toBe("2026-03-31");
  });

  it("parses ETAPA blocks from the agent response", () => {
    const stages = parseProposalStageSections([
      "ETAPA 1 | REPASO DE LO ENTENDIDO",
      "Pedido para Acme Corp.",
      "",
      "ETAPA 2 | PLAN DE ACCION",
      "- Diagnostico",
      "",
      "ETAPA 3 | SCAFFOLD INICIAL",
      "Resumen",
      "Texto base",
    ].join("\n"));

    expect(stages).toHaveLength(3);
    expect(stages[0].title).toBe("Repaso de lo Entendido");
    expect(stages[1].title).toBe("Plan de Accion");
    expect(stages[2].title).toBe("Borrador Inicial");
    expect(stages[1].body).toContain("Diagnostico");
  });

  it("parses markdown-bold ETAPA blocks from the agent response", () => {
    const stages = parseProposalStageSections([
      "**ETAPA 1 | REPASO DE LO ENTENDIDO**",
      "- Pedido para Mansuera (Ecuador).",
      "",
      "**ETAPA 2 | PLAN DE ACCION**",
      "1. Ajustar cronograma",
      "",
      "**ETAPA 3 | SCAFFOLD INICIAL**",
      "**Resumen**",
      "Texto base",
    ].join("\n"));

    expect(stages).toHaveLength(3);
    expect(stages[0].title).toBe("Repaso de lo Entendido");
    expect(stages[1].title).toBe("Plan de Accion");
    expect(stages[2].title).toBe("Borrador Inicial");
    expect(stages[2].body).toContain("Resumen");
  });

  it("builds a self-contained proposal artifact with repo path and HTML", () => {
    const artifact = buildProposalArtifact(
      "Quiero una propuesta comercial para Acme Corp",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente: Acme Corp.",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery",
        "- Roadmap",
        "",
        "ETAPA 3 | SCAFFOLD INICIAL",
        "Resumen",
        "Propuesta ejecutiva.",
        "",
        "ETAPA 4 | SIGUIENTE PASO",
        "Confirmar alcance.",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
    );

    expect(artifact.clientName).toBe("Acme Corp");
    expect(artifact.folderName).toBe("acme-corp-2026-03-31");
    expect(artifact.repoPath).toBe("proposals/acme-corp-2026-03-31/index.html");
    expect(artifact.fileName).toBe("acme-corp-2026-03-31.html");
    expect(artifact.html).toContain("<!doctype html>");
    expect(artifact.html).toContain("Acme Corp");
    expect(artifact.html).toContain("Repaso de lo Entendido");
    expect(artifact.html).toContain("Plan de Accion");
    expect(artifact.html).toContain("Borrador Inicial");
    expect(artifact.html).toContain("Siguiente Paso");
    expect(artifact.html).not.toContain("SCAFFOLD INICIAL");
    expect(artifact.html).toMatch(/\.reveal\s*\{\s*opacity:\s*1;\s*transform:\s*none;/s);
    expect(artifact.html).toContain("function renderIcons()");
  });

  it("renders structured draft JSON without leaking the raw request or ETAPA labels", () => {
    const requestText = "Necesito una propuesta comercial para Acme Corp con este briefing.";
    const draft = {
      clientName: "Acme Corp",
      serviceName: "Desarrollo de Agentes",
      processName: "Proceso Comercial",
      summary: "Resumen ejecutivo estructurado.",
      challenge: "Reto principal por atender.",
      approach: "Ruta propuesta con foco en activacion.",
      nextStep: "Validar alcance y responsables.",
      steps: ["Discovery", "Diseno", "Activacion"],
      deliverables: ["Documento comercial", "Roadmap"],
      assets: ["Brief", "SOP"],
      sops: ["SOP Discovery"],
      gates: ["Gate discovery"],
      risks: ["Riesgo de alcance"],
      sections: [
        { title: "Resumen Ejecutivo", body: "Resumen ejecutivo estructurado." },
        { title: "Plan de Trabajo", body: "Ruta propuesta con foco en activacion." },
        { title: "Siguiente Paso", body: "Validar alcance y responsables." },
      ],
      sourceMap: [
        {
          section: "summary",
          sources: ["brief"],
          note: "Synthesized from intake",
        },
      ],
    };

    const artifact = buildProposalArtifact(
      requestText,
      JSON.stringify(draft),
      new Date("2026-03-31T16:00:00.000Z"),
    );

    expect(artifact.clientName).toBe("Acme Corp");
    expect(artifact.sections).toEqual(draft.sections);
    expect(artifact.html).toContain("Resumen Ejecutivo");
    expect(artifact.html).toContain("Documento comercial");
    expect(artifact.html).toContain("Validar alcance y responsables");
    expect(artifact.html).not.toContain("ETAPA");
    expect(artifact.html).not.toContain(requestText);
  });

  it("sanitizes noisy structured draft fields before rendering", () => {
    const draft = {
      clientName: "Acme Corp",
      serviceName: "Desarrollo de Agentes",
      processName: "Proceso Comercial",
      summary: "Resumen con https://example.com y ETAPA 1 | REPASO DE LO ENTENDIDO.",
      challenge: "Reto con www.example.com para depurar.",
      approach: "Ruta propuesta con https://example.com/ruta.",
      nextStep: "Confirmar alcance y responsables.",
      steps: ["Discovery", "https://example.com/paso", "ETAPA 2 | PLAN DE ACCION"],
      deliverables: ["Documento comercial", "Roadmap https://example.com"],
      assets: ["Brief", "SOP https://example.com"],
      sops: ["SOP Discovery", "Plantilla controlada: Proposal"],
      gates: ["Gate discovery"],
      risks: ["Riesgo de alcance", "ETAPA 3 | SCAFFOLD INICIAL"],
      sections: [
        {
          title: "Resumen Ejecutivo",
          body: "Resumen con https://example.com y ETAPA 1 | REPASO DE LO ENTENDIDO.",
        },
      ],
      sourceMap: [],
    };

    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp.",
      JSON.stringify(draft),
      new Date("2026-03-31T16:00:00.000Z"),
    );

    const validation = validateProposalArtifactHtml(artifact.html);

    expect(validation.valid).toBe(true);
    expect(artifact.html).not.toContain("https://example.com");
    expect(artifact.html).not.toContain("www.example.com");
    expect(artifact.html).not.toContain("ETAPA 1 | REPASO DE LO ENTENDIDO");
    expect(artifact.html).not.toContain("Plantilla controlada");
  });

  it("strips internal filenames and process ids from public proposal HTML", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para IEB Consultores de Energía.",
      JSON.stringify({
        clientName: "IEB Consultores de Energía",
        serviceName: "Ofimática con IA",
        processName: "Proceso Comercial",
        summary: "Resumen ejecutivo limpio.",
        challenge: "Reto principal del cliente.",
        approach: "Ruta propuesta para adopción.",
        nextStep: "Agendar kickoff.",
        steps: ["Discovery", "Diseno", "Activacion"],
        deliverables: ["Documento comercial", "Ruta de implementación"],
        assets: ["proposal-base.html", "entregar-bootcamp-proceso.md"],
        sops: ["SOP Discovery", "handoff-comercial.md"],
        gates: ["Gate discovery"],
        risks: ["Validar alcance final"],
        sections: [
          { title: "Resumen Ejecutivo", body: "Resumen ejecutivo limpio." },
          { title: "Plan de Trabajo", body: "Ruta propuesta para adopción." },
          { title: "Siguiente Paso", body: "Agendar kickoff." },
        ],
        sourceMap: [],
      }),
      new Date("2026-04-01T16:00:00.000Z"),
      {
        internalProcessCatalog: [
          {
            processId: "entregar-bootcamp-proceso.md",
            processName: "Entrega de Bootcamp",
            summary: "Ruta operativa lista para activar el servicio.",
            status: "ready",
            matchReason: "Coincidencia con la intención comercial",
            isPrimary: true,
            phases: ["Fase 1", "Fase 2"],
            gates: ["gate-entrega.md", "Aprobación comercial"],
            assets: ["plantilla-propuesta.html", "Checklist operativo"],
            sops: ["SOP Handoff", "playbook-entrega.md"],
            relatedProcesses: ["onboarding-cliente.md", "Activación Comercial"],
          },
        ],
      },
    );

    const validation = validateProposalArtifactHtml(artifact.html);

    expect(validation.valid).toBe(true);
    expect(artifact.html).toContain("Entrega de Bootcamp");
    expect(artifact.html).toContain("Respaldo principal");
    expect(artifact.html).not.toContain("Coincidencia con la intención comercial");
    expect(artifact.html).not.toContain("entregar-bootcamp-proceso.md");
    expect(artifact.html).not.toContain("proposal-base.html");
    expect(artifact.html).not.toContain("handoff-comercial.md");
    expect(artifact.html).not.toContain("onboarding-cliente.md");
  });

  it("keeps the A&C consultores artifact canonical even when the draft carries prompt residue", () => {
    const artifact = buildProposalArtifact(
      acConsultoresRequest,
      JSON.stringify({
        clientName: "A&C Consultores",
        serviceName: "Ofimática con IA",
        processName: "Proceso Comercial",
        summary: "Propuesta para A&C Consultores. verifica la plantilla y publícala en GitHub con el adjunto final.",
        challenge: "Ordenar el trabajo administrativo y acelerar la preparación comercial.",
        approach: "Programa completo de 20 horas con masterclass, clínica y workshop.",
        nextStep: "Cotizar espacio de kickoff.",
        steps: [
          "Discovery",
          "Plantilla controlada: Proposal",
          "Publicarla en el repositorio de GitHub de propuestas comerciales",
        ],
        deliverables: [
          "Documento comercial",
          "Archivo final references/propuesta-ac.md",
        ],
        assets: ["proposal-base.html", "bootcamp/assets/ac-consultores.json"],
        sops: ["SOP Discovery", "template-package/proposal.html"],
        gates: ["Gate discovery"],
        risks: ["Validar alcance final antes del kickoff"],
        sections: [
          {
            title: "Resumen Ejecutivo",
            body: "Programa de ofimática con IA para Medellín, Colombia, con foco en adopción y activación comercial.",
          },
          {
            title: "Plan de Trabajo",
            body: "Masterclass, clínica y workshop distribuidos en un programa completo de 20 horas.",
          },
          {
            title: "Siguiente Paso",
            body: "Cotizar espacio de kickoff y cerrar agenda de inicio para el 13 de abril.",
          },
        ],
        sourceMap: [],
      }),
      new Date("2026-04-01T22:17:00.000Z"),
    );

    const validation = validateProposalArtifactHtml(artifact.html);

    expect(validation.valid).toBe(true);
    expect(artifact.clientName).toBe("A&C Consultores");
    expect(artifact.folderName).toBe("a-c-consultores-2026-04-01");
    expect(artifact.repoPath).toBe("proposals/a-c-consultores-2026-04-01/index.html");
    expect(artifact.html).toContain("A&C Consultores");
    expect(artifact.html).toContain("Cotizar espacio de kickoff");
    expect(artifact.html).not.toContain("verifica la plantilla");
    expect(artifact.html).not.toContain("GitHub");
    expect(artifact.html).not.toContain("proposal-base.html");
    expect(artifact.html).not.toContain("references/propuesta-ac.md");
    expect(artifact.html).not.toContain("bootcamp/assets");
    expect(artifact.html).not.toContain("template-package");
    expect(artifact.html).not.toContain("Plantilla controlada");
  });

  it("keeps the A&C consultores artifact canonical when operational evidence carries internal ritual paths", () => {
    const artifact = buildProposalArtifact(
      acConsultoresRequest,
      JSON.stringify({
        clientName: "A&C Consultores",
        serviceName: "Ofimática con IA",
        processName: "Proceso Comercial",
        summary: "Programa de ofimática con IA para automatizar trabajo administrativo.",
        challenge: "Reducir fricción operativa y preparar mejor la activación comercial.",
        approach: "Programa completo de 20 horas con masterclass, clínica y workshop.",
        nextStep: "Cotizar espacio de kickoff.",
        steps: ["Discovery", "Masterclass", "Clínica", "Workshop"],
        deliverables: ["Documento comercial", "Ruta de implementación"],
        assets: ["Documento comercial"],
        sops: ["Acompañamiento experto"],
        gates: ["Gate discovery"],
        risks: ["Validar alcance final antes del kickoff"],
        sections: [
          {
            title: "Resumen Ejecutivo",
            body: "Programa de ofimática con IA para Medellín, Colombia, con foco en adopción y activación comercial.",
          },
          {
            title: "Plan de Trabajo",
            body: "Masterclass, clínica y workshop distribuidos en un programa completo de 20 horas.",
          },
          {
            title: "Siguiente Paso",
            body: "Cotizar espacio de kickoff y cerrar agenda de inicio para el 13 de abril.",
          },
        ],
        sourceMap: [],
      }),
      new Date("2026-04-01T22:50:00.000Z"),
      {
        intake: {
          clientName: "A&C Consultores",
          serviceName: "Ofimática con IA",
          objective: "Ordenar el trabajo administrativo y acelerar la preparación comercial.",
          geography: "Medellín, Colombia",
          scope: "Programa completo de 20 horas con masterclass, clínica y workshop.",
          timeline: "Inicia el 13 de abril.",
          nextStep: "Cotizar espacio de kickoff.",
        },
        evidence: [
          {
            id: "chunk-1",
            documentId: "doc-1",
            title: "06-responder-rfp-propuesta-tecnica-economica-ritual.md",
            path: "/tmp/06-responder-rfp-propuesta-tecnica-economica-ritual.md",
            relPath: "rituales/empresas/corporate/proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md",
            kind: "ritual",
            sourceArea: "operational-kb",
            processId: "proceso-comercial",
            processName: "Proceso Comercial",
            sectionTitle: "Ruta de soporte",
            chunkIndex: 0,
            content: "Usar rituales/empresas/corporate/proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md como referencia operativa para ordenar la oferta.",
            summary: "Referencia interna rituales/empresas/corporate/proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md para estructurar la propuesta.",
            tags: [],
            keywords: [],
          },
        ],
        internalProcessCatalog: [
          {
            processId: "proceso-comercial",
            processName: "Proceso Comercial",
            summary: "La ruta rituales/empresas/corporate/proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md sirve como respaldo interno para estructurar la oferta.",
            status: "ready",
            matchReason: "Coincidencia con rituales/empresas/corporate/proposal/estructurar-oferta/sop-06-propuesta/06-responder-rfp-propuesta-tecnica-economica-ritual.md",
            isPrimary: true,
            phases: ["Discovery", "Activación"],
            gates: ["Aprobación comercial"],
            assets: ["Checklist de kickoff"],
            sops: ["SOP de acompañamiento"],
            relatedProcesses: ["Activación comercial"],
          },
        ],
      },
    );

    const validation = validateProposalArtifactHtml(artifact.html);

    expect(validation.valid).toBe(true);
    expect(artifact.html).toContain("A&C Consultores");
    expect(artifact.html).toContain("Proceso Comercial");
    expect(artifact.html).not.toContain("rituales/empresas");
    expect(artifact.html).not.toContain("06-responder-rfp-propuesta-tecnica-economica-ritual.md");
    expect(artifact.html).not.toContain("Referencia interna");
  });

  it("prefers the cleaned intake client name when building the artifact", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Mansuela de Ecuador https.",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente necesita una propuesta comercial.",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery",
        "- Roadmap",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
      {
        intake: {
          clientName: "Mansuela de Ecuador",
          serviceName: "Ofimática con IA en Google Workspace",
        },
      },
    );

    expect(artifact.clientName).toBe("Mansuela de Ecuador");
    expect(artifact.folderName).toBe("mansuela-de-ecuador-2026-03-31");
    expect(artifact.repoPath).toBe("proposals/mansuela-de-ecuador-2026-03-31/index.html");
    expect(artifact.fileName).toBe("mansuela-de-ecuador-2026-03-31.html");
  });

  it("injects operational knowledge into the proposal template when available", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial de desarrollo de agentes para Acme Corp",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente necesita acelerar adopcion de IA con casos de uso concretos.",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery ejecutivo",
        "- Diseño de agentes",
        "- Activacion operativa",
        "",
        "ETAPA 3 | SCAFFOLD INICIAL",
        "- Documento comercial",
        "- Roadmap inicial",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
      {
        executionPack: {
          processId: "proceso-desarrollo-agentes",
          processName: "Desarrollo de Agentes",
          deliverable: "desarrollo de agentes",
          objective: "Diseñar la solución",
          summary: "Proceso de discovery, diseño y activación de agentes.",
          recommendedSteps: ["1. Discovery", "2. Diseño", "3. Activación"],
          gates: ["Gate discovery validado"],
          evidenceRequired: ["Asset base confirmado"],
          assets: ["Propuesta", "Roadmap", "Arquitectura objetivo"],
          sops: ["SOP Discovery", "SOP Handoff Comercial"],
          risks: ["No iniciar sin owner asignado"],
          evidence: [
            {
              id: "chunk-1",
              documentId: "doc-1",
              title: "Servicio desarrollo de agentes",
              path: "/tmp/doc.md",
              relPath: "procesos/proceso-desarrollo-agentes/servicio.md",
              kind: "process",
              sourceArea: "procesos",
              processId: "proceso-desarrollo-agentes",
              processName: "Desarrollo de Agentes",
              chunkIndex: 0,
              content: "Detalle extenso del servicio.",
              summary: "Servicio orientado a discovery, diseño y activación de agentes.",
              tags: [],
              keywords: [],
            },
          ],
        },
      },
    );

    expect(artifact.serviceName).toBe("Desarrollo de Agentes");
    expect(artifact.processName).toBe("Desarrollo de Agentes");
    expect(artifact.html).toContain("Desarrollo de Agentes");
    expect(artifact.html).toContain("Servicio: Desarrollo de Agentes");
    expect(artifact.html).toContain("Journey");
    expect(artifact.html).toContain("Pristino");
    expect(artifact.html).toContain("Ruta ampliada");
    expect(artifact.html).not.toContain("SOP Discovery");
  });

  it("filters generic commercial catalog entries from the proposal output", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta en html para Acme Corp",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente necesita una propuesta comercial con foco operativo.",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery",
        "- Scoping",
        "",
        "ETAPA 3 | SCAFFOLD INICIAL",
        "- Documento comercial",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
      {
        metodologiaReady: true,
        internalProcessCatalog: [
          {
            processId: "proceso-presales",
            processName: "Proceso Presales",
            summary: "Califica oportunidades y prepara handoff comercial.",
            status: "ready",
            matchReason: "Coincidencia con la intención comercial",
            isPrimary: true,
            phases: ["Discovery", "Scoping"],
            gates: ["Discovery validado"],
            assets: ["Brief comercial"],
            sops: ["SOP Discovery"],
            relatedProcesses: ["proceso-comercial"],
          },
          {
            processId: "proceso-comercial",
            processName: "Proceso Comercial",
            summary: "Gestiona propuestas y cierre comercial.",
            status: "ready",
            matchReason: "Relacionado por dependencia",
            isPrimary: false,
            phases: ["Apertura"],
            gates: ["Aprobacion comercial"],
            assets: ["Plantilla comercial"],
            sops: ["SOP Comercial"],
            relatedProcesses: [],
          },
        ],
      },
    );

    expect(artifact.serviceName).toBe("Propuesta de servicios MetodologIA");
    expect(artifact.processName).toBe("Ruta de Propuesta de servicios MetodologIA");
    expect(artifact.html).toContain("Credenciales");
    expect(artifact.html).toContain("Pristino");
    expect(artifact.html).not.toContain("Proceso Presales");
    expect(artifact.html).not.toContain("Proceso Comercial");
  });

  it("sanitizes control scaffolding and matches the founder bio to the sender profile", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente: Acme Corp.",
        "Proceso detectado: Comercial.",
        "Entregable solicitado: html entregable.",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery",
        "- Roadmap",
        "",
        "ETAPA 3 | SCAFFOLD INICIAL",
        "Plantilla controlada: Proposal",
        "Resumen",
        "Limite: 600 caracteres | obligatorio",
        "Propuesta base para propuesta comercial dentro de Comercial.",
        "Documento listo para compartir",
        "",
        "ETAPA 4 | SIGUIENTE PASO",
        "Confirmar alcance.",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
      {
        metodologiaReady: true,
        requestedByFounder: "German",
        metodologia: {
          services: [
            {
              title: "Workshop Venta Amplificada",
              description: "Formación intensiva para equipos comerciales (B2B).",
              source: "https://metodologia.info/servicios/index",
            },
          ],
          resources: [
            {
              title: "Asistentes GPT/Gemini",
              description: "Agentes IA pre-configurados",
              source: "https://metodologia.info/recursos/index",
            },
          ],
          founders: [
            {
              name: "Daniel Zuluaga",
              title: "Chief Efficiency Officer",
              bio: "Optimizador de procesos que transforma la complejidad en eficiencia.",
            },
            {
              name: "Germán Eliécer Sepúlveda",
              title: "Chief Ecosystem Officer",
              bio: "Constructor de ecosistemas que conectan talento, visión y propósito.",
            },
          ],
        },
      },
    );

    expect(artifact.sections[2].body).not.toContain("Plantilla controlada");
    expect(artifact.sections[2].body).not.toContain("Limite: 600 caracteres");
    expect(artifact.html).not.toContain("Proceso detectado");
    expect(artifact.html).not.toContain("Entregable solicitado");
    expect(artifact.html).not.toContain("Documento listo para compartir");
    expect(artifact.html).toContain("Germán Eliécer Sepúlveda · Chief Ecosystem Officer");
    expect(artifact.html).not.toContain("Daniel Zuluaga · Chief Efficiency Officer");
  });

  it("strips visible URLs from the proposal body and methodology metadata", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Santafeenergy de Medellin Colombia https://santafeenergy.com.co/",
      [
        "ETAPA 1 | REPASO DE LO ENTENDIDO",
        "Cliente: Santafeenergy de Medellin Colombia https://santafeenergy.com.co/",
        "",
        "ETAPA 2 | PLAN DE ACCION",
        "- Discovery",
        "- Roadmap",
        "",
        "ETAPA 3 | SCAFFOLD INICIAL",
        "Objetivo para https://santafeenergy.com.co/",
      ].join("\n"),
      new Date("2026-03-31T16:00:00.000Z"),
      {
        metodologiaReady: true,
        metodologia: {
          services: [
            {
              title: "Workshop Venta Amplificada",
              description: "Formación intensiva para equipos comerciales.",
              source: "https://metodologia.info/servicios/index",
            },
          ],
          resources: [
            {
              title: "Asistentes GPT/Gemini",
              description: "Agentes IA pre-configurados",
              source: "https://metodologia.info/recursos/index",
            },
          ],
          founders: [],
        },
      },
    );

    expect(artifact.clientName).toBe("Santafeenergy de Medellin Colombia");
    expect(artifact.html).not.toContain("https://santafeenergy.com.co/");
    expect(artifact.html).not.toContain("https://metodologia.info/");
    expect(artifact.html).toContain("Base pública MetodologIA · Servicios");
    expect(artifact.html).toContain("Base pública MetodologIA · Recursos");
  });

  it("removes prompt residue and internal path leakage from the public HTML", () => {
    const artifact = buildProposalArtifact(
      "Quiero que me ayudes a consturir una propuesta comercial para A&C Consultores.",
      JSON.stringify({
        clientName: "A&C Consultores",
        serviceName: "Ofimática con IA",
        processName: "Proceso Comercial",
        summary: "Quiero que me ayudes a construir una propuesta comercial.",
        challenge: "Bloques devueltos por el bot con foco en adopción.",
        approach: "Revisar bootcamp/assets y references/propuesta.md antes de publicar.",
        nextStep: "Validar siguiente paso con el cliente.",
        steps: ["Discovery", "Diseño", "Activación"],
        deliverables: ["Documento comercial", "Ruta de implementación"],
        assets: ["consultoria/assets", "template-package/propuesta.html"],
        sops: ["playbook-entrega.md"],
        gates: ["Validación comercial"],
        risks: ["Alinear alcance final"],
        sections: [
          { title: "Repaso de lo Entendido", body: "Quiero que me ayudes a consturir la propuesta." },
          { title: "Plan de Trabajo", body: "Revisar bootcamp/assets y references/propuesta.md." },
          { title: "Siguiente Paso", body: "Validar siguiente paso con el cliente." },
        ],
        sourceMap: [],
      }),
      new Date("2026-04-01T16:00:00.000Z"),
    );

    expect(artifact.html).toContain("Ruta ampliada");
    expect(artifact.html).not.toContain("Quiero que me ayudes a consturir");
    expect(artifact.html).not.toContain("Bloques devueltos por el bot");
    expect(artifact.html).not.toContain("bootcamp/assets");
    expect(artifact.html).not.toContain("consultoria/assets");
    expect(artifact.html).not.toContain("references/propuesta.md");
    expect(artifact.html).not.toContain("template-package/propuesta.html");
  });
});
