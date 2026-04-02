import { describe, expect, it } from "vitest";
import { buildProposalArtifact } from "../../src/proposals/proposal-artifact.js";
import {
  extractProposalNavOutline,
  extractProposalSectionOutline,
  formatProposalValidationError,
  validateProposalArtifactHtml,
} from "../../src/proposals/proposal-validation.js";

describe("proposal validation", () => {
  it("accepts a rendered proposal artifact built from the production template package", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp",
      JSON.stringify({
        clientName: "Acme Corp",
        serviceName: "Desarrollo de Agentes",
        processName: "Desarrollo de Agentes",
        summary: "Resumen ejecutivo estructurado para Acme Corp.",
        challenge: "Alinear alcance, entregables y siguiente paso.",
        approach: "Ruta de discovery, diseño y activación con alcance conservador.",
        nextStep: "Validar alcance y responsables.",
        steps: ["Discovery", "Diseño", "Activación"],
        deliverables: ["Documento comercial", "Roadmap", "Arquitectura objetivo"],
        assets: ["Brief", "Arquitectura objetivo"],
        sops: ["SOP Discovery"],
        gates: ["Gate discovery validado"],
        risks: ["Validar alcance final"],
        sections: [
          { title: "Repaso de lo Entendido", body: "Resumen ejecutivo estructurado para Acme Corp." },
          { title: "Plan de Accion", body: "Ruta de discovery, diseño y activación." },
          { title: "Borrador Inicial", body: "Documento comercial, roadmap y arquitectura objetivo." },
          { title: "Siguiente Paso", body: "Validar alcance y responsables." },
        ],
        sourceMap: [],
      }),
      new Date("2026-03-31T16:00:00.000Z"),
    );
    const result = validateProposalArtifactHtml(artifact.html);

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
    expect(extractProposalNavOutline(artifact.html)).toHaveLength(5);
    expect(extractProposalSectionOutline(artifact.html)).toHaveLength(17);
  });

  it("accepts a generated proposal artifact", () => {
    const artifact = buildProposalArtifact(
      "Necesito una propuesta comercial para Acme Corp",
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

    const result = validateProposalArtifactHtml(artifact.html);

    expect(result.valid).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("flags forbidden prompt residue in non-canonical HTML", () => {
    const result = validateProposalArtifactHtml([
      "<!doctype html>",
      "<html lang=\"es\">",
      "  <body>",
      "    <nav id=\"main-nav\"><div class=\"hidden lg:flex\"><a href=\"#hook\">Resumen</a></div></nav>",
      "    <main>",
      "      <section id=\"hero\"><h1>Propuesta comercial</h1></section>",
      "      <section id=\"hook\">",
      "        <h2>Plantilla controlada</h2>",
        "        <p>ETAPA 1 | SCAFFOLD INICIAL</p>",
      "      </section>",
      "    </main>",
      "  </body>",
      "</html>",
    ].join("\n"));

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "forbidden_phrase")).toBe(true);
    expect(formatProposalValidationError(result)).toContain("forbidden_phrase");
  });

  it("flags visible URL artifacts in non-canonical HTML", () => {
    const result = validateProposalArtifactHtml([
      "<!doctype html>",
      "<html lang=\"es\">",
      "  <body>",
      "    <nav id=\"main-nav\"><div class=\"hidden lg:flex\"><a href=\"#hook\">Resumen</a></div></nav>",
      "    <main>",
      "      <section id=\"hero\"><h1>Propuesta comercial</h1></section>",
      "      <section id=\"hook\">",
      "        <h2>Resumen del problema</h2>",
        "        <p>Consulta pública en https://metodologia.info/servicios/index para más detalle.</p>",
      "      </section>",
      "    </main>",
      "  </body>",
      "</html>",
    ].join("\n"));

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "forbidden_phrase")).toBe(true);
    expect(result.issues.some((issue) => /https?:\/\//i.test(issue.evidence))).toBe(true);
  });

  it("flags internal filenames and path leakage in non-canonical HTML", () => {
    const result = validateProposalArtifactHtml([
      "<!doctype html>",
      "<html lang=\"es\">",
      "  <body>",
      "    <nav id=\"main-nav\"><div class=\"hidden lg:flex\"><a href=\"#hook\">Resumen</a></div></nav>",
      "    <main>",
      "      <section id=\"hero\"><h1>Propuesta comercial</h1></section>",
      "      <section id=\"hook\">",
      "        <h2>Resumen del problema</h2>",
      "        <p>Validar template-package/propuesta.html y bootcamp/assets antes de compartir.</p>",
      "      </section>",
      "    </main>",
      "  </body>",
      "</html>",
    ].join("\n"));

    expect(result.valid).toBe(false);
    expect(result.issues.some((issue) => issue.code === "forbidden_phrase")).toBe(true);
    expect(result.issues.some((issue) => /template-package|assets/i.test(issue.evidence))).toBe(true);
  });
});
